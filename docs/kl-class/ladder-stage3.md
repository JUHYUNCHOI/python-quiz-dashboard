# KL 사다리 풀이집 — 3단계: 한 번 생각 (22~33번)

> 대상 언어: **C++** · 기법: 정렬 / 투포인터 / 완전탐색 / sweep / 비트마스크 / multiset
> LeetCode 문제는 `class Solution` 함수형, CSES/Codeforces 문제는 `main()` 입출력형(빠른 입출력 권장).

---

## 22. Maximum Subarray (LeetCode 53 · Easy) — 함수형 · 배열
🔗 https://leetcode.com/problems/maximum-subarray/
- **문제**: 정수 배열에서 연속 부분 배열의 합 중 최댓값을 구한다.
- **핵심 아이디어**: **Kadane 알고리즘**. "여기서 새로 시작 vs 이어붙이기"를 매 칸 비교한다. `cur = max(현재값, cur + 현재값)`, 그 최댓값을 추적.
- **C++ 풀이**:
```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int cur = nums[0];      // 현재 칸으로 끝나는 부분배열의 최대 합
        int best = nums[0];     // 전체 정답
        for (int i = 1; i < (int)nums.size(); i++) {
            // 이어붙일지(cur+nums[i]), 새로 시작할지(nums[i]) 중 더 큰 쪽
            cur = max(nums[i], cur + nums[i]);
            best = max(best, cur); // 매 칸의 cur를 정답 후보로
        }
        return best;
    }
};
```
- **가르칠 포인트**: ① 음수만 있는 배열에서도 답이 존재하므로 `best`를 0이 아니라 `nums[0]`으로 초기화해야 함(0으로 두면 전부 음수일 때 0을 반환하는 버그). ② "지금까지 합이 음수면 버리고 새로 시작"이 핵심 직관.

---

## 23. Distinct Numbers (CSES 1621 · Easy) — 입출력형 · 정렬
🔗 https://cses.fi/problemset/task/1621
- **문제**: n개의 수 중 서로 다른 값이 몇 개인지 출력한다.
- **핵심 아이디어**: 정렬 후 인접한 값이 다를 때만 카운트(또는 `set`에 넣고 크기). 정렬 방식은 메모리/속도가 안정적.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    sort(a.begin(), a.end());           // 같은 값끼리 붙는다
    int cnt = 0;
    for (int i = 0; i < n; i++)
        if (i == 0 || a[i] != a[i - 1]) cnt++;  // 새 값일 때만 +1
    cout << cnt << "\n";
    return 0;
}
```
- **가르칠 포인트**: ① 값 범위가 10^9까지라 배열 카운팅 대신 정렬/set이 정석. ② `set<int> s(a.begin(), a.end()); cout << s.size();` 한 줄 풀이도 가능하다고 함께 보여주기.

---

## 24. Movie Festival (CSES 1629 · Easy) — 입출력형 · 정렬
🔗 https://cses.fi/problemset/task/1629
- **문제**: n개 영화의 (시작, 끝) 시각이 주어진다. 겹치지 않게 볼 수 있는 영화의 최대 개수는?
- **핵심 아이디어**: **끝나는 시각 기준 정렬 그리디**. 가장 빨리 끝나는 것부터 고르면, 뒤에 더 많은 선택지가 남는다. 마지막으로 본 영화의 종료 시각 이후에 시작하는 것만 선택.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<pair<int,int>> v(n);          // {끝나는 시각, 시작 시각}
    for (int i = 0; i < n; i++) {
        int a, b;
        cin >> a >> b;
        v[i] = {b, a};                   // 끝 시각을 first로 두면 그걸로 정렬됨
    }
    sort(v.begin(), v.end());            // 끝나는 시각 오름차순
    int cnt = 0, lastEnd = -1;
    for (auto &[end, start] : v) {
        if (start >= lastEnd) {          // 직전 영화 끝난 뒤 시작 가능하면 시청
            cnt++;
            lastEnd = end;
        }
    }
    cout << cnt << "\n";
    return 0;
}
```
- **가르칠 포인트**: ① "시작 시각 정렬"이나 "길이 짧은 것부터"는 반례가 있다 — **끝 시각 정렬이 정답**. ② 경계 처리: 한 영화가 끝나는 순간 다른 영화 시작 가능(`start >= lastEnd`).

---

