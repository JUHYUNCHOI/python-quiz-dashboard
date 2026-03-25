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
    lessonId: "cpp-2",
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
    id: 8,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드에서 try-catch의 출력은?",
    code: `#include <iostream>
#include <stdexcept>
using namespace std;

int divide(int a, int b) {
    if (b == 0) throw runtime_error("0으로 나눌 수 없습니다");
    return a / b;
}

int main() {
    try {
        cout << divide(10, 2) << " ";
        cout << divide(10, 0) << " ";
        cout << "끝";
    } catch (runtime_error& e) {
        cout << "예외: " << e.what();
    }
    return 0;
}`,
    options: ["5 끝", "5 예외: 0으로 나눌 수 없습니다", "예외: 0으로 나눌 수 없습니다", "5 0 끝"],
    correctAnswer: 1,
    explanation: "divide(10,2)=5 출력 후, divide(10,0)에서 예외 발생. catch 블록으로 점프하여 예외 메시지 출력. '끝'은 출력 안 됨.",
    keyConceptTitle: "예외 처리",
    keyConceptDescription: "throw로 예외를 발생시키고, try-catch로 처리합니다. 예외 발생 후 try 블록의 나머지는 실행되지 않습니다.",
    relatedTopics: ["throw", "try-catch", "runtime_error"],
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
    difficulty: "쉬움",
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
    id: 13,
    lessonId: "cpp-3",
    animationKey: "compileVisualizer",
    difficulty: "쉬움",
    question: "다음 코드에서 컴파일 오류가 발생하는 줄은?",
    code: `#include <iostream>
using namespace std;

int main() {
    const int MAX = 100;  // 1번 줄
    cout << MAX << endl;  // 2번 줄
    MAX = 200;            // 3번 줄
    return 0;             // 4번 줄
}`,
    options: ["1번 줄", "2번 줄", "3번 줄", "오류 없음"],
    correctAnswer: 2,
    explanation: "const로 선언된 변수는 값을 변경할 수 없습니다. MAX = 200에서 상수에 대입하려 하므로 컴파일 오류가 발생합니다.",
    keyConceptTitle: "const 변수",
    keyConceptDescription: "const 키워드를 붙이면 변수가 상수가 되어 초기화 이후 값을 변경할 수 없습니다. 매직 넘버를 방지하는 좋은 습관입니다.",
    codeComparison: {
      wrong: `const int MAX = 100;
MAX = 200;  // 오류! const 변경 불가`,
      correct: `int MAX = 100;
MAX = 200;  // OK, const가 아니면 변경 가능`,
    },
    relatedTopics: ["const", "상수", "매직 넘버"],
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
    lessonId: "cpp-5",
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
    lessonId: "cpp-6",
    animationKey: "cppIfBuilder",
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
    lessonId: "cpp-6",
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
    lessonId: "cpp-6",
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
    id: 45,
    lessonId: "cpp-6",
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;
    cout << a % b;
    return 0;
}`,
    options: ["3", "1", "0", "3.33"],
    correctAnswer: 1,
    explanation: "10 % 3 = 1 (나머지). 10 = 3 × 3 + 1이므로 나머지는 1입니다.",
    keyConceptTitle: "나머지 연산자 %",
    keyConceptDescription: "% 연산자는 정수 나눗셈의 나머지를 반환합니다. 짝홀수 판별, 순환 인덱스 등에 활용됩니다.",
    relatedTopics: ["나머지 연산", "정수 나눗셈", "모듈로"],
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
    lessonId: "cpp-6",
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
    id: 59,
    lessonId: "cpp-7",
    difficulty: "보통",
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
    options: ["10", "15", "20", "25"],
    correctAnswer: 1,
    explanation: "i가 1,2,3,4,5 순서로 sum에 더해집니다. 1+2+3+4+5 = 15입니다.",
    keyConceptTitle: "누적 합 패턴",
    keyConceptDescription: "sum += i는 반복할 때마다 i를 sum에 더해가는 누적 합 패턴입니다. 반복문의 가장 기본적인 활용법이에요.",
    relatedTopics: ["누적 합", "반복문 패턴", "+="],
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
    difficulty: "어려움",
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
    difficulty: "어려움",
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
    lessonId: "cpp-9",
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
    lessonId: "cpp-9",
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
    lessonId: "cpp-9",
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
    lessonId: "cpp-9",
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
    lessonId: "cpp-9",
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
    id: 95,
    lessonId: "cpp-9",
    difficulty: "쉬움",
    question: "다음 코드에서 #include의 역할은?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3};
    cout << v.size();
    return 0;
}`,
    options: ["변수를 선언한다", "헤더 파일을 포함하여 기능을 사용할 수 있게 한다", "프로그램을 컴파일한다", "메모리를 할당한다"],
    correctAnswer: 1,
    explanation: "#include는 전처리 지시문으로, 헤더 파일의 내용을 코드에 포함시킵니다. iostream은 입출력, vector는 벡터를 제공합니다.",
    keyConceptTitle: "#include 전처리 지시문",
    keyConceptDescription: "#include는 컴파일 전에 헤더 파일의 내용을 삽입합니다. <>는 시스템 헤더, \"\"는 사용자 헤더입니다.",
    relatedTopics: ["#include", "헤더 파일", "전처리기"],
  },
  {
    id: 97,
    lessonId: "cpp-9",
    difficulty: "어려움",
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
    id: 98,
    lessonId: "cpp-9",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    auto it = v.begin() + 2;
    v.insert(it, 10);
    for (int x : v) cout << x << " ";
    return 0;
}`,
    options: ["1 2 3 4 5 10", "10 1 2 3 4 5", "1 2 10 3 4 5", "1 10 2 3 4 5"],
    correctAnswer: 2,
    explanation: "v.begin()+2는 인덱스 2(값 3) 위치입니다. 그 앞에 10을 삽입하면 {1, 2, 10, 3, 4, 5}가 됩니다.",
    keyConceptTitle: "vector insert 위치",
    keyConceptDescription: "insert(it, val)은 it이 가리키는 위치 앞에 val을 삽입합니다. 기존 요소들은 뒤로 밀립니다.",
    relatedTopics: ["vector", "insert", "iterator"],
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
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    auto x = 3.14;
    auto y = 3;
    auto z = 3.14f;
    cout << sizeof(x) << " " << sizeof(y) << " " << sizeof(z);
    return 0;
}`,
    options: ["8 4 4", "4 4 4", "8 4 8", "4 4 8"],
    correctAnswer: 0,
    explanation: "3.14는 double(8바이트), 3은 int(4바이트), 3.14f는 float(4바이트)로 추론됩니다.",
    keyConceptTitle: "auto 타입 추론",
    keyConceptDescription: "auto는 초기값으로부터 타입을 추론합니다. 소수점 리터럴은 기본 double, f 접미사를 붙이면 float입니다.",
    relatedTopics: ["auto", "타입 추론", "float vs double"],
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
    s.erase(5, 6);
    cout << s;
    return 0;
}`,
    options: ["Hello", "World", "Hello World", "HelloWorld"],
    correctAnswer: 0,
    explanation: "erase(5, 6)은 인덱스 5부터 6글자를 삭제합니다. \" World\"(공백 포함 6글자)가 삭제되어 \"Hello\"만 남습니다.",
    keyConceptTitle: "string::erase()",
    keyConceptDescription: "erase(시작위치, 길이)로 문자열의 일부를 삭제합니다. 길이를 생략하면 시작 위치부터 끝까지 삭제됩니다.",
    relatedTopics: ["string", "erase", "문자열 조작"],
  },
  {
    id: 107,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello World";
    s.replace(6, 5, "C++");
    cout << s;
    return 0;
}`,
    options: ["Hello C++", "HelloC++", "Hello C++ World", "Hello WorldC++"],
    correctAnswer: 0,
    explanation: "replace(6, 5, \"C++\")는 인덱스 6부터 5글자(\"World\")를 \"C++\"로 교체합니다. 결과: \"Hello C++\"",
    keyConceptTitle: "string::replace()",
    keyConceptDescription: "replace(시작위치, 길이, 새문자열)로 문자열 일부를 다른 문자열로 교체합니다.",
    relatedTopics: ["string", "replace", "문자열 조작"],
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
    id: 110,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    s.append(" World");
    cout << s << " " << s.compare("Hello World");
    return 0;
}`,
    options: ["Hello World 0", "Hello World 1", "Hello World -1", "HelloWorld 0"],
    correctAnswer: 0,
    explanation: "append()로 문자열을 이어붙이면 \"Hello World\"가 됩니다. compare()는 같으면 0을 반환합니다.",
    keyConceptTitle: "string::append()과 compare()",
    keyConceptDescription: "append()는 +=와 같이 문자열을 뒤에 추가합니다. compare()는 같으면 0, 사전순으로 앞이면 음수, 뒤면 양수를 반환합니다.",
    relatedTopics: ["string", "append", "compare"],
  },
  {
    id: 111,
    lessonId: "cpp-20",
    difficulty: "보통",
    question: "다음 코드에서 c_str()의 역할은?",
    code: `#include <iostream>
