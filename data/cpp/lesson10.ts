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
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔁 Range-based for 문",
          component: "cppRangeForBuilder",
          content: `지난 시간에 \`for (int i = 0; i < size; i++)\` 이런 인덱스 루프를 배웠죠? 매번 이렇게 쓰면 실수하기 쉬워요. 더 간단한 방법이 있어요!

\`\`\`cpp
vector<int> nums = {10, 20, 30};
for (int i = 0; i < nums.size(); i++) {
    cout << nums[i] << " ";
}
\`\`\`

인덱스 변수 \`i\`를 쓰는 게 좀 귀찮지 않았나요? 파이썬처럼 바로 값에 접근하고 싶어요!

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
\`\`\`

\`for (타입 변수 : 컨테이너)\` — 파이썬의 \`for x in list:\`와 거의 같아요!

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`for x in nums:\` | \`for (int x : nums) {\` |
| 타입 안 씀 | 타입 써야 함 |
| 콜론 : | 콜론 : (같아요!) |

배열에도 벡터에도 다 쓸 수 있어요:
\`\`\`cpp
int arr[3] = {1, 2, 3};
for (int x : arr) {     // 배열도 OK!
    cout << x << " ";
}
\`\`\`

💡 range-based for는 인덱스가 필요 없을 때 아주 편해요!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "range-for문으로 벡터를 순회해봐요!",
          code: "vector<int> v = {5, 10, 15};\nfor (___ x ___ v) {\n    cout << x << \" \";\n}",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "var", "auto", "for"] },
            { id: 1, answer: ":", options: [":", "in", "of", "->"] }
          ],
          explanation: "for (int x : v)로 벡터의 모든 원소를 순회해요! 파이썬의 'for x in v'와 비교하면 'in' 대신 ':'을 쓰는 거예요."
        },
        {
          id: "ch1-ref",
          type: "explain",
          title: "🔗 참조(&)로 원소 수정하기",
          content: `range-based for에서 그냥 \`int x\`를 쓰면, 값의 **복사본**이에요. 원본은 안 바뀌어요!

\`\`\`cpp
vector<int> nums = {1, 2, 3};
for (int x : nums) {
    x = x * 10;  // 복사본만 바뀜!
}
// nums는 여전히 {1, 2, 3} 😱
\`\`\`

원본을 바꾸려면 **참조(&)**를 써야 해요:
\`\`\`cpp
vector<int> nums = {1, 2, 3};
for (int& x : nums) {   // & 추가!
    x = x * 10;  // 원본이 바뀜!
}
// nums는 이제 {10, 20, 30} ✅
\`\`\`

파이썬과 비교하면:

**파이썬 🐍 (리스트 원소 변경):**
\`\`\`python
nums = [1, 2, 3]
for i in range(len(nums)):
    nums[i] = nums[i] * 10  # 인덱스로 직접 접근
\`\`\`

**C++ ⚡ (참조로 변경):**
\`\`\`cpp
for (int& x : nums) {
    x = x * 10;  // 참조라서 바로 변경!
}
\`\`\`

| 목적 | 문법 |
|---|---|
| 읽기만 할 때 | \`for (int x : v)\` |
| 수정할 때 | \`for (int& x : v)\` |

💡 &를 붙이면 "원본에 직접 접근"한다는 뜻이에요!

& = '이 원본 자체'라는 뜻이에요. 복사본이 아니라 진짜! 친구에게 사진을 **복사**해서 주면 원본은 안 변하지만, **원본 파일 자체**를 공유하면 친구가 수정하면 내 것도 바뀌잖아요? &가 바로 원본 공유예요!

여기서 & 기호가 나와요! &는 '원본을 직접 수정한다'는 뜻이에요. 자세한 건 레슨 12에서 배울 거예요. 지금은 '&가 있으면 원본 수정, 없으면 복사본'이라고만 기억하세요!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Range-for 출력!",
          code: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {3, 6, 9};\n    for (int x : v) {\n        cout << x * 2 << \" \";\n    }\n    return 0;\n}",
          options: ["3 6 9 ", "6 12 18 ", "2 4 6 ", "에러"],
          answer: 1,
          explanation: "v의 각 원소(3, 6, 9)에 2를 곱해서 출력해요! 3*2=6, 6*2=12, 9*2=18 → \"6 12 18 \""
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Range-for로 합 구하기!",
          content: `vector의 모든 원소의 합을 range-based for로 구해보세요!

