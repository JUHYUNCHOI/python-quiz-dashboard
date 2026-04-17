import type { AlgoTopic } from '../types'

export const arrayTopic: AlgoTopic = {
    id: 'array',
    title: '배열',
    icon: '📊',
    category: '기초 (Bronze~Silver)',
    order: 2,
    description: '배열을 활용한 투 포인터, 슬라이딩 윈도우, 구간 처리 기법',
    titleEn: 'Arrays',
    categoryEn: 'Basics (Bronze~Silver)',
    descriptionEn: 'Two pointers, sliding window, and range processing with arrays',
    track: 'both',
    stages: [
        {
            num: 1,
            title: '최솟값/최댓값',
            titleEn: 'Min/Max',
            problemIds: [
                'boj-10818'
            ],
            desc: '배열 순회 입문',
            descEn: 'Introduction to array traversal'
        },
        {
            num: 2,
            title: '배열 기본',
            titleEn: 'Array Basics',
            problemIds: [
                'lc-1',
                'lc-121'
            ],
            desc: '한 번 순회, 투 포인터 기본 (Easy~Silver)',
            descEn: 'Single pass, basic two pointers (Easy~Silver)'
        },
        {
            num: 3,
            title: '배열 심화',
            titleEn: 'Array Advanced',
            problemIds: [
                'boj-2003',
                'lc-15'
            ],
            desc: '투 포인터 심화, 전처리 (Medium~Gold)',
            descEn: 'Advanced two pointers, preprocessing (Medium~Gold)'
        }
    ],
    problems: [
        {
            id: 'boj-10818',
            title: 'BOJ 10818 - 최소, 최대',
            difficulty: 'bronze',
            link: 'https://www.acmicpc.net/problem/10818',
            simIntro: '배열을 처음부터 끝까지 순회하면서 최솟값과 최댓값을 추적하는 과정을 단계별로 확인해보세요!',
            sim: { type: 'minmax', defaultInput: '20 10 35 30 7' },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N개의 정수가 주어진다. 이때, 최솟값과 최댓값을 구하는 프로그램을 작성하시오.</p>

                <h4>입력</h4>
                <p>첫째 줄에 정수의 개수 N (1 ≤ N ≤ 1,000,000)이 주어진다. 둘째 줄에는 N개의 정수를 공백으로 구분해서 주어진다. 모든 정수는 -1,000,000보다 크거나 같고, 1,000,000보다 작거나 같은 정수이다.</p>

                <h4>출력</h4>
                <p>첫째 줄에 최솟값과 최댓값을 공백으로 구분해 출력한다.</p>

                <div class="problem-example"><h4>예제 입력 1</h4>
                <pre>5
20 10 35 30 7</pre></div>

                <div class="problem-example"><h4>예제 출력 1</h4>
                <pre>7 35</pre></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 1,000,000</li>
                    <li>-1,000,000 ≤ 각 정수 ≤ 1,000,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '문제 이해: 뭘 구해야 할까?',
                    content: '<div class="hint-key">💡 N개의 정수 중에서 가장 작은 수와 가장 큰 수를 찾으면 됩니다!</div><p>예시: [20, 10, 35, 30, 7] → 최솟값 <strong>7</strong>, 최댓값 <strong>35</strong></p><p>배열 전체를 한 번 살펴보면서 두 값을 동시에 찾을 수 있을까요?</p>'
                },
                {
                    title: '초기값은 어떻게 정할까?',
                    content: `<div class="hint-key">🤔 비교를 시작하려면 기준이 필요해요!</div><p>첫 번째 원소를 <strong>최솟값이자 최댓값의 초기값</strong>으로 설정합니다.</p><p>아직 다른 수를 보지 않았으니, 첫 번째 수가 현재까지의 최소이자 최대인 것이 맞습니다.</p><span class="lang-py"><pre><code class="language-python">min_val = nums[0]  # 초기 최솟값
max_val = nums[0]  # 초기 최댓값</code></pre></span><span class="lang-cpp"><pre><code class="language-cpp">int minVal = nums[0]; // 초기 최솟값
int maxVal = nums[0]; // 초기 최댓값</code></pre></span>`
                },
                {
                    title: '순회하며 비교!',
                    content: '<div class="hint-key">🔄 두 번째 원소부터 끝까지 하나씩 비교합니다</div><p>각 원소를 볼 때마다 두 가지를 확인합니다:</p><ul><li>현재 최솟값보다 <strong>작으면</strong> → 최솟값 갱신</li><li>현재 최댓값보다 <strong>크면</strong> → 최댓값 갱신</li></ul><div style="display:flex;gap:4px;align-items:end;margin:14px 0;padding:12px;background:var(--bg2);border-radius:10px;flex-wrap:wrap;justify-content:center;"><div style="text-align:center;"><div style="background:#dfe6e9;color:#636e72;width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;">20</div><div style="font-size:0.7rem;color:var(--text3);margin-top:2px;">i=0</div></div><div style="text-align:center;"><div style="background:#dfe6e9;color:#636e72;width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;">10</div><div style="font-size:0.7rem;color:var(--text3);margin-top:2px;">i=1</div></div><div style="text-align:center;"><div style="background:#dfe6e9;color:#636e72;width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;">35</div><div style="font-size:0.7rem;color:var(--text3);margin-top:2px;">i=2</div></div><div style="text-align:center;"><div style="background:#dfe6e9;color:#636e72;width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;">30</div><div style="font-size:0.7rem;color:var(--text3);margin-top:2px;">i=3</div></div><div style="text-align:center;"><div style="background:#dfe6e9;color:#636e72;width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;">7</div><div style="font-size:0.7rem;color:var(--text3);margin-top:2px;">i=4</div></div></div><div style="display:flex;gap:12px;justify-content:center;margin-bottom:8px;"><span style="color:#00b894;font-weight:700;">min=7</span> <span style="color:#e17055;font-weight:700;">max=35</span></div><p>이렇게 하면 배열을 <strong>딱 한 번</strong>만 순회해서 O(n)에 해결!</p>'
                },
                {
                    title: '더 간단한 방법도 있다!',
                    content: '<div class="hint-key">💡 대부분의 언어에 최솟값/최댓값을 구하는 내장 함수가 있습니다!</div><span class="lang-py"><p>Python: <code>min()</code>과 <code>max()</code> — 리스트를 넣으면 바로 최솟값/최댓값을 반환합니다.</p></span><span class="lang-cpp"><p>C++: <code>*min_element()</code>과 <code>*max_element()</code> — <code>&lt;algorithm&gt;</code> 헤더에 있습니다.</p></span><p>내장 함수도 내부적으로는 배열을 한 번 순회하면서 비교합니다. 시간 복잡도는 동일하게 <strong>O(n)</strong>이지만, 코드가 훨씬 짧고 가독성이 좋습니다!</p>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
nums = list(map(int, input().split()))

# 첫 번째 원소로 초기화 후 순회하며 갱신
min_val = nums[0]
max_val = nums[0]
for x in nums[1:]:
    if x < min_val:
        min_val = x
    if x > max_val:
        max_val = x

print(min_val, max_val)`,
                cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    // 첫 번째 원소로 초기화 후 순회하며 갱신
    int minVal = nums[0], maxVal = nums[0];
    for (int i = 1; i < n; i++) {
        if (nums[i] < minVal) minVal = nums[i];
        if (nums[i] > maxVal) maxVal = nums[i];
    }
    cout << minVal << " " << maxVal << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '직접 순회',
                    description: '배열을 처음부터 끝까지 한 번 순회하며 최솟값과 최댓값을 추적',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
nums = list(map(int, input().split()))

# 첫 번째 원소로 초기화 후 순회하며 갱신
min_val = nums[0]
max_val = nums[0]
for x in nums[1:]:
    if x < min_val:
        min_val = x
    if x > max_val:
        max_val = x

print(min_val, max_val)`,
                        cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    // 첫 번째 원소로 초기화 후 순회하며 갱신
    int minVal = nums[0], maxVal = nums[0];
    for (int i = 1; i < n; i++) {
        if (nums[i] < minVal) minVal = nums[i];
        if (nums[i] > maxVal) maxVal = nums[i];
    }
    cout << minVal << " " << maxVal << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 받기',
                                desc: `N과 N개의 정수를 입력받습니다.
sys.stdin.readline을 쓰는 이유: N이 최대 100만이라 빠른 입력이 필요!`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
nums = list(map(int, input().split()))`
                            },
                            {
                                title: '초기값 설정',
                                desc: `첫 번째 원소를 최솟값과 최댓값의 기준으로 삼습니다.
아직 하나밖에 안 봤으니 그 수가 현재 최소이자 최대!`,
                                code: `min_val = nums[0]  # 비교 기준: 첫 번째 원소
max_val = nums[0]`
                            },
                            {
                                title: '순회하며 비교',
                                desc: `두 번째 원소부터 끝까지 하나씩 비교합니다.
각 원소마다 최솟값/최댓값과 비교 → 갱신!`,
                                code: `for x in nums[1:]:
    if x < min_val:   # 현재 최솟값보다 작으면?
        min_val = x    # → 최솟값 갱신!
    if x > max_val:   # 현재 최댓값보다 크면?
        max_val = x    # → 최댓값 갱신!`
                            },
                            {
                                title: '결과 출력',
                                desc: `순회가 끝나면 min_val, max_val이 정답!
O(n) — 배열을 딱 한 번만 봅니다.`,
                                code: 'print(min_val, max_val)  # 공백 구분 출력'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 받기',
                                desc: `N과 N개의 정수를 입력받습니다.
ios::sync_with_stdio(false)로 빠른 입출력 설정!`,
                                code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];`
                            },
                            {
                                title: '초기값 설정',
                                desc: '첫 번째 원소를 최솟값과 최댓값의 기준으로 삼습니다.',
                                code: '    int minVal = nums[0], maxVal = nums[0];'
                            },
                            {
                                title: '순회하며 비교',
                                desc: `두 번째 원소부터 끝까지 비교하며 갱신.
if문 두 개로 최솟값/최댓값을 동시에 추적!`,
                                code: `    for (int i = 1; i < n; i++) {
        if (nums[i] < minVal) minVal = nums[i];
        if (nums[i] > maxVal) maxVal = nums[i];
    }`
                            },
                            {
                                title: '결과 출력',
                                desc: 'O(n) 한 번 순회로 최솟값, 최댓값을 구했습니다.',
                                code: `    cout << minVal << " " << maxVal << endl;
    return 0;
}`
                            }
                        ]
                    }
                },
                {
                    approach: '내장 함수',
                    description: 'Python min()/max() 또는 C++ algorithm 라이브러리 활용',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
nums = list(map(int, input().split()))

# min(), max() 내장 함수로 간단하게!
print(min(nums), max(nums))`,
                        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    // min_element, max_element로 간단하게!
    cout << *min_element(nums.begin(), nums.end()) << " "
         << *max_element(nums.begin(), nums.end()) << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 받기',
                                desc: '이전 접근법과 동일하게 입력을 받습니다.',
                                code: `import sys
input = sys.stdin.readline

n = int(input())
nums = list(map(int, input().split()))`
                            },
                            {
                                title: '내장 함수로 바로 출력!',
                                desc: `min()은 리스트에서 최솟값, max()는 최댓값을 반환.
내부적으로 O(n) 순회 — 직접 순회와 동일한 성능!`,
                                code: 'print(min(nums), max(nums))  # 한 줄로 끝!'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 받기',
                                desc: '이전 접근법과 동일하게 입력을 받습니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>  // min_element, max_element
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];`
                            },
                            {
                                title: 'algorithm으로 바로 출력!',
                                desc: `min_element/max_element는 반복자를 반환 → *로 값을 꺼냄.
