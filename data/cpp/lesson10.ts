// ============================================
// C++ Lesson 10: Range-for & auto
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson10Data: LessonData = {
  id: "cpp-10",
  title: "Range-for & auto",
  emoji: "🔄",
  description: "for(auto x : vec)로 더 편하게!",
  chapters: [
    // ============================================
    // Chapter 1: Range-based for
    // ============================================
    {
      id: "ch1",
      title: "Range-based for",
      emoji: "🔁",
      steps: [
        // ── 1단계: 기본 설명 ──────────────────────
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔁 Range-based for 문",
          component: "cppRangeForBuilder",
          content: `지난 시간에 \`for (int i = 0; i < size; i++)\` 이런 인덱스 루프를 배웠죠? 더 간단한 방법이 있어요!

**파이썬 🐍:**
\`\`\`python
nums = [10, 20, 30]
for x in nums:
    print(x)
\`\`\`

**C++ ⚡ (range-based for):**
\`\`\`cpp
vector<int> nums = {10, 20, 30};
for (int x : nums) {
    cout << x << " ";
}
// 출력: 10 20 30
\`\`\`

\`for (타입 변수 : 컨테이너)\` — 파이썬의 \`for x in list:\`와 거의 같아요!

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`for x in nums:\` | \`for (int x : nums) {\` |
| \`in\` 키워드 | \`:\` 콜론 |

배열에도 벡터에도 다 써요:
\`\`\`cpp
int arr[3] = {1, 2, 3};
for (int x : arr) { cout << x << " "; }  // 배열도 OK!
\`\`\``,
        },
        // ── 2단계: 기본 연습 ──────────────────────
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "range-for문으로 벡터를 순회해봐요!",
          code: "vector<int> v = {5, 10, 15};\nfor (___ x ___ v) {\n    cout << x << \" \";\n}",
          reviewHint: `range-based for 구조:
\`for (타입 변수명 : 컨테이너) { ... }\`
- 타입: 원소 타입 (int, string 등)
- 콜론(:) — 파이썬의 in 대신`,
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "var", "auto", "for"] },
            { id: 1, answer: ":", options: [":", "in", "of", "->"] }
          ],
          explanation: "for (int x : v) — v의 원소를 int x에 하나씩 꺼내요! 파이썬 'in' 대신 ':'을 써요."
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Range-for 출력 예측!",
          code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {3, 6, 9};
    int sum = 0;
    for (int x : v) {
        sum += x;
    }
    cout << sum;
    return 0;
}`,
          reviewHint: `range-based for는 v의 원소를 차례로 x에 담아요.
x = 3 → sum = 3
x = 6 → sum = 9
x = 9 → sum = 18`,
          options: ["9", "18", "27", "에러"],
          answer: 1,
          explanation: "3+6+9 = 18! range-based for로 모든 원소를 순서대로 더했어요.",
        },
        // ── 3단계: 참조 설명 ──────────────────────
        {
          id: "ch1-ref",
          type: "explain",
          title: "🔗 x를 바꿔도 원본이 그대로? — 복사의 비밀",
          content: `방금 배운 \`for (int x : v)\`에는 숨겨진 비밀이 있어요. x를 아무리 수정해도 **원본이 안 바뀌어요.**

\`\`\`cpp
vector<int> nums = {1, 2, 3};
for (int x : nums) {
    x = x * 10;   // x(복사본)만 바뀜
}
// nums는 여전히 {1, 2, 3} 😱
\`\`\`

**& 하나 붙이면** x가 원본을 직접 가리켜요:

\`\`\`cpp
for (int& x : nums) {   // & 추가!
    x = x * 10;   // 원본이 바뀜!
}
// nums는 이제 {10, 20, 30} ✅
\`\`\`

& = "복사본이 아니라 원본 자체"예요. 사진을 복사해서 주면 원본은 안 변하지만, **원본 파일을 공유**하면 상대가 수정할 수 있잖아요? &가 바로 그거예요!

그리고 &는 복사를 안 하기 때문에 **속도도 빠릅니다.** 특히 데이터가 크면 차이가 커요.`,
        },
        // ── 4단계: 복사/참조 애니메이션 ──────────────────────
        {
          id: "ch1-ref-anim",
          type: "interactive",
          title: "🎬 복사 vs 참조(&) — 차이 직접 확인!",
          content: "실행 버튼을 눌러 & 유무에 따라 결과가 어떻게 다른지 확인해보세요!",
          component: "rangeForVisualizer",
        },
        // ── 5단계: 참조 연습 ──────────────────────
        {
          id: "ch1-ref-fb",
          type: "fillblank" as const,
          title: "참조로 원소 수정!",
          content: "벡터의 모든 원소에 1을 더하는 코드를 완성해봐요!",
          code: "vector<int> v = {1, 2, 3};\nfor (int___ x : v) {\n    x += 1;\n}\n// v는 이제 {2, 3, 4}",
          reviewHint: `원본 원소를 수정하려면 참조(&)가 필요해요:
- \`int x\` → 복사본, 원본 불변
- \`int& x\` → 원본 직접 수정`,
          fillBlanks: [
            { id: 0, answer: "&", options: ["&", "*", "%", ""] }
          ],
          explanation: "int& x로 참조를 받아야 원본을 수정할 수 있어요! & 없이는 복사본만 바뀌어요."
        },
        {
          id: "ch1-ref-pred",
          type: "predict" as const,
          title: "참조로 수정 후 출력!",
          code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {10, 20, 30};
    for (int& x : v) {
        x = x / 10;
    }
    for (int x : v) {
        cout << x << " ";
    }
    return 0;
}`,
          reviewHint: `첫 번째 for: int& x → 원본 수정 (x = x / 10)
