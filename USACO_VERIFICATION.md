# USACO Quest 채점 검증 결과

마지막 업데이트: 2026-09-17

**2026-06-16 re-submitted via logged-in browser: 22/22 AC — all pass (3 fixed + re-verified same day)** — C++17, all test cases. AC: sleepclass(11/11 cpid=1203), herdle(11/11 cpid=1179), comfycows(12/12 cpid=1108), photoshoot2(14/14 cpid=1204), moolang(16/16 cpid=1324), feedcows(12/12 cpid=1252), oddphotos(11/11 cpid=1084), photoshoot(11/11 cpid=1227), blocks(20/20 cpid=1205), alchemy(11/11 cpid=1229), reverseeng(12/12 cpid=1253), acowdemia2(10/10 cpid=1132), lonelyphoto(11/11 cpid=1155), stalling(12/12 cpid=1085), drought(15/15 cpid=1181), acowdemia3(12/12 cpid=1133), walkhome(10/10 cpid=1157), aircond(11/11 cpid=1276), stuckinrut(10/10 cpid=1061). FIXED + RE-VERIFIED same day (all AC now): aircond1(10/10 cpid=1156, was missing trailing 0-pad), exchange(16/16 cpid=1396, rewrote O(N) monotonic-chain — was brute O(N·M) TLE), nontrans(11/11 cpid=1180, was missing the second cycle direction).

**총 검증: 120 quests (py 120/120, cpp 120/120)**
**전체 만점: py 79/120, cpp 78/120** *(pre-Dec-2020 48 quests 전체 재작성 후 만점 확보, 2026-05-14)*

## 범례
- ✅ 만점
- 🟡 부분/TLE/한계
- ❌ WA/컴파일/file I/O missing/알고리즘 버그

## ⚠️ 중요: pre-Dec-2020 file I/O 이슈 — **2026-05-14 해결**

USACO는 Dec 2020 (cpid 1059+) 부터 stdin/stdout으로 전환. 그 이전 contest는 **file I/O 방식** (`xxx.in/out`).

**2026-05-14 작업:** pre-Dec-2020 48 quest 전체 재작성 완료.
- Python: `with open('xxx.in', 'r') as file: lines = file.readlines()` (lesson 38 학습 범위)
- C++: `ifstream fin("xxx.in"); ofstream fout("xxx.out");` (cpp-19 학습 범위)
- 학습 범위 밖 코드 제거 (Counter, deque, heapq, structured binding, lambda 등)
- 알고리즘 wrong-problem 이었던 16개 quest 도 모두 재작성
- 모든 파일에 `// 🔒 USACO_VERIFIED` 헤더 추가 (자동 수정 방지)

## 검증된 Quest 목록

