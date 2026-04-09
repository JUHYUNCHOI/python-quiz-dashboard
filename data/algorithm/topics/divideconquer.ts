import type { AlgoTopic } from '../types'

export const divideConquerTopic: AlgoTopic = {
    id: 'divideconquer',
    title: '분할정복',
    icon: '🔪',
    category: '문제 해결 기법 (Silver~Gold)',
    order: 14,
    description: '큰 문제를 작게 나눠서 풀고 합치는 기법',
    titleEn: 'Divide & Conquer',
    categoryEn: 'Problem Solving (Silver~Gold)',
    descriptionEn: 'Break big problems into smaller pieces, solve them, and combine the results',
    track: 'cpp',
    stages: [
        {
            num: 1,
            title: '영역 나누기',
            titleEn: 'Region Splitting',
            problemIds: [
                'boj-2630',
                'boj-1992',
                'boj-1780'
            ],
            desc: '2D 영역을 재귀로 분할 (Silver)',
            descEn: 'Recursive 2D region partitioning (Silver)'
        },
        {
            num: 2,
            title: '거듭제곱 + 행렬',
            titleEn: 'Exponentiation + Matrix',
            problemIds: [
                'boj-1629',
                'boj-2740',
                'boj-10830',
                'boj-11444'
            ],
            desc: '분할정복 거듭제곱, 행렬 곱셈 (Silver~Gold)',
            descEn: 'Fast exponentiation, matrix multiplication (Silver~Gold)'
        },
        {
            num: 3,
            title: '심화',
            titleEn: 'Advanced',
            problemIds: [
                'boj-11401',
                'boj-6549'
            ],
            desc: '페르마 소정리, 구간 분할정복 (Gold~Platinum)',
            descEn: "Fermat's little theorem, range divide & conquer (Gold~Platinum)"
        }
    ],
    problems: [
        {
            id: 'boj-2630',
            title: 'BOJ 2630 - 색종이 만들기',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/2630',
            simIntro: '4×4 색종이를 재귀적으로 4등분하며 같은 색인지 확인하는 과정을 관찰하세요.',
            sim: {
                type: 'paper'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>여러개의 정사각형칸들로 이루어진 정사각형 모양의 종이가 주어져 있고, 각 정사각형칸은 하얀색 또는 파란색으로 칠해져 있다. 주어진 종이를 일정한 규칙에 따라 잘라서 다양한 크기의 하얀색 또는 파란색 색종이를 만들려고 한다. 전체 종이가 모두 같은 색이면 그대로 사용하고, 아니면 4등분하여 재귀적으로 반복한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>8
1 1 0 0 0 0 1 1
1 1 0 0 0 0 1 1
0 0 0 0 1 1 0 0
0 0 0 0 1 1 0 0
1 0 0 0 1 1 1 1
0 1 0 0 1 1 1 1
0 0 1 1 1 1 1 1
0 0 1 1 1 1 1 1</pre></div>
        <div><strong>출력</strong><pre>9
7</pre></div>
    </div></div>
    <h4>입력</h4>
    <p>첫째 줄에는 전체 종이의 한 변의 길이 N이 주어져 있다. N은 2, 4, 8, 16, 32, 64, 128 중 하나이다. 색종이의 각 가로줄의 정사각형칸들의 색이 윗줄부터 차례로 둘째 줄부터 (N+1)번째 줄까지에 주어진다. 하얀색으로 칠해진 칸은 0, 파란색으로 칠해진 칸은 1로 주어지며, 각 줄마다 N개의 수가 빈 칸을 사이에 두고 주어진다.</p>
    <h4>출력</h4>
    <p>첫째 줄에는 잘라진 하얀색 색종이의 개수를 출력하고, 둘째 줄에는 파란색 색종이의 개수를 출력한다.</p>
    <h4>제약 조건</h4>
    <ul><li>N은 2, 4, 8, 16, 32, 64, 128 중 하나</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '종이를 보고 "흰색 몇 개, 파란색 몇 개"를 세야 하니까, 일단 <strong>모든 칸을 하나하나 확인</strong>하면 되지 않을까?<br><br>근데 잠깐 — 문제를 다시 읽어보면, 단순히 칸 수를 세는 게 아니라 <strong>"같은 색으로 이루어진 색종이 조각의 수"</strong>를 세는 거야.<br><br><div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin:10px 0;"><div style="text-align:center;"><div style="font-size:0.7rem;color:var(--red);font-weight:600;margin-bottom:4px;">칸 수 세기 X</div><div style="display:grid;grid-template-columns:repeat(2,22px);gap:2px;"><div style="width:22px;height:22px;background:var(--accent)30;border:1px solid var(--accent);border-radius:2px;font-size:0.6rem;text-align:center;line-height:22px;">0</div><div style="width:22px;height:22px;background:var(--green)30;border:1px solid var(--green);border-radius:2px;font-size:0.6rem;text-align:center;line-height:22px;">1</div><div style="width:22px;height:22px;background:var(--green)30;border:1px solid var(--green);border-radius:2px;font-size:0.6rem;text-align:center;line-height:22px;">1</div><div style="width:22px;height:22px;background:var(--green)30;border:1px solid var(--green);border-radius:2px;font-size:0.6rem;text-align:center;line-height:22px;">1</div></div></div><div style="text-align:center;"><div style="font-size:0.7rem;color:var(--green);font-weight:600;margin-bottom:4px;">영역 단위 O</div><div style="display:grid;grid-template-columns:repeat(2,22px);gap:2px;"><div style="width:22px;height:22px;background:var(--accent)40;border:2px solid var(--accent);border-radius:2px;font-size:0.6rem;text-align:center;line-height:22px;">0</div><div style="width:22px;height:22px;background:var(--green)40;border:2px solid var(--green);border-radius:2px;font-size:0.6rem;text-align:center;line-height:22px;">1</div><div style="width:22px;height:22px;background:var(--green)40;border:2px solid var(--green);border-radius:2px;font-size:0.6rem;text-align:center;line-height:22px;">1</div><div style="width:22px;height:22px;background:var(--green)40;border:2px solid var(--green);border-radius:2px;font-size:0.6rem;text-align:center;line-height:22px;">1</div></div><div style="font-size:0.65rem;color:var(--text2);margin-top:2px;">흰1 + 파1 = 총2조각</div></div></div>즉, 영역 전체가 같은 색이어야 하나의 색종이로 인정된다는 뜻이야.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '그럼 "이 영역이 전부 같은 색인지" 어떻게 판단할까?<br><br>전체 종이가 같은 색이면 끝이지만, 아니면? 문제 규칙을 보면 <strong>4등분</strong>해서 각 부분을 다시 확인하라고 해. 이게 바로 <strong>분할정복</strong>이야!<br><br><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:12px 0;"><div style="display:grid;grid-template-columns:repeat(4,22px);gap:2px;"><div style="width:22px;height:22px;background:var(--accent)30;border:1px solid var(--accent);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--accent)30;border:1px solid var(--accent);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--green)30;border:1px solid var(--green);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--green)30;border:1px solid var(--green);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--accent)30;border:1px solid var(--accent);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--accent)30;border:1px solid var(--accent);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--green)30;border:1px solid var(--green);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--green)30;border:1px solid var(--green);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--accent)30;border:1px solid var(--accent);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--green)30;border:1px solid var(--green);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--green)30;border:1px solid var(--green);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--green)30;border:1px solid var(--green);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--accent)30;border:1px solid var(--accent);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--accent)30;border:1px solid var(--accent);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--green)30;border:1px solid var(--green);border-radius:3px;"></div><div style="width:22px;height:22px;background:var(--green)30;border:1px solid var(--green);border-radius:3px;"></div></div><span style="font-size:1.3rem;color:var(--red);">→</span><div style="display:grid;grid-template-columns:repeat(2,48px);gap:6px;"><div style="width:48px;height:48px;border:2px solid var(--accent);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:var(--text2);">혼합</div><div style="width:48px;height:48px;border:2px solid var(--green);border-radius:4px;background:var(--green)15;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:var(--green);font-weight:600;">파랑!</div><div style="width:48px;height:48px;border:2px solid var(--accent);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:var(--text2);">혼합</div><div style="width:48px;height:48px;border:2px solid var(--green);border-radius:4px;background:var(--green)15;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:var(--green);font-weight:600;">파랑!</div></div></div><div style="background:var(--bg2);padding:12px;border-radius:8px;margin-top:8px;font-size:0.9rem;">전체 확인 → 안 되면 4등분 → 각 부분 확인 → 안 되면 또 4등분 → ... → 1×1이면 무조건 카운트</div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>solve(r, c, size)</code> 함수를 만들자:<br><br>① (r,c)부터 size×size 영역의 모든 칸이 같은 색인지 확인<br>② 같으면 → 해당 색 카운트 +1, 끝!<br>③ 다르면 → <code>half = size / 2</code>로 4등분해서 각각 재귀 호출<br><br><strong>기저 조건</strong>: 영역이 1×1이면 무조건 그 칸의 색을 카운트해. 더 나눌 수 없으니까!<br><br>시간복잡도는 매 단계마다 모든 칸을 확인하고, 깊이가 log₂N이니까 <strong>O(N² log N)</strong>이야.'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N = int(input())
paper = [list(map(int, input().split())) for _ in range(N)]

white = blue = 0

def solve(r, c, size):
    global white, blue
    first = paper[r][c]
    all_same = True
    for i in range(r, r + size):
        for j in range(c, c + size):
            if paper[i][j] != first:
                all_same = False
                break
        if not all_same:
            break

    if all_same:
        if first == 0:
            white += 1
        else:
            blue += 1
    else:
        half = size // 2
        solve(r, c, half)
        solve(r, c + half, half)
        solve(r + half, c, half)
        solve(r + half, c + half, half)

solve(0, 0, N)
print(white)
print(blue)`,
                cpp: `#include <iostream>
using namespace std;

int paper[128][128];
int N, white_cnt = 0, blue_cnt = 0;

void solve(int r, int c, int size) {
    int first = paper[r][c];
    bool allSame = true;
    for (int i = r; i < r + size && allSame; i++)
        for (int j = c; j < c + size && allSame; j++)
            if (paper[i][j] != first) allSame = false;

    if (allSame) {
        if (first == 0) white_cnt++;
        else blue_cnt++;
    } else {
        int half = size / 2;
        solve(r, c, half);
        solve(r, c + half, half);
        solve(r + half, c, half);
        solve(r + half, c + half, half);
    }
}

