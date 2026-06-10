# KL 사다리 풀이집 — 4단계: 기법 입문 (34~43번)

> 슬라이딩 윈도우 · 이분탐색 · 누적합 · 그리디 입문 단계. 대부분 "어려움".
> 함수형(LeetCode)은 `class Solution`, 입출력형(CF/USACO)은 `#include` + `main()` + 빠른입출력.

---

## 34. Playlist (CSES 1141 · 어려움) — 슬라이딩 윈도우
🔗 https://cses.fi/problemset/task/1141
- **문제**: 곡 번호 배열에서 **같은 곡이 두 번 나오지 않는** 가장 긴 연속 구간의 길이를 구한다.
- **핵심 아이디어**: 슬라이딩 윈도우(투포인터). 오른쪽 포인터를 늘리며, 새로 들어온 값이 이전에 현재 윈도우 안에서 나온 적 있으면 왼쪽 포인터를 그 다음 위치로 점프. `map<value, last_index>`로 마지막 등장 위치 관리.
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

    unordered_map<int, int> last;   // 값 -> 마지막으로 본 인덱스
    int left = 0, ans = 0;
    for (int right = 0; right < n; right++) {
        auto it = last.find(a[right]);
        // 같은 값이 현재 윈도우([left..right-1]) 안에 있으면 left를 그 다음으로 점프
        if (it != last.end() && it->second >= left) {
            left = it->second + 1;
        }
        last[a[right]] = right;
        ans = max(ans, right - left + 1);
    }
    cout << ans << "\n";
    return 0;
}
```
- **가르칠 포인트**: `left = max(left, last+1)` 개념 — 왼쪽 포인터는 **절대 되돌아가지 않는다**. `it->second >= left` 조건을 빠뜨리면 윈도우 밖에 있는 과거 등장 때문에 left가 잘못 점프함. 값 범위가 크므로 배열 대신 map/unordered_map 사용.

---

## 35. Minimum Size Subarray Sum (LeetCode 209 · 보통) — 슬라이딩 윈도우
🔗 https://leetcode.com/problems/minimum-size-subarray-sum/
- **문제**: 양의 정수 배열에서 합이 `target` **이상**이 되는 연속 부분배열 중 **가장 짧은 길이**를 구한다. 없으면 0.
- **핵심 아이디어**: 가변 길이 슬라이딩 윈도우. 오른쪽으로 합을 더하다가 `sum >= target`이 되면, 왼쪽을 줄여 합이 target 밑으로 떨어지기 직전까지 좁히며 최소 길이 갱신. 모든 원소가 양수라서 합이 단조 증가/감소 → 투포인터 성립.
- **C++ 풀이**:
```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int n = nums.size();
        int left = 0;
        long long sum = 0;
        int ans = INT_MAX;
        for (int right = 0; right < n; right++) {
            sum += nums[right];
            // 합이 target 이상인 동안 왼쪽을 최대한 좁힌다
            while (sum >= target) {
                ans = min(ans, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }
        return ans == INT_MAX ? 0 : ans;
    }
};
```
- **가르칠 포인트**: 안쪽 `while`은 "while(sum >= target)" — `if`로 쓰면 한 칸씩만 줄여 최소를 못 찾음. 양수 배열이라는 조건이 투포인터의 전제임을 강조(음수가 있으면 단조성이 깨져 못 씀).

---

## 36. Longest Repeating Character Replacement (LeetCode 424 · 보통) — 슬라이딩 윈도우(문자열)
🔗 https://leetcode.com/problems/longest-repeating-character-replacement/
- **문제**: 대문자 문자열에서 **최대 k개 문자를 바꿔** 같은 문자로 이루어진 가장 긴 연속 구간을 만들 때, 그 길이를 구한다.
- **핵심 아이디어**: 슬라이딩 윈도우. 윈도우가 유효하려면 `(윈도우 길이) - (윈도우 안 최빈 문자 개수) <= k` (바꿔야 할 개수가 k 이하). 이 조건이 깨지면 left를 한 칸 당긴다. `maxCount`(지금까지 본 최대 빈도)는 굳이 줄이지 않아도 답이 줄지 않으므로 그대로 둬도 정답.
- **C++ 풀이**:
```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        int cnt[26] = {0};
        int left = 0, maxCount = 0, ans = 0;
        for (int right = 0; right < (int)s.size(); right++) {
            maxCount = max(maxCount, ++cnt[s[right] - 'A']);
            // 바꿔야 할 문자 수가 k를 초과하면 윈도우를 한 칸 줄인다
            while ((right - left + 1) - maxCount > k) {
                cnt[s[left] - 'A']--;
                left++;
            }
            ans = max(ans, right - left + 1);
        }
        return ans;
    }
};
```
- **가르칠 포인트**: 핵심 부등식 `윈도우길이 - 최빈도 <= k`. `maxCount`를 줄이지 않아도 되는 이유 — 윈도우는 한 번 커진 뒤 절대 더 작아지지 않고(while로 left를 당겨도 길이가 유지/증가하는 방향으로만 답을 갱신), 더 큰 답은 더 큰 maxCount가 있어야만 나오기 때문. 학생은 보통 `while`을 `if`로 써도 통과하는데, 이유를 설명해주면 좋다.

---

## 37. They Are Everywhere (Codeforces 701C · 보통) — 슬라이딩 윈도우(투포인터)
🔗 https://codeforces.com/problemset/problem/701/C
- **문제**: 펫몬 종류 문자열에서, **모든 종류**를 적어도 한 번씩 포함하는 가장 짧은 연속 구간의 길이를 구한다.
- **핵심 아이디어**: 먼저 전체 종류 수 `total`을 센다. 슬라이딩 윈도우로 오른쪽을 넓혀 종류를 채우고, 윈도우가 모든 종류를 담은 순간 왼쪽을 최대한 줄이며 최소 길이 갱신. 카운트가 0이 되는 문자를 만나면 종류 하나가 빠지므로 멈춘다.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    string s;
    cin >> s;

    int total = (int)(set<char>(s.begin(), s.end()).size());  // 전체 종류 수

    unordered_map<char, int> cnt;
    int have = 0;            // 현재 윈도우가 가진 종류 수
    int left = 0, ans = n;
    for (int right = 0; right < n; right++) {
        if (cnt[s[right]]++ == 0) have++;   // 새 종류가 들어오면 have 증가
        // 모든 종류를 담은 동안 왼쪽을 최대한 좁힌다
        while (have == total) {
            ans = min(ans, right - left + 1);
            if (--cnt[s[left]] == 0) have--;
            left++;
        }
    }
    cout << ans << "\n";
    return 0;
}
```
- **가르칠 포인트**: "모든 종류 포함" → 먼저 종류 수를 세고, `have == total`을 윈도우 유효 조건으로 삼는 것이 정석 패턴. `cnt[x]++ == 0`(들어올 때)과 `--cnt[x] == 0`(나갈 때)로 have를 정확히 관리하는 부분을 강조.