#include <cstring>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    const char* cs = s.c_str();
    cout << strlen(cs);
    return 0;
}`,
    options: ["Hello", "5", "6", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "c_str()는 string을 C 스타일 문자열(const char*)로 변환합니다. strlen()은 C 문자열의 길이(5)를 반환합니다.",
    keyConceptTitle: "string::c_str()",
    keyConceptDescription: "c_str()는 C++ string을 널 종료 C 문자열(const char*)로 변환합니다. C 라이브러리 함수와 함께 사용할 때 필요합니다.",
    relatedTopics: ["c_str", "C 문자열", "strlen"],
  },
  {
    id: 112,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "12345";
    int num = stoi(s);
    num += 100;
    cout << num << " " << to_string(num);
    return 0;
}`,
    options: ["12445 12445", "12345100 12345100", "컴파일 오류", "12345 12345"],
    correctAnswer: 0,
    explanation: "stoi()는 문자열을 정수로 변환합니다. 12345 + 100 = 12445. to_string()은 정수를 문자열로 변환합니다.",
    keyConceptTitle: "stoi()와 to_string()",
    keyConceptDescription: "stoi(s)는 string→int, to_string(n)은 int→string 변환입니다. stod()는 string→double 변환입니다.",
    relatedTopics: ["stoi", "to_string", "형변환"],
  },
  {
    id: 113,
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
    options: ["abc", "cde", "bcd", "cd"],
    correctAnswer: 1,
    explanation: "substr(2, 3)은 인덱스 2부터 3글자를 추출합니다. s[2]='c', s[3]='d', s[4]='e' → \"cde\"",
    keyConceptTitle: "substr 함수",
    keyConceptDescription: "substr(시작위치, 길이)로 부분 문자열을 추출합니다. 인덱스는 0부터 시작합니다.",
    relatedTopics: ["substr", "string 인덱싱", "find"],
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
    id: 119,
    lessonId: "cpp-11",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <sstream>
using namespace std;

int main() {
    string s = "42 3.14 Hello";
    istringstream iss(s);
    int n;
    double d;
    string word;
    iss >> n >> d >> word;
    cout << n << " " << d << " " << word;
    return 0;
}`,
    options: ["42 3.14 Hello", "42 3 Hello", "423.14Hello", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "istringstream으로 문자열을 스트림처럼 파싱합니다. 공백 기준으로 int, double, string을 순서대로 읽습니다.",
    keyConceptTitle: "문자열 스트림 (stringstream)",
    keyConceptDescription: "istringstream은 문자열을 입력 스트림처럼 사용합니다. 문자열 파싱에 매우 유용합니다.",
    relatedTopics: ["stringstream", "파싱", "sstream"],
  },
  {
    id: 120,
    lessonId: "cpp-11",
    difficulty: "어려움",
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
    id: 133,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 버그는 무엇인가?",
    code: `#include <iostream>
using namespace std;

int* createArray() {
    int arr[5] = {1, 2, 3, 4, 5};
    return arr;
}

int main() {
    int* p = createArray();
    cout << p[0];
    return 0;
}`,
    options: ["배열 크기가 너무 작다", "지역 변수의 주소를 반환 (dangling pointer)", "포인터 타입이 잘못됨", "메모리 누수"],
    correctAnswer: 1,
    explanation: "함수 내 지역 배열은 함수 종료 시 소멸됩니다. 그 주소를 반환하면 dangling pointer가 됩니다.",
    keyConceptTitle: "Dangling Pointer",
    keyConceptDescription: "함수의 지역 변수 주소를 반환하면 안 됩니다. 함수 종료 후 해당 메모리는 무효합니다.",
    codeComparison: {
      wrong: `int* createArray() {
    int arr[5] = {1,2,3,4,5};
    return arr;  // dangling!`,
      correct: `int* createArray() {
    int* arr = new int[5]{1,2,3,4,5};
    return arr;  // heap 메모리`,
    },
    relatedTopics: ["dangling pointer", "지역 변수", "동적 할당"],
  },
  {
    id: 134,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

void modify(int* p) {
    *p = 99;
}

int main() {
    int x = 10;
    modify(&x);
    cout << x;
    return 0;
}`,
    options: ["10", "99", "0", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "&x로 x의 주소를 전달하고, 함수 내에서 *p = 99로 해당 주소의 값을 변경합니다. x = 99가 됩니다.",
    keyConceptTitle: "포인터로 값 전달",
    keyConceptDescription: "함수에 변수의 주소(&x)를 전달하고 *p로 역참조하면 원본을 수정할 수 있습니다.",
    relatedTopics: ["포인터 매개변수", "역참조", "참조 전달"],
  },
  {
    id: 135,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[3] = {10, 20, 30};
    cout << *arr << " ";
    cout << *(arr + 1) << " ";
    cout << arr[2];
    return 0;
}`,
    options: ["10 20 30", "0 1 2", "주소값 3개", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "*arr는 arr[0]=10, *(arr+1)는 arr[1]=20, arr[2]=30입니다. 배열 이름은 첫 원소의 포인터입니다.",
    keyConceptTitle: "배열과 포인터의 관계",
    keyConceptDescription: "arr[i]는 *(arr+i)와 동일합니다. 배열 이름은 첫 원소의 주소를 나타냅니다.",
    relatedTopics: ["배열", "포인터 산술", "역참조"],
  },
  {
    id: 136,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

void doubleAll(int arr[], int size) {
    for (int i = 0; i < size; i++)
        arr[i] *= 2;
}

int main() {
    int a[] = {1, 2, 3};
    doubleAll(a, 3);
    cout << a[0] << " " << a[1] << " " << a[2];
    return 0;
}`,
    options: ["1 2 3", "2 4 6", "2 2 2", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "배열은 함수에 전달될 때 포인터로 전달됩니다. 따라서 함수 내에서 배열을 수정하면 원본이 변경됩니다.",
    keyConceptTitle: "배열의 포인터 전달",
    keyConceptDescription: "배열은 함수에 넘길 때 자동으로 포인터로 변환됩니다(decay). 따라서 함수에서 원본 배열이 수정됩니다.",
    relatedTopics: ["배열 전달", "포인터 decay", "함수 매개변수"],
  },
  {
    id: 137,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

void swap_wrong(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10, y = 20;
    swap_wrong(x, y);
    cout << x << " " << y;
    return 0;
}`,
    options: ["20 10", "10 20", "10 10", "20 20"],
    correctAnswer: 1,
    explanation: "매개변수를 값으로 전달(pass by value)하면 복사본만 변경됩니다. 원본 x, y는 변하지 않습니다.",
    keyConceptTitle: "값에 의한 전달의 한계",
    keyConceptDescription: "함수에 값을 복사해서 전달하면 원본이 변경되지 않습니다. 원본을 바꾸려면 참조(&) 또는 포인터(*)를 사용하세요.",
    codeComparison: {
      wrong: `void swap_wrong(int a, int b)  // 값 전달`,
      correct: `void swap_correct(int& a, int& b)  // 참조 전달`,
    },
    relatedTopics: ["값 전달", "참조 전달", "swap"],
  },
  {
    id: 138,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int* p = &x;
    int** pp = &p;
    cout << **pp;
    return 0;
}`,
    options: ["10", "메모리 주소", "0", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "pp→p→x. **pp는 p가 가리키는 값, 즉 x의 값인 10입니다.",
    keyConceptTitle: "이중 포인터 역참조",
    keyConceptDescription: "**pp는 포인터의 포인터를 두 번 역참조하여 최종 값에 접근합니다.",
    relatedTopics: ["이중 포인터", "역참조", "포인터 체인"],
  },
  {
    id: 139,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;
    int* p = &x;
    *p = 10;
    cout << x << endl;
    return 0;
}`,
    options: ["5", "10", "메모리 주소", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "p는 x의 주소를 가리킵니다. *p = 10은 p가 가리키는 x의 값을 10으로 변경합니다.",
    keyConceptTitle: "포인터와 역참조",
    keyConceptDescription: "&x는 x의 메모리 주소, *p는 포인터가 가리키는 값입니다. *p에 값을 할당하면 원본이 변경됩니다.",
    codeComparison: {
      wrong: `int* p = &x;
p = 10;   // 오류! 주소에 정수를 넣으려 함`,
      correct: `int* p = &x;
*p = 10;  // x의 값을 10으로 변경`,
    },
    relatedTopics: ["포인터 선언", "& 연산자", "* 연산자"],
  },
  {
    id: 140,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20, c = 30;
    int* arr[3] = {&a, &b, &c};
    cout << *arr[1] << endl;
    return 0;
}`,
    options: ["10", "20", "30", "메모리 주소"],
    correctAnswer: 1,
    explanation: "arr은 포인터 배열로, 각 요소가 정수의 주소를 저장합니다. *arr[1]은 b의 값인 20입니다.",
    keyConceptTitle: "포인터 배열",
    keyConceptDescription: "int* arr[3]은 정수 포인터 3개를 담는 배열입니다. 각 요소가 서로 다른 변수를 가리킬 수 있습니다.",
    relatedTopics: ["포인터 배열", "배열 포인터", "포인터"],
  },
  {
    id: 141,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[3] = {10, 20, 30};
    int* p = arr;
    p++;
    cout << *p << " ";
    p += 1;
    cout << *p;
    return 0;
}`,
    options: ["10 20", "20 30", "10 30", "11 21"],
    correctAnswer: 1,
    explanation: "p는 arr[0]을 가리킵니다. p++ 후 arr[1](20), p+=1 후 arr[2](30)를 가리킵니다. 포인터 연산은 타입 크기 단위로 이동합니다.",
    keyConceptTitle: "포인터 연산",
    keyConceptDescription: "포인터에 +1하면 가리키는 타입의 크기만큼 주소가 증가합니다. int* p에서 p+1은 4바이트(int 크기)만큼 이동합니다.",
    relatedTopics: ["포인터 연산", "배열과 포인터", "주소 계산"],
  },
  {
    id: 142,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드에서 현재 상태로 컴파일 오류가 발생하나요?",
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    const int* p = &x;     // 1번
    int y = 30;
    p = &y;                // 2번
    cout << *p;
    return 0;
}`,
    options: ["1번에서 오류", "2번에서 오류", "둘 다 오류", "오류 없음"],
    correctAnswer: 3,
    explanation: "const int* p는 가리키는 값을 변경할 수 없지만, 포인터 자체(가리키는 대상)는 변경할 수 있습니다. 현재 코드에 오류는 없습니다.",
    keyConceptTitle: "const 포인터",
    keyConceptDescription: "const int* p: 가리키는 값 변경 불가. int* const p: 포인터 자체 변경 불가. const int* const p: 둘 다 불가.",
    codeComparison: {
      wrong: `const int* p = &x;
*p = 20;  // 오류! 값 변경 불가`,
      correct: `const int* p = &x;
p = &y;   // OK! 포인터 재할당 가능`,
    },
    relatedTopics: ["const 포인터", "const", "포인터"],
  },
  {
    id: 143,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드에서 주석 C와 D를 해제하면 어떤 것이 오류인가요?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;
    int* const p1 = &a;    // A
    const int* p2 = &a;    // B
    // p1 = &b;   // C
    // *p2 = 30;  // D
    return 0;
}`,
    options: ["C만 오류", "D만 오류", "C와 D 모두 오류", "오류 없음"],
    correctAnswer: 2,
    explanation: "int* const p1은 포인터 자체가 상수이므로 p1 재할당 불가(C 오류). const int* p2는 가리키는 값이 상수이므로 *p2 변경 불가(D 오류).",
    keyConceptTitle: "const 포인터의 두 가지 형태",
    keyConceptDescription: "int* const: 포인터가 상수 (재할당 불가). const int*: 가리키는 값이 상수 (값 변경 불가). const는 왼쪽 것을 수식합니다.",
    relatedTopics: ["const 포인터", "int* const", "const int*"],
  },
  {
    id: 144,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

int main() {
    int (*func)(int, int);
    func = add;
    cout << func(3, 4) << " ";
    func = mul;
    cout << func(3, 4);
    return 0;
}`,
    options: ["7 12", "3 4", "12 7", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "func는 함수 포인터로, add를 가리키면 add(3,4)=7, mul을 가리키면 mul(3,4)=12를 실행합니다.",
    keyConceptTitle: "함수 포인터",
    keyConceptDescription: "int (*func)(int, int)는 int를 반환하고 int 2개를 받는 함수를 가리키는 포인터입니다. 콜백 구현에 사용됩니다.",
    relatedTopics: ["함수 포인터", "콜백", "함수 객체"],
  },
  {
    id: 145,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    unique_ptr<int> p = make_unique<int>(42);
    cout << *p << endl;
    return 0;
}`,
    options: ["42", "0", "메모리 주소", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "unique_ptr은 스마트 포인터로 스코프를 벗어나면 자동으로 메모리를 해제합니다. *p로 역참조하면 42가 출력됩니다.",
    keyConceptTitle: "unique_ptr (스마트 포인터)",
    keyConceptDescription: "unique_ptr은 소유권이 유일한 스마트 포인터입니다. 스코프를 벗어나면 자동 delete되어 메모리 누수를 방지합니다.",
    codeComparison: {
      wrong: `int* p = new int(42);
