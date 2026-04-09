import type { AlgoTopic } from '../types'

export const hashTableTopic: AlgoTopic = {
    id: 'hashtable',
    title: '해시 테이블',
    icon: '🗂️',
    category: '기초 (Bronze~Silver)',
    order: 4,
    description: '이름표를 붙여서 한 번에 찾기! 딕셔너리와 집합 활용',
    titleEn: 'Hash Tables',
    categoryEn: 'Basics (Bronze~Silver)',
    descriptionEn: 'Instant lookup with labels — using dictionaries and sets',
    track: 'both',
    stages: [
        {
            num: 1,
            title: '숫자 카드',
            titleEn: 'Number Cards',
            problemIds: [
                'boj-10815'
            ],
            desc: '해시 기반 O(1) 탐색',
            descEn: 'Hash-based O(1) lookup'
        },
        {
            num: 2,
            title: '해시맵 기본',
            titleEn: 'HashMap Basics',
            problemIds: [
                'lc-217',
                'boj-7785'
            ],
            desc: '빈도수, 존재 확인, 집합 (Easy~Silver)',
            descEn: 'Frequency counting, existence checks, sets (Easy~Silver)'
        },
        {
            num: 3,
            title: '해시맵 응용',
            titleEn: 'HashMap Applications',
            problemIds: [
                'lc-3',
                'lc-560'
            ],
            desc: '슬라이딩 윈도우, 연속 부분 배열 (Medium~Gold)',
            descEn: 'Sliding window, contiguous subarray problems (Medium~Gold)'
        }
    ],
    problems: [
        {
            id: 'boj-10815',
            title: 'BOJ 10815 - 숫자 카드',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/10815',
            simIntro: '카드를 set에 넣고, 각 수에 대해 O(1) 탐색하는 과정을 확인해보세요!',
            sim: {
                type: 'numCard'
            },
            descriptionHTML: `<h3>문제</h3>
                <p>숫자 카드는 정수 하나가 적혀져 있는 카드이다. 상근이는 숫자 카드 N장을 가지고 있다. 정수 M개가 주어졌을 때, 이 수가 적혀있는 숫자 카드를 상근이가 가지고 있는지 아닌지를 구하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 상근이가 가지고 있는 숫자 카드의 개수 N (1 &le; N &le; 500,000)이 주어진다. 둘째 줄에는 숫자 카드에 적혀있는 정수가 주어진다. 숫자 카드에 적혀있는 수는 -10,000,000보다 크거나 같고, 10,000,000보다 작거나 같다.</p>
                <p>셋째 줄에는 M (1 &le; M &le; 500,000)이 주어진다. 넷째 줄에는 상근이가 가지고 있는 숫자 카드인지 아닌지를 구해야 할 M개의 정수가 주어지며, 이 수는 공백으로 구분되어 있다. 이 수도 -10,000,000보다 크거나 같고, 10,000,000보다 작거나 같다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 입력으로 주어진 M개의 수에 대해서, 각 수가 적힌 숫자 카드를 상근이가 가지고 있으면 1을, 아니면 0을 공백으로 구분해 출력한다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5
6 3 2 10 -10
8
10 9 -5 2 3 4 5 -10</pre></div>
                    <div><strong>출력</strong><pre>1 0 0 1 1 0 0 1</pre></div>
                </div>
                <p class="example-explain">카드 {6, 3, 2, 10, -10}을 가지고 있을 때, 10→있음(1), 9→없음(0), -5→없음(0), 2→있음(1), 3→있음(1), 4→없음(0), 5→없음(0), -10→있음(1)</p>
                </div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 500,000</li>
                    <li>1 ≤ M ≤ 500,000</li>
                    <li>카드에 적힌 수: -10,000,000 ≤ x ≤ 10,000,000</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법은?',
                    content: 'M개의 수 각각에 대해 N장의 카드를 하나씩 비교하면 될 것 같아요.<br>이중 for문으로 모든 조합을 확인하면 됩니다!<br><br>근데… N과 M이 최대 <strong>50만</strong>이면?<div style="display:flex;gap:14px;margin:14px 0;align-items:end;justify-content:center;"><div style="text-align:center;"><div style="background:#ff6b6b;width:52px;height:90px;border-radius:8px;display:flex;align-items:end;justify-content:center;padding-bottom:6px;color:white;font-size:0.75rem;font-weight:700;">O(N×M)</div><div style="font-size:0.75rem;margin-top:4px;color:var(--text3);">이중 for문</div></div><div style="text-align:center;"><div style="background:#51cf66;width:52px;height:18px;border-radius:8px;display:flex;align-items:end;justify-content:center;padding-bottom:4px;color:white;font-size:0.75rem;font-weight:700;">O(N+M)</div><div style="font-size:0.75rem;margin-top:4px;color:var(--text3);">Set 활용</div></div></div>2,500억 번 비교… 시간 초과!'
                },
                {
                    title: '"가지고 있나?" → 빠르게 찾는 방법',
                    content: '카드 번호들을 <strong>어딘가에 저장</strong>해두고, 각 수에 대해 "이 번호가 있나?"를 빠르게 확인하면 돼요.<br><br>배열을 처음부터 끝까지 보는 건 O(n)… 더 빠른 방법이 있을까요?<br><br><strong>Set(집합)</strong>을 쓰면 "이 값이 있나?"를 <strong>O(1)</strong>에 확인할 수 있어요!<br><span class="lang-py">Python: <code>set()</code>의 <code>in</code> 연산자 → O(1)</span><span class="lang-cpp">C++: <code>unordered_set</code>의 <code>count()</code> → O(1)</span>'
                },
                {
                    title: 'Set으로 풀어보자',
                    content: '① 카드 N장의 숫자를 set에 넣는다 → O(N)<br>② M개의 수 각각에 대해 set에 있는지 확인 → O(1) × M = O(M)<br><br>전체: <strong>O(N + M)</strong> — 이중 for문의 O(N×M)보다 훨씬 빠릅니다!<br><br><span class="lang-py"><code>cards = set(map(int, input().split()))</code><br><code>1 if x in cards else 0</code></span><span class="lang-cpp"><code>unordered_set&lt;int&gt; cards(arr, arr+n);</code><br><code>cards.count(x) ? 1 : 0</code></span>'
                },
                {
                    title: '정렬 + 이분탐색으로도 풀 수 있어요',
                    content: '카드를 <strong>정렬</strong>한 뒤, 각 수에 대해 <strong>이분탐색</strong>으로 찾으면?<br>정렬 O(N log N) + 탐색 O(M log N) = <strong>O((N+M) log N)</strong><br><br>Set 풀이의 O(N+M)보다는 느리지만, 충분히 빠르고 추가 메모리도 적게 씁니다.<br><br><span class="lang-py"><code>bisect_left</code>: 정렬된 배열에서 삽입 위치를 이분탐색으로 찾는 함수</span><span class="lang-cpp"><code>binary_search</code>: 정렬된 배열에서 값이 존재하는지 이분탐색으로 확인</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
cards = set(map(int, input().split()))  # set에 카드 저장 → O(N)
m = int(input())
queries = list(map(int, input().split()))

# 각 수에 대해 set에 있는지 O(1) 확인
print(' '.join('1' if x in cards else '0' for x in queries))`,
                cpp: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    int n; scanf("%d", &n);
    unordered_set<int> cards;
    for (int i = 0; i < n; i++) {
        int x; scanf("%d", &x);
        cards.insert(x);  // set에 카드 저장 → O(1) 삽입
    }
    int m; scanf("%d", &m);
    for (int i = 0; i < m; i++) {
        int x; scanf("%d", &x);
        // O(1) 존재 확인
        printf("%d ", cards.count(x) ? 1 : 0);
    }
}`
            },
            solutions: [
                {
                    approach: '브루트포스',
                    description: '각 수에 대해 카드 배열을 전부 탐색하여 존재 여부 확인',
                    timeComplexity: 'O(N × M)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
cards = list(map(int, input().split()))
m = int(input())
queries = list(map(int, input().split()))

result = []
for q in queries:
    found = 0
    for c in cards:       # 매번 N장 전부 확인 → O(N)
        if c == q:
            found = 1
            break
    result.append(str(found))
print(' '.join(result))`,
                        cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; scanf("%d", &n);
    vector<int> cards(n);
    for (int i = 0; i < n; i++) scanf("%d", &cards[i]);
    int m; scanf("%d", &m);
    for (int i = 0; i < m; i++) {
        int x; scanf("%d", &x);
        int found = 0;
        for (int j = 0; j < n; j++) {  // 매번 N장 전부 확인
            if (cards[j] == x) { found = 1; break; }
        }
        printf("%d ", found);
    }
}`
                    }
                },
                {
                    approach: 'Set 활용',
                    description: '카드를 set에 저장하고 O(1)에 존재 여부 확인',
                    timeComplexity: 'O(N + M)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
cards = set(map(int, input().split()))  # set에 카드 저장 → O(N)
m = int(input())
queries = list(map(int, input().split()))

# 각 수에 대해 set에 있는지 O(1) 확인
print(' '.join('1' if x in cards else '0' for x in queries))`,
                        cpp: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    int n; scanf("%d", &n);
    unordered_set<int> cards;
    for (int i = 0; i < n; i++) {
        int x; scanf("%d", &x);
        cards.insert(x);  // set에 카드 저장 → O(1) 삽입
    }
    int m; scanf("%d", &m);
    for (int i = 0; i < m; i++) {
        int x; scanf("%d", &x);
        // O(1) 존재 확인
        printf("%d ", cards.count(x) ? 1 : 0);
    }
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 받기',
                                desc: `BOJ는 입력이 많을 수 있으므로 sys.stdin.readline으로
빠른 입력을 설정합니다.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())`
                            },
                            {
                                title: '카드를 set에 저장',
                                desc: `핵심: set은 "이 값이 있나?"를 O(1)에 확인!
N장의 카드를 set에 넣으면 이후 조회가 빠릅니다.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
cards = set(map(int, input().split()))  # O(N)으로 set 생성`
                            },
                            {
                                title: 'M개의 수 확인',
                                desc: `각 수에 대해 "in cards"로 O(1) 확인!
set의 해시 기반 조회 덕분에 전체 O(M)으로 처리됩니다.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
cards = set(map(int, input().split()))  # O(N)으로 set 생성
m = int(input())
queries = list(map(int, input().split()))

# 각 수: set에 있나? → O(1) × M번 = O(M)
print(' '.join('1' if x in cards else '0' for x in queries))`
                            }
                        ],
                        cpp: [
                            {
                                title: '헤더 + set 선언',
                                desc: `unordered_set은 해시 기반이라 조회가 O(1)!
set(트리 기반)은 O(log N)이므로 unordered_set을 선택합니다.`,
                                code: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    int n; scanf("%d", &n);
    unordered_set<int> cards;`
                            },
                            {
                                title: '카드 저장',
                                desc: `N장의 카드를 하나씩 읽어서 unordered_set에 삽입합니다.
삽입도 평균 O(1)이므로 전체 O(N).`,
                                code: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    int n; scanf("%d", &n);
    unordered_set<int> cards;
    for (int i = 0; i < n; i++) {
        int x; scanf("%d", &x);
        cards.insert(x);  // O(1) 삽입
    }`
                            },
                            {
                                title: '쿼리 처리 + 출력',
                                desc: `count()로 존재 여부를 O(1)에 확인.
있으면 1, 없으면 0을 출력합니다.`,
                                code: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    int n; scanf("%d", &n);
    unordered_set<int> cards;
    for (int i = 0; i < n; i++) {
        int x; scanf("%d", &x);
        cards.insert(x);  // O(1) 삽입
    }
    int m; scanf("%d", &m);
    for (int i = 0; i < m; i++) {
        int x; scanf("%d", &x);
        printf("%d ", cards.count(x) ? 1 : 0);  // O(1) 조회
    }
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-217',
            title: 'LeetCode 217 - Contains Duplicate',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/contains-duplicate/',
            simIntro: '배열을 순회하면서 해시셋에 원소를 넣고, 중복을 탐지하는 과정을 확인해보세요!',
            sim: {
                type: 'containsDup'
            },
            descriptionHTML: `<h3>문제</h3>
                <p>정수 배열 <code>nums</code>에 <strong>중복된 원소</strong>가 있으면 <code>true</code>, 없으면 <code>false</code>를 반환하세요.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [1,2,3,1]</pre></div>
                    <div><strong>출력</strong><pre>true</pre></div>
                </div></div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [1,2,3,4]</pre></div>
                    <div><strong>출력</strong><pre>false</pre></div>
                </div></div>

                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [1,1,1,3,3,4,3,2,4,2]</pre></div>
                    <div><strong>출력</strong><pre>true</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ nums.length ≤ 10⁵</li>
                    <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                </ul>

                <h4>💡 Follow-up</h4>
                <p>정렬을 이용하면 추가 공간 없이 풀 수 있을까요?</p>`,
            hints: [
                {
                    title: '문제를 쉽게 이해해보자',
                    content: '<code>[1, 2, 3, 1]</code>에서 <strong>1이 두 번</strong> 나오니까 중복이 있어요 → <code>true</code>.<br><code>[1, 2, 3, 4]</code>는 전부 다른 숫자 → <code>false</code>.<br>결국 <strong>"같은 숫자가 두 번 이상 나오는지"</strong>만 확인하면 됩니다!'
                },
                {
                    title: '가장 단순한 방법은?',
                    content: '모든 숫자 쌍을 비교하는 거예요. 첫 번째 숫자를 나머지 전부와 비교, 두 번째도 전부와 비교…<br>이중 for문이면 되지만, 숫자가 <strong>10만 개</strong>면 약 <strong>50억 번</strong> 비교해야 해요! 너무 느립니다 😱'
                },
                {
                    title: '"전에 본 적 있나?" 기억하기',
                    content: '숫자를 하나씩 보면서, <strong>"이 숫자를 전에 본 적 있나?"</strong>를 확인하면 어떨까요?<br>본 숫자들을 어딘가에 저장해두면 됩니다. 어떤 자료구조가 좋을까요?'
                },
                {
                    title: 'Set(집합)을 쓰면 O(1)!',
                    content: 'Set은 "이 값이 있나?"를 <strong>O(1)</strong>에 확인해줘요!<div style="margin:14px 0;padding:14px;background:var(--bg2);border-radius:10px;"><div style="display:flex;gap:4px;margin-bottom:10px;align-items:center;justify-content:center;"><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;">1</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;">2</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;">3</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#fdcb6e;color:#2d3436;border-radius:8px;font-weight:700;box-shadow:0 0 8px rgba(253,203,110,0.5);">1</span><span style="font-size:1.2em;margin-left:6px;">← 확인!</span></div><div style="text-align:center;"><span style="background:#00b894;color:white;padding:4px 12px;border-radius:6px;font-weight:600;font-size:0.85em;">seen = {1, 2, 3}</span><span style="margin-left:8px;">→ 1이 있다! <strong>중복!</strong></span></div></div>① 숫자를 하나 꺼냄<br>② set에 이미 있나? → 있으면 <code>true</code> 반환!<br>③ 없으면 set에 추가하고 다음 숫자로<br><br><span class="lang-py">Python: <code>set()</code> → <code>in</code>으로 확인, <code>add()</code>로 추가</span><span class="lang-cpp">C++: <code>unordered_set&lt;int&gt;</code> → <code>count()</code>로 확인, <code>insert()</code>로 추가</span><br><br>배열 전체를 한 번만 보니까 <strong>O(n)</strong>이에요.'
                },
                {
                    title: '정렬로도 풀 수 있어요',
                    content: '배열을 정렬하면 같은 숫자가 <strong>나란히</strong> 놓입니다.<br><code>[1, 3, 1, 2]</code> → 정렬 → <code>[1, 1, 2, 3]</code><br>옆 칸이랑만 비교하면 되니까 간단해요!<br>대신 정렬에 <strong>O(n log n)</strong>이 걸리고, set 풀이의 O(n)보다는 느립니다.'
                }
            ],
            templates: {
                python: `class Solution:
    def containsDuplicate(self, nums):
        seen = set()
        for n in nums:
            if n in seen: return True
            seen.add(n)
        return False`,
                cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true;
            seen.insert(n);
        }
        return false;
    }
};`
            },
            solutions: [
                {
                    approach: '브루트포스',
                    description: '이중 for문으로 모든 쌍을 비교하여 중복을 확인',
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `class Solution:
    def containsDuplicate(self, nums):
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] == nums[j]:
                    return True
        return False`,
                        cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++)
            for (int j = i + 1; j < nums.size(); j++)
                if (nums[i] == nums[j]) return true;
        return false;
    }
};`
                    }
                },
                {
                    approach: '해시셋',
                    description: '해시셋으로 O(1) 존재 확인하며 순회',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `class Solution:
    def containsDuplicate(self, nums):
        seen = set()
        for n in nums:
            if n in seen: return True
            seen.add(n)
        return False`,
                        cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true;
            seen.insert(n);
        }
        return false;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '함수 정의',
                                desc: '정수 배열 nums에 중복이 있는지 확인합니다.',
                                code: `class Solution:
    def containsDuplicate(self, nums):`
                            },
                            {
                                title: '해시셋 초기화',
                                desc: `set은 "이 숫자 본 적 있나?"를 O(1)에 확인 가능!
리스트의 in은 O(n)이지만 set의 in은 O(1)입니다.`,
                                code: `class Solution:
    def containsDuplicate(self, nums):
        # set → O(1)로 포함 여부 확인 가능
        seen = set()`
                            },
                            {
                                title: '순회하며 중복 체크',
                                desc: `이미 본 숫자면 바로 True 반환 (중복 발견!)
처음 보는 숫자면 set에 추가하여 기록합니다.`,
                                code: `class Solution:
    def containsDuplicate(self, nums):
        seen = set()
        for n in nums:
            if n in seen:      # 이미 본 적 있으면 → 중복!
                return True
            seen.add(n)        # 처음 보는 숫자 → 기록`
                            },
                            {
                                title: '결과 반환',
                                desc: '모든 숫자를 확인했는데 중복이 없었으면 False입니다.',
                                code: `class Solution:
    def containsDuplicate(self, nums):
        seen = set()
        for n in nums:
            if n in seen:
                return True
            seen.add(n)
        return False  # 끝까지 중복 없음`
                            }
                        ],
                        cpp: [
                            {
                                title: '함수 정의 + 셋 초기화',
                                desc: 'unordered_set은 O(1)로 포함 여부 확인이 가능합니다.',
                                code: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // O(1) 조회 가능한 해시셋
        unordered_set<int> seen;`
                            },
                            {
                                title: '순회하며 중복 체크',
                                desc: '이미 있으면 true (중복!), 없으면 삽입하여 기록합니다.',
                                code: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true; // 중복!
            seen.insert(n); // 기록
        }`
                            },
                            {
                                title: '결과 반환',
                                desc: '끝까지 중복 없으면 false입니다.',
                                code: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true;
            seen.insert(n);
        }
        return false;
    }
};`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-7785',
            title: 'BOJ 7785 - 회사에 있는 사람',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/7785',
            simIntro: '출입 기록을 처리하면서 집합(set)에 사람을 추가/제거하는 과정을 확인해보세요!',
            sim: {
                type: 'company'
            },
            descriptionHTML: `<h3>문제</h3>
                <p>출입 기록이 주어집니다. <code>"enter"</code>면 입장, <code>"leave"</code>면 퇴장입니다.
                현재 회사에 <strong>남아있는 사람</strong>을 사전 역순으로 출력하세요.</p>
                <h4>입력</h4>
                <p>첫째 줄에 출입 기록의 수 n (1 &le; n &le; 10<sup>6</sup>)이 주어진다. 다음 n개의 줄에는 각 직원의 이름과 "enter" 또는 "leave"가 주어진다. 이름은 알파벳 대소문자로 이루어져 있으며, 길이는 1 이상 20 이하이다.</p>
                <h4>출력</h4>
                <p>현재 회사에 있는 모든 사람을 사전 역순으로 한 줄에 한 명씩 출력한다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4
