# KL 사다리 풀이집 — 1단계: 손풀기 (1~10번)

> 대상 언어: C++ · 전부 "쉬움" 난이도. 알고리즘 없이 기본 문법/자료구조만으로 푼다.
> LeetCode(함수형) 문제는 `class Solution` 시그니처, CF/CSES/HackerRank(stdin) 문제는 `main()` 전체 코드.

---

## 1. Watermelon (Codeforces 4A · 쉬움) — 입출력형 · 수학
🔗 https://codeforces.com/problemset/problem/4/A
- **문제**: 무게 `w`인 수박을 두 명이 각각 짝수 kg씩 나눠 가질 수 있는지 판단.
- **핵심 아이디어**: 짝수 + 짝수 = 짝수이므로, `w`가 짝수이면서 4 이상이면 가능. (2는 0+2가 안 되므로 불가 — 양쪽 다 양수여야 함.)
- **C++ 풀이**:
```cpp
#include <iostream>
using namespace std;

int main() {
    int w;
    cin >> w;
    // 짝수이고 4 이상이어야 둘 다 양수인 짝수로 쪼갤 수 있다
    if (w % 2 == 0 && w >= 4)
        cout << "YES" << endl;
    else
        cout << "NO" << endl;
    return 0;
}
```
- **가르칠 포인트**: `w == 2`인 함정. 단순히 "짝수면 YES"라고 하면 틀린다 — 두 조각 모두 양의 짝수여야 한다는 조건을 놓치기 쉽다.

---

## 2. Simple Array Sum (HackerRank · 쉬움) — 함수형 · 배열
🔗 https://www.hackerrank.com/challenges/simple-array-sum/problem
- **문제**: 정수 배열이 주어지면 모든 원소의 합을 반환.
- **핵심 아이디어**: 반복문으로 누적합. HackerRank C++는 함수 시그니처를 채우는 형식이다.
- **C++ 풀이**:
```cpp
// HackerRank가 제공하는 함수 시그니처를 채운다
int simpleArraySum(vector<int> ar) {
    int sum = 0;
    for (int x : ar)   // range-for로 배열 순회
        sum += x;
    return sum;
}
```
- **가르칠 포인트**: range-for(`for (int x : ar)`)로 깔끔하게 순회하는 패턴. `sum`을 0으로 초기화하는 것 잊지 않기.

---

## 3. Fizz Buzz (LeetCode 412 · 쉬움) — 함수형 · 시뮬
🔗 https://leetcode.com/problems/fizz-buzz/
- **문제**: 1부터 n까지 중 3의 배수는 "Fizz", 5의 배수는 "Buzz", 둘 다면 "FizzBuzz", 아니면 숫자 문자열로 채운 배열 반환.
- **핵심 아이디어**: 1~n 반복하며 나머지 조건 검사. **15의 배수(3과 5 동시)를 먼저** 검사해야 한다.
- **C++ 풀이**:
```cpp
class Solution {
public:
    vector<string> fizzBuzz(int n) {
        vector<string> ans;
        for (int i = 1; i <= n; i++) {
            if (i % 15 == 0)        // 3과 5의 공배수를 가장 먼저
                ans.push_back("FizzBuzz");
            else if (i % 3 == 0)
                ans.push_back("Fizz");
            else if (i % 5 == 0)
                ans.push_back("Buzz");
            else
                ans.push_back(to_string(i)); // 숫자를 문자열로
        }
        return ans;
    }
};
```
- **가르칠 포인트**: 조건 순서가 핵심 — `% 3`을 먼저 검사하면 15가 "Fizz"로 잘못 나간다. 숫자→문자열 변환은 `to_string()`.

---