| Quest ID | 제목 | 회차 | Python | C++ |
|---|---|---|---|---|
| `swaptowin` | Swap to Win | Feb 2026 Bronze #3 | 🟡 6/12 (재제출 2026-09-24 Python-3.6.9, cpid=1589 — **7~12번 시간 초과**. 어젯밤 고친 빈 줄 버그는 사라졌다(옛 기록은 0/1 WA). 파이썬이 큰 입력을 못 버틴다 — 입력 읽기 때문이 아니다(실측 0.14 vs 0.13초)) | ✅ 12/12 PASS |
| `strangefn` | Strange Function | Feb 2026 Bronze #2 | ✅ 12/12 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1588) | ✅ 12/12 PASS |
| `makedistinct` | Make All Distinct | Feb 2026 Bronze #1 | ✅ 13/13 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1587) | ✅ 13/13 PASS |
| `buymilk` | Purchasing Milk | Jan 2026 Bronze #3 | ✅ 16/16 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1565) | ✅ **PASS — 2026-09-17 통과 확인.** 같은 재설계 (구 브루트는 8/9+ TLE). **⚠️ 2026-09-15: `1LL << i` 가 i=N-1 까지 돌아 N≥64 에서 UB — N=64 에 답 0, 무작위 200건 중 142건 오답이었다.** 같은 방식으로 고쳤고 실측 0.15초. PY==CPP 교차 확인(N=30~200). **원인은 로컬 검증이 N≤14 까지만 돌았던 것** — 화면 제약은 N ≤ 100,000 이다. |
| `moohunt` | Moo Hunt | Jan 2026 Bronze #2 | 🟡 7/11 (재제출 2026-09-24 Python-3.6.9, cpid=1564 — **4개 시간 초과**. 파이썬 만점 불가로 이미 기록돼 있던 것) | ✅ **PASS — 선생님이 2026-09-11 제출해 통과 확인.** 비트 연산자를 쓰지 않는 판본이다 (보드를 리스트로 두고 1 을 더하듯 다음 보드로). 실측 최대 입력 **1.43~1.44초**(제한 2초), 비트 판본 1.50~1.53초보다 오히려 빠르다 — 시간은 안쪽 3중 반복이 먹지 보드 만드는 방식이 아니다. 로컬: 공식 샘플 둘 + 랜덤 400건에서 공식 답안 3개와 전부 일치. ✅ **2026-09-13 재제출해 다시 통과.** C++ 표를 **3차원 배열 → 2차원 배열**로 바꾼 판본이다(`count[x][min*N+max]`). 이유: **3차원 배열을 가르치는 레슨이 0개**인데 2차원은 cpp-21 에서 가르친다. 선생님 지시("2차배열로 바꿔줘") → 선생님이 제출해 통과 확인. **지금 화면 코드 = 제출해 통과한 코드**다 — 제출본 `docs/usaco-submit/moohunt-2d.cpp`. (3차원 판본 `moohunt-nobit.cpp` 도 9/11 통과했고 기록으로 남겨둔다. 두 판본은 무작위 400건 완전 일치.) 실측 2차원 1.45~1.47초 · 3차원 1.46초 — 같다(제한 2초). map 은 못 쓴다: unordered_map 5.35초 · map 16.57초. 표를 찾는 횟수가 4.5억 번이라 한 번의 비용(배열 3.2ns · unordered_map 11.9ns · map 37ns)이 그대로 총 시간이 된다. |
| `mooin4` | It's Mooin' Time IV | Jan 2026 Bronze #1 | ✅ 16/16 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1563) | ✅ 16/16 PASS |
| `photoshoot25` | Photoshoot | Dec 2025 Bronze #3 | ✅ 18/18 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1541) | ✅ 18/18 PASS |
| `cowsplits` | COW Splits | Dec 2025 Bronze #2 | ✅ 14/14 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1540) | 같은 알고리즘, 채점기 제출은 아직. 로컬 검증은 통과. |
| `chipxchg` | Chip Exchange | Dec 2025 Bronze #1 | ✅ 12/12 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1539) | 5/12 (overflow bug) |
| `mooin3` | Mooin' Time III | Open 2025 Bronze #3 | ✅ PASS (선생님 통과 버전 = 표 O(26)/query, `docs/mooin3-passing-solution.py`; quest 코드는 bisect 변형 로컬~0.9s. 구 brute 3/11) | ✅ PASS — 부록 map 풀이(M3_MAP_PY/CPP) 선생님 USACO 제출 통과(2026-08-10). 표 방식과 동치, 로컬 브루트 3400+/3400+ 일치, C++ 0.16s/Py 0.64s |
| `cowphotos` | More Cow Photos | Open 2025 Bronze #2 | ✅ PASS (Counter O(N), 재제출 통과 2026-07-23; 구 brute 6/8 TLE) | ✅ 11/11 PASS |
| `hps` | HPS Minus One | Open 2025 Bronze #1 | ✅ 12/12 PASS | ✅ 12/12 PASS |
| `printseq` | Printing Sequences | Feb 2025 Bronze #3 | ✅ 13/13 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1493) | ✅ 13/13 PASS (after dev fix) |
| `mexes` | Making Mexes | Feb 2025 Bronze #2 | ✅ 11/11 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1492) | ✅ 11/11 PASS |
| `reflection` | Reflection | Feb 2025 Bronze #1 | ✅ 14/14 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1491) | ✅ **PASS — 2026-09-17 통과 확인.** 같은 교체 (구 버전은 15/15 PASS). 공식 답안과 일치 확인. |
| `checkups` | Cow Checkups | Jan 2025 Bronze #3 | 🟡 6/13 (TLE 7-13, Python expected slow) | 6/13 (intended O(N^3)) |
| `mooin2` | It's Mooin' Time II | Jan 2025 Bronze #2 | ✅ 11/11 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1468) | ✅ 11/11 PASS |
| `astral` | Astral Superposition | Jan 2025 Bronze #1 | ✅ 12/12 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1467) | ✅ 12/12 PASS |
| `moo` | It's Mooin' Time | Dec 2024 Bronze #3 | ✅ 13/13 PASS | ✅ 13/13 PASS |
| `cheese` | Cheese Block | Dec 2024 Bronze #2 | ✅ 16/16 PASS | ✅ 16/16 PASS |
| `rounding` | Roundabout Rounding | Dec 2024 Bronze #1 | ✅ 13/13 PASS | ✅ 13/13 PASS |
| `interview` | Bessie's Interview | Open 2024 Bronze #1 | ✅ 21/21 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1422) | ❌ 0/1 (WA on sample - wrong algorithm for Silver) |
| `permutation` | FJ's Fav Permutation | Open 2024 Bronze #3 | 🟡 2/11 (TLE 3-11 — 일부러 느린 완전탐색) | 🟡 2/11 (TLE 3-11 — 일부러 느린 완전탐색) |
| `favperm2` | FJ's Fav Perm II | Open 2024 Bronze #3 | 🟡 2/11 (permutation 과 같은 파일) | 🟡 2/11 (permutation 과 같은 파일) |
| `walkfence` | Walking Along a Fence | Open 2024 Bronze #2 | ✅ 11/11 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1420) | 🟡 6/11 (TLE 7-11, O(NP)) |
| `logicalmoos` | Logical Moos | Open 2024 Bronze #1 | ✅ 26/26 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1419) | 🟡 8/22 (TLE - O(NQ) brute) |
| `productivity` | Max Productivity | Feb 2024 Bronze #3 | ✅ 17/17 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1397) | ✅ 17/17 PASS |
| `exchange` | Milk Exchange | Feb 2024 Bronze #2 | ✅ 16/16 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1396) | ✅ 16/16 PASS (re-submitted 2026-06-16 C++17, cpid=1396; rewrote to O(N) monotonic-chain, was brute TLE) |
| `milkexchange` | Milk Exchange | Feb 2024 Bronze #2 | ✅ 16/16 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1396) | ✅ 16/16 PASS (re-submitted 2026-06-16 C++17, cpid=1396; O(N) monotonic-chain, same as exchange) |
| `palindrome` | Palindrome Game | Feb 2024 Bronze #1 | ✅ 13/13 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1395) | 🟡 6/13 (TLE 7-13, O(S^2) DP) |
| `bacteria` | Balancing Bacteria | Jan 2024 Bronze #3 | ✅ 15/15 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1373) | ✅ 15/15 PASS |
| `cannonball` | Cannonball | Jan 2024 Bronze #2 | ✅ 20/20 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1372) | ✅ 20/20 PASS |
| `majority` | Majority Opinion | Jan 2024 Bronze #1 | ✅ 15/15 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1371) | ✅ 15/15 PASS |
| `fjfarms` | FJ Actually Farms | Dec 2023 Bronze #3 | ✅ 13/13 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1349) | 🟡 4/13 (1 WA + 8 TLE) |
| `cowntact` | Cowntact Tracing 2 | Dec 2023 Bronze #2 | ✅ 12/12 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1348) | ❌ 4/12 (WA - same as py (counts 1-blocks)) |
| `candycane` | Candy Cane Feast | Dec 2023 Bronze #1 | ✅ 14/14 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1347) | ✅ 14/14 PASS |
| `rotshift` | Rotate and Shift | Open 2023 Bronze #3 | ✅ 13/13 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1325) | 🟡 7/10 (TLE 8-10, T up to 10^9) |
| `moolang` | Moo Language | Open 2023 Bronze #2 | ✅ 16/16 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1324) | ✅ 16/16 PASS (re-submitted 2026-06-16 C++17, cpid=1324) |
| `feb23` | FEB | Open 2023 Bronze #1 | 🟡 **9/20** (2026-09-24 재제출 — 정답 9·초과 11·**오답 0**. 출력 형식 오류를 고쳤다. 아래 참조) | 🟡 **9/20** (오버플로도 같이 고쳤다) |
| `mooloo` | Watching Mooloo | Feb 2023 Bronze #3 | ✅ 12/12 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1301) | ✅ 12/12 PASS |
| `stampgrid` | Stamp Grid | Feb 2023 Bronze #2 | ✅ 14/14 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1300) | ✅ 14/14 PASS |
| `hungrycow` | Hungry Cow | Feb 2023 Bronze #1 | ✅ 13/13 PASS | ✅ 13/13 PASS |
| `mooops` | Moo Operations | Jan 2023 Bronze #3 | ✅ 11/11 PASS | ✅ 11/11 PASS |
| `aircond` | Air Cownditioning II | Jan 2023 Bronze #2 | ✅ **PASS — 선생님이 2026-09-17 제출해 통과 확인.** (아래는 경위) — 11/11 은 **옛 코드** 기준. 2026-09-16 에 학생이 못 읽는 비트 연산을 걷어냈다(`1<<M`→`2**M`, `mask&(1<<j)`→`% 2`·`//= 2`). 알고리즘 그대로, 문법만. 무작위 400케이스에서 **옛 코드와 답 불일치 0**. | ✅ **PASS — 2026-09-17 통과 확인.** 같은 이유. 옛 기록: ✅ 11/11 PASS (2026-06-16 C++17, cpid=1276). 새 판본도 400케이스 옛 코드와 일치. |
| `leaders` | Leaders | Jan 2023 Bronze #1 | ✅ 17/17 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1275) | ✅ 17/17 PASS |
| `reverseeng` | Reverse Engineering | Dec 2022 Bronze #3 | ✅ 12/12 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1253) | ✅ 12/12 PASS (re-submitted 2026-06-16 C++17, cpid=1253) |
| `feedcows` | Feeding the Cows | Dec 2022 Bronze #2 | ✅ 12/12 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1252) | ✅ 12/12 PASS (re-submitted 2026-06-16 C++17, cpid=1252) |
| `cowcollege` | Cow College | Dec 2022 Bronze #1 | ✅ 12/12 PASS | ✅ 12/12 PASS |
| `alchemy` | Alchemy | Open 2022 Bronze #3 | 🟡 9/11 (재제출 2026-09-24 Python-3.6.9, cpid=1229 — **2·3번 시간 초과**. 재귀를 걷어 2.7배 빨라졌지만(1.82초→0.67초) 모자랐다. 화면에 정직 배너를 달았다. C++ 은 11/11) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1229) |
| `countliars` | Counting Liars | Open 2022 Bronze #2 | ✅ 12/12 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1228) | 🟡 2/12 (TLE - same as py (p up to 10^9)) |
| `photoshoot` | Photoshoot | Open 2022 Bronze #1 | ✅ 11/11 PASS (재제출 2026-09-23 Python-3.6.9, cpid=1227) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1227) |
| `blocks` | Blocks | Feb 2022 Bronze #3 | ✅ 20/20 PASS (재제출 2026-09-23 Python-3.6.9, cpid=1205) | ✅ 20/20 PASS (re-submitted 2026-06-16 C++17, cpid=1205) |
| `photoshoot2` | Photoshoot 2 | Feb 2022 Bronze #2 | ✅ 14/14 PASS | ✅ 14/14 PASS (re-submitted 2026-06-16 C++17, cpid=1204) |
| `sleepclass` | Sleeping in Class | Feb 2022 Bronze #1 | ✅ 11/11 PASS (재제출 2026-09-23 Python-3.6.9, cpid=1203) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1203) |
| `drought` | Drought | Jan 2022 Bronze #3 | ✅ 15/15 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1181) | ✅ 15/15 PASS (re-submitted 2026-06-16 C++17, cpid=1181) |
| `nontrans` | Non-Transitive Dice | Jan 2022 Bronze #2 | ✅ 11/11 PASS (재제출 2026-09-23 Python-3.6.9, cpid=1180) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1180; fixed to check both cycle directions) |
| `herdle` | Herdle | Jan 2022 Bronze #1 | ✅ 11/11 PASS (재제출 2026-09-23 Python-3.6.9, cpid=1179) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1179) |
| `walkhome` | Walking Home | Dec 2021 Bronze #3 | ✅ 10/10 PASS (재제출 2026-09-23 Python-3.6.9, cpid=1157) | ✅ 10/10 PASS (re-submitted 2026-06-16 C++17, cpid=1157) |
| `aircond1` | Air Cownditioning | Dec 2021 Bronze #2 | 🔧 Py rewritten 2026-06-15 to clean diff-array (0-padded, sum of upward jumps); local-verified vs official sample (5) | ✅ 10/10 PASS (re-submitted 2026-06-16 C++17, cpid=1156; fixed missing trailing 0-pad) |
| `lonelyphoto` | Lonely Photo | Dec 2021 Bronze #1 | ✅ 11/11 PASS (재제출 2026-09-23 Python-3.6.9, cpid=1155) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1155) |
| `acowdemia3` | Acowdemia III | Open 2021 Bronze #3 | ✅ 12/12 PASS (재제출 2026-09-23 Python-3.6.9, cpid=1133) | ✅ 12/12 PASS (re-submitted 2026-06-16 C++17, cpid=1133) |
| `acowdemia2` | Acowdemia II | Open 2021 Bronze #2 | ✅ 10/10 PASS (재제출 2026-09-23 Python-3.6.9, cpid=1132) | ✅ 10/10 PASS (re-submitted 2026-06-16 C++17, cpid=1132) |
| `acowdemia1` | Acowdemia I | Open 2021 Bronze #1 | ❌ 13/17 (WA on cases 9,11,12,13 - edge case bug) | ❌ 13/17 (WA same edge cases as py) |
| `clockfence` | Clockwise Fence | Feb 2021 Bronze #3 | ❌ 0/1 (RTE - missing T (test cases) parse) | ❌ 0/1 (WA - output format (counts vs CW/CCW per test)) |
| `comfycows` | Comfortable Cows | Feb 2021 Bronze #2 | ✅ 12/12 PASS | ✅ 12/12 PASS (re-submitted 2026-06-16 C++17, cpid=1108) |
| `yearcow` | Year of the Cow | Feb 2021 Bronze #1 | ✅ 10/10 PASS (재제출 2026-09-24 Python-3.6.9, cpid=1107) | ✅ 10/10 PASS |
| `stalling` | Just Stalling | Jan 2021 Bronze #3 | 🔧 Py rewritten 2026-06-15 to space-separated input + tallest-cow-first greedy (was RTE wrong input format); local-verified vs official sample (8) + 300 random vs brute-force | ✅ 12/12 PASS (re-submitted 2026-06-16 C++17, cpid=1085) |
| `oddphotos` | Even More Odd Photos | Jan 2021 Bronze #2 | ✅ 11/11 PASS (재제출 2026-09-23 Python-3.6.9, cpid=1084) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1084) |
| `uddered` | Uddered but not Herd | Jan 2021 Bronze #1 | ✅ 10/10 PASS | ✅ 10/10 PASS |
| `stuckinrut` | Stuck in a Rut | Dec 2020 Bronze #3 | ✅ 10/10 PASS (재제출 2026-09-23 Python-3.6.9, cpid=1061) | ✅ 10/10 PASS (re-submitted 2026-06-16 C++17, cpid=1061) |
| `daisychains` | Daisy Chains | Dec 2020 Bronze #2 | ✅ 10/10 PASS | ✅ 10/10 PASS |
| `abcs` | Do You Know Your ABCs? | Dec 2020 Bronze #1 | ✅ 10/10 PASS | ✅ 10/10 PASS |
| `cowntrace` | Cowntact Tracing | Open 2020 Bronze #3 | ✅ 16/16 PASS (재작성 2026-05-14) | ✅ 16/16 PASS (재작성 2026-05-14) |
| `socialdist2` | Social Distancing II | Open 2020 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `socialdist1` | Social Distancing I | Open 2020 Bronze #1 | ✅ 15/15 PASS (재작성 2026-05-14) | ✅ 15/15 PASS (재작성 2026-05-14) |
| `swapity` | Swapity Swap | Feb 2020 Bronze #3 | ✅ 13/13 PASS (재작성 2026-05-14) | ✅ 13/13 PASS (재작성 2026-05-14) |
| `madscientist` | Mad Scientist | Feb 2020 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `triangles` | Triangles | Feb 2020 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `race` | Race | Jan 2020 Bronze #3 | ✅ 10/10 PASS (재작성 2026-05-14, 해석적 sqrt+ε 윈도우) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `photoshoot20` | Photoshoot | Jan 2020 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `wordproc` | Word Processor | Jan 2020 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14, 공백 카운트 버그 수정) |
| `livestock` | Livestock Lineup | Dec 2019 Bronze #3 | ✅ 10/10 PASS (재작성 2026-05-14, brute force 순열) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `whereami` | Where Am I? | Dec 2019 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `cowgym` | Cow Gymnastics | Dec 2019 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `cowevolution` | Cow Evolution | Open 2019 Bronze #3 | ✅ 17/17 PASS (재작성 2026-05-14) | ✅ 17/17 PASS (재작성 2026-05-14) |
| `milkfactory` | Milk Factory | Open 2019 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14, deque → list+head) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `bucketbrigade` | Bucket Brigade | Open 2019 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14, BFS → manhattan+우회) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `meastraffic` | Measuring Traffic | Feb 2019 Bronze #3 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14, backward sweep 추가) |
| `revegetation` | Great Revegetation | Feb 2019 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `sleepyherd` | Sleepy Cow Herding | Feb 2019 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14, min/max 공식 수정) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `guessanimal` | Guess the Animal | Jan 2019 Bronze #3 | ✅ 10/10 PASS (재작성 2026-05-14, shared+1 fix) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `sleepysort` | Sleepy Cow Sorting | Jan 2019 Bronze #2 | ✅ 12/12 PASS (재작성 2026-05-14) | ✅ 12/12 PASS (재작성 2026-05-14) |
| `shellgame` | Shell Game | Jan 2019 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `backforth` | Back and Forth | Dec 2018 Bronze #3 | ✅ 10/10 PASS (재작성 2026-05-14, index 버그 수정) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `bucketlist` | The Bucket List | Dec 2018 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `mixmilk` | Mixing Milk | Dec 2018 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `familytree` | Family Tree | Open 2018 Bronze #3 | ✅ 15/15 PASS (재작성 2026-05-14, LCA 분기) | ✅ 15/15 PASS (재작성 2026-05-14) |
| `milkorder` | Milking Order | Open 2018 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14, placement 시뮬레이션) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `teamttt` | Team Tic Tac Toe | Open 2018 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `tameherd` | Taming the Herd | Feb 2018 Bronze #3 | ✅ 10/10 PASS (재작성 2026-05-14, DP) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `hoofball` | Hoofball | Feb 2018 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14, tie-break+mutual fix) |
| `teleport` | Teleportation | Feb 2018 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14, via2 추가) |
| `outofplace` | Out of Place | Jan 2018 Bronze #3 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `lifeguards` | Lifeguards | Jan 2018 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `billboard2` | Blocked Billboard II | Jan 2018 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14, edge condition) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `milkmeas` | Milk Measurement | Dec 2017 Bronze #3 | ✅ 10/10 PASS (재작성 2026-05-14, string cow names) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `bovshuffle` | The Bovine Shuffle | Dec 2017 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14, inverse fix) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `billboard` | Blocked Billboard | Dec 2017 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14, wrong-problem 수정) |
| `modernart` | Modern Art | Open 2017 Bronze #3 | ✅ 10/10 PASS (재작성 2026-05-14, per-cell bbox 검사) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `bovgenomics` | Bovine Genomics | Open 2017 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `lostcow` | The Lost Cow | Open 2017 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14, target from x) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `crossroad3` | Cross the Road III | Feb 2017 Bronze #3 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `crossroad2` | Cross the Road II | Feb 2017 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14, 입력 포맷 fix) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `crossroad1` | Cross the Road | Feb 2017 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `cowtipping` | Cow Tipping | Jan 2017 Bronze #3 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `hps17` | Hoof Paper Scissors | Jan 2017 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14, 6-perm 알고리즘) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `dontbelast` | Don't Be Last! | Jan 2017 Bronze #1 | ✅ 11/11 PASS (재작성 2026-05-14) | ✅ 11/11 PASS (재작성 2026-05-14) |
| `cowsignal` | The Cow-Signal | Dec 2016 Bronze #3 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `blockgame` | Block Game | Dec 2016 Bronze #2 | ✅ 10/10 PASS (재작성 2026-05-14, sum vs max fix) | ✅ 10/10 PASS (재작성 2026-05-14) |
| `sqpasture` | Square Pasture | Dec 2016 Bronze #1 | ✅ 10/10 PASS (재작성 2026-05-14) | ✅ 10/10 PASS (재작성 2026-05-14) |