---

## 38. Subsequences Summing to Sevens (USACO 595 · 어려움) — 누적합 + mod
🔗 https://usaco.org/index.php?page=viewproblem2&cpid=595
- **문제**: 소 ID 배열에서, 구간 합이 **7의 배수**가 되는 가장 긴 연속 구간의 길이를 구한다.
- **핵심 아이디어**: 누적합의 나머지(prefix mod 7)를 이용. 구간 [i+1, j]의 합이 7의 배수 ⇔ `prefix[j] % 7 == prefix[i] % 7`. 그러므로 같은 나머지를 갖는 **가장 이른 prefix 인덱스**를 기록해 두고, 같은 나머지를 다시 만나면 `j - first[r]`로 길이 계산. prefix는 인덱스 0(빈 접두)부터 시작해야 맨 앞부터 시작하는 구간도 잡힌다.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    int first[7];                 // 나머지 r이 처음 나온 prefix 인덱스
    for (int r = 0; r < 7; r++) first[r] = -1;
    first[0] = 0;                 // prefix[0] = 0 (빈 접두), 나머지 0은 인덱스 0

    int prefix = 0, ans = 0;
    for (int j = 1; j <= n; j++) {
        int x;
        cin >> x;
        prefix = (prefix + x) % 7;
        if (first[prefix] == -1) {
            first[prefix] = j;            // 이 나머지를 처음 봄 -> 기록
        } else {
            ans = max(ans, j - first[prefix]);  // 같은 나머지 재등장 -> 구간 길이
        }
    }
    cout << ans << "\n";
    return 0;
}
```
- **가르칠 포인트**: "구간 합이 m의 배수 ⇒ prefix mod 동일" 변환이 핵심. `first[0] = 0`(빈 접두) 초기화를 빼먹으면 배열 맨 앞부터 시작하는 정답 구간을 놓친다 — 가장 흔한 실수. 같은 나머지는 **가장 처음 인덱스**만 저장해야 최장 길이가 나온다(나중 인덱스로 덮어쓰면 안 됨).

---

## 39. 3Sum (LeetCode 15 · 보통) — 정렬 + 투포인터
🔗 https://leetcode.com/problems/3sum/
- **문제**: 정수 배열에서 합이 0이 되는 서로 다른 세 수 조합을 **중복 없이** 모두 찾는다.
- **핵심 아이디어**: 정렬 후, 한 수 `nums[i]`를 고정하고 나머지 두 수는 양끝 투포인터(`left`, `right`)로 합 `-nums[i]`를 찾는다. 정렬되어 있으니 합이 작으면 left++, 크면 right--. **중복 제거**가 핵심: 고정 수와 두 포인터 모두 같은 값은 건너뛴다.
- **C++ 풀이**:
```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        vector<vector<int>> res;
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;  // 고정 수 중복 건너뜀
            if (nums[i] > 0) break;                         // 가장 작은 수가 양수면 합 0 불가
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.push_back({nums[i], nums[left], nums[right]});
                    left++; right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;   // 중복 건너뜀
                    while (left < right && nums[right] == nums[right + 1]) right--; // 중복 건너뜀
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
};
```
- **가르칠 포인트**: 정렬이 투포인터의 전제. 중복 제거 3곳(고정 수 / left / right)을 모두 처리해야 답에 중복 조합이 안 생긴다. `nums[left] == nums[left-1]`처럼 **방금 쓴 값과 비교**하는 패턴을 강조.

---

## 40. Hamburgers (Codeforces 371C · 어려움) — 이분탐색(판정)
🔗 https://codeforces.com/problemset/problem/371/C
- **문제**: 레시피 문자열(B/S/C 개수)과 현재 보유 재료(nb/ns/nc), 시장 가격(pb/ps/pc), 가진 돈 r이 주어진다. 햄버거를 최대 몇 개 만들 수 있는가? (모자란 재료는 사서 채움)
- **핵심 아이디어**: "x개 만들 수 있는가?"는 x에 대해 단조(가능하면 그보다 적은 개수도 가능) → **답에 대한 이분탐색**. x개를 만들려면 각 재료 `need = max(0, x*레시피개수 - 보유)`만큼 사야 하고, 총비용이 r 이하인지 판정. 비용이 매우 커지므로 **long long 필수**.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string recipe;
    cin >> recipe;
    ll cntB = 0, cntS = 0, cntC = 0;
    for (char ch : recipe) {
        if (ch == 'B') cntB++;
        else if (ch == 'S') cntS++;
        else cntC++;
    }

    ll nb, ns, nc, pb, ps, pc, r;
    cin >> nb >> ns >> nc >> pb >> ps >> pc >> r;

    auto cost = [&](ll x) -> ll {
        // x개 만들 때 추가로 사야 하는 비용 (오버플로우 방지 위해 캡)
        ll need = 0;
        ll d;
        d = max(0LL, cntB * x - nb); need += d * pb;
        d = max(0LL, cntS * x - ns); need += d * ps;
        d = max(0LL, cntC * x - nc); need += d * pc;
        return need;
    };

    // 상한: 가진 재료가 0이어도 r/최소가격 + 여유. 안전하게 큰 값.
    ll lo = 0, hi = 2e12;  // r<=1e12, 가격>=1 이므로 충분
    while (lo < hi) {
        ll mid = lo + (hi - lo + 1) / 2;   // 상향 이분 (가능한 최댓값)
        if (cost(mid) <= r) lo = mid;
        else hi = mid - 1;
    }
    cout << lo << "\n";
    return 0;
}
```
- **가르칠 포인트**: "최댓값을 구하는 이분탐색"은 `mid = lo + (hi-lo+1)/2`로 **올림**을 쓰고, 성공 시 `lo = mid`로 당긴다(무한루프 방지). 비용 계산에서 `cntB*x`가 1e7*2e12 = 2e19로 long long 한계(약 9.2e18)를 넘을 수 있으니 hi를 너무 크게 잡지 말 것 — `hi = 2e12`면 `cntB*x` 최대 약 100*2e12=2e14로 안전. long long 필수.