## 4. Two Sum (LeetCode 1 · 쉬움) — 함수형 · map
🔗 https://leetcode.com/problems/two-sum/
- **문제**: 배열에서 두 수의 합이 `target`이 되는 두 인덱스를 반환. 정답은 정확히 하나 존재.
- **핵심 아이디어**: 해시맵에 "값 → 인덱스"를 저장하며 한 번 순회. 각 원소마다 `target - 현재값`이 이미 맵에 있는지 확인하면 O(n).
- **C++ 풀이**:
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen; // 값 -> 인덱스
        for (int i = 0; i < (int)nums.size(); i++) {
            int need = target - nums[i];      // 짝이 되는 값
            if (seen.count(need))             // 이미 봤다면 정답
                return {seen[need], i};
            seen[nums[i]] = i;                // 못 찾았으면 기록
        }
        return {};
    }
};
```
- **가르칠 포인트**: 이중 for문(O(n²))으로도 풀리지만, 해시맵으로 O(n)으로 줄이는 게 진짜 배울 점. "기록을 먼저 하느냐 검사를 먼저 하느냐" — 검사 먼저 해야 자기 자신을 두 번 쓰는 실수를 막는다.

---

## 5. Weird Algorithm (CSES 1068 · 쉬움) — 입출력형 · 시뮬
🔗 https://cses.fi/problemset/task/1068
- **문제**: 콜라츠 수열. n이 짝수면 n/2, 홀수면 3n+1. n이 1이 될 때까지 거쳐가는 모든 값을 출력.
- **핵심 아이디어**: while 루프로 1이 될 때까지 시뮬레이션. **3n+1 과정에서 값이 매우 커지므로 `long long` 필수.**
- **C++ 풀이**:
```cpp
#include <iostream>
using namespace std;