## 🔁 permutation — 2026-09-23 재제출 (선생님 승인·직접 제출)

**왜 다시 냈나:** 화면에 있던 코드가 **학생이 받으면 안 돌았다.**
- 파이썬 — `search()` 호출부가 `return False` 뒤 **함수 안에 갇혀** 도달 불가. 실행하면 **아무 출력도 없음.**
- C++ — `main()` 을 안 닫은 채 전역 함수를 정의해 **컴파일 실패**(`function definition is not allowed here` 외 5).
⚠️ **읽기로는 «일부러 그런 설계» 로 보였다**(C++ 에 `// (back inside main…)` 주석이 있었다).
  **직접 돌려 보고서야 아니라는 걸 알았다.** 이 quest 는 `FULL_PY`/`FULL_CPP` 가 없어
  조각을 **손으로 타이핑**하다 갈라진 것이다 — 오늘 `explodingarrow`·`mcc21dvd`·`mcc21simplemath` 와 같은 원인.

**같이 바꾼 것 — 재귀를 뺐다.** 선생님(2026-09-23): *"코드 어렵게 하지마. 기억하지?"*
`feedback_student_code_plain_and_no_recursion.md` 의 «진짜 재귀 네 개» 중 하나였고,
**레슨 어디에도 재귀를 가르치는 자리가 없다.**
→ 파이썬 `itertools.permutations` · C++ `next_permutation`. **알고리즘은 같다**(사전순 완전탐색, 첫 매치).
⭐ 덤으로 **Ch1 이 `itertools.permutations` 를 가르쳐 놓고 3장에서 재귀를 보여주던 배신**도 닫혔다.

