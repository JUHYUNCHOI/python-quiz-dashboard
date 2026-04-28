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
          title: "📖 map — 이름으로 바로 찾기",
          content: `1000 명 학생의 점수를 저장한다고 해봐요. 이전 레슨에서 배운 \`vector<pair<string,int>>\` 로 하면:

\`\`\`cpp
vector<pair<string, int>> scores = {
    {"Alice", 95}, {"Bob", 87}, ...  // 1000 개
};

// "Bob" 점수 찾기?
for (auto& p : scores) {
    if (p.first == "Bob") { ... }   // 처음부터 한 명씩 비교
}
\`\`\`

\`Bob\` 이 끝에 있으면 1000 번 비교. 100 만 명이면 100 만 번. 너무 느려요.

우리가 진짜 원하는 건 **"이름 → 점수" 표**. 파이썬에선 그게 \`dict\`:

\`\`\`python
scores = {"Alice": 95, "Bob": 87, "Charlie": 92}
print(scores["Bob"])   # 87 — 즉시!
\`\`\`

C++ 에선 그 역할을 **\`map\`** 이 해요.

\`\`\`cpp
#include <map>
map<string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;
scores["Charlie"] = 92;

cout << scores["Bob"];   // 87 — 즉시!
\`\`\`

문법은 \`map<키타입, 값타입>\`. 사용법은 \`scores[키]\` 로 파이썬 dict 와 거의 똑같아요.

> 💡 한 줄: **map = "키로 바로 값을 찾는 빠른 표"**. 다음 페이지에서 파이썬 dict 와 **한 가지** 결정적 차이를 봐요.`
        },
        {
          id: "ch1-intro-sorted",
          type: "explain",
          title: "📌 파이썬 dict 와 결정적 차이 — 자동 정렬",
          content: `사용법이 거의 같지만 **저장 순서** 가 달라요.

| 파이썬 dict 🐍 | C++ map ⚡ |
|---|---|
| \`scores = {}\` | \`map<string, int> scores;\` |
| \`scores["key"] = val\` | \`scores["key"] = val;\` (같음!) |
| **삽입 순서** 유지 | **키 기준 자동 정렬** |

### 예시로 확인

\`\`\`cpp
map<string, int> scores;
scores["Charlie"] = 92;
scores["Alice"] = 95;
scores["Bob"] = 87;

// 순회하면 어떤 순서?
for (auto& [k, v] : scores) {
    cout << k << " ";
}
// 출력: Alice Bob Charlie  (알파벳 순!)
\`\`\`

삽입은 Charlie → Alice → Bob 순이지만 출력은 **알파벳 순**. C++ \`map\` 은 키를 **항상 정렬해서** 저장해요.

> 💡 이게 trade-off 가 있어요. 정렬이 필요 없고 더 빠른 게 좋다면? \`unordered_map\` — 잠시 후에 비교해서 봐요.`
        },
        {
          id: "ch1-vs-vec-pair",
          type: "explain",
          title: "🤔 그럼 vector<pair> 는 왜 굳이? map 이 있는데",
          content: `좋은 질문이에요. map 이 빠르고 편한데 왜 \`vector<pair<...>>\` 도 따로 배운 걸까요? **둘이 잘하는 게 달라요.**

### 한눈에 비교

| 상황 | \`map\` | \`vector<pair>\` |
|---|---|---|
| 이름 → 점수 **빠른 검색** | ✅ O(log n) | ❌ 처음부터 훑음 |
| **값** (점수) 기준 정렬 | ❌ 키 정렬만 | ✅ sort 로 자유 |
| 중복 키 허용 (동명이인) | ❌ 마지막 값만 남음 | ✅ 다 보존 |
| 삽입 순서 유지 | ❌ 알파벳 자동 정렬 | ✅ 그대로 |
| \`v[0]\`, \`v[1]\` 인덱스 접근 | ❌ 안 됨 | ✅ 됨 |

### 가장 흔한 vector<pair> 가 이기는 케이스 — 점수 순으로 정렬

학생들 점수표를 **점수 내림차순** 으로 정렬하려면?

\`\`\`cpp
// vector<pair> ✅ — sort 한 줄
vector<pair<string, int>> v = {{"Alice", 85}, {"Bob", 92}, {"Carol", 78}};
sort(v.begin(), v.end(), [](auto a, auto b) {
    return a.second > b.second;   // 점수 내림차순
});
// v = {{Bob,92}, {Alice,85}, {Carol,78}}

// map ❌ — 키 (이름) 기준으로만 정렬됨, 값 정렬 불가능
map<string, int> m = {{"Alice", 85}, {"Bob", 92}, {"Carol", 78}};
// 항상 알파벳: Alice → Bob → Carol  (점수 순으로 못 바꿈!)
\`\`\`

map 으로 점수 정렬하려면 결국 \`vector<pair>\` 로 옮겨서 sort 해야 해요. 그래서 정렬이 목적이면 처음부터 \`vector<pair>\`.

### 한 줄 결정 규칙

> **"이름 → 점수 빨리 찾기"** 가 목적? → **map**
> **"점수 순 정렬"** 또는 **"순서대로 다루기"** 가 목적? → **vector<pair>**

> 💡 둘 다 필요한 경우도 흔해요. map 으로 빨리 검색하다가 마지막에 vector<pair> 로 옮겨서 정렬, 같은 식.`
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
          id: "ch1-pred1",
          type: "predict" as const,
          title: "map 출력 예측!",
          code: "#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\nint main() {\n    map<string, int> m;\n    m[\"banana\"] = 2;\n    m[\"apple\"] = 5;\n    m[\"cherry\"] = 3;\n    for (auto& [k, v] : m) {\n        cout << k << \" \";\n    }\n    return 0;\n}",
          options: ["banana apple cherry ", "apple banana cherry ", "cherry banana apple ", "apple cherry banana "],
          answer: 1,
          explanation: "map은 키를 자동으로 정렬해요! 알파벳 순서로 apple → banana → cherry가 출력돼요. 삽입 순서와 상관없어요!"
        },
        {
          id: "ch1-mini-basic",
          type: "practice" as const,
          title: "✋ 잠깐 — 학생 점수 map 만들기",
          content: `**상황**: 학생 3 명의 점수가 미리 들어 있어요. **Dave 의 점수 78** 을 추가하고 **Bob 의 점수** 를 출력하세요.

\`\`\`
초기: Alice=95, Bob=87, Carol=92
추가: Dave=78
출력: 87  (Bob 의 점수)
\`\`\`

> 💡 추가: \`m["Dave"] = 78;\` / 조회: \`cout << m["Bob"];\`. 이 두 줄이면 끝.`,
          starterCode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"] = 87;
    scores["Carol"] = 92;

    // 👇 Dave 의 점수 78 추가, Bob 의 점수 출력


    return 0;
}`,
          code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"] = 87;
    scores["Carol"] = 92;

    scores["Dave"] = 78;
    cout << scores["Bob"];

    return 0;
}`,
          hint: "scores[\"Dave\"] = 78; / cout << scores[\"Bob\"];",
          expectedOutput: `87`
        },
        {
          id: "ch1-missing-key",
          type: "explain",
          title: "⚠️ 없는 키를 [] 로 접근하면? — 위험한 동작",
          content: `C++ map 에서 없는 키를 \`[]\` 로 접근하면 파이썬과 다르게 동작해요. 이게 진짜 헷갈리는 부분.

### 파이썬 — 없는 키 접근 → 에러

\`\`\`python
d = {}
print(d["없는키"])  # KeyError — 바로 에러
\`\`\`

### C++ map — 없는 키 접근 → 조용히 0 으로 생성

\`\`\`cpp
map<string, int> m;
cout << m["없는키"];  // 0 출력 (에러 없음!)
cout << m.size();    // 1 — 키가 하나 생겨버렸어요!
\`\`\`

### 왜 위험? — 오타 시 silent 버그

\`\`\`cpp
scores["Aliec"] = 95;   // 오타! ("Alice" 아니라 "Aliec")
cout << scores["Alice"]; // 0 출력 — 에러 없이 조용히 틀림
// 이제 map 안에 "Aliec": 95 와 "Alice": 0 두 개가 같이 있음
\`\`\`

@핵심: \`[]\` 로 없는 키 접근하는 순간 기본값 0 으로 **자동 생성**. 에러가 안 나서 버그 찾기 어려움.

> 다음 페이지 — 그래서 **읽을 때** 어떻게 안전하게 접근하는지 + 이 특성이 **유용한** 경우도 있다는 거 짚고 가요.`
        },
        {
          id: "ch1-missing-key-safe",
          type: "explain",
          title: "✅ 안전하게 읽기 + 유용한 활용",
          content: `### 안전한 읽기 — \`count\` 로 먼저 확인

\`count(key)\` 는 키가 있으면 **1**, 없으면 **0** 을 돌려줘요. 이걸로 먼저 체크 후 접근하면 자동 생성 함정을 피할 수 있어요.

\`\`\`cpp
map<string, int> scores;
scores["Alice"] = 95;

// ❌ 위험 — "Bob" 없으면 0 이 생겨버림
cout << scores["Bob"];  // 0 출력 + "Bob": 0 자동 추가

// ✅ count 로 먼저 확인
if (scores.count("Bob") > 0) {
    cout << scores["Bob"];  // 있을 때만 접근
} else {
    cout << "없음";
}
\`\`\`

> 💡 \`find\` 라는 함수도 있어요. 더 빠르고 강력하지만 **iterator** 라는 새 개념이 필요해서, **다음 레슨 (STL 탐색 함수) 에서** 본격적으로 배워요. 지금은 \`count\` 만 알아도 충분.

---

### 💡 그런데 이 특성이 유용할 때도 있어요!

**단어 등장 횟수 세기:**

\`\`\`cpp
map<string, int> freq;
vector<string> words = {"apple", "banana", "apple", "cherry", "apple"};

for (string w : words) {
    freq[w]++;  // 처음 나오면 0 으로 생성 후 1 증가
}               // 두 번째부터는 기존 값에 +1

// 결과: apple=3, banana=1, cherry=1
\`\`\`

없는 키를 0 으로 만들어주는 특성 덕분에 **초기화 없이 바로 \`++\`** 가능. 빈도 카운트 (frequency map) 패턴의 핵심.

> 💡 정리: 일반 **읽기** → \`count\` 로 안전하게. *카운트/누적* → \`[]\` 자동 생성 활용.`
        },
        {
          id: "ch1-pred-missing",
          type: "predict" as const,
          title: "없는 키 접근하면?",
          code: `#include <iostream>
#include <map>
#include <string>
using namespace std;
int main() {
    map<string, int> m;
    m["a"] = 1;
    cout << m["b"] << endl;
    cout << m.size() << endl;
    return 0;
}`,
          options: ["에러", "0\n1", "0\n2", "1\n1"],
          answer: 2,
          explanation: "m[\"b\"]는 없는 키라서 기본값 0이 출력되고, 동시에 \"b\":0 이 map에 추가돼요! 그래서 size()가 2가 됩니다. C++ map의 대표적인 함정이에요."
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
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 단어 빈도수 세기!",
          content: `map을 활용해서 단어 배열에서 각 단어가 몇 번 나오는지 세고, 알파벳 순서로 출력하는 코드를 작성해봐요!`,
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
          starterCode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    string words[] = {"apple", "banana", "apple", "cherry", "banana", "apple"};
    map<string, int> freq;

    // 단계 1: words 배열을 순회하며 freq에 빈도수를 세세요

    // 단계 2: freq를 순회하며 "단어: 개수" 형식으로 출력하세요

    return 0;
}`,
          hint: "for(auto& w : words) { freq[w]++; }로 세고, for(auto& [word, count] : freq) { ... }로 출력해요. map은 자동 정렬이라 따로 sort 안 해도 돼요!",
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
    // Chapter 3: map 순회
    // ============================================
    {
      id: "ch3",
      title: "map 순회",
      emoji: "🔄",
      steps: [
        {
          id: "ch3-iter",
          type: "explain",
          title: "📖 map 순회 — 가장 많이 쓰는 방법",
          content: `**먼저 알아둘 것: map은 pair 의 모음**

