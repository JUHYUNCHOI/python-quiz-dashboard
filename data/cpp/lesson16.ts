// ============================================
// C++ Lesson 16: map & set
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson16Data: LessonData = {
  id: "cpp-16",
  title: "map & set",
  emoji: "🗺️",
  description: "파이썬 dict & set → C++ map & set!",
  chapters: [
    // ============================================
    // Chapter 1: map
    // ============================================
    {
      id: "ch1",
      title: "map — 딕셔너리!",
      emoji: "📖",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📖 map — 키와 값을 짝지어 저장해요!",
          content: `학교 성적 관리 시스템을 만든다고 생각해보세요. '홍길동'의 점수를 바로 찾고 싶어요. 벡터로 하면 처음부터 끝까지 하나씩 찾아야 해요. 1000명이면? 너무 느려요! **이름으로 바로 찾을 수 있는** 도구가 필요해요.

파이썬에서 \`dict\`를 써본 적 있죠? C++에서는 \`map\`이 같은 역할을 해요!

\`\`\`cpp
#include <map>
#include <string>
using namespace std;

map<string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;
scores["Charlie"] = 92;
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
scores = {}
scores["Alice"] = 95
scores["Bob"] = 87
scores["Charlie"] = 92
\`\`\`

거의 똑같죠? 하지만 중요한 차이가 있어요!

| 파이썬 dict 🐍 | C++ map ⚡ |
|---|---|
| \`scores = {}\` | \`map<string, int> scores;\` |
| \`scores["key"] = val\` | \`scores["key"] = val;\` (같아요!) |
| 삽입 순서 유지 | **키 기준으로 자동 정렬!** |
| \`#include\` 불필요 | \`#include <map>\` 필요 |

💡 C++ \`map\`은 키를 **자동으로 정렬**해요! 알파벳 순서로 저장돼요.

\`\`\`cpp
map<string, int> scores;
scores["Charlie"] = 92;
scores["Alice"] = 95;
scores["Bob"] = 87;
// 저장 순서: Alice → Bob → Charlie (알파벳 순!)
\`\`\``
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "이름과 나이를 저장하는 map을 만들어요!",
          code: "#include <map>\nusing namespace std;\n\n___<string, int> ages;\nages[\"Kim\"] = 15;\nages[\"Lee\"] = 16;",
          fillBlanks: [
            { id: 0, answer: "map", options: ["map", "dict", "vector", "set"] }
          ],
          explanation: "C++에서 키-값 쌍을 저장하려면 map을 사용해요! 파이썬의 dict와 같은 역할이에요. map<키타입, 값타입> 형태로 선언해요."
        },
        {
          id: "ch1-methods",
          type: "explain",
          title: "📖 map 순회와 검색!",
          content: `map에서 데이터를 찾고 순회하는 방법을 알아봐요!

**순회하기 — range-for 사용**
\`\`\`cpp
map<string, int> scores = {
    {"Alice", 95}, {"Bob", 87}
};

for (auto& [key, val] : scores) {
    cout << key << ": " << val << endl;
}
// Alice: 95
// Bob: 87  (키 기준 정렬!)
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
for key, val in scores.items():
    print(f"{key}: {val}")
\`\`\`

C++의 \`auto& [key, val]\`은 파이썬의 \`key, val\`과 같은 역할이에요!

**검색 메서드들**
\`\`\`cpp
// 키가 있는지 확인
if (scores.count("Alice") > 0) {
    cout << "Alice 있어요!" << endl;
}

// find로 검색 (없으면 end() 반환)
auto it = scores.find("Bob");
if (it != scores.end()) {
    cout << it->second << endl;  // 87
}

// 키-값 삭제
scores.erase("Bob");

// 크기 확인
cout << scores.size() << endl;  // 1
\`\`\`

| 파이썬 🐍 | C++ map ⚡ |
|---|---|
| \`"key" in d\` | \`m.count("key") > 0\` |
| \`d.get("key")\` | \`m.find("key")\` |
| \`del d["key"]\` | \`m.erase("key")\` |
| \`len(d)\` | \`m.size()\` |

키가 있는지 확인하는 방법 2가지:
• \`m.count(key)\` — 있으면 1, 없으면 0 (간단 확인)
• \`m.find(key)\` — 있으면 iterator, 없으면 end() (값도 같이 쓸 때)

💡 \`count()\`는 키가 있으면 1, 없으면 0을 반환해요! 있는지 확인할 때 편해요.`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "map 출력 예측!",
          code: "#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\nint main() {\n    map<string, int> m;\n    m[\"banana\"] = 2;\n    m[\"apple\"] = 5;\n    m[\"cherry\"] = 3;\n    for (auto& [k, v] : m) {\n        cout << k << \" \";\n    }\n    return 0;\n}",
          options: ["banana apple cherry ", "apple banana cherry ", "cherry banana apple ", "apple cherry banana "],
          answer: 1,
          explanation: "map은 키를 자동으로 정렬해요! 알파벳 순서로 apple → banana → cherry가 출력돼요. 삽입 순서와 상관없어요!"
        },
        {
          id: "ch1-unordered",
          type: "explain",
          title: "📖 unordered_map — 정렬 없이 더 빠르게!",
          content: `\`map\`은 키를 정렬하기 때문에 삽입/검색이 **O(log n)**이에요.
정렬이 필요 없다면? \`unordered_map\`을 쓰면 **O(1)**으로 훨씬 빨라요!

O(1)은 학생이 1000명이든 100만 명이든 **한 번에** 찾는 거예요. O(log n)은 100만 명이면 약 20번 비교해서 찾아요. 둘 다 빠르지만, 정렬이 필요 없다면 unordered가 더 빨라요!

\`\`\`cpp
#include <unordered_map>
using namespace std;

unordered_map<string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;
// 정렬 안 됨! 하지만 검색이 매우 빨라요
\`\`\`

사실 파이썬의 \`dict\`는 C++의 \`unordered_map\`과 더 비슷해요!
(파이썬 dict도 내부적으로 해시 테이블을 써요)

| | map | unordered_map |
|---|---|---|
| 정렬 | O (키 기준 정렬) | X (순서 없음) |
| 삽입/검색 | O(log n) | **O(1) 평균** |
| 내부 구조 | 이진 탐색 트리 | 해시 테이블 |
| 헤더 | \`<map>\` | \`<unordered_map>\` |
| 파이썬 유사 | 없음 | **dict** |

💡 대부분의 경우 \`unordered_map\`이 더 빨라요! 키 정렬이 필요할 때만 \`map\`을 써요.`
        },
        {
          id: "ch1-question",
          type: "explain",
          title: "🙋 질문: 벡터에 pair를 넣어도 비슷하잖아?",
          content: `**"벡터에 pair를 넣어도 비슷하잖아?"**

비슷해 보이지만 큰 차이가 있어요!

벡터는 키로 검색하려면 처음부터 끝까지 찾아야 해요(느림). map은 키로 바로 찾아요(빠름)!

\`\`\`cpp
// vector<pair> — 검색이 느려요 O(n)
vector<pair<string, int>> v = {{"Alice", 95}, {"Bob", 87}};
// "Bob"을 찾으려면 하나씩 확인해야 해요
for (auto& p : v) {
    if (p.first == "Bob") { /* 찾았다! */ }
}

// map — 검색이 빨라요 O(log n)
map<string, int> m = {{"Alice", 95}, {"Bob", 87}};
cout << m["Bob"];  // 바로 접근! 87
\`\`\`

💡 데이터가 많을수록 map의 장점이 커져요! 100만 개의 데이터에서 벡터는 최대 100만 번, map은 약 20번만 비교하면 돼요.`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 단어 빈도수 세기!",
          content: `주어진 단어 배열에서 각 단어가 몇 번 나오는지 세봐요!

map을 사용해서 단어별 개수를 세고, 순회하면서 출력해봐요.
map은 자동 정렬되니까 알파벳 순서로 출력될 거예요!`,
          code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    string words[] = {"apple", "banana", "apple", "cherry", "banana", "apple"};

    map<string, int> freq;
    for (auto& w : words) {
        freq[w]++;
    }

    for (auto& [word, count] : freq) {
        cout << word << ": " << count << endl;
    }

    return 0;
}`,
          expectedOutput: `apple: 3
banana: 2
cherry: 1`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "map 기초!",
          content: "C++ `map`에 대한 설명으로 **맞는** 것은?",
          options: [
            "map은 파이썬 dict처럼 삽입 순서를 유지한다",
            "map은 키를 기준으로 자동 정렬한다",
            "map은 #include 없이 사용할 수 있다",
            "map은 중복 키를 허용한다"
          ],
          answer: 1,
          explanation: "C++ map은 키를 기준으로 자동 정렬해요! 삽입 순서는 유지하지 않아요. #include <map>이 필요하고, 키는 중복될 수 없어요."
        }
      ]
    },
    // ============================================
    // Chapter 2: set
    // ============================================
    {
      id: "ch2",
      title: "set — 집합!",
      emoji: "🎯",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🎯 set — 중복 없이 정렬까지!",
          content: `시험 점수 목록에서 중복 없이 고유한 점수만 알고 싶어요. 벡터로 하면? 일일이 중복 체크해야 해요. set은 넣기만 하면 자동으로 중복 제거 + 정렬!

파이썬의 \`set\`을 써본 적 있죠? C++에도 \`set\`이 있어요!

\`\`\`cpp
#include <set>
using namespace std;

set<int> nums;
nums.insert(3);
nums.insert(1);
nums.insert(4);
nums.insert(1);  // 중복! 무시돼요
nums.insert(5);
// nums = {1, 3, 4, 5} — 중복 제거 + 자동 정렬!
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
nums = set()
nums.add(3)
nums.add(1)
nums.add(4)
nums.add(1)  # 중복! 무시됨
nums.add(5)
# nums = {1, 3, 4, 5} — 중복 제거! (정렬은 보장 안 됨)
\`\`\`

| 파이썬 set 🐍 | C++ set ⚡ |
|---|---|
| \`s = set()\` | \`set<int> s;\` |
| \`s.add(x)\` | \`s.insert(x);\` |
| \`s.remove(x)\` | \`s.erase(x);\` |
| \`x in s\` | \`s.count(x) > 0\` |
| 중복 제거 O, 정렬 X | **중복 제거 O, 자동 정렬 O!** |
| \`len(s)\` | \`s.size()\` |

**주요 메서드**
\`\`\`cpp
s.insert(10);      // 삽입
s.erase(10);       // 삭제
s.count(10);       // 있으면 1, 없으면 0
s.find(10);        // 이터레이터 반환 (없으면 end())
s.size();          // 원소 개수
s.empty();         // 비어있으면 true
\`\`\`

💡 C++ \`set\`은 파이썬 set과 달리 **자동 정렬**돼요! 항상 오름차순으로 저장돼요.`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "set에 값을 넣어봐요!",
          code: "#include <set>\nusing namespace std;\n\nset<int> s;\ns.___(10);\ns.___(20);\ns.___(10);  // 중복 무시!",
          fillBlanks: [
            { id: 0, answer: "insert", options: ["insert", "add", "push", "append"] }
          ],
          explanation: "C++ set에 원소를 넣을 때는 insert()를 사용해요! 파이썬의 add()와 같은 역할이에요. push_back이나 append는 set에서 사용할 수 없어요."
        },
        {
          id: "ch2-unordered",
          type: "explain",
          title: "🎯 unordered_set — 정렬 없이 빠르게!",
          content: `\`set\`이 정렬하느라 느리다면? \`unordered_set\`을 쓰면 돼요!

\`\`\`cpp
#include <unordered_set>
using namespace std;

unordered_set<int> s;
s.insert(3);
s.insert(1);
s.insert(4);
// 정렬 안 됨! 하지만 검색이 O(1)으로 빨라요
\`\`\`

사실 파이썬의 \`set\`은 C++의 \`unordered_set\`과 더 비슷해요!
(파이썬 set도 내부적으로 해시 테이블이에요)

| | set | unordered_set |
|---|---|---|
| 정렬 | O (자동 정렬) | X (순서 없음) |
| 삽입/검색 | O(log n) | **O(1) 평균** |
| 내부 구조 | 이진 탐색 트리 | 해시 테이블 |
| 헤더 | \`<set>\` | \`<unordered_set>\` |
| 파이썬 유사 | 없음 | **set** |

💡 정렬된 순서가 필요하면 \`set\`, 빠른 검색만 필요하면 \`unordered_set\`을 써요!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "set 출력 예측!",
          code: "#include <iostream>\n#include <set>\nusing namespace std;\nint main() {\n    set<int> s;\n    s.insert(5);\n    s.insert(2);\n    s.insert(8);\n    s.insert(2);\n    s.insert(5);\n    cout << s.size() << \": \";\n    for (auto x : s) {\n        cout << x << \" \";\n    }\n    return 0;\n}",
          options: ["5: 5 2 8 2 5 ", "3: 5 2 8 ", "3: 2 5 8 ", "5: 2 2 5 5 8 "],
          answer: 2,
          explanation: "set은 중복을 제거하고 자동 정렬해요! {5, 2, 8, 2, 5}에서 중복을 제거하면 {2, 5, 8}이고, 크기는 3이에요. 정렬된 순서로 2 5 8이 출력돼요!"
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "🎯 map vs set vs unordered 총정리!",
          content: `지금까지 배운 4가지 컨테이너를 한눈에 비교해봐요!

| 컨테이너 | 용도 | 정렬 | 시간복잡도 | 파이썬 유사 |
|---|---|---|---|---|
| \`map\` | 키-값 쌍 | O (키 정렬) | O(log n) | — |
| \`unordered_map\` | 키-값 쌍 | X | **O(1)** | **dict** |
| \`set\` | 값만 (중복X) | O (자동 정렬) | O(log n) | — |
| \`unordered_set\` | 값만 (중복X) | X | **O(1)** | **set** |

**언제 뭘 쓸까?**

1. **키-값 저장 + 정렬 필요** → \`map\`
2. **키-값 저장 + 빠른 검색** → \`unordered_map\`
3. **중복 제거 + 정렬 필요** → \`set\`
4. **중복 제거 + 빠른 검색** → \`unordered_set\`

\`\`\`cpp
// 각각 필요한 #include
#include <map>             // map
#include <unordered_map>   // unordered_map
#include <set>             // set
#include <unordered_set>   // unordered_set
\`\`\`

💡 \`O(log n)\` vs \`O(1)\` — 원소가 많을수록 unordered 버전이 훨씬 빨라요!
하지만 정렬된 순서가 필요하면 정렬 버전을 써야 해요.`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 중복 제거 후 정렬 출력!",
          content: `주어진 숫자 배열에서 중복을 제거하고 정렬된 순서로 출력해봐요!

set을 사용하면 중복 제거와 정렬을 한 번에 할 수 있어요!`,
          code: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int arr[] = {4, 2, 7, 2, 9, 4, 1, 7, 3};

    set<int> s;
    for (auto x : arr) {
        s.insert(x);
    }

    cout << "Count: " << s.size() << endl;
    for (auto x : s) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}`,
          expectedOutput: `Count: 6
1 2 3 4 7 9`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "set 관련!",
          content: "C++ `set`에 대한 설명으로 **틀린** 것은?",
          options: [
            "중복 원소를 허용하지 않는다",
            "원소가 자동으로 정렬된다",
            "insert()로 원소를 추가한다",
            "push_back()으로 원소를 추가한다"
          ],
          answer: 3,
          explanation: "set에는 push_back()이 없어요! insert()로 원소를 추가해요. set은 중복을 허용하지 않고, 원소가 자동 정렬돼요."
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
          title: "map 선언!",
          content: `학생 이름(string)을 키로, 점수(int)를 값으로 저장하는 map의 올바른 선언은?`,
          options: [
            "map<int, string> scores;",
            "map<string, int> scores;",
            "map scores<string, int>;",
            "dict<string, int> scores;"
          ],
          answer: 1,
          explanation: "map<키타입, 값타입>으로 선언해요! 이름(string)이 키, 점수(int)가 값이니까 map<string, int>이 맞아요. dict는 파이썬이에요!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "set 특성!",
          content: `다음 코드 실행 후 s.size()의 값은?

\`\`\`cpp
set<int> s = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
\`\`\``,
          options: [
            "10",
            "7",
            "8",
            "6"
          ],
          answer: 1,
          explanation: "set은 중복을 제거해요! {3, 1, 4, 1, 5, 9, 2, 6, 5, 3}에서 중복을 빼면 {1, 2, 3, 4, 5, 6, 9}로 7개예요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "map vs unordered_map!",
          content: "`map`과 `unordered_map`의 차이로 **맞는** 것은?",
          options: [
            "map이 unordered_map보다 항상 빠르다",
            "unordered_map은 키를 정렬하고 map은 정렬하지 않는다",
            "map은 O(log n), unordered_map은 평균 O(1)이다",
            "둘 다 #include <map>으로 사용한다"
          ],
          answer: 2,
          explanation: "map은 키를 정렬하며 O(log n), unordered_map은 정렬하지 않고 평균 O(1)이에요! unordered_map은 #include <unordered_map>이 필요해요."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "set 출력 순서!",
          content: `이 코드의 출력은?

\`\`\`cpp
set<string> s;
s.insert("cherry");
s.insert("apple");
s.insert("banana");
for (auto& x : s) {
    cout << x << " ";
}
\`\`\``,
          options: [
            "cherry apple banana ",
            "apple banana cherry ",
            "banana apple cherry ",
            "apple cherry banana "
          ],
          answer: 1,
          explanation: "set은 원소를 자동 정렬해요! 문자열도 알파벳 순서로 정렬되니까 apple → banana → cherry 순서로 출력돼요."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 map & set 마스터!",
          content: `## 🏆 레슨 16 완료!

오늘 배운 핵심을 정리해봐요!

### 📖 map
- \`map<K, V>\` — 키-값 쌍 저장, **키 기준 자동 정렬**
- \`m["key"] = value\` — 삽입/수정
- \`m.count("key")\`, \`m.find("key")\` — 검색
- \`m.erase("key")\` — 삭제

### 🎯 set
- \`set<T>\` — **중복 제거 + 자동 정렬**
- \`s.insert(x)\` — 삽입
- \`s.count(x)\`, \`s.find(x)\` — 검색
- \`s.erase(x)\` — 삭제

### ⚡ unordered 버전
- \`unordered_map\`, \`unordered_set\` — 정렬 안 하고 **O(1)으로 빠르게!**
- 파이썬의 \`dict\`, \`set\`과 가장 유사해요

### 파이썬 → C++ 정리

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`dict\` | \`map\` / \`unordered_map\` |
| \`set\` | \`set\` / \`unordered_set\` |
| \`d[key] = val\` | \`m[key] = val;\` |
| \`s.add(x)\` | \`s.insert(x)\` |
| \`x in d\` | \`m.count(x) > 0\` |

🚀 **다음 레슨 예고:** STL 알고리즘 — \`sort\`, \`find\`, \`count\` 등 강력한 도구를 배워봐요!`
        }
      ]
    }
  ]
}