// delete 깜빡하면 메모리 누수!`,
      correct: `unique_ptr<int> p = make_unique<int>(42);
// 자동 해제, 누수 없음!`,
    },
    relatedTopics: ["unique_ptr", "smart pointer", "RAII"],
  },
  {
    id: 146,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 중 메모리 누수가 발생하는 코드는?",
    code: `// A:
int* p = new int(10);
delete p;

// B:
int* p = new int(10);
p = new int(20);
delete p;

// C:
int x = 10;
int* p = &x;

// D:
unique_ptr<int> p = make_unique<int>(10);`,
    options: ["A", "B", "C", "D"],
    correctAnswer: 1,
    explanation: "B에서 p = new int(20)을 할당할 때 처음 할당한 new int(10)의 주소를 잃어버려 delete할 수 없습니다. 이것이 메모리 누수입니다.",
    keyConceptTitle: "메모리 누수 (Memory Leak)",
    keyConceptDescription: "동적 할당한 메모리의 주소를 잃어버리면 해제할 수 없어 메모리 누수가 발생합니다. 스마트 포인터로 예방할 수 있습니다.",
    relatedTopics: ["메모리 누수", "delete", "스마트 포인터"],
  },
  {
    id: 147,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드에서 unique_ptr의 소유권 이전 후 출력 결과는?",
    code: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    unique_ptr<int> p1 = make_unique<int>(100);
    unique_ptr<int> p2 = move(p1);
    if (p1 == nullptr)
        cout << "p1은 null ";
    cout << *p2;
    return 0;
}`,
    options: ["100", "p1은 null 100", "컴파일 오류", "런타임 오류"],
    correctAnswer: 1,
    explanation: "move()로 소유권을 p1에서 p2로 이전하면 p1은 nullptr이 됩니다. p2는 100을 가리킵니다.",
    keyConceptTitle: "unique_ptr 소유권 이전 (move)",
    keyConceptDescription: "unique_ptr은 복사 불가, move로만 소유권을 이전할 수 있습니다. 이전 후 원래 포인터는 nullptr이 됩니다.",
    codeComparison: {
      wrong: `unique_ptr<int> p2 = p1;  // 컴파일 오류! 복사 불가`,
      correct: `unique_ptr<int> p2 = move(p1);  // 소유권 이전 OK`,
    },
    relatedTopics: ["unique_ptr", "move", "소유권", "RAII"],
  },
  {
    id: 149,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 10;
    int* p1 = &a;
    int* p2 = &b;
    *p1 = *p2;
    cout << a << " " << b << " ";
    cout << (p1 == p2 ? "같음" : "다름");
    return 0;
}`,
    options: ["10 10 같음", "10 10 다름", "5 10 다름", "5 5 같음"],
    correctAnswer: 1,
    explanation: "*p1 = *p2는 값만 복사합니다. a=10, b=10이지만 p1과 p2는 여전히 다른 주소를 가리킵니다.",
    keyConceptTitle: "값 복사 vs 포인터 복사",
    keyConceptDescription: "*p1 = *p2는 가리키는 값을 복사합니다. p1 = p2는 같은 주소를 가리키게 합니다. 중요한 차이입니다.",
    relatedTopics: ["포인터 역참조", "값 복사", "주소 비교"],
  },
  {
    id: 150,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드에서 메모리 누수가 발생하는 이유는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int* p = new int(42);
    p = new int(100);
    delete p;
    return 0;
}`,
    options: ["delete를 두 번 해야 함", "첫 번째 new로 할당한 메모리를 해제하지 않음", "delete 대신 free를 써야 함", "메모리 누수 없음"],
    correctAnswer: 1,
    explanation: "p가 새 메모리를 가리키면서 첫 번째 할당(42)의 주소를 잃어버립니다. 해제할 방법이 없는 메모리 누수입니다.",
    keyConceptTitle: "메모리 누수",
    keyConceptDescription: "new로 할당한 메모리를 delete하기 전에 포인터를 다른 곳에 재할당하면 누수가 발생합니다.",
    codeComparison: {
      wrong: `int* p = new int(42);
p = new int(100);  // 42 메모리 누수!`,
      correct: `int* p = new int(42);
delete p;
p = new int(100);`,
    },
    relatedTopics: ["메모리 누수", "new/delete", "스마트 포인터"],
  },
  {
    id: 151,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    const int x = 10;
    const int* p1 = &x;
    int y = 20;
    int* const p2 = &y;
    // *p1 = 20;  // 오류
    // p2 = &x;   // 오류
    *p2 = 30;
    cout << *p1 << " " << *p2;
    return 0;
}`,
    options: ["10 30", "20 30", "10 20", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "const int* p1: 가리키는 값 수정 불가. int* const p2: 포인터 자체 변경 불가, 값은 수정 가능. *p2=30은 OK.",
    keyConceptTitle: "const 포인터 vs 포인터 to const",
    keyConceptDescription: "const int* p: 값 수정 불가. int* const p: 주소 변경 불가. const int* const p: 둘 다 불가.",
    relatedTopics: ["const", "포인터", "읽기 전용"],
  },
  {
    id: 152,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int** pp;
    int* p;
    int x = 5;
    p = &x;
    pp = &p;
    **pp = 25;
    cout << x << " " << *p << " " << **pp;
    return 0;
}`,
    options: ["5 5 5", "25 25 25", "5 25 25", "25 5 25"],
    correctAnswer: 1,
    explanation: "**pp = 25는 pp→p→x에 25를 대입합니다. x, *p, **pp 모두 같은 메모리를 가리키므로 25입니다.",
    keyConceptTitle: "이중 포인터",
    keyConceptDescription: "int** pp는 포인터의 포인터입니다. **pp로 최종 값에 접근합니다. 2차원 배열이나 함수에서 포인터를 변경할 때 사용합니다.",
    relatedTopics: ["이중 포인터", "역참조", "다차원 배열"],
  },
  {
    id: 153,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드에서 shared_ptr의 참조 카운트는?",
    code: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    auto p1 = make_shared<int>(42);
    auto p2 = p1;
    auto p3 = p1;
    cout << p1.use_count();
    return 0;
}`,
    options: ["1", "2", "3", "0"],
    correctAnswer: 2,
    explanation: "p1, p2, p3 모두 같은 메모리를 공유합니다. use_count()는 참조 카운트 3을 반환합니다.",
    keyConceptTitle: "shared_ptr 참조 카운트",
    keyConceptDescription: "shared_ptr은 여러 포인터가 같은 메모리를 공유합니다. 참조 카운트가 0이 되면 자동 해제됩니다.",
    relatedTopics: ["shared_ptr", "참조 카운트", "자동 메모리 관리"],
  },
  {
    id: 154,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int a[] = {1, 2, 3, 4, 5};
    int* p = a + 2;
    cout << p[-1] << " " << p[0] << " " << p[1];
    return 0;
}`,
    options: ["1 2 3", "2 3 4", "3 4 5", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "p = a+2 → p는 a[2]를 가리킴. p[-1]=a[1]=2, p[0]=a[2]=3, p[1]=a[3]=4.",
    keyConceptTitle: "음수 인덱스와 포인터",
    keyConceptDescription: "p[n]은 *(p+n)과 같습니다. 음수 인덱스도 유효하며 앞쪽 메모리를 참조합니다(범위 내에서).",
    relatedTopics: ["포인터 산술", "음수 인덱스", "배열"],
  },
  {
    id: 155,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드에서 발생하는 문제는?",
    code: `#include <iostream>
using namespace std;

int main() {
    int* p = new int(10);
    int* q = p;
    delete p;
    delete q;
    return 0;
}`,
    options: ["메모리 누수", "이중 해제 (double free)", "dangling pointer 접근", "문제 없음"],
    correctAnswer: 1,
    explanation: "p와 q는 같은 메모리를 가리킵니다. delete p 후 delete q는 이중 해제로 정의되지 않은 동작입니다.",
    keyConceptTitle: "이중 해제 (Double Free)",
    keyConceptDescription: "같은 메모리를 두 번 delete하면 UB입니다. 여러 포인터가 같은 메모리를 가리킬 때 주의하세요.",
    relatedTopics: ["double free", "소유권", "스마트 포인터"],
  },
  {
    id: 156,
    lessonId: "cpp-14",
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
    lessonId: "cpp-12",
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
    lessonId: "cpp-14",
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
    lessonId: "cpp-14",
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
    id: 162,
    lessonId: "cpp-14",
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

class Dog : public Animal {
public:
    void speak() override { cout << "멍멍"; }
};

int main() {
    Animal* a = new Cat();
    a->speak();
    delete a;
    return 0;
}`,
    options: ["...", "야옹", "멍멍", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "virtual 함수이므로 실제 객체 타입(Cat)의 speak()가 호출됩니다. 이것이 다형성입니다.",
    keyConceptTitle: "다형성 (Polymorphism)",
    keyConceptDescription: "virtual 함수는 포인터/참조의 타입이 아닌 실제 객체의 타입에 따라 호출됩니다.",
    relatedTopics: ["virtual", "다형성", "override"],
    animationKey: "cppClassBuilder",
  },
  {
    id: 163,
    lessonId: "cpp-14",
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
    lessonId: "cpp-14",
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
    id: 165,
    lessonId: "cpp-14",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Singleton {
    static Singleton* instance;
    int value;
    Singleton(int v) : value(v) {}
public:
    static Singleton* getInstance(int v = 0) {
        if (!instance) instance = new Singleton(v);
        return instance;
    }
    int getValue() { return value; }
};
Singleton* Singleton::instance = nullptr;

int main() {
    auto a = Singleton::getInstance(42);
    auto b = Singleton::getInstance(100);
    cout << a->getValue() << " " << b->getValue();
    return 0;
}`,
    options: ["42 100", "42 42", "100 100", "0 0"],
    correctAnswer: 1,
    explanation: "싱글톤 패턴: 첫 호출에서만 인스턴스가 생성됩니다. 두 번째 호출은 기존 인스턴스를 반환하므로 둘 다 42.",
    keyConceptTitle: "싱글톤 패턴",
    keyConceptDescription: "싱글톤은 클래스의 인스턴스가 하나만 존재하도록 보장합니다. getInstance()로만 접근합니다.",
    relatedTopics: ["싱글톤", "디자인 패턴", "static"],
  },
  {
    id: 166,
    lessonId: "cpp-14",
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
    lessonId: "cpp-14",
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
    lessonId: "cpp-14",
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
    id: 169,
    lessonId: "cpp-14",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Animal {
public:
    virtual string type() { return "동물"; }
};

class Cat : public Animal {
public:
    string type() override { return "고양이"; }
};

int main() {
    Cat c;
    Animal& ref = c;
    cout << ref.type();
    return 0;
}`,
    options: ["동물", "고양이", "Cat", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "virtual 함수이므로 참조 ref를 통해서도 실제 객체 Cat의 type()이 호출됩니다.",
    keyConceptTitle: "참조와 다형성",
    keyConceptDescription: "포인터뿐 아니라 참조를 통해서도 virtual 함수의 동적 바인딩이 적용됩니다.",
    relatedTopics: ["참조", "다형성", "virtual"],
  },
  {
    id: 170,
    lessonId: "cpp-14",
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
    lessonId: "cpp-14",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

enum Color { RED, GREEN, BLUE };

int main() {
    Color c = GREEN;
    switch (c) {
        case RED: cout << "빨강"; break;
        case GREEN: cout << "초록"; break;
        case BLUE: cout << "파랑"; break;
    }
    cout << " (" << c << ")";
    return 0;
}`,
    options: ["초록 (GREEN)", "초록 (1)", "초록 (0)", "빨강 (0)"],
    correctAnswer: 1,
    explanation: "enum에서 GREEN=1 (RED=0부터 시작). cout << c는 정수값 1을 출력합니다.",
    keyConceptTitle: "enum 열거형",
    keyConceptDescription: "enum은 기본적으로 0부터 시작하는 정수입니다. cout으로 출력하면 정수값이 나옵니다.",
    relatedTopics: ["enum", "열거형", "switch"],
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
    lessonId: "cpp-14",
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
    id: 174,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    int balance;
public:
    BankAccount(int b) : balance(b) {}
    void deposit(int amount) {
        if (amount > 0) balance += amount;
    }
    void withdraw(int amount) {
        if (amount > 0 && amount <= balance) balance -= amount;
    }
    int getBalance() { return balance; }
};