## 25. Restaurant Customers (CSES 1619 · Easy) — 입출력형 · 정렬
🔗 https://cses.fi/problemset/task/1619
- **문제**: 손님들의 입장/퇴장 시각이 주어진다. 한 순간에 식당에 있던 최대 손님 수는?
- **핵심 아이디어**: **이벤트 정렬 + sweep**. 입장은 +1, 퇴장은 −1 이벤트로 만들어 시각순 정렬 후 누적. 같은 시각이면 퇴장(−1)을 먼저 처리해야 한다.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<pair<int,int>> ev;            // {시각, +1 입장 / -1 퇴장}
    for (int i = 0; i < n; i++) {
        int a, b;
        cin >> a >> b;
        ev.push_back({a, +1});
        ev.push_back({b, -1});
    }
    // 시각 오름차순, 같은 시각이면 -1(퇴장)이 +1(입장)보다 먼저 → second 오름차순이면 됨
    sort(ev.begin(), ev.end());
    int cur = 0, best = 0;
    for (auto &[t, d] : ev) {
        cur += d;
        best = max(best, cur);
    }
    cout << best << "\n";
    return 0;
}
```
- **가르칠 포인트**: ① 동시각 처리 — `pair`의 기본 정렬이 second 오름차순이므로 −1이 +1보다 먼저 와서 자연스럽게 맞는다(겹치지 않으면 동시 카운트 안 됨). ② sweep line의 기본형: "구간 → 시작/끝 이벤트"로 분해.

---

## 26. Apartments (CSES 1084 · Easy) — 입출력형 · 정렬
🔗 https://cses.fi/problemset/task/1084
- **문제**: 신청자 n명(원하는 크기), 아파트 m개(실제 크기). 신청자는 [원하는 크기 − k, 원하는 크기 + k] 범위면 만족. 최대 매칭 수는?
- **핵심 아이디어**: **양쪽 정렬 후 투포인터**. 두 배열을 정렬하고, 작은 쪽부터 맞춰 간다. 아파트가 너무 작으면 아파트 포인터 전진, 너무 크면 신청자 포인터 전진, 범위 안이면 둘 다 매칭하고 전진.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m, k;
    cin >> n >> m >> k;
    vector<int> a(n), b(m);              // a: 신청자 희망, b: 아파트 크기
    for (auto &x : a) cin >> x;
    for (auto &x : b) cin >> x;
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());
    int i = 0, j = 0, cnt = 0;
    while (i < n && j < m) {
        if (b[j] < a[i] - k) {           // 아파트가 너무 작다 → 다음 아파트
            j++;
        } else if (b[j] > a[i] + k) {    // 아파트가 너무 크다 → 다음 신청자
            i++;
        } else {                          // 범위 안 → 매칭 성공
            cnt++;
            i++;
            j++;
        }
    }
    cout << cnt << "\n";
    return 0;
}
```
- **가르칠 포인트**: ① 두 배열을 모두 정렬해야 투포인터가 단조롭게 진행됨. ② 세 경우(작다/크다/맞다)를 명확히 분기하는 게 핵심 — 한 번 지나간 포인터는 되돌아오지 않는다.

---

## 27. Ferris Wheel (CSES 1090 · Easy) — 입출력형 · 정렬
🔗 https://cses.fi/problemset/task/1090
- **문제**: 아이 n명 몸무게, 곤돌라 한 대 최대 무게 x, 한 곤돌라에 최대 2명. 필요한 최소 곤돌라 수는?
- **핵심 아이디어**: **정렬 후 양끝 투포인터**. 가장 가벼운 아이와 가장 무거운 아이를 짝지을 수 있으면 함께 태우고(둘 다 전진), 안 되면 무거운 아이 혼자 태운다(뒤만 전진). 매 곤돌라마다 카운트.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, x;
    cin >> n >> x;
    vector<int> p(n);
    for (auto &w : p) cin >> w;
    sort(p.begin(), p.end());
    int lo = 0, hi = n - 1, gondolas = 0;
    while (lo <= hi) {
        if (p[lo] + p[hi] <= x) lo++;    // 가벼운 아이도 같이 태울 수 있다
        hi--;                            // 무거운 아이는 무조건 이 곤돌라에 탑승
        gondolas++;
    }
    cout << gondolas << "\n";
    return 0;
}
```
- **가르칠 포인트**: ① `lo == hi`(한 명 남음)도 곤돌라 1대가 필요하므로 `while (lo <= hi)`로 등호 포함. ② "가장 무거운 아이는 어차피 혼자라도 태워야 하니, 가장 가벼운 아이를 같이 태울 수 있으면 이득"이라는 그리디 직관.

---

## 28. Sum of Two Values (CSES 1640 · Easy) — 입출력형 · map
🔗 https://cses.fi/problemset/task/1640
- **문제**: n개의 수 중 합이 정확히 x인 두 수의 **원래 인덱스**(1-indexed) 두 개를 출력. 없으면 "IMPOSSIBLE".
- **핵심 아이디어**: **map(해시)으로 보수 찾기**. 각 수 `a[i]`에 대해 `x - a[i]`가 이미 등장했는지 map에서 확인. 정렬 투포인터도 되지만 인덱스 보존이 번거로워 map이 깔끔.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long x;
    cin >> n >> x;
    unordered_map<long long,int> seen;   // 값 -> 원래 인덱스(1-indexed)
    for (int i = 1; i <= n; i++) {
        long long v;
        cin >> v;
        long long need = x - v;          // 짝이 될 값
        if (seen.count(need)) {          // 이미 본 값 중에 짝이 있으면
            cout << seen[need] << " " << i << "\n"; // 1-indexed 두 인덱스
            return 0;
        }
        seen[v] = i;                     // 현재 값을 인덱스와 함께 기록
    }
    cout << "IMPOSSIBLE\n";
    return 0;
}
```
- **가르칠 포인트**: ① **원래 인덱스 출력**이 함정 — 정렬해 버리면 인덱스가 섞이므로, map은 정렬 없이 인덱스를 그대로 보존한다. ② 값 합이 int 범위를 넘을 수 있으니 `x`와 값 비교를 `long long`으로(`x - v`도 long long). ③ 자기 자신을 두 번 쓰지 않도록, "확인 먼저 → 기록 나중" 순서가 중요.