Baha enter
Asber enter
Baha leave
Artem enter</pre></div>
                    <div><strong>출력</strong><pre>Asber
Artem</pre></div>
                </div>
                <p class="example-explain">Baha는 퇴장했으므로, 남은 Asber와 Artem을 사전 역순으로 출력</p>
                </div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>2
Kim enter
Kim leave</pre></div>
                    <div><strong>출력</strong><pre>(없음)</pre></div>
                </div>
                <p class="example-explain">모든 사람이 퇴장하여 아무도 남지 않음</p>
                </div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ n ≤ 10⁶</li>
                    <li>이름은 알파벳 대소문자, 길이 1~20</li>
                    <li>같은 이름이 두 번 enter하는 경우는 없음</li>
                </ul>

                <h4>💡 Follow-up</h4>
                <p>삽입/삭제가 O(1)인 자료구조는 무엇일까요?</p>`,
            hints: [
                {
                    title: '문제를 쉽게 이해해보자',
                    content: '회사 출입문에 카드를 찍어요.<br><code>enter</code> = 출근 (회사에 들어옴)<br><code>leave</code> = 퇴근 (회사에서 나감)<br><br>모든 기록을 다 처리한 뒤, <strong>지금 회사에 남아있는 사람</strong>을 출력하면 됩니다!'
                },
                {
                    title: '어떤 자료구조가 좋을까?',
                    content: '사람이 <strong>들어오면 추가, 나가면 제거</strong>해야 해요.<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0;"><div style="background:rgba(255,107,107,0.1);border:1px solid rgba(255,107,107,0.3);border-radius:10px;padding:12px;text-align:center;"><div style="font-weight:700;color:#ff6b6b;margin-bottom:4px;">리스트</div><div style="font-size:0.85em;">제거: O(n) — 이름 찾기 느림</div></div><div style="background:rgba(81,207,102,0.1);border:1px solid rgba(81,207,102,0.3);border-radius:10px;padding:12px;text-align:center;"><div style="font-weight:700;color:#51cf66;margin-bottom:4px;">Set(집합)</div><div style="font-size:0.85em;">추가/제거: O(1) — 빠름!</div></div></div><span class="lang-py">Python: <code>set.add()</code> / <code>set.discard()</code></span><span class="lang-cpp">C++: <code>set&lt;string&gt;</code>의 <code>insert()</code> / <code>erase()</code></span>'
                },
                {
                    title: 'Set으로 풀어보자',
                    content: '빈 set을 만들고, 기록을 하나씩 읽어요:<br><br>① <code>"Baha enter"</code> → set에 Baha 추가<br>② <code>"Asher enter"</code> → set에 Asher 추가<br>③ <code>"Baha leave"</code> → set에서 Baha 제거<br><br>끝! set에 남은 사람 = 회사에 있는 사람'
                },
                {
                    title: '사전 역순으로 출력하기',
                    content: '남은 사람들을 <strong>사전 역순(Z→A)</strong>으로 출력해야 해요.<br><span class="lang-py">Python: <code>sorted(company, reverse=True)</code></span><span class="lang-cpp">C++: <code>set&lt;string, greater&lt;string&gt;&gt;</code>로 자동 역순, 또는 <code>rbegin()</code>~<code>rend()</code>로 역순 순회</span><br><br>예: {Asher, Cam} → 역순 → Cam, Asher 순서로 출력!'
                },
                {
                    title: '시간 복잡도',
                    content: '기록 n개를 처리: set 추가/제거 각 O(1) → <strong>O(n)</strong><br>남은 m명 정렬: <strong>O(m log m)</strong><br><br>전체: <strong>O(n + m log m)</strong>이에요.'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
company = set()

for _ in range(n):
    name, action = input().split()
    if action == 'enter':
        company.add(name)
    else:
        company.discard(name)

for name in sorted(company, reverse=True):
    print(name)`,
                cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <set>
