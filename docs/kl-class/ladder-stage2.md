# KL 사다리 풀이집 — 2단계: 기초 도구 (11~21번)

## 11. Valid Anagram (LeetCode 242 · Easy) — 함수형 / map
🔗 https://leetcode.com/problems/valid-anagram/
- **문제**: 두 문자열 `s`, `t`가 서로의 애너그램(글자 구성이 같음)인지 판별.
- **핵심 아이디어**: 각 글자의 등장 횟수를 세서 비교. 길이가 다르면 즉시 false. `int cnt[26]` 또는 `map`으로 빈도 누적 후 일치 확인.
- **C++ 풀이**:
```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;   // 길이 다르면 애너그램 불가능
        int cnt[26] = {0};
        for (char c : s) cnt[c - 'a']++;           // s의 글자는 +1
        for (char c : t) cnt[c - 'a']--;           // t의 글자는 -1
        for (int i = 0; i < 26; i++)
            if (cnt[i] != 0) return false;          // 0이 아니면 빈도 불일치
        return true;
    }
};
```
- **가르칠 포인트**: 길이 먼저 비교하면 한 번 순회로 끝낼 수 있다. `c - 'a'`로 글자를 0~25 인덱스로 바꾸는 패턴(소문자 가정)을 확실히 익히게 한다.

## 12. Majority Element (LeetCode 169 · Easy) — 함수형 / map
🔗 https://leetcode.com/problems/majority-element/
- **문제**: 길이 n 배열에서 `n/2`번 넘게 등장하는 원소(항상 존재) 찾기.
- **핵심 아이디어**: Boyer-Moore 투표. 후보 하나와 카운트를 유지하며, 같으면 +1 다르면 −1, 0이 되면 후보 교체. O(n) 시간, O(1) 메모리.
- **C++ 풀이**:
```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = 0, count = 0;
        for (int x : nums) {
            if (count == 0) candidate = x;          // 카운트 0이면 새 후보 채택
            count += (x == candidate) ? 1 : -1;     // 같으면 +1, 다르면 -1
        }
        return candidate;                           // 과반수는 항상 살아남음
    }
};
```
- **가르칠 포인트**: 정렬 후 가운데 원소(`nums[n/2]`)를 답으로 쓰는 풀이도 정답이라 비교해서 보여주면 좋다. 다수 원소가 보장될 때만 투표가 통한다는 전제를 강조.

## 13. Sales by Match / Sock Merchant (HackerRank · Easy) — 함수형 / map
🔗 https://www.hackerrank.com/challenges/sock-merchant/problem
- **문제**: 양말 색 배열에서 같은 색 두 짝으로 만들 수 있는 쌍의 개수를 구함.
- **핵심 아이디어**: 색깔별 개수를 `map`(또는 `unordered_map`)으로 세고, 각 색의 개수를 2로 나눈 몫을 모두 더한다.
- **C++ 풀이**:
```cpp
int sockMerchant(int n, vector<int> ar) {
    unordered_map<int,int> cnt;
    for (int c : ar) cnt[c]++;          // 색깔별 개수 집계
    int pairs = 0;
    for (auto& [color, c] : cnt)
        pairs += c / 2;                  // 짝수만 쌍이 됨 (홀수 1개는 버림)
    return pairs;
}
```
- **가르칠 포인트**: 정수 나눗셈 `c / 2`가 자동으로 버림된다는 점(5 → 2쌍). HackerRank는 함수 시그니처가 미리 주어지므로 그 형태에 맞춰 작성하게 한다.

## 14. Running Sum of 1d Array (LeetCode 1480 · Easy) — 함수형 / 배열
🔗 https://leetcode.com/problems/running-sum-of-1d-array/
- **문제**: `runningSum[i] = nums[0] + ... + nums[i]` 형태의 누적합 배열을 반환.
- **핵심 아이디어**: 앞에서부터 직전 값에 현재 값을 더해 그 자리에 덮어쓴다(제자리 누적합). O(n).
- **C++ 풀이**:
```cpp
class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        for (int i = 1; i < nums.size(); i++)
            nums[i] += nums[i - 1];      // 직전까지의 합을 현재에 더함
        return nums;                     // 첫 원소는 그대로 둠
    }
};
```
- **가르칠 포인트**: 누적합(prefix sum) 개념의 가장 기본형. `i`를 1부터 시작하는 이유(0번은 자기 자신)와 제자리 수정의 효율을 짚어준다.