**제출 결과 — 점수는 그대로다.**
| 언어 | 전 | 후 |
|---|---|---|
| Python (3.6.9) | 🟡 2/11 | 🟡 **2/11** (1번 68ms · 2번 240ms) |
| C++17 | 🟡 2/11 | 🟡 **2/11** (1번 2ms · 2번 16ms) |

**원래 «일부러 느린 완전탐색» 이라 TLE 가 나는 게 정상이다.** 빠르게 만들면 다른 문제가 된다.
이제 `.slice()` 로 조각을 자르므로 **화면 코드와 제출 코드가 바이트 단위로 같다.**

---

# 🇲🇾 MCC 2015 — HackerRank 실제 채점기 제출 (2026-09-24)

**MCC 2015 는 HackerRank 에 원본 대회가 그대로 살아 있다** —
`hackerrank.com/contests/mcc-2015/challenges` (문제 다섯 개, 대회는 끝났지만 **채점은 된다**).
선생님이 로그인해 주셔서 다섯 개를 **전부 Python 3 로 실제 제출**했다.

| quest | HackerRank 문제 | 결과 |
|---|---|---|
| `mcc15rect` | Rectangles (40점) | ✅ 전 테스트 통과 |
| `mcc15equation` | Complete the Equation (70점) | ✅ 전 테스트 통과 |
| `mcc15bahasaf` | Bahasa F (125점) | ❌ **14/17 오답** → 규칙 고쳐 ✅ **17/17 통과** |
| `mcc15isthmus` | Isthmus (125점) | ✅ 전 테스트 통과 |
| `mcc15choco` | Chocolate Bars (140점) | ✅ 전 테스트 통과 |

