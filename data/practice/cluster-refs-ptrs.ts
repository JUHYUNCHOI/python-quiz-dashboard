import type { PracticeCluster } from "./types"

export const refsPtrsCluster: PracticeCluster = {
  id: "refs-ptrs",
  title: "참조와 포인터",
  emoji: "🔗",
  description: "레퍼런스 매개변수, call-by-reference, 포인터 기초",
  unlockAfter: "cpp-13",
  problems: [
    {
      id: "refs-001",
      cluster: "refs-ptrs",
      unlockAfter: "cpp-13",
      difficulty: "쉬움",
      title: "swap 함수 (레퍼런스)",
      description: `레퍼런스 매개변수를 이용해 두 정수를 교환하는 함수 swap을 직접 구현하세요. 두 수를 입력받아 swap 후 출력하세요.`,
      constraints: "-10000 ≤ A, B ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

// void swap(int& a, int& b) 함수를 여기에 작성하세요

int main() {
    int a, b;
    cin >> a >> b;
    swap(a, b);
    cout << a << " " << b << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "3 7", expectedOutput: "7 3", label: "기본" },
        { stdin: "0 5", expectedOutput: "5 0", label: "0 포함" },
        { stdin: "4 4", expectedOutput: "4 4", label: "같은 값" },
      ],
      hints: [
        "void swap(int& a, int& b) — 반환값 없이 참조로 직접 수정합니다.",
        "임시 변수 temp를 선언해 a → temp → b → a 순으로 교환하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int a, b;
    cin >> a >> b;
    swap(a, b);
    cout << a << " " << b << "\\n";
    return 0;
}`,
      solutionExplanation: "레퍼런스 매개변수 int& a는 호출자의 변수를 직접 가리킵니다. temp로 a의 원래 값을 보존한 뒤 교환하면, 함수 종료 후 호출자의 변수도 바뀝니다.",
    },
    {
      id: "refs-002",
      cluster: "refs-ptrs",
      unlockAfter: "cpp-13",
      difficulty: "쉬움",
      title: "레퍼런스로 값 두 배",
      description: `레퍼런스 매개변수를 받아 값을 2배로 만드는 함수 doubleValue를 작성하세요. N개의 정수를 입력받아 각각 doubleValue를 적용한 후 한 줄에 출력하세요.`,
      constraints: "1 ≤ N ≤ 10, -1000 ≤ 각 정수 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

// void doubleValue(int& n) 함수를 여기에 작성하세요

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        doubleValue(x);
        cout << x;
        if (i < n - 1) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "3\n1 2 3", expectedOutput: "2 4 6", label: "기본" },
        { stdin: "1\n5", expectedOutput: "10", label: "단일 입력" },
      ],
      hints: [
        "void doubleValue(int& n) { n *= 2; } — 레퍼런스이므로 호출자 변수가 직접 바뀝니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

void doubleValue(int& n) {
    n *= 2;
}

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        doubleValue(x);
        cout << x;
        if (i < n - 1) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation: "n *= 2 한 줄로 충분합니다. 레퍼런스이기 때문에 함수 안에서 n을 수정하면 호출자의 x도 함께 바뀝니다.",
    },
    {
      id: "refs-003",
      cluster: "refs-ptrs",
      unlockAfter: "cpp-13",
      difficulty: "쉬움",
      title: "포인터로 최솟값 0으로 변경",
      description: `N개의 정수를 입력받아, 배열에서 최솟값과 같은 원소를 모두 포인터로 접근해 0으로 변경한 후 출력하세요.`,
      constraints: "1 ≤ N ≤ 10, 1 ≤ 각 정수 ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[10];
    for (int i = 0; i < n; i++) cin >> arr[i];

    // 1. 최솟값을 구하세요
    // 2. 포인터(int* p)를 이용해 최솟값과 같은 원소를 0으로 바꾸세요
    // 3. 결과를 출력하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "3 0 4 0 5", label: "최솟값 두 개" },
        { stdin: "4\n2 3 4 5", expectedOutput: "0 3 4 5", label: "최솟값 하나" },
        { stdin: "3\n7 7 7", expectedOutput: "0 0 0", label: "모두 같음" },
      ],
      hints: [
        "먼저 minVal을 구하세요: for 루프로 arr[i]와 비교.",
        "int* p = arr; 로 포인터를 배열 시작에 맞춘 뒤, *p == minVal이면 *p = 0으로 바꾸세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[10];
    for (int i = 0; i < n; i++) cin >> arr[i];

    int minVal = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] < minVal) minVal = arr[i];

    for (int* p = arr; p < arr + n; p++)
        if (*p == minVal) *p = 0;

    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation: "int* p = arr로 배열 첫 원소를 가리키는 포인터를 만들고, p++로 다음 원소로 이동합니다. *p는 현재 포인터가 가리키는 값이므로 *p = 0으로 직접 수정합니다.",
    },
    {
      id: "refs-004",
      cluster: "refs-ptrs",
      unlockAfter: "cpp-13",
      difficulty: "보통",
      title: "minmax 레퍼런스 반환",
      description: `벡터와 두 개의 레퍼런스를 받아 최솟값과 최댓값을 동시에 구하는 함수 minmax를 작성하세요.\n\n\`void minmax(vector<int>& v, int& mn, int& mx)\`\n\n출력:\n- 첫 번째 줄: 최솟값\n- 두 번째 줄: 최댓값`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 정수 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

// void minmax(vector<int>& v, int& mn, int& mx) 함수를 여기에 작성하세요

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];

    int mn, mx;
    minmax(v, mn, mx);
    cout << mn << "\\n" << mx << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "1\n5", label: "기본" },
        { stdin: "3\n-2 0 2", expectedOutput: "-2\n2", label: "음수 포함" },
      ],
      hints: [
        "mn = v[0]; mx = v[0]; 로 초기화 후, 루프에서 갱신하세요.",
        "mn과 mx는 레퍼런스이므로 함수 안에서 값을 바꾸면 호출자에 반영됩니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

void minmax(vector<int>& v, int& mn, int& mx) {
    mn = v[0];
    mx = v[0];
    for (int x : v) {
        if (x < mn) mn = x;
        if (x > mx) mx = x;
    }
}

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];

    int mn, mx;
    minmax(v, mn, mx);
    cout << mn << "\\n" << mx << "\\n";
    return 0;
}`,
      solutionExplanation: "레퍼런스 매개변수로 두 값을 동시에 '반환'하는 패턴입니다. return은 하나의 값만 돌려줄 수 있지만, 레퍼런스를 여러 개 쓰면 여러 결과를 전달할 수 있습니다.",
    },
    {
      id: "refs-005",
      cluster: "refs-ptrs",
      unlockAfter: "cpp-13",
      difficulty: "보통",
      title: "포인터 배열 순회 — 짝수 합산",
      description: `N개의 정수를 입력받아, 포인터로 배열을 순회하면서 짝수만 합산해 출력하세요.`,
      constraints: "1 ≤ N ≤ 20, 1 ≤ 각 정수 ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[20];
    for (int i = 0; i < n; i++) cin >> arr[i];

    int sum = 0;
    // 포인터로 arr을 순회하며 짝수만 sum에 더하세요
    // (int* p = arr; p < arr + n; p++) 형태로 작성하세요

    cout << sum << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "6", label: "기본" },
        { stdin: "4\n2 4 6 8", expectedOutput: "20", label: "모두 짝수" },
        { stdin: "3\n1 3 5", expectedOutput: "0", label: "모두 홀수" },
      ],
      hints: [
        "for (int* p = arr; p < arr + n; p++) — 포인터를 배열 끝까지 이동합니다.",
        "*p % 2 == 0 이면 짝수입니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[20];
    for (int i = 0; i < n; i++) cin >> arr[i];

    int sum = 0;
    for (int* p = arr; p < arr + n; p++)
        if (*p % 2 == 0) sum += *p;

    cout << sum << "\\n";
    return 0;
}`,
      solutionExplanation: "p < arr + n은 포인터가 배열 마지막 원소 다음 위치를 넘지 않는 조건입니다. p++는 포인터를 다음 int 위치(4바이트 앞)로 이동시킵니다.",
    },
    {
      id: "refs-006",
      cluster: "refs-ptrs",
      unlockAfter: "cpp-13",
      difficulty: "보통",
      title: "const 레퍼런스로 문자 세기",
      description: `const 레퍼런스로 문자열을 받아 특정 문자의 개수를 반환하는 함수 countChar를 작성하세요.\n\n\`int countChar(const string& s, char c)\`\n\n문자열과 문자를 입력받아 해당 문자가 몇 번 등장하는지 출력하세요.`,
      constraints: "1 ≤ 문자열 길이 ≤ 100, 소문자 영문자만",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

// int countChar(const string& s, char c) 함수를 여기에 작성하세요

int main() {
    string s;
    char c;
    cin >> s >> c;
    cout << countChar(s, c) << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "hello l", expectedOutput: "2", label: "기본" },
        { stdin: "programming g", expectedOutput: "2", label: "두 번 등장" },
        { stdin: "aaa b", expectedOutput: "0", label: "없는 문자" },
      ],
      hints: [
        "const string& s — 복사 없이 읽기 전용으로 문자열을 받습니다.",
        "for (char ch : s) 로 순회하며 ch == c 인 경우를 셉니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int countChar(const string& s, char c) {
    int count = 0;
    for (char ch : s)
        if (ch == c) count++;
    return count;
}

