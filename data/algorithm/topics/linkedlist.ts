import type { AlgoTopic } from '../types'

export const linkedListTopic: AlgoTopic = {
    id: 'linkedlist',
    title: '연결 리스트',
    icon: '🔗',
    category: '기초 (Bronze~Silver)',
    order: 5,
    description: '노드와 포인터, 단일/이중 연결 리스트, 순환 탐지와 뒤집기',
    track: 'cpp',
    stages: [
        {
            num: 1,
            title: '기본 연결 리스트',
            problemIds: [
                'lc-206',
                'lc-21'
            ],
            desc: '뒤집기와 병합의 기본 (Easy)'
        },
        {
            num: 2,
            title: '연결 리스트 응용',
            problemIds: [
                'lc-141',
                'boj-1158'
            ],
            desc: '사이클 탐지와 시뮬레이션 (Easy~Silver)'
        }
    ],
    problems: [
        {
            id: 'lc-206',
            title: 'LeetCode 206 - Reverse Linked List',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/reverse-linked-list/',
            simIntro: 'prev, curr, next 세 포인터가 한 칸씩 이동하며 방향을 뒤집는 과정을 관찰하세요.',
            sim: {
                type: 'reverse'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>단일 연결 리스트의 head가 주어집니다. 리스트를 뒤집어서 반환하세요.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>head = [1,2,3,4,5]</pre></div>
                    <div><strong>출력</strong><pre>[5,4,3,2,1]</pre></div>
                </div></div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>head = [1,2]</pre></div>
                    <div><strong>출력</strong><pre>[2,1]</pre></div>
                </div></div>

                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>head = []</pre></div>
                    <div><strong>출력</strong><pre>[]</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>노드 수는 [0, 5000] 범위</li>
                    <li>-5000 &le; Node.val &le; 5000</li>
                </ul>

                <div class="hint-key">💡 Follow-up: 연결 리스트를 반복(iterative)과 재귀(recursive) 두 가지 방법으로 뒤집을 수 있을까요?</div>
            `,
            hints: [
                {
                    title: '처음 생각: 배열에 넣고 뒤집기?',
                    content: '가장 먼저 떠오르는 방법 — 리스트를 순회하면서 값을 배열에 저장한 뒤, 배열을 뒤집어서 새 연결 리스트를 만들면 되지 않을까?<br><br>이 방법은 직관적이고 쉽지만, <strong>배열에 모든 값을 복사</strong>하니까 O(n) 추가 공간이 필요합니다. 노드가 수천 개면 배열도 수천 개... 공간이 아깝지 않나요?'
                },
                {
                    title: '공간을 아끼려면?',
                    content: '배열 없이 <strong>노드 자체의 방향을 바꿀 수</strong> 있다면? 각 노드의 <code>next</code> 포인터가 "다음 노드"를 가리키고 있는데, 이걸 "이전 노드"를 가리키도록 하나씩 바꾸면 제자리에서 뒤집을 수 있어요!<br><br>근데 문제가 하나 있습니다 — <code>curr.next</code>를 바꿔버리면 <strong>다음 노드로 이동할 수가 없어요</strong>. 다음 노드 주소를 잃어버리니까요.'
                },
                {
                    title: '포인터 3개로 제자리 뒤집기',
                    content: '그래서 포인터가 3개 필요합니다!<br><br>① <code>prev</code> — 이전 노드 (방향 전환 대상)<br>② <code>curr</code> — 현재 노드<br>③ <code>next_node</code> — 다음 노드 (미리 저장해두기)<div style="margin:12px 0;"><div style="font-size:0.8rem;color:var(--text2);margin-bottom:6px;">Before (원본):</div><div style="display:flex;align-items:center;gap:4px;justify-content:center;flex-wrap:wrap;"><div style="padding:4px 12px;border-radius:6px;background:var(--accent);color:white;font-size:0.85rem;font-weight:600;">1</div><div style="color:var(--text3);">→</div><div style="padding:4px 12px;border-radius:6px;background:var(--accent);color:white;font-size:0.85rem;font-weight:600;">2</div><div style="color:var(--text3);">→</div><div style="padding:4px 12px;border-radius:6px;background:var(--accent);color:white;font-size:0.85rem;font-weight:600;">3</div><div style="color:var(--text3);">→</div><div style="padding:4px 12px;border-radius:6px;background:var(--accent);color:white;font-size:0.85rem;font-weight:600;">4</div><div style="color:var(--text3);">→ null</div></div><div style="text-align:center;margin:6px 0;font-size:0.9rem;color:var(--yellow);">↓ prev, curr, next로 한 칸씩 뒤집기</div><div style="font-size:0.8rem;color:var(--green);margin-bottom:6px;">After (뒤집힘):</div><div style="display:flex;align-items:center;gap:4px;justify-content:center;flex-wrap:wrap;"><div style="color:var(--text3);">null ←</div><div style="padding:4px 12px;border-radius:6px;background:var(--green);color:white;font-size:0.85rem;font-weight:600;">1</div><div style="color:var(--green);">←</div><div style="padding:4px 12px;border-radius:6px;background:var(--green);color:white;font-size:0.85rem;font-weight:600;">2</div><div style="color:var(--green);">←</div><div style="padding:4px 12px;border-radius:6px;background:var(--green);color:white;font-size:0.85rem;font-weight:600;">3</div><div style="color:var(--green);">←</div><div style="padding:4px 12px;border-radius:6px;background:var(--green);color:white;font-size:0.85rem;font-weight:600;">4</div></div></div>매 단계마다:<br>1. <code>next_node = curr.next</code> → 다음 노드 저장<br>2. <code>curr.next = prev</code> → 방향 전환!<br>3. <code>prev = curr</code>, <code>curr = next_node</code> → 한 칸 이동<br><br>이러면 <strong>O(1) 공간</strong>만으로 뒤집기 완료! Follow-up의 재귀 버전도 같은 원리인데, 스택 프레임이 O(n) 공간을 쓰니 반복(iterative)이 더 효율적이에요.'
                }
            ],
            templates: {
                python: `class Solution:
    def reverseList(self, head):
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev

    # 재귀 버전
    def reverseList_recursive(self, head):
        if not head or not head.next:
            return head
        new_head = self.reverseList_recursive(head.next)
        head.next.next = head
        head.next = None
        return new_head`,
                cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};`
            },
            solutions: [
                {
                    approach: '포인터 3개 반복',
                    description: 'prev, curr, next 포인터로 한 칸씩 이동하며 방향을 뒤집습니다.',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `class Solution:
    def reverseList(self, head):
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev

    # 재귀 버전
    def reverseList_recursive(self, head):
        if not head or not head.next:
            return head
        new_head = self.reverseList_recursive(head.next)
        head.next.next = head
        head.next = None
        return new_head`,
                        cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '초기화',
                                desc: `prev=None(뒤집힌 리스트의 시작), curr=head(현재 노드).
두 포인터로 한 칸씩 이동하며 방향을 바꿀 준비를 합니다.`,
                                code: `def reverseList(self, head):
    prev = None
    curr = head`
                            },
                            {
                                title: '반복 순회',
                                desc: `curr이 None이 될 때까지 반복합니다.
리스트 끝에 도달하면 모든 노드의 방향이 뒤집힌 상태입니다.`,
                                code: `def reverseList(self, head):
    prev = None
    curr = head
    while curr:`
                            },
                            {
                                title: '방향 전환 + 이동',
                                desc: `핵심 4단계: ①next 저장 ②curr→prev로 방향 전환 ③prev 이동 ④curr 이동.
next를 먼저 저장하지 않으면 curr.next를 바꾼 뒤 다음 노드를 잃어버립니다.`,
                                code: `def reverseList(self, head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next  # 다음 노드 저장
        curr.next = prev       # 방향 전환!
        prev = curr            # prev 이동
        curr = next_node       # curr 이동`
                            },
                            {
                                title: '새 head 반환',
                                desc: `반복이 끝나면 curr=None, prev가 마지막 노드(=새 head)입니다.
원래 꼬리였던 노드가 새로운 머리가 됩니다.`,
                                code: `def reverseList(self, head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev  # prev가 새로운 head`
                            }
                        ],
                        cpp: [
                            {
                                title: '초기화',
                                desc: `prev=nullptr(뒤집힌 리스트의 시작), curr=head(현재 노드).
C++에서는 null 대신 nullptr을 사용합니다.`,
                                code: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;  // nullptr → C++의 null
    ListNode* curr = head;`
                            },
                            {
                                title: '반복 순회',
                                desc: `curr이 nullptr이 아닌 동안 반복합니다.
C++에서 포인터는 bool처럼 쓸 수 있어 while(curr)로 유효성 검사합니다.`,
                                code: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {  // curr != nullptr`
                            },
                            {
                                title: '방향 전환 + 이동',
                                desc: `핵심 4단계: ①next 저장 ②curr→prev로 방향 전환 ③prev 이동 ④curr 이동.
C++에서는 ->로 포인터가 가리키는 멤버에 접근합니다.`,
                                code: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* next = curr->next;  // 다음 노드 저장
        curr->next = prev;            // 방향 전환!
        prev = curr;                  // prev 이동
        curr = next;                  // curr 이동`
                            },
                            {
                                title: '새 head 반환',
                                desc: `반복이 끝나면 curr=nullptr, prev가 마지막 노드(=새 head)입니다.
반환 타입이 ListNode*이므로 포인터를 그대로 반환합니다.`,
                                code: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;  // prev가 새로운 head
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-21',
            title: 'LeetCode 21 - Merge Two Sorted Lists',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/merge-two-sorted-lists/',
            simIntro: 'list1과 list2에서 더 작은 값을 선택하여 결과 리스트에 연결하는 과정을 관찰하세요.',
            sim: {
                type: 'merge'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>정렬된 두 연결 리스트 <code>list1</code>과 <code>list2</code>의 head가 주어집니다. 두 리스트를 하나의 정렬된 리스트로 합쳐서 반환하세요. 새 리스트는 두 리스트의 노드를 이어 붙여서 만들어야 합니다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>list1 = [1,2,4], list2 = [1,3,4]</pre></div>
                    <div><strong>출력</strong><pre>[1,1,2,3,4,4]</pre></div>
                </div></div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>list1 = [], list2 = []</pre></div>
                    <div><strong>출력</strong><pre>[]</pre></div>
                </div></div>

                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>list1 = [], list2 = [0]</pre></div>
                    <div><strong>출력</strong><pre>[0]</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>두 리스트의 노드 수는 각각 [0, 50] 범위</li>
                    <li>-100 &le; Node.val &le; 100</li>
                    <li><code>list1</code>과 <code>list2</code>는 모두 오름차순 정렬</li>
                </ul>
            `,
            hints: [
                {
                    title: '두 리스트를 어떻게 합칠까?',
                    content: '정렬된 두 리스트가 있으니까, 양쪽의 맨 앞(head)을 비교해서 더 작은 쪽을 하나씩 떼어서 결과 리스트에 붙이면 되지 않을까?<div style="margin:12px 0;"><div style="display:flex;align-items:center;gap:4px;justify-content:center;margin-bottom:6px;flex-wrap:wrap;"><div style="font-size:0.75rem;color:var(--text2);width:40px;text-align:right;">list1:</div><div style="padding:3px 10px;border-radius:5px;border:2px solid var(--yellow);font-size:0.85rem;font-weight:600;">1</div><div style="color:var(--text3);">→</div><div style="padding:3px 10px;border-radius:5px;background:var(--bg2);font-size:0.85rem;">2</div><div style="color:var(--text3);">→</div><div style="padding:3px 10px;border-radius:5px;background:var(--bg2);font-size:0.85rem;">4</div></div><div style="display:flex;align-items:center;gap:4px;justify-content:center;margin-bottom:6px;flex-wrap:wrap;"><div style="font-size:0.75rem;color:var(--text2);width:40px;text-align:right;">list2:</div><div style="padding:3px 10px;border-radius:5px;border:2px solid var(--yellow);font-size:0.85rem;font-weight:600;">1</div><div style="color:var(--text3);">→</div><div style="padding:3px 10px;border-radius:5px;background:var(--bg2);font-size:0.85rem;">3</div><div style="color:var(--text3);">→</div><div style="padding:3px 10px;border-radius:5px;background:var(--bg2);font-size:0.85rem;">4</div></div><div style="text-align:center;font-size:0.85rem;color:var(--yellow);margin:4px 0;">↓ 양쪽 head를 비교, 작은 쪽을 선택!</div><div style="display:flex;align-items:center;gap:4px;justify-content:center;flex-wrap:wrap;"><div style="font-size:0.75rem;color:var(--green);width:45px;text-align:right;">result:</div><div style="padding:3px 10px;border-radius:5px;background:var(--green);color:white;font-size:0.85rem;font-weight:600;">1</div><div style="color:var(--green);">→</div><div style="padding:3px 10px;border-radius:5px;background:var(--green);color:white;font-size:0.85rem;font-weight:600;">1</div><div style="color:var(--green);">→</div><div style="padding:3px 10px;border-radius:5px;background:var(--green);color:white;font-size:0.85rem;font-weight:600;">2</div><div style="color:var(--green);">→</div><div style="padding:3px 10px;border-radius:5px;background:var(--green);color:white;font-size:0.85rem;font-weight:600;">3</div><div style="color:var(--green);">→</div><div style="padding:3px 10px;border-radius:5px;background:var(--green);color:white;font-size:0.85rem;font-weight:600;">4</div><div style="color:var(--green);">→</div><div style="padding:3px 10px;border-radius:5px;background:var(--green);color:white;font-size:0.85rem;font-weight:600;">4</div></div></div>정렬된 카드 더미 두 개를 합치는 것과 같아요 — 양쪽 맨 위 카드를 비교하고, 더 작은 카드를 내려놓는 거죠. 한쪽이 먼저 떨어지면 나머지를 그대로 뒤에 붙이면 끝!'
                },
                {
                    title: '더미 노드 트릭',
                    content: '근데 한 가지 귀찮은 점이 있어요 — 결과 리스트의 <strong>첫 번째 노드</strong>를 어떻게 추적하죠?<br><br>list1.val이 더 작으면 결과의 head가 list1이고, 아니면 list2... 매번 분기 처리하기 번거롭습니다.<br><br>💡 <strong>더미 노드(dummy head)</strong>를 하나 만들어서 그 뒤에 이어붙이면? 마지막에 <code>dummy.next</code>만 반환하면 되니까 시작 노드 추적이 깔끔해집니다!'
                },
                {
                    title: '재귀로도 가능!',
                    content: '반복문 대신 재귀로도 자연스럽게 풀 수 있어요.<br><br>🔁 <strong>Base case</strong>: 둘 중 하나가 비어있으면 나머지를 반환<br>🔁 <strong>Recursive step</strong>: 더 작은 쪽의 <code>next</code>에 나머지를 재귀적으로 병합한 결과를 연결<br><br><span class="lang-py">Python: <code>list1.next = self.mergeTwoLists(list1.next, list2)</code></span><span class="lang-cpp">C++: <code>list1->next = mergeTwoLists(list1->next, list2);</code></span><br><br>코드가 더 짧고 직관적이지만, 재귀 깊이가 O(n+m)이라 스택 오버플로 주의!'
                }
            ],
            templates: {
                python: `class Solution:
    def mergeTwoLists(self, list1, list2):
        dummy = ListNode(0)
        curr = dummy

        while list1 and list2:
            if list1.val <= list2.val:
                curr.next = list1
                list1 = list1.next
            else:
                curr.next = list2
                list2 = list2.next
            curr = curr.next

        curr.next = list1 or list2  # 남은 리스트 연결
        return dummy.next`,
                cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* curr = &dummy;
        while (l1 && l2) {
            if (l1->val <= l2->val) { curr->next = l1; l1 = l1->next; }
            else { curr->next = l2; l2 = l2->next; }
            curr = curr->next;
        }
        curr->next = l1 ? l1 : l2;
        return dummy.next;
    }
};`
            },
            solutions: [
                {
                    approach: '더미 노드 병합',
                    description: 'dummy 노드를 만들고 두 리스트에서 더 작은 값을 순서대로 연결합니다.',
                    timeComplexity: 'O(n + m)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `class Solution:
    def mergeTwoLists(self, list1, list2):
        dummy = ListNode(0)
        curr = dummy

        while list1 and list2:
            if list1.val <= list2.val:
                curr.next = list1
                list1 = list1.next
            else:
                curr.next = list2
                list2 = list2.next
            curr = curr.next

        curr.next = list1 or list2  # 남은 리스트 연결
        return dummy.next`,
                        cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* curr = &dummy;
        while (l1 && l2) {
            if (l1->val <= l2->val) { curr->next = l1; l1 = l1->next; }
            else { curr->next = l2; l2 = l2->next; }
            curr = curr->next;
        }
        curr->next = l1 ? l1 : l2;
        return dummy.next;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '더미 노드 생성',
                                desc: `dummy 노드를 만들어 결과 리스트의 시작점으로 사용합니다.
첫 노드를 특별 처리하지 않아도 되어 코드가 깔끔해집니다.`,
                                code: `def mergeTwoLists(self, list1, list2):
    dummy = ListNode(0)
    curr = dummy`
                            },
                            {
                                title: '비교 반복',
                                desc: `두 리스트 모두 노드가 남아있을 때까지 반복합니다.
한쪽이라도 끝나면 남은 쪽을 통째로 이어붙이면 됩니다.`,
                                code: `def mergeTwoLists(self, list1, list2):
    dummy = ListNode(0)
    curr = dummy

    while list1 and list2:`
                            },
                            {
                                title: '작은 값 연결',
                                desc: `두 리스트의 현재 노드 중 작은 값을 curr.next에 연결합니다.
이미 정렬된 리스트이므로 매번 작은 쪽을 고르면 전체도 정렬됩니다.`,
                                code: `def mergeTwoLists(self, list1, list2):
    dummy = ListNode(0)
    curr = dummy

    while list1 and list2:
        if list1.val <= list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next`
                            },
                            {
                                title: '나머지 연결 + 반환',
                                desc: `한쪽 리스트가 끝나면 남은 리스트를 통째로 연결합니다.
list1 or list2는 남아있는 쪽을 반환하는 Python 트릭입니다.`,
                                code: `def mergeTwoLists(self, list1, list2):
    dummy = ListNode(0)
    curr = dummy

    while list1 and list2:
        if list1.val <= list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next

    curr.next = list1 or list2
    return dummy.next`
                            }
                        ],
                        cpp: [
                            {
                                title: '더미 노드 생성',
                                desc: `스택에 dummy 노드를 생성하고 &로 주소를 가져옵니다.
C++에서는 new 없이 스택 변수로 만들면 메모리 관리가 편합니다.`,
                                code: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);       // 스택에 더미 노드 생성
    ListNode* curr = &dummy; // 포인터로 연결`
                            },
                            {
                                title: '비교 반복',
                                desc: `두 리스트 모두 유효한 동안 반복합니다.
C++에서 포인터가 nullptr이면 false이므로 && 조건으로 검사합니다.`,
                                code: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    while (l1 && l2) {`
                            },
                            {
                                title: '작은 값 연결',
                                desc: `두 노드 중 작은 값을 curr->next에 연결합니다.
C++에서는 . 대신 ->로 포인터가 가리키는 멤버에 접근합니다.`,
                                code: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) {
            curr->next = l1;
            l1 = l1->next;
        } else {
            curr->next = l2;
            l2 = l2->next;
        }
        curr = curr->next;`
                            },
                            {
                                title: '나머지 연결 + 반환',
                                desc: `삼항 연산자(? :)로 남아있는 리스트를 통째로 연결합니다.
dummy.next가 실제 결과 리스트의 시작점입니다.`,
                                code: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) {
            curr->next = l1;
            l1 = l1->next;
        } else {
            curr->next = l2;
            l2 = l2->next;
        }
        curr = curr->next;
    }
    curr->next = l1 ? l1 : l2;  // 삼항 연산자로 남은 리스트 연결
    return dummy.next;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-141',
            title: 'LeetCode 141 - Linked List Cycle',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/linked-list-cycle/',
            simIntro: '🐢 거북이(slow)와 🐇 토끼(fast)가 이동하다 만나면 사이클이 존재합니다!',
            sim: {
                type: 'cycle'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>연결 리스트의 head가 주어집니다. 리스트에 사이클(순환)이 있는지 판별하세요.</p>
                <p>사이클이란 리스트의 어떤 노드를 따라가다 보면 다시 이전에 방문한 노드로 돌아오는 경우를 말합니다. <code>pos</code>는 tail의 next가 연결된 노드의 인덱스입니다 (0-indexed). <code>pos</code>가 -1이면 사이클이 없습니다. 참고: <code>pos</code>는 매개변수로 전달되지 않습니다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>head = [3,2,0,-4], pos = 1</pre></div>
                    <div><strong>출력</strong><pre>true</pre></div>
                </div>
                <p class="example-explain">사이클이 있습니다. tail이 인덱스 1의 노드에 연결됩니다.</p>
                </div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>head = [1,2], pos = 0</pre></div>
                    <div><strong>출력</strong><pre>true</pre></div>
                </div>
                <p class="example-explain">사이클이 있습니다. tail이 인덱스 0의 노드에 연결됩니다.</p>
                </div>

                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>head = [1], pos = -1</pre></div>
                    <div><strong>출력</strong><pre>false</pre></div>
                </div>
                <p class="example-explain">사이클이 없습니다.</p>
                </div>

                <h4>제약 조건</h4>
                <ul>
                    <li>노드 수는 [0, 10<sup>4</sup>] 범위</li>
                    <li>-10<sup>5</sup> &le; Node.val &le; 10<sup>5</sup></li>
                    <li><code>pos</code>는 -1 또는 유효한 인덱스</li>
                </ul>

                <div class="hint-key">💡 Follow-up: O(1) 메모리(상수 공간)를 사용하여 풀 수 있을까요?</div>
            `,
            hints: [
                {
                    title: '처음 생각: 방문 기록 남기기',
                    content: '노드를 하나씩 따라가면서 "이 노드를 본 적 있나?" 확인하면 되지 않을까?<br><br><span class="lang-py">Python <code>set()</code>에 방문한 노드를 저장하고, 이미 있는 노드가 나오면 사이클!</span><span class="lang-cpp">C++ <code>unordered_set&lt;ListNode*&gt;</code>에 방문한 노드 주소를 저장하고, 이미 있는 노드가 나오면 사이클!</span><br><br>이 방법은 확실하게 동작하지만... 노드가 10만 개면 Set도 10만 개 — <strong>O(n) 추가 공간</strong>이 필요합니다.'
                },
                {
                    title: '메모리 없이 할 수 있을까?',
                    content: 'Follow-up에서 <strong>O(1) 공간</strong>으로 풀라고 합니다. 방문 기록을 저장하지 않고 사이클을 어떻게 감지할까요?<br><br>힌트: 운동장 트랙을 떠올려 보세요. 빠른 사람과 느린 사람이 같은 트랙에서 달리면... <strong>트랙이 원형이면 빠른 사람이 결국 느린 사람을 따라잡습니다!</strong> 트랙에 끝이 있으면(사이클 없음) 빠른 사람이 먼저 끝에 도달하겠죠.'
                },
                {
                    title: '토끼와 거북이 (Floyd\'s Algorithm)',
                    content: '🐢 <code>slow</code>는 한 칸씩, 🐇 <code>fast</code>는 두 칸씩 이동!<div style="margin:12px 0;"><div style="display:flex;align-items:center;gap:4px;justify-content:center;flex-wrap:wrap;"><div style="padding:4px 10px;border-radius:6px;background:var(--accent);color:white;font-size:0.85rem;">3</div><div style="color:var(--text3);">→</div><div style="padding:4px 10px;border-radius:6px;background:var(--accent);color:white;font-size:0.85rem;">2</div><div style="color:var(--text3);">→</div><div style="padding:4px 10px;border-radius:6px;background:var(--accent);color:white;font-size:0.85rem;">0</div><div style="color:var(--text3);">→</div><div style="padding:4px 10px;border-radius:6px;background:var(--accent);color:white;font-size:0.85rem;">-4</div><div style="color:var(--red);">↩ 2로 되돌아감</div></div><div style="display:flex;justify-content:center;gap:16px;margin-top:8px;flex-wrap:wrap;"><div style="display:flex;align-items:center;gap:4px;"><div style="width:12px;height:12px;border-radius:50%;background:var(--green);"></div><div style="font-size:0.75rem;color:var(--text2);">slow: 1칸씩</div></div><div style="display:flex;align-items:center;gap:4px;"><div style="width:12px;height:12px;border-radius:50%;background:var(--red);"></div><div style="font-size:0.75rem;color:var(--text2);">fast: 2칸씩</div></div><div style="font-size:0.75rem;color:var(--yellow);font-weight:600;">사이클 안에서 반드시 만남!</div></div></div><strong>사이클이 있으면</strong>: 둘 다 사이클 안에 들어간 후, fast가 매 턴마다 slow와의 거리를 1칸씩 줄입니다. 결국 반드시 만나요!<br><strong>사이클이 없으면</strong>: fast가 먼저 <code>null</code>에 도달해서 반복 종료.<br><br>공간 O(1), 시간 O(n) — Set 방식보다 메모리를 아끼면서도 같은 시간 복잡도!'
                }
            ],
            templates: {
                python: `class Solution:
    def hasCycle(self, head) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False`,
                cpp: `class Solution {
public:
    bool hasCycle(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};`
            },
            solutions: [
                {
                    approach: 'Floyd 순환 탐지',
                    description: 'slow(1칸)와 fast(2칸)가 사이클 안에서 만나는지 확인합니다.',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `class Solution:
    def hasCycle(self, head) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False`,
                        cpp: `class Solution {
public:
    bool hasCycle(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '두 포인터 초기화',
                                desc: `slow와 fast를 모두 head에서 시작합니다.
Floyd 알고리즘: 속도가 다른 두 포인터로 사이클을 탐지합니다.`,
                                code: `def hasCycle(self, head) -> bool:
    slow = fast = head`
                            },
                            {
                                title: 'fast가 끝에 도달할 때까지 반복',
                                desc: `fast와 fast.next가 모두 존재해야 2칸 이동이 가능합니다.
fast가 끝에 도달하면 사이클이 없다는 뜻입니다.`,
                                code: `def hasCycle(self, head) -> bool:
    slow = fast = head
    while fast and fast.next:`
                            },
                            {
                                title: '이동 + 비교',
                                desc: `slow는 1칸, fast는 2칸 이동 후 만남 여부를 확인합니다.
사이클 안에서 fast가 매 턴 1칸씩 거리를 줄이므로 반드시 만납니다.`,
                                code: `def hasCycle(self, head) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next        # 1칸
        fast = fast.next.next   # 2칸
        if slow == fast:
            return True  # 만남!`
                            },
                            {
                                title: '사이클 없음 반환',
                                desc: `fast가 리스트 끝에 도달하면 사이클이 없습니다.
HashSet O(n) 공간 대비 투 포인터는 O(1) 공간만 사용합니다.`,
                                code: `def hasCycle(self, head) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False  # fast가 끝에 도달`
                            }
                        ],
                        cpp: [
                            {
                                title: '두 포인터 초기화',
                                desc: `slow와 fast를 각각 ListNode* 타입으로 선언합니다.
Python과 달리 C++에서는 포인터 타입을 명시해야 합니다.`,
                                code: `bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;`
                            },
                            {
                                title: 'fast가 끝에 도달할 때까지 반복',
                                desc: `fast와 fast->next 두 조건을 모두 검사합니다.
nullptr 접근 시 Segmentation Fault가 발생하므로 반드시 유효성 검사가 필요합니다.`,
                                code: `bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {  // 포인터 유효성 검사`
                            },
                            {
                                title: '이동 + 비교',
                                desc: `slow는 1칸(->next), fast는 2칸(->next->next) 이동합니다.
사이클이 있으면 fast가 slow를 따라잡아 같은 주소를 가리키게 됩니다.`,
                                code: `bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;        // 1칸
        fast = fast->next->next;  // 2칸
        if (slow == fast)
            return true;  // 만남!`
                            },
                            {
                                title: '사이클 없음 반환',
                                desc: `fast가 nullptr에 도달하면 리스트에 끝이 있으므로 사이클이 없습니다.
bool 반환 타입이므로 true/false(소문자)를 사용합니다.`,
                                code: `bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast)
            return true;
    }
    return false;  // fast가 끝에 도달
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1158',
            title: 'BOJ 1158 - 요세푸스 문제',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1158',
            simIntro: 'N=7, K=3인 요세푸스 문제를 큐로 시뮬레이션하는 과정을 관찰하세요.',
            sim: {
                type: 'josephus'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>1번부터 N번까지 N명의 사람이 원을 이루면서 앉아있고, 양의 정수 K(&le; N)가 주어진다. 이제 순서대로 K번째 사람을 제거한다. 한 사람이 제거되면 남은 사람들로 이루어진 원을 따라 이 과정을 계속해 나간다. 이 과정은 N명의 사람이 모두 제거될 때까지 계속된다. 원에서 사람들이 제거되는 순서를 (N, K)-요세푸스 순열이라고 한다. (7, 3)-요세푸스 순열은 &lt;3, 6, 2, 7, 5, 1, 4&gt;이다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 N과 K가 빈 칸을 사이에 두고 순서대로 주어진다. (1 &le; K &le; N &le; 5,000)</p>
                <h4>출력</h4>
                <p>예제와 같이 요세푸스 순열을 출력한다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>7 3</pre></div>
                    <div><strong>출력</strong><pre>&lt;3, 6, 2, 7, 5, 1, 4&gt;</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; K &le; N &le; 5,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 생각: 배열에서 K번째 제거 반복',
                    content: '1부터 N까지 배열에 넣고, 현재 위치에서 K번째를 찾아 제거하는 걸 반복하면 되지 않을까?<br><br>직관적이지만 문제가 있어요 — 배열 중간에서 원소를 제거하면 뒤의 원소들이 전부 한 칸씩 앞으로 밀려야 합니다. <strong>제거 한 번에 O(n)</strong>이고, N번 반복하니까 총 <strong>O(n&sup2;)</strong>. N이 5,000이면 2,500만 번... 느리진 않지만 깔끔하지도 않죠.'
                },
                {
                    title: '큐로 효율적으로 시뮬레이션',
                    content: '원형 구조를 큐로 표현하면 훨씬 깔끔합니다!<br><br>핵심 아이디어: K-1명을 앞에서 빼서 뒤로 보내고, K번째 사람을 앞에서 빼서 제거!<div style="margin:12px 0;overflow-x:auto;"><table style="border-collapse:collapse;font-size:0.82rem;width:100%;"><thead><tr style="background:var(--bg2);"><th style="padding:5px 8px;border:1px solid var(--bg3);">단계</th><th style="padding:5px 8px;border:1px solid var(--bg3);">동작</th><th style="padding:5px 8px;border:1px solid var(--bg3);">큐 상태</th></tr></thead><tbody><tr><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">초기</td><td style="padding:4px 8px;border:1px solid var(--bg3);">-</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">[1, 2, 3, 4, 5, 6, 7]</td></tr><tr><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">1</td><td style="padding:4px 8px;border:1px solid var(--bg3);">1→뒤, 2→뒤, <span style="color:var(--red);font-weight:600;">3 제거!</span></td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">[4, 5, 6, 7, 1, 2]</td></tr><tr><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">2</td><td style="padding:4px 8px;border:1px solid var(--bg3);">4→뒤, 5→뒤, <span style="color:var(--red);font-weight:600;">6 제거!</span></td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">[7, 1, 2, 4, 5]</td></tr><tr><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">3</td><td style="padding:4px 8px;border:1px solid var(--bg3);">7→뒤, 1→뒤, <span style="color:var(--red);font-weight:600;">2 제거!</span></td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">[4, 5, 7, 1]</td></tr></tbody></table></div>앞에서 빼고 뒤에 넣는 연산이 O(1)이면 전체가 <strong>O(nK)</strong>로 깔끔해집니다.'
                },
                {
                    title: '<span class="lang-py">Python deque로 구현</span><span class="lang-cpp">C++ queue로 구현</span>',
                    content: '<span class="lang-py">Python의 <code>collections.deque</code>는 양쪽 O(1) 삽입/삭제를 지원합니다!<br><br><code>deque.popleft()</code>로 앞에서 빼고, <code>deque.append()</code>로 뒤에 넣기.<br>결과를 리스트에 모아서 <code>&lt;a, b, c, ...&gt;</code> 형태로 출력하면 완성!</span><span class="lang-cpp">C++의 <code>queue</code>는 <code>front()</code>+<code>pop()</code>으로 앞에서 빼고, <code>push()</code>로 뒤에 넣습니다.<br><br>결과를 <code>vector</code>에 모아서 <code>&lt;a, b, c, ...&gt;</code> 형태로 출력하면 완성!</span>'
                }
            ],
            templates: {
                python: `from collections import deque
import sys
input = sys.stdin.readline

N, K = map(int, input().split())
q = deque(range(1, N + 1))
result = []

while q:
    for _ in range(K - 1):
        q.append(q.popleft())  # K-1명을 뒤로 보내기
    result.append(q.popleft())  # K번째 사람 제거

print('<' + ', '.join(map(str, result)) + '>')`,
                cpp: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;
    queue<int> q;
    for (int i = 1; i <= N; i++) q.push(i);

    cout << "<";
    while (!q.empty()) {
        for (int i = 0; i < K - 1; i++) {
            q.push(q.front());
            q.pop();
        }
        cout << q.front(); q.pop();
        if (!q.empty()) cout << ", ";
    }
    cout << ">" << endl;
}`
            },
            solutions: [
                {
                    approach: '큐 시뮬레이션',
                    description: 'deque로 원형 구조를 시뮬레이션하여 K번째 사람을 순서대로 제거합니다.',
                    timeComplexity: 'O(NK)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `from collections import deque
import sys
input = sys.stdin.readline

N, K = map(int, input().split())
q = deque(range(1, N + 1))
result = []

while q:
    for _ in range(K - 1):
        q.append(q.popleft())  # K-1명을 뒤로 보내기
    result.append(q.popleft())  # K번째 사람 제거

print('<' + ', '.join(map(str, result)) + '>')`,
                        cpp: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;
    queue<int> q;
    for (int i = 1; i <= N; i++) q.push(i);

    cout << "<";
    while (!q.empty()) {
        for (int i = 0; i < K - 1; i++) {
            q.push(q.front());
            q.pop();
        }
        cout << q.front(); q.pop();
        if (!q.empty()) cout << ", ";
    }
    cout << ">" << endl;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '큐 초기화',
                                desc: `deque에 1~N을 넣어 원형 구조를 시뮬레이션합니다.
deque는 양쪽 삽입/삭제가 O(1)이라 원형 큐 구현에 최적입니다.`,
                                code: `from collections import deque

N, K = map(int, input().split())
q = deque(range(1, N + 1))
result = []`
                            },
                            {
                                title: 'K-1명 뒤로 보내기',
                                desc: `K-1번 앞에서 빼서 뒤로 보내면 K번째 사람이 맨 앞에 옵니다.
popleft()→append()로 원형 회전을 구현하는 핵심 트릭입니다.`,
                                code: `from collections import deque

N, K = map(int, input().split())
q = deque(range(1, N + 1))
result = []

while q:
    for _ in range(K - 1):
        q.append(q.popleft())  # 뒤로 보내기`
                            },
                            {
                                title: 'K번째 사람 제거',
                                desc: `회전 후 맨 앞에 있는 사람이 K번째이므로 popleft()로 제거합니다.
제거된 순서를 result에 기록합니다.`,
                                code: `from collections import deque

N, K = map(int, input().split())
q = deque(range(1, N + 1))
result = []

while q:
    for _ in range(K - 1):
        q.append(q.popleft())
    result.append(q.popleft())  # K번째 제거!`
                            },
                            {
                                title: '결과 출력',
                                desc: `BOJ 출력 형식에 맞게 <a, b, c, ...> 형태로 출력합니다.
sys.stdin.readline으로 입력 속도를 높여 시간 초과를 방지합니다.`,
                                code: `from collections import deque
import sys
input = sys.stdin.readline

N, K = map(int, input().split())
q = deque(range(1, N + 1))
result = []

while q:
    for _ in range(K - 1):
        q.append(q.popleft())
    result.append(q.popleft())

print('<' + ', '.join(map(str, result)) + '>')`
                            }
                        ],
                        cpp: [
                            {
                                title: '큐 초기화',
                                desc: `queue에 1~N을 넣어 원형 구조를 준비합니다.
C++ queue는 front()/push()/pop()으로 FIFO 연산을 지원합니다.`,
                                code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;
    queue<int> q;
    for (int i = 1; i <= N; i++) q.push(i);`
                            },
                            {
                                title: 'K-1명 뒤로 보내기',
                                desc: `front()로 값을 읽고 push()로 뒤에 넣은 뒤 pop()으로 앞에서 제거합니다.
C++ queue는 pop()이 값을 반환하지 않으므로 front()를 먼저 호출해야 합니다.`,
                                code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;
    queue<int> q;
    for (int i = 1; i <= N; i++) q.push(i);

    cout << "<";
    while (!q.empty()) {
        for (int i = 0; i < K - 1; i++) {
            q.push(q.front());  // 뒤로 보내기
            q.pop();`
                            },
                            {
                                title: 'K번째 사람 제거',
                                desc: `회전 후 맨 앞(front())이 K번째 사람이므로 출력하고 pop()합니다.
마지막 원소가 아니면 쉼표를 추가하여 출력 형식을 맞춥니다.`,
                                code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;
    queue<int> q;
    for (int i = 1; i <= N; i++) q.push(i);

    cout << "<";
    while (!q.empty()) {
        for (int i = 0; i < K - 1; i++) {
            q.push(q.front());
            q.pop();
        }
        cout << q.front();  // K번째 제거!
        q.pop();
        if (!q.empty()) cout << ", ";`
                            },
                            {
                                title: '결과 출력',
                                desc: `꺾쇠(<>)로 감싸서 BOJ 출력 형식을 완성합니다.
cout으로 바로 출력하므로 별도 결과 배열 없이 메모리를 절약합니다.`,
                                code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;
    queue<int> q;
    for (int i = 1; i <= N; i++) q.push(i);

    cout << "<";
    while (!q.empty()) {
        for (int i = 0; i < K - 1; i++) {
            q.push(q.front());
            q.pop();
        }
        cout << q.front();
        q.pop();
        if (!q.empty()) cout << ", ";
    }
    cout << ">" << endl;
}`
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