map 은 내부적으로 데이터를 **pair (쌍)** 로 저장해요:

\`\`\`cpp
map<string, int> scores = {{"Alice", 95}, {"Bob", 87}};
// 내부적으로는:
// pair<string, int>{"Alice", 95}
// pair<string, int>{"Bob", 87}
\`\`\`

즉 map 을 순회하면 각 원소가 **pair** 로 나와요. 그래서 \`.first\` (키) 와 \`.second\` (값) 로 접근할 수 있는 거예요.

---

### ⭐ 가장 많이 쓰는 방법: 구조적 바인딩 (C++17)

pair 를 \`[key, val]\` 로 바로 풀어서 쓰는 방법:

\`\`\`cpp
for (auto& [key, val] : scores) {
    cout << key << ": " << val << endl;
}
// Alice: 95
// Bob: 87
\`\`\`

@핵심: \`map\` 은 항상 **키 기준으로 자동 정렬**돼요! 삽입 순서와 상관없이 알파벳/숫자 순서로 출력. (파이썬 dict 는 삽입 순서 유지지만 C++ map 은 달라요.)

### 파이썬과 비교

\`\`\`python
for key, val in scores.items():
    print(f"{key}: {val}")
\`\`\`

C++ 의 \`auto& [key, val]\` = 파이썬의 \`key, val\`. 사실상 똑같아요.

> 💡 일반적으로는 **이 방법만 알아도 충분**해요. 다음 페이지에서 다른 두 방법도 짚지만 거의 안 써요.`
        },
        {
          id: "ch3-iter-other",
          type: "explain",
          title: "📖 (참고용) 다른 두 가지 방법 — 외울 필요 없어요",
          content: `> 📌 **이 페이지는 외울 필요 없어요.** 옛날 코드 / 다른 사람 코드 만나서 안 보이는 게 나오면 **돌아와서** 보세요. 지금은 한 번 훑고 넘어가도 OK.

구조적 바인딩 외에 두 가지 방법이 더 있어요. 둘 다 거의 안 쓰지만, 다른 코드에서 만나면 알아볼 수 있게:

### 방법 2: range-for + pair 그대로

range-for 로 받되 pair 를 풀지 않고 \`.first\`, \`.second\` 로 접근:

\`\`\`cpp
for (auto& p : scores) {
    cout << p.first << ": " << p.second << endl;
}
// p.first = 키,  p.second = 값
\`\`\`

방법 1, 2 는 **둘 다 range-for** — 차이는 pair 를 풀어서 쓰냐 (1) 그대로 쓰냐 (2).

### 방법 3: 이터레이터 직접

\`begin()\` ~ \`end()\` 이터레이터를 직접 다루는 전통 방식. \`it\` 는 pair 를 가리키는 포인터처럼 동작:

\`\`\`cpp
for (auto it = scores.begin(); it != scores.end(); it++) {
    cout << it->first << ": " << it->second << endl;
}
\`\`\`

### 🔧 \`->\` 처음 보죠? — 화살표 멤버 접근

\`it->first\` 는 사실 \`(*it).first\` 의 **짧은 버전** 이에요. 풀어보면:

- \`*it\` = it 가 가리키는 pair (화살표 따라가서 값 꺼내기)
- \`(*it).first\` = 그 pair 의 first 멤버 접근

매번 \`(*it).\` 적기 귀찮아서 \`->\` 한 번에 처리하는 약식 문법이 만들어진 거예요. **iterator 든 포인터든 — \`그것이 가리키는 것의 멤버\` 접근할 때 쓰는 게 \`->\`**.

| 표현 | 의미 |
|---|---|
| \`s.first\` | s 가 **직접** pair 일 때 (점) |
| \`it->first\` | it 가 pair 를 **가리킬** 때 (화살표) |

> 💡 알아두면 좋아요. \`find()\` 같은 STL 함수가 iterator 를 돌려주니, 그때 \`->\` 만나요.

### 사용 빈도 비교

| 방법 | 빈도 | 언제? |
|---|---|---|
| 1 (구조적 바인딩) | ⭐⭐⭐ 거의 항상 | 현대 코드, 알고리즘 대회 |
| 2 (pair) | ⭐ 가끔 | C++17 이전, pair 자체 다룰 때 |
| 3 (이터레이터) | ⭐ 드물게 | **순회 중 삭제** 등 — 다음 페이지에서 |

> 💡 외울 건 방법 1 하나. \`->\` 는 알아두면 \`find()\` 등에서 자연스럽게 읽힘.`
        },
        {
          id: "ch3-iter-erase",
          type: "explain",
          title: "⚠️ (심화) 순회하면서 삭제할 때 — 이터레이터 함정",
          content: `방법 3 (이터레이터) 이 **진짜 필요한** 드문 경우 — **순회하면서 erase 할 때**.

### ❌ 이렇게 하면 크래시!

\`\`\`cpp
for (auto it = m.begin(); it != m.end(); it++) {  // it++ 가 헤더에
    if (it->second < 0) {
        m.erase(it);  // it 가 무효가 되는데...
    }
    // 헤더에서 it++ 를 또 함 → 무효 포인터 건드려서 크래시!
}
\`\`\`

\`erase()\` 를 하면 그 이터레이터는 **무효 (dangling)** 가 돼요. 지우기 전 번호로 다음 칸을 찾으려는 것과 같아요 — 번호가 다 바뀌어서 엉뚱한 곳을 가리킴.

### ✅ 올바른 방법

\`\`\`cpp
for (auto it = m.begin(); it != m.end(); ) {  // 헤더에 it++ 없음!
    if (it->second < 0) {
        it = m.erase(it);  // erase 가 다음 유효 이터레이터 반환
    } else {
        it++;              // 삭제 안 할 때만 직접 ++
    }
}
\`\`\`

**핵심:** \`m.erase(it)\` 는 삭제하고 **다음 유효한 이터레이터를 반환** 해요. 그래서 \`it = m.erase(it)\` 한 줄이면 이미 다음 원소로 넘어간 셈. 삭제할 때는 \`it++\` 안 하고, 삭제 안 할 때만 \`else\` 에서 \`it++\`.

> 💡 이 패턴은 **순회 중 삭제** 가 필요할 때만. 그게 아니면 방법 1 (구조적 바인딩) 으로 충분해요.`
        },
        {
          id: "ch3-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "map을 구조적 바인딩으로 순회해요!",
          code: "map<string, int> scores = {{\"Alice\", 95}, {\"Bob\", 87}};\nfor (auto& ___ : scores) {\n    cout << key << \": \" << val << endl;\n}",
          fillBlanks: [
            { id: 0, answer: "[key, val]", options: ["[key, val]", "(key, val)", "key, val", "p.first, p.second"] }
          ],
          explanation: "C++17 구조적 바인딩이에요! auto& [key, val]로 pair를 바로 풀어서 쓸 수 있어요. 가장 많이 쓰는 방법이에요."
        },
        {
          id: "ch3-practice",
          type: "practice" as const,
          title: "✋ 점수 합계와 평균 출력",
          content: `학생 점수표 \`map<string, int>\` 를 순회해서 **합계** 와 **평균** 을 출력해요.

\`\`\`
입력: 4
      Alice 90
      Bob 85
      Carol 92
      Dave 78
출력:
합계: 345
평균: 86.25
\`\`\`

> 💡 \`for (auto& [name, score] : m)\` 로 순회하며 \`score\` 누적. 평균은 \`(double)sum / n\`.`,
          starterCode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, int> scores;
    for (int i = 0; i < n; i++) {
        string name;
        int s;
        cin >> name >> s;
        scores[name] = s;
    }
    // 👇 구조적 바인딩으로 순회하며 합계 계산, 평균 출력

    return 0;
}`,
          code: `#include <iostream>