int main() {
    cin >> N;
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            cin >> paper[i][j];
    solve(0, 0, N);
    cout << white_cnt << "\\n" << blue_cnt << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '재귀 4등분',
                    description: '영역이 같은 색이면 카운트, 아니면 4등분하여 재귀 호출합니다.',
                    timeComplexity: 'O(N² log N)',
                    spaceComplexity: 'O(N²)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N = int(input())
paper = [list(map(int, input().split())) for _ in range(N)]

white = blue = 0

def solve(r, c, size):
    global white, blue
    first = paper[r][c]
    all_same = True
    for i in range(r, r + size):
        for j in range(c, c + size):
            if paper[i][j] != first:
                all_same = False
                break
        if not all_same:
            break

    if all_same:
        if first == 0:
            white += 1
        else:
            blue += 1
    else:
        half = size // 2
        solve(r, c, half)
        solve(r, c + half, half)
        solve(r + half, c, half)
        solve(r + half, c + half, half)

solve(0, 0, N)
print(white)
print(blue)`,
                        cpp: `#include <iostream>
using namespace std;

int paper[128][128];
int N, white_cnt = 0, blue_cnt = 0;

void solve(int r, int c, int size) {
    int first = paper[r][c];
    bool allSame = true;
    for (int i = r; i < r + size && allSame; i++)
        for (int j = c; j < c + size && allSame; j++)
            if (paper[i][j] != first) allSame = false;

    if (allSame) {
        if (first == 0) white_cnt++;
        else blue_cnt++;
    } else {
        int half = size / 2;
        solve(r, c, half);
        solve(r, c + half, half);
        solve(r + half, c, half);
        solve(r + half, c + half, half);
    }
}

int main() {
    cin >> N;
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            cin >> paper[i][j];
    solve(0, 0, N);
    cout << white_cnt << "\\n" << blue_cnt << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `sys.stdin.readline으로 빠른 입력.
2D 리스트와 흰/파 카운터를 준비합니다.`,
                                code: `import sys
input = sys.stdin.readline

N = int(input())
paper = [list(map(int, input().split())) for _ in range(N)]
white = blue = 0`
                            },
                            {
                                title: '재귀 함수',
                                desc: `영역이 모두 같은 색이면 카운트하고 끝.
다르면 4등분해서 각각 재귀 호출합니다.`,
                                code: `def solve(r, c, size):
    global white, blue
    first = paper[r][c]
    all_same = all(paper[i][j] == first
        for i in range(r, r+size)
        for j in range(c, c+size))
    if all_same:
        if first == 0: white += 1
        else: blue += 1
    else:
        half = size // 2
        for dr in (0, half):
            for dc in (0, half):
                solve(r+dr, c+dc, half)`
                            },
                            {
                                title: '실행 및 출력',
                                desc: '전체 종이(0,0,N)부터 시작하여 재귀적으로 분할합니다.',
                                code: `solve(0, 0, N)
print(white)
print(blue)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: '2D 배열을 전역으로 선언하고 cin으로 입력받습니다.',
                                code: `#include <iostream>
using namespace std;

int paper[128][128];
int N, white_cnt = 0, blue_cnt = 0;  // 전역 카운터`
                            },
                            {
                                title: '재귀 함수',
                                desc: 'allSame을 일찍 끊는 최적화: && allSame 조건으로 다른 색 발견 즉시 중단.',
                                code: `void solve(int r, int c, int size) {
    int first = paper[r][c];
    bool allSame = true;
    // 영역 전체가 같은 색인지 확인
    for (int i = r; i < r + size && allSame; i++)
        for (int j = c; j < c + size && allSame; j++)
            if (paper[i][j] != first) allSame = false;

    if (allSame) {
        if (first == 0) white_cnt++;
        else blue_cnt++;
    } else {
        int half = size / 2;  // 4등분
        solve(r, c, half);
        solve(r, c + half, half);
        solve(r + half, c, half);
        solve(r + half, c + half, half);
    }
}`
                            },
                            {
                                title: '실행 및 출력',
                                desc: '(0,0,N)부터 시작해 재귀적으로 4등분 탐색합니다.',
                                code: `int main() {
    cin >> N;
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            cin >> paper[i][j];
    solve(0, 0, N);
    cout << white_cnt << "\\n" << blue_cnt << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1992',
            title: 'BOJ 1992 - 쿼드트리',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1992',
            simIntro: '4×4 영상을 쿼드트리 문자열로 압축하는 과정을 관찰하세요.',
            sim: {
                type: 'quad'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>흑백 영상을 압축하여 표현하는 데이터 구조로 쿼드 트리라는 방법이 있다. 주어진 N×N 크기의 영상이 모두 0으로만 되어 있으면 0, 모두 1로만 되어 있으면 1. 아니면 4등분하여 재귀적으로 압축하고 결과를 괄호로 묶는다. 왼쪽 위, 오른쪽 위, 왼쪽 아래, 오른쪽 아래 순서.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>8
11110000
11110000
00011100
00011100
11110000
11110000
11110011
11110011</pre></div>
        <div><strong>출력</strong><pre>((110(0101))(0010)(1(0010)0)100)</pre></div>
    </div></div>
    <h4>입력</h4>
    <p>첫째 줄에는 영상의 크기를 나타내는 숫자 N이 주어진다. N은 언제나 2의 제곱수로 주어지며, 1 ≤ N ≤ 64의 범위를 가진다. 두 번째 줄부터는 길이 N의 문자열이 N개 주어진다. 각 문자는 0 또는 1이며, 0은 흰색, 1은 검은색을 뜻한다.</p>
    <h4>출력</h4>
    <p>영상을 압축한 결과를 출력한다.</p>
    <h4>제약 조건</h4>
    <ul><li>N은 2의 거듭제곱</li><li>1 ≤ N ≤ 64</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '앞에서 풀었던 색종이 만들기(2630)랑 비슷하지 않아? 영역이 전부 같은 값이면 그 값을 쓰고, 아니면 4등분하는 구조!<br><br>근데 이번에는 카운트가 아니라 <strong>문자열로 표현</strong>해야 해. "압축 결과"를 문자열로 만들어서 반환하는 거지.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '카운트는 전역 변수 하나로 됐는데, 문자열은 어떻게 합칠까?<br><br>핵심은 <strong>재귀 함수가 문자열을 반환</strong>하게 만드는 거야:<br>• 모두 같으면 → 그 값("0" 또는 "1") 반환<br>• 다르면 → 4등분한 결과를 <strong>괄호로 감싸서</strong> 반환<br><br><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:10px 0;"><div style="display:grid;grid-template-columns:repeat(2,28px);gap:2px;border:2px solid var(--accent);border-radius:4px;padding:4px;"><div style="width:28px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;font-weight:700;border-radius:3px;background:var(--green)20;color:var(--green);">①</div><div style="width:28px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;font-weight:700;border-radius:3px;background:#e1705520;color:#e17055;">②</div><div style="width:28px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;font-weight:700;border-radius:3px;background:#0984e320;color:#0984e3;">③</div><div style="width:28px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;font-weight:700;border-radius:3px;background:#fdcb6e40;color:#e17055;">④</div></div><span style="color:var(--text2);font-size:0.85rem;">= <code>(①②③④)</code></span></div>순서는 <strong>좌상① → 우상② → 좌하③ → 우하④</strong>야. 이걸 잘못하면 틀리니까 주의!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '함수 구조는 이렇게:<br><br><div style="background:var(--bg2);padding:12px;border-radius:8px;font-size:0.9rem;"><code>solve(r, c, size)</code>:<br>① 영역 전체 같은 값? → 그 값 반환<br>② 아니면 → <code>"(" + solve(좌상) + solve(우상) + solve(좌하) + solve(우하) + ")"</code></div><br>색종이 문제에서 "카운트 +1"이 "문자열 반환"으로 바뀌고, "재귀 호출"이 "문자열 이어붙이기"로 바뀐 것뿐이야. 구조는 완전히 동일해!'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N = int(input())
img = [input().strip() for _ in range(N)]

def solve(r, c, size):
    first = img[r][c]
    all_same = True
    for i in range(r, r + size):
        for j in range(c, c + size):
            if img[i][j] != first:
                all_same = False
                break
        if not all_same:
            break
    if all_same:
        return first
    half = size // 2
    return "(" + solve(r, c, half) + solve(r, c + half, half) + solve(r + half, c, half) + solve(r + half, c + half, half) + ")"

print(solve(0, 0, N))`,
                cpp: `#include <iostream>
#include <string>
using namespace std;
int N;
string img[64];
string solve(int r, int c, int size) {
    char first = img[r][c];
    bool allSame = true;
    for (int i = r; i < r + size && allSame; i++)
        for (int j = c; j < c + size && allSame; j++)
            if (img[i][j] != first) allSame = false;
    if (allSame) return string(1, first);
    int half = size / 2;
    return "(" + solve(r, c, half) + solve(r, c + half, half)
         + solve(r + half, c, half) + solve(r + half, c + half, half) + ")";
}
int main() {
    cin >> N;
    for (int i = 0; i < N; i++) cin >> img[i];
    cout << solve(0, 0, N) << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '재귀 문자열 합치기',
                    description: '모두 같으면 그 값, 아니면 4등분 결과를 괄호로 감쌉니다.',
                    timeComplexity: 'O(N² log N)',
                    spaceComplexity: 'O(N²)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N = int(input())
img = [input().strip() for _ in range(N)]

def solve(r, c, size):
    first = img[r][c]
    all_same = True
    for i in range(r, r + size):
        for j in range(c, c + size):
            if img[i][j] != first:
                all_same = False
                break
        if not all_same:
            break
    if all_same:
        return first
    half = size // 2
    return "(" + solve(r, c, half) + solve(r, c + half, half) + solve(r + half, c, half) + solve(r + half, c + half, half) + ")"

print(solve(0, 0, N))`,
                        cpp: `#include <iostream>
#include <string>
using namespace std;
int N;
string img[64];
string solve(int r, int c, int size) {
    char first = img[r][c];
    bool allSame = true;
    for (int i = r; i < r + size && allSame; i++)
        for (int j = c; j < c + size && allSame; j++)
            if (img[i][j] != first) allSame = false;
    if (allSame) return string(1, first);
    int half = size / 2;
    return "(" + solve(r, c, half) + solve(r, c + half, half)
         + solve(r + half, c, half) + solve(r + half, c + half, half) + ")";
}
int main() {
    cin >> N;
    for (int i = 0; i < N; i++) cin >> img[i];
    cout << solve(0, 0, N) << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: '각 줄을 문자열로 저장 — img[r][c]로 바로 접근 가능.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
img = [input().strip() for _ in range(N)]`
                            },
                            {
                                title: '재귀 함수',
                                desc: `카운트 대신 문자열을 반환하는 것이 색종이와의 차이.
다르면 괄호로 감싸서 4개 결과를 합칩니다.`,
                                code: `def solve(r, c, size):
    first = img[r][c]
    all_same = all(img[i][j] == first
        for i in range(r, r+size)
        for j in range(c, c+size))
    if all_same:
        return first
    half = size // 2
    return "(" + solve(r,c,half) + solve(r,c+half,half) + solve(r+half,c,half) + solve(r+half,c+half,half) + ")"`
                            },
                            {
                                title: '출력',
                                desc: '최종 반환 문자열이 곧 쿼드트리 압축 결과입니다.',
                                code: 'print(solve(0, 0, N))'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: 'string 배열로 각 줄을 저장합니다.',
                                code: `#include <iostream>
#include <string>
using namespace std;

int N;
string img[64];`
                            },
                            {
                                title: '재귀 함수',
                                desc: 'string 반환 — string(1, first)로 char를 문자열로 변환합니다.',
                                code: `string solve(int r, int c, int size) {
    char first = img[r][c];
    bool allSame = true;
    for (int i = r; i < r + size && allSame; i++)
        for (int j = c; j < c + size && allSame; j++)
            if (img[i][j] != first) allSame = false;
    if (allSame) return string(1, first);  // char → string 변환
    int half = size / 2;
    return "(" + solve(r, c, half) + solve(r, c + half, half)
         + solve(r + half, c, half) + solve(r + half, c + half, half) + ")";
}`
                            },
                            {
                                title: '출력',
                                desc: 'solve가 반환하는 문자열 전체를 한 줄로 출력합니다.',
                                code: `int main() {
    cin >> N;
    for (int i = 0; i < N; i++) cin >> img[i];
    cout << solve(0, 0, N) << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1780',
            title: 'BOJ 1780 - 종이의 개수',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1780',
            simIntro: '3×3 종이를 9등분하며 같은 값인지 확인하는 과정을 관찰하세요.',
            sim: {
                type: 'nine'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>N×N크기의 행렬로 표현되는 종이가 있다. 종이의 각 칸에는 -1, 0, 1 중 하나가 저장되어 있다. 종이가 모두 같은 수로 되어 있으면 해당 종이를 사용하고, 아니면 9등분하여 재귀적으로 반복한다. -1로만 채워진 종이 수, 0으로만 채워진 종이 수, 1로만 채워진 종이 수를 출력.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>9
0 0 0 1 1 1 -1 -1 -1
0 0 0 1 1 1 -1 -1 -1
0 0 0 1 1 1 -1 -1 -1
1 1 1 0 0 0 0 0 0
1 1 1 0 0 0 0 0 0
1 1 1 0 0 0 0 0 0
0 1 -1 0 1 -1 0 1 -1
0 -1 1 0 -1 1 0 -1 1
0 1 -1 1 0 -1 0 1 -1</pre></div>
        <div><strong>출력</strong><pre>10
12
11</pre></div>
    </div></div>
    <h4>입력</h4>
    <p>첫째 줄에 N(1 ≤ N ≤ 3<sup>7</sup>, N은 3<sup>k</sup> 꼴)이 주어진다. 다음 N개의 줄에는 N개의 정수로 행렬이 주어진다.</p>
    <h4>출력</h4>
    <p>첫째 줄에 -1로만 채워진 종이의 개수를, 둘째 줄에 0으로만 채워진 종이의 개수를, 셋째 줄에 1로만 채워진 종이의 개수를 출력한다.</p>
    <h4>제약 조건</h4>
    <ul><li>N은 3<sup>k</sup> 형태 (1 ≤ k ≤ 7, 즉 N ≤ 2,187)</li><li>각 칸은 -1, 0, 1만 포함</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '색종이 만들기(2630)랑 구조가 거의 같아 보여! 영역이 전부 같은 값이면 카운트하고, 아니면 나눠서 재귀 호출하면 되겠지?<br><br>근데 한 가지 다른 점이 있어 — 이번에는 값이 2가지(흰/파)가 아니라 <strong>3가지(-1, 0, 1)</strong>야. 카운터도 3개 필요해.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '색종이는 4등분(2×2)이었는데, 이 문제는 N이 3의 거듭제곱이야. 4등분하면 안 맞아!<br><br>N = 3<sup>k</sup> 형태이니까 <strong>9등분(3×3)</strong>으로 나눠야 해. <code>third = size / 3</code>으로 나누고, 3×3 = <strong>9번</strong> 재귀 호출하는 거야.<br><br><div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin:10px 0;"><div style="text-align:center;"><div style="font-size:0.75rem;color:var(--text2);margin-bottom:4px;">색종이 (4등분)</div><div style="display:grid;grid-template-columns:repeat(2,28px);gap:2px;"><div style="width:28px;height:28px;border:2px solid var(--accent);border-radius:3px;background:var(--accent)10;"></div><div style="width:28px;height:28px;border:2px solid var(--accent);border-radius:3px;background:var(--accent)10;"></div><div style="width:28px;height:28px;border:2px solid var(--accent);border-radius:3px;background:var(--accent)10;"></div><div style="width:28px;height:28px;border:2px solid var(--accent);border-radius:3px;background:var(--accent)10;"></div></div></div><div style="text-align:center;"><div style="font-size:0.75rem;color:var(--text2);margin-bottom:4px;">이 문제 (9등분)</div><div style="display:grid;grid-template-columns:repeat(3,22px);gap:2px;"><div style="width:22px;height:22px;border:2px solid #e17055;border-radius:3px;background:#e1705510;"></div><div style="width:22px;height:22px;border:2px solid #e17055;border-radius:3px;background:#e1705510;"></div><div style="width:22px;height:22px;border:2px solid #e17055;border-radius:3px;background:#e1705510;"></div><div style="width:22px;height:22px;border:2px solid #e17055;border-radius:3px;background:#e1705510;"></div><div style="width:22px;height:22px;border:2px solid #e17055;border-radius:3px;background:#e1705510;"></div><div style="width:22px;height:22px;border:2px solid #e17055;border-radius:3px;background:#e1705510;"></div><div style="width:22px;height:22px;border:2px solid #e17055;border-radius:3px;background:#e1705510;"></div><div style="width:22px;height:22px;border:2px solid #e17055;border-radius:3px;background:#e1705510;"></div><div style="width:22px;height:22px;border:2px solid #e17055;border-radius:3px;background:#e1705510;"></div></div></div></div><div style="background:var(--bg2);padding:12px;border-radius:8px;font-size:0.9rem;">4등분(2×2) → <code>half = size/2</code>, 4번 호출<br>9등분(3×3) → <code>third = size/3</code>, 9번 호출</div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '색종이 코드에서 바꿀 부분만 정리하면:<br><br>① <code>half = size // 2</code> → <code>third = size // 3</code><br>② 2중 반복 (0, half) → 2중 반복 <code>range(3)</code><br>③ 카운터: 흰/파 2개 → -1, 0, 1 3개<br><br>N이 최대 2187(= 3<sup>7</sup>)이라 재귀 깊이는 최대 7 — 스택 오버플로우 걱정은 없어!<br><br><span class="lang-py">Python에서는 <code>cnt = {-1: 0, 0: 0, 1: 0}</code> 딕셔너리로 세면 깔끔해.</span><span class="lang-cpp">C++에서는 <code>cnt[first + 1]++</code>로 인덱스 매핑하면 돼 (-1→0, 0→1, 1→2).</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N = int(input())
paper = [list(map(int, input().split())) for _ in range(N)]
cnt = {-1: 0, 0: 0, 1: 0}

def solve(r, c, size):
    first = paper[r][c]
    all_same = True
    for i in range(r, r + size):
        for j in range(c, c + size):
            if paper[i][j] != first:
                all_same = False
                break
        if not all_same:
            break
    if all_same:
        cnt[first] += 1
    else:
        third = size // 3
        for dr in range(3):
            for dc in range(3):
                solve(r + dr * third, c + dc * third, third)

solve(0, 0, N)
print(cnt[-1])
print(cnt[0])
print(cnt[1])`,
                cpp: `#include <iostream>
using namespace std;
int paper[2187][2187];
int N, cnt[3];
void solve(int r, int c, int size) {
    int first = paper[r][c];
    bool allSame = true;
    for (int i = r; i < r + size && allSame; i++)
        for (int j = c; j < c + size && allSame; j++)
            if (paper[i][j] != first) allSame = false;
    if (allSame) { cnt[first + 1]++; }
    else {
        int t = size / 3;
        for (int dr = 0; dr < 3; dr++)
            for (int dc = 0; dc < 3; dc++)
                solve(r + dr * t, c + dc * t, t);
    }
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    cin >> N;
    for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) cin >> paper[i][j];
    solve(0, 0, N);
    cout << cnt[0] << "\\n" << cnt[1] << "\\n" << cnt[2] << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '재귀 9등분',
                    description: '모두 같으면 카운트, 아니면 size/3으로 9등분 재귀합니다.',
                    timeComplexity: 'O(N² log₃N)',
                    spaceComplexity: 'O(N²)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N = int(input())
paper = [list(map(int, input().split())) for _ in range(N)]
cnt = {-1: 0, 0: 0, 1: 0}

def solve(r, c, size):
    first = paper[r][c]
    all_same = True
    for i in range(r, r + size):
        for j in range(c, c + size):
            if paper[i][j] != first:
                all_same = False
                break
        if not all_same:
            break
    if all_same:
        cnt[first] += 1
    else:
        third = size // 3
        for dr in range(3):
            for dc in range(3):
                solve(r + dr * third, c + dc * third, third)

solve(0, 0, N)
print(cnt[-1])
print(cnt[0])
print(cnt[1])`,
                        cpp: `#include <iostream>
using namespace std;
int paper[2187][2187];
int N, cnt[3];
void solve(int r, int c, int size) {
    int first = paper[r][c];
    bool allSame = true;
    for (int i = r; i < r + size && allSame; i++)
        for (int j = c; j < c + size && allSame; j++)
            if (paper[i][j] != first) allSame = false;
    if (allSame) { cnt[first + 1]++; }
    else {
        int t = size / 3;
        for (int dr = 0; dr < 3; dr++)
            for (int dc = 0; dc < 3; dc++)
                solve(r + dr * t, c + dc * t, t);
    }
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    cin >> N;
    for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) cin >> paper[i][j];
    solve(0, 0, N);
    cout << cnt[0] << "\\n" << cnt[1] << "\\n" << cnt[2] << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: '딕셔너리로 -1, 0, 1 세 종류의 카운터를 관리합니다.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
paper = [list(map(int, input().split())) for _ in range(N)]
cnt = {-1: 0, 0: 0, 1: 0}`
                            },
                            {
                                title: '재귀 함수',
                                desc: `4등분이 아닌 9등분(3x3)이 핵심 차이.
third = size // 3으로 나누어 3x3 = 9번 재귀 호출합니다.`,
                                code: `def solve(r, c, size):
    first = paper[r][c]
    all_same = all(paper[i][j] == first
        for i in range(r, r+size)
        for j in range(c, c+size))
    if all_same:
        cnt[first] += 1
    else:
        third = size // 3
        for dr in range(3):
            for dc in range(3):
                solve(r + dr*third, c + dc*third, third)`
                            },
                            {
                                title: '실행 및 출력',
                                desc: '-1, 0, 1 순서대로 출력합니다.',
                                code: `solve(0, 0, N)
print(cnt[-1])
print(cnt[0])
print(cnt[1])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: 'cnt[3] 배열: 인덱스 0→-1, 1→0, 2→1 (first+1로 매핑).',
                                code: `#include <iostream>
using namespace std;

int paper[2187][2187];
int N, cnt[3];  // cnt[0]=-1, cnt[1]=0, cnt[2]=1`
                            },
                            {
                                title: '재귀 함수',
                                desc: 'cnt[first+1]로 -1,0,1을 인덱스 0,1,2에 매핑합니다.',
                                code: `void solve(int r, int c, int size) {
    int first = paper[r][c];
    bool allSame = true;
    for (int i = r; i < r + size && allSame; i++)
        for (int j = c; j < c + size && allSame; j++)
            if (paper[i][j] != first) allSame = false;
    if (allSame) {
        cnt[first + 1]++;  // -1→0, 0→1, 1→2
    } else {
        int t = size / 3;  // 9등분
        for (int dr = 0; dr < 3; dr++)
            for (int dc = 0; dc < 3; dc++)
                solve(r + dr * t, c + dc * t, t);
    }
}`
                            },
                            {
                                title: '실행 및 출력',
                                desc: 'ios::sync_with_stdio(false)로 입력 속도 최적화 — N이 최대 2187이라 필요.',
                                code: `int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> N;
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            cin >> paper[i][j];
    solve(0, 0, N);
    cout << cnt[0] << "\\n" << cnt[1] << "\\n" << cnt[2] << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1629',
            title: 'BOJ 1629 - 곱셈',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1629',
            simIntro: 'A^B mod C를 지수를 반으로 나누며 계산하는 과정을 관찰하세요.',
            sim: {
                type: 'pow'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>자연수 A를 B번 곱한 수를 알고 싶다. 단 구하려는 수가 매우 커질 수 있으므로 C로 나눈 나머지를 구하는 프로그램을 작성하시오.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>10 11 12</pre></div>
        <div><strong>출력</strong><pre>4</pre></div>
    </div></div>
    <h4>입력</h4>
    <p>첫째 줄에 A, B, C가 빈 칸을 사이에 두고 주어진다.</p>
    <h4>출력</h4>
    <p>첫째 줄에 A를 B번 곱한 수를 C로 나눈 나머지를 출력한다.</p>
    <h4>제약 조건</h4>
    <ul><li>A, B, C는 모두 2,147,483,647 이하의 자연수</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'A를 B번 곱하면 되니까, 반복문으로 A를 B번 곱하면 되지 않을까?<br><br><div style="background:var(--bg2);padding:12px;border-radius:8px;font-size:0.9rem;"><code>result = 1</code><br><code>for i in range(B): result = result * A % C</code></div><br>간단해 보이지?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'B가 최대 <strong>2,147,483,647</strong>(약 21억)이야! 반복문 21억 번이면 시간 초과 확정이야.<br><br>그런데 한 가지 수학적 성질을 떠올려봐:<br><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:10px 0;"><div style="padding:6px 10px;background:var(--red)15;border:1.5px solid var(--red);border-radius:6px;font-size:0.85rem;font-family:monospace;">A×A×A×A×A×A×A×A <span style="color:var(--red);font-weight:700;">8번</span></div><span style="font-size:1.2rem;color:var(--text2);">vs</span><div style="padding:6px 10px;background:var(--green)15;border:1.5px solid var(--green);border-radius:6px;font-size:0.85rem;font-family:monospace;">((A²)²)² <span style="color:var(--green);font-weight:700;">3번!</span></div></div>지수를 <strong>반으로 나누면</strong> 곱셈 횟수가 확 줄어들어!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>분할정복 거듭제곱</strong>: 지수를 반씩 나누면 O(log B)에 끝나!<br><br>• B가 짝수: A<sup>B</sup> = (A<sup>B/2</sup>)² mod C<br>• B가 홀수: A<sup>B</sup> = (A<sup>B/2</sup>)² × A mod C<br><br>21억이어도 log₂(21억) ≈ <strong>31번</strong>이면 끝이야!<br><br><span class="lang-cpp">C++에서는 중간 곱셈에서 오버플로우가 날 수 있어 — <code>long long</code> 필수!</span><span class="lang-py">Python은 큰 수를 자동 처리하니까 오버플로우 걱정 없어. 내장 <code>pow(A, B, C)</code>도 같은 원리야!</span>'
                }
            ],
            templates: {
                python: `A, B, C = map(int, input().split())

def power(a, b, c):
    if b == 1:
        return a % c
    half = power(a, b // 2, c)
    result = half * half % c
    if b % 2 == 1:
        result = result * a % c
    return result

print(power(A, B, C))`,
                cpp: `#include <iostream>
using namespace std;
typedef long long ll;
ll power(ll a, ll b, ll c) {
    if (b == 1) return a % c;
    ll half = power(a, b / 2, c);
    ll result = half * half % c;
    if (b % 2 == 1) result = result * a % c;
    return result;
}
int main() {
    ll A, B, C;
    cin >> A >> B >> C;
    cout << power(A, B, C) << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '분할정복 거듭제곱',
                    description: '지수를 반으로 나누며 O(log B)에 계산합니다.',
                    timeComplexity: 'O(log B)',
                    spaceComplexity: 'O(log B)',
                    templates: {
                        python: `A, B, C = map(int, input().split())

def power(a, b, c):
    if b == 1:
        return a % c
    half = power(a, b // 2, c)
    result = half * half % c
    if b % 2 == 1:
        result = result * a % c
    return result

print(power(A, B, C))`,
                        cpp: `#include <iostream>
using namespace std;
typedef long long ll;
ll power(ll a, ll b, ll c) {
    if (b == 1) return a % c;
    ll half = power(a, b / 2, c);
    ll result = half * half % c;
    if (b % 2 == 1) result = result * a % c;
    return result;
}
int main() {
    ll A, B, C;
    cin >> A >> B >> C;
    cout << power(A, B, C) << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: 'A, B, C 세 수를 한 줄에서 입력받습니다.',
                                code: 'A, B, C = map(int, input().split())'
                            },
                            {
                                title: '거듭제곱 함수',
                                desc: `지수를 반으로 나누어 O(log B)에 계산하는 핵심 함수.
짝수면 제곱, 홀수면 한 번 더 곱합니다.`,
                                code: `def power(a, b, c):
    if b == 1:
        return a % c
    half = power(a, b // 2, c)
    result = half * half % c
    if b % 2 == 1:
        result = result * a % c
    return result`
                            },
                            {
                                title: '출력',
                                desc: 'Python은 큰 수를 자동 처리하므로 오버플로우 걱정 없음.',
                                code: 'print(power(A, B, C))'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: 'A,B,C가 최대 21억 → long long 필수.',
                                code: `#include <iostream>
using namespace std;
typedef long long ll;  // 최대 2^31-1이라 long long 필요

ll A, B, C;`
                            },
                            {
                                title: '거듭제곱 함수',
                                desc: 'half*half 중간 곱이 오버플로우하지 않도록 매번 mod.',
                                code: `ll power(ll a, ll b, ll c) {
    if (b == 1) return a % c;
    ll half = power(a, b / 2, c);
    ll result = half * half % c;  // 짝수: (a^(b/2))^2
    if (b % 2 == 1)
        result = result * a % c;  // 홀수: 한 번 더 곱하기
    return result;
}`
                            },
                            {
                                title: '출력',
                                desc: 'main에서 입력 후 power 호출 — 간단한 구조입니다.',
                                code: `int main() {
    cin >> A >> B >> C;
    cout << power(A, B, C) << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-2740',
            title: 'BOJ 2740 - 행렬 곱셈',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/2740',
            simIntro: '2×2 행렬 곱셈을 단계별로 확인하세요.',
            sim: {
                type: 'matMul'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>N×M 행렬 A와 M×K 행렬 B가 주어졌을 때, 두 행렬을 곱한 결과를 출력하는 프로그램을 작성하시오.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>3 2
1 2
3 4
5 6
2 3
-1 -2 0
0 0 3</pre></div>
        <div><strong>출력</strong><pre>-1 -2 6
-3 -6 12
-5 -10 18</pre></div>
    </div></div>
    <h4>입력</h4>
    <p>첫째 줄에 행렬 A의 크기 N과 M이 주어진다. 둘째 줄부터 N개의 줄에 행렬 A의 원소 M개가 순서대로 주어진다. 그 다음 줄에 행렬 B의 크기 M과 K가 주어진다. 이어서 M개의 줄에 행렬 B의 원소 K개가 순서대로 주어진다.</p>
    <h4>출력</h4>
    <p>첫째 줄부터 N개의 줄에 행렬 A와 B를 곱한 행렬을 출력한다. 행렬의 각 원소는 공백으로 구분한다.</p>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ N, M, K ≤ 100</li><li>행렬 원소의 절댓값 ≤ 100</li><li>결과 행렬 원소의 절댓값 ≤ 2<sup>31</sup></li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '행렬 곱셈의 규칙을 떠올려보자. C[i][j]를 구하려면 <strong>A의 i행</strong>과 <strong>B의 j열</strong>을 쭉 곱해서 더하면 돼.<br><br><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:10px 0;"><div style="display:grid;grid-template-columns:repeat(2,28px);gap:2px;border:2px solid var(--accent);border-radius:4px;padding:4px;"><div style="width:28px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;background:var(--yellow)30;border-radius:3px;font-weight:700;">a</div><div style="width:28px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;background:var(--yellow)30;border-radius:3px;font-weight:700;">b</div><div style="width:28px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;border-radius:3px;">c</div><div style="width:28px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;border-radius:3px;">d</div></div><span style="font-size:1rem;">×</span><div style="display:grid;grid-template-columns:repeat(2,28px);gap:2px;border:2px solid var(--green);border-radius:4px;padding:4px;"><div style="width:28px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;background:var(--green)20;border-radius:3px;font-weight:700;">e</div><div style="width:28px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;border-radius:3px;">f</div><div style="width:28px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;background:var(--green)20;border-radius:3px;font-weight:700;">g</div><div style="width:28px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;border-radius:3px;">h</div></div><span style="font-size:1rem;">=</span><div style="display:grid;grid-template-columns:repeat(2,48px);gap:2px;border:2px solid var(--text2);border-radius:4px;padding:4px;"><div style="width:48px;height:28px;text-align:center;line-height:28px;font-size:0.65rem;background:var(--yellow)15;border-radius:3px;font-weight:600;">ae+bg</div><div style="width:48px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;border-radius:3px;">...</div><div style="width:48px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;border-radius:3px;">...</div><div style="width:48px;height:28px;text-align:center;line-height:28px;font-size:0.7rem;border-radius:3px;">...</div></div></div>이건 <strong>내적(dot product)</strong>이야! A의 <span style="color:var(--yellow);font-weight:600;">i행</span>과 B의 <span style="color:var(--green);font-weight:600;">j열</span>을 곱해서 합산.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '결과 행렬 C의 크기가 N×K이고, 각 원소를 구하려면 M번 곱해야 하니까 <strong>3중 반복문</strong>이 필요해:<br><br>• 바깥: i = 0~N-1 (C의 행)<br>• 중간: j = 0~K-1 (C의 열)<br>• 안쪽: k = 0~M-1 (내적 합산)<br><br>N, M, K ≤ 100이니까 최대 100만 번 — 이 문제에서는 충분해!<br><br>⚠️ 주의: A가 N×<strong>M</strong>이고 B가 <strong>M</strong>×K여야 곱셈이 가능해. A의 열 수 = B의 행 수!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '이 문제 자체는 분할정복이 아니라 기본 행렬 곱셈이야. 하지만 이게 <strong>행렬 거듭제곱의 기초</strong>가 돼!<br><br>숫자 곱셈을 함수로 만들 듯이, 행렬 곱셈도 <code>mat_mul(A, B)</code> 함수로 만들어두면 나중에 행렬 거듭제곱(10830번)에서 그대로 재사용할 수 있어.<br><br><span class="lang-py">Python에서는 리스트 컴프리헨션으로 깔끔하게 초기화: <code>C = [[0]*K for _ in range(N)]</code></span><span class="lang-cpp">C++에서는 <code>int C[100][100] = {};</code>로 0 초기화하면 돼.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
A = [list(map(int, input().split())) for _ in range(N)]
M2, K = map(int, input().split())
B = [list(map(int, input().split())) for _ in range(M)]

C = [[0] * K for _ in range(N)]
for i in range(N):
    for j in range(K):
        for k in range(M):
            C[i][j] += A[i][k] * B[k][j]

for row in C:
    print(' '.join(map(str, row)))`,
                cpp: `#include <iostream>
using namespace std;
int main() {
    int N, M, M2, K;
    cin >> N >> M;
    int A[100][100], B[100][100], C[100][100] = {};
    for (int i = 0; i < N; i++) for (int j = 0; j < M; j++) cin >> A[i][j];
    cin >> M2 >> K;
    for (int i = 0; i < M; i++) for (int j = 0; j < K; j++) cin >> B[i][j];
    for (int i = 0; i < N; i++)
        for (int j = 0; j < K; j++)
            for (int k = 0; k < M; k++)
                C[i][j] += A[i][k] * B[k][j];
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < K; j++) cout << C[i][j] << (j < K-1 ? " " : "");
        cout << "\\n";
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '3중 반복문',
                    description: 'C[i][j] = sum(A[i][k] * B[k][j])로 직접 계산합니다.',
                    timeComplexity: 'O(N × M × K)',
                    spaceComplexity: 'O(N × K)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, B = map(int, input().split())
A = [list(map(int, input().split())) for _ in range(N)]
MOD = 1000

def mat_mul(X, Y):
    n = len(X)
    C = [[0]*n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] = (C[i][j] + X[i][k]*Y[k][j]) % MOD
    return C

def mat_pow(M, b):
    if b == 1:
        return [[M[i][j] % MOD for j in range(N)] for i in range(N)]
    half = mat_pow(M, b // 2)
    result = mat_mul(half, half)
    if b % 2 == 1:
        result = mat_mul(result, M)
    return result

result = mat_pow(A, B)
for row in result:
    print(' '.join(map(str, row)))`,
                        cpp: `#include <iostream>
#include <vector>
using namespace std;
typedef long long ll;
typedef vector<vector<ll>> Matrix;
int N; ll B;
const int MOD = 1000;
Matrix mat_mul(const Matrix& X, const Matrix& Y) {
    Matrix C(N, vector<ll>(N, 0));
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            for (int k = 0; k < N; k++)
                C[i][j] = (C[i][j] + X[i][k]*Y[k][j]) % MOD;
    return C;
}
Matrix mat_pow(Matrix M, ll b) {
    if (b == 1) { for (int i=0;i<N;i++) for (int j=0;j<N;j++) M[i][j]%=MOD; return M; }
    Matrix half = mat_pow(M, b/2);
    Matrix result = mat_mul(half, half);
    if (b%2==1) result = mat_mul(result, M);
    return result;
}
int main() {
    cin >> N >> B;
    Matrix A(N, vector<ll>(N));
    for (int i=0;i<N;i++) for (int j=0;j<N;j++) cin >> A[i][j];
    Matrix result = mat_pow(A, B);
    for (int i=0;i<N;i++) { for (int j=0;j<N;j++) cout << result[i][j] << (j<N-1?" ":""); cout << "\\n"; }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `A는 N×M, B는 M×K 행렬.
A의 열 수 = B의 행 수(M)가 같아야 곱셈 가능.`,
                                code: `N, M = map(int, input().split())
A = [list(map(int, input().split())) for _ in range(N)]
M2, K = map(int, input().split())
B = [list(map(int, input().split())) for _ in range(M)]`
                            },
                            {
                                title: '행렬 곱셈',
                                desc: `C[i][j] = A의 i행과 B의 j열의 내적.
3중 반복문이 행렬 곱셈의 기본 패턴입니다.`,
                                code: `C = [[0] * K for _ in range(N)]
for i in range(N):
    for j in range(K):
        for k in range(M):
            C[i][j] += A[i][k] * B[k][j]`
                            },
                            {
                                title: '출력',
                                desc: '각 행을 공백으로 구분하여 출력합니다.',
                                code: `for row in C:
    print(' '.join(map(str, row)))`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: '정적 2D 배열로 행렬을 선언합니다.',
                                code: `#include <iostream>
using namespace std;

int N, M, M2, K;
int A[100][100], B[100][100], C[100][100];`
                            },
                            {
                                title: '행렬 곱셈',
                                desc: 'i행 j열 k합산 — 행렬 거듭제곱의 기초가 되는 패턴입니다.',
                                code: `int main() {
    cin >> N >> M;
    for (int i = 0; i < N; i++)
        for (int j = 0; j < M; j++)
            cin >> A[i][j];
    cin >> M2 >> K;
    for (int i = 0; i < M; i++)
        for (int j = 0; j < K; j++)
            cin >> B[i][j];
    // C[i][j] = sum(A[i][k] * B[k][j]) — 3중 반복
    for (int i = 0; i < N; i++)
        for (int j = 0; j < K; j++)
            for (int k = 0; k < M; k++)
                C[i][j] += A[i][k] * B[k][j];`
                            },
                            {
                                title: '출력',
                                desc: '마지막 열 뒤에는 공백 없이 줄바꿈만 출력합니다.',
                                code: `    for (int i = 0; i < N; i++) {
        for (int j = 0; j < K; j++)
            cout << C[i][j] << (j < K - 1 ? " " : "");
        cout << "\\n";
    }
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-10830',
            title: 'BOJ 10830 - 행렬 제곱',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/10830',
            simIntro: '행렬 거듭제곱을 분할정복으로 수행하는 과정을 관찰하세요.',
            sim: {
                type: 'matPow'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>크기가 N×N인 행렬 A가 주어진다. 이때, A의 B제곱을 구하는 프로그램을 작성하시오. 수가 매우 커질 수 있으니, A^B의 각 원소를 1,000으로 나눈 나머지를 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>2 5
1 2
3 4</pre></div>
        <div><strong>출력</strong><pre>69 558
337 406</pre></div>
    </div></div>
    <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
        <div><strong>입력</strong><pre>3 3
1 2 3
4 5 6
7 8 9</pre></div>
        <div><strong>출력</strong><pre>468 576 684
62 305 548
656 34 412</pre></div>
    </div></div>
    <h4>입력</h4>
    <p>첫째 줄에 행렬의 크기 N과 B가 주어진다. (2 ≤ N ≤ 5, 1 ≤ B ≤ 100,000,000,000) 둘째 줄부터 N개의 줄에 행렬의 각 원소가 주어진다. 행렬의 각 원소는 1,000보다 작거나 같은 자연수 또는 0이다.</p>
    <h4>출력</h4>
    <p>첫째 줄부터 N개의 줄에 걸쳐 행렬 A를 B번 곱한 결과 행렬의 각 원소를 1,000으로 나눈 나머지를 출력한다.</p>
    <h4>제약 조건</h4>
    <ul><li>2 ≤ N ≤ 5</li><li>1 ≤ B ≤ 100,000,000,000</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'A를 B번 곱하면 되니까, 반복문으로 행렬을 B번 곱하면?<br><br><div style="background:var(--bg2);padding:12px;border-radius:8px;font-size:0.9rem;">result = 단위행렬<br>for i in range(B): result = mat_mul(result, A)</div><br>2740번에서 만든 행렬 곱셈 함수를 재사용하면 될 것 같아!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'B가 최대 <strong>1000억</strong>(10<sup>11</sup>)이야! 행렬 곱셈을 1000억 번 반복하면 당연히 시간 초과야.<br><br>그런데... 이거 어디서 본 패턴 아니야?<br><br><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:10px 0;font-family:monospace;font-size:0.9rem;"><div style="padding:6px 10px;background:var(--accent)15;border:1.5px solid var(--accent);border-radius:6px;">숫자: a<sup>B</sup></div><span style="color:var(--text2);">→</span><div style="padding:6px 10px;background:var(--accent)15;border:1.5px solid var(--accent);border-radius:6px;">(a<sup>B/2</sup>)²</div><span style="font-size:1.2rem;color:var(--text2);">||</span><div style="padding:6px 10px;background:var(--green)15;border:1.5px solid var(--green);border-radius:6px;">행렬: A<sup>B</sup></div><span style="color:var(--text2);">→</span><div style="padding:6px 10px;background:var(--green)15;border:1.5px solid var(--green);border-radius:6px;">(A<sup>B/2</sup>)²</div></div>1629번(곱셈)에서 <strong>숫자</strong>를 B번 곱하는 걸 분할정복으로 O(log B)에 풀었잖아! <strong>숫자 대신 행렬을 곱하면</strong> 똑같은 원리로 풀 수 있어!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '1629번 코드에서 바꿀 부분:<br><br>• <code>half * half</code> → <code>mat_mul(half, half)</code><br>• <code>result * a</code> → <code>mat_mul(result, A)</code><br>• 기저: B=1이면 A 자체를 반환 (각 원소 mod 처리!)<br><br><div style="background:var(--bg2);padding:12px;border-radius:8px;font-size:0.9rem;">숫자 거듭제곱: 곱하기 연산자 *<br>행렬 거듭제곱: 행렬 곱셈 함수 mat_mul<br>구조는 <strong>완전히 동일</strong>!</div><br>행렬 곱셈할 때 매번 <strong>mod 1000</strong>을 해줘야 오버플로우를 방지할 수 있어.'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N, B = map(int, input().split())
A = [list(map(int, input().split())) for _ in range(N)]
MOD = 1000

def mat_mul(X, Y):
    n = len(X)
    C = [[0]*n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] = (C[i][j] + X[i][k]*Y[k][j]) % MOD
    return C

def mat_pow(M, b):
    if b == 1:
        return [[M[i][j] % MOD for j in range(N)] for i in range(N)]
    half = mat_pow(M, b // 2)
    result = mat_mul(half, half)
    if b % 2 == 1:
        result = mat_mul(result, M)
    return result

result = mat_pow(A, B)
for row in result:
    print(' '.join(map(str, row)))`,
                cpp: `#include <iostream>
#include <vector>
using namespace std;
typedef long long ll;
typedef vector<vector<ll>> Matrix;
int N; ll B;
const int MOD = 1000;
Matrix mat_mul(const Matrix& X, const Matrix& Y) {
    Matrix C(N, vector<ll>(N, 0));
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            for (int k = 0; k < N; k++)
                C[i][j] = (C[i][j] + X[i][k]*Y[k][j]) % MOD;
    return C;
}
Matrix mat_pow(Matrix M, ll b) {
    if (b == 1) { for (int i=0;i<N;i++) for (int j=0;j<N;j++) M[i][j]%=MOD; return M; }
    Matrix half = mat_pow(M, b/2);
    Matrix result = mat_mul(half, half);
    if (b%2==1) result = mat_mul(result, M);
    return result;
}
int main() {
    cin >> N >> B;
    Matrix A(N, vector<ll>(N));
    for (int i=0;i<N;i++) for (int j=0;j<N;j++) cin >> A[i][j];
    Matrix result = mat_pow(A, B);
    for (int i=0;i<N;i++) { for (int j=0;j<N;j++) cout << result[i][j] << (j<N-1?" ":""); cout << "\\n"; }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '행렬 분할정복 거듭제곱',
                    description: '숫자 거듭제곱과 동일한 원리를 행렬에 적용합니다.',
                    timeComplexity: 'O(N³ log B)',
                    spaceComplexity: 'O(N² log B)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

MOD = 1_000_000_007
n = int(input())

def mat_mul(X, Y):
    return [
        [(X[0][0]*Y[0][0] + X[0][1]*Y[1][0]) % MOD,
         (X[0][0]*Y[0][1] + X[0][1]*Y[1][1]) % MOD],
        [(X[1][0]*Y[0][0] + X[1][1]*Y[1][0]) % MOD,
         (X[1][0]*Y[0][1] + X[1][1]*Y[1][1]) % MOD]
    ]

def mat_pow(M, b):
    if b == 1:
        return [[M[i][j] % MOD for j in range(2)] for i in range(2)]
    half = mat_pow(M, b // 2)
    result = mat_mul(half, half)
    if b % 2 == 1:
        result = mat_mul(result, M)
    return result

if n <= 1:
    print(n)
else:
    base = [[1, 1], [1, 0]]
    result = mat_pow(base, n)
    print(result[0][1])`,
                        cpp: `#include <iostream>
using namespace std;
typedef long long ll;
const ll MOD = 1000000007;
typedef ll Matrix[2][2];
void mat_mul(Matrix A, Matrix B, Matrix C) {
    ll temp[2][2] = {};
    for (int i=0;i<2;i++) for (int j=0;j<2;j++) for (int k=0;k<2;k++)
        temp[i][j] = (temp[i][j] + A[i][k]*B[k][j]) % MOD;
    for (int i=0;i<2;i++) for (int j=0;j<2;j++) C[i][j]=temp[i][j];
}
void mat_pow(Matrix M, ll b, Matrix result) {
    if (b==1) { for(int i=0;i<2;i++) for(int j=0;j<2;j++) result[i][j]=M[i][j]%MOD; return; }
    Matrix half; mat_pow(M,b/2,half);
    mat_mul(half,half,result);
    if (b%2==1) { Matrix tmp; for(int i=0;i<2;i++) for(int j=0;j<2;j++) tmp[i][j]=result[i][j]; mat_mul(tmp,M,result); }
}
int main() {
    ll n; cin >> n;
    if (n<=1) { cout << n; return 0; }
    Matrix base = {{1,1},{1,0}}, result;
    mat_pow(base,n,result);
    cout << result[0][1] << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 행렬 곱셈',
                                desc: `mat_mul: 행렬 곱셈 함수. 매 원소 계산 시 mod 처리하여
중간 값이 커지는 것을 방지합니다.`,
                                code: `N, B = map(int, input().split())
A = [list(map(int, input().split())) for _ in range(N)]
MOD = 1000

def mat_mul(X, Y):
    n = len(X)
    C = [[0]*n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] = (C[i][j] + X[i][k]*Y[k][j]) % MOD
    return C`
                            },
                            {
                                title: '행렬 거듭제곱',
                                desc: `숫자 거듭제곱과 동일한 분할정복 구조.
숫자 대신 행렬을 곱하고 반환합니다.`,
                                code: `def mat_pow(M, b):
    if b == 1:
        return [[M[i][j] % MOD for j in range(N)] for i in range(N)]
    half = mat_pow(M, b // 2)
    result = mat_mul(half, half)
    if b % 2 == 1:
        result = mat_mul(result, M)
    return result`
                            },
                            {
                                title: '출력',
                                desc: '결과 행렬의 각 행을 공백 구분으로 출력합니다.',
                                code: `result = mat_pow(A, B)
for row in result:
    print(' '.join(map(str, row)))`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 행렬 곱셈',
                                desc: 'vector<vector<ll>>을 Matrix 타입으로 정의합니다.',
                                code: `#include <iostream>
#include <vector>
using namespace std;
typedef long long ll;
typedef vector<vector<ll>> Matrix;

int N; ll B;
const int MOD = 1000;

Matrix mat_mul(const Matrix& X, const Matrix& Y) {
    Matrix C(N, vector<ll>(N, 0));
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            for (int k = 0; k < N; k++)
                C[i][j] = (C[i][j] + X[i][k] * Y[k][j]) % MOD;
    return C;
}`
                            },
                            {
                                title: '행렬 거듭제곱',
                                desc: '숫자 거듭제곱과 동일한 분할정복을 행렬에 적용합니다.',
                                code: `Matrix mat_pow(Matrix M, ll b) {
    if (b == 1) {
        // 기저: 각 원소 mod 처리
        for (int i = 0; i < N; i++)
            for (int j = 0; j < N; j++)
                M[i][j] %= MOD;
        return M;
    }
    Matrix half = mat_pow(M, b / 2);
    Matrix result = mat_mul(half, half);
    if (b % 2 == 1)
        result = mat_mul(result, M);
    return result;
}`
                            },
                            {
                                title: '출력',
                                desc: 'B가 최대 1000억 → ll 타입으로 받아야 합니다.',
                                code: `int main() {
    cin >> N >> B;
    Matrix A(N, vector<ll>(N));
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            cin >> A[i][j];
    Matrix result = mat_pow(A, B);
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++)
            cout << result[i][j] << (j < N - 1 ? " " : "");
        cout << "\\n";
    }
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-11444',
            title: 'BOJ 11444 - 피보나치 수 6',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/11444',
            simIntro: '[[1,1],[1,0]]^n 행렬 거듭제곱으로 피보나치 수를 구하는 과정을 관찰하세요.',
            sim: {
                type: 'fibMat'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고 1번째는 1이다. n번째 피보나치 수를 구하는 프로그램을 작성하시오. 행렬 거듭제곱을 이용. 1,000,000,007로 나눈 나머지를 출력.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>1000</pre></div>
        <div><strong>출력</strong><pre>517691607</pre></div>
    </div></div>
    <h4>입력</h4>
    <p>첫째 줄에 n이 주어진다. n은 1,000,000,000,000,000,000보다 작거나 같은 자연수 또는 0이다.</p>
    <h4>출력</h4>
    <p>첫째 줄에 n번째 피보나치 수를 1,000,000,007로 나눈 나머지를 출력한다.</p>
    <h4>제약 조건</h4>
    <ul><li>0 ≤ n ≤ 10<sup>18</sup></li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '피보나치 수를 구하는 건 간단하지! 반복문으로 F(0), F(1), F(2), ... 순서대로 구하면 돼:<br><br><div style="background:var(--bg2);padding:12px;border-radius:8px;font-size:0.9rem;">a, b = 0, 1<br>for i in range(n): a, b = b, a + b</div><br>O(n)이면 충분하지 않을까?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'n이 최대 <strong>10<sup>18</sup></strong>(100경)이야! 반복문 10<sup>18</sup>번은 절대 불가능해.<br><br>O(log n)으로 풀어야 하는데, 피보나치에 분할정복을 어떻게 적용하지?<br><br>여기서 핵심 아이디어가 등장해 — <strong>피보나치 점화식을 행렬로 표현</strong>할 수 있어:<br><br><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:10px 0;"><div style="display:grid;grid-template-columns:repeat(2,45px);gap:2px;border:2px solid var(--accent);border-radius:6px;padding:4px;"><div style="width:45px;height:28px;text-align:center;line-height:28px;font-size:0.75rem;font-weight:700;background:var(--accent)15;border-radius:3px;">F(n+1)</div><div style="width:45px;height:28px;text-align:center;line-height:28px;font-size:0.75rem;font-weight:700;background:var(--green)15;border-radius:3px;color:var(--green);">F(n)</div><div style="width:45px;height:28px;text-align:center;line-height:28px;font-size:0.75rem;font-weight:700;background:var(--green)15;border-radius:3px;color:var(--green);">F(n)</div><div style="width:45px;height:28px;text-align:center;line-height:28px;font-size:0.75rem;background:var(--accent)15;border-radius:3px;">F(n-1)</div></div><span style="font-size:1rem;font-weight:700;">=</span><div style="display:grid;grid-template-columns:repeat(2,22px);gap:2px;border:2px solid #0984e3;border-radius:6px;padding:4px;"><div style="width:22px;height:22px;text-align:center;line-height:22px;font-size:0.8rem;font-weight:700;background:#0984e315;border-radius:3px;">1</div><div style="width:22px;height:22px;text-align:center;line-height:22px;font-size:0.8rem;font-weight:700;background:#0984e315;border-radius:3px;">1</div><div style="width:22px;height:22px;text-align:center;line-height:22px;font-size:0.8rem;font-weight:700;background:#0984e315;border-radius:3px;">1</div><div style="width:22px;height:22px;text-align:center;line-height:22px;font-size:0.8rem;font-weight:700;background:#0984e315;border-radius:3px;">0</div></div><sup style="font-size:0.9rem;font-weight:700;color:#0984e3;">n</sup></div>행렬 거듭제곱은 O(log n)에 할 수 있으니까!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '10830번(행렬 제곱) 코드를 <strong>2×2 행렬</strong>에 맞게 재사용하면 끝!<br><br>① 기본 행렬: <code>base = [[1,1],[1,0]]</code><br>② <code>mat_pow(base, n)</code>으로 O(log n)에 거듭제곱<br>③ 결과 행렬의 <strong>[0][1]</strong>이 F(n)!<br><br>2×2 고정 크기라 행렬 곱셈을 직접 전개하면 반복문보다 빨라.<br><br>⚠️ 예외 처리: n=0이면 0, n=1이면 1을 바로 출력해야 해. 행렬 거듭제곱은 n &gt; 1일 때만 사용!'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

MOD = 1_000_000_007
n = int(input())

def mat_mul(X, Y):
    return [
        [(X[0][0]*Y[0][0] + X[0][1]*Y[1][0]) % MOD,
         (X[0][0]*Y[0][1] + X[0][1]*Y[1][1]) % MOD],
        [(X[1][0]*Y[0][0] + X[1][1]*Y[1][0]) % MOD,
         (X[1][0]*Y[0][1] + X[1][1]*Y[1][1]) % MOD]
    ]

def mat_pow(M, b):
    if b == 1:
        return [[M[i][j] % MOD for j in range(2)] for i in range(2)]
    half = mat_pow(M, b // 2)
    result = mat_mul(half, half)
    if b % 2 == 1:
        result = mat_mul(result, M)
    return result

if n <= 1:
    print(n)
else:
    base = [[1, 1], [1, 0]]
    result = mat_pow(base, n)
    print(result[0][1])`,
                cpp: `#include <iostream>
using namespace std;
typedef long long ll;
const ll MOD = 1000000007;
typedef ll Matrix[2][2];
void mat_mul(Matrix A, Matrix B, Matrix C) {
    ll temp[2][2] = {};
    for (int i=0;i<2;i++) for (int j=0;j<2;j++) for (int k=0;k<2;k++)
        temp[i][j] = (temp[i][j] + A[i][k]*B[k][j]) % MOD;
    for (int i=0;i<2;i++) for (int j=0;j<2;j++) C[i][j]=temp[i][j];
}
void mat_pow(Matrix M, ll b, Matrix result) {
    if (b==1) { for(int i=0;i<2;i++) for(int j=0;j<2;j++) result[i][j]=M[i][j]%MOD; return; }
    Matrix half; mat_pow(M,b/2,half);
    mat_mul(half,half,result);
    if (b%2==1) { Matrix tmp; for(int i=0;i<2;i++) for(int j=0;j<2;j++) tmp[i][j]=result[i][j]; mat_mul(tmp,M,result); }
}
int main() {
    ll n; cin >> n;
    if (n<=1) { cout << n; return 0; }
    Matrix base = {{1,1},{1,0}}, result;
    mat_pow(base,n,result);
    cout << result[0][1] << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '행렬 거듭제곱',
                    description: '[[1,1],[1,0]]^n으로 F(n)을 O(log n)에 계산합니다.',
                    timeComplexity: 'O(log n)',
                    spaceComplexity: 'O(log n)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

MOD = 1_000_000_007
N, K = map(int, input().split())

fac = [1] * (N + 1)
for i in range(1, N + 1):
    fac[i] = fac[i - 1] * i % MOD

def power(a, b, mod):
    if b == 0: return 1
    if b == 1: return a % mod
    half = power(a, b // 2, mod)
    result = half * half % mod
    if b % 2 == 1: result = result * a % mod
    return result

ans = fac[N]
ans = ans * power(fac[K], MOD - 2, MOD) % MOD
ans = ans * power(fac[N - K], MOD - 2, MOD) % MOD
print(ans)`,
                        cpp: `#include <iostream>
using namespace std;
typedef long long ll;
const ll MOD = 1000000007;
ll fac[4000001];
ll power(ll a, ll b, ll mod) {
    if (b == 0) return 1;
    if (b == 1) return a % mod;
    ll half = power(a, b / 2, mod);
    ll result = half * half % mod;
    if (b % 2 == 1) result = result * a % mod;
    return result;
}
int main() {
    int N, K; cin >> N >> K;
    fac[0] = 1;
    for (int i = 1; i <= N; i++) fac[i] = fac[i-1] * i % MOD;
    ll ans = fac[N];
    ans = ans * power(fac[K], MOD - 2, MOD) % MOD;
    ans = ans * power(fac[N - K], MOD - 2, MOD) % MOD;
    cout << ans << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '행렬 곱셈',
                                desc: `2x2 고정 크기라 직접 전개하면 반복문보다 빠릅니다.
매 곱셈마다 mod 처리로 오버플로우 방지.`,
                                code: `MOD = 1_000_000_007

def mat_mul(X, Y):
    return [
        [(X[0][0]*Y[0][0]+X[0][1]*Y[1][0])%MOD,
         (X[0][0]*Y[0][1]+X[0][1]*Y[1][1])%MOD],
        [(X[1][0]*Y[0][0]+X[1][1]*Y[1][0])%MOD,
         (X[1][0]*Y[0][1]+X[1][1]*Y[1][1])%MOD]
    ]`
                            },
                            {
                                title: '행렬 거듭제곱',
                                desc: `[[1,1],[1,0]]^n을 분할정복으로 O(log n)에 계산.
10830번과 동일한 구조입니다.`,
                                code: `def mat_pow(M, b):
    if b == 1:
        return [[M[i][j]%MOD for j in range(2)] for i in range(2)]
    half = mat_pow(M, b // 2)
    result = mat_mul(half, half)
    if b % 2 == 1:
        result = mat_mul(result, M)
    return result`
                            },
                            {
                                title: '실행',
                                desc: 'n=0,1은 예외 처리. 결과 행렬의 [0][1]이 F(n)입니다.',
                                code: `n = int(input())
if n <= 1:
    print(n)
else:
    base = [[1,1],[1,0]]
    result = mat_pow(base, n)
    print(result[0][1])  # F(n)`
                            }
                        ],
                        cpp: [
                            {
                                title: '행렬 곱셈',
                                desc: 'typedef ll Matrix[2][2]로 2x2 고정 배열 사용. temp로 자기 자신 덮어쓰기 방지.',
                                code: `#include <iostream>
using namespace std;
typedef long long ll;
const ll MOD = 1000000007;
typedef ll Matrix[2][2];

// temp를 써서 결과를 C에 안전하게 복사
void mat_mul(Matrix A, Matrix B, Matrix C) {
    ll temp[2][2] = {};
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                temp[i][j] = (temp[i][j] + A[i][k] * B[k][j]) % MOD;
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            C[i][j] = temp[i][j];
}`
                            },
                            {
                                title: '행렬 거듭제곱',
                                desc: 'C 스타일 배열이라 포인터로 전달합니다.',
                                code: `void mat_pow(Matrix M, ll b, Matrix result) {
    if (b == 1) {
        for (int i = 0; i < 2; i++)
            for (int j = 0; j < 2; j++)
                result[i][j] = M[i][j] % MOD;
        return;
    }
    Matrix half;
    mat_pow(M, b / 2, half);
    mat_mul(half, half, result);  // result = half^2
    if (b % 2 == 1) {
        Matrix tmp;
        for (int i = 0; i < 2; i++)
            for (int j = 0; j < 2; j++)
                tmp[i][j] = result[i][j];
        mat_mul(tmp, M, result);  // result = half^2 * M
    }
}`
                            },
                            {
                                title: '실행',
                                desc: 'n이 최대 10^18 → ll 필수. n≤1은 별도 처리합니다.',
                                code: `int main() {
    ll n; cin >> n;
    if (n <= 1) { cout << n; return 0; }
    // [[1,1],[1,0]]^n 의 [0][1]이 F(n)
    Matrix base = {{1, 1}, {1, 0}}, result;
    mat_pow(base, n, result);
    cout << result[0][1] << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-11401',
            title: 'BOJ 11401 - 이항 계수 3',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/11401',
            simIntro: '페르마 소정리를 이용해 이항 계수를 모듈러 역원으로 계산하는 과정을 관찰하세요.',
            sim: {
                type: 'binom'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>자연수 N과 정수 K가 주어졌을 때, 이항 계수 C(N, K)를 1,000,000,007로 나눈 나머지를 구하는 프로그램을 작성하시오. 페르마의 소정리를 이용하여 모듈러 역원을 구한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>5 2</pre></div>
        <div><strong>출력</strong><pre>10</pre></div>
    </div></div>
    <h4>입력</h4>
    <p>첫째 줄에 N과 K가 주어진다. (1 ≤ N ≤ 4,000,000, 0 ≤ K ≤ N)</p>
    <h4>출력</h4>
    <p>C(N, K)를 1,000,000,007로 나눈 나머지를 출력한다.</p>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ N ≤ 4,000,000</li><li>0 ≤ K ≤ N</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '이항 계수 C(N, K) = N! / (K! × (N-K)!) 이니까, 팩토리얼을 구해서 나누면 되지 않을까?<br><br><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:10px 0;padding:10px 14px;background:var(--bg2);border-radius:8px;font-family:monospace;font-size:0.9rem;"><span style="font-weight:700;color:var(--accent);">C(5,2)</span><span>=</span><div style="text-align:center;"><div style="border-bottom:2px solid var(--text2);padding:2px 8px;font-weight:600;">5!</div><div style="padding:2px 8px;">2! × 3!</div></div><span>=</span><div style="text-align:center;"><div style="border-bottom:2px solid var(--text2);padding:2px 8px;color:var(--green);font-weight:600;">120</div><div style="padding:2px 8px;">2 × 6</div></div><span>=</span><span style="font-weight:700;color:var(--green);font-size:1.1rem;">10</span></div>N!까지 미리 계산해두면 분자(N!)와 분모(K! × (N-K)!)를 바로 구할 수 있어.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 <strong>400만</strong>이야. 400만 팩토리얼은 천문학적인 숫자라 직접 나눌 수 없어.<br><br>그래서 1,000,000,007로 나눈 나머지를 구하라는 건데... <strong>모듈러 연산에서는 나눗셈을 직접 할 수 없어!</strong><br><br><div style="display:flex;gap:12px;flex-wrap:wrap;margin:10px 0;"><div style="padding:8px 12px;background:var(--green)15;border:1.5px solid var(--green);border-radius:8px;font-size:0.85rem;text-align:center;"><div style="color:var(--green);font-weight:600;margin-bottom:4px;">덧셈/곱셈 OK</div><code>(a+b)%p = (a%p+b%p)%p</code></div><div style="padding:8px 12px;background:var(--red)15;border:1.5px solid var(--red);border-radius:8px;font-size:0.85rem;text-align:center;"><div style="color:var(--red);font-weight:600;margin-bottom:4px;">나눗셈 NO!</div><code>(a/b)%p ≠ (a%p)/(b%p)</code></div></div>나눗셈을 어떻게 처리하지?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>페르마 소정리</strong>가 여기서 등장해!<br><br>p가 소수일 때: <strong>a<sup>-1</sup> ≡ a<sup>(p-2)</sup> mod p</strong><br><br>즉, 나눗셈을 <strong>거듭제곱(곱셈)</strong>으로 바꿀 수 있어!<br><br>C(N,K) mod p = N! × (K!)<sup>(p-2)</sup> × ((N-K)!)<sup>(p-2)</sup> mod p<br><br>구현 3단계:<br>① 팩토리얼 배열 미리 계산 (0! ~ N!)<br>② 앞에서 배운 <strong>분할정복 거듭제곱</strong>으로 역원 계산<br>③ 세 값을 곱하면 끝!<br><br>1629번(곱셈)의 거듭제곱 코드를 여기서 그대로 재사용할 수 있어.'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

MOD = 1_000_000_007
N, K = map(int, input().split())

fac = [1] * (N + 1)
for i in range(1, N + 1):
    fac[i] = fac[i - 1] * i % MOD

def power(a, b, mod):
    if b == 0: return 1
    if b == 1: return a % mod
    half = power(a, b // 2, mod)
    result = half * half % mod
    if b % 2 == 1: result = result * a % mod
    return result

ans = fac[N]
ans = ans * power(fac[K], MOD - 2, MOD) % MOD
ans = ans * power(fac[N - K], MOD - 2, MOD) % MOD
print(ans)`,
                cpp: `#include <iostream>
using namespace std;
typedef long long ll;
const ll MOD = 1000000007;
ll fac[4000001];
ll power(ll a, ll b, ll mod) {
    if (b == 0) return 1;
    if (b == 1) return a % mod;
    ll half = power(a, b / 2, mod);
    ll result = half * half % mod;
    if (b % 2 == 1) result = result * a % mod;
    return result;
}
int main() {
    int N, K; cin >> N >> K;
    fac[0] = 1;
    for (int i = 1; i <= N; i++) fac[i] = fac[i-1] * i % MOD;
    ll ans = fac[N];
    ans = ans * power(fac[K], MOD - 2, MOD) % MOD;
    ans = ans * power(fac[N - K], MOD - 2, MOD) % MOD;
    cout << ans << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '팩토리얼 + 페르마 소정리',
                    description: '팩토리얼을 미리 계산하고, 분할정복 거듭제곱으로 역원을 구합니다.',
                    timeComplexity: 'O(N + log p)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
A = [list(map(int, input().split())) for _ in range(N)]
M2, K = map(int, input().split())
B = [list(map(int, input().split())) for _ in range(M)]

C = [[0] * K for _ in range(N)]
for i in range(N):
    for j in range(K):
        for k in range(M):
            C[i][j] += A[i][k] * B[k][j]

for row in C:
    print(' '.join(map(str, row)))`,
                        cpp: `#include <iostream>
using namespace std;
int main() {
    int N, M, M2, K;
    cin >> N >> M;
    int A[100][100], B[100][100], C[100][100] = {};
    for (int i = 0; i < N; i++) for (int j = 0; j < M; j++) cin >> A[i][j];
    cin >> M2 >> K;
    for (int i = 0; i < M; i++) for (int j = 0; j < K; j++) cin >> B[i][j];
    for (int i = 0; i < N; i++)
        for (int j = 0; j < K; j++)
            for (int k = 0; k < M; k++)
                C[i][j] += A[i][k] * B[k][j];
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < K; j++) cout << C[i][j] << (j < K-1 ? " " : "");
        cout << "\\n";
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 팩토리얼',
                                desc: `팩토리얼을 0!부터 N!까지 미리 계산해둡니다.
나중에 C(N,K) = N! / (K! * (N-K)!)에서 사용합니다.`,
                                code: `MOD = 1_000_000_007
N, K = map(int, input().split())

fac = [1] * (N + 1)
for i in range(1, N + 1):
    fac[i] = fac[i - 1] * i % MOD`
                            },
                            {
                                title: '거듭제곱 (역원용)',
                                desc: `모듈러 나눗셈은 직접 불가 → 페르마 소정리로 역원을 구합니다.
a^(p-2) mod p가 a의 모듈러 역원입니다.`,
                                code: `def power(a, b, mod):
    if b == 0: return 1
    if b == 1: return a % mod
    half = power(a, b // 2, mod)
    result = half * half % mod
    if b % 2 == 1:
        result = result * a % mod
    return result`
                            },
                            {
                                title: '결과 계산',
                                desc: `N! × (K!)^(p-2) × ((N-K)!)^(p-2) mod p로
나눗셈을 곱셈으로 바꿔 계산합니다.`,
                                code: `ans = fac[N]
ans = ans * power(fac[K], MOD - 2, MOD) % MOD
ans = ans * power(fac[N - K], MOD - 2, MOD) % MOD
print(ans)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 팩토리얼',
                                desc: '전역 배열로 팩토리얼을 미리 계산합니다.',
                                code: `#include <iostream>
using namespace std;
typedef long long ll;
const ll MOD = 1000000007;
ll fac[4000001];  // N 최대 400만`
                            },
                            {
                                title: '거듭제곱 (역원용)',
                                desc: '페르마 소정리: a^(-1) ≡ a^(p-2) mod p.',
                                code: `ll power(ll a, ll b, ll mod) {
    if (b == 0) return 1;
    if (b == 1) return a % mod;
    ll half = power(a, b / 2, mod);
    ll result = half * half % mod;
    if (b % 2 == 1)
        result = result * a % mod;
    return result;
}`
                            },
                            {
                                title: '결과 계산',
                                desc: 'main에서 팩토리얼 전처리 후, 역원 2번으로 C(N,K) 계산.',
                                code: `int main() {
    int N, K;
    cin >> N >> K;
    fac[0] = 1;
    for (int i = 1; i <= N; i++)
        fac[i] = fac[i - 1] * i % MOD;
    // C(N,K) = N! * (K!)^(p-2) * ((N-K)!)^(p-2)
    ll ans = fac[N];
    ans = ans * power(fac[K], MOD - 2, MOD) % MOD;
    ans = ans * power(fac[N - K], MOD - 2, MOD) % MOD;
    cout << ans << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-6549',
            title: 'BOJ 6549 - 히스토그램에서 가장 큰 직사각형',
            difficulty: 'platinum',
            link: 'https://www.acmicpc.net/problem/6549',
            simIntro: '히스토그램을 분할정복으로 나누어 최대 직사각형을 찾는 과정을 관찰하세요.',
            sim: {
                type: 'histo'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>히스토그램은 직사각형 여러 개가 아래쪽으로 정렬되어 있는 도형이다. 각 직사각형은 같은 너비를 가지고 있지만, 높이는 모두 다를 수 있다. 히스토그램에서 가장 넓이가 큰 직사각형을 구하는 프로그램을 작성하시오. 입력은 여러 테스트 케이스로 이루어져 있다. 각 테스트 케이스의 첫 번째 수는 n(1 ≤ n ≤ 100,000)이고, 그 뒤에 n개의 높이가 주어진다. 0이 입력되면 종료.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>7 2 1 4 5 1 3 3
4 1000 1000 1000 1000
0</pre></div>
        <div><strong>출력</strong><pre>8
4000</pre></div>
    </div></div>
    <h4>입력</h4>
    <p>입력은 여러 테스트 케이스로 이루어져 있다. 각 테스트 케이스는 한 줄로 이루어져 있고, 첫 번째 수는 직사각형의 수 n(1 ≤ n ≤ 100,000)이다. 그 다음 n개의 정수 h<sub>1</sub>, ..., h<sub>n</sub> (0 ≤ h<sub>i</sub> ≤ 1,000,000,000)이 주어진다. 이 숫자들은 직사각형의 높이이며, 왼쪽부터 오른쪽 순서이다. 모든 직사각형의 너비는 1이다. 입력의 마지막 줄에는 0이 하나 주어진다.</p>
    <h4>출력</h4>
    <p>각 테스트 케이스에 대해서, 히스토그램에서 가장 넓이가 큰 직사각형의 넓이를 출력한다.</p>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ n ≤ 100,000</li><li>0 ≤ 높이 ≤ 1,000,000,000</li><li>0이 입력되면 종료</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '모든 막대를 시작점으로 해서, 양쪽으로 확장하며 최대 넓이를 구하면 되지 않을까?<br><br>각 막대 i에 대해 높이가 h[i] 이상인 연속 구간을 찾으면 넓이 = h[i] × 구간 길이.<br><br>모든 막대에 대해 해보면 최대값을 찾을 수 있어!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '각 막대마다 양쪽을 탐색하면 최악의 경우 O(n²)이야. n이 최대 <strong>100,000</strong>이니까 시간 초과!<br><br>여기서 분할정복 아이디어를 떠올려보자. 배열을 반으로 나누면 최대 직사각형은 <strong>세 가지 경우</strong> 중 하나야:<br><br><div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0;"><div style="flex:1;min-width:80px;padding:8px;border:2px solid var(--accent);border-radius:8px;text-align:center;background:var(--accent)08;"><div style="display:flex;gap:2px;justify-content:center;margin-bottom:6px;"><div style="width:14px;height:20px;background:var(--accent)40;border-radius:2px;"></div><div style="width:14px;height:30px;background:var(--accent)40;border-radius:2px;"></div></div><div style="font-size:0.7rem;font-weight:600;color:var(--accent);">① 왼쪽</div></div><div style="flex:1;min-width:80px;padding:8px;border:2px solid var(--green);border-radius:8px;text-align:center;background:var(--green)08;"><div style="display:flex;gap:2px;justify-content:center;margin-bottom:6px;"><div style="width:14px;height:25px;background:var(--green)40;border-radius:2px;"></div><div style="width:14px;height:35px;background:var(--green)40;border-radius:2px;"></div></div><div style="font-size:0.7rem;font-weight:600;color:var(--green);">② 오른쪽</div></div><div style="flex:1;min-width:100px;padding:8px;border:2px solid var(--yellow);border-radius:8px;text-align:center;background:var(--yellow)08;"><div style="display:flex;gap:2px;justify-content:center;margin-bottom:6px;"><div style="width:14px;height:20px;background:var(--accent)30;border-radius:2px;"></div><div style="width:14px;height:30px;background:var(--yellow)60;border-radius:2px;"></div><div style="width:14px;height:25px;background:var(--yellow)60;border-radius:2px;"></div><div style="width:14px;height:35px;background:var(--green)30;border-radius:2px;"></div></div><div style="font-size:0.7rem;font-weight:600;color:var(--yellow);">③ 걸치는 경우</div></div></div>①②는 재귀로 풀 수 있는데, ③은 어떻게 구하지?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '③ 가운데 걸치는 경우: 중앙 두 막대에서 시작해서 <strong>높이가 더 높은 쪽으로 한 칸씩 확장</strong>해!<br><br>확장할 때마다 최소 높이를 갱신하고, 넓이 = 최소 높이 × 너비를 계산해서 최대값을 추적해.<br><br>왜 높은 쪽으로? 넓이를 최대화하려면 높이를 최대한 유지하면서 넓혀야 하니까!<br><br>시간복잡도: T(n) = 2T(n/2) + O(n) → <strong>O(n log n)</strong><br><br><span class="lang-cpp">⚠️ C++에서는 높이 × 너비가 int 범위를 넘을 수 있어 — <code>long long</code> 필수!</span><span class="lang-py">Python은 큰 수를 자동 처리하니까 따로 신경 쓸 필요 없어.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(200000)

def solve(heights, lo, hi):
    if lo == hi:
        return heights[lo]
    mid = (lo + hi) // 2
    left_max = solve(heights, lo, mid)
    right_max = solve(heights, mid + 1, hi)
    l, r = mid, mid + 1
    h = min(heights[l], heights[r])
    cross_max = h * 2
    while l > lo or r < hi:
        if l > lo and (r >= hi or heights[l-1] >= heights[r+1]):
            l -= 1
            h = min(h, heights[l])
        else:
            r += 1
            h = min(h, heights[r])
        cross_max = max(cross_max, h * (r - l + 1))
    return max(left_max, right_max, cross_max)

while True:
    line = list(map(int, input().split()))
    if line[0] == 0: break
    n = line[0]
    heights = line[1:]
    print(solve(heights, 0, n - 1))`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;
int n; ll h[100001];
ll solve(int lo, int hi) {
    if (lo == hi) return h[lo];
    int mid = (lo + hi) / 2;
    ll leftMax = solve(lo, mid), rightMax = solve(mid+1, hi);
    int l = mid, r = mid + 1;
    ll minH = min(h[l], h[r]), crossMax = minH * 2;
    while (l > lo || r < hi) {
        if (l > lo && (r >= hi || h[l-1] >= h[r+1])) { l--; minH = min(minH, h[l]); }
        else { r++; minH = min(minH, h[r]); }
        crossMax = max(crossMax, minH * (r - l + 1));
    }
    return max({leftMax, rightMax, crossMax});
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    while (cin >> n && n) {
        for (int i = 0; i < n; i++) cin >> h[i];
        cout << solve(0, n-1) << "\\n";
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '분할정복',
                    description: '왼쪽/오른쪽/걸치는 경우로 나누어 최대 직사각형을 구합니다.',
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(200000)

def solve(heights, lo, hi):
    if lo == hi:
        return heights[lo]
    mid = (lo + hi) // 2
    left_max = solve(heights, lo, mid)
    right_max = solve(heights, mid + 1, hi)
    l, r = mid, mid + 1
    h = min(heights[l], heights[r])
    cross_max = h * 2
    while l > lo or r < hi:
        if l > lo and (r >= hi or heights[l-1] >= heights[r+1]):
            l -= 1
            h = min(h, heights[l])
        else:
            r += 1
            h = min(h, heights[r])
        cross_max = max(cross_max, h * (r - l + 1))
    return max(left_max, right_max, cross_max)

while True:
    line = list(map(int, input().split()))
    if line[0] == 0: break
    n = line[0]
    heights = line[1:]
    print(solve(heights, 0, n - 1))`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;
int n; ll h[100001];
ll solve(int lo, int hi) {
    if (lo == hi) return h[lo];
    int mid = (lo + hi) / 2;
    ll leftMax = solve(lo, mid), rightMax = solve(mid+1, hi);
    int l = mid, r = mid + 1;
    ll minH = min(h[l], h[r]), crossMax = minH * 2;
    while (l > lo || r < hi) {
        if (l > lo && (r >= hi || h[l-1] >= h[r+1])) { l--; minH = min(minH, h[l]); }
        else { r++; minH = min(minH, h[r]); }
        crossMax = max(crossMax, minH * (r - l + 1));
    }
    return max({leftMax, rightMax, crossMax});
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    while (cin >> n && n) {
        for (int i = 0; i < n; i++) cin >> h[i];
        cout << solve(0, n-1) << "\\n";
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '분할정복 함수',
                                desc: `왼쪽 절반, 오른쪽 절반에서 각각 최대값을 재귀로 구합니다.
기저 조건: 막대 1개면 그 높이가 곧 최대.`,
                                code: `def solve(heights, lo, hi):
    if lo == hi:
        return heights[lo]
    mid = (lo + hi) // 2
    left_max = solve(heights, lo, mid)
    right_max = solve(heights, mid + 1, hi)`
                            },
                            {
                                title: '가운데 걸치는 경우',
                                desc: `중앙에서 시작해 높이가 높은 쪽으로 확장합니다.
확장할 때마다 최소 높이를 갱신하고 넓이를 계산합니다.`,
                                code: `    l, r = mid, mid + 1
    h = min(heights[l], heights[r])
    cross_max = h * 2
    while l > lo or r < hi:
        if l > lo and (r >= hi or heights[l-1] >= heights[r+1]):
            l -= 1
            h = min(h, heights[l])
        else:
            r += 1
            h = min(h, heights[r])
        cross_max = max(cross_max, h * (r - l + 1))`
                            },
                            {
                                title: '최대값 반환',
                                desc: '왼쪽/오른쪽/걸치는 세 경우 중 최대를 반환합니다.',
                                code: '    return max(left_max, right_max, cross_max)'
                            }
                        ],
                        cpp: [
                            {
                                title: '분할정복 함수',
                                desc: 'long long 사용 — 높이 * 너비가 int 범위를 넘을 수 있습니다.',
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;

int n;
ll h[100001];

ll solve(int lo, int hi) {
    if (lo == hi) return h[lo];
    int mid = (lo + hi) / 2;
    ll leftMax = solve(lo, mid);
    ll rightMax = solve(mid + 1, hi);`
                            },
                            {
                                title: '가운데 걸치는 경우',
                                desc: '높이가 높은 쪽으로 확장하여 최대 넓이를 갱신합니다.',
                                code: `    int l = mid, r = mid + 1;
    ll minH = min(h[l], h[r]);
    ll crossMax = minH * 2;
    // 양쪽으로 확장: 높이가 높은 쪽 우선
    while (l > lo || r < hi) {
        if (l > lo && (r >= hi || h[l-1] >= h[r+1])) {
            l--;
            minH = min(minH, h[l]);
        } else {
            r++;
            minH = min(minH, h[r]);
        }
        crossMax = max(crossMax, minH * (r - l + 1));
    }`
                            },
                            {
                                title: '최대값 반환',
                                desc: `max({a,b,c}) initializer_list로 세 값 중 최대 반환.
0이 입력될 때까지 테스트 케이스를 반복합니다.`,
                                code: `    return max({leftMax, rightMax, crossMax});
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    while (cin >> n && n) {
        for (int i = 0; i < n; i++) cin >> h[i];
        cout << solve(0, n - 1) << "\\n";
    }
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
