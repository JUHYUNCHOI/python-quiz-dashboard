import type { AlgoTopic } from '../types'

export const treeTopic: AlgoTopic = {
    id: 'tree',
    title: '트리',
    icon: '🌳',
    category: '심화 (Gold~Platinum)',
    order: 15,
    description: '계층 구조를 표현하는 트리와 다양한 순회 방법을 배웁니다',
    track: 'cpp',
    stages: [
        {
            num: 1,
            title: '기본 트리',
            problemIds: [
                'lc-104',
                'lc-226'
            ],
            desc: '트리의 기본적인 DFS/BFS 문제를 연습합니다 (Easy)'
        },
        {
            num: 2,
            title: '트리 응용',
            problemIds: [
                'lc-102',
                'boj-1991'
            ],
            desc: '트리 순회와 레벨별 처리를 연습합니다 (Medium ~ Silver)'
        }
    ],
    problems: [
        {
            id: 'lc-104',
            title: 'LeetCode 104 - Maximum Depth of Binary Tree',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
            simIntro: 'DFS 재귀로 트리의 최대 깊이를 구하는 과정을 관찰하세요.',
            sim: {
                type: 'maxDepth'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>이진 트리의 <code>root</code>가 주어졌을 때, 최대 깊이를 반환하세요. 이진 트리의 <strong>최대 깊이</strong>는 루트 노드에서 가장 먼 리프 노드까지의 가장 긴 경로에 있는 노드의 수입니다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>root = [3,9,20,null,null,15,7]</pre></div>
                    <div><strong>출력</strong><pre>3</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>root = [1,null,2]</pre></div>
                    <div><strong>출력</strong><pre>2</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>노드 수는 <code>[0, 10<sup>4</sup>]</code> 범위입니다.</li>
                    <li><code>-100 ≤ Node.val ≤ 100</code></li>
                </ul>
            `,
            hints: [
                {
                    title: '트리의 깊이를 어떻게 잴까?',
                    content: '트리의 "최대 깊이"를 구하려면 결국 <strong>모든 노드를 방문</strong>하면서 깊이를 추적해야 합니다.<br><br>방법은 두 가지가 떠오릅니다:<br>1. <strong>BFS</strong>로 레벨별로 내려가면서 레벨 수를 세기<br>2. <strong>DFS</strong>로 깊이 내려가면서 최대 깊이를 추적하기<br><br>어느 쪽이든 "모든 노드 방문"은 피할 수 없으니, 더 간결한 방법을 찾아봅시다.'
                },
                {
                    title: '재귀적으로 생각해보자',
                    content: '트리 문제는 재귀와 찰떡입니다. 이렇게 생각해보세요:<br><br><strong>"이 노드의 최대 깊이 = 1 + max(왼쪽 깊이, 오른쪽 깊이)"</strong><br><br><div style="padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.82rem;text-align:center;"><div style="display:flex;justify-content:center;"><span style="padding:3px 10px;background:var(--accent);color:white;border-radius:50%;font-weight:700;">3</span></div><div style="display:flex;justify-content:center;gap:40px;margin-top:4px;"><span style="padding:3px 10px;background:var(--accent);color:white;border-radius:50%;opacity:0.8;">9</span><span style="padding:3px 10px;background:var(--accent);color:white;border-radius:50%;opacity:0.8;">20</span></div><div style="display:flex;justify-content:center;margin-top:4px;margin-left:40px;gap:20px;"><span style="padding:3px 8px;background:var(--accent);color:white;border-radius:50%;opacity:0.6;font-size:0.75rem;">15</span><span style="padding:3px 8px;background:var(--accent);color:white;border-radius:50%;opacity:0.6;font-size:0.75rem;">7</span></div><div style="margin-top:6px;color:var(--text2);font-size:0.78rem;">깊이 = 1 + max(1, 2) = <strong style="color:var(--accent);">3</strong></div></div><br><br>왼쪽 서브트리의 깊이와 오른쪽 서브트리의 깊이 중 큰 값에 현재 노드(+1)를 더하면 됩니다.<br><br>기저 조건: 노드가 없으면(<span class="lang-py"><code>None</code></span><span class="lang-cpp"><code>nullptr</code></span>) 깊이는 <strong>0</strong>입니다.'
                },
                {
                    title: '코드 한 줄로!',
                    content: '재귀의 힘을 느껴보세요 — 이 한 줄이 전부입니다:<br><br><span class="lang-py"><code>return 0 if not root else 1 + max(depth(root.left), depth(root.right))</code></span><span class="lang-cpp"><code>return !root ? 0 : 1 + max(maxDepth(root->left), maxDepth(root->right));</code></span><br><br>"빈 노드면 0, 아니면 1 + 자식 중 큰 깊이" — 이게 전부입니다!'
                }
            ],
            templates: {
                python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def maxDepth(self, root) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
                cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`
            },
            solutions: [
                {
                    approach: '재귀 DFS',
                    description: '빈 노드면 0을 반환하고, 그렇지 않으면 왼쪽/오른쪽 서브트리 깊이 중 큰 값 + 1을 반환합니다.',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(h)',
                    templates: {
                        python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def maxDepth(self, root) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
                        cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '기저 조건',
                                desc: '빈 노드면 깊이 0을 반환하여 재귀를 멈춘다.',
                                code: `if not root:
    return 0`
                            },
                            {
                                title: '재귀 호출',
                                desc: '왼쪽/오른쪽 서브트리의 깊이를 각각 재귀로 구한다.',
                                code: `left = self.maxDepth(root.left)
right = self.maxDepth(root.right)`
                            },
                            {
                                title: '결과 반환',
                                desc: '현재 노드(+1)와 자식 중 더 깊은 쪽을 합치면 전체 깊이가 된다.',
                                code: 'return 1 + max(left, right)'
                            }
                        ],
                        cpp: [
                            {
                                title: '기저 조건',
                                desc: '빈 노드(nullptr)면 깊이 0.',
                                code: 'if (!root) return 0;'
                            },
                            {
                                title: '재귀 호출',
                                desc: '->로 포인터의 멤버 접근.',
                                code: `int left = maxDepth(root->left);
int right = maxDepth(root->right);`
                            },
                            {
                                title: '결과 반환',
                                desc: '현재 노드(+1) + 자식 중 큰 깊이 = 전체 최대 깊이.',
                                code: 'return 1 + max(left, right);'
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-226',
            title: 'LeetCode 226 - Invert Binary Tree',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/invert-binary-tree/',
            simIntro: '재귀적으로 트리의 좌우 자식을 교환하는 과정을 관찰하세요.',
            sim: {
                type: 'invert'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>이진 트리의 <code>root</code>가 주어졌을 때, 트리를 좌우 반전(뒤집기)하여 반환하세요. 모든 노드의 왼쪽 자식과 오른쪽 자식을 서로 바꿉니다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>root = [4,2,7,1,3,6,9]</pre></div>
                    <div><strong>출력</strong><pre>[4,7,2,9,6,3,1]</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>root = [2,1,3]</pre></div>
                    <div><strong>출력</strong><pre>[2,3,1]</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>root = []</pre></div>
                    <div><strong>출력</strong><pre>[]</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>노드 수는 <code>[0, 100]</code> 범위입니다.</li>
                    <li><code>-100 ≤ Node.val ≤ 100</code></li>
                </ul>
            `,
            hints: [
                {
                    title: '뒤집기 = 왼쪽과 오른쪽을 바꾸기',
                    content: '"트리를 뒤집는다"는 말이 거창해 보이지만, 사실 <strong>모든 노드에서 왼쪽 자식과 오른쪽 자식을 swap</strong>하면 끝입니다.<br><br>모든 노드를 방문해야 하므로 DFS든 BFS든 어떤 순회 방법이든 OK. 핵심은 "빠짐없이 모든 노드에서 swap"입니다.'
                },
                {
                    title: '재귀로 간단하게',
                    content: '재귀로 구현하면 아주 깔끔합니다:<br><br>1. 현재 노드의 <code>left</code>와 <code>right</code>를 <strong>swap</strong><br>2. 왼쪽 서브트리를 재귀로 뒤집기<br>3. 오른쪽 서브트리를 재귀로 뒤집기<br><br><div style="display:flex;gap:20px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.82rem;flex-wrap:wrap;"><div style="text-align:center;"><div style="padding:3px 10px;background:var(--accent);color:white;border-radius:50%;font-weight:700;">4</div><div style="display:flex;gap:12px;margin-top:4px;"><span style="padding:2px 8px;background:var(--accent);color:white;border-radius:50%;opacity:0.8;">2</span><span style="padding:2px 8px;background:var(--accent);color:white;border-radius:50%;opacity:0.8;">7</span></div></div><span style="font-size:1.2rem;color:var(--text3);">→</span><div style="text-align:center;"><div style="padding:3px 10px;background:var(--green);color:white;border-radius:50%;font-weight:700;">4</div><div style="display:flex;gap:12px;margin-top:4px;"><span style="padding:2px 8px;background:var(--green);color:white;border-radius:50%;opacity:0.8;">7</span><span style="padding:2px 8px;background:var(--green);color:white;border-radius:50%;opacity:0.8;">2</span></div></div></div><br><br>기저 조건: 노드가 없으면(<span class="lang-py"><code>None</code></span><span class="lang-cpp"><code>nullptr</code></span>) 그냥 return.'
                },
                {
                    title: '순서가 중요할까?',
                    content: '흥미로운 점 — swap과 재귀의 순서에 따라 전위/후위가 달라집니다:<br><br><strong>전위</strong> (swap 먼저 → 재귀): 현재 노드를 swap한 뒤 자식들을 뒤집기<br><strong>후위</strong> (재귀 먼저 → swap): 자식들을 먼저 뒤집고 나서 현재 노드를 swap<br><br>둘 다 정상 동작합니다. 하지만 <strong>중위</strong>(왼쪽 재귀 → swap → 오른쪽 재귀)는 주의! swap 후에 왼쪽/오른쪽이 바뀌어서, 같은 쪽을 두 번 뒤집게 됩니다.'
                }
            ],
            templates: {
                python: `class Solution:
    def invertTree(self, root):
        if not root:
            return None
        root.left, root.right = root.right, root.left
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root`,
                cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};`
            },
            solutions: [
                {
                    approach: '재귀 좌우 교환',
                    description: '각 노드에서 왼쪽/오른쪽 자식을 교환하고, 재귀적으로 서브트리도 반전합니다.',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(h)',
                    templates: {
                        python: `class Solution:
    def invertTree(self, root):
        if not root:
            return None
        root.left, root.right = root.right, root.left
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root`,
                        cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '기저 조건',
                                desc: '빈 노드면 교환할 게 없으므로 None 반환.',
                                code: `if not root:
    return None`
                            },
                            {
                                title: '좌우 교환',
                                desc: '현재 노드의 왼쪽/오른쪽 자식을 동시에 교환한다.',
                                code: 'root.left, root.right = root.right, root.left'
                            },
                            {
                                title: '재귀 호출 + 반환',
                                desc: '교환 후 자식 서브트리도 재귀적으로 반전시킨다.',
                                code: `self.invertTree(root.left)
self.invertTree(root.right)
return root`
                            }
                        ],
                        cpp: [
                            {
                                title: '기저 조건',
                                desc: 'nullptr이면 교환할 자식이 없으므로 바로 반환.',
                                code: 'if (!root) return nullptr;'
                            },
                            {
                                title: '좌우 교환',
                                desc: 'swap()으로 포인터 교환. Python의 동시 대입과 동일.',
                                code: 'swap(root->left, root->right);'
                            },
                            {
                                title: '재귀 호출 + 반환',
                                desc: '교환 후 자식 서브트리도 재귀적으로 반전 처리.',
                                code: `invertTree(root->left);
invertTree(root->right);
return root;`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-102',
            title: 'LeetCode 102 - Binary Tree Level Order Traversal',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
            simIntro: 'BFS로 트리를 레벨별로 순회하는 과정을 관찰하세요.',
            sim: {
                type: 'levelOrder'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>이진 트리의 <code>root</code>가 주어졌을 때, 노드 값의 <strong>레벨 순서 순회(level order traversal)</strong>를 반환하세요. 즉, 왼쪽에서 오른쪽으로, 레벨별로 노드 값을 반환합니다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>root = [3,9,20,null,null,15,7]</pre></div>
                    <div><strong>출력</strong><pre>[[3],[9,20],[15,7]]</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>root = [1]</pre></div>
                    <div><strong>출력</strong><pre>[[1]]</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>root = []</pre></div>
                    <div><strong>출력</strong><pre>[]</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>노드 수는 <code>[0, 2000]</code> 범위입니다.</li>
                    <li><code>-1000 ≤ Node.val ≤ 1000</code></li>
                </ul>
            `,
            hints: [
                {
                    title: '레벨별로 나누려면?',
                    content: '트리를 위에서 아래로, <strong>같은 레벨끼리 묶어야</strong> 합니다.<br><br>DFS로도 가능합니다 — 깊이를 추적하면서 해당 레벨의 리스트에 추가하면 됩니다. 하지만 더 자연스러운 방법이 있습니다...'
                },
                {
                    title: 'BFS가 딱이다!',
                    content: '<strong>BFS(너비 우선 탐색)</strong>는 원래 레벨별로 탐색하는 알고리즘이니, 이 문제에 딱입니다!<br><br>핵심 트릭: <strong>현재 큐의 크기(size)만큼만 pop</strong>하면 정확히 한 레벨이 끝납니다.<br><br>큐에서 노드를 꺼내면서 자식을 넣으면, 다음 레벨이 자연스럽게 큐에 쌓입니다.<br><br><div style="padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.82rem;"><div style="display:flex;gap:4px;align-items:center;margin-bottom:4px;"><span style="color:var(--text2);min-width:50px;">레벨 0:</span><span style="padding:3px 8px;background:var(--accent);color:white;border-radius:4px;">3</span></div><div style="display:flex;gap:4px;align-items:center;margin-bottom:4px;"><span style="color:var(--text2);min-width:50px;">레벨 1:</span><span style="padding:3px 8px;background:var(--accent);color:white;border-radius:4px;opacity:0.8;">9</span><span style="padding:3px 8px;background:var(--accent);color:white;border-radius:4px;opacity:0.8;">20</span></div><div style="display:flex;gap:4px;align-items:center;"><span style="color:var(--text2);min-width:50px;">레벨 2:</span><span style="padding:3px 8px;background:var(--accent);color:white;border-radius:4px;opacity:0.6;">15</span><span style="padding:3px 8px;background:var(--accent);color:white;border-radius:4px;opacity:0.6;">7</span></div></div>'
                },
                {
                    title: '<span class="lang-py">Python: collections.deque</span><span class="lang-cpp">C++: queue</span>',
                    content: '<span class="lang-py">Python의 <code>collections.deque</code>를 사용하면 <code>popleft()</code>가 O(1)입니다. 일반 리스트의 <code>pop(0)</code>은 O(n)이라 느립니다!<br><br><code>for _ in range(len(queue)):</code>로 현재 레벨 크기만큼만 처리하고, <code>queue.append()</code>로 자식을 추가합니다.</span><span class="lang-cpp">C++의 <code>queue&lt;TreeNode*&gt;</code>를 사용합니다. <code>q.front()</code>으로 꺼내고 <code>q.pop()</code>으로 제거.<br><br>중요: <code>int sz = q.size();</code>를 <strong>반복문 전에 미리 저장</strong>해야 합니다. 반복 중에 <code>q.push()</code>로 자식을 추가하면 <code>q.size()</code>가 바뀌니까요!</span>'
                }
            ],
            templates: {
                python: `from collections import deque

class Solution:
    def levelOrder(self, root):
        if not root:
            return []
        result = []
        queue = deque([root])
        while queue:
            level = []
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)
                if node.left:  queue.append(node.left)
                if node.right: queue.append(node.right)
            result.append(level)
        return result`,
                cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
            result.push_back(level);
        }
        return result;
    }
};`
            },
            solutions: [
                {
                    approach: 'BFS (큐 사용)',
                    description: '큐에 루트를 넣고, 매 레벨마다 큐 크기만큼 노드를 꺼내 처리합니다.',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `from collections import deque

class Solution:
    def levelOrder(self, root):
        if not root:
            return []
        result = []
        queue = deque([root])
        while queue:
            level = []
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)
                if node.left:  queue.append(node.left)
                if node.right: queue.append(node.right)
            result.append(level)
        return result`,
                        cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
            result.push_back(level);
        }
        return result;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '초기화',
                                desc: '결과 리스트와 BFS용 큐를 준비하고, 루트를 큐에 넣는다.',
                                code: `result = []
queue = deque([root])`
                            },
                            {
                                title: '레벨별 처리',
                                desc: '큐의 현재 크기만큼만 꺼내면 같은 레벨 노드만 처리된다.',
                                code: `while queue:
    level = []
    for _ in range(len(queue)):
        node = queue.popleft()
        level.append(node.val)`
                            },
                            {
                                title: '자식 추가 + 결과 반환',
                                desc: '꺼낸 노드의 자식을 큐에 넣으면 다음 레벨이 자동으로 구성된다.',
                                code: `        if node.left:  queue.append(node.left)
        if node.right: queue.append(node.right)
    result.append(level)
return result`
                            }
                        ],
                        cpp: [
                            {
                                title: '초기화',
                                desc: '결과 벡터와 BFS용 큐를 준비하고, 루트를 큐에 넣는다.',
                                code: `vector<vector<int>> result;
queue<TreeNode*> q;
q.push(root);`
                            },
                            {
                                title: '레벨별 처리',
                                desc: 'q.size()를 미리 저장 → 현재 레벨 크기만큼만 처리.',
                                code: `while (!q.empty()) {
    int sz = q.size();  // 현재 레벨 크기
    vector<int> level;
    for (int i = 0; i < sz; i++) {
        TreeNode* node = q.front(); q.pop();
        level.push_back(node->val);`
                            },
                            {
                                title: '자식 추가 + 결과 반환',
                                desc: '자식 노드를 큐에 넣으면 다음 레벨이 자연스럽게 구성된다.',
                                code: `        if (node->left)  q.push(node->left);
        if (node->right) q.push(node->right);
    }
    result.push_back(level);
}
return result;`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1991',
            title: 'BOJ 1991 - 트리 순회',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1991',
            simIntro: '전위/중위/후위 순회가 노드를 방문하는 순서를 확인하세요.',
            sim: {
                type: 'treeTraversal'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>이진 트리를 입력받아 전위 순회(preorder), 중위 순회(inorder), 후위 순회(postorder)한 결과를 출력하는 프로그램을 작성하시오.</p>
                <p>예를 들어 위와 같은 이진 트리가 입력되면,</p>
                <ul>
                    <li>전위 순회한 결과: ABDCEFG</li>
                    <li>중위 순회한 결과: DBAECFG</li>
                    <li>후위 순회한 결과: DBEGFCA</li>
                </ul>
                <p>가 된다.</p>
                <h4>입력</h4>
                <p>첫째 줄에는 이진 트리의 노드의 개수 N(1 &le; N &le; 26)이 주어진다. 둘째 줄부터 N개의 줄에 걸쳐 각 노드와 그의 왼쪽 자식 노드, 오른쪽 자식 노드가 주어진다. 노드의 이름은 A부터 차례대로 알파벳 대문자로 매겨지며, 항상 A가 루트 노드가 된다. 자식 노드가 없는 경우에는 .으로 표현한다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 전위 순회, 둘째 줄에 중위 순회, 셋째 줄에 후위 순회한 결과를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>7
A B C
B D .
C E F
D . .
E . .
F . G
G . .</pre></div>
                    <div><strong>출력</strong><pre>ABDCEFG
DBAECFG
DBEGFCA</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li><code>1 ≤ N ≤ 26</code></li>
                    <li>노드 이름은 A부터 차례대로 대문자 알파벳으로 매겨진다.</li>
                    <li>항상 A가 루트 노드가 된다.</li>
                </ul>
            `,
            hints: [
                {
                    title: '전위·중위·후위, 순서만 다르다',
                    content: '세 순회 모두 <strong>왼쪽 → 오른쪽</strong> 방향으로 방문하되, <strong>"현재 노드를 언제 출력하느냐"</strong>만 다릅니다:<br><br><div style="display:flex;gap:8px;flex-wrap:wrap;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.8rem;"><div style="padding:4px 8px;background:var(--accent);color:white;border-radius:4px;"><strong>전위</strong>: <u>출력</u>→왼→오</div><div style="padding:4px 8px;background:#00b894;color:white;border-radius:4px;"><strong>중위</strong>: 왼→<u>출력</u>→오</div><div style="padding:4px 8px;background:var(--yellow);color:#333;border-radius:4px;"><strong>후위</strong>: 왼→오→<u>출력</u></div></div><br><br><strong>전위</strong>: 먼저 출력 → 왼 → 오 (루트가 맨 앞)<br><strong>중위</strong>: 왼 → 출력 → 오 (루트가 가운데)<br><strong>후위</strong>: 왼 → 오 → 출력 (루트가 맨 뒤)<br><br>이걸 기억하면 재귀 코드가 바로 나옵니다!'
                },
                {
                    title: '입력을 어떻게 저장할까?',
                    content: '입력이 <code>A B C</code> 형태로 주어지니, 이걸 어딘가에 저장해야 합니다.<br><br><span class="lang-py"><code>dict</code>에 <code>tree[node] = (left, right)</code> 형태로 저장하면, 재귀 호출 시 <code>tree["A"]</code>로 바로 자식에 접근 가능!</span><span class="lang-cpp"><code>map&lt;char, pair&lt;char, char&gt;&gt;</code>에 저장하면, <code>tree[\'A\'].first</code>로 왼쪽 자식, <code>.second</code>로 오른쪽 자식에 접근 가능!</span><br><br>자식이 없으면 <code>.</code>으로 표시되니, <code>.</code>이면 재귀를 멈추면 됩니다.'
                },
                {
                    title: '재귀 함수 하나로 세 가지 순회',
                    content: `재귀 함수의 구조는 동일하고, <strong><span class="lang-py"><code>print(node)</code></span><span class="lang-cpp"><code>cout &lt;&lt; node</code></span> 위치만 바꾸면</strong> 세 가지 순회가 완성됩니다:<br><br><span class="lang-py"><pre>def traverse(node):
    if node == '.': return
    # print(node) ← 여기면 전위
    traverse(tree[node][0])
    # print(node) ← 여기면 중위
    traverse(tree[node][1])
    # print(node) ← 여기면 후위</pre></span><span class="lang-cpp"><pre>void traverse(char node) {
    if (node == '.') return;
    // cout << node; ← 여기면 전위
    traverse(tree[node].first);
    // cout << node; ← 여기면 중위
    traverse(tree[node].second);
    // cout << node; ← 여기면 후위
}</pre></span>`
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N = int(input())
tree = {}
for _ in range(N):
    node, left, right = input().split()
    tree[node] = (left, right)

def preorder(node):
    if node == '.':
        return
    print(node, end='')
    preorder(tree[node][0])
    preorder(tree[node][1])

def inorder(node):
    if node == '.':
        return
    inorder(tree[node][0])
    print(node, end='')
    inorder(tree[node][1])

def postorder(node):
    if node == '.':
        return
    postorder(tree[node][0])
    postorder(tree[node][1])
    print(node, end='')

preorder('A')
print()
inorder('A')
print()
postorder('A')
print()`,
                cpp: `#include <iostream>
#include <map>
using namespace std;

map<char, pair<char, char>> tree;

void preorder(char node) {
    if (node == '.') return;
    cout << node;
    preorder(tree[node].first);
    preorder(tree[node].second);
}

void inorder(char node) {
    if (node == '.') return;
    inorder(tree[node].first);
    cout << node;
    inorder(tree[node].second);
}

void postorder(char node) {
    if (node == '.') return;
    postorder(tree[node].first);
    postorder(tree[node].second);
    cout << node;
}

int main() {
    int N;
    scanf("%d", &N);
    for (int i = 0; i < N; i++) {
        char node, left, right;
        scanf(" %c %c %c", &node, &left, &right);
        tree[node] = {left, right};
    }
    preorder('A'); cout << "\\n";
    inorder('A');  cout << "\\n";
    postorder('A'); cout << "\\n";
    return 0;
}`
            },
            solutions: [
                {
                    approach: '재귀 순회',
                    description: '트리를 딕셔너리에 저장한 뒤, 재귀 함수로 전위/중위/후위 순회를 수행합니다.',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N = int(input())
tree = {}
for _ in range(N):
    node, left, right = input().split()
    tree[node] = (left, right)

def preorder(node):
    if node == '.':
        return
    print(node, end='')
    preorder(tree[node][0])
    preorder(tree[node][1])

def inorder(node):
    if node == '.':
        return
    inorder(tree[node][0])
    print(node, end='')
    inorder(tree[node][1])

def postorder(node):
    if node == '.':
        return
    postorder(tree[node][0])
    postorder(tree[node][1])
    print(node, end='')

preorder('A')
print()
inorder('A')
print()
postorder('A')
print()`,
                        cpp: `#include <iostream>
#include <map>
using namespace std;

map<char, pair<char, char>> tree;

void preorder(char node) {
    if (node == '.') return;
    cout << node;
    preorder(tree[node].first);
    preorder(tree[node].second);
}

void inorder(char node) {
    if (node == '.') return;
    inorder(tree[node].first);
    cout << node;
    inorder(tree[node].second);
}

void postorder(char node) {
    if (node == '.') return;
    postorder(tree[node].first);
    postorder(tree[node].second);
    cout << node;
}

int main() {
    int N;
    scanf("%d", &N);
    for (int i = 0; i < N; i++) {
        char node, left, right;
        scanf(" %c %c %c", &node, &left, &right);
        tree[node] = {left, right};
    }
    preorder('A'); cout << "\\n";
    inorder('A');  cout << "\\n";
    postorder('A'); cout << "\\n";
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '트리 입력 저장',
                                desc: '딕셔너리에 각 노드의 왼쪽/오른쪽 자식을 저장한다.',
                                code: `tree = {}
for _ in range(N):
    node, left, right = input().split()
    tree[node] = (left, right)`
                            },
                            {
                                title: '전위 순회',
                                desc: '출력→왼쪽→오른쪽 순서. 루트를 가장 먼저 방문한다.',
                                code: `def preorder(node):
    if node == '.':
        return
    print(node, end='')
    preorder(tree[node][0])
    preorder(tree[node][1])`
                            },
                            {
                                title: '중위/후위 순회',
                                desc: '중위: 왼→출력→오, 후위: 왼→오→출력. 출력 위치만 다르다.',
                                code: `def inorder(node):
    if node == '.': return
    inorder(tree[node][0])
    print(node, end='')
    inorder(tree[node][1])

def postorder(node):
    if node == '.': return
    postorder(tree[node][0])
    postorder(tree[node][1])
    print(node, end='')`
                            }
                        ],
                        cpp: [
                            {
                                title: '트리 입력 저장',
                                desc: `map<char, pair<char,char>>로 자식 저장.
Python의 dict와 같은 역할.`,
                                code: `map<char, pair<char, char>> tree;
for (int i = 0; i < N; i++) {
    char node, left, right;
    scanf(" %c %c %c", &node, &left, &right);
    tree[node] = {left, right};
}`
                            },
                            {
                                title: '전위 순회',
                                desc: `출력 → 왼쪽 → 오른쪽 순서.
.first = 왼쪽, .second = 오른쪽.`,
                                code: `void preorder(char node) {
    if (node == '.') return;
    cout << node;
    preorder(tree[node].first);
    preorder(tree[node].second);
}`
                            },
                            {
                                title: '중위/후위 순회',
                                desc: '중위: 왼→출력→오, 후위: 왼→오→출력. cout 위치만 다르다.',
                                code: `void inorder(char node) {
    if (node == '.') return;
    inorder(tree[node].first);
    cout << node;
    inorder(tree[node].second);
}

void postorder(char node) {
    if (node == '.') return;
    postorder(tree[node].first);
    postorder(tree[node].second);
    cout << node;
}`
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