두 번째 for: int x → 수정된 원본 값 출력`,
          options: ["10 20 30 ", "1 2 3 ", "0 2 3 ", "에러"],
          answer: 1,
          explanation: "int& x로 원본을 나누니 {1, 2, 3}이 돼요. 두 번째 for로 출력!"
        },
        // ── 6단계: const int& 소개 ──────────────────────
        {
          id: "ch1-const-ref",
          type: "explain",
          title: "🔒 & 에 자물쇠 달기 — const int&",
          content: `&를 쓰면 빠르지만, 실수로 원본을 바꿀 수도 있어요. **읽기만 할 건데 수정을 막고 싶다면** \`const\`를 앞에 붙여요.

레슨 3에서 배운 const 기억나요? PI처럼 절대 안 바뀌어야 하는 값에 붙이던 그거예요:

\`\`\`cpp
const double PI = 3.14159;
PI = 0;  // ❌ 에러! 바꿀 수 없어요
\`\`\`

이 \`const\`를 range-for에도 그대로 쓸 수 있어요:

\`\`\`cpp
for (const int& x : v) {
    cout << x;  // ✅ 읽기는 OK
    x = 0;      // ❌ 컴파일 에러! 실수 방지
}
\`\`\`

**& = 빠름 (복사 없음)** + **const = 수정 방지** — 두 장점을 합쳤어요.

그래서 실제 C++ 코드는 이렇게 써요:

| 패턴 | 언제 쓰나요? |
|---|---|
| \`for (int& x : v)\` | 원소를 **수정**해야 할 때 |
| \`for (const int& x : v)\` | **읽기만** 할 때 👈 가장 많이 씀! |
| \`for (int x : v)\` | 거의 안 씀 |

💡 **결론: 실제 C++ 개발자들은 거의 항상 &를 써요!**
- 수정해야 하면 → \`int& x\`
- 읽기만 하면 → \`const int& x\`

\`int\` 같은 작은 타입은 복사해도 사실 별 차이 없어요. 하지만 \`string\`이나 큰 구조체라면 복사 비용이 커지거든요. 처음부터 \`const int&\` 습관을 들여두면, 나중에 어떤 타입이든 자연스럽게 쓸 수 있어요.`,
        },
        // ── 7단계: 최종 연습 ──────────────────────
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Range-for로 합 구하기!",
          content: `\`nums\` 의 모든 원소를 더해 \`sum\` 에 담아 출력하세요.`,
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {4, 8, 15, 16, 23, 42};
    int sum = 0;

    // 👇 range-for 로 sum 에 누적하세요


    cout << sum;
    return 0;
}`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {4, 8, 15, 16, 23, 42};
    int sum = 0;

    for (const int& x : nums) {
        sum += x;
    }

    cout << sum;
    return 0;
}`,
          hint: "for (const int& x : nums) { sum += x; } — const int& 는 복사 없이 읽기만. x 에 값 담아서 sum += x 로 누적!",
          expectedOutput: `108`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Range-for 핵심!",
          content: "range-for에서 원본 벡터의 값을 **직접 수정**하려면?",
          options: [
            "for (int x : v)",
            "for (int& x : v)",
            "for (int x* : v)",
            "for (int : x : v)"
          ],
          answer: 1,
          explanation: "int& x — & 하나로 복사본이 아닌 원본을 직접 받아요. x를 바꾸면 v도 바뀌어요!"
        }
      ]
    },
    // ============================================
    // Chapter 2: auto 키워드
    // ============================================
    {
      id: "ch2",
      title: "auto 키워드",
      emoji: "🤖",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🤖 auto — 타입 자동 추론!",
          content: `C++은 항상 타입을 써야 해서 귀찮았죠? \`auto\`를 쓰면 **컴파일러가 타입을 알아서 추론**해요!

\`\`\`cpp
auto x = 10;        // int (정수니까)
auto y = 3.14;      // double (소수점이니까)
auto name = string("hello");  // string
auto flag = true;   // bool
\`\`\`

> 💡 **외울 한 줄**: \`auto x = 값;\` 은 **x 의 타입은 그 값의 타입과 똑같음**. 컴파일러가 오른쪽 보고 정해줘요.

파이썬처럼 타입을 안 써도 되지만, 중요한 차이가 있어요:

| 파이썬 🐍 | C++ auto ⚡ |
|---|---|
| \`x = 10\` | \`auto x = 10;\` |
| 나중에 \`x = "hello"\` 가능 | ❌ 한 번 정해지면 타입 변경 불가! |
| 동적 타입 (실행 중 변경) | **정적 타입** (컴파일 시 결정) |

\`\`\`cpp
auto x = 10;    // int로 결정됨
x = 3.14;       // ⚠️ 3만 저장됨! (int라서 소수점 잘림)
x = "hello";    // ❌ 에러! int인데 string을 넣으려고!
\`\`\`

auto는 '처음에만 결정되는 확정 계약'이에요. \`auto x = 5;\`라고 쓰면 x는 int로 **영원히** 결정돼요. 파이썬처럼 나중에 문자열을 넣을 수 없어요!

💡 auto는 "타입 안 쓰는 것"이 아니라 "컴파일러가 대신 써주는 것"이에요! 파이썬처럼 자유롭지는 않아요.`
        },
        {
          id: "ch2-auto-anim",
          type: "interactive",
          title: "🤖 auto가 타입을 추론하는 과정",
          content: "▶ 버튼을 눌러 컴파일러가 어떤 타입을 선택하는지 직접 확인해보세요!",
          component: "autoTypeVisualizer",
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "auto 가 추론한 타입은?",
          content: "각 변수가 어떤 타입으로 추론되는지 채워보세요.",
          code: "auto price = 9.99;     // → ___\nauto count = 5;        // → ___\nauto pass  = true;     // → ___",
          fillBlanks: [
            { id: 0, answer: "double", options: ["double", "int", "float", "string"] },
            { id: 1, answer: "int", options: ["int", "double", "long", "char"] },
            { id: 2, answer: "bool", options: ["bool", "int", "string", "true"] }
          ],
          explanation: "9.99 는 소수점이 있으니 double, 5 는 정수니까 int, true 는 참/거짓이니까 bool. auto 는 오른쪽 값을 보고 그 값의 타입을 그대로 가져와요."
        },
        {
          id: "ch2-combo",
          type: "explain",
          title: "🔥 auto + range-for 조합!",
          content: `range-for 에 auto 쓰면 깔끔해요.

\`\`\`cpp
vector<int> nums = {1, 2, 3};

for (int x : nums) ...    // 직접 타입
for (auto x : nums) ...   // auto — 컴파일러가 int 로 추론
\`\`\`

**타입이 길수록 효과 커요** — cpp-21 의 2D vector:

\`\`\`cpp
vector<vector<int>> grid;
for (vector<int> row : grid)   // 길어
for (auto row : grid)           // 깔끔
\`\`\`

> ⚠️ 단, range-for 의 변수에는 auto 가 잘 통해도, **\`auto v = {1, 2, 3}\` 는 vector 가 아닌 다른 타입이 돼요.** 자세한 함정은 다음 페이지에서.`
        },
        {
          id: "ch2-auto-tradeoff",
          type: "explain",
          title: "⚖️ auto — 편하지만 조심할 것도 있어요",
          content: `방금 세 가지 패턴을 봤죠? 그럼 세 중에 뭘 쓰면 좋을까요?

| 패턴 | 용도 |
|---|---|
| \`for (auto x : v)\` | 읽기 전용, 작은 값 |
| \`for (auto& x : v)\` | 원소를 **수정** |
| \`for (const auto& x : v)\` | 읽기 + 큰 데이터 (효율) |

💡 보통 \`const auto&\` 를 기본으로 써요 — 안전하고 복사도 안 해요.

---

### 😓 auto 의 함정

자주 만나는 **Top 3**:

| ⭐ | 함정 | 예시 |
|---|---|---|
| 1 | 큰 데이터 통째로 복사 | \`auto copy = big;\` → \`auto& ref = big;\` |
| 2 | int 나눗셈 (\`5/2 = 2\`) | \`auto x = 5/2;\` → \`auto x = 5.0/2;\` |
| 3 | 초기값 없으면 에러 | \`auto x;\` ❌ |

> 🔑 \`auto\` 는 reference 를 자동으로 안 받아요. \`int& r = x; auto a = r;\` 면 a 는 int. 참조 원하면 \`auto&\` 필수.

가끔 만나는 것:

| 함정 | 한 줄 |
|---|---|
| \`auto greeting = "hello"\` | string 이 아니라 \`const char*\`. \`+=\` 안 됨 |
| \`auto v = {1, 2, 3}\` | vector 가 아니라 \`initializer_list\`. push_back 안 됨 |
| \`auto x = calculate()\` | 타입 안 보여 가독성 ↓ |

---

### 📏 정리

| 상황 | 추천 |
|---|---|
| 짧은 타입 (\`int\`, \`double\`, \`vector<int>\`) | 직접 쓰기 |
| 긴 타입 (\`vector<vector<int>>\` 등) | \`auto\` |
| range-for 읽기 | \`auto\` or 직접 |
| range-for 수정 | \`auto&\` |

{collapse:📦 보너스 — 숫자 리터럴 차이}
\`\`\`cpp
auto a = 5;       // int (~21 억)
auto b = 5L;      // long
auto c = 5LL;     // long long (큰 수)
auto d = 5.0;     // double
auto e = 5.0f;    // float
\`\`\`
USACO 등 큰 수 다룰 때 \`int\` overflow (>21억). \`auto x = 5LL;\` 로 명시.`,
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "auto 타입 추론!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    auto a = 10;\n    auto b = 3.5;\n    auto c = a + b;\n    cout << c;\n    return 0;\n}",
          options: ["13", "13.5", "13.0", "에러"],
          answer: 1,
          explanation: "a는 int(10), b는 double(3.5). int + double = double! 그래서 c는 double 13.5가 돼요."
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ auto + range-for로 벡터 처리!",
          content: `\`nums\` 의 모든 원소를 **2배**로 바꾼 뒤, 결과를 공백으로 구분해 출력하세요.`,
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {3, 7, 2, 9, 5};

    // 👇 auto& 로 원소를 2배로 바꾸세요


    // 👇 auto 로 결과를 출력하세요 (값 뒤에 " ")


    return 0;
}`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {3, 7, 2, 9, 5};

    for (auto& x : nums) {
        x = x * 2;
    }

    for (auto x : nums) {
        cout << x << " ";
    }

    return 0;
}`,
          hint: "수정 시 for (auto& x : nums) { x *= 2; } — & 없이 auto x 면 복사본이라 원본 안 바뀜. 출력은 for (auto x : nums) cout << x << \" \";",
          expectedOutput: `6 14 4 18 10 `
        },
        {
          id: "ch2-2d-rangefor",
          type: "explain",
          title: "📦 2D vector에도 range-for를 쓸 수 있을까?",
          content: `이전에 2D vector를 이중 for문으로 순회했었죠? range-for로도 가능해요!

\`\`\`cpp
vector<vector<int>> grid(3, vector<int>(4, 0));

// 인덱스 방식 (지금까지 배운 것)
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 4; j++)
        cin >> grid[i][j];

// range-for 방식
for (auto& row : grid)       // row = 각 행 (vector<int>&)
    for (auto& val : row)    // val = 각 원소 (int&)
        cin >> val;
\`\`\`

출력도 마찬가지예요:
\`\`\`cpp
for (const auto& row : grid) {
    for (const auto& val : row)
        cout << val << " ";
    cout << "\\n";
}
\`\`\`

### 그런데 — 인덱스 방식이 더 많이 쓰여요!

왜냐면 2D 문제 대부분이 **위치(i, j)를 알아야** 하기 때문이에요:

| 패턴 | 위치 필요? | range-for 가능? |
|---|---|---|
| 대각선 \`grid[i][i]\` | ✅ | ❌ |
| 인접 셀 \`grid[i+1][j]\` | ✅ | ❌ |
| 테두리 \`i==0\` | ✅ | ❌ |
| 단순 입력 \`cin >> val\` | ❌ | ✅ |
| 전체 합/개수 | ❌ | ✅ |

range-for는 **위치가 필요 없는 경우**(입력, 전체 합, 전부 출력 등)에만 쓸 수 있어요.

USACO나 대회 문제에서는 위치가 필요한 경우가 훨씬 많아서, **인덱스 기반 이중 for문이 2D의 주력**이에요.

> 💡 결론: 2D에서 range-for는 "이것도 된다" 정도로 알아두고, 기본은 인덱스 방식이에요!`,
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "auto 이해!",
          content: "`auto x = 10;` 이후에 `x = \"hello\";`를 하면?",
          options: [
            "x가 \"hello\"로 바뀐다",
            "x가 string 타입으로 바뀐다",
            "컴파일 에러가 발생한다",
            "런타임 에러가 발생한다"
          ],
          answer: 2,
          explanation: "auto x = 10으로 x는 int가 돼요. int에 string을 넣을 수 없으니 컴파일 에러! auto는 파이썬처럼 자유롭지 않아요."
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
          title: "Range-for 문법!",
          content: "파이썬의 `for x in nums:`에 해당하는 C++ 코드는?",
          options: [
            "for (int x in nums)",
            "for (int x : nums)",
            "for (int x of nums)",
            "for (int x -> nums)"
          ],
          answer: 1,
          explanation: "C++ range-based for는 콜론(:)을 써요! 파이썬의 in 대신 :를 사용한다고 기억하세요."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "참조 vs 복사!",
          content: `이 코드 실행 후 v의 첫 번째 원소는?

\`\`\`cpp
vector<int> v = {1, 2, 3};
for (auto x : v) {
    x = x + 100;
}
\`\`\``,
          options: [
            "101",
            "1",
            "100",
            "에러"
          ],
          answer: 1,
          explanation: "& 없이 auto x로 받으면 복사본이에요! 원본은 안 바뀌어서 v[0]은 여전히 1이에요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "auto 타입!",
          content: "`auto` 키워드에 대해 **맞는** 설명은?",
          options: [
            "파이썬처럼 나중에 다른 타입으로 바꿀 수 있다",
            "실행 중에 타입이 결정된다",
            "컴파일할 때 타입이 자동으로 결정된다",
            "모든 변수에 auto를 쓰면 에러가 난다"
          ],
          answer: 2,
          explanation: "auto는 컴파일 시점에 타입을 추론해요! 한 번 결정되면 바꿀 수 없어요. 파이썬과 다른 점이에요."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "최적의 패턴!",
          content: "큰 문자열 벡터를 **읽기만** 할 때, 가장 효율적인 range-for 패턴은?",
          options: [
            "for (string x : v)",
            "for (auto x : v)",
            "for (const auto& x : v)",
            "for (auto& x : v)"
          ],
          answer: 2,
          explanation: "const auto&는 복사 없이(& 참조) 읽기 전용(const)으로 접근해요. 큰 객체를 다룰 때 가장 효율적이에요!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘의 정리!

- ✅ **Range-based for** — \`for (int x : v)\`로 파이썬처럼 간편하게 순회!
- ✅ **참조로 수정** — \`for (int& x : v)\`에서 &를 붙이면 원본 수정 가능!
- ✅ **auto** — 컴파일러가 타입을 추론, 하지만 한 번 정해지면 변경 불가!
- ✅ **auto + range-for** — \`for (auto x : v)\`가 현대 C++의 기본 스타일!
- ✅ **세 가지 패턴** — auto (복사), auto& (수정), const auto& (읽기+효율)

| 패턴 | 복사? | 수정? | 언제 쓰나요? |
|---|---|---|---|
| \`auto x\` | O | X | 작은 값 읽기 |
| \`auto& x\` | X | O | 원본 수정할 때 |
| \`const auto& x\` | X | X | 큰 값 읽기 (추천!) |

🚀 **다음 시간 예고:** 더 다양한 C++ 기능들을 배워봐요!`
        }
      ]
    }
  ]
}