#include <map>
#include <string>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, int> scores;
    for (int i = 0; i < n; i++) {
        string name;
        int s;
        cin >> name >> s;
        scores[name] = s;
    }
    int sum = 0;
    for (auto& [name, score] : scores) {
        sum += score;
    }
    cout << "합계: " << sum << endl;
    cout << "평균: " << (double)sum / n << endl;
    return 0;
}`,
          hint: "for (auto& [name, score] : scores) { sum += score; } 로 순회. 평균은 (double)sum / n.",
          expectedOutput: `합계: 345
평균: 86.25`,
          stdin: `4
Alice 90
Bob 85
Carol 92
Dave 78`,
        }
      ]
    },
    // ============================================
    // Chapter 4: map 함수들
    // ============================================
    {
      id: "ch4",
      title: "map 함수들",
      emoji: "🔧",
      steps: [
        {
          id: "ch4-func",
          type: "explain",
          title: "🔧 map 주요 함수들 — 검색·확인·삭제",
          content: `map 에서 자주 쓰는 함수들이에요.

\`\`\`cpp
map<string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;

// 키가 있는지 확인
if (scores.count("Alice") > 0) {
    cout << "Alice 있어요!" << endl;
}

// find 로 검색 (없으면 end() 반환)
auto it = scores.find("Bob");
if (it != scores.end()) {
    cout << it->second << endl;  // 87
}

// 크기 확인
cout << scores.size() << endl;   // 2
cout << scores.empty() << endl;  // 0 (false, 비어있지 않음)

// 키-값 삭제
scores.erase("Bob");
cout << scores.size() << endl;   // 1
\`\`\`

### 파이썬과 비교

| 파이썬 🐍 | C++ map ⚡ |
|---|---|
| \`"key" in d\` | \`m.count("key") > 0\` |
| \`d.get("key")\` | \`m.find("key")\` |
| \`del d["key"]\` | \`m.erase("key")\` |
| \`len(d)\` | \`m.size()\` |
| \`not d\` | \`m.empty()\` |

> 다음 페이지 — \`count\` 와 \`find\` 둘 다 "찾기" 같은데 **어떤 상황에 어느 거** 써야 깔끔한지 짚고 가요.`
        },
        {
          id: "ch4-func-cf",
          type: "explain",
          title: "🆚 count vs find — 어떤 상황에 어느 거?",
          content: `둘 다 "찾기" 인데 돌려주는 게 달라서 쓰임이 달라요.

| | \`m.count(key)\` | \`m.find(key)\` |
|---|---|---|
| 반환값 | 1 (있음) / 0 (없음) | iterator / \`m.end()\` (없음) |
| 용도 | "있는지만" 확인 | "있으면 값도" 사용 |

\`\`\`cpp
// count — 있는지만 확인
if (m.count("Alice") > 0) {
    cout << "Alice 있어요!";
}

// find — 있으면 값까지 같이
auto it = m.find("Alice");
if (it != m.end()) {
    cout << it->second;  // 값 접근
}
\`\`\`

---

### 💡 순회 중 삭제 — 가장 쉬운 패턴

이전에 본 \`it = m.erase(it)\` 이터레이터 방법은 정확하지만 복잡해요. **더 쉬운 대안**:

\`\`\`cpp
// 1) 지울 키만 모아두고
vector<string> toDelete;
for (auto& [k, v] : m) {
    if (v < 0) toDelete.push_back(k);
}

// 2) 루프 끝난 다음 삭제
for (auto& k : toDelete) {
    m.erase(k);
}
\`\`\`

순회와 삭제를 **분리** 하니까 이터레이터 무효화 걱정 없음. 코드도 읽기 쉬움. 일반적인 경우엔 이게 더 추천돼요.`
        },
        {
          id: "ch4-pred1",
          type: "predict" as const,
          title: "count vs size!",
          code: `#include <iostream>
#include <map>
#include <string>
using namespace std;
int main() {
    map<string, int> m;
    m["a"] = 1;
    m["b"] = 2;
    cout << m.count("a") << endl;
    cout << m.count("c") << endl;
    cout << m.size() << endl;
    return 0;
}`,
          options: ["1\n0\n2", "1\n1\n2", "2\n0\n2", "1\n0\n3"],
          answer: 0,
          explanation: "count()는 키가 있으면 1, 없으면 0이에요! 'a'는 있어서 1, 'c'는 없어서 0. size()는 map의 원소 수 = 2에요."
        },
        {
          id: "ch4-practice",
          type: "practice" as const,
          title: "✋ 키 안전하게 조회하기",
          content: `학생 점수가 \`map<string, int>\` 에 들어 있어요. 사용자가 입력한 이름의 점수를 찾아서 출력하되, **없는 이름이면 "없음" 출력**.

\`\`\`
입력: Alice
출력: 95

입력: Zoe
출력: 없음
\`\`\`

> 💡 \`m.count(key) > 0\` 로 먼저 확인. 있을 때만 \`m[key]\` 접근.
> ⚠️ \`m["없는 이름"]\` 바로 접근하면 자동 생성돼서 0 출력 — 함정!`,
          starterCode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> scores = {
        {"Alice", 95}, {"Bob", 87}, {"Carol", 92}
    };
    string query;
    cin >> query;
    // 👇 query 가 있으면 점수 출력, 없으면 "없음"

    return 0;
}`,
          code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> scores = {
        {"Alice", 95}, {"Bob", 87}, {"Carol", 92}
    };
    string query;
    cin >> query;
    if (scores.count(query) > 0) {
        cout << scores[query];
    } else {
        cout << "없음";
    }
    return 0;
}`,
          hint: "if (scores.count(query) > 0) { cout << scores[query]; } else { cout << \"없음\"; }",
          expectedOutput: `95`,
          stdin: `Alice`,
        }
      ]
    },
    // ============================================
    // Chapter 5: map 정리 퀴즈
    // ============================================
    {
      id: "ch5",
      title: "map 퀴즈",
      emoji: "📖",
      steps: [
        {
          id: "ch5-q1",
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
          id: "ch5-q3",
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
          id: "ch5-q5",
          type: "quiz",
          title: "없는 키 접근!",
          content: `다음 코드의 출력은?

\`\`\`cpp
map<string, int> m;
m["apple"] = 3;
cout << m["banana"] << endl;
cout << m.size() << endl;
\`\`\``,
          options: [
            "에러 발생\n1",
            "0\n1",
            "0\n2",
            "에러 발생\n2"
          ],
          answer: 2,
          explanation: "[]로 없는 키 접근 시 기본값 0으로 자동 생성돼요! banana가 새로 생겨서 size는 2가 돼요."
        },
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
          content: `시험 점수 목록에서 중복 없이 고유한 점수만 알고 싶어요. 벡터로 하면 일일이 중복 체크해야 해요. **set 은 넣기만 하면 자동으로 중복 제거 + 정렬!**

파이썬 \`set\` 써본 적 있죠? C++ 에도 \`set\` 이 있어요:

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

### 파이썬과 비교

\`\`\`python
nums = set()
nums.add(3); nums.add(1); nums.add(4); nums.add(1); nums.add(5)
# nums = {1, 3, 4, 5} — 중복 제거! (정렬은 보장 안 됨)
\`\`\`

| 파이썬 set 🐍 | C++ set ⚡ |
|---|---|
| \`s = set()\` | \`set<int> s;\` |
| \`s.add(x)\` | \`s.insert(x);\` |
| 중복 제거 O, 정렬 X | **중복 제거 O, 자동 정렬 O!** |

C++ \`set\` 은 파이썬 set 과 달리 **자동 오름차순 정렬** 돼요. (map 이 키 정렬되는 거랑 같은 원리.)

> 다음 페이지 — set 으로 자주 하는 작업 (삽입/삭제/검색) 정리.`
        },
        {
          id: "ch2-intro-methods",
          type: "explain",
          title: "🔧 set 주요 메서드",
          content: `set 에서 자주 쓰는 함수들이에요. map 과 거의 같은 패턴이라 어렵지 않아요.

\`\`\`cpp
set<int> s;

s.insert(10);      // 삽입 (이미 있으면 무시)
s.erase(10);       // 삭제
s.count(10);       // 있으면 1, 없으면 0
s.find(10);        // 이터레이터 반환 (없으면 end())
s.size();          // 원소 개수
s.empty();         // 비어있으면 true
\`\`\`

### 파이썬 비교

| 파이썬 🐍 | C++ set ⚡ |
|---|---|
| \`s.add(x)\` | \`s.insert(x);\` |
| \`s.remove(x)\` | \`s.erase(x);\` |
| \`x in s\` | \`s.count(x) > 0\` |
| \`len(s)\` | \`s.size();\` |
| \`not s\` | \`s.empty();\` |

> 💡 거의 \`map\` 과 똑같은 함수 이름. **차이는 단 하나** — set 은 키만 (값 없음), map 은 키-값. 그래서 set 의 find/count 는 그 값이 있는지만 알려줘요.`
        },
        {
          id: "ch2-vs-sort-unique",
          type: "explain",
          title: "🤔 그럼 vector + sort + unique 는 왜? set 이 있는데",
          content: `정렬 레슨에서 \`sort + unique + erase\` 패턴을 배웠죠. set 도 자동으로 중복 제거 + 정렬해주는데 — **셋이 어떻게 다를까요?**

> 💡 옵션이 **셋** 인 이유 — \`set\` 의 더 빠른 사촌 \`unordered_set\` 도 있어요 (다음 페이지에서 자세히). 일단 "정렬 안 하지만 더 빠른 set" 정도로 알면 OK.

### 3 가지 한눈에 비교

| 상황 | \`set\` | \`unordered_set\` | \`vector + sort + unique\` |
|---|---|---|---|
| 데이터 **실시간** 추가 | ✅ O(log n) | ✅ **O(1) — 가장 빠름** | ❌ 매번 sort 비효율 |
| **이미 있는** 데이터 한 번만 정리 | ❌ 옮기는 비용 | ❌ 옮기는 비용 | ✅ 한 번만 처리 — 빠름 |
| 자주 "있나?" 검색 | ✅ O(log n) | ✅ **O(1)** | ❌ 매번 훑음 |
| **정렬된 순서** 로 순회 | ✅ 자동 정렬 | ❌ 순서 없음 | ✅ 정렬돼 있음 |
| **인덱스** 접근 \`v[i]\` | ❌ 안 됨 | ❌ 안 됨 | ✅ 됨 |

### 결정 규칙

**상황 A — 흘러 들어오는 데이터, 빠른 *추가/검색* 이 핵심:**
\`\`\`cpp
unordered_set<int> seen;       // 가장 빠름
while (cin >> x) {
    seen.insert(x);
    if (seen.count(y)) ...
}
\`\`\`
→ 정렬된 순서 필요 없으면 **unordered_set**. 정렬도 필요하면 **set**.

**상황 B — 데이터 한꺼번에, 마지막에 한 번만 정리 + 인덱스 접근:**
\`\`\`cpp
vector<int> v(n);
for (int i = 0; i < n; i++) cin >> v[i];
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
// 이후 v[0], v[1]... 자유롭게
\`\`\`
→ **vector + sort + unique.**

### 한 줄 결정

| 필요한 것 | 정답 |
|---|---|
| 빠른 추가/검색만, 순서 X | **unordered_set** ⭐ 보통 가장 빠름 |
| 빠른 추가/검색 + 정렬된 순서 | **set** |
| 한 번만 정리 + 인덱스 접근 | **vector + sort + unique** |

> 💡 간단 규칙: "**수집 중인 자료구조** 라면 \`(unordered_)set\`, *결과물 / 인덱스 필요* 라면 \`vector\`". 알고리즘 대회에서 셋 다 자주 등장.`
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
          id: "ch2-set-mini",
          type: "practice" as const,
          title: "✋ 잠깐 — 학생 명단에 있나 확인하기",
          content: `**상황**: 학원 등록 학생 5 명 명단이 있어요. 사용자가 입력한 이름이 **명단에 있나** 확인하세요.

\`\`\`
명단: Alice, Bob, Carol, David, Eve
입력: Carol → "있음"
입력: Frank → "없음"
\`\`\`

set 에 명단 넣고 \`count()\` 로 확인.

> 💡 \`s.count(name) > 0\` → 있음 / \`== 0\` → 없음.
> 💡 vector 에서 찾으려면 \`for\` 로 한 명씩 비교해야 하지만, set 은 \`count\` 한 줄.`,
          starterCode: `#include <iostream>
#include <set>
#include <string>
using namespace std;

int main() {
    set<string> roster = {"Alice", "Bob", "Carol", "David", "Eve"};
    string query;
    cin >> query;

    // 👇 query 가 roster 에 있으면 "있음", 없으면 "없음"


    return 0;
}`,
          code: `#include <iostream>
#include <set>
#include <string>
using namespace std;

int main() {
    set<string> roster = {"Alice", "Bob", "Carol", "David", "Eve"};
    string query;
    cin >> query;

    if (roster.count(query) > 0) cout << "있음";
    else cout << "없음";

    return 0;
}`,
          hint: "if (roster.count(query) > 0) cout << \"있음\"; else cout << \"없음\";",
          expectedOutput: `있음`,
          stdin: `Carol`,
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
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 중복 제거 후 정렬 출력!",
          content: `set을 활용해서 숫자 배열에서 중복을 제거하고 정렬된 순서로 출력하는 코드를 작성해봐요!`,
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
          starterCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int arr[] = {4, 2, 7, 2, 9, 4, 1, 7, 3};
    set<int> s;

    // arr의 원소를 모두 s에 insert하세요

    // s.size()로 개수를 출력하고, range-for로 원소를 출력하세요

    return 0;
}`,
          hint: "for(auto x : arr) { s.insert(x); }로 배열을 set에 넣어요. set은 중복 제거 + 자동 정렬! s.size()로 크기, range-for로 출력해요",
          expectedOutput: `Count: 6
1 2 3 4 7 9 `
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
    // Chapter 6: set 정리 퀴즈 + 마무리
    // ============================================
    {
      id: "ch6",
      title: "set 퀴즈 & 정리",
      emoji: "🏆",
      steps: [
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
          id: "ch6-q2",
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
          id: "ch6-q4",
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
          id: "ch6-summary",
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
