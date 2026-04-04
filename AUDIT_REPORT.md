# Quiz Audit Report

Generated: 2026-04-03

---

## C++ Questions (`data/questions/cpp-questions.ts`)

### Wrong lessonId

| Question ID | Current lessonId | Correct lessonId | Reason |
|---|---|---|---|
| 5 | cpp-1 | cpp-3 | Uses `int score = 95` variable declaration. cpp-1 covers only basic structure/main()/#include. Variable declaration is cpp-3 content. |
| 38 | cpp-5 | cpp-6 | Tests `%` operator inside an if-else block; animationKey is `cppIfBuilder`. Primary concept being tested is conditional branching, not the operator itself. |
| 39 | cpp-5 | cpp-6 | Tests `&&` logical operator inside if-else; animationKey is `cppIfBuilder`. Same as id:38 — primarily a conditionals question. |
| 157 | cpp-4 | cpp-8 | Tests function overloading (`void print(int)` vs `void print(double)`). Overloading is explicitly cpp-8 content. cpp-4 covers only `cin >>` / `getline`. |
| 214 | cpp-17 | cpp-23 | Tests `sort(v.begin(), v.end())`. Sort is cpp-23 content (커스텀 정렬). cpp-17 covers STL search functions. |
| 215 | cpp-9 | cpp-17 | Uses `v.insert(v.begin() + 1, 10)` with iterator arithmetic. Iterators (`v.begin()`, `v.end()`) are cpp-17 content; cpp-9 covers only basic vector operations (push_back, pop_back, size, at). |
| 222 | cpp-9 | cpp-17 | Uses `vector<int> v(arr.begin(), arr.end())` iterator constructor. Same violation as id:215 — iterators are cpp-17. |
| 227 | cpp-17 | cpp-23 | Near-identical to id:214. Tests `sort()` and checks sorted order. Belongs in cpp-23, not cpp-17. |

### Prerequisite Violations

| Question ID | lessonId | Issue |
|---|---|---|
| 120 | cpp-11 | Uses `for (char& c : s)` — reference syntax (`&`) is cpp-12 content, taught after cpp-11. Range-for itself is cpp-10 (also after cpp-11 in curriculum order). |
| 121 | cpp-11 | Same as id:120. Uses `for (char& c : s)` with `toupper(c)`. Both reference (`&`) and range-for are from lessons taught after cpp-11. |
| 208 | cpp-16 | Uses C++17 structured binding `auto& [key, val]` in range-for over a map. Structured bindings are an advanced C++17 feature not covered anywhere in the curriculum. |

### Duplicates

| Question IDs | lessonId | Duplicate Topic |
|---|---|---|
| 40, 42, 48 | cpp-5 | All three test finding maximum/minimum of two values using the ternary operator. Three questions on the same narrow pattern is redundant; one or two are sufficient. |
| 52, 60 | cpp-7 | Both test `break` to exit a loop early. id:52 uses a for-loop, id:60 uses a while-loop — the core concept is the same. |
| 58, 63 | cpp-7 | Both test `continue` to skip values in a for-loop with nearly identical setup (skip multiples/certain values). |
| 83, 97 | cpp-9 | Both test `size()` and `back()` after push_back/pop_back operations. Same methods tested with only minor structural difference. |
| 101, 106 | cpp-11 | Both test `substr()`. Near-identical questions differing only in input string. |
| 103, 115 | cpp-11 | Both test `string::find("World")`. Very similar setup and expected answer. |
| 214, 227 | cpp-17 | Near-identical: both sort a vector and check `v[0]` and `v[last]` for correctness. (Also misassigned — both should be cpp-23.) |
| 220, 241 | cpp-17 | Both test `unique() + erase()` pattern for removing consecutive duplicates from a vector. Near-exact duplicates. |
| 243, 257 | cpp-23 | Both implement and test bubble sort. id:243 uses a vector, id:257 uses an array — same algorithm tested twice. |

---

## Python Questions (`data/questions/python-questions.ts`)