## ⚠️ `bahasaf` — 공식 샘플로는 안 걸리는 오류였다

원문: *"changing **the first consonant** in every syllable to 'f' … **If the syllable does not have a consonant**, just add 'f' before it"*

우리 코드는 **"첫 글자가 모음이냐"** 로 갈랐다. 원문은 **"첫 자음"** 이다.
`"an"` 처럼 **모음으로 시작하지만 자음이 들어 있는** 음절에서 갈린다 —
우리 답 `"anfan"`, 정답 `"anaf"`.

⭐ **공식 샘플 다섯 단어는 두 해석이 똑같은 답을 낸다.** 그래서 샘플 검산으로는 못 잡았다.
**채점기가 잡았다.** 코드만이 아니라 **화면 설명도 같은 오류를 가르치고 있었다.**

## 다른 연도는 HackerRank 에 없다

`mcc-2016` 만 페이지가 열리고(문제 목록은 안 보임), `2014·2017·2019·2021` 은 없다.
**우리 MCC quest 48개 중 채점기로 확인 가능한 건 2015년 다섯 개뿐이다.**
나머지는 공식 에디토리얼·원문 대조가 최선이다.

## 같은 날 되돌린 것 — 출처를 잘못 골랐다

`9d5f0955` 는 **COCI 원본 PDF + IOI Malaysia 에디토리얼**을 근거로 세 quest 를 고쳤는데,
HackerRank 의 **MCC 2015 원문**과 대조하니 **셋 다 원래 화면이 맞았다.**
MCC 는 COCI 문제를 **제약을 바꿔서** 다시 냈다 — **우리 출처는 MCC 판본이다.**
(`43aa51bc` 에서 되돌림 · `mcc15rect` 음수 좌표 되돌림도 폐기)