## 15. Increasing Array (CSES 1094 · Easy) — 입출력형 / 시뮬
🔗 https://cses.fi/problemset/task/1094
- **문제**: 배열을 비감소(non-decreasing)로 만들기 위해 원소를 1씩 증가시킬 때 필요한 최소 증가 횟수의 합.
- **핵심 아이디어**: 왼쪽부터 보며 `arr[i] < arr[i-1]`이면 `arr[i]`를 `arr[i-1]`까지 올려야 한다. 그 차이를 모두 더한다. **합이 매우 커지므로 `long long` 필수.**
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n);            // 값 자체는 int 범위지만 합은 long long
    for (int i = 0; i < n; i++) cin >> a[i];

    long long ops = 0;                 // ⚠️ 답이 10^18 근처까지 커질 수 있음
    for (int i = 1; i < n; i++) {
        if (a[i] < a[i - 1]) {
            ops += a[i - 1] - a[i];    // 이전 값까지 끌어올린 증가량 누적
            a[i] = a[i - 1];           // 올린 뒤 기준값 갱신
        }
    }
    cout << ops << "\n";
    return 0;
}
```
- **가르칠 포인트**: **`long long` 안 쓰면 오버플로우로 오답** — n=2*10^5, 값 10^9이면 합이 int를 훌쩍 넘는다. 가장 자주 틀리는 함정이니 반드시 강조. 그리디(왼→오 한 번 순회)로 충분함을 설명.

## 16. Move Zeroes (LeetCode 283 · Easy) — 함수형 / 투포인터
🔗 https://leetcode.com/problems/move-zeroes/
- **문제**: 배열의 0을 모두 뒤로 보내되, 0이 아닌 원소들의 상대 순서는 유지(제자리 수정).
- **핵심 아이디어**: 쓰기 포인터 `j`. 0이 아닌 값을 만나면 `nums[j]`에 써넣고 `j++`. 마지막에 `j`부터 끝까지 0으로 채운다.
- **C++ 풀이**:
```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int j = 0;                              // 다음에 0 아닌 값을 쓸 위치
        for (int i = 0; i < nums.size(); i++)
            if (nums[i] != 0) nums[j++] = nums[i];  // 0 아닌 값만 앞으로 모음
        while (j < nums.size()) nums[j++] = 0;  // 남은 칸을 0으로 채움
    }
}; 
```
- **가르칠 포인트**: 두 포인터(읽기 `i` / 쓰기 `j`)의 역할 분리. swap 방식보다 "모으고 나머지 0 채우기"가 더 직관적임을 보여준다. 상대 순서 유지가 핵심 제약.

## 17. Squares of a Sorted Array (LeetCode 977 · Easy) — 함수형 / 투포인터
🔗 https://leetcode.com/problems/squares-of-a-sorted-array/
- **문제**: 오름차순 정렬된 정수 배열(음수 포함)의 각 원소를 제곱한 뒤 오름차순으로 반환.
- **핵심 아이디어**: 제곱값이 가장 큰 후보는 항상 양 끝에 있다. 양끝 투포인터로 더 큰 제곱을 골라 결과 배열을 **뒤에서부터** 채운다. O(n).
- **C++ 풀이**:
```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n);
        int l = 0, r = n - 1, pos = n - 1;       // 양끝 + 결과 채울 위치(뒤부터)
        while (l <= r) {
            int ls = nums[l] * nums[l];
            int rs = nums[r] * nums[r];
            if (ls > rs) { res[pos--] = ls; l++; }   // 왼쪽 제곱이 크면 그걸 뒤에
            else         { res[pos--] = rs; r--; }   // 아니면 오른쪽 제곱을 뒤에
        }
        return res;
    }
};
```
- **가르칠 포인트**: 그냥 제곱 후 `sort` 하면 O(n log n) — 정답이지만 투포인터 O(n)이 의도된 풀이. "왜 가장 큰 제곱이 양 끝에 있는가"(음수의 절댓값)를 직접 생각하게 한다. 결과를 뒤에서 채우는 인덱스(`pos--`) 처리 주의.

## 18. Helpful Maths (Codeforces 339A · Easy) — 입출력형 / 정렬
🔗 https://codeforces.com/problemset/problem/339/A
- **문제**: `1`, `2`, `3`만으로 이루어진 덧셈식 문자열이 주어짐. 합이 같도록 항을 오름차순(1...2...3) 정렬해 다시 출력.
- **핵심 아이디어**: 입력에서 `+`를 빼고 숫자만 모아 정렬한 뒤 `+`로 다시 이어 출력. 숫자만 정렬하면 자동으로 1→2→3 순.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    vector<char> nums;
    for (char c : s)
        if (c != '+') nums.push_back(c);   // '+' 건너뛰고 숫자만 수집
    sort(nums.begin(), nums.end());        // 오름차순 정렬 → 1...2...3
    for (int i = 0; i < nums.size(); i++) {
        if (i) cout << '+';                // 첫 숫자 앞엔 '+' 안 붙임
        cout << nums[i];
    }
    cout << "\n";
    return 0;
}
```
- **가르칠 포인트**: 문자 `'1' < '2' < '3'`이라 char 정렬만으로 끝난다. 구분자(`+`)를 항 사이에만 넣는 출력 패턴(`if (i)`)은 대회에서 매우 자주 쓰인다.