---

## 41. Sagheer and Nubian Market (Codeforces 812C · 어려움) — 이분탐색 + 정렬
🔗 https://codeforces.com/problemset/problem/812/C
- **문제**: n개 물건의 기본 가격 a[i]와 예산 S. **k개를 산다면** j번째로 산 물건의 실제 비용은 `a[i] + j*k` (j는 1..k, 산 순번). 예산 안에서 살 수 있는 최대 개수 k와 그때의 최소 총비용을 구한다.
- **핵심 아이디어**: k를 고정하면, k개를 살 때 추가되는 순번 비용의 합은 `k*(1 + 2 + ... + k) = k * k*(k+1)/2`로 **어떤 물건을 고르든 항상 같다**(순번은 항상 1..k). 그러므로 기본가격 `a[i]`가 가장 싼 k개를 고르는 것이 최소 → **정렬 후 가장 싼 k개의 a 합 + k*k*(k+1)/2 ≤ S** 판정. k가 클수록 비용↑ → **k에 대한 이분탐색**(가능한 최대 k). long long 필수.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int n;
ll S;
vector<ll> a;   // 오름차순 정렬해 둠

// k개를 산다고 가정했을 때 가능한 최소 총비용을 구해 S 이하인지 판정
// 비용 = (가장 싼 a k개 합) + k*(1+2+...+k)
//       = (가장 싼 a k개 합) + k * (k*(k+1)/2)
bool ok(int k, ll &costOut) {
    if (k == 0) { costOut = 0; return true; }
    ll sum = 0;
    for (int i = 0; i < k; i++) sum += a[i];   // 가장 싼 k개 기본가격 합 (a는 정렬됨)
    sum += (ll)k * ((ll)k * (k + 1) / 2);      // 순번 비용 합 (물건 선택과 무관, 항상 동일)
    costOut = sum;
    return sum <= S;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> n >> S;
    a.resize(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    sort(a.begin(), a.end());                  // 기본가격 오름차순

    int lo = 0, hi = n, bestK = 0;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        ll tmp;
        if (ok(mid, tmp)) { bestK = mid; lo = mid + 1; }  // 가능 -> 더 크게
        else hi = mid - 1;
    }
    ll bestCost;
    ok(bestK, bestCost);
    cout << bestK << " " << bestCost << "\n";
    return 0;
}
```
- **가르칠 포인트**: 핵심 통찰 — k가 고정이면 순번 비용 합 `k*(1+2+...+k)`는 **어떤 물건을 사든 항상 똑같다**. 그러니 기본가격 `a[i]`가 싼 k개만 고르면 끝. (흔한 오답: 각 물건에 `+k`만 한 번씩 더해 `+k*k`로 계산 → 순번이 1..k로 다르다는 걸 놓친 것. 실제 추가비용은 `1*k + 2*k + ... + k*k`.) k에 대한 이분탐색은 단조성(k 가능 ⇒ k-1도 가능). 예제: `3 11 / 2 3 5` → `2 11` (가장 싼 2개 2+3=5, 순번 비용 2*(1+2)=6, 합 11). `a[i]·k`가 1e5·1e5=1e10 수준, 합도 커서 long long 필수.

---

## 42. Powered Addition (Codeforces 1338A · 보통) — 그리디
🔗 https://codeforces.com/problemset/problem/1338/A
- **문제**: 배열이 주어진다. 초 t에는 원하는 원소들에 정확히 `2^(t-1)`를 더할 수 있다(각 초마다 한 번, 원소별 선택 가능). 배열을 **비감소(non-decreasing)**로 만드는 데 필요한 최소 시간 t.
- **핵심 아이디어**: 각 원소는 1초~t초 사이에서 `2^0, 2^1, ..., 2^(t-1)` 중 임의 부분집합 합을 더할 수 있다 → 최대 `2^t - 1`까지 더할 수 있고, 그 이하 어떤 값도 만들 수 있음(이진 표현). 비감소로 만들려면 각 원소를 "지금까지의 최댓값" 이상으로 올려야 함. 필요한 최대 증가량 `D = max(prefixMax - a[i])`. 답은 `2^t - 1 >= D`인 최소 t. D=0이면 0.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int T;
    cin >> T;
    while (T--) {
        int n;
        cin >> n;
        vector<ll> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];

        ll prefMax = LLONG_MIN;
        ll D = 0;                       // 만들어야 할 최대 부족분
        for (int i = 0; i < n; i++) {
            prefMax = max(prefMax, a[i]);
            D = max(D, prefMax - a[i]);  // 앞쪽 최댓값까지 끌어올려야 함
        }

        // 2^t - 1 >= D 인 최소 t
        int t = 0;
        ll reach = 0;                   // 2^t - 1
        while (reach < D) {
            t++;
            reach = (1LL << t) - 1;     // 2^t - 1
        }
        cout << t << "\n";
    }
    return 0;
}
```
- **가르칠 포인트**: "각 초 2^(t-1)을 한 번씩, 원소별로 더할 수 있다" ⇒ 한 원소에 `1,2,4,...,2^(t-1)` 중 골라 더하면 0~(2^t-1) 범위 모두 가능(이진수). 그래서 문제가 `2^t - 1 >= D` 한 줄로 환원됨. `D = max(prefixMax - a[i])` — 비감소 조건은 "각 원소가 앞쪽 최댓값 이상"이라는 점. a[i]가 -1e9까지 가능하고 차이가 커서 long long 권장. D=0이면 t=0(이미 비감소).

