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
          content: `지난 두 레슨에서 \`int&\` (참조), \`int*\` (포인터) — 변수를 다루는 새 도구들을 배웠죠. 이번 레슨은 잠깐 호흡 돌려서, **for 루프를 더 짧게 쓰는 법**부터 봐요. (그리고 곧 그 \`&\` 가 여기서도 다시 등장합니다 👀)

지금까지 벡터 순회는 이렇게 썼어요:
\`\`\`cpp
for (int i = 0; i < nums.size(); i++) {
    cout << nums[i] << " ";
}
\`\`\`

근데 이거 좀 귀찮지 않아요? 인덱스 \`i\` 의 끝(\`< nums.size()\`)을 매번 신경 써야 하고, 원소 꺼낼 때마다 \`[ ]\` 를 열었다 닫았다 해야 하고. 사실 우리가 원하는 건 그냥 "원소를 하나씩" 인데 말이죠.

파이썬에선 인덱스 없이 바로 원소에 접근했잖아요?

\`\`\`python
for x in nums:
    print(x)
\`\`\`

**C++ 에도 똑같은 게 있어요** — **range-based for**:

\`\`\`cpp
vector<int> nums = {10, 20, 30};
for (int x : nums) {
    cout << x << " ";
}
\`\`\`

\`in\` 자리에 \`:\` 콜론, 그리고 타입(\`int\`)만 적어주면 끝. 그 외엔 파이썬이랑 거의 똑같아요.

그럼 이 \`for (int x : nums)\` 가 어떤 조각들로 이루어지는지 한 부분씩 직접 확인해볼게요 👇`,
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
          title: "🔗 x를 바꿔도 원본이 그대로? — & 가 다시 등장!",
          content: `지금까지는 \`x\` 를 출력만 하고 sum 에 더하기만 했죠. 그럼 — \`x\` 자체를 **바꿔볼 수도** 있을까요? 그냥 시도해봐요:

\`\`\`cpp
vector<int> nums = {1, 2, 3};
for (int x : nums) {
    x = x * 10;
}
// 그 다음 nums 를 출력해보면…
// {1, 2, 3} 😱
\`\`\`

어라? \`x\` 에 \`* 10\` 을 분명히 했는데 \`nums\` 는 그대로네. 뭐가 잘못된 거지?

…잠깐, **이거 어디서 본 적 있는 상황 같지 않아요?** 두 레슨 전 **참조와 함수** 에서:

\`\`\`cpp
void tryChange(int x) { x = 99; }       // 원본 안 바뀜
void change(int& x)   { x = 99; }       // 원본 바뀜
\`\`\`

함수에서 \`int x\` 로 받으면 그건 **복사본**이라 원본을 못 바꿨죠. — 아, 그럼 혹시 \`for (int x : nums)\` 의 \`x\` 도 똑같이 복사본인 거예요?

**네, 정확히 그거예요.** 여기 \`x\` 도 \`nums\` 원소의 복사본이라, 아무리 \`x = x * 10\` 해도 원본은 그대로.

그럼 해결책도 똑같겠네요 — 그때 \`int& x\` 로 \`&\` 붙였던 것처럼, 여기도 \`&\` **만 붙이면**:

\`\`\`cpp
for (int& x : nums) {      // ← x 는 nums 원소의 별명 (원본 그 자체)
    x = x * 10;
}
// nums 는 이제 {10, 20, 30} ✅
\`\`\`

> 💡 한 줄 요약: \`int x\` **면 복사본**, \`int& x\` **면 원본**. 함수든 range-for 든 규칙은 똑같아요.

게다가 \`&\` 는 복사를 안 하니까 **속도도 빨라져요.** 큰 데이터일수록 차이가 커요.

아직 머릿속에 그림이 잘 안 그려져요? 괜찮아요 — 다음 페이지에서 \`int x\` 와 \`int& x\` 를 나란히 실행해보면서 눈으로 직접 확인해볼게요 👇`,
        },
        // ── 4단계: 복사/참조 애니메이션 ──────────────────────
        {
          id: "ch1-ref-anim",
          type: "interactive",
          title: "🎬 복사 vs 참조(&) — 차이 직접 확인!",
          content: "방금 본 두 코드(\`int x\` vs \`int& x\`)를 실제로 돌려봐요. & 하나 차이로 원본이 바뀌는지 안 바뀌는지 눈으로 확인!",
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
          content: `좋아요, **수정할 때**는 \`int& x\`. 그럼 — **읽기만** 할 때(출력, 합 구하기, 검색)는 어떻게 쓸까요?

"그냥 \`int x\` 쓰면 되지 않아요?" — 자연스러운 생각이죠. 작동은 해요. 그런데 문제가 있어요:

> ⚠️ \`int x\` 는 매번 원소를 **복사**해요. \`int\` 3개짜리 벡터면 차이 없지만, 만약 \`vector<string>\` 에 긴 문자열이 100만 개 들어있다면? 반복마다 통째로 복사 — 엄청 느려져요.

→ 그래서 실제 C++ 에서는 **읽기만 할 때도** \`&\` **를 써서 복사를 피해요**. 속도 때문에.

그런데 \`&\` 를 쓰는 순간 또 다른 문제가 생겨요: 원본을 **바꿀 수 있다**는 거. "읽기만 할 거다 해놓고 실수로 \`x = 0\` 한 줄 들어가면?" 컴파일러가 막아주지 않아요.

**여기에 자물쇠를 답니다** — \`const\`. \`&\` 의 속도는 가져가고, 수정 위험은 없애는 조합.

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

## 정리 — 실제로 어떤 패턴을 쓰나요?

| 패턴 | 언제 |
|---|---|
| \`for (int& x : v)\` | 원소를 **수정**해야 할 때 |
| \`for (int x : v)\` | \`int\`, \`double\` 같은 **작은 타입** 읽기만 할 때 — OK |
| \`for (const int& x : v)\` | \`string\`, \`struct\` 같은 **큰 타입** 읽기만 할 때 |

💡 솔직하게 말하면:
- \`int\` 처럼 작은 타입은 복사 비용이 거의 0 이라서 \`for (int x : v)\` 도 멀쩡해요. 실무에서도 흔해요. 굳이 \`&\` 안 써도 돼요.
- \`&\` 가 진짜 의미를 갖는 건 \`vector<string>\`, 큰 \`struct\` 같은 **무거운 타입**일 때. 여기선 복사가 정말 느려서 \`const &\` 가 거의 필수.
- 그래서 머릿속 규칙은 **타입 크기로** 갈라요: 작으면 그냥 복사, 크면 \`const &\`.

(실무 코드를 보면 \`for (const auto& x : v)\` 패턴이 가장 자주 보여요 — 타입 상관없이 안전한 디폴트. \`auto\` 는 바로 다음 챕터에서 배워요.)`,
        },
        // ── 7단계: 최종 연습 ──────────────────────
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Range-for로 합 구하기!",
          content: `**\`const int&\` 패턴**을 손에 익혀볼 차례예요. \`nums\` 의 모든 원소를 더해 \`sum\` 에 담아 출력하세요.

> 💡 \`int\` 라서 사실 \`for (int x : nums)\` 로도 되지만, 큰 타입에서 자연스럽게 쓰도록 여기선 \`const int&\` 로 연습해봐요.`,
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
          content: `1챕터 마지막에서 \`for (const auto& x : v)\` 잠깐 보여줬죠? 그 안에 있던 \`auto\` 가 뭔지 이번에 배워요.

한 줄로 말하면: **타입을 직접 안 적어도, 컴파일러가 알아서 정해주는 키워드.**

지금까지는 변수 만들 때 \`int x = 10;\` 처럼 타입(\`int\`)을 항상 직접 적었죠. \`auto\` 를 쓰면 **컴파일러가 오른쪽 값을 슬쩍 보고** 타입을 정해줘요:

\`\`\`cpp
auto x = 10;          // 컴파일러: "정수네" → x 는 int
auto y = 3.14;        // "소수점 있네" → double
auto name = string("hello");  // string
auto flag = true;     // bool
\`\`\`

> 💡 외울 한 줄: \`auto x = 값;\` → **x 의 타입 = 그 값의 타입**.

### ⚠️ 파이썬이랑 헷갈리지 마세요 — 한 번 정해지면 못 바꿔요

파이썬은 \`x = 10\` 했다가 나중에 \`x = "hello"\` 도 OK 죠 (동적 타입). C++ 의 auto 는 다릅니다 — **처음 만들 때 정해진 타입에 영원히 묶여요**:

\`\`\`cpp
auto x = 10;       // x 는 int 로 결정 (영원히)
x = 3.14;          // ⚠️ 3 만 저장 (int 라 소수점 잘림)
x = "hello";       // ❌ 컴파일 에러
\`\`\`

즉 auto 는 "타입을 **안** 쓰는 것" 이 아니라 "**컴파일러가 대신 써주는 것**" 이에요. 파이썬만큼 자유롭진 않아요.`
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
          content: `range-for 의 변수에 auto 를 쓰면 타입을 일일이 안 적어도 돼요.

\`\`\`cpp
vector<int> nums = {1, 2, 3};

for (int x : nums) ...     // 직접 타입
for (auto x : nums) ...    // auto — 컴파일러가 int 로 추론
\`\`\`

> 💡 1챕터에서 배운 세 패턴 — \`int x\` (복사) / \`int& x\` (수정) / \`const int& x\` (큰 데이터 읽기) — \`int\` 자리에 \`auto\` 만 넣으면 그대로 통해요. 즉 \`auto x\` / \`auto& x\` / \`const auto& x\`. 새 규칙 외울 거 없음.

\`int\` 처럼 짧은 타입이면 사실 둘 다 비슷해 보여요. **그런데 타입이 길어질수록 auto 의 위력이 확 살아나요.**

다음 페이지에서 2D vector 에 적용해볼게요 — 거기서 차이가 진짜 와닿아요 👇`
        },
        {
          id: "ch2-2d-rangefor",
          type: "explain",
          title: "✨ auto 가 빛나는 순간 — 2D vector",
          content: `약속한 대로, 2D vector 에 적용해볼게요. 여기서 auto 의 진가가 드러나요.

같은 입력 코드를 세 가지 방식으로 비교해봐요:

\`\`\`cpp
vector<vector<int>> grid(3, vector<int>(4, 0));

// ① 인덱스 방식 (지금까지 배운 것)
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 4; j++)
        cin >> grid[i][j];

// ② range-for + 직접 타입 — 안쪽 타입까지 다 써야 함
for (vector<int>& row : grid)
    for (int& val : row)
        cin >> val;

// ③ range-for + auto — 깔끔
for (auto& row : grid)
    for (auto& val : row)
        cin >> val;
\`\`\`

② 와 ③ 을 비교해봐요. \`vector<int>&\` 라고 안쪽 타입까지 다 적는 것보다, \`auto&\` 한 단어가 훨씬 깔끔하죠. **타입이 길어질수록 auto 가 빛난다** 는 게 이런 거예요.

\`grid\` 의 각 \`row\` 는 \`vector<int>\`, 그 안의 각 \`val\` 은 \`int\` — auto 가 알아서 추론해요.

출력 (읽기 전용)도 똑같이 패턴 적용:

\`\`\`cpp
for (const auto& row : grid) {
    for (const auto& val : row)
        cout << val << " ";
    cout << "\\n";
}
\`\`\`

(읽기만 하니까 \`const auto&\` — 1챕터에서 배운 그 패턴이에요.)

그럼 2D 에선 항상 range-for+auto 만 쓰면 되는 걸까요? 사실 그렇진 않아요. 다음 페이지에서 갈림길을 봐요 👇`,
        },
        {
          id: "ch2-2d-index-vs-rangefor",
          type: "explain",
          title: "🤔 그래서 2D 는 range-for? 인덱스?",
          content: `2D 에선 두 방식 **다 써요.** 어느 쪽이 자연스러운지는 한 가지로 갈려요 — **위치** (\`i\`, \`j\`) **가 필요한가**?

range-for 는 변수에 값만 주고 위치는 알려주지 않아요. 그래서:

- "**대각선 원소만 출력**" → \`grid[i][i]\` 가 필요 → **인덱스 \`for\` 가 자연스러움**
- "**모든 원소의 합**" → 위치 안 필요 → **range-for 가 깔끔**

| 패턴 | 위치 필요? | 자연스러운 선택 |
|---|---|---|
| 대각선 \`grid[i][i]\` | ✅ | 인덱스 \`for\` |
| 인접 셀 \`grid[i+1][j]\` | ✅ | 인덱스 \`for\` |
| 테두리 \`i==0\` | ✅ | 인덱스 \`for\` |
| 단순 입력 \`cin >> val\` | ❌ | range-for |
| 전체 합/개수 | ❌ | range-for |

> ℹ️ 위치 필요한 경우에도 외부 카운터로 위치를 추적하면 range-for 로도 풀 수 있긴 해요. 다만 어색해서 거의 안 써요.

### 그럼 USACO 같은 대회 문제는?

대회 문제 중에 **위치를 다뤄야 하는 2D 문제가 자주 등장**해요 (인접 칸 검사, 격자 탐색 등). 그래서 대회 코드에서 인덱스 \`for\` 문을 자주 보게 돼요. (모든 2D 가 그런 건 아니에요 — 단순 입력이나 전체 합 같은 문제도 있어요. 그땐 range-for 가 더 자연스럽고요.)

> 💡 결론: **위치 필요? 인덱스. 위치 안 필요? range-for.** 대회에선 위치를 쓰는 문제가 자주 나와서 인덱스도 자주 보이는 거예요.

다음 페이지 — \`auto\` 로 vector 를 만들 때 빠지기 쉬운 함정 하나 짚을게요.`,
        },
        {
          id: "ch2-vector-trap",
          type: "explain",
          title: "⚠️ auto 가 vector<int> 대신은 안 돼요",
          content: `range-for 변수 자리엔 auto 가 잘 통해요. 근데 **vector 자체 선언은 다릅니다**:

\`\`\`cpp
vector<int> v = {1, 2, 3};   // ✅ 정상 — v 는 vector<int>
auto v = {1, 2, 3};          // ❌ 함정! v 는 vector 가 아니라 'initializer_list'
                              //    push_back, size 같은 vector 멤버 함수 못 씀
\`\`\`

### 왜 그럴까?

\`{1, 2, 3}\` 자체는 "중괄호로 묶은 임시 값 묶음" — \`initializer_list\` 라는 별도 타입이에요.

- \`vector<int> v = {1, 2, 3}\` 라고 쓰면: vector 생성자가 그 값들을 받아서 vector 를 만들어줘요.
- \`auto v = {1, 2, 3}\` 라고 쓰면: auto 는 보이는 그대로 추론하니 \`initializer_list\` 자체가 v 의 타입이 돼요.

### 그래도 auto 로 vector 만들고 싶으면?

\`\`\`cpp
auto v = vector<int>{1, 2, 3};   // 명시하면 OK
\`\`\`
근데 어차피 \`vector<int>\` 라고 쓰는 거라, 그냥 \`vector<int> v = {1, 2, 3};\` 가 더 짧아요.

> 💡 **정리**: 짧은 타입 (\`int\`, \`double\`, \`vector<int>\`) 은 직접 쓰는 게 명확. \`vector<vector<int>>\` 처럼 길어지면 auto 가 빛나요.`
        },
        {
          id: "ch2-auto-tradeoff",
          type: "explain",
          title: "⚠️ auto 자주 만나는 함정 Top 2",
          content: `방금 \`auto v = {1, 2, 3}\` 함정 봤죠. 그것 말고도 \`auto\` 를 쓰면서 자주 깨지는 곳이 두 군데 더 있어요.

### ⭐ 1. 큰 데이터 복사 함정 (가장 흔함)

\`auto\` 는 **참조를 자동으로 받아주지 않아요.** 그래서 큰 데이터를 \`auto\` 로 받으면 통째로 복사돼서 느려질 수 있어요.

\`\`\`cpp
vector<int> big(10000);   // 큰 벡터

auto copy = big;          // 10000 개 통째로 복사 — 느리고 메모리 두 배!
auto& ref = big;          // 원본 가리키기 — 빠름
const auto& cref = big;   // 빠르고 + 수정 안 한다는 약속
\`\`\`

> 🔑 \`int& r = x;\` 가 있더라도 \`auto a = r;\` 이면 a 는 \`int\` (복사). 참조로 받으려면 반드시 **\`auto&\`** 라고 명시해야 해요.

이게 1챕터에서 배운 \`int x\` / \`int& x\` / \`const int& x\` 가 \`auto\` 에서도 똑같이 적용되는 이유예요. \`auto\` 만 붙인다고 자동으로 빠르게 받아주지 않거든요.

### ⭐ 2. 초기값 없으면 컴파일 에러

\`auto\` 는 **오른쪽 값을 보고** 타입을 정해요. 오른쪽이 비어있으면 정할 게 없어요.

\`\`\`cpp
auto x;          // ❌ 에러 — 추론할 값이 없음
auto x = 0;      // ✅ int 로 결정
\`\`\`

\`int x;\` 는 되는데 \`auto x;\` 는 안 된다는 차이만 기억해요.

다음 페이지 — 가끔 만나는 함정 하나 더 + 보너스.`,
        },
        {
          id: "ch2-auto-pitfalls-more",
          type: "explain",
          title: "📓 한 가지 더 — 가독성 함정",
          content: `auto 의 마지막 함정 — 코드를 읽는 사람 입장이에요.

\`\`\`cpp
auto result = calculate();   // result 가 int? double? string? 모름!
int  result = calculate();   // 한눈에 int 라는 걸 알 수 있음
\`\`\`

\`auto\` 는 편한데, 그 대가로 **타입이 한눈에 안 보여요.** 함수가 뭘 리턴하는지 명확하지 않을 때는 명시적으로 타입 적는 게 동료(혹은 미래의 나) 한테 친절해요.

---

> 💡 정리하자면: 처음 배울 땐 **타입을 직접 쓰는 연습** 부터 하고, 익숙해지면 \`auto\` 자연스럽게 섞어 써요. 1챕터의 세 패턴(\`int x\` / \`int& x\` / \`const int& x\`) 이 머리에 박혔으면, \`int\` 자리에 \`auto\` 넣어도 헷갈릴 일이 거의 없어요.

{collapse:📦 보너스 — 숫자 리터럴 차이}
\`\`\`cpp
auto a = 5;       // int (보통 ~21 억까지)
auto b = 5L;      // long (보통 64-bit)
auto c = 5LL;     // long long (큰 수 보장)
auto d = 5.0;     // double
auto e = 5.0f;    // float (단정밀도)
\`\`\`
USACO 같은 데서 큰 수 다루면 \`int\` 가 overflow (~21 억 넘으면 깨짐). 그럴 땐 \`auto x = 5LL;\` 로 명시. 평소엔 신경 안 써도 OK.`,
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

- ✅ **Range-based for** — \`for (int x : v)\` 로 파이썬처럼 인덱스 없이 원소를 바로 꺼내요.
- ✅ **세 가지 패턴** — \`int x\` (복사) / \`int& x\` (수정) / \`const int& x\` (큰 데이터 읽기). 함수 매개변수와 똑같은 규칙.
- ✅ **auto** — 컴파일러가 타입을 추론. 단, 한 번 정해지면 못 바꿔요 (파이썬과 다름).
- ✅ **auto 자리에 그대로** — \`int\` → \`auto\` 만 바꾸면 위 세 패턴 다 통해요.
- ✅ **선택 기준은 타입 크기** — 작은 타입(int, double 등)은 그냥 복사도 OK, 큰 타입(string, struct 등)은 \`const &\` 가 거의 필수.

| 패턴 | 복사? | 수정? | 언제 |
|---|---|---|---|
| \`auto x\` | O | X | 작은 타입 읽기 |
| \`auto& x\` | X | O | 원본 수정 |
| \`const auto& x\` | X | X | 큰 타입 읽기 |

🚀 **다음 레슨 예고 (*문자열 심화*):** \`substr\`, \`find\`, \`replace\` 등 \`string\` 의 진짜 기능들. 그리고 거기서 \`const string&\` 패턴이 진짜 자주 등장해요!`
        }
      ]
    }
  ]
}