내부적으로 O(n) 순회 — 직접 순회와 동일한 성능!`,
                                code: `    cout << *min_element(nums.begin(), nums.end()) << " "
         << *max_element(nums.begin(), nums.end()) << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-1',
            title: 'LeetCode 1 - Two Sum',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/two-sum/',
            simIntro: '해시 테이블로 O(n)에 Two Sum을 푸는 과정을 확인해보세요!',
            sim: { type: 'two-sum', defaultInput: '2 7 11 15' },
            descriptionHTML: `
                <h3>문제</h3>
                <p>정수 배열 <code>nums</code>와 정수 <code>target</code>이 주어집니다.
                합이 <code>target</code>이 되는 <strong>두 수의 인덱스</strong>를 반환하세요.</p>
                <p>같은 원소를 두 번 사용할 수 없고, 정답은 정확히 하나 존재합니다.
                답은 어떤 순서로 반환해도 됩니다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [2,7,11,15], target = 9</pre></div>
                    <div><strong>출력</strong><pre>[0, 1]</pre></div>
                </div>
                <p class="example-explain">nums[0] + nums[1] = 2 + 7 = 9 이므로 [0, 1]을 반환합니다.</p>
                </div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [3,2,4], target = 6</pre></div>
                    <div><strong>출력</strong><pre>[1, 2]</pre></div>
                </div></div>

                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [3,3], target = 6</pre></div>
                    <div><strong>출력</strong><pre>[0, 1]</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>2 ≤ nums.length ≤ 10<sup>4</sup></li>
                    <li>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></li>
                    <li>-10<sup>9</sup> ≤ target ≤ 10<sup>9</sup></li>
                    <li>정답은 정확히 하나만 존재합니다.</li>
                </ul>

                <div class="hint-key">💡 Follow-up</div>
                <p>O(n²)보다 빠른 알고리즘을 만들 수 있을까요?</p>
            `,
            hints: [
                {
                    title: '처음 생각: 이중 for문',
                    content: `<div class="hint-key">💡 가장 단순한 방법: 모든 쌍을 전부 확인!</div><p>배열의 모든 두 수 조합을 하나씩 비교하면 됩니다.</p><span class="lang-py"><pre><code class="language-python">for i in range(len(nums)):
    for j in range(i+1, len(nums)):
        if nums[i] + nums[j] == target:
            return [i, j]</code></pre></span><span class="lang-cpp"><pre><code class="language-cpp">for (int i = 0; i < nums.size(); i++)
    for (int j = i+1; j < nums.size(); j++)
        if (nums[i] + nums[j] == target)
            return {i, j};</code></pre></span>`
                },
                {
                    title: '직접 해보기 — 브루트포스로 얼마나 걸릴까?',
                    content: '<div class="hint-key">🔍 Brute Force로 직접 찾아보자!</div><div class="hint-sub">탭하면서 한 쌍씩 비교해보세요</div>'
                },
                {
                    title: '문제 발견! 너무 느리다',
                    content: '<p>n이 <strong>10,000</strong>이면 약 <strong>5천만 번</strong> 비교! 😱</p><p>매번 나머지 수를 전부 훑어야 하니 시간 초과가 발생합니다.</p><div class="hint-key">💡 "이미 본 수를 기억해둘 수 없을까?"</div><p>핵심 관찰: 숫자 하나를 볼 때마다 <strong>target - 그 수 = 짝꿍</strong>을 계산해서,<br>이미 본 수 중에 짝꿍이 있는지 <strong>해시맵으로 O(1)에 확인</strong>하면 끝!</p>'
                },
                {
                    title: '해시맵으로 한번에!',
                    content: '<div class="hint-key">✨ 해시맵으로 "짝꿍" 찾기</div><div class="hint-sub">각 수마다 짝꿍이 이미 나왔는지 즉시 확인!<br>브루트포스 15번 vs 해시맵 몇 번? 탭하며 비교!</div>'
                }
            ],
            templates: {
                python: `class Solution:
    def twoSum(self, nums, target):
        seen = {}  # 값 → 인덱스
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i`,
                cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int comp = target - nums[i];
            if (seen.count(comp)) return {seen[comp], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};`
            },
            solutions: [
                {
                    approach: '브루트포스',
                    description: '이중 for문으로 모든 쌍을 확인하여 합이 target인 쌍을 찾는다',
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `class Solution:
    def twoSum(self, nums, target):
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]`,
                        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target)
                    return {i, j};
            }
        }
        return {};
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '첫 번째 수 선택',
                                desc: `가능한 모든 쌍을 확인하기 위해
