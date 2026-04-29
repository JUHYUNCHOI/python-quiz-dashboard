// C++ STL 치트시트 데이터
// 각 컨테이너/도구를 한 카드로. 가장 자주 쓰는 명령만 추려서 시험/문제풀이 옆에 띄워놓을 수 있게.

export type CheatRow = {
  code: string         // 코드 한 줄 (예: "v.push_back(x)")
  desc: { ko: string; en: string }
  note?: { ko: string; en: string }   // 짧은 주의사항/시간복잡도 등
}

export type CheatSection = {
  id: string
  emoji: string
  title: { ko: string; en: string }
  header: string        // 한 줄 요약 (예: "동적 배열 — 끝에 추가/삭제 빠름")
  headerEn: string
  include: string       // #include <...>
  declare: string[]     // 선언 예시 (여러 줄 가능)
  rows: CheatRow[]
  iterate?: string      // 순회 패턴 코드 (있으면)
  tip?: { ko: string; en: string }
  lessonId?: string     // 관련 레슨 (cpp-9 등)
}

export const STL_SECTIONS: CheatSection[] = [
  // ============================================================
  // vector
  // ============================================================
  {
    id: "vector",
    emoji: "📦",
    title: { ko: "vector — 동적 배열", en: "vector — dynamic array" },
    header: "끝 추가/삭제 빠름 (O(1)). 인덱스 접근 O(1). 가장 많이 씀.",
    headerEn: "Fast push/pop at end (O(1)). Index access O(1). Most used.",
    include: "#include <vector>",
    declare: [
      "vector<int> v;                    // 빈 벡터",
      "vector<int> v(5);                 // 크기 5, 0 으로 채움",
      "vector<int> v(5, 7);              // 크기 5, 7 로 채움",
      "vector<int> v = {1, 2, 3};        // 초기값 지정",
      "vector<vector<int>> g(n, vector<int>(m, 0));  // 2D",
    ],
    rows: [
      { code: "v.push_back(x)",   desc: { ko: "끝에 x 추가",        en: "Append x at end" }, note: { ko: "O(1) 평균", en: "O(1) amortized" } },
      { code: "v.pop_back()",     desc: { ko: "끝 원소 제거",        en: "Remove last element" } },
      { code: "v.size()",          desc: { ko: "원소 개수",           en: "Number of elements" } },
      { code: "v.empty()",         desc: { ko: "비었나? (true/false)", en: "Empty? (true/false)" } },
      { code: "v.clear()",         desc: { ko: "전부 제거",           en: "Remove all" } },
      { code: "v[i]   /  v.at(i)", desc: { ko: "i 번째 원소",          en: "i-th element" }, note: { ko: "at 은 범위 체크 O", en: "at() bounds-checks" } },
      { code: "v.front() / v.back()", desc: { ko: "첫/마지막 원소",   en: "First / last element" } },
      { code: "v.insert(it, x)",   desc: { ko: "iterator 위치에 x 삽입", en: "Insert x at iterator" }, note: { ko: "O(n) — 끝이 아니면 느림", en: "O(n) if not at end" } },
      { code: "v.erase(it)",       desc: { ko: "iterator 위치 제거",   en: "Erase at iterator" }, note: { ko: "O(n)", en: "O(n)" } },
      { code: "v.resize(n)",       desc: { ko: "크기 n 으로",          en: "Resize to n" } },
    ],
    iterate: `for (int x : v) cout << x << " ";        // 값 복사
for (auto& x : v) x *= 2;                // 참조로 수정
for (int i = 0; i < (int)v.size(); i++)  // 인덱스 필요할 때`,
    tip: {
      ko: "size() 는 unsigned 라 음수 비교 시 캐스팅 필요. for (int i = 0; i < (int)v.size(); ...).",
      en: "size() returns unsigned — cast to int when comparing with negatives.",
    },
    lessonId: "cpp-9",
  },

  // ============================================================
  // string
  // ============================================================
  {
    id: "string",
    emoji: "📝",
    title: { ko: "string — 문자열", en: "string — strings" },
    header: "문자 배열 + 편한 함수들. + 로 이어붙이기 가능.",
    headerEn: "Char array with convenient methods. Concatenate with +.",
    include: "#include <string>",
    declare: [
      `string s;                         // 빈 문자열`,
      `string s = "hello";               // 초기값`,
      `string s(5, 'a');                 // "aaaaa"`,
    ],
    rows: [
      { code: "s.length() / s.size()",    desc: { ko: "길이",              en: "Length" } },
      { code: "s.empty()",                desc: { ko: "비었나?",           en: "Empty?" } },
      { code: "s[i]",                      desc: { ko: "i 번째 문자",        en: "i-th character" } },
      { code: "s + t",                     desc: { ko: "이어붙이기",         en: "Concatenate" } },
      { code: "s += t",                    desc: { ko: "뒤에 붙이기",         en: "Append" } },
      { code: "s.substr(pos, len)",        desc: { ko: "부분 문자열",        en: "Substring" }, note: { ko: "len 생략 시 끝까지", en: "len omitted = until end" } },
      { code: "s.find(t)",                 desc: { ko: "t 위치 찾기",         en: "Find t" }, note: { ko: "없으면 string::npos", en: "Returns string::npos if not found" } },
      { code: "s.replace(pos, len, t)",    desc: { ko: "[pos, pos+len) 를 t 로 교체", en: "Replace [pos, pos+len) with t" } },
      { code: "s.insert(pos, t)",          desc: { ko: "pos 위치에 t 삽입",  en: "Insert t at pos" } },
      { code: "s.erase(pos, len)",         desc: { ko: "[pos, pos+len) 삭제", en: "Erase [pos, pos+len)" } },
      { code: "stoi(s) / stod(s)",         desc: { ko: "숫자로 변환",         en: "Parse to int / double" } },
      { code: "to_string(n)",              desc: { ko: "숫자 → 문자열",       en: "Number → string" } },
      { code: "getline(cin, s)",           desc: { ko: "한 줄 통째로 입력",   en: "Read whole line" } },
    ],
    iterate: `for (char c : s) cout << c;
for (int i = 0; i < (int)s.length(); i++) cout << s[i];`,
    tip: {
      ko: "한 글자는 작은따옴표 'a', 문자열은 큰따옴표 \"a\". 섞으면 컴파일 에러.",
      en: "Single char uses 'a' (single quotes); string uses \"a\" (double). Mixing them fails to compile.",
    },
    lessonId: "cpp-11",
  },

  // ============================================================
  // pair / tuple
  // ============================================================
  {
    id: "pair",
    emoji: "🔗",
    title: { ko: "pair / tuple — 두/여러 값 묶기", en: "pair / tuple — bundle values" },
    header: "두 값(pair) / 여러 값(tuple) 한 변수로 묶기. 좌표·이름+점수 등.",
    headerEn: "Bundle 2 (pair) or N (tuple) values into one variable.",
    include: "#include <utility>  // pair\n#include <tuple>    // tuple",
    declare: [
      `pair<int, string> p = {1, "Alice"};`,
      `pair<int, int> coord(3, 5);`,
      `tuple<int, string, double> t = {1, "Bob", 95.5};`,
      `auto p = make_pair(1, "Alice");      // 타입 추론`,
    ],
    rows: [
      { code: "p.first / p.second",         desc: { ko: "pair 의 두 값",       en: "Two values of pair" } },
      { code: "get<0>(t), get<1>(t), ...",  desc: { ko: "tuple 의 i 번째 값",   en: "i-th value of tuple" } },
      { code: "auto [a, b] = p;",           desc: { ko: "구조 분해 (C++17)",   en: "Structured binding (C++17)" } },
      { code: "auto& [a, b] = p;",          desc: { ko: "참조로 분해 — 수정 가능", en: "Bind by reference — mutable" } },
      { code: "p1 < p2",                     desc: { ko: "사전식 비교 (first 먼저, 같으면 second)", en: "Lexicographic compare" } },
      { code: "tie(a, b, c) = t;",           desc: { ko: "tuple 분해 (C++11)", en: "Unpack tuple (C++11)" } },
    ],
    iterate: `vector<pair<int, string>> people;
for (auto& [age, name] : people) {
    cout << name << " is " << age << "\\n";
}`,
    tip: {
      ko: "pair 는 자동으로 first 기준 정렬됨 — sort 하면 first 오름차순, 같으면 second 오름차순.",
      en: "pair sorts by first then second by default — handy with sort().",
    },
    lessonId: "cpp-15",
  },

  // ============================================================
  // map
  // ============================================================
  {
    id: "map",
    emoji: "🗺️",
    title: { ko: "map — 키-값 (정렬됨)", en: "map — key-value (sorted)" },
    header: "key 로 value 빠르게 찾기. 자동으로 key 오름차순 정렬. O(log n).",
    headerEn: "Look up value by key. Auto-sorted by key. O(log n).",
    include: "#include <map>",
    declare: [
      `map<string, int> m;                       // 빈 map`,
      `map<string, int> m = {{"a", 1}, {"b", 2}};`,
    ],
    rows: [
      { code: `m["key"] = value;`,            desc: { ko: "추가/덮어쓰기",        en: "Insert / overwrite" }, note: { ko: "⚠️ 없는 key 읽기만 해도 0/\"\" 으로 자동 생성됨", en: "⚠️ Reading missing key auto-creates with default value" } },
      { code: `m.insert({key, val})`,         desc: { ko: "추가 (이미 있으면 무시)", en: "Insert (no overwrite if exists)" } },
      { code: `m.count(key)`,                  desc: { ko: "있으면 1, 없으면 0",   en: "1 if present, 0 if not" }, note: { ko: "✅ 안전한 존재 확인", en: "✅ Safe existence check" } },
      { code: `m.find(key)`,                   desc: { ko: "iterator 반환 (없으면 m.end())", en: "Returns iterator (m.end() if missing)" } },
      { code: `m.at(key)`,                     desc: { ko: "값 반환 — 없으면 예외", en: "Returns value — throws if missing" }, note: { ko: "✅ [] 보다 안전", en: "✅ Safer than []" } },
      { code: `m.erase(key)`,                  desc: { ko: "key 삭제",             en: "Erase key" } },
      { code: `m.size() / m.empty()`,          desc: { ko: "개수 / 비었나?",       en: "Size / empty?" } },
      { code: `m.clear()`,                     desc: { ko: "전부 제거",            en: "Remove all" } },
    ],
    iterate: `for (auto& [key, val] : m) {           // C++17
    cout << key << " -> " << val << "\\n";
}
// 반복자 방식 (옛날 스타일):
for (auto it = m.begin(); it != m.end(); ++it)
    cout << it->first << " " << it->second << "\\n";`,
    tip: {
      ko: "정렬 순서 필요 없으면 unordered_map 이 평균 O(1) 로 더 빠름. find 는 < 순서, unordered_map 은 hash.",
      en: "If you don't need sorted order, unordered_map is O(1) avg — faster.",
    },
    lessonId: "cpp-16",
  },

  // ============================================================
  // unordered_map
  // ============================================================
  {
    id: "unordered_map",
    emoji: "⚡",
    title: { ko: "unordered_map — 키-값 (해시)", en: "unordered_map — key-value (hash)" },
    header: "map 과 사용법 거의 같음. 평균 O(1) — 더 빠름. 정렬 X.",
    headerEn: "Same API as map. Avg O(1) — faster. No order.",
    include: "#include <unordered_map>",
    declare: [
      `unordered_map<string, int> um;`,
    ],
    rows: [
      { code: `um[key] = value;`,             desc: { ko: "추가/덮어쓰기 (자동 생성 주의)", en: "Insert / overwrite (auto-creates)" } },
      { code: `um.count(key)`,                 desc: { ko: "있으면 1, 없으면 0",   en: "1 if present, 0 if not" } },
      { code: `um.find(key) / um.at(key)`,     desc: { ko: "map 과 동일",          en: "Same as map" } },
      { code: `um.erase(key)`,                 desc: { ko: "key 삭제",             en: "Erase key" } },
    ],
    iterate: `for (auto& [k, v] : um) cout << k << "=" << v << "\\n";`,
    tip: {
      ko: "복잡한 key (예: pair<int,int>) 는 hash 함수가 없어서 그대로 못 씀 — 그럴 땐 map 사용.",
      en: "Complex keys (like pair<int,int>) need a custom hash — fall back to map.",
    },
    lessonId: "cpp-16",
  },

  // ============================================================
  // set
  // ============================================================
  {
    id: "set",
    emoji: "🎯",
    title: { ko: "set — 중복 없는 모음 (정렬됨)", en: "set — unique sorted collection" },
    header: "중복 자동 제거 + 자동 오름차순. O(log n).",
    headerEn: "Auto-deduped + auto-sorted ascending. O(log n).",
    include: "#include <set>",
    declare: [
      `set<int> s;`,
      `set<int> s = {3, 1, 4, 1, 5};   // 실제 저장: {1, 3, 4, 5}`,
    ],
    rows: [
      { code: `s.insert(x)`,            desc: { ko: "추가 (중복 무시)",       en: "Insert (duplicates ignored)" } },
      { code: `s.count(x)`,             desc: { ko: "있으면 1, 없으면 0",     en: "1 if present, 0 if not" } },
      { code: `s.find(x)`,              desc: { ko: "iterator (없으면 s.end())", en: "Iterator (s.end() if missing)" } },
      { code: `s.erase(x)`,             desc: { ko: "x 삭제",                en: "Erase x" } },
      { code: `s.size() / s.empty()`,   desc: { ko: "개수 / 비었나?",         en: "Size / empty?" } },
      { code: `*s.begin() / *s.rbegin()`, desc: { ko: "최솟값 / 최댓값",       en: "Min / max value" } },
      { code: `s.lower_bound(x)`,       desc: { ko: "x 이상 첫 원소 iterator", en: "Iterator to first ≥ x" } },
      { code: `s.upper_bound(x)`,       desc: { ko: "x 초과 첫 원소 iterator", en: "Iterator to first > x" } },
    ],
    iterate: `for (int x : s) cout << x << " ";    // 자동 오름차순`,
    tip: {
      ko: "정렬 필요 없으면 unordered_set 이 평균 O(1) 로 더 빠름.",
      en: "If you don't need sorted order, unordered_set is O(1) avg.",
    },
    lessonId: "cpp-16",
  },

  // ============================================================
  // unordered_set
  // ============================================================
  {
    id: "unordered_set",
    emoji: "💨",
    title: { ko: "unordered_set — 중복 없는 모음 (해시)", en: "unordered_set — unique (hash)" },
    header: "set 과 사용법 거의 같음. 평균 O(1). 정렬 X.",
    headerEn: "Same API as set. Avg O(1). No order.",
    include: "#include <unordered_set>",
    declare: [
      `unordered_set<int> us;`,
    ],
    rows: [
      { code: `us.insert(x)`,            desc: { ko: "추가",                  en: "Insert" } },
      { code: `us.count(x)`,             desc: { ko: "있으면 1, 없으면 0",     en: "1 if present, 0 if not" } },
      { code: `us.erase(x)`,             desc: { ko: "x 삭제",                en: "Erase x" } },
    ],
    iterate: `for (int x : us) cout << x << " ";   // 순서 없음`,
    lessonId: "cpp-16",
  },

  // ============================================================
  // stack
  // ============================================================
  {
    id: "stack",
    emoji: "📚",
    title: { ko: "stack — LIFO", en: "stack — LIFO" },
    header: "마지막에 넣은 게 먼저 나옴. 괄호 매칭/되돌리기 등.",
    headerEn: "Last in, first out. Bracket matching, undo, etc.",
    include: "#include <stack>",
    declare: [
      `stack<int> st;`,
    ],
    rows: [
      { code: `st.push(x)`,              desc: { ko: "x 위에 쌓기",            en: "Push x" } },
      { code: `st.pop()`,                desc: { ko: "맨 위 제거 (값 안 줌)",  en: "Pop top (no return)" }, note: { ko: "⚠️ pop 만으로는 값 못 가져옴", en: "⚠️ pop alone doesn't return value" } },
      { code: `st.top()`,                desc: { ko: "맨 위 값 (제거 X)",      en: "Peek top (no remove)" } },
      { code: `st.size() / st.empty()`,  desc: { ko: "개수 / 비었나?",         en: "Size / empty?" } },
    ],
    iterate: `// 비울 때까지 꺼내기:
while (!st.empty()) {
    int x = st.top(); st.pop();
    cout << x << " ";
}`,
    tip: {
      ko: "값을 쓰려면 항상 top() → pop() 두 줄. 빈 스택에서 top()/pop() 호출하면 undefined behavior.",
      en: "Always top() then pop(). Calling on empty stack is UB.",
    },
    lessonId: "cpp-18",
  },

  // ============================================================
  // queue
  // ============================================================
  {
    id: "queue",
    emoji: "🚶",
    title: { ko: "queue — FIFO", en: "queue — FIFO" },
    header: "먼저 넣은 게 먼저 나옴. BFS, 대기열, 시뮬레이션.",
    headerEn: "First in, first out. BFS, queues, simulation.",
    include: "#include <queue>",
    declare: [
      `queue<int> q;`,
    ],
    rows: [
      { code: `q.push(x)`,               desc: { ko: "뒤에 추가",              en: "Push to back" } },
      { code: `q.pop()`,                 desc: { ko: "앞에서 제거",            en: "Pop from front" } },
      { code: `q.front() / q.back()`,    desc: { ko: "앞/뒤 값 (제거 X)",      en: "Peek front/back" } },
      { code: `q.size() / q.empty()`,    desc: { ko: "개수 / 비었나?",         en: "Size / empty?" } },
    ],
    iterate: `while (!q.empty()) {
    int x = q.front(); q.pop();
    // 처리...
}`,
    lessonId: "cpp-18",
  },

  // ============================================================
  // priority_queue
  // ============================================================
  {
    id: "priority_queue",
    emoji: "⛰️",
    title: { ko: "priority_queue — 우선순위 큐", en: "priority_queue — heap" },
    header: "기본은 max-heap (가장 큰 값이 top). 다익스트라 등.",
    headerEn: "Max-heap by default. Used in Dijkstra etc.",
    include: "#include <queue>",
    declare: [
      `priority_queue<int> pq;                              // max-heap`,
      `priority_queue<int, vector<int>, greater<int>> pq;   // min-heap`,
    ],
    rows: [
      { code: `pq.push(x)`,              desc: { ko: "추가",                   en: "Push" } },
      { code: `pq.pop()`,                desc: { ko: "최댓값 (또는 최솟값) 제거", en: "Pop top" } },
      { code: `pq.top()`,                desc: { ko: "최댓값 (또는 최솟값) 보기", en: "Peek top" } },
      { code: `pq.size() / pq.empty()`,  desc: { ko: "개수 / 비었나?",         en: "Size / empty?" } },
    ],
    iterate: `while (!pq.empty()) {
    int x = pq.top(); pq.pop();
    // 큰 값부터 (또는 작은 값부터) 처리
}`,
    tip: {
      ko: "기본이 max-heap 인 거 헷갈리니 min-heap 이 필요할 땐 꼭 greater<int> 명시.",
      en: "Default is max-heap — for min-heap, use greater<int>.",
    },
    lessonId: "cpp-18",
  },

  // ============================================================
  // sort & friends
  // ============================================================
  {
    id: "sort",
    emoji: "🔢",
    title: { ko: "정렬 & 탐색 알고리즘", en: "Sort & Search algorithms" },
    header: "<algorithm> 헤더의 단골 함수들.",
    headerEn: "Common functions from <algorithm>.",
    include: "#include <algorithm>",
    declare: [],
    rows: [
      { code: `sort(v.begin(), v.end())`,                desc: { ko: "오름차순 정렬",         en: "Sort ascending" }, note: { ko: "O(n log n)", en: "O(n log n)" } },
      { code: `sort(v.begin(), v.end(), greater<int>())`, desc: { ko: "내림차순 정렬",         en: "Sort descending" } },
      { code: `sort(v.begin(), v.end(), [](int a, int b){ return a > b; })`, desc: { ko: "람다 커스텀 정렬",      en: "Lambda custom sort" } },
      { code: `reverse(v.begin(), v.end())`,             desc: { ko: "뒤집기",                en: "Reverse" } },
      { code: `unique(v.begin(), v.end())`,              desc: { ko: "연속 중복 제거 → 새 끝 iterator", en: "Dedup consecutive — returns new end" }, note: { ko: "보통 sort 후 erase 와 함께", en: "Use after sort + erase" } },
      { code: `v.erase(unique(v.begin(), v.end()), v.end())`, desc: { ko: "중복 제거 완전판",      en: "Full dedup pattern" } },
      { code: `find(v.begin(), v.end(), x)`,             desc: { ko: "x 찾기 (없으면 v.end())", en: "Find x (v.end() if missing)" }, note: { ko: "O(n) — 정렬 안 됐을 때", en: "O(n) — for unsorted" } },
      { code: `binary_search(v.begin(), v.end(), x)`,    desc: { ko: "정렬된 v 에 x 있나? bool", en: "Is x in sorted v? bool" }, note: { ko: "O(log n) — 반드시 정렬 필요", en: "O(log n) — must be sorted" } },
      { code: `lower_bound(v.begin(), v.end(), x)`,      desc: { ko: "x 이상 첫 위치 iterator", en: "Iterator to first ≥ x" } },
      { code: `upper_bound(v.begin(), v.end(), x)`,      desc: { ko: "x 초과 첫 위치 iterator", en: "Iterator to first > x" } },
      { code: `count(v.begin(), v.end(), x)`,            desc: { ko: "x 가 몇 개인지 셈",      en: "Count occurrences of x" } },
      { code: `*max_element(v.begin(), v.end())`,         desc: { ko: "최댓값 (반복자라 * 필요)", en: "Max value (deref iterator)" } },
      { code: `*min_element(v.begin(), v.end())`,         desc: { ko: "최솟값",                en: "Min value" } },
      { code: `accumulate(v.begin(), v.end(), 0)`,        desc: { ko: "합계 (#include <numeric>)", en: "Sum (need <numeric>)" } },
    ],
    tip: {
      ko: "iterator 위치를 인덱스로: int idx = it - v.begin();",
      en: "Iterator → index: int idx = it - v.begin();",
    },
    lessonId: "cpp-23",
  },
]