int main() {
    long long n;          // ⚠️ 3n+1로 값이 폭발 → int면 오버플로우! 반드시 long long
    cin >> n;
    cout << n;
    while (n != 1) {
        if (n % 2 == 0) n /= 2;       // 짝수면 절반
        else            n = 3 * n + 1; // 홀수면 3배 + 1
        cout << " " << n;
    }
    cout << endl;
    return 0;
}
```
- **가르칠 포인트**: **오버플로우 함정.** n ≤ 10^6라도 3n+1 중간 값이 int(약 21억) 한계를 넘는 경우가 있다 → `long long` 안 쓰면 WA. 첫 값은 루프 전에 미리 출력하고, 이후 값마다 공백 붙여 출력하는 형식.

---

## 6. Reverse String (LeetCode 344 · 쉬움) — 함수형 · 문자열
🔗 https://leetcode.com/problems/reverse-string/
- **문제**: 문자 배열 `s`를 추가 메모리 없이 **제자리(in-place)**로 뒤집기.
- **핵심 아이디어**: 투 포인터. 양 끝에서 시작해 가운데로 좁히며 swap.
- **C++ 풀이**:
```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        int l = 0, r = s.size() - 1;  // 양 끝 포인터
        while (l < r) {
            swap(s[l], s[r]);          // 마주 보는 두 글자 교환
            l++;
            r--;
        }
    }
};
```
- **가르칠 포인트**: 투 포인터 패턴 + 제자리 수정(새 배열 만들지 않음). `swap()` 표준 함수 활용. 루프 조건은 `l < r` (`<=`면 가운데서 자기 자신과 교환하는 헛수고).

---

## 7. Contains Duplicate (LeetCode 217 · 쉬움) — 함수형 · map
🔗 https://leetcode.com/problems/contains-duplicate/
- **문제**: 배열에 같은 값이 두 번 이상 나타나면 `true`, 모두 다르면 `false`.
- **핵심 아이디어**: `unordered_set`에 넣으며 이미 있는 값을 만나면 즉시 true. (또는 set 크기와 배열 크기 비교.)
- **C++ 풀이**:
```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int x : nums) {
            if (seen.count(x)) return true; // 이미 본 값 → 중복
            seen.insert(x);
        }
        return false;
    }
};
```
- **가르칠 포인트**: `set`은 중복을 허용하지 않는 자료구조 → "본 적 있나" 질문에 최적. `count()`로 존재 여부를 O(1)에 확인.

---

## 8. Diagonal Difference (HackerRank · 쉬움) — 함수형 · 그리드
🔗 https://www.hackerrank.com/challenges/diagonal-difference/problem
- **문제**: n×n 정사각 행렬에서 주대각선 합과 부대각선 합의 차의 **절댓값**.
- **핵심 아이디어**: 한 번의 루프에서 주대각선 `arr[i][i]`, 부대각선 `arr[i][n-1-i]`를 동시에 누적. 끝에서 `abs()`.
- **C++ 풀이**:
```cpp
int diagonalDifference(vector<vector<int>> arr) {
    int n = arr.size();
    int d1 = 0, d2 = 0;
    for (int i = 0; i < n; i++) {
        d1 += arr[i][i];          // 주대각선 (왼쪽 위 → 오른쪽 아래)
        d2 += arr[i][n - 1 - i];  // 부대각선 (오른쪽 위 → 왼쪽 아래)
    }
    return abs(d1 - d2);          // 차의 절댓값
}
```
- **가르칠 포인트**: 부대각선 인덱스 `n-1-i`를 정확히 짚기 (자주 틀림). 두 대각선을 따로 두 번 도는 대신 한 루프에서 처리. 마지막 `abs()` 빼먹지 않기.

---

## 9. Best Time to Buy and Sell Stock (LeetCode 121 · 쉬움) — 함수형 · 배열
🔗 https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
- **문제**: 하루 한 번 사고 나중에 한 번 팔 때 얻을 수 있는 최대 이익. 불가능하면 0.
- **핵심 아이디어**: 한 번 순회하며 **지금까지의 최저가**를 추적하고, 오늘 팔 때 이익(`현재가 - 최저가`)의 최댓값을 갱신.
- **C++ 풀이**:
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;  // 지금까지 본 최저 매수가
        int best = 0;            // 최대 이익
        for (int p : prices) {
            minPrice = min(minPrice, p);     // 더 싼 날 갱신
            best = max(best, p - minPrice);  // 오늘 팔았을 때 이익
        }
        return best;
    }
};
```
- **가르칠 포인트**: "최저가는 항상 매도일보다 앞에 온다"는 순서 보장 — 그래서 한 번 순회로 충분. 이중 for문(O(n²)) 대신 변수 하나로 O(n). 초기값 `INT_MAX`, `best`는 0 (음수 이익은 안 사면 그만).

---

## 10. Missing Number (CSES 1083 · 쉬움) — 입출력형 · 수학
🔗 https://cses.fi/problemset/task/1083
- **문제**: 1부터 n까지 중 하나가 빠진 n-1개의 수가 주어진다. 빠진 수를 찾기.
- **핵심 아이디어**: 1~n 전체 합(`n(n+1)/2`)에서 주어진 수들의 합을 뺀다. **합이 int 범위를 넘으므로 `long long` 필수.**
- **C++ 풀이**:
```cpp
#include <iostream>
using namespace std;

int main() {
    long long n;           // ⚠️ n까지 합 = n(n+1)/2, n=2e5면 약 200억 → int 오버플로우!
    cin >> n;
    long long total = n * (n + 1) / 2;  // 1..n 전체 합
    long long sum = 0;
    for (long long i = 0; i < n - 1; i++) {
        long long x;
        cin >> x;
        sum += x;          // 실제 들어온 수들의 합
    }
    cout << total - sum << endl; // 빠진 수
    return 0;
}
```
- **가르칠 포인트**: **오버플로우 함정.** n이 2×10^5일 때 합은 약 2×10^10으로 int(약 21억)를 훌쩍 넘는다 → `long long` 안 쓰면 WA. `n*(n+1)/2` 공식 한 줄로 끝나는 우아함. n-1개만 입력받는 것 주의.