첫 번째 수를 하나씩 고정합니다.`,
                                code: `class Solution:
    def twoSum(self, nums, target):
        # 모든 쌍 (i, j) 확인 → O(n²)
        for i in range(len(nums)):`
                            },
                            {
                                title: '두 번째 수 탐색',
                                desc: `i보다 뒤에 있는 수만 확인합니다.
j = i+1부터 시작 → 같은 쌍을 두 번 확인하지 않음!`,
                                code: '            for j in range(i + 1, len(nums)):'
                            },
                            {
                                title: '합 확인 + 반환',
                                desc: `두 수의 합이 target이면 인덱스를 즉시 반환!
문제에서 "정확히 하나의 답이 있다"고 보장하므로 바로 return.`,
                                code: `                if nums[i] + nums[j] == target:
                    return [i, j]`
                            }
                        ],
                        cpp: [
                            {
                                title: '첫 번째 수 선택',
                                desc: `모든 쌍을 확인하기 위해 i를 고정합니다.
O(n²)이지만 가장 직관적인 방법입니다.`,
                                code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // 모든 쌍 (i, j) 확인 → O(n²)
        for (int i = 0; i < nums.size(); i++) {`
                            },
                            {
                                title: '두 번째 수 탐색',
                                desc: 'j = i+1부터 → 같은 쌍을 두 번 확인하지 않음',
                                code: '            for (int j = i + 1; j < nums.size(); j++) {'
                            },
                            {
                                title: '합 확인 + 반환',
                                desc: '합이 target이면 즉시 반환!',
                                code: `                if (nums[i] + nums[j] == target)
                    return {i, j};
            }
        }
        return {};
    }
};`
                            }
                        ]
                    }
                },
                {
                    approach: '해시맵',
                    description: '한 번 순회하면서 해시맵(딕셔너리)으로 complement를 확인',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `class Solution:
    def twoSum(self, nums, target):
        seen = {}  # 값 → 인덱스
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i`,
                        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int comp = target - nums[i];
            if (seen.count(comp)) return {seen[comp], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '해시맵 초기화',
                                desc: `핵심 아이디어: "이 숫자 본 적 있나?"를 O(1)에 확인!
딕셔너리에 {값: 인덱스}를 저장합니다.`,
                                code: `class Solution:
    def twoSum(self, nums, target):
        seen = {}  # {값: 인덱스} → O(1) 조회`
                            },
                            {
                                title: '배열 순회',
                                desc: 'enumerate로 인덱스(i)와 값(num)을 동시에 가져옵니다.',
                                code: '        for i, num in enumerate(nums):'
                            },
                            {
                                title: 'complement 계산 + 확인',
                                desc: `핵심: target - num = "짝꿍"!
이 짝꿍이 이미 seen에 있다면 → 정답 발견!
해시맵 조회는 O(1)이므로 전체 O(n).`,
                                code: `            complement = target - num  # 짝꿍 계산
            if complement in seen:      # O(1) 조회!
                return [seen[complement], i]`
                            },
                            {
                                title: '현재 값 저장',
                                desc: `짝을 못 찾았으면 현재 값을 기록해둡니다.
→ 뒤에 올 숫자가 이 값을 짝꿍으로 찾을 수 있음!`,
                                code: '            seen[num] = i  # 나중에 짝꿍으로 찾아질 수 있도록 저장'
                            }
                        ],
                        cpp: [
                            {
                                title: '해시맵 초기화',
                                desc: `unordered_map → O(1) 조회!
{값: 인덱스}를 저장하여 짝꿍을 빠르게 찾습니다.`,
                                code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen; // {값: 인덱스}`
                            },
                            {
                                title: '배열 순회',
                                desc: 'for문으로 인덱스와 값을 순회합니다.',
                                code: '        for (int i = 0; i < nums.size(); i++) {'
                            },
                            {
                                title: 'complement 계산 + 확인',
                                desc: `핵심: target - nums[i] = 짝꿍!
seen에 짝꿍이 있으면 정답 반환 (O(1) 조회).`,
                                code: `            int comp = target - nums[i]; // 짝꿍
            if (seen.count(comp)) return {seen[comp], i};`
                            },
                            {
                                title: '현재 값 저장 + 마무리',
                                desc: '못 찾으면 현재 값을 기록 → 뒤의 숫자가 찾을 수 있음',
                                code: `            seen[nums[i]] = i; // 나중에 찾아질 수 있도록 저장
        }
        return {};
    }
};`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-121',
            title: 'LeetCode 121 - Best Time to Buy and Sell Stock',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
            simIntro: '최솟값을 추적하면서 이익을 계산하는 과정을 단계별로 확인해보세요!',
            sim: { type: 'stock', defaultInput: '7 1 5 3 6 4' },
            descriptionHTML: `
                <h3>문제</h3>
                <p>주식 가격 배열 <code>prices</code>가 주어집니다.
                <code>prices[i]</code>는 i번째 날의 주가입니다.</p>
                <p>한 번 사고 한 번 팔아서 얻을 수 있는 <strong>최대 이익</strong>을 반환하세요.
                이익을 낼 수 없으면 <code>0</code>을 반환합니다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>prices = [7,1,5,3,6,4]</pre></div>
                    <div><strong>출력</strong><pre>5</pre></div>
                </div>
                <p class="example-explain">1일에 사서(가격 1) 4일에 팔면(가격 6) 이익 = 6 - 1 = 5</p>
                </div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>prices = [7,6,4,3,1]</pre></div>
                    <div><strong>출력</strong><pre>0</pre></div>
                </div>
                <p class="example-explain">가격이 계속 하락하므로 이익을 낼 수 없습니다.</p>
                </div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ prices.length ≤ 10⁵</li>
                    <li>0 ≤ prices[i] ≤ 10⁴</li>
                </ul>

                <h4>💡 Follow-up</h4>
                <p>배열을 한 번만 순회하면서 풀 수 있을까요?</p>
            `,
            hints: [
                {
                    title: '처음 생각: 어떻게 풀까?',
                    content: '어떤 날 사서 그 뒤의 어떤 날 팔아야 합니다. 가장 단순한 방법은? 모든 (매수일, 매도일) 조합을 확인하는 이중 for문입니다!<br><code>profit = prices[j] - prices[i]</code> (j &gt; i)의 최댓값을 구하면 됩니다.'
                },
                {
                    title: '한번 해볼까?',
                    content: '<code>prices = [7, 1, 5, 3, 6, 4]</code>로 해볼게요:<br>• 7에 사면? → 1(-6), 5(-2), 3(-4), 6(-1), 4(-3) → 전부 손해!<br>• 1에 사면? → 5(+4), 3(+2), 6(<strong>+5</strong>), 4(+3) → 최대 +5!<br>• 나머지도 확인... 결국 1에 사서 6에 파는 게 최고입니다.'
                },
                {
                    title: '문제 발견!',
                    content: '이중 for문은 <strong>O(n²)</strong>입니다. n이 100,000이면 약 50억 번 연산!<div style="display:flex;gap:14px;margin:14px 0;align-items:end;justify-content:center;"><div style="text-align:center;"><div style="background:#ff6b6b;width:52px;height:90px;border-radius:8px;display:flex;align-items:end;justify-content:center;padding-bottom:6px;color:white;font-size:0.8rem;font-weight:700;">O(n²)</div><div style="font-size:0.75rem;margin-top:4px;color:var(--text3);">이중 for</div></div><div style="text-align:center;"><div style="background:#51cf66;width:52px;height:18px;border-radius:8px;display:flex;align-items:end;justify-content:center;padding-bottom:4px;color:white;font-size:0.8rem;font-weight:700;">O(n)</div><div style="font-size:0.75rem;margin-top:4px;color:var(--text3);">한 번 순회</div></div></div>핵심 관찰: 어떤 날에 팔 때, 가장 이익이 큰 경우는 <strong>"그 날 이전까지의 최저값에 산 경우"</strong>입니다.<br>그러면 순회하면서 지금까지의 최저값만 기억해두면 되지 않을까?'
                },
                {
                    title: '더 좋은 방법 발견!',
                    content: '배열을 <strong>한 번만</strong> 순회하면서:<br>• <code>min_price</code>: 순회하면서 지금까지의 최저값을 추적<br>• <code>max_profit</code>: 지금까지의 최대 이익을 추적<br><br>각 날에 <code>price - min_price</code>가 현재 최대 이익보다 크면 갱신합니다.'
                },
                {
                    title: '핵심 아이디어 정리',
                    content: '변수 2개만으로 해결하는 "상태 추적" 패턴:<br>① <code>min_price = min(min_price, price)</code> — 지금까지의 최저값 갱신<br>② <code>max_profit = max(max_profit, price - min_price)</code> — 최대 이익 갱신<br><br><strong>O(n²) → O(n) 시간, O(1) 공간</strong> — 추가 자료구조 없이 변수만으로 해결!'
                }
            ],
            templates: {
                python: `class Solution:
    def maxProfit(self, prices):
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)
        return max_profit`,
                cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minP = INT_MAX, maxP = 0;
        for (int p : prices) {
            minP = min(minP, p);
            maxP = max(maxP, p - minP);
        }
        return maxP;
    }
};`
            },
            solutions: [
                {
                    approach: '브루트포스',
                    description: '이중 for문으로 모든 (매수일, 매도일) 조합을 확인',
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `class Solution:
    def maxProfit(self, prices):
        max_profit = 0
        for i in range(len(prices)):
            for j in range(i + 1, len(prices)):
                profit = prices[j] - prices[i]
                max_profit = max(max_profit, profit)
        return max_profit`,
                        cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int maxP = 0;
        for (int i = 0; i < prices.size(); i++) {
            for (int j = i + 1; j < prices.size(); j++) {
                maxP = max(maxP, prices[j] - prices[i]);
            }
        }
        return maxP;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '최대 이익 초기화',
                                desc: `이익을 낼 수 없는 경우를 대비해 0으로 시작.
문제에서 "이익 없으면 0 반환"이라고 했으므로!`,
                                code: `class Solution:
    def maxProfit(self, prices):
        max_profit = 0  # 이익 없으면 0 반환`
                            },
                            {
                                title: '매수일 선택',
                                desc: `i번째 날에 사는 경우를 하나씩 시도합니다.
모든 날을 매수일로 고려합니다.`,
                                code: '        for i in range(len(prices)):'
                            },
                            {
                                title: '매도일 탐색',
                                desc: `매수일 이후의 날에만 팔 수 있으므로 j = i+1부터.
과거로 돌아가서 팔 수 없습니다!`,
                                code: '            for j in range(i + 1, len(prices)):'
                            },
                            {
                                title: '이익 계산 + 최대값 갱신',
                                desc: `(판매가 - 구매가)를 계산하고, 최대 이익을 갱신.
O(n²) — 모든 쌍을 확인하므로 느림`,
                                code: `                profit = prices[j] - prices[i]
                max_profit = max(max_profit, profit)
        return max_profit`
                            }
                        ],
                        cpp: [
                            {
                                title: '초기화',
                                desc: '이익 없으면 0 반환을 위해 0으로 시작',
                                code: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int maxP = 0; // 이익 없으면 0`
                            },
                            {
                                title: '이중 for문',
                                desc: `모든 (매수일 i, 매도일 j) 조합을 확인.
j = i+1 → 과거에 팔 수 없으므로`,
                                code: `        for (int i = 0; i < prices.size(); i++) {
            for (int j = i + 1; j < prices.size(); j++) {`
                            },
                            {
                                title: '이익 계산 + 반환',
                                desc: '판매가 - 구매가의 최대값을 갱신하고 반환',
                                code: `                maxP = max(maxP, prices[j] - prices[i]);
            }
        }
        return maxP;
    }
};`
                            }
                        ]
                    }
                },
                {
                    approach: '한 번 순회',
                    description: '최솟값을 추적하면서 현재 가격과의 차이로 최대 이익을 계산',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `class Solution:
    def maxProfit(self, prices):
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)
        return max_profit`,
                        cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minP = INT_MAX, maxP = 0;
        for (int p : prices) {
            minP = min(minP, p);
            maxP = max(maxP, p - minP);
        }
        return maxP;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '변수 초기화',
                                desc: `핵심 아이디어: "지금까지 가장 싼 날"을 기억하자!
min_price = ∞ → 어떤 가격이든 처음에 갱신됨.
max_profit = 0 → 이익 없으면 0 반환.`,
                                code: `class Solution:
    def maxProfit(self, prices):
        min_price = float('inf')  # 지금까지 본 최저가
        max_profit = 0             # 최대 이익`
                            },
                            {
                                title: '가격 순회',
                                desc: `한 번의 순회로 해결! O(n)
각 날의 가격을 "오늘 팔면 얼마 벌지?"로 판단합니다.`,
                                code: '        for price in prices:'
                            },
                            {
                                title: '최솟값 갱신',
                                desc: `오늘 가격이 지금까지 최저가보다 싸면 갱신.
→ 이후의 날들이 이 가격에 사서 팔 수 있음!`,
                                code: '            min_price = min(min_price, price)  # 최저가 갱신'
                            },
                            {
                                title: '이익 계산',
                                desc: `핵심: "오늘 판다면?" → price - min_price
이 값이 지금까지 최대 이익보다 크면 갱신합니다.`,
                                code: '            max_profit = max(max_profit, price - min_price)  # 오늘 팔면?'
                            },
                            {
                                title: '결과 반환',
                                desc: `한 번 순회만으로 최대 이익을 찾았습니다!
O(n) 시간, O(1) 공간 — 최적 풀이.`,
                                code: '        return max_profit'
                            }
                        ],
                        cpp: [
                            {
                                title: '변수 초기화',
                                desc: `핵심: "지금까지 가장 싼 날"을 기억!
INT_MAX → 어떤 가격이든 처음에 갱신됨.`,
                                code: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minP = INT_MAX, maxP = 0; // 최저가, 최대이익`
                            },
                            {
                                title: '순회 + 최솟값 갱신',
                                desc: `각 가격에서 최저가를 갱신.
→ 이후의 날들이 이 가격에 사서 팔 수 있음`,
                                code: `        for (int p : prices) {
            minP = min(minP, p); // 최저가 갱신`
                            },
                            {
                                title: '이익 계산 + 결과',
                                desc: `"오늘 판다면?" → p - minP
O(n) 한 번 순회로 최적 해를 구합니다.`,
                                code: `            maxP = max(maxP, p - minP); // 오늘 팔면?
        }
        return maxP;
    }
};`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-2003',
            title: 'BOJ 2003 - 수들의 합 2',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/2003',
            simIntro: '투 포인터가 합을 유지하며 이동하는 과정을 확인해보세요!',
            sim: { type: 'sum-count', defaultInput: '1 2 3 2 5' },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N개의 수로 이루어진 수열에서,
                <strong>연속된 수들의 부분합</strong> 중 합이 M이 되는 경우의 수를 구하세요.</p>
                <h4>입력</h4>
                <p>첫째 줄에 N(1 &le; N &le; 10,000), M(1 &le; M &le; 300,000,000)이 주어진다. 다음 줄에는 A[1], A[2], ..., A[N]이 공백으로 분리되어 주어진다. 각각의 A[x]는 30,000을 넘지 않는 자연수이다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 경우의 수를 출력한다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>N = 4, M = 2
수열 = [1, 1, 1, 1]</pre></div>
                    <div><strong>출력</strong><pre>3</pre></div>
                </div>
                <p class="example-explain">[1,1](인덱스 0~1), [1,1](1~2), [1,1](2~3) → 총 3가지</p>
                </div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>N = 10, M = 5
수열 = [1, 2, 3, 4, 2, 5, 3, 1, 1, 2]</pre></div>
                    <div><strong>출력</strong><pre>3</pre></div>
                </div>
                <p class="example-explain">[2,3](인덱스 1~2), [5](인덱스 5), [3,1,1](인덱스 6~8) → 총 3가지</p>
                </div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 10,000</li>
                    <li>1 ≤ M ≤ 300,000,000</li>
                    <li>수열의 각 원소는 자연수 (≥ 1)</li>
                </ul>

                <h4>💡 Follow-up</h4>
                <p>O(n²)보다 빠르게 풀 수 있을까요? (투 포인터/슬라이딩 윈도우)</p>
            `,
            hints: [
                {
                    title: '연속된 부분합이 뭐야?',
                    content: `<strong>"연속된 수들의 합"</strong>이 핵심이에요. 아무 수나 골라 더하는 게 아니라, <strong>붙어있는 수들</strong>만 더할 수 있어요!
                    <div style="display:flex;flex-direction:column;align-items:center;gap:10px;margin:16px 0;">
                        <div style="display:flex;gap:4px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#dfe6e9;color:#636e72;border-radius:8px;font-weight:700;font-size:1.1em;">1</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">2</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">3</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#dfe6e9;color:#636e72;border-radius:8px;font-weight:700;font-size:1.1em;">4</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#dfe6e9;color:#636e72;border-radius:8px;font-weight:700;font-size:1.1em;">2</span>
                        </div>
                        <div style="font-weight:600;">[2, 3] → 합 = <strong style="color:var(--green);">5</strong> ✅ 연속이니까 OK!</div>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:center;gap:10px;margin:12px 0;padding:12px;background:rgba(255,118,117,0.08);border-radius:10px;">
                        <div style="display:flex;gap:4px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#e17055;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">1</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#dfe6e9;color:#636e72;border-radius:8px;font-weight:700;font-size:1.1em;">2</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#dfe6e9;color:#636e72;border-radius:8px;font-weight:700;font-size:1.1em;">3</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#e17055;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">4</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#dfe6e9;color:#636e72;border-radius:8px;font-weight:700;font-size:1.1em;">2</span>
                        </div>
                        <div style="color:#e17055;font-weight:600;">[1, 4] → 합 = 5이지만 ❌ 떨어져 있어서 안 돼요!</div>
                    </div>
                    <p style="margin-top:16px;padding:10px 14px;background:rgba(253,203,110,0.15);border-radius:8px;font-size:0.92em;">이런 연속 구간을 전부 확인해서, 합이 M인 것을 세면 돼요! 🤔<br>그럼 어떻게 모든 연속 구간을 확인할까요?</p>`
                },
                {
                    title: '가장 쉬운 방법: 다 해보기!',
                    content: `모든 시작점에서 하나씩 늘려가며 합을 구하면 돼요.<br>왜? <strong>연속이니까 시작점만 정하면 끝점을 하나씩 늘리면서 합을 확인</strong>할 수 있거든요!
                    <div style="margin:14px 0;padding:12px;background:var(--bg2);border-radius:10px;font-size:0.9em;line-height:1.8;border:1px solid var(--bg3);">
                        <code>[1, 2, 3, 4, 2]</code>, M=5 일 때:<br>
                        • i=0부터: [1]=1, [1,2]=3, [1,2,3]=6... 5 못 찾음<br>
                        • i=1부터: [2]=2, [<strong>2,3</strong>]=<strong style="color:var(--green);">5 ✅</strong><br>
                        • i=2부터: [3]=3, [3,4]=7... 못 찾음<br>
                        • i=3부터: [4]=4, [<strong>4,2</strong>... 아 6이네] 못 찾음<br>
                        • 아 아까 못 봤는데 [5] 혼자서도 5! → i=4에서 아 아 아닌데 위에 빠진 게 있을 수도..
                    </div>
                    <p style="margin-top:10px;">이렇게 <strong>이중 for문</strong>으로 가능해요. 그런데...</p>
                    <p style="margin-top:8px;padding:10px 14px;background:rgba(255,118,117,0.1);border-radius:8px;font-size:0.92em;color:#e17055;">⏱ 시간복잡도가 <strong>O(n²)</strong>! N이 10,000이면 1억번 계산... 느릴 수 있어요!</p>`
                },
                {
                    title: '핵심 관찰: 윈도우를 밀어보자!',
                    content: `잠깐, 구간을 한 칸 오른쪽으로 밀면 어떻게 될까요?
                    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;margin:14px 0;">
                        <div style="display:flex;gap:4px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:var(--yellow);color:var(--text);border-radius:8px;font-weight:700;">1</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:var(--yellow);color:var(--text);border-radius:8px;font-weight:700;">2</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:var(--yellow);color:var(--text);border-radius:8px;font-weight:700;">3</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#dfe6e9;color:#636e72;border-radius:8px;font-weight:700;">4</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#dfe6e9;color:#636e72;border-radius:8px;font-weight:700;">2</span>
                        </div>
                        <div>[1,2,3] 합 = 6</div>
                        <div style="font-size:1.5em;">⬇️ 한 칸 밀면?</div>
                        <div style="display:flex;gap:4px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#dfe6e9;color:#636e72;border-radius:8px;font-weight:700;">1</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:var(--yellow);color:var(--text);border-radius:8px;font-weight:700;">2</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:var(--yellow);color:var(--text);border-radius:8px;font-weight:700;">3</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:var(--yellow);color:var(--text);border-radius:8px;font-weight:700;">4</span><span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#dfe6e9;color:#636e72;border-radius:8px;font-weight:700;">2</span>
                        </div>
                        <div>[2,3,4] 합 = 6 - <strong style="color:#e17055;">1</strong> + <strong style="color:var(--green);">4</strong> = 9</div>
                    </div>
                    <p style="margin-top:10px;padding:12px 14px;background:rgba(0,184,148,0.1);border-radius:8px;">💡 <strong>매번 처음부터 다시 더할 필요 없어요!</strong><br>앞에 빠지는 수는 빼고, 뒤에 들어오는 수만 더하면 돼요.<br>이게 바로 <strong>"슬라이딩 윈도우"</strong> 아이디어예요!</p>`
                },
                {
                    title: '투 포인터로 똑똑하게!',
                    content: `start와 end 두 포인터로 윈도우 크기를 조절해요!
                    <div style="margin:14px 0;padding:14px;background:var(--bg2);border-radius:10px;font-size:0.93em;line-height:2;border:1px solid var(--bg3);">
                        📌 <strong>합이 M보다 작으면</strong> → end를 오른쪽으로 (수를 더 넣어서 합 키우기)<br>
                        📌 <strong>합이 M 이상이면</strong> → start를 오른쪽으로 (앞에서 빼서 합 줄이기)<br>
                        📌 <strong>합이 딱 M이면</strong> → 찾았다! count++
                    </div>
                    <p style="margin-top:10px;">왜 이게 되냐면? 수가 전부 <strong>자연수(1 이상)</strong>이기 때문이에요!<br>수를 더하면 합이 커지고, 빼면 작아진다는 게 보장돼요.</p>
                    <p style="margin-top:12px;padding:10px 14px;background:rgba(0,184,148,0.1);border-radius:8px;">⏱ start와 end 각각 최대 N번만 이동 → <strong>O(n)</strong>!<br>O(n²)에서 O(n)으로, 엄청난 개선이에요 💪</p>
                    <p style="margin-top:8px;font-size:0.88em;color:var(--text3);">📝 시뮬레이션 탭에서 직접 윈도우가 밀리는 과정을 확인해보세요!</p>`
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = list(map(int, input().split()))

start, end = 0, 0
current_sum = 0
count = 0

while True:
    if current_sum >= M:
        current_sum -= arr[start]
        start += 1
    elif end >= N:
        break
    else:
        current_sum += arr[end]
        end += 1

    if current_sum == M:
        count += 1

print(count)`,
                cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<int> arr(N);
    for (int i = 0; i < N; i++) scanf("%d", &arr[i]);

    int s = 0, e = 0, sum = 0, cnt = 0;
    while (true) {
        if (sum >= M) sum -= arr[s++];
        else if (e >= N) break;
        else sum += arr[e++];
        if (sum == M) cnt++;
    }
    printf("%d\\n", cnt);
}`
            },
            solutions: [
                {
                    approach: '브루트포스',
                    description: '이중 for문으로 모든 연속 부분합을 확인',
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = list(map(int, input().split()))

count = 0
for i in range(N):
    total = 0
    for j in range(i, N):
        total += arr[j]
        if total == M:
            count += 1

print(count)`,
                        cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<int> arr(N);
    for (int i = 0; i < N; i++) scanf("%d", &arr[i]);

    int cnt = 0;
    for (int i = 0; i < N; i++) {
        int total = 0;
        for (int j = i; j < N; j++) {
            total += arr[j];
            if (total == M) cnt++;
        }
    }
    printf("%d\\n", cnt);
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 + 초기화',
                                desc: `N, M과 배열을 읽고 카운트를 0으로 초기화.
sys.stdin.readline → 입력이 많을 때 빠름.`,
                                code: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = list(map(int, input().split()))

count = 0`
                            },
                            {
                                title: '시작점 순회',
                                desc: `i번째 원소부터 시작하는 연속 부분합을 확인.
각 시작점마다 total을 0으로 리셋합니다.`,
                                code: `for i in range(N):
    total = 0  # 새 시작점마다 합 리셋`
                            },
                            {
                                title: '끝점 확장 + 합 확인',
                                desc: `j를 i부터 끝까지 확장하며 누적합을 계산.
O(n²) — 모든 연속 구간을 다 확인합니다.`,
                                code: `    for j in range(i, N):
        total += arr[j]       # 구간 [i..j] 합
        if total == M:
            count += 1`
                            },
                            {
                                title: '결과 출력',
                                desc: '합이 M인 연속 부분 구간의 개수를 출력.',
                                code: 'print(count)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 + 초기화',
                                desc: 'N, M과 배열을 입력받고 카운트 초기화.',
                                code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<int> arr(N);
    for (int i = 0; i < N; i++) scanf("%d", &arr[i]);

    int cnt = 0;`
                            },
                            {
                                title: '이중 for문으로 부분합 확인',
                                desc: `모든 시작점 i에서 끝점 j까지 누적합 계산.
total을 계속 더해가므로 내부 루프에서 O(1)에 갱신.`,
                                code: `    for (int i = 0; i < N; i++) {
        int total = 0; // 새 시작점마다 리셋
        for (int j = i; j < N; j++) {
            total += arr[j]; // 구간 [i..j] 합
            if (total == M) cnt++;
        }
    }`
                            },
                            {
                                title: '결과 출력',
                                desc: '합이 M인 연속 구간의 개수를 출력.',
                                code: `    printf("%d\\n", cnt);
}`
                            }
                        ]
                    }
                },
                {
                    approach: '투 포인터',
                    description: '두 포인터로 구간 합을 유지하면서 M인 경우를 찾는다',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = list(map(int, input().split()))

start, end = 0, 0
current_sum = 0
count = 0

while True:
    if current_sum >= M:
        current_sum -= arr[start]
        start += 1
    elif end >= N:
        break
    else:
        current_sum += arr[end]
        end += 1

    if current_sum == M:
        count += 1

print(count)`,
                        cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<int> arr(N);
    for (int i = 0; i < N; i++) scanf("%d", &arr[i]);

    int s = 0, e = 0, sum = 0, cnt = 0;
    while (true) {
        if (sum >= M) sum -= arr[s++];
        else if (e >= N) break;
        else sum += arr[e++];
        if (sum == M) cnt++;
    }
    printf("%d\\n", cnt);
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 + 포인터 초기화',
                                desc: `핵심 아이디어: start, end 두 포인터로 구간을 조절!
구간 합이 작으면 end 확장, 크면 start 축소.
O(n) — 각 포인터가 최대 N번만 이동하므로.`,
                                code: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = list(map(int, input().split()))