---

# 🔁 2026-09-24 재제출 — 코드를 «한 줄에 한 문장» 으로 편 뒤

선생님이 **두 번** 지적하신 것(*"코드는 한줄에 여러개가 있고 보기 않좋아서 읽기 싫던데"*)을
고치면서 🔒 USACO_VERIFIED 코드 여섯 벌을 건드렸다. 삼항을 if/else 로 펴는 변환은
`prove-same-program.py` 가 **원리상 증명을 못 해서**(GCC 가 다른 어셈블리를 낸다) 재제출했다.

| quest | cpid | Python-3.6.9 | C++17 |
|---|---|---|---|
| `astral` | 1467 | ✅ **12/12** | ✅ **12/12** |
| `cowsplits` | 1540 | ✅ **14/14** | ✅ **14/14** |
| `feedcows` | 1252 | ✅ **12/12** | ✅ **12/12** |
| `mooops` | 1277 | — | ✅ **11/11** |
| `printseq` | 1493 | ✅ **13/13** | ✅ **13/13** |

**점수가 하나도 안 떨어졌다.** 제출한 파일이 화면 코드와 같은지 기계로 대조하고 냈다.

## ⚠️ `feb23` — 재제출하다 **진짜 오답**을 찾았다

원문(USACO 2023 US Open Bronze P1, cpid=1323):
> **OUTPUT FORMAT:** First output K … **On the next K lines, output the excitement levels, in increasing order.**