using namespace std;

int main() {
    int n; scanf("%d", &n);
    set<string, greater<string>> company;
    while (n--) {
        char name[20], action[10];
        scanf("%s %s", name, action);
        if (action[0] == 'e') company.insert(name);
        else company.erase(name);
    }
    for (auto& s : company) printf("%s\\n", s.c_str());
}`
            },
            solutions: [
                {
                    approach: '브루트포스 (리스트)',
                    description: '리스트에 추가/선형 탐색 제거 후 정렬',
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
company = []

for _ in range(n):
    name, action = input().split()
    if action == 'enter':
        company.append(name)
    else:
        company.remove(name)  # O(n) 선형 탐색

company.sort(reverse=True)
for name in company:
    print(name)`,
                        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    int n; scanf("%d", &n);
    vector<string> company;
    while (n--) {
        char name[20], action[10];
        scanf("%s %s", name, action);
        if (action[0] == 'e') {
            company.push_back(name);
        } else {
            // O(n) 선형 탐색 + 삭제
            auto it = find(company.begin(), company.end(), string(name));
            if (it != company.end()) company.erase(it);
        }
    }
    sort(company.rbegin(), company.rend());
    for (auto& s : company) printf("%s\\n", s.c_str());
}`
                    }
                },
                {
                    approach: '집합(Set) 활용',
                    description: 'enter시 add, leave시 remove 후 사전 역순 정렬',
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `class Solution:
    def subarraySum(self, nums, k):
        # {누적합: 등장 횟수} 기록
        # {0: 1} → 시작 전(합=0)이 1번 있음
        prefix_count = {0: 1}
        prefix_sum = 0  # 처음~현재까지의 누적합
        count = 0       # 합이 k인 부분 배열 개수
        for num in nums:
            prefix_sum += num  # 누적합 갱신
            # 핵심: prefix_sum - k가 이전에 나왔다면
            # → 그 지점 ~ 현재 구간의 합 = k!
            if (prefix_sum - k) in prefix_count:
                count += prefix_count[prefix_sum - k]
            # 현재 누적합 기록 → 뒤의 원소가 이 값을 찾음
            if prefix_sum in prefix_count:
                prefix_count[prefix_sum] += 1
            else:
                prefix_count[prefix_sum] = 1
        return count`,
                        cpp: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        // {누적합: 등장 횟수} - 합=0인 시작점 1개
        unordered_map<int, int> pc;
        pc[0] = 1;
        int sum = 0, cnt = 0; // 누적합, 결과 카운트
        for (int n : nums) {
            sum += n; // 누적합 갱신
            // sum - k가 이전에 나왔다면 → 구간 합 = k
            if (pc.count(sum - k)) cnt += pc[sum - k];
            pc[sum]++; // 현재 누적합 기록
        }
        return cnt;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 설정',
                                desc: `BOJ는 입력이 많을 수 있으므로 sys.stdin.readline으로