start, end = 0, 0    # 구간 [start, end)
current_sum = 0       # 현재 구간 합
count = 0`
                            },
                            {
                                title: '메인 루프: 구간 조절',
                                desc: `합 ≥ M → 구간이 너무 크다 → start를 빼고 전진.
end가 끝이면 종료.
합 < M → 구간이 부족 → end를 더하고 확장.`,
                                code: `while True:
    if current_sum >= M:
        current_sum -= arr[start]  # start 원소 빼기
        start += 1                 # 구간 축소
    elif end >= N:
        break                      # 더 확장 불가 → 종료
    else:
        current_sum += arr[end]    # end 원소 추가
        end += 1                   # 구간 확장`
                            },
                            {
                                title: '합 확인',
                                desc: `구간 조절 후 현재 합이 정확히 M이면 카운트!
if문이 매 반복마다 실행됩니다.`,
                                code: `    if current_sum == M:
        count += 1  # 합이 M인 구간 발견!`
                            },
                            {
                                title: '결과 출력',
                                desc: `O(n) 한 번 순회로 모든 구간을 찾았습니다.
start, end 각각 최대 N번 이동 → O(2N) = O(n).`,
                                code: 'print(count)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 + 포인터 초기화',
                                desc: `두 포인터 s, e로 구간 [s, e)을 관리.
합이 작으면 e 확장, 크면 s 축소 → O(n).`,
                                code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<int> arr(N);
    for (int i = 0; i < N; i++) scanf("%d", &arr[i]);

    int s = 0, e = 0, sum = 0, cnt = 0; // 구간 [s, e)`
                            },
                            {
                                title: '메인 루프 + 합 확인',
                                desc: `합 ≥ M → s 빼고 전진 (구간 축소).
e가 끝이면 종료.
합 < M → e 더하고 확장.
매 반복 합 == M 확인.`,
                                code: `    while (true) {
        if (sum >= M) sum -= arr[s++];     // 구간 축소
        else if (e >= N) break;            // 종료
        else sum += arr[e++];              // 구간 확장
        if (sum == M) cnt++;               // 합이 M!
    }`
                            },
                            {
                                title: '결과 출력',
                                desc: 'O(n) — s와 e 각각 최대 N번만 이동.',
                                code: `    printf("%d\\n", cnt);
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-15',
            title: 'LeetCode 15 - 3Sum',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/3sum/',
            simIntro: '정렬 후 하나를 고정하고 투 포인터로 좁혀가는 과정을 확인해보세요!',
            sim: { type: '3sum', defaultInput: '-4 -1 -1 0 1 2' },
            descriptionHTML: `
                <h3>문제</h3>
                <p>정수 배열 <code>nums</code>에서 합이 <code>0</code>이 되는
                <strong>세 수의 조합</strong>을 모두 찾으세요.</p>
                <p>중복되는 조합은 제거해야 합니다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [-1,0,1,2,-1,-4]</pre></div>
                    <div><strong>출력</strong><pre>[[-1,-1,2],[-1,0,1]]</pre></div>
                </div>
                <p class="example-explain">(-1)+(-1)+2 = 0, (-1)+0+1 = 0</p>
                </div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [0,1,1]</pre></div>
                    <div><strong>출력</strong><pre>[]</pre></div>
                </div>
                <p class="example-explain">합이 0이 되는 세 수 조합이 없습니다.</p>
                </div>

                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [0,0,0]</pre></div>
                    <div><strong>출력</strong><pre>[[0,0,0]]</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>3 ≤ nums.length ≤ 3000</li>
                    <li>-10⁵ ≤ nums[i] ≤ 10⁵</li>
                </ul>

                <h4>💡 Follow-up</h4>
                <p>O(n³)보다 빠르게 풀 수 있을까요?</p>
            `,
            hints: [
                {
                    title: '처음 생각: 어떻게 풀까?',
                    content: '세 수의 합이 0이 되는 조합을 모두 찾아야 합니다. 가장 단순한 방법은? 삼중 for문으로 모든 세 수 조합을 확인하는 것!<br><code>if nums[i] + nums[j] + nums[k] == 0</code>이면 결과에 추가합니다.'
                },
                {
                    title: '한번 해볼까?',
                    content: '<code>nums = [-1, 0, 1, 2, -1, -4]</code>로 해볼게요:<br>• (-1)+0+1=0 ✅, (-1)+2+(-1)=0 ✅, 0+1+(-1)=0 → 이건 위와 같은 조합!<br><br>중복이 생깁니다! [-1, 0, 1]이 여러 번 나올 수 있어요. Set을 써서 중복을 제거할 수 있지만... 삼중 for문 자체가 너무 느립니다.'
                },
                {
                    title: '문제 발견!',
                    content: '삼중 for문은 <strong>O(n³)</strong>입니다! n이 3,000이면 270억 번 연산! 😱<br><br><strong>핵심 질문:</strong> 배열을 정렬하면 뭐가 좋아질까?<br>정렬하면 ① 중복 건너뛰기가 쉬워지고 ② 두 수를 고르는 데 <strong>투 포인터</strong>를 쓸 수 있습니다!'
                },
                {
                    title: '더 좋은 방법 발견!',
                    content: '정렬 후 <strong>하나를 고정</strong>하고, 나머지 두 수를 <strong>투 포인터</strong>로 찾습니다!<div style="display:flex;gap:4px;align-items:center;margin:14px 0;padding:12px;background:var(--bg2);border-radius:10px;justify-content:center;flex-wrap:wrap;"><span style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;background:#e17055;color:white;border-radius:8px;font-weight:700;font-size:0.9em;">-4</span><span style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;background:#fdcb6e;color:#2d3436;border-radius:8px;font-weight:700;font-size:0.9em;box-shadow:0 0 0 2px #e17055;">-1</span><span style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:0.9em;box-shadow:0 0 0 2px #00b894;">-1</span><span style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;background:#dfe6e9;color:#636e72;border-radius:8px;font-weight:700;font-size:0.9em;">0</span><span style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;background:#dfe6e9;color:#636e72;border-radius:8px;font-weight:700;font-size:0.9em;">1</span><span style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:0.9em;box-shadow:0 0 0 2px #00b894;">2</span></div><div style="display:flex;justify-content:center;gap:12px;margin-bottom:8px;font-size:0.85em;"><span style="color:#e17055;font-weight:600;">i(고정)</span><span style="color:#00b894;font-weight:600;">L→ ←R (투 포인터)</span></div>• i를 고정 → left=i+1, right=끝<br>• 세 수의 합이 0보다 작으면 left++, 크면 right--<br><br>이렇게 하면 O(n) × O(n) = <strong>O(n²)</strong>!'
                },
                {
                    title: '핵심 아이디어 정리',
                    content: '① 배열을 정렬합니다 — O(n log n)<br>② i를 0부터 순회하며, <code>nums[i] == nums[i-1]</code>이면 건너뜁니다 (중복 제거)<br>③ left=i+1, right=끝으로 투 포인터 탐색<br>④ 합이 0이면 결과 추가 + left/right 중복도 건너뜀<br><br><strong>O(n³) → O(n²)</strong>으로 개선! 정렬이 핵심입니다.'
                }
            ],
            templates: {
                python: `class Solution:
    def threeSum(self, nums):
        nums.sort()
        result = []
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue  # 중복 건너뛰기
            left, right = i + 1, len(nums) - 1
            while left < right:
                s = nums[i] + nums[left] + nums[right]
                if s == 0:
                    result.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]: left += 1
                    while left < right and nums[right] == nums[right - 1]: right -= 1
                    left += 1; right -= 1
                elif s < 0:
                    left += 1
                else:
                    right -= 1
        return result`,
                cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        for (int i = 0; i < (int)nums.size() - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];
                if (s == 0) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l+1]) l++;
                    while (l < r && nums[r] == nums[r-1]) r--;
                    l++; r--;
                } else if (s < 0) l++;
                else r--;
            }
        }
        return res;
    }
};`
            },
            solutions: [
                {
                    approach: '브루트포스',
                    description: '삼중 for문으로 모든 세 수 조합을 확인하고 Set으로 중복 제거',
                    timeComplexity: 'O(n³)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `class Solution:
    def threeSum(self, nums):
        result = set()
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                for k in range(j + 1, n):
                    if nums[i] + nums[j] + nums[k] == 0:
                        triplet = tuple(sorted([nums[i], nums[j], nums[k]]))
                        result.add(triplet)
        return [list(t) for t in result]`,
                        cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        set<vector<int>> resultSet;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                for (int k = j + 1; k < n; k++) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        vector<int> triplet = {nums[i], nums[j], nums[k]};
                        sort(triplet.begin(), triplet.end());
                        resultSet.insert(triplet);
                    }
                }
            }
        }
        return vector<vector<int>>(resultSet.begin(), resultSet.end());
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '결과 Set 초기화',
                                desc: `중복 조합 방지를 위해 set 사용.
[-1,0,1]과 [0,-1,1]은 같은 조합 → 정렬 후 set에 넣으면 중복 제거!`,
                                code: `class Solution:
    def threeSum(self, nums):
        result = set()  # 중복 조합 자동 제거
        n = len(nums)`
                            },
                            {
                                title: '삼중 for문',
                                desc: `모든 (i, j, k) 조합을 하나씩 확인.
O(n³) — 가장 직관적이지만 느린 방법.`,
                                code: `        for i in range(n):
            for j in range(i + 1, n):
                for k in range(j + 1, n):`
                            },
                            {
                                title: '합 확인 + 중복 제거',
                                desc: `합이 0이면 정렬된 튜플로 set에 추가.
sorted → 순서 무관하게 같은 조합이면 같은 튜플!`,
                                code: `                    if nums[i] + nums[j] + nums[k] == 0:
                        triplet = tuple(sorted([nums[i], nums[j], nums[k]]))
                        result.add(triplet)  # set이므로 중복 자동 제거`
                            },
                            {
                                title: '결과 변환',
                                desc: 'set의 튜플들을 리스트로 변환하여 반환.',
                                code: '        return [list(t) for t in result]'
                            }
                        ],
                        cpp: [
                            {
                                title: 'Set 초기화',
                                desc: `중복 제거를 위해 set<vector<int>> 사용.
정렬된 vector를 넣으면 동일 조합 자동 제거.`,
                                code: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        set<vector<int>> resultSet; // 중복 제거
        int n = nums.size();`
                            },
                            {
                                title: '삼중 for문 + 합 확인',
                                desc: `모든 (i,j,k) 조합을 확인 → O(n³).
합이 0이면 정렬 후 set에 삽입.`,
                                code: `        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                for (int k = j + 1; k < n; k++) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        vector<int> triplet = {nums[i], nums[j], nums[k]};
                        sort(triplet.begin(), triplet.end());
                        resultSet.insert(triplet);
                    }
                }
            }
        }`
                            },
                            {
                                title: '결과 반환',
                                desc: 'set → vector로 변환하여 반환.',
                                code: `        return vector<vector<int>>(resultSet.begin(), resultSet.end());
    }
};`
                            }
                        ]
                    }
                },
                {
                    approach: '정렬 + 투 포인터',
                    description: '정렬 후 하나를 고정하고, 나머지 두 수를 투 포인터로 탐색',
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `class Solution:
    def threeSum(self, nums):
        nums.sort()
        result = []
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            left, right = i + 1, len(nums) - 1
            while left < right:
                s = nums[i] + nums[left] + nums[right]
                if s == 0:
                    result.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]: left += 1
                    while left < right and nums[right] == nums[right - 1]: right -= 1
                    left += 1; right -= 1
                elif s < 0:
                    left += 1
                else:
                    right -= 1
        return result`,
                        cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        for (int i = 0; i < (int)nums.size() - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];
                if (s == 0) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l+1]) l++;
                    while (l < r && nums[r] == nums[r-1]) r--;
                    l++; r--;
                } else if (s < 0) l++;
                else r--;
            }
        }
        return res;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '정렬',
                                desc: `핵심: 정렬하면 투 포인터를 쓸 수 있다!