int main() {
    BankAccount acc(1000);
    acc.deposit(500);
    acc.withdraw(200);
    cout << acc.getBalance();
    return 0;
}`,
    options: ["1000", "1300", "1500", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "1000 + 500 - 200 = 1300. setter처럼 deposit/withdraw에서 검증하고 balance를 변경합니다. private이라 직접 접근은 불가능해요.",
    keyConceptTitle: "캡슐화 실전",
    keyConceptDescription: "private 멤버는 외부에서 직접 수정 불가. public 메서드에서 검증 후 변경하는 것이 캡슐화의 핵심입니다.",
    relatedTopics: ["캡슐화", "private", "getter/setter"],
  },
  {
    id: 175,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드에서 컴파일 오류가 발생하는 줄은?",
    code: `#include <iostream>
#include <string>
using namespace std;

class Dog {
    string name;  // (A) — private 기본
public:
    Dog(string n) : name(n) {}
    string getName() { return name; }
};

int main() {
    Dog d("바둑이");
    cout << d.getName();   // (B)
    cout << d.name;        // (C)
    return 0;
}`,
    options: ["(A)줄", "(B)줄", "(C)줄", "오류 없음"],
    correctAnswer: 2,
    explanation: "class에서 접근 제어를 명시하지 않으면 기본이 private입니다. (C)의 d.name은 외부에서 private 멤버에 직접 접근하므로 컴파일 오류가 납니다. (B)의 getName()은 public이라 괜찮아요.",
    keyConceptTitle: "class 기본 접근 권한",
    keyConceptDescription: "class 멤버는 기본 private입니다. 외부에서 접근하려면 public:으로 명시해야 합니다.",
    codeComparison: {
      wrong: `class Dog {
    string name;  // 기본 private — 외부 접근 불가!`,
      correct: `class Dog {
public:
    string name;  // public으로 명시해야 외부 접근 가능`,
    },
    relatedTopics: ["class", "private", "접근 제어"],
  },
  {
    id: 176,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드에서 컴파일 오류가 발생하는 줄은?",
    code: `#include <iostream>
using namespace std;

class Account {
private:
    int balance;
public:
    Account(int b) : balance(b) {}
    int getBalance() { return balance; }
};

int main() {
    Account acc(1000);
    cout << acc.getBalance();  // 1번 줄
    cout << acc.balance;       // 2번 줄
    return 0;
}`,
    options: ["1번 줄", "2번 줄", "둘 다 오류", "오류 없음"],
    correctAnswer: 1,
    explanation: "balance는 private이므로 클래스 외부에서 직접 접근할 수 없습니다. getBalance()를 통해서만 접근 가능합니다.",
    keyConceptTitle: "접근 제어 (public/private/protected)",
    keyConceptDescription: "private: 클래스 내부만 접근. public: 어디서든 접근. protected: 클래스와 자식 클래스만 접근. 캡슐화의 핵심입니다.",
    relatedTopics: ["접근 제어", "캡슐화", "getter/setter"],
  },
  {
    id: 177,
    lessonId: "cpp-14",
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
    id: 178,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Vector2D {
public:
    int x, y;
    Vector2D(int x, int y) : x(x), y(y) {}
    Vector2D operator+(const Vector2D& v) {
        return Vector2D(x + v.x, y + v.y);
    }
};

int main() {
    Vector2D a(1, 2), b(3, 4);
    Vector2D c = a + b;
    cout << c.x << " " << c.y;
    return 0;
}`,
    options: ["1 2", "3 4", "4 6", "컴파일 오류"],
    correctAnswer: 2,
    explanation: "operator+를 오버로딩하여 두 벡터의 덧셈을 정의했습니다. (1+3, 2+4) = (4, 6)",
    keyConceptTitle: "연산자 오버로딩 (Operator Overloading)",
    keyConceptDescription: "C++에서는 +, -, ==, << 등의 연산자를 사용자 정의 타입에 대해 재정의할 수 있습니다.",
    relatedTopics: ["연산자 오버로딩", "operator", "클래스"],
  },
  {
    id: 179,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Animal {
public:
    virtual void speak() { cout << "..."; }
};

class Dog : public Animal {
public:
    void speak() override { cout << "멍멍"; }
};

class Cat : public Animal {
public:
    void speak() override { cout << "야옹"; }
};

int main() {
    Animal* a = new Dog();
    a->speak();
    delete a;
    return 0;
}`,
    options: ["...", "멍멍", "야옹", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "virtual 함수이므로 포인터 타입(Animal*)이 아닌 실제 객체 타입(Dog)의 speak()이 호출됩니다. 이것이 다형성입니다.",
    keyConceptTitle: "가상 함수 (virtual)와 다형성",
    keyConceptDescription: "virtual 키워드가 있으면 실행 시간에 실제 객체 타입에 따라 함수가 호출됩니다(동적 바인딩). 다형성의 핵심입니다.",
    codeComparison: {
      wrong: `void speak() { ... }  // virtual 없으면
// Animal*로 호출 시 Animal::speak() 실행`,
      correct: `virtual void speak() { ... }
// Animal*로 호출해도 실제 타입의 speak() 실행`,
    },
    relatedTopics: ["virtual", "다형성", "override", "동적 바인딩"],
  },
  {
    id: 180,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드에서 컴파일 오류가 발생하는 이유는?",
    code: `#include <iostream>
using namespace std;

class Shape {
public:
    virtual double area() = 0;  // 순수 가상 함수
};

int main() {
    Shape s;  // 오류 발생!
    return 0;
}`,
    options: ["Shape 클래스에 생성자가 없어서", "area() 함수에 body가 없어서", "Shape은 추상 클래스이므로 객체를 생성할 수 없어서", "virtual 키워드가 잘못 사용되어서"],
    correctAnswer: 2,
    explanation: "= 0으로 선언된 순수 가상 함수가 있으면 추상 클래스가 되어 직접 객체를 생성할 수 없습니다.",
    keyConceptTitle: "순수 가상 함수와 추상 클래스",
    keyConceptDescription: "virtual 함수() = 0은 순수 가상 함수입니다. 하나라도 있으면 추상 클래스가 되어 반드시 자식 클래스에서 구현해야 합니다.",
    relatedTopics: ["순수 가상 함수", "추상 클래스", "인터페이스"],
  },
  {
    id: 181,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 다형성 코드에서 shapes[0]->area()의 결과는?",
    code: `#include <iostream>
using namespace std;

class Shape {
public:
    virtual double area() = 0;
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() override { return 3.14 * r * r; }
};

int main() {
    Shape* s = new Circle(5);
    cout << s->area();
    delete s;
    return 0;
}`,
    options: ["0", "15.7", "78.5", "컴파일 오류"],
    correctAnswer: 2,
    explanation: "Circle(5)의 area() = 3.14 * 5 * 5 = 78.5. 다형성으로 Shape* 포인터를 통해 Circle의 area()가 호출됩니다.",
    keyConceptTitle: "다형성 (Polymorphism) 활용",
    keyConceptDescription: "기본 클래스 포인터로 자식 클래스 객체를 관리하고, 오버라이딩된 가상 함수를 호출할 수 있습니다.",
    relatedTopics: ["다형성", "추상 클래스", "가상 함수"],
  },
  {
    id: 182,
    lessonId: "cpp-14",
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
    lessonId: "cpp-14",
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
    id: 184,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드에서 virtual 소멸자가 없으면 발생하는 문제는?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    ~Base() { cout << "Base 소멸 "; }
};

class Derived : public Base {
    int* data;
public:
    Derived() { data = new int[100]; }
    ~Derived() { delete[] data; cout << "Derived 소멸 "; }
};

int main() {
    Base* p = new Derived();
    delete p;
    return 0;
}`,
    options: ["컴파일 오류", "Derived 소멸자만 호출됨", "Base 소멸자만 호출되어 메모리 누수 발생", "둘 다 정상적으로 호출됨"],
    correctAnswer: 2,
    explanation: "Base 소멸자가 virtual이 아니면 Base* 포인터로 delete할 때 Derived 소멸자가 호출되지 않아 data가 해제되지 않습니다.",
    keyConceptTitle: "가상 소멸자 (Virtual Destructor)",
    keyConceptDescription: "상속 관계에서 기본 클래스 포인터로 delete할 때는 반드시 virtual ~소멸자()를 선언해야 자식 소멸자가 호출됩니다.",
    codeComparison: {
      wrong: `class Base {
public:
    ~Base() { }  // Derived 소멸자 호출 안 됨!`,
      correct: `class Base {
public:
    virtual ~Base() { }  // Derived 소멸자도 호출됨`,
    },
    relatedTopics: ["가상 소멸자", "virtual", "메모리 누수"],
  },
  {
    id: 185,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    void show() { cout << name; }
};

int main() {
    Dog d("바둑이");
    d.show();
    return 0;
}`,
    options: ["바둑이", "컴파일 오류", "빈 문자열", "0"],
    correctAnswer: 0,
    explanation: "protected 멤버는 자식 클래스에서 접근할 수 있습니다. Dog::show()에서 name에 접근하여 \"바둑이\"를 출력합니다.",
    keyConceptTitle: "protected 접근 제어",
    keyConceptDescription: "protected는 클래스 외부에서는 접근 불가하지만, 자식 클래스에서는 접근 가능합니다. private과 public의 중간입니다.",
    relatedTopics: ["protected", "상속", "접근 제어"],
  },
  {
    id: 186,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Counter {
    static int count;
public:
    Counter() { count++; }
    static int getCount() { return count; }
};

int Counter::count = 0;

int main() {
    Counter c1, c2, c3;
    cout << Counter::getCount();
    return 0;
}`,
    options: ["0", "1", "3", "컴파일 오류"],
    correctAnswer: 2,
    explanation: "static 멤버 변수 count는 모든 객체가 공유합니다. 3개의 객체가 생성되면서 count가 3번 증가합니다.",
    keyConceptTitle: "static 멤버 변수",
    keyConceptDescription: "static 멤버는 클래스의 모든 객체가 공유합니다. 클래스 외부에서 초기화해야 하며, 클래스이름::으로 접근 가능합니다.",
    relatedTopics: ["static", "클래스", "공유 변수"],
  },
  {
    id: 187,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    void show() { cout << "Base "; }
};

class Derived : public Base {
public:
    void show() { cout << "Derived "; }
};

int main() {
    Base* p = new Derived();
    p->show();
    Derived d;
    d.show();
    delete p;
    return 0;
}`,
    options: ["Derived Derived", "Base Derived", "Base Base", "Derived Base"],
    correctAnswer: 1,
    explanation: "show()가 virtual이 아니므로 Base*를 통한 호출은 Base::show()를 실행합니다. Derived 객체로 직접 호출하면 Derived::show()가 실행됩니다.",
    keyConceptTitle: "virtual 없는 함수 오버라이딩",
    keyConceptDescription: "virtual이 없으면 포인터/참조의 정적 타입에 따라 함수가 결정됩니다(정적 바인딩). 다형성이 필요하면 반드시 virtual을 사용하세요.",
    codeComparison: {
      wrong: `void show() { }  // virtual 없음
Base* p = new Derived();
p->show();  // Base::show() 호출!`,
      correct: `virtual void show() { }
Base* p = new Derived();
p->show();  // Derived::show() 호출!`,
    },
    relatedTopics: ["virtual", "정적 바인딩", "동적 바인딩"],
  },
  {
    id: 189,
    lessonId: "cpp-20",
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
    id: 190,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    Base() { cout << "B"; }
    virtual ~Base() { cout << "~B"; }
};

class Mid : public Base {
public:
    Mid() { cout << "M"; }
    ~Mid() { cout << "~M"; }
};

class Derived : public Mid {
public:
    Derived() { cout << "D"; }
    ~Derived() { cout << "~D"; }
};