---

## 29. Stick Lengths (CSES 1074 · Easy) — 입출력형 · 정렬
🔗 https://cses.fi/problemset/task/1074
- **문제**: n개 막대 길이를 모두 같은 길이로 맞추는데, 1만큼 늘리거나 줄이는 비용이 1. 최소 총비용은?
- **핵심 아이디어**: **중앙값으로 맞추면 비용 최소**(절댓값 거리 합을 최소화하는 점은 median). 정렬 후 중앙값을 목표로 `|a[i] − median|` 합산.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    sort(a.begin(), a.end());
    long long median = a[n / 2];         // 중앙값 (n이 짝수여도 한쪽 median이면 충분)
    long long cost = 0;                  // ⚠️ 합이 매우 커질 수 있으니 long long
    for (long long x : a)
        cost += llabs(x - median);       // 중앙값까지의 거리 누적
    cout << cost << "\n";
    return 0;
}
```
- **가르칠 포인트**: ① **오버플로우** — n이 2·10^5, 각 거리가 10^9까지라 합이 int(약 2·10^9)를 훌쩍 넘는다. `cost`와 길이 배열 모두 `long long`. ② "평균이 아니라 중앙값"이라는 점 — 절댓값 합 최소화 = median, 제곱합 최소화 = 평균. 헷갈리기 쉬움.

---

## 30. Apple Division (CSES 1623 · Easy) — 입출력형 · 완전탐색
🔗 https://cses.fi/problemset/task/1623
- **문제**: n개(n ≤ 20) 사과를 두 그룹으로 나눌 때, 두 그룹 무게 합의 차이의 최솟값.
- **핵심 아이디어**: **2^n 비트마스크 완전탐색**. n ≤ 20이라 모든 부분집합(최대 약 100만)을 돌면서, 비트가 1인 사과는 그룹 A에 넣어 합을 구하고 `|2·A − total|`의 최솟값을 찾는다.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> w(n);
    long long total = 0;                 // ⚠️ 무게 합 long long
    for (auto &x : w) { cin >> x; total += x; }

    long long best = LLONG_MAX;
    for (int mask = 0; mask < (1 << n); mask++) { // 모든 부분집합
        long long sumA = 0;
        for (int i = 0; i < n; i++)
            if (mask & (1 << i)) sumA += w[i];    // i번째 사과를 그룹 A로
        // 그룹 B = total - sumA, 차이 = |sumA - (total - sumA)| = |2*sumA - total|
        best = min(best, llabs(2 * sumA - total));
    }
    cout << best << "\n";
    return 0;
}
```
- **가르칠 포인트**: ① **long long 필수** — 무게가 10^9, 사과 20개면 합이 2·10^10까지. `total`, `sumA`, `2*sumA` 모두 long long(특히 `2 * sumA`에서 오버플로우 주의). ② 비트마스크로 부분집합 열거하는 표준 패턴(`mask & (1<<i)`)을 손에 익히기. ③ `1 << n`도 n=20이면 1,048,576 — int로 충분하지만 `1LL << n` 습관도 언급.

---

