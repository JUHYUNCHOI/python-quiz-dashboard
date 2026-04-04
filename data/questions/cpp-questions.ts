import type { QuizQuestion } from "@/hooks/use-quiz-state"

export const cppQuestions: QuizQuestion[] = [
  {
    id: 1,
    lessonId: "cpp-1",
    animationKey: "helloWorldBuilder",
    difficulty: "쉬움",
    question: "다음 중 C++ 프로그램의 시작점(entry point)이 되는 함수는?",
    code: `#include <iostream>

int main() {
    std::cout << "Hello!" << std::endl;
    return 0;
}`,
    options: ["start()", "main()", "begin()", "run()"],
    correctAnswer: 1,
    explanation: "C++ 프로그램은 항상 main() 함수에서 시작됩니다. 이것은 C++ 표준에 의해 정해진 규칙입니다.",
    keyConceptTitle: "main 함수",
    keyConceptDescription: "모든 C++ 프로그램은 main() 함수를 반드시 포함해야 하며, 프로그램 실행 시 가장 먼저 호출됩니다.",
    relatedTopics: ["프로그램 구조", "return 0", "함수"],
  },
  {
    id: 2,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다익스트라 알고리즘에 대한 설명으로 올바른 것은?",
    code: `// 다익스트라 핵심 아이디어
priority_queue<pair<int,int>, vector<pair<int,int>>,
               greater<pair<int,int>>> pq;
dist[start] = 0;
pq.push({0, start});
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});
        }
    }
}`,
    options: ["음수 가중치 간선이 있어도 정확하게 동작한다", "가중치가 없는 그래프에서만 사용 가능하다", "음이 아닌 가중치 그래프에서 단일 시작점 최단 경로를 구한다", "모든 쌍의 최단 경로를 구한다"],
    correctAnswer: 2,
    explanation: "다익스트라는 음이 아닌 가중치 그래프에서 하나의 시작점으로부터 모든 다른 노드까지의 최단 경로를 구합니다.",
    keyConceptTitle: "다익스트라 알고리즘 (Dijkstra)",
    keyConceptDescription: "우선순위 큐를 사용하여 가장 가까운 노드부터 방문하며 최단 거리를 갱신합니다. 시간 복잡도: O((V+E) log V). 음수 가중치 불가.",
    relatedTopics: ["다익스트라", "최단 경로", "우선순위 큐", "그래프"],
  },
  {
    id: 3,
    lessonId: "cpp-2",
    animationKey: "coutMission",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello" << endl;
    cout << "World" << endl;
    return 0;
}`,
    options: ["HelloWorld", "Hello World", "Hello\\nWorld", "Hello\nWorld"],
    correctAnswer: 3,
    explanation: "endl은 줄바꿈을 의미합니다. 따라서 Hello와 World가 각각 다른 줄에 출력됩니다.",
    keyConceptTitle: "endl과 줄바꿈",
    keyConceptDescription: "endl은 줄바꿈 문자를 출력하고 버퍼를 비웁니다. '\\n'도 줄바꿈에 사용할 수 있습니다.",
    relatedTopics: ["cout", "endl", "\\n"],
  },
  {
    id: 4,
    lessonId: "cpp-2",
    animationKey: "coutMission",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "이름\\t나이" << endl;
    cout << "민수\\t15" << endl;
    return 0;
}`,
    options: [
      "이름\\t나이\n민수\\t15",
      "이름    나이\n민수    15",
      "이름나이\n민수15",
      "이름 나이\n민수 15",
    ],
    correctAnswer: 1,
    explanation: "\\t는 탭(tab) 문자로, 일정 간격만큼 띄어줍니다. 코드에서 \\t로 쓰면 실제 출력에서 탭 간격이 됩니다.",
    keyConceptTitle: "탭 이스케이프 문자 \\t",
    keyConceptDescription: "\\t는 탭 키와 같은 효과로 열을 맞출 때 유용합니다. \\n은 줄바꿈, \\t는 탭입니다.",
    relatedTopics: ["이스케이프 문자", "\\t", "cout"],
  },
  {
    id: 5,
    lessonId: "cpp-3",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>

int main() {
    int score = 95;
    std::cout << "점수: " << score << "점" << std::endl;
    std::cout << "합격 여부: " << "합격" << std::endl;
    return 0;
}`,
    options: ["점수: 95점\n합격 여부: 합격", "점수: score점\n합격 여부: 합격", "점수: 95 점\n합격 여부: 합격", "컴파일 에러"],
    correctAnswer: 0,
    explanation: "cout << 문자열 << 정수 << 문자열 처럼 << 연산자로 여러 타입을 이어서 출력할 수 있습니다. 변수 score는 값 95로 출력됩니다.",
    keyConceptTitle: "문자열과 숫자 혼합 출력",
    keyConceptDescription: "std::cout << \"텍스트\" << 변수 << \"텍스트\" 처럼 << 연산자를 연결하면 문자열과 숫자를 함께 출력할 수 있습니다.",
    relatedTopics: ["cout", "<<연산자", "문자열+숫자 출력", "std::"],
  },
  {
    id: 6,
    lessonId: "cpp-2",
    animationKey: "helloWorldBuilder",
    difficulty: "쉬움",
    question: "다음 코드에서 using namespace std;의 역할은?",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello";
    return 0;
}`,
    options: ["iostream 헤더를 포함한다", "std:: 접두사 없이 cout, cin 등을 사용할 수 있게 한다", "main 함수를 정의한다", "프로그램을 실행한다"],
    correctAnswer: 1,
    explanation: "using namespace std; 없이는 std::cout, std::cin처럼 std:: 접두사를 붙여야 합니다.",
    keyConceptTitle: "using namespace",
    keyConceptDescription: "std 네임스페이스의 모든 이름을 접두사 없이 사용할 수 있게 합니다. 대규모 프로젝트에서는 피하는 것이 좋습니다.",
    relatedTopics: ["namespace", "std", "이름 충돌"],
  },
  {
    id: 9,
    lessonId: "cpp-3",
    animationKey: "syntaxSpotter",
    difficulty: "쉬움",
    question: "다음 중 C++에서 정수형 변수를 선언하는 올바른 방법은?",
    code: ``,
    options: ["int x = 10;", "x = 10", "var x = 10;", "integer x = 10;"],
    correctAnswer: 0,
    explanation: "C++에서 변수 선언 시 반드시 자료형을 명시해야 합니다. 정수는 int를 사용합니다.",
    keyConceptTitle: "변수 선언",
    keyConceptDescription: "C++는 정적 타입 언어로, 변수 선언 시 자료형(int, double, string 등)을 반드시 명시해야 합니다.",
    relatedTopics: ["자료형", "초기화", "const"],
  },
  {
    id: 10,
    lessonId: "cpp-3",
    difficulty: "쉬움",
    question: "다음 중 C++에서 소수점이 있는 숫자를 저장하는 자료형은?",
    code: ``,
    options: ["int", "char", "double", "bool"],
    correctAnswer: 2,
    explanation: "double은 소수점이 있는 실수를 저장하는 자료형입니다. int는 정수만, char는 문자, bool은 참/거짓을 저장합니다.",
    keyConceptTitle: "실수 자료형",
    keyConceptDescription: "C++에서 실수를 저장하려면 float(4바이트) 또는 double(8바이트)을 사용합니다. double이 더 정밀합니다.",
    relatedTopics: ["float", "자료형 크기", "형변환"],
  },
  {
    id: 11,
    lessonId: "cpp-3",
    animationKey: "compileVisualizer",
    difficulty: "쉬움",
    question: "다음 코드에서 컴파일 오류가 발생하는 줄은?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;       // 1번 줄
    cout << x << endl; // 2번 줄
    x = "hello";      // 3번 줄
    return 0;         // 4번 줄
}`,
    options: ["1번 줄", "2번 줄", "3번 줄", "오류 없음"],
    correctAnswer: 2,
    explanation: "x는 int형 변수인데 문자열 \"hello\"를 대입하려 하므로 3번 줄에서 타입 오류가 발생합니다.",
    keyConceptTitle: "타입 안전성",
    keyConceptDescription: "C++은 강한 타입 언어로, int 변수에 문자열을 대입할 수 없습니다. 변수의 타입은 선언 후 변경할 수 없습니다.",
    codeComparison: {
      wrong: `int x = 5;
x = "hello";  // 타입 불일치!`,
      correct: `int x = 5;
x = 10;  // int에 int 대입 OK`,
    },
    relatedTopics: ["자료형", "컴파일 오류", "타입 변환"],
  },
  {
    id: 12,
    lessonId: "cpp-3",
    difficulty: "보통",
    question: "두 cout의 출력 결과로 올바른 것은?",
    code: `#include <iostream>
using namespace std;

int main() {
    char c = 'A';
    cout << c << endl;
    cout << (int)c << endl;
    return 0;
}`,
    options: ["A 와 A", "A 와 숫자", "숫자 와 숫자", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "cout << c 는 문자 'A'를 그대로 출력하고, cout << (int)c 는 'A'를 int로 형변환해서 ASCII 코드인 65를 출력해요. 같은 변수라도 캐스팅하면 다르게 출력돼요!",
    keyConceptTitle: "char 캐스팅 — 문자 vs 숫자",
    keyConceptDescription: "char 변수를 그냥 출력하면 글자, (int)로 캐스팅하면 ASCII 숫자가 출력됩니다.",
    relatedTopics: ["char", "ASCII", "형변환"],
  },
  {
    id: 15,
    lessonId: "cpp-3",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 3;
    double y = 2.5;
    cout << x + y << endl;
    return 0;
}`,
    options: ["5", "5.5", "5.0", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "int와 double 연산 시 int가 자동으로 double로 변환됩니다(암시적 형변환). 3.0 + 2.5 = 5.5",
    keyConceptTitle: "암시적 형변환 (Implicit Conversion)",
    keyConceptDescription: "서로 다른 타입끼리 연산 시 범위가 좁은 타입이 넓은 타입으로 자동 변환됩니다. int → double 변환이 대표적입니다.",
    relatedTopics: ["암시적 형변환", "타입 프로모션", "static_cast"],
  },
  {
    id: 20,
    lessonId: "cpp-3",
    animationKey: "syntaxSpotter",
    difficulty: "쉬움",
    question: "다음 중 C++ 문자열 리터럴의 올바른 표현은?",
    code: ``,
    options: ["'Hello'", "\"Hello\"", "[Hello]", "{Hello}"],
    correctAnswer: 1,
    explanation: "C++에서 문자열 리터럴은 큰따옴표(\")로 감쌉니다. 작은따옴표(')는 단일 문자(char)용입니다.",
    keyConceptTitle: "문자열 vs 문자 리터럴",
    keyConceptDescription: "\"abc\"는 문자열(string), 'a'는 단일 문자(char)입니다. 혼동하지 마세요.",
    relatedTopics: ["string", "char", "리터럴"],
  },
  {
    id: 21,
    lessonId: "cpp-3",
    difficulty: "쉬움",
    question: "다음 코드를 컴파일하면 어떻게 되나요?",
    code: `#include <iostream>
using namespace std;

int main() {
    const int MAX = 100;
    MAX = 200;
    cout << MAX;
    return 0;
}`,
    options: ["200이 출력됨", "100이 출력됨", "컴파일 오류", "런타임 오류"],
    correctAnswer: 2,
    explanation: "const로 선언된 변수는 초기화 후 값을 변경할 수 없어요. MAX = 200처럼 const 변수에 대입하면 컴파일 오류가 발생합니다.",
    keyConceptTitle: "const 상수",
    keyConceptDescription: "const 변수는 초기화 후 값을 변경할 수 없습니다. 매직 넘버 대신 const를 사용하면 코드가 명확해집니다.",
    relatedTopics: ["const", "상수", "매직 넘버"],
  },
  {
    id: 22,
    lessonId: "cpp-4",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;  // 사용자가 7을 입력
    cout << x * 2 << endl;
    return 0;
}`,
    options: ["7", "14", "72", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "cin >> x로 7을 입력받으면 x = 7이 됩니다. x * 2 = 14가 출력됩니다.",
    keyConceptTitle: "cin 입력",
    keyConceptDescription: "cin >> 변수 형태로 사용자 입력을 받을 수 있습니다. 입력된 값은 변수의 자료형에 맞게 변환됩니다.",
    relatedTopics: ["cin", "cout", "입출력"],
  },
  {
    id: 23,
    lessonId: "cpp-4",
    difficulty: "쉬움",
    question: "다음 코드에서 빈칸에 들어갈 알맞은 것은?",
    code: `#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "나이: ";
    _____ >> age;
    return 0;
}`,
    options: ["cout", "cin", "scanf", "input"],
    correctAnswer: 1,
    explanation: "C++에서 키보드 입력을 받으려면 cin >> 변수명을 사용합니다.",
    keyConceptTitle: "cin 입력",
    keyConceptDescription: "cin >> 변수명으로 사용자 입력을 받습니다. >> 는 추출 연산자입니다.",
    relatedTopics: ["cin", "cout", "입출력 스트림"],
  },
  {
    id: 24,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << 5 + 3 << endl;
    return 0;
}`,
    options: ["5", "8", "53", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "정수끼리의 + 연산은 산술 덧셈입니다. 5 + 3 = 8이 출력됩니다.",
    keyConceptTitle: "산술 연산자",
    keyConceptDescription: "C++에서 + 연산자는 숫자 타입에서 덧셈을 수행합니다. cout << 로 결과를 출력합니다.",
    relatedTopics: ["cout", "연산자", "자료형"],
  },
  {
    id: 25,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 7, b = 2;
    cout << a / b << endl;
    return 0;
}`,
    options: ["3.5", "3", "4", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "int끼리 나누면 정수 나눗셈이 수행되어 소수점 이하가 버려집니다. 7 / 2 = 3",
    keyConceptTitle: "정수 나눗셈",
    keyConceptDescription: "C++에서 int / int는 소수점을 버리고 정수 결과만 반환합니다. 소수점이 필요하면 double을 사용하세요.",
    codeComparison: {
      wrong: `int a = 7, b = 2;
cout << a / b;  // 3 (소수점 버림)`,
      correct: `double a = 7.0, b = 2.0;
cout << a / b;  // 3.5`,
    },
    relatedTopics: ["나머지 연산 %", "형변환", "double"],
  },
  {
    id: 26,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    x++;
    cout << x;
    return 0;
}`,
    options: ["10", "11", "12", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "x++는 x의 값을 1 증가시킵니다. x = 10에서 x++ 후 x = 11이 됩니다.",
    keyConceptTitle: "증감 연산자",
    keyConceptDescription: "x++는 x를 1 증가, x--는 1 감소시킵니다. 전위(++x)와 후위(x++)의 차이에 주의하세요.",
    relatedTopics: ["++", "--", "전위/후위 증감"],
  },
  {
    id: 27,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    bool a = true;
    bool b = false;
    cout << (a && b) << " " << (a || b) << endl;
    return 0;
}`,
    options: ["true false", "1 0", "0 1", "0 0"],
    correctAnswer: 2,
    explanation: "true && false = false(0), true || false = true(1). bool 값은 cout에서 0 또는 1로 출력됩니다.",
    keyConceptTitle: "bool 타입",
    keyConceptDescription: "bool 타입은 true(1) 또는 false(0)를 저장합니다. cout으로 출력하면 기본적으로 1 또는 0이 출력됩니다.",
    relatedTopics: ["bool", "논리 연산자", "boolalpha"],
  },
  {
    id: 29,
    lessonId: "cpp-5",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 10;
    a += 5;
    a *= 2;
    cout << a;
    return 0;
}`,
    options: ["25", "30", "20", "35"],
    correctAnswer: 1,
    explanation: "a=10 → a+=5로 a=15 → a*=2로 a=30. 복합 대입 연산자는 순서대로 실행됩니다.",
    keyConceptTitle: "복합 대입 연산자",
    keyConceptDescription: "+=, -=, *=, /= 등은 연산과 대입을 동시에 수행합니다. a += 5는 a = a + 5와 같습니다.",
    relatedTopics: ["대입 연산자", "산술 연산", "연산 순서"],
  },
  {
    id: 30,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    bool flag = true;
    cout << flag << " " << !flag;
    return 0;
}`,
    options: ["true false", "1 0", "1 1", "0 1"],
    correctAnswer: 1,
    explanation: "cout에서 bool은 true→1, false→0으로 출력됩니다. !true는 false(0)입니다.",
    keyConceptTitle: "bool 출력",
    keyConceptDescription: "cout << bool은 기본적으로 1 또는 0을 출력합니다. boolalpha를 쓰면 true/false 문자열로 출력됩니다.",
    relatedTopics: ["bool", "논리 연산자", "boolalpha"],
  },
  {
    id: 31,
    lessonId: "cpp-3",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    double d = 7.0 / 2;
    int i = 7 / 2;
    cout << d << " " << i;
    return 0;
}`,
    options: ["3.5 3.5", "3 3", "3.5 3", "3 3.5"],
    correctAnswer: 2,
    explanation: "7.0/2는 double 나눗셈으로 3.5, 7/2는 int 나눗셈으로 3입니다. 피연산자 중 하나가 double이면 double 나눗셈이 됩니다.",
    keyConceptTitle: "암시적 형변환과 나눗셈",
    keyConceptDescription: "int/int는 정수 나눗셈, double/int는 실수 나눗셈입니다. 하나라도 실수면 실수 나눗셈이 됩니다.",
    relatedTopics: ["형변환", "정수 나눗셈", "실수 나눗셈"],
  },
  {
    id: 32,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;
    cout << (a > b) << " ";
    cout << (a < b) << " ";
    cout << (a == b);
    return 0;
}`,
    options: ["false true false", "0 1 0", "1 0 0", "true false false"],
    correctAnswer: 1,
    explanation: "비교 연산의 결과는 bool이며, cout에서 true→1, false→0으로 출력됩니다. 10>20=false(0), 10<20=true(1), 10==20=false(0).",
    keyConceptTitle: "비교 연산자의 결과",
    keyConceptDescription: ">, <, ==, !=, >=, <= 연산자는 bool 값(true/false)을 반환합니다. cout에서는 1/0으로 출력됩니다.",
    relatedTopics: ["비교 연산자", "bool", "조건"],
  },
  {
    id: 37,
    lessonId: "cpp-6",
    animationKey: "cppIfBuilder",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 10;
    if (a > 5) {
        cout << "크다";
    } else {
        cout << "작다";
    }
    return 0;
}`,
    options: ["크다", "작다", "크다작다", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "a = 10이고 10 > 5는 참이므로 if 블록이 실행되어 '크다'가 출력됩니다.",
    keyConceptTitle: "if-else 조건문",
    keyConceptDescription: "if 조건이 참이면 if 블록을, 거짓이면 else 블록을 실행합니다.",
    relatedTopics: ["조건문", "비교 연산자", "else if"],
  },
  {
    id: 38,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 17, b = 5;
    cout << a % b;
    return 0;
}`,
    options: ["3", "2", "3.4", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "% 연산자는 나머지를 구합니다. 17 ÷ 5 = 3 나머지 2이므로 17 % 5 = 2입니다.",
    keyConceptTitle: "나머지 연산자 (%)",
    keyConceptDescription: "% 연산자는 나눗셈의 나머지를 반환합니다. 짝수/홀수 판별(n % 2), 특정 범위 순환 등에 자주 사용됩니다.",
    relatedTopics: ["나머지", "짝수 홀수", "정수 나눗셈"],
  },
  {
    id: 39,
    lessonId: "cpp-6",
    animationKey: "cppIfBuilder",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;
    if (x > 3 && x < 10) {
        cout << "범위 안";
    } else {
        cout << "범위 밖";
    }
    return 0;
}`,
    options: ["범위 안", "범위 밖", "컴파일 오류", "아무것도 출력 안 됨"],
    correctAnswer: 0,
    explanation: "x=5이고, 5>3은 참, 5<10도 참입니다. &&(AND) 연산에서 둘 다 참이므로 '범위 안'이 출력됩니다.",
    keyConceptTitle: "논리 연산자 &&",
    keyConceptDescription: "&&는 두 조건이 모두 참일 때만 참입니다. ||는 하나라도 참이면 참, !는 조건을 반전시킵니다.",
    relatedTopics: ["&&", "||", "!", "조건문"],
  },
  {
    id: 40,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 7;
    cout << (x > 5 ? "크다" : "작다") << endl;
    return 0;
}`,
    options: ["크다", "작다", "7", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "삼항 연산자(조건 ? 참값 : 거짓값)에서 7 > 5는 참이므로 \"크다\"가 출력됩니다.",
    keyConceptTitle: "삼항 연산자 (?:)",
    keyConceptDescription: "조건 ? 값1 : 값2 형태로, if-else를 한 줄로 작성할 수 있습니다. 간단한 조건부 대입에 유용합니다.",
    codeComparison: {
      wrong: `// if-else (3줄)
if (x > 5) cout << "크다";
else cout << "작다";`,
      correct: `// 삼항 연산자 (1줄)
cout << (x > 5 ? "크다" : "작다");`,
    },
    relatedTopics: ["삼항 연산자", "조건문", "if-else"],
  },
  {
    id: 41,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 0;
    if (x) {
        cout << "참";
    } else {
        cout << "거짓";
    }
    return 0;
}`,
    options: ["참", "거짓", "0", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "C++에서 0은 false, 0이 아닌 값은 true로 취급됩니다. x=0이므로 else 블록이 실행됩니다.",
    keyConceptTitle: "정수의 bool 변환",
    keyConceptDescription: "C++에서 0은 false, 0이 아닌 모든 값(양수, 음수)은 true로 변환됩니다. if(x)는 if(x != 0)과 같습니다.",
    relatedTopics: ["bool", "조건문", "암시적 변환"],
  },
  {
    id: 42,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 3;
    cout << (a > b ? a : b);
    return 0;
}`,
    options: ["3", "5", "true", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "삼항 연산자에서 5 > 3은 참이므로 a(=5)가 선택됩니다. 이 패턴은 두 수 중 최대값을 구하는 데 사용됩니다.",
    keyConceptTitle: "삼항 연산자로 최대값 구하기",
    keyConceptDescription: "max(a, b)와 동일하게 (a > b ? a : b)로 두 값 중 큰 값을 구할 수 있습니다.",
    relatedTopics: ["삼항 연산자", "max", "min"],
  },
  {
    id: 43,
    lessonId: "cpp-20",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 15;
    cout << (a & 1);
    return 0;
}`,
    options: ["0", "1", "15", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "a & 1은 a의 마지막 비트를 확인합니다. 15(1111)의 마지막 비트는 1이므로 홀수입니다.",
    keyConceptTitle: "비트 AND로 홀짝 판별",
    keyConceptDescription: "n & 1이 1이면 홀수, 0이면 짝수입니다. 비트 연산은 % 2보다 빠릅니다.",
    relatedTopics: ["비트 연산", "AND", "홀짝 판별"],
  },
  {
    id: 44,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 7;
    if (x % 2 == 0)
        cout << "짝수";
    else
        cout << "홀수";
    return 0;
}`,
    options: ["짝수", "홀수", "짝수홀수", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "7 % 2 = 1이므로 조건이 false입니다. else 블록이 실행되어 '홀수'가 출력됩니다.",
    keyConceptTitle: "나머지 연산으로 홀짝 판별",
    keyConceptDescription: "n % 2 == 0이면 짝수, 아니면 홀수입니다. %는 나머지(modulo) 연산자입니다.",
    relatedTopics: ["나머지 연산", "조건문", "짝홀수"],
  },
  {
    id: 46,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int score = 75;
    if (score >= 90) {
        cout << "A";
    } else if (score >= 70) {
        cout << "B";
    } else {
        cout << "C";
    }
    return 0;
}`,
    options: ["A", "B", "C", "AB"],
    correctAnswer: 1,
    explanation: "score가 75이므로 첫 번째 조건 (75 >= 90)은 false, 두 번째 조건 (75 >= 70)은 true입니다. 'B'가 출력됩니다.",
    keyConceptTitle: "else if로 여러 조건 처리",
    keyConceptDescription: "if → else if → else 순서로 위에서 아래로 확인합니다. 처음 true인 조건의 블록만 실행되고 나머지는 건너뜁니다.",
    relatedTopics: ["if-else", "조건문", "비교 연산자"],
  },
  {
    id: 47,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = -5;
    if (x > 0)
        cout << "양수";
    else if (x == 0)
        cout << "영";
    else
        cout << "음수";
    return 0;
}`,
    options: ["양수", "영", "음수", "양수음수"],
    correctAnswer: 2,
    explanation: "x=-5이므로 x>0은 false, x==0도 false, else 블록이 실행되어 '음수'가 출력됩니다.",
    keyConceptTitle: "else if 체인",
    keyConceptDescription: "if-else if-else 체인에서 첫 번째 true 조건의 블록만 실행됩니다. 모두 false이면 else가 실행됩니다.",
    relatedTopics: ["else if", "조건문", "분기"],
  },
  {
    id: 48,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 10;
    int max_val = (a > b) ? a : b;
    int min_val = (a < b) ? a : b;
    cout << max_val << " " << min_val;
    return 0;
}`,
    options: ["5 10", "10 5", "10 10", "5 5"],
    correctAnswer: 1,
    explanation: "삼항 연산자로 최댓값과 최솟값을 구합니다. max_val=10, min_val=5.",
    keyConceptTitle: "삼항 연산자로 최대/최소",
    keyConceptDescription: "삼항 연산자로 간단하게 max, min을 구할 수 있습니다. STL의 max(), min() 함수도 사용 가능합니다.",
    relatedTopics: ["삼항 연산자", "max", "min"],
  },
  {
    id: 49,
    lessonId: "cpp-7",
    animationKey: "cppForBuilder",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 3; i++) {
        cout << i << " ";
    }
    return 0;
}`,
    options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"],
    correctAnswer: 1,
    explanation: "i=0부터 시작하고, i<3 조건이므로 0, 1, 2가 출력됩니다.",
    keyConceptTitle: "for 반복문",
    keyConceptDescription: "for(초기화; 조건; 증감)에서 조건이 false가 되면 반복이 종료됩니다. i<3이면 0,1,2에서 실행됩니다.",
    relatedTopics: ["while 반복문", "break", "continue"],
  },
  {
    id: 50,
    lessonId: "cpp-7",
    animationKey: "cppForBuilder",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    cout << sum;
    return 0;
}`,
    options: ["10", "15", "5", "20"],
    correctAnswer: 1,
    explanation: "1 + 2 + 3 + 4 + 5 = 15. for 루프가 1부터 5까지 반복하며 합을 구합니다.",
    keyConceptTitle: "반복문으로 합 구하기",
    keyConceptDescription: "sum += i는 sum = sum + i와 같습니다. 반복문을 이용해 누적 합을 구하는 것은 기본 패턴입니다.",
    relatedTopics: ["누적 합", "for 반복문", "+= 연산자"],
  },
  {
    id: 51,
    lessonId: "cpp-7",
    animationKey: "cppWhileBuilder",
    difficulty: "쉬움",
    question: "다음 while 루프는 몇 번 실행되나요?",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i < 4) {
        cout << i << " ";
        i++;
    }
    return 0;
}`,
    options: ["3번", "4번", "5번", "무한 반복"],
    correctAnswer: 1,
    explanation: "i = 0, 1, 2, 3일 때 실행되고, i = 4가 되면 조건 i < 4가 거짓이 되어 종료합니다. 총 4번 실행됩니다.",
    keyConceptTitle: "while 반복문",
    keyConceptDescription: "while(조건)은 조건이 참인 동안 반복합니다. 조건 변수를 꼭 갱신해야 무한 루프를 방지할 수 있습니다.",
    relatedTopics: ["while", "무한 루프", "반복 횟수"],
  },
  {
    id: 52,
    lessonId: "cpp-7",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        if (i == 3) break;
        cout << i << " ";
    }
    return 0;
}`,
    options: ["0 1 2 3", "0 1 2", "0 1 2 3 4", "3"],
    correctAnswer: 1,
    explanation: "i=3일 때 break가 실행되어 반복문을 즉시 탈출합니다. i=0,1,2만 출력됩니다.",
    keyConceptTitle: "break 문",
    keyConceptDescription: "break는 가장 가까운 반복문을 즉시 종료합니다. continue는 현재 반복만 건너뛰고 다음 반복으로 넘어갑니다.",
    codeComparison: {
      wrong: `if (i == 3) continue; // 3만 건너뜀
// 출력: 0 1 2 4`,
      correct: `if (i == 3) break; // 반복 종료
// 출력: 0 1 2`,
    },
    relatedTopics: ["break", "continue", "반복문"],
  },
  {
    id: 55,
    lessonId: "cpp-7",
    difficulty: "쉬움",
    question: "다음 do-while 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 5;
    do {
        cout << i << " ";
        i++;
    } while (i < 5);
    return 0;
}`,
    options: ["아무것도 출력 안 됨", "5", "5 6 7 8 9", "무한 반복"],
    correctAnswer: 1,
    explanation: "do-while은 조건 검사 전에 최소 1번 실행됩니다. i=5를 출력한 후 i=6이 되고 6<5는 거짓이므로 종료됩니다.",
    keyConceptTitle: "do-while 반복문",
    keyConceptDescription: "do-while은 조건을 나중에 검사하므로 최소 1번은 반드시 실행됩니다. while과의 핵심 차이점입니다.",
    codeComparison: {
      wrong: `int i = 5;
while (i < 5) { cout << i; i++; }
// 한 번도 실행 안 됨`,
      correct: `int i = 5;
do { cout << i; i++; } while (i < 5);
// 최소 1번 실행: "5" 출력`,
    },
    relatedTopics: ["do-while", "while", "반복문"],
  },
  {
    id: 58,
    lessonId: "cpp-7",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) continue;
        cout << i << " ";
    }
    return 0;
}`,
    options: ["1 2 3 4 5", "1 2 4 5", "1 2", "3"],
    correctAnswer: 1,
    explanation: "continue는 현재 반복을 건너뛰고 다음 반복으로 넘어갑니다. i==3일 때만 건너뛰므로 1 2 4 5가 출력됩니다.",
    keyConceptTitle: "continue 문",
    keyConceptDescription: "continue는 현재 반복의 나머지를 건너뛰고 조건 검사로 돌아갑니다. break와 달리 반복문을 종료하지 않습니다.",
    relatedTopics: ["continue", "break", "반복문 제어"],
  },
  {
    id: 60,
    lessonId: "cpp-7",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i < 5) {
        if (i == 3) break;
        cout << i << " ";
        i++;
    }
    cout << "끝:" << i;
    return 0;
}`,
    options: ["0 1 2 끝:3", "0 1 2 3 끝:4", "0 1 2 끝:5", "0 1 2 3 4 끝:5"],
    correctAnswer: 0,
    explanation: "i==3일 때 break로 반복문을 빠져나옵니다. 이때 i는 여전히 3이므로 '끝:3'이 출력됩니다.",
    keyConceptTitle: "break 후 변수 상태",
    keyConceptDescription: "break는 반복문을 즉시 종료합니다. break 시점의 변수 값이 그대로 유지됩니다.",
    relatedTopics: ["break", "while", "반복문 탈출"],
  },
  {
    id: 61,
    lessonId: "cpp-7",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (i == j) cout << "* ";
            else cout << ". ";
        }
        cout << endl;
    }
    return 0;
}`,
    options: ["* * *\\n* * *\\n* * *", "* . .\\n. * .\\n. . *", ". . *\\n. * .\\n* . .", ". * .\\n* . *\\n. * ."],
    correctAnswer: 1,
    explanation: "i==j인 위치에만 *가 출력됩니다. (0,0), (1,1), (2,2)이므로 대각선에 *가 찍힙니다.",
    keyConceptTitle: "중첩 반복문과 패턴",
    keyConceptDescription: "이중 for문으로 2차원 패턴을 만들 수 있습니다. i==j 조건은 대각선을 의미합니다.",
    relatedTopics: ["중첩 반복문", "패턴 출력", "2차원"],
  },
  {
    id: 62,
    lessonId: "cpp-7",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 1;
    do {
        cout << i << " ";
        i *= 2;
    } while (i <= 16);
    return 0;
}`,
    options: ["1 2 4 8", "1 2 4 8 16", "2 4 8 16", "1 2 4 8 16 32"],
    correctAnswer: 1,
    explanation: "do-while은 조건 검사 전에 먼저 실행합니다. i: 1→2→4→8→16→(32>16이므로 종료). 1 2 4 8 16이 출력됩니다.",
    keyConceptTitle: "do-while 반복문",
    keyConceptDescription: "do-while은 최소 1번은 실행되며, 본문 실행 후 조건을 검사합니다. i=16일 때 출력 후 i=32가 되어 종료.",
    relatedTopics: ["do-while", "while 차이", "최소 1회 실행"],
  },
  {
    id: 63,
    lessonId: "cpp-7",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) continue;
        if (i == 5) break;
        cout << i << " ";
    }
    return 0;
}`,
    options: ["1 3 5", "1 3", "1 2 3 4", "2 4"],
    correctAnswer: 1,
    explanation: "짝수는 continue로 건너뛰고, i==5일 때 break로 종료합니다. 출력: 1 3.",
    keyConceptTitle: "continue와 break 조합",
    keyConceptDescription: "continue는 현재 반복만 건너뛰고, break는 반복문 전체를 종료합니다. 같이 사용하면 복잡한 필터링이 가능합니다.",
    relatedTopics: ["continue", "break", "반복문 제어"],
  },
  {
    id: 64,
    lessonId: "cpp-7",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int n = 5;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n - i; j++)
            cout << " ";
        for (int j = 1; j <= 2 * i - 1; j++)
            cout << "*";
        cout << endl;
    }
    return 0;
}`,
    options: ["직각삼각형", "역삼각형", "다이아몬드 위쪽 절반(피라미드)", "직사각형"],
    correctAnswer: 2,
    explanation: "각 줄에 공백을 줄이고 *를 1,3,5,7,9개로 늘려서 피라미드 모양을 만듭니다.",
    keyConceptTitle: "별 피라미드 패턴",
    keyConceptDescription: "공백과 별의 개수를 조절하여 다양한 도형을 출력할 수 있습니다. 2*i-1은 홀수 수열입니다.",
    relatedTopics: ["패턴 출력", "중첩 반복문", "공백 제어"],
  },
  {
    id: 65,
    lessonId: "cpp-7",
    difficulty: "보통",
    question: "다음 코드에서 무한 루프가 발생하는 이유는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i < 10) {
        cout << i << " ";
        // i++ 빠짐!
    }
    return 0;
}`,
    options: ["i++ 가 없어서 i가 계속 0이다", "while 조건이 항상 거짓이다", "cout이 루프를 멈춘다", "i의 초기값이 잘못됐다"],
    correctAnswer: 0,
    explanation: "i++가 없으면 i가 0에서 변하지 않아 while(i < 10)이 항상 true가 됩니다. 반복문에는 반드시 종료 조건을 바꾸는 코드가 필요해요.",
    keyConceptTitle: "무한 루프 원인",
    keyConceptDescription: "while 루프가 멈추려면 조건에 쓰인 변수가 반드시 바뀌어야 합니다. i++ 같은 업데이트 코드를 빠뜨리면 무한 루프가 됩니다.",
    codeComparison: {
      wrong: `while (i < 10) {\n    cout << i;  // i가 안 바뀜!`,
      correct: `while (i < 10) {\n    cout << i;\n    i++;  // 종료 조건 갱신`,
    },
    relatedTopics: ["무한 루프", "while", "업데이트 조건"],
  },
  {
    id: 66,
    lessonId: "cpp-8",
    animationKey: "buildRunFlow",
    difficulty: "쉬움",
    question: "다음 코드에서 함수 add의 반환값은?",
    code: `#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    cout << add(3, 4);
    return 0;
}`,
    options: ["34", "7", "12", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "add(3, 4)는 3 + 4 = 7을 반환합니다. 함수는 return 문으로 값을 돌려줍니다.",
    keyConceptTitle: "함수의 반환값",
    keyConceptDescription: "함수는 return 문으로 값을 반환합니다. 반환 타입이 int이면 정수를 반환해야 합니다.",
    relatedTopics: ["함수 정의", "매개변수", "return"],
  },
  {
    id: 67,
    lessonId: "cpp-8",
    animationKey: "buildRunFlow",
    difficulty: "보통",
    question: "다음 코드에서 빈칸에 들어갈 알맞은 코드는?",
    code: `#include <iostream>
using namespace std;

void printDouble(int x) {
    cout << x * 2;
}

int main() {
    _______(5);  // 출력: 10
    return 0;
}`,
    options: ["printDouble", "cout", "double", "print"],
    correctAnswer: 0,
    explanation: "printDouble(5)를 호출하면 5 * 2 = 10이 출력됩니다. 함수 이름으로 호출합니다.",
    keyConceptTitle: "함수 호출",
    keyConceptDescription: "함수를 호출할 때는 함수이름(인자) 형태를 사용합니다. void 함수는 값을 반환하지 않습니다.",
    relatedTopics: ["함수 호출", "void", "매개변수"],
  },
  {
    id: 68,
    lessonId: "cpp-8",
    animationKey: "buildRunFlow",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

void greet(string name = "Guest") {
    cout << "Hello, " << name;
}

int main() {
    greet();
    return 0;
}`,
    options: ["Hello, ", "Hello, Guest", "컴파일 오류", "Hello, name"],
    correctAnswer: 1,
    explanation: "인자를 전달하지 않으면 기본값 \"Guest\"가 사용됩니다. 따라서 \"Hello, Guest\"가 출력됩니다.",
    keyConceptTitle: "default 매개변수",
    keyConceptDescription: "함수 매개변수에 기본값을 설정할 수 있습니다. 인자를 생략하면 기본값이 사용됩니다. 기본값은 오른쪽부터 설정해야 합니다.",
    relatedTopics: ["기본 매개변수", "함수", "함수 오버로딩"],
  },
  {
    id: 69,
    lessonId: "cpp-8",
    animationKey: "cppFunctionBuilder",
    difficulty: "보통",
    question: "다음 코드에서 함수 오버로딩이 올바르게 동작하는 이유는?",
    code: `#include <iostream>
using namespace std;

double area(double r) {
    return 3.14 * r * r;
}

double area(double w, double h) {
    return w * h;
}

int main() {
    cout << area(5.0) << " " << area(3.0, 4.0);
    return 0;
}`,
    options: ["반환 타입이 다르기 때문", "매개변수의 개수가 다르기 때문", "함수 이름이 다르기 때문", "같은 이름의 함수는 두 개 이상 정의할 수 없다"],
    correctAnswer: 1,
    explanation: "함수 오버로딩은 매개변수의 타입이나 개수가 다를 때 같은 이름의 함수를 여러 개 정의할 수 있습니다.",
    keyConceptTitle: "함수 오버로딩 조건",
    keyConceptDescription: "오버로딩은 매개변수의 타입, 개수, 순서가 달라야 합니다. 반환 타입만 다른 것은 오버로딩이 아닙니다.",
    relatedTopics: ["함수 오버로딩", "매개변수", "시그니처"],
  },
  {
    id: 76,
    lessonId: "cpp-8",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int calc(int a, int b = 10, int c = 20) {
    return a + b + c;
}

int main() {
    cout << calc(1) << " " << calc(1, 2) << " " << calc(1, 2, 3);
    return 0;
}`,
    options: ["31 23 6", "1 3 6", "31 13 6", "1 12 123"],
    correctAnswer: 0,
    explanation: "calc(1): 1+10+20=31. calc(1,2): 1+2+20=23. calc(1,2,3): 1+2+3=6. 기본값은 뒤에서부터 적용됩니다.",
    keyConceptTitle: "기본 매개변수",
    keyConceptDescription: "함수 매개변수에 기본값을 지정하면 호출 시 생략할 수 있습니다. 기본값은 뒤쪽 매개변수부터 지정해야 합니다.",
    relatedTopics: ["기본 매개변수", "함수 호출", "인자 생략"],
  },
  {
    id: 81,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    cout << arr[2] << endl;
    return 0;
}`,
    options: ["10", "20", "30", "40"],
    correctAnswer: 2,
    explanation: "배열 인덱스는 0부터 시작합니다. arr[0]=10, arr[1]=20, arr[2]=30",
    keyConceptTitle: "배열 인덱싱",
    keyConceptDescription: "C++ 배열은 0-based indexing을 사용합니다. 첫 번째 요소는 arr[0]입니다.",
    relatedTopics: ["배열 선언", "범위 초과", "vector"],
    animationKey: "cppArrayBuilder",
  },
  {
    id: 82,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {3, 1, 4, 1, 5};
    int maxVal = arr[0];
    for (int i = 1; i < 5; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    cout << maxVal;
    return 0;
}`,
    options: ["3", "4", "5", "1"],
    correctAnswer: 2,
    explanation: "배열에서 가장 큰 값을 찾는 코드입니다. {3,1,4,1,5} 중 최대값은 5입니다.",
    keyConceptTitle: "배열에서 최대값 찾기",
    keyConceptDescription: "첫 번째 요소를 임시 최대값으로 설정하고, 나머지를 순회하며 더 큰 값이 있으면 갱신하는 패턴입니다.",
    relatedTopics: ["배열 순회", "최대값", "최소값"],
    animationKey: "cppArrayBuilder",
  },
  {
    id: 83,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {5, 3, 8, 1};
    v.pop_back();
    cout << v.size() << " " << v.back();
    return 0;
}`,
    options: ["4 1", "3 8", "3 1", "4 8"],
    correctAnswer: 1,
    explanation: "pop_back()은 마지막 요소(1)를 제거합니다. 남은 v = {5,3,8}이므로 size()=3, back()=8입니다.",
    keyConceptTitle: "vector::pop_back()",
    keyConceptDescription: "pop_back()은 벡터의 마지막 요소를 제거합니다. push_back()과 반대 동작입니다.",
    relatedTopics: ["vector", "push_back", "pop_back"],
    animationKey: "cppArrayBuilder",
  },
  {
    id: 84,
    lessonId: "cpp-21",
    difficulty: "보통",
    question: "다음 코드에서 2차원 배열의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
    cout << grid[1][2];
    return 0;
}`,
    options: ["3", "5", "6", "2"],
    correctAnswer: 2,
    explanation: "grid[1][2]는 2번째 행(인덱스 1)의 3번째 열(인덱스 2)입니다. 값은 6입니다.",
    keyConceptTitle: "2차원 배열",
    keyConceptDescription: "2차원 배열은 grid[행][열]로 접근합니다. 행과 열 모두 0부터 시작합니다.",
    relatedTopics: ["다차원 배열", "행렬", "인덱싱"],
  },
  {
    id: 85,
    lessonId: "cpp-9",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30};
    cout << arr[3] << " " << arr[4] << endl;
    return 0;
}`,
    options: ["쓰레기 값", "0 0", "30 30", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "배열을 부분 초기화하면 나머지 요소는 0으로 자동 초기화됩니다. arr[3]=0, arr[4]=0입니다.",
    keyConceptTitle: "배열 부분 초기화",
    keyConceptDescription: "배열 선언 시 일부만 초기화하면 나머지는 0으로 채워집니다. int arr[5] = {0}은 전체를 0으로 초기화하는 관용구입니다.",
    relatedTopics: ["배열 초기화", "0 초기화", "배열"],
  },
  {
    id: 86,
    lessonId: "cpp-21",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int grid[2][3] = {{1, 2, 3}, {4}};
    cout << grid[1][0] << " " << grid[1][1] << " " << grid[1][2];
    return 0;
}`,
    options: ["4 0 0", "4 5 6", "1 2 3", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "2차원 배열에서 두 번째 행은 {4}만 초기화되었으므로 나머지는 0이 됩니다. grid[1] = {4, 0, 0}",
    keyConceptTitle: "다차원 배열 부분 초기화",
    keyConceptDescription: "다차원 배열도 부분 초기화가 가능합니다. 명시하지 않은 요소는 0으로 초기화됩니다.",
    relatedTopics: ["2차원 배열", "초기화", "배열"],
  },
  {
    id: 87,
    lessonId: "cpp-21",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<vector<int>> grid(3, vector<int>(4, 0));
    grid[1][2] = 5;
    cout << grid.size() << " " << grid[0].size() << " " << grid[1][2];
    return 0;
}`,
    options: ["3 4 5", "4 3 5", "3 4 0", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "3행 4열의 2D 벡터가 0으로 초기화됩니다. grid.size()=3(행), grid[0].size()=4(열), grid[1][2]=5",
    keyConceptTitle: "2D vector",
    keyConceptDescription: "vector<vector<int>> grid(행수, vector<int>(열수, 초기값))으로 2차원 동적 배열을 만들 수 있습니다.",
    relatedTopics: ["2D vector", "동적 배열", "행렬"],
  },
  {
    id: 88,
    lessonId: "cpp-21",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[3][3] = {
        {1, 0, 0},
        {0, 1, 0},
        {0, 0, 1}
    };
    int sum = 0;
    for (int i = 0; i < 3; i++)
        sum += arr[i][i];
    cout << sum;
    return 0;
}`,
    options: ["0", "1", "3", "9"],
    correctAnswer: 2,
    explanation: "arr[i][i]는 대각선 요소입니다. arr[0][0]+arr[1][1]+arr[2][2] = 1+1+1 = 3. 이것은 단위 행렬의 대각합(trace)입니다.",
    keyConceptTitle: "2차원 배열 대각선 접근",
    keyConceptDescription: "arr[i][i]는 주 대각선, arr[i][n-1-i]는 부 대각선 요소입니다. 행렬 문제에서 자주 사용됩니다.",
    relatedTopics: ["2차원 배열", "대각선", "행렬"],
  },
  {
    id: 89,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v(5, 3);
    cout << v.size() << " " << v[2];
    return 0;
}`,
    options: ["3 5", "5 3", "5 0", "3 3"],
    correctAnswer: 1,
    explanation: "vector<int> v(5, 3)은 크기 5이고 모든 원소가 3인 벡터를 생성합니다. size()=5, v[2]=3.",
    keyConceptTitle: "vector 생성자",
    keyConceptDescription: "vector<T>(n, val)은 n개의 원소를 val로 초기화합니다. vector<T>(n)은 0으로 초기화합니다.",
    relatedTopics: ["vector 초기화", "생성자", "fill"],
  },
  {
    id: 90,
    lessonId: "cpp-21",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int matrix[2][3] = {{1,2,3}, {4,5,6}};
    int sum = 0;
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 3; j++)
            sum += matrix[i][j];
    cout << sum;
    return 0;
}`,
    options: ["15", "21", "6", "12"],
    correctAnswer: 1,
    explanation: "1+2+3+4+5+6 = 21. 2×3 행렬의 모든 원소의 합입니다.",
    keyConceptTitle: "2차원 배열 순회",
    keyConceptDescription: "2차원 배열은 이중 for문으로 순회합니다. matrix[행][열] 순서로 접근합니다.",
    relatedTopics: ["2차원 배열", "이중 for문", "행렬"],
  },
  {
    id: 92,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    for (int i = 0; i < 5; i++)
        v.push_back(i * i);
    for (int i = v.size() - 1; i >= 0; i--)
        cout << v[i] << " ";
    return 0;
}`,
    options: ["0 1 4 9 16", "16 9 4 1 0", "0 1 2 3 4", "4 3 2 1 0"],
    correctAnswer: 1,
    explanation: "v = {0,1,4,9,16}. 역순으로 출력하면 16 9 4 1 0입니다.",
    keyConceptTitle: "벡터 역순 순회",
    keyConceptDescription: "인덱스를 size()-1부터 0까지 감소시키면 역순으로 순회할 수 있습니다.",
    relatedTopics: ["역순 순회", "vector", "인덱스"],
  },
  {
    id: 93,
    lessonId: "cpp-9",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {};
    for (int i = 0; i < 5; i++)
        cout << arr[i] << " ";
    return 0;
}`,
    options: ["쓰레기 값 5개", "0 0 0 0 0", "1 1 1 1 1", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "int arr[5] = {}는 모든 원소를 0으로 초기화합니다. 빈 중괄호는 값 초기화(value initialization)입니다.",
    keyConceptTitle: "배열 값 초기화",
    keyConceptDescription: "int arr[5] = {}는 모든 원소를 0으로 초기화합니다. 초기화 없이 선언하면 쓰레기 값이 들어갑니다.",
    codeComparison: {
      wrong: `int arr[5];  // 쓰레기 값!`,
      correct: `int arr[5] = {};  // 모두 0으로 초기화`,
    },
    relatedTopics: ["배열 초기화", "값 초기화", "쓰레기 값"],
  },
  {
    id: 97,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3};
    v.push_back(4);
    cout << v.size() << " " << v.back();
    return 0;
}`,
    options: ["3 3", "4 4", "4 3", "3 4"],
    correctAnswer: 1,
    explanation: "push_back(4) 후 v = {1,2,3,4}. size()=4, back()=4 (마지막 요소)",
    keyConceptTitle: "vector 기본 연산",
    keyConceptDescription: "vector는 동적 배열입니다. push_back()으로 추가, size()로 크기 확인, back()으로 마지막 요소 접근.",
    relatedTopics: ["vector", "동적 배열", "STL 컨테이너"],
  },
  {
    id: 459,
    lessonId: "cpp-9",
    difficulty: "쉬움",
    question: "정수 배열 arr[3]에 사용자로부터 값 3개를 입력받으려 한다. 빈칸에 들어갈 올바른 코드는?",
    code: `int arr[3];
for (int i = 0; i < 3; i++) {
    ______________;
}`,
    options: ["cin >> arr[i]", "cout << arr[i]", "arr[i] = input()", "scanf(arr[i])"],
    correctAnswer: 0,
    explanation: "cin >> arr[i]로 배열의 각 칸에 차례로 값을 입력받아요. cout은 출력, cin은 입력!",
    keyConceptTitle: "배열에 cin 입력",
    keyConceptDescription: "for 루프 + cin >> arr[i] 패턴으로 배열을 채울 수 있습니다. 배열 크기만큼 반복합니다.",
    relatedTopics: ["cin", "배열", "for 루프"],
  },
  {
    id: 460,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30};
    v.push_back(40);
    cout << v.front() << " " << v.back();
    return 0;
}`,
    options: ["10 30", "10 40", "20 40", "에러"],
    correctAnswer: 1,
    explanation: "push_back(40) 후 v = {10,20,30,40}. front()=10(첫 번째), back()=40(마지막)!",
    keyConceptTitle: "vector front() / back()",
    keyConceptDescription: "front()는 첫 번째 원소, back()은 마지막 원소를 반환합니다. 파이썬의 v[0] / v[-1]에 해당해요.",
    relatedTopics: ["front", "back", "vector"],
  },
  {
    id: 461,
    lessonId: "cpp-9",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3};
    v.clear();
    cout << v.empty();
    return 0;
}`,
    options: ["1", "0", "에러", "3"],
    correctAnswer: 0,
    explanation: "clear()로 모든 원소를 삭제하면 vector가 비어요. empty()는 비어있으면 1(true), 아니면 0(false).",
    keyConceptTitle: "vector empty() / clear()",
    keyConceptDescription: "clear()는 모든 원소 삭제, empty()는 비어있는지 확인. 파이썬의 v.clear() / not v에 대응.",
    relatedTopics: ["empty", "clear", "vector"],
  },
  {
    id: 462,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {5, 10, 15, 20};
    int sum = 0;
    for (int i = 0; i < v.size(); i++) {
        sum += v[i];
    }
    cout << sum;
    return 0;
}`,
    options: ["15", "40", "50", "에러"],
    correctAnswer: 2,
    explanation: "v.size()=4이므로 i는 0~3. 5+10+15+20 = 50!",
    keyConceptTitle: "vector for 루프 순회",
    keyConceptDescription: "for (int i = 0; i < v.size(); i++) 패턴으로 vector를 순회합니다. 배열 순회와 동일하고, v.size()가 크기 역할을 합니다.",
    relatedTopics: ["for 루프", "vector", "순회"],
  },
  {
    id: 463,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "v[i]와 v.at(i)의 차이점으로 올바른 것은?",
    code: `vector<int> v = {1, 2, 3};

v[10];      // ← A
v.at(10);   // ← B`,
    options: [
      "A와 B 모두 에러를 발생시킨다",
      "A는 쓰레기값, B는 범위 초과 에러",
      "A는 에러, B는 쓰레기값",
      "A와 B 모두 쓰레기값",
    ],
    correctAnswer: 1,
    explanation: "v[i]는 범위를 벗어나도 에러 없이 쓰레기값! v.at(i)는 범위를 벗어나면 out_of_range 에러를 발생시켜요.",
    keyConceptTitle: "v[i] vs v.at(i)",
    keyConceptDescription: "v[i]는 빠르지만 범위 체크 없음. v.at(i)는 느리지만 범위를 벗어나면 예외를 던집니다. 파이썬의 IndexError처럼요.",
    codeComparison: {
      wrong: `v[100];  // ❌ 에러 없이 쓰레기값`,
      correct: `v.at(100);  // ✅ out_of_range 에러 발생`,
    },
    relatedTopics: ["at", "범위 체크", "안전한 접근"],
  },
  {
    id: 99,
    lessonId: "cpp-10",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40};
    int sum = 0;
    for (int x : v) {
        sum += x;
    }
    cout << sum;
    return 0;
}`,
    options: ["10", "40", "100", "컴파일 오류"],
    correctAnswer: 2,
    explanation: "range-based for문은 컨테이너의 모든 요소를 순회합니다. 10 + 20 + 30 + 40 = 100",
    keyConceptTitle: "range-based for (범위 기반 반복문)",
    keyConceptDescription: "for (타입 변수 : 컨테이너)는 컨테이너의 모든 요소를 순서대로 순회합니다. 인덱스가 불필요할 때 간결합니다.",
    codeComparison: {
      wrong: `for (int i = 0; i < v.size(); i++)
    sum += v[i];  // 인덱스 기반 (길다)`,
      correct: `for (int x : v)
    sum += x;  // 범위 기반 (간결)`,
    },
    relatedTopics: ["range-based for", "for문", "auto"],
  },
  {
    id: 100,
    lessonId: "cpp-10",
    difficulty: "보통",
    question: "다음 코드 실행 후 v[0]의 값은?",
    code: `vector<int> v = {10, 20, 30};
for (int x : v) x = x * 2;
cout << v[0];`,
    options: ["10", "20", "30", "에러"],
    correctAnswer: 0,
    explanation: "for (int x : v)에서 x는 복사본입니다. x = x * 2로 복사본을 바꿔도 원본 v[0]은 그대로 10입니다.",
    keyConceptTitle: "range-for 복사본",
    keyConceptDescription: "for (int x : v)는 각 원소의 복사본을 x에 담습니다. x를 아무리 수정해도 원본 벡터는 변경되지 않습니다.",
    relatedTopics: ["range-for", "auto", "복사본"],
  },
  {
    id: 101,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    cout << s.length() << endl;
    return 0;
}`,
    options: ["4", "5", "6", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "\"Hello\"는 5글자이므로 s.length()는 5를 반환합니다.",
    keyConceptTitle: "string::length()",
    keyConceptDescription: "C++의 string 클래스는 length() 또는 size() 메서드로 문자열 길이를 반환합니다.",
    relatedTopics: ["string 메서드", "substr()", "find()"],
  },
  {
    id: 102,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "abcdef";
    cout << s.substr(2, 3);
    return 0;
}`,
    options: ["abc", "bcd", "cde", "cd"],
    correctAnswer: 2,
    explanation: "substr(2, 3)은 인덱스 2부터 3글자를 추출합니다. s[2]='c', s[3]='d', s[4]='e'이므로 'cde'가 출력됩니다.",
    keyConceptTitle: "string::substr()",
    keyConceptDescription: "substr(시작위치, 길이)로 부분 문자열을 추출합니다. 시작위치는 0부터 시작합니다.",
    relatedTopics: ["string", "substr", "인덱싱"],
  },
  {
    id: 103,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello World";
    int pos = s.find("World");
    cout << pos;
    return 0;
}`,
    options: ["5", "6", "1", "-1"],
    correctAnswer: 1,
    explanation: "'World'는 인덱스 6에서 시작합니다. (H=0, e=1, l=2, l=3, o=4, 공백=5, W=6)",
    keyConceptTitle: "string::find()",
    keyConceptDescription: "find()는 부분 문자열의 시작 위치를 반환합니다. 찾지 못하면 string::npos를 반환합니다.",
    relatedTopics: ["string 검색", "npos", "find"],
  },
  {
    id: 104,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    s += " World";
    cout << s.at(5);
    return 0;
}`,
    options: ["W", " ", "o", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "s = \"Hello World\"에서 s.at(5)는 인덱스 5의 문자, 즉 공백(' ')을 반환합니다.",
    keyConceptTitle: "string::at()과 문자열 결합",
    keyConceptDescription: "at(i)는 i번째 문자를 반환하며 범위 체크를 합니다. += 로 문자열을 이어붙일 수 있습니다.",
    codeComparison: {
      wrong: `s[100]  // 범위 초과해도 에러 안 남 (위험!)`,
      correct: `s.at(100)  // 범위 초과 시 예외 발생 (안전)`,
    },
    relatedTopics: ["at()", "[]", "문자열 연결"],
  },
  {
    id: 105,
    lessonId: "cpp-11",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    char c = 'a';
    c = c - 32;
    cout << c << endl;
    return 0;
}`,
    options: ["a", "A", "33", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "소문자 'a'(97)에서 32를 빼면 65가 되어 대문자 'A'가 됩니다. 소문자와 대문자의 ASCII 차이는 항상 32입니다.",
    keyConceptTitle: "ASCII 연산으로 대소문자 변환",
    keyConceptDescription: "대문자 = 소문자 - 32, 소문자 = 대문자 + 32. 또는 toupper(), tolower() 함수를 사용할 수 있습니다.",
    codeComparison: {
      wrong: `char c = 'a';
c = c + 32;  // 소문자에 32를 더하면 엉뚱한 문자`,
      correct: `char c = 'a';
c = c - 32;  // 'A' (대문자 변환)`,
    },
    relatedTopics: ["ASCII", "toupper", "tolower"],
  },
  {
    id: 106,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello World";
    cout << s.substr(6, 5);
    return 0;
}`,
    options: ["Hello", "World", "Hello World", " World"],
    correctAnswer: 1,
    explanation: "substr(6, 5)은 인덱스 6부터 5글자를 반환합니다. 'W'(6), 'o'(7), 'r'(8), 'l'(9), 'd'(10) → \"World\"",
    keyConceptTitle: "substr(pos, len)",
    keyConceptDescription: "substr(pos, len)은 pos 위치부터 len글자를 잘라서 반환합니다. 파이썬의 s[pos:pos+len]과 같아요.",
    relatedTopics: ["string", "substr", "문자열"],
  },
  {
    id: 109,
    lessonId: "cpp-4",
    difficulty: "보통",
    question: "입력이 \"Hello World\"일 때, cin >> s와 getline(cin, s)의 차이로 올바른 설명은?",
    code: ``,
    options: ["cin >>는 공백에서 멈춰 \"Hello\"만 읽고, getline은 줄 전체 \"Hello World\"를 읽는다", "cin >>는 \"Hello World\" 전체를, getline은 \"Hello\"만 읽는다", "둘 다 \"Hello World\" 전체를 읽는다", "둘 다 \"Hello\"만 읽는다"],
    correctAnswer: 0,
    explanation: "cin >>는 공백(스페이스, 탭, 엔터)을 만나면 멈춰요. 'Hello World' 입력 시 'Hello'만 읽어요. getline은 엔터 전까지 한 줄 전체를 읽으므로 'Hello World' 전체를 읽어요.",
    keyConceptTitle: "getline vs cin >>",
    keyConceptDescription: "cin >>는 공백/탭/줄바꿈에서 멈추고, getline(cin, s)은 줄 전체를 읽습니다. 공백 포함 입력이 필요하면 getline을 사용하세요.",
    codeComparison: {
      wrong: `cin >> s;  // "Hello World" 입력 시 "Hello"만 읽음`,
      correct: `getline(cin, s);  // "Hello World" 전체를 읽음`,
    },
    relatedTopics: ["getline", "cin", "문자열 입력"],
  },
  {
    id: 114,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    string s;
    cout << "빈 문자열 크기: " << s.size() << " ";
    cout << "비었나: " << s.empty();
    return 0;
}`,
    options: ["빈 문자열 크기: 0 비었나: 1", "빈 문자열 크기: 0 비었나: 0", "빈 문자열 크기: 1 비었나: 1", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "기본 생성된 string은 빈 문자열입니다. size()=0, empty()=true(1)입니다.",
    keyConceptTitle: "빈 문자열 확인",
    keyConceptDescription: "string의 empty()는 문자열이 비어있으면 true를 반환합니다. size() == 0과 동일합니다.",
    relatedTopics: ["empty()", "size()", "기본 생성자"],
  },
  {
    id: 115,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello, World!";
    int pos = s.find("World");
    cout << pos;
    return 0;
}`,
    options: ["5", "6", "7", "-1"],
    correctAnswer: 2,
    explanation: "\"World\"는 인덱스 7에서 시작합니다. H(0)e(1)l(2)l(3)o(4),(5) (6)W(7).",
    keyConceptTitle: "string::find",
    keyConceptDescription: "find()는 부분 문자열의 시작 위치를 반환합니다. 찾지 못하면 string::npos를 반환합니다.",
    relatedTopics: ["find", "npos", "문자열 검색"],
  },
  {
    id: 117,
    lessonId: "cpp-11",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    string s = "Hello";
    for (int i = 0; i < s.length(); i++)
        cout << s[i];
    return 0;
}`,
    options: ["Hello", "H", "o", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "string의 각 문자를 인덱스로 접근하여 하나씩 출력합니다. H, e, l, l, o → Hello.",
    keyConceptTitle: "string 인덱싱",
    keyConceptDescription: "string은 배열처럼 s[i]로 각 문자에 접근할 수 있습니다. 인덱스는 0부터 시작합니다.",
    relatedTopics: ["string", "인덱싱", "반복문"],
  },
  {
    id: 118,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    string t = s;
    t[0] = 'J';
    cout << s << " " << t;
    return 0;
}`,
    options: ["Jello Jello", "Hello Jello", "Hello Hello", "Jello Hello"],
    correctAnswer: 1,
    explanation: "string은 깊은 복사가 됩니다. t = s는 독립적인 복사본을 만듭니다. t를 변경해도 s는 그대로입니다.",
    keyConceptTitle: "string의 깊은 복사",
    keyConceptDescription: "C++의 string은 대입 시 깊은 복사가 이루어집니다. 원본과 복사본은 독립적입니다.",
    relatedTopics: ["깊은 복사", "string", "값 의미론"],
  },
  {
    id: 120,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello World";
    int count = 0;
    for (char c : s) {
        if (c >= 'a' && c <= 'z') count++;
    }
    cout << count;
    return 0;
}`,
    options: ["10", "8", "11", "9"],
    correctAnswer: 1,
    explanation: "소문자만 셉니다. 'H'와 'W'는 대문자, 공백은 문자가 아니므로 제외. ello + orld = 8개입니다.",
    keyConceptTitle: "문자 분류와 범위 for",
    keyConceptDescription: "c >= 'a' && c <= 'z'로 소문자를 판별합니다. 범위 기반 for (for(char c : s))는 각 문자를 순회합니다.",
    relatedTopics: ["범위 for", "문자 분류", "islower"],
  },
  {
    id: 121,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    for (char& c : s) {
        c = toupper(c);
    }
    cout << s;
    return 0;
}`,
    options: ["Hello", "HELLO", "hello", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "range-based for에서 char&로 참조를 받아 각 문자를 toupper()로 대문자로 변환합니다. 원본 문자열이 수정됩니다.",
    keyConceptTitle: "range-based for에서 참조 사용",
    keyConceptDescription: "for (char& c : s)에서 &를 사용하면 원본을 직접 수정할 수 있습니다. &가 없으면 복사본이 수정되어 원본에 반영되지 않습니다.",
    codeComparison: {
      wrong: `for (char c : s) c = toupper(c);
// 복사본만 변경, 원본 s는 그대로!`,
      correct: `for (char& c : s) c = toupper(c);
// 참조로 원본 s가 직접 수정됨!`,
    },
    relatedTopics: ["range-based for", "참조", "toupper"],
  },
  {
    id: 122,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "다음 코드에서 범위 기반 for문의 &는 무엇을 의미하는가?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3};
    for (int& x : v) x *= 2;
    for (int x : v) cout << x << " ";
    return 0;
}`,
    options: ["2 4 6", "1 2 3", "1 4 9", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "int&로 참조를 사용하면 원본 벡터의 값이 변경됩니다. 각 원소가 2배가 되어 2 4 6이 출력됩니다.",
    keyConceptTitle: "범위 for에서 참조",
    keyConceptDescription: "for(auto& x : v)는 원본을 수정할 수 있습니다. &가 없으면 복사본이라 원본이 변하지 않습니다.",
    codeComparison: {
      wrong: `for (int x : v) x *= 2;  // 복사본 수정, 원본 불변`,
      correct: `for (int& x : v) x *= 2;  // 원본 수정`,
    },
    relatedTopics: ["범위 for", "참조", "vector 수정"],
  },
  {
    id: 123,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "다음 코드에서 swap 함수 호출 후 a와 b의 값은?",
    code: `#include <iostream>
using namespace std;

void swap(int &x, int &y) {
    int temp = x;
    x = y;
    y = temp;
}

int main() {
    int a = 5, b = 10;
    swap(a, b);
    cout << a << " " << b;
}`,
    options: ["5 10", "10 5", "10 10", "5 5"],
    correctAnswer: 1,
    explanation: "매개변수에 &(참조)를 사용하면 원본 변수가 직접 변경됩니다. swap 후 a=10, b=5",
    keyConceptTitle: "참조에 의한 전달 (Pass by Reference)",
    keyConceptDescription: "& 기호를 사용하면 함수가 원본 변수를 직접 수정할 수 있습니다. & 없이는 복사본만 변경됩니다.",
    codeComparison: {
      wrong: `void swap(int x, int y)  // 값에 의한 전달
// 원본 변경 안 됨!`,
      correct: `void swap(int &x, int &y)  // 참조에 의한 전달
// 원본 변경됨!`,
    },
    relatedTopics: ["값에 의한 전달", "포인터", "함수 매개변수"],
  },
  {
    id: 131,
    lessonId: "cpp-12",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 42;
    int& ref = a;
    ref = 100;
    cout << a;
    return 0;
}`,
    options: ["42", "100", "0", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "ref는 a의 참조(별명)입니다. ref를 변경하면 a도 변경됩니다. 따라서 a = 100이 됩니다.",
    keyConceptTitle: "참조 변수",
    keyConceptDescription: "int& ref = a는 a의 별명을 만듭니다. ref와 a는 같은 메모리를 공유합니다.",
    relatedTopics: ["참조", "별명", "포인터와의 차이"],
  },
  {
    id: 156,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int age;
    Student(string n, int a) : name(n), age(a) {}
};

int main() {
    Student s("Kim", 15);
    cout << s.name << " " << s.age;
    return 0;
}`,
    options: ["Kim 15", "Kim15", "컴파일 오류", "0 0"],
    correctAnswer: 0,
    explanation: "생성자로 name과 age를 초기화합니다. s.name은 \"Kim\", s.age는 15이므로 \"Kim 15\"가 출력됩니다.",
    keyConceptTitle: "클래스와 생성자",
    keyConceptDescription: "class로 관련 데이터를 하나의 타입으로 묶고, 생성자로 초기값을 설정합니다. public 멤버는 .으로 접근합니다.",
    relatedTopics: ["class", "생성자", "멤버 접근"],
  },
  {
    id: 157,
    lessonId: "cpp-8",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int add(int a, int b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }

int main() {
    cout << add(1, 2) << " " << add(1, 2, 3);
    return 0;
}`,
    options: ["3 6", "컴파일 오류: 같은 이름의 함수", "3 3", "6 6"],
    correctAnswer: 0,
    explanation: "함수 오버로딩으로 매개변수 개수가 다른 같은 이름의 함수를 정의할 수 있습니다. add(1,2)=3, add(1,2,3)=6입니다.",
    keyConceptTitle: "함수 오버로딩 (Function Overloading)",
    keyConceptDescription: "C++에서는 매개변수의 타입이나 개수가 다르면 같은 이름의 함수를 여러 개 정의할 수 있습니다.",
    relatedTopics: ["함수 오버로딩", "매개변수", "다형성"],
  },
  {
    id: 158,
    lessonId: "cpp-11",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    s += " World";
    cout << s;
    return 0;
}`,
    options: ["Hello", "World", "Hello World", "컴파일 오류"],
    correctAnswer: 2,
    explanation: "string의 += 연산자는 문자열을 뒤에 이어붙입니다. \"Hello\" + \" World\" = \"Hello World\"",
    keyConceptTitle: "string 연결",
    keyConceptDescription: "+= 또는 + 연산자로 string을 이어붙일 수 있습니다. append() 메서드도 사용 가능합니다.",
    relatedTopics: ["string 연결", "append", "연산자 오버로딩"],
  },
  {
    id: 160,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Dog {
public:
    string name;
    Dog(string n) : name(n) {}
    void bark() { cout << name << ": 멍멍!"; }
};

int main() {
    Dog d("바둑이");
    d.bark();
    return 0;
}`,
    options: ["멍멍!", "바둑이", "바둑이: 멍멍!", "컴파일 오류"],
    correctAnswer: 2,
    explanation: "Dog 객체 d의 name이 \"바둑이\"이므로 bark()에서 \"바둑이: 멍멍!\"이 출력됩니다.",
    keyConceptTitle: "클래스와 객체",
    keyConceptDescription: "클래스는 데이터(멤버 변수)와 동작(메서드)을 하나로 묶는 설계도입니다. 객체는 클래스의 인스턴스입니다.",
    relatedTopics: ["클래스", "객체", "생성자"],
    animationKey: "cppClassBuilder",
  },
  {
    id: 161,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Counter {
    int count;
public:
    Counter() : count(0) {}
    void increment() { count++; }
    int getCount() { return count; }
};

int main() {
    Counter c;
    c.increment();
    c.increment();
    c.increment();
    cout << c.getCount();
    return 0;
}`,
    options: ["0", "1", "3", "컴파일 오류"],
    correctAnswer: 2,
    explanation: "Counter의 count는 0으로 초기화됩니다. increment()를 3번 호출하면 count=3이 됩니다.",
    keyConceptTitle: "캡슐화",
    keyConceptDescription: "count는 private이므로 외부에서 직접 접근할 수 없습니다. public 메서드를 통해서만 접근합니다.",
    relatedTopics: ["캡슐화", "private", "getter"],
    animationKey: "cppClassBuilder",
  },
  {
    id: 163,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Rectangle {
    int w, h;
public:
    Rectangle(int w, int h) : w(w), h(h) {}
    int area() { return w * h; }
    bool operator==(const Rectangle& r) {
        return w == r.w && h == r.h;
    }
};

int main() {
    Rectangle a(3, 4), b(3, 4), c(4, 3);
    cout << (a == b) << " " << (a == c);
    return 0;
}`,
    options: ["1 1", "0 0", "1 0", "0 1"],
    correctAnswer: 2,
    explanation: "a와 b는 w=3, h=4로 같아서 true(1). a와 c는 w와 h가 다르므로 false(0)입니다.",
    keyConceptTitle: "연산자 오버로딩",
    keyConceptDescription: "operator==를 정의하면 객체를 == 연산자로 비교할 수 있습니다. 직접 비교 로직을 구현합니다.",
    relatedTopics: ["연산자 오버로딩", "==", "비교 연산"],
  },
  {
    id: 164,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Point {
public:
    int x, y;
    Point(int x, int y) : x(x), y(y) {}
    Point operator+(const Point& p) const {
        return Point(x + p.x, y + p.y);
    }
};

int main() {
    Point a(1, 2), b(3, 4);
    Point c = a + b;
    cout << c.x << " " << c.y;
    return 0;
}`,
    options: ["1 2", "3 4", "4 6", "13 24"],
    correctAnswer: 2,
    explanation: "operator+가 x끼리, y끼리 더합니다. (1+3, 2+4) = (4, 6).",
    keyConceptTitle: "산술 연산자 오버로딩",
    keyConceptDescription: "operator+를 정의하면 사용자 정의 타입도 + 연산자를 사용할 수 있습니다.",
    relatedTopics: ["연산자 오버로딩", "Point 클래스", "벡터 연산"],
  },
  {
    id: 166,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    string getName() { return name; }
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    void speak() { cout << name << " says 멍멍"; }
};

int main() {
    Dog d("바둑이");
    d.speak();
    return 0;
}`,
    options: ["바둑이", "바둑이 says 멍멍", "멍멍", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "Dog은 Animal을 상속받아 protected 멤버 name에 접근 가능합니다. speak()에서 name을 사용합니다.",
    keyConceptTitle: "상속과 protected",
    keyConceptDescription: "protected 멤버는 해당 클래스와 자식 클래스에서 접근 가능합니다. 외부에서는 접근 불가.",
    relatedTopics: ["상속", "protected", "접근 제어"],
  },
  {
    id: 167,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Vector2D {
public:
    double x, y;
    Vector2D(double x, double y) : x(x), y(y) {}
    
    friend ostream& operator<<(ostream& os, const Vector2D& v) {
        os << "(" << v.x << ", " << v.y << ")";
        return os;
    }
};

int main() {
    Vector2D v(3.0, 4.0);
    cout << v;
    return 0;
}`,
    options: ["3.0 4.0", "(3, 4)", "Vector2D", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "friend operator<<를 정의하면 cout << 객체 형태로 사용자 정의 출력이 가능합니다.",
    keyConceptTitle: "출력 연산자 오버로딩",
    keyConceptDescription: "friend ostream& operator<<를 정의하면 cout으로 사용자 정의 클래스를 출력할 수 있습니다.",
    relatedTopics: ["operator<<", "friend", "출력 오버로딩"],
  },
  {
    id: 168,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Box {
    static int count;
public:
    Box() { count++; }
    ~Box() { count--; }
    static int getCount() { return count; }
};
int Box::count = 0;

int main() {
    Box a, b, c;
    cout << Box::getCount() << " ";
    {
        Box d, e;
        cout << Box::getCount() << " ";
    }
    cout << Box::getCount();
    return 0;
}`,
    options: ["3 5 3", "3 5 5", "3 2 0", "1 2 3"],
    correctAnswer: 0,
    explanation: "a,b,c 생성 후 count=3. 블록 내 d,e 생성 후 count=5. 블록 종료 시 d,e 소멸되어 count=3.",
    keyConceptTitle: "static 멤버 변수",
    keyConceptDescription: "static 멤버는 클래스의 모든 객체가 공유합니다. 객체 수를 추적하는 데 자주 사용됩니다.",
    relatedTopics: ["static 멤버", "객체 카운팅", "소멸자"],
  },
  {
    id: 170,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드에서 const 메서드의 의미는?",
    code: `#include <iostream>
using namespace std;

class Circle {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() const {
        // r = 10;  // 오류!
        return 3.14 * r * r;
    }
};

int main() {
    const Circle c(5);
    cout << c.area();
    return 0;
}`,
    options: ["함수가 반환값을 변경할 수 없다", "함수 내에서 멤버 변수를 변경할 수 없다", "함수를 한 번만 호출할 수 있다", "함수가 예외를 던지지 않는다"],
    correctAnswer: 1,
    explanation: "const 메서드는 멤버 변수를 변경할 수 없습니다. const 객체에서 호출 가능합니다.",
    keyConceptTitle: "const 멤버 함수",
    keyConceptDescription: "함수 뒤에 const를 붙이면 그 함수 내에서 멤버 변수를 수정할 수 없습니다. const 객체에서 호출 가능합니다.",
    relatedTopics: ["const 메서드", "불변성", "const 객체"],
  },
  {
    id: 171,
    lessonId: "cpp-6",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int grade = 2;
    switch (grade) {
        case 1: cout << "A"; break;
        case 2: cout << "B"; break;
        case 3: cout << "C"; break;
        default: cout << "F";
    }
    return 0;
}`,
    options: ["A", "B", "C", "F"],
    correctAnswer: 1,
    explanation: "grade = 2이므로 case 2:에 해당하는 'B'가 출력됩니다. break가 있으므로 다음 case로 넘어가지 않습니다.",
    keyConceptTitle: "switch/case — 정수 분기",
    keyConceptDescription: "switch문은 정수 값에 따라 다른 case를 실행합니다. break가 없으면 다음 case로 흘러내립니다(fall-through).",
    relatedTopics: ["switch", "case", "break", "default"],
  },
  {
    id: 172,
    lessonId: "cpp-14",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

struct Point {
    int x, y;
};

int main() {
    Point p = {3, 4};
    Point* ptr = &p;
    cout << ptr->x << " " << ptr->y;
    return 0;
}`,
    options: ["3 4", "4 3", "주소값", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "ptr->x는 (*ptr).x와 같습니다. 포인터를 통해 구조체 멤버에 접근할 때 -> 연산자를 사용합니다.",
    keyConceptTitle: "-> 화살표 연산자",
    keyConceptDescription: "ptr->member는 (*ptr).member의 축약입니다. 포인터를 통해 구조체/클래스 멤버에 접근합니다.",
    relatedTopics: ["->", "구조체 포인터", "멤버 접근"],
  },
  {
    id: 173,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

class Person {
    string name;
    int age;
public:
    Person(string n, int a) : name(n), age(a) {}
    Person(string n) : Person(n, 0) {}  // 위임 생성자
    void info() { cout << name << "(" << age << ")"; }
};

int main() {
    Person p("아기");
    p.info();
    return 0;
}`,
    options: ["아기(0)", "아기()", "아기", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "위임 생성자 Person(string n)은 Person(n, 0)을 호출합니다. age의 기본값은 0입니다.",
    keyConceptTitle: "위임 생성자",
    keyConceptDescription: "C++11부터 한 생성자가 같은 클래스의 다른 생성자를 호출할 수 있습니다. 코드 중복을 줄여줍니다.",
    relatedTopics: ["위임 생성자", "C++11", "생성자 체이닝"],
  },
  {
    id: 177,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Point {
public:
    int x, y;
    Point(int x, int y) : x(x), y(y) {}
    Point(const Point& other) {
        x = other.x + 1;
        y = other.y + 1;
    }
};

int main() {
    Point p1(3, 5);
    Point p2 = p1;
    cout << p2.x << " " << p2.y;
    return 0;
}`,
    options: ["3 5", "4 6", "0 0", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "Point p2 = p1은 복사 생성자를 호출합니다. 복사 생성자에서 x+1, y+1 하므로 p2는 (4, 6)이 됩니다.",
    keyConceptTitle: "복사 생성자 (Copy Constructor)",
    keyConceptDescription: "복사 생성자는 같은 타입의 객체로 새 객체를 초기화할 때 호출됩니다. 기본 복사 생성자는 얕은 복사를 수행합니다.",
    relatedTopics: ["복사 생성자", "얕은 복사", "깊은 복사"],
  },
  {
    id: 182,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class MyClass {
    int value;
public:
    MyClass(int v) : value(v) {}
    MyClass& setValue(int v) {
        this->value = v;
        return *this;
    }
    void print() { cout << value; }
};

int main() {
    MyClass obj(10);
    obj.setValue(20).print();
    return 0;
}`,
    options: ["10", "20", "컴파일 오류", "0"],
    correctAnswer: 1,
    explanation: "this->value = 20으로 값을 설정하고, return *this로 자기 자신을 반환하여 체이닝이 가능합니다. print()는 20을 출력합니다.",
    keyConceptTitle: "this 포인터",
    keyConceptDescription: "this는 현재 객체를 가리키는 포인터입니다. 멤버 변수와 매개변수 이름이 같을 때 구분하거나, 메서드 체이닝에 사용됩니다.",
    relatedTopics: ["this", "메서드 체이닝", "포인터"],
  },
  {
    id: 183,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Secret {
    int code;
public:
    Secret(int c) : code(c) {}
    friend void reveal(const Secret& s);
};

void reveal(const Secret& s) {
    cout << s.code;
}

int main() {
    Secret s(42);
    reveal(s);
    return 0;
}`,
    options: ["42", "0", "컴파일 오류: code는 private", "컴파일 오류: friend 문법 오류"],
    correctAnswer: 0,
    explanation: "friend 함수는 클래스의 private 멤버에 접근할 수 있습니다. reveal()이 friend로 선언되어 s.code(42)에 접근 가능합니다.",
    keyConceptTitle: "friend 함수",
    keyConceptDescription: "friend로 선언된 함수는 클래스의 private/protected 멤버에 접근할 수 있습니다. 캡슐화를 깨므로 신중하게 사용해야 합니다.",
    relatedTopics: ["friend", "캡슐화", "접근 제어"],
  },
  {
    id: 189,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드에서 상속의 접근 지정자에 따른 차이는?",
    code: `class Base {
public:
    int a;
protected:
    int b;
private:
    int c;
};

class Derived : public Base {
    void test() {
        a = 1;  // 1번
        b = 2;  // 2번
        c = 3;  // 3번
    }
};`,
    options: ["1, 2, 3번 모두 접근 가능", "1, 2번만 접근 가능, 3번 오류", "1번만 접근 가능", "모두 접근 불가"],
    correctAnswer: 1,
    explanation: "public 상속 시 public과 protected 멤버는 자식에서 접근 가능합니다. private 멤버(c)는 기본 클래스 내부에서만 접근 가능합니다.",
    keyConceptTitle: "상속에서의 접근 제어",
    keyConceptDescription: "public 상속: public→public, protected→protected. private 멤버는 어떤 상속에서도 자식이 직접 접근할 수 없습니다.",
    relatedTopics: ["상속", "접근 제어", "public/protected/private"],
  },
  {
    id: 192,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    Base() { cout << "B"; }
    ~Base() { cout << "~B"; }
};

class Derived : public Base {
public:
    Derived() { cout << "D"; }
    ~Derived() { cout << "~D"; }
};

int main() {
    Derived d;
    return 0;
}`,
    options: ["BD~D~B", "DB~B~D", "BD~B~D", "DB~D~B"],
    correctAnswer: 0,
    explanation: "생성 순서: 부모(B)→자식(D). 소멸 순서: 자식(~D)→부모(~B). 생성과 소멸은 반대 순서입니다.",
    keyConceptTitle: "생성자/소멸자 호출 순서",
    keyConceptDescription: "상속에서 생성자는 부모→자식 순서, 소멸자는 자식→부모 순서로 호출됩니다.",
    relatedTopics: ["생성자", "소멸자", "상속 순서"],
  },
  {
    id: 193,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Shape {
public:
    virtual double area() = 0;
    virtual ~Shape() {}
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() override { return 3.14 * r * r; }
};

int main() {
    // Shape s;  // 가능할까?
    Circle c(5);
    Shape* p = &c;
    cout << p->area();
    return 0;
}`,
    options: ["78.5", "25", "0", "컴파일 오류 (Shape 인스턴스 불가)"],
    correctAnswer: 0,
    explanation: "Shape는 순수 가상 함수(= 0)가 있어 추상 클래스이지만, Circle은 area()를 구현했으므로 인스턴스 생성 가능. 3.14*25=78.5.",
    keyConceptTitle: "순수 가상 함수와 추상 클래스",
    keyConceptDescription: "= 0인 가상 함수를 가진 클래스는 추상 클래스로 직접 인스턴스화할 수 없습니다. 파생 클래스에서 반드시 구현해야 합니다.",
    relatedTopics: ["추상 클래스", "순수 가상 함수", "인터페이스"],
  },
  {
    id: 196,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    void show() { cout << "Base "; }
    virtual void display() { cout << "Base-V "; }
};

class Derived : public Base {
public:
    void show() { cout << "Derived "; }
    void display() override { cout << "Derived-V "; }
};

int main() {
    Base* p = new Derived();
    p->show();
    p->display();
    delete p;
    return 0;
}`,
    options: ["Derived Derived-V", "Base Derived-V", "Base Base-V", "Derived Base-V"],
    correctAnswer: 1,
    explanation: "show()는 non-virtual이므로 포인터 타입(Base)의 것이 호출됩니다. display()는 virtual이므로 실제 타입(Derived)의 것이 호출됩니다.",
    keyConceptTitle: "virtual vs non-virtual",
    keyConceptDescription: "virtual 함수만 다형성(런타임 바인딩)이 적용됩니다. non-virtual은 포인터/참조 타입에 따라 결정됩니다.",
    relatedTopics: ["virtual", "정적 바인딩", "동적 바인딩"],
  },
  {
    id: 199,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    virtual void greet() { cout << "안녕 "; }
};

class A : public Base {
public:
    void greet() override { cout << "A "; }
};

class B : public Base {
public:
    void greet() override { cout << "B "; }
};

void callGreet(Base& b) {
    b.greet();
}

int main() {
    A a; B b; Base base;
    callGreet(a);
    callGreet(b);
    callGreet(base);
    return 0;
}`,
    options: ["안녕 안녕 안녕", "A B 안녕", "A B Base", "안녕 A B"],
    correctAnswer: 1,
    explanation: "virtual 함수이므로 참조를 통해서도 실제 타입의 greet()가 호출됩니다. A, B, Base 순서.",
    keyConceptTitle: "참조를 통한 다형성",
    keyConceptDescription: "포인터뿐 아니라 참조(Base&)를 통해서도 virtual 함수의 다형성이 적용됩니다.",
    relatedTopics: ["참조 다형성", "virtual", "동적 바인딩"],
  },
  {
    id: 202,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    void foo() { cout << "Base::foo "; bar(); }
    virtual void bar() { cout << "Base::bar "; }
};

class Derived : public Base {
public:
    void bar() override { cout << "Derived::bar "; }
};

int main() {
    Derived d;
    d.foo();
    return 0;
}`,
    options: ["Base::foo Base::bar", "Base::foo Derived::bar", "Derived::bar Base::foo", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "foo()는 Base에서 정의되지만, 내부에서 호출하는 bar()는 virtual이므로 Derived::bar()가 호출됩니다.",
    keyConceptTitle: "virtual 함수의 내부 호출",
    keyConceptDescription: "non-virtual 함수 내에서 virtual 함수를 호출하면, 실제 객체 타입의 virtual 함수가 호출됩니다.",
    relatedTopics: ["virtual", "동적 바인딩", "상속"],
  },
  {
    id: 204,
    lessonId: "cpp-15",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <utility>
using namespace std;

int main() {
    pair<string, int> p = {"apple", 3};
    cout << p.first << " " << p.second;
    return 0;
}`,
    options: ["apple 3", "3 apple", "apple apple", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "pair는 두 값을 묶어 저장합니다. first는 첫 번째 값(\"apple\"), second는 두 번째 값(3)을 접근합니다.",
    keyConceptTitle: "pair",
    keyConceptDescription: "pair<타입1, 타입2>는 두 개의 값을 하나로 묶습니다. first와 second로 각 값에 접근합니다. make_pair()로도 생성 가능합니다.",
    relatedTopics: ["pair", "tuple", "STL"],
  },
  {
    id: 205,
    lessonId: "cpp-15",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <tuple>
using namespace std;

int main() {
    tuple<int, string, double> t = {1, "hello", 3.14};
    cout << get<1>(t) << " " << get<2>(t);
    return 0;
}`,
    options: ["1 hello", "hello 3.14", "1 3.14", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "get<1>(t)는 두 번째 요소 \"hello\", get<2>(t)는 세 번째 요소 3.14를 반환합니다. 인덱스는 0부터 시작합니다.",
    keyConceptTitle: "tuple",
    keyConceptDescription: "tuple은 서로 다른 타입의 여러 값을 묶을 수 있습니다. get<인덱스>(tuple)로 각 요소에 접근합니다.",
    relatedTopics: ["tuple", "pair", "get", "structured binding"],
  },
  {
    id: 206,
    lessonId: "cpp-16",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, int> m;
    m["apple"] = 3;
    m["banana"] = 5;
    m["apple"] = 7;
    cout << m["apple"] << " " << m.size();
    return 0;
}`,
    options: ["3 3", "7 2", "3 2", "7 3"],
    correctAnswer: 1,
    explanation: "map에서 같은 키(\"apple\")에 다시 값을 넣으면 덮어씁니다. apple=7, banana=5로 size는 2입니다.",
    keyConceptTitle: "STL map",
    keyConceptDescription: "map은 키-값 쌍을 저장하는 컨테이너입니다. 키는 중복 불가이며, 같은 키에 대입하면 값이 갱신됩니다.",
    relatedTopics: ["map", "unordered_map", "STL 컨테이너"],
  },
  {
    id: 207,
    lessonId: "cpp-16",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> um;
    um["cat"] = 1;
    um["dog"] = 2;
    um["cat"] = 3;
    cout << um["cat"] << " " << um.count("bird");
    return 0;
}`,
    options: ["1 0", "3 0", "3 1", "1 1"],
    correctAnswer: 1,
    explanation: "같은 키 \"cat\"에 다시 대입하면 값이 덮어씌워져 3이 됩니다. count(\"bird\")는 해당 키가 없으므로 0입니다.",
    keyConceptTitle: "unordered_map",
    keyConceptDescription: "unordered_map은 해시 테이블 기반으로 평균 O(1)에 삽입/검색합니다. map과 달리 키가 정렬되지 않습니다.",
    codeComparison: {
      wrong: `map<string, int> m;     // 정렬됨, O(log N)`,
      correct: `unordered_map<string, int> um;  // 비정렬, O(1) 평균`,
    },
    relatedTopics: ["unordered_map", "해시맵", "map과 차이"],
  },
  {
    id: 208,
    lessonId: "cpp-16",
    difficulty: "보통",
    question: "다음 코드에서 auto&를 사용한 map 순회의 출력 결과는?",
    code: `#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, int> m = {{"a", 1}, {"b", 2}, {"c", 3}};
    for (auto& p : m) {
        p.second *= 10;
    }
    cout << m["b"];
    return 0;
}`,
    options: ["2", "20", "10", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "auto& p로 map의 각 pair를 참조로 받으면 p.second를 수정할 때 원본 map이 변경됩니다. m[\"b\"]의 원래 값 2가 10배인 20이 됩니다.",
    keyConceptTitle: "auto&로 map 값 수정",
    keyConceptDescription: "map을 range-for로 순회할 때 auto& p를 쓰면 p.first(키), p.second(값)에 접근해 원본을 수정할 수 있습니다.",
    relatedTopics: ["map", "auto", "range-for", "참조"],
  },
  {
    id: 209,
    lessonId: "cpp-16",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> s;
    s.insert(3);
    s.insert(1);
    s.insert(3);
    s.insert(2);
    cout << s.size();
    return 0;
}`,
    options: ["4", "3", "2", "1"],
    correctAnswer: 1,
    explanation: "set은 중복을 허용하지 않습니다. 3이 두 번 삽입되었지만 하나만 저장되어 {1,2,3}으로 크기는 3입니다.",
    keyConceptTitle: "set의 중복 제거",
    keyConceptDescription: "set은 중복 원소를 허용하지 않고 자동 정렬됩니다. 중복을 허용하려면 multiset을 사용합니다.",
    relatedTopics: ["set", "multiset", "중복 제거"],
  },
  {
    id: 210,
    lessonId: "cpp-16",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> ages;
    ages["철수"] = 15;
    ages["영희"] = 14;
    ages["민수"] = 16;
    
    if (ages.count("영희"))
        cout << "영희: " << ages["영희"];
    else
        cout << "없음";
    return 0;
}`,
    options: ["없음", "영희: 14", "영희: 0", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "ages에 \"영희\"가 존재하므로 count()=1(true). ages[\"영희\"]=14가 출력됩니다.",
    keyConceptTitle: "unordered_map 사용법",
    keyConceptDescription: "unordered_map은 해시 기반으로 O(1) 평균 탐색이 가능합니다. count()로 키 존재 여부를 확인합니다.",
    relatedTopics: ["unordered_map", "해시맵", "count"],
  },
  {
    id: 211,
    lessonId: "cpp-16",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> s = {5, 3, 8, 1, 3, 5};
    for (int x : s)
        cout << x << " ";
    return 0;
}`,
    options: ["5 3 8 1 3 5 ", "1 3 5 8 ", "1 3 3 5 5 8 ", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "set은 중복을 제거하고 자동으로 오름차순 정렬합니다. {5,3,8,1,3,5} → {1,3,5,8}이 되어 '1 3 5 8 '이 출력됩니다.",
    keyConceptTitle: "set의 자동 정렬과 중복 제거",
    keyConceptDescription: "set을 순회하면 항상 오름차순으로 원소가 나옵니다. 중복 허용이 필요하면 multiset을 사용하세요.",
    relatedTopics: ["set", "정렬", "중복 제거", "순회"],
  },
  {
    id: 212,
    lessonId: "cpp-16",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, int> m;
    m["apple"] = 3;
    m["banana"] = 1;
    m["cherry"] = 2;
    for (auto& p : m)
        cout << p.first << " ";
    return 0;
}`,
    options: ["apple banana cherry", "banana cherry apple", "cherry banana apple", "apple cherry banana"],
    correctAnswer: 0,
    explanation: "map은 key를 기준으로 자동 정렬(오름차순)합니다. 알파벳 순으로 apple, banana, cherry가 출력됩니다.",
    keyConceptTitle: "map의 자동 정렬",
    keyConceptDescription: "map은 Red-Black Tree 기반으로 key가 항상 정렬되어 있습니다. 정렬이 필요없으면 unordered_map을 사용합니다.",
    relatedTopics: ["map", "unordered_map", "자동 정렬"],
  },
  {
    id: 213,
    lessonId: "cpp-16",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <map>
using namespace std;

int main() {
    string s = "abracadabra";
    map<char, int> freq;
    for (char c : s) freq[c]++;
    char maxChar = ' ';
    int maxFreq = 0;
    for (auto& p : freq) {
        if (p.second > maxFreq) {
            maxFreq = p.second;
            maxChar = p.first;
        }
    }
    cout << maxChar << ":" << maxFreq;
    return 0;
}`,
    options: ["a:5", "a:4", "b:2", "r:2"],
    correctAnswer: 0,
    explanation: "abracadabra에서 a는 5번(위치 0,3,5,7,10) 등장합니다. 가장 빈도가 높은 문자입니다.",
    keyConceptTitle: "빈도수 세기 (map)",
    keyConceptDescription: "map<char,int>로 각 문자의 등장 횟수를 셀 수 있습니다. freq[c]++는 c의 카운트를 증가시킵니다.",
    relatedTopics: ["빈도수", "map", "문자 카운팅"],
  },
  {
    id: 214,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end());
    cout << v[0] << " " << v[4];
    return 0;
}`,
    options: ["3 5", "1 5", "5 1", "1 4"],
    correctAnswer: 1,
    explanation: "sort()는 오름차순 정렬합니다. 정렬 후 v = {1,1,3,4,5}이므로 v[0]=1, v[4]=5입니다.",
    keyConceptTitle: "STL sort()",
    keyConceptDescription: "algorithm 헤더의 sort()는 기본적으로 오름차순 정렬합니다. O(N log N) 시간 복잡도를 가집니다.",
    relatedTopics: ["sort", "algorithm", "정렬"],
  },
  {
    id: 215,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 중 벡터에서 특정 위치에 요소를 삽입하는 올바른 방법은?",
    code: `vector<int> v = {1, 2, 3};
// v의 인덱스 1 위치에 10을 삽입하려면?`,
    options: ["v.insert(1, 10);", "v.insert(v.begin() + 1, 10);", "v.add(1, 10);", "v[1] = 10;"],
    correctAnswer: 1,
    explanation: "vector의 insert()는 반복자(iterator)를 사용합니다. v.begin() + 1은 두 번째 위치를 가리킵니다.",
    keyConceptTitle: "vector::insert()",
    keyConceptDescription: "insert(위치_반복자, 값)으로 원하는 위치에 요소를 삽입합니다. 기존 요소들은 뒤로 밀립니다.",
    codeComparison: {
      wrong: `v.insert(1, 10);  // 정수는 위치로 사용 불가`,
      correct: `v.insert(v.begin() + 1, 10);  // 반복자 사용`,
    },
    relatedTopics: ["iterator", "insert", "vector"],
  },
  {
    id: 216,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    vector<int>::iterator it = v.begin();
    it += 2;
    cout << *it << endl;
    return 0;
}`,
    options: ["10", "20", "30", "40"],
    correctAnswer: 2,
    explanation: "v.begin()은 첫 번째 요소를 가리킵니다. it += 2로 두 칸 이동하면 세 번째 요소(30)를 가리킵니다.",
    keyConceptTitle: "반복자 (Iterator)",
    keyConceptDescription: "반복자는 컨테이너의 요소를 가리키는 포인터와 유사한 객체입니다. *it로 값을 읽고, ++it로 다음 요소로 이동합니다.",
    relatedTopics: ["iterator", "begin", "end", "포인터"],
  },
  {
    id: 217,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    auto it = v.begin();
    cout << *it << " ";
    advance(it, 3);
    cout << *it;
    return 0;
}`,
    options: ["1 3", "1 4", "0 3", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "auto가 iterator 타입을 자동 추론합니다. advance(it, 3)으로 3칸 이동하면 4번째 요소(4)를 가리킵니다.",
    keyConceptTitle: "auto 키워드",
    keyConceptDescription: "auto는 컴파일러가 타입을 자동으로 추론합니다. 긴 타입(예: vector<int>::iterator)을 간결하게 작성할 수 있습니다.",
    codeComparison: {
      wrong: `vector<int>::iterator it = v.begin();  // 길다!`,
      correct: `auto it = v.begin();  // 자동 타입 추론`,
    },
    relatedTopics: ["auto", "타입 추론", "iterator"],
  },
  {
    id: 218,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9};
    int cnt = count(v.begin(), v.end(), 1);
    cout << cnt;
    return 0;
}`,
    options: ["1", "2", "3", "0"],
    correctAnswer: 1,
    explanation: "count()는 범위 내에서 특정 값의 개수를 셉니다. v에서 1은 2번 등장하므로 cnt=2입니다.",
    keyConceptTitle: "STL count()",
    keyConceptDescription: "count(시작, 끝, 값)은 [시작, 끝) 범위에서 값과 일치하는 요소의 개수를 반환합니다. O(N) 시간 복잡도.",
    relatedTopics: ["count", "algorithm", "STL"],
  },
  {
    id: 219,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 3, 1, 4, 2};
    auto it = min_element(v.begin(), v.end());
    cout << *it << " " << (it - v.begin());
    return 0;
}`,
    options: ["1 2", "1 0", "5 0", "2 4"],
    correctAnswer: 0,
    explanation: "min_element는 최소값의 반복자를 반환합니다. 최소값은 1(인덱스 2). *it=1, it-v.begin()=2",
    keyConceptTitle: "min_element / max_element",
    keyConceptDescription: "min_element()는 범위 내 최소값의 반복자를, max_element()는 최대값의 반복자를 반환합니다.",
    relatedTopics: ["min_element", "max_element", "iterator"],
  },
  {
    id: 220,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 2, 3, 3, 3, 4};
    v.erase(unique(v.begin(), v.end()), v.end());
    cout << v.size();
    return 0;
}`,
    options: ["4", "7", "3", "1"],
    correctAnswer: 0,
    explanation: "unique는 연속된 중복을 제거하고 새 끝 반복자를 반환합니다. erase로 나머지를 삭제하면 {1,2,3,4}로 size=4",
    keyConceptTitle: "unique + erase로 중복 제거",
    keyConceptDescription: "unique()는 정렬된 범위에서 연속 중복을 제거합니다. erase와 함께 사용하여 실제로 벡터를 축소합니다.",
    relatedTopics: ["unique", "erase", "중복 제거"],
  },
  {
    id: 222,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30};
    vector<int> v2(v.begin(), v.begin() + 2);
    cout << v2.size() << " " << v2[1];
    return 0;
}`,
    options: ["3 20", "2 20", "2 30", "3 30"],
    correctAnswer: 1,
    explanation: "v.begin()부터 v.begin()+2까지(미포함)의 요소로 v2를 생성합니다. v2 = {10, 20}, size=2, v2[1]=20",
    keyConceptTitle: "반복자 범위로 vector 생성",
    keyConceptDescription: "vector<int> v2(시작반복자, 끝반복자)로 다른 컨테이너의 부분 범위를 복사하여 새 벡터를 만들 수 있습니다.",
    relatedTopics: ["vector 생성자", "iterator", "부분 복사"],
  },
  {
    id: 223,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "abcdef";
    reverse(s.begin(), s.end());
    cout << s;
    return 0;
}`,
    options: ["abcdef", "fedcba", "abcfed", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "reverse()는 범위 내 요소의 순서를 뒤집습니다. \"abcdef\" → \"fedcba\"",
    keyConceptTitle: "reverse()",
    keyConceptDescription: "reverse(시작, 끝)은 범위 내 요소를 제자리에서 뒤집습니다. 문자열, 벡터 등에 모두 사용 가능합니다.",
    relatedTopics: ["reverse", "algorithm", "문자열 뒤집기"],
  },
  {
    id: 224,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드에서 fill()의 역할은?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v(5);
    fill(v.begin(), v.end(), 7);
    for (int x : v) cout << x << " ";
    return 0;
}`,
    options: ["0 0 0 0 0", "7 7 7 7 7", "7 0 0 0 0", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "fill(시작, 끝, 값)은 범위 내 모든 요소를 지정한 값으로 채웁니다. 모든 요소가 7이 됩니다.",
    keyConceptTitle: "fill()",
    keyConceptDescription: "fill(시작, 끝, 값)은 범위 내 모든 요소를 해당 값으로 설정합니다. memset보다 타입 안전합니다.",
    relatedTopics: ["fill", "algorithm", "초기화"],
  },
  {
    id: 225,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    bool found = binary_search(v.begin(), v.end(), 3);
    cout << (found ? "있음" : "없음");
    return 0;
}`,
    options: ["있음", "없음", "3", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "binary_search()는 정렬된 범위에서 값이 존재하면 true를 반환합니다. 3이 존재하므로 \"있음\"이 출력됩니다.",
    keyConceptTitle: "binary_search()",
    keyConceptDescription: "binary_search(시작, 끝, 값)은 정렬된 범위에서 값의 존재 여부를 bool로 반환합니다. 위치가 필요하면 lower_bound를 사용하세요.",
    relatedTopics: ["binary_search", "lower_bound", "이진 탐색"],
  },
  {
    id: 226,
    lessonId: "cpp-16",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> s = {5, 3, 1, 4, 2};
    auto it = s.begin();
    cout << *it << " ";
    advance(it, 2);
    cout << *it;
    return 0;
}`,
    options: ["5 1", "1 3", "3 1", "1 4"],
    correctAnswer: 1,
    explanation: "set은 자동 정렬됩니다: {1,2,3,4,5}. begin()은 1을 가리키고, advance(it,2)로 2칸 이동하면 3을 가리킵니다.",
    keyConceptTitle: "set의 자동 정렬과 반복자",
    keyConceptDescription: "set은 삽입 순서와 관계없이 오름차순 정렬됩니다. 반복자로 순회하면 정렬된 순서로 접근합니다.",
    relatedTopics: ["set", "정렬", "iterator"],
  },
  {
    id: 227,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9};
    sort(v.begin(), v.end());
    cout << v[0] << " " << v[4];
    return 0;
}`,
    options: ["5 9", "1 9", "9 1", "1 5"],
    correctAnswer: 1,
    explanation: "sort()는 기본적으로 오름차순 정렬합니다. 정렬 후 v = {1,2,5,8,9}이므로 v[0]=1, v[4]=9입니다.",
    keyConceptTitle: "STL sort",
    keyConceptDescription: "algorithm 헤더의 sort(begin, end)는 O(N log N) 정렬입니다. 기본은 오름차순입니다.",
    relatedTopics: ["sort", "algorithm", "비교 함수"],
  },
  {
    id: 228,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Student {
public:
    string name;
    int score;
    Student(string n, int s) : name(n), score(s) {}
    bool operator<(const Student& other) const {
        return score < other.score;
    }
};

int main() {
    Student a("철수", 90), b("영희", 85);
    cout << (a < b ? a.name : b.name);
    return 0;
}`,
    options: ["철수", "영희", "90", "85"],
    correctAnswer: 1,
    explanation: "a < b는 90 < 85로 false입니다. 삼항 연산자에서 false이면 b.name = \"영희\"가 출력됩니다.",
    keyConceptTitle: "비교 연산자 오버로딩",
    keyConceptDescription: "operator<를 정의하면 sort() 등에서 사용자 정의 타입을 정렬할 수 있습니다.",
    relatedTopics: ["operator<", "정렬", "사용자 정의 비교"],
  },
  {
    id: 230,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    cout << accumulate(v.begin(), v.end(), 0);
    return 0;
}`,
    options: ["10", "15", "5", "0"],
    correctAnswer: 1,
    explanation: "accumulate는 초기값 0에 모든 원소를 더합니다. 0+1+2+3+4+5 = 15.",
    keyConceptTitle: "accumulate 함수",
    keyConceptDescription: "numeric 헤더의 accumulate(begin, end, 초기값)은 범위의 합을 구합니다. 초기값부터 시작해서 더합니다.",
    relatedTopics: ["accumulate", "numeric", "합계"],
  },
  {
    id: 231,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s = "Hello World";
    transform(s.begin(), s.end(), s.begin(), ::toupper);
    cout << s;
    return 0;
}`,
    options: ["Hello World", "hello world", "HELLO WORLD", "hELLO wORLD"],
    correctAnswer: 2,
    explanation: "transform에 ::toupper를 전달하면 모든 문자를 대문자로 변환합니다.",
    keyConceptTitle: "transform으로 대문자 변환",
    keyConceptDescription: "transform(begin, end, dest, func)은 각 원소에 함수를 적용합니다. ::toupper로 대문자 변환.",
    relatedTopics: ["transform", "toupper", "algorithm"],
  },
  {
    id: 232,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    int cnt = count_if(v.begin(), v.end(), [](int x) {
        return x % 2 == 0;
    });
    cout << cnt;
    return 0;
}`,
    options: ["2", "3", "5", "0"],
    correctAnswer: 0,
    explanation: "count_if는 조건을 만족하는 원소의 개수를 셉니다. 짝수는 2, 4로 2개입니다.",
    keyConceptTitle: "count_if 알고리즘",
    keyConceptDescription: "count_if(begin, end, predicate)는 조건을 만족하는 원소 수를 반환합니다.",
    relatedTopics: ["count_if", "람다", "algorithm"],
  },
  {
    id: 234,
    lessonId: "cpp-23",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9};
    sort(v.begin(), v.end(), greater<int>());
    cout << v[0] << " " << v[5];
    return 0;
}`,
    options: ["1 9", "9 1", "3 9", "1 5"],
    correctAnswer: 1,
    explanation: "greater<int>()를 세 번째 인자로 넘기면 내림차순 정렬됩니다. {9,5,4,3,1,1}이므로 v[0]=9, v[5]=1입니다.",
    keyConceptTitle: "내림차순 정렬",
    keyConceptDescription: "sort()의 세 번째 인자에 greater<int>()를 넘기면 내림차순 정렬됩니다. 사용자 정의 비교 함수도 가능합니다.",
    codeComparison: {
      wrong: `sort(v.begin(), v.end());  // 오름차순`,
      correct: `sort(v.begin(), v.end(), greater<int>());  // 내림차순`,
    },
    relatedTopics: ["sort", "greater", "비교 함수"],
  },
  {
    id: 235,
    lessonId: "cpp-17",
    difficulty: "어려움",
    question: "N개의 원소가 있는 정렬된 배열에서 lower_bound의 시간 복잡도와 동작은?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 3, 3, 5, 7};
    auto it = lower_bound(v.begin(), v.end(), 3);
    cout << (it - v.begin());
    return 0;
}`,
    options: ["O(N) - 값 3을 순차 검색하여 마지막 위치 반환", "O(log N) - 값 3 이상인 첫 번째 위치의 인덱스 반환", "O(N log N) - 정렬 후 값 3의 위치 반환", "O(1) - 값 3의 개수를 반환"],
    correctAnswer: 1,
    explanation: "lower_bound는 이진 탐색으로 target 이상인 첫 번째 위치를 찾습니다. v에서 3 이상인 첫 위치는 인덱스 1이며, O(log N)입니다.",
    keyConceptTitle: "lower_bound / upper_bound",
    keyConceptDescription: "lower_bound는 target 이상, upper_bound는 target 초과인 첫 위치를 이진 탐색으로 찾습니다. 정렬된 컨테이너에서 사용합니다.",
    codeComparison: {
      wrong: `// 순차 탐색: O(N)
for (int i = 0; i < n; i++)
    if (v[i] >= 3) ...`,
      correct: `// 이진 탐색: O(log N)
auto it = lower_bound(v.begin(), v.end(), 3);`,
    },
    relatedTopics: ["lower_bound", "upper_bound", "이진 탐색", "STL"],
  },
  {
    id: 236,
    lessonId: "cpp-23",
    difficulty: "어려움",
    question: "다음 람다 함수 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end(), [](int a, int b) {
        return a > b;
    });
    cout << v[0] << " " << v[4];
    return 0;
}`,
    options: ["1 5", "5 1", "3 5", "1 3"],
    correctAnswer: 1,
    explanation: "람다 함수 [](int a, int b) { return a > b; }는 내림차순 비교 함수입니다. 정렬 후 {5,4,3,1,1}, v[0]=5, v[4]=1",
    keyConceptTitle: "람다 함수 (Lambda)",
    keyConceptDescription: "[캡처](매개변수) { 본문 } 형태의 익명 함수입니다. sort의 비교 함수 등에 간편하게 사용됩니다.",
    codeComparison: {
      wrong: `bool cmp(int a, int b) { return a > b; }
sort(v.begin(), v.end(), cmp);  // 별도 함수`,
      correct: `sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;
});  // 람다로 간결하게`,
    },
    relatedTopics: ["람다", "sort", "비교 함수"],
  },
  {
    id: 237,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 이진 탐색 코드에서 정렬된 배열 {1,3,5,7,9}에서 target=6일 때 반환값은?",
    code: `int binarySearch(vector<int>& v, int target) {
    int lo = 0, hi = v.size() - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (v[mid] == target) return mid;
        else if (v[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
    options: ["2", "3", "-1", "0"],
    correctAnswer: 2,
    explanation: "6은 배열에 존재하지 않습니다. lo > hi가 되면 while 루프가 종료되고 -1이 반환됩니다.",
    keyConceptTitle: "이진 탐색 실패 시 반환값",
    keyConceptDescription: "이진 탐색에서 target이 없으면 lo > hi가 되어 루프가 종료됩니다. 이때 lo는 target이 삽입될 위치를 나타냅니다.",
    relatedTopics: ["이진 탐색", "탐색 실패", "lower_bound"],
  },
  {
    id: 238,
    lessonId: "cpp-17",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    reverse(v.begin(), v.end());
    rotate(v.begin(), v.begin() + 2, v.end());
    for (int x : v) cout << x << " ";
    return 0;
}`,
    options: ["5 4 3 2 1", "3 2 1 5 4", "1 5 4 3 2", "4 3 2 1 5"],
    correctAnswer: 1,
    explanation: "reverse 후 {5,4,3,2,1}. rotate(begin, begin+2, end)는 begin+2를 새 시작으로 만들어 {3,2,1,5,4}.",
    keyConceptTitle: "rotate 알고리즘",
    keyConceptDescription: "rotate(first, middle, last)는 middle이 새로운 첫 원소가 되도록 회전합니다.",
    relatedTopics: ["rotate", "reverse", "algorithm"],
  },
  {
    id: 239,
    lessonId: "cpp-17",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s = "stressed";
    reverse(s.begin(), s.end());
    cout << s;
    return 0;
}`,
    options: ["stressed", "desserts", "stressde", "dessert"],
    correctAnswer: 1,
    explanation: "\"stressed\"를 뒤집으면 \"desserts\"가 됩니다. reverse()는 문자열도 뒤집을 수 있습니다.",
    keyConceptTitle: "string 뒤집기",
    keyConceptDescription: "reverse(s.begin(), s.end())로 문자열을 뒤집을 수 있습니다. 팰린드롬 판별에 활용됩니다.",
    relatedTopics: ["reverse", "팰린드롬", "string"],
  },
  {
    id: 240,
    lessonId: "cpp-17",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
    auto it = lower_bound(v.begin(), v.end(), 4);
    cout << "위치: " << (it - v.begin());
    return 0;
}`,
    options: ["위치: 2", "위치: 3", "위치: 4", "정의되지 않은 동작"],
    correctAnswer: 3,
    explanation: "lower_bound는 정렬된 범위에서만 올바르게 작동합니다. v가 정렬되지 않았으므로 결과가 정의되지 않습니다.",
    keyConceptTitle: "이진 탐색 전제조건",
    keyConceptDescription: "lower_bound, upper_bound, binary_search는 반드시 정렬된 범위에서 사용해야 합니다.",
    codeComparison: {
      wrong: `vector<int> v = {3, 1, 4};
lower_bound(v.begin(), v.end(), 4);  // 미정렬!`,
      correct: `sort(v.begin(), v.end());
lower_bound(v.begin(), v.end(), 4);  // 정렬 후 사용`,
    },
    relatedTopics: ["lower_bound", "이진 탐색", "정렬 전제조건"],
  },
  {
    id: 241,
    lessonId: "cpp-23",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 2, 3, 3, 3, 4};
    auto it = unique(v.begin(), v.end());
    v.erase(it, v.end());
    cout << v.size();
    return 0;
}`,
    options: ["7", "4", "3", "1"],
    correctAnswer: 1,
    explanation: "unique()는 연속된 중복을 제거하고 끝 iterator를 반환합니다. erase로 실제 삭제. {1,2,3,4}로 4개.",
    keyConceptTitle: "unique + erase 패턴",
    keyConceptDescription: "unique()는 연속 중복을 제거합니다. 정렬 후 사용하면 전체 중복을 제거할 수 있습니다.",
    relatedTopics: ["unique", "erase", "중복 제거"],
  },
  {
    id: 242,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& v, int target) {
    int lo = 0, hi = v.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] == target) return mid;
        else if (v[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> v = {2, 5, 8, 12, 16, 23, 38};
    cout << binarySearch(v, 16);
    return 0;
}`,
    options: ["3", "4", "5", "-1"],
    correctAnswer: 1,
    explanation: "v[4]=16이므로 인덱스 4를 반환합니다. lo+(hi-lo)/2로 오버플로우를 방지합니다.",
    keyConceptTitle: "이진 탐색 구현",
    keyConceptDescription: "정렬된 배열에서 O(log N)으로 탐색합니다. mid = lo + (hi-lo)/2는 (lo+hi)/2의 안전한 버전입니다.",
    relatedTopics: ["이진 탐색", "O(log N)", "오버플로우 방지"],
  },
  {
    id: 243,
    lessonId: "cpp-23",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {5, 3, 8, 1, 2};
    // 버블 소트
    for (int i = 0; i < v.size() - 1; i++)
        for (int j = 0; j < v.size() - 1 - i; j++)
            if (v[j] > v[j+1])
                swap(v[j], v[j+1]);
    for (int x : v) cout << x << " ";
    return 0;
}`,
    options: ["5 3 8 1 2", "1 2 3 5 8", "8 5 3 2 1", "2 1 3 5 8"],
    correctAnswer: 1,
    explanation: "버블 소트는 인접한 원소를 비교하여 오름차순으로 정렬합니다. 결과: 1 2 3 5 8.",
    keyConceptTitle: "버블 소트",
    keyConceptDescription: "인접한 두 원소를 비교하고 교환하는 O(N^2) 정렬 알고리즘입니다. 이해하기 쉽지만 느립니다.",
    relatedTopics: ["버블 소트", "정렬 알고리즘", "O(N^2)"],
  },
  {
    id: 244,
    lessonId: "cpp-17",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    auto it = partition(v.begin(), v.end(), [](int x) {
        return x % 2 == 0;
    });
    cout << "짝수 개수: " << (it - v.begin());
    return 0;
}`,
    options: ["짝수 개수: 5", "짝수 개수: 10", "짝수 개수: 0", "짝수 개수: 2"],
    correctAnswer: 0,
    explanation: "partition은 조건을 만족하는 원소를 앞쪽으로 모읍니다. 짝수 5개가 앞으로 이동하여 it - begin = 5.",
    keyConceptTitle: "partition 알고리즘",
    keyConceptDescription: "partition은 조건에 따라 원소를 분류합니다. 반환된 iterator 앞쪽이 조건을 만족하는 원소입니다.",
    relatedTopics: ["partition", "algorithm", "람다"],
  },
  {
    id: 246,
    lessonId: "cpp-18",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(30);
    pq.push(10);
    pq.push(50);
    pq.push(20);
    cout << pq.top();
    return 0;
}`,
    options: ["10", "20", "30", "50"],
    correctAnswer: 3,
    explanation: "priority_queue는 기본적으로 최대 힙입니다. 가장 큰 값 50이 top()에 위치합니다.",
    keyConceptTitle: "priority_queue (우선순위 큐)",
    keyConceptDescription: "priority_queue는 기본적으로 최대 힙(max-heap)으로, top()은 항상 가장 큰 값을 반환합니다. 최소 힙은 greater<int>를 사용합니다.",
    codeComparison: {
      wrong: `priority_queue<int> pq;  // 최대 힙
pq.top();  // 가장 큰 값`,
      correct: `priority_queue<int, vector<int>, greater<int>> pq;
pq.top();  // 가장 작은 값 (최소 힙)`,
    },
    relatedTopics: ["priority_queue", "힙", "최대 힙", "최소 힙"],
  },
  {
    id: 247,
    lessonId: "cpp-18",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_back(2);
    dq.push_front(1);
    dq.push_back(3);
    cout << dq.front() << " " << dq.back() << " " << dq.size();
    return 0;
}`,
    options: ["1 3 3", "2 3 3", "1 2 3", "3 1 3"],
    correctAnswer: 0,
    explanation: "deque는 양쪽 끝에서 삽입/삭제 가능합니다. push_front(1), push_back(2), push_back(3) → {1, 2, 3}. front=1, back=3, size=3",
    keyConceptTitle: "deque (덱, 양방향 큐)",
    keyConceptDescription: "deque는 양쪽 끝에서 O(1)에 삽입/삭제 가능한 자료구조입니다. push_front, push_back, pop_front, pop_back 모두 지원합니다.",
    relatedTopics: ["deque", "queue", "양방향 큐"],
  },
  {
    id: 250,
    lessonId: "cpp-18",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_back(2);
    dq.push_front(1);
    dq.push_back(3);
    dq.push_front(0);
    for (int x : dq) cout << x << " ";
    return 0;
}`,
    options: ["2 1 3 0", "0 1 2 3", "3 2 1 0", "0 2 1 3"],
    correctAnswer: 1,
    explanation: "push_back(2)→{2}, push_front(1)→{1,2}, push_back(3)→{1,2,3}, push_front(0)→{0,1,2,3}.",
    keyConceptTitle: "deque (양방향 큐)",
    keyConceptDescription: "deque는 앞뒤 모두에서 O(1) 삽입/삭제가 가능합니다. push_front/push_back, pop_front/pop_back.",
    relatedTopics: ["deque", "양방향 큐", "STL"],
  },
  {
    id: 251,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Box {
public:
    int size;
    Box(int s) : size(s) {
        cout << "생성:" << s << " ";
    }
    ~Box() {
        cout << "소멸:" << size << " ";
    }
};

int main() {
    Box b1(1);
    Box b2(2);
    return 0;
}`,
    options: ["생성:1 생성:2 소멸:1 소멸:2", "생성:1 생성:2 소멸:2 소멸:1", "생성:1 소멸:1 생성:2 소멸:2", "생성:2 생성:1 소멸:1 소멸:2"],
    correctAnswer: 1,
    explanation: "생성자는 선언 순서대로 호출(1→2), 소멸자는 역순으로 호출(2→1)됩니다. 스택의 LIFO 원리입니다.",
    keyConceptTitle: "생성자와 소멸자",
    keyConceptDescription: "생성자(Constructor)는 객체 생성 시, 소멸자(Destructor, ~클래스명)는 객체 소멸 시 자동 호출됩니다. 지역 변수는 역순으로 소멸합니다.",
    relatedTopics: ["생성자", "소멸자", "RAII", "스택"],
  },
  {
    id: 252,
    lessonId: "cpp-19",
    difficulty: "어려움",
    question: "다음 코드에서 파일에 쓰여지는 내용은?",
    code: `#include <fstream>
using namespace std;

int main() {
    ofstream fout("output.txt");
    fout << "Hello" << endl;
    fout << 42 << endl;
    fout.close();
    return 0;
}`,
    options: ["Hello42", "Hello\\n42", "Hello\n42", "컴파일 오류"],
    correctAnswer: 2,
    explanation: "ofstream으로 파일에 쓸 수 있습니다. endl로 줄바꿈이 들어가 Hello와 42가 각각 다른 줄에 쓰여집니다.",
    keyConceptTitle: "파일 출력 (ofstream)",
    keyConceptDescription: "ofstream은 파일에 데이터를 쓰는 스트림입니다. cout과 같은 방식(<<)으로 사용하며, 사용 후 close()로 닫아야 합니다.",
    relatedTopics: ["fstream", "ifstream", "파일 I/O"],
  },
  {
    id: 253,
    lessonId: "cpp-19",
    difficulty: "어려움",
    question: "경쟁 프로그래밍에서 빠른 입출력을 위해 사용하는 코드로 올바른 것은?",
    code: ``,
    options: ["cin.fast(); cout.fast();", "ios::sync_with_stdio(false); cin.tie(nullptr);", "scanf_fast(); printf_fast();", "#pragma fast_io"],
    correctAnswer: 1,
    explanation: "ios::sync_with_stdio(false)는 C/C++ 입출력 동기화를 끄고, cin.tie(nullptr)은 cin/cout의 묶음을 풉니다.",
    keyConceptTitle: "빠른 입출력 (Fast I/O)",
    keyConceptDescription: "경쟁 프로그래밍에서 cin/cout의 속도를 높이려면 sync_with_stdio(false)와 cin.tie(nullptr)을 사용합니다.",
    codeComparison: {
      wrong: `// 느린 입출력 (동기화 켜짐)
cin >> n;`,
      correct: `ios::sync_with_stdio(false);
cin.tie(nullptr);
cin >> n;  // 훨씬 빠름!`,
    },
    relatedTopics: ["빠른 I/O", "경쟁 프로그래밍", "sync_with_stdio"],
  },
  {
    id: 254,
    lessonId: "cpp-18",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    s.push(10);
    s.push(20);
    s.push(30);
    cout << s.top() << " ";
    s.pop();
    cout << s.top();
    return 0;
}`,
    options: ["10 20", "30 20", "30 10", "20 10"],
    correctAnswer: 1,
    explanation: "스택은 LIFO(후입선출)입니다. top()=30, pop()으로 30 제거 후 top()=20",
    keyConceptTitle: "stack 클래스",
    keyConceptDescription: "stack은 LIFO 자료구조입니다. push()로 삽입, top()으로 맨 위 확인, pop()으로 맨 위 제거합니다.",
    relatedTopics: ["stack", "LIFO", "DFS"],
  },
  {
    id: 255,
    lessonId: "cpp-18",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(10);
    q.push(20);
    q.push(30);
    cout << q.front() << " ";
    q.pop();
    cout << q.front();
    return 0;
}`,
    options: ["30 20", "10 20", "10 30", "30 10"],
    correctAnswer: 1,
    explanation: "큐는 FIFO(선입선출)입니다. front()=10, pop()으로 10 제거 후 front()=20",
    keyConceptTitle: "queue 클래스",
    keyConceptDescription: "queue는 FIFO 자료구조입니다. push()로 삽입, front()으로 맨 앞 확인, pop()으로 맨 앞 제거합니다.",
    codeComparison: {
      wrong: `stack: top() / pop()  // LIFO (후입선출)`,
      correct: `queue: front() / pop()  // FIFO (선입선출)`,
    },
    relatedTopics: ["queue", "FIFO", "BFS"],
  },
  {
    id: 257,
    lessonId: "cpp-23",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 2, 8, 1, 9};
    int n = 5;
    // Bubble Sort
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    cout << arr[0] << " " << arr[4];
    return 0;
}`,
    options: ["5 9", "1 9", "9 1", "2 8"],
    correctAnswer: 1,
    explanation: "버블 정렬 후 오름차순 정렬됩니다. {1,2,5,8,9}에서 arr[0]=1, arr[4]=9입니다.",
    keyConceptTitle: "버블 정렬 (Bubble Sort)",
    keyConceptDescription: "인접한 두 요소를 비교하여 교환하는 정렬입니다. 시간 복잡도는 O(N^2)으로, 느리지만 구현이 간단합니다.",
    relatedTopics: ["정렬 알고리즘", "시간 복잡도", "O(N^2)"],
  },
  {
    id: 258,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "이진 탐색(Binary Search)의 시간 복잡도는?",
    code: `// 정렬된 배열에서 값을 찾는 이진 탐색
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    options: ["O(N)", "O(N^2)", "O(log N)", "O(N log N)"],
    correctAnswer: 2,
    explanation: "이진 탐색은 매 단계에서 탐색 범위를 절반으로 줄이므로 O(log N)입니다.",
    keyConceptTitle: "이진 탐색 (Binary Search)",
    keyConceptDescription: "정렬된 배열에서만 사용 가능하며, 중간값과 비교하여 탐색 범위를 절반씩 줄입니다. O(log N) 시간 복잡도.",
    relatedTopics: ["이진 탐색", "시간 복잡도", "정렬된 배열"],
  },
  {
    id: 259,
    lessonId: "cpp-23",
    difficulty: "어려움",
    question: "선택 정렬(Selection Sort)의 동작 방식으로 올바른 것은?",
    code: `// Selection Sort 핵심 로직
for (int i = 0; i < n-1; i++) {
    int minIdx = i;
    for (int j = i+1; j < n; j++) {
        if (arr[j] < arr[minIdx])
            minIdx = j;
    }
    swap(arr[i], arr[minIdx]);
}`,
    options: ["인접한 두 요소를 비교하여 교환한다", "남은 요소 중 최소값을 찾아 앞쪽에 배치한다", "배열을 반으로 나누어 재귀적으로 정렬한다", "이미 정렬된 부분에 새 요소를 삽입한다"],
    correctAnswer: 1,
    explanation: "선택 정렬은 매 단계에서 남은 요소 중 최소값을 찾아 현재 위치에 배치합니다. 시간 복잡도는 O(N^2)입니다.",
    keyConceptTitle: "선택 정렬 (Selection Sort)",
    keyConceptDescription: "매 반복마다 최소값의 인덱스를 찾아 현재 위치와 교환합니다. O(N^2)이지만 교환 횟수가 적습니다.",
    relatedTopics: ["선택 정렬", "버블 정렬", "삽입 정렬"],
  },
  {
    id: 260,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 BFS 코드에서 빈칸에 들어갈 자료구조는?",
    code: `#include <iostream>
#include <vector>
#include <_______>
using namespace std;

void bfs(vector<vector<int>>& graph, int start) {
    vector<bool> visited(graph.size(), false);
    _______ <int> q;
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";
        for (int next : graph[node]) {
            if (!visited[next]) {
                visited[next] = true;
                q.push(next);
            }
        }
    }
}`,
    options: ["stack", "queue", "priority_queue", "deque"],
    correctAnswer: 1,
    explanation: "BFS(너비 우선 탐색)는 큐(queue)를 사용합니다. 가까운 노드부터 탐색하는 FIFO 방식입니다.",
    keyConceptTitle: "BFS와 큐",
    keyConceptDescription: "BFS는 큐를 사용하여 같은 깊이의 노드를 먼저 방문합니다. DFS는 스택(또는 재귀)을 사용합니다.",
    codeComparison: {
      wrong: `stack<int> s;  // DFS에 사용`,
      correct: `queue<int> q;  // BFS에 사용`,
    },
    relatedTopics: ["BFS", "DFS", "그래프 탐색", "큐"],
  },
  {
    id: 261,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 DFS 코드의 방문 순서로 올바른 것은? (인접 리스트가 오름차순 정렬된 경우)",
    code: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> graph = {
    {1, 2},    // 0번 노드 -> 1, 2
    {0, 3},    // 1번 노드 -> 0, 3
    {0, 3},    // 2번 노드 -> 0, 3
    {1, 2}     // 3번 노드 -> 1, 2
};
bool visited[4] = {false};

void dfs(int node) {
    visited[node] = true;
    cout << node << " ";
    for (int next : graph[node]) {
        if (!visited[next]) dfs(next);
    }
}

int main() { dfs(0); }`,
    options: ["0 1 2 3", "0 1 3 2", "0 2 3 1", "0 1 2"],
    correctAnswer: 1,
    explanation: "0에서 시작 -> 1 방문 -> 1의 이웃 중 3 방문 -> 3의 이웃 중 2 방문. 순서: 0 1 3 2",
    keyConceptTitle: "DFS (깊이 우선 탐색)",
    keyConceptDescription: "DFS는 한 방향으로 끝까지 탐색한 후 되돌아와 다른 방향을 탐색합니다. 재귀 또는 스택으로 구현합니다.",
    relatedTopics: ["DFS", "재귀", "그래프", "백트래킹"],
  },
  {
    id: 262,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 DP(동적 프로그래밍) 코드는 무엇을 계산하나요?",
    code: `#include <iostream>
using namespace std;

int main() {
    int n = 6;
    int dp[7];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    cout << dp[n];
    return 0;
}`,
    options: ["팩토리얼 (6!)", "피보나치 수열의 6번째 값", "1부터 6까지의 합", "2의 6제곱"],
    correctAnswer: 1,
    explanation: "dp[i] = dp[i-1] + dp[i-2]는 피보나치 수열의 점화식입니다. dp[6] = 8 (0,1,1,2,3,5,8)",
    keyConceptTitle: "동적 프로그래밍 (DP)",
    keyConceptDescription: "DP는 큰 문제를 작은 부분 문제로 나누어 풀고, 결과를 저장하여 중복 계산을 피하는 기법입니다.",
    relatedTopics: ["DP", "메모이제이션", "피보나치", "점화식"],
  },
  {
    id: 263,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "배낭 문제(Knapsack Problem)에서 DP 테이블 dp[i][w]의 의미는?",
    code: `// 0-1 Knapsack DP
for (int i = 1; i <= n; i++) {
    for (int w = 0; w <= W; w++) {
        if (weight[i] <= w) {
            dp[i][w] = max(dp[i-1][w],
                          dp[i-1][w-weight[i]] + value[i]);
        } else {
            dp[i][w] = dp[i-1][w];
        }
    }
}`,
    options: ["i번째 물건까지 고려했을 때 용량 w에서의 최대 가치", "i번째 물건의 무게가 w일 때의 최소 비용", "w개의 물건을 i번 선택했을 때의 총 가치", "i번째 물건을 w번 사용했을 때의 최대 가치"],
    correctAnswer: 0,
    explanation: "dp[i][w]는 처음 i개의 물건 중에서 선택하여 용량 w의 배낭에 넣을 수 있는 최대 가치를 의미합니다.",
    keyConceptTitle: "0-1 배낭 문제",
    keyConceptDescription: "각 물건을 넣거나 안 넣거나(0-1) 선택하여 주어진 용량에서 최대 가치를 구합니다. O(N*W) 시간 복잡도.",
    relatedTopics: ["DP", "배낭 문제", "최적화"],
  },
  {
    id: 264,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 그리디 알고리즘은 어떤 문제를 풀고 있나요?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> meetings(n);
    for (int i = 0; i < n; i++)
        cin >> meetings[i].second >> meetings[i].first;
    sort(meetings.begin(), meetings.end());
    int count = 0, last_end = 0;
    for (auto& m : meetings) {
        if (m.second >= last_end) {
            count++;
            last_end = m.first;
        }
    }
    cout << count;
}`,
    options: ["최소 신장 트리 (MST)", "회의실 배정 (Activity Selection)", "최단 경로", "위상 정렬"],
    correctAnswer: 1,
    explanation: "끝나는 시간 기준으로 정렬 후, 겹치지 않는 회의를 최대한 많이 선택하는 회의실 배정 문제입니다.",
    keyConceptTitle: "그리디 알고리즘 - 회의실 배정",
    keyConceptDescription: "그리디는 매 순간 최적의 선택을 합니다. 회의실 배정은 끝나는 시간 기준 정렬이 핵심입니다.",
    relatedTopics: ["그리디", "정렬", "Activity Selection"],
  },
  {
    id: 265,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 중 #include <bits/stdc++.h>에 대한 설명으로 올바른 것은?",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4};
    sort(v.begin(), v.end());
    cout << v[0];
    return 0;
}`,
    options: ["C++ 표준에 정의된 공식 헤더이다", "모든 표준 라이브러리를 한 번에 포함하는 비표준 헤더이다", "vector만 포함하는 전용 헤더이다", "컴파일 시간을 단축시키는 최적화 헤더이다"],
    correctAnswer: 1,
    explanation: "bits/stdc++.h는 GCC에서 제공하는 비표준 헤더로, 모든 표준 라이브러리를 한 번에 포함합니다. 대회에서 편리하지만 컴파일이 느려질 수 있습니다.",
    keyConceptTitle: "bits/stdc++.h",
    keyConceptDescription: "경쟁 프로그래밍에서 자주 사용되는 헤더로, 모든 표준 라이브러리를 포함합니다. GCC 전용이며 비표준입니다.",
    relatedTopics: ["경쟁 프로그래밍", "헤더 파일", "GCC"],
  },
  {
    id: 266,
    lessonId: "cpp-23",
    difficulty: "어려움",
    question: "다음 삽입 정렬에서 배열 {5, 2, 4, 1, 3}의 첫 번째 패스(i=1) 후 결과는?",
    code: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
}`,
    options: ["{1, 2, 4, 5, 3}", "{2, 5, 4, 1, 3}", "{5, 2, 4, 1, 3}", "{2, 4, 5, 1, 3}"],
    correctAnswer: 1,
    explanation: "첫 번째 패스(i=1): key=2, arr[0]=5 > 2이므로 5를 오른쪽으로 밀고 2를 앞에 삽입. 결과: {2, 5, 4, 1, 3}",
    keyConceptTitle: "삽입 정렬 (Insertion Sort)",
    keyConceptDescription: "현재 요소를 이미 정렬된 부분의 올바른 위치에 삽입합니다. 최선 O(N), 최악 O(N^2). 거의 정렬된 배열에서 효율적입니다.",
    relatedTopics: ["삽입 정렬", "시간 복잡도", "정렬 알고리즘"],
  },
  {
    id: 267,
    lessonId: "cpp-23",
    difficulty: "어려움",
    question: "합병 정렬(Merge Sort)의 시간 복잡도와 특징으로 올바른 것은?",
    code: `// Merge Sort 개념
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}`,
    options: ["O(N^2), 제자리 정렬", "O(N log N), 추가 메모리 O(N) 필요", "O(N log N), 추가 메모리 불필요", "O(N), 분할 정복"],
    correctAnswer: 1,
    explanation: "합병 정렬은 분할 정복으로 항상 O(N log N)이지만, 합병 과정에서 추가 배열(O(N) 메모리)이 필요합니다.",
    keyConceptTitle: "합병 정렬 (Merge Sort)",
    keyConceptDescription: "분할 정복 알고리즘으로 항상 O(N log N)을 보장합니다. 안정 정렬이지만 O(N) 추가 메모리가 필요합니다.",
    relatedTopics: ["합병 정렬", "분할 정복", "안정 정렬"],
  },
  {
    id: 268,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 중 시간 복잡도가 가장 큰 것은?",
    code: `// A: O(log N)  - 이진 탐색
// B: O(N)      - 선형 탐색
// C: O(N log N) - 합병 정렬
// D: O(N^2)    - 버블 정렬`,
    options: ["O(log N)", "O(N)", "O(N log N)", "O(N^2)"],
    correctAnswer: 3,
    explanation: "N이 커질수록: O(log N) < O(N) < O(N log N) < O(N^2). N=1000이면 O(N^2)=1,000,000으로 가장 큽니다.",
    keyConceptTitle: "시간 복잡도 비교",
    keyConceptDescription: "O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!) 순서로 증가합니다.",
    relatedTopics: ["시간 복잡도", "빅오 표기법", "알고리즘 분석"],
  },
  {
    id: 269,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 투 포인터 코드는 무엇을 수행하나요?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 6, 8, 9};
    int target = 10;
    int left = 0, right = v.size() - 1;
    while (left < right) {
        int sum = v[left] + v[right];
        if (sum == target) {
            cout << v[left] << " " << v[right];
            break;
        } else if (sum < target) left++;
        else right--;
    }
    return 0;
}`,
    options: ["배열에서 최대/최소값 찾기", "정렬된 배열에서 합이 target인 두 수 찾기", "배열의 중앙값 찾기", "이진 탐색으로 target 찾기"],
    correctAnswer: 1,
    explanation: "양쪽 끝에서 시작하는 투 포인터로, 합이 작으면 left++, 크면 right--하여 합이 target인 쌍을 O(N)에 찾습니다.",
    keyConceptTitle: "투 포인터 (Two Pointer)",
    keyConceptDescription: "정렬된 배열에서 두 포인터를 양쪽 끝에서 좁혀가며 조건을 만족하는 쌍을 O(N)에 찾는 기법입니다.",
    relatedTopics: ["투 포인터", "정렬", "two sum"],
  },
  {
    id: 270,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 슬라이딩 윈도우 코드에서 크기 3인 윈도우의 최대 합은?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {2, 1, 5, 1, 3, 2};
    int k = 3;
    int maxSum = 0, windowSum = 0;
    for (int i = 0; i < k; i++)
        windowSum += v[i];
    maxSum = windowSum;
    for (int i = k; i < (int)v.size(); i++) {
        windowSum += v[i] - v[i - k];
        maxSum = max(maxSum, windowSum);
    }
    cout << maxSum;
    return 0;
}`,
    options: ["8", "9", "11", "6"],
    correctAnswer: 1,
    explanation: "크기 3인 윈도우의 합: {2,1,5}=8, {1,5,1}=7, {5,1,3}=9, {1,3,2}=6. 최대값은 9입니다.",
    keyConceptTitle: "슬라이딩 윈도우 (Sliding Window)",
    keyConceptDescription: "고정 크기 윈도우를 한 칸씩 이동하며, 새로 들어온 요소를 더하고 나간 요소를 빼서 O(N)에 부분합을 계산합니다.",
    relatedTopics: ["슬라이딩 윈도우", "부분합", "최적화"],
  },
  {
    id: 271,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 백트래킹 코드는 N=3일 때 무엇을 출력하나요?",
    code: `#include <iostream>
#include <vector>
using namespace std;

void solve(int n, int depth, vector<int>& path, vector<bool>& used) {
    if (depth == n) {
        for (int x : path) cout << x;
        cout << " ";
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {
            used[i] = true;
            path.push_back(i);
            solve(n, depth + 1, path, used);
            path.pop_back();
            used[i] = false;
        }
    }
}

int main() {
    int n = 3;
    vector<int> path;
    vector<bool> used(n + 1, false);
    solve(n, 0, path, used);
}`,
    options: ["123", "111 222 333", "123 132 213 231 312 321", "12 13 21 23 31 32"],
    correctAnswer: 2,
    explanation: "이 코드는 1~N의 모든 순열을 생성합니다. N=3이면 3!=6개의 순열이 출력됩니다.",
    keyConceptTitle: "백트래킹으로 순열 생성",
    keyConceptDescription: "백트래킹은 해를 탐색하다 조건에 맞지 않으면 되돌아가는 기법입니다. 순열 생성에서 used 배열로 중복 사용을 방지합니다.",
    relatedTopics: ["백트래킹", "순열", "재귀", "DFS"],
  },
  {
    id: 272,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "N개에서 R개를 고르는 조합의 재귀식으로 올바른 것은?",
    code: `int C(int n, int r) {
    if (r == 0 || r == n) return 1;
    return ______;
}
// C(5, 2) = 10`,
    options: ["C(n-1, r) + C(n-1, r-1)", "C(n-1, r) * C(n-1, r-1)", "C(n, r-1) + C(n-1, r)", "n * C(n-1, r-1)"],
    correctAnswer: 0,
    explanation: "파스칼의 삼각형: C(n,r) = C(n-1,r) + C(n-1,r-1). n번째 원소를 포함하는 경우와 안 하는 경우의 합입니다.",
    keyConceptTitle: "조합 (Combination) 재귀",
    keyConceptDescription: "C(n,r) = C(n-1,r) + C(n-1,r-1)은 파스칼의 항등식입니다. 메모이제이션과 함께 사용하면 효율적입니다.",
    relatedTopics: ["조합", "파스칼의 삼각형", "재귀", "DP"],
  },
  {
    id: 273,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "그래프를 인접 행렬과 인접 리스트로 표현할 때의 차이로 올바른 것은?",
    code: `// 인접 행렬
int adj[N][N];  // adj[i][j] = 1이면 간선 존재

// 인접 리스트
vector<vector<int>> adj(N);  // adj[i] = i에서 갈 수 있는 노드들`,
    options: ["인접 행렬은 O(V), 인접 리스트는 O(V^2) 공간 사용", "인접 행렬은 O(V^2) 공간, 인접 리스트는 O(V+E) 공간 사용", "둘 다 O(V^2) 공간 사용", "인접 리스트가 항상 더 느리다"],
    correctAnswer: 1,
    explanation: "인접 행렬은 V×V 배열로 O(V^2), 인접 리스트는 노드+간선 수만큼 O(V+E) 공간을 사용합니다. 희소 그래프에서는 인접 리스트가 효율적입니다.",
    keyConceptTitle: "그래프 표현: 인접 행렬 vs 인접 리스트",
    keyConceptDescription: "인접 행렬: 간선 존재 여부를 O(1)에 확인, O(V^2) 공간. 인접 리스트: O(V+E) 공간, 희소 그래프에 적합.",
    relatedTopics: ["그래프", "인접 행렬", "인접 리스트", "BFS/DFS"],
  },
  {
    id: 274,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 유니온 파인드 코드에서 find 함수의 역할은?",
    code: `int parent[1001];

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

void unite(int a, int b) {
    a = find(a);
    b = find(b);
    if (a != b) parent[a] = b;
}`,
    options: ["x의 부모 노드만 반환한다", "x가 속한 집합의 루트(대표 원소)를 반환하며 경로를 압축한다", "x의 자식 노드 개수를 반환한다", "x를 새로운 집합에 추가한다"],
    correctAnswer: 1,
    explanation: "find(x)는 루트를 찾으면서 parent[x] = find(parent[x])로 경로 압축을 수행하여 이후 탐색을 O(1)에 가깝게 만듭니다.",
    keyConceptTitle: "유니온 파인드 (Union-Find / DSU)",
    keyConceptDescription: "서로소 집합을 관리하는 자료구조입니다. find로 대표 원소를 찾고, unite로 두 집합을 합칩니다. 경로 압축으로 거의 O(1)에 동작합니다.",
    relatedTopics: ["유니온 파인드", "DSU", "경로 압축", "그래프"],
  },
  {
    id: 275,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 prefix sum (누적 합) 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {1, 3, 5, 7, 9};
    vector<int> prefix(6, 0);
    for (int i = 0; i < 5; i++)
        prefix[i+1] = prefix[i] + arr[i];
    // 구간 [1, 3]의 합 (인덱스 1부터 3까지)
    cout << prefix[4] - prefix[1];
    return 0;
}`,
    options: ["15", "16", "9", "12"],
    correctAnswer: 0,
    explanation: "prefix = {0,1,4,9,16,25}. 구간 [1,3]의 합 = prefix[4] - prefix[1] = 16 - 1 = 15 (3+5+7)",
    keyConceptTitle: "누적 합 (Prefix Sum)",
    keyConceptDescription: "prefix[i] = arr[0]+...+arr[i-1]. 구간 [l,r]의 합 = prefix[r+1] - prefix[l]. 전처리 O(N), 쿼리 O(1).",
    codeComparison: {
      wrong: `// 매번 반복으로 구간 합: O(N) per query
int sum = 0;
for (int i = l; i <= r; i++) sum += arr[i];`,
      correct: `// 누적 합으로 구간 합: O(1) per query
int sum = prefix[r+1] - prefix[l];`,
    },
    relatedTopics: ["누적 합", "prefix sum", "구간 합", "USACO"],
  },
  {
    id: 276,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드는 어떤 알고리즘 기법을 사용하나요?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int maxProfit(vector<int>& prices) {
    int minPrice = prices[0];
    int maxProfit = 0;
    for (int i = 1; i < prices.size(); i++) {
        minPrice = min(minPrice, prices[i]);
        maxProfit = max(maxProfit, prices[i] - minPrice);
    }
    return maxProfit;
}

int main() {
    vector<int> prices = {7, 1, 5, 3, 6, 4};
    cout << maxProfit(prices);  // 출력: 5
    return 0;
}`,
    options: ["브루트 포스", "분할 정복", "그리디 (탐욕법)", "동적 프로그래밍"],
    correctAnswer: 2,
    explanation: "지금까지의 최소 가격을 추적하며 매 시점에서 최대 이익을 갱신하는 그리디 접근입니다. O(N)에 해결됩니다.",
    keyConceptTitle: "그리디 알고리즘 활용",
    keyConceptDescription: "그리디는 매 순간 최적의 선택을 하여 전체 최적해를 구합니다. 항상 최적해를 보장하지는 않으므로 증명이 필요합니다.",
    relatedTopics: ["그리디", "주식 문제", "최적화"],
  },
  {
    id: 277,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 재귀 함수는 무엇을 계산하나요?",
    code: `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    cout << gcd(12, 8);
    return 0;
}`,
    options: ["96", "4", "2", "24"],
    correctAnswer: 1,
    explanation: "유클리드 알고리즘으로 최대공약수(GCD)를 구합니다. gcd(12,8) → gcd(8,4) → gcd(4,0) → 4",
    keyConceptTitle: "유클리드 알고리즘 (GCD)",
    keyConceptDescription: "gcd(a,b) = gcd(b, a%b), b=0이면 a가 최대공약수. 재귀적으로 O(log(min(a,b)))에 계산됩니다.",
    relatedTopics: ["GCD", "유클리드 알고리즘", "재귀", "LCM"],
  },
  {
    id: 278,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드에서 N=4일 때 재귀 호출 횟수(fib 함수 호출 총 횟수)는?",
    code: `#include <iostream>
using namespace std;

int callCount = 0;

int fib(int n) {
    callCount++;
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}

int main() {
    fib(4);
    cout << callCount;
    return 0;
}`,
    options: ["4", "5", "7", "9"],
    correctAnswer: 3,
    explanation: "fib(4)→fib(3)+fib(2), fib(3)→fib(2)+fib(1), fib(2)→fib(1)+fib(0). 총 9번 호출됩니다. 이것이 메모이제이션이 필요한 이유입니다.",
    keyConceptTitle: "재귀의 비효율성과 메모이제이션",
    keyConceptDescription: "단순 재귀 피보나치는 O(2^N)의 시간 복잡도를 가집니다. 메모이제이션(dp 배열)을 사용하면 O(N)으로 줄일 수 있습니다.",
    codeComparison: {
      wrong: `int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);  // O(2^N)`,
      correct: `int dp[100] = {0};
int fib(int n) {
    if (n <= 1) return n;
    if (dp[n]) return dp[n];
    return dp[n] = fib(n-1) + fib(n-2);  // O(N)`,
    },
    relatedTopics: ["재귀", "메모이제이션", "DP", "시간 복잡도"],
  },
  {
    id: 279,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드에서 N=5일 때 배열에 1~5의 합을 저장하는 prefix sum의 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int prefix[6];
    prefix[0] = 0;
    for (int i = 0; i < 5; i++)
        prefix[i+1] = prefix[i] + arr[i];
    cout << prefix[3] << " " << prefix[5];
    return 0;
}`,
    options: ["3 15", "6 15", "6 10", "3 5"],
    correctAnswer: 1,
    explanation: "prefix = {0, 1, 3, 6, 10, 15}. prefix[3] = 1+2+3 = 6, prefix[5] = 1+2+3+4+5 = 15",
    keyConceptTitle: "Prefix Sum 배열 구성",
    keyConceptDescription: "prefix[i]는 arr[0]~arr[i-1]까지의 합입니다. prefix[0]=0으로 시작하여 구간 합 계산을 일관되게 처리합니다.",
    relatedTopics: ["prefix sum", "누적 합", "구간 쿼리"],
  },
  {
    id: 280,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드에서 그래프의 간선 수(E)를 구하면?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 4;
    vector<vector<int>> adj(n);
    adj[0].push_back(1);
    adj[1].push_back(0);
    adj[0].push_back(2);
    adj[2].push_back(0);
    adj[1].push_back(3);
    adj[3].push_back(1);
    
    int totalEdges = 0;
    for (int i = 0; i < n; i++)
        totalEdges += adj[i].size();
    totalEdges /= 2;
    cout << totalEdges;
    return 0;
}`,
    options: ["3", "4", "6", "2"],
    correctAnswer: 0,
    explanation: "무방향 그래프에서 각 간선은 양쪽에 저장됩니다. 총 push_back = 6, 6/2 = 3개의 간선입니다.",
    keyConceptTitle: "무방향 그래프의 간선 수 계산",
    keyConceptDescription: "무방향 그래프에서 인접 리스트의 총 크기는 2E(간선 수의 2배)입니다. 양쪽에 모두 저장되기 때문입니다.",
    relatedTopics: ["그래프", "인접 리스트", "간선"],
  },
  {
    id: 281,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드에서 N=4일 때 이진수 조합(부분집합)의 개수는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int n = 4;
    int count = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        count++;
    }
    cout << count;
    return 0;
}`,
    options: ["4", "8", "16", "32"],
    correctAnswer: 2,
    explanation: "1 << 4 = 16. mask는 0000부터 1111까지 모든 4비트 조합을 순회합니다. 2^4 = 16개의 부분집합이 있습니다.",
    keyConceptTitle: "비트마스크로 부분집합 열거",
    keyConceptDescription: "N개의 원소의 모든 부분집합은 2^N개입니다. 비트마스크 0~(2^N-1)로 각 원소의 포함 여부를 표현할 수 있습니다.",
    relatedTopics: ["비트마스크", "부분집합", "비트 연산"],
  },
  {
    id: 282,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 시간 복잡도는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 1000;
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    int count = 0;
    for (int i = 2; i <= n; i++)
        if (isPrime[i]) count++;
    cout << count;
    return 0;
}`,
    options: ["O(N)", "O(N log N)", "O(N log log N)", "O(N^2)"],
    correctAnswer: 2,
    explanation: "에라토스테네스의 체는 O(N log log N) 시간 복잡도를 가집니다. 각 소수의 배수를 지우는 과정의 합이 N log log N에 수렴합니다.",
    keyConceptTitle: "에라토스테네스의 체 (Sieve of Eratosthenes)",
    keyConceptDescription: "2부터 시작하여 각 소수의 배수를 지워가며 소수를 찾습니다. O(N log log N)으로 매우 효율적인 소수 판별법입니다.",
    relatedTopics: ["에라토스테네스의 체", "소수", "시간 복잡도", "USACO"],
  },
  {
    id: 283,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int count = 0;
    for (int i = 2; i <= 20; i++) {
        bool isPrime = true;
        for (int j = 2; j * j <= i; j++) {
            if (i % j == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) count++;
    }
    cout << count;
    return 0;
}`,
    options: ["6", "7", "8", "9"],
    correctAnswer: 2,
    explanation: "2~20 사이 소수는 2,3,5,7,11,13,17,19로 총 8개입니다.",
    keyConceptTitle: "소수 판별 알고리즘",
    keyConceptDescription: "j*j <= i까지만 검사하면 됩니다. 약수는 쌍으로 존재하므로 sqrt(i)까지만 확인하면 충분합니다.",
    relatedTopics: ["소수", "최적화", "break 활용"],
  },
  {
    id: 284,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}

int main() {
    cout << fib(7);
    return 0;
}`,
    options: ["8", "13", "21", "5"],
    correctAnswer: 1,
    explanation: "피보나치 수열: 0,1,1,2,3,5,8,13. fib(7) = 13입니다. fib(0)=0, fib(1)=1부터 시작합니다.",
    keyConceptTitle: "피보나치 재귀",
    keyConceptDescription: "fib(n) = fib(n-1) + fib(n-2). 단순 재귀는 O(2^n)으로 느리고, 메모이제이션이나 DP로 개선합니다.",
    relatedTopics: ["피보나치", "메모이제이션", "동적 프로그래밍"],
  },
  {
    id: 285,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

void hanoi(int n, char from, char to, char aux) {
    if (n == 0) return;
    hanoi(n-1, from, aux, to);
    cout << from << "->" << to << " ";
    hanoi(n-1, aux, to, from);
}

int main() {
    hanoi(2, 'A', 'C', 'B');
    return 0;
}`,
    options: ["A->C", "A->B A->C B->C", "A->C A->B C->B", "A->B B->C A->C"],
    correctAnswer: 1,
    explanation: "하노이의 탑 2개: A→B(보조), A→C(목표), B→C(보조에서 목표로). 총 3번 이동합니다.",
    keyConceptTitle: "하노이의 탑",
    keyConceptDescription: "n개의 원반을 옮기려면 2^n - 1번 이동이 필요합니다. 재귀의 대표적인 예제입니다.",
    relatedTopics: ["하노이의 탑", "재귀", "분할 정복"],
  },
  {
    id: 286,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int n = 10;
    int count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    cout << count;
    return 0;
}`,
    options: ["10", "2", "1", "4"],
    correctAnswer: 1,
    explanation: "n &= (n-1)은 n의 가장 낮은 1비트를 제거합니다. 10(1010) → 8(1000) → 0. 1비트가 2개이므로 count=2.",
    keyConceptTitle: "비트 카운팅 (Brian Kernighan)",
    keyConceptDescription: "n &= (n-1)은 가장 낮은 set bit를 제거합니다. 반복 횟수가 1의 개수(popcount)입니다.",
    relatedTopics: ["비트 연산", "popcount", "USACO"],
  },
  {
    id: 287,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9};
    nth_element(v.begin(), v.begin() + 2, v.end());
    cout << v[2];
    return 0;
}`,
    options: ["1", "3", "4", "알 수 없음"],
    correctAnswer: 1,
    explanation: "nth_element는 n번째 원소가 정렬된 위치의 값이 되도록 재배치합니다. 인덱스 2에는 정렬 시 3번째 작은 값(3)이 옵니다.",
    keyConceptTitle: "nth_element",
    keyConceptDescription: "nth_element는 O(N)으로 k번째 원소를 찾습니다. 완전 정렬보다 빠르며, USACO에서 자주 사용됩니다.",
    relatedTopics: ["nth_element", "부분 정렬", "USACO"],
  },
  {
    id: 288,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 재귀 코드의 시간 복잡도는?",
    code: `int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}
// fib(30) 호출`,
    options: ["O(N)", "O(N log N)", "O(2^N)", "O(N^2)"],
    correctAnswer: 2,
    explanation: "단순 재귀 피보나치는 각 호출이 2개의 재귀 호출을 만들어 O(2^N)입니다. 매우 비효율적입니다.",
    keyConceptTitle: "재귀의 시간 복잡도",
    keyConceptDescription: "단순 재귀는 중복 계산이 많아 지수 시간이 됩니다. 메모이제이션으로 O(N)으로 개선 가능합니다.",
    relatedTopics: ["시간 복잡도", "메모이제이션", "DP"],
  },
  {
    id: 289,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int partition(int arr[], int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i+1], arr[hi]);
    return i + 1;
}

int main() {
    int arr[] = {3, 6, 8, 10, 1, 2, 1};
    int p = partition(arr, 0, 6);
    cout << "피벗 위치: " << p << " 값: " << arr[p];
    return 0;
}`,
    options: ["피벗 위치: 0 값: 1", "피벗 위치: 1 값: 1", "피벗 위치: 3 값: 1", "피벗 위치: 6 값: 1"],
    correctAnswer: 1,
    explanation: "피벗은 arr[6]=1. 1 이하인 원소는 1개(arr[4]=1). 피벗이 인덱스 1에 위치하게 됩니다.",
    keyConceptTitle: "퀵소트 파티션",
    keyConceptDescription: "파티션은 피벗보다 작은 원소를 왼쪽, 큰 원소를 오른쪽으로 분리합니다. 퀵소트의 핵심 연산입니다.",
    relatedTopics: ["퀵소트", "파티션", "분할 정복"],
  },
  {
    id: 290,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<vector<int>> dp(3, vector<int>(3, 0));
    for (int i = 0; i < 3; i++) dp[i][0] = 1;
    for (int j = 0; j < 3; j++) dp[0][j] = 1;
    for (int i = 1; i < 3; i++)
        for (int j = 1; j < 3; j++)
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
    cout << dp[2][2];
    return 0;
}`,
    options: ["4", "6", "9", "3"],
    correctAnswer: 1,
    explanation: "격자 경로 수 DP입니다. dp = {{1,1,1},{1,2,3},{1,3,6}}. dp[2][2] = 6 (3×3 격자의 경로 수).",
    keyConceptTitle: "격자 경로 DP",
    keyConceptDescription: "오른쪽/아래로만 이동할 때 경로 수를 DP로 구합니다. dp[i][j] = dp[i-1][j] + dp[i][j-1].",
    relatedTopics: ["DP", "격자 경로", "USACO"],
  },
  {
    id: 291,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 USACO 스타일 문제에서 올바른 출력은?\n\nN마리의 소가 일렬로 서 있다. 각 소의 키가 주어질 때, 키가 가장 큰 소의 인덱스(0-based)를 출력하시오.",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> heights = {3, 7, 2, 9, 5};
    auto it = max_element(heights.begin(), heights.end());
    cout << (it - heights.begin());
    return 0;
}`,
    options: ["9", "3", "4", "1"],
    correctAnswer: 1,
    explanation: "max_element는 최댓값의 iterator를 반환합니다. 9가 인덱스 3에 있으므로 it - begin = 3.",
    keyConceptTitle: "max_element와 인덱스",
    keyConceptDescription: "max_element는 최댓값의 iterator를 반환합니다. begin()을 빼면 인덱스를 구할 수 있습니다.",
    relatedTopics: ["max_element", "iterator", "USACO"],
  },
  {
    id: 292,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 2D prefix sum
    vector<vector<int>> grid = {{1,2,3},{4,5,6},{7,8,9}};
    int n = 3;
    vector<vector<int>> ps(n+1, vector<int>(n+1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            ps[i][j] = grid[i-1][j-1] + ps[i-1][j] + ps[i][j-1] - ps[i-1][j-1];
    // (1,1) ~ (2,2) 부분합 (0-indexed: (0,0)~(1,1))
    int sum = ps[2][2] - ps[0][2] - ps[2][0] + ps[0][0];
    cout << sum;
    return 0;
}`,
    options: ["12", "15", "10", "45"],
    correctAnswer: 0,
    explanation: "(0,0)~(1,1) 영역의 합 = 1+2+4+5 = 12. 2D 누적합으로 O(1)에 부분 영역의 합을 구합니다.",
    keyConceptTitle: "2D 누적합 (Prefix Sum)",
    keyConceptDescription: "2D 누적합으로 임의의 직사각형 영역의 합을 O(1)에 구할 수 있습니다. USACO에서 자주 출제됩니다.",
    relatedTopics: ["누적합", "2D prefix sum", "USACO"],
  },
  {
    id: 293,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 투 포인터로 정렬된 배열에서 합이 target인 쌍 찾기
    vector<int> v = {1, 3, 5, 7, 9, 11};
    int target = 12;
    int lo = 0, hi = v.size() - 1;
    while (lo < hi) {
        int sum = v[lo] + v[hi];
        if (sum == target) {
            cout << v[lo] << "+" << v[hi];
            break;
        }
        else if (sum < target) lo++;
        else hi--;
    }
    return 0;
}`,
    options: ["1+11", "3+9", "5+7", "1+11 또는 3+9"],
    correctAnswer: 0,
    explanation: "lo=0(1), hi=5(11). 1+11=12=target이므로 첫 번째 시도에서 찾습니다. 1+11이 출력됩니다.",
    keyConceptTitle: "투 포인터 기법",
    keyConceptDescription: "정렬된 배열에서 두 포인터를 양 끝에서 시작하여 O(N)으로 합이 target인 쌍을 찾습니다.",
    relatedTopics: ["투 포인터", "정렬", "USACO"],
  },
  {
    id: 294,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 시간 복잡도는?",
    code: `int power(int base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        int half = power(base, exp / 2);
        return half * half;
    }
    return base * power(base, exp - 1);
}`,
    options: ["O(N)", "O(log N)", "O(N log N)", "O(2^N)"],
    correctAnswer: 1,
    explanation: "짝수일 때 exp를 절반으로 줄이므로 O(log N)입니다. 빠른 거듭제곱(fast exponentiation) 알고리즘입니다.",
    keyConceptTitle: "빠른 거듭제곱",
    keyConceptDescription: "exp를 절반씩 줄여 O(log N)으로 거듭제곱을 계산합니다. 큰 수 모듈로 연산에 필수적입니다.",
    relatedTopics: ["빠른 거듭제곱", "O(log N)", "분할 정복"],
  },
  {
    id: 295,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(3);
    pq.push(1);
    pq.push(4);
    pq.push(1);
    pq.push(5);
    while (!pq.empty()) {
        cout << pq.top() << " ";
        pq.pop();
    }
    return 0;
}`,
    options: ["1 1 3 4 5", "5 4 3 1 1", "3 1 4 1 5", "1 3 1 4 5"],
    correctAnswer: 1,
    explanation: "priority_queue는 기본적으로 max-heap입니다. 가장 큰 원소가 top()에 위치합니다. 5 4 3 1 1 순서로 출력.",
    keyConceptTitle: "우선순위 큐",
    keyConceptDescription: "priority_queue는 기본 max-heap으로 가장 큰 원소를 먼저 꺼냅니다. min-heap은 greater<int>를 사용합니다.",
    relatedTopics: ["priority_queue", "힙", "USACO"],
  },
  {
    id: 296,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는? (그래프 BFS)",
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    vector<vector<int>> adj = {{1,2},{0,3},{0,3},{1,2}};
    vector<bool> visited(4, false);
    queue<int> q;
    q.push(0);
    visited[0] = true;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int next : adj[node]) {
            if (!visited[next]) {
                visited[next] = true;
                q.push(next);
            }
        }
    }
    return 0;
}`,
    options: ["0 1 2 3", "0 2 1 3", "3 2 1 0", "0 1 3 2"],
    correctAnswer: 0,
    explanation: "BFS: 0 방문 → 1,2 큐에 추가 → 1 방문 → 3 추가 → 2 방문 → 3 방문. 순서: 0 1 2 3.",
    keyConceptTitle: "BFS (너비 우선 탐색)",
    keyConceptDescription: "BFS는 큐를 사용하여 가까운 노드부터 탐색합니다. 최단 경로 탐색에 사용됩니다.",
    relatedTopics: ["BFS", "그래프", "큐", "USACO"],
  },
  {
    id: 297,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는? (DFS)",
    code: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj;
vector<bool> visited;

void dfs(int node) {
    visited[node] = true;
    cout << node << " ";
    for (int next : adj[node])
        if (!visited[next]) dfs(next);
}

int main() {
    adj = {{1,2},{0,3},{0},{1}};
    visited.assign(4, false);
    dfs(0);
    return 0;
}`,
    options: ["0 1 2 3", "0 1 3 2", "0 2 1 3", "3 1 0 2"],
    correctAnswer: 1,
    explanation: "DFS: 0→1(첫 이웃)→3(1의 이웃)→(백트래킹)→2(0의 둘째 이웃). 순서: 0 1 3 2.",
    keyConceptTitle: "DFS (깊이 우선 탐색)",
    keyConceptDescription: "DFS는 재귀/스택으로 깊이 방향으로 탐색합니다. 연결 요소, 사이클 탐지 등에 사용됩니다.",
    relatedTopics: ["DFS", "재귀", "그래프", "USACO"],
  },
  {
    id: 298,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는? (DP: 최장 증가 부분 수열 길이)",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9, 2, 6};
    int n = a.size();
    vector<int> dp(n, 1);
    for (int i = 1; i < n; i++)
        for (int j = 0; j < i; j++)
            if (a[j] < a[i])
                dp[i] = max(dp[i], dp[j] + 1);
    cout << *max_element(dp.begin(), dp.end());
    return 0;
}`,
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    explanation: "LIS 예: 1,4,5,9 (길이 4) 또는 1,4,5,6 (길이 4). dp배열: [1,1,2,1,3,4,2,4]. 최댓값은 4.",
    keyConceptTitle: "최장 증가 부분 수열 (LIS)",
    keyConceptDescription: "dp[i]는 a[i]로 끝나는 LIS 길이입니다. O(N^2) 풀이이며, 이진 탐색으로 O(N log N)도 가능합니다.",
    relatedTopics: ["LIS", "DP", "USACO"],
  },
  {
    id: 299,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 메모이제이션 피보나치
    int n = 10;
    vector<long long> memo(n + 1, -1);
    memo[0] = 0; memo[1] = 1;
    for (int i = 2; i <= n; i++)
        memo[i] = memo[i-1] + memo[i-2];
    cout << memo[10];
    return 0;
}`,
    options: ["34", "55", "89", "144"],
    correctAnswer: 1,
    explanation: "피보나치 수: 0,1,1,2,3,5,8,13,21,34,55. memo[10]=55입니다. 바텀업 DP 방식입니다.",
    keyConceptTitle: "바텀업 DP (피보나치)",
    keyConceptDescription: "재귀 대신 반복문으로 작은 문제부터 해결합니다. O(N) 시간, O(N) 공간이며, 단순 재귀의 O(2^N)보다 훨씬 빠릅니다.",
    relatedTopics: ["DP", "피보나치", "바텀업"],
  },
  {
    id: 300,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 USACO 스타일 코드에서 그리디 알고리즘의 결과는?\n\n활동 선택 문제: N개의 활동이 (시작, 끝) 시간으로 주어질 때 겹치지 않게 최대 몇 개를 선택할 수 있는가?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int,int>> acts = {{1,3},{2,5},{3,4},{4,7},{5,6},{6,8}};
    sort(acts.begin(), acts.end(), [](auto& a, auto& b) {
        return a.second < b.second;
    });
    int count = 0, lastEnd = 0;
    for (auto& [s, e] : acts) {
        if (s >= lastEnd) {
            count++;
            lastEnd = e;
        }
    }
    cout << count;
    return 0;
}`,
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "끝나는 시간 기준 정렬 후 그리디: (1,3)선택→(3,4)선택→(5,6)선택→(6,8)선택 = 4개.",
    keyConceptTitle: "활동 선택 문제 (그리디)",
    keyConceptDescription: "끝나는 시간이 빠른 순으로 정렬한 뒤, 겹치지 않는 활동을 탐욕적으로 선택합니다. 최적해가 보장됩니다.",
    relatedTopics: ["그리디", "활동 선택", "정렬", "USACO"],
  },
  // ============================================
  // 레슨 13: 재귀 (Recursion) — Q301~Q333
  // ============================================
  {
    id: 324,
    lessonId: "cpp-4",
    difficulty: "보통",
    question: "다음 코드에서 '김 철수'를 입력했을 때 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cin >> name;
    cout << "안녕, " << name << "!" << endl;
    return 0;
}`,
    options: ["안녕, 김 철수!", "안녕, 김!", "안녕, !", "런타임 오류"],
    correctAnswer: 1,
    explanation: "cin >>은 공백(띄어쓰기)을 기준으로 입력을 분리합니다. '김 철수'에서 공백 전의 '김'까지만 읽힙니다. 띄어쓰기가 포함된 이름을 전부 읽으려면 getline()을 써야 합니다.",
    keyConceptTitle: "cin >>의 공백 처리",
    keyConceptDescription: "cin >>은 공백, 탭, 엔터를 구분자로 사용합니다. 공백이 포함된 문자열 전체를 읽으려면 getline(cin, 변수)을 사용해야 합니다.",
    relatedTopics: ["cin", "공백", "문자열 입력"],
  },
  {
    id: 325,
    lessonId: "cpp-4",
    difficulty: "보통",
    question: "띄어쓰기가 포함된 한 줄 전체를 읽는 올바른 코드는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    // 한 줄 전체 입력받기
    _______________
    cout << line << endl;
    return 0;
}`,
    options: [
      "cin >> line;",
      "getline(cin, line);",
      "cin.get(line);",
      "read(cin, line);"
    ],
    correctAnswer: 1,
    explanation: "getline(cin, line)은 엔터를 누를 때까지의 문자 전체(공백 포함)를 읽습니다. cin >>은 공백 전까지만 읽습니다.",
    keyConceptTitle: "getline() 함수",
    keyConceptDescription: "getline(cin, 변수)는 줄바꿈 전까지 모든 문자(공백 포함)를 읽어 string에 저장합니다. Python의 input()과 동작이 같습니다.",
    relatedTopics: ["getline", "cin", "문자열", "공백 처리"],
  },
  {
    id: 326,
    lessonId: "cpp-4",
    difficulty: "보통",
    question: "다음 코드를 실행할 때, 나이에 20, 이름에 '홍길동'을 입력하면 어떤 문제가 생기나?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age;
    string name;
    cout << "나이: "; cin >> age;
    cout << "이름: "; getline(cin, name);
    cout << age << "살 " << name << endl;
    return 0;
}`,
    options: [
      "정상 출력: 20살 홍길동",
      "name이 비어있어 '20살 '만 출력된다",
      "age 입력이 안 된다",
      "컴파일 오류"
    ],
    correctAnswer: 1,
    explanation: "cin >> age 후 버퍼에 '\\n'(엔터)이 남아있어서, getline()이 그 엔터를 읽고 바로 종료됩니다. 그래서 name이 빈 문자열이 됩니다.",
    keyConceptTitle: "cin >> 후 getline() 버퍼 문제",
    keyConceptDescription: "cin >>은 입력을 읽고 엔터를 버퍼에 남깁니다. 이후 getline()을 쓰면 그 엔터를 읽어버립니다. cin.ignore()로 남은 엔터를 제거해야 합니다.",
    relatedTopics: ["cin.ignore", "getline", "입력 버퍼", "버퍼 비우기"],
  },
  {
    id: 327,
    lessonId: "cpp-4",
    difficulty: "보통",
    question: "cin >> 후 getline()을 쓸 때 버퍼에 남은 엔터를 제거하는 올바른 코드는?",
    code: `int main() {
    int age;
    string name;
    cin >> age;
    _____________  // 버퍼의 엔터 제거
    getline(cin, name);
    cout << age << "살 " << name << endl;
}`,
    options: [
      "cin.clear();",
      "cin.ignore();",
      "cin.flush();",
      "cin.reset();"
    ],
    correctAnswer: 1,
    explanation: "cin.ignore()는 버퍼에 남은 문자 하나(엔터)를 버립니다. cin >> 후 getline()을 쓸 때는 반드시 cin.ignore()를 먼저 호출해야 합니다.",
    keyConceptTitle: "cin.ignore()로 버퍼 비우기",
    keyConceptDescription: "cin.ignore()는 입력 스트림에서 문자 1개를 버립니다. cin >> 후 남은 엔터를 제거할 때 사용합니다. cin.ignore(1000, '\\n')으로 특정 문자까지 버릴 수도 있습니다.",
    relatedTopics: ["cin.ignore", "입력 버퍼", "getline", "cin"],
  },
  {
    id: 328,
    lessonId: "cpp-4",
    difficulty: "쉬움",
    question: "다음 코드에서 '10 20 30'을 입력했을 때 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << a + b + c << endl;
    return 0;
}`,
    options: ["102030", "60", "10", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "cin >> a >> b >> c 처럼 연속으로 연결하면 공백/엔터로 구분된 세 값을 차례로 읽습니다. 10+20+30=60.",
    keyConceptTitle: "cin 연속 입력",
    keyConceptDescription: "cin >> a >> b >> c처럼 >>를 연결하면 여러 값을 한 번에 입력받을 수 있습니다. Python의 a, b, c = map(int, input().split())과 같은 역할입니다.",
    relatedTopics: ["cin", "연속 입력", "다중 변수"],
  },
  // ── cpp-1 보충 (파이썬 vs C++) ──
  {
    id: 329,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "C++이 파이썬보다 빠른 핵심 이유는?",
    code: ``,
    options: [
      "문법이 더 엄격해서",
      "소스코드를 미리 기계어로 컴파일하기 때문에",
      "변수 타입을 명시해서",
      "세미콜론이 있어서",
    ],
    correctAnswer: 1,
    explanation: "C++은 실행 전에 소스코드 전체를 기계어(0과 1)로 컴파일합니다. 파이썬은 한 줄씩 해석하며 실행하므로 더 느려요.",
    keyConceptTitle: "컴파일 vs 인터프리터",
    keyConceptDescription: "컴파일: 전체 코드를 기계어로 변환 후 실행 (빠름). 인터프리터: 코드를 한 줄씩 해석하며 실행 (느리지만 편리).",
    relatedTopics: ["컴파일", "인터프리터", "기계어", "성능"],
  },
  {
    id: 330,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "C++에서 화면에 'Hello'를 출력하는 올바른 코드는?",
    code: `#include <iostream>

int main() {
    ___
    return 0;
}`,
    options: [
      `print("Hello")`,
      `std::cout << "Hello" << std::endl;`,
      `System.out.println("Hello");`,
      `echo "Hello";`,
    ],
    correctAnswer: 1,
    explanation: `C++에서 출력은 std::cout을 사용합니다. std::cout << "Hello" << std::endl; 형태로 씁니다. print()는 파이썬, System.out.println()은 Java, echo는 PHP/Shell입니다.`,
    keyConceptTitle: "std::cout 출력",
    keyConceptDescription: "std::cout은 C++의 표준 출력 스트림입니다. <<(삽입 연산자)로 출력할 값을 연결하고, std::endl로 줄바꿈합니다.",
    relatedTopics: ["std::cout", "출력", "#include <iostream>"],
  },
  {
    id: 331,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "C++ 소스파일을 컴파일하는 명령어는? (g++ 컴파일러 사용)",
    code: `// 파일: hello.cpp
#include <iostream>

int main() {
    std::cout << "Hello" << std::endl;
    return 0;
}`,
    options: ["python hello.cpp", "run hello.cpp", "g++ hello.cpp -o hello", "compile hello.cpp"],
    correctAnswer: 2,
    explanation: "g++ hello.cpp -o hello로 컴파일하면 hello라는 실행 파일이 생깁니다. -o는 output 파일명을 지정합니다. 이후 ./hello로 실행합니다.",
    keyConceptTitle: "g++ 컴파일 명령",
    keyConceptDescription: "g++ 소스파일.cpp -o 실행파일명 형식으로 컴파일합니다. 컴파일 오류가 있으면 실행 파일이 생성되지 않습니다.",
    relatedTopics: ["g++", "컴파일", "실행 파일"],
  },
  {
    id: 332,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "다음 중 올바른 C++ Hello World 코드는?",
    code: "",
    options: [
      `#include <iostream>\nint main() {\n    std::cout << "Hello" << std::endl;\n    return 0;\n}`,
      `#include <iostream>\nreturn 0;\nint main() {\n    std::cout << "Hello" << std::endl;\n}`,
      `#include <iostream>\nint main() {\n    return 0;\n    std::cout << "Hello" << std::endl;\n}`,
      `int main() {\n    std::cout << "Hello" << std::endl;\n    return 0;\n}`,
    ],
    correctAnswer: 0,
    explanation: "return 0;은 main() 안에서 모든 코드가 끝난 뒤 마지막에 씁니다. #include는 맨 위에, cout은 return 0; 앞에 와야 해요.",
    keyConceptTitle: "return 0의 위치",
    keyConceptDescription: "C++ 프로그램 구조: #include → int main() { → 실행 코드 → return 0; → }",
    relatedTopics: ["return 0", "main 함수", "프로그램 구조", "#include"],
  },
  // ── cpp-1 보충 (Hello World 기초) ──
  {
    id: 348,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "#include <iostream>을 쓰는 이유는?",
    code: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello!";
    return 0;
}`,
    options: [
      "프로그램을 빠르게 실행하려고",
      "cout, cin 같은 입출력 기능을 쓰려고",
      "main 함수를 정의하려고",
      "C++ 문법을 활성화하려고",
    ],
    correctAnswer: 1,
    explanation: "#include <iostream>은 입출력(Input/Output) 기능을 가져옵니다. 이게 없으면 cout을 쓸 수 없어요!",
    keyConceptTitle: "#include <iostream>",
    keyConceptDescription: "#include는 헤더 파일을 불러오는 명령입니다. <iostream>은 화면 출력(cout)과 키보드 입력(cin)을 포함합니다.",
    relatedTopics: ["#include", "헤더파일", "cout", "입출력"],
  },
  {
    id: 349,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>

int main() {
    std::cout << "Hi!" << std::endl;
    return 0;
}`,
    options: [
      "Hi! endl",
      "std::cout Hi!",
      "Hi!",
      "에러",
    ],
    correctAnswer: 2,
    explanation: "std::cout은 화면에 내용을 출력하고, std::endl은 줄바꿈만 합니다. 화면에는 Hi!만 보입니다.",
    keyConceptTitle: "std::cout 출력 결과",
    keyConceptDescription: "std::cout << \"텍스트\" << std::endl;은 텍스트를 출력하고 줄을 바꿉니다. endl 자체는 화면에 출력되지 않습니다.",
    relatedTopics: ["std::cout", "std::endl", "출력"],
  },
  {
    id: 350,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "다음 코드에서 <<의 역할은?",
    code: `cout << "Hello, World!" << endl;`,
    options: [
      "두 수를 비교한다",
      "cout에 출력할 내용을 전달(삽입)한다",
      "변수에 값을 저장한다",
      "줄바꿈을 한다",
    ],
    correctAnswer: 1,
    explanation: "<<는 '삽입 연산자'입니다. cout << \"Hello\"는 'Hello를 cout(화면)에 넣어라'는 뜻이에요. 화살표가 오른쪽에서 왼쪽 방향으로 데이터를 흘려보낸다고 생각하면 됩니다.",
    keyConceptTitle: "삽입 연산자 <<",
    keyConceptDescription: "cout << 값: cout에 값을 삽입(출력)합니다. << 연산자를 여러 번 연결할 수 있습니다: cout << \"A\" << \"B\" << endl;",
    relatedTopics: ["cout", "삽입 연산자", "출력"],
  },
  {
    id: 351,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "endl을 사용하면 어떻게 되나요?",
    code: `std::cout << "1번 줄" << std::endl;
std::cout << "2번 줄" << std::endl;`,
    options: [
      "프로그램을 종료한다",
      "줄바꿈(Enter)을 한다",
      "공백을 한 칸 넣는다",
      "화면을 지운다",
    ],
    correctAnswer: 1,
    explanation: "endl은 '줄 끝(end of line)'의 줄임말로, 출력 후 줄을 바꿉니다. 위 코드를 실행하면 '1번 줄'과 '2번 줄'이 각각 다른 줄에 출력됩니다.",
    keyConceptTitle: "endl — 줄바꿈",
    keyConceptDescription: "endl은 줄바꿈 문자(\\n)를 출력하고 출력 버퍼를 비웁니다. 화면에 Enter를 누른 것처럼 다음 줄로 넘어갑니다.",
    relatedTopics: ["endl", "줄바꿈", "cout"],
  },
  {
    id: 352,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "C++ 소스 파일의 확장자는 무엇인가요?",
    code: "",
    options: [".py", ".java", ".cpp", ".txt"],
    correctAnswer: 2,
    explanation: "C++ 소스 파일은 .cpp 확장자를 사용합니다. 예: main.cpp, hello.cpp. .py는 파이썬, .java는 자바 파일입니다.",
    keyConceptTitle: ".cpp 확장자",
    keyConceptDescription: "C++ 소스 파일은 .cpp 또는 .cc 확장자를 사용합니다. 가장 흔한 건 .cpp (C Plus Plus의 약자)입니다.",
    relatedTopics: [".cpp", "소스 파일", "확장자"],
  },
  {
    id: 353,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "다음 Hello World 코드의 올바른 구조 순서는?",
    code: `// 순서가 뒤섞인 코드 — 올바른 순서는?
(A)     std::cout << "Hello, World!" << std::endl;
(B) }
(C) #include <iostream>
(D)     return 0;
(E) int main() {`,
    options: [
      "C → E → A → D → B",
      "E → C → A → D → B",
      "C → A → E → D → B",
      "A → C → E → D → B",
    ],
    correctAnswer: 0,
    explanation: "#include가 맨 위, 그 다음 int main() {, 중괄호 안에 cout과 return 0;, 마지막으로 닫는 }입니다.",
    keyConceptTitle: "C++ 코드 구조",
    keyConceptDescription: "① #include <iostream> → ② int main() { → ③ std::cout 출력 → ④ return 0; → ⑤ }",
    relatedTopics: ["코드 구조", "#include", "main 함수", "return 0"],
  },
  {
    id: 354,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    options: [
      `Hello, World!`,
      `"Hello, World!"`,
      `Hello World`,
      `cout << Hello, World!`,
    ],
    correctAnswer: 0,
    explanation: "cout은 큰따옴표 안의 내용만 출력합니다. 따옴표 자체는 출력되지 않아요. endl은 줄바꿈이므로 화면에는 Hello, World!만 보입니다.",
    keyConceptTitle: "문자열 출력",
    keyConceptDescription: "cout << \"텍스트\"는 따옴표 안의 내용을 그대로 출력합니다. 따옴표 기호는 출력되지 않습니다.",
    relatedTopics: ["cout", "문자열", "출력"],
  },
  {
    id: 355,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "#include <iostream>을 빠뜨리면 어떻게 되나요?",
    code: `// #include <iostream> 없음!
using namespace std;
int main() {
    cout << "Hello!";
    return 0;
}`,
    options: [
      "정상적으로 실행된다",
      "컴파일 오류가 발생한다",
      "경고만 나오고 실행은 된다",
      "빈 화면이 출력된다",
    ],
    correctAnswer: 1,
    explanation: "#include <iostream>이 없으면 cout을 찾을 수 없어 컴파일 오류가 납니다. 컴파일러는 '이 cout이 뭔지 모르겠다'고 에러를 냅니다.",
    keyConceptTitle: "컴파일 오류",
    keyConceptDescription: "#include를 빼면 컴파일러가 cout을 인식하지 못해 오류가 발생합니다. 필요한 헤더 파일은 반드시 포함해야 합니다.",
    relatedTopics: ["#include", "컴파일 오류", "헤더파일"],
  },
  {
    id: 356,
    lessonId: "cpp-1",
    difficulty: "보통",
    question: "다음 코드에서 틀린 부분은?",
    code: `#include <iostream>
using namespace std;
int main() {
    cout << "안녕하세요"
    return 0;
}`,
    options: [
      "#include가 잘못됐다",
      "cout 줄 끝에 세미콜론(;)이 없다",
      "return 0이 필요 없다",
      "endl을 반드시 써야 한다",
    ],
    correctAnswer: 1,
    explanation: "C++은 모든 문장(statement) 끝에 세미콜론(;)이 필요합니다. cout << \"안녕하세요\"; 로 고쳐야 합니다.",
    keyConceptTitle: "세미콜론(;)",
    keyConceptDescription: "C++에서 모든 문장은 세미콜론(;)으로 끝나야 합니다. 파이썬과 달리 줄바꿈만으로는 문장이 끝나지 않습니다.",
    relatedTopics: ["세미콜론", "문법 오류", "컴파일 오류"],
  },
  {
    id: 357,
    lessonId: "cpp-1",
    difficulty: "보통",
    question: "C++ 프로그램과 Python 프로그램의 차이로 옳은 것은?",
    code: "",
    options: [
      "C++은 코드를 한 줄씩 실행하고, Python은 먼저 전체를 컴파일한다",
      "C++은 컴파일 후 실행 파일을 만들고, Python은 코드를 바로 해석하며 실행한다",
      "C++과 Python 모두 인터프리터 방식이다",
      "C++은 브라우저에서만 실행된다",
    ],
    correctAnswer: 1,
    explanation: "C++은 컴파일 언어로, 소스 코드를 기계어로 번역한 실행 파일(.exe, a.out 등)을 만들고 실행합니다. Python은 인터프리터 언어로, 코드를 한 줄씩 해석하며 실행합니다.",
    keyConceptTitle: "컴파일 vs 인터프리터",
    keyConceptDescription: "컴파일 언어(C++): 전체 코드 → 기계어 변환 → 실행 파일 생성 → 실행 (빠름). 인터프리터 언어(Python): 코드를 한 줄씩 해석하며 실행 (유연함).",
    relatedTopics: ["컴파일", "인터프리터", "실행 방식", "Python vs C++"],
  },
  {
    id: 358,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "컴파일 후 생긴 a.out 파일을 실행하는 명령어는?",
    code: "",
    options: ["run a.out", "execute a.out", "./a.out", "open a.out"],
    correctAnswer: 2,
    explanation: "./a.out으로 실행합니다. 앞의 ./는 '현재 폴더에 있는 파일'을 의미해요. 윈도우에서는 a.exe가 되기도 해요.",
    keyConceptTitle: "실행 파일 실행 (./a.out)",
    keyConceptDescription: "g++ main.cpp로 컴파일 → a.out 생성 → ./a.out으로 실행. ./는 현재 디렉토리를 의미합니다.",
    relatedTopics: ["실행", "a.out", "터미널"],
  },
  {
    id: 359,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "컴파일 시 실행 파일 이름을 hello로 지정하는 명령어는?",
    code: "",
    options: [
      "g++ main.cpp hello",
      "g++ -o hello main.cpp",
      "g++ main.cpp --name hello",
      "g++ main.cpp > hello",
    ],
    correctAnswer: 1,
    explanation: "-o 옵션 뒤에 원하는 실행 파일 이름을 씁니다. g++ -o hello main.cpp → ./hello로 실행!",
    keyConceptTitle: "g++ -o 옵션",
    keyConceptDescription: "g++ -o 파일명 소스파일.cpp: 원하는 이름으로 실행 파일 생성. -o는 output(출력)의 줄임말입니다.",
    relatedTopics: ["g++", "-o 옵션", "컴파일", "실행 파일"],
  },
  {
    id: 360,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>

int main() {
    std::cout << "A" << "B" << "C" << std::endl;
    return 0;
}`,
    options: ["A B C", "ABC", "A, B, C", "에러"],
    correctAnswer: 1,
    explanation: "C++의 cout은 값을 자동으로 공백 없이 이어붙입니다. 공백이 필요하면 직접 \" \"를 넣어야 해요. 결과: ABC",
    keyConceptTitle: "cout 연속 출력",
    keyConceptDescription: "cout << \"A\" << \"B\" << \"C\"는 공백 없이 ABC를 출력합니다. 공백 원하면: cout << \"A\" << \" \" << \"B\"",
    relatedTopics: ["cout", "<<", "연속 출력"],
  },
  {
    id: 361,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>

int main() {
    std::cout << "Hello";
    std::cout << "World";
    return 0;
}`,
    options: [
      "Hello\nWorld (두 줄)",
      "HelloWorld (한 줄)",
      "Hello World (공백 포함)",
      "에러",
    ],
    correctAnswer: 1,
    explanation: "endl이나 \\n 없이 cout을 여러 번 쓰면 줄바꿈 없이 이어서 출력됩니다. 결과: HelloWorld",
    keyConceptTitle: "endl 없으면 줄바꿈 없음",
    keyConceptDescription: "C++은 줄바꿈을 자동으로 안 해줍니다. endl이나 \\n을 명시적으로 써야 줄이 바뀝니다.",
    relatedTopics: ["endl", "줄바꿈", "cout"],
  },
  {
    id: 362,
    lessonId: "cpp-1",
    difficulty: "보통",
    question: "다음 코드를 실행하면 몇 줄이 출력되나요?",
    code: `#include <iostream>

int main() {
    std::cout << "사과" << std::endl;
    std::cout << "바나나" << std::endl;
    std::cout << "포도" << std::endl;
    return 0;
}`,
    options: ["1줄 — 사과바나나포도", "3줄 — 각각 한 줄씩", "4줄 — return 0도 출력됨", "에러"],
    correctAnswer: 1,
    explanation: "std::endl이 있을 때마다 줄이 바뀝니다. 세 번의 cout + endl이 있으므로 3줄 출력됩니다. return 0;은 화면에 출력되지 않아요.",
    keyConceptTitle: "endl로 줄 나누기",
    keyConceptDescription: "std::endl이 있으면 그 자리에서 줄이 바뀝니다. endl이 3번이면 3줄로 출력됩니다.",
    relatedTopics: ["endl", "줄바꿈", "cout"],
  },
  {
    id: 363,
    lessonId: "cpp-1",
    difficulty: "보통",
    question: "파이썬과 C++의 코드 블록 표시 방식 차이는?",
    code: `# 파이썬
def main():
    print("Hello")

// C++
int main() {
    std::cout << "Hello";
}`,
    options: [
      "파이썬은 {}를 쓰고, C++은 :와 들여쓰기를 쓴다",
      "파이썬은 :와 들여쓰기로 블록을 구분하고, C++은 {}를 쓴다",
      "둘 다 {}를 쓴다",
      "C++은 블록 구분이 없다",
    ],
    correctAnswer: 1,
    explanation: "파이썬은 :(콜론)과 들여쓰기로 코드 블록을 만들지만, C++은 중괄호 { }로 블록을 표시합니다. C++에서 들여쓰기는 선택사항(가독성용)이에요.",
    keyConceptTitle: "코드 블록: {} vs 들여쓰기",
    keyConceptDescription: "Python: 콜론(:) + 들여쓰기. C++: 중괄호({ }). C++에서 들여쓰기는 문법상 의미 없고 가독성을 위한 것입니다.",
    relatedTopics: ["중괄호", "코드 블록", "들여쓰기", "Python vs C++"],
  },
  {
    id: 364,
    lessonId: "cpp-1",
    difficulty: "보통",
    question: "다음 코드에서 std::는 무엇을 의미하나요?",
    code: `#include <iostream>

int main() {
    std::cout << "Hello" << std::endl;
    return 0;
}`,
    options: [
      "파일을 불러오는 명령어다",
      "'표준(standard) 도구를 쓴다'는 표시다",
      "출력 속도를 빠르게 한다",
      "컴파일러에게 C++ 모드를 알려준다",
    ],
    correctAnswer: 1,
    explanation: "std::는 'standard(표준)'의 줄임말입니다. std::cout, std::endl처럼 C++ 표준 도구를 쓸 때 앞에 붙여요. 지금은 '표준 도구를 쓴다는 표시'로만 기억하세요!",
    keyConceptTitle: "std:: 의미",
    keyConceptDescription: "std::cout, std::endl — 앞의 std::는 C++ 표준 도구라는 표시입니다. 레슨 1에서는 항상 std::를 붙여서 씁니다.",
    relatedTopics: ["std::", "std::cout", "std::endl"],
  },
  {
    id: 365,
    lessonId: "cpp-1",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>

int main() {
    std::cout << "이름: " << "코드린" << std::endl;
    std::cout << "언어: " << "C++" << std::endl;
    return 0;
}`,
    options: [
      "이름: 코드린 언어: C++ (한 줄)",
      "이름: \\n코드린\\n언어: \\nC++",
      "이름: 코드린\n언어: C++ (두 줄)",
      "에러",
    ],
    correctAnswer: 2,
    explanation: "첫 번째 cout은 '이름: 코드린'을 출력하고 endl로 줄바꿈, 두 번째 cout은 '언어: C++'을 출력하고 줄바꿈합니다. 총 두 줄이 출력됩니다.",
    keyConceptTitle: "여러 줄 출력",
    keyConceptDescription: "endl은 줄바꿈을 합니다. cout이 두 번 있고 각각 endl로 끝나면 두 줄이 출력됩니다.",
    relatedTopics: ["cout", "endl", "여러 줄 출력"],
  },
  {
    id: 366,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "빈칸에 알맞은 헤더를 써서 Hello World 프로그램을 완성하세요.",
    code: `___ <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
    options: ["#include", "import", "require", "using"],
    correctAnswer: 0,
    explanation: "#include <iostream>으로 출력 도구를 가져와야 cout을 쓸 수 있습니다.",
    keyConceptTitle: "#include",
    keyConceptDescription: "#include <헤더파일>: 필요한 기능을 불러옵니다. 파이썬의 import와 같은 역할이에요.",
    relatedTopics: ["#include", "헤더파일", "iostream"],
  },
  {
    id: 367,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "빈칸을 채워 int main()의 코드 블록을 올바르게 완성하세요.",
    code: `#include <iostream>

int main() ___
    std::cout << "Hello!" << std::endl;
    return 0;
___`,
    options: ["{, }", "(, )", ":, end", "[, ]"],
    correctAnswer: 0,
    explanation: "C++에서 코드 블록은 { }(중괄호)로 감쌉니다. 파이썬의 콜론(:)+들여쓰기 대신 { }를 사용해요.",
    keyConceptTitle: "중괄호 { }",
    keyConceptDescription: "C++은 함수, 조건문, 반복문 등 모든 블록을 { }로 감쌉니다. 여는 {와 닫는 }가 항상 쌍을 이루어야 합니다.",
    relatedTopics: ["중괄호", "코드 블록", "int main"],
  },
  {
    id: 368,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "빈칸을 채워 화면에 Hello를 출력하는 코드를 완성하세요.",
    code: `#include <iostream>

int main() {
    std::___ << "Hello" << std::endl;
    return 0;
}`,
    options: ["cout", "print", "output", "write"],
    correctAnswer: 0,
    explanation: "std::cout은 C++의 표준 출력 스트림입니다. 파이썬의 print()와 같은 역할이에요.",
    keyConceptTitle: "std::cout",
    keyConceptDescription: "std::cout: 화면에 출력하는 객체. << 연산자로 출력할 내용을 연결합니다.",
    relatedTopics: ["cout", "std::", "출력"],
  },
  {
    id: 369,
    lessonId: "cpp-1",
    difficulty: "쉬움",
    question: "빈칸을 채워 줄바꿈이 있는 출력 코드를 완성하세요.",
    code: `#include <iostream>

int main() {
    std::cout << "1번 줄" << std::___;
    std::cout << "2번 줄" << std::endl;
    return 0;
}`,
    options: ["endl", "newline", "enter", "break"],
    correctAnswer: 0,
    explanation: "std::endl은 줄바꿈을 합니다. 이걸 빠뜨리면 '1번 줄2번 줄'처럼 이어서 출력됩니다.",
    keyConceptTitle: "std::endl",
    keyConceptDescription: "std::endl: 줄바꿈 + 버퍼 비움. 출력 후 다음 줄로 넘어가고 싶을 때 사용합니다.",
    relatedTopics: ["endl", "줄바꿈", "cout"],
  },
  {
    id: 370,
    lessonId: "cpp-1",
    difficulty: "보통",
    question: "빈칸을 채워 main.cpp를 컴파일하고 hello라는 실행 파일을 만드세요.",
    code: `// 터미널에서 실행할 명령어:
g++ ___ hello main.cpp`,
    options: ["-o", "-out", "--output", "-name"],
    correctAnswer: 0,
    explanation: "g++ -o 실행파일명 소스파일.cpp 형식으로 씁니다. -o는 output(출력)의 줄임말이에요.",
    keyConceptTitle: "g++ -o 옵션",
    keyConceptDescription: "g++ -o 파일명 소스.cpp: 원하는 이름으로 실행 파일 생성. -o 없으면 자동으로 a.out이 생깁니다.",
    relatedTopics: ["g++", "-o", "컴파일", "실행 파일"],
  },
  {
    id: 371,
    lessonId: "cpp-1",
    difficulty: "보통",
    question: "다음 코드에서 빈칸에 들어갈 말을 완성하세요. (문장 종료 기호)",
    code: `#include <iostream>

int main() {
    std::cout << "C++은 재미있다" ___
    return 0;
}`,
    options: [";  (세미콜론)", ". (마침표)", ", (쉼표)", "엔터만 치면 된다"],
    correctAnswer: 0,
    explanation: "C++에서 모든 문장은 세미콜론(;)으로 끝나야 합니다. 빼면 컴파일 오류가 납니다.",
    keyConceptTitle: "세미콜론 ;",
    keyConceptDescription: "C++의 모든 명령문은 ;으로 끝납니다. 파이썬과 달리 줄바꿈 자체는 문장의 끝을 의미하지 않습니다.",
    relatedTopics: ["세미콜론", "문법", "컴파일 오류"],
  },
  // ── cpp-2 보충 (cout 심화 & namespace) ──
  {
    id: 345,
    lessonId: "cpp-2",
    difficulty: "쉬움",
    question: "using namespace std; 없이 cout을 사용하는 올바른 방법은?",
    code: `#include <iostream>
// using namespace std; 없음!

int main() {
    ___ << "Hello";
    return 0;
}`,
    options: ["cout << \"Hello\";", "std::cout << \"Hello\";", "namespace::cout << \"Hello\";", "c::cout << \"Hello\";"],
    correctAnswer: 1,
    explanation: "using namespace std; 없이는 std:: 접두사를 붙여서 std::cout으로 사용해야 합니다. 대규모 프로젝트에서는 std::를 붙이는 것이 권장됩니다.",
    keyConceptTitle: "std:: 네임스페이스",
    keyConceptDescription: "using namespace std; 없이는 모든 표준 라이브러리 요소에 std:: 접두사가 필요합니다. std::cout, std::endl, std::string 등.",
    relatedTopics: ["namespace", "std::", "using namespace std"],
  },
  {
    id: 346,
    lessonId: "cpp-2",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "그는 \\"안녕\\"이라고 했다." << endl;
    return 0;
}`,
    options: [
      '그는 \\"안녕\\"이라고 했다.',
      '그는 "안녕"이라고 했다.',
      "그는 안녕이라고 했다.",
      "컴파일 에러",
    ],
    correctAnswer: 1,
    explanation: '\\\\"는 문자열 안에서 큰따옴표를 출력하는 이스케이프 문자입니다. 실제 출력에는 \\\\ 없이 "만 나옵니다.',
    keyConceptTitle: "이스케이프 문자 \\\"",
    keyConceptDescription: '문자열 안에 큰따옴표를 넣으려면 \\\\"를 사용합니다. \\\\n(줄바꿈), \\\\t(탭)도 같은 방식입니다.',
    relatedTopics: ["이스케이프 문자", "cout"],
  },
  {
    id: 347,
    lessonId: "cpp-5",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int a = 10, b = 3;
    cout << a << "/" << b << "=" << a/b;
    return 0;
}`,
    options: ["10/3=3.33", "10/3=3", "10/3=3.0", "에러"],
    correctAnswer: 1,
    explanation: "int / int = int (정수 나눗셈). 10/3 = 3 (나머지 버림). cout은 그냥 값을 순서대로 출력합니다. 소수점 결과를 원하면 (double)a/b로 형변환해야 합니다.",
    keyConceptTitle: "정수 나눗셈과 cout",
    keyConceptDescription: "int/int는 정수 나눗셈입니다. cout은 값을 그대로 출력합니다. 소수 출력: cout << (double)a/b 또는 cout << 1.0*a/b",
    relatedTopics: ["정수 나눗셈", "cout", "형변환"],
  },
  // ── cpp-10 보충 (Range-for & auto) ──
  {
    id: 333,
    lessonId: "cpp-10",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {10, 20, 30};
    for (int x : v) {
        cout << x << " ";
    }
    return 0;
}`,
    options: ["10 20 30", "30 20 10", "0 1 2", "에러"],
    correctAnswer: 0,
    explanation: "range-based for문 `for (int x : v)`는 v의 원소를 순서대로 x에 넣으며 반복합니다. 파이썬의 `for x in v:`와 동일합니다.",
    keyConceptTitle: "Range-based for 문",
    keyConceptDescription: "for (타입 변수 : 컨테이너) — 컨테이너의 원소를 순서대로 꺼내 반복합니다. 파이썬의 for x in list:와 같은 역할입니다.",
    relatedTopics: ["range-based for", "벡터 순회", "C++11"],
  },
  {
    id: 334,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "벡터의 원소를 직접 수정하려면 어떻게 해야 하는가?",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (___ x : v) {
        x *= 2;  // 원소를 2배로 만들고 싶다
    }
    for (int x : v) cout << x << " ";
}`,
    options: [
      "for (int x : v)",
      "for (int& x : v)",
      "for (auto x : v)",
      "for (const int x : v)",
    ],
    correctAnswer: 1,
    explanation: "int& x처럼 참조(&)로 받아야 원본 벡터가 수정됩니다. 참조 없이 `int x`로 받으면 복사본만 수정되고 원본 v는 그대로입니다.",
    keyConceptTitle: "참조로 원소 수정",
    keyConceptDescription: "for (int& x : v)로 참조를 받으면 원본 수정 가능. for (int x : v)는 복사본. for (const int& x : v)는 읽기 전용.",
    relatedTopics: ["range-based for", "참조", "원소 수정"],
  },
  {
    id: 335,
    lessonId: "cpp-10",
    difficulty: "보통",
    question: "auto가 타입을 자동 추론하는 예시로 올바른 것은?",
    code: `#include <vector>
#include <string>
using namespace std;
int main() {
    vector<string> words = {"apple", "banana", "cherry"};
    for (auto word : words) {
        // word의 타입은?
    }
}`,
    options: ["word의 타입은 int", "word의 타입은 string (자동 추론)", "word의 타입은 vector<string>", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "auto는 초기값으로부터 타입을 자동으로 추론합니다. words가 vector<string>이므로 auto word는 string 타입이 됩니다.",
    keyConceptTitle: "auto 타입 추론",
    keyConceptDescription: "auto는 컴파일러가 초기값을 보고 타입을 자동으로 결정합니다. 긴 타입명(vector<string>::iterator 등)을 간단하게 쓸 수 있습니다.",
    relatedTopics: ["auto", "타입 추론", "C++11"],
  },
  // ── cpp-15 보충 (pair & 정렬) ──
  {
    id: 336,
    lessonId: "cpp-15",
    difficulty: "쉬움",
    question: "pair<string, int> p = {\"Kim\", 95};`에서 `p.first`와 `p.second`의 값은?",
    code: `#include <iostream>
#include <utility>
using namespace std;
int main() {
    pair<string, int> p = {"Kim", 95};
    cout << p.first << " " << p.second;
}`,
    options: [
      "95 Kim",
      "Kim 95",
      "0 0",
      "컴파일 오류",
    ],
    correctAnswer: 1,
    explanation: "pair에서 첫 번째 값은 .first, 두 번째 값은 .second로 접근합니다. p.first = \"Kim\", p.second = 95입니다.",
    keyConceptTitle: "pair.first / pair.second",
    keyConceptDescription: "pair<T1, T2>: 두 값을 묶는 구조. .first로 첫 번째, .second로 두 번째 값에 접근합니다. 이름-점수, 좌표 등에 활용합니다.",
    relatedTopics: ["pair", ".first", ".second", "<utility>"],
  },
  {
    id: 337,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "pair 벡터를 점수 내림차순으로 정렬하는 올바른 코드는?",
    code: `#include <algorithm>
#include <vector>
using namespace std;
int main() {
    vector<pair<string, int>> students = {
        {"Kim", 85}, {"Lee", 92}, {"Park", 78}
    };
    sort(students.begin(), students.end(), ___);
}`,
    options: [
      "[](auto a, auto b) { return a.first < b.first; }",
      "[](auto a, auto b) { return a.second > b.second; }",
      "greater<pair<string,int>>()",
      "[](auto a, auto b) { return a > b; }",
    ],
    correctAnswer: 1,
    explanation: "람다에서 a.second > b.second는 '점수(second)가 더 큰 것이 앞에 온다'는 조건입니다. 결과: Lee(92), Kim(85), Park(78) 순서.",
    keyConceptTitle: "pair 커스텀 정렬",
    keyConceptDescription: "sort()의 세 번째 인자로 비교 함수(또는 람다)를 전달합니다. a.second > b.second는 second 기준 내림차순 정렬입니다.",
    relatedTopics: ["sort", "pair 정렬", "람다", "커스텀 정렬"],
  },
  // ── cpp-19 보충 (파일 I/O & Fast I/O) ──
  {
    id: 339,
    lessonId: "cpp-19",
    difficulty: "쉬움",
    question: "USACO에서 파일에서 입력을 읽기 위해 사용하는 C++ 클래스는?",
    code: `#include <fstream>
using namespace std;
int main() {
    ___ fin("input.txt");
    int x;
    fin >> x;
    fin.close();
}`,
    options: ["ofstream", "ifstream", "fstream", "iostream"],
    correctAnswer: 1,
    explanation: "ifstream은 input file stream의 약자입니다. 파일에서 읽기 위해 사용합니다. ofstream은 파일에 쓸 때, fstream은 읽기/쓰기 모두 가능합니다.",
    keyConceptTitle: "ifstream — 파일 읽기",
    keyConceptDescription: "ifstream fin(\"파일명\"); 으로 파일을 열고, fin >> 변수로 읽습니다. cin 대신 fin을 쓰면 됩니다. close()로 닫는 것을 잊지 마세요.",
    relatedTopics: ["ifstream", "파일 입출력", "<fstream>", "USACO"],
  },
  {
    id: 340,
    lessonId: "cpp-19",
    difficulty: "보통",
    question: "Fast I/O 설정 후 절대 하면 안 되는 것은?",
    code: `ios_base::sync_with_stdio(false);
cin.tie(nullptr);
// 이 이후로 ?`,
    options: [
      "cin >> n; 사용",
      "cout << n; 사용",
      "scanf(\"%d\", &n); 사용",
      "getline(cin, s); 사용",
    ],
    correctAnswer: 2,
    explanation: "sync_with_stdio(false)는 C++ 스트림(cin/cout)과 C 스트림(scanf/printf)의 동기화를 끊습니다. 이후 두 가지를 섞어 쓰면 입출력 순서가 꼬입니다.",
    keyConceptTitle: "Fast I/O 주의사항",
    keyConceptDescription: "sync_with_stdio(false) 후에는 cin/cout만 사용해야 합니다. scanf/printf를 섞으면 출력 순서가 비정상적이 됩니다.",
    relatedTopics: ["sync_with_stdio", "Fast I/O", "scanf 금지"],
  },
  {
    id: 341,
    lessonId: "cpp-19",
    difficulty: "보통",
    question: "endl보다 '\\n'을 쓰는 것이 더 빠른 이유는?",
    code: `// 느린 방식
cout << result << endl;  // 출력 + 버퍼 flush!

// 빠른 방식
cout << result << "\\n"; // 출력만`,
    options: [
      "\\n은 두 글자라서",
      "endl은 줄바꿈 + 버퍼를 강제로 비워서(flush) 느림",
      "endl은 C++20에서 제거됨",
      "\\n은 더 짧은 코드라서",
    ],
    correctAnswer: 1,
    explanation: "endl은 '\\n' + flush(버퍼 강제 비우기)를 합니다. 대량 출력에서 flush 연산이 누적되면 매우 느려집니다. 경쟁 프로그래밍에서는 '\\n'을 사용합니다.",
    keyConceptTitle: "endl vs \\n",
    keyConceptDescription: "endl = '\\n' + 버퍼 flush. 버퍼 flush는 비용이 큰 작업입니다. 출력이 많은 경우 항상 '\\n'을 사용하세요.",
    relatedTopics: ["endl", "\\n", "버퍼 flush", "성능"],
  },
  // ── cpp-p1 (숫자 맞추기 게임 프로젝트) ──
  {
    id: 342,
    lessonId: "cpp-p1",
    difficulty: "쉬움",
    question: "숫자 맞추기 게임에서 1~100 사이의 난수를 생성하는 올바른 코드는?",
    code: `#include <cstdlib>  // rand, srand
#include <ctime>    // time

srand(time(0));    // 시드 설정
int answer = ___;  // 1~100 사이`,
    options: [
      "rand() + 1",
      "rand() % 100 + 1",
      "random(1, 100)",
      "rand(1, 100)",
    ],
    correctAnswer: 1,
    explanation: "rand() % 100은 0~99를 반환합니다. +1을 하면 1~100이 됩니다. srand(time(0))으로 매번 다른 시드를 설정해야 진짜 랜덤이 됩니다.",
    keyConceptTitle: "rand() % N + 1 패턴",
    keyConceptDescription: "rand() % N: 0~(N-1). rand() % N + 1: 1~N. rand() % 100 + 1: 1~100. srand(time(0))으로 매번 다른 시드를 설정합니다.",
    relatedTopics: ["rand()", "srand()", "난수 생성", "% 연산"],
  },
  {
    id: 343,
    lessonId: "cpp-p1",
    difficulty: "보통",
    question: "게임 루프에서 '정답을 맞출 때까지 반복'을 구현하는 올바른 패턴은?",
    code: `int answer = rand() % 100 + 1;
int guess = 0;

___  // 정답 맞출 때까지 계속 반복
{
    cin >> guess;
    if (guess < answer) cout << "⬆️ 더 큰 숫자\\n";
    else if (guess > answer) cout << "⬇️ 더 작은 숫자\\n";
}`,
    options: [
      "for (int i = 0; i < 100; i++)",
      "while (guess != answer)",
      "if (guess != answer)",
      "do {} while (false)",
    ],
    correctAnswer: 1,
    explanation: "while (guess != answer)은 guess가 answer와 같아질 때까지 반복합니다. 정답을 맞추면 루프가 종료됩니다.",
    keyConceptTitle: "게임 루프 패턴",
    keyConceptDescription: "조건이 참인 동안 반복 → while(조건). 정답 맞추기, 메뉴 선택, 게임 진행 등에 자주 사용하는 패턴입니다.",
    relatedTopics: ["while", "게임 루프", "조건 반복"],
  },
  {
    id: 344,
    lessonId: "cpp-p1",
    difficulty: "보통",
    question: "시도 횟수를 세는 변수를 올바르게 사용한 코드는?",
    code: `int answer = rand() % 100 + 1;
int guess = 0;
___ tries = 0;  // 시도 횟수

while (guess != answer) {
    cin >> guess;
    ___  // 시도 횟수 증가
}
cout << tries << "번 만에 맞췄어요!";`,
    options: [
      "string tries; / tries++;",
      "int tries; / tries++;",
      "float tries; / tries += 1.0;",
      "bool tries; / tries = true;",
    ],
    correctAnswer: 1,
    explanation: "횟수 카운팅에는 int 타입을 사용합니다. tries++는 tries += 1과 동일합니다. 루프 안에서 매 반복마다 1씩 증가시킵니다.",
    keyConceptTitle: "카운터 변수 패턴",
    keyConceptDescription: "int count = 0; ... count++; 패턴은 반복 횟수, 시도 횟수, 조건 만족 횟수 등을 셀 때 가장 기본적인 패턴입니다.",
    relatedTopics: ["카운터", "int", "++연산자"],
  },
  {
    id: 372,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int a = 7, b = 2;
    cout << a / b << endl;
    return 0;
}`,
    options: ["3", "3.5", "4", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "int끼리 나누면 소수점이 버려져요. 7 ÷ 2 = 3.5지만 int/int = 3입니다. 결과를 3.5로 만들려면 (double)a / b 또는 7.0 / 2처럼 double로 변환해야 해요.",
    keyConceptTitle: "정수 나눗셈 함정",
    keyConceptDescription: "int / int는 항상 정수 결과를 반환합니다. 소수점 결과가 필요하면 피연산자 중 하나를 double로 변환하세요.",
    relatedTopics: ["정수 나눗셈", "int", "double"],
  },
  {
    id: 373,
    lessonId: "cpp-11",
    difficulty: "쉬움",
    question: "문자열 \"42\"를 정수로 바꾸는 올바른 코드는?",
    code: "",
    options: [
      "int n = int(\"42\");",
      "int n = stoi(\"42\");",
      "int n = to_int(\"42\");",
      "int n = (\"42\");",
    ],
    correctAnswer: 1,
    explanation: "문자열 → 정수 변환은 stoi(), 문자열 → 실수 변환은 stod()를 사용해요. to_int()는 C++에 없는 함수예요!",
    keyConceptTitle: "타입 변환 함수",
    keyConceptDescription: "stoi(문자열) → int, stod(문자열) → double, to_string(숫자) → string. 세 가지를 꼭 기억하세요!",
    relatedTopics: ["stoi", "stod", "to_string", "타입 변환"],
  },
  {
    id: 374,
    lessonId: "cpp-11",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    int score = 95;
    string msg = "점수: " + to_string(score);
    cout << msg << endl;
    return 0;
}`,
    options: ["점수: 95", "점수: score", "컴파일 오류", "점수: 0"],
    correctAnswer: 0,
    explanation: "to_string(95)은 정수 95를 문자열 \"95\"로 변환해요. 그래서 \"점수: \" + \"95\" = \"점수: 95\"가 출력됩니다.",
    keyConceptTitle: "to_string() 함수",
    keyConceptDescription: "숫자를 문자열로 바꿀 때 to_string()을 사용해요. 문자열과 숫자를 +로 직접 합치면 컴파일 오류가 나므로 반드시 to_string()으로 변환 후 합쳐야 해요.",
    relatedTopics: ["to_string", "타입 변환", "string"],
  },
  {
    id: 375,
    lessonId: "cpp-5",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int a = 5;
    cout << a++ << endl;
    cout << ++a << endl;
    return 0;
}`,
    options: ["5\n7", "6\n7", "5\n6", "6\n6"],
    correctAnswer: 0,
    explanation: "a++(후위): 현재 값(5)을 출력한 후 증가 → a=6. ++a(전위): 먼저 증가(a=7)한 후 출력 → 7. 결과: 5, 7",
    keyConceptTitle: "전위 vs 후위 증감",
    keyConceptDescription: "x++는 현재 값을 먼저 사용하고 나중에 증가, ++x는 먼저 증가하고 그 값을 사용합니다.",
    relatedTopics: ["전위 증감", "후위 증감", "++", "--"],
  },
  {
    id: 376,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드에서 b의 값은?",
    code: `int a = 10;
int b = ++a;`,
    options: ["10", "11", "12", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "++a(전위)는 먼저 a를 11로 증가시킨 후 b에 대입해요. b = 11입니다. a++였다면 b = 10, a = 11이 되었을 거예요.",
    keyConceptTitle: "전위 증감 대입",
    keyConceptDescription: "++x: 증가 먼저, 그 값 사용. x++: 현재 값 사용, 나중에 증가.",
    relatedTopics: ["전위 증감", "++"],
  },
  {
    id: 377,
    lessonId: "cpp-8",
    difficulty: "보통",
    question: "다음 코드가 컴파일 오류 없이 동작하려면 빈칸에 무엇이 필요한가?",
    code: `#include <iostream>
using namespace std;

// 빈칸

int main() {
    cout << add(3, 4) << endl;
    return 0;
}

int add(int a, int b) {
    return a + b;
}`,
    options: [
      "int add(int a, int b);",
      "int add();",
      "add(int, int);",
      "아무것도 필요없다",
    ],
    correctAnswer: 0,
    explanation: "C++은 위에서 아래로 읽어요. main()에서 add()를 호출할 때 아직 add()가 정의되지 않았으므로 오류가 발생해요. 함수 프로토타입(원형 선언)을 위에 적어두면 해결됩니다.",
    keyConceptTitle: "함수 프로토타입",
    keyConceptDescription: "함수 정의가 호출보다 아래에 있으면 컴파일 오류가 발생해요. 함수 프로토타입(반환타입 함수명(매개변수타입);)을 상단에 선언하면 해결됩니다.",
    relatedTopics: ["함수 프로토타입", "전방 선언", "컴파일"],
  },
  {
    id: 378,
    lessonId: "cpp-8",
    difficulty: "쉬움",
    question: "다음 중 올바른 설명은?",
    code: `// 함수 A
int getDouble(int x) {
    return x * 2;
}

// 함수 B
void printDouble(int x) {
    cout << x * 2 << endl;
}`,
    options: [
      "두 함수 모두 화면에 출력한다",
      "getDouble은 값을 돌려주고, printDouble은 화면에 출력한다",
      "return이 있어야 cout도 사용할 수 있다",
      "void 함수는 아무것도 할 수 없다",
    ],
    correctAnswer: 1,
    explanation: "return은 함수를 호출한 곳에 값을 '돌려줍니다'. cout은 화면에 '출력'합니다. getDouble(5)는 10을 돌려줘서 다른 계산에 쓸 수 있고, printDouble(5)는 10을 화면에 출력만 합니다.",
    keyConceptTitle: "return vs cout",
    keyConceptDescription: "return: 함수 호출자에게 값을 반환 (다른 계산에 활용 가능). cout: 화면에 출력 (값이 사라짐). 재사용 가능한 함수를 만들려면 return을 사용하세요.",
    relatedTopics: ["return", "cout", "void", "함수"],
  },
  // cpp-15: pair & 정렬
  {
    id: 379,
    lessonId: "cpp-15",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>\nusing namespace std;\nint main() {\n    pair<string, int> p = {"Alice", 90};\n    cout << p.first << " " << p.second << endl;\n    return 0;\n}`,
    options: ["Alice 90", "90 Alice", "first second", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "pair의 첫 번째 값은 .first, 두 번째 값은 .second로 접근해요.",
    keyConceptTitle: "pair 접근",
    keyConceptDescription: "pair<T1, T2>의 값은 .first와 .second로 접근합니다.",
    relatedTopics: ["pair", "first", "second"],
  },
  {
    id: 380,
    lessonId: "cpp-23",
    difficulty: "쉬움",
    question: "vector를 오름차순 정렬하는 올바른 코드는?",
    code: "",
    options: ["sort(v.begin(), v.end());", "sort(v);", "v.sort();", "sort(v, ascending);"],
    correctAnswer: 0,
    explanation: "sort()는 #include <algorithm>이 필요하고, 범위를 begin()~end()로 지정해요. sort(v)나 v.sort()는 C++에서 작동하지 않아요.",
    keyConceptTitle: "sort() 함수",
    keyConceptDescription: "sort(v.begin(), v.end())로 오름차순 정렬. #include <algorithm> 필요.",
    relatedTopics: ["sort", "algorithm", "vector"],
  },
  {
    id: 381,
    lessonId: "cpp-23",
    difficulty: "쉬움",
    question: "vector를 내림차순으로 정렬하는 올바른 코드는?",
    code: "",
    options: [
      "sort(v.begin(), v.end(), greater<int>());",
      "sort(v.begin(), v.end(), less<int>());",
      "sort(v.rbegin(), v.rend(), greater<int>());",
      "rsort(v.begin(), v.end());",
    ],
    correctAnswer: 0,
    explanation: "내림차순은 세 번째 인자로 greater<int>()를 넘겨줘요. less<int>()는 오름차순(기본값)이에요.",
    keyConceptTitle: "sort 내림차순",
    keyConceptDescription: "sort(v.begin(), v.end(), greater<T>())로 내림차순 정렬.",
    relatedTopics: ["sort", "greater", "내림차순"],
  },
  {
    id: 382,
    lessonId: "cpp-23",
    difficulty: "쉬움",
    question: "다음 코드 실행 후 v[0]의 값은?",
    code: `#include <algorithm>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {5, 2, 8, 1, 9};\n    sort(v.begin(), v.end());\n    return 0;\n}`,
    options: ["1", "5", "9", "2"],
    correctAnswer: 0,
    explanation: "sort()는 오름차순 정렬이므로 {1, 2, 5, 8, 9}가 되고, v[0]은 가장 작은 값 1이에요.",
    keyConceptTitle: "sort 오름차순",
    keyConceptDescription: "sort()의 기본은 오름차순(작은 → 큰). v[0]이 가장 작은 값이 됩니다.",
    relatedTopics: ["sort", "오름차순"],
  },
  {
    id: 383,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "vector<pair<int,int>>를 sort하면 어떤 기준으로 정렬되나요?",
    code: "",
    options: [
      "first 오름차순, first 같으면 second 오름차순",
      "second 기준으로만 정렬",
      "first 내림차순 정렬",
      "정렬 불가 (컴파일 오류)",
    ],
    correctAnswer: 0,
    explanation: "pair는 first를 먼저 비교하고, first가 같으면 second를 비교해요. 이 특성을 활용하면 다중 기준 정렬을 쉽게 할 수 있어요.",
    keyConceptTitle: "pair 정렬 기준",
    keyConceptDescription: "pair 정렬: first 먼저, first 같으면 second 비교. 자동으로 다중 기준 정렬 가능.",
    relatedTopics: ["pair", "sort", "비교"],
  },
  {
    id: 384,
    lessonId: "cpp-15",
    difficulty: "쉬움",
    question: "pair를 만드는 올바른 방법이 아닌 것은?",
    code: "",
    options: [
      "pair<int,int> p = new_pair(1, 2);",
      "pair<int,int> p = {1, 2};",
      "auto p = make_pair(1, 2);",
      "pair<int,int> p = make_pair(1, 2);",
    ],
    correctAnswer: 0,
    explanation: "new_pair()는 존재하지 않는 함수예요. pair는 중괄호 초기화({1,2}), make_pair(), 또는 직접 선언으로 만들 수 있어요.",
    keyConceptTitle: "pair 생성 방법",
    keyConceptDescription: "pair 생성: {val1, val2} 또는 make_pair(val1, val2). new_pair()는 없음.",
    relatedTopics: ["pair", "make_pair"],
  },
  {
    id: 385,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "벡터를 절댓값 기준 오름차순으로 정렬하는 코드는?",
    code: "",
    options: [
      "sort(v.begin(), v.end(), [](int a, int b){ return abs(a) < abs(b); });",
      "sort(v.begin(), v.end(), abs);",
      "sort(v.begin(), v.end(), [](int a, int b){ return a < b; });",
      "sort(v.begin(), v.end(), greater<int>());",
    ],
    correctAnswer: 0,
    explanation: "람다 함수로 커스텀 비교를 만들어요. [](int a, int b){ return abs(a) < abs(b); }는 절댓값이 작은 것이 앞에 오도록 정렬해요.",
    keyConceptTitle: "람다 커스텀 정렬",
    keyConceptDescription: "sort()의 세 번째 인자로 람다를 넘겨 원하는 기준으로 정렬할 수 있어요.",
    relatedTopics: ["lambda", "sort", "커스텀 정렬"],
  },
  {
    id: 386,
    lessonId: "cpp-15",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>\n#include <tuple>\nusing namespace std;\nint main() {\n    tuple<string, int, double> t = {"Bob", 20, 3.5};\n    cout << get<1>(t) << endl;\n    return 0;\n}`,
    options: ["20", "Bob", "3.5", "1"],
    correctAnswer: 0,
    explanation: "get<N>(t)로 tuple의 N번째 값(0-based)에 접근해요. get<1>(t)는 두 번째 값인 20입니다.",
    keyConceptTitle: "tuple 접근",
    keyConceptDescription: "tuple 원소는 get<인덱스>(tuple)로 접근. 0부터 시작하는 인덱스 사용.",
    relatedTopics: ["tuple", "get"],
  },
  {
    id: 387,
    lessonId: "cpp-23",
    difficulty: "쉬움",
    question: "C-style 배열을 sort할 때 올바른 코드는? (int arr[5])",
    code: "",
    options: [
      "sort(arr, arr + 5);",
      "sort(arr.begin(), arr.end());",
      "arr.sort();",
      "sort(arr[0], arr[4]);",
    ],
    correctAnswer: 0,
    explanation: "C-style 배열은 .begin()/.end()가 없어요. 포인터 arr(시작)와 arr+n(끝)을 사용합니다.",
    keyConceptTitle: "배열 sort",
    keyConceptDescription: "배열 정렬: sort(arr, arr + n). 벡터는 sort(v.begin(), v.end()).",
    relatedTopics: ["sort", "배열", "포인터"],
  },
  {
    id: 388,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "다음 코드 실행 후 출력 결과는?",
    code: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<pair<int,int>> v = {{2,5},{1,3},{2,1}};\n    sort(v.begin(), v.end());\n    cout << v[0].first << " " << v[0].second << endl;\n    return 0;\n}`,
    options: ["1 3", "2 5", "2 1", "1 5"],
    correctAnswer: 0,
    explanation: "pair 정렬은 first 먼저 비교: {1,3}이 first=1로 가장 작아 첫 번째. {2,1}과 {2,5}는 first=2로 같으니 second 비교 → {2,1}이 앞. 결과: {1,3},{2,1},{2,5}. v[0]은 {1,3}.",
    keyConceptTitle: "pair 정렬 실전",
    keyConceptDescription: "pair 정렬은 first 먼저, 같으면 second 비교.",
    relatedTopics: ["pair", "sort"],
  },
  // cpp-18: stack, queue & deque
  {
    id: 389,
    lessonId: "cpp-18",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <stack>\n#include <iostream>\nusing namespace std;\nint main() {\n    stack<int> s;\n    s.push(1); s.push(2); s.push(3);\n    cout << s.top() << endl;\n    return 0;\n}`,
    options: ["3", "1", "2", "오류"],
    correctAnswer: 0,
    explanation: "stack은 LIFO(마지막에 넣은 것이 먼저 나옴). push(1), push(2), push(3) 후 top()은 가장 마지막에 넣은 3이에요.",
    keyConceptTitle: "stack LIFO",
    keyConceptDescription: "stack은 Last In First Out. top()으로 가장 최근에 push한 값을 확인.",
    relatedTopics: ["stack", "LIFO", "top"],
  },
  {
    id: 390,
    lessonId: "cpp-18",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <queue>\n#include <iostream>\nusing namespace std;\nint main() {\n    queue<int> q;\n    q.push(1); q.push(2); q.push(3);\n    cout << q.front() << endl;\n    return 0;\n}`,
    options: ["1", "3", "2", "오류"],
    correctAnswer: 0,
    explanation: "queue는 FIFO(먼저 넣은 것이 먼저 나옴). front()는 가장 먼저 push한 1을 반환해요.",
    keyConceptTitle: "queue FIFO",
    keyConceptDescription: "queue는 First In First Out. front()로 가장 먼저 push한 값 확인.",
    relatedTopics: ["queue", "FIFO", "front"],
  },
  {
    id: 391,
    lessonId: "cpp-18",
    difficulty: "쉬움",
    question: "C++ stack에서 값을 꺼낼 때 올바른 순서는?",
    code: "",
    options: [
      "top()으로 값을 확인 후 pop()으로 제거",
      "pop()이 값을 반환하므로 바로 사용",
      "push()로 넣고 top()으로 꺼냄",
      "front()로 확인 후 pop()",
    ],
    correctAnswer: 0,
    explanation: "C++ stack의 pop()은 값을 반환하지 않고 그냥 제거만 해요. 반드시 top()으로 값을 먼저 확인한 후 pop()으로 제거해야 해요.",
    keyConceptTitle: "stack pop() 주의",
    keyConceptDescription: "C++ pop()은 값을 반환하지 않음. 순서: top()으로 확인 → pop()으로 제거.",
    relatedTopics: ["stack", "pop", "top"],
  },
  {
    id: 392,
    lessonId: "cpp-18",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <queue>\n#include <iostream>\nusing namespace std;\nint main() {\n    priority_queue<int> pq;\n    pq.push(3); pq.push(1); pq.push(5); pq.push(2);\n    cout << pq.top() << endl;\n    return 0;\n}`,
    options: ["5", "3", "1", "2"],
    correctAnswer: 0,
    explanation: "priority_queue는 기본적으로 최대 힙(max-heap)이에요. 가장 큰 값이 top()에 있으므로 5가 출력돼요.",
    keyConceptTitle: "priority_queue (max-heap)",
    keyConceptDescription: "priority_queue 기본은 max-heap. top()은 항상 가장 큰 값.",
    relatedTopics: ["priority_queue", "max-heap", "heap"],
  },
  {
    id: 393,
    lessonId: "cpp-18",
    difficulty: "보통",
    question: "priority_queue를 최솟값이 먼저 나오도록(min-heap) 만드는 올바른 선언은?",
    code: "",
    options: [
      "priority_queue<int, vector<int>, greater<int>> pq;",
      "priority_queue<int, vector<int>, less<int>> pq;",
      "priority_queue<int> pq(min);",
      "min_priority_queue<int> pq;",
    ],
    correctAnswer: 0,
    explanation: "min-heap은 priority_queue<int, vector<int>, greater<int>>로 선언해요. greater<int>를 쓰면 작은 값이 top()에 오게 됩니다.",
    keyConceptTitle: "priority_queue min-heap",
    keyConceptDescription: "min-heap: priority_queue<T, vector<T>, greater<T>>. 가장 작은 값이 top().",
    relatedTopics: ["priority_queue", "min-heap", "greater"],
  },
  {
    id: 394,
    lessonId: "cpp-18",
    difficulty: "쉬움",
    question: "deque에서 앞쪽에 값을 추가하는 함수는?",
    code: "",
    options: ["push_front()", "push_back()", "push()", "insert_front()"],
    correctAnswer: 0,
    explanation: "deque는 양쪽 끝 모두 O(1)으로 추가/제거 가능해요. 앞쪽 추가는 push_front(), 뒤쪽 추가는 push_back()이에요.",
    keyConceptTitle: "deque push_front",
    keyConceptDescription: "deque: push_front()/pop_front() (앞), push_back()/pop_back() (뒤). 양쪽 O(1).",
    relatedTopics: ["deque", "push_front"],
  },
  {
    id: 395,
    lessonId: "cpp-18",
    difficulty: "보통",
    question: "괄호 매칭 알고리즘에서 stack을 어떻게 사용하나요?",
    code: "",
    options: [
      "'(' 만나면 push, ')' 만나면 pop (stack이 비어있으면 불일치)",
      "모든 괄호를 push하고 마지막에 비교",
      "')' 만나면 push, '(' 만나면 pop",
      "stack 크기가 0이면 균형",
    ],
    correctAnswer: 0,
    explanation: "'('를 만나면 stack에 push, ')'를 만나면 pop해요. stack이 비어있을 때 ')'가 오면 불일치. 끝에 stack이 비어있어야 올바른 괄호예요.",
    keyConceptTitle: "stack 괄호 매칭",
    keyConceptDescription: "LIFO 특성 활용: '(' push, ')' pop. 끝에 stack이 비면 올바른 괄호.",
    relatedTopics: ["stack", "괄호 매칭", "LIFO"],
  },
  {
    id: 396,
    lessonId: "cpp-18",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <queue>\n#include <iostream>\nusing namespace std;\nint main() {\n    priority_queue<int> pq;\n    pq.push(4); pq.push(1); pq.push(7);\n    while (!pq.empty()) {\n        cout << pq.top() << " ";\n        pq.pop();\n    }\n    return 0;\n}`,
    options: ["7 4 1", "1 4 7", "4 1 7", "7 1 4"],
    correctAnswer: 0,
    explanation: "priority_queue(max-heap)는 항상 가장 큰 값을 top()에 넣어요. 꺼내는 순서: 7 → 4 → 1 (내림차순).",
    keyConceptTitle: "priority_queue 순서",
    keyConceptDescription: "max-heap은 큰 값부터 꺼냄. while(!pq.empty()) 패턴으로 모든 원소 처리.",
    relatedTopics: ["priority_queue", "max-heap"],
  },
  {
    id: 397,
    lessonId: "cpp-18",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <queue>\n#include <iostream>\nusing namespace std;\nint main() {\n    queue<int> q;\n    q.push(10); q.push(20); q.push(30);\n    q.pop();\n    cout << q.front() << endl;\n    return 0;\n}`,
    options: ["20", "10", "30", "오류"],
    correctAnswer: 0,
    explanation: "push(10), push(20), push(30) 후 pop()은 가장 먼저 들어온 10을 제거해요. 이후 front()는 다음 원소인 20이에요.",
    keyConceptTitle: "queue pop과 front",
    keyConceptDescription: "queue.pop()은 front(가장 오래된 값)를 제거. 그 다음 front()는 두 번째 원소.",
    relatedTopics: ["queue", "pop", "front"],
  },
  {
    id: 398,
    lessonId: "cpp-18",
    difficulty: "쉬움",
    question: "웹 브라우저 '뒤로 가기' 기능처럼 가장 최근 방문 페이지로 돌아가려면 어떤 자료구조가 적합한가?",
    code: "",
    options: ["stack (LIFO)", "queue (FIFO)", "priority_queue", "deque"],
    correctAnswer: 0,
    explanation: "뒤로 가기는 가장 최근 페이지(마지막에 방문한 것)로 돌아가므로 LIFO 구조인 stack이 적합해요.",
    keyConceptTitle: "stack 활용",
    keyConceptDescription: "stack(LIFO) 활용: 뒤로가기, undo 기능, 괄호 매칭. queue(FIFO): 대기열, BFS.",
    relatedTopics: ["stack", "LIFO", "자료구조 선택"],
  },
  // cpp-19: 파일 I/O & Fast I/O
  {
    id: 399,
    lessonId: "cpp-19",
    difficulty: "쉬움",
    question: "USACO에서 파일 입출력을 설정하는 freopen 코드 중 올바른 것은?",
    code: "",
    options: [
      "freopen(\"input.txt\", \"r\", stdin);",
      "freopen(stdin, \"input.txt\", \"r\");",
      "freopen(\"input.txt\", stdin);",
      "file_open(\"input.txt\", \"r\");",
    ],
    correctAnswer: 0,
    explanation: "freopen(파일명, 모드, 스트림) 순서예요. \"r\"은 읽기(read), stdin은 표준 입력. 이 코드 이후 cin이 파일에서 읽어요.",
    keyConceptTitle: "freopen 사용법",
    keyConceptDescription: "freopen(\"파일명\", \"r\", stdin) — 입력 파일 연결. freopen(\"파일명\", \"w\", stdout) — 출력 파일 연결.",
    relatedTopics: ["freopen", "파일 I/O", "USACO"],
  },
  {
    id: 400,
    lessonId: "cpp-19",
    difficulty: "쉬움",
    question: "Fast I/O를 위해 main() 시작 부분에 넣어야 할 코드는?",
    code: "",
    options: [
      "ios_base::sync_with_stdio(false); cin.tie(nullptr);",
      "fast_io(); cin.speed(max);",
      "ios::sync(false);",
      "cin.fast_mode = true;",
    ],
    correctAnswer: 0,
    explanation: "Fast I/O의 표준 설정이에요. sync_with_stdio(false)는 C/C++ 스트림 동기화를 끊고, cin.tie(nullptr)는 cin과 cout의 묶음을 해제해요.",
    keyConceptTitle: "Fast I/O",
    keyConceptDescription: "ios_base::sync_with_stdio(false); cin.tie(nullptr); — 입출력 속도 2-5배 향상.",
    relatedTopics: ["Fast I/O", "sync_with_stdio", "cin.tie"],
  },
  {
    id: 401,
    lessonId: "cpp-19",
    difficulty: "쉬움",
    question: "대량 출력 시 성능을 위해 endl 대신 무엇을 쓰나요?",
    code: "",
    options: ["'\\n'", "newline()", "flush()", "endl은 항상 빠름"],
    correctAnswer: 0,
    explanation: "endl은 줄바꿈 + 버퍼 플러시(flush)를 해서 느려요. '\\n'은 줄바꿈만 하므로 10배 빠를 수 있어요. 경쟁 프로그래밍에서는 항상 '\\n'을 써요.",
    keyConceptTitle: "endl vs \\n 성능",
    keyConceptDescription: "endl = 줄바꿈 + flush (느림). '\\n' = 줄바꿈만 (빠름). 대량 출력에서 10배 차이.",
    relatedTopics: ["endl", "\\n", "성능", "flush"],
  },
  {
    id: 402,
    lessonId: "cpp-19",
    difficulty: "보통",
    question: "파일 'data.txt'에서 정수를 읽는 올바른 코드는?",
    code: "",
    options: [
      "ifstream fin(\"data.txt\"); int x; fin >> x;",
      "readfile(\"data.txt\") >> x;",
      "cin.open(\"data.txt\"); cin >> x;",
      "file<int> f(\"data.txt\"); f.read(x);",
    ],
    correctAnswer: 0,
    explanation: "#include <fstream>이 필요하고, ifstream 객체를 파일명으로 열어요. 이후 >> 연산자로 cin처럼 읽을 수 있어요.",
    keyConceptTitle: "ifstream 파일 읽기",
    keyConceptDescription: "ifstream fin(\"파일명\"); fin >> 변수; — cin과 동일한 방식으로 파일 읽기.",
    relatedTopics: ["ifstream", "fstream", "파일 I/O"],
  },
  {
    id: 403,
    lessonId: "cpp-19",
    difficulty: "보통",
    question: "파일에 결과를 출력하는 올바른 코드는?",
    code: "",
    options: [
      "ofstream fout(\"output.txt\"); fout << result;",
      "writefile(\"output.txt\") << result;",
      "cout.open(\"output.txt\"); cout << result;",
      "ofstream fout; fout.write(result);",
    ],
    correctAnswer: 0,
    explanation: "ofstream 객체로 파일을 열고 << 연산자로 cout처럼 출력해요. ofstream fout(\"파일명\")로 파일을 연결합니다.",
    keyConceptTitle: "ofstream 파일 쓰기",
    keyConceptDescription: "ofstream fout(\"파일명\"); fout << 값; — cout과 동일한 방식으로 파일에 출력.",
    relatedTopics: ["ofstream", "fstream", "파일 I/O"],
  },
  {
    id: 404,
    lessonId: "cpp-19",
    difficulty: "보통",
    question: "ios_base::sync_with_stdio(false) 설정 후 사용하면 안 되는 것은?",
    code: "",
    options: ["scanf / printf", "cin / cout", "getline", "endl"],
    correctAnswer: 0,
    explanation: "sync_with_stdio(false)를 설정하면 C와 C++ I/O 스트림이 분리돼요. 이후 scanf/printf와 cin/cout을 섞어 쓰면 출력 순서가 엉킬 수 있어요.",
    keyConceptTitle: "Fast I/O 제약사항",
    keyConceptDescription: "sync_with_stdio(false) 후 scanf/printf 사용 금지. cin/cout만 사용해야 안전.",
    relatedTopics: ["Fast I/O", "scanf", "printf", "sync_with_stdio"],
  },
  {
    id: 405,
    lessonId: "cpp-19",
    difficulty: "보통",
    question: "다음 코드에서 getline이 이름을 제대로 읽지 못하는 이유는?",
    code: `int age;\ncin >> age;\nstring name;\ngetline(cin, name);  // 이름을 못 읽음`,
    options: [
      "cin >> age 후 버퍼에 '\\n'이 남아서 getline이 바로 종료됨",
      "getline은 int 뒤에 사용할 수 없음",
      "name이 초기화되지 않아서",
      "cin과 getline은 같이 사용 불가",
    ],
    correctAnswer: 0,
    explanation: "cin >> age 입력 후 Enter(\\n)가 버퍼에 남아요. getline은 이 \\n을 만나 빈 문자열을 읽고 끝냅니다. 해결: cin.ignore()를 사이에 넣어요.",
    keyConceptTitle: "cin.ignore() 필요성",
    keyConceptDescription: "cin >> 후 getline 사용 시 cin.ignore() 필수. 버퍼에 남은 \\n 제거.",
    relatedTopics: ["getline", "cin.ignore", "버퍼"],
  },
  {
    id: 406,
    lessonId: "cpp-19",
    difficulty: "보통",
    question: "USACO 제출용 코드의 main() 시작 부분으로 올바른 것은? (문제명: 'milk')",
    code: "",
    options: [
      "ios_base::sync_with_stdio(false); cin.tie(nullptr); freopen(\"milk.in\", \"r\", stdin); freopen(\"milk.out\", \"w\", stdout);",
      "freopen(\"milk\", \"r\", stdin);",
      "fast_io(); open_file(\"milk\");",
      "ios_base::sync_with_stdio(false); freopen(\"input.txt\", \"r\", stdin);",
    ],
    correctAnswer: 0,
    explanation: "USACO는 Fast I/O + freopen 조합이 표준이에요. 입력 파일은 '문제명.in', 출력 파일은 '문제명.out'을 사용합니다.",
    keyConceptTitle: "USACO 제출 템플릿",
    keyConceptDescription: "USACO 템플릿: Fast I/O + freopen('문제명.in', 'r', stdin) + freopen('문제명.out', 'w', stdout).",
    relatedTopics: ["USACO", "freopen", "Fast I/O"],
  },
  {
    id: 407,
    lessonId: "cpp-4",
    difficulty: "쉬움",
    question: "C++ cin의 장점으로 올바른 것은?",
    code: "// Python\nage = int(input())  # 직접 int로 변환 필요\n\n// C++\nint age;\ncin >> age;         // 자동으로 int로 받음",
    options: [
      "cin은 자동으로 변수 타입에 맞게 입력을 변환한다",
      "cin은 항상 문자열로 입력받는다",
      "cin 사용 시 int()로 변환이 필요하다",
      "cin은 소수점 입력을 받을 수 없다",
    ],
    correctAnswer: 0,
    explanation: "C++의 cin은 변수 타입을 알고 있어서 자동으로 변환해줘요. int 변수면 정수로, double이면 실수로 받아요. Python의 int(input())처럼 직접 변환할 필요가 없어요.",
    keyConceptTitle: "cin 자동 타입 변환",
    keyConceptDescription: "cin >> 변수: 변수 타입에 맞게 자동 변환. Python의 int(input()) 불필요.",
    relatedTopics: ["cin", "타입 변환", "자동 변환"],
  },
  {
    id: 408,
    lessonId: "cpp-4",
    difficulty: "쉬움",
    question: "정수 두 개를 한 번에 입력받는 올바른 코드는?",
    code: "",
    options: [
      "cin >> a >> b;",
      "cin >> a, b;",
      "cin(a, b);",
      "cin >> a; >> b;",
    ],
    correctAnswer: 0,
    explanation: "cin은 >> 연산자를 연속으로 체이닝해서 여러 값을 한 번에 받을 수 있어요. 공백이나 엔터로 구분된 값을 순서대로 a, b에 넣어줘요.",
    keyConceptTitle: "cin 다중 입력",
    keyConceptDescription: "cin >> a >> b >> c; — >> 연속으로 여러 값 입력 가능. 공백/엔터로 구분.",
    relatedTopics: ["cin", "다중 입력", ">>"],
  },
  {
    id: 409,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "17 % 5의 결과는?",
    code: "",
    options: ["2", "3", "3.4", "5"],
    correctAnswer: 0,
    explanation: "% 연산자는 나눗셈의 나머지를 구해요. 17 ÷ 5 = 3 나머지 2이므로 17 % 5 = 2예요.",
    keyConceptTitle: "나머지 연산자 %",
    keyConceptDescription: "a % b = a를 b로 나눈 나머지. 짝수/홀수 판별: n % 2 == 0이면 짝수.",
    relatedTopics: ["%", "나머지", "modulo"],
  },
  {
    id: 410,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "정수 n이 홀수인지 확인하는 올바른 조건식은?",
    code: "",
    options: [
      "n % 2 == 1",
      "n / 2 == 1",
      "n % 2 == 0",
      "n * 2 == 1",
    ],
    correctAnswer: 0,
    explanation: "n % 2는 n을 2로 나눈 나머지예요. 홀수는 나머지가 1, 짝수는 나머지가 0이에요. n % 2 == 1이면 홀수입니다.",
    keyConceptTitle: "짝수/홀수 판별",
    keyConceptDescription: "n % 2 == 0: 짝수. n % 2 == 1 (또는 n % 2 != 0): 홀수.",
    relatedTopics: ["%", "짝수", "홀수"],
  },
  {
    id: 411,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드에서 a의 최종 값은?",
    code: "int a = 10;\na -= 3;\na *= 2;",
    options: ["14", "20", "17", "7"],
    correctAnswer: 0,
    explanation: "a -= 3: a = 10 - 3 = 7. a *= 2: a = 7 * 2 = 14.",
    keyConceptTitle: "복합 대입 연산자",
    keyConceptDescription: "a += b (a=a+b), a -= b (a=a-b), a *= b (a=a*b), a /= b (a=a/b), a %= b (a=a%b).",
    relatedTopics: ["+=", "-=", "*=", "복합 대입"],
  },
  {
    id: 412,
    lessonId: "cpp-5",
    difficulty: "보통",
    question: "다음 식의 결과는?",
    code: "int result = 2 + 3 * 4 - 1;",
    options: ["13", "19", "15", "11"],
    correctAnswer: 0,
    explanation: "곱셈 먼저: 3 * 4 = 12. 그 다음 왼쪽부터: 2 + 12 - 1 = 13. 덧셈/뺄셈보다 곱셈/나눗셈이 먼저예요.",
    keyConceptTitle: "연산자 우선순위",
    keyConceptDescription: "우선순위: () > * / % > + -. 같은 우선순위는 왼쪽부터.",
    relatedTopics: ["연산자 우선순위", "산술 연산자"],
  },
  {
    id: 413,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드에서 출력되는 것은?",
    code: "int x = 5;\nif (x < 0 || x > 3) {\n    cout << \"범위 밖\";\n} else {\n    cout << \"범위 안\";\n}",
    options: ["범위 밖", "범위 안", "컴파일 오류", "아무것도 출력 안 됨"],
    correctAnswer: 0,
    explanation: "|| (OR)는 둘 중 하나만 true면 true에요. x=5에서 x < 0은 false, x > 3은 true → 전체 true → '범위 밖' 출력.",
    keyConceptTitle: "논리 OR (||)",
    keyConceptDescription: "a || b: a 또는 b 중 하나라도 true면 true. 둘 다 false일 때만 false.",
    relatedTopics: ["||", "OR", "논리 연산자"],
  },
  {
    id: 414,
    lessonId: "cpp-5",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: "bool isRaining = false;\nif (!isRaining) {\n    cout << \"맑음\";\n} else {\n    cout << \"비\";\n}",
    options: ["맑음", "비", "false", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "!isRaining은 isRaining의 반대값이에요. isRaining = false이므로 !isRaining = true → if 블록 실행 → '맑음' 출력.",
    keyConceptTitle: "논리 NOT (!)",
    keyConceptDescription: "!true = false, !false = true. 조건을 반전시킬 때 사용.",
    relatedTopics: ["!", "NOT", "논리 연산자"],
  },
  {
    id: 415,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "score = 75일 때 출력되는 것은?",
    code: "int score = 75;\nif (score >= 90) {\n    cout << \"A\";\n} else if (score >= 80) {\n    cout << \"B\";\n} else if (score >= 70) {\n    cout << \"C\";\n} else {\n    cout << \"F\";\n}",
    options: ["C", "B", "A", "F"],
    correctAnswer: 0,
    explanation: "75 >= 90은 false, 75 >= 80은 false, 75 >= 70은 true → 'C' 출력. else if는 위 조건이 모두 false일 때만 검사해요.",
    keyConceptTitle: "else if 체인",
    keyConceptDescription: "else if는 위의 모든 조건이 false일 때만 검사. 조건을 순서대로 검사하고 처음 true인 블록만 실행.",
    relatedTopics: ["else if", "조건문", "분기"],
  },
  {
    id: 416,
    lessonId: "cpp-10",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `vector<int> v = {1, 2, 3};\nfor (int x : v) {\n    cout << x << " ";\n}`,
    options: ["1 2 3", "3 2 1", "0 1 2", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "range-based for는 컨테이너의 모든 원소를 순서대로 순회해요. v의 1, 2, 3을 차례로 x에 대입하며 출력합니다.",
    keyConceptTitle: "range-based for 기본",
    keyConceptDescription: "for (타입 변수 : 컨테이너) — 모든 원소를 순서대로 순회.",
    relatedTopics: ["range-for", "for", "vector"],
  },
  {
    id: 417,
    lessonId: "cpp-10",
    difficulty: "쉬움",
    question: "range-based for의 장점으로 옳은 것은?",
    code: "",
    options: [
      "인덱스 없이 모든 원소를 간단하게 순회 가능",
      "인덱스로 특정 원소 접근이 더 쉬움",
      "역순 순회가 더 쉬움",
      "원소 수정이 자동으로 됨",
    ],
    correctAnswer: 0,
    explanation: "range-based for는 인덱스 관리 없이 컨테이너의 모든 원소를 순회할 때 편리해요. 단, 인덱스가 필요하거나 역순 순회가 필요하면 일반 for를 써야 해요.",
    keyConceptTitle: "range-for 장단점",
    keyConceptDescription: "range-for 장점: 간결, 인덱스 불필요. 단점: 인덱스 접근/역순 순회 불가.",
    relatedTopics: ["range-for", "인덱스"],
  },
  {
    id: 418,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "벡터의 모든 원소를 2배로 만들려면?",
    code: `vector<int> v = {1, 2, 3};`,
    options: [
      "for (int& x : v) { x *= 2; }",
      "for (int x : v) { x *= 2; }",
      "for (const int& x : v) { x *= 2; }",
      "for (int x = v) { x *= 2; }",
    ],
    correctAnswer: 0,
    explanation: "int& x는 원소의 '참조'를 받아요. x를 수정하면 실제 벡터의 원소가 바뀌어요. int x (복사)는 임시 변수만 바꾸고 원본은 그대로예요.",
    keyConceptTitle: "range-for 참조(&)",
    keyConceptDescription: "for (int& x : v) — 참조로 받아서 원소 수정 가능. for (int x : v) — 복사본, 원본 불변.",
    relatedTopics: ["range-for", "참조", "&"],
  },
  {
    id: 419,
    lessonId: "cpp-10",
    difficulty: "쉬움",
    question: "다음에서 x의 타입은?",
    code: `auto x = 3.14;`,
    options: ["double", "float", "int", "auto (런타임에 결정)"],
    correctAnswer: 0,
    explanation: "auto는 초기값을 보고 컴파일러가 타입을 결정해요. 3.14는 double 리터럴이므로 x는 double이 돼요. auto는 런타임이 아닌 컴파일 타임에 결정됩니다.",
    keyConceptTitle: "auto 타입 추론",
    keyConceptDescription: "auto = 컴파일러가 초기값에서 타입 추론. 3.14→double, 42→int, 'a'→char.",
    relatedTopics: ["auto", "타입 추론"],
  },
  {
    id: 420,
    lessonId: "cpp-10",
    difficulty: "쉬움",
    question: "다음 코드에서 auto가 추론하는 타입은?",
    code: `vector<string> names = {"Alice", "Bob"};\nfor (auto name : names) {\n    cout << name;\n}`,
    options: ["string", "char*", "auto", "const string&"],
    correctAnswer: 0,
    explanation: "vector<string>을 순회하므로 auto는 원소 타입인 string으로 추론돼요. auto를 쓰면 타입을 직접 쓰지 않아도 되서 편리해요.",
    keyConceptTitle: "range-for with auto",
    keyConceptDescription: "for (auto x : v) — auto가 컨테이너 원소 타입으로 추론됨.",
    relatedTopics: ["auto", "range-for", "타입 추론"],
  },
  {
    id: 421,
    lessonId: "cpp-16",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `map<string, int> score;\nscore["Alice"] = 90;\nscore["Bob"] = 85;\ncout << score["Alice"] << endl;`,
    options: ["90", "85", "0", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "map은 키-값 쌍을 저장해요. score[\"Alice\"] = 90으로 저장하고, score[\"Alice\"]로 값을 꺼내면 90이 나와요.",
    keyConceptTitle: "map 삽입과 접근",
    keyConceptDescription: "map[key] = value로 삽입, map[key]로 접근. 없는 키 접근 시 기본값(0) 생성 주의.",
    relatedTopics: ["map", "키-값", "STL"],
  },
  {
    id: 422,
    lessonId: "cpp-16",
    difficulty: "쉬움",
    question: "map<int, string>에 {3,\"C\"}, {1,\"A\"}, {2,\"B\"}를 넣고 순서대로 출력하면?",
    code: "",
    options: [
      "1 2 3 순서로 출력",
      "넣은 순서(3 1 2)로 출력",
      "무작위 순서",
      "컴파일 오류",
    ],
    correctAnswer: 0,
    explanation: "map은 키를 자동으로 오름차순 정렬해서 저장해요. 순서와 상관없이 넣어도 항상 키 기준 오름차순으로 순회됩니다.",
    keyConceptTitle: "map 자동 정렬",
    keyConceptDescription: "map은 키를 항상 오름차순으로 정렬 유지. 삽입 순서와 무관.",
    relatedTopics: ["map", "정렬", "키"],
  },
  {
    id: 423,
    lessonId: "cpp-16",
    difficulty: "쉬움",
    question: "map에서 키가 존재하는지 확인하는 올바른 코드는?",
    code: `map<string, int> m;\nm["apple"] = 5;`,
    options: [
      "if (m.count(\"apple\")) { ... }",
      "if (m.has(\"apple\")) { ... }",
      "if (m[\"apple\"] != null) { ... }",
      "if (m.exists(\"apple\")) { ... }",
    ],
    correctAnswer: 0,
    explanation: "map.count(key)는 키가 있으면 1, 없으면 0을 반환해요. if문에서 1은 true로 처리되므로 존재 확인에 사용할 수 있어요.",
    keyConceptTitle: "map.count() 존재 확인",
    keyConceptDescription: "m.count(key): 키 존재하면 1, 없으면 0 반환. if(m.count(key))로 존재 확인.",
    relatedTopics: ["map", "count", "존재 확인"],
  },
  {
    id: 424,
    lessonId: "cpp-16",
    difficulty: "쉬움",
    question: "다음 코드에서 s.size()는?",
    code: `set<int> s;\ns.insert(3);\ns.insert(1);\ns.insert(3);\ns.insert(2);`,
    options: ["3", "4", "2", "1"],
    correctAnswer: 0,
    explanation: "set은 중복을 허용하지 않아요. 3을 두 번 insert해도 한 번만 저장돼요. {1, 2, 3} 세 개만 있으므로 size()는 3.",
    keyConceptTitle: "set 중복 제거",
    keyConceptDescription: "set은 중복 원소를 자동으로 제거. 같은 값 insert해도 하나만 유지.",
    relatedTopics: ["set", "중복 제거", "insert"],
  },
  {
    id: 425,
    lessonId: "cpp-16",
    difficulty: "보통",
    question: "map과 unordered_map의 차이로 올바른 것은?",
    code: "",
    options: [
      "map은 키 정렬 O(log n), unordered_map은 정렬 없이 O(1) 평균",
      "map은 O(1), unordered_map은 O(log n)",
      "둘 다 O(1)이지만 메모리 사용이 다름",
      "map은 숫자 키만, unordered_map은 문자열 키만 가능",
    ],
    correctAnswer: 0,
    explanation: "map은 레드-블랙 트리 기반으로 키를 정렬 유지하므로 O(log n). unordered_map은 해시 테이블 기반으로 정렬 없이 O(1) 평균 탐색. 순서가 필요 없으면 unordered_map이 더 빨라요.",
    keyConceptTitle: "map vs unordered_map",
    keyConceptDescription: "map: 정렬 O(log n). unordered_map: 해시 O(1) 평균. 순서 불필요하면 unordered_map이 빠름.",
    relatedTopics: ["map", "unordered_map", "시간복잡도"],
  },
  {
    id: 426,
    lessonId: "cpp-16",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `set<int> s = {5, 2, 8, 1, 3};\nfor (int x : s) cout << x << " ";`,
    options: ["1 2 3 5 8", "5 2 8 1 3", "8 5 3 2 1", "무작위"],
    correctAnswer: 0,
    explanation: "set은 원소를 자동으로 오름차순 정렬해서 저장해요. 어떤 순서로 넣어도 순회할 때 항상 정렬된 순서로 나와요.",
    keyConceptTitle: "set 자동 정렬",
    keyConceptDescription: "set은 항상 오름차순 정렬 유지. range-for로 순회하면 정렬된 순서로 출력.",
    relatedTopics: ["set", "정렬", "range-for"],
  },
  {
    id: 427,
    lessonId: "cpp-17",
    difficulty: "쉬움",
    question: "min(7, 3)의 결과는?",
    code: `#include <algorithm>\nusing namespace std;\n// min(7, 3) = ?`,
    options: ["3", "7", "4", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "min(a, b)는 두 값 중 작은 것을 반환해요. min(7, 3) = 3. max(7, 3) = 7.",
    keyConceptTitle: "min/max 함수",
    keyConceptDescription: "min(a, b): 작은 값 반환. max(a, b): 큰 값 반환. #include <algorithm> 필요.",
    relatedTopics: ["min", "max", "algorithm"],
  },
  {
    id: 428,
    lessonId: "cpp-17",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `vector<int> v = {1, 3, 2, 3, 4, 3};\ncout << count(v.begin(), v.end(), 3);`,
    options: ["3", "1", "6", "2"],
    correctAnswer: 0,
    explanation: "count(begin, end, value)는 범위 안에서 value가 몇 번 나오는지 세요. v에서 3은 세 번 등장하므로 3이 출력돼요.",
    keyConceptTitle: "count() 함수",
    keyConceptDescription: "count(v.begin(), v.end(), 값): 범위에서 특정 값의 개수 반환.",
    relatedTopics: ["count", "algorithm", "빈도"],
  },
  {
    id: 429,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "find()로 원소를 못 찾았을 때 반환 값은?",
    code: `vector<int> v = {1, 2, 3};\nauto it = find(v.begin(), v.end(), 99);`,
    options: ["v.end()", "nullptr", "-1", "0"],
    correctAnswer: 0,
    explanation: "find()는 원소를 찾으면 해당 위치의 이터레이터를 반환하고, 못 찾으면 end()를 반환해요. 항상 'if (it != v.end())'로 검사해야 해요.",
    keyConceptTitle: "find() 반환값",
    keyConceptDescription: "find(begin, end, 값): 찾으면 해당 이터레이터, 못 찾으면 end() 반환.",
    relatedTopics: ["find", "iterator", "end"],
  },
  {
    id: 430,
    lessonId: "cpp-17",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <numeric>\nvector<int> v = {1, 2, 3, 4, 5};\ncout << accumulate(v.begin(), v.end(), 0);`,
    options: ["15", "0", "5", "120"],
    correctAnswer: 0,
    explanation: "accumulate(begin, end, 초기값)는 범위의 합을 구해요. 초기값 0 + 1+2+3+4+5 = 15. #include <numeric>이 필요해요.",
    keyConceptTitle: "accumulate() 합산",
    keyConceptDescription: "accumulate(begin, end, 초기값): 범위 합산. #include <numeric> 필요.",
    relatedTopics: ["accumulate", "numeric", "합계"],
  },
  {
    id: 431,
    lessonId: "cpp-17",
    difficulty: "쉬움",
    question: "다음 코드 실행 후 v[0]의 값은?",
    code: `vector<int> v = {1, 2, 3, 4, 5};\nreverse(v.begin(), v.end());`,
    options: ["5", "1", "3", "0"],
    correctAnswer: 0,
    explanation: "reverse(begin, end)는 범위를 뒤집어요. {1,2,3,4,5} → {5,4,3,2,1}. v[0]은 5가 돼요.",
    keyConceptTitle: "reverse() 함수",
    keyConceptDescription: "reverse(v.begin(), v.end()): 범위를 제자리에서 뒤집기.",
    relatedTopics: ["reverse", "algorithm"],
  },
  {
    id: 432,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "binary_search()를 사용하기 전에 반드시 해야 할 것은?",
    code: "",
    options: [
      "sort()로 정렬",
      "#include <numeric> 포함",
      "vector 크기를 2의 배수로 맞춤",
      "아무것도 안 해도 됨",
    ],
    correctAnswer: 0,
    explanation: "binary_search는 이진 탐색을 사용하므로 반드시 정렬된 배열에서만 동작해요. 정렬 안 하면 잘못된 결과가 나올 수 있어요.",
    keyConceptTitle: "binary_search 전제조건",
    keyConceptDescription: "binary_search 사용 전 반드시 sort() 필요. 정렬 없이 사용하면 결과 보장 안 됨.",
    relatedTopics: ["binary_search", "sort", "이진탐색"],
  },
  {
    id: 433,
    lessonId: "cpp-8",
    difficulty: "쉬움",
    question: "void 함수에 대한 설명으로 올바른 것은?",
    code: 'void printHello() {\n    cout << "Hello!";\n}',
    options: [
      "반환값이 없는 함수",
      "아무것도 출력 못하는 함수",
      "매개변수가 없는 함수",
      "호출할 수 없는 함수",
    ],
    correctAnswer: 0,
    explanation: "void는 '반환값 없음'을 의미해요. return 문을 쓰지 않거나 return;만 씁니다. 출력(cout)은 할 수 있어요.",
    keyConceptTitle: "void 함수",
    keyConceptDescription: "void 함수: 반환값 없음. cout으로 출력은 가능. return; 또는 생략 가능.",
    relatedTopics: ["void", "함수", "반환"],
  },
  {
    id: 434,
    lessonId: "cpp-8",
    difficulty: "쉬움",
    question: "다음 함수의 반환 타입으로 올바른 것은?",
    code: "___ isEven(int n) {\n    return n % 2 == 0;\n}",
    options: ["bool", "int", "void", "string"],
    correctAnswer: 0,
    explanation: "n % 2 == 0은 true 또는 false를 반환하므로 bool 타입이에요. 함수가 true/false를 반환할 때는 bool을 써요.",
    keyConceptTitle: "반환 타입 결정",
    keyConceptDescription: "반환하는 값의 타입 = 함수의 반환 타입. true/false → bool, 정수 → int, 소수 → double.",
    relatedTopics: ["bool", "반환 타입", "함수"],
  },
  {
    id: 435,
    lessonId: "cpp-8",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: "int add(int a, int b = 10) {\n    return a + b;\n}\nint main() {\n    cout << add(5) << endl;\n    cout << add(5, 3) << endl;\n}",
    options: ["15\n8", "5\n8", "15\n15", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "add(5)는 b가 기본값 10이 되어 5+10=15. add(5,3)은 b=3이 되어 5+3=8.",
    keyConceptTitle: "기본 매개변수",
    keyConceptDescription: "기본값이 있는 매개변수는 호출 시 생략 가능. 생략하면 기본값 사용.",
    relatedTopics: ["기본 매개변수", "함수", "오버로딩"],
  },
  {
    id: 436,
    lessonId: "cpp-8",
    difficulty: "쉬움",
    question: "다음 함수에서 매개변수, 반환 타입, 함수명을 올바르게 나열한 것은?",
    code: "double average(int a, int b) {\n    return (a + b) / 2.0;\n}",
    options: [
      "반환타입: double, 함수명: average, 매개변수: int a, int b",
      "반환타입: int, 함수명: double, 매개변수: average",
      "반환타입: average, 함수명: double, 매개변수: a+b",
      "반환타입: void, 함수명: average, 매개변수: double",
    ],
    correctAnswer: 0,
    explanation: "함수 구조: 반환타입(double) 함수명(average)(매개변수(int a, int b)). 반환타입이 맨 앞에 오고 그 다음 함수명, 괄호 안에 매개변수가 와요.",
    keyConceptTitle: "함수 구조",
    keyConceptDescription: "함수 구조: 반환타입 함수명(매개변수) { 본문 }. 반환타입이 맨 앞.",
    relatedTopics: ["함수 구조", "매개변수", "반환 타입"],
  },
  {
    id: 437,
    lessonId: "cpp-11",
    difficulty: "쉬움",
    question: "C++에서 두 문자열이 같은지 비교하는 올바른 코드는?",
    code: "",
    options: [
      "if (s1 == s2)",
      "if (s1.equals(s2))",
      "if (strcmp(s1, s2) == 0)",
      "if (s1.compare(s2))",
    ],
    correctAnswer: 0,
    explanation: "C++의 string은 == 연산자로 직접 비교할 수 있어요. s1.equals()는 Java 문법이고, strcmp()는 C-string 함수예요.",
    keyConceptTitle: "string 비교",
    keyConceptDescription: "string 비교: ==, !=, <, >, <=, >= 모두 사용 가능. 사전순 비교.",
    relatedTopics: ["string", "==", "비교"],
  },
  {
    id: 438,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: 'string a = "apple";\nstring b = "banana";\ncout << (a < b) << endl;',
    options: ["1", "0", "-1", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "string < 연산자는 사전순(알파벳순) 비교를 해요. 'apple'의 'a'(97)가 'banana'의 'b'(98)보다 작으므로 a < b는 true(1)이에요.",
    keyConceptTitle: "string 사전순 비교",
    keyConceptDescription: "string <, > 연산자: 사전순 비교. 첫 글자부터 비교하고 같으면 다음 글자 비교.",
    relatedTopics: ["string", "<", "사전순"],
  },
  {
    id: 439,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: 'string s = "Hello World";\nint pos = s.find("World");\ncout << pos << endl;',
    options: ["6", "5", "0", "-1"],
    correctAnswer: 0,
    explanation: "find()는 부분 문자열의 시작 인덱스를 반환해요. \"Hello \"가 0~5이고 'W'는 6번째 위치(0-based)이므로 6이 출력돼요.",
    keyConceptTitle: "string.find() 인덱스",
    keyConceptDescription: "s.find(부분문자열): 처음 등장하는 위치(0-based) 반환. 없으면 string::npos.",
    relatedTopics: ["find", "string", "인덱스"],
  },
  {
    id: 440,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "문자열 전체를 대문자로 바꾸는 올바른 코드는?",
    code: 'string s = "hello";',
    options: [
      "for (char& c : s) c = toupper(c);",
      "s = toupper(s);",
      "s.toUpper();",
      "transform(s, toupper);",
    ],
    correctAnswer: 0,
    explanation: "toupper()는 문자 하나에만 적용돼요. range-for에서 char& (참조)로 받아야 원본이 바뀌어요. s = toupper(s)는 문자열 전체에 적용 불가.",
    keyConceptTitle: "문자 대소문자 변환",
    keyConceptDescription: "toupper(c)/tolower(c): 문자 하나씩 변환. 전체 문자열은 range-for + 참조(&) 사용.",
    relatedTopics: ["toupper", "tolower", "range-for"],
  },
  {
    id: 441,
    lessonId: "cpp-12",
    difficulty: "쉬움",
    question: "다음 코드에서 ref = 20 후 x의 값은?",
    code: "int x = 10;\nint& ref = x;\nref = 20;",
    options: ["20", "10", "오류", "알 수 없음"],
    correctAnswer: 0,
    explanation: "참조(int&)는 변수의 별명이에요. ref와 x는 같은 메모리를 가리키므로 ref = 20은 x = 20과 동일해요.",
    keyConceptTitle: "참조(Reference) 기본",
    keyConceptDescription: "int& ref = x: ref는 x의 별명. ref 수정 = x 수정. 같은 메모리 공유.",
    relatedTopics: ["참조", "&", "alias"],
  },
  {
    id: 442,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "다음 코드에서 함수 호출 후 a의 값은?",
    code: "void addTen(int x) {\n    x += 10;\n}\nint main() {\n    int a = 5;\n    addTen(a);\n    cout << a;\n}",
    options: ["5", "15", "10", "오류"],
    correctAnswer: 0,
    explanation: "값 전달(call by value)은 복사본을 전달해요. 함수 안에서 x를 바꿔도 원본 a는 변하지 않아요. a는 여전히 5.",
    keyConceptTitle: "값 전달 (Call by Value)",
    keyConceptDescription: "void f(int x): 복사본 전달. 함수 내 수정이 원본에 영향 없음.",
    relatedTopics: ["값 전달", "call by value", "복사"],
  },
  {
    id: 443,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "다음 코드에서 함수 호출 후 a의 값은?",
    code: "void addTen(int& x) {\n    x += 10;\n}\nint main() {\n    int a = 5;\n    addTen(a);\n    cout << a;\n}",
    options: ["15", "5", "10", "오류"],
    correctAnswer: 0,
    explanation: "참조 전달(call by reference)은 원본의 별명을 전달해요. 함수 안에서 x를 바꾸면 원본 a도 바뀌어요. a = 5 + 10 = 15.",
    keyConceptTitle: "참조 전달 (Call by Reference)",
    keyConceptDescription: "void f(int& x): 원본의 참조 전달. 함수 내 수정이 원본에 영향 미침.",
    relatedTopics: ["참조 전달", "call by reference", "&"],
  },
  {
    id: 444,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "const 참조 매개변수의 장점으로 올바른 것은?",
    code: "void print(const string& s) {\n    cout << s;\n}",
    options: [
      "복사 없이 읽기 전용으로 전달 (빠름)",
      "문자열 수정이 가능함",
      "반드시 리터럴만 전달 가능",
      "참조보다 느림",
    ],
    correctAnswer: 0,
    explanation: "const string&는 복사 없이(빠름) 원본을 전달하되 수정은 못해요. 큰 객체(string, vector 등)를 함수에 넘길 때 const&가 효율적이에요.",
    keyConceptTitle: "const 참조 매개변수",
    keyConceptDescription: "const T& 매개변수: 복사 없이 읽기만 가능. 큰 객체를 효율적으로 전달할 때 사용.",
    relatedTopics: ["const", "참조", "성능"],
  },
  {
    id: 445,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "int 변수를 가리키는 포인터 선언으로 올바른 것은?",
    code: "",
    options: ["int* ptr;", "int ptr*;", "pointer<int> ptr;", "int& ptr;"],
    correctAnswer: 0,
    explanation: "포인터는 타입 뒤에 *를 붙여 선언해요. int* ptr은 int형 변수의 주소를 저장하는 포인터예요. int& ptr은 참조(reference)로 다른 개념이에요.",
    keyConceptTitle: "포인터 선언",
    keyConceptDescription: "타입* 변수명 — 포인터 선언. int* p는 int 변수의 주소를 저장.",
    relatedTopics: ["포인터", "*", "선언"],
  },
  {
    id: 446,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "다음 코드에서 ptr에 저장되는 것은?",
    code: `int x = 42;\nint* ptr = &x;`,
    options: ["x의 메모리 주소", "42", "x의 복사본", "nullptr"],
    correctAnswer: 0,
    explanation: "&x는 x의 메모리 주소를 가져와요. ptr은 42라는 값이 아니라 x가 저장된 위치(주소)를 담고 있어요.",
    keyConceptTitle: "주소 연산자 &",
    keyConceptDescription: "&변수: 변수의 메모리 주소 반환. 포인터에 저장해 나중에 접근 가능.",
    relatedTopics: ["&", "주소", "포인터"],
  },
  {
    id: 447,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `int x = 10;\nint* ptr = &x;\n*ptr = 99;\ncout << x << endl;`,
    options: ["99", "10", "주소값", "오류"],
    correctAnswer: 0,
    explanation: "*ptr은 ptr이 가리키는 주소의 값에 접근해요(역참조). *ptr = 99는 x = 99와 같아요. x를 출력하면 99가 나와요.",
    keyConceptTitle: "역참조 연산자 *",
    keyConceptDescription: "*ptr: 포인터가 가리키는 주소의 값에 접근(역참조). *ptr = 값으로 원본 수정 가능.",
    relatedTopics: ["*", "역참조", "포인터"],
  },
  {
    id: 448,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "포인터가 아무것도 가리키지 않음을 나타내는 올바른 표현은?",
    code: "",
    options: ["nullptr", "NULL", "0", "empty"],
    correctAnswer: 0,
    explanation: "C++11부터는 nullptr을 사용해요. NULL(0)도 동작하지만 nullptr이 타입 안전하고 명확해요. 포인터 사용 전 nullptr 검사를 권장해요.",
    keyConceptTitle: "nullptr",
    keyConceptDescription: "nullptr: 포인터가 아무것도 가리키지 않음. C++11부터 NULL 대신 nullptr 사용 권장.",
    relatedTopics: ["nullptr", "NULL", "포인터 안전"],
  },
  {
    id: 449,
    lessonId: "cpp-14",
    difficulty: "쉬움",
    question: "struct를 쓰는 이유로 가장 적절한 것은?",
    code: `struct Student {\n    string name;\n    int age;\n    double gpa;\n};`,
    options: ["관련된 데이터를 하나로 묶기 위해", "반복문을 빠르게 하기 위해", "함수를 대체하기 위해", "메모리를 절약하기 위해"],
    correctAnswer: 0,
    explanation: "struct는 관련 데이터를 하나의 이름으로 묶어요. 학생이름/나이/학점처럼 함께 다니는 데이터를 하나로 관리할 수 있어요.",
    keyConceptTitle: "struct 목적",
    keyConceptDescription: "struct: 관련 데이터를 하나로 묶는 자료구조. 멤버는 기본 public.",
    relatedTopics: ["struct", "데이터 묶기"],
  },
  {
    id: 450,
    lessonId: "cpp-14",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `struct Point {\n    int x;\n    int y;\n};\nPoint p = {3, 7};\ncout << p.x + p.y << endl;`,
    options: ["10", "3", "7", "오류"],
    correctAnswer: 0,
    explanation: "struct 멤버는 . 연산자로 접근해요. p.x = 3, p.y = 7이므로 p.x + p.y = 10.",
    keyConceptTitle: "멤버 접근 (. 연산자)",
    keyConceptDescription: "struct/class 멤버 접근: 변수명.멤버명. p.x, p.name 등.",
    relatedTopics: [".", "멤버 접근", "struct"],
  },
  {
    id: 455,
    lessonId: "cpp-20",
    difficulty: "쉬움",
    question: "long long을 ll로 짧게 쓰는 올바른 방법은?",
    code: "",
    options: ["using ll = long long;", "define ll = long long;", "typedef = ll long long;", "ll = long long;"],
    correctAnswer: 0,
    explanation: "C++11부터는 using으로 타입 별칭을 만들어요. using ll = long long;으로 선언 후 ll x = 1e18;처럼 사용 가능해요.",
    keyConceptTitle: "using 타입 별칭",
    keyConceptDescription: "using 별칭 = 타입; — 긴 타입명을 짧게. using ll = long long; using vi = vector<int>;",
    relatedTopics: ["using", "typedef", "타입 별칭", "ll"],
  },
  {
    id: 456,
    lessonId: "cpp-20",
    difficulty: "보통",
    question: "n이 홀수인지 확인하는 비트 연산은?",
    code: "",
    options: ["n & 1", "n | 1", "n ^ 1", "n << 1"],
    correctAnswer: 0,
    explanation: "n & 1은 n의 마지막 비트만 확인해요. 홀수는 마지막 비트가 1이므로 n & 1 = 1(true), 짝수는 0(false)이에요. n % 2보다 빠릅니다.",
    keyConceptTitle: "비트 AND (&) 홀수 확인",
    keyConceptDescription: "n & 1: n의 최하위 비트 확인. 홀수면 1, 짝수면 0. % 2보다 빠른 홀짝 판별.",
    relatedTopics: ["&", "비트 연산", "홀수", "CP 팁"],
  },
  {
    id: 457,
    lessonId: "cpp-20",
    difficulty: "보통",
    question: "1 << 3의 결과는?",
    code: "",
    options: ["8", "3", "4", "6"],
    correctAnswer: 0,
    explanation: "1 << 3은 1을 왼쪽으로 3비트 이동: 1 → 10 → 100 → 1000(2진수) = 8. 1 << k는 2^k를 계산할 때 자주 써요.",
    keyConceptTitle: "비트 시프트 (<<)",
    keyConceptDescription: "1 << k = 2^k. n >> 1 = n/2. 경쟁 프로그래밍에서 빠른 거듭제곱 계산에 활용.",
    relatedTopics: ["<<", "비트 시프트", "2의 거듭제곱"],
  },
  {
    id: 458,
    lessonId: "cpp-20",
    difficulty: "쉬움",
    question: "경쟁 프로그래밍에서 INF = 1e9 (10억)을 쓰는 이유는?",
    code: "",
    options: ["최솟값 탐색 시 초기값으로 사용하기 위해", "정수 최대값이 1e9이기 때문에", "출력 속도를 높이기 위해", "컴파일러 최적화를 위해"],
    correctAnswer: 0,
    explanation: "거리/비용의 최솟값을 구할 때 초기값으로 '충분히 큰 수'가 필요해요. INT_MAX를 쓰면 더하기 연산에서 오버플로우가 나므로 1e9 같은 안전한 값을 써요.",
    keyConceptTitle: "INF 상수",
    keyConceptDescription: "const int INF = 1e9; — 최솟값 탐색 초기화에 사용. INT_MAX 대신 오버플로우 방지.",
    relatedTopics: ["INF", "상수", "최솟값 초기화", "CP"],
  },

  // ── cpp-10 추가: const int& 패턴 ──
  {
    id: 464,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "이름 목록을 출력만 할 때 가장 적절한 패턴은?",
    code: `vector<string> names = {"Alice", "Bob", "Charlie"};
// 출력만 하고 수정은 하지 않을 때
for (___________ name : names) {
    cout << name << "\\n";
}`,
    options: [
      "for (string name : names)",
      "for (string& name : names)",
      "for (const string& name : names)",
      "for (string* name : names)",
    ],
    correctAnswer: 2,
    explanation: "string은 글자가 많을수록 복사 비용이 커요. const string&는 복사 없이 원본을 바로 읽고, const라서 실수로 수정하는 것도 막아줘요. string& 는 수정 가능해서 읽기 전용엔 부적절해요.",
    keyConceptTitle: "const 참조로 range-for",
    keyConceptDescription: "string처럼 크기가 큰 타입은 복사보다 const 참조가 훨씬 효율적이에요. 읽기만 할 때 → const T&",
    relatedTopics: ["const", "참조", "range-for", "string"],
  },
  {
    id: 465,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "다음 코드 실행 후 v의 값은?",
    code: `vector<int> v = {1, 2, 3};
for (const int& x : v) {
    // x = x * 2;  ← 이 줄의 주석을 제거하면?
}`,
    options: [
      "{2, 4, 6} — 정상 실행",
      "컴파일 에러 — const라서 수정 불가",
      "{1, 2, 3} — 복사본이라서 원본 불변",
      "런타임 에러",
    ],
    correctAnswer: 1,
    explanation: "const int& x는 읽기 전용 참조예요. x = 값 으로 수정하려 하면 컴파일 에러가 발생해요. 이게 const의 역할 — 실수 방지!",
    keyConceptTitle: "const 참조의 보호",
    keyConceptDescription: "const int&는 원본을 직접 가리키지만(참조), const라서 값 수정이 불가능해요. 컴파일러가 실수를 잡아줘요.",
    relatedTopics: ["const", "참조", "컴파일 에러", "읽기전용"],
  },
  {
    id: 466,
    lessonId: "cpp-12",
    difficulty: "쉬움",
    question: "for (int x : v) vs for (int& x : v)의 차이로 올바른 것은?",
    code: `vector<int> v = {10, 20, 30};`,
    options: [
      "int x는 빠르고, int& x는 느리다",
      "int x는 복사본, int& x는 원본 직접 접근",
      "int x로도 원본 수정이 가능하다",
      "둘의 차이가 없다",
    ],
    correctAnswer: 1,
    explanation: "int x는 매 반복마다 값을 복사 → 원본 수정 불가, 복사 비용 발생. int& x는 원본을 직접 가리킴 → 수정 가능, 빠름!",
    keyConceptTitle: "복사 vs 참조",
    keyConceptDescription: "& 없이는 복사본, &를 붙이면 원본에 직접 접근. 수정이 필요하면 &, 읽기만 하면 const &.",
    relatedTopics: ["참조", "복사", "range-for", "&"],
  },
  // ============================================
  // cpp-13: 포인터 기초 (새 문제)
  // ============================================
  {
    id: 467,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "포인터 선언 `int* ptr`에서 별표의 의미는?",
    code: "",
    options: [
      "역참조 연산자 — 값을 가져온다",
      "포인터 타입 선언 — 주소를 저장하는 변수",
      "곱셈 연산자",
      "주소를 가져오는 연산자",
    ],
    correctAnswer: 1,
    explanation: "선언에서 int* ptr의 *는 타입의 일부예요. 'ptr은 int를 가리키는 포인터'라는 뜻이에요! 사용할 때 *ptr은 역참조 연산자로, 의미가 달라져요.",
    keyConceptTitle: "포인터 선언",
    keyConceptDescription: "선언의 *는 타입의 일부, 사용의 *는 역참조 연산자예요.",
  },
  {
    id: 469,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "nullptr을 역참조하면 어떻게 되나요?",
    code: `int* p = nullptr;\ncout << *p;  // ??`,
    options: [
      "0 출력",
      "nullptr 출력",
      "프로그램 충돌 (segfault)",
      "아무것도 출력 안 함",
    ],
    correctAnswer: 2,
    explanation: "nullptr인 포인터를 역참조하면 segfault가 발생해 프로그램이 충돌해요! 항상 if (p != nullptr)로 확인한 후 역참조해야 해요.",
    keyConceptTitle: "nullptr 안전 체크",
    keyConceptDescription: "역참조 전에 반드시 nullptr 체크를 해야 해요.",
  },
  {
    id: 471,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력은?",
    code: `int x = 10;\nint* ptr = &x;\n*ptr = *ptr * 2;\ncout << x;`,
    options: ["10", "20", "0", "에러"],
    correctAnswer: 1,
    explanation: "*ptr은 x의 값(10)이에요. *ptr * 2 = 20을 *ptr에 저장하면 x가 20이 돼요. 역참조로 원본 변수를 직접 수정한 거예요!",
    keyConceptTitle: "역참조로 값 수정",
    keyConceptDescription: "*ptr = 값 으로 포인터가 가리키는 변수를 수정할 수 있어요.",
  },
  {
    id: 472,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "포인터를 받는 함수를 올바르게 호출하는 것은?",
    code: `void double_it(int* p) { *p *= 2; }\nint x = 5;`,
    options: ["double_it(x);", "double_it(*x);", "double_it(&x);", "double_it(&&x);"],
    correctAnswer: 2,
    explanation: "포인터 매개변수(int* p)를 받는 함수에는 &x처럼 주소를 넘겨야 해요. 함수 안에서 *p로 x를 수정할 수 있어요!",
    keyConceptTitle: "포인터로 함수 전달",
    keyConceptDescription: "포인터 매개변수 함수는 &x (주소)를 인수로 받아요.",
  },
  {
    id: 475,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력은?",
    code: `int a = 1, b = 2;\nint* p = &a;\np = &b;\n*p = 9;\ncout << a << " " << b;`,
    options: ["9 2", "1 9", "9 9", "에러"],
    correctAnswer: 1,
    explanation: "p가 처음엔 a를 가리키다가, p = &b로 b를 가리키게 됩니다. *p = 9는 b를 9로 바꿔요. 참조와 달리 포인터는 가리키는 대상을 바꿀 수 있어요!",
    keyConceptTitle: "포인터 재지정",
    keyConceptDescription: "포인터는 p = &b처럼 다른 변수를 가리키도록 재지정할 수 있어요.",
  },
  {
    id: 476,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 두 함수 중 x의 원본을 수정하는 것은?",
    code: `void f1(int  n) { n  = 99; }\nvoid f2(int* p) { *p = 99; }\n\nint x = 1;\nf1(x);\nf2(&x);`,
    options: [
      "f1만 수정한다",
      "f2만 수정한다",
      "둘 다 수정한다",
      "둘 다 수정 안 한다",
    ],
    correctAnswer: 1,
    explanation: "f1은 복사본 n을 수정하므로 x에 영향 없어요. f2는 포인터로 &x를 받아 *p = 99로 x를 직접 수정해요!",
    keyConceptTitle: "값 전달 vs 포인터 전달",
    keyConceptDescription: "포인터로 전달할 때만 원본 변수를 함수 안에서 수정할 수 있어요.",
  },

  // ============================================================
  // cpp-21 추가 문제
  // ============================================================
  {
    id: 492,
    lessonId: "cpp-21",
    difficulty: "쉬움",
    question: "`int grid[3][3];` 와 `int grid[3][3] = {};` 의 차이는?",
    code: `int a[3][3];        // 선언만
int b[3][3] = {};   // 초기화까지`,
    options: [
      "차이 없다 — 둘 다 0으로 초기화된다",
      "a는 쓰레기 값, b는 전부 0으로 초기화된다",
      "a는 0, b는 쓰레기 값이다",
      "컴파일 에러가 발생한다",
    ],
    correctAnswer: 1,
    explanation: "선언만 하면(a) 메모리에 쓰레기 값이 남아요. `= {}`를 붙이면(b) 모든 원소가 0으로 초기화돼요. 2D 배열 사용 전에 `= {}`로 초기화하는 습관이 중요해요!",
    keyConceptTitle: "2D 배열 제로 초기화",
    keyConceptDescription: "`int arr[N][M] = {};` — 이 한 줄로 모든 원소를 0으로 초기화해요. 초기화 없이 사용하면 쓰레기 값으로 인한 버그가 생겨요.",
    relatedTopics: ["2차원 배열", "초기화", "= {}", "쓰레기 값"],
  },
  {
    id: 493,
    lessonId: "cpp-21",
    difficulty: "쉬움",
    question: "5행 3열의 2D 배열을 0으로 초기화하는 올바른 선언은?",
    code: `// 행(row) = 가로줄 수
// 열(col) = 세로줄 수`,
    options: [
      "int grid[3][5] = {};",
      "int grid[5][3] = {};",
      "int grid[5, 3] = {};",
      "int grid[5][3];",
    ],
    correctAnswer: 1,
    explanation: "선언 형식은 `타입 이름[행][열]`이에요. 5행 3열이면 `int grid[5][3] = {};`. `[3][5]`는 3행 5열이라 반대예요!",
    keyConceptTitle: "2D 배열 선언: [행][열] 순서",
    keyConceptDescription: "`int arr[행수][열수]` — 행이 먼저, 열이 나중이에요. 헷갈리면 '행은 가로(줄 수), 열은 세로(칸 수)'로 기억하세요.",
    relatedTopics: ["2차원 배열", "행", "열", "선언"],
  },
  {
    id: 494,
    lessonId: "cpp-21",
    difficulty: "쉬움",
    question: "다음 이중 for문의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            cout << grid[i][j] << " ";
        }
        cout << "\\n";
    }
    return 0;
}`,
    options: [
      "1 2 3 \\n4 5 6",
      "1 2 3 4 5 6",
      "4 5 6 \\n1 2 3",
      "1 4 \\n2 5 \\n3 6",
    ],
    correctAnswer: 0,
    explanation: "바깥 루프 i가 행(0→1), 안쪽 루프 j가 열(0→2)을 순회해요. 행이 끝날 때마다 `\\n`으로 줄바꿈하므로 1 2 3 이 출력되고 줄바꿈 후 4 5 6이 나와요.",
    keyConceptTitle: "이중 for문 순회",
    keyConceptDescription: "바깥 루프 i = 행, 안쪽 루프 j = 열. `grid[i][j]`로 모든 원소를 순서대로 방문해요. 행 끝에 `cout << \"\\n\"`으로 줄바꿈해요.",
    relatedTopics: ["이중 for문", "2차원 배열", "순회"],
  },
  {
    id: 495,
    lessonId: "cpp-21",
    difficulty: "보통",
    question: "3행 4열 배열을 이중 for문으로 전체 순회할 때, 안쪽 `cout << grid[i][j];`가 실행되는 총 횟수는?",
    code: `for (int i = 0; i < 3; i++)
    for (int j = 0; j < 4; j++)
        cout << grid[i][j];`,
    options: ["7번", "12번", "9번", "16번"],
    correctAnswer: 1,
    explanation: "바깥 루프 3번 × 안쪽 루프 4번 = 12번이에요. 이중 for문의 실행 횟수는 행 수 × 열 수예요.",
    keyConceptTitle: "이중 for문 실행 횟수",
    keyConceptDescription: "이중 for문에서 안쪽 코드의 실행 횟수 = 바깥 루프 반복 수 × 안쪽 루프 반복 수. 3×4 배열이면 12번.",
    relatedTopics: ["이중 for문", "실행 횟수", "행 × 열"],
  },
  {
    id: 496,
    lessonId: "cpp-21",
    difficulty: "보통",
    question: "`vector<vector<int>> v(5, vector<int>(3, 0));` 에서 행의 수와 열의 수는?",
    code: `vector<vector<int>> v(5, vector<int>(3, 0));
cout << v.size();      // ?
cout << v[0].size();   // ?`,
    options: [
      "행 3, 열 5",
      "행 5, 열 3",
      "행 5, 열 5",
      "행 3, 열 3",
    ],
    correctAnswer: 1,
    explanation: "`v(5, vector<int>(3, 0))`에서 바깥 숫자 5가 행 수, 안쪽 숫자 3이 열 수예요. `v.size()` = 5(행), `v[0].size()` = 3(열).",
    keyConceptTitle: "2D vector의 행/열 수",
    keyConceptDescription: "`v.size()` = 행 수, `v[0].size()` = 열 수. 선언 시 `(행, vector<int>(열, 초기값))` 순서예요.",
    relatedTopics: ["2D vector", "size()", "행", "열"],
  },
  {
    id: 497,
    lessonId: "cpp-21",
    difficulty: "보통",
    question: "다음 중 2행 3열 격자를 cin으로 입력받는 올바른 코드는?",
    code: `// 입력:
// 1 2 3
// 4 5 6`,
    options: [
      `for (int i = 0; i < 2; i++) {\n    cin >> grid[i];\n}`,
      `for (int i = 0; i < 2; i++) {\n    for (int j = 0; j < 3; j++) {\n        cin >> grid[i][j];\n    }\n}`,
      `cin >> grid[0][0] >> grid[1][1];`,
      `for (int j = 0; j < 3; j++) {\n    cin >> grid[j];\n}`,
    ],
    correctAnswer: 1,
    explanation: "2D 배열 입력은 이중 for문으로 `cin >> grid[i][j]`를 써요. cin은 공백/줄바꿈을 자동으로 건너뛰어서 순서대로 grid[0][0]=1, ..., grid[1][2]=6이 채워져요.",
    keyConceptTitle: "2D 배열 cin 입력",
    keyConceptDescription: "이중 for문 + `cin >> grid[i][j]` — USACO 문제에서 격자 입력받을 때 핵심 패턴이에요. cin은 공백/줄바꿈 자동 처리해요.",
    relatedTopics: ["cin", "2차원 배열", "입력", "USACO 패턴"],
  },
  {
    id: 498,
    lessonId: "cpp-21",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 3, m = 3;
    vector<vector<int>> grid(n, vector<int>(m, 0));

    // 주 대각선에 1 저장
    for (int i = 0; i < n; i++)
        grid[i][i] = 1;

    int sum = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            sum += grid[i][j];

    cout << sum;
    return 0;
}`,
    options: ["0", "3", "9", "1"],
    correctAnswer: 1,
    explanation: "grid를 전부 0으로 초기화 후, 대각선(grid[0][0], grid[1][1], grid[2][2])만 1로 설정해요. 전체 합 = 1+1+1 = 3이에요.",
    keyConceptTitle: "2D vector + 대각선 + 전체 합",
    keyConceptDescription: "`grid[i][i] = 1`로 대각선 설정, 이중 for로 전체 합 계산 — USACO에서 자주 나오는 조합이에요.",
    relatedTopics: ["2D vector", "대각선", "전체 합", "USACO 패턴"],
  },
  {
    id: 499,
    lessonId: "cpp-21",
    difficulty: "어려움",
    question: "다음 USACO 스타일 코드에서 입력이 `3 3` 이후 `1 2 3 / 4 5 6 / 7 8 9` 일 때 출력은?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m, 0));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    int total = 0;
    for (int i = 0; i < n; i++)
        total += grid[i][i];   // 대각선만 합산
    cout << total;
    return 0;
}`,
    options: ["45", "15", "12", "컴파일 에러"],
    correctAnswer: 1,
    explanation: "3×3 격자에서 대각선 원소는 grid[0][0]=1, grid[1][1]=5, grid[2][2]=9. 합계 = 1+5+9 = 15.",
    keyConceptTitle: "USACO 입력 + 대각선 합 패턴",
    keyConceptDescription: "N, M 입력 → 2D vector 생성 → 이중 for cin 입력 → 처리. 이 전체 흐름이 USACO 격자 문제의 기본 템플릿이에요.",
    relatedTopics: ["USACO 패턴", "cin 입력", "대각선 합", "2D vector"],
  },

  // ============================================================
  // cpp-22: 클래스 (class)
  // ============================================================
  {
    id: 477,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "class에 대한 설명으로 올바른 것은?",
    code: `class Car {
    double speed;
    string color;

    void forward() { speed += 10; }
    void info() {
        cout << color << " " << speed;
    }
};`,
    options: [
      "class는 변수(데이터)만 가질 수 있다",
      "class는 함수만 가질 수 있다",
      "class는 데이터(멤버변수)와 함수(멤버함수)를 함께 묶는다",
      "class로 만든 객체는 점(.)으로 멤버에 접근할 수 없다",
    ],
    correctAnswer: 2,
    explanation: "class는 멤버변수(데이터)와 멤버함수를 함께 묶어 나만의 타입을 정의해요. 객체는 Car myCar; 처럼 만들고, myCar.forward(); 처럼 점(.)으로 접근해요.",
    keyConceptTitle: "class 기본 구조",
    keyConceptDescription: "class는 멤버변수(기억해야 할 것)와 멤버함수(해야 할 것)를 묶어 사용자 정의 타입을 만들어요.",
    relatedTopics: ["class", "멤버변수", "멤버함수", "OOP"],
  },
  {
    id: 479,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "C++ 멤버함수 안에서 같은 클래스의 멤버변수에 접근하는 올바른 방법은?",
    code: `class Car {
private:
    double speed;
public:
    void forward() {
        // speed를 10 올리려면?
    }
};`,
    options: [
      "self.speed += 10;",
      "Car.speed += 10;",
      "speed += 10;",
      "this->speed() += 10;",
    ],
    correctAnswer: 2,
    explanation: "C++에서는 멤버함수 안에서 멤버변수에 `speed`처럼 바로 접근해요. Python처럼 `self.speed`가 필요 없어요! C++은 같은 클래스 안이라면 자동으로 멤버변수를 찾아줘요.",
    keyConceptTitle: "멤버함수 안에서 멤버변수 접근",
    keyConceptDescription: "Python에서는 self.speed처럼 self가 필요하지만, C++에서는 그냥 speed만 써요. 멤버함수 안에서는 같은 클래스의 멤버에 바로 접근할 수 있어요.",
    relatedTopics: ["멤버함수", "멤버변수", "self vs C++", "접근"],
  },
  {
    id: 480,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "class에서 `private:` 아래에 선언된 멤버변수에 대한 설명으로 옳은 것은?",
    code: `class BankAccount {
private:
    double balance;
public:
    void deposit(double a) { balance += a; }
};`,
    options: [
      "어디서나 접근할 수 있다",
      "클래스 내부 함수에서만 접근할 수 있다",
      "상속받은 클래스에서만 접근할 수 있다",
      "main() 함수에서만 접근할 수 있다",
    ],
    correctAnswer: 1,
    explanation: "private 멤버는 클래스 내부 함수(deposit 등)에서만 접근할 수 있어요. 외부에서 acc.balance = 1000; 처럼 직접 접근하면 컴파일 에러!",
    keyConceptTitle: "private 접근 제한",
    keyConceptDescription: "private: 아래 멤버는 클래스 내부에서만 접근 가능해요. 외부 코드로부터 데이터를 보호할 수 있어요.",
    relatedTopics: ["private", "접근 제어", "캡슐화"],
  },
  {
    id: 481,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드에서 컴파일 에러가 발생하는 줄은?",
    code: `class Box {
private:
    int size;
public:
    void setSize(int s) { size = s; }
    int getSize() { return size; }
};

int main() {
    Box b;
    b.size = 10;       // 줄 A
    b.setSize(10);     // 줄 B
    cout << b.getSize(); // 줄 C
    return 0;
}`,
    options: ["줄 A", "줄 B", "줄 C", "에러 없음"],
    correctAnswer: 0,
    explanation: "size는 private이라 외부에서 b.size = 10으로 직접 접근하면 컴파일 에러! setSize()와 getSize()는 public 함수라 줄 B, C는 괜찮아요.",
    keyConceptTitle: "private 직접 접근 불가",
    keyConceptDescription: "private 멤버는 클래스 외부에서 직접 접근할 수 없어요. public 멤버함수를 통해서만 접근해야 해요.",
    relatedTopics: ["private", "컴파일 에러", "getter", "setter"],
  },
  {
    id: 482,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 중 `Timer` 클래스의 생성자를 **올바르게** 작성한 것은?",
    code: `class Timer {
private:
    int seconds;
public:
    // 생성자: seconds를 s로 초기화
    ???
};`,
    options: [
      "void Timer(int s) { seconds = s; }",
      "int Timer(int s) { seconds = s; }",
      "Timer(int s) { seconds = s; }",
      "timer(int s) { seconds = s; }",
    ],
    correctAnswer: 2,
    explanation: "생성자는 ① 클래스 이름과 동일(Timer) ② 리턴 타입 없음(void도 안 됨!) ③ 매개변수 가능. `void Timer`는 리턴 타입이 있어서 틀리고, `timer`는 소문자라 클래스 이름과 달라서 틀려요.",
    keyConceptTitle: "생성자 작성 규칙",
    keyConceptDescription: "생성자 = 클래스 이름 + 괄호 + 본문. 리턴 타입을 쓰지 않아요. void도 안 돼요! 대소문자도 클래스 이름과 정확히 일치해야 해요.",
    relatedTopics: ["생성자", "리턴 타입 없음", "클래스 이름 일치"],
  },
  {
    id: 483,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "getter와 setter에 대한 설명으로 옳지 않은 것은?",
    code: `class Car {
private:
    double speed;
public:
    double getSpeed() { return speed; }
    void setSpeed(double s) {
        if (s >= 0) speed = s;
    }
};`,
    options: [
      "getter는 private 멤버의 값을 읽어서 반환하는 함수다",
      "setter는 값을 설정할 때 유효성 검사를 할 수 있다",
      "setter를 통하면 어떤 값이든 무조건 저장된다",
      "getter/setter는 private 멤버에 접근하는 공개 창구 역할을 한다",
    ],
    correctAnswer: 2,
    explanation: "setter는 유효성 검사를 포함할 수 있어요. 위 코드에서 setSpeed()는 s >= 0 일 때만 저장해요. 음수 속도를 거부할 수 있는 게 setter의 장점이에요!",
    keyConceptTitle: "getter / setter",
    keyConceptDescription: "getter는 값을 읽고, setter는 값을 설정해요. setter에서 잘못된 값을 거부하는 유효성 검사를 넣을 수 있어요.",
    relatedTopics: ["getter", "setter", "캡슐화", "유효성 검사"],
  },
  {
    id: 486,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string owner;
    double balance;
public:
    BankAccount(string name, double initial) {
        owner = name;
        balance = initial;
    }
    void info() {
        cout << owner << ": " << balance << "원";
    }
};

int main() {
    BankAccount acc("김철수", 5000);
    acc.info();
    return 0;
}`,
    options: ["김철수: 5000원", "컴파일 에러", "0원", "김철수"],
    correctAnswer: 0,
    explanation: "BankAccount acc(\"김철수\", 5000)에서 생성자가 자동 호출돼요. owner = \"김철수\", balance = 5000으로 초기화되고, info()가 \"김철수: 5000원\"을 출력해요.",
    keyConceptTitle: "생성자로 객체 초기화",
    keyConceptDescription: "생성자에 인자를 넘기면 객체가 생성되는 순간 자동으로 초기화돼요. 따로 setter를 호출할 필요가 없어요.",
    relatedTopics: ["생성자", "객체 초기화", "멤버함수"],
  },
  {
    id: 487,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 클래스에서 객체를 **올바르게** 생성하는 코드는?",
    code: `class BankAccount {
private:
    string owner;
    double balance;
public:
    BankAccount(string name, double initial) {
        owner = name;
        balance = initial;
    }
};`,
    options: [
      "BankAccount acc;",
      "BankAccount acc(\"김철수\", 1000);",
      "BankAccount acc = new BankAccount(\"김철수\", 1000);",
      "BankAccount(\"김철수\", 1000) acc;",
    ],
    correctAnswer: 1,
    explanation: "매개변수가 있는 생성자는 `클래스명 변수명(인자1, 인자2);` 형식으로 호출해요. `acc;`만 쓰면 매개변수 없는 기본 생성자가 없어서 에러! `new`는 포인터용이라 틀려요.",
    keyConceptTitle: "생성자로 객체 생성하는 문법",
    keyConceptDescription: "매개변수 있는 생성자: `ClassName 변수명(값1, 값2);`. 괄호 안에 생성자 인자를 넘겨요. Java/Python의 `new`나 `ClassName()`과 형식이 달라요.",
    relatedTopics: ["생성자", "객체 생성 문법", "매개변수"],
  },
  {
    id: 489,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "class(클래스)와 struct(구조체)의 차이로 올바른 것은?",
    code: `struct Point {
    int x;   // 기본: public
    int y;
};

class Circle {
    double radius;  // 기본: private
public:
    void setR(double r) { radius = r; }
};`,
    options: [
      "class는 멤버함수를 가질 수 없고, struct는 가질 수 있다",
      "struct의 기본 접근 제어는 private이고, class는 public이다",
      "struct의 기본 접근 제어는 public이고, class는 private이다",
      "class와 struct는 완전히 동일하다",
    ],
    correctAnswer: 2,
    explanation: "struct는 접근 제어 키워드가 없으면 기본이 public이고, class는 기본이 private이에요. 이것이 가장 핵심적인 차이예요!",
    keyConceptTitle: "class vs struct 기본 접근 제어",
    keyConceptDescription: "struct: 기본 public / class: 기본 private. 실무에서는 순수 데이터 묶음은 struct, 캡슐화가 필요하면 class를 주로 써요.",
    relatedTopics: ["class", "struct", "private", "public", "기본 접근 제어"],
  },
  {
    id: 490,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드에서 잘못된 부분은?",
    code: `class Player {
private:
    int hp;
    int attack;
public:
    void Player(int h, int a) {   // 생성자??
        hp = h;
        attack = a;
    }
    int getHp() { return hp; }
};

int main() {
    Player p(100, 30);
    cout << p.getHp();
}`,
    options: [
      "멤버변수를 private으로 선언한 것",
      "getHp()의 반환 타입이 int인 것",
      "생성자에 void 리턴 타입을 붙인 것",
      "매개변수 이름이 h, a인 것",
    ],
    correctAnswer: 2,
    explanation: "생성자는 리턴 타입이 없어야 해요. void를 붙이면 생성자가 아닌 일반 함수로 인식돼요! Player(int h, int a)처럼 void 없이 써야 해요.",
    keyConceptTitle: "생성자에 void 금지",
    keyConceptDescription: "생성자는 리턴 타입을 쓰지 않아요. void를 쓰면 컴파일러가 생성자가 아닌 일반 멤버함수로 처리해서 객체 초기화가 안 돼요.",
    relatedTopics: ["생성자", "리턴 타입 없음", "void 금지"],
  },
  {
    id: 491,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;
public:
    BankAccount(double initial) {
        if (initial >= 0) balance = initial;
        else              balance = 0;
    }
    void deposit(double a) {
        if (a > 0) balance += a;
    }
    void withdraw(double a) {
        if (a > 0 && balance >= a) balance -= a;
    }
    double getBalance() { return balance; }
};

int main() {
    BankAccount acc(-500);
    acc.deposit(1000);
    acc.withdraw(300);
    acc.withdraw(9999);
    cout << acc.getBalance();
    return 0;
}`,
    options: ["700", "200", "-500", "9199"],
    correctAnswer: 0,
    explanation: "BankAccount acc(-500): 초기값이 음수라 balance = 0. deposit(1000): 0+1000=1000. withdraw(300): 1000-300=700. withdraw(9999): 잔액(700) < 9999라 거부. 결과: 700.",
    keyConceptTitle: "생성자 + getter/setter 종합",
    keyConceptDescription: "생성자에서 잘못된 초기값을 막고, deposit/withdraw에서도 유효성 검사를 하면 항상 올바른 상태를 유지할 수 있어요.",
    relatedTopics: ["생성자", "유효성 검사", "캡슐화", "getter", "setter"],
  },

  // ============================================================
  // cpp-p1: 숫자 맞추기 게임 (추가 문제)
  // ============================================================
  {
    id: 500,
    lessonId: "cpp-p1",
    difficulty: "쉬움",
    question: "`srand(time(0))`을 호출하지 않으면 어떤 일이 생길까요?",
    code: `// A: srand 없이
int a = rand() % 100 + 1;

// B: srand 있음
srand(time(0));
int b = rand() % 100 + 1;`,
    options: [
      "A와 B 모두 매번 다른 숫자가 나온다",
      "A는 프로그램을 실행할 때마다 같은 숫자가 나온다",
      "A는 컴파일 에러가 난다",
      "B는 느리지만 A보다 더 랜덤하다",
    ],
    correctAnswer: 1,
    explanation: "srand가 없으면 시드(seed)가 고정되어 매번 실행해도 rand()가 동일한 순서를 생성해요. srand(time(0))은 현재 시각을 시드로 설정해서 매번 다른 결과를 만들어요.",
    keyConceptTitle: "srand(time(0)) — 랜덤 시드",
    keyConceptDescription: "rand()는 시드 기반 의사난수예요. srand로 시드를 바꾸지 않으면 매번 같은 순서가 나와요. time(0)으로 현재 시각을 시드로 쓰면 매번 달라져요.",
    relatedTopics: ["rand()", "srand()", "time(0)", "난수 시드"],
  },
  {
    id: 501,
    lessonId: "cpp-p1",
    difficulty: "쉬움",
    question: "다음 함수의 역할은?",
    code: `int getRandomNumber() {
    return rand() % 100 + 1;
}`,
    options: [
      "0~100 사이의 실수를 반환한다",
      "1~100 사이의 정수를 반환한다",
      "0~99 사이의 정수를 반환한다",
      "항상 50을 반환한다",
    ],
    correctAnswer: 1,
    explanation: "rand() % 100은 0~99, 여기에 +1을 더하면 1~100이에요. 게임에서 정답을 1~100 범위로 만드는 함수예요.",
    keyConceptTitle: "rand() % N + 1 패턴",
    keyConceptDescription: "rand() % N → 0~(N-1). rand() % N + 1 → 1~N. 1부터 시작하는 범위를 만들 때 쓰는 기본 패턴이에요.",
    relatedTopics: ["rand()", "범위 계산", "% 연산"],
  },
  {
    id: 502,
    lessonId: "cpp-p1",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는? (answer = 42, 입력 순서: 70 → 20 → 42)",
    code: `int answer = 42, guess = 0, tries = 0;
while (guess != answer) {
    cin >> guess;
    tries++;
    if (guess > answer)      cout << "더 작게!\\n";
    else if (guess < answer) cout << "더 크게!\\n";
}
cout << tries << "번 만에 성공!";`,
    options: [
      "더 작게!\\n더 크게!\\n2번 만에 성공!",
      "더 작게!\\n더 크게!\\n3번 만에 성공!",
      "더 크게!\\n더 작게!\\n3번 만에 성공!",
      "더 작게!\\n더 크게!\\n성공!",
    ],
    correctAnswer: 1,
    explanation: "70 입력 → 70 > 42 → '더 작게!', tries=1. 20 입력 → 20 < 42 → '더 크게!', tries=2. 42 입력 → 42 == 42 → 루프 종료, tries=3. 출력: '3번 만에 성공!'",
    keyConceptTitle: "게임 루프 흐름 추적",
    keyConceptDescription: "while (guess != answer) 루프에서 매 반복마다 tries++, 힌트 출력. 정답이 입력되면 루프 탈출 후 시도 횟수 출력.",
    relatedTopics: ["while 루프", "게임 루프", "카운터", "조건 분기"],
  },
  {
    id: 503,
    lessonId: "cpp-p1",
    difficulty: "보통",
    question: "'한 번 더 할래요?' 기능을 구현하는 올바른 do-while 패턴은?",
    code: `char again;
___ {
    playGame();
    cout << "한 번 더? (y/n): ";
    cin >> again;
} ___ (again == 'y');`,
    options: [
      "while / while",
      "do / while",
      "for / while",
      "repeat / until",
    ],
    correctAnswer: 1,
    explanation: "do-while은 본문을 먼저 한 번 실행한 뒤 조건을 검사해요. '게임을 먼저 하고, 이후 계속할지 확인'하는 구조에 딱 맞아요. while은 조건을 먼저 검사해서 게임이 한 번도 안 실행될 수 있어요.",
    keyConceptTitle: "do-while — 최소 1회 실행 보장",
    keyConceptDescription: "do { } while(조건); — 본문을 반드시 한 번 실행 후 조건 체크. '한 번 더?' 패턴의 정석이에요.",
    relatedTopics: ["do-while", "게임 재시작", "반복문"],
  },
  {
    id: 504,
    lessonId: "cpp-p1",
    difficulty: "보통",
    question: "게임을 함수로 분리했을 때의 장점으로 옳지 않은 것은?",
    code: `// 함수로 분리
int getRandomNumber() { return rand() % 100 + 1; }
void playGame() {
    int answer = getRandomNumber();
    // ... 게임 로직
}

int main() {
    srand(time(0));
    char again;
    do { playGame(); cin >> again; } while (again == 'y');
}`,
    options: [
      "main()이 짧아지고 읽기 쉬워진다",
      "playGame()만 따로 테스트할 수 있다",
      "함수로 나누면 실행 속도가 빨라진다",
      "같은 코드를 여러 번 쓰지 않아도 된다",
    ],
    correctAnswer: 2,
    explanation: "함수로 분리해도 실행 속도는 거의 동일해요(오히려 함수 호출 오버헤드가 생길 수 있어요). 분리의 진짜 장점은 가독성, 재사용성, 독립 테스트 가능성이에요.",
    keyConceptTitle: "함수 분리의 장점",
    keyConceptDescription: "함수 분리 = 가독성 ↑ + 재사용 ↑ + 유지보수 ↑. 실행 속도를 높이는 게 목적은 아니에요.",
    relatedTopics: ["함수", "코드 구조화", "재사용성"],
  },
  {
    id: 505,
    lessonId: "cpp-p1",
    difficulty: "어려움",
    question: "숫자 맞추기에서 가장 적은 시도로 1~100을 맞추는 최적 전략은?",
    code: `// 1~100 중 정답 맞추기
// 전략 A: 1부터 순서대로 (1, 2, 3, ...)
// 전략 B: 항상 남은 범위의 중간값 (50 → 25 or 75 → ...)`,
    options: [
      "전략 A — 최악 100번, 전략 B — 최악 7번",
      "전략 A — 최악 50번, 전략 B — 최악 10번",
      "두 전략의 최악 시도 횟수는 동일하다",
      "전략 B — 최악 100번, 전략 A — 최악 50번",
    ],
    correctAnswer: 0,
    explanation: "전략 A(순차)는 최악 100번. 전략 B(이진 탐색)는 범위를 매번 절반으로 줄여요. log₂(100) ≈ 7이라 최악 7번이면 충분해요. 이진 탐색이 훨씬 효율적이에요!",
    keyConceptTitle: "이진 탐색 전략",
    keyConceptDescription: "중간값부터 시작 → 힌트에 따라 위/아래 절반으로 좁혀가기 = 이진 탐색. 최악 log₂(N)번 안에 반드시 찾아요.",
    relatedTopics: ["이진 탐색", "알고리즘", "탐색 전략"],
  },
  {
    id: 506,
    lessonId: "cpp-p1",
    difficulty: "어려움",
    question: "다음 코드에서 버그가 있는 부분은?",
    code: `#include <iostream>
#include <cstdlib>
using namespace std;

int getRandomNumber() {
    srand(time(0));           // 줄 A
    return rand() % 100 + 1;
}

int main() {
    int answer = getRandomNumber();
    int guess = 0, tries = 0;
    while (guess != answer) {
        cin >> guess;
        tries++;
    }
    cout << tries << "번 만에 성공!";
}`,
    options: [
      "rand() % 100 + 1이 1~101 범위를 생성한다",
      "srand(time(0))이 getRandomNumber() 안에 있어서 호출할 때마다 시드가 재설정된다",
      "while 루프가 guess == answer일 때 종료되지 않는다",
      "tries가 int라서 오버플로우가 난다",
    ],
    correctAnswer: 1,
    explanation: "srand는 main()에서 딱 한 번만 호출해야 해요. getRandomNumber() 안에 두면 함수를 호출할 때마다 시드가 재설정돼요. 같은 초 안에 여러 번 호출하면 time(0) 값이 같아서 같은 숫자가 반복될 수 있어요.",
    keyConceptTitle: "srand는 main()에서 한 번만",
    keyConceptDescription: "srand(time(0))은 프로그램 시작 시 main()에서 딱 한 번 호출하는 게 원칙이에요. 함수 안에 넣으면 매번 시드가 재설정돼요.",
    relatedTopics: ["srand", "rand", "시드 초기화", "버그"],
  },

  // ============================================================
  // cpp-p2: RPG 캐릭터 관리
  // ============================================================
  {
    id: 507,
    lessonId: "cpp-p2",
    difficulty: "쉬움",
    question: "다음 중 Character 구조체가 올바르게 선언된 것은?",
    code: `// RPG 캐릭터의 name, hp, atk, level을 담는 구조체를 만들려면?`,
    options: [
      "class Character { string name; int hp; int atk; int level; };",
      "struct Character { string name; int hp; int atk; int level; };",
      "struct { Character string name; int hp; };",
      "Character struct { string name; int hp; int atk; };",
    ],
    correctAnswer: 1,
    explanation: "struct 키워드 + 이름 + { 멤버변수들; }; 형태예요. 마지막 }; 세미콜론을 꼭 붙여야 해요!",
    keyConceptTitle: "struct 선언 형태",
    keyConceptDescription: "struct 이름 { 멤버변수들; }; — struct는 여러 변수를 하나로 묶는 커스텀 타입이에요. 멤버 선언 순서대로 초기화 리스트 { }로 값을 넣을 수 있어요.",
    relatedTopics: ["struct", "멤버변수", "RPG 프로젝트"],
  },
  {
    id: 508,
    lessonId: "cpp-p2",
    difficulty: "쉬움",
    question: "파티원 목록을 저장하는 올바른 선언은?",
    code: `// Character struct가 정의되어 있을 때
// 여러 캐릭터를 동적으로 추가/관리하려면?`,
    options: [
      "Character party[100];",
      "vector<Character> party;",
      "list<Character> party[10];",
      "Character* party;",
    ],
    correctAnswer: 1,
    explanation: "vector<Character>는 크기를 미리 정하지 않아도 되고 push_back()으로 동적 추가할 수 있어요. 배열은 크기를 미리 정해야 하고, Character*는 동적 메모리 관리가 복잡해요.",
    keyConceptTitle: "vector<struct타입> — 구조체 컬렉션",
    keyConceptDescription: "여러 구조체를 관리할 때는 vector<타입>이 가장 편해요. push_back()으로 추가, for(auto& c : party)로 순회해요.",
    relatedTopics: ["vector", "struct", "구조체 컬렉션", "RPG 프로젝트"],
  },
  {
    id: 509,
    lessonId: "cpp-p2",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `struct Character {
    string name;
    int hp;
};

int main() {
    Character hero;
    hero.name = "전사";
    hero.hp = 100;
    cout << hero.name << " HP: " << hero.hp << "\\n";
}`,
    options: [
      "전사 100",
      "전사 HP: 100",
      "hero HP: 100",
      "컴파일 에러",
    ],
    correctAnswer: 1,
    explanation: "hero.name은 \"전사\", hero.hp는 100이에요. . (점) 연산자로 멤버에 접근해서 출력하면 \"전사 HP: 100\"이 나와요.",
    keyConceptTitle: "점(.) 연산자로 멤버 접근",
    keyConceptDescription: "구조체변수.멤버이름 형태로 멤버에 접근해요. hero.name, hero.hp처럼 사용해요. 점 연산자는 struct와 class 모두에서 쓰여요.",
    relatedTopics: ["struct", "멤버 접근", ". 연산자", "RPG 프로젝트"],
  },
  {
    id: 510,
    lessonId: "cpp-p2",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Character {
    string name;
    int hp;
    int atk;
    int level;
};

int main() {
    Character warrior = {"전사", 100, 25, 1};
    Character mage = {"마법사", 60, 40, 1};
    vector<Character> party;
    party.push_back(warrior);
    party.push_back(mage);
    cout << "파티원 수: " << party.size() << "\\n";
    cout << party[0].name << " HP: " << party[0].hp << "\\n";
}`,
    options: [
      "파티원 수: 2\\n전사 HP: 100",
      "파티원 수: 1\\n전사 HP: 100",
      "파티원 수: 2\\n마법사 HP: 60",
      "컴파일 에러",
    ],
    correctAnswer: 0,
    explanation: "push_back으로 warrior, mage 순서로 2명을 추가했어요. party.size()=2, party[0]은 첫 번째 warrior이므로 name=\"전사\", hp=100이에요.",
    keyConceptTitle: "struct 초기화 리스트 + vector",
    keyConceptDescription: "struct 변수 = {값1, 값2, ...}; 형태로 초기화할 때 멤버 선언 순서대로 값을 넣어요. push_back으로 vector에 struct를 담고, [i].멤버로 접근해요.",
    relatedTopics: ["struct 초기화", "vector", "push_back", "RPG 프로젝트"],
  },
  {
    id: 511,
    lessonId: "cpp-p2",
    difficulty: "보통",
    question: "다음 showCharacter 함수에서 c.hp를 바꾸면 원본 캐릭터 hp는 어떻게 될까요?",
    code: `void showCharacter(Character c) {
    cout << "=== " << c.name << " ===" << "\\n";
    cout << "HP: " << c.hp << "\\n";
    cout << "ATK: " << c.atk << "\\n";
}`,
    options: [
      "함수 안에서 c.hp를 수정하면 원본 캐릭터 hp도 바뀐다",
      "c는 원본의 복사본이라, c를 수정해도 원본은 바뀌지 않는다",
      "struct는 값 전달이 불가능해서 항상 &를 붙여야 한다",
      "값 전달은 참조 전달보다 항상 빠르다",
    ],
    correctAnswer: 1,
    explanation: "Character c처럼 & 없이 값으로 전달하면 원본의 복사본이 만들어져요. 출력처럼 읽기만 할 때는 값 전달로 충분해요. 원본을 수정해야 할 때는 Character&를 써요.",
    keyConceptTitle: "struct 값 전달 = 복사본",
    keyConceptDescription: "void showCharacter(Character c) — c는 원본의 복사본이에요. 읽기만 할 때는 OK. 원본 HP를 깎는 attack 같은 함수는 Character&(참조)로 받아야 해요.",
    relatedTopics: ["값 전달", "복사본", "struct", "RPG 프로젝트"],
  },
  {
    id: 512,
    lessonId: "cpp-p2",
    difficulty: "보통",
    question: "다음 attack 함수에서 & 기호를 붙이는 이유는?",
    code: `void attack(Character& attacker, Character& target) {
    target.hp -= attacker.atk;
    cout << attacker.name << "이(가) " << target.name
         << "을 공격! (-" << attacker.atk << "HP)" << "\\n";
    if (target.hp <= 0) {
        cout << target.name << " 쓰러졌다!" << "\\n";
    }
}`,
    options: [
      "& 없으면 struct를 함수에 넣을 수 없어서",
      "원본 hp를 직접 깎아야 하므로",
      "참조를 쓰면 코드가 더 짧아지므로",
      "& 없이는 . 연산자를 쓸 수 없어서",
    ],
    correctAnswer: 1,
    explanation: "& (참조)를 쓰면 복사본이 아닌 원본을 직접 수정해요. target.hp -= attacker.atk 가 실제 캐릭터의 hp를 깎아요. & 없으면 복사본만 바뀌고 원본 hp는 그대로예요.",
    keyConceptTitle: "참조 전달 = 원본 수정",
    keyConceptDescription: "void attack(Character& a, Character& t) — &를 붙이면 원본을 직접 수정해요. HP처럼 게임 상태를 바꿔야 할 때 반드시 참조 전달을 써요.",
    relatedTopics: ["참조 전달", "&", "struct", "원본 수정", "RPG 프로젝트"],
  },
  {
    id: 513,
    lessonId: "cpp-p2",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

struct Character {
    string name;
    int hp;
    int atk;
};

void attack(Character& attacker, Character& target) {
    target.hp -= attacker.atk;
    if (target.hp <= 0) {
        cout << target.name << " 쓰러졌다!\\n";
    }
}

int main() {
    Character hero = {"전사", 100, 30};
    Character slime = {"슬라임", 25, 10};
    attack(hero, slime);
    attack(slime, hero);
    cout << "전사 HP: " << hero.hp << "\\n";
}`,
    options: [
      "슬라임 쓰러졌다!\\n전사 HP: 90",
      "슬라임 쓰러졌다!\\n전사 HP: 100",
      "전사 HP: 90",
      "컴파일 에러",
    ],
    correctAnswer: 0,
    explanation: "attack(hero, slime): slime.hp = 25-30 = -5 → -5<=0이므로 \"슬라임 쓰러졌다!\" 출력. attack(slime, hero): hero.hp = 100-10 = 90 → 90>0이므로 출력 없음. 마지막으로 \"전사 HP: 90\" 출력. 참조(&) 덕분에 원본 hp가 실제로 바뀌었어요.",
    keyConceptTitle: "참조 전달로 hp 수정 추적",
    keyConceptDescription: "& 참조로 받은 target.hp -= attacker.atk 는 원본을 직접 수정해요. 호출 순서대로 차례로 추적하면 최종 hp와 출력을 알 수 있어요.",
    relatedTopics: ["참조 전달", "attack 함수", "추적", "RPG 프로젝트"],
  },
  {
    id: 514,
    lessonId: "cpp-p2",
    difficulty: "어려움",
    question: "다음 코드에서 attack() 호출 후 slime.hp 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

struct Character {
    string name;
    int hp;
    int atk;
};

void attack(Character attacker, Character target) {  // & 없음!
    target.hp -= attacker.atk;
}

int main() {
    Character hero = {"전사", 100, 30};
    Character slime = {"슬라임", 50, 10};
    attack(hero, slime);
    cout << slime.hp;
}`,
    options: [
      "50",
      "20",
      "0",
      "컴파일 에러",
    ],
    correctAnswer: 0,
    explanation: "attack(Character target) — & 없이 값 전달이에요. target은 slime의 복사본이라, target.hp = 50-30 = 20으로 바뀌지만 원본 slime.hp는 여전히 50이에요. 원본을 수정하려면 Character& target이 필요해요.",
    keyConceptTitle: "& 없으면 원본이 안 바뀐다",
    keyConceptDescription: "void attack(Character target) — &가 없으면 값 전달이라 복사본만 수정돼요. slime.hp = 50 그대로! attack 함수에서 원본 hp를 깎으려면 반드시 Character& target으로 써야 해요.",
    relatedTopics: ["값 전달", "참조 전달", "& 차이", "RPG 프로젝트"],
  },

  // ============================================================
  // cpp-p3: USACO 모의전
  // ============================================================
  {
    id: 515,
    lessonId: "cpp-p3",
    difficulty: "쉬움",
    question: "`#include <bits/stdc++.h>`를 쓰는 이유는?",
    code: `// 경쟁 프로그래밍 템플릿
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4};
    sort(v.begin(), v.end());
    // vector, sort 모두 따로 include 안 해도 됨
}`,
    options: [
      "코드 실행 속도를 빠르게 해주는 헤더다",
      "vector, algorithm, string 등 표준 라이브러리를 한 번에 다 포함한다",
      "USACO 채점 서버에서만 작동하는 특수 헤더다",
      "using namespace std; 없이도 std:: 없이 쓸 수 있게 해준다",
    ],
    correctAnswer: 1,
    explanation: "<bits/stdc++.h>는 거의 모든 C++ 표준 헤더를 한 번에 포함해요. 경쟁 프로그래밍에서 시간을 아끼기 위해 사용해요. 프로덕션 코드에서는 필요한 헤더만 명시적으로 포함하는 게 좋아요.",
    keyConceptTitle: "#include <bits/stdc++.h>",
    keyConceptDescription: "경쟁 프로그래밍 전용 단축키 헤더. 모든 표준 라이브러리를 한 번에 포함해요. 실제 프로젝트보다 대회에서 코딩 속도를 높일 때 사용해요.",
    relatedTopics: ["bits/stdc++.h", "헤더", "경쟁 프로그래밍", "USACO"],
  },
  {
    id: 516,
    lessonId: "cpp-p3",
    difficulty: "쉬움",
    question: "벡터를 내림차순으로 정렬하는 올바른 코드는?",
    code: `vector<int> v = {5, 2, 8, 1, 9};
// 내림차순 정렬하려면?`,
    options: [
      "sort(v.begin(), v.end());",
      "sort(v.begin(), v.end(), greater<int>());",
      "sort(v.end(), v.begin());",
      "sort_desc(v.begin(), v.end());",
    ],
    correctAnswer: 1,
    explanation: "sort 세 번째 인자로 greater<int>()를 넣으면 내림차순 정렬이에요. sort(v.begin(), v.end())만 쓰면 기본 오름차순이에요.",
    keyConceptTitle: "내림차순 정렬 — greater<int>()",
    keyConceptDescription: "sort(v.begin(), v.end(), greater<int>()) — 큰 수부터 정렬. sort(v.begin(), v.end()) — 작은 수부터 정렬(오름차순). USACO에서 상위 K개를 구할 때 자주 써요.",
    relatedTopics: ["sort", "greater", "내림차순", "USACO"],
  },
  {
    id: 517,
    lessonId: "cpp-p3",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end(), greater<int>());
    for (int i = 0; i < 3; i++) {
        cout << v[i] << " ";
    }
}`,
    options: [
      "5 4 3",
      "1 1 3",
      "3 1 4",
      "5 4 1",
    ],
    correctAnswer: 0,
    explanation: "greater<int>()로 내림차순 정렬하면 v = {5, 4, 3, 1, 1}이에요. 인덱스 0, 1, 2를 출력하면 \"5 4 3\"이에요.",
    keyConceptTitle: "내림차순 정렬 후 상위 K개 출력",
    keyConceptDescription: "sort + greater<int>()로 내림차순 정렬 후, 앞에서 K개(v[0]~v[K-1])를 출력하면 상위 K개를 뽑을 수 있어요. USACO Bronze에서 자주 나오는 패턴이에요.",
    relatedTopics: ["sort", "greater", "상위 K개", "USACO"],
  },
  {
    id: 518,
    lessonId: "cpp-p3",
    difficulty: "보통",
    question: "`map<int, int>`로 숫자 빈도를 세는 코드의 출력 결과는?",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> nums = {3, 1, 3, 2, 3, 1};
    map<int, int> freq;
    for (int n : nums) freq[n]++;
    cout << freq[3] << " " << freq[1] << " " << freq[2];
}`,
    options: [
      "3 2 1", "1 2 3", "2 3 1", "3 1 2"],
    correctAnswer: 0,
    explanation: "3은 3번, 1은 2번, 2는 1번 등장해요. freq[3]=3, freq[1]=2, freq[2]=1. map은 키 기준 자동 오름차순 정렬이지만, cout에서 직접 키로 접근했으므로 3 2 1이 출력돼요.",
    keyConceptTitle: "map으로 빈도 카운팅",
    keyConceptDescription: "map<int,int> freq; for (int n : v) freq[n]++; — 처음 나온 키는 자동으로 0으로 초기화돼요. 빈도 카운팅의 기본 패턴이에요.",
    relatedTopics: ["map", "빈도 카운팅", "freq[n]++", "USACO"],
  },
  {
    id: 519,
    lessonId: "cpp-p3",
    difficulty: "보통",
    question: "괄호 매칭에서 stack을 쓰는 이유로 가장 적절한 것은?",
    code: `// 입력: "((()))"
// 올바른 괄호인지 확인
stack<char> st;
for (char c : s) {
    if (c == '(') st.push(c);
    else {
        if (st.empty()) { valid = false; break; }
        st.pop();
    }
}
valid = valid && st.empty();`,
    options: [
      "괄호의 총 개수를 빠르게 세기 위해",
      "가장 최근에 열린 괄호를 먼저 닫아야 하는 구조(LIFO)이기 때문에",
      "stack이 queue보다 메모리를 적게 써서",
      "sort 없이 자동 정렬이 되기 때문에",
    ],
    correctAnswer: 1,
    explanation: "괄호는 '가장 최근에 열린 것이 먼저 닫혀야' 해요. 이게 LIFO(Last In First Out) 구조인 stack이랑 딱 맞아요. queue나 vector로 하면 '가장 최근' 것을 꺼내기 복잡해져요.",
    keyConceptTitle: "stack의 LIFO — 괄호 매칭",
    keyConceptDescription: "괄호 매칭 = stack의 교과서 사례. '(' → push, ')' → top 확인 후 pop. 마지막에 stack이 비어있으면 올바른 괄호예요.",
    relatedTopics: ["stack", "LIFO", "괄호 매칭", "USACO"],
  },
  {
    id: 520,
    lessonId: "cpp-p3",
    difficulty: "어려움",
    question: "다음 코드에서 서로 다른 숫자의 개수는?",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v = {5, 3, 5, 2, 3, 3, 1};
    map<int, int> freq;
    for (int n : v) freq[n]++;
    cout << freq.size();
}`,
    options: ["7", "4", "3", "5"],
    correctAnswer: 1,
    explanation: "v에서 서로 다른 값은 1, 2, 3, 5로 4개예요. freq 맵에는 키가 4개(1, 2, 3, 5) 들어가고, freq.size()는 4를 반환해요.",
    keyConceptTitle: "map.size() = 서로 다른 키 수",
    keyConceptDescription: "map에서 각 키는 한 번만 존재해요. 원소를 map에 담으면 중복이 자동 제거되고, .size()로 서로 다른 값의 수를 알 수 있어요.",
    relatedTopics: ["map", "size()", "중복 제거", "서로 다른 원소 수"],
  },
  {
    id: 521,
    lessonId: "cpp-p3",
    difficulty: "어려움",
    question: "다음 괄호 검사 코드에서 입력 `\"(()\"` 의 결과는?",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s = "(()";
    stack<char> st;
    bool valid = true;
    for (char c : s) {
        if (c == '(') st.push(c);
        else {
            if (st.empty()) { valid = false; break; }
            st.pop();
        }
    }
    if (!st.empty()) valid = false;
    cout << (valid ? "올바름" : "잘못됨");
}`,
    options: ["올바름", "잘못됨", "컴파일 에러", "런타임 에러"],
    correctAnswer: 1,
    explanation: "'(' → push. '(' → push. ')' → pop. 루프 종료 후 stack에 '('가 1개 남아 있어요. !st.empty()이므로 valid = false → '잘못됨' 출력.",
    keyConceptTitle: "미닫힌 괄호 감지",
    keyConceptDescription: "루프 후 stack이 비어있어야 올바른 괄호. 남은 게 있으면 닫히지 않은 '('가 있다는 뜻이에요.",
    relatedTopics: ["stack", "괄호 매칭", "USACO", "유효성 검사"],
  },
  // ── cpp-5 추가: 1D 배열 ──
  {
    id: 523,
    lessonId: "cpp-9",
    difficulty: "쉬움",
    question: "다음 중 크기 5인 정수 배열을 올바르게 선언한 것은?",
    code: ``,
    options: ["int arr[5];", "array int arr(5);", "int[5] arr;", "arr int[5];"],
    correctAnswer: 0,
    explanation: "C++ 배열은 '타입 배열명[크기];' 형식으로 선언합니다. int arr[5]는 int형 요소 5개를 저장할 수 있는 배열이에요.",
    keyConceptTitle: "배열 선언",
    keyConceptDescription: "타입 배열명[크기]; — C++ 배열 선언 기본 형식. 크기는 반드시 양의 정수 상수여야 합니다.",
    relatedTopics: ["배열 선언", "정적 배열", "배열"],
  },
  {
    id: 524,
    lessonId: "cpp-9",
    difficulty: "쉬움",
    question: "다음 코드에서 배열의 마지막 요소에 접근하는 올바른 인덱스는?",
    code: `int arr[5] = {10, 20, 30, 40, 50};
// 마지막 요소에 접근하려면?
cout << arr[?];`,
    options: ["4", "5", "-1", "last"],
    correctAnswer: 0,
    explanation: "크기 5인 배열의 인덱스는 0~4입니다. 마지막 요소는 arr[4]예요. arr[5]는 범위를 벗어난 접근(undefined behavior)입니다.",
    keyConceptTitle: "배열 인덱스 범위",
    keyConceptDescription: "크기 n인 배열의 유효한 인덱스는 0부터 n-1까지입니다. 마지막 요소: arr[n-1].",
    relatedTopics: ["배열 인덱싱", "0-based", "범위 초과"],
  },
  {
    id: 525,
    lessonId: "cpp-9",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }
    cout << sum;
    return 0;
}`,
    options: ["10", "15", "5", "25"],
    correctAnswer: 1,
    explanation: "1+2+3+4+5 = 15. for 루프로 배열의 모든 요소를 sum에 더합니다.",
    keyConceptTitle: "배열 합계 계산",
    keyConceptDescription: "for 루프로 배열을 순회하며 누적 합을 구합니다. sum += arr[i] 패턴을 기억하세요.",
    relatedTopics: ["배열 순회", "합계", "for 루프"],
  },
  {
    id: 526,
    lessonId: "cpp-9",
    difficulty: "쉬움",
    question: "배열의 크기를 구하는 올바른 방법은?",
    code: `int arr[] = {10, 20, 30, 40};
// 배열 크기를 구하려면?`,
    options: [
      "sizeof(arr) / sizeof(arr[0])",
      "arr.size()",
      "length(arr)",
      "arr.length()",
    ],
    correctAnswer: 0,
    explanation: "C++ 정적 배열은 .size() 메서드가 없어요. sizeof(arr)은 전체 바이트 수, sizeof(arr[0])은 요소 하나의 바이트 수이므로 나누면 요소 개수가 나옵니다. arr.size()는 vector에서 사용해요.",
    keyConceptTitle: "sizeof를 이용한 배열 크기",
    keyConceptDescription: "배열 크기 = sizeof(arr) / sizeof(arr[0]). 정적 배열에서만 사용 가능하며, 포인터에는 사용 불가.",
    relatedTopics: ["sizeof", "배열 크기", "정적 배열"],
  },
  {
    id: 527,
    lessonId: "cpp-9",
    difficulty: "쉬움",
    question: "다음 코드에서 arr를 모두 0으로 초기화하는 올바른 방법은?",
    code: `int arr[5] = __________;`,
    options: ["{0}", "{0,0,0,0,0}", "두 가지 모두 0으로 초기화", "{null}"],
    correctAnswer: 2,
    explanation: "{0}은 첫 원소를 0으로, 나머지를 자동으로 0으로 채웁니다. {0,0,0,0,0}은 명시적으로 다섯 개 모두 0으로 초기화해요. 두 방법 모두 결과가 같습니다.",
    keyConceptTitle: "배열 0 초기화",
    keyConceptDescription: "int arr[5] = {0}은 모든 요소를 0으로 초기화합니다. {}도 동일하게 동작해요.",
    relatedTopics: ["배열 초기화", "0 초기화", "배열"],
  },
  {
    id: 528,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {3, 1, 4, 1, 5};
    int minVal = arr[0];
    for (int i = 1; i < 5; i++) {
        if (arr[i] < minVal) minVal = arr[i];
    }
    cout << minVal;
    return 0;
}`,
    options: ["3", "1", "4", "5"],
    correctAnswer: 1,
    explanation: "최솟값 탐색 코드입니다. {3,1,4,1,5} 중 가장 작은 값은 1입니다. minVal은 arr[0]=3에서 시작해 arr[1]=1과 비교해 갱신됩니다.",
    keyConceptTitle: "배열에서 최솟값 찾기",
    keyConceptDescription: "첫 번째 요소를 임시 최솟값으로 설정 후, 더 작은 값이 있으면 갱신합니다. 최댓값과 반대 방향 비교.",
    relatedTopics: ["최솟값", "배열 순회", "비교"],
  },
  {
    id: 529,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

void printArr(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
}

int main() {
    int nums[4] = {7, 2, 9, 4};
    printArr(nums, 4);
    return 0;
}`,
    options: ["7 2 9 4", "4 9 2 7", "오류", "nums 4"],
    correctAnswer: 0,
    explanation: "배열을 함수에 전달할 때 배열 이름(nums)만 전달하면 됩니다. 함수 내에서 arr[i]로 접근해 7 2 9 4가 출력됩니다.",
    keyConceptTitle: "함수에 배열 전달",
    keyConceptDescription: "함수 매개변수 int arr[]로 배열을 받습니다. 배열 이름 전달 시 첫 번째 원소의 주소가 전달됩니다(decay). 별도로 크기도 함께 전달해야 합니다.",
    relatedTopics: ["함수", "배열 전달", "포인터로 decay"],
  },
  {
    id: 530,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "다음 코드에서 함수가 배열의 값을 변경하면 원본 배열도 바뀌는가?",
    code: `#include <iostream>
using namespace std;

void doubleArr(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;
    }
}

int main() {
    int nums[3] = {1, 2, 3};
    doubleArr(nums, 3);
    cout << nums[0] << " " << nums[1] << " " << nums[2];
    return 0;
}`,
    options: ["2 4 6", "1 2 3", "0 0 0", "오류"],
    correctAnswer: 0,
    explanation: "배열은 함수에 포인터로 전달되므로 함수 안에서 arr[i]를 수정하면 원본 배열도 변경됩니다. 출력: 2 4 6.",
    keyConceptTitle: "배열 전달 — 참조처럼 동작",
    keyConceptDescription: "배열 이름을 전달하면 포인터가 전달되어 함수 내 수정이 원본에 반영됩니다. 값 복사가 아닙니다.",
    relatedTopics: ["포인터", "배열 전달", "원본 수정"],
  },
  {
    id: 531,
    lessonId: "cpp-9",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 3, 8, 1, 9, 2};
    int n = sizeof(arr) / sizeof(arr[0]);
    int maxIdx = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] > arr[maxIdx]) maxIdx = i;
    }
    cout << maxIdx << " " << arr[maxIdx];
    return 0;
}`,
    options: ["4 9", "2 8", "0 5", "5 2"],
    correctAnswer: 0,
    explanation: "배열 {5,3,8,1,9,2}에서 최대값 9는 인덱스 4에 있습니다. maxIdx는 최댓값의 인덱스를 추적합니다. 출력: 4 9.",
    keyConceptTitle: "최댓값의 인덱스 찾기",
    keyConceptDescription: "최댓값 자체가 아니라 그 위치(인덱스)를 추적하려면 maxIdx 변수를 따로 관리합니다.",
    relatedTopics: ["최댓값 인덱스", "배열 순회", "sizeof"],
  },
  {
    id: 532,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

void addOne(int* arr, int size) {
    for (int i = 0; i < size; i++) arr[i]++;
}

int main() {
    int a[3] = {1, 2, 3};
    addOne(a, 3);
    int n = sizeof(a) / sizeof(a[0]);
    int sum = 0;
    for (int i = 0; i < n; i++) sum += a[i];
    cout << n << " " << sum;
    return 0;
}`,
    options: ["3 9", "3 6", "3 12", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "addOne 함수가 각 원소에 1을 더합니다. {1,2,3} → {2,3,4}. n = sizeof(a)/sizeof(a[0]) = 3. sum = 2+3+4 = 9. 출력: 3 9.",
    keyConceptTitle: "포인터로 배열 수정 + sizeof",
    keyConceptDescription: "배열이 int*로 전달될 때도 원본 수정이 가능합니다. sizeof는 함수 밖 원본 배열에서만 정확히 동작합니다.",
    relatedTopics: ["포인터", "sizeof", "배열 수정"],
  },

  // ── cpp-7 추가: 포인터 ──
  {
    id: 533,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;
    int* p = &x;
    cout << *p;
    return 0;
}`,
    options: ["5", "x의 주소값", "p", "오류"],
    correctAnswer: 0,
    explanation: "*p는 p가 가리키는 주소에 저장된 값을 읽습니다(역참조). p = &x이므로 *p는 x의 값 5입니다.",
    keyConceptTitle: "역참조로 값 읽기",
    keyConceptDescription: "*포인터 — 포인터가 가리키는 주소의 값을 읽거나 씁니다. &는 주소를 얻고, *는 주소에서 값을 얻습니다.",
    relatedTopics: ["역참조", "*", "포인터"],
  },
  {
    id: 534,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "다음 중 double형 변수를 가리키는 포인터 선언으로 올바른 것은?",
    code: `double score = 9.5;
// score를 가리키는 포인터 선언?`,
    options: ["double* p = &score;", "double& p = &score;", "ptr<double> p = score;", "double p* = &score;"],
    correctAnswer: 0,
    explanation: "double을 가리키는 포인터는 double*로 선언합니다. &score로 score의 주소를 얻어 초기화해요. double&는 참조(reference)로 다른 개념입니다.",
    keyConceptTitle: "다양한 타입의 포인터",
    keyConceptDescription: "int* p, double* p, char* p — 가리키는 타입에 따라 선언이 달라집니다. 모두 메모리 주소를 저장합니다.",
    relatedTopics: ["포인터 선언", "double*", "타입별 포인터"],
  },
  {
    id: 535,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "다음 코드에서 nullptr 포인터를 역참조하면 어떻게 되는가?",
    code: `int* p = nullptr;
*p = 10;  // ← 이 코드는?`,
    options: [
      "런타임 오류(세그멘테이션 폴트) 발생",
      "0이 저장됨",
      "컴파일 오류",
      "아무 일도 일어나지 않음",
    ],
    correctAnswer: 0,
    explanation: "nullptr은 유효한 메모리 주소가 아닙니다. nullptr 포인터를 역참조하면 런타임 오류(세그멘테이션 폴트)가 발생합니다. 포인터 사용 전 nullptr 검사가 중요한 이유입니다.",
    keyConceptTitle: "nullptr 역참조 금지",
    keyConceptDescription: "포인터 사용 전 if (p != nullptr) 검사를 권장합니다. nullptr 역참조는 프로그램 충돌로 이어집니다.",
    relatedTopics: ["nullptr", "세그멘테이션 폴트", "포인터 안전"],
  },
  {
    id: 536,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "다음 코드에서 배열 이름 arr는 무엇을 의미하는가?",
    code: `int arr[4] = {10, 20, 30, 40};
cout << *arr;`,
    options: [
      "배열 첫 번째 원소의 주소 (포인터)",
      "배열 전체의 복사본",
      "배열의 크기",
      "오류",
    ],
    correctAnswer: 0,
    explanation: "배열 이름 arr는 첫 번째 원소 &arr[0]의 주소를 나타냅니다. 따라서 *arr는 arr[0] = 10을 출력합니다.",
    keyConceptTitle: "배열 이름 = 첫 원소 주소",
    keyConceptDescription: "배열 이름은 첫 번째 원소의 포인터입니다. arr == &arr[0]. *arr == arr[0].",
    relatedTopics: ["배열과 포인터", "decay", "배열 이름"],
  },
  {
    id: 537,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[3] = {10, 20, 30};
    int* p = arr;
    cout << *(p + 1) << " " << *(p + 2);
    return 0;
}`,
    options: ["20 30", "10 20", "11 12", "오류"],
    correctAnswer: 0,
    explanation: "p는 arr[0]을 가리킵니다. p+1은 arr[1]의 주소, *(p+1)은 arr[1] = 20입니다. p+2는 arr[2]의 주소, *(p+2) = 30.",
    keyConceptTitle: "포인터 산술",
    keyConceptDescription: "포인터 + n은 n개 요소만큼 앞의 주소를 가리킵니다. *(p+n) == arr[n]. 배열을 포인터로 순회할 수 있습니다.",
    relatedTopics: ["포인터 산술", "*(p+n)", "배열 순회"],
  },
  {
    id: 538,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 swap 함수에서 포인터를 쓰는 이유는?",
    code: `void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(&x, &y);
    cout << x << " " << y;
}`,
    options: [
      "원본 변수의 값을 함수 안에서 변경하기 위해",
      "포인터가 더 빠르기 때문에",
      "정수형은 포인터로만 전달 가능하기 때문에",
      "변수 복사를 피하기 위해",
    ],
    correctAnswer: 0,
    explanation: "함수에 int a, int b로 전달하면 복사본만 바뀝니다. 포인터로 주소(&x, &y)를 전달하면 *a = *b로 원본 값을 직접 수정할 수 있습니다. 출력: 10 5.",
    keyConceptTitle: "포인터로 원본 수정",
    keyConceptDescription: "값 전달(call by value)은 복사본 수정. 포인터 전달(call by pointer)은 원본 수정. swap이 대표적 예시.",
    relatedTopics: ["swap", "포인터 매개변수", "call by pointer"],
  },
  {
    id: 539,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[4] = {1, 2, 3, 4};
    int* p = arr;
    p++;
    cout << *p << " ";
    p += 2;
    cout << *p;
    return 0;
}`,
    options: ["2 4", "1 3", "2 3", "오류"],
    correctAnswer: 0,
    explanation: "p = arr (arr[0]). p++ 후 p는 arr[1] → *p = 2. p += 2 후 p는 arr[3] → *p = 4. 출력: 2 4.",
    keyConceptTitle: "포인터 증감",
    keyConceptDescription: "p++는 다음 요소를 가리킵니다. p += n은 n번째 이후 요소. 포인터로 배열을 순회할 수 있습니다.",
    relatedTopics: ["p++", "포인터 증감", "포인터 산술"],
  },
  {
    id: 540,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드에서 함수 실행 후 main의 x, y 값은?",
    code: `#include <iostream>
using namespace std;

void noSwap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 3, y = 7;
    noSwap(x, y);
    cout << x << " " << y;
    return 0;
}`,
    options: ["3 7", "7 3", "0 0", "오류"],
    correctAnswer: 0,
    explanation: "noSwap은 값 복사(call by value)로 전달됩니다. 함수 안에서 a, b를 교환해도 원본 x, y는 변하지 않습니다. x=3, y=7 그대로 출력.",
    keyConceptTitle: "값 전달 vs 포인터 전달",
    keyConceptDescription: "call by value: 복사본만 수정. 원본 변경이 필요하면 포인터(&)나 참조(&)를 사용해야 합니다.",
    relatedTopics: ["call by value", "복사", "포인터 전달"],
  },
  {
    id: 541,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[3] = {5, 10, 15};
    int* p = arr;
    for (int i = 0; i < 3; i++) {
        cout << *(p + i) << " ";
    }
    return 0;
}`,
    options: ["5 10 15", "10 15 20", "오류", "주소값 3개"],
    correctAnswer: 0,
    explanation: "*(p + i)는 arr[i]와 동일합니다. i=0: arr[0]=5, i=1: arr[1]=10, i=2: arr[2]=15. 출력: 5 10 15.",
    keyConceptTitle: "포인터로 배열 순회",
    keyConceptDescription: "*(p + i) == arr[i] == p[i]. 포인터 산술로 배열 인덱싱과 동일한 접근이 가능합니다.",
    relatedTopics: ["*(p+i)", "배열 순회", "포인터 산술"],
  },
  {
    id: 542,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

void increment(int* p, int n) {
    for (int i = 0; i < n; i++) {
        *(p + i) += i;
    }
}

int main() {
    int arr[4] = {1, 1, 1, 1};
    increment(arr, 4);
    for (int i = 0; i < 4; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}`,
    options: ["1 2 3 4", "1 1 1 1", "0 1 2 3", "2 3 4 5"],
    correctAnswer: 0,
    explanation: "increment 함수에서 *(p+0) += 0 → arr[0]=1, *(p+1) += 1 → arr[1]=2, *(p+2) += 2 → arr[2]=3, *(p+3) += 3 → arr[3]=4. 출력: 1 2 3 4.",
    keyConceptTitle: "포인터 산술로 배열 원소 수정",
    keyConceptDescription: "*(p+i) += i는 arr[i] += i와 동일. 포인터를 통해 배열 원소를 인덱스 기반으로 수정합니다.",
    relatedTopics: ["포인터 산술", "배열 수정", "*(p+i)"],
  },
  {
    id: 543,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "void* 포인터에 대한 설명으로 올바른 것은?",
    code: `void* p;
int x = 42;
p = &x;
// *p = 10;  ← 컴파일 오류
int* ip = (int*)p;
*ip = 10;
cout << x;`,
    options: [
      "어떤 타입의 주소도 저장할 수 있지만, 역참조 전에 원래 타입으로 캐스팅해야 한다",
      "어떤 타입도 역참조 없이 직접 접근 가능하다",
      "void* 는 nullptr과 동일하다",
      "함수 포인터에만 사용 가능하다",
    ],
    correctAnswer: 0,
    explanation: "void*는 타입 정보가 없는 포인터로 어떤 타입의 주소도 저장 가능합니다. 단, 역참조(*p)는 타입을 알 수 없어 컴파일 오류가 납니다. 사용하려면 (int*)처럼 캐스팅 후 역참조해야 합니다. 위 코드 출력: 10.",
    keyConceptTitle: "void* 포인터",
    keyConceptDescription: "void*: 타입 없는 포인터. 어떤 타입 주소도 저장 가능. 역참조 전 반드시 원래 타입으로 캐스팅 필요.",
    relatedTopics: ["void*", "타입 캐스팅", "범용 포인터"],
  },

  {
    id: 522,
    lessonId: "cpp-p3",
    difficulty: "어려움",
    question: "USACO 파일 입출력을 위한 `freopen` 설정이 올바른 것은?",
    code: `int main() {
    // input.txt에서 읽고 output.txt에 쓰려면?
    ???
    int n; cin >> n;
    cout << n * 2;
}`,
    options: [
      "freopen(\"input.txt\", \"w\", stdin); freopen(\"output.txt\", \"r\", stdout);",
      "freopen(\"input.txt\", \"r\", stdin); freopen(\"output.txt\", \"w\", stdout);",
      "open(\"input.txt\"); close(\"output.txt\");",
      "cin.open(\"input.txt\"); cout.open(\"output.txt\");",
    ],
    correctAnswer: 1,
    explanation: "freopen(파일명, 모드, 스트림). 입력 파일은 \"r\"(read) + stdin, 출력 파일은 \"w\"(write) + stdout. 이렇게 하면 cin/cout이 자동으로 파일로 연결돼요.",
    keyConceptTitle: "freopen — 파일 입출력 리다이렉션",
    keyConceptDescription: "freopen(\"in.txt\", \"r\", stdin) + freopen(\"out.txt\", \"w\", stdout) → cin/cout이 파일과 연결. USACO 로컬 테스트의 기본 설정이에요.",
    relatedTopics: ["freopen", "파일 입출력", "stdin", "stdout", "USACO"],
  },

  // ── cpp-9 (struct) ──────────────────────────────────────────────────────
  {
    id: 544,
    lessonId: "cpp-14",
    difficulty: "쉬움",
    question: "다음 struct 선언에서 멤버변수를 올바르게 접근하는 코드는?",
    code: `struct Book {
    string title;
    int pages;
};
Book b = {"코딩의 즐거움", 300};`,
    options: [
      "b.title",
      "b->title",
      "Book.title",
      "b[title]",
    ],
    correctAnswer: 0,
    explanation: "struct 변수에서 멤버 접근은 . 연산자를 사용합니다. b.title이 올바른 접근 방법입니다. ->는 포인터일 때 사용합니다.",
    keyConceptTitle: "struct 멤버 접근 (. 연산자)",
    keyConceptDescription: "struct 변수.멤버명으로 접근. 포인터라면 ->를 사용.",
  },
  {
    id: 545,
    lessonId: "cpp-14",
    difficulty: "쉬움",
    question: "다음 struct 초기화 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int age;
};

int main() {
    Student s = {"홍길동", 17};
    cout << s.name << " " << s.age;
    return 0;
}`,
    options: ["홍길동 17", "홍길동17", "컴파일 오류", "0 0"],
    correctAnswer: 0,
    explanation: "중괄호 초기화로 name=\"홍길동\", age=17이 설정됩니다. s.name과 s.age를 출력하면 \"홍길동 17\"이 나옵니다.",
    keyConceptTitle: "struct 초기화",
    keyConceptDescription: "struct 변수 = {값1, 값2, ...}; 형태로 선언 순서대로 초기화합니다.",
  },
  {
    id: 546,
    lessonId: "cpp-14",
    difficulty: "쉬움",
    question: "struct 선언 시 세미콜론(;) 위치로 올바른 것은?",
    code: `// 아래 중 올바른 struct 선언은?`,
    options: [
      "struct Point { int x; int y; };",
      "struct Point { int x; int y; }",
      "struct Point; { int x; int y; }",
      "struct { int x; int y; } Point;",
    ],
    correctAnswer: 0,
    explanation: "C++에서 struct 선언은 닫는 중괄호 } 뒤에 반드시 세미콜론(;)이 와야 합니다. struct Point { ... };",
    keyConceptTitle: "struct 선언 문법",
    keyConceptDescription: "struct 이름 { 멤버선언; }; — 닫는 중괄호 뒤 세미콜론 필수.",
  },
  {
    id: 547,
    lessonId: "cpp-14",
    difficulty: "쉬움",
    question: "struct 멤버값을 변경하는 올바른 코드는?",
    code: `struct Score {
    string subject;
    int point;
};
Score s = {"수학", 80};
// s의 point를 95로 변경하려면?`,
    options: [
      "s.point = 95;",
      "s->point = 95;",
      "Score.point = 95;",
      "s[point] = 95;",
    ],
    correctAnswer: 0,
    explanation: "struct 변수의 멤버는 . 연산자로 접근해 값을 수정합니다. s.point = 95;로 변경할 수 있습니다.",
    keyConceptTitle: "struct 멤버 수정",
    keyConceptDescription: "변수.멤버 = 새값; 형태로 멤버값을 수정합니다.",
  },
  {
    id: 548,
    lessonId: "cpp-14",
    difficulty: "쉬움",
    question: "다음 struct 배열 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

struct Cat {
    string name;
    int age;
};

int main() {
    Cat cats[2] = {{"나비", 3}, {"치즈", 5}};
    cout << cats[1].name;
    return 0;
}`,
    options: ["치즈", "나비", "3", "5"],
    correctAnswer: 0,
    explanation: "cats[0]은 나비(3세), cats[1]은 치즈(5세)입니다. cats[1].name은 \"치즈\"입니다.",
    keyConceptTitle: "struct 배열",
    keyConceptDescription: "struct 배열: struct타입 배열명[크기]; 각 원소는 배열명[i].멤버로 접근.",
  },
  {
    id: 549,
    lessonId: "cpp-14",
    difficulty: "보통",
    question: "다음 코드에서 함수가 struct를 값으로 받을 때의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

struct Rect {
    int w, h;
};

void doubleWidth(Rect r) {
    r.w *= 2;
    cout << r.w << " ";
}

int main() {
    Rect rect = {4, 3};
    doubleWidth(rect);
    cout << rect.w;
    return 0;
}`,
    options: ["8 4", "8 8", "4 4", "4 8"],
    correctAnswer: 0,
    explanation: "pass by value이므로 함수 안에서 r.w를 변경해도 원본 rect.w는 그대로입니다. 함수 내부에서 8, 원본은 여전히 4.",
    keyConceptTitle: "struct pass by value",
    keyConceptDescription: "함수에 struct를 값으로 전달하면 복사본이 생성됩니다. 원본은 변경되지 않습니다.",
  },
  {
    id: 550,
    lessonId: "cpp-14",
    difficulty: "보통",
    question: "다음 코드에서 struct를 참조로 전달할 때의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

struct Rect {
    int w, h;
};

void doubleWidth(Rect& r) {
    r.w *= 2;
}

int main() {
    Rect rect = {4, 3};
    doubleWidth(rect);
    cout << rect.w;
    return 0;
}`,
    options: ["8", "4", "컴파일 오류", "0"],
    correctAnswer: 0,
    explanation: "pass by reference이므로 함수 안에서 r.w를 변경하면 원본 rect.w도 변경됩니다. 4*2=8.",
    keyConceptTitle: "struct pass by reference",
    keyConceptDescription: "struct&로 참조 전달하면 함수 내 변경이 원본에 반영됩니다.",
  },
  {
    id: 551,
    lessonId: "cpp-14",
    difficulty: "보통",
    question: "다음 중첩 struct 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

struct Address {
    string city;
    int zip;
};

struct Person {
    string name;
    Address addr;
};

int main() {
    Person p = {"김철수", {"서울", 12345}};
    cout << p.name << " " << p.addr.city;
    return 0;
}`,
    options: ["김철수 서울", "김철수 12345", "서울 12345", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "중첩 struct는 p.addr.city처럼 . 연산자를 연결해서 접근합니다. p.name=\"김철수\", p.addr.city=\"서울\".",
    keyConceptTitle: "중첩 struct",
    keyConceptDescription: "struct 안에 다른 struct를 멤버로 포함할 수 있습니다. 외부.내부.멤버 형태로 접근.",
  },
  {
    id: 552,
    lessonId: "cpp-14",
    difficulty: "보통",
    question: "다음 코드에서 struct를 반환하는 함수의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

struct Point {
    int x, y;
};

Point makePoint(int x, int y) {
    Point p;
    p.x = x;
    p.y = y;
    return p;
}

int main() {
    Point pt = makePoint(5, 10);
    cout << pt.x << "," << pt.y;
    return 0;
}`,
    options: ["5,10", "10,5", "0,0", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "함수에서 struct를 반환할 수 있습니다. makePoint(5, 10)은 x=5, y=10인 Point를 반환하므로 \"5,10\"이 출력됩니다.",
    keyConceptTitle: "struct 반환",
    keyConceptDescription: "함수의 반환 타입을 struct로 지정하면 struct를 반환할 수 있습니다.",
  },
  {
    id: 553,
    lessonId: "cpp-14",
    difficulty: "보통",
    question: "다음 코드에서 struct 배열을 반복문으로 처리할 때 출력 결과는?",
    code: `#include <iostream>
using namespace std;

struct Item {
    string name;
    int price;
};

int main() {
    Item items[3] = {{"사과", 500}, {"바나나", 300}, {"포도", 800}};
    int total = 0;
    for (int i = 0; i < 3; i++) {
        total += items[i].price;
    }
    cout << total;
    return 0;
}`,
    options: ["1600", "1500", "800", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "500 + 300 + 800 = 1600. struct 배열의 각 원소 멤버에 items[i].price로 접근합니다.",
    keyConceptTitle: "struct 배열 반복문",
    keyConceptDescription: "struct 배열을 for 루프로 순회할 때 배열명[i].멤버로 각 원소의 멤버에 접근합니다.",
  },
  {
    id: 554,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드에서 struct 포인터를 사용할 때 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

struct Dog {
    string name;
    int age;
};

void birthday(Dog* d) {
    d->age++;
}

int main() {
    Dog dog = {"멍멍이", 3};
    birthday(&dog);
    cout << dog.name << " " << dog.age;
    return 0;
}`,
    options: ["멍멍이 4", "멍멍이 3", "컴파일 오류", "멍멍이 0"],
    correctAnswer: 0,
    explanation: "포인터로 struct를 전달하면 원본이 수정됩니다. d->age++는 (*d).age++와 같으며, dog.age가 3에서 4로 증가합니다.",
    keyConceptTitle: "struct 포인터와 -> 연산자",
    keyConceptDescription: "struct 포인터에서 멤버 접근은 ->를 사용. d->age는 (*d).age와 동일.",
  },
  {
    id: 555,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 중첩 struct에서 내부 struct 멤버를 수정하는 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

struct Engine {
    int horsepower;
    bool turbo;
};

struct Car {
    string model;
    Engine engine;
};

int main() {
    Car c = {"소나타", {150, false}};
    c.engine.turbo = true;
    c.engine.horsepower += 50;
    cout << c.model << " " << c.engine.horsepower << " " << c.engine.turbo;
    return 0;
}`,
    options: ["소나타 200 1", "소나타 150 0", "소나타 200 0", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "c.engine.turbo = true(→1), c.engine.horsepower = 150+50 = 200. bool은 cout에서 0/1로 출력됩니다.",
    keyConceptTitle: "중첩 struct 멤버 수정",
    keyConceptDescription: "중첩 struct의 멤버는 외부변수.내부구조체.멤버 = 값; 형태로 수정합니다.",
  },

  // ── cpp-14 (탐색 알고리즘) ──────────────────────────────────────────────
  {
    id: 556,
    lessonId: "cpp-17",
    difficulty: "쉬움",
    question: "선형 탐색(linear search)의 설명으로 올바른 것은?",
    code: `// 선형 탐색 예시
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
    options: [
      "배열을 처음부터 끝까지 순서대로 비교한다",
      "정렬된 배열에서만 사용 가능하다",
      "항상 O(log N) 시간이 걸린다",
      "중간값부터 비교를 시작한다",
    ],
    correctAnswer: 0,
    explanation: "선형 탐색은 배열의 첫 번째 원소부터 마지막까지 순서대로 target과 비교합니다. 정렬 여부에 관계없이 사용 가능합니다.",
    keyConceptTitle: "선형 탐색 (Linear Search)",
    keyConceptDescription: "배열을 처음부터 끝까지 순서대로 탐색. 정렬 불필요. 시간복잡도 O(N).",
  },
  {
    id: 557,
    lessonId: "cpp-17",
    difficulty: "쉬움",
    question: "선형 탐색에서 원소를 찾지 못했을 때 반환하는 관례적인 값은?",
    code: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return ???;  // 못 찾았을 때
}`,
    options: ["-1", "0", "n", "false"],
    correctAnswer: 0,
    explanation: "탐색 실패 시 -1을 반환하는 것이 관례입니다. 배열 인덱스는 0 이상이므로 -1은 \"없음\"을 의미합니다.",
    keyConceptTitle: "탐색 실패 반환값",
    keyConceptDescription: "탐색 함수에서 원소를 못 찾으면 -1을 반환하는 것이 일반적인 관례입니다.",
  },
  {
    id: 558,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 선형 탐색 코드에서 배열 {4, 2, 7, 1, 9}에서 target=7을 찾을 때 반환값은?",
    code: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}
// arr = {4, 2, 7, 1, 9}, n=5, target=7`,
    options: ["2", "7", "3", "-1"],
    correctAnswer: 0,
    explanation: "인덱스 0:4, 1:2, 2:7(찾음!). arr[2]=7이므로 인덱스 2를 반환합니다.",
    keyConceptTitle: "선형 탐색 실행 추적",
    keyConceptDescription: "선형 탐색은 찾는 값의 인덱스를 반환합니다.",
  },
  {
    id: 559,
    lessonId: "algo-preview",
    difficulty: "보통",
    question: "이진 탐색(binary search)의 전제 조건은?",
    code: `// 이진 탐색 사용 조건
int arr1[] = {1, 3, 5, 7, 9};   // 가능?
int arr2[] = {5, 1, 9, 3, 7};   // 가능?`,
    options: [
      "배열이 정렬된 상태여야 한다",
      "배열의 크기가 짝수여야 한다",
      "중복 원소가 없어야 한다",
      "배열이 내림차순이어야 한다",
    ],
    correctAnswer: 0,
    explanation: "이진 탐색은 반드시 정렬된 배열에서만 사용 가능합니다. 정렬되지 않은 arr2에는 이진 탐색을 적용할 수 없습니다.",
    keyConceptTitle: "이진 탐색 전제 조건",
    keyConceptDescription: "이진 탐색: 반드시 정렬된 배열에서만 사용 가능. 정렬 없이 사용하면 잘못된 결과.",
  },
  {
    id: 560,
    lessonId: "algo-preview",
    difficulty: "보통",
    question: "다음 이진 탐색 코드에서 {1,3,5,7,9}에서 target=5를 탐색할 때 mid값의 변화 순서는?",
    code: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
// arr={1,3,5,7,9}, n=5, target=5`,
    options: [
      "mid=2 → 찾음(반환 2)",
      "mid=0 → mid=2 → 찾음",
      "mid=2 → mid=3 → 찾음",
      "mid=4 → mid=2 → 찾음",
    ],
    correctAnswer: 0,
    explanation: "left=0, right=4 → mid=2. arr[2]=5=target이므로 바로 2를 반환합니다. 첫 번째 시도에서 찾습니다.",
    keyConceptTitle: "이진 탐색 실행 추적",
    keyConceptDescription: "이진 탐색은 매 단계 mid=(left+right)/2로 중간값 인덱스를 계산해 비교합니다.",
  },
  {
    id: 561,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "선형 탐색의 시간 복잡도는?",
    code: `// N개의 원소가 있는 배열에서 선형 탐색
for (int i = 0; i < N; i++) {
    if (arr[i] == target) return i;
}`,
    options: ["O(N)", "O(log N)", "O(N^2)", "O(1)"],
    correctAnswer: 0,
    explanation: "선형 탐색은 최악의 경우 N번 비교해야 합니다. 따라서 시간 복잡도는 O(N)입니다.",
    keyConceptTitle: "선형 탐색 시간 복잡도",
    keyConceptDescription: "선형 탐색 O(N): 원소 수에 비례. 1000개 배열에서 최대 1000번 비교.",
  },
  {
    id: 562,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 이진 탐색에서 {2,4,6,8,10,12,14}에서 target=10 탐색 시 총 비교 횟수는?",
    code: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
// arr={2,4,6,8,10,12,14}, n=7, target=10`,
    options: ["2번", "3번", "4번", "7번"],
    correctAnswer: 1,
    explanation: "1단계: left=0,right=6,mid=3,arr[3]=8<10→left=4. 2단계: left=4,right=6,mid=5,arr[5]=12>10→right=4. 3단계: left=4,right=4,mid=4,arr[4]=10=target. 총 3번 비교.",
    keyConceptTitle: "이진 탐색 단계 추적",
    keyConceptDescription: "이진 탐색은 O(log N). 7개 원소에서 최대 3번(log₂7≈2.8) 비교.",
  },
  {
    id: 563,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드에서 정렬되지 않은 배열에 이진 탐색을 적용했을 때 문제점은?",
    code: `int arr[] = {5, 2, 8, 1, 9, 3};  // 정렬 안 됨
// target = 8 탐색
int left = 0, right = 5;
int mid = (0 + 5) / 2;  // mid = 2
// arr[2] = 8 → 우연히 찾음

// target = 3 탐색
// left=0, right=5, mid=2, arr[2]=8 > 3 → right=1
// left=0, right=1, mid=0, arr[0]=5 > 3 → right=-1
// 탐색 실패! → -1 반환 (실제로는 존재)`,
    options: [
      "정렬되지 않으면 존재하는 값도 못 찾을 수 있다",
      "정렬되지 않아도 이진 탐색은 항상 정확하다",
      "이진 탐색은 중복 원소만 처리 못한다",
      "배열 크기가 짝수이면 오류가 발생한다",
    ],
    correctAnswer: 0,
    explanation: "정렬되지 않은 배열에서 이진 탐색을 사용하면 실제로 존재하는 값(3)을 찾지 못하는 오류가 발생합니다. 이진 탐색은 반드시 정렬 후 사용해야 합니다.",
    keyConceptTitle: "이진 탐색 전제 조건 위반",
    keyConceptDescription: "이진 탐색을 정렬되지 않은 배열에 적용하면 존재하는 값도 찾지 못할 수 있습니다.",
  },
  {
    id: 564,
    lessonId: "algo-preview",
    difficulty: "어려움",
    question: "다음 코드에서 이진 탐색의 오버플로우를 방지하는 mid 계산법은?",
    code: `// 두 가지 mid 계산 방법
int mid1 = (left + right) / 2;      // 방법 1
int mid2 = left + (right - left) / 2;  // 방법 2

// left = 1000000000, right = 2000000000 이면?`,
    options: [
      "방법2가 안전 — left+right가 int 범위를 초과할 수 있음",
      "두 방법 모두 동일하고 안전하다",
      "방법1이 더 안전하다",
      "left와 right의 합은 항상 int 범위 내에 있다",
    ],
    correctAnswer: 0,
    explanation: "left+right = 3,000,000,000은 int 최대값(약 2.1억)을 초과해 오버플로우 발생. left + (right-left)/2는 오버플로우 없이 동일한 결과를 냅니다.",
    keyConceptTitle: "이진 탐색 오버플로우 방지",
    keyConceptDescription: "mid = left + (right - left) / 2 → (left + right) / 2와 동일하지만 오버플로우 안전.",
  },

  // ── cpp-16 (OOP 기초) ───────────────────────────────────────────────────
  {
    id: 565,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "다음 중 C++ class 선언의 올바른 형태는?",
    code: `// 아래 중 올바른 class 선언은?`,
    options: [
      "class Dog { public: string name; void bark(); };",
      "class Dog { string name; void bark() }",
      "Dog class { public: string name; };",
      "class = Dog { string name; };",
    ],
    correctAnswer: 0,
    explanation: "class 선언은 class 키워드, 이름, 중괄호 블록, 세미콜론으로 구성됩니다. 멤버 접근 제어자(public/private)를 명시합니다.",
    keyConceptTitle: "class 선언 문법",
    keyConceptDescription: "class 이름 { 접근제어자: 멤버; }; — 닫는 중괄호 뒤 세미콜론 필수.",
  },
  {
    id: 566,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "다음 코드에서 객체를 생성하는 올바른 방법은?",
    code: `class Car {
public:
    string brand;
    int speed;
};
// Car 타입의 객체 myCar를 생성하려면?`,
    options: [
      "Car myCar;",
      "new Car myCar;",
      "myCar = Car();",
      "Car::myCar;",
    ],
    correctAnswer: 0,
    explanation: "C++에서 객체는 '클래스명 변수명;' 형태로 생성합니다. Car myCar;는 Car 타입의 객체 myCar를 스택에 생성합니다.",
    keyConceptTitle: "객체 생성",
    keyConceptDescription: "클래스명 객체명; — 해당 클래스 타입의 객체를 생성합니다.",
  },
  {
    id: 567,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Animal {
public:
    string name;
    int legs;
    void describe() {
        cout << name << "는 다리가 " << legs << "개";
    }
};

int main() {
    Animal dog;
    dog.name = "강아지";
    dog.legs = 4;
    dog.describe();
    return 0;
}`,
    options: ["강아지는 다리가 4개", "강아지 4", "Animal", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "객체 dog의 멤버를 설정한 후 describe() 함수를 호출합니다. 멤버함수 내에서 name과 legs에 직접 접근합니다.",
    keyConceptTitle: "멤버함수에서 멤버변수 접근",
    keyConceptDescription: "멤버함수 내에서는 같은 클래스의 멤버변수에 self 없이 직접 접근합니다.",
  },
  {
    id: 568,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "class에서 public과 private의 차이로 올바른 것은?",
    code: `class BankAccount {
private:
    int balance;  // 외부 접근 불가
public:
    void deposit(int amount) { balance += amount; }
    int getBalance() { return balance; }
};`,
    options: [
      "public은 외부에서 접근 가능, private는 클래스 내부에서만 접근 가능",
      "public은 더 빠르고, private는 더 느리다",
      "private는 자식 클래스에서 접근 가능하다",
      "public과 private는 기능이 동일하다",
    ],
    correctAnswer: 0,
    explanation: "public 멤버는 클래스 외부에서 접근 가능합니다. private 멤버는 클래스 내부(멤버함수)에서만 접근 가능하고 외부에서는 접근 불가입니다.",
    keyConceptTitle: "접근 제어자 (public / private)",
    keyConceptDescription: "public: 어디서나 접근 가능. private: 클래스 내부(멤버함수)에서만 접근 가능.",
  },
  {
    id: 569,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "다음 코드에서 컴파일 오류가 발생하는 줄은?",
    code: `class Circle {
private:
    double radius;
public:
    void setRadius(double r) { radius = r; }  // A
    double getRadius() { return radius; }      // B
};

int main() {
    Circle c;
    c.setRadius(5.0);              // C
    cout << c.radius;              // D
    return 0;
}`,
    options: ["D번 줄 (private 멤버에 외부 접근)", "A번 줄", "B번 줄", "C번 줄"],
    correctAnswer: 0,
    explanation: "radius는 private이므로 클래스 외부(main)에서 c.radius로 직접 접근하면 컴파일 오류가 발생합니다. getRadius() 같은 public 함수를 통해 접근해야 합니다.",
    keyConceptTitle: "private 멤버 접근 제한",
    keyConceptDescription: "private 멤버는 클래스 외부에서 직접 접근 불가. getter/setter 함수를 통해 접근.",
  },
  {
    id: 570,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드에서 같은 class로 여러 객체를 만들 때 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Counter {
public:
    int count = 0;
    void increment() { count++; }
};

int main() {
    Counter a, b;
    a.increment();
    a.increment();
    b.increment();
    cout << a.count << " " << b.count;
    return 0;
}`,
    options: ["2 1", "3 3", "2 2", "1 1"],
    correctAnswer: 0,
    explanation: "a와 b는 서로 독립적인 객체입니다. a.increment()를 2번 → a.count=2, b.increment()를 1번 → b.count=1.",
    keyConceptTitle: "독립적인 객체",
    keyConceptDescription: "같은 class로 만든 여러 객체는 독립적인 멤버변수를 가집니다. 한 객체 변경이 다른 객체에 영향 없음.",
  },
  {
    id: 571,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "class와 struct의 기본 접근 제어자 차이로 올바른 것은?",
    code: `class MyClass {
    int x;  // 기본값은?
};

struct MyStruct {
    int x;  // 기본값은?
};`,
    options: [
      "class는 기본 private, struct는 기본 public",
      "class는 기본 public, struct는 기본 private",
      "둘 다 기본 public",
      "둘 다 기본 private",
    ],
    correctAnswer: 0,
    explanation: "C++에서 class의 기본 접근 제어자는 private입니다. struct의 기본 접근 제어자는 public입니다. 이것이 class와 struct의 가장 큰 차이입니다.",
    keyConceptTitle: "class vs struct 기본 접근 제어자",
    keyConceptDescription: "class: 기본 private. struct: 기본 public. C++에서 struct는 기본 접근만 다른 class입니다.",
  },
  {
    id: 572,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드에서 멤버함수가 멤버변수를 수정하는 결과는?",
    code: `#include <iostream>
using namespace std;

class Temperature {
    double celsius;
public:
    void set(double c) { celsius = c; }
    double toFahrenheit() { return celsius * 9.0 / 5.0 + 32; }
};

int main() {
    Temperature t;
    t.set(100);
    cout << t.toFahrenheit();
    return 0;
}`,
    options: ["212", "100", "37.8", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "100°C를 화씨로 변환: 100 * 9/5 + 32 = 180 + 32 = 212°F. 멤버함수에서 celsius 멤버변수에 직접 접근합니다.",
    keyConceptTitle: "멤버함수와 멤버변수",
    keyConceptDescription: "멤버함수는 같은 클래스의 멤버변수에 자유롭게 접근하고 수정할 수 있습니다.",
  },
  {
    id: 573,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드에서 private 멤버를 올바르게 사용하는 방식은?",
    code: `#include <iostream>
using namespace std;

class Password {
    string secret = "1234";
public:
    bool check(string input) {
        return input == secret;
    }
};

int main() {
    Password p;
    // p.secret 접근 불가
    cout << p.check("1234") << " " << p.check("0000");
    return 0;
}`,
    options: ["1 0", "0 1", "컴파일 오류", "1 1"],
    correctAnswer: 0,
    explanation: "secret은 private이라 외부 접근 불가지만, public 멤버함수 check()로 간접 접근합니다. check(\"1234\")→true(1), check(\"0000\")→false(0).",
    keyConceptTitle: "캡슐화와 getter",
    keyConceptDescription: "private 데이터는 public 멤버함수를 통해 간접 접근합니다. 이것이 캡슐화의 핵심입니다.",
  },
  {
    id: 574,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Stack {
    int data[10];
    int top = -1;
public:
    void push(int v) { data[++top] = v; }
    int pop() { return data[top--]; }
    int peek() { return data[top]; }
    bool isEmpty() { return top == -1; }
};

int main() {
    Stack s;
    s.push(10);
    s.push(20);
    s.push(30);
    cout << s.pop() << " " << s.peek();
    return 0;
}`,
    options: ["30 20", "10 20", "30 30", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "push(10), push(20), push(30) 후 스택: [10, 20, 30]. pop()→30(top--), peek()→20(top=1). \"30 20\" 출력.",
    keyConceptTitle: "클래스로 구현한 자료구조",
    keyConceptDescription: "class로 스택, 큐 등 자료구조를 캡슐화할 수 있습니다. private 데이터, public 인터페이스.",
  },
  {
    id: 575,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드에서 클래스 외부에 멤버함수를 정의할 때 올바른 형태는?",
    code: `class Rectangle {
    int w, h;
public:
    Rectangle(int w, int h);
    int area();  // 선언만
};

// 클래스 외부에서 정의
???
int Rectangle::area() {
    return w * h;
}`,
    options: [
      "Rectangle::Rectangle(int w, int h) : w(w), h(h) {}",
      "Rectangle(int w, int h) : w(w), h(h) {}",
      "Rectangle.Rectangle(int w, int h) { this.w = w; }",
      "void Rectangle::Rectangle(int w, int h) { w = w; }",
    ],
    correctAnswer: 0,
    explanation: "클래스 외부에서 멤버함수를 정의할 때는 클래스명::함수명 형태를 사용합니다. 생성자는 반환 타입 없이 클래스명::클래스명(매개변수)로 정의합니다.",
    keyConceptTitle: "클래스 외부 멤버함수 정의",
    keyConceptDescription: "클래스명::함수명으로 외부 정의. 헤더(.h)에 선언, 소스(.cpp)에 정의하는 패턴에서 사용.",
  },
  {
    id: 576,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Matrix {
    int data[2][2];
public:
    Matrix(int a, int b, int c, int d) {
        data[0][0]=a; data[0][1]=b;
        data[1][0]=c; data[1][1]=d;
    }
    int get(int r, int c) { return data[r][c]; }
    int trace() { return data[0][0] + data[1][1]; }
};

int main() {
    Matrix m(1, 2, 3, 4);
    cout << m.trace() << " " << m.get(1, 0);
    return 0;
}`,
    options: ["5 3", "3 5", "6 3", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "trace() = data[0][0] + data[1][1] = 1 + 4 = 5. get(1, 0) = data[1][0] = 3. \"5 3\" 출력.",
    keyConceptTitle: "클래스 멤버함수 활용",
    keyConceptDescription: "멤버함수는 private 멤버변수(배열 포함)에 자유롭게 접근해 연산을 수행합니다.",
  },
  {
    id: 577,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드에서 컴파일이 성공하는 조합은?",
    code: `class Secret {
    int value = 42;
    void privateMethod() { cout << \"private\"; }
public:
    int getValue() { return value; }
    void show() { privateMethod(); cout << value; }
};

Secret s;
// 다음 중 컴파일 가능한 것은?`,
    options: [
      "s.show(); 와 s.getValue();",
      "s.value; 와 s.privateMethod();",
      "s.value = 10; 만",
      "s.privateMethod(); 만",
    ],
    correctAnswer: 0,
    explanation: "show()와 getValue()는 public이므로 외부에서 호출 가능합니다. value와 privateMethod()는 private이므로 외부 접근 시 컴파일 오류입니다.",
    keyConceptTitle: "접근 제어자 총정리",
    keyConceptDescription: "public 멤버만 클래스 외부에서 접근 가능. private 멤버는 클래스 내부(멤버함수)에서만 접근.",
  },

  // ── cpp-17 (생성자와 소멸자) ────────────────────────────────────────────
  {
    id: 578,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "생성자(constructor)의 특징으로 올바른 것은?",
    code: `class Dog {
public:
    string name;
    Dog(string n) {   // 생성자
        name = n;
    }
};`,
    options: [
      "클래스 이름과 동일하고 반환 타입이 없다",
      "반환 타입이 void이다",
      "이름 앞에 ~를 붙인다",
      "객체가 소멸될 때 자동으로 호출된다",
    ],
    correctAnswer: 0,
    explanation: "생성자는 클래스 이름과 같은 이름을 가지며 반환 타입(void 포함)을 명시하지 않습니다. 객체 생성 시 자동으로 호출됩니다.",
    keyConceptTitle: "생성자 특징",
    keyConceptDescription: "생성자: 클래스 이름과 동일, 반환 타입 없음, 객체 생성 시 자동 호출.",
  },
  {
    id: 579,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

class Cat {
    string name;
    int age;
public:
    Cat(string n, int a) {
        name = n;
        age = a;
    }
    void info() { cout << name << " " << age; }
};

int main() {
    Cat c("나비", 2);
    c.info();
    return 0;
}`,
    options: ["나비 2", "나비2", "컴파일 오류", "0 0"],
    correctAnswer: 0,
    explanation: "Cat(\"나비\", 2) 생성자 호출로 name=\"나비\", age=2로 초기화됩니다. info()는 \"나비 2\"를 출력합니다.",
    keyConceptTitle: "생성자 매개변수",
    keyConceptDescription: "생성자에 매개변수를 선언하면 객체 생성 시 초기값을 전달할 수 있습니다.",
  },
  {
    id: 580,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "생성자 초기화 리스트의 올바른 문법은?",
    code: `class Point {
    int x, y;
public:
    // 초기화 리스트 사용
    Point(int a, int b) ??? {
        // 본문은 비워도 됨
    }
};`,
    options: [
      ": x(a), y(b)",
      "= x(a), y(b)",
      "{ x = a, y = b }",
      "-> x(a), y(b)",
    ],
    correctAnswer: 0,
    explanation: "생성자 초기화 리스트는 매개변수 목록 뒤에 콜론(:)으로 시작합니다. 멤버변수(초기값) 형태로 나열합니다.",
    keyConceptTitle: "생성자 초기화 리스트",
    keyConceptDescription: "생성자명(매개변수) : 멤버1(값1), 멤버2(값2) {} — 생성자 본문 실행 전에 멤버를 초기화.",
  },
  {
    id: 581,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "소멸자(destructor)의 특징으로 올바른 것은?",
    code: `class Resource {
public:
    Resource() { cout << "생성\\n"; }
    ~Resource() { cout << "소멸\\n"; }  // 소멸자
};`,
    options: [
      "이름 앞에 ~를 붙이고 매개변수가 없다",
      "반환 타입이 void이다",
      "매개변수를 가질 수 있다",
      "수동으로만 호출된다",
    ],
    correctAnswer: 0,
    explanation: "소멸자는 ~클래스명() 형태로 선언합니다. 매개변수와 반환 타입이 없으며, 객체가 스코프를 벗어날 때 자동으로 호출됩니다.",
    keyConceptTitle: "소멸자 (Destructor)",
    keyConceptDescription: "~클래스명(): 매개변수 없음, 반환 타입 없음, 객체 소멸 시 자동 호출.",
  },
  {
    id: 582,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Timer {
public:
    Timer() { cout << "시작 "; }
    ~Timer() { cout << "종료 "; }
};

int main() {
    cout << "A ";
    Timer t;
    cout << "B ";
    return 0;
}`,
    options: ["A 시작 B 종료", "시작 A B 종료", "A B 시작 종료", "A 시작 B"],
    correctAnswer: 0,
    explanation: "순서: 1) \"A \" 출력 2) Timer t 생성→생성자 \"시작 \" 3) \"B \" 출력 4) main 종료 시 t 소멸→소멸자 \"종료 \"",
    keyConceptTitle: "생성자/소멸자 호출 순서",
    keyConceptDescription: "생성자는 객체 생성 시 즉시 호출. 소멸자는 객체가 스코프를 벗어날 때(함수 종료 등) 호출.",
  },
  {
    id: 583,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드에서 초기화 리스트를 사용했을 때 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
public:
    Rectangle(int w, int h) : width(w), height(h) {}
    int area() { return width * height; }
    int perimeter() { return 2 * (width + height); }
};

int main() {
    Rectangle r(6, 4);
    cout << r.area() << " " << r.perimeter();
    return 0;
}`,
    options: ["24 20", "20 24", "10 24", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "초기화 리스트로 width=6, height=4. area()=6*4=24, perimeter()=2*(6+4)=20. \"24 20\" 출력.",
    keyConceptTitle: "초기화 리스트 활용",
    keyConceptDescription: "초기화 리스트는 멤버변수를 생성자 본문 전에 초기화합니다. const 멤버, 참조 멤버에 필수.",
  },
  {
    id: 584,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 생성자 오버로딩 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Box {
    int size;
public:
    Box() : size(1) {}           // 기본 생성자
    Box(int s) : size(s) {}      // 매개변수 있는 생성자
    void show() { cout << size << " "; }
};

int main() {
    Box a;
    Box b(5);
    a.show();
    b.show();
    return 0;
}`,
    options: ["1 5", "5 1", "0 5", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "Box a는 기본 생성자 → size=1. Box b(5)는 매개변수 생성자 → size=5. a.show()→\"1 \", b.show()→\"5 \".",
    keyConceptTitle: "생성자 오버로딩",
    keyConceptDescription: "같은 클래스에 여러 생성자를 정의할 수 있습니다. 인자 유무/개수/타입에 따라 적절한 생성자가 선택됩니다.",
  },
  {
    id: 585,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드에서 this 포인터의 역할은?",
    code: `#include <iostream>
using namespace std;

class MyNum {
    int num;
public:
    MyNum(int num) {
        this->num = num;  // this 포인터 사용
    }
    void show() { cout << num; }
};

int main() {
    MyNum n(42);
    n.show();
    return 0;
}`,
    options: [
      "매개변수 num과 멤버변수 num을 구분한다",
      "this는 현재 클래스 타입을 나타낸다",
      "this->num은 오류를 발생시킨다",
      "this는 static 멤버함수에서도 사용 가능하다",
    ],
    correctAnswer: 0,
    explanation: "매개변수 이름과 멤버변수 이름이 같을 때 this->num은 멤버변수, 단순 num은 매개변수를 가리킵니다. this->num = num은 매개변수값을 멤버변수에 대입합니다.",
    keyConceptTitle: "this 포인터",
    keyConceptDescription: "this: 현재 객체 자신을 가리키는 포인터. 이름 충돌 해결 및 자기 자신 반환에 사용.",
  },
  {
    id: 586,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Countdown {
    int count;
public:
    Countdown(int start) : count(start) {}
    ~Countdown() { cout << count << " "; }
};

int main() {
    Countdown a(3);
    Countdown b(1);
    Countdown c(2);
    return 0;
}`,
    options: ["2 1 3", "3 1 2", "1 2 3", "3 2 1"],
    correctAnswer: 0,
    explanation: "소멸자는 생성 역순(LIFO)으로 호출됩니다. c(2) 먼저 소멸→\"2 \", b(1) 소멸→\"1 \", a(3) 소멸→\"3 \". 결과: \"2 1 3\".",
    keyConceptTitle: "소멸자 호출 순서 (역순)",
    keyConceptDescription: "스택에 생성된 객체는 생성 역순으로 소멸됩니다. 마지막에 생성된 객체가 가장 먼저 소멸.",
  },
  {
    id: 587,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드에서 기본 생성자가 없어 컴파일 오류가 나는 이유는?",
    code: `class Vector {
    int x, y;
public:
    Vector(int a, int b) : x(a), y(b) {}
};

int main() {
    Vector v1(1, 2);  // OK
    Vector v2;        // 오류?
    return 0;
}`,
    options: [
      "매개변수 있는 생성자를 정의하면 기본 생성자가 자동 생성되지 않는다",
      "Vector에 public이 없어서 오류가 난다",
      "int x, y가 초기화되지 않아서 오류가 난다",
      "v2는 반드시 new로 생성해야 한다",
    ],
    correctAnswer: 0,
    explanation: "생성자를 하나라도 정의하면 컴파일러가 기본 생성자를 자동으로 만들지 않습니다. Vector v2;는 기본 생성자를 호출하지만 없으므로 오류입니다.",
    keyConceptTitle: "기본 생성자와 사용자 정의 생성자",
    keyConceptDescription: "생성자를 하나라도 정의하면 컴파일러 제공 기본 생성자가 사라집니다. 필요하면 명시적으로 Vector() = default; 추가.",
  },
  {
    id: 588,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Node {
public:
    int val;
    Node(int v) : val(v) { cout << "생성(" << v << ") "; }
    ~Node() { cout << "소멸(" << val << ") "; }
};

void func() {
    Node a(1);
    Node b(2);
}

int main() {
    func();
    cout << "끝";
    return 0;
}`,
    options: [
      "생성(1) 생성(2) 소멸(2) 소멸(1) 끝",
      "생성(1) 생성(2) 소멸(1) 소멸(2) 끝",
      "생성(2) 생성(1) 소멸(1) 소멸(2) 끝",
      "생성(1) 생성(2) 끝 소멸(2) 소멸(1)",
    ],
    correctAnswer: 0,
    explanation: "func() 안에서 a(1) 생성, b(2) 생성. func() 종료 시 역순 소멸: b(2) 먼저, a(1) 다음. 그 후 main에서 \"끝\" 출력.",
    keyConceptTitle: "함수 스코프와 생성자/소멸자",
    keyConceptDescription: "함수 스코프 내 객체는 함수 종료 시 생성 역순으로 소멸됩니다.",
  },

  // ── cpp-18 (상속) ──────────────────────────────────────────────────────
  {
    id: 589,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "C++ 상속 문법으로 올바른 것은?",
    code: `class Animal {
public:
    void breathe() { cout << "숨쉬기"; }
};
// Dog이 Animal을 상속받으려면?`,
    options: [
      "class Dog : public Animal { };",
      "class Dog extends Animal { };",
      "class Dog implements Animal { };",
      "class Dog inherits Animal { };",
    ],
    correctAnswer: 0,
    explanation: "C++에서 상속은 'class 자식 : public 부모' 문법을 사용합니다. Java의 extends와 달리 : public을 사용합니다.",
    keyConceptTitle: "상속 문법",
    keyConceptDescription: "class 파생클래스 : public 기본클래스 { }; — public 상속이 가장 일반적.",
  },
  {
    id: 590,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "다음 코드에서 Dog가 Animal의 메서드를 사용하는 결과는?",
    code: `#include <iostream>
using namespace std;

class Animal {
public:
    void eat() { cout << "먹는다 "; }
};

class Dog : public Animal {
public:
    void bark() { cout << "멍멍"; }
};

int main() {
    Dog d;
    d.eat();    // Animal의 메서드
    d.bark();   // Dog의 메서드
    return 0;
}`,
    options: ["먹는다 멍멍", "멍멍 먹는다", "컴파일 오류", "먹는다"],
    correctAnswer: 0,
    explanation: "Dog는 Animal을 상속받으므로 Animal의 public 멤버(eat)를 그대로 사용할 수 있습니다. d.eat()→\"먹는다 \", d.bark()→\"멍멍\".",
    keyConceptTitle: "상속받은 멤버 사용",
    keyConceptDescription: "파생 클래스는 기본 클래스의 public/protected 멤버를 자신의 것처럼 사용할 수 있습니다.",
  },
  {
    id: 591,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "상속에서 protected 멤버의 접근 범위로 올바른 것은?",
    code: `class Animal {
protected:
    string name;  // protected
public:
    Animal(string n) : name(n) {}
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    void showName() {
        cout << name;  // 접근 가능?
    }
};`,
    options: [
      "자식 클래스(Dog)에서는 접근 가능, 외부(main)에서는 불가",
      "어디서나 접근 가능",
      "클래스 내부에서만 접근 가능 (private와 동일)",
      "자식 클래스에서도 접근 불가",
    ],
    correctAnswer: 0,
    explanation: "protected 멤버는 해당 클래스와 파생 클래스에서 접근 가능합니다. 외부(main 등)에서는 접근할 수 없습니다.",
    keyConceptTitle: "protected 접근 제어자",
    keyConceptDescription: "protected: 자신과 자식 클래스에서 접근 가능. 외부 접근 불가. private와 public의 중간.",
  },
  {
    id: 592,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "부모 생성자를 호출하는 올바른 문법은?",
    code: `class Animal {
    string name;
public:
    Animal(string n) : name(n) {}
};

class Dog : public Animal {
    string breed;
public:
    // 부모 생성자를 호출하려면?
    Dog(string n, string b) ??? : breed(b) {}
};`,
    options: [
      ": Animal(n)",
      ": super(n)",
      ": parent(n)",
      ": Animal::Animal(n)",
    ],
    correctAnswer: 0,
    explanation: "C++에서 부모 생성자 호출은 초기화 리스트에서 : Animal(n) 형태를 사용합니다. Java의 super()와 달리 부모 클래스 이름을 직접 씁니다.",
    keyConceptTitle: "부모 생성자 호출",
    keyConceptDescription: "파생클래스(매개변수) : 기본클래스(매개변수), 자체멤버(값) {} — 초기화 리스트에서 부모 생성자 호출.",
  },
  {
    id: 593,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Vehicle {
public:
    int wheels;
    Vehicle(int w) : wheels(w) {}
};

class Bike : public Vehicle {
public:
    Bike() : Vehicle(2) {}
    void info() { cout << "바퀴: " << wheels; }
};

int main() {
    Bike b;
    b.info();
    return 0;
}`,
    options: ["바퀴: 2", "바퀴: 0", "컴파일 오류", "0"],
    correctAnswer: 0,
    explanation: "Bike()는 Vehicle(2)를 호출해 wheels=2로 초기화. info()에서 상속받은 wheels에 접근해 \"바퀴: 2\" 출력.",
    keyConceptTitle: "부모 생성자와 멤버 초기화",
    keyConceptDescription: "파생 클래스 생성자에서 기본 클래스 생성자를 호출해 부모 멤버를 초기화합니다.",
  },
  {
    id: 594,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드에서 메서드 오버라이딩의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Shape {
public:
    void draw() { cout << "도형 그리기 "; }
};

class Circle : public Shape {
public:
    void draw() { cout << "원 그리기 "; }  // 오버라이딩
};

int main() {
    Circle c;
    c.draw();           // Circle의 draw
    c.Shape::draw();    // Shape의 draw
    return 0;
}`,
    options: ["원 그리기 도형 그리기", "도형 그리기 원 그리기", "도형 그리기 도형 그리기", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "c.draw()는 Circle의 오버라이딩된 draw()를 호출합니다. c.Shape::draw()는 범위 지정 연산자로 부모의 draw()를 명시적으로 호출합니다.",
    keyConceptTitle: "메서드 오버라이딩",
    keyConceptDescription: "자식 클래스에서 부모와 같은 이름의 함수를 재정의하면 자식의 것이 우선. 부모 것은 클래스명::함수명으로 접근.",
  },
  {
    id: 595,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class A {
public:
    A() { cout << "A생성 "; }
    ~A() { cout << "A소멸 "; }
};

class B : public A {
public:
    B() { cout << "B생성 "; }
    ~B() { cout << "B소멸 "; }
};

int main() {
    B b;
    return 0;
}`,
    options: ["A생성 B생성 B소멸 A소멸", "B생성 A생성 A소멸 B소멸", "A생성 B생성 A소멸 B소멸", "B생성 B소멸 A생성 A소멸"],
    correctAnswer: 0,
    explanation: "생성 시: 부모(A) 먼저 생성 → 자식(B) 생성. 소멸 시: 자식(B) 먼저 소멸 → 부모(A) 소멸. 생성과 소멸은 역순.",
    keyConceptTitle: "상속에서 생성자/소멸자 순서",
    keyConceptDescription: "생성: 부모→자식 순서. 소멸: 자식→부모 순서(생성의 역순).",
  },
  {
    id: 596,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드에서 파생 클래스가 부모의 private 멤버에 접근할 수 없는 이유는?",
    code: `class Animal {
    string sound;  // private
public:
    Animal(string s) : sound(s) {}
};

class Dog : public Animal {
public:
    Dog() : Animal("멍멍") {}
    void bark() {
        cout << sound;  // 오류!
    }
};`,
    options: [
      "private 멤버는 자식 클래스에서도 직접 접근 불가",
      "Dog가 Animal을 상속받지 않아서",
      "sound가 초기화되지 않아서",
      "string 타입이 지원되지 않아서",
    ],
    correctAnswer: 0,
    explanation: "private 멤버는 해당 클래스 내부에서만 접근 가능합니다. 자식 클래스도 부모의 private에는 직접 접근 불가입니다. protected나 getter 함수를 사용해야 합니다.",
    keyConceptTitle: "private는 자식도 접근 불가",
    keyConceptDescription: "private: 자신 클래스만 접근. protected: 자신 + 자식 접근. public: 어디서나 접근.",
  },
  {
    id: 597,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 다중 레벨 상속 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class A {
public:
    void funcA() { cout << "A "; }
};

class B : public A {
public:
    void funcB() { cout << "B "; }
};

class C : public B {
public:
    void funcC() { cout << "C "; }
};

int main() {
    C obj;
    obj.funcA();
    obj.funcB();
    obj.funcC();
    return 0;
}`,
    options: ["A B C", "C B A", "컴파일 오류", "A C"],
    correctAnswer: 0,
    explanation: "C는 B를 상속받고, B는 A를 상속받습니다. C는 A, B, C 모두의 멤버를 사용할 수 있습니다. 출력: A B C.",
    keyConceptTitle: "다중 레벨 상속",
    keyConceptDescription: "A→B→C 상속 시 C는 A, B의 모든 public/protected 멤버를 사용 가능합니다.",
  },
  {
    id: 598,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드에서 자식 클래스가 부모 메서드를 호출하는 올바른 방법은?",
    code: `#include <iostream>
using namespace std;

class Animal {
public:
    void introduce() { cout << "동물입니다 "; }
};

class Dog : public Animal {
public:
    void introduce() {
        Animal::introduce();  // 부모 메서드 호출
        cout << "강아지입니다";
    }
};

int main() {
    Dog d;
    d.introduce();
    return 0;
}`,
    options: ["동물입니다 강아지입니다", "강아지입니다 동물입니다", "컴파일 오류", "동물입니다"],
    correctAnswer: 0,
    explanation: "Animal::introduce()로 부모의 introduce()를 명시적으로 호출합니다. 그 후 \"강아지입니다\"를 추가 출력합니다.",
    keyConceptTitle: "자식에서 부모 메서드 호출",
    keyConceptDescription: "부모클래스명::함수명()으로 자식 클래스 내에서 부모 메서드를 명시적으로 호출합니다.",
  },
  {
    id: 599,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    int x;
    Base(int x) : x(x) {}
    int getX() { return x; }
};

class Child : public Base {
public:
    int x;  // 부모의 x를 가림(shadowing)
    Child(int bx, int cx) : Base(bx), x(cx) {}
    void show() {
        cout << x << " " << Base::x;
    }
};

int main() {
    Child c(10, 20);
    c.show();
    return 0;
}`,
    options: ["20 10", "10 20", "10 10", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "Child::x=20(자식), Base::x=10(부모). show()에서 x는 자식의 x(20), Base::x는 부모의 x(10). \"20 10\" 출력.",
    keyConceptTitle: "멤버변수 섀도잉",
    keyConceptDescription: "자식 클래스에 부모와 같은 이름의 멤버가 있으면 자식 멤버가 우선. 부모 것은 Base::x로 접근.",
  },
  {
    id: 600,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Employee {
protected:
    string name;
    int salary;
public:
    Employee(string n, int s) : name(n), salary(s) {}
    virtual void info() {
        cout << name << " " << salary;
    }
};

class Manager : public Employee {
    int bonus;
public:
    Manager(string n, int s, int b)
        : Employee(n, s), bonus(b) {}
    void info() override {
        Employee::info();
        cout << " +" << bonus;
    }
};

int main() {
    Manager m("Kim", 5000, 1000);
    m.info();
    return 0;
}`,
    options: ["Kim 5000 +1000", "Kim 5000", "+1000", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "Manager::info()에서 Employee::info()를 먼저 호출해 \"Kim 5000\" 출력, 이후 \" +1000\" 추가 출력. 총 \"Kim 5000 +1000\".",
    keyConceptTitle: "상속에서 부모 메서드 확장",
    keyConceptDescription: "오버라이딩된 메서드에서 부모클래스::함수명()으로 부모 기능을 재사용하고 추가 기능을 붙일 수 있습니다.",
  },
  {
    id: 601,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드에서 private 상속과 public 상속의 차이를 보여주는 결과는?",
    code: `class Base {
public:
    void show() { cout << "Base"; }
};

class PubDerived : public Base {};   // public 상속
class PrivDerived : private Base {}; // private 상속

int main() {
    PubDerived p;
    p.show();  // A: 가능?

    PrivDerived q;
    q.show();  // B: 가능?
    return 0;
}`,
    options: [
      "A만 가능, B는 컴파일 오류",
      "A, B 모두 가능",
      "A, B 모두 오류",
      "B만 가능",
    ],
    correctAnswer: 0,
    explanation: "public 상속 시 부모의 public 멤버가 자식에서도 public으로 유지됩니다. private 상속 시 부모의 public 멤버가 자식의 private으로 바뀌어 외부 접근 불가.",
    keyConceptTitle: "public vs private 상속",
    keyConceptDescription: "public 상속: 부모 public→자식 public. private 상속: 부모 public→자식 private(외부 접근 불가).",
  },

  // ── cpp-19 (다형성) ────────────────────────────────────────────────────
  {
    id: 602,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "virtual 함수의 역할로 올바른 것은?",
    code: `class Animal {
public:
    virtual void speak() { cout << "..."; }
};
class Dog : public Animal {
public:
    void speak() override { cout << "멍멍"; }
};`,
    options: [
      "부모 포인터/참조로 자식의 함수가 호출되게 한다",
      "함수 호출 속도를 빠르게 한다",
      "함수가 두 번 실행되게 한다",
      "static 함수를 만든다",
    ],
    correctAnswer: 0,
    explanation: "virtual 함수를 선언하면 부모 타입의 포인터/참조를 통해 호출해도 실제 객체(자식)의 함수가 호출됩니다. 이것이 런타임 다형성입니다.",
    keyConceptTitle: "virtual 함수",
    keyConceptDescription: "virtual: 런타임에 실제 객체 타입의 함수를 호출. 부모 포인터로 자식 함수 호출 가능.",
  },
  {
    id: 603,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "override 키워드의 역할로 올바른 것은?",
    code: `class Base {
public:
    virtual void func() {}
};

class Derived : public Base {
public:
    void func() override {}  // override 키워드
};`,
    options: [
      "부모의 virtual 함수를 재정의한다고 컴파일러에 알려 실수를 방지한다",
      "함수를 반드시 구현하도록 강제한다",
      "함수를 순수 가상 함수로 만든다",
      "함수의 반환 타입을 변경한다",
    ],
    correctAnswer: 0,
    explanation: "override는 부모의 virtual 함수를 재정의함을 명시합니다. 함수 이름/시그니처가 다르면 컴파일 오류로 알려줍니다. 버그 예방에 유용합니다.",
    keyConceptTitle: "override 키워드",
    keyConceptDescription: "override: 부모의 virtual 함수를 오버라이딩함을 명시. 시그니처 불일치 시 컴파일 오류.",
  },
  {
    id: 604,
    lessonId: "cpp-22",
    difficulty: "쉬움",
    question: "순수 가상 함수(pure virtual function) 선언으로 올바른 것은?",
    code: `class Shape {
public:
    // 순수 가상 함수 선언
    virtual double area() ??? ;
};`,
    options: [
      "= 0",
      "= null",
      "= virtual",
      "= abstract",
    ],
    correctAnswer: 0,
    explanation: "C++에서 순수 가상 함수는 virtual 반환타입 함수명() = 0; 으로 선언합니다. = 0이 핵심입니다.",
    keyConceptTitle: "순수 가상 함수 문법",
    keyConceptDescription: "virtual 타입 함수명() = 0; — = 0으로 순수 가상 함수 선언. 해당 클래스는 추상 클래스가 됨.",
  },
  {
    id: 605,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Animal {
public:
    virtual void speak() { cout << "..."; }
};

class Cat : public Animal {
public:
    void speak() override { cout << "야옹"; }
};

int main() {
    Animal* p = new Cat();
    p->speak();
    delete p;
    return 0;
}`,
    options: ["야옹", "...", "컴파일 오류", "야옹..."],
    correctAnswer: 0,
    explanation: "p는 Animal* 타입이지만 실제로는 Cat 객체를 가리킵니다. speak()가 virtual이므로 실제 타입 Cat의 speak()가 호출되어 \"야옹\"이 출력됩니다.",
    keyConceptTitle: "기본 클래스 포인터와 다형성",
    keyConceptDescription: "Animal* p = new Cat(); — 부모 포인터로 자식 객체. virtual 함수이면 실제 타입(Cat)의 함수 호출.",
  },
  {
    id: 606,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "추상 클래스(abstract class)에 대한 설명으로 올바른 것은?",
    code: `class AbstractShape {
public:
    virtual double area() = 0;  // 순수 가상 함수
    virtual double perimeter() = 0;
};

// AbstractShape s;  // 가능할까?`,
    options: [
      "순수 가상 함수가 있으면 직접 인스턴스 생성 불가",
      "추상 클래스는 포인터도 만들 수 없다",
      "추상 클래스는 일반 멤버함수를 가질 수 없다",
      "추상 클래스를 상속받은 클래스도 인스턴스 생성 불가",
    ],
    correctAnswer: 0,
    explanation: "순수 가상 함수가 하나라도 있으면 추상 클래스가 되어 직접 인스턴스 생성이 불가합니다. 단, 포인터 선언(AbstractShape*)은 가능합니다.",
    keyConceptTitle: "추상 클래스",
    keyConceptDescription: "순수 가상 함수 포함 → 추상 클래스. 직접 인스턴스 불가. 파생 클래스에서 모든 순수 가상 함수 구현 필요.",
  },
  {
    id: 607,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Printer {
public:
    virtual void print() { cout << "기본프린터 "; }
};

class LaserPrinter : public Printer {
public:
    void print() override { cout << "레이저 "; }
};

class InkjetPrinter : public Printer {
public:
    void print() override { cout << "잉크젯 "; }
};

void doPrint(Printer& p) {
    p.print();
}

int main() {
    LaserPrinter lp;
    InkjetPrinter ip;
    doPrint(lp);
    doPrint(ip);
    return 0;
}`,
    options: ["레이저 잉크젯", "기본프린터 기본프린터", "레이저 기본프린터", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "doPrint는 Printer& 참조를 받지만 virtual 함수이므로 실제 객체 타입의 print()가 호출됩니다. LaserPrinter→\"레이저 \", InkjetPrinter→\"잉크젯 \".",
    keyConceptTitle: "참조를 통한 런타임 다형성",
    keyConceptDescription: "부모 참조(Printer&)를 통해 virtual 함수 호출 시 실제 객체 타입의 함수가 호출됩니다.",
  },
  {
    id: 608,
    lessonId: "cpp-22",
    difficulty: "보통",
    question: "가상 소멸자(virtual destructor)가 필요한 이유는?",
    code: `class Base {
public:
    // ~Base() {}          // 일반 소멸자
    virtual ~Base() {}    // 가상 소멸자
};

class Derived : public Base {
    int* data;
public:
    Derived() { data = new int[100]; }
    ~Derived() { delete[] data; }
};

Base* p = new Derived();
delete p;  // 어떤 소멸자가 호출될까?`,
    options: [
      "가상 소멸자가 없으면 delete p 시 Derived 소멸자가 호출되지 않아 메모리 누수",
      "가상 소멸자는 소멸자를 두 번 호출한다",
      "가상 소멸자는 성능을 향상시킨다",
      "가상 소멸자가 없어도 항상 올바르게 소멸된다",
    ],
    correctAnswer: 0,
    explanation: "Base* p로 delete 시 가상 소멸자가 없으면 Base::~Base()만 호출되어 Derived의 data가 해제되지 않습니다. virtual ~Base()가 있어야 Derived::~Derived()도 호출됩니다.",
    keyConceptTitle: "가상 소멸자",
    keyConceptDescription: "상속 계층에서 부모 포인터로 delete 시 가상 소멸자가 없으면 자식 소멸자가 호출 안됩니다. 메모리 누수 방지.",
  },
  {
    id: 609,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드에서 순수 가상 함수를 구현하지 않은 클래스를 인스턴스화하면?",
    code: `class Interface {
public:
    virtual void doWork() = 0;
    virtual void doMore() = 0;
};

class PartialImpl : public Interface {
public:
    void doWork() override { cout << "작업 완료"; }
    // doMore()는 구현 안 함
};

// PartialImpl p;  // 결과는?`,
    options: [
      "컴파일 오류 — 순수 가상 함수 doMore()가 구현되지 않음",
      "런타임 오류 발생",
      "doMore()는 자동으로 빈 함수가 됨",
      "정상 컴파일, doMore() 호출 시에만 오류",
    ],
    correctAnswer: 0,
    explanation: "순수 가상 함수가 하나라도 구현되지 않으면 그 클래스도 추상 클래스가 됩니다. PartialImpl은 doMore()를 구현하지 않았으므로 인스턴스 생성 시 컴파일 오류입니다.",
    keyConceptTitle: "미구현 순수 가상 함수",
    keyConceptDescription: "파생 클래스가 순수 가상 함수를 모두 구현해야 인스턴스 생성 가능. 하나라도 빠지면 여전히 추상 클래스.",
  },
  {
    id: 610,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    virtual void func() { cout << "Base "; }
    void nonVirtual() { cout << "BaseNV "; }
};

class Derived : public Base {
public:
    void func() override { cout << "Derived "; }
    void nonVirtual() { cout << "DerivedNV "; }
};

int main() {
    Base* arr[2];
    arr[0] = new Base();
    arr[1] = new Derived();
    for (int i = 0; i < 2; i++) {
        arr[i]->func();
        arr[i]->nonVirtual();
    }
    delete arr[0]; delete arr[1];
    return 0;
}`,
    options: [
      "Base BaseNV Derived BaseNV",
      "Base BaseNV Derived DerivedNV",
      "Base DerivedNV Derived DerivedNV",
      "Base BaseNV Base BaseNV",
    ],
    correctAnswer: 0,
    explanation: "func()는 virtual: arr[0]→Base, arr[1]→Derived. nonVirtual()은 non-virtual: 포인터 타입(Base)의 것이 항상 호출. 결과: Base BaseNV Derived BaseNV.",
    keyConceptTitle: "virtual vs non-virtual 배열",
    keyConceptDescription: "virtual: 런타임에 실제 타입 결정. non-virtual: 컴파일 타임에 포인터 타입으로 결정.",
  },
  {
    id: 611,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class IAnimal {
public:
    virtual string sound() = 0;
    virtual string type() = 0;
    void describe() {
        cout << type() << "은 " << sound() << " 소리를 낸다\\n";
    }
};

class Dog : public IAnimal {
public:
    string sound() override { return "멍멍"; }
    string type() override { return "강아지"; }
};

class Cat : public IAnimal {
public:
    string sound() override { return "야옹"; }
    string type() override { return "고양이"; }
};

int main() {
    IAnimal* animals[] = {new Dog(), new Cat()};
    for (auto a : animals) a->describe();
    return 0;
}`,
    options: [
      "강아지은 멍멍 소리를 낸다\n고양이은 야옹 소리를 낸다",
      "멍멍\n야옹",
      "컴파일 오류 (IAnimal 인스턴스 생성 불가)",
      "강아지은 야옹 소리를 낸다\n고양이은 멍멍 소리를 낸다",
    ],
    correctAnswer: 0,
    explanation: "IAnimal*로 Dog, Cat을 가리킵니다. describe()는 IAnimal의 일반 멤버함수이고 내부에서 virtual 함수 sound()와 type()을 호출해 각 객체의 구현이 실행됩니다.",
    keyConceptTitle: "템플릿 메서드 패턴",
    keyConceptDescription: "부모 클래스의 일반 함수에서 virtual 함수를 호출하면 실제 자식 클래스의 구현이 실행됩니다. 템플릿 메서드 패턴의 기초.",
  },
  {
    id: 612,
    lessonId: "cpp-22",
    difficulty: "어려움",
    question: "다음 코드에서 런타임 다형성과 컴파일 타임의 차이를 보여주는 결과는?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    virtual void vFunc() { cout << "Base-V "; }
    void nFunc() { cout << "Base-N "; }
};

class Child : public Base {
public:
    void vFunc() override { cout << "Child-V "; }
    void nFunc() { cout << "Child-N "; }
};

void callByRef(Base& b) {
    b.vFunc();
    b.nFunc();
}

int main() {
    Child c;
    callByRef(c);
    return 0;
}`,
    options: [
      "Child-V Base-N",
      "Child-V Child-N",
      "Base-V Base-N",
      "Base-V Child-N",
    ],
    correctAnswer: 0,
    explanation: "callByRef는 Base& 타입. vFunc()는 virtual → 런타임에 실제 타입(Child) 결정 → Child-V. nFunc()는 non-virtual → 컴파일 타임에 참조 타입(Base) 결정 → Base-N.",
    keyConceptTitle: "런타임 vs 컴파일 타임 바인딩",
    keyConceptDescription: "virtual 함수: 런타임 바인딩(실제 객체 타입). non-virtual 함수: 컴파일 타임 바인딩(참조/포인터 타입).",
  },
  // ── cpp-2 추가 (cout 심화 & namespace) ──
  {
    id: 613,
    lessonId: "cpp-2",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello" << "\\n";
    cout << "World" << "\\n";
    return 0;
}`,
    options: ["HelloWorld", "Hello World", "Hello\nWorld", "컴파일 오류"],
    correctAnswer: 2,
    explanation: "'\\n'은 줄바꿈 문자입니다. endl과 달리 버퍼를 비우지 않지만 줄바꿈 효과는 동일합니다. Hello와 World가 각각 다른 줄에 출력됩니다.",
    keyConceptTitle: "'\\n' 줄바꿈",
    keyConceptDescription: "'\\n'은 줄바꿈 문자입니다. endl처럼 줄을 바꾸지만 버퍼 flush를 하지 않아 더 빠릅니다. 경쟁 프로그래밍에서는 endl 대신 '\\n'을 권장합니다.",
    relatedTopics: ["\\n", "endl", "cout", "이스케이프 문자"],
  },
  {
    id: 614,
    lessonId: "cpp-2",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "경로: C:\\\\Users\\\\Kim" << endl;
    return 0;
}`,
    options: ["경로: C:\\\\Users\\\\Kim", "경로: C:\\Users\\Kim", "경로: C:UsersKim", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "'\\\\\\\\' 두 개는 백슬래시 하나를 출력합니다. 문자열 안에서 백슬래시 자체를 나타내려면 '\\\\\\\\'처럼 두 개를 써야 합니다.",
    keyConceptTitle: "이스케이프 문자 '\\\\\\\\'",
    keyConceptDescription: "백슬래시(\\\\)는 특수 문자입니다. 문자열 안에 백슬래시를 출력하려면 '\\\\\\\\'처럼 두 개를 써야 합니다. 파일 경로 출력 시 자주 사용합니다.",
    relatedTopics: ["이스케이프 문자", "\\\\\\\\", "cout"],
  },
  {
    id: 615,
    lessonId: "cpp-2",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << 3 + 4 << endl;
    return 0;
}`,
    options: ["3 + 4", "7", "34", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "cout은 수식을 계산한 결과를 출력합니다. 3 + 4는 7로 계산되어 출력됩니다. 문자열로 출력하려면 \"3 + 4\"처럼 따옴표로 감싸야 합니다.",
    keyConceptTitle: "수식 직접 출력",
    keyConceptDescription: "cout << 수식 형태로 쓰면 수식이 계산된 결과가 출력됩니다. cout << 3 + 4는 7을 출력하고, cout << \"3 + 4\"는 문자열 그대로 출력합니다.",
    relatedTopics: ["cout", "수식 출력", "<<연산자"],
  },
  {
    id: 616,
    lessonId: "cpp-2",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 3;
    cout << a << " " << b << endl;
    return 0;
}`,
    options: ["a b", "5 3", "5b", "ab"],
    correctAnswer: 1,
    explanation: "cout에서 << 연산자로 여러 값을 이어서 출력할 수 있습니다. a는 5, \" \"는 공백, b는 3으로 출력됩니다.",
    keyConceptTitle: "여러 값 연속 출력",
    keyConceptDescription: "cout << 값1 << \" \" << 값2처럼 << 연산자를 연결하면 여러 값을 한 줄에 출력할 수 있습니다. 공백이나 구분자는 문자열로 넣어줍니다.",
    relatedTopics: ["cout", "<<연산자", "연속 출력"],
  },
  {
    id: 617,
    lessonId: "cpp-2",
    difficulty: "보통",
    question: "endl과 '\\n'의 차이로 올바른 것은?",
    code: `cout << "줄1" << endl;   // A
cout << "줄2" << "\\n";  // B`,
    options: [
      "A는 줄을 바꾸고, B는 줄을 바꾸지 않는다",
      "A는 줄바꿈 + 버퍼 flush, B는 줄바꿈만 한다",
      "A와 B는 완전히 동일하다",
      "B는 컴파일 오류가 발생한다",
    ],
    correctAnswer: 1,
    explanation: "endl은 줄바꿈(\\n)을 출력하고 추가로 출력 버퍼를 강제로 비웁니다(flush). '\\n'은 줄바꿈만 합니다. 버퍼 flush는 시간이 걸리므로 대량 출력에서는 '\\n'이 더 빠릅니다.",
    keyConceptTitle: "endl vs \\n 차이",
    keyConceptDescription: "endl = '\\n' + 버퍼 flush. '\\n'은 줄바꿈만 합니다. 실시간으로 출력이 필요한 경우(디버깅 등)엔 endl, 성능이 중요할 땐 '\\n'을 사용합니다.",
    relatedTopics: ["endl", "\\n", "버퍼 flush", "성능"],
  },
  {
    id: 618,
    lessonId: "cpp-2",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    bool flag = true;
    cout << flag << endl;
    return 0;
}`,
    options: ["true", "1", "false", "0"],
    correctAnswer: 1,
    explanation: "C++에서 cout으로 bool 값을 출력하면 true는 1, false는 0으로 출력됩니다. 'true'/'false' 문자열로 출력하려면 cout << boolalpha << flag를 사용해야 합니다.",
    keyConceptTitle: "bool 출력 결과",
    keyConceptDescription: "cout << bool변수는 true → 1, false → 0을 출력합니다. 'true'/'false' 문자열로 보려면 cout << boolalpha << 변수를 사용합니다.",
    relatedTopics: ["bool", "cout", "boolalpha"],
  },
  {
    id: 619,
    lessonId: "cpp-2",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "A\\tB\\tC" << endl;
    return 0;
}`,
    options: ["A\\tB\\tC", "ABC", "A B C", "A\tB\tC"],
    correctAnswer: 3,
    explanation: "'\\t'는 탭(tab) 문자입니다. 실제 출력 시 탭만큼 공간이 생겨 열을 맞출 수 있습니다. A, B, C 사이에 탭 간격이 생깁니다.",
    keyConceptTitle: "탭 이스케이프 \\t",
    keyConceptDescription: "'\\t'는 탭 문자로, 일정 간격(보통 4~8칸)을 띄웁니다. 표 형태로 데이터를 출력할 때 유용합니다.",
    relatedTopics: ["\\t", "이스케이프 문자", "cout"],
  },
  {
    id: 620,
    lessonId: "cpp-2",
    difficulty: "보통",
    question: "다음 중 std::cout을 std:: 없이 cout으로만 쓸 수 있는 경우는?",
    code: `#include <iostream>
// ???

int main() {
    cout << "Hello";
    return 0;
}`,
    options: [
      "#include <namespace>를 추가한 경우",
      "using namespace std;를 추가한 경우",
      "using std;를 추가한 경우",
      "namespace std {};를 추가한 경우",
    ],
    correctAnswer: 1,
    explanation: "using namespace std;를 선언하면 std:: 접두사 없이 cout, cin, endl 등을 사용할 수 있습니다. 이 선언이 없으면 반드시 std::cout처럼 써야 합니다.",
    keyConceptTitle: "using namespace std",
    keyConceptDescription: "using namespace std; 선언으로 std:: 접두사를 생략할 수 있습니다. 단, 대규모 프로젝트에서는 이름 충돌 위험이 있어 std::를 직접 쓰는 것이 권장됩니다.",
    relatedTopics: ["using namespace std", "std::", "namespace"],
  },
  {
    id: 621,
    lessonId: "cpp-2",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    cout << x++ << " " << x << endl;
    return 0;
}`,
    options: ["10 11", "11 11", "10 10", "11 10"],
    correctAnswer: 0,
    explanation: "x++는 후위 증가 연산자입니다. cout << x++는 현재 값(10)을 출력한 후 x를 11로 증가시킵니다. 이후 x는 11이므로 '10 11'이 출력됩니다.",
    keyConceptTitle: "후위 증가와 cout",
    keyConceptDescription: "x++는 표현식에서 현재 값을 사용한 뒤 증가합니다. ++x는 먼저 증가한 뒤 값을 사용합니다. cout << x++는 x의 원래 값을 출력 후 증가시킵니다.",
    relatedTopics: ["후위 증가", "++연산자", "cout"],
  },
  {
    id: 622,
    lessonId: "cpp-2",
    difficulty: "어려움",
    question: "다음 코드에서 컴파일 오류가 발생하는 이유는?",
    code: `#include <iostream>

int main() {
    cout << "Hello" << endl;
    return 0;
}`,
    options: [
      "endl 대신 '\\n'을 써야 한다",
      "using namespace std; 또는 std::cout이 없어서",
      "#include <string>이 없어서",
      "main 함수 반환형이 잘못됐다",
    ],
    correctAnswer: 1,
    explanation: "using namespace std; 없이 cout을 사용하면 컴파일 오류가 발생합니다. cout은 std 네임스페이스에 속하므로, std::cout으로 쓰거나 using namespace std;를 선언해야 합니다.",
    keyConceptTitle: "std 네임스페이스 필수",
    keyConceptDescription: "cout, cin, endl은 모두 std 네임스페이스에 속합니다. using namespace std; 없이는 반드시 std::cout, std::cin, std::endl처럼 접두사를 붙여야 합니다.",
    relatedTopics: ["namespace", "std::", "컴파일 오류", "using namespace std"],
  },
  // ── cpp-15 추가 (pair & tuple) ──
  {
    id: 623,
    lessonId: "cpp-15",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <utility>
using namespace std;

int main() {
    pair<int, string> p = {1, "hello"};
    cout << p.first << " " << p.second;
    return 0;
}`,
    options: ["1 hello", "hello 1", "first second", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "pair에서 .first는 첫 번째 값(1), .second는 두 번째 값(\"hello\")에 접근합니다. 선언 시 {1, \"hello\"}처럼 중괄호로 초기화할 수 있습니다.",
    keyConceptTitle: "pair 선언과 접근",
    keyConceptDescription: "pair<타입1, 타입2> p = {값1, 값2};로 선언합니다. p.first로 첫 번째 값, p.second로 두 번째 값에 접근합니다.",
    relatedTopics: ["pair", ".first", ".second", "<utility>"],
  },
  {
    id: 624,
    lessonId: "cpp-15",
    difficulty: "쉬움",
    question: "make_pair()를 사용한 pair 생성으로 올바른 것은?",
    code: `#include <iostream>
#include <utility>
using namespace std;

int main() {
    auto p = make_pair(10, 3.14);
    cout << p.first << " " << p.second;
    return 0;
}`,
    options: ["10 3.14", "3.14 10", "10 3", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "make_pair(10, 3.14)는 pair<int, double>을 자동으로 생성합니다. auto를 사용하면 타입을 직접 명시하지 않아도 됩니다.",
    keyConceptTitle: "make_pair() 사용",
    keyConceptDescription: "make_pair(값1, 값2)는 타입을 자동 추론하여 pair를 생성합니다. auto p = make_pair(a, b)처럼 간편하게 쓸 수 있습니다.",
    relatedTopics: ["make_pair", "auto", "pair"],
  },
  {
    id: 625,
    lessonId: "cpp-15",
    difficulty: "쉬움",
    question: "vector<pair<int,int>>에 값을 추가하는 올바른 코드는?",
    code: `#include <vector>
#include <utility>
using namespace std;

int main() {
    vector<pair<int,int>> v;
    v.push_back({3, 5});
    v.push_back(make_pair(1, 2));
    return 0;
}`,
    options: [
      "위 코드 모두 올바르다",
      "push_back({3, 5})만 올바르다",
      "push_back(make_pair(1, 2))만 올바르다",
      "pair를 vector에 담을 수 없다",
    ],
    correctAnswer: 0,
    explanation: "{3, 5}와 make_pair(1, 2) 두 방법 모두 vector<pair<int,int>>에 추가할 수 있습니다. 중괄호 초기화가 더 간결합니다.",
    keyConceptTitle: "vector에 pair 추가",
    keyConceptDescription: "vector<pair<int,int>> v;에 v.push_back({a, b}) 또는 v.push_back(make_pair(a, b))로 추가합니다. 두 방법 모두 유효합니다.",
    relatedTopics: ["vector", "pair", "push_back", "make_pair"],
  },
  {
    id: 626,
    lessonId: "cpp-15",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <tuple>
using namespace std;

int main() {
    tuple<int, string, double> t = {1, "hi", 3.14};
    cout << get<0>(t) << endl;
    return 0;
}`,
    options: ["1", "hi", "3.14", "0"],
    correctAnswer: 0,
    explanation: "get<0>(t)는 tuple의 첫 번째 요소(인덱스 0)를 반환합니다. 인덱스는 0부터 시작합니다. 따라서 결과는 1입니다.",
    keyConceptTitle: "tuple get<인덱스>",
    keyConceptDescription: "tuple의 요소는 get<N>(t)로 접근합니다. N은 0부터 시작하는 인덱스입니다. get<0>은 첫 번째, get<1>은 두 번째 요소입니다.",
    relatedTopics: ["tuple", "get", "<tuple>"],
  },
  {
    id: 627,
    lessonId: "cpp-15",
    difficulty: "보통",
    question: "pair 비교에 대한 설명으로 올바른 것은?",
    code: `#include <iostream>
#include <utility>
using namespace std;

int main() {
    pair<int,int> a = {1, 5};
    pair<int,int> b = {1, 3};
    cout << (a > b ? "a가 크다" : "b가 크거나 같다") << endl;
    return 0;
}`,
    options: ["a가 크다", "b가 크거나 같다", "컴파일 오류", "항상 같다"],
    correctAnswer: 0,
    explanation: "pair 비교는 first를 먼저 비교합니다. a.first == b.first(둘 다 1)이므로 second를 비교합니다. a.second(5) > b.second(3)이므로 a가 더 큽니다.",
    keyConceptTitle: "pair 비교 규칙",
    keyConceptDescription: "pair는 first 기준으로 먼저 비교하고, first가 같으면 second를 비교합니다. 이를 사전식(lexicographic) 비교라고 합니다.",
    relatedTopics: ["pair", "비교 연산자", "사전식 비교"],
  },
  {
    id: 628,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int,int>> v = {{2,3},{1,5},{2,1}};
    sort(v.begin(), v.end());
    cout << v[0].first << " " << v[0].second << endl;
    return 0;
}`,
    options: ["1 5", "2 3", "2 1", "1 3"],
    correctAnswer: 0,
    explanation: "pair 정렬은 first 기준 오름차순, first가 같으면 second 기준 오름차순입니다. {1,5}의 first가 1로 가장 작아 첫 번째가 됩니다.",
    keyConceptTitle: "pair vector 정렬",
    keyConceptDescription: "vector<pair>를 sort()하면 first 기준 오름차순으로 정렬됩니다. first가 같은 경우 second 기준으로 정렬합니다. 다중 기준 정렬에 자주 활용됩니다.",
    relatedTopics: ["pair", "sort", "vector", "정렬"],
  },
  {
    id: 629,
    lessonId: "cpp-15",
    difficulty: "보통",
    question: "C++17 구조적 바인딩으로 pair를 분해하는 올바른 코드는?",
    code: `#include <iostream>
#include <utility>
using namespace std;

int main() {
    pair<int, string> p = {42, "answer"};
    auto [num, word] = p;
    cout << num << " " << word << endl;
    return 0;
}`,
    options: ["42 answer", "answer 42", "num word", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "auto [num, word] = p;는 C++17 구조적 바인딩(structured binding)입니다. pair의 first를 num, second를 word에 자동으로 대입합니다.",
    keyConceptTitle: "구조적 바인딩 (C++17)",
    keyConceptDescription: "auto [a, b] = pair;처럼 구조적 바인딩을 사용하면 pair나 tuple을 간편하게 분해할 수 있습니다. C++17 이상에서 지원됩니다.",
    relatedTopics: ["structured binding", "auto", "C++17", "pair"],
  },
  {
    id: 630,
    lessonId: "cpp-15",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <tuple>
using namespace std;

int main() {
    tuple<int, string, double> t = {10, "world", 2.5};
    auto [a, b, c] = t;
    cout << b << " " << c * a << endl;
    return 0;
}`,
    options: ["world 25", "world 2.5", "10 world", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "구조적 바인딩으로 t를 분해하면 a=10, b=\"world\", c=2.5가 됩니다. b는 \"world\", c * a는 2.5 * 10 = 25.0이지만 정수로 표시되어 \"world 25\"가 출력됩니다.",
    keyConceptTitle: "tuple 구조적 바인딩",
    keyConceptDescription: "auto [a, b, c] = tuple;로 tuple을 여러 변수로 한번에 분해할 수 있습니다. 요소 수와 변수 수가 일치해야 합니다.",
    relatedTopics: ["tuple", "structured binding", "auto", "C++17"],
  },
  {
    id: 631,
    lessonId: "cpp-23",
    difficulty: "어려움",
    question: "다음 코드에서 pair<int,int> 비교를 통한 정렬 결과로 v[1]은?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int,int>> v = {{3,1},{1,4},{1,2},{2,5}};
    sort(v.begin(), v.end());
    cout << v[1].first << " " << v[1].second;
    return 0;
}`,
    options: ["1 2", "1 4", "3 1", "2 5"],
    correctAnswer: 1,
    explanation: "정렬 결과는 {1,2}, {1,4}, {2,5}, {3,1}입니다. first=1인 {1,4}와 {1,2}를 비교하면 second 2 < 4이므로 {1,2}가 앞에 옵니다. 따라서 v[0]={1,2}, v[1]={1,4}이므로 출력은 '1 4'입니다.",
    keyConceptTitle: "pair 정렬 세부 동작",
    keyConceptDescription: "pair 정렬: first 오름차순 → first 같으면 second 오름차순. {1,2}, {1,4}, {2,5}, {3,1} 순서로 정렬됩니다.",
    relatedTopics: ["pair", "sort", "사전식 비교"],
  },
  // ── cpp-3 변수와 타입 보강 (IDs 685–694) ──────────────────────────────────
  {
    id: 685,
    lessonId: "cpp-3",
    difficulty: "쉬움",
    question: "auto 키워드를 사용할 때 컴파일러가 타입을 결정하는 시점은?",
    code: `auto x = 42;
auto y = 3.14;
auto z = "hello";`,
    options: [
      "컴파일 타임 — 초기값을 보고 타입을 추론",
      "런타임 — 실행 중에 타입이 결정됨",
      "auto는 항상 int 타입",
      "auto는 동적 타입으로 나중에 다른 타입도 저장 가능",
    ],
    correctAnswer: 0,
    explanation: "auto는 컴파일 타임에 초기값을 보고 타입을 추론합니다. x=int, y=double, z=const char*. 한번 결정된 타입은 변하지 않습니다.",
    keyConceptTitle: "auto — 타입 추론",
    keyConceptDescription: "auto x = 42; → x의 타입은 int로 확정됩니다. 컴파일러가 초기값 타입을 보고 자동 결정. 타입 변경은 불가합니다.",
    relatedTopics: ["auto", "타입 추론", "컴파일 타임"],
  },
  {
    id: 686,
    lessonId: "cpp-3",
    difficulty: "쉬움",
    question: "다음 코드에서 컴파일 오류가 발생하는 줄은?",
    code: `const int MAX = 100;  // (A)
int x = MAX;          // (B)
MAX = 200;            // (C)
cout << MAX;          // (D)`,
    options: ["(C) — const 변수는 값 변경 불가", "(A) — const 선언 시 초기화 불필요", "(B) — const 변수를 다른 변수에 대입 불가", "(D) — const 변수 출력 불가"],
    correctAnswer: 0,
    explanation: "const 변수는 선언 후 값을 변경할 수 없습니다. MAX = 200은 컴파일 오류입니다. const int를 다른 변수에 대입(B)하거나 출력(D)하는 것은 허용됩니다.",
    keyConceptTitle: "const — 상수 변수",
    keyConceptDescription: "const 변수는 선언 시 초기화 필수, 이후 변경 불가. 마법의 숫자 대신 이름 있는 상수로 사용합니다.",
    relatedTopics: ["const", "상수", "컴파일 오류"],
  },
  {
    id: 687,
    lessonId: "cpp-3",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `bool a = true;
bool b = false;
cout << a << " " << b;`,
    options: ["1 0", "true false", "1 1", "0 1"],
    correctAnswer: 0,
    explanation: "bool을 cout으로 출력하면 true→1, false→0으로 출력됩니다. 'true/false' 문자열로 출력하려면 cout << boolalpha를 사용해야 합니다.",
    keyConceptTitle: "bool 출력 — 1과 0",
    keyConceptDescription: "bool 기본 출력: true=1, false=0. cout << boolalpha를 설정하면 'true'/'false' 문자열로 출력됩니다.",
    relatedTopics: ["bool", "true", "false", "cout"],
  },
  {
    id: 688,
    lessonId: "cpp-3",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는? (정수 나눗셈 주의)",
    code: `int a = 7, b = 2;
double result = a / b;
cout << result;`,
    options: ["3", "3.5", "3.0", "3.50"],
    correctAnswer: 0,
    explanation: "a/b는 두 피연산자가 모두 int이므로 정수 나눗셈 → 소수점 버림 → 3. 그 결과(3)를 double에 저장해도 이미 3입니다. 3.5를 얻으려면 (double)a/b 또는 a/2.0을 사용해야 합니다.",
    keyConceptTitle: "정수 나눗셈 — 소수점 버림",
    keyConceptDescription: "int / int = int (나머지 버림). 7/2 = 3. 실수 나눗셈: (double)a / b 또는 a / 2.0.",
    relatedTopics: ["정수 나눗셈", "/", "int", "double"],
  },
  {
    id: 689,
    lessonId: "cpp-3",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `double x = 3.9;
int n = (int)x;
cout << n;`,
    options: ["3", "4", "3.9", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "(int)x는 C 스타일 명시적 형변환(캐스팅)입니다. double → int 변환 시 소수점 이하를 버립니다(반올림 아님). 3.9 → 3.",
    keyConceptTitle: "명시적 형변환 — 소수 버림",
    keyConceptDescription: "(int)double: 소수점 이하 버림(truncation). 반올림이 아닙니다. 3.9 → 3, 2.1 → 2.",
    relatedTopics: ["형변환", "casting", "(int)", "double to int"],
  },
  {
    id: 690,
    lessonId: "cpp-3",
    difficulty: "보통",
    question: "다음 중 auto를 사용한 코드에서 타입 추론이 올바른 것은?",
    code: `auto a = 5;        // (A) int
auto b = 5.0;      // (B) double
auto c = '5';      // (C) char
auto d = true;     // (D) bool`,
    options: [
      "모두 올바름: a=int, b=double, c=char, d=bool",
      "auto는 모두 int로 추론",
      "c는 int로 추론됨",
      "d는 int로 추론됨",
    ],
    correctAnswer: 0,
    explanation: "auto는 초기값의 타입을 정확히 추론합니다. 5→int, 5.0→double, '5'→char, true→bool. 모두 올바른 추론입니다.",
    keyConceptTitle: "auto 타입 추론 규칙",
    keyConceptDescription: "auto 추론: 정수 리터럴→int, 소수점→double, 문자→char, true/false→bool.",
    relatedTopics: ["auto", "타입 추론", "리터럴"],
  },
  {
    id: 691,
    lessonId: "cpp-3",
    difficulty: "보통",
    question: "다음 코드에서 result의 타입과 값은?",
    code: `int a = 5;
double b = 2.0;
auto result = a + b;`,
    options: [
      "double, 7.0 — int와 double 연산 시 double로 자동 변환",
      "int, 7 — a가 int이므로 결과도 int",
      "컴파일 오류 — 다른 타입 연산 불가",
      "float, 7.0f",
    ],
    correctAnswer: 0,
    explanation: "int + double 연산 시 int가 double로 자동 변환(암시적 변환)됩니다. 결과 타입은 double, 값은 7.0. auto도 double로 추론합니다.",
    keyConceptTitle: "암시적 타입 변환",
    keyConceptDescription: "int op double → int가 double로 자동 변환. 더 넓은 타입으로 자동 변환됩니다(정밀도 손실 방지).",
    relatedTopics: ["암시적 변환", "int", "double", "auto"],
  },
  {
    id: 692,
    lessonId: "cpp-3",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `int x = 5;
double y = x / 2;
double z = x / 2.0;
cout << y << " " << z;`,
    options: ["2 2.5", "2.5 2.5", "2 2", "2.5 2"],
    correctAnswer: 0,
    explanation: "y: x/2는 int/int = 2(정수 나눗셈), 이후 double에 저장해도 2.0. z: x/2.0은 int/double → 5.0/2.0 = 2.5.",
    keyConceptTitle: "정수 vs 실수 나눗셈 비교",
    keyConceptDescription: "5/2 = 2 (정수 버림). 5/2.0 = 2.5 (실수 나눗셈). 피연산자 중 하나라도 double이면 실수 나눗셈 수행.",
    relatedTopics: ["정수 나눗셈", "/", "double", "형변환"],
  },
  {
    id: 693,
    lessonId: "cpp-3",
    difficulty: "어려움",
    question: "다음 코드에서 컴파일 오류가 발생하지 않는 것은?",
    code: `const int A = 10;
int B = 20;

// 아래 중 올바른 것은?
// (1) A = 30;
// (2) const int C = B;
// (3) B = A;
// (4) const int D; // 초기화 없음`,
    options: [
      "(2)와 (3) — const는 다른 변수로 초기화 가능, non-const에 대입도 가능",
      "(1) — const는 초기화 후 변경 가능",
      "(4) — const는 초기화 없어도 됨",
      "(1)과 (4) 모두 가능",
    ],
    correctAnswer: 0,
    explanation: "(2) const int C = B: B의 현재 값으로 C를 초기화. 가능. (3) B = A: const A의 값을 non-const B에 복사. 가능. (1) A=30: const 변경 불가. (4) const 초기화 누락: 컴파일 오류.",
    keyConceptTitle: "const 규칙 — 초기화와 대입",
    keyConceptDescription: "const: 선언 시 초기화 필수, 이후 변경 불가. 단, const 값을 non-const 변수에 '읽어서 복사'하는 것은 허용됩니다.",
    relatedTopics: ["const", "초기화", "대입", "컴파일 오류"],
  },
  {
    id: 694,
    lessonId: "cpp-3",
    difficulty: "어려움",
    question: "다음 중 static_cast를 사용한 올바른 형변환은?",
    code: `double d = 9.7;
int i = 3;

// 옵션들:
// (A) int n = static_cast<int>(d);
// (B) double x = static_cast<double>(i) / 2;
// (C) int m = static_cast<double>(i);
// (D) string s = static_cast<string>(i);`,
    options: [
      "(A)와 (B) 모두 올바름",
      "(A)만 올바름",
      "(C)와 (D) 모두 올바름",
      "(B)만 올바름",
    ],
    correctAnswer: 0,
    explanation: "(A) double→int 변환: 허용, n=9. (B) int→double 후 나눗셈: 실수 나눗셈 수행, x=1.5. (C) double→int 대입은 암시적 변환으로 처리되어 컴파일 경고. (D) int→string은 static_cast로 불가 — 컴파일 오류.",
    keyConceptTitle: "static_cast — C++ 스타일 형변환",
    keyConceptDescription: "static_cast<타입>(값): C++ 권장 형변환 방식. 숫자 타입 간 변환에 사용. int→string 같은 의미없는 변환은 컴파일 오류.",
    relatedTopics: ["static_cast", "형변환", "double", "int"],
  },
  // ── cpp-12 참조와 함수 보강 (IDs 674–684) ──────────────────────────────────
  {
    id: 674,
    lessonId: "cpp-12",
    difficulty: "쉬움",
    question: "int& ref = x;에서 ref는 무엇인가?",
    code: `int x = 10;
int& ref = x;
ref = 20;
cout << x;`,
    options: [
      "x의 별명(alias) — ref를 바꾸면 x도 바뀜",
      "x의 복사본 — ref를 바꿔도 x는 변화 없음",
      "x의 주소를 담는 포인터",
      "int를 담는 새 변수",
    ],
    correctAnswer: 0,
    explanation: "참조(reference)는 변수의 별명입니다. ref = 20은 x = 20과 완전히 동일합니다. 출력: 20.",
    keyConceptTitle: "참조(Reference) — 별명",
    keyConceptDescription: "int& ref = x; — ref는 x의 별명. ref를 통한 모든 변경이 x에 즉시 반영됩니다.",
    relatedTopics: ["reference", "&", "별명"],
  },
  {
    id: 675,
    lessonId: "cpp-12",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `int a = 5;
int& r = a;
r += 10;
cout << a << " " << r;`,
    options: ["15 15", "5 15", "5 5", "15 5"],
    correctAnswer: 0,
    explanation: "r은 a의 참조입니다. r += 10은 a에 10을 더합니다. a와 r은 같은 메모리를 가리키므로 둘 다 15를 출력합니다.",
    keyConceptTitle: "참조 수정 — 원본 변경",
    keyConceptDescription: "참조를 통한 변경은 원본에 직접 영향을 줍니다. a와 r은 항상 같은 값을 가집니다.",
    relatedTopics: ["reference", "+=", "별명"],
  },
  {
    id: 676,
    lessonId: "cpp-12",
    difficulty: "쉬움",
    question: "두 변수를 교환하는 swap 함수에서 &가 필요한 이유는?",
    code: `void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int x=3, y=7;
swap(x, y);
cout << x << " " << y;`,
    options: [
      "&가 없으면 복사본이 교환되어 원본 x, y는 변화 없음",
      "&가 있으면 함수가 더 빠름",
      "&가 없으면 컴파일 오류 발생",
      "&는 주소를 더하는 연산자",
    ],
    correctAnswer: 0,
    explanation: "&를 쓰면 인자가 참조로 전달됩니다. swap 내부에서 a,b는 x,y의 별명이므로 교환이 원본에 반영됩니다. 출력: 7 3.",
    keyConceptTitle: "참조에 의한 전달 (Pass by Reference)",
    keyConceptDescription: "함수 매개변수에 &를 붙이면 참조로 전달됩니다. 함수 내 변경이 호출한 쪽 변수에 반영됩니다.",
    relatedTopics: ["reference", "pass by reference", "swap"],
  },
  {
    id: 677,
    lessonId: "cpp-12",
    difficulty: "쉬움",
    question: "다음 두 함수의 차이로 올바른 것은?",
    code: `void f1(int x)  { x = 100; }
void f2(int& x) { x = 100; }

int a = 5;
f1(a); // a는?
f2(a); // a는?`,
    options: [
      "f1 후 a=5, f2 후 a=100",
      "f1 후 a=100, f2 후 a=5",
      "f1과 f2 모두 a=100",
      "f1과 f2 모두 a=5",
    ],
    correctAnswer: 0,
    explanation: "f1은 값으로 전달(복사). f1 내부 x 변경은 a에 영향 없음. f2는 참조로 전달. f2 내부 x=100이 a를 직접 변경합니다.",
    keyConceptTitle: "값 전달 vs 참조 전달",
    keyConceptDescription: "void f(int x): 복사본 사용 → 원본 불변. void f(int& x): 참조 사용 → 원본 변경.",
    relatedTopics: ["pass by value", "pass by reference", "&"],
  },
  {
    id: 678,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "다음 코드에서 double 함수 호출 후 n의 값은?",
    code: `void doubleVal(int& n) {
    n = n * 2;
}

int n = 7;
doubleVal(n);
cout << n;`,
    options: ["14", "7", "49", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "n이 참조로 전달됩니다. 함수 내부에서 n = n * 2는 원본 n을 7→14로 변경합니다.",
    keyConceptTitle: "참조 매개변수로 값 수정",
    keyConceptDescription: "참조 매개변수를 통해 함수가 호출자의 변수를 직접 수정할 수 있습니다.",
    relatedTopics: ["pass by reference", "함수", "수정"],
  },
  {
    id: 679,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "범위 기반 for에서 &를 쓰지 않으면 어떤 문제가 생기는가?",
    code: `vector<int> v = {1, 2, 3, 4, 5};
for (int x : v) {
    x *= 2;  // v의 원소 변경 시도
}
cout << v[0];`,
    options: [
      "v[0]은 1 (x가 복사본이라 v는 변하지 않음)",
      "v[0]은 2 (x가 v[0]의 참조라 변경됨)",
      "컴파일 오류",
      "v[0]은 0",
    ],
    correctAnswer: 0,
    explanation: "for(int x : v)에서 x는 각 원소의 복사본입니다. x를 변경해도 v의 원소는 변하지 않습니다. v를 수정하려면 for(int& x : v)를 사용해야 합니다.",
    keyConceptTitle: "범위 for — & 없으면 복사",
    keyConceptDescription: "for(int x : v): 복사 → v 불변. for(int& x : v): 참조 → v 변경 가능. 대형 객체는 성능상 const& 권장.",
    relatedTopics: ["range-based for", "&", "copy vs reference"],
  },
  {
    id: 680,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "const 참조 매개변수를 사용하는 이유로 올바른 것은?",
    code: `void printInfo(const string& s) {
    cout << s;
}

string name = "Alice";
printInfo(name);`,
    options: [
      "복사 없이 전달하되 함수 내 수정을 금지",
      "함수에서 s를 수정할 수 있게 허용",
      "s를 전역 변수로 만들기 위해",
      "string을 int로 변환하기 위해",
    ],
    correctAnswer: 0,
    explanation: "const&는 '읽기 전용 참조'입니다. 복사 없이(효율적으로) 전달하되 함수 내부에서 원본을 수정하는 것을 금지합니다. 대형 객체(string, vector 등)에 권장됩니다.",
    keyConceptTitle: "const 참조 — 읽기 전용 전달",
    keyConceptDescription: "const T& 매개변수: 복사 비용 없음 + 원본 수정 불가. 읽기만 하는 함수에 가장 적합합니다.",
    relatedTopics: ["const reference", "const&", "성능"],
  },
  {
    id: 681,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "벡터의 모든 원소에 1을 더하려 한다. 올바른 코드는?",
    code: `vector<int> v = {1, 2, 3};
for (/* 빈칸 */ : v) {
    x += 1;
}`,
    options: [
      "int& x",
      "int x",
      "const int& x",
      "int* x",
    ],
    correctAnswer: 0,
    explanation: "원소를 수정하려면 참조(int&)를 사용해야 합니다. int x는 복사본이라 v를 변경하지 않고, const int&는 수정이 불가합니다.",
    keyConceptTitle: "범위 for로 원소 수정",
    keyConceptDescription: "벡터 원소 수정: for(int& x : v) { x 수정; }. 수정 안 할 때: for(int x : v) 또는 for(const int& x : v).",
    relatedTopics: ["range-based for", "int&", "원소 수정"],
  },
  {
    id: 682,
    lessonId: "cpp-12",
    difficulty: "보통",
    question: "다음 코드에서 add 함수 호출 후 result 값은?",
    code: `void add(int a, int b, int& result) {
    result = a + b;
}

int res = 0;
add(3, 4, res);
cout << res;`,
    options: ["7", "0", "3", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "result는 res의 참조입니다. 함수 내부에서 result = a+b = 7로 설정하면 res가 7로 변경됩니다. 반환값 없이 여러 값을 '반환'하는 패턴입니다.",
    keyConceptTitle: "출력 매개변수 패턴",
    keyConceptDescription: "참조 매개변수로 함수의 '결과값'을 여러 개 반환할 수 있습니다. void 함수에서 결과를 전달하는 일반적인 패턴입니다.",
    relatedTopics: ["pass by reference", "출력 매개변수", "void 함수"],
  },
  {
    id: 683,
    lessonId: "cpp-12",
    difficulty: "어려움",
    question: "다음 코드에서 함수 호출 후 a와 b의 값은?",
    code: `void process(int& x, int& y) {
    x += y;
    y = x - y;
    x = x - y;
}

int a=3, b=7;
process(a, b);
cout << a << " " << b;`,
    options: ["7 3", "3 7", "10 3", "7 10"],
    correctAnswer: 0,
    explanation: "초기: x=3, y=7. x += y: x=10. y = x-y = 10-7=3. x = x-y = 10-3=7. a=7, b=3. 참조를 이용한 swap 변형 알고리즘입니다.",
    keyConceptTitle: "참조를 이용한 변수 교환",
    keyConceptDescription: "덧셈/뺄셈으로 임시 변수 없이 swap: x+=y; y=x-y; x=x-y. 참조를 통해 a,b가 직접 수정됩니다.",
    relatedTopics: ["pass by reference", "swap", "수식 트레이싱"],
  },
  {
    id: 684,
    lessonId: "cpp-12",
    difficulty: "어려움",
    question: "다음 코드에서 주석 위치의 참조가 문제가 되는 이유는?",
    code: `int& getRef() {
    int local = 10;
    return local;  // ⚠️ 문제 발생
}

int& r = getRef();
cout << r;  // 미정의 동작`,
    options: [
      "local은 함수 종료 시 소멸 → dangling reference(매달린 참조)",
      "int& 반환 타입이 잘못됨",
      "local이 const가 아니라서",
      "참조는 return할 수 없음",
    ],
    correctAnswer: 0,
    explanation: "local은 스택 변수로 getRef() 종료 시 소멸합니다. 소멸된 변수를 가리키는 r은 '매달린 참조(dangling reference)'가 됩니다. r을 사용하면 미정의 동작(UB)이 발생합니다.",
    keyConceptTitle: "Dangling Reference (매달린 참조)",
    keyConceptDescription: "함수의 지역 변수에 대한 참조를 반환하면 안 됩니다. 함수 종료 후 지역 변수는 소멸되어 참조가 무효가 됩니다.",
    relatedTopics: ["dangling reference", "지역 변수", "수명", "UB"],
  },
  // ── cpp-7 반복문 보강 (IDs 647–659) ──────────────────────────────────────
  {
    id: 647,
    lessonId: "cpp-7",
    difficulty: "쉬움",
    question: "1부터 10까지 홀수만 출력하려 한다. 빈칸에 들어갈 코드는?",
    code: `for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) /* 빈칸 */;
    cout << i << " ";
}`,
    options: ["continue", "break", "return", "skip"],
    correctAnswer: 0,
    explanation: "continue는 현재 반복을 건너뛰고 다음 반복으로 이동합니다. i가 짝수이면 continue로 cout을 건너뛰어 홀수만 출력됩니다.",
    keyConceptTitle: "continue — 반복 건너뛰기",
    keyConceptDescription: "continue: 현재 반복의 남은 코드를 건너뛰고 다음 반복으로 진행. break: 루프 자체를 종료.",
    relatedTopics: ["continue", "for loop", "% 나머지"],
  },
  {
    id: 648,
    lessonId: "cpp-7",
    difficulty: "쉬움",
    question: "다음 코드에서 while 루프가 무한 루프가 되는 이유는?",
    code: `int i = 0;
while (i < 5) {
    cout << i;
    // i++ 빠짐
}`,
    options: [
      "i가 증가하지 않아서 조건이 항상 참",
      "while 조건에 등호(=)가 없어서",
      "cout이 있으면 루프가 멈추지 않아서",
      "int 타입이라서",
    ],
    correctAnswer: 0,
    explanation: "i++이 없으면 i는 계속 0이므로 i < 5가 항상 참입니다. 루프 변수가 업데이트되지 않으면 무한 루프가 됩니다.",
    keyConceptTitle: "while 루프 변수 업데이트",
    keyConceptDescription: "while 루프에서 반드시 루프 변수(또는 탈출 조건)를 업데이트해야 합니다. 그렇지 않으면 무한 루프 발생.",
    relatedTopics: ["while", "무한 루프", "루프 변수"],
  },
  {
    id: 649,
    lessonId: "cpp-7",
    difficulty: "쉬움",
    question: "다음 코드의 실행 후 sum 값은?",
    code: `int sum = 0;
for (int i = 1; i <= 5; i++) {
    sum += i;
}
cout << sum;`,
    options: ["15", "10", "14", "5"],
    correctAnswer: 0,
    explanation: "sum = 0+1+2+3+4+5 = 15. for 루프로 1부터 n까지 합계를 구하는 기본 패턴입니다.",
    keyConceptTitle: "for 루프 누적 합계",
    keyConceptDescription: "누적 합계 패턴: int sum = 0; for(int i=1; i<=n; i++) sum += i; 결과: n*(n+1)/2.",
    relatedTopics: ["for loop", "누적", "sum"],
  },
  {
    id: 650,
    lessonId: "cpp-7",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `for (int i = 5; i >= 1; i--) {
    cout << i << " ";
}`,
    options: ["5 4 3 2 1", "1 2 3 4 5", "5 4 3 2 1 0", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "i=5에서 시작해 i--로 감소, i >= 1인 동안 반복합니다. 출력: 5 4 3 2 1.",
    keyConceptTitle: "for 역순 반복",
    keyConceptDescription: "역순 반복: for(int i=n; i>=1; i--). 감소 연산자 i--와 종료 조건 i>=1에 주의하세요.",
    relatedTopics: ["for loop", "역순", "i--"],
  },
  {
    id: 651,
    lessonId: "cpp-7",
    difficulty: "쉬움",
    question: "배열에서 값 7을 발견하면 즉시 중단하고 인덱스를 출력하는 코드에서 빈칸은?",
    code: `int arr[] = {3, 1, 7, 4, 9};
for (int i = 0; i < 5; i++) {
    if (arr[i] == 7) {
        cout << i;
        /* 빈칸 */;
    }
}`,
    options: ["break", "continue", "return", "stop"],
    correctAnswer: 0,
    explanation: "break는 현재 루프를 즉시 종료합니다. 원하는 값을 찾으면 break로 더 이상 탐색하지 않습니다. 출력: 2 (인덱스 2에 7이 있음).",
    keyConceptTitle: "break — 루프 즉시 종료",
    keyConceptDescription: "break: 루프를 즉시 탈출. 특정 조건 만족 시 탐색을 중단할 때 사용합니다.",
    relatedTopics: ["break", "for loop", "선형 탐색"],
  },
  {
    id: 652,
    lessonId: "cpp-7",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) break;
        cout << i << j << " ";
    }
}`,
    options: ["00 10 20", "00 01 02 10 11 12 20 21 22", "00 01 10 11 20 21", "00 10"],
    correctAnswer: 0,
    explanation: "j==1일 때 내부 루프 break. 각 i 반복에서 j=0만 실행됩니다. 출력: 00 10 20. break는 가장 안쪽 루프만 종료합니다.",
    keyConceptTitle: "중첩 루프에서 break",
    keyConceptDescription: "break는 자신이 속한 가장 안쪽 루프만 종료합니다. 바깥 루프는 계속 실행됩니다.",
    relatedTopics: ["break", "중첩 for loop", "nested loop"],
  },
  {
    id: 653,
    lessonId: "cpp-7",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는? (3의 배수는 건너뜀)",
    code: `for (int i = 1; i <= 7; i++) {
    if (i % 3 == 0) continue;
    cout << i << " ";
}`,
    options: ["1 2 4 5 7", "1 2 3 4 5 6 7", "3 6", "1 2 4 5 6 7"],
    correctAnswer: 0,
    explanation: "3의 배수(3, 6)는 continue로 건너뜁니다. 나머지 1, 2, 4, 5, 7이 출력됩니다.",
    keyConceptTitle: "continue로 특정 값 건너뛰기",
    keyConceptDescription: "continue: 3의 배수처럼 특정 조건의 반복을 건너뛸 때 사용. 루프 자체는 종료되지 않습니다.",
    relatedTopics: ["continue", "% 나머지", "for loop"],
  },
  {
    id: 654,
    lessonId: "cpp-7",
    difficulty: "보통",
    question: "다음 중첩 루프의 출력 결과는?",
    code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) {
        cout << "*";
    }
    cout << "\\n";
}`,
    options: ["*\n**\n***", "***\n***\n***", "*\n*\n*", "***\n**\n*"],
    correctAnswer: 0,
    explanation: "i=1: j=1 → '*', i=2: j=1,2 → '**', i=3: j=1,2,3 → '***'. 각 행 끝에 줄바꿈. 삼각형 패턴 출력.",
    keyConceptTitle: "중첩 루프 — 삼각형 패턴",
    keyConceptDescription: "for(i=1..n) { for(j=1..i) { ... } } 패턴은 행마다 반복 횟수가 증가하는 삼각형 모양을 만듭니다.",
    relatedTopics: ["중첩 for loop", "패턴 출력", "\\n"],
  },
  {
    id: 655,
    lessonId: "cpp-7",
    difficulty: "보통",
    question: "다음 코드가 출력하는 줄의 수는?",
    code: `int count = 0;
for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 4; j++) {
        if (i == j) continue;
        count++;
    }
}
cout << count;`,
    options: ["12", "16", "8", "4"],
    correctAnswer: 0,
    explanation: "4×4 = 16번 반복에서 i==j인 경우(0,0),(1,1),(2,2),(3,3) 4번이 continue로 건너뜁니다. 16 - 4 = 12.",
    keyConceptTitle: "중첩 루프 + continue 카운팅",
    keyConceptDescription: "전체 반복 횟수에서 continue로 건너뛰는 횟수를 빼면 실제 실행 횟수를 계산할 수 있습니다.",
    relatedTopics: ["continue", "중첩 for loop", "카운팅"],
  },
  {
    id: 656,
    lessonId: "cpp-7",
    difficulty: "보통",
    question: "배열 arr[5]의 모든 요소를 출력하는 코드에서 올바른 것은?",
    code: `int arr[5] = {1, 2, 3, 4, 5};
// 아래 중 올바른 코드는?`,
    options: [
      "for (int i = 0; i < 5; i++) cout << arr[i];",
      "for (int i = 0; i <= 5; i++) cout << arr[i];",
      "for (int i = 1; i <= 5; i++) cout << arr[i];",
      "for (int i = 1; i < 5; i++) cout << arr[i];",
    ],
    correctAnswer: 0,
    explanation: "배열 인덱스는 0~4입니다. i < 5 (0,1,2,3,4)가 정확합니다. i <= 5는 arr[5]에 접근해 범위 초과 오류, i=1 시작은 arr[0]을 건너뜁니다.",
    keyConceptTitle: "배열 인덱스 범위 — off-by-one",
    keyConceptDescription: "크기 N인 배열: 인덱스 0~N-1. 반복 조건: i < N (i<=N이면 범위 초과!). 이 off-by-one 오류는 매우 흔한 버그입니다.",
    relatedTopics: ["for loop", "배열 인덱스", "off-by-one", "범위 초과"],
  },
  {
    id: 657,
    lessonId: "cpp-7",
    difficulty: "어려움",
    question: "다음 코드는 1~N에서 합이 10 이하인 쌍 (i,j)의 수를 셉니다. N=5일 때 출력 결과는?",
    code: `int N = 5, count = 0;
for (int i = 1; i <= N; i++) {
    for (int j = i; j <= N; j++) {
        if (i + j <= 10) count++;
    }
}
cout << count;`,
    options: ["14", "15", "10", "25"],
    correctAnswer: 1,
    explanation: "j는 i부터 시작해 중복 쌍을 방지합니다. N=5일 때: i=1→j=1~5(5쌍), i=2→j=2~5(4쌍), i=3→j=3~5(3쌍), i=4→j=4~5(2쌍), i=5→j=5(1쌍). 모든 합이 ≤10이므로 5+4+3+2+1 = 15.",
    keyConceptTitle: "중첩 루프 — 쌍 세기 패턴",
    keyConceptDescription: "j=i부터 시작하면 (i,j)와 (j,i) 중복을 방지합니다. USACO에서 쌍 카운팅에 자주 사용되는 패턴입니다.",
    relatedTopics: ["중첩 for loop", "쌍 카운팅", "USACO"],
  },
  {
    id: 658,
    lessonId: "cpp-21",
    difficulty: "어려움",
    question: "N×M 격자 각 행의 합을 출력하는 코드에서 빈칸에 들어갈 알맞은 코드는?",
    code: `int grid[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
int N=3, M=3;
for (int i = 0; i < N; i++) {
    int rowSum = 0;
    /* 빈칸 */
    cout << rowSum << "\\n";
}`,
    options: [
      "for (int j = 0; j < M; j++) rowSum += grid[i][j];",
      "for (int j = 0; j < M; j++) rowSum += grid[j][i];",
      "rowSum = grid[i][0] + grid[i][M];",
      "for (int j = 1; j <= M; j++) rowSum += grid[i][j];",
    ],
    correctAnswer: 0,
    explanation: "행 합계: 같은 i, j를 0~M-1까지 순회. grid[i][j]가 올바른 접근입니다. grid[j][i]는 열 합계, grid[i][M]은 범위 초과.",
    keyConceptTitle: "2D 배열 행 순회",
    keyConceptDescription: "2D 배열 행 합계: for(j=0..M-1) sum += grid[i][j]. USACO 격자 문제의 기본 패턴입니다.",
    relatedTopics: ["2D 배열", "중첩 for loop", "격자", "USACO"],
  },
  {
    id: 659,
    lessonId: "cpp-7",
    difficulty: "어려움",
    question: "중첩 루프에서 바깥 루프도 탈출하려 할 때 올바른 패턴은? (i*j > 10인 첫 번째 쌍을 출력하고 종료)",
    code: `// i*j 값이 10을 넘는 첫 번째 (i,j)를 찾으면 두 루프 종료
bool found = false;
for (int i = 1; i <= 5 && !found; i++) {
    for (int j = 1; j <= 5; j++) {
        if (i * j > 10) {
            cout << i << " " << j;
            /* 빈칸 */
        }
    }
}`,
    options: [
      "found = true; break;",
      "break; break;",
      "return;",
      "goto end;",
    ],
    correctAnswer: 0,
    explanation: "C++에는 이중 break가 없습니다. found=true로 플래그를 세우고 break하면 안쪽 루프를 탈출합니다. 바깥 루프 조건 '&&!found'가 false가 돼 바깥 루프도 종료됩니다.",
    keyConceptTitle: "중첩 루프 완전 탈출 — flag 패턴",
    keyConceptDescription: "이중 break는 없습니다. bool found=false 플래그 + 바깥 루프 조건에 &&!found를 추가하는 패턴을 사용합니다.",
    relatedTopics: ["break", "중첩 루프 탈출", "flag 패턴", "USACO"],
  },
  // ── cpp-23 sort 마스터 보강 (IDs 660–673) ──────────────────────────────────
  {
    id: 660,
    lessonId: "cpp-23",
    difficulty: "쉬움",
    question: "벡터 v = {3, 1, 4, 1, 5}를 오름차순 정렬하는 올바른 코드는?",
    code: `#include <algorithm>
vector<int> v = {3, 1, 4, 1, 5};
// 빈칸`,
    options: [
      "sort(v.begin(), v.end());",
      "sort(v);",
      "v.sort();",
      "std::order(v.begin(), v.end());",
    ],
    correctAnswer: 0,
    explanation: "sort()는 <algorithm>에 있으며 반드시 begin()과 end()를 인자로 전달합니다. v.sort()는 없고, sort(v)도 올바르지 않습니다.",
    keyConceptTitle: "sort() 기본 사용법",
    keyConceptDescription: "sort(v.begin(), v.end()) — 기본 오름차순 정렬. 반복자 범위를 인자로 전달합니다.",
    relatedTopics: ["sort", "vector", "algorithm"],
  },
  {
    id: 661,
    lessonId: "cpp-23",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());
cout << v[0] << " " << v[4];`,
    options: ["1 9", "5 9", "1 5", "9 1"],
    correctAnswer: 0,
    explanation: "오름차순 정렬 후: {1, 2, 5, 8, 9}. v[0]=1(최솟값), v[4]=9(최댓값).",
    keyConceptTitle: "sort 후 인덱스 접근",
    keyConceptDescription: "sort 후 v[0]은 최솟값, v[v.size()-1]은 최댓값입니다.",
    relatedTopics: ["sort", "오름차순", "인덱스"],
  },
  {
    id: 662,
    lessonId: "cpp-23",
    difficulty: "쉬움",
    question: "벡터를 내림차순으로 정렬하는 올바른 코드는?",
    code: `vector<int> v = {3, 1, 4, 1, 5};
// 내림차순 정렬`,
    options: [
      "sort(v.begin(), v.end(), greater<int>());",
      "sort(v.end(), v.begin());",
      "sort(v.begin(), v.end(), less<int>());",
      "reverse_sort(v.begin(), v.end());",
    ],
    correctAnswer: 0,
    explanation: "세 번째 인자로 greater<int>()를 전달하면 내림차순 정렬됩니다. sort(end, begin)은 유효하지 않고, less<int>()는 기본값(오름차순)과 같습니다.",
    keyConceptTitle: "내림차순 정렬 — greater<T>()",
    keyConceptDescription: "내림차순: sort(v.begin(), v.end(), greater<int>()). 또는 sort 후 reverse(v.begin(), v.end())도 가능합니다.",
    relatedTopics: ["sort", "greater", "내림차순"],
  },
  {
    id: 663,
    lessonId: "cpp-23",
    difficulty: "쉬움",
    question: "문자열 벡터를 사전순(알파벳 순)으로 정렬할 때 올바른 코드는?",
    code: `vector<string> words = {"banana", "apple", "cherry"};
sort(/* 빈칸 */);
cout << words[0];`,
    options: [
      "words.begin(), words.end()",
      "words.begin(), words.end(), greater<string>()",
      "words.begin(), words.end(), [](string a, string b){ return a.size()<b.size(); }",
      "words.rbegin(), words.rend()",
    ],
    correctAnswer: 0,
    explanation: "string도 기본 sort()로 사전순 정렬됩니다. 결과: apple, banana, cherry → words[0] = 'apple'.",
    keyConceptTitle: "string 벡터 정렬",
    keyConceptDescription: "vector<string>도 sort(v.begin(), v.end())로 사전순 정렬됩니다. string은 기본적으로 알파벳 순 비교를 지원합니다.",
    relatedTopics: ["sort", "string", "사전순"],
  },
  {
    id: 664,
    lessonId: "cpp-23",
    difficulty: "쉬움",
    question: "배열 arr[5]를 sort()로 정렬하는 올바른 코드는?",
    code: `int arr[5] = {5, 2, 8, 1, 9};
// 배열 정렬`,
    options: [
      "sort(arr, arr + 5);",
      "sort(arr.begin(), arr.end());",
      "sort(&arr, &arr + 5);",
      "arr.sort();",
    ],
    correctAnswer: 0,
    explanation: "배열은 포인터 산술을 사용합니다. arr는 첫 원소 주소, arr+5는 끝 주소. 배열에는 begin()/end() 멤버 함수가 없습니다.",
    keyConceptTitle: "배열 sort — 포인터 사용",
    keyConceptDescription: "배열 정렬: sort(arr, arr+N). 벡터와 달리 포인터 산술로 범위를 지정합니다.",
    relatedTopics: ["sort", "배열", "포인터"],
  },
  {
    id: 665,
    lessonId: "cpp-23",
    difficulty: "쉬움",
    question: "정렬된 벡터 {1,2,3,4,5}를 역순({5,4,3,2,1})으로 만드는 가장 간단한 방법은?",
    code: `vector<int> v = {1, 2, 3, 4, 5};
// 역순으로 만들기`,
    options: [
      "reverse(v.begin(), v.end());",
      "sort(v.begin(), v.end(), greater<int>());",
      "sort(v.rbegin(), v.rend());",
      "v.flip();",
    ],
    correctAnswer: 0,
    explanation: "이미 정렬된 벡터를 역순으로 만들 때는 reverse()가 가장 직접적입니다. sort()도 결과는 같지만 O(n log n)이라 비효율적입니다.",
    keyConceptTitle: "reverse() — 순서 뒤집기",
    keyConceptDescription: "reverse(v.begin(), v.end()): O(n)으로 벡터를 역순으로 만듭니다. <algorithm>에 있습니다.",
    relatedTopics: ["reverse", "sort", "algorithm"],
  },
  {
    id: 666,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "비교 함수를 직접 작성해 내림차순 정렬하려 한다. 올바른 비교 함수는?",
    code: `vector<int> v = {3, 1, 4, 1, 5};
bool cmp(int a, int b) {
    return /* 빈칸 */;
}
sort(v.begin(), v.end(), cmp);`,
    options: ["a > b", "a < b", "a >= b", "a != b"],
    correctAnswer: 0,
    explanation: "sort의 비교 함수는 'a가 b보다 앞에 와야 하면 true'를 반환합니다. 내림차순은 큰 값이 앞에 오므로 a > b를 반환합니다.",
    keyConceptTitle: "커스텀 비교 함수",
    keyConceptDescription: "비교 함수 규칙: return true이면 a가 b보다 앞에 배치됩니다. 오름차순: a<b, 내림차순: a>b.",
    relatedTopics: ["sort", "comparator", "커스텀 정렬"],
  },
  {
    id: 667,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "학생을 성적 내림차순으로 정렬하는 람다로 올바른 것은?",
    code: `struct Student {
    string name;
    int score;
};
vector<Student> students = {{"Alice",85},{"Bob",92},{"Carol",78}};
sort(students.begin(), students.end(), /* 빈칸 */);`,
    options: [
      "[](const Student& a, const Student& b){ return a.score > b.score; }",
      "[](const Student& a, const Student& b){ return a.score < b.score; }",
      "[](Student a, Student b){ return a.score; }",
      "greater<Student>()",
    ],
    correctAnswer: 0,
    explanation: "람다로 struct 멤버를 기준으로 정렬합니다. 내림차순이므로 a.score > b.score. const 참조(&)를 사용하면 복사 비용을 줄입니다.",
    keyConceptTitle: "struct 람다 정렬",
    keyConceptDescription: "sort(v.begin(), v.end(), [](const T& a, const T& b){ return a.field > b.field; }) — struct 멤버 기준 정렬 패턴.",
    relatedTopics: ["sort", "lambda", "struct", "커스텀 정렬"],
  },
  {
    id: 668,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "stable_sort와 sort의 차이로 올바른 것은?",
    code: `// 점수가 같은 경우 원래 순서 유지 여부 확인
vector<pair<int,string>> v = {{90,"B"},{80,"A"},{90,"C"},{80,"D"}};
// stable_sort로 점수 내림차순 정렬 시 결과?`,
    options: [
      "점수 같으면 원래 순서 유지: {90,B},{90,C},{80,A},{80,D}",
      "점수 같으면 이름순 정렬: {90,B},{90,C},{80,A},{80,D}",
      "sort와 동일: 순서 보장 없음",
      "stable_sort는 내림차순 정렬을 지원하지 않음",
    ],
    correctAnswer: 0,
    explanation: "stable_sort는 동일한 키를 가진 원소들의 상대적 순서를 유지합니다(안정 정렬). 점수 90인 B와 C는 원래 순서(B→C)를 유지합니다.",
    keyConceptTitle: "stable_sort — 안정 정렬",
    keyConceptDescription: "stable_sort: 동일 키 원소의 상대 순서 보장(안정). sort: 동일 키 원소의 순서 불보장(불안정). 시간복잡도: stable_sort O(n log² n) vs sort O(n log n).",
    relatedTopics: ["stable_sort", "sort", "안정 정렬"],
  },
  {
    id: 669,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "문자열을 길이 기준 오름차순으로 정렬하는 람다는?",
    code: `vector<string> words = {"banana", "cat", "apple", "hi"};
sort(words.begin(), words.end(), /* 빈칸 */);
cout << words[0];`,
    options: [
      "[](const string& a, const string& b){ return a.size() < b.size(); }",
      "[](const string& a, const string& b){ return a < b; }",
      "[](const string& a, const string& b){ return a.length() > b.length(); }",
      "[](string a, string b){ return a.size(); }",
    ],
    correctAnswer: 0,
    explanation: "길이 오름차순: a.size() < b.size(). 정렬 결과: hi(2), cat(3), apple(5), banana(6). words[0] = 'hi'.",
    keyConceptTitle: "람다 — 문자열 길이 정렬",
    keyConceptDescription: "문자열 길이 정렬: sort(v.begin(), v.end(), [](const string& a, const string& b){ return a.size() < b.size(); }).",
    relatedTopics: ["sort", "lambda", "string", "size()"],
  },
  {
    id: 670,
    lessonId: "cpp-23",
    difficulty: "보통",
    question: "점수 내림차순, 점수 같으면 이름 오름차순으로 정렬하는 람다는?",
    code: `struct Student { string name; int score; };
vector<Student> v = {{"B",90},{"A",90},{"C",80}};
sort(v.begin(), v.end(), /* 빈칸 */);`,
    options: [
      "[](const Student& a, const Student& b){ return a.score != b.score ? a.score > b.score : a.name < b.name; }",
      "[](const Student& a, const Student& b){ return a.score > b.score && a.name < b.name; }",
      "[](const Student& a, const Student& b){ return a.score > b.score || a.name < b.name; }",
      "[](const Student& a, const Student& b){ return a.score > b.score; }",
    ],
    correctAnswer: 0,
    explanation: "다중 키 정렬: 첫 번째 키(score)가 다르면 그 기준으로, 같으면 두 번째 키(name)로 정렬합니다. 삼항 연산자로 간결하게 표현합니다.",
    keyConceptTitle: "다중 키 정렬 (Multi-key Sort)",
    keyConceptDescription: "다중 키: a.key1 != b.key1 ? a.key1 > b.key1 : a.key2 < b.key2. USACO에서 자주 사용하는 패턴입니다.",
    relatedTopics: ["sort", "lambda", "다중 키 정렬", "USACO"],
  },
  {
    id: 671,
    lessonId: "cpp-23",
    difficulty: "어려움",
    question: "구간 [l, r]을 시작점 오름차순, 같으면 끝점 오름차순으로 정렬하는 코드는?",
    code: `vector<pair<int,int>> intervals = {{1,4},{2,3},{1,2},{3,5}};
// 시작점 오름차순, 같으면 끝점 오름차순
sort(intervals.begin(), intervals.end(), /* 빈칸 */);`,
    options: [
      "[](const pair<int,int>& a, const pair<int,int>& b){ return a.first != b.first ? a.first < b.first : a.second < b.second; }",
      "greater<pair<int,int>>()",
      "[](const pair<int,int>& a, const pair<int,int>& b){ return a.first < b.first; }",
      "[](const pair<int,int>& a, const pair<int,int>& b){ return a.first < b.first && a.second < b.second; }",
    ],
    correctAnswer: 0,
    explanation: "시작점이 다르면 시작점으로, 같으면 끝점으로 정렬합니다. 사실 pair의 기본 정렬도 이와 동일하지만, 명시적 람다가 더 읽기 쉽습니다. 결과: {1,2},{1,4},{2,3},{3,5}.",
    keyConceptTitle: "구간 정렬 (USACO 패턴)",
    keyConceptDescription: "구간 문제에서 [시작, 끝] pair를 시작점→끝점 순으로 정렬하는 것은 그리디 알고리즘의 기본 전처리 단계입니다.",
    relatedTopics: ["sort", "pair", "구간 정렬", "USACO", "그리디"],
  },
  {
    id: 672,
    lessonId: "cpp-23",
    difficulty: "어려움",
    question: "버블 정렬로 {5, 3, 8, 1}을 정렬할 때 첫 번째 패스(바깥 루프 1회) 후 배열 상태는?",
    code: `int arr[4] = {5, 3, 8, 1};
// 버블 정렬 1 패스
for (int j = 0; j < 3; j++) {
    if (arr[j] > arr[j+1])
        swap(arr[j], arr[j+1]);
}`,
    options: ["{3, 5, 1, 8}", "{1, 3, 5, 8}", "{3, 5, 8, 1}", "{5, 1, 3, 8}"],
    correctAnswer: 0,
    explanation: "j=0: 5>3 → swap → {3,5,8,1}. j=1: 5<8 → no swap → {3,5,8,1}. j=2: 8>1 → swap → {3,5,1,8}. 첫 패스 후 최댓값 8이 맨 끝으로 이동합니다.",
    keyConceptTitle: "버블 정렬 1 패스",
    keyConceptDescription: "버블 정렬: 인접 원소를 비교/교환. 1 패스마다 최댓값이 끝으로 이동합니다. N-1 패스 후 완전 정렬.",
    relatedTopics: ["버블 정렬", "swap", "수동 정렬"],
  },
  {
    id: 673,
    lessonId: "cpp-23",
    difficulty: "어려움",
    question: "N개 원소에서 상위 K개만 빠르게 구하려 한다. O(N + K log N) 복잡도인 방법은?",
    code: `vector<int> v = {3,1,4,1,5,9,2,6};
int K = 3;
// 상위 K개(가장 큰 K개)를 구하는 방법`,
    options: [
      "partial_sort(v.begin(), v.begin()+K, v.end(), greater<int>());",
      "sort(v.begin(), v.end(), greater<int>()); // 전체 정렬 후 앞 K개",
      "nth_element(v.begin(), v.begin()+K, v.end());",
      "priority_queue<int> pq(v.begin(), v.end()); // K번 pop",
    ],
    correctAnswer: 0,
    explanation: "partial_sort: 전체를 정렬하지 않고 앞 K개만 정렬된 상태로 만듭니다. 복잡도 O(N log K). 전체 sort는 O(N log N)으로 더 느립니다.",
    keyConceptTitle: "partial_sort — 부분 정렬",
    keyConceptDescription: "partial_sort(first, middle, last): [first, last) 범위에서 상위 원소를 [first, middle)에 정렬된 상태로 배치. 상위 K개만 필요할 때 효율적.",
    relatedTopics: ["partial_sort", "sort", "algorithm", "성능"],
  },
  // ── cpp-6 조건문 보강 (IDs 632–646) ──────────────────────────────────────
  {
    id: 632,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "점수 score가 60 이상이고 90 이하일 때 'B등급'을 출력하려 한다. 빈칸에 들어갈 조건은?",
    code: `int score = 75;
if (/* 빈칸 */) {
    cout << "B등급";
}`,
    options: [
      "score >= 60 && score <= 90",
      "score >= 60 || score <= 90",
      "60 <= score <= 90",
      "score >= 60 & score <= 90",
    ],
    correctAnswer: 0,
    explanation: "'60 이상이고 90 이하'는 두 조건을 모두 만족해야 하므로 &&를 사용합니다. '60 <= score <= 90' 같은 수학적 표기는 C++에서 허용되지 않습니다.",
    keyConceptTitle: "범위 조건 — &&",
    keyConceptDescription: "범위 검사는 반드시 두 비교를 &&로 연결합니다: score >= 60 && score <= 90.",
    relatedTopics: ["&&", "논리 연산자", "범위 조건"],
  },
  {
    id: 633,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `int x = 50;
if (x >= 0 && x <= 100) {
    cout << "valid";
} else {
    cout << "invalid";
}`,
    options: ["valid", "invalid", "50", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "x=50은 0 이상이고 100 이하이므로 두 조건 모두 참 → && 결과도 참 → 'valid' 출력.",
    keyConceptTitle: "&&로 범위 검사",
    keyConceptDescription: "0 ≤ x ≤ 100 범위 검사: x >= 0 && x <= 100. 둘 다 참이어야 전체가 참입니다.",
    relatedTopics: ["&&", "범위 조건", "if-else"],
  },
  {
    id: 634,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "day가 6(토요일) 이거나 7(일요일)이면 'weekend'를 출력하는 코드로 올바른 것은?",
    code: `int day = 6;
// 이 중 올바른 것은?`,
    options: [
      "if (day == 6 || day == 7) cout << \"weekend\";",
      "if (day == 6 && day == 7) cout << \"weekend\";",
      "if (day == 6 or 7) cout << \"weekend\";",
      "if (day == (6 || 7)) cout << \"weekend\";",
    ],
    correctAnswer: 0,
    explanation: "'6 이거나 7'은 OR 조건이므로 ||를 사용합니다. day == 6 && day == 7은 동시에 두 값이 될 수 없어 항상 거짓입니다.",
    keyConceptTitle: "OR 조건 — ||",
    keyConceptDescription: "여러 값 중 하나인지 검사할 때는 || 사용: day == 6 || day == 7.",
    relatedTopics: ["||", "논리 연산자", "if문"],
  },
  {
    id: 635,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "다음 switch문에서 grade가 'B'일 때 출력 결과는?",
    code: `char grade = 'B';
switch (grade) {
    case 'A': cout << "Excellent";
    case 'B': cout << "Good";
    case 'C': cout << "Pass";
    default:  cout << "?";
}`,
    options: ["Good", "GoodPass?", "GoodPass", "Pass?"],
    correctAnswer: 1,
    explanation: "break가 없으면 해당 case 이후 모든 case가 연속 실행됩니다(fall-through). 'B'에서 시작해 'C', default까지 전부 실행 → 'GoodPass?'.",
    keyConceptTitle: "switch fall-through",
    keyConceptDescription: "case 뒤에 break;를 생략하면 다음 case로 계속 실행됩니다(fall-through). 의도적인 경우 외에는 반드시 break를 넣으세요.",
    relatedTopics: ["switch", "fall-through", "break"],
  },
  {
    id: 636,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "나이 age가 18세 이상이어야 입장 가능할 때 올바른 조건은?",
    code: `int age = 18;
if (/* 빈칸 */) {
    cout << "입장 가능";
}`,
    options: ["age >= 18", "age > 18", "age > 17", "age == 18"],
    correctAnswer: 0,
    explanation: "'18 이상'은 18을 포함하므로 >=를 사용합니다. age > 18이면 18세는 입장 불가입니다.",
    keyConceptTitle: ">= 와 > 구분",
    keyConceptDescription: "'이상'은 >=, '초과'는 >. 경계값이 포함되는지 항상 확인하세요.",
    relatedTopics: ["비교 연산자", ">=", ">", "경계값"],
  },
  {
    id: 637,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `int x = 15;
if (x > 10) {
    if (x > 20) {
        cout << "A";
    } else {
        cout << "B";
    }
} else {
    cout << "C";
}`,
    options: ["A", "B", "C", "AB"],
    correctAnswer: 1,
    explanation: "x=15는 10보다 크므로 outer if 진입. 그러나 15는 20 이하이므로 inner else → 'B' 출력.",
    keyConceptTitle: "중첩 if-else",
    keyConceptDescription: "if 안에 if가 있는 중첩 구조. 조건을 바깥→안쪽 순서로 평가합니다.",
    relatedTopics: ["중첩 if", "else", "조건문"],
  },
  {
    id: 638,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "소문자 알파벳인지 검사하는 조건으로 올바른 것은? (ASCII: 'a'=97, 'z'=122)",
    code: `char c = 'k';
if (/* 빈칸 */) {
    cout << "소문자";
}`,
    options: [
      "c >= 'a' && c <= 'z'",
      "c >= 'a' || c <= 'z'",
      "c > 'a' && c < 'z'",
      "'a' <= c <= 'z'",
    ],
    correctAnswer: 0,
    explanation: "소문자는 'a' 이상이고 'z' 이하인 범위입니다. &&로 두 조건을 연결합니다. c > 'a' && c < 'z'는 'a'와 'z' 자체를 제외해 틀립니다.",
    keyConceptTitle: "char 범위 검사",
    keyConceptDescription: "문자도 비교 연산자로 범위 검사 가능: c >= 'a' && c <= 'z'. 내부적으로 ASCII 값을 비교합니다.",
    relatedTopics: ["char", "ASCII", "&&", "범위 조건"],
  },
  {
    id: 639,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "두 수 중 더 큰 값을 출력하는 삼항 연산자로 올바른 것은?",
    code: `int a = 7, b = 3;
cout << /* 빈칸 */;`,
    options: [
      "a > b ? a : b",
      "a > b ? b : a",
      "a < b ? a : b",
      "a ? b : a > b",
    ],
    correctAnswer: 0,
    explanation: "삼항 연산자: 조건 ? 참일_때_값 : 거짓일_때_값. a>b가 참이면 a(큰 값)를 출력합니다.",
    keyConceptTitle: "삼항 연산자 — 최댓값",
    keyConceptDescription: "최댓값: a > b ? a : b. 조건이 참이면 ? 뒤, 거짓이면 : 뒤 값이 선택됩니다.",
    relatedTopics: ["삼항 연산자", "?:", "최댓값"],
  },
  {
    id: 640,
    lessonId: "cpp-6",
    difficulty: "보통",
    question: "다음 코드에서 x=5일 때 출력 결과는? (dangling else 주의)",
    code: `int x = 5;
if (x > 0)
    if (x > 10)
        cout << "big";
else
    cout << "negative";`,
    options: ["big", "negative", "아무것도 출력 안 됨", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "C++에서 else는 항상 가장 가까운 if와 짝을 이룹니다. 들여쓰기와 달리, 이 코드에서 else는 'if(x > 10)'과 짝입니다. x=5이면: outer if(x>0) → 참 → 진입, inner if(x>10) → 거짓 → else 실행 → 'negative' 출력됩니다.",
    keyConceptTitle: "dangling else",
    keyConceptDescription: "else는 항상 코드상 가장 가까운(짝이 없는) if와 연결됩니다. 들여쓰기에 속지 마세요. 명확하게 하려면 중괄호 {}를 사용하세요.",
    relatedTopics: ["dangling else", "중괄호", "if-else 규칙"],
  },
  {
    id: 641,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드가 런타임 오류(null 포인터) 없이 안전하게 동작하는 이유는?",
    code: `int* ptr = nullptr;
if (ptr != nullptr && *ptr > 0) {
    cout << "positive";
} else {
    cout << "safe";
}`,
    options: [
      "ptr != nullptr가 거짓이면 *ptr > 0은 평가하지 않기 때문",
      "&& 대신 ||를 써야 안전하다",
      "nullptr은 자동으로 0으로 변환되기 때문",
      "컴파일러가 자동으로 null 검사를 추가하기 때문",
    ],
    correctAnswer: 0,
    explanation: "&&의 단락 평가(short-circuit): 왼쪽이 false면 오른쪽은 실행하지 않습니다. ptr이 nullptr이면 *ptr을 역참조하지 않아 안전합니다.",
    keyConceptTitle: "단락 평가 (Short-Circuit Evaluation)",
    keyConceptDescription: "&& : 왼쪽이 false면 오른쪽 평가 생략. || : 왼쪽이 true면 오른쪽 평가 생략. 이를 이용해 null 포인터 역참조를 방지할 수 있습니다.",
    relatedTopics: ["단락 평가", "short-circuit", "&&", "nullptr"],
  },
  {
    id: 642,
    lessonId: "cpp-6",
    difficulty: "보통",
    question: "다음 코드에서 점수 85, 출석 true일 때 출력 결과는?",
    code: `int score = 85;
bool attendance = true;
if (score >= 90 || score >= 80 && attendance) {
    cout << "합격";
} else {
    cout << "불합격";
}`,
    options: ["합격", "불합격", "컴파일 오류", "결과 불확정"],
    correctAnswer: 0,
    explanation: "&&가 ||보다 우선순위가 높습니다. 따라서 (score>=90) || (score>=80 && attendance)로 평가됩니다. score=85, attendance=true → (false) || (true && true) → false || true → true → '합격'.",
    keyConceptTitle: "&& vs || 우선순위",
    keyConceptDescription: "C++에서 && > || 우선순위. score>=90 || score>=80 && attendance = score>=90 || (score>=80 && attendance). 헷갈리면 괄호를 명시하세요.",
    relatedTopics: ["&&", "||", "연산자 우선순위", "조건문"],
  },
  {
    id: 643,
    lessonId: "cpp-6",
    difficulty: "보통",
    question: "세 수 a, b, c를 오름차순으로 비교할 때 가장 큰 값을 찾는 코드로 올바른 것은?",
    code: `int a=3, b=7, c=5;
int maxVal;
// 빈칸`,
    options: [
      "if (a>b && a>c) maxVal=a; else if (b>c) maxVal=b; else maxVal=c;",
      "if (a>b || a>c) maxVal=a; else maxVal=b;",
      "if (a>b) maxVal=a; if (b>c) maxVal=b; if (c>a) maxVal=c;",
      "maxVal = a>b ? (a>c?a:c) : (b>c?b:c) == 7;",
    ],
    correctAnswer: 0,
    explanation: "a가 b보다 크고(&&) c보다도 크면 a가 최대. 그렇지 않으면 b와 c 중 큰 값을 else if로 판별합니다. 세 독립적인 if를 나열하면 모두 실행돼 마지막 조건만 남게 됩니다.",
    keyConceptTitle: "else if로 다중 조건 처리",
    keyConceptDescription: "상호 배타적인 경우를 처리할 때는 if-else if-else 체인을 사용합니다. 독립 if 여러 개는 모두 실행되므로 주의하세요.",
    relatedTopics: ["else if", "&&", "최댓값 탐색"],
  },
  {
    id: 644,
    lessonId: "cpp-6",
    difficulty: "보통",
    question: "다음 두 코드의 차이로 올바른 것은?",
    code: `// 코드 A
int x = 5;
if (x > 0) cout << "pos";
if (x > 3) cout << "big";

// 코드 B
if (x > 0) cout << "pos";
else if (x > 3) cout << "big";`,
    options: [
      "A는 조건이 맞으면 둘 다 출력, B는 첫 조건이 참이면 두 번째는 실행 안 함",
      "A와 B는 항상 같은 결과를 낸다",
      "B가 더 느리다",
      "A는 컴파일 오류가 난다",
    ],
    correctAnswer: 0,
    explanation: "코드 A: 두 if는 독립적으로 실행됩니다. x=5이면 'pos'와 'big' 둘 다 출력. 코드 B: else if는 앞의 if가 거짓일 때만 실행됩니다. x>0이 참이면 else if 블록은 건너뜁니다.",
    keyConceptTitle: "독립 if vs else if",
    keyConceptDescription: "독립 if: 각 조건을 모두 검사. else if: 앞 조건이 거짓일 때만 검사. 서로 배타적인 경우에는 else if를 사용합니다.",
    relatedTopics: ["if", "else if", "조건문 흐름"],
  },
  {
    id: 645,
    lessonId: "cpp-6",
    difficulty: "어려움",
    question: "다음 코드에서 a=3, b=3, c=3일 때 출력 결과는?",
    code: `int a=3, b=3, c=3;
if (a == b && b == c) {
    cout << "equal";
} else if (a == b || b == c || a == c) {
    cout << "two same";
} else {
    cout << "all diff";
}`,
    options: ["equal", "two same", "all diff", "equal\\ntwo same"],
    correctAnswer: 0,
    explanation: "a==b는 참, b==c도 참 → &&결과 참 → 첫 번째 if 진입. else if는 첫 번째 if가 참이므로 실행되지 않습니다. 출력: 'equal'.",
    keyConceptTitle: "if-else if 흐름 제어",
    keyConceptDescription: "if-else if 체인에서 첫 번째로 참인 조건만 실행됩니다. 나머지 조건은 건너뜁니다.",
    relatedTopics: ["if-else if", "&&", "=="],
  },
  {
    id: 646,
    lessonId: "cpp-6",
    difficulty: "어려움",
    question: "USACO 스타일 문제: N×M 격자에서 (r, c)가 유효한 칸인지 확인하는 함수로 올바른 것은?",
    code: `int N = 5, M = 5;
// (r, c)가 격자 안에 있으면 true를 반환하는 함수
bool inBounds(int r, int c) {
    return /* 빈칸 */;
}`,
    options: [
      "r >= 0 && r < N && c >= 0 && c < M",
      "r > 0 && r < N && c > 0 && c < M",
      "r >= 0 || r < N || c >= 0 || c < M",
      "0 <= r <= N && 0 <= c <= M",
    ],
    correctAnswer: 0,
    explanation: "격자 인덱스는 0부터 N-1(또는 M-1)까지입니다. r >= 0 (0 이상)이고 r < N (N 미만)이어야 합니다. 네 조건 모두 &&로 연결합니다. r > 0은 첫 번째 행(0)을 제외하므로 틀립니다.",
    keyConceptTitle: "격자 경계 검사 (USACO 패턴)",
    keyConceptDescription: "격자 경계 검사 패턴: r >= 0 && r < N && c >= 0 && c < M. 네 조건 모두 &&로 연결. 이 패턴은 BFS/DFS/시뮬레이션 문제에서 반복적으로 등장합니다.",
    relatedTopics: ["격자", "경계 검사", "&&", "USACO", "배열 인덱스"],
  },
  // ── cpp-5/8/11/18 어려움 보강 (IDs 695–710) ──────────────────────────────
  {
    id: 695,
    lessonId: "cpp-5",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 2, b = 3;
    int result = a + b * 2 - 1 % b;
    cout << result;
    return 0;
}`,
    options: ["8", "9", "7", "10"],
    correctAnswer: 2,
    explanation: "연산자 우선순위: *(곱셈)과 %(나머지)가 +,-보다 먼저 계산됩니다. b*2 = 3*2 = 6, 1%b = 1%3 = 1. 이후 왼쪽에서 오른쪽으로: a + 6 - 1 = 2 + 6 - 1 = 7.",
    keyConceptTitle: "연산자 우선순위",
    keyConceptDescription: "*, /, %는 +, -보다 우선순위가 높아 먼저 계산됩니다. 같은 우선순위면 왼쪽에서 오른쪽으로 계산합니다.",
  },
  {
    id: 696,
    lessonId: "cpp-5",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 5;
    int x = ++a;
    int y = a++;
    cout << x << " " << y << " " << a;
    return 0;
}`,
    options: ["6 6 7", "5 5 7", "6 5 7", "5 6 7"],
    correctAnswer: 0,
    explanation: "++a(전위): a를 먼저 6으로 증가시킨 후 x에 6을 대입. x=6, a=6. a++(후위): 현재 a값 6을 y에 대입한 후 a를 7로 증가. y=6, a=7. 출력: 6 6 7.",
    keyConceptTitle: "전위 vs 후위 증가 연산자",
    keyConceptDescription: "++a(전위): 증가 후 대입, 증가된 값 반환. a++(후위): 대입 후 증가, 원래 값 반환. 분리된 문장으로 사용해야 동작이 명확합니다.",
  },
  {
    id: 697,
    lessonId: "cpp-5",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int x = 0;

bool check() {
    x++;
    return true;
}

int main() {
    bool result = false && check();
    cout << x;
    return 0;
}`,
    options: ["0", "1", "2", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "&&(논리 AND)의 단락 평가(short-circuit): 왼쪽 피연산자가 false이면 오른쪽은 절대 평가되지 않습니다. false && check()에서 false이므로 check()는 호출되지 않고 x는 0 그대로입니다.",
    keyConceptTitle: "단락 평가(Short-Circuit Evaluation)",
    keyConceptDescription: "&&에서 왼쪽이 false면 오른쪽 미평가. ||에서 왼쪽이 true면 오른쪽 미평가. 부수 효과(side effect)가 있는 함수 호출 시 주의해야 합니다.",
  },
  {
    id: 698,
    lessonId: "cpp-5",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 10;
    a += 3;
    a *= 2;
    a -= a / 3;
    cout << a;
    return 0;
}`,
    options: ["18", "20", "16", "22"],
    correctAnswer: 0,
    explanation: "단계별로: a=10 → a+=3: a=13 → a*=2: a=26 → a-=a/3: a/3 = 26/3 = 8(정수 나눗셈), a=26-8=18. 출력: 18.",
    keyConceptTitle: "복합 대입 연산자와 정수 나눗셈",
    keyConceptDescription: "복합 대입 연산자(+=, *=, -=, /=)는 순서대로 실행됩니다. 정수형끼리의 /는 소수점 버림 정수 나눗셈입니다.",
  },
  {
    id: 699,
    lessonId: "cpp-8",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

void print(int a) {
    cout << "int: " << a << endl;
}

void print(double a) {
    cout << "double: " << a << endl;
}

int main() {
    print(3.0f);
    return 0;
}`,
    options: ["int: 3", "double: 3", "컴파일 오류: 모호한 호출", "int: 0"],
    correctAnswer: 1,
    explanation: "3.0f는 float 리터럴입니다. float에서 double로의 변환은 정밀도 손실 없는 승격(promotion)이고, float에서 int로의 변환은 축소 변환입니다. 승격이 우선하므로 double 버전이 호출됩니다. cout << 3.0f는 소수점 없이 '3'으로 출력됩니다.",
    keyConceptTitle: "함수 오버로딩 해석과 타입 승격",
    keyConceptDescription: "오버로딩 해석 시 float는 double로 승격됩니다. int로의 암시적 축소 변환보다 double로의 승격이 우선합니다.",
  },
  {
    id: 700,
    lessonId: "cpp-8",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

void swap(int a, int b) {
    int tmp = a;
    a = b;
    b = tmp;
}

int main() {
    int x = 1, y = 2;
    swap(x, y);
    cout << x << " " << y;
    return 0;
}`,
    options: ["2 1", "1 2", "0 0", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "이 swap 함수는 값에 의한 전달(pass by value)입니다. a와 b는 x와 y의 복사본이므로 함수 내에서 값이 바뀌어도 원본 x, y에는 영향이 없습니다. x=1, y=2 그대로 출력됩니다.",
    keyConceptTitle: "값에 의한 전달 (Pass by Value)",
    keyConceptDescription: "함수 매개변수는 기본적으로 복사본입니다. 원본을 수정하려면 참조(int& a) 또는 포인터를 사용해야 합니다.",
  },
  {
    id: 701,
    lessonId: "cpp-8",
    difficulty: "어려움",
    question: "다음 재귀 함수의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int f(int n) {
    if (n <= 1) return n;
    return f(n - 1) + f(n - 2);
}

int main() {
    cout << f(6);
    return 0;
}`,
    options: ["8", "13", "5", "21"],
    correctAnswer: 0,
    explanation: "이 함수는 피보나치 수열입니다. f(0)=0, f(1)=1, f(2)=1, f(3)=2, f(4)=3, f(5)=5, f(6) = f(5)+f(4) = 5+3 = 8.",
    keyConceptTitle: "피보나치 재귀 트레이싱",
    keyConceptDescription: "재귀 함수는 호출 트리를 그려 추적합니다. f(n) = f(n-1) + f(n-2)는 피보나치 수열: 0,1,1,2,3,5,8,13,...",
  },
  {
    id: 702,
    lessonId: "cpp-8",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int add(int a, int b = 10) {
    return a + b;
}

int add(int a) {
    return a + 100;
}

int main() {
    cout << add(5);
    return 0;
}`,
    options: ["15", "105", "컴파일 오류: 모호한 호출", "110"],
    correctAnswer: 2,
    explanation: "add(5)를 호출할 때 두 함수가 모두 매칭됩니다: add(int) 버전과 add(int, int=10)의 기본값 버전 모두 add(5)로 호출 가능합니다. 컴파일러는 어느 쪽을 선택해야 할지 알 수 없어 '모호한 호출' 오류가 발생합니다.",
    keyConceptTitle: "기본 매개변수와 오버로딩 충돌",
    keyConceptDescription: "기본 매개변수(default parameter)를 가진 함수와 다른 오버로딩 버전이 공존하면 호출이 모호해질 수 있습니다. 컴파일 오류로 이어집니다.",
  },
  {
    id: 703,
    lessonId: "cpp-11",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "hello world";
    size_t pos = s.find("xyz");
    if (pos == string::npos) {
        cout << "not found";
    } else {
        cout << pos;
    }
    return 0;
}`,
    options: ["not found", "0", "-1", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "find()가 찾는 문자열이 없으면 string::npos를 반환합니다. npos는 size_t 타입의 최대값(-1을 unsigned로 해석)입니다. pos == string::npos 비교가 참이므로 'not found'가 출력됩니다.",
    keyConceptTitle: "find()와 string::npos",
    keyConceptDescription: "find()가 문자열을 찾지 못하면 string::npos를 반환합니다. 반드시 == string::npos로 비교하고, -1과 직접 비교하면 안 됩니다(size_t는 unsigned).",
  },
  {
    id: 704,
    lessonId: "cpp-11",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "abcdefgh";
    string part = s.substr(s.find("cde"), 3);
    cout << part;
    return 0;
}`,
    options: ["cde", "cd", "cdef", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "s.find(\"cde\")는 인덱스 2를 반환합니다. s.substr(2, 3)은 인덱스 2부터 3글자를 추출합니다: 'c','d','e' → \"cde\".",
    keyConceptTitle: "find()와 substr() 연쇄 사용",
    keyConceptDescription: "substr(pos, len)은 pos 위치부터 len개의 문자를 추출합니다. find()의 반환값을 substr의 시작 위치로 바로 사용할 수 있습니다.",
  },
  {
    id: 705,
    lessonId: "cpp-11",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "aabbcc";
    s.replace(2, 2, "XYZ");
    cout << s;
    return 0;
}`,
    options: ["aaXYZcc", "aaXYZbcc", "aaXYZ", "aabbXYZ"],
    correctAnswer: 0,
    explanation: "replace(pos, len, new_str)는 pos 위치에서 len개의 문자를 new_str로 교체합니다. replace(2, 2, \"XYZ\")는 인덱스 2부터 2글자('b','b')를 \"XYZ\"(3글자)로 교체합니다. 결과: \"aa\" + \"XYZ\" + \"cc\" = \"aaXYZcc\".",
    keyConceptTitle: "replace()로 인한 인덱스 변화",
    keyConceptDescription: "replace(pos, len, str)은 len글자를 str로 교체합니다. 교체 전후 문자열 길이가 달라질 수 있으므로 이후 인덱스 연산 시 주의해야 합니다.",
  },
  {
    id: 706,
    lessonId: "cpp-11",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string a = "apple";
    string b = "banana";
    int result = a.compare(b);
    if (result < 0) cout << "a < b";
    else if (result > 0) cout << "a > b";
    else cout << "a == b";
    return 0;
}`,
    options: ["a < b", "a > b", "a == b", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "compare()는 사전 순으로 비교합니다. 'a'(97)는 'b'(98)보다 작으므로 \"apple\"이 \"banana\"보다 사전 순으로 앞에 옵니다. result < 0이 참이므로 'a < b'가 출력됩니다.",
    keyConceptTitle: "compare() 반환값 해석",
    keyConceptDescription: "a.compare(b): 반환값이 0이면 같음, 음수이면 a가 사전 순으로 앞, 양수이면 a가 사전 순으로 뒤에 위치합니다.",
  },
  {
    id: 707,
    lessonId: "cpp-18",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(3);
    pq.push(1);
    pq.push(4);
    pq.push(1);
    pq.push(5);
    while (!pq.empty()) {
        cout << pq.top() << " ";
        pq.pop();
    }
    return 0;
}`,
    options: ["5 4 3 1 1", "1 1 3 4 5", "3 1 4 1 5", "5 3 4 1 1"],
    correctAnswer: 0,
    explanation: "priority_queue<int>는 기본적으로 최대 힙(max-heap)입니다. 가장 큰 값이 top()에 위치합니다. 5 → 4 → 3 → 1 → 1 순서로 pop되어 출력됩니다.",
    keyConceptTitle: "priority_queue 기본: 최대 힙",
    keyConceptDescription: "priority_queue<int>는 max-heap이므로 가장 큰 값이 먼저 나옵니다. min-heap을 원하면 priority_queue<int, vector<int>, greater<int>>를 사용합니다.",
  },
  {
    id: 708,
    lessonId: "cpp-18",
    difficulty: "어려움",
    question: "다음 코드는 괄호 문자열이 올바른지 검사합니다. 입력이 \"(()\" 일 때 출력 결과는?",
    code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s = "(()";
    stack<char> st;
    bool valid = true;
    for (char c : s) {
        if (c == '(') st.push(c);
        else if (c == ')') {
            if (st.empty()) { valid = false; break; }
            st.pop();
        }
    }
    if (!st.empty()) valid = false;
    cout << (valid ? "YES" : "NO");
    return 0;
}`,
    options: ["YES", "NO", "컴파일 오류", "런타임 오류"],
    correctAnswer: 1,
    explanation: "\"(()\"를 처리합니다: '(' → push, '(' → push, ')' → pop. 루프 종료 후 스택에 '('가 1개 남아있습니다. !st.empty()가 참이므로 valid=false. 출력: 'NO'.",
    keyConceptTitle: "스택으로 괄호 유효성 검사",
    keyConceptDescription: "올바른 괄호 검사: '(' → push, ')' → 스택이 비면 invalid, 아니면 pop. 루프 후 스택이 비어있어야 valid. 짝이 안 맞으면 NO.",
  },
  {
    id: 709,
    lessonId: "cpp-18",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <stack>
#include <queue>
using namespace std;

int main() {
    stack<int> st;
    queue<int> q;
    for (int i = 1; i <= 3; i++) {
        st.push(i);
        q.push(i);
    }
    cout << st.top() << " " << q.front();
    st.pop(); q.pop();
    cout << " " << st.top() << " " << q.front();
    return 0;
}`,
    options: ["3 1 2 2", "1 1 2 2", "3 3 2 2", "1 3 2 2"],
    correctAnswer: 0,
    explanation: "1,2,3을 push합니다. stack은 LIFO: top()=3. queue는 FIFO: front()=1. 각각 pop 후: stack top()=2, queue front()=2. 출력: '3 1 2 2'.",
    keyConceptTitle: "스택(LIFO) vs 큐(FIFO) 비교",
    keyConceptDescription: "스택: top()은 마지막에 넣은 값(LIFO). 큐: front()는 처음 넣은 값(FIFO). pop() 후 다음 원소가 각 구조에 따라 다릅니다.",
  },
  {
    id: 710,
    lessonId: "cpp-18",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_back(1);
    dq.push_front(2);
    dq.push_back(3);
    dq.push_front(4);
    cout << dq.front() << " " << dq.back();
    dq.pop_front();
    dq.pop_back();
    cout << " " << dq.front() << " " << dq.back();
    return 0;
}`,
    options: ["4 3 2 1", "1 4 2 3", "4 3 1 3", "2 3 2 1"],
    correctAnswer: 0,
    explanation: "push_back(1): [1]. push_front(2): [2,1]. push_back(3): [2,1,3]. push_front(4): [4,2,1,3]. front()=4, back()=3. pop_front() → [2,1,3]. pop_back() → [2,1]. front()=2, back()=1. 출력: '4 3 2 1'.",
    keyConceptTitle: "deque 앞/뒤 삽입 및 삭제",
    keyConceptDescription: "deque는 양쪽 끝에서 O(1) 삽입/삭제가 가능합니다. push_front/pop_front는 앞쪽, push_back/pop_back은 뒤쪽을 조작합니다.",
  },
  // ── cpp-4 어려움 보강 ──────────────────────────────────
  {
    id: 711,
    lessonId: "cpp-4",
    difficulty: "어려움",
    question: `다음 코드에서 cin.ignore()를 제거했을 때 name에 저장되는 값은?`,
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    int age;
    string name;
    cin >> age;
    // cin.ignore(); // 제거됨
    getline(cin, name);
    cout << "[" << name << "]";
    return 0;
}`,
    options: ["입력 값(25 Alice)에서 [Alice]", "[]", "[25]", "런타임 오류"],
    correctAnswer: 1,
    explanation: "cin >> age 후 개행(\\n)이 버퍼에 남습니다. cin.ignore()가 없으면 getline이 즉시 이 개행을 읽어 name은 빈 문자열이 됩니다.",
    keyConceptTitle: "cin과 getline 혼용 — 버퍼 개행 문제",
    keyConceptDescription: "cin >> 다음 getline을 사용하려면 cin.ignore()로 버퍼의 개행을 먼저 제거해야 합니다.",
  },
  {
    id: 712,
    lessonId: "cpp-4",
    difficulty: "어려움",
    question: `다음 코드에서 입력이 "3.14abc" 한 줄일 때 출력 결과는?`,
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    double d;
    string s;
    cin >> d >> s;
    cout << d << " " << s;
    return 0;
}`,
    options: ["3.14 abc", "3.14 (공백 후 끝)", "0 3.14abc", "런타임 오류"],
    correctAnswer: 0,
    explanation: "cin >> d는 숫자 부분 3.14만 읽고 알파벳에서 멈춥니다. 버퍼에 abc가 남고 cin >> s가 이를 읽어 s = \"abc\"가 됩니다.",
    keyConceptTitle: "cin의 타입별 파싱",
    keyConceptDescription: "cin >>는 해당 타입으로 해석 가능한 부분까지만 읽습니다. 나머지는 버퍼에 남아 다음 cin >>가 읽습니다.",
  },
  {
    id: 713,
    lessonId: "cpp-9",
    difficulty: "어려움",
    question: `다음 코드에서 n=2이고 입력이 각각 "hello world", "foo bar"일 때 출력은?`,
    code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;
int main() {
    int n; cin >> n; cin.ignore();
    vector<string> lines(n);
    for (int i = 0; i < n; i++)
        getline(cin, lines[i]);
    cout << lines[0] << "|" << lines[1];
    return 0;
}`,
    options: ["hello world|foo bar", "hello|foo", "world|bar", "hello world| (두 번째 줄 없음)"],
    correctAnswer: 0,
    explanation: "cin >> n 후 cin.ignore()로 개행을 제거했으므로 getline이 각 줄을 공백 포함 완전히 읽습니다. lines[0]=\"hello world\", lines[1]=\"foo bar\".",
    keyConceptTitle: "getline으로 공백 포함 여러 줄 입력",
    keyConceptDescription: "getline은 개행 전의 모든 문자(공백 포함)를 읽습니다. cin >>와 함께 쓸 때는 cin.ignore()가 필수입니다.",
  },
  // ── cpp-10 어려움 보강 ──────────────────────────────────
  {
    id: 714,
    lessonId: "cpp-12",
    difficulty: "어려움",
    question: `다음 코드의 출력 결과는?`,
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (auto& x : v) x *= 2;
    for (auto x : v) cout << x << " ";
    return 0;
}`,
    options: ["1 2 3 4 5 ", "2 4 6 8 10 ", "2 4 6 8 10 (첫 루프만 복사본 수정)", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "auto& x : v는 참조로 받아 원본을 수정합니다. 첫 루프에서 모든 요소가 2배가 되고 두 번째 루프에서 2 4 6 8 10이 출력됩니다.",
    keyConceptTitle: "auto vs auto& in range-for",
    keyConceptDescription: "auto x는 복사본(원본 불변), auto& x는 참조(원본 수정 가능). 원소 수정이 목적이면 반드시 & 를 붙이세요.",
  },
  {
    id: 715,
    lessonId: "cpp-12",
    difficulty: "어려움",
    question: `다음 코드의 출력 결과는?`,
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<vector<int>> mat = {{1,2,3},{4,5,6},{7,8,9}};
    int sum = 0;
    for (const auto& row : mat)
        for (auto val : row)
            sum += val;
    cout << sum;
    return 0;
}`,
    options: ["45", "15", "0", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "const auto& row로 각 행을 참조, auto val로 각 열 값을 복사합니다. 1+2+3+4+5+6+7+8+9 = 45.",
    keyConceptTitle: "중첩 컨테이너 range-for 순회",
    keyConceptDescription: "외부 루프는 const auto&로 복사 비용 절감, 내부 루프는 auto로 값 접근하는 패턴이 일반적입니다.",
  },
  {
    id: 716,
    lessonId: "cpp-17",
    difficulty: "어려움",
    question: `다음 코드에서 auto 추론 타입에 대한 설명 중 잘못된 것은?`,
    code: `vector<int> v = {1, 2, 3};
auto a = v[0];        // (A)
auto& b = v[0];       // (B)
const auto c = v[0];  // (C)
auto it = v.begin();  // (D)`,
    options: [
      "(A): int — v[0]의 복사",
      "(B): int& — 참조, b 수정 시 v[0]도 변경됨",
      "(C): const int — 수정 불가",
      "(D): int — begin()이 int를 반환하므로",
    ],
    correctAnswer: 3,
    explanation: "v.begin()은 vector<int>::iterator 타입을 반환합니다. auto it의 추론 타입은 int가 아니라 iterator입니다.",
    keyConceptTitle: "auto 타입 추론 — iterator",
    keyConceptDescription: "begin()처럼 복잡한 반환 타입을 가진 함수에 auto를 쓰면 실제 타입이 정확히 추론됩니다. int가 아닌 iterator입니다.",
  },
  // ===== lessonId "cpp-10": Range-for & auto =====
  {
    id: 717,
    lessonId: "cpp-10",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30};
    for (auto x : v) {
        cout << x << " ";
    }
    return 0;
}`,
    options: ["10 20 30 ", "30 20 10 ", "10\n20\n30\n", "오류"],
    correctAnswer: 0,
    explanation: "for(auto x : v)는 벡터의 각 요소를 순서대로 x에 복사합니다. 10, 20, 30이 공백으로 구분되어 출력됩니다.",
    keyConceptTitle: "range-for 기본 순회",
    keyConceptDescription: "for(auto x : container)는 컨테이너의 모든 요소를 처음부터 끝까지 순서대로 순회합니다. x는 각 요소의 복사본입니다.",
    relatedTopics: ["range-for", "auto", "vector 순회"],
  },
  {
    id: 718,
    lessonId: "cpp-10",
    difficulty: "쉬움",
    question: "다음 코드에서 auto로 추론된 변수 타입으로 올바른 것은?",
    code: `#include <iostream>
using namespace std;

int main() {
    auto a = 42;
    auto b = 3.14;
    auto c = true;
    auto d = 'Z';
    return 0;
}`,
    options: [
      "a=int, b=double, c=bool, d=char",
      "a=int, b=float, c=int, d=string",
      "모두 int로 추론됨",
      "오류 — auto는 기본 타입에 사용할 수 없음",
    ],
    correctAnswer: 0,
    explanation: "auto는 우변의 리터럴 타입을 자동 추론합니다. 42→int, 3.14→double, true→bool, 'Z'→char로 추론됩니다.",
    keyConceptTitle: "auto 타입 추론",
    keyConceptDescription: "auto 키워드는 변수 초기화 시 우변의 타입을 자동으로 추론합니다. 정수 리터럴은 int, 소수점은 double, 불리언은 bool, 문자는 char로 추론됩니다.",
    relatedTopics: ["auto", "타입 추론", "변수 선언"],
  },
  {
    id: 719,
    lessonId: "cpp-10",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};
    int sum = 0;
    for (auto x : nums) {
        sum += x;
    }
    cout << sum << endl;
    return 0;
}`,
    options: ["15", "5", "1", "오류"],
    correctAnswer: 0,
    explanation: "range-for로 1+2+3+4+5 = 15를 누적합니다.",
    keyConceptTitle: "range-for로 합산",
    keyConceptDescription: "range-for와 누적 변수를 함께 사용하면 컨테이너 전체 합산을 간결하게 표현할 수 있습니다.",
    relatedTopics: ["range-for", "누적 합", "auto"],
  },
  {
    id: 720,
    lessonId: "cpp-10",
    difficulty: "보통",
    question: "다음 두 코드 A와 B의 동작 차이로 올바른 것은?",
    code: `// 코드 A — range-for
vector<int> v = {10, 20, 30};
for (auto x : v) {
    cout << x << " ";
}

// 코드 B — 인덱스 for
for (int i = 0; i < v.size(); i++) {
    cout << v[i] << " ";
}`,
    options: [
      "A와 B 모두 10 20 30 을 출력한다",
      "A는 역순으로 출력하고 B는 정순으로 출력한다",
      "A는 컴파일 오류이다",
      "B만 인덱스 접근이 가능하므로 B의 결과가 더 빠르다",
    ],
    correctAnswer: 0,
    explanation: "두 코드 모두 벡터를 처음부터 끝까지 순서대로 순회하며 '10 20 30 '을 출력합니다. range-for는 더 간결한 문법으로 같은 결과를 냅니다.",
    keyConceptTitle: "range-for vs 인덱스 for 비교",
    keyConceptDescription: "range-for는 인덱스 for와 동일하게 정순으로 순회합니다. range-for는 인덱스가 불필요할 때 더 간결합니다. 인덱스가 필요하면 전통적인 for를 사용합니다.",
    relatedTopics: ["range-for", "인덱스 for", "vector 순회"],
  },
  {
    id: 721,
    lessonId: "cpp-10",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word = "hello";
    int count = 0;
    for (auto ch : word) {
        if (ch == 'l') count++;
    }
    cout << count << endl;
    return 0;
}`,
    options: ["2", "1", "3", "오류"],
    correctAnswer: 0,
    explanation: "string에도 range-for를 사용할 수 있습니다. 'h', 'e', 'l', 'l', 'o' 중 'l'은 2개이므로 count=2가 출력됩니다.",
    keyConceptTitle: "string에 range-for 적용",
    keyConceptDescription: "range-for는 string에도 사용 가능합니다. 각 문자를 순서대로 순회하며 개별 char에 접근할 수 있습니다.",
    relatedTopics: ["range-for", "string 순회", "char"],
  },
  {
    id: 722,
    lessonId: "cpp-10",
    difficulty: "어려움",
    question: "다음 코드 실행 후 벡터 v의 내용은?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (auto x : v) {
        x = x * 2;  // 원본을 수정하려 했음
    }
    for (auto x : v) {
        cout << x << " ";
    }
    return 0;
}`,
    options: ["2 4 6 8 10 ", "1 2 3 4 5 ", "0 0 0 0 0 ", "오류"],
    correctAnswer: 1,
    explanation: "`auto x`는 각 요소의 복사본입니다. x를 수정해도 원본 벡터에 전혀 영향을 주지 않으므로 v는 그대로 {1, 2, 3, 4, 5}입니다.",
    keyConceptTitle: "range-for 값 복사 함정",
    keyConceptDescription: "`for(auto x : v)`에서 x는 원본의 복사본입니다. 루프 안에서 x를 바꿔도 원본 벡터는 변하지 않습니다. 원본 수정이 필요하다면 나중에 배울 '참조' 문법을 사용해야 합니다.",
    relatedTopics: ["range-for", "값 복사", "auto"],
  },
  {
    id: 723,
    lessonId: "cpp-10",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<string> words = {"hi", "hello", "hey"};
    for (auto word : words) {
        for (auto ch : word) {
            if (ch == 'h') cout << ch;
        }
    }
    cout << endl;
    return 0;
}`,
    options: ["hhh", "heh", "h h h ", "오류"],
    correctAnswer: 0,
    explanation: "바깥 range-for는 words의 각 string을 순회합니다. 안쪽 range-for는 각 string의 char를 순회하며 'h'만 출력합니다. 'hi'→h, 'hello'→h, 'hey'→h → 'hhh'가 출력됩니다.",
    keyConceptTitle: "중첩 range-for — vector<string> 순회",
    keyConceptDescription: "range-for를 중첩하면 컬렉션 안의 컬렉션을 순회할 수 있습니다. vector<string>에서 바깥 루프는 string을, 안쪽 루프는 char를 순회합니다.",
    relatedTopics: ["중첩 range-for", "vector<string>", "string 순회"],
  },
  {
    id: 724,
    lessonId: "cpp-1",
    difficulty: "어려움",
    question: "다음 코드에서 컴파일 오류가 발생하는 이유는?",
    code: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello" << endl
    return 0;
}`,
    options: ["return 문이 없어서", "cout 줄 끝에 세미콜론(;)이 없어서", "#include가 잘못되어서", "endl 대신 \\n을 써야 해서"],
    correctAnswer: 1,
    explanation: "C++의 모든 구문은 세미콜론(;)으로 끝나야 합니다. cout << \"Hello\" << endl 뒤에 세미콜론이 없어 컴파일 오류가 발생합니다.",
    keyConceptTitle: "세미콜론 누락 오류",
    keyConceptDescription: "C++에서 구문(statement)은 반드시 세미콜론(;)으로 종료해야 합니다. 세미콜론이 없으면 컴파일러가 다음 줄과 연결하려 해 예상치 못한 오류가 발생합니다.",
    relatedTopics: ["세미콜론", "컴파일 오류", "기본 구조"],
  },
  {
    id: 725,
    lessonId: "cpp-1",
    difficulty: "어려움",
    question: "C++에서 using namespace std;를 사용하지 않을 때 cout을 올바르게 사용하는 방법은?",
    code: "",
    options: ["cout << \"Hello\";", "std.cout << \"Hello\";", "std::cout << \"Hello\";", "namespace::cout << \"Hello\";"],
    correctAnswer: 2,
    explanation: "네임스페이스를 명시하지 않으면 std::cout처럼 콜론 두 개(::)로 접근해야 합니다. std.cout(점)이나 namespace::cout은 올바르지 않은 문법입니다.",
    keyConceptTitle: "네임스페이스 스코프 연산자(::)",
    keyConceptDescription: "using namespace std; 없이 표준 라이브러리를 사용하려면 std::cout처럼 스코프 연산자(::)로 네임스페이스를 명시해야 합니다.",
    relatedTopics: ["namespace", "std::", "스코프 연산자"],
  },
  {
    id: 726,
    lessonId: "cpp-1",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int x = 5;
    cout << "x = " << x << ", x*2 = " << x * 2 << endl;
    return 0;
}`,
    options: ["x = 5, x*2 = 10", "x = x, x*2 = x*2", "오류", "x=5, x*2=10"],
    correctAnswer: 0,
    explanation: "cout은 << 연산자로 여러 값을 연결해 출력합니다. 문자열 리터럴은 그대로, 변수 x는 값(5)으로, x*2는 계산 결과(10)로 출력됩니다.",
    keyConceptTitle: "cout 연결 출력",
    keyConceptDescription: "cout << A << B << C 형태로 여러 값을 연결 출력할 수 있습니다. 문자열 리터럴은 따옴표 안의 내용 그대로, 변수와 식은 값으로 치환됩니다.",
    relatedTopics: ["cout", "<<연산자", "변수 출력"],
  },
  {
    id: 727,
    lessonId: "cpp-2",
    difficulty: "어려움",
    question: "endl과 '\\n'의 차이로 올바른 것은?",
    code: "",
    options: ["endl은 줄바꿈만 하고 \\n은 버퍼도 비운다", "endl은 줄바꿈 후 출력 버퍼를 비우고(flush), \\n은 줄바꿈만 한다", "두 개는 완전히 동일하다", "endl은 Windows에서만 동작한다"],
    correctAnswer: 1,
    explanation: "endl은 줄바꿈 문자를 출력하고 추가로 출력 버퍼를 비웁니다(flush). \\n은 줄바꿈만 합니다. endl을 반복 사용하면 버퍼 플러시로 인해 성능이 저하될 수 있습니다.",
    keyConceptTitle: "endl vs \\n — 버퍼 플러시",
    keyConceptDescription: "endl은 '\\n' + flush 역할을 합니다. 반복 출력이 많은 경우 endl 대신 '\\n'을 쓰면 성능이 향상됩니다. 경쟁 프로그래밍에서는 '\\n'을 권장합니다.",
    relatedTopics: ["endl", "\\n", "버퍼 플러시", "성능"],
  },
  {
    id: 728,
    lessonId: "cpp-2",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    cout << "Name\\tAge" << endl;
    cout << "Alice\\t20" << endl;
    return 0;
}`,
    options: ["Name\\tAge\\nAlice\\t20", "Name   Age\\nAlice  20 (탭으로 정렬된 출력)", "오류", "NameAge\\nAlice20"],
    correctAnswer: 1,
    explanation: "\\t는 탭(tab) 문자로 일정 간격의 공백을 만들어 정렬된 출력을 생성합니다. Name과 Age, Alice와 20이 탭으로 구분되어 열 정렬된 형태로 출력됩니다.",
    keyConceptTitle: "탭 문자(\\t)로 열 정렬 출력",
    keyConceptDescription: "\\t는 탭 문자로 다음 탭 정지 위치까지 공백을 삽입합니다. 표 형식의 데이터를 출력할 때 유용합니다.",
    relatedTopics: ["\\t 탭 문자", "cout", "이스케이프 문자"],
  },
  {
    id: 729,
    lessonId: "cpp-3",
    difficulty: "어려움",
    question: "int 타입이 저장할 수 있는 최대값(약 21억)을 초과한 값을 저장하면 어떻게 되는가?",
    code: "",
    options: ["컴파일 오류가 발생한다", "자동으로 long 타입으로 변환된다", "오버플로우가 발생하여 예기치 않은 값(매우 큰 음수 등)이 될 수 있다", "런타임 에러가 발생한다"],
    correctAnswer: 2,
    explanation: "C++의 int는 약 -21억~+21억 범위를 가집니다. 이를 초과하면 정수 오버플로우가 발생해 값이 음수로 뒤집히는 등 예측 불가능한 결과가 됩니다. 컴파일 오류나 자동 변환은 발생하지 않습니다.",
    keyConceptTitle: "정수 오버플로우(Integer Overflow)",
    keyConceptDescription: "int 범위를 초과하면 오버플로우가 발생합니다. 큰 값이 필요하면 long long (약 ±920경)을 사용하세요.",
    relatedTopics: ["오버플로우", "int 범위", "long long"],
  },
  {
    id: 730,
    lessonId: "cpp-3",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    auto x = 5;
    auto y = 3.14;
    cout << x + y << endl;
    return 0;
}`,
    options: ["8.14", "8", "오류", "3.19"],
    correctAnswer: 0,
    explanation: "auto x는 정수 리터럴 5로 int 타입, auto y는 부동소수점 리터럴 3.14로 double 타입으로 추론됩니다. int + double 연산 시 int가 double로 암묵적 변환되어 결과는 double 8.14가 됩니다.",
    keyConceptTitle: "auto 타입 추론과 암묵적 변환",
    keyConceptDescription: "auto는 초기화 값의 타입으로 자동 추론됩니다. int와 double을 더하면 double로 승격되어 소수점 결과가 유지됩니다.",
    relatedTopics: ["auto", "타입 추론", "암묵적 타입 변환"],
  },
  {
    id: 731,
    lessonId: "cpp-3",
    difficulty: "어려움",
    question: "다음 코드에서 컴파일 오류가 발생하는 줄은?",
    code: `const int MAX = 100;
int x = MAX;     // 줄 A
x = x + 1;      // 줄 B
MAX = 200;       // 줄 C`,
    options: ["줄 A", "줄 B", "줄 C", "오류 없음"],
    correctAnswer: 2,
    explanation: "const 변수는 초기화 이후 값을 변경할 수 없습니다. 줄 A는 const 값을 읽어 복사하므로 문제없고, 줄 B는 일반 변수 x를 수정하므로 문제없습니다. 줄 C에서 const MAX에 재할당을 시도하므로 컴파일 오류가 발생합니다.",
    keyConceptTitle: "const 상수 — 변경 불가",
    keyConceptDescription: "const로 선언된 변수는 읽기 전용입니다. 초기화 후 값 변경을 시도하면 컴파일 오류가 발생합니다.",
    relatedTopics: ["const", "상수", "컴파일 오류"],
  },
  {
    id: 732,
    lessonId: "cpp-4",
    difficulty: "어려움",
    question: "사용자가 '3 5'를 입력했을 때 다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a * b << " " << a + b << endl;
    return 0;
}`,
    options: ["15 8", "8 15", "35 8", "오류"],
    correctAnswer: 0,
    explanation: "cin >> a >> b는 공백으로 구분된 두 값을 순서대로 읽습니다. a=3, b=5로 할당됩니다. a*b=15, a+b=8이므로 '15 8'이 출력됩니다.",
    keyConceptTitle: "cin 연속 입력",
    keyConceptDescription: "cin >> a >> b는 공백(스페이스, 탭, 개행)을 구분자로 하여 여러 변수를 순서대로 읽습니다.",
    relatedTopics: ["cin", "연속 입력", "공백 구분자"],
  },
  {
    id: 733,
    lessonId: "cpp-5",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int a = 5;
    cout << a++ << endl;
    cout << a << endl;
    return 0;
}`,
    options: ["5\\n6", "6\\n6", "5\\n5", "6\\n7"],
    correctAnswer: 0,
    explanation: "a++는 후위 증가 연산자입니다. 현재 값(5)을 먼저 반환한 후 a를 1 증가시킵니다. 첫 번째 cout은 5를 출력하고, 그 후 a가 6이 되어 두 번째 cout은 6을 출력합니다.",
    keyConceptTitle: "후위 증가(a++) vs 전위 증가(++a)",
    keyConceptDescription: "a++는 현재 값을 반환 후 증가(후위), ++a는 먼저 증가 후 증가된 값을 반환(전위)합니다.",
    relatedTopics: ["후위 증가", "전위 증가", "++연산자"],
  },
  {
    id: 734,
    lessonId: "cpp-5",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int x = 3, y = 0;
    cout << (x > 0 && y > 0) << endl;
    cout << (x > 0 || y > 0) << endl;
    cout << !x << endl;
    return 0;
}`,
    options: ["0\\n1\\n0", "1\\n1\\n1", "0\\n0\\n0", "오류"],
    correctAnswer: 0,
    explanation: "x>0&&y>0: x>0은 true, y>0은 false → AND → false(0). x>0||y>0: x>0은 true → OR → true(1). !x: x=3은 nonzero이므로 true로 취급, !true → false(0).",
    keyConceptTitle: "논리 연산자 &&, ||, !",
    keyConceptDescription: "&&는 둘 다 true여야 true, ||는 하나라도 true면 true, !는 논리 부정입니다. 0이 아닌 값은 true, 0은 false로 취급합니다.",
    relatedTopics: ["논리 연산자", "&&", "||", "!"],
  },
  {
    id: 735,
    lessonId: "cpp-6",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int x = 2;
    switch (x) {
        case 1: cout << "one" << endl;
        case 2: cout << "two" << endl;
        case 3: cout << "three" << endl;
        default: cout << "other" << endl;
    }
    return 0;
}`,
    options: ["two\\nthree\\nother", "two", "two\\nthree", "오류"],
    correctAnswer: 0,
    explanation: "switch에서 break가 없으면 매칭된 case 이후 모든 case가 순서대로 실행됩니다(fallthrough). x=2이므로 case 2부터 시작해 case 3, default까지 모두 실행됩니다.",
    keyConceptTitle: "switch fallthrough — break 누락",
    keyConceptDescription: "switch의 각 case에 break가 없으면 다음 case로 실행이 계속됩니다(fallthrough). 의도하지 않은 fallthrough는 버그의 원인이 됩니다.",
    relatedTopics: ["switch", "fallthrough", "break"],
  },
  {
    id: 736,
    lessonId: "cpp-6",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는? (a=1, b=2)",
    code: `#include <iostream>
using namespace std;
int main() {
    int a = 1, b = 2;
    if (a > 0)
        if (b < 0)
            cout << "A" << endl;
        else
            cout << "B" << endl;
    return 0;
}`,
    options: ["B", "A", "아무것도 출력 안 됨", "A\\nB"],
    correctAnswer: 0,
    explanation: "else는 항상 가장 가까운 if에 속합니다(dangling else). a>0이 true이므로 안쪽 if로 진입합니다. b<0이 false(2<0은 false)이므로 안쪽 else가 실행되어 B가 출력됩니다.",
    keyConceptTitle: "dangling else — else는 가장 가까운 if에",
    keyConceptDescription: "else는 항상 코드상 가장 가까운 if와 짝을 이룹니다. 중첩 if에서 들여쓰기만으로 의도를 표현하면 오해할 수 있으므로 중괄호{}를 사용하는 것이 안전합니다.",
    relatedTopics: ["dangling else", "중첩 if", "else 짝"],
  },
  {
    id: 737,
    lessonId: "cpp-6",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int x = 7;
    int result = (x % 2 == 0) ? x / 2 : x * 3 + 1;
    cout << result << endl;
    return 0;
}`,
    options: ["22", "3", "15", "4"],
    correctAnswer: 0,
    explanation: "x=7은 홀수이므로 x%2==0이 false입니다. 삼항 연산자의 false 분기인 x*3+1이 계산됩니다. 7*3+1=22.",
    keyConceptTitle: "삼항 연산자와 홀짝 판별",
    keyConceptDescription: "삼항 연산자 (조건) ? 참값 : 거짓값 형태로 간결한 조건부 값 선택이 가능합니다. x%2==0으로 짝수 여부를 판별합니다.",
    relatedTopics: ["삼항 연산자", "?:", "홀수/짝수 판별"],
  },
  {
    id: 738,
    lessonId: "cpp-6",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    char grade = 'B';
    switch (grade) {
        case 'A': cout << 4;
        case 'B': cout << 3;
                  break;
        case 'C': cout << 2;
        default:  cout << 0;
    }
    cout << endl;
    return 0;
}`,
    options: ["3", "30", "32", "오류"],
    correctAnswer: 0,
    explanation: "grade='B'이므로 case 'B'에서 매칭됩니다. 3을 출력한 후 break로 switch를 탈출합니다. case 'C'와 default는 실행되지 않습니다.",
    keyConceptTitle: "switch break — 정상 종료",
    keyConceptDescription: "break가 있는 case는 실행 후 switch를 탈출합니다. case 'B'에 break가 있으므로 case 'C', default는 실행되지 않습니다.",
    relatedTopics: ["switch", "break", "char"],
  },
  {
    id: 739,
    lessonId: "cpp-7",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int i = 5;
    do {
        cout << i << " ";
        i--;
    } while (i > 5);
    cout << endl;
    return 0;
}`,
    options: ["5 ", "5 4 3 2 1 ", "아무것도 출력 안 됨", "오류"],
    correctAnswer: 0,
    explanation: "do-while은 조건을 나중에 검사합니다. i=5로 루프 본문을 먼저 실행해 5를 출력하고 i=4로 감소합니다. 조건 i>5(4>5)가 false이므로 즉시 종료합니다.",
    keyConceptTitle: "do-while — 최소 1회 실행 보장",
    keyConceptDescription: "do-while 루프는 조건과 관계없이 본문을 최소 1회 실행한 후 조건을 검사합니다. 조건이 처음부터 false여도 1번은 실행됩니다.",
    relatedTopics: ["do-while", "반복문", "최소 1회 실행"],
  },
  {
    id: 740,
    lessonId: "cpp-7",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (j == 1) break;
            cout << i << j << " ";
        }
    }
    cout << endl;
    return 0;
}`,
    options: ["00 10 20 ", "00 01 10 11 20 21 ", "00 ", "오류"],
    correctAnswer: 0,
    explanation: "break는 가장 안쪽 반복문만 탈출합니다. 각 i 반복에서 j=0일 때 출력 후 j=1에서 break로 안쪽 루프 탈출. 바깥 루프(i=0,1,2)는 계속 실행됩니다. 결과: 00 10 20.",
    keyConceptTitle: "중첩 루프에서 break의 범위",
    keyConceptDescription: "break는 자신이 속한 가장 안쪽 반복문만 탈출합니다. 바깥 루프를 탈출하려면 플래그 변수나 goto를 사용해야 합니다.",
    relatedTopics: ["break", "중첩 반복문", "break 범위"],
  },
  {
    id: 741,
    lessonId: "cpp-7",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) continue;
        cout << i << " ";
    }
    cout << endl;
    return 0;
}`,
    options: ["1 3 5 ", "2 4 ", "1 2 3 4 5 ", "오류"],
    correctAnswer: 0,
    explanation: "i가 짝수(i%2==0)이면 continue로 해당 반복을 건너뜁니다. 홀수인 1, 3, 5만 출력됩니다.",
    keyConceptTitle: "continue — 현재 반복 건너뛰기",
    keyConceptDescription: "continue는 반복문의 나머지 본문을 건너뛰고 다음 반복으로 진행합니다. 특정 조건의 항목을 제외할 때 유용합니다.",
    relatedTopics: ["continue", "홀수/짝수 필터", "반복문"],
  },
  {
    id: 742,
    lessonId: "cpp-7",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int count = 0;
    for (int i = 1; i <= 4; i++) {
        for (int j = i; j <= 4; j++) {
            count++;
        }
    }
    cout << count << endl;
    return 0;
}`,
    options: ["10", "16", "6", "12"],
    correctAnswer: 0,
    explanation: "i=1: j=1~4(4회), i=2: j=2~4(3회), i=3: j=3~4(2회), i=4: j=4(1회). 총 4+3+2+1=10회 실행됩니다.",
    keyConceptTitle: "중첩 루프 실행 횟수 계산",
    keyConceptDescription: "안쪽 루프의 시작이 i에 따라 달라지는 삼각형 패턴입니다. 1+2+...+n = n*(n+1)/2 공식으로 계산할 수 있습니다.",
    relatedTopics: ["중첩 반복문", "실행 횟수", "삼각형 패턴"],
  },
  {
    id: 743,
    lessonId: "cpp-7",
    difficulty: "어려움",
    question: "다음 코드 실행 후 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int a = 1, b = 10;
    while (a < b) {
        a *= 2;
        b--;
    }
    cout << a << " " << b << endl;
    return 0;
}`,
    options: ["8 7", "16 6", "4 8", "2 9"],
    correctAnswer: 0,
    explanation: "단계별 추적: (a=1,b=10)→(2,9)→(4,8)→(8,7). a=8, b=7에서 조건 a<b는 8<7이 false이므로 루프 종료. 최종 출력: 8 7.",
    keyConceptTitle: "while 루프 추적 — 두 변수 조건",
    keyConceptDescription: "두 변수가 서로 가까워지는 while 루프는 단계별로 값을 추적해 종료 조건을 파악합니다.",
    relatedTopics: ["while", "반복문 추적", "종료 조건"],
  },
  {
    id: 744,
    lessonId: "cpp-9",
    difficulty: "어려움",
    question: "다음 코드의 문제점으로 올바른 것은?",
    code: `int arr[5] = {1, 2, 3, 4, 5};
cout << arr[5] << endl;`,
    options: ["컴파일 오류가 발생한다", "배열 범위 초과(index out of bounds)로 undefined behavior가 발생한다", "자동으로 0을 반환한다", "런타임 예외가 발생한다"],
    correctAnswer: 1,
    explanation: "크기 5인 배열의 유효 인덱스는 0~4입니다. arr[5]는 범위를 벗어난 접근으로 undefined behavior가 발생합니다. C++은 배열 범위를 컴파일 시 검사하지 않으므로 컴파일 오류가 아닌 예측 불가능한 동작이 발생합니다.",
    keyConceptTitle: "배열 범위 초과 — Undefined Behavior",
    keyConceptDescription: "C++ 배열은 범위를 자동으로 검사하지 않습니다. 범위를 벗어난 접근은 undefined behavior로 프로그램이 예측 불가능하게 동작할 수 있습니다.",
    relatedTopics: ["배열 인덱스", "범위 초과", "undefined behavior"],
  },
  {
    id: 745,
    lessonId: "cpp-9",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v;
    v.push_back(10);
    v.push_back(20);
    v.push_back(30);
    v.pop_back();
    cout << v.size() << endl;
    cout << v[0] + v[1] << endl;
    return 0;
}`,
    options: ["2\\n30", "3\\n30", "2\\n20", "오류"],
    correctAnswer: 0,
    explanation: "push_back 3번으로 {10, 20, 30}이 됩니다. pop_back으로 마지막 원소(30)가 제거되어 {10, 20}이 됩니다. size()=2, v[0]+v[1]=10+20=30.",
    keyConceptTitle: "vector push_back과 pop_back",
    keyConceptDescription: "push_back은 벡터 끝에 원소를 추가하고, pop_back은 끝 원소를 제거합니다. 둘 다 O(1) 연산입니다.",
    relatedTopics: ["vector", "push_back", "pop_back", "size()"],
  },
  {
    id: 746,
    lessonId: "cpp-9",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int arr[5] = {1, 2, 3};
    cout << arr[3] << " " << arr[4] << endl;
    return 0;
}`,
    options: ["0 0", "쓰레기 값", "오류", "3 3"],
    correctAnswer: 0,
    explanation: "C++에서 배열을 부분 초기화하면 나머지 원소는 자동으로 0으로 초기화됩니다. {1, 2, 3}으로 초기화된 크기 5 배열에서 arr[3]과 arr[4]는 0입니다.",
    keyConceptTitle: "배열 부분 초기화 — 나머지는 0",
    keyConceptDescription: "int arr[5] = {1, 2, 3}처럼 부분 초기화 시 나머지 원소는 0으로 초기화됩니다. 이는 전역 변수와 달리 지역 배열에서도 적용됩니다.",
    relatedTopics: ["배열 초기화", "부분 초기화", "0 초기화"],
  },
  {
    id: 747,
    lessonId: "cpp-9",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (int i = 0; i < v.size(); i++) {
        if (v[i] % 2 == 0) {
            v[i] *= 10;
        }
    }
    cout << v[1] << " " << v[3] << endl;
    return 0;
}`,
    options: ["20 40", "2 4", "10 40", "오류"],
    correctAnswer: 0,
    explanation: "짝수 원소에 *10을 적용합니다. v[1]=2(짝수)→20, v[3]=4(짝수)→40. v[0]=1(홀수), v[2]=3(홀수), v[4]=5(홀수)는 변경 없습니다.",
    keyConceptTitle: "벡터 원소 조건부 수정",
    keyConceptDescription: "인덱스로 벡터 원소에 직접 접근해 값을 수정할 수 있습니다. v[i] *= 10은 v[i] = v[i] * 10과 동일합니다.",
    relatedTopics: ["vector 인덱스 접근", "원소 수정", "짝수 필터"],
  },
  {
    id: 748,
    lessonId: "cpp-9",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int sum = 0;
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            sum += arr[i][j];
        }
    }
    cout << sum << endl;
    return 0;
}`,
    options: ["21", "15", "12", "오류"],
    correctAnswer: 0,
    explanation: "2×3 2차원 배열의 모든 원소 합입니다. 1+2+3+4+5+6=21.",
    keyConceptTitle: "2차원 배열 전체 합산",
    keyConceptDescription: "2차원 배열을 중첩 for 루프로 순회합니다. 바깥 루프는 행(i), 안쪽 루프는 열(j)을 순회합니다.",
    relatedTopics: ["2차원 배열", "중첩 반복문", "배열 합산"],
  },
  {
    id: 749,
    lessonId: "cpp-11",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "Hello World";
    size_t pos = s.find("xyz");
    if (pos == string::npos) {
        cout << "찾지 못함" << endl;
    } else {
        cout << pos << endl;
    }
    return 0;
}`,
    options: ["찾지 못함", "-1", "0", "오류"],
    correctAnswer: 0,
    explanation: "find()는 부분 문자열을 찾지 못하면 string::npos를 반환합니다. string::npos는 size_t의 최대값이며 -1이 아닙니다. pos == string::npos가 true이므로 '찾지 못함'이 출력됩니다.",
    keyConceptTitle: "string::find()와 string::npos",
    keyConceptDescription: "find()가 문자열을 찾지 못하면 string::npos를 반환합니다. -1이 아닌 string::npos와 비교해야 하며, size_t 타입을 사용합니다.",
    relatedTopics: ["string::find()", "string::npos", "문자열 검색"],
  },
  {
    id: 750,
    lessonId: "cpp-12",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
void addOne(int x) { x++; }
void addOneRef(int& x) { x++; }

int main() {
    int a = 5, b = 5;
    addOne(a);
    addOneRef(b);
    cout << a << " " << b << endl;
    return 0;
}`,
    options: ["5 6", "6 6", "5 5", "6 5"],
    correctAnswer: 0,
    explanation: "addOne(a)는 값으로 전달(pass by value)됩니다. 함수 내 x는 a의 복사본이므로 원본 a는 변경되지 않습니다. addOneRef(b)는 참조로 전달(pass by reference)됩니다. x는 b의 별칭이므로 b가 직접 증가해 6이 됩니다.",
    keyConceptTitle: "값 전달 vs 참조 전달",
    keyConceptDescription: "값 전달은 복사본을 수정해 원본에 영향 없음. 참조 전달(int&)은 원본을 직접 수정합니다.",
    relatedTopics: ["pass by value", "pass by reference", "int&"],
  },
  {
    id: 751,
    lessonId: "cpp-12",
    difficulty: "어려움",
    question: "다음 코드 실행 후 출력 결과는?",
    code: `#include <iostream>
using namespace std;
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 3, y = 7;
    swap(x, y);
    cout << x << " " << y << endl;
    return 0;
}`,
    options: ["7 3", "3 7", "3 3", "오류"],
    correctAnswer: 0,
    explanation: "swap(x, y) 호출 시 a는 x의 참조, b는 y의 참조입니다. 함수 내에서 a와 b의 값이 교환되면 원본 x와 y의 값도 교환됩니다. 결과: x=7, y=3.",
    keyConceptTitle: "참조를 이용한 swap 함수",
    keyConceptDescription: "참조 매개변수를 사용하면 함수 내부에서 원본 변수를 직접 수정할 수 있습니다. swap은 참조 전달의 대표적 활용 예입니다.",
    relatedTopics: ["참조 전달", "swap", "int&"],
  },
  {
    id: 752,
    lessonId: "cpp-12",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int a = 10;
    int& ref = a;
    ref = 20;
    cout << a << " " << ref << endl;
    return 0;
}`,
    options: ["20 20", "10 20", "10 10", "오류"],
    correctAnswer: 0,
    explanation: "ref는 a의 참조(별칭, alias)입니다. ref와 a는 같은 메모리를 가리킵니다. ref = 20으로 값을 변경하면 a도 함께 20으로 변경됩니다.",
    keyConceptTitle: "참조(Reference) — 변수의 별칭",
    keyConceptDescription: "참조는 기존 변수의 또 다른 이름(별칭)입니다. 참조를 통한 수정은 원본 변수에 직접 반영됩니다.",
    relatedTopics: ["참조", "별칭(alias)", "int&"],
  },
  {
    id: 753,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
struct Point {
    int x, y;
};

int main() {
    Point points[3] = {{1, 2}, {3, 4}, {5, 6}};
    int sum = 0;
    for (int i = 0; i < 3; i++) {
        sum += points[i].x + points[i].y;
    }
    cout << sum << endl;
    return 0;
}`,
    options: ["21", "15", "9", "오류"],
    correctAnswer: 0,
    explanation: "Point 구조체 배열의 모든 x, y 값을 합산합니다. (1+2) + (3+4) + (5+6) = 3 + 7 + 11 = 21.",
    keyConceptTitle: "구조체 배열 순회와 멤버 접근",
    keyConceptDescription: "구조체 배열은 일반 배열처럼 인덱스로 접근하고, 각 원소의 멤버는 . 연산자로 접근합니다.",
    relatedTopics: ["struct 배열", "멤버 접근(.)", "구조체 순회"],
  },
  {
    id: 754,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
struct Rectangle {
    int width, height;
};

int area(Rectangle r) {
    return r.width * r.height;
}

int main() {
    Rectangle rect = {5, 3};
    cout << area(rect) << endl;
    return 0;
}`,
    options: ["15", "8", "오류", "53"],
    correctAnswer: 0,
    explanation: "Rectangle 구조체를 값으로 함수에 전달합니다. area(rect)에서 r.width=5, r.height=3이므로 5*3=15를 반환합니다.",
    keyConceptTitle: "구조체를 함수 매개변수로 전달",
    keyConceptDescription: "구조체는 일반 변수처럼 함수에 값으로 전달할 수 있습니다. 함수 내에서 멤버를 . 연산자로 접근합니다.",
    relatedTopics: ["struct 전달", "함수 매개변수", "멤버 접근"],
  },
  {
    id: 755,
    lessonId: "cpp-15",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    pair<int, int> p1 = {3, 1};
    pair<int, int> p2 = {3, 5};
    pair<int, int> p3 = {2, 9};
    cout << (p1 < p2) << endl;
    cout << (p1 > p3) << endl;
    return 0;
}`,
    options: ["1\\n1", "0\\n0", "1\\n0", "0\\n1"],
    correctAnswer: 0,
    explanation: "pair 비교는 사전순(lexicographic)입니다. p1<p2: first가 같으면(3==3) second를 비교(1<5)→true(1). p1>p3: first를 비교(3>2)→true(1).",
    keyConceptTitle: "pair 비교 — 사전순(Lexicographic)",
    keyConceptDescription: "pair는 first를 먼저 비교하고, first가 같으면 second를 비교합니다. 이를 사전순(lexicographic) 비교라고 합니다.",
    relatedTopics: ["pair 비교", "lexicographic", "사전순"],
  },
  {
    id: 756,
    lessonId: "cpp-15",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <tuple>
#include <string>
using namespace std;
int main() {
    tuple<int, string, double> t = {1, "hello", 3.14};
    cout << get<0>(t) << endl;
    cout << get<1>(t) << endl;
    return 0;
}`,
    options: ["1\\nhello", "0\\nhello", "1\\n3.14", "오류"],
    correctAnswer: 0,
    explanation: "tuple 원소는 get<인덱스>(t)로 접근합니다. get<0>(t)는 첫 번째 원소 1(int), get<1>(t)는 두 번째 원소 \"hello\"(string)를 반환합니다.",
    keyConceptTitle: "tuple과 get<>() 접근",
    keyConceptDescription: "tuple은 여러 타입을 하나로 묶는 자료구조입니다. 원소에 접근할 때 get<인덱스>(tuple변수) 형태를 사용합니다. 인덱스는 0부터 시작합니다.",
    relatedTopics: ["tuple", "get<>()", "다중 타입 묶음"],
  },
  {
    id: 757,
    lessonId: "cpp-19",
    difficulty: "어려움",
    question: "ofstream file(\"data.txt\", ios::app)로 파일을 열면 어떻게 동작하는가?",
    code: "",
    options: ["파일을 새로 만들어 처음부터 쓴다 (기존 내용 삭제)", "파일 끝에 이어서 쓴다 (기존 내용 보존)", "파일을 읽기 전용으로 연다", "파일이 이미 존재하면 오류가 발생한다"],
    correctAnswer: 1,
    explanation: "ios::app(append) 모드는 파일의 기존 내용을 보존하고 파일 끝에 새 내용을 추가합니다. 기본 모드(ios::out)는 기존 내용을 삭제하고 처음부터 씁니다.",
    keyConceptTitle: "ios::app — 파일 추가 쓰기 모드",
    keyConceptDescription: "파일 열기 모드: ios::out(기본, 덮어쓰기), ios::app(끝에 추가), ios::in(읽기). 로그 파일처럼 기존 내용을 보존하며 추가할 때 ios::app을 사용합니다.",
    relatedTopics: ["ofstream", "ios::app", "파일 모드"],
  },
  {
    id: 758,
    lessonId: "cpp-19",
    difficulty: "어려움",
    question: "경쟁 프로그래밍에서 ios::sync_with_stdio(false)와 cin.tie(NULL)을 함께 쓰는 이유는?",
    code: "",
    options: ["cin과 cout을 사용할 수 없게 한다", "cin/cout의 입출력 속도를 크게 향상시킨다", "scanf/printf와 안전하게 혼용할 수 있게 한다", "파일 I/O를 활성화한다"],
    correctAnswer: 1,
    explanation: "기본적으로 cin/cout은 C의 scanf/printf와 동기화되어 속도가 느립니다. ios::sync_with_stdio(false)로 동기화를 끊으면 I/O 속도가 크게 향상됩니다. 단, 이후 scanf/printf와 혼용하면 안 됩니다.",
    keyConceptTitle: "Fast I/O — 입출력 가속",
    keyConceptDescription: "경쟁 프로그래밍에서 대량 입출력 시 ios::sync_with_stdio(false); cin.tie(NULL);을 선언하면 cin/cout 속도가 크게 향상됩니다. 단, 이후 scanf/printf 혼용 불가.",
    relatedTopics: ["Fast I/O", "ios::sync_with_stdio", "cin.tie"],
  },
  {
    id: 759,
    lessonId: "cpp-1",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    cout << "Start" << endl;
    return 0;
    cout << "End" << endl;
}`,
    options: ["Start", "Start\\nEnd", "End", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "return 0; 이후의 코드는 절대 실행되지 않습니다(dead code). 컴파일은 성공하지만 'End'는 출력되지 않고 프로그램이 종료됩니다.",
    keyConceptTitle: "return 이후 코드 — Dead Code",
    keyConceptDescription: "return 문이 실행되면 함수가 즉시 종료됩니다. 그 이후의 코드(dead code)는 컴파일은 되지만 절대 실행되지 않습니다.",
    relatedTopics: ["return", "dead code", "main"],
  },
  {
    id: 760,
    lessonId: "cpp-1",
    difficulty: "어려움",
    question: "main() 함수에서 return 0 대신 return 1을 반환하면 어떻게 되는가?",
    code: "",
    options: [
      "프로그램이 오류(비정상 종료)를 운영체제에 알린다",
      "프로그램이 1번 더 반복 실행된다",
      "컴파일 오류가 발생한다",
      "1이 화면에 출력된다",
    ],
    correctAnswer: 0,
    explanation: "main()의 반환값은 운영체제에 전달되는 종료 코드입니다. 0은 정상 종료, 0이 아닌 값(1 등)은 오류 종료를 나타냅니다. 실제 화면 출력과는 무관합니다.",
    keyConceptTitle: "main() 반환값 — 종료 코드",
    keyConceptDescription: "main()의 return 값은 프로그램 종료 코드입니다. 0=정상, 1(또는 다른 값)=오류. 쉘 스크립트나 빌드 시스템이 이 값으로 성공/실패를 판단합니다.",
    relatedTopics: ["return", "종료 코드", "main"],
  },
  {
    id: 761,
    lessonId: "cpp-1",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;
int main() {
    int x = 4;
    cout << x << " " << x + 1 << " " << x * x << endl;
    return 0;
}`,
    options: ["4 5 16", "x x+1 x*x", "4 5 8", "오류"],
    correctAnswer: 0,
    explanation: "cout에 << 연산자로 여러 값을 연결해 한 줄에 출력할 수 있습니다. x=4이므로 4, x+1=5, x*x=16이 공백과 함께 출력됩니다.",
    keyConceptTitle: "cout 연쇄 출력",
    keyConceptDescription: "cout << a << b << c처럼 << 연산자를 연속으로 사용해 여러 값을 한 번에 출력할 수 있습니다. 표현식도 바로 계산되어 출력됩니다.",
    relatedTopics: ["cout", "<<", "연쇄 출력"],
  },
  {
    id: 762,
    lessonId: "cpp-1",
    difficulty: "어려움",
    question: "#include <iostream>과 #include \"myfile.h\"의 차이로 올바른 것은?",
    code: "",
    options: [
      "<>는 표준/시스템 헤더에, \"\"는 사용자 정의 헤더 파일에 사용한다",
      "<>는 C 헤더에, \"\"는 C++ 헤더에만 사용한다",
      "두 방법은 완전히 동일하다",
      "<>는 .hpp에만, \"\"는 .h 파일에만 사용한다",
    ],
    correctAnswer: 0,
    explanation: "<>는 컴파일러가 시스템/표준 라이브러리 경로에서 헤더를 찾습니다. \"\"는 현재 프로젝트 디렉토리에서 먼저 찾습니다. iostream, string 등 표준 헤더는 <>를 사용합니다.",
    keyConceptTitle: "#include — <> vs \"\"",
    keyConceptDescription: "표준 라이브러리(iostream, string 등)는 #include <헤더>. 직접 만든 헤더 파일은 #include \"파일명.h\". 이 규칙을 지키면 컴파일러가 올바른 경로에서 헤더를 찾습니다.",
    relatedTopics: ["#include", "헤더 파일", "표준 라이브러리"],
  },
  {
    id: 763,
    lessonId: "cpp-1",
    difficulty: "어려움",
    question: "다음 코드에서 출력이 예상과 다른 이유는?",
    code: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello";
    cout << "World";
    cout << endl;
    return 0;
}`,
    options: [
      "cout은 자동으로 줄바꿈하지 않으므로 HelloWorld가 한 줄에 출력된다",
      "두 번째 cout이 첫 번째 출력을 덮어쓴다",
      "endl이 없으면 오류가 발생한다",
      "cout은 문자열을 한 번에 하나만 출력할 수 있다",
    ],
    correctAnswer: 0,
    explanation: "cout은 출력 후 자동으로 줄바꿈하지 않습니다. endl(또는 \\n)을 명시해야만 줄이 바뀝니다. 따라서 Hello와 World는 같은 줄에 붙어서 HelloWorld로 출력됩니다.",
    keyConceptTitle: "cout은 자동 줄바꿈 없음",
    keyConceptDescription: "cout은 값을 출력만 하고 자동으로 줄바꿈하지 않습니다. 줄바꿈이 필요하면 endl 또는 \\\"\\\\n\\\"을 명시해야 합니다.",
    relatedTopics: ["cout", "endl", "줄바꿈"],
  },
  {
    id: 764,
    lessonId: "cpp-10",
    difficulty: "어려움",
    question: "다음 코드 실행 후 벡터 v의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (auto x : v) {
        x = x * 2;
    }
    for (auto x : v) {
        cout << x << " ";
    }
    cout << endl;
    return 0;
}`,
    options: ["1 2 3 4 5 ", "2 4 6 8 10 ", "오류", "0 0 0 0 0 "],
    correctAnswer: 0,
    explanation: "`for (auto x : v)`에서 x는 원본의 복사본입니다. x를 수정해도 벡터 원본에는 영향이 없습니다. 원본을 수정하려면 `auto& x`(참조)를 사용해야 합니다.",
    keyConceptTitle: "range-for 값 복사 함정",
    keyConceptDescription: "`for(auto x : v)`는 각 원소의 복사본을 x에 저장합니다. x를 바꿔도 원본 v는 변하지 않습니다. 원본 수정이 필요하면 `for(auto& x : v)`를 사용합니다.",
    relatedTopics: ["range-for", "값 복사", "auto"],
  },
  {
    id: 765,
    lessonId: "cpp-10",
    difficulty: "어려움",
    question: "다음 코드 실행 후 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (auto& x : v) {
        x *= 2;
    }
    for (auto x : v) {
        cout << x << " ";
    }
    cout << endl;
    return 0;
}`,
    options: ["2 4 6 8 10 ", "1 2 3 4 5 ", "0 0 0 0 0 ", "오류"],
    correctAnswer: 0,
    explanation: "`auto& x`는 원본 원소의 참조입니다. x를 수정하면 벡터 원본도 수정됩니다. `auto x`(복사)와 달리 `auto& x`(참조)는 원본을 직접 바꿀 수 있습니다.",
    keyConceptTitle: "range-for 참조(auto&) — 원본 수정",
    keyConceptDescription: "`for(auto& x : v)`는 x가 원본의 참조이므로 x를 수정하면 v도 바뀝니다. `for(auto x : v)`(복사)와 `for(auto& x : v)`(참조)의 차이를 반드시 구분하세요.",
    relatedTopics: ["range-for", "참조", "auto&"],
  },
];