빠른 입력을 설정합니다.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())`
                            },
                            {
                                title: '집합(Set) 초기화',
                                desc: `핵심: set은 add/discard가 O(1)!
리스트의 remove는 O(n)이므로, 출입이 잦으면 set이 훨씬 빠릅니다.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
company = set()  # set → add/discard O(1)`
                            },
                            {
                                title: '출입 기록 처리',
                                desc: `enter → add로 추가, leave → discard로 제거.
discard는 없는 원소여도 에러가 나지 않아 안전합니다.
(remove는 없으면 KeyError 발생!)`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
company = set()  # set → add/discard O(1)

for _ in range(n):
    name, action = input().split()
    if action == "enter":
        company.add(name)      # O(1) 추가
    else:
        company.discard(name)  # O(1) 제거 (없어도 OK)`
                            },
                            {
                                title: '사전 역순 출력',
                                desc: `sorted()로 정렬 후 reverse=True로 역순 출력.
set은 순서가 없으므로 출력 전 반드시 정렬해야 합니다.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
company = set()  # set → add/discard O(1)

for _ in range(n):
    name, action = input().split()
    if action == "enter":
        company.add(name)      # O(1) 추가
    else:
        company.discard(name)  # O(1) 제거 (없어도 OK)

# set은 순서 없음 → sorted()로 정렬 필요
for name in sorted(company, reverse=True):
    print(name)`
                            }
                        ],
                        cpp: [
                            {
                                title: '헤더 + 역순 set',
                                desc: `C++ set은 자동 정렬됨! greater<string>을 넣으면
삽입할 때마다 사전 역순으로 자동 정렬됩니다.
→ 마지막에 따로 sort할 필요 없음`,
                                code: `#include <iostream>
#include <string>
#include <set>
using namespace std;

int main() {
    int n; scanf("%d", &n);
    // greater → 삽입 시 자동 역순 정렬
    set<string, greater<string>> company;`
                            },
                            {
                                title: '출입 기록 처리',
                                desc: `insert/erase 모두 O(log n) — 리스트의 O(n)보다 빠름.
action[0] == 'e'로 간단히 enter/leave 구분합니다.`,
                                code: `#include <iostream>
#include <string>
#include <set>
using namespace std;

int main() {
    int n; scanf("%d", &n);
    // greater → 삽입 시 자동 역순 정렬
    set<string, greater<string>> company;
    while (n--) {
        char name[20], action[10];
        scanf("%s %s", name, action);
        if (action[0] == 'e') company.insert(name);  // O(log n)
        else company.erase(name);                     // O(log n)
    }`
                            },
                            {
                                title: '결과 출력',
                                desc: `set<greater>는 이미 역순 정렬 상태!
추가 정렬 없이 순서대로 출력하면 됩니다.`,
                                code: `#include <iostream>
#include <string>
#include <set>
using namespace std;

int main() {
    int n; scanf("%d", &n);
    // greater → 삽입 시 자동 역순 정렬
    set<string, greater<string>> company;
    while (n--) {
        char name[20], action[10];
        scanf("%s %s", name, action);
        if (action[0] == 'e') company.insert(name);  // O(log n)
        else company.erase(name);                     // O(log n)
    }
    // 이미 역순 정렬 → 그대로 출력
    for (auto& s : company) printf("%s\\n", s.c_str());
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-3',
            title: 'LeetCode 3 - Longest Substring Without Repeating',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
            simIntro: '슬라이딩 윈도우와 해시맵으로 중복 없는 가장 긴 부분 문자열을 찾는 과정을 확인해보세요!',
            sim: {
                type: 'longestSub'
            },
            descriptionHTML: `<h3>문제</h3>
                <p>문자열 <code>s</code>에서 <strong>같은 글자가 없는 가장 긴 부분 문자열</strong>의 길이를 구하세요.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>s = "abcabcbb"</pre></div>
                    <div><strong>출력</strong><pre>3</pre></div>
                </div>
                <p class="example-explain">"abc"가 가장 긴 중복 없는 부분 문자열입니다.</p>
                </div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>s = "bbbbb"</pre></div>
                    <div><strong>출력</strong><pre>1</pre></div>
                </div>
                <p class="example-explain">"b" 한 글자가 최대입니다.</p>
                </div>

                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>s = "pwwkew"</pre></div>
                    <div><strong>출력</strong><pre>3</pre></div>
                </div>
                <p class="example-explain">"wke"가 답입니다. "pwke"는 부분 수열이지 부분 문자열이 아닙니다.</p>
                </div>

                <h4>제약 조건</h4>
                <ul>
                    <li>0 ≤ s.length ≤ 5 × 10⁴</li>
                    <li>s는 영문자, 숫자, 기호, 공백으로 구성</li>
                </ul>

                <h4>💡 Follow-up</h4>
                <p>O(n)으로 한 번 순회하면서 풀 수 있을까요?</p>`,
            hints: [
                {
                    title: '문제를 쉽게 이해해보자',
                    content: '<code>"abcabcbb"</code>에서 중복 없는 구간을 찾아보세요.<br><code>"abc"</code> → 3글자 (중복 없음 ✓)<br><code>"abca"</code> → a가 두 번! (중복 ✗)<br>이런 식으로 <strong>중복 없이 가장 긴 구간</strong>의 길이를 구하면 돼요.'
                },
                {
                    title: '모든 구간을 다 확인하면?',
                    content: '시작점과 끝점을 잡아서 모든 부분 문자열을 만들어볼 수 있어요.<br>근데 길이가 n이면 부분 문자열이 약 <strong>n²개</strong>… 너무 많습니다!'
                },
                {
                    title: '슬라이딩 윈도우 아이디어',
                    content: '창문을 밀듯이 <strong>시작점(L)</strong>과 <strong>끝점(R)</strong>을 오른쪽으로 이동해요.<div style="display:flex;gap:3px;align-items:center;margin:14px 0;padding:12px;background:var(--bg2);border-radius:10px;justify-content:center;flex-wrap:wrap;"><span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#dfe6e9;color:#b2bec3;border-radius:6px;font-weight:700;text-decoration:line-through;">p</span><span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;box-shadow:0 0 0 2px var(--green);">w</span><span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">k</span><span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;box-shadow:0 0 0 2px var(--green);">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#dfe6e9;color:#b2bec3;border-radius:6px;font-weight:700;">w</span></div><div style="display:flex;justify-content:center;gap:12px;margin-bottom:8px;font-size:0.85em;"><span style="color:var(--green);font-weight:600;">L→</span><span style="color:#6c5ce7;font-weight:600;">[w,k,e] = 3</span><span style="color:var(--green);font-weight:600;">←R</span></div>① 중복 없으면 → R을 오른쪽으로 (창문 넓히기)<br>② 중복 발생하면 → L을 오른쪽으로 (창문 좁히기)<br><br>이렇게 하면 모든 구간을 다 안 봐도 답을 찾을 수 있어요!'
                },
                {
                    title: '해시맵으로 중복 위치 기억하기',
                    content: '글자가 <strong>마지막으로 나타난 위치</strong>를 해시맵에 저장해두면,<br>중복이 생겼을 때 L을 어디로 옮겨야 하는지 바로 알 수 있어요!<br><br><span class="lang-py">Python: <code>seen = {"a": 0, "b": 1}</code> (dict)</span><span class="lang-cpp">C++: <code>unordered_map&lt;char, int&gt; seen;</code></span><br><br>"a"가 또 나오면 → L을 <code>seen["a"] + 1</code>로 이동!'
                },
                {
                    title: '시간 복잡도는 O(n)',
                    content: 'R이 오른쪽으로만 이동하고, L도 오른쪽으로만 이동합니다.<br>각 글자를 딱 한 번씩만 처리하니까 <strong>O(n)</strong>이에요!'
                }
            ],
            templates: {
                python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = {}
        start = max_len = 0
        for i, c in enumerate(s):
            if c in seen and seen[c] >= start:
                start = seen[c] + 1
            seen[c] = i
            max_len = max(max_len, i - start + 1)
        return max_len`,
                cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> seen;
        int start = 0, maxLen = 0;
        for (int i = 0; i < s.size(); i++) {
            if (seen.count(s[i]) && seen[s[i]] >= start)
                start = seen[s[i]] + 1;
            seen[s[i]] = i;
            maxLen = max(maxLen, i - start + 1);
        }
        return maxLen;
    }
};`
            },
            solutions: [
                {
                    approach: '브루트포스',
                    description: '모든 부분 문자열을 확인하여 중복 없는 최대 길이를 탐색',
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(min(m,n))',
                    templates: {
                        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        max_len = 0
        for i in range(len(s)):
            seen = set()
            for j in range(i, len(s)):
                if s[j] in seen:
                    break
                seen.add(s[j])
            max_len = max(max_len, len(seen))
        return max_len`,
                        cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int maxLen = 0;
        for (int i = 0; i < s.size(); i++) {
            unordered_set<char> seen;
            for (int j = i; j < s.size(); j++) {
                if (seen.count(s[j])) break;
                seen.insert(s[j]);
            }
            maxLen = max(maxLen, (int)seen.size());
        }
        return maxLen;
    }
};`
                    }
                },
                {
                    approach: '슬라이딩 윈도우 + 해시맵',
                    description: '해시맵으로 마지막 등장 위치를 기록하며 윈도우 확장',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(min(m,n))',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
company = set()

for _ in range(n):
    name, action = input().split()
    if action == 'enter':
        company.add(name)
    else:
        company.discard(name)

for name in sorted(company, reverse=True):
    print(name)`,
                        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <set>