## 31. Two Sum II - Input Array Is Sorted (LeetCode 167 · Medium) — 함수형 · 투포인터
🔗 https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
- **문제**: 오름차순 정렬된 배열에서 합이 target인 두 수의 **1-indexed** 인덱스 [i, j]를 반환(정답 유일 보장).
- **핵심 아이디어**: **양끝 투포인터**. 이미 정렬돼 있으니 합이 크면 오른쪽을 당기고(`hi--`), 작으면 왼쪽을 밀어(`lo++`) target을 향해 좁혀 간다. O(n).
- **C++ 풀이**:
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int lo = 0, hi = (int)numbers.size() - 1;
        while (lo < hi) {
            int sum = numbers[lo] + numbers[hi];
            if (sum == target)
                return {lo + 1, hi + 1};   // 1-indexed로 +1 해서 반환
            else if (sum < target)
                lo++;                       // 합이 작으면 왼쪽을 키운다
            else
                hi--;                       // 합이 크면 오른쪽을 줄인다
        }
        return {};                          // 보장상 도달 안 함
    }
};
```
- **가르칠 포인트**: ① **1-indexed 반환** — `lo + 1, hi + 1`로 보정하는 걸 빼먹기 쉽다. ② 정렬돼 있다는 전제 덕분에 해시맵 없이 O(1) 공간으로 풀린다 — "정렬 + 양끝 투포인터"의 대표 예제.

---

## 32. Books (Codeforces 279B · 1100) — 입출력형 · 투포인터
🔗 https://codeforces.com/problemset/problem/279/B
- **문제**: n권의 책을 읽는 시간 a[i]. 어떤 연속 구간이든 시작 책부터 t분 동안 읽을 수 있다. 합이 t를 넘지 않는 연속 구간의 최대 책 수는?
- **핵심 아이디어**: **슬라이딩 윈도우(투포인터)**. 오른쪽 끝을 늘리며 구간 합을 더하고, 합이 t를 초과하면 왼쪽을 줄여 다시 ≤ t로 만든다. 매 단계 윈도우 길이의 최댓값.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long t;
    cin >> n >> t;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    long long sum = 0;                   // 현재 윈도우 [left, right] 합
    int left = 0, best = 0;
    for (int right = 0; right < n; right++) {
        sum += a[right];                 // 오른쪽 책 추가
        while (sum > t) {                // t 초과면 왼쪽부터 제거
            sum -= a[left];
            left++;
        }
        best = max(best, right - left + 1); // 현재 윈도우 길이 갱신
    }
    cout << best << "\n";
    return 0;
}
```
- **가르칠 포인트**: ① 합 `sum`과 `t`는 누적이 커질 수 있으니 `long long`(a[i]가 10^4, n이 10^5라도 안전 습관). ② 투포인터에서 `left`는 절대 뒤로 가지 않는다 — 전체 O(n). ③ "연속 구간"이 핵심 — 책을 건너뛸 수 없다는 조건을 학생이 놓치기 쉬움.

---

## 33. Concert Tickets (CSES 1091 · Easy) — 입출력형 · map(multiset)
🔗 https://cses.fi/problemset/task/1091
- **문제**: n개 티켓 가격과 m명 손님의 최대 지불액. 각 손님은 자기 예산 이하의 티켓 중 **가장 비싼 것**을 산다(없으면 −1). 각 손님이 낸 가격 출력.
- **핵심 아이디어**: **multiset + upper_bound**. 남은 티켓을 multiset에 넣고, 손님 예산 `x`에 대해 `upper_bound(x)`로 "x보다 큰 첫 원소"를 찾은 뒤 한 칸 앞이 "x 이하 최대". 산 티켓은 erase.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    multiset<int> tickets;               // 중복 가격 허용 → multiset
    for (int i = 0; i < n; i++) {
        int h;
        cin >> h;
        tickets.insert(h);
    }
    while (m--) {
        int x;
        cin >> x;
        auto it = tickets.upper_bound(x); // x보다 "큰" 첫 원소
        if (it == tickets.begin()) {      // 그게 맨 앞이면 x 이하 티켓 없음
            cout << -1 << "\n";
        } else {
            --it;                         // 한 칸 앞 = x 이하 가장 비싼 티켓
            cout << *it << "\n";
            tickets.erase(it);            // 그 티켓 하나만 제거(반복자로 erase)
        }
    }
    return 0;
}
```
- **가르칠 포인트**: ① **`erase(값)` 대신 `erase(반복자)`** — 값으로 지우면 같은 가격 티켓이 전부 사라진다. 반드시 반복자로 한 개만 제거. ② `upper_bound`로 "이하 최대" 찾기: x보다 큰 첫 원소의 한 칸 앞. `it == begin()`이면 답 없음(−1). ③ `lower_bound` vs `upper_bound` 구분 — 여기선 "x 자신도 살 수 있다"이므로 `upper_bound(x)` 후 `--it`가 정확.