힌트: 인덱스 없이, \`for (int x : nums)\`로 각 원소에 바로 접근하면 돼요!`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {4, 8, 15, 16, 23, 42};
    int sum = 0;

    for (int x : nums) {
        sum += x;
    }

    cout << "합계: " << sum << endl;

    return 0;
}`,
          expectedOutput: `합계: 108`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Range-for 기초!",
          content: "range-based for 문에서 벡터의 원소를 **수정**하고 싶을 때 올바른 문법은?",
          options: [
            "for (int x : v)",
            "for (int& x : v)",
            "for (int* x : v)",
            "for (int x in v)"
          ],
          answer: 1,
          explanation: "& (참조)를 써야 원본 원소를 수정할 수 있어요! &가 없으면 복사본만 바뀌어요."
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
          title: "빈칸을 채워주세요",
          content: "auto로 타입을 자동 추론해봐요!",
          code: "___ price = 9.99;\n___ count = 5;\ncout << price * count;",
          fillBlanks: [
            { id: 0, answer: "auto", options: ["auto", "var", "let", "double"] },
            { id: 1, answer: "auto", options: ["auto", "var", "let", "int"] }
          ],
          explanation: "auto를 쓰면 9.99는 double로, 5는 int로 자동 추론돼요! 컴파일러가 타입을 알아서 결정해줘요."
        },
        {
          id: "ch2-combo",
          type: "explain",
          title: "🔥 auto + range-for 조합!",
          component: "cppAutoBuilder",
          content: `auto와 range-for를 같이 쓰면 정말 편해요! 이게 **현대 C++의 대표 스타일**이에요.

**타입을 직접 쓸 때:**
\`\`\`cpp
vector<int> nums = {1, 2, 3};
for (int x : nums) {
    cout << x << " ";
}
\`\`\`

**auto를 쓸 때:**
\`\`\`cpp
vector<int> nums = {1, 2, 3};
for (auto x : nums) {     // auto가 int를 추론!
    cout << x << " ";
}
\`\`\`

세 가지 패턴을 기억하세요:

| 패턴 | 용도 |
|---|---|
| \`for (auto x : v)\` | 읽기 전용 (복사) |
| \`for (auto& x : v)\` | 수정 가능 (참조) |
| \`for (const auto& x : v)\` | 읽기 전용 + 효율적 (큰 객체에 좋음) |

string 벡터로 예를 들어볼게요:
\`\`\`cpp
vector<string> names = {"Alice", "Bob", "Charlie"};

// 타입 직접: vector<string>이니까... string? string&? 헷갈려요
for (const string& name : names) {
    cout << name << endl;
}

// auto: 고민할 필요 없어요!
for (const auto& name : names) {
    cout << name << endl;
}
\`\`\`

언제 뭘 써야 할까요?
- \`auto x\` : 작은 값(int, double)을 읽기만 할 때
- \`auto& x\` : 원소를 **수정**할 때
- \`const auto& x\` : 큰 데이터(string)를 읽기만 할 때 (복사 방지)

💡 \`for (const auto& x : v)\`는 C++ 고수들이 가장 많이 쓰는 패턴이에요!`
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
          content: `숫자 벡터의 모든 원소를 2배로 만들고 출력해보세요!

auto&를 사용해서 원소를 직접 수정한 뒤, auto로 출력해봐요.`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {3, 7, 2, 9, 5};

    // 모든 원소를 2배로!
    for (auto& x : nums) {
        x = x * 2;
    }

    // 결과 출력
    for (auto x : nums) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}`,
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