우리 코드는 K 를 낸 뒤 **최솟값과 최댓값만** 출력하고 있었다.

⭐ **공식 샘플 셋 중 둘이 우연히 통과한다** — 둘 다 K=2 라 min·max 가 곧 전체다.
   갈리는 건 샘플 3 뿐이다: `BFFFFFEBFE` → 정답 `3 / 2 / 4 / 6`, 우리 답 `3 / 2 / 6`.
   **`mcc15bahasaf` 와 똑같은 모양이다** — `memory/feedback_sample_pass_is_not_correct.md`

| | 고치기 전 | 고친 뒤 |
|---|---|---|
| Python | 🟡 정답 2 · **오답 6** · 초과 12 | 🟡 정답 **9** · **오답 0** · 초과 11 |
| C++ | 🟡 정답 2 · 오답 6 · 초과 12 | 🟡 정답 9 · **오답 0** · 초과 11 |

**남은 시간 초과는 정상이다** — 이 quest 는 **일부러 느린 `2^|F|` 완전탐색**을 가르친다.
⭐ **C++ 오답 3건도 고쳤다** — `1 << nf` 가 `nf ≥ 31` 에서 **오버플로**라
**루프가 안 돌고 «0» 을 출력한다.** 파이썬은 같은 자리에서 **정직하게 시간 초과**가 난다.
**같은 알고리즘인데 C++ 만 조용히 틀린 답을 냈다 — 이게 제일 나쁜 모양이다.**
→ 0/1 칸 배열로 다음 조합을 만드는 방식으로 바꿨다. `long long` 은 **`nf ≥ 63` 에서 다시 틀린다**(실측).
**이제 파이썬과 C++ 이 똑같이 9/20 · 오답 0 이다.**

---