### Wrong lessonId

| Question ID | Current lessonId | Correct lessonId | Reason |
|---|---|---|---|
| 160 | 25 | 24 | Tests `deque.rotate()`. The `rotate()` method belongs to `collections.deque` which is 큐/deque content (lesson 24). Lesson 25 covers 2D lists. |
| 161 | 17 | 25 | Tests 2D list matrix indexing. File comment heading says "Lesson 25: 2D 리스트" — lessonId field is incorrect. |
| 162 | 17 | 25 | Tests 2D list column extraction. Same misassignment as id:161. |
| 163 | 17 | 25 | Tests 2D list shallow copy trap. Same misassignment as id:161. |
| 164 | 17 | 25 | Tests 2D list transpose. Same misassignment as id:161. |

### Prerequisite Violations

| Question ID | lessonId | Issue |
|---|---|---|
| 4 | 2 | Uses `bool([])` — an empty list literal `[]`. Lists are introduced in lesson 16 (리스트 기초). Using a list in lesson 2 (숫자형) is a prerequisite violation. |
| 10 | 2 | Same as id:4. Uses `bool([])` in a lesson 2 question. |
| 17 | 3 | Uses an f-string `f"x={x}, y={y}"`. F-strings are lesson 8 content. Using f-strings in lesson 3 (변수와 자료형) is a prerequisite violation. |
| 18 | 3 | Uses `a, *b, c = [1, 2, 3, 4, 5]` — a list literal `[...]` in lesson 3. Lists are lesson 16. Also uses extended iterable unpacking (`*b`), which is an advanced feature not explicitly taught in early lessons. |
| 53 | 11 | Question contains `def is_even(n): return n % 2 == 0`. Function definitions are lesson 32. Lesson 11 covers if/elif/else. Exposing a `def` statement to students who have not yet reached lesson 32 is a major prerequisite violation. |

### Duplicates

| Question IDs | lessonId | Duplicate Topic |
|---|---|---|
| 7, 8 | 2 | Both test `0.1 + 0.2 == 0.3` float precision. id:7 includes a `round()` check; id:8 is a single-expression version. Same concept covered twice with minimal variation. |
| 61, 63, 71 | 13 | All three test `continue` to skip elements in a for-loop. id:63 and id:71 are near-exact duplicates (both skip even numbers from a range with the same loop structure). |
| 66, 76 | 13 | Both test for-else where a `break` prevents the `else` block from executing. Very similar question structure and code. |
| 97, 98 | 16 | Both test shallow copy behavior with `a.copy()` on a list containing a nested list. Same concept (`copy()` does not deep-copy nested objects) tested twice with essentially identical code. |

---

## Summary

| Category | C++ | Python | Total |
|---|---|---|---|
| Wrong lessonId | 8 | 5 | **13** |
| Prerequisite violations | 3 | 5 | **8** |
| Duplicate groups | 9 | 4 | **13** |
| **Total issues** | **20** | **14** | **34** |

### Priority Fixes

**High priority** (affect what concepts students see at what stage):
- Python id:53 (lessonId:11) — shows `def` syntax 21 lessons before functions are taught
- Python id:17, 18 (lessonId:3) — shows f-strings and list literals before they are introduced
- C++ id:157 (cpp-4) — overloading question placed in cin/input lesson
- C++ id:120, 121 (cpp-11) — uses reference syntax from cpp-12 before it is taught

**Medium priority** (misrouted to wrong lesson, will appear in wrong review queue):
- C++ id:214, 227 (cpp-17 → cpp-23) — sort questions will appear in STL search review instead of sort review
- C++ id:215, 222 (cpp-9 → cpp-17) — iterator questions will appear in basic vector review
- Python id:161–164 (lessonId:17 → 25) — four 2D list questions misrouted to lesson 17

**Low priority** (redundancy, not harmful but wasteful):
- All duplicate groups listed above — recommend keeping the best-quality question in each group and marking the others as candidates for replacement with new content covering different aspects of the topic