int main() {
    string s;
    char c;
    cin >> s >> c;
    cout << countChar(s, c) << "\\n";
    return 0;
}`,
      solutionExplanation: "const string& s는 '읽기 전용 레퍼런스'입니다. 복사 비용 없이 원본 문자열을 읽을 수 있고, 실수로 수정하면 컴파일 오류가 납니다. 긴 문자열을 함수에 전달할 때 권장되는 패턴입니다.",
    },
    {
      id: "refs-007",
      cluster: "refs-ptrs",
      unlockAfter: "cpp-13",
      difficulty: "보통",
      title: "레퍼런스로 벡터 수정",
      description: `벡터 레퍼런스와 정수 x를 받아 벡터의 모든 원소에 x를 더하는 함수 addToAll을 작성하세요.\n\n\`void addToAll(vector<int>& v, int x)\`\n\nN개의 정수와 더할 값 x를 입력받아 결과를 한 줄에 출력하세요.`,
      constraints: "1 ≤ N ≤ 10, -100 ≤ 각 정수 ≤ 100, -100 ≤ x ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

// void addToAll(vector<int>& v, int x) 함수를 여기에 작성하세요

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    addToAll(v, x);
    for (int i = 0; i < n; i++) {
        cout << v[i];
        if (i < n - 1) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "4\n1 2 3 4\n10", expectedOutput: "11 12 13 14", label: "기본" },
        { stdin: "3\n0 0 0\n5", expectedOutput: "5 5 5", label: "0에 더하기" },
      ],
      hints: [
        "for (int& elem : v) — 레퍼런스로 순회하면 원소를 직접 수정할 수 있습니다.",
        "elem += x; 로 각 원소에 x를 더하세요.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

void addToAll(vector<int>& v, int x) {
    for (int& elem : v)
        elem += x;
}

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    addToAll(v, x);
    for (int i = 0; i < n; i++) {
        cout << v[i];
        if (i < n - 1) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation: "for (int& elem : v)는 range-for에서 레퍼런스로 원소를 받는 패턴입니다. &가 없으면 복사본이라 원본이 바뀌지 않습니다. 벡터를 수정하는 범위 루프에서 자주 쓰입니다.",
    },
    {
      id: "refs-008",
      cluster: "refs-ptrs",
      unlockAfter: "cpp-13",
      difficulty: "어려움",
      title: "포인터로 역순 연결",
      description: `N개의 정수를 입력받아, next[] 배열을 포인터처럼 사용해 역순 연결 리스트를 만들고 순회하며 출력하세요.\n\nnext[i]에 i번 원소의 다음 인덱스를 저장합니다. -1이면 끝을 나타냅니다.\n역순 연결: next[N-1] = -1, next[N-2] = N-1, ..., next[0] = 1\n순회는 인덱스 N-1부터 시작하세요.`,
      constraints: "1 ≤ N ≤ 10",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[10], next[10];
    for (int i = 0; i < n; i++) cin >> arr[i];

    // next[] 배열을 역순 연결로 초기화하세요
    // next[n-1] = -1 (끝)
    // next[i] = i+1 ... 하지만 순회는 n-1부터 시작하니
    // 역순이 되려면: next[i] = i-1, 시작은 n-1, 끝은 0 (next[0] = -1)

    // 인덱스 n-1 부터 next[cur] != -1 인 동안 순회해 출력하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\n1 2 3 4", expectedOutput: "4 3 2 1", label: "기본" },
        { stdin: "1\n7", expectedOutput: "7", label: "원소 하나" },
      ],
      hints: [
        "역순 순회를 위해 next[i] = i - 1로 설정하고, next[0] = -1로 끝을 표시하세요.",
        "int cur = n - 1; while (cur != -1) { cout << arr[cur]; cur = next[cur]; } 패턴으로 순회하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[10], next[10];
    for (int i = 0; i < n; i++) cin >> arr[i];

    // 역순 연결: 각 노드의 다음은 바로 앞 인덱스
    next[0] = -1;
    for (int i = 1; i < n; i++)
        next[i] = i - 1;

    int cur = n - 1;
    bool first = true;
    while (cur != -1) {
        if (!first) cout << " ";
        cout << arr[cur];
        first = false;
        cur = next[cur];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation: "next[] 배열이 포인터 역할을 합니다. next[i] = i-1은 '현재 노드의 다음은 앞 인덱스'를 의미합니다. n-1에서 시작해 next를 따라가면 역순으로 순회됩니다. 실제 연결 리스트에서는 이 인덱스 대신 메모리 주소(포인터)를 사용합니다.",
    },
    {
      id: "refs-009",
      cluster: "refs-ptrs",
      unlockAfter: "cpp-13",
      difficulty: "어려움",
      title: "포인터로 첫 번째 위치 찾기",
      description: `배열, 크기, 찾을 값을 받아 배열에서 target의 첫 번째 위치를 가리키는 포인터를 반환하는 함수 findFirst를 작성하세요.\n\n\`int* findFirst(int* arr, int n, int target)\`\n\n찾으면 해당 원소의 인덱스(0-based)를 출력하고, 없으면 -1을 출력하세요.`,
      constraints: "1 ≤ N ≤ 20, -100 ≤ 각 정수, target ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

// int* findFirst(int* arr, int n, int target) 함수를 여기에 작성하세요
// 찾으면 해당 원소의 포인터 반환, 없으면 nullptr 반환

int main() {
    int n;
    cin >> n;
    int arr[20];
    for (int i = 0; i < n; i++) cin >> arr[i];
    int target;
    cin >> target;

    int* result = findFirst(arr, n, target);
    if (result == nullptr) cout << -1 << "\\n";
    else cout << (result - arr) << "\\n";  // 포인터 - 배열 시작 = 인덱스
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 4 1 5\n1", expectedOutput: "1", label: "첫 번째 위치" },
        { stdin: "5\n3 1 4 1 5\n9", expectedOutput: "-1", label: "없는 값" },
      ],
      hints: [
        "for (int* p = arr; p < arr + n; p++) 로 순회하며 *p == target 인 경우를 찾으세요.",
        "찾으면 p를 반환, 루프가 끝날 때까지 못 찾으면 nullptr를 반환하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int* findFirst(int* arr, int n, int target) {
    for (int* p = arr; p < arr + n; p++)
        if (*p == target) return p;
    return nullptr;
}

int main() {
    int n;
    cin >> n;
    int arr[20];
    for (int i = 0; i < n; i++) cin >> arr[i];
    int target;
    cin >> target;

    int* result = findFirst(arr, n, target);
    if (result == nullptr) cout << -1 << "\\n";
    else cout << (result - arr) << "\\n";
    return 0;
}`,
      solutionExplanation: "포인터를 반환하는 함수의 핵심 패턴입니다. result - arr는 포인터 뺄셈으로, 두 포인터 사이의 원소 수(= 인덱스)를 구합니다. nullptr는 '유효하지 않음'을 나타내는 포인터 값입니다.",
    },
    {
      id: "refs-010",
      cluster: "refs-ptrs",
      unlockAfter: "cpp-13",
      difficulty: "어려움",
      title: "벡터 레퍼런스로 중복 제거",
      description: `벡터 레퍼런스를 받아 중복을 제거하는 함수 removeDuplicates를 작성하세요.\n\n\`void removeDuplicates(vector<int>& v)\`\n\n중복 제거 후 정렬된 결과를 출력하세요. (sort 사용 가능)\n\nN개의 정수를 입력받아 중복을 제거한 결과를 오름차순으로 출력하세요.`,
      constraints: "1 ≤ N ≤ 20, -100 ≤ 각 정수 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// void removeDuplicates(vector<int>& v) 함수를 여기에 작성하세요
// sort 후 unique + erase 패턴 또는 직접 구현

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];

    removeDuplicates(v);

    for (int i = 0; i < (int)v.size(); i++) {
        cout << v[i];
        if (i < (int)v.size() - 1) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "6\n3 1 4 1 5 3", expectedOutput: "1 3 4 5", label: "기본" },
        { stdin: "3\n1 1 1", expectedOutput: "1", label: "모두 같음" },
      ],
      hints: [
        "sort(v.begin(), v.end()); 로 먼저 정렬하세요.",
        "정렬 후 새 벡터에 이전 값과 다른 것만 추가하는 방식으로 중복을 제거하세요.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void removeDuplicates(vector<int>& v) {
    sort(v.begin(), v.end());
    vector<int> result;
    for (int i = 0; i < (int)v.size(); i++)
        if (i == 0 || v[i] != v[i - 1])
            result.push_back(v[i]);
    v = result;
}

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];

    removeDuplicates(v);

    for (int i = 0; i < (int)v.size(); i++) {
        cout << v[i];
        if (i < (int)v.size() - 1) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation: "정렬 후 인접한 중복을 제거하는 패턴입니다. i == 0이거나 이전 원소와 다를 때만 result에 추가합니다. 마지막에 v = result로 원본 벡터를 교체합니다. vector는 레퍼런스로 받았으므로 호출자의 벡터도 바뀝니다.",
    },
  ],
}