## 19. Mixing Milk (USACO 855 · Bronze) — 입출력형 / 시뮬
🔗 https://usaco.org/index.php?page=viewproblem2&cpid=855
- **문제**: 통 3개(각각 용량 `c`, 현재량 `m`)가 있고, 100번에 걸쳐 `1→2`, `2→3`, `3→1`, `1→2`, ... 순서로 붓는다. 한 번 부을 때는 받는 통이 넘치지 않을 만큼만 옮긴다. 100번 후 각 통의 우유량 출력.
- **핵심 아이디어**: 입력은 "통1 용량 통1 현재량 / 통2 ... / 통3 ..." 세 줄. 매 단계 `from→to`로 `min(현재 from의 양, to의 남은 공간)`만큼 옮기는 시뮬레이션. 부어지는 순서를 `(i%3, (i+1)%3)`으로 돌린다.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    long long c[3], m[3];               // 각 통의 용량 c, 현재량 m
    for (int i = 0; i < 3; i++)
        cin >> c[i] >> m[i];            // 한 줄에 "용량 현재량" 3줄

    for (int t = 0; t < 100; t++) {
        int from = t % 3;               // 1->2->3->1... (0-based: 0->1->2->0)
        int to = (t + 1) % 3;
        long long space = c[to] - m[to];      // 받는 통의 남은 공간
        long long pour = min(m[from], space);  // 넘치지 않게 옮길 양
        m[from] -= pour;
        m[to] += pour;
    }

    for (int i = 0; i < 3; i++) cout << m[i] << "\n";   // 통1,2,3 순으로 출력
    return 0;
}
```
- **가르칠 포인트**: 입력 형식(통마다 "용량 현재량" 한 줄, 총 3줄)을 정확히 읽기. "받는 통의 빈 공간만큼만 붓는다"는 `min`이 핵심. 붓는 순서가 1→2→3→1로 순환(`%3`)함을 시뮬로 직접 따라가게 한다. 값 범위가 작아 long long은 필수는 아니지만 습관으로 써도 무방.

## 20. Plus One (LeetCode 66 · Easy) — 함수형 / 시뮬
🔗 https://leetcode.com/problems/plus-one/
- **문제**: 한 자리씩 배열로 표현된 큰 정수(`digits`)에 1을 더한 결과를 같은 형식으로 반환.
- **핵심 아이디어**: 뒤(일의 자리)부터 처리. 9가 아니면 +1 하고 끝, 9면 0으로 만들고 받아올림 계속. 끝까지 받아올림이면(전부 9) 맨 앞에 1 삽입.
- **C++ 풀이**:
```cpp
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for (int i = digits.size() - 1; i >= 0; i--) {
            if (digits[i] < 9) {            // 9가 아니면 그냥 +1 하고 종료
                digits[i]++;
                return digits;
            }
            digits[i] = 0;                  // 9면 0으로 바꾸고 받아올림 계속
        }
        digits.insert(digits.begin(), 1);   // 전부 9였던 경우 (999 -> 1000)
        return digits;
    }
};
```
- **가르칠 포인트**: 받아올림(carry)을 뒤에서 앞으로 전파하는 패턴. `999 → 1000`처럼 자릿수가 늘어나는 경계 사례를 반드시 다룬다. 큰 수를 int로 못 담을 때 배열로 처리하는 발상.

## 21. Pangram (Codeforces 520A · Easy) — 입출력형 / map
🔗 https://codeforces.com/problemset/problem/520/A
- **문제**: 길이 n 문자열이 알파벳 26글자(대소문자 무시)를 모두 포함하면 "YES", 아니면 "NO".
- **핵심 아이디어**: 모든 글자를 소문자로 통일해 `set`(또는 bool 26칸)에 넣고, 서로 다른 글자 수가 26인지 확인.
- **C++ 풀이**:
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    string s;
    cin >> n >> s;                          // n은 길이(안 써도 됨), s가 문자열
    set<char> seen;
    for (char c : s)
        seen.insert(tolower(c));            // 대소문자 통일 후 집합에 등장 기록
    cout << (seen.size() == 26 ? "YES" : "NO") << "\n";
    return 0;
}
```
- **가르칠 포인트**: 대소문자 통일(`tolower`)을 빼먹는 실수가 흔하다. `set`으로 중복 제거 후 크기 비교하는 패턴, 또는 `bool used[26]`로도 풀 수 있음을 함께 보여준다.