using namespace std;

int main() {
    int n; scanf("%d", &n);
    set<string, greater<string>> company;
    while (n--) {
        char name[20], action[10];
        scanf("%s %s", name, action);
        if (action[0] == 'e') company.insert(name);
        else company.erase(name);
    }
    for (auto& s : company) printf("%s\\n", s.c_str());
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '함수 정의',
                                desc: '문자열 s에서 중복 없는 가장 긴 부분 문자열의 길이를 구합니다.',
                                code: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:`
                            },
                            {
                                title: '변수 초기화',
                                desc: `seen: 문자 → 마지막 등장 위치 (중복 체크용)
start: 현재 윈도우의 시작점
max_len: 지금까지 찾은 최대 길이`,
                                code: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = {}          # {문자: 마지막 위치}
        start = max_len = 0`
                            },
                            {
                                title: '문자열 순회',
                                desc: `한 글자씩 보면서 슬라이딩 윈도우를 관리합니다.
i는 윈도우의 끝(오른쪽), start는 시작(왼쪽)입니다.`,
                                code: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = {}
        start = max_len = 0
        for i, c in enumerate(s):`
                            },
                            {
                                title: '핵심: 중복 문자 처리',
                                desc: `핵심! 이미 본 문자가 현재 윈도우 안에 있다면,
start를 그 문자 다음으로 이동 → 중복 제거!
seen[c] >= start 조건이 "윈도우 안에 있는가"를 확인합니다.`,
                                code: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = {}
        start = max_len = 0
        for i, c in enumerate(s):
            # 윈도우 안에 같은 문자가 있으면
            # → start를 그 다음으로 이동 (중복 제거)
            if c in seen and seen[c] >= start:
                start = seen[c] + 1`
                            },
                            {
                                title: '위치 기록 + 길이 갱신',
                                desc: `현재 문자 위치를 기록하고,
윈도우 크기(i - start + 1)와 최대 길이를 비교합니다.`,
                                code: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = {}
        start = max_len = 0
        for i, c in enumerate(s):
            if c in seen and seen[c] >= start:
                start = seen[c] + 1
            seen[c] = i  # 현재 위치 기록
            max_len = max(max_len, i - start + 1)`
                            },
                            {
                                title: '결과 반환',
                                desc: '중복 없는 가장 긴 부분 문자열의 길이를 반환합니다.',
                                code: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = {}
        start = max_len = 0
        for i, c in enumerate(s):
            if c in seen and seen[c] >= start:
                start = seen[c] + 1
            seen[c] = i
            max_len = max(max_len, i - start + 1)
        return max_len`
                            }
                        ],
                        cpp: [
                            {
                                title: '함수 정의 + 초기화',
                                desc: `seen: 문자의 마지막 위치 기록 (O(1) 조회)
start: 윈도우 시작점, maxLen: 최대 길이`,
                                code: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> seen; // {문자: 위치}
        int start = 0, maxLen = 0;`
                            },
                            {
                                title: '순회 + 중복 처리',
                                desc: `윈도우 안에 같은 문자가 있으면 start를 이동하여 중복 제거,
현재 위치 기록 후 윈도우 크기를 최대값과 비교합니다.`,
                                code: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> seen;
        int start = 0, maxLen = 0;
        for (int i = 0; i < s.size(); i++) {
            // 윈도우 안에 중복 → start 이동
            if (seen.count(s[i]) && seen[s[i]] >= start)
                start = seen[s[i]] + 1;
            seen[s[i]] = i; // 위치 기록
            maxLen = max(maxLen, i - start + 1);
        }`
                            },
                            {
                                title: '결과 반환',
                                desc: '최대 길이를 반환합니다.',
                                code: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> seen;
        int start = 0, maxLen = 0;
        for (int i = 0; i < s.size(); i++) {
            if (seen.count(s[i]) && seen[s[i]] >= start)
                start = seen[s[i]] + 1;
            seen[s[i]] = i;
            maxLen = max(maxLen, i - start + 1);
        }
        return maxLen;
    }
};`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-560',
            title: 'LeetCode 560 - Subarray Sum Equals K',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/subarray-sum-equals-k/',
            simIntro: '누적합과 해시맵을 사용하여 합이 k인 부분 배열을 세는 과정을 단계별로 확인해보세요!',
            sim: {
                type: 'subarraySum'
            },
            descriptionHTML: `<h3>문제</h3>
                <p>정수 배열 <code>nums</code>와 정수 <code>k</code>가 주어집니다. 합이 <code>k</code>인 <strong>연속 부분 배열의 개수</strong>를 구하세요.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [1,1,1], k = 2</pre></div>
                    <div><strong>출력</strong><pre>2</pre></div>
                </div>
                <p class="example-explain">[1,1](인덱스 0~1)과 [1,1](1~2) 두 가지</p>
                </div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [1,2,3], k = 3</pre></div>
                    <div><strong>출력</strong><pre>2</pre></div>
                </div>
                <p class="example-explain">[1,2](인덱스 0~1)과 [3](2) 두 가지</p>
                </div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ nums.length ≤ 2 × 10⁴</li>
                    <li>-1000 ≤ nums[i] ≤ 1000</li>
                    <li>-10⁷ ≤ k ≤ 10⁷</li>
                </ul>

                <h4>💡 Follow-up</h4>
                <p>음수가 있어서 투 포인터가 안 됩니다. 누적합을 활용해보세요!</p>`,
            hints: [
                {
                    title: '문제를 쉽게 이해해보자',
                    content: '<code>[1, 1, 1]</code>에서 합이 2인 <strong>연속 구간</strong>을 찾아보세요.<br><code>[1,1]</code>(0~1번) 합 = 2 ✓<br><code>[1,1]</code>(1~2번) 합 = 2 ✓<br>→ 답은 <strong>2개</strong>입니다!'
                },
                {
                    title: '모든 구간을 다 확인하면?',
                    content: '시작점 i부터 끝점 j까지 합을 구하면 되지만,<br>이중 for문이라 <strong>O(n²)</strong>이에요. 더 빠른 방법이 있을까요?'
                },
                {
                    title: '누적합이란?',
                    content: '처음부터 현재까지의 합을 계속 기록하는 거예요.<div style="margin:14px 0;padding:14px;background:var(--bg2);border-radius:10px;"><div style="display:flex;gap:4px;margin-bottom:8px;justify-content:center;"><span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;">1</span><span style="font-size:0.7rem;color:var(--text3);">idx 0</span></span><span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;">2</span><span style="font-size:0.7rem;color:var(--text3);">idx 1</span></span><span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;">3</span><span style="font-size:0.7rem;color:var(--text3);">idx 2</span></span></div><div style="text-align:center;margin:6px 0;">⬇️ 누적합</div><div style="display:flex;gap:4px;justify-content:center;"><span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;">1</span></span><span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;">3</span></span><span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;">6</span></span></div></div>구간 [1~2]의 합 = 누적합[2] - 누적합[0] = 6 - 1 = <strong>5</strong><br>이렇게 뺄셈 한 번으로 구간 합을 바로 구할 수 있어요!'
                },
                {
                    title: '핵심 아이디어: 누적합 - k',
                    content: '지금까지 누적합이 <code>sum</code>인데,<br>이전에 <code>sum - k</code>인 지점이 있었다면?<br>그 지점부터 현재까지의 합이 정확히 <strong>k</strong>가 돼요!<br><br>해시맵에 {누적합: 등장 횟수}를 저장하면<br>"sum - k가 몇 번 나왔나?"를 <strong>O(1)</strong>에 확인 가능!'
                },
                {
                    title: '초기값을 잊지 마세요',
                    content: '<code>{0: 1}</code>로 시작해야 해요.<br>왜? 누적합 자체가 k인 경우를 놓치지 않기 위해서!<br><br>예: <code>[3]</code>, k=3 → 누적합 3, 3-3=0이 있어야 카운트됨.<br>{0: 1}이 없으면 이 경우를 못 찾아요.'
                }
            ],
            templates: {
                python: `class Solution:
    def subarraySum(self, nums, k):
        # {누적합: 등장 횟수} 기록
        # {0: 1} → 시작 전(합=0)이 1번 있음
        prefix_count = {0: 1}
        prefix_sum = 0  # 처음~현재까지의 누적합
        count = 0       # 합이 k인 부분 배열 개수
        for num in nums:
            prefix_sum += num  # 누적합 갱신
            # 핵심: prefix_sum - k가 이전에 나왔다면
            # → 그 지점 ~ 현재 구간의 합 = k!
            if (prefix_sum - k) in prefix_count:
                count += prefix_count[prefix_sum - k]
            # 현재 누적합 기록 → 뒤의 원소가 이 값을 찾음
            if prefix_sum in prefix_count:
                prefix_count[prefix_sum] += 1
            else:
                prefix_count[prefix_sum] = 1
        return count`,
                cpp: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        // {누적합: 등장 횟수} - 합=0인 시작점 1개
        unordered_map<int, int> pc;
        pc[0] = 1;
        int sum = 0, cnt = 0; // 누적합, 결과 카운트
        for (int n : nums) {
            sum += n; // 누적합 갱신
            // sum - k가 이전에 나왔다면 → 구간 합 = k
            if (pc.count(sum - k)) cnt += pc[sum - k];
            pc[sum]++; // 현재 누적합 기록
        }
        return cnt;
    }
};`
            },
            solutions: [
                {
                    approach: '브루트포스',
                    description: '이중 for문으로 모든 연속 부분 배열의 합을 확인',
                    timeComplexity: 'O(n²)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `class Solution:
    def subarraySum(self, nums, k):
        count = 0
        for i in range(len(nums)):
            total = 0
            for j in range(i, len(nums)):
                total += nums[j]
                if total == k:
                    count += 1
        return count`,
                        cpp: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int cnt = 0;
        for (int i = 0; i < nums.size(); i++) {
            int sum = 0;
            for (int j = i; j < nums.size(); j++) {
                sum += nums[j];
                if (sum == k) cnt++;
            }
        }
        return cnt;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '함수 정의 + 카운트',
                                desc: '합이 k인 연속 부분 배열의 개수를 셀 변수를 만듭니다.',
                                code: `class Solution:
    def subarraySum(self, nums, k):
        count = 0  # 합이 k인 부분 배열 개수`
                            },
                            {
                                title: '시작점 i 순회',
                                desc: `부분 배열의 시작 위치를 0부터 끝까지 시도합니다.
시작할 때마다 구간 합을 0으로 초기화합니다.`,
                                code: `class Solution:
    def subarraySum(self, nums, k):
        count = 0
        # 가능한 모든 시작점 i
        for i in range(len(nums)):
            total = 0  # i부터의 구간 합을 새로 시작`
                            },
                            {
                                title: '끝점 j 확장 + 합 비교',
                                desc: `끝점 j를 하나씩 늘리며 합을 누적합니다.
합이 k이면 카운트를 증가시킵니다.`,
                                code: `class Solution:
    def subarraySum(self, nums, k):
        count = 0
        for i in range(len(nums)):
            total = 0
            # 끝점 j를 하나씩 늘리면서 합 확인
            for j in range(i, len(nums)):
                total += nums[j]   # 원소를 하나 더 포함
                if total == k:     # 구간 합 = k이면 카운트!
                    count += 1`
                            },
                            {
                                title: '결과 반환',
                                desc: '모든 시작-끝 조합을 확인한 후 총 개수를 반환합니다.',
                                code: `class Solution:
    def subarraySum(self, nums, k):
        count = 0
        for i in range(len(nums)):
            total = 0
            for j in range(i, len(nums)):
                total += nums[j]
                if total == k:
                    count += 1
        return count`
                            }
                        ],
                        cpp: [
                            {
                                title: '함수 정의 + 카운트',
                                desc: '합이 k인 부분 배열을 셀 카운트를 초기화합니다.',
                                code: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int cnt = 0; // 합이 k인 부분 배열 개수`
                            },
                            {
                                title: '이중 반복 + 합 비교',
                                desc: '모든 시작점 i와 끝점 j를 시도하며 구간 합을 확인합니다.',
                                code: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int cnt = 0;
        for (int i = 0; i < nums.size(); i++) {
            int sum = 0; // i부터의 구간 합
            for (int j = i; j < nums.size(); j++) {
                sum += nums[j]; // 원소 추가
                if (sum == k) cnt++; // 합 = k이면 카운트
            }
        }`
                            },
                            {
                                title: '결과 반환',
                                desc: '총 개수를 반환합니다.',
                                code: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int cnt = 0;
        for (int i = 0; i < nums.size(); i++) {
            int sum = 0;
            for (int j = i; j < nums.size(); j++) {
                sum += nums[j];
                if (sum == k) cnt++;
            }
        }
        return cnt;
    }
};`
                            }
                        ]
                    }
                },
                {
                    approach: '누적합 + 해시맵',
                    description: '누적합의 차이를 해시맵으로 O(1)에 확인',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = {}
        start = max_len = 0
        for i, c in enumerate(s):
            if c in seen and seen[c] >= start:
                start = seen[c] + 1
            seen[c] = i
            max_len = max(max_len, i - start + 1)
        return max_len`,
                        cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> seen;
        int start = 0, maxLen = 0;
        for (int i = 0; i < s.size(); i++) {
            if (seen.count(s[i]) && seen[s[i]] >= start)
                start = seen[s[i]] + 1;
            seen[s[i]] = i;
            maxLen = max(maxLen, i - start + 1);
        }
        return maxLen;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '함수 정의',
                                desc: '정수 배열 nums와 목표 합 k를 받습니다.',
                                code: `class Solution:
    def subarraySum(self, nums, k):`
                            },
                            {
                                title: '누적합 기록 초기화',
                                desc: `{0: 1}은 "시작 전, 합이 0인 지점이 1개 있다"는 뜻입니다.
이게 없으면 배열 처음부터의 구간 합이 k인 경우를 놓칩니다!`,
                                code: `class Solution:
    def subarraySum(self, nums, k):
        # {누적합: 등장 횟수} 기록
        # {0: 1} → 시작 전(합=0)이 1번 있음
        prefix_count = {0: 1}`
                            },
                            {
                                title: '변수 초기화',
                                desc: `prefix_sum: 처음~현재까지의 합을 추적
count: 합이 k인 부분 배열 개수`,
                                code: `class Solution:
    def subarraySum(self, nums, k):
        prefix_count = {0: 1}
        prefix_sum = 0  # 처음~현재까지의 누적합
        count = 0       # 합이 k인 부분 배열 개수`
                            },
                            {
                                title: '반복문 + 누적합 갱신',
                                desc: `배열을 순회하며 원소를 하나씩 더해
"처음~현재"까지의 합을 구합니다.`,
                                code: `class Solution:
    def subarraySum(self, nums, k):
        prefix_count = {0: 1}
        prefix_sum = 0
        count = 0
        for num in nums:
            # 현재 원소를 더해 누적합 갱신
            prefix_sum += num`
                            },
                            {
                                title: '핵심: 이전 누적합에서 찾기',
                                desc: `핵심 아이디어!
이전에 "prefix_sum - k"인 누적합이 있었다면,
그 지점 ~ 현재까지의 구간 합이 정확히 k!
해시맵 덕분에 O(1)에 확인 가능!`,
                                code: `class Solution:
    def subarraySum(self, nums, k):
        prefix_count = {0: 1}
        prefix_sum = 0
        count = 0
        for num in nums:
            prefix_sum += num
            # 핵심: prefix_sum - k가 이전에 나왔다면
            # → 그 지점 ~ 현재 구간의 합 = k!
            if (prefix_sum - k) in prefix_count:
                count += prefix_count[prefix_sum - k]`
                            },
                            {
                                title: '현재 누적합 기록',
                                desc: `현재 누적합을 딕셔너리에 기록합니다.
뒤에 오는 원소들이 "prefix_sum - k"로 이 값을 찾게 됩니다.`,
                                code: `class Solution:
    def subarraySum(self, nums, k):
        prefix_count = {0: 1}
        prefix_sum = 0
        count = 0
        for num in nums:
            prefix_sum += num
            if (prefix_sum - k) in prefix_count:
                count += prefix_count[prefix_sum - k]
            # 현재 누적합 기록 → 뒤의 원소가 이 값을 찾음
            if prefix_sum in prefix_count:
                prefix_count[prefix_sum] += 1
            else:
                prefix_count[prefix_sum] = 1`
                            },
                            {
                                title: '결과 반환',
                                desc: '합이 k인 연속 부분 배열의 총 개수를 반환합니다.',
                                code: `class Solution:
    def subarraySum(self, nums, k):
        prefix_count = {0: 1}
        prefix_sum = 0
        count = 0
        for num in nums:
            prefix_sum += num
            # 핵심: prefix_sum - k가 이전에 나왔다면
            # → 그 지점 ~ 현재 구간의 합 = k!
            if (prefix_sum - k) in prefix_count:
                count += prefix_count[prefix_sum - k]
            # 현재 누적합 기록 → 뒤의 원소가 이 값을 찾음
            if prefix_sum in prefix_count:
                prefix_count[prefix_sum] += 1
            else:
                prefix_count[prefix_sum] = 1
        return count`
                            }
                        ],
                        cpp: [
                            {
                                title: '함수 정의',
                                desc: '정수 배열과 목표 합 k를 받습니다.',
                                code: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {`
                            },
                            {
                                title: '누적합 기록 초기화',
                                desc: `{0: 1}은 "시작 전, 합이 0인 지점이 1개".
이 없으면 처음부터의 구간 합이 k인 경우를 놓칩니다.`,
                                code: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        // {누적합: 등장 횟수} - 합=0인 시작점 1개
        unordered_map<int, int> pc;
        pc[0] = 1;`
                            },
                            {
                                title: '변수 초기화',
                                desc: 'sum은 처음~현재의 누적합, cnt는 결과 카운트입니다.',
                                code: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> pc;
        pc[0] = 1;
        int sum = 0, cnt = 0; // 누적합, 결과 카운트`
                            },
                            {
                                title: '반복 + 누적합 갱신',
                                desc: '원소를 하나씩 더해 "처음~현재"까지의 합을 구합니다.',
                                code: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> pc;
        pc[0] = 1;
        int sum = 0, cnt = 0;
        for (int n : nums) {
            sum += n; // 누적합 갱신`
                            },
                            {
                                title: '핵심: 이전 누적합 찾기 + 기록',
                                desc: `sum - k가 이전에 나왔다면 그 구간 합이 k!
현재 누적합도 기록해서 뒤의 원소가 찾을 수 있게 합니다.`,
                                code: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> pc;
        pc[0] = 1;
        int sum = 0, cnt = 0;
        for (int n : nums) {
            sum += n;
            // sum - k가 이전에 나왔다면 → 구간 합 = k
            if (pc.count(sum - k)) cnt += pc[sum - k];
            pc[sum]++; // 현재 누적합 기록
        }`
                            },
                            {
                                title: '결과 반환',
                                desc: '총 개수를 반환합니다.',
                                code: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> pc;
        pc[0] = 1;
        int sum = 0, cnt = 0;
        for (int n : nums) {
            sum += n;
            if (pc.count(sum - k)) cnt += pc[sum - k];
            pc[sum]++;
        }
        return cnt;
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