int main() {
    Base* p = new Derived();
    delete p;
    return 0;
}`,
    options: ["BMD~B", "BMD~D~M~B", "DMB~B~M~D", "BMD~B~M~D"],
    correctAnswer: 1,
    explanation: "생성: Base→Mid→Derived (BMD). virtual 소멸자로 소멸: Derived→Mid→Base (~D~M~B). 순서가 역순입니다.",
    keyConceptTitle: "다단계 상속의 생성/소멸 순서",
    keyConceptDescription: "생성자는 부모→자식 순서로, 소멸자는 자식→부모 순서로 호출됩니다. virtual 소멸자가 있어야 모든 소멸자가 호출됩니다.",
    relatedTopics: ["상속", "생성자", "소멸자", "virtual"],
  },
  {
    id: 191,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    auto p1 = make_unique<int>(42);
    cout << *p1 << " ";
    auto p2 = move(p1);
    cout << *p2 << " ";
    cout << (p1 == nullptr ? "null" : "valid");
    return 0;
}`,
    options: ["42 42 valid", "42 42 null", "42 0 null", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "move(p1)로 소유권이 p2로 이전됩니다. p1은 nullptr이 되고, p2가 42를 가리킵니다.",
    keyConceptTitle: "unique_ptr과 이동 의미론",
    keyConceptDescription: "unique_ptr은 하나의 소유자만 허용합니다. move()로 소유권을 이전하면 원래 포인터는 nullptr이 됩니다.",
    relatedTopics: ["unique_ptr", "move", "스마트 포인터"],
  },
  {
    id: 192,
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    id: 194,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드에서 virtual 소멸자가 필요한 이유는?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    ~Base() { cout << "~Base "; }
};

class Derived : public Base {
    int* data;
public:
    Derived() { data = new int[100]; }
    ~Derived() { delete[] data; cout << "~Derived "; }
};

int main() {
    Base* p = new Derived();
    delete p;
    return 0;
}`,
    options: ["정상 동작한다", "~Derived가 호출되지 않아 메모리 누수", "컴파일 오류", "~Base만 두 번 호출"],
    correctAnswer: 1,
    explanation: "Base의 소멸자가 virtual이 아니므로 delete p에서 ~Derived가 호출되지 않아 data가 해제되지 않습니다.",
    keyConceptTitle: "virtual 소멸자의 중요성",
    keyConceptDescription: "다형적 삭제(부모 포인터로 자식 삭제) 시 virtual ~Base()가 없으면 자식 소멸자가 호출되지 않습니다.",
    codeComparison: {
      wrong: `class Base {
public:
    ~Base() {}  // non-virtual`,
      correct: `class Base {
public:
    virtual ~Base() {}  // virtual 소멸자`,
    },
    relatedTopics: ["virtual 소멸자", "메모리 누수", "다형적 삭제"],
  },
  {
    id: 195,
    lessonId: "cpp-20",
    difficulty: "어려움",
    question: "다음 코드에서 컴파일 오류가 발생하는 줄은?",
    code: `#include <iostream>
using namespace std;

class MyClass {
    int secret;           // 1
public:
    int pub;
    MyClass(int s) : secret(s), pub(s*2) {}  // 2
};

class Child : public MyClass {
public:
    Child(int s) : MyClass(s) {}  // 3
    void show() {
        cout << secret;   // 4
        cout << pub;      // 5
    }
};

int main() {
    Child c(5);
    c.show();
    return 0;
}`,
    options: ["1번 줄", "3번 줄", "4번 줄 (private 접근 불가)", "5번 줄"],
    correctAnswer: 2,
    explanation: "secret은 private이므로 자식 클래스에서도 접근할 수 없습니다. protected로 선언해야 자식에서 접근 가능합니다.",
    keyConceptTitle: "접근 제어자와 상속",
    keyConceptDescription: "private: 해당 클래스만 접근. protected: 해당 클래스 + 자식 클래스. public: 모두 접근 가능.",
    relatedTopics: ["private", "protected", "public", "접근 제어"],
  },
  {
    id: 196,
    lessonId: "cpp-14",
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
    id: 197,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

template<typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    cout << maximum(3, 7) << " ";
    cout << maximum(3.14, 2.72) << " ";
    cout << maximum<string>("apple", "banana");
    return 0;
}`,
    options: ["7 3.14 banana", "3 2.72 apple", "7 3.14 apple", "컴파일 오류"],
    correctAnswer: 0,
    explanation: "template 함수는 타입에 맞게 자동으로 인스턴스화됩니다. string 비교에서 'b' > 'a'이므로 banana.",
    keyConceptTitle: "함수 템플릿",
    keyConceptDescription: "template<typename T>로 여러 타입에 동작하는 함수를 작성할 수 있습니다. 컴파일 시 타입이 결정됩니다.",
    relatedTopics: ["template", "제네릭 프로그래밍", "타입 추론"],
  },
  {
    id: 198,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <memory>
using namespace std;

struct Node {
    int val;
    shared_ptr<Node> next;
    Node(int v) : val(v), next(nullptr) {}
    ~Node() { cout << "~" << val << " "; }
};

int main() {
    {
        auto a = make_shared<Node>(1);
        auto b = make_shared<Node>(2);
        a->next = b;
    }
    cout << "끝";
    return 0;
}`,
    options: ["~1 ~2 끝", "~2 ~1 끝", "끝", "끝 ~1 ~2"],
    correctAnswer: 1,
    explanation: "블록 종료 시 b가 먼저 소멸 시도되지만 a->next가 참조 중. a 소멸 시 next(b) 해제 → ~2, 그 후 ~1. 순서: ~2 ~1 끝.",
    keyConceptTitle: "shared_ptr 소멸 순서",
    keyConceptDescription: "shared_ptr의 소멸은 참조 카운트가 0이 될 때 일어납니다. 소멸 순서는 의존 관계에 따릅니다.",
    relatedTopics: ["shared_ptr", "소멸 순서", "순환 참조"],
  },
  {
    id: 199,
    lessonId: "cpp-14",
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
    id: 200,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드에서 발생하는 문제는?",
    code: `#include <iostream>
using namespace std;

class Resource {
    int* data;
public:
    Resource(int val) { data = new int(val); }
    ~Resource() { delete data; }
};

int main() {
    Resource a(42);
    Resource b = a;  // 복사
    return 0;
}`,
    options: ["메모리 누수", "이중 해제 (double free)", "컴파일 오류", "문제 없음"],
    correctAnswer: 1,
    explanation: "기본 복사 생성자는 포인터를 그대로 복사(얕은 복사)합니다. a와 b가 같은 data를 가리켜 소멸 시 이중 해제됩니다.",
    keyConceptTitle: "얕은 복사 문제 (Rule of Three)",
    keyConceptDescription: "동적 메모리를 가진 클래스는 복사 생성자, 대입 연산자, 소멸자를 모두 정의해야 합니다(Rule of Three).",
    codeComparison: {
      wrong: `Resource b = a;  // 얕은 복사: 같은 포인터!`,
      correct: `Resource(const Resource& other) {
    data = new int(*other.data);  // 깊은 복사
}`,
    },
    relatedTopics: ["얕은 복사", "깊은 복사", "Rule of Three"],
  },
  {
    id: 201,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드에서 CRTP(Curiously Recurring Template Pattern)의 용도는?",
    code: `#include <iostream>
using namespace std;

template<typename Derived>
class Shape {
public:
    double area() {
        return static_cast<Derived*>(this)->areaImpl();
    }
};

class Circle : public Shape<Circle> {
    double r;
public:
    Circle(double r) : r(r) {}
    double areaImpl() { return 3.14 * r * r; }
};

int main() {
    Circle c(5);
    cout << c.area();
    return 0;
}`,
    options: ["런타임 다형성", "정적(컴파일 타임) 다형성", "동적 메모리 관리", "예외 처리"],
    correctAnswer: 1,
    explanation: "CRTP는 virtual 없이 컴파일 타임에 다형성을 구현합니다. virtual의 런타임 오버헤드가 없습니다.",
    keyConceptTitle: "CRTP 패턴",
    keyConceptDescription: "파생 클래스를 템플릿 인자로 전달하여 컴파일 타임 다형성을 구현합니다. 성능이 중요할 때 사용합니다.",
    relatedTopics: ["CRTP", "정적 다형성", "template"],
  },
  {
    id: 202,
    lessonId: "cpp-14",
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
    id: 203,
    lessonId: "cpp-14",
    difficulty: "어려움",
    question: "다음 코드에서 move 의미론의 효과는?",
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    string s = "Hello World";
    vector<string> v;
    v.push_back(move(s));
    cout << "v[0]: " << v[0] << endl;
    cout << "s: [" << s << "]";
    return 0;
}`,
    options: ["v[0]: Hello World\\ns: [Hello World]", "v[0]: Hello World\\ns: []", "v[0]: \\ns: [Hello World]", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "move(s)는 s의 내용을 v[0]으로 이동시킵니다. 이동 후 s는 비어있는 상태가 됩니다(유효하지만 불확정).",
    keyConceptTitle: "이동 의미론 (Move Semantics)",
    keyConceptDescription: "move()는 복사 대신 내부 자원을 이동하여 성능을 향상시킵니다. 이동 후 원본은 유효하지만 비어있습니다.",
    relatedTopics: ["move", "이동 의미론", "성능 최적화"],
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
    question: "다음 코드에서 auto와 structured binding의 출력 결과는?",
    code: `#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, int> m = {{"a", 1}, {"b", 2}, {"c", 3}};
    for (auto& [key, val] : m) {
        val *= 10;
    }
    cout << m["b"];
    return 0;
}`,
    options: ["2", "20", "10", "컴파일 오류"],
    correctAnswer: 1,
    explanation: "auto& [key, val]은 C++17 structured binding으로 pair의 first/second를 직접 바인딩합니다. val *= 10으로 원본이 수정됩니다.",
    keyConceptTitle: "Structured Binding (C++17)",
    keyConceptDescription: "auto [key, val] = pair 또는 tuple의 요소를 개별 변수에 바인딩합니다. &를 쓰면 참조로 원본 수정 가능.",
    relatedTopics: ["structured binding", "auto", "C++17"],
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
    lessonId: "cpp-17",
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
    id: 221,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    int total = accumulate(v.begin(), v.end(), 0);
    cout << total;
    return 0;
}`,
    options: ["10", "15", "5", "0"],
    correctAnswer: 1,
    explanation: "accumulate는 범위 내 모든 값을 누적합니다. 초기값 0에서 1+2+3+4+5 = 15",
    keyConceptTitle: "accumulate (누적 합산)",
    keyConceptDescription: "accumulate(시작, 끝, 초기값)은 범위의 모든 요소를 합산합니다. <numeric> 헤더에 있습니다.",
    relatedTopics: ["accumulate", "numeric", "합산"],
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
    lessonId: "cpp-17",
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
    lessonId: "cpp-17",
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
    lessonId: "cpp-17",
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
    id: 229,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end(), [](int a, int b) {
        return a > b;
    });
    for (int x : v) cout << x << " ";
    return 0;
}`,
    options: ["1 1 3 4 5", "5 4 3 1 1", "3 1 4 1 5", "1 3 1 4 5"],
    correctAnswer: 1,
    explanation: "람다 비교 함수에서 a > b를 반환하므로 내림차순 정렬됩니다. 5 4 3 1 1.",
    keyConceptTitle: "람다로 커스텀 정렬",
    keyConceptDescription: "sort()의 세 번째 인자로 비교 함수를 전달하면 정렬 기준을 변경할 수 있습니다. a > b는 내림차순.",
    relatedTopics: ["sort", "람다", "비교 함수"],
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
    id: 233,
    lessonId: "cpp-17",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 3, 1, 4, 2};
    auto [minIt, maxIt] = minmax_element(v.begin(), v.end());
    cout << *minIt << " " << *maxIt;
    return 0;
}`,
    options: ["1 5", "5 1", "0 4", "1 4"],
    correctAnswer: 0,
    explanation: "minmax_element는 최솟값과 최댓값의 iterator를 pair로 반환합니다. 구조적 바인딩으로 분리합니다.",
    keyConceptTitle: "minmax_element와 구조적 바인딩",
    keyConceptDescription: "minmax_element는 한 번의 순회로 최솟값과 최댓값을 동시에 찾습니다. C++17의 auto [a,b]로 편리하게 사용.",
    relatedTopics: ["minmax_element", "구조적 바인딩", "C++17"],
  },
  {
    id: 234,
    lessonId: "cpp-17",
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
    lessonId: "cpp-17",
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
    lessonId: "cpp-17",
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
    lessonId: "cpp-17",
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
    lessonId: "cpp-17",
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
    lessonId: "cpp-17",
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
    id: 245,
    lessonId: "cpp-17",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int,string>> v = {{3,"C"}, {1,"A"}, {2,"B"}, {1,"D"}};
    stable_sort(v.begin(), v.end(), [](auto& a, auto& b) {
        return a.first < b.first;
    });
    for (auto& p : v) cout << p.second << " ";
    return 0;
}`,
    options: ["A D B C", "D A B C", "C B A D", "A B C D"],
    correctAnswer: 0,
    explanation: "stable_sort는 같은 키(1)의 원래 순서를 유지합니다. {1,A},{1,D}의 순서가 보존되어 A D B C.",
    keyConceptTitle: "stable_sort와 안정 정렬",
    keyConceptDescription: "stable_sort는 같은 키를 가진 원소의 상대적 순서를 보존합니다. sort는 보존하지 않을 수 있습니다.",
    relatedTopics: ["stable_sort", "안정 정렬", "pair"],
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
    id: 248,
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
    options: ["10 20", "30 20", "30 10", "10 30"],
    correctAnswer: 1,
    explanation: "stack은 LIFO(Last In First Out)입니다. top()=30(마지막 push), pop() 후 top()=20.",
    keyConceptTitle: "stack (스택)",
    keyConceptDescription: "stack은 LIFO 구조입니다. push()로 삽입, pop()으로 제거, top()으로 맨 위 확인합니다.",
    relatedTopics: ["stack", "LIFO", "STL 컨테이너"],
  },
  {
    id: 249,
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
    explanation: "queue는 FIFO(First In First Out)입니다. front()=10(먼저 push된 것), pop() 후 front()=20.",
    keyConceptTitle: "queue (큐)",
    keyConceptDescription: "queue는 FIFO 구조입니다. push()로 뒤에 삽입, pop()으로 앞에서 제거, front()로 앞 확인.",
    relatedTopics: ["queue", "FIFO", "deque"],
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
    lessonId: "cpp-18",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    id: 256,
    lessonId: "cpp-20",
    difficulty: "보통",
    question: "다음 코드에서 빈칸에 들어갈 알맞은 것은?",
    code: `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(_____);
}