// 입출력 미니 가이드
export const IO_TIPS = {
  ko: [
    { code: "cin >> x;",                       desc: "한 값 입력" },
    { code: "cin >> a >> b >> c;",             desc: "여러 값 한 줄 또는 공백 구분" },
    { code: "getline(cin, s);",                desc: "한 줄 통째로 (공백 포함)" },
    { code: "cin.ignore(); getline(cin, s);",  desc: "cin >> 후 getline 쓸 때 (개행 버리기)" },
    { code: "cout << x << \" \" << y << endl;", desc: "출력 + 줄바꿈" },
    { code: "cout << fixed << setprecision(2);", desc: "소수점 2 자리 (#include <iomanip>)" },
    { code: "ios::sync_with_stdio(false); cin.tie(NULL);", desc: "Fast I/O (대용량 입출력)" },
  ],
  en: [
    { code: "cin >> x;",                       desc: "Read one value" },
    { code: "cin >> a >> b >> c;",             desc: "Read multiple (whitespace-separated)" },
    { code: "getline(cin, s);",                desc: "Read whole line (incl. spaces)" },
    { code: "cin.ignore(); getline(cin, s);",  desc: "Use after cin >> (discard newline)" },
    { code: "cout << x << \" \" << y << endl;", desc: "Print + newline" },
    { code: "cout << fixed << setprecision(2);", desc: "2 decimal places (need <iomanip>)" },
    { code: "ios::sync_with_stdio(false); cin.tie(NULL);", desc: "Fast I/O for big input/output" },
  ],
}
