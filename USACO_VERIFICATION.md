# USACO Quest 채점 검증 결과

마지막 업데이트: 2026-05-14

**총 검증: 120 quests (py 120/120, cpp 120/120)**
**전체 만점: py 31/120, cpp 30/120**

## 범례
- ✅ 만점
- 🟡 부분/TLE/한계
- ❌ WA/컴파일/file I/O missing/알고리즘 버그

## ⚠️ 중요: pre-Dec-2020 file I/O 이슈

USACO는 Dec 2020 (cpid 1059+) 부터 stdin/stdout으로 전환. 그 이전 contest는 **file I/O 방식** (`xxx.in/out`).
Coderin quest 코드들은 stdin/cin을 가정하고 있어, pre-Dec-2020 quest 대부분이 RTE/WA로 실패.
fix: 각 quest 코드 상단에 `freopen("xxx.in","r",stdin); freopen("xxx.out","w",stdout);` 또는 py `sys.stdin = open(...)` 추가 후 재검증 필요.

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
| `exchange` | Milk Exchange | Feb 2024 Bronze #2 | 🟡 8/13 (TLE 9-13, brute simulation) | 🟡 8/14 (TLE 9-14, brute simulation) |
| `milkexchange` | Milk Exchange | Feb 2024 Bronze #2 | 🟡 8/13 (TLE 9-13, brute simulation) (same as exchange) | 🟡 8/14 (TLE 9-14, brute simulation) (same as exchange) |
| `palindrome` | Palindrome Game | Feb 2024 Bronze #1 | 🟡 4/10 (TLE 5-10, O(S^2) DP per test case) | 🟡 6/13 (TLE 7-13, O(S^2) DP) |
| `bacteria` | Balancing Bacteria | Jan 2024 Bronze #3 | ✅ 15/15 PASS | ✅ 15/15 PASS |
| `cannonball` | Cannonball | Jan 2024 Bronze #2 | ✅ 20/20 PASS | ✅ 20/20 PASS |
| `majority` | Majority Opinion | Jan 2024 Bronze #1 | ✅ 15/15 PASS | ✅ 15/15 PASS |
| `fjfarms` | FJ Actually Farms | Dec 2023 Bronze #3 | 🟡 4/12 (1 WA + 7 TLE, O(N^2) too slow) | 🟡 4/13 (1 WA + 8 TLE) |
| `cowntact` | Cowntact Tracing 2 | Dec 2023 Bronze #2 | ❌ 4/12 (WA - algorithm wrong (counts 1-blocks)) | ❌ 4/12 (WA - same as py (counts 1-blocks)) |
| `candycane` | Candy Cane Feast | Dec 2023 Bronze #1 | ✅ 14/14 PASS | ✅ 14/14 PASS |
| `rotshift` | Rotate and Shift | Open 2023 Bronze #3 | 🟡 1/10 (TLE - O(T*N*K) brute, T up to 10^9) | 🟡 7/10 (TLE 8-10, T up to 10^9) |
| `moolang` | Moo Language | Open 2023 Bronze #2 | ✅ 16/16 PASS | ❌ 0/1 (WA - C++ incomplete (output construction omitted)) |
| `feb23` | FEB | Open 2023 Bronze #1 | 🟡 2/20 (WA/TLE - brute 2^|F| too slow) | 🟡 2/20 (WA/TLE same as py) |
| `mooloo` | Watching Mooloo | Feb 2023 Bronze #3 | ✅ 12/12 PASS | ✅ 12/12 PASS |
| `stampgrid` | Stamp Grid | Feb 2023 Bronze #2 | ✅ 14/14 PASS | ✅ 14/14 PASS |
| `hungrycow` | Hungry Cow | Feb 2023 Bronze #1 | ✅ 13/13 PASS | ✅ 13/13 PASS |
| `mooops` | Moo Operations | Jan 2023 Bronze #3 | ✅ 11/11 PASS | ✅ 11/11 PASS |
| `aircond` | Air Cownditioning II | Jan 2023 Bronze #2 | ✅ 11/11 PASS | ❌ 0/1 (Compile error - missing #include <tuple>) |
| `leaders` | Leaders | Jan 2023 Bronze #1 | ✅ 17/17 PASS | ✅ 17/17 PASS |
| `reverseeng` | Reverse Engineering | Dec 2022 Bronze #3 | ❌ 0/1 (RTE - wrong input parsing) | ❌ 0/1 (WA - cpp is just scaffold (echoes N)) |
| `feedcows` | Feeding the Cows | Dec 2022 Bronze #2 | ❌ 0/1 (RTE - wrong input parsing (missing T)) | ❌ 0/1 (WA - missing T (test cases) handling) |
| `cowcollege` | Cow College | Dec 2022 Bronze #1 | ✅ 12/12 PASS | ✅ 12/12 PASS |
| `alchemy` | Alchemy | Open 2022 Bronze #3 | ❌ 0/1 (RTE - wrong input parsing) | ❌ 0/1 (WA - scaffold only (just checks initial count)) |
| `countliars` | Counting Liars | Open 2022 Bronze #2 | 🟡 2/9 (TLE - O(10^6 * N) loop too slow) | 🟡 2/12 (TLE - same as py (p up to 10^9)) |
| `photoshoot` | Photoshoot | Open 2022 Bronze #1 | ❌ 0/1 (RTE - wrong input format (no target line)) | ❌ 0/1 (WA - solution for different problem (permutation, not reversal count)) |
| `blocks` | Blocks | Feb 2022 Bronze #3 | ❌ 0/1 (WA - output format wrong (prints count instead of YES/NO per word)) | ❌ 0/1 (WA - scaffold counts distinct letters) |
| `photoshoot2` | Photoshoot 2 | Feb 2022 Bronze #2 | ✅ 14/14 PASS | ❌ 1/14 (WA - adjacent swap wrong algo (problem is leftward modifications)) |
| `sleepclass` | Sleeping in Class | Feb 2022 Bronze #1 | ❌ 0/1 (WA - bug when total=0 edge case) | ❌ 0/1 (WA same as py - total=0 edge case bug) |
| `drought` | Drought | Jan 2022 Bronze #3 | ❌ 0/1 (WA - py expects single case, problem has T test cases) | ❌ 0/1 (WA - single test case (problem has T tests)) |
| `nontrans` | Non-Transitive Dice | Jan 2022 Bronze #2 | ❌ 0/1 (WA+RTE - wrong input parsing) | ❌ 0/1 (WA - cpp only checks A beats B, not transitive C) |
| `herdle` | Herdle | Jan 2022 Bronze #1 | ❌ 0/1 (RTE - wrong input parsing (no T)) | ❌ 0/1 (WA - cpp expects T but problem has single test case) |
| `walkhome` | Walking Home | Dec 2021 Bronze #3 | ❌ 0/1 (RTE - missing T (test cases) handling) | ❌ 0/1 (WA - missing T loop, also wrong algo) |
| `aircond1` | Air Cownditioning | Dec 2021 Bronze #2 | ✅ 10/10 PASS | ❌ 0/1 (WA - cpp uses sum of abs diffs (wrong algo)) |
| `lonelyphoto` | Lonely Photo | Dec 2021 Bronze #1 | ❌ 0/1 (WA - algorithm overcounts (22 vs 3 expected)) | ❌ 0/1 (WA - same algorithm bug as py (22 vs 3)) |
| `acowdemia3` | Acowdemia III | Open 2021 Bronze #3 | ❌ 0/1 (WA - overcounts (5 vs 4)) | ❌ 0/1 (WA same as py) |
| `acowdemia2` | Acowdemia II | Open 2021 Bronze #2 | ❌ 0/1 (RTE - author names are strings, py treats as ints) | ❌ 0/1 (WA - output count not relation matrix) |
| `acowdemia1` | Acowdemia I | Open 2021 Bronze #1 | ❌ 13/17 (WA on cases 9,11,12,13 - edge case bug) | ❌ 13/17 (WA same edge cases as py) |
| `clockfence` | Clockwise Fence | Feb 2021 Bronze #3 | ❌ 0/1 (RTE - missing T (test cases) parse) | ❌ 0/1 (WA - output format (counts vs CW/CCW per test)) |
| `comfycows` | Comfortable Cows | Feb 2021 Bronze #2 | ✅ 12/12 PASS | ❌ 0/1 (WA - doesn't print per iteration, accumulates wrong) |
| `yearcow` | Year of the Cow | Feb 2021 Bronze #1 | ❌ 0/1 (RTE - wrong input parsing (8-word phrase)) | ✅ 10/10 PASS |
| `stalling` | Just Stalling | Jan 2021 Bronze #3 | ❌ 0/1 (RTE - wrong input format (all on one line)) | ❌ 0/1 (WA - greedy direction wrong) |
| `oddphotos` | Even More Odd Photos | Jan 2021 Bronze #2 | ❌ 0/1 (WA - overcounts (4 vs 3)) | ❌ 0/1 (WA - cpp solves Bronze Photoshoot not Even More Odd) |
| `uddered` | Uddered but not Herd | Jan 2021 Bronze #1 | ✅ 10/10 PASS | ✅ 10/10 PASS |
| `stuckinrut` | Stuck in a Rut | Dec 2020 Bronze #3 | ❌ 3/10 (WA - greedy doesn't handle cascading correctly) | ❌ 0/1 (Compile error - missing #include <tuple>) |
| `daisychains` | Daisy Chains | Dec 2020 Bronze #2 | ✅ 10/10 PASS | ✅ 10/10 PASS |
| `abcs` | Do You Know Your ABCs? | Dec 2020 Bronze #1 | ✅ 10/10 PASS | ✅ 10/10 PASS |
| `cowntrace` | Cowntact Tracing | Open 2020 Bronze #3 | ❌ 0/15 (RTE - 2020 US Open file I/O + wrong input parsing (expects string of 0/1)) | ❌ 0/15 (TLE - 2020 US Open file I/O missing (uninitialized N → infinite loop)) |
| `socialdist2` | Social Distancing II | Open 2020 Bronze #2 | ❌ 0/15 (RTE - 2020 US Open uses file I/O, code uses stdin) | ❌ 0/15 (WA - empty stdin (file I/O needed); algorithm also incomplete) |
| `socialdist1` | Social Distancing I | Open 2020 Bronze #1 | ❌ 0/15 (RTE - code expects intervals, problem is stall string) | ❌ 0/15 (RTE - 2020 US Open file I/O missing) |
| `swapity` | Swapity Swap | Feb 2020 Bronze #3 | ❌ 0/15 (RTE - 2020 Feb file I/O missing) | ❌ 0/15 (RTE - 2020 Feb file I/O missing) |
| `madscientist` | Mad Scientist | Feb 2020 Bronze #2 | ❌ 0/15 (RTE - 2020 Feb file I/O; algorithm OK) | ❌ 0/15 (RTE - 2020 Feb file I/O missing) |
| `triangles` | Triangles | Feb 2020 Bronze #1 | ❌ 0/15 (RTE - 2020 Feb Bronze uses file I/O, code uses stdin) | ❌ 0/15 (WA - empty stdin (file I/O needed); algorithm OK if input read correctly) |
| `race` | Race | Jan 2020 Bronze #3 | ❌ 0/15 (RTE - 2020 Jan file I/O missing) | ❌ 0/15 (WA - empty stdin (LLONG_MAX output, no actual input)) |
| `photoshoot20` | Photoshoot | Jan 2020 Bronze #2 | ❌ 0/15 (RTE - 2020 Jan file I/O missing) | ❌ 0/15 (RTE - 2020 Jan file I/O missing) |
| `wordproc` | Word Processor | Jan 2020 Bronze #1 | ❌ 0/15 (RTE - 2020 Jan file I/O missing) | ❌ 0/15 (RTE - 2020 Jan file I/O missing) |
| `livestock` | Livestock Lineup | Dec 2019 Bronze #3 | ❌ 0/15 (RTE - 2019 Dec file I/O missing) | ❌ 0/15 (WA - 2019 Dec file I/O missing (alphabetical fallback)) |
| `whereami` | Where Am I? | Dec 2019 Bronze #2 | ❌ 0/15 (RTE - 2019 Dec file I/O missing) | ❌ 0/15 (RTE - 2019 Dec file I/O missing) |
| `cowgym` | Cow Gymnastics | Dec 2019 Bronze #1 | ❌ 0/15 (RTE - 2019 Dec file I/O missing) | ❌ 0/15 (WA - 2019 Dec file I/O missing (output 0)) |
| `cowevolution` | Cow Evolution | Open 2019 Bronze #3 | ❌ 0/15 (RTE - 2019 Open file I/O missing) | ❌ 0/15 (TLE - 2019 Open file I/O missing (garbage N → infinite loop)) |
| `milkfactory` | Milk Factory | Open 2019 Bronze #2 | ❌ 0/15 (RTE - 2019 Open file I/O missing) | ❌ 0/15 (WA - 2019 Open file I/O missing (output -1)) |
| `bucketbrigade` | Bucket Brigade | Open 2019 Bronze #1 | ❌ 0/15 (RTE - 2019 Open file I/O missing) | ❌ 0/15 (Compile error - tuple init in q.push() needs make_tuple) |
| `meastraffic` | Measuring Traffic | Feb 2019 Bronze #3 | ❌ 0/15 (RTE - 2019 Feb file I/O missing) | ❌ 0/15 (RTE - 2019 Feb file I/O missing) |
| `revegetation` | Great Revegetation | Feb 2019 Bronze #2 | ❌ 0/15 (RTE - 2019 Feb file I/O missing) | ❌ 0/15 (RTE - 2019 Feb file I/O missing) |
| `sleepyherd` | Sleepy Cow Herding | Feb 2019 Bronze #1 | ❌ 0/15 (RTE - 2019 Feb file I/O missing) | ❌ 0/15 (WA - 2019 Feb file I/O missing (garbage stack values)) |
| `guessanimal` | Guess the Animal | Jan 2019 Bronze #3 | ❌ 0/15 (RTE - 2019 Jan file I/O missing) | ❌ 0/15 (RTE - 2019 Jan file I/O missing) |
| `sleepysort` | Sleepy Cow Sorting | Jan 2019 Bronze #2 | ❌ 0/15 (RTE - 2019 Jan file I/O missing) | ❌ 0/15 (WA - 2019 Jan file I/O missing) |
| `shellgame` | Shell Game | Jan 2019 Bronze #1 | ❌ 0/15 (RTE - 2019 Jan file I/O missing) | ❌ 0/15 (Compile error - missing #include <tuple>) |
| `backforth` | Back and Forth | Dec 2018 Bronze #3 | ❌ 0/15 (RTE - 2018 Dec file I/O missing) | ❌ 0/15 (WA - 2018 Dec file I/O missing) |
| `bucketlist` | The Bucket List | Dec 2018 Bronze #2 | ❌ 0/15 (RTE - 2018 Dec file I/O missing) | ❌ 0/15 (RTE - 2018 Dec file I/O missing) |
| `mixmilk` | Mixing Milk | Dec 2018 Bronze #1 | ❌ 0/15 (RTE - 2018 Dec file I/O missing) | ❌ 0/15 (WA - 2018 Dec file I/O missing (garbage values)) |
| `familytree` | Family Tree | Open 2018 Bronze #3 | ❌ 0/15 (RTE - 2018 Open file I/O missing) | ❌ 0/15 (RTE - 2018 Open file I/O missing) |
| `milkorder` | Milking Order | Open 2018 Bronze #2 | ❌ 0/15 (RTE - 2018 Open file I/O missing) | ❌ 0/15 (TLE - 2018 Open file I/O missing (uninitialized N → infinite loop)) |
| `teamttt` | Team Tic Tac Toe | Open 2018 Bronze #1 | ❌ 0/15 (RTE - 2018 Open file I/O missing) | ❌ 0/15 (WA - 2018 Open file I/O missing) |
| `tameherd` | Taming the Herd | Feb 2018 Bronze #3 | ❌ 0/15 (RTE - 2018 Feb file I/O missing) | ❌ 0/15 (WA - 2018 Feb file I/O missing) |
| `hoofball` | Hoofball | Feb 2018 Bronze #2 | ❌ 0/15 (RTE - 2018 Feb file I/O missing) | ❌ 0/15 (WA - 2018 Feb file I/O missing) |
| `teleport` | Teleportation | Feb 2018 Bronze #1 | ❌ 0/15 (RTE - 2018 Feb file I/O missing) | ❌ 0/15 (WA - 2018 Feb file I/O missing) |
| `outofplace` | Out of Place | Jan 2018 Bronze #3 | ❌ 0/15 (RTE - 2018 Jan file I/O missing) | ❌ 0/15 (WA - 2018 Jan file I/O missing) |
| `lifeguards` | Lifeguards | Jan 2018 Bronze #2 | ❌ 0/15 (RTE - 2018 Jan file I/O missing) | ❌ 0/15 (WA - 2018 Jan file I/O missing) |
| `billboard2` | Blocked Billboard II | Jan 2018 Bronze #1 | ❌ 0/15 (RTE - 2018 Jan file I/O missing) | ❌ 0/15 (WA - 2018 Jan file I/O missing) |
| `milkmeas` | Milk Measurement | Dec 2017 Bronze #3 | ❌ 0/15 (RTE - 2017 Dec file I/O missing) | ❌ 0/15 (WA - 2017 Dec file I/O missing) |
| `bovshuffle` | The Bovine Shuffle | Dec 2017 Bronze #2 | ❌ 0/15 (RTE - 2017 Dec file I/O missing) | ❌ 0/15 (RTE/WA - 2017 Dec file I/O missing) |
| `billboard` | Blocked Billboard | Dec 2017 Bronze #1 | ❌ 0/15 (RTE - 2017 Dec file I/O missing) | ❌ 0/15 (WA - 2017 Dec file I/O missing) |
| `modernart` | Modern Art | Open 2017 Bronze #3 | ❌ 0/15 (RTE - 2017 Open file I/O missing) | ❌ 0/15 (RTE - 2017 Open file I/O missing) |
| `bovgenomics` | Bovine Genomics | Open 2017 Bronze #2 | ❌ 0/15 (RTE - 2017 Open file I/O missing) | ❌ 0/15 (RTE - 2017 Open file I/O missing) |
| `lostcow` | The Lost Cow | Open 2017 Bronze #1 | ❌ 0/15 (RTE - 2017 Open file I/O missing) | ❌ 0/15 (WA - 2017 Open file I/O missing) |
| `crossroad3` | Cross the Road III | Feb 2017 Bronze #3 | ❌ 0/15 (RTE - 2017 Feb file I/O missing) | ❌ 0/15 (WA - 2017 Feb file I/O missing) |
| `crossroad2` | Cross the Road II | Feb 2017 Bronze #2 | ❌ 0/15 (RTE - 2017 Feb file I/O missing) | ❌ 0/15 (WA - 2017 Feb file I/O missing) |
| `crossroad1` | Cross the Road | Feb 2017 Bronze #1 | ❌ 0/15 (RTE - 2017 Feb file I/O missing) | ❌ 0/15 (WA - 2017 Feb file I/O missing) |
| `cowtipping` | Cow Tipping | Jan 2017 Bronze #3 | ❌ 0/15 (RTE - 2017 Jan file I/O missing) | ❌ 0/15 (TLE - 2017 Jan file I/O missing (garbage N → loop)) |
| `hps17` | Hoof Paper Scissors | Jan 2017 Bronze #2 | ❌ 0/15 (RTE - 2017 Jan file I/O missing) | ❌ 0/15 (Compile error - missing #include <array>) |
| `dontbelast` | Don't Be Last! | Jan 2017 Bronze #1 | ❌ 0/15 (RTE - 2017 Jan file I/O missing) | ❌ 0/15 (WA - 2017 Jan file I/O missing) |
| `cowsignal` | The Cow-Signal | Dec 2016 Bronze #3 | ❌ 0/15 (RTE - 2016 Dec file I/O missing) | ❌ 0/15 (WA - 2016 Dec file I/O missing) |
| `blockgame` | Block Game | Dec 2016 Bronze #2 | ❌ 0/15 (RTE - 2016 Dec file I/O missing) | ❌ 0/15 (WA - 2016 Dec file I/O missing) |
| `sqpasture` | Square Pasture | Dec 2016 Bronze #1 | ❌ 0/15 (RTE - 2016 Dec file I/O missing) | ❌ 0/15 (WA - 2016 Dec file I/O missing) |