int main() {
    cout << gcd(12, 8);
    return 0;
}`,
    options: ["a, b-1", "b, a%b", "a-b, b", "a/b, b"],
    correctAnswer: 1,
    explanation: "유클리드 호제법: gcd(a,b) = gcd(b, a%b). gcd(12,8)→gcd(8,4)→gcd(4,0)=4.",
    keyConceptTitle: "유클리드 호제법",
    keyConceptDescription: "두 수의 최대공약수를 구하는 효율적인 알고리즘입니다. gcd(a,b) = gcd(b, a%b), b=0이면 a가 결과.",
    relatedTopics: ["GCD", "유클리드 호제법", "재귀"],
  },
  {
    id: 257,
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    lessonId: "cpp-20",
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
    id: 301,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "다음 재귀 함수의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    cout << factorial(4);
    return 0;
}`,
    options: ["10", "24", "12", "0"],
    correctAnswer: 1,
    explanation: "factorial(4) = 4 × factorial(3) = 4 × 3 × 2 × 1 = 24입니다. n<=1일 때 1을 반환하는 기저 조건으로 재귀가 멈춰요.",
    keyConceptTitle: "재귀 함수 (Recursion)",
    keyConceptDescription: "재귀 함수는 자기 자신을 호출하는 함수입니다. 반드시 기저 조건(Base Case)이 있어야 무한 호출을 방지합니다.",
    codeComparison: {
      wrong: `int factorial(int n) {
    return n * factorial(n - 1);  // 기저 조건 없음 → 무한 재귀!`,
      correct: `int factorial(int n) {
    if (n <= 1) return 1;  // 기저 조건
    return n * factorial(n - 1);`,
    },
    relatedTopics: ["재귀", "팩토리얼", "기저 조건"],
  },
  {
    id: 302,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "재귀 함수에서 **반드시** 필요한 것은?",
    code: `// 올바른 재귀 구조:
int func(int n) {
    if (n == 0) return 0;   // ???
    return func(n - 1) + 1;
}`,
    options: ["전역 변수", "기저 조건(Base Case)", "반복문(for/while)", "포인터"],
    correctAnswer: 1,
    explanation: "기저 조건이 없으면 함수가 영원히 자신을 호출하여 스택 오버플로우가 발생합니다. 위 코드에서 if (n == 0) return 0;이 기저 조건입니다.",
    keyConceptTitle: "기저 조건 (Base Case)",
    keyConceptDescription: "재귀 함수는 반드시 더 이상 재귀를 하지 않는 기저 조건(종료 조건)이 있어야 합니다. 없으면 무한 재귀로 스택 오버플로우가 발생합니다.",
    relatedTopics: ["기저 조건", "무한 재귀", "스택 오버플로우"],
  },
  {
    id: 303,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "다음 재귀 함수의 출력은?",
    code: `#include <iostream>
using namespace std;

void countdown(int n) {
    if (n <= 0) {
        cout << "발사!";
        return;
    }
    cout << n << " ";
    countdown(n - 1);
}

int main() {
    countdown(3);
    return 0;
}`,
    options: ["발사! 1 2 3 ", "3 2 1 발사!", "1 2 3 발사!", "3 2 1"],
    correctAnswer: 1,
    explanation: "countdown(3) → '3 ' 출력 → countdown(2) → '2 ' 출력 → countdown(1) → '1 ' 출력 → countdown(0) → '발사!' 출력. 결과: 3 2 1 발사!",
    keyConceptTitle: "재귀 실행 순서",
    keyConceptDescription: "재귀 호출 전에 출력하면 큰 수부터 출력됩니다. 재귀 호출 후에 출력하면 기저 조건부터 출력됩니다.",
    relatedTopics: ["재귀 실행 순서", "출력 순서", "재귀 호출"],
  },
  {
    id: 304,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "다음 재귀 함수 sum(5)의 반환값은?",
    code: `int sum(int n) {
    if (n <= 0) return 0;
    return n + sum(n - 1);
}`,
    options: ["10", "15", "20", "5"],
    correctAnswer: 1,
    explanation: "sum(5) = 5 + sum(4) = 5 + 4 + sum(3) = 5+4+3+2+1+0 = 15. 1부터 n까지의 합입니다.",
    keyConceptTitle: "재귀로 합계 구하기",
    keyConceptDescription: "sum(n) = n + sum(n-1)의 관계를 이용해 재귀로 합계를 구할 수 있습니다. 기저 조건은 n<=0일 때 0을 반환합니다.",
    relatedTopics: ["재귀", "합계", "귀납적 정의"],
  },
  {
    id: 305,
    lessonId: "cpp-13",
    difficulty: "쉬움",
    question: "다음 재귀 함수의 결과는?",
    code: `#include <iostream>
using namespace std;

int power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

int main() {
    cout << power(2, 5);
    return 0;
}`,
    options: ["10", "16", "32", "64"],
    correctAnswer: 2,
    explanation: "power(2,5) = 2 × power(2,4) = 2×2×2×2×2×1 = 32. 2^5 = 32입니다. exp==0일 때 1을 반환하는 것이 기저 조건이에요.",
    keyConceptTitle: "재귀로 거듭제곱 계산",
    keyConceptDescription: "base^exp = base × base^(exp-1)의 재귀 관계를 이용합니다. 기저 조건은 exp==0일 때 1입니다.",
    relatedTopics: ["재귀", "거듭제곱", "기저 조건"],
  },
  {
    id: 306,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "피보나치 수열에서 fib(7)의 값은?\n(fib(0)=0, fib(1)=1, fib(n)=fib(n-1)+fib(n-2))",
    code: `int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}`,
    options: ["8", "13", "21", "5"],
    correctAnswer: 1,
    explanation: "fib: 0,1,1,2,3,5,8,13... fib(7)=13입니다. fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5, fib(6)=8, fib(7)=13",
    keyConceptTitle: "피보나치 수열",
    keyConceptDescription: "fib(n) = fib(n-1) + fib(n-2). 두 개의 기저 조건(n=0, n=1)을 가집니다. 단순 재귀는 중복 계산이 많아 느립니다.",
    relatedTopics: ["피보나치", "재귀", "메모이제이션"],
  },
  {
    id: 307,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 재귀 함수의 문제점은?",
    code: `int badRecursion(int n) {
    return n + badRecursion(n + 1);  // n이 증가!
}`,
    options: ["기저 조건이 없다", "반환 타입이 잘못됐다", "매개변수가 잘못됐다", "재귀 호출이 없다"],
    correctAnswer: 0,
    explanation: "기저 조건이 없고, 재귀 호출마다 n이 증가해서 절대 멈추지 않습니다. 스택 오버플로우가 발생해요.",
    keyConceptTitle: "무한 재귀",
    keyConceptDescription: "재귀가 멈추려면 매번 호출마다 문제가 '작아져야' 합니다. n이 증가하면 기저 조건에 도달할 수 없습니다.",
    codeComparison: {
      wrong: `return n + badRecursion(n + 1);  // n이 증가 → 무한!`,
      correct: `if (n <= 0) return 0;
return n + goodRecursion(n - 1);  // n이 감소 → 종료!`,
    },
    relatedTopics: ["무한 재귀", "기저 조건", "재귀 설계"],
  },
  {
    id: 308,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "메모이제이션을 적용한 피보나치에서 fib(5)를 처음 계산할 때 실제 함수 호출 횟수는?",
    code: `int memo[100];

int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    memo[n] = fib(n-1) + fib(n-2);
    return memo[n];
}`,
    options: ["1번", "9번", "31번", "무한번"],
    correctAnswer: 1,
    explanation: "fib(5)를 처음 계산하면: fib(5)→fib(4)→fib(3)→fib(2)→fib(1)+fib(0)가 순서대로 계산됩니다. 총 9번의 호출이 발생합니다. (메모가 없으면 15번)",
    keyConceptTitle: "메모이제이션 효과",
    keyConceptDescription: "메모이제이션은 한 번 계산한 값을 저장합니다. 이미 계산된 값은 O(1)로 반환되어 전체 시간복잡도가 O(n)이 됩니다.",
    relatedTopics: ["메모이제이션", "동적 프로그래밍", "시간복잡도"],
  },
  {
    id: 309,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}