정렬된 배열에서 합이 작으면 left↑, 크면 right↓로 좁히기.`,
                                code: `class Solution:
    def threeSum(self, nums):
        nums.sort()  # 정렬 → 투 포인터 사용 가능!
        result = []`
                            },
                            {
                                title: '첫 번째 수 고정 + 중복 건너뛰기',
                                desc: `i를 하나 고정하고 나머지 두 수를 투 포인터로 찾습니다.
같은 값의 i를 건너뛰어야 중복 조합 방지!`,
                                code: `        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:  # 중복 건너뛰기
                continue`
                            },
                            {
                                title: '투 포인터 설정',
                                desc: `left = i 바로 다음, right = 배열 끝.
이 두 포인터가 서로 만날 때까지 좁혀갑니다.`,
                                code: '            left, right = i + 1, len(nums) - 1'
                            },
                            {
                                title: '합 비교 + 포인터 이동',
                                desc: `합 == 0 → 정답! 결과에 추가 후 중복 건너뛰기.
합 < 0 → 더 큰 값 필요 → left++
합 > 0 → 더 작은 값 필요 → right--`,
                                code: `            while left < right:
                s = nums[i] + nums[left] + nums[right]
                if s == 0:
                    result.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]: left += 1
                    while left < right and nums[right] == nums[right - 1]: right -= 1
                    left += 1; right -= 1
                elif s < 0:   # 합이 작다 → left 오른쪽으로
                    left += 1
                else:          # 합이 크다 → right 왼쪽으로
                    right -= 1`
                            },
                            {
                                title: '결과 반환',
                                desc: `O(n²) — 정렬 O(n log n) + 각 i에 투 포인터 O(n)
O(n³) 브루트포스보다 훨씬 빠릅니다!`,
                                code: '        return result'
                            }
                        ],
                        cpp: [
                            {
                                title: '정렬 + 초기화',
                                desc: `정렬하면 투 포인터 사용 가능!
합이 작으면 left↑, 크면 right↓로 좁히기.`,
                                code: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end()); // 정렬 → 투 포인터!
        vector<vector<int>> res;`
                            },
                            {
                                title: 'i 고정 + 중복 건너뛰기',
                                desc: `i를 고정 후 나머지를 투 포인터로 찾음.
같은 값 건너뛰기 → 중복 조합 방지!`,
                                code: `        for (int i = 0; i < (int)nums.size() - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue; // 중복 skip`
                            },
                            {
                                title: '투 포인터 탐색',
                                desc: `합 == 0 → 정답! 중복 건너뛰고 양쪽 이동.
합 < 0 → left++, 합 > 0 → right--`,
                                code: `            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];
                if (s == 0) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l+1]) l++;
                    while (l < r && nums[r] == nums[r-1]) r--;
                    l++; r--;
                } else if (s < 0) l++;  // 합 작다 → left 이동
                else r--;               // 합 크다 → right 이동
            }
        }
        return res;
    }
};`
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