---

## 43. Merge Intervals (LeetCode 56 · 보통) — 정렬 + 병합
🔗 https://leetcode.com/problems/merge-intervals/
- **문제**: 구간들의 목록에서 겹치는 구간을 모두 병합한 결과를 반환한다.
- **핵심 아이디어**: 시작점 기준 정렬 후 한 번 훑으며, 현재 결과의 마지막 구간과 다음 구간이 겹치면(`다음.start <= 마지막.end`) end를 `max`로 확장, 안 겹치면 새 구간으로 추가.
- **C++ 풀이**:
```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());   // 시작점 기준 정렬
        vector<vector<int>> res;
        for (auto& iv : intervals) {
            // 겹치면 마지막 구간의 끝을 확장, 아니면 새 구간 추가
            if (!res.empty() && iv[0] <= res.back()[1]) {
                res.back()[1] = max(res.back()[1], iv[1]);
            } else {
                res.push_back(iv);
            }
        }
        return res;
    }
};
```
- **가르칠 포인트**: 정렬이 먼저(시작점 순). 겹침 판정은 `iv[0] <= res.back()[1]` (등호 포함 — [1,4],[4,5]도 병합). end 확장 시 `max`를 꼭 써야 한다 — 다음 구간이 더 짧을 수 있으므로([1,5] 다음 [2,3]) 그냥 대입하면 끝이 줄어드는 버그.
