import type { AlgoTopic } from '../types'

export const bitManipulationTopic: AlgoTopic = {
    id: 'bitmanipulation',
    title: '비트 조작',
    icon: '💻',
    category: '심화 (Gold~Platinum)',
    order: 20,
    description: '비트 연산과 비트 마스크를 활용한 효율적인 문제 해결 기법',
    track: 'cpp',
    stages: [
        {
            num: 1,
            title: '기본 비트 연산',
            problemIds: [
                'lc-191',
                'lc-136'
            ],
            desc: '비트 연산의 기초와 XOR 활용 (Easy)'
        },
        {
            num: 2,
            title: '비트 마스크 응용',
            problemIds: [
                'boj-11723',
                'lc-78'
            ],
            desc: '비트 마스크로 집합과 부분집합 다루기 (Silver~Medium)'
        }
    ],
    problems: [
        {
            id: 'lc-191',
            title: 'LeetCode 191 - Number of 1 Bits',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/number-of-1-bits/',
            simIntro: 'n & (n-1) 트릭으로 1 비트를 하나씩 제거하는 과정을 관찰하세요.',
            sim: {
                type: 'hammingWeight'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>양의 정수 <code>n</code>의 이진 표현에서 1인 비트의 개수(해밍 가중치)를 반환하세요.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>n = 11</pre></div>
                    <div><strong>출력</strong><pre>3</pre></div>
                </div><p>11의 이진 표현은 1011이므로 1비트가 3개입니다.</p></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>n = 128</pre></div>
                    <div><strong>출력</strong><pre>1</pre></div>
                </div><p>128의 이진 표현은 10000000이므로 1비트가 1개입니다.</p></div>
                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>n = 2147483645</pre></div>
                    <div><strong>출력</strong><pre>30</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 &le; n &le; 2<sup>31</sup> - 1</li></ul>
                <h4>Follow-up</h4>
                <p>입력이 여러 번 주어진다면, 어떻게 최적화할 수 있을까요?</p>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '이진수에서 1의 개수를 세야 하니까... 일단 각 비트를 하나씩 확인하면 되지 않을까요?<br><br>맨 오른쪽 비트부터 <code>&amp; 1</code>로 1인지 확인하고, 오른쪽 시프트(<code>&gt;&gt; 1</code>)로 다음 비트를 확인하는 거예요.<br>32비트 정수라면 32번 반복하면 되겠죠!'
                },
                {
                    title: '근데 이러면 아쉬운 점이 있어',
                    content: '32번 반복이 느린 건 아니지만, 만약 1 비트가 딱 2개뿐인데도 32번 돌아야 해요.<br><br>예를 들어 <code>10000000 00000000 00000000 00000001</code>은 1이 2개뿐인데, 나머지 30개의 0도 다 확인하는 거죠. <strong>1 비트 개수만큼만 반복</strong>할 수는 없을까요?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '마법 같은 트릭이 있어요: <code>n &amp; (n-1)</code>을 하면 <strong>가장 낮은 1 비트가 딱 하나 사라져요!</strong><br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;font-family:monospace;font-size:0.9em;"><div style="margin-bottom:10px;font-weight:600;font-family:inherit;text-align:center;">n &amp; (n-1) 동작 과정</div><div style="display:flex;flex-direction:column;gap:4px;align-items:center;"><div style="display:flex;gap:4px;"><span style="color:var(--text2);width:70px;text-align:right;">n&nbsp;&nbsp;=</span> <span style="padding:2px 4px;background:var(--accent);color:#fff;border-radius:3px;">1</span><span style="padding:2px 4px;background:var(--accent);color:#fff;border-radius:3px;">1</span><span style="padding:2px 4px;background:var(--yellow);color:#000;border-radius:3px;font-weight:700;">0</span><span style="padding:2px 4px;background:var(--yellow);color:#000;border-radius:3px;font-weight:700;">0</span></div><div style="display:flex;gap:4px;"><span style="color:var(--text2);width:70px;text-align:right;">n-1 =</span> <span style="padding:2px 4px;background:var(--accent);color:#fff;border-radius:3px;">1</span><span style="padding:2px 4px;background:var(--red);color:#fff;border-radius:3px;">0</span><span style="padding:2px 4px;background:var(--red);color:#fff;border-radius:3px;">1</span><span style="padding:2px 4px;background:var(--red);color:#fff;border-radius:3px;">1</span></div><div style="border-top:2px solid var(--text2);width:180px;margin:4px 0;"></div><div style="display:flex;gap:4px;"><span style="color:var(--text2);width:70px;text-align:right;">AND =</span> <span style="padding:2px 4px;background:var(--green);color:#fff;border-radius:3px;font-weight:700;">1</span><span style="padding:2px 4px;background:var(--green);color:#fff;border-radius:3px;font-weight:700;">0</span><span style="padding:2px 4px;background:var(--green);color:#fff;border-radius:3px;font-weight:700;">0</span><span style="padding:2px 4px;background:var(--green);color:#fff;border-radius:3px;font-weight:700;">0</span></div></div><div style="text-align:center;margin-top:6px;color:var(--green);font-weight:600;font-family:inherit;">가장 낮은 1 비트가 제거됐다!</div></div>왜 그럴까요? <code>n-1</code>은 가장 낮은 1 비트를 0으로 바꾸고 그 아래를 전부 1로 만들거든요.<br>이걸 <strong>n이 0이 될 때까지</strong> 반복하면, 반복 횟수 = 1 비트 개수! O(k)로 끝나요 (k = 1의 개수).'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '원리를 이해했다면, 사실 내장 함수도 있어요:<br><br><span class="lang-py">Python: <code>bin(n).count("1")</code> — 이진 문자열로 바꿔서 "1" 개수를 세는 한 줄 풀이!</span><span class="lang-cpp">C++: <code>__builtin_popcount(n)</code> — GCC 내장 함수로 1 비트 개수를 바로 반환!</span><br><br>하지만 면접에서는 <code>n &amp; (n-1)</code> 트릭을 직접 구현하는 걸 기대하니, 둘 다 알아두세요!'
                }
            ],
            templates: {
                python: `class Solution:
    def hammingWeight(self, n: int) -> int:
        # 방법 1: n & (n-1) 트릭
        count = 0
        while n:
            n &= (n - 1)  # 가장 낮은 1 비트 제거
            count += 1
        return count

    # 방법 2: 간단한 방법
    # def hammingWeight(self, n: int) -> int:
    #     return bin(n).count('1')`,
                cpp: `class Solution {
public:
    int hammingWeight(int n) {
        int count = 0;
        while (n) {
            n &= (n - 1);  // 가장 낮은 1 비트 제거
            count++;
        }
        return count;
    }
};`
            },
            solutions: [
                {
                    approach: 'n & (n-1) 트릭',
                    description: 'n & (n-1)로 가장 낮은 1 비트를 하나씩 제거하며 카운트합니다.',
                    timeComplexity: 'O(k) (k = 1 비트 개수)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `class Solution:
    def hammingWeight(self, n: int) -> int:
        # 방법 1: n & (n-1) 트릭
        count = 0
        while n:
            n &= (n - 1)  # 가장 낮은 1 비트 제거
            count += 1
        return count

    # 방법 2: 간단한 방법
    # def hammingWeight(self, n: int) -> int:
    #     return bin(n).count('1')`,
                        cpp: `class Solution {
public:
    int hammingWeight(int n) {
        int count = 0;
        while (n) {
            n &= (n - 1);  // 가장 낮은 1 비트 제거
            count++;
        }
        return count;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '초기화',
                                desc: '1 비트의 개수를 셀 카운터를 준비합니다.',
                                code: 'count = 0'
                            },
                            {
                                title: 'n & (n-1) 반복',
                                desc: `n & (n-1)은 가장 낮은 1 비트를 하나 제거하는 트릭입니다.
비트가 전부 0이 될 때까지 반복하면 1의 개수를 알 수 있습니다.`,
                                code: `while n:
    n &= (n - 1)  # 가장 낮은 1 비트 제거
    count += 1`
                            },
                            {
                                title: '결과 반환',
                                desc: '제거 횟수 = 1 비트의 개수이므로 그대로 반환합니다.',
                                code: 'return count'
                            }
                        ],
                        cpp: [
                            {
                                title: '초기화',
                                desc: 'int로 카운터 선언. unsigned int로 받으면 음수 처리 불필요.',
                                code: 'int count = 0;'
                            },
                            {
                                title: 'n & (n-1) 반복',
                                desc: `n &= (n-1)은 가장 낮은 1 비트를 제거.
비트가 0이 될 때까지 반복.`,
                                code: `while (n) {
    n &= (n - 1);  // 가장 낮은 1 비트 제거
    count++;
}`
                            },
                            {
                                title: '결과 반환',
                                desc: `__builtin_popcount(n)으로 한 줄로도 가능하지만,
트릭의 원리를 이해하는 것이 중요합니다.`,
                                code: `return count;
// 한 줄 풀이: return __builtin_popcount(n);`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-136',
            title: 'LeetCode 136 - Single Number',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/single-number/',
            simIntro: 'XOR로 배열의 모든 원소를 순회하며 짝 없는 수를 찾는 과정을 관찰하세요.',
            sim: {
                type: 'singleNumber'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>비어 있지 않은 정수 배열 <code>nums</code>가 주어집니다. 모든 원소는 두 번씩 나타나고, 하나의 원소만 한 번 나타납니다. 한 번만 나타나는 원소를 찾으세요.</p>
                <p>반드시 선형 시간복잡도로 구현하고, 추가 메모리 없이 풀어야 합니다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [2,2,1]</pre></div>
                    <div><strong>출력</strong><pre>1</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [4,1,2,1,2]</pre></div>
                    <div><strong>출력</strong><pre>4</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [1]</pre></div>
                    <div><strong>출력</strong><pre>1</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; nums.length &le; 3 &times; 10<sup>4</sup></li>
                    <li>-3 &times; 10<sup>4</sup> &le; nums[i] &le; 3 &times; 10<sup>4</sup></li>
                    <li>하나의 원소만 한 번 나타남</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '모든 원소가 2번씩 나오고 하나만 1번 나온다면... 각 숫자가 몇 번 나왔는지 세면 되지 않을까요?<br><br>딕셔너리(해시맵)로 빈도수를 세고, 1번만 나온 숫자를 찾으면 끝! O(n) 시간에 풀 수 있어요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '딕셔너리 풀이는 잘 동작하지만, 문제 조건을 다시 보세요: <strong>"추가 메모리 없이 풀어야 합니다"</strong>.<br><br>딕셔너리는 O(n) 공간을 쓰니까 조건에 맞지 않아요. 배열을 정렬해서 인접 비교하는 방법도 O(n log n)이라 아쉽고요. <strong>O(n) 시간 + O(1) 공간</strong>으로 풀 수 있는 방법이 있을까요?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '비트 연산 XOR(^)의 두 가지 성질을 떠올려 봅시다:<br><br>1. <code>a ^ a = 0</code> — 같은 수끼리 XOR하면 0!<br>2. <code>a ^ 0 = a</code> — 0과 XOR하면 자기 자신!<br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;font-size:0.88em;"><div style="font-weight:600;text-align:center;margin-bottom:8px;">XOR 누적 과정: [4, 1, 2, 1, 2]</div><div style="display:flex;flex-direction:column;gap:4px;align-items:center;font-family:monospace;"><div style="display:flex;gap:8px;align-items:center;"><span style="color:var(--text2);width:100px;text-align:right;">0 ^ <strong>4</strong> =</span><span style="padding:3px 10px;background:var(--accent);color:#fff;border-radius:4px;">4 (100)</span></div><div style="display:flex;gap:8px;align-items:center;"><span style="color:var(--text2);width:100px;text-align:right;">4 ^ <strong>1</strong> =</span><span style="padding:3px 10px;background:var(--accent);color:#fff;border-radius:4px;">5 (101)</span></div><div style="display:flex;gap:8px;align-items:center;"><span style="color:var(--text2);width:100px;text-align:right;">5 ^ <strong>2</strong> =</span><span style="padding:3px 10px;background:var(--accent);color:#fff;border-radius:4px;">7 (111)</span></div><div style="display:flex;gap:8px;align-items:center;"><span style="color:var(--text2);width:100px;text-align:right;">7 ^ <strong>1</strong> =</span><span style="padding:3px 10px;background:var(--yellow);color:#000;border-radius:4px;">6 (110)</span><span style="color:var(--text2);font-size:0.85em;">← 1 상쇄!</span></div><div style="display:flex;gap:8px;align-items:center;"><span style="color:var(--text2);width:100px;text-align:right;">6 ^ <strong>2</strong> =</span><span style="padding:3px 10px;background:var(--green);color:#fff;border-radius:4px;font-weight:700;">4 (100)</span><span style="color:var(--text2);font-size:0.85em;">← 2도 상쇄! 4만 남음</span></div></div></div>그렇다면... 배열의 <strong>모든 원소를 전부 XOR</strong>하면 어떻게 될까요?<br>2번 나오는 수끼리는 상쇄되어 0이 되고, 1번만 나오는 수만 남아요!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python: <code>functools.reduce(lambda a, b: a ^ b, nums)</code>로 한 줄에 전부 XOR할 수 있어요!<br><code>reduce</code>는 리스트를 하나의 값으로 축약하는 함수예요.</span><span class="lang-cpp">C++: <code>accumulate(nums.begin(), nums.end(), 0, bit_xor&lt;int&gt;())</code>로 한 줄 풀이가 가능해요!<br><code>&lt;numeric&gt;</code>과 <code>&lt;functional&gt;</code> 헤더가 필요합니다.</span>'
                }
            ],
            templates: {
                python: `class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        result = 0
        for n in nums:
            result ^= n  # 같은 수끼리 상쇄 → 혼자인 수만 남음
        return result

    # 한 줄 풀이:
    # from functools import reduce
    # def singleNumber(self, nums): return reduce(lambda a,b: a^b, nums)`,
                cpp: `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int result = 0;
        for (int n : nums) {
            result ^= n;  // 같은 수끼리 상쇄
        }
        return result;
    }
};`
            },
            solutions: [
                {
                    approach: 'XOR 전체 순회',
                    description: '모든 원소를 XOR하면 짝이 있는 수는 상쇄되고 유일한 수만 남습니다.',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        result = 0
        for n in nums:
            result ^= n  # 같은 수끼리 상쇄 → 혼자인 수만 남음
        return result

    # 한 줄 풀이:
    # from functools import reduce
    # def singleNumber(self, nums): return reduce(lambda a,b: a^b, nums)`,
                        cpp: `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int result = 0;
        for (int n : nums) {
            result ^= n;  // 같은 수끼리 상쇄
        }
        return result;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '초기화',
                                desc: `result를 0으로 시작합니다.
a ^ 0 = a이므로 0은 XOR의 항등원입니다.`,
                                code: 'result = 0'
                            },
                            {
                                title: '전체 XOR',
                                desc: `a ^ a = 0이므로 2번 나오는 수는 상쇄됩니다.
결국 1번만 나오는 수만 남게 됩니다.`,
                                code: `for n in nums:
    result ^= n  # 같은 수끼리 상쇄`
                            },
                            {
                                title: '결과 반환',
                                desc: 'O(n) 시간, O(1) 공간으로 유일한 수를 찾았습니다.',
                                code: 'return result'
                            }
                        ],
                        cpp: [
                            {
                                title: '초기화',
                                desc: 'XOR의 항등원 0으로 시작합니다.',
                                code: 'int result = 0;'
                            },
                            {
                                title: '전체 XOR',
                                desc: `range-based for로 간결하게.
a ^ a = 0이라 짝수개는 상쇄.`,
                                code: `for (int n : nums) {
    result ^= n;  // 같은 수끼리 상쇄
}`
                            },
                            {
                                title: '결과 반환',
                                desc: '짝이 있는 수는 모두 0으로 상쇄되어 유일한 수만 남습니다.',
                                code: 'return result;'
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-11723',
            title: 'BOJ 11723 - 집합',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/11723',
            simIntro: '비트마스크로 add, remove, toggle, check, all, empty 연산이 동작하는 과정을 관찰하세요.',
            sim: {
                type: 'bitmaskSet'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>비어있는 공집합 S가 주어졌을 때, 아래 연산을 수행하는 프로그램을 작성하시오.</p>
                <ul style="margin:8px 0 8px 20px;">
                    <li><code>add x</code>: S에 x를 추가</li>
                    <li><code>remove x</code>: S에서 x를 제거</li>
                    <li><code>check x</code>: S에 x가 있으면 1, 없으면 0 출력</li>
                    <li><code>toggle x</code>: S에 x가 있으면 제거, 없으면 추가</li>
                    <li><code>all</code>: S를 {1, 2, ..., 20}으로 변경</li>
                    <li><code>empty</code>: S를 공집합으로 변경</li>
                </ul>
                <h4>입력</h4>
                <p>첫째 줄에 수행해야 하는 연산의 수 M (1 &le; M &le; 3,000,000)이 주어진다.</p>
                <p>둘째 줄부터 M개의 줄에 수행해야 하는 연산이 한 줄에 하나씩 주어진다.</p>
                <h4>출력</h4>
                <p><code>check</code> 연산이 주어질때마다, 결과를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>26
add 1
add 2
check 1
check 2
remove 2
check 1
check 2
toggle 3
check 1
check 2
check 3
check 4
all
check 10
check 15
empty
check 1
toggle 1
check 1
toggle 1
check 1
all
check 5
toggle 5
check 5
check 1</pre></div>
                    <div><strong>출력</strong><pre>1
1
1
0
1
0
1
0
1
1
0
1
1
0
1
0
1</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; M &le; 3,000,000</li>
                    <li>1 &le; x &le; 20</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '집합 연산이니까... <span class="lang-py">Python의 <code>set()</code></span><span class="lang-cpp">C++의 <code>set&lt;int&gt;</code></span>을 쓰면 되지 않을까요?<br><br><code>add</code>, <code>remove</code>, <code>check</code> 다 기본 제공되니까 바로 구현할 수 있어요. 원소도 1~20뿐이라 간단해 보여요!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'M이 최대 <strong>300만</strong>이에요! set 자료구조는 각 연산이 O(log n)이라 느릴 수 있고, 메모리 오버헤드도 있어요.<br><br>그런데 원소 범위가 1~20뿐이라는 점을 주목하세요. 겨우 20개짜리 집합인데 set 같은 무거운 자료구조를 쓸 필요가 있을까요? <strong>정수 하나</strong>로 집합을 표현할 수 있다면 모든 연산이 O(1)이 될 텐데...'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '정수 S의 비트로 집합을 표현해요! x번째 비트가 1이면 x가 집합에 있는 거예요.<br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;font-size:0.85em;"><div style="font-weight:600;text-align:center;margin-bottom:8px;">비트마스크로 집합 표현 (S = {1, 3, 4})</div><div style="display:flex;gap:2px;justify-content:center;font-family:monospace;margin-bottom:10px;"><div style="text-align:center;width:28px;"><div style="font-size:0.7em;color:var(--text2);">5</div><div style="padding:3px 0;background:var(--bg3);border-radius:3px;">0</div></div><div style="text-align:center;width:28px;"><div style="font-size:0.7em;color:var(--text2);">4</div><div style="padding:3px 0;background:var(--green);color:#fff;border-radius:3px;font-weight:700;">1</div></div><div style="text-align:center;width:28px;"><div style="font-size:0.7em;color:var(--text2);">3</div><div style="padding:3px 0;background:var(--green);color:#fff;border-radius:3px;font-weight:700;">1</div></div><div style="text-align:center;width:28px;"><div style="font-size:0.7em;color:var(--text2);">2</div><div style="padding:3px 0;background:var(--bg3);border-radius:3px;">0</div></div><div style="text-align:center;width:28px;"><div style="font-size:0.7em;color:var(--text2);">1</div><div style="padding:3px 0;background:var(--green);color:#fff;border-radius:3px;font-weight:700;">1</div></div><div style="text-align:center;width:28px;"><div style="font-size:0.7em;color:var(--text2);">0</div><div style="padding:3px 0;background:var(--bg3);border-radius:3px;">0</div></div></div><div style="text-align:center;font-family:monospace;color:var(--text2);">S = 0b011010 = 26</div></div>각 연산이 비트 연산 한 줄로 바뀝니다:<br>• <code>add x</code> → <code>S |= (1 &lt;&lt; x)</code> — x번째 비트를 1로 켜기<br>• <code>remove x</code> → <code>S &amp;= ~(1 &lt;&lt; x)</code> — x번째 비트를 0으로 끄기<br>• <code>check x</code> → <code>(S &gt;&gt; x) &amp; 1</code> — x번째 비트가 1인지 확인<br>• <code>toggle x</code> → <code>S ^= (1 &lt;&lt; x)</code> — x번째 비트 반전<br>• <code>all</code> → <code>S = (1 &lt;&lt; 21) - 1</code> — 1~20번 비트 전부 1<br>• <code>empty</code> → <code>S = 0</code> — 전부 0으로 초기화'
                },
                {
                    title: '시간 초과를 피하려면!',
                    content: 'M이 300만이라 입출력 속도가 중요해요!<br><br><span class="lang-py">Python: <code>sys.stdin.readline</code>을 반드시 사용하세요. 기본 <code>input()</code>은 너무 느려요!<br>출력도 리스트에 모았다가 <code>"\\n".join(out)</code>으로 한 번에 출력하면 훨씬 빨라요.</span><span class="lang-cpp">C++: <code>ios::sync_with_stdio(false)</code>와 <code>cin.tie(nullptr)</code>로 입출력 속도를 높이세요!</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

M = int(input())
S = 0
out = []

for _ in range(M):
    line = input().split()
    cmd = line[0]

    if cmd == 'add':
        x = int(line[1])
        S |= (1 << x)
    elif cmd == 'remove':
        x = int(line[1])
        S &= ~(1 << x)
    elif cmd == 'check':
        x = int(line[1])
        out.append('1' if (S >> x) & 1 else '0')
    elif cmd == 'toggle':
        x = int(line[1])
        S ^= (1 << x)
    elif cmd == 'all':
        S = (1 << 21) - 1
    elif cmd == 'empty':
        S = 0

print('\\n'.join(out))`,
                cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int M;
    cin >> M;
    int S = 0;

    while (M--) {
        string cmd;
        cin >> cmd;

        if (cmd == "add") {
            int x; cin >> x;
            S |= (1 << x);
        } else if (cmd == "remove") {
            int x; cin >> x;
            S &= ~(1 << x);
        } else if (cmd == "check") {
            int x; cin >> x;
            cout << ((S >> x) & 1) << '\\n';
        } else if (cmd == "toggle") {
            int x; cin >> x;
            S ^= (1 << x);
        } else if (cmd == "all") {
            S = (1 << 21) - 1;
        } else { // empty
            S = 0;
        }
    }
}`
            },
            solutions: [
                {
                    approach: '비트마스크 집합 연산',
                    description: '정수 하나의 비트로 집합을 표현하여 각 연산을 O(1)로 처리합니다.',
                    timeComplexity: 'O(M)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

M = int(input())
S = 0
out = []

for _ in range(M):
    line = input().split()
    cmd = line[0]

    if cmd == 'add':
        x = int(line[1])
        S |= (1 << x)
    elif cmd == 'remove':
        x = int(line[1])
        S &= ~(1 << x)
    elif cmd == 'check':
        x = int(line[1])
        out.append('1' if (S >> x) & 1 else '0')
    elif cmd == 'toggle':
        x = int(line[1])
        S ^= (1 << x)
    elif cmd == 'all':
        S = (1 << 21) - 1
    elif cmd == 'empty':
        S = 0

print('\\n'.join(out))`,
                        cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int M;
    cin >> M;
    int S = 0;

    while (M--) {
        string cmd;
        cin >> cmd;

        if (cmd == "add") {
            int x; cin >> x;
            S |= (1 << x);
        } else if (cmd == "remove") {
            int x; cin >> x;
            S &= ~(1 << x);
        } else if (cmd == "check") {
            int x; cin >> x;
            cout << ((S >> x) & 1) << '\\n';
        } else if (cmd == "toggle") {
            int x; cin >> x;
            S ^= (1 << x);
        } else if (cmd == "all") {
            S = (1 << 21) - 1;
        } else { // empty
            S = 0;
        }
    }
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 초기화',
                                desc: `M이 최대 300만이므로 sys.stdin.readline 필수입니다.
집합 S를 정수 0으로 시작하여 비트마스크로 관리합니다.`,
                                code: `import sys
input = sys.stdin.readline

M = int(input())
S = 0
out = []`
                            },
                            {
                                title: '연산 처리',
                                desc: `각 연산을 비트 연산 한 줄로 처리합니다.
OR(추가), AND+NOT(제거), XOR(토글), 시프트(체크).`,
                                code: `for _ in range(M):
    line = input().split()
    cmd = line[0]
    if cmd == 'add':     S |= (1 << int(line[1]))
    elif cmd == 'remove': S &= ~(1 << int(line[1]))
    elif cmd == 'check':  out.append(str((S >> int(line[1])) & 1))
    elif cmd == 'toggle': S ^= (1 << int(line[1]))
    elif cmd == 'all':    S = (1 << 21) - 1
    elif cmd == 'empty':  S = 0`
                            },
                            {
                                title: '출력',
                                desc: '리스트에 모아서 한 번에 출력하면 I/O 횟수가 줄어 빠릅니다.',
                                code: 'print(\'\\n\'.join(out))'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 초기화',
                                desc: `ios::sync_with_stdio(false)로 입출력 속도 향상.
M이 300만이라 빠른 입출력 필수!`,
                                code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int M, S = 0;
    cin >> M;`
                            },
                            {
                                title: '연산 처리',
                                desc: '비트 연산은 Python과 완전히 동일!',
                                code: `    while (M--) {
        string cmd; cin >> cmd;
        if (cmd == "add")    { int x; cin >> x; S |= (1 << x); }
        else if (cmd == "remove") { int x; cin >> x; S &= ~(1 << x); }
        else if (cmd == "check")  { int x; cin >> x; cout << ((S >> x) & 1) << '\\n'; }
        else if (cmd == "toggle") { int x; cin >> x; S ^= (1 << x); }
        else if (cmd == "all")    S = (1 << 21) - 1;
        else S = 0;  // empty
    }`
                            },
                            {
                                title: '출력',
                                desc: 'C++은 check마다 바로 출력하므로 별도 출력 단계 없이 종료합니다.',
                                code: `    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-78',
            title: 'LeetCode 78 - Subsets',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/subsets/',
            simIntro: '비트 마스크 0부터 2^n-1까지 순회하며 모든 부분집합을 열거하는 과정을 관찰하세요.',
            sim: {
                type: 'subsets'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>정수 배열 <code>nums</code>가 주어집니다. 이 배열에는 중복 원소가 없습니다. 모든 부분집합(멱집합)을 반환하세요. 결과에 중복 부분집합이 포함되면 안 됩니다. 부분집합은 어떤 순서로 반환해도 됩니다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [1,2,3]</pre></div>
                    <div><strong>출력</strong><pre>[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>nums = [0]</pre></div>
                    <div><strong>출력</strong><pre>[[],[0]]</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; nums.length &le; 10</li>
                    <li>-10 &le; nums[i] &le; 10</li>
                    <li>모든 원소는 고유</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '모든 부분집합을 만들어야 하니까... 백트래킹(재귀)으로 풀 수 있지 않을까요?<br><br>각 원소를 "포함할지 / 안 할지" 결정하면서 재귀적으로 탐색하면 모든 조합을 만들 수 있어요. 실제로 이 방법은 잘 동작합니다!'
                },
                {
                    title: '근데 더 간단한 방법이 없을까?',
                    content: '백트래킹도 좋지만, 재귀 호출 구조가 복잡해질 수 있어요.<br><br>잠깐, 각 원소는 "포함(1)" 또는 "미포함(0)" 두 가지 선택뿐이잖아요?<br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;font-size:0.85em;"><div style="font-weight:600;text-align:center;margin-bottom:8px;">nums = [a, b, c] → 이진수 = 부분집합</div><table style="border-collapse:collapse;width:100%;font-family:monospace;"><tr style="background:var(--bg3);"><th style="padding:4px 8px;border:1px solid var(--bg3);">마스크</th><th style="padding:4px 8px;border:1px solid var(--bg3);">이진수</th><th style="padding:4px 8px;border:1px solid var(--bg3);">선택</th><th style="padding:4px 8px;border:1px solid var(--bg3);">부분집합</th></tr><tr><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">0</td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">000</td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">___</td><td style="padding:4px 8px;border:1px solid var(--bg3);">[]</td></tr><tr><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">1</td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">00<span style="color:var(--green);font-weight:700;">1</span></td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">__a</td><td style="padding:4px 8px;border:1px solid var(--bg3);">[a]</td></tr><tr><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">5</td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;"><span style="color:var(--green);font-weight:700;">1</span>0<span style="color:var(--green);font-weight:700;">1</span></td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">c_a</td><td style="padding:4px 8px;border:1px solid var(--bg3);">[a, c]</td></tr><tr><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">7</td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;"><span style="color:var(--green);font-weight:700;">111</span></td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">cba</td><td style="padding:4px 8px;border:1px solid var(--bg3);">[a, b, c]</td></tr></table></div>원소가 n개면 부분집합은 2<sup>n</sup>개 — 이건 <strong>n비트 이진수의 모든 조합</strong>과 정확히 대응돼요!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '0부터 2<sup>n</sup>-1까지의 정수를 "비트 마스크"로 사용해요!<br><br>각 정수의 j번째 비트가 1이면 nums[j]를 포함하는 거예요.<br>예: <code>[1,2,3]</code>에서 마스크 <code>101</code>(=5) → 0번째와 2번째 비트가 1 → <code>[1, 3]</code> 선택!<br><br>이렇게 하면 재귀 없이 <strong>이중 for문</strong>만으로 모든 부분집합을 만들 수 있어요:<br>바깥 루프: mask를 0~2<sup>n</sup>-1까지 순회<br>안쪽 루프: 각 비트가 1인지 확인 → <code>mask &amp; (1 &lt;&lt; j)</code>'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python: <code>for mask in range(1 &lt;&lt; n)</code>으로 모든 마스크를 순회하고,<br><code>if mask &amp; (1 &lt;&lt; j)</code>로 j번째 원소 포함 여부를 확인해요.<br>리스트 컴프리헨션으로도 가능: <code>[nums[j] for j in range(n) if mask &amp; (1 &lt;&lt; j)]</code></span><span class="lang-cpp">C++: <code>for (int mask = 0; mask &lt; (1 &lt;&lt; n); mask++)</code>로 순회하고,<br><code>if (mask &amp; (1 &lt;&lt; j))</code>로 선택 여부를 판단해요.<br>결과를 <code>vector&lt;vector&lt;int&gt;&gt;</code>에 담으면 됩니다.</span>'
                }
            ],
            templates: {
                python: `class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        n = len(nums)
        result = []

        for mask in range(1 << n):  # 0 ~ 2^n - 1
            subset = []
            for j in range(n):
                if mask & (1 << j):  # j번째 비트가 1이면 선택
                    subset.append(nums[j])
            result.append(subset)

        return result

    # 백트래킹 풀이 (비교용):
    # def subsets(self, nums):
    #     res = []
    #     def bt(start, curr):
    #         res.append(curr[:])
    #         for i in range(start, len(nums)):
    #             curr.append(nums[i])
    #             bt(i + 1, curr)
    #             curr.pop()
    #     bt(0, [])
    #     return res`,
                cpp: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> result;

        for (int mask = 0; mask < (1 << n); mask++) {
            vector<int> subset;
            for (int j = 0; j < n; j++) {
                if (mask & (1 << j)) {
                    subset.push_back(nums[j]);
                }
            }
            result.push_back(subset);
        }

        return result;
    }
};`
            },
            solutions: [
                {
                    approach: '비트마스크 부분집합 열거',
                    description: '0 ~ 2^n-1까지 순회하며 각 비트에 대응하는 원소를 선택합니다.',
                    timeComplexity: 'O(n * 2^n)',
                    spaceComplexity: 'O(n * 2^n)',
                    templates: {
                        python: `class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        n = len(nums)
        result = []

        for mask in range(1 << n):  # 0 ~ 2^n - 1
            subset = []
            for j in range(n):
                if mask & (1 << j):  # j번째 비트가 1이면 선택
                    subset.append(nums[j])
            result.append(subset)

        return result

    # 백트래킹 풀이 (비교용):
    # def subsets(self, nums):
    #     res = []
    #     def bt(start, curr):
    #         res.append(curr[:])
    #         for i in range(start, len(nums)):
    #             curr.append(nums[i])
    #             bt(i + 1, curr)
    #             curr.pop()
    #     bt(0, [])
    #     return res`,
                        cpp: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> result;

        for (int mask = 0; mask < (1 << n); mask++) {
            vector<int> subset;
            for (int j = 0; j < n; j++) {
                if (mask & (1 << j)) {
                    subset.push_back(nums[j]);
                }
            }
            result.push_back(subset);
        }

        return result;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '초기화',
                                desc: `원소 n개 → 부분집합 2^n개.
0부터 2^n-1까지의 비트 마스크가 각 부분집합에 대응합니다.`,
                                code: `n = len(nums)
result = []`
                            },
                            {
                                title: '마스크 순회',
                                desc: `각 마스크에서 j번째 비트가 1이면 nums[j]를 포함합니다.
예: 마스크 101 → nums[0]과 nums[2] 선택.`,
                                code: `for mask in range(1 << n):  # 0 ~ 2^n - 1
    subset = []
    for j in range(n):
        if mask & (1 << j):  # j번째 비트가 1이면 선택
            subset.append(nums[j])
    result.append(subset)`
                            },
                            {
                                title: '결과 반환',
                                desc: '2^n개의 부분집합이 모두 담긴 리스트를 반환합니다.',
                                code: 'return result'
                            }
                        ],
                        cpp: [
                            {
                                title: '초기화',
                                desc: 'nums.size()로 원소 수를 구하고 결과 벡터를 준비합니다.',
                                code: `int n = nums.size();
vector<vector<int>> result;`
                            },
                            {
                                title: '마스크 순회',
                                desc: `0~2^n-1까지 모든 비트 조합을 순회.
j번째 비트가 1이면 nums[j] 포함.`,
                                code: `for (int mask = 0; mask < (1 << n); mask++) {
    vector<int> subset;
    for (int j = 0; j < n; j++) {
        if (mask & (1 << j))  // j번째 비트가 1이면 선택
            subset.push_back(nums[j]);
    }
    result.push_back(subset);
}`
                            },
                            {
                                title: '결과 반환',
                                desc: '모든 비트 조합을 순회했으므로 2^n개의 부분집합이 완성됩니다.',
                                code: 'return result;'
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