int main() {
    for (int i = 0; i <= 5; i++) {
        cout << fib(i) << " ";
    }
    return 0;
}`,
    options: ["0 1 1 2 3 5 ", "1 1 2 3 5 8 ", "0 1 2 3 4 5 ", "1 2 3 5 8 13 "],
    correctAnswer: 0,
    explanation: "fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5. 피보나치 수열의 처음 6개 항이에요!",
    keyConceptTitle: "피보나치 수열 출력",
    keyConceptDescription: "피보나치는 0부터 시작하는 버전(0,1,1,2,3,5,8...)과 1부터 시작하는 버전(1,1,2,3,5,8...)이 있어요.",
    relatedTopics: ["피보나치", "재귀", "수열"],
  },
  {
    id: 310,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "재귀와 반복문의 비교로 **틀린** 것은?",
    code: `// 재귀 버전
int sumRecursive(int n) {
    if (n <= 0) return 0;
    return n + sumRecursive(n-1);
}

// 반복 버전
int sumLoop(int n) {
    int total = 0;
    for (int i = 1; i <= n; i++) total += i;
    return total;
}`,
    options: ["재귀는 코드가 직관적이다", "반복문은 메모리 효율이 좋다", "재귀는 항상 반복문보다 빠르다", "둘 다 같은 결과를 낸다"],
    correctAnswer: 2,
    explanation: "재귀는 함수 호출 오버헤드와 스택 메모리 사용으로 인해 일반적으로 반복문보다 느립니다. 단순한 경우에는 반복문이 더 효율적이에요.",
    keyConceptTitle: "재귀 vs 반복문",
    keyConceptDescription: "재귀는 코드가 직관적이지만 함수 호출 비용과 스택 메모리가 필요합니다. 반복문은 더 빠르고 메모리 효율적입니다. 트리/그래프 같은 복잡한 구조에서는 재귀가 훨씬 편리합니다.",
    relatedTopics: ["재귀", "반복문", "시간복잡도", "스택 메모리"],
  },
  {
    id: 311,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "메모이제이션에서 memo 배열을 초기화하는 올바른 방법은?",
    code: `int memo[100];

// 초기화 방법 A: fill(memo, memo + 100, -1);
// 초기화 방법 B: memset(memo, -1, sizeof(memo));
// 초기화 방법 C: 아무것도 안 함`,
    options: ["A만 올바르다", "B만 올바르다", "A와 B 모두 올바르다", "C가 가장 좋다"],
    correctAnswer: 2,
    explanation: "fill과 memset 모두 배열을 -1로 초기화하는 올바른 방법입니다. 아무것도 안 하면 쓰레기 값이 들어있어 이미 계산했다고 잘못 판단할 수 있어요.",
    keyConceptTitle: "메모이제이션 초기화",
    keyConceptDescription: "메모이제이션 배열은 -1(미계산 상태)로 초기화해야 합니다. fill(arr, arr+N, -1) 또는 memset(arr, -1, sizeof(arr))를 사용합니다.",
    codeComparison: {
      wrong: `int memo[100];  // 초기화 안 함 → 쓰레기 값 → 버그!`,
      correct: `int memo[100];
fill(memo, memo + 100, -1);  // 반드시 초기화!`,
    },
    relatedTopics: ["메모이제이션", "배열 초기화", "fill", "memset"],
  },
  {
    id: 312,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

void printReverse(int n) {
    if (n <= 0) return;
    printReverse(n - 1);  // 재귀 먼저
    cout << n << " ";     // 그 다음 출력
}

int main() {
    printReverse(4);
    return 0;
}`,
    options: ["4 3 2 1 ", "1 2 3 4 ", "4 4 4 4 ", "1 1 1 1 "],
    correctAnswer: 1,
    explanation: "재귀 호출 후에 출력하므로, 가장 안쪽(n=1)부터 바깥쪽(n=4)으로 출력됩니다. 결과: 1 2 3 4",
    keyConceptTitle: "재귀 후 실행",
    keyConceptDescription: "재귀 호출 전에 코드가 있으면 호출 순서대로 실행되고, 재귀 호출 후에 코드가 있으면 반환 순서대로 실행됩니다. 이 차이가 중요해요!",
    codeComparison: {
      wrong: `cout << n;         // 출력 먼저
recurse(n-1);      // 재귀: n, n-1, n-2...`,
      correct: `recurse(n-1);      // 재귀 먼저
cout << n;         // 출력: 1, 2, 3...n`,
    },
    relatedTopics: ["재귀 실행 순서", "후위 처리", "역순 출력"],
  },
  {
    id: 313,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int memo[20];

int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}

int main() {
    fill(memo, memo + 20, -1);
    cout << fib(10);
    return 0;
}`,
    options: ["34", "55", "89", "144"],
    correctAnswer: 1,
    explanation: "메모이제이션을 적용한 피보나치 fib(10)=55입니다. 피보나치: 0,1,1,2,3,5,8,13,21,34,55",
    keyConceptTitle: "메모이제이션 피보나치",
    keyConceptDescription: "memo[n] = fib(n-1) + fib(n-2)로 계산과 저장을 한 줄로 쓸 수 있습니다. 메모이제이션으로 O(2^n) → O(n)으로 개선됩니다.",
    relatedTopics: ["메모이제이션", "피보나치", "동적 프로그래밍"],
  },
  {
    id: 314,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "일반 재귀와 메모이제이션 피보나치의 시간복잡도 비교로 **맞는** 것은?",
    code: `// 일반 재귀
int fib1(int n) {
    if (n <= 1) return n;
    return fib1(n-1) + fib1(n-2);
}

// 메모이제이션
int fib2(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib2(n-1) + fib2(n-2);
}`,
    options: ["둘 다 O(n)", "둘 다 O(2^n)", "일반: O(2^n), 메모: O(n)", "일반: O(n), 메모: O(2^n)"],
    correctAnswer: 2,
    explanation: "일반 재귀는 중복 계산이 많아 O(2^n)입니다. 메모이제이션은 각 값을 한 번만 계산하므로 O(n)입니다. fib(40)에서 차이가 엄청나요!",
    keyConceptTitle: "시간복잡도 비교",
    keyConceptDescription: "O(2^n)은 n이 커질수록 기하급수적으로 증가합니다. fib(40)을 일반 재귀로 계산하면 약 10억 번, 메모이제이션은 79번만 계산합니다.",
    relatedTopics: ["시간복잡도", "O(n)", "O(2^n)", "메모이제이션"],
  },
  {
    id: 315,
    lessonId: "cpp-13",
    difficulty: "보통",
    question: "다음 재귀 함수 gcd(48, 18)의 결과는?\n(최대공약수를 유클리드 알고리즘으로 구함)",
    code: `int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}`,
    options: ["2", "3", "6", "9"],
    correctAnswer: 2,
    explanation: "gcd(48,18): 48%18=12 → gcd(18,12): 18%12=6 → gcd(12,6): 12%6=0 → gcd(6,0): return 6. 48과 18의 최대공약수는 6입니다.",
    keyConceptTitle: "유클리드 알고리즘 (재귀)",
    keyConceptDescription: "gcd(a,b) = gcd(b, a%b). b가 0이면 a가 최대공약수입니다. 이 알고리즘은 매우 효율적이며 알고리즘 대회에서 자주 사용됩니다.",
    codeComparison: {
      wrong: `// for 루프로 하나씩 찾기 - 느림!
for (int i = min(a,b); i >= 1; i--)
    if (a%i==0 && b%i==0) return i;`,
      correct: `// 재귀 유클리드 - 훨씬 빠름!