# 🇲🇾 MCC 2023 · 2024 · 2025 — 공식 테스트 데이터로 채점 (2026-09-24)

**MCC 2019~2025 는 제출할 채점기가 원리상 없다** — 자체 SimpleCMS 에서 돌고,
참가자마다 입력이 다르며 **코드가 아니라 «출력» 을 붙여넣는** 방식이다.
HackerRank 에 있는 건 `mcc-2015`·`mcc-2015-practice`·`mcc-2016` 셋뿐이다.

**대신 2023·2024·2025 는 공식 입력/정답 쌍이 통째로 공개돼 있다** — 채점기가 검사하던 그 데이터다.
- 2023 (44케이스) `drive.google.com/drive/folders/1VgX2q9N6gb7yxnHtQoG7t65b-7CqkEB7`
- 2024 (50케이스) `drive.google.com/drive/folders/1snq4h9eBaDCrCt9juKv1_1b3592ZsxYn`
- 2025 (48케이스) `drive.google.com/drive/folders/1TwOk59KLyycw7nsPWXBlbvkmE4ncPmaQ`
  · 원문·에디토리얼 `ioimalaysia.org/competition/mcc/2025/archive/`
⚠️ **연도마다 입출력 방식이 다르다** — 2024 는 stdin/stdout, **2023 은 `input.txt` 파일**이다.
⚠️ **공식 `.py` 를 정답 기준으로 삼지 마라** — 2023 tichu 2번에서 공식 py 가 틀린 답을 냈다.
   **기준은 공식 «정답 파일»** 이다.

| 연도 | quest | 결과 |
|---|---|---|
| 2023 | `collatz` | ✅ 6/7 — **7번은 내려받은 공식 파일이 깨졌다**(`2049]` 처럼 대괄호가 섞임). 우리 코드 문제 아님 |
| 2023 | `mobilegame` | ✅ 10/10 |
| 2023 | `innovation` | ✅ 8/8 |
| 2023 | `tichu` | ❌ 6/7 → **고쳐서 ✅ 7/7** (아래) |
| 2023 | `rectangles` | ✅ 5/5 — 다만 최악 케이스가 파이썬으로 **1.05~1.2초**. 여유가 넉넉하진 않다 |
| 2023 | `sumk` | ✅ 8/8 |
| 2024 | 여섯 개 전부 | ✅ **100/100** (`cornercover`·`gifts`·`magicorbs`·`simplegame`·`explodingarrow`·`xorstring`) |
| 2025 | `fences`·`fans`·`tricks`·`word` | ✅ 만점 |
| 2025 | `reach` | ❌ 4/10 → **고쳐서 6/10** (아래). 남은 4건은 시간 초과 |
| 2025 | `subseqmedian` | 🟡 6/7 — 시간 초과 1건. 파일 주석에 *"correct, but only fast enough for small inputs"* 로 이미 적혀 있다 |

⭐ **2024 는 파이프라인 자체를 공식 답안으로 교차검증했다** — 채점 스크립트나 데이터가
   틀렸을 가능성을 배제했다.

## 잡은 진짜 결함 둘 — **둘 다 «그 줄이 있나 없나» 를 원문으로 확인 안 한 것**

- **`tichu`** — `N = K`(와일드카드만 있는 손패)면 둘째 줄이 **없는데 읽어서** `EOFError`.
  채점기에서는 런타임 에러 = 0점. 고쳐서 **7/7**.
- **`reach`** — `S = 0` 이면 둘째 줄이 **빈 줄로 있는데 안 읽어서** 이후 입력이 전부 밀렸다.
  고쳐서 크래시 2건 해결, **6/10**.

⭐ **둘 다 C++ 은 안 죽는다** — `cin >>` 가 빈 스트림에서 그냥 멈춘다.
   **같은 알고리즘인데 파이썬 쪽 입력 파싱만 약했다.**

## 2019~2022 는 이 수단이 없다

공식 테스트 데이터가 공개되지 않았다. 원문 PDF(2020~2022, `public/problems/`)와
공식 풀이 코드 대조가 최선이다.
⚠️ **2019 은 원문 PDF 가 공개된 적이 없다** — 에디토리얼이 유일한 출처이고 **제약이 한 줄도 없다.**
   그런데 `mcc19elim` 화면은 `0 ≤ K ≤ N` 이라고 적고 있다 — **출처가 아예 없는 숫자다.**
⚠️ **2019 공식 문제는 6개인데 우리는 7개다** — `mcc19rect2` 에 대응하는 공식 문제가 없다.
   게다가 에디토리얼 «Rectangle» 절 자체가 내부적으로 어긋나 있다(문제는 "최소 차이"인데
   풀이 문단 하나가 "네 번째 꼭짓점" 얘기를 한다). **원본이 잘못돼 있고 우리 quest 둘이
   거기서 갈라져 나온 것으로 보인다.** — PM 판정 대기
