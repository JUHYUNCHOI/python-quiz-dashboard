# USACO Quest 채점 검증 결과

마지막 업데이트: 2026-06-16

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
| `swaptowin` | Swap to Win | Feb 2026 Bronze #3 | ❌ 0/1 (WA: print empty join produces extra newline) | ✅ 12/12 PASS |
| `strangefn` | Strange Function | Feb 2026 Bronze #2 | ✅ 12/12 PASS | ✅ 12/12 PASS |
| `makedistinct` | Make All Distinct | Feb 2026 Bronze #1 | ✅ 13/13 PASS | ✅ 13/13 PASS |
| `buymilk` | Purchasing Milk | Jan 2026 Bronze #3 | 🟡 5/14 (TLE many cases, recursive Python too slow) | 🟡 8/9+ (TLE - brute) |
| `moohunt` | Moo Hunt | Jan 2026 Bronze #2 | 🟡 5/12 (TLE 6-12, brute too slow) | 🟡 10/12 (TLE - brute) |
| `mooin4` | It's Mooin' Time IV | Jan 2026 Bronze #1 | ✅ 16/16 PASS | ✅ 16/16 PASS |
| `photoshoot25` | Photoshoot | Dec 2025 Bronze #3 | 🟡 12/18 (TLE 13-18, Python too slow) | ✅ 18/18 PASS |
| `cowsplits` | COW Splits | Dec 2025 Bronze #2 | 3/14 (intentional k=1 only quest) | 3/14 (intentional k=1 only) |
| `chipxchg` | Chip Exchange | Dec 2025 Bronze #1 | ✅ 12/12 PASS (Python passes - C++ has overflow) | 5/12 (overflow bug) |
| `mooin3` | Mooin' Time III | Open 2025 Bronze #3 | 🟡 3/11 (TLE many cases, O(N) per query) | 🟡 4/11 (TLE - brute O(N^2)) |
| `cowphotos` | More Cow Photos | Open 2025 Bronze #2 | 🟡 6/8 (TLE 7-8, O(N^2) count) | ✅ 11/11 PASS |
| `hps` | HPS Minus One | Open 2025 Bronze #1 | ✅ 12/12 PASS | ✅ 12/12 PASS |
| `printseq` | Printing Sequences | Feb 2025 Bronze #3 | ✅ 13/13 PASS | ✅ 13/13 PASS (after dev fix) |
| `mexes` | Making Mexes | Feb 2025 Bronze #2 | ✅ 11/11 PASS | ✅ 11/11 PASS |
| `reflection` | Reflection | Feb 2025 Bronze #1 | 🟡 3/16 (TLE 4-16, Python too slow) | ✅ 15/15 PASS |
| `checkups` | Cow Checkups | Jan 2025 Bronze #3 | 🟡 6/13 (TLE 7-13, Python expected slow) | 6/13 (intended O(N^3)) |
| `mooin2` | It's Mooin' Time II | Jan 2025 Bronze #2 | ✅ 11/11 PASS | ✅ 11/11 PASS |
| `astral` | Astral Superposition | Jan 2025 Bronze #1 | ✅ 12/12 PASS | ✅ 12/12 PASS |
| `moo` | It's Mooin' Time | Dec 2024 Bronze #3 | ✅ 13/13 PASS | ✅ 13/13 PASS |
| `cheese` | Cheese Block | Dec 2024 Bronze #2 | ✅ 16/16 PASS | ✅ 16/16 PASS |
| `rounding` | Roundabout Rounding | Dec 2024 Bronze #1 | ✅ 13/13 PASS | ✅ 13/13 PASS |
| `interview` | Bessie's Interview | Open 2024 Bronze #1 | ❌ 0/1 (WA on sample - wrong algorithm (Silver-level problem)) | ❌ 0/1 (WA on sample - wrong algorithm for Silver) |
| `permutation` | FJ's Fav Permutation | Open 2024 Bronze #3 | 🟡 2/11 (TLE/RTE - backtracking too slow) | 🟡 2/11 (TLE 3-11, backtracking too slow) |
| `favperm2` | FJ's Fav Perm II | Open 2024 Bronze #3 | 🟡 2/11 (TLE/RTE - backtracking too slow) (same file as permutation) | 🟡 2/11 (TLE 3-11, backtracking too slow) (same file as permutation) |
| `walkfence` | Walking Along a Fence | Open 2024 Bronze #2 | 🟡 6/11 (TLE 7-11) | 🟡 6/11 (TLE 7-11, O(NP)) |
| `logicalmoos` | Logical Moos | Open 2024 Bronze #1 | 🟡 8/14 (TLE 9-14, brute slice eval) | 🟡 8/22 (TLE - O(NQ) brute) |
| `productivity` | Max Productivity | Feb 2024 Bronze #3 | ✅ 17/17 PASS | ✅ 17/17 PASS |
| `exchange` | Milk Exchange | Feb 2024 Bronze #2 | 🟡 8/13 (TLE 9-13, brute simulation) | ✅ 16/16 PASS (re-submitted 2026-06-16 C++17, cpid=1396; rewrote to O(N) monotonic-chain, was brute TLE) |
| `milkexchange` | Milk Exchange | Feb 2024 Bronze #2 | 🟡 8/13 (TLE 9-13, brute simulation) (FULL_PY still brute) | ✅ 16/16 PASS (re-submitted 2026-06-16 C++17, cpid=1396; O(N) monotonic-chain, same as exchange) |
| `palindrome` | Palindrome Game | Feb 2024 Bronze #1 | 🟡 4/10 (TLE 5-10, O(S^2) DP per test case) | 🟡 6/13 (TLE 7-13, O(S^2) DP) |
| `bacteria` | Balancing Bacteria | Jan 2024 Bronze #3 | ✅ 15/15 PASS | ✅ 15/15 PASS |
| `cannonball` | Cannonball | Jan 2024 Bronze #2 | ✅ 20/20 PASS | ✅ 20/20 PASS |
| `majority` | Majority Opinion | Jan 2024 Bronze #1 | ✅ 15/15 PASS | ✅ 15/15 PASS |
| `fjfarms` | FJ Actually Farms | Dec 2023 Bronze #3 | 🟡 4/12 (1 WA + 7 TLE, O(N^2) too slow) | 🟡 4/13 (1 WA + 8 TLE) |
| `cowntact` | Cowntact Tracing 2 | Dec 2023 Bronze #2 | ❌ 4/12 (WA - algorithm wrong (counts 1-blocks)) | ❌ 4/12 (WA - same as py (counts 1-blocks)) |
| `candycane` | Candy Cane Feast | Dec 2023 Bronze #1 | ✅ 14/14 PASS | ✅ 14/14 PASS |
| `rotshift` | Rotate and Shift | Open 2023 Bronze #3 | 🟡 1/10 (TLE - O(T*N*K) brute, T up to 10^9) | 🟡 7/10 (TLE 8-10, T up to 10^9) |
| `moolang` | Moo Language | Open 2023 Bronze #2 | ✅ 16/16 PASS | ✅ 16/16 PASS (re-submitted 2026-06-16 C++17, cpid=1324) |
| `feb23` | FEB | Open 2023 Bronze #1 | 🟡 2/20 (WA/TLE - brute 2^|F| too slow) | 🟡 2/20 (WA/TLE same as py) |
| `mooloo` | Watching Mooloo | Feb 2023 Bronze #3 | ✅ 12/12 PASS | ✅ 12/12 PASS |
| `stampgrid` | Stamp Grid | Feb 2023 Bronze #2 | ✅ 14/14 PASS | ✅ 14/14 PASS |
| `hungrycow` | Hungry Cow | Feb 2023 Bronze #1 | ✅ 13/13 PASS | ✅ 13/13 PASS |
| `mooops` | Moo Operations | Jan 2023 Bronze #3 | ✅ 11/11 PASS | ✅ 11/11 PASS |
| `aircond` | Air Cownditioning II | Jan 2023 Bronze #2 | ✅ 11/11 PASS | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1276) |
| `leaders` | Leaders | Jan 2023 Bronze #1 | ✅ 17/17 PASS | ✅ 17/17 PASS |
| `reverseeng` | Reverse Engineering | Dec 2022 Bronze #3 | ❌ 0/1 (RTE - wrong input parsing) | ✅ 12/12 PASS (re-submitted 2026-06-16 C++17, cpid=1253) |
| `feedcows` | Feeding the Cows | Dec 2022 Bronze #2 | ❌ 0/1 (RTE - wrong input parsing (missing T)) | ✅ 12/12 PASS (re-submitted 2026-06-16 C++17, cpid=1252) |
| `cowcollege` | Cow College | Dec 2022 Bronze #1 | ✅ 12/12 PASS | ✅ 12/12 PASS |
| `alchemy` | Alchemy | Open 2022 Bronze #3 | ❌ 0/1 (RTE - wrong input parsing) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1229) |
| `countliars` | Counting Liars | Open 2022 Bronze #2 | 🟡 2/9 (TLE - O(10^6 * N) loop too slow) | 🟡 2/12 (TLE - same as py (p up to 10^9)) |
| `photoshoot` | Photoshoot | Open 2022 Bronze #1 | ❌ 0/1 (RTE - wrong input format (no target line)) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1227) |
| `blocks` | Blocks | Feb 2022 Bronze #3 | ❌ 0/1 (WA - output format wrong (prints count instead of YES/NO per word)) | ✅ 20/20 PASS (re-submitted 2026-06-16 C++17, cpid=1205) |
| `photoshoot2` | Photoshoot 2 | Feb 2022 Bronze #2 | ✅ 14/14 PASS | ✅ 14/14 PASS (re-submitted 2026-06-16 C++17, cpid=1204) |
| `sleepclass` | Sleeping in Class | Feb 2022 Bronze #1 | ❌ 0/1 (WA - bug when total=0 edge case) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1203) |
| `drought` | Drought | Jan 2022 Bronze #3 | ❌ 0/1 (WA - py expects single case, problem has T test cases) | ✅ 15/15 PASS (re-submitted 2026-06-16 C++17, cpid=1181) |
| `nontrans` | Non-Transitive Dice | Jan 2022 Bronze #2 | ❌ 0/1 (WA+RTE - wrong input parsing) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1180; fixed to check both cycle directions) |
| `herdle` | Herdle | Jan 2022 Bronze #1 | ❌ 0/1 (RTE - wrong input parsing (no T)) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1179) |
| `walkhome` | Walking Home | Dec 2021 Bronze #3 | ❌ 0/1 (RTE - missing T (test cases) handling) | ✅ 10/10 PASS (re-submitted 2026-06-16 C++17, cpid=1157) |
| `aircond1` | Air Cownditioning | Dec 2021 Bronze #2 | 🔧 Py rewritten 2026-06-15 to clean diff-array (0-padded, sum of upward jumps); local-verified vs official sample (5) | ✅ 10/10 PASS (re-submitted 2026-06-16 C++17, cpid=1156; fixed missing trailing 0-pad) |
| `lonelyphoto` | Lonely Photo | Dec 2021 Bronze #1 | ❌ 0/1 (WA - algorithm overcounts (22 vs 3 expected)) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1155) |
| `acowdemia3` | Acowdemia III | Open 2021 Bronze #3 | ❌ 0/1 (WA - overcounts (5 vs 4)) | ✅ 12/12 PASS (re-submitted 2026-06-16 C++17, cpid=1133) |
| `acowdemia2` | Acowdemia II | Open 2021 Bronze #2 | ❌ 0/1 (RTE - author names are strings, py treats as ints) | ✅ 10/10 PASS (re-submitted 2026-06-16 C++17, cpid=1132) |
| `acowdemia1` | Acowdemia I | Open 2021 Bronze #1 | ❌ 13/17 (WA on cases 9,11,12,13 - edge case bug) | ❌ 13/17 (WA same edge cases as py) |
| `clockfence` | Clockwise Fence | Feb 2021 Bronze #3 | ❌ 0/1 (RTE - missing T (test cases) parse) | ❌ 0/1 (WA - output format (counts vs CW/CCW per test)) |
| `comfycows` | Comfortable Cows | Feb 2021 Bronze #2 | ✅ 12/12 PASS | ✅ 12/12 PASS (re-submitted 2026-06-16 C++17, cpid=1108) |
| `yearcow` | Year of the Cow | Feb 2021 Bronze #1 | ❌ 0/1 (RTE - wrong input parsing (8-word phrase)) | ✅ 10/10 PASS |
| `stalling` | Just Stalling | Jan 2021 Bronze #3 | 🔧 Py rewritten 2026-06-15 to space-separated input + tallest-cow-first greedy (was RTE wrong input format); local-verified vs official sample (8) + 300 random vs brute-force | ✅ 12/12 PASS (re-submitted 2026-06-16 C++17, cpid=1085) |
| `oddphotos` | Even More Odd Photos | Jan 2021 Bronze #2 | ❌ 0/1 (WA - overcounts (4 vs 3)) | ✅ 11/11 PASS (re-submitted 2026-06-16 C++17, cpid=1084) |
| `uddered` | Uddered but not Herd | Jan 2021 Bronze #1 | ✅ 10/10 PASS | ✅ 10/10 PASS |
| `stuckinrut` | Stuck in a Rut | Dec 2020 Bronze #3 | ❌ 3/10 (WA - greedy doesn't handle cascading correctly) | ✅ 10/10 PASS (re-submitted 2026-06-16 C++17, cpid=1061) |
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