if (b == 0) return a;
return gcd(b, a % b);`,
    },
    relatedTopics: ["유클리드 알고리즘", "최대공약수", "GCD", "재귀"],
  },
  {
    id: 316,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 재귀 함수의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int f(int n) {
    if (n == 0) return 1;
    if (n % 2 == 0) return f(n/2);
    return f(n-1) + f(n-1);
}

int main() {
    cout << f(4);
    return 0;
}`,
    options: ["1", "2", "4", "8"],
    correctAnswer: 1,
    explanation: "f(4): 4는 짝수 → f(4/2) = f(2). f(2): 2는 짝수 → f(2/2) = f(1). f(1): 1은 홀수 → f(0) + f(0) = 1 + 1 = 2. 따라서 f(4) = f(2) = f(1) = 2.",
    keyConceptTitle: "복잡한 재귀 추적",
    keyConceptDescription: "재귀 함수를 추적할 때는 각 호출마다 어떤 조건에 해당하는지 확인하며 하나씩 따라가야 합니다.",
    relatedTopics: ["재귀 추적", "복잡한 재귀", "함수 호출"],
  },
  {
    id: 317,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드에서 hanoi(2, 'A', 'C', 'B')의 출력은?",
    code: `#include <iostream>
using namespace std;

void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        cout << from << "->" << to << endl;
        return;
    }
    hanoi(n-1, from, aux, to);
    cout << from << "->" << to << endl;
    hanoi(n-1, aux, to, from);
}`,
    options: [
      "A->C\nA->B\nC->B",
      "A->B\nA->C\nB->C",
      "A->C\nB->A\nB->C",
      "A->B\nA->C\nA->B"
    ],
    correctAnswer: 1,
    explanation: "하노이 탑 n=2: 1단계(n=1): A→B 이동, 2단계: A→C 이동, 3단계(n=1): B→C 이동. 출력: A->B, A->C, B->C",
    keyConceptTitle: "하노이 탑 (Tower of Hanoi)",
    keyConceptDescription: "하노이 탑은 재귀의 대표적인 예시입니다. n개의 원판을 이동하려면 2^n - 1번의 이동이 필요합니다.",
    relatedTopics: ["하노이 탑", "재귀", "분할 정복"],
  },
  {
    id: 318,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `#include <iostream>
using namespace std;

int count_calls = 0;

int fib_plain(int n) {
    count_calls++;
    if (n <= 1) return n;
    return fib_plain(n-1) + fib_plain(n-2);
}

int main() {
    fib_plain(6);
    cout << count_calls;
    return 0;
}`,
    options: ["7", "13", "25", "25"],
    correctAnswer: 2,
    explanation: "fib(6)을 일반 재귀로 계산하면 총 25번 호출됩니다. 각 노드가 트리에서 호출 횟수를 나타내며 fib(6)=25번, 메모이제이션 사용 시 11번으로 줄어듭니다.",
    keyConceptTitle: "재귀 호출 횟수",
    keyConceptDescription: "일반 피보나치 재귀의 호출 횟수는 fib(n)*2+1 정도입니다. 중복 호출이 많아 매우 비효율적입니다.",
    relatedTopics: ["재귀 호출 횟수", "효율성", "메모이제이션 필요성"],
  },
  {
    id: 319,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 이진 탐색 재귀 함수에서 search(arr, 0, 7, 7)의 반환값은?",
    code: `#include <iostream>
using namespace std;

int arr[] = {1, 3, 5, 7, 9, 11, 13, 15};

int search(int arr[], int left, int right, int target) {
    if (left > right) return -1;
    int mid = (left + right) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return search(arr, mid+1, right, target);
    return search(arr, left, mid-1, target);
}`,
    options: ["2", "3", "4", "-1"],
    correctAnswer: 1,
    explanation: "search(0,7,7): mid=3, arr[3]=7==target → 3 반환! 배열의 인덱스 3에 7이 있습니다.",
    keyConceptTitle: "이진 탐색 (재귀)",
    keyConceptDescription: "이진 탐색을 재귀로 구현할 수 있습니다. 중간값과 비교하여 왼쪽 또는 오른쪽을 재귀적으로 탐색합니다. O(log n)의 시간복잡도를 가집니다.",
    relatedTopics: ["이진 탐색", "재귀", "분할 정복", "O(log n)"],
  },
  {
    id: 320,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 메모이제이션 코드에서 memo[n] != -1 조건 대신 다른 값을 초기값으로 쓰면 안 되는 이유는?",
    code: `int memo[100];
// fill(memo, memo + 100, 0);  // 0으로 초기화하면?

int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];  // 저장된 값?
    return memo[n] = fib(n-1) + fib(n-2);
}`,
    options: [
      "0으로 초기화해도 완전히 동일하게 동작한다",
      "fib(2)=1이지만 0으로 초기화하면 memo[2]=1을 저장 후 다음번엔 0!=1이라 재계산한다",
      "fib(n)의 결과가 0일 수 있어서 '계산 안 됨'과 구분 불가능하다",
      "fill 함수가 0과 호환되지 않는다"
    ],
    correctAnswer: 2,
    explanation: "fib(0)=0입니다! memo를 0으로 초기화하면 fib(0)=0을 저장해도 '계산 안 됨(0)'과 구분이 안 됩니다. -1은 피보나치 수열에 절대 나오지 않는 값이라 안전합니다.",
    keyConceptTitle: "초기값 선택의 중요성",
    keyConceptDescription: "메모이제이션의 초기값은 실제 답으로 나올 수 없는 값이어야 합니다. 피보나치는 0이 유효한 답이므로 -1을 초기값으로 사용합니다.",
    relatedTopics: ["메모이제이션", "초기값", "경계 조건", "피보나치"],
  },
  {
    id: 321,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드에서 재귀를 이용한 배열 합계 계산의 출력은?",
    code: `#include <iostream>
using namespace std;

int arr[] = {1, 2, 3, 4, 5};

int arraySum(int arr[], int n) {
    if (n == 0) return 0;
    return arr[n-1] + arraySum(arr, n-1);
}

int main() {
    cout << arraySum(arr, 5);
    return 0;
}`,
    options: ["10", "15", "20", "1"],
    correctAnswer: 1,
    explanation: "arraySum(arr,5) = arr[4] + arraySum(arr,4) = 5+4+3+2+1+0 = 15. 배열의 모든 원소 합입니다.",
    keyConceptTitle: "배열의 재귀적 합계",
    keyConceptDescription: "배열의 합을 재귀로 구할 때, 마지막 원소와 나머지 배열의 합으로 분할합니다. n=0일 때 0을 반환하는 것이 기저 조건입니다.",
    relatedTopics: ["재귀", "배열", "합계 계산"],
  },
  {
    id: 322,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "재귀 함수와 동적 프로그래밍(DP)의 관계로 **맞는** 것은?",
    code: `// 탑다운 DP (메모이제이션 재귀)
int dp[1001];
int coin(int n) {
    if (n == 0) return 0;
    if (dp[n] != -1) return dp[n];
    return dp[n] = min(coin(n-1), coin(n-5)) + 1;  // 단순화 예시
}`,
    options: [
      "DP는 재귀와 완전히 다른 알고리즘이다",
      "메모이제이션 재귀는 탑다운 DP의 한 형태이다",
      "DP는 항상 반복문으로만 구현해야 한다",
      "재귀가 DP보다 항상 빠르다"
    ],
    correctAnswer: 1,
    explanation: "메모이제이션을 사용하는 재귀는 탑다운 DP(Top-Down DP)입니다. 반복문으로 구현하면 바텀업 DP(Bottom-Up DP)입니다. 둘 다 같은 시간복잡도를 가집니다.",
    keyConceptTitle: "탑다운 DP (메모이제이션)",
    keyConceptDescription: "동적 프로그래밍(DP)은 큰 문제를 작은 부분 문제로 나누고 결과를 재사용합니다. 재귀+메모이제이션 = 탑다운 DP, 반복문+테이블 = 바텀업 DP",
    relatedTopics: ["동적 프로그래밍", "DP", "탑다운", "바텀업", "USACO"],
  },
  {
    id: 323,
    lessonId: "cpp-13",
    difficulty: "어려움",
    question: "다음 코드로 구현한 '숫자 n을 1, 2, 3의 합으로 나타내는 경우의 수'에서 ways(4)의 값은?",
    code: `int memo[100];

int ways(int n) {
    if (n == 0) return 1;
    if (n < 0) return 0;
    if (memo[n] != -1) return memo[n];
    return memo[n] = ways(n-1) + ways(n-2) + ways(n-3);
}`,
    options: ["4", "5", "7", "8"],
    correctAnswer: 2,
    explanation: "ways(4): ways(3)+ways(2)+ways(1)=4+2+1=7. 4를 1,2,3의 합으로 나타내는 방법: 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2, 1+3, 3+1 → 7가지",
    keyConceptTitle: "경우의 수 재귀 (카운팅 DP)",
    keyConceptDescription: "n을 만드는 경우의 수 = (n-1)을 만드는 수 + (n-2)를 만드는 수 + (n-3)을 만드는 수. 이런 패턴은 USACO에서 자주 나옵니다.",
    relatedTopics: ["카운팅 DP", "경우의 수", "재귀", "USACO"],
  },
  {
    id: 324,
    lessonId: "cpp-4",
    difficulty: "보통",
    question: "다음 코드에서 '김철수'를 입력했을 때 출력 결과는?",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cin >> name;
    cout << "안녕, " << name << "!" << endl;
    return 0;
}`,
    options: ["안녕, 김철수!", "안녕, 김!", "안녕, !", "런타임 오류"],
    correctAnswer: 1,
    explanation: "cin >>은 공백(띄어쓰기)을 기준으로 입력을 분리합니다. '김철수'에서 '김'까지만 읽힙니다. 띄어쓰기가 포함된 이름을 전부 읽으려면 getline()을 써야 합니다.",
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
    lessonId: "cpp-2",
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
    lessonId: "cpp-10",
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
    lessonId: "cpp-15",
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
  {
    id: 338,
    lessonId: "cpp-15",
    difficulty: "보통",
    question: "C++17 구조적 바인딩(structured bindings)으로 pair에 접근하는 방법은?",
    code: `#include <iostream>
using namespace std;
int main() {
    pair<string, int> p = {"Alice", 100};
    auto ___ = p;
    cout << name << " " << score;
}`,
    options: [
      "auto (name, score)",
      "auto [name, score]",
      "auto {name, score}",
      "auto name, score",
    ],
    correctAnswer: 1,
    explanation: "C++17 구조적 바인딩: auto [name, score] = p; 로 pair의 .first를 name, .second를 score에 바로 풀어서 저장합니다.",
    keyConceptTitle: "구조적 바인딩 (C++17)",
    keyConceptDescription: "auto [a, b] = pair; 형태로 pair/tuple의 값을 한번에 여러 변수로 받습니다. map 순회에서 for (auto& [key, val] : map)으로 많이 씁니다.",
    relatedTopics: ["structured bindings", "C++17", "pair 분해"],
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

srand(time(nullptr));  // 시드 설정
int answer = ___;      // 1~100 사이`,
    options: [
      "rand() + 1",
      "rand() % 100 + 1",
      "random(1, 100)",
      "rand(1, 100)",
    ],
    correctAnswer: 1,
    explanation: "rand() % 100은 0~99를 반환합니다. +1을 하면 1~100이 됩니다. srand(time(nullptr))로 매번 다른 시드를 설정해야 진짜 랜덤이 됩니다.",
    keyConceptTitle: "rand() % N + 1 패턴",
    keyConceptDescription: "rand() % N: 0~(N-1). rand() % N + 1: 1~N. rand() % 100 + 1: 1~100. srand(time(nullptr))로 매번 다른 시드를 설정합니다.",
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
    lessonId: "cpp-3",
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
    lessonId: "cpp-3",
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
    lessonId: "cpp-3",
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
    lessonId: "cpp-15",
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
    lessonId: "cpp-15",
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
    lessonId: "cpp-15",
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
    lessonId: "cpp-15",
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
    lessonId: "cpp-15",
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
    lessonId: "cpp-15",
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
    lessonId: "cpp-15",
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
    lessonId: "cpp-6",
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
    lessonId: "cpp-6",
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
    lessonId: "cpp-10",
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
    lessonId: "cpp-11",
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
    id: 451,
    lessonId: "cpp-14",
    difficulty: "보통",
    question: "다음 코드에서 컴파일 오류가 발생하는 줄은?",
    code: `class Box {\nprivate:\n    int width = 10;\npublic:\n    int getWidth() { return width; }\n};\nBox b;\ncout << b.getWidth();  // (1)\ncout << b.width;       // (2)`,
    options: ["(2)번 줄 — private 멤버 직접 접근 불가", "(1)번 줄 — public 함수도 외부 접근 불가", "둘 다 오류 없음", "둘 다 오류"],
    correctAnswer: 0,
    explanation: "private 멤버는 클래스 외부에서 직접 접근할 수 없어요. b.width는 오류. b.getWidth()는 public 함수이므로 외부에서 호출 가능해요.",
    keyConceptTitle: "접근 제어 (private/public)",
    keyConceptDescription: "private: 클래스 내부에서만 접근 가능. public: 외부에서 접근 가능. 캡슐화 원칙.",
    relatedTopics: ["private", "public", "접근 제어", "캡슐화"],
  },
  {
    id: 452,
    lessonId: "cpp-14",
    difficulty: "보통",
    question: "다음 코드의 출력 결과는?",
    code: `class Dog {\npublic:\n    string name;\n    Dog(string n) {\n        name = n;\n    }\n};\nDog d("Buddy");\ncout << d.name << endl;`,
    options: ["Buddy", "n", "Dog", "오류"],
    correctAnswer: 0,
    explanation: "생성자는 객체가 만들어질 때 자동으로 호출돼요. Dog d(\"Buddy\")로 객체를 만들면 생성자가 실행되어 name = \"Buddy\"가 됩니다.",
    keyConceptTitle: "생성자 (Constructor)",
    keyConceptDescription: "생성자: 객체 생성 시 자동 호출. 클래스명과 같은 이름, 반환 타입 없음.",
    relatedTopics: ["생성자", "constructor", "객체 초기화"],
  },
  {
    id: 453,
    lessonId: "cpp-14",
    difficulty: "쉬움",
    question: "C++에서 struct와 class의 핵심 차이는?",
    code: "",
    options: ["struct는 기본 public, class는 기본 private", "struct는 함수 불가, class는 함수 가능", "struct는 C언어만, class는 C++만 가능", "차이 없음"],
    correctAnswer: 0,
    explanation: "C++의 struct와 class는 기본 접근 제어만 달라요. struct는 기본 public (멤버가 외부에서 바로 접근 가능), class는 기본 private (접근 제어 필요).",
    keyConceptTitle: "struct vs class",
    keyConceptDescription: "struct: 기본 public (데이터 묶음에 주로 사용). class: 기본 private (캡슐화에 주로 사용).",
    relatedTopics: ["struct", "class", "접근 제어"],
  },
  {
    id: 454,
    lessonId: "cpp-20",
    difficulty: "쉬움",
    question: "#include <bits/stdc++.h>를 쓰는 이유는?",
    code: "",
    options: ["모든 표준 헤더를 한 번에 포함해서 편리함", "코드 실행 속도를 높여줌", "메모리 사용을 줄여줌", "C++20 전용 기능임"],
    correctAnswer: 0,
    explanation: "bits/stdc++.h는 모든 표준 라이브러리를 한 번에 포함해요. 경쟁 프로그래밍에서 매번 #include를 여러 개 쓰는 대신 이 하나로 해결해요. 단, 컴파일 시간이 더 길어지는 단점이 있어요.",
    keyConceptTitle: "bits/stdc++.h",
    keyConceptDescription: "경쟁 프로그래밍용 만능 헤더. 모든 STL 포함. 실무 코드에는 부적합.",
    relatedTopics: ["bits/stdc++.h", "헤더", "CP"],
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
];
