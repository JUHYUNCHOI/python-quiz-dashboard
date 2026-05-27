import type { PracticeCluster } from "./types"

export const stringContestCluster: PracticeCluster = {
  id: "algo-string-contest",
  title: "문자열 문제 풀이",
  emoji: "🏆",
  description: "회문, 아나그램, 부분 문자열 패턴 — 단순 메서드 호출 넘어",
  unlockAfter: "algo-string",
  en: {
    title: "String Practice",
    description: "Palindromes, anagrams, substring patterns — beyond methods",
  },
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // 1. 회문 검사 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "astr-001",
      cluster: "algo-string-contest",
      unlockAfter: "algo-string",
      difficulty: "보통",
      title: "회문 검사",
      description: `한 줄에 문자열 S 가 주어진다. S 가 **회문(palindrome)** — 앞에서 읽으나 뒤에서 읽으나 같은 문자열 — 이면 \`YES\`, 아니면 \`NO\` 를 출력하라.

영문 소문자만 입력으로 들어온다 (공백 없음, 대소문자 변환 불필요).

출처: BOJ 10988 paraphrased`,
      constraints: "1 ≤ |S| ≤ 100, S 는 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "level", expectedOutput: "YES", label: "기본 회문" },
        { stdin: "hello", expectedOutput: "NO", label: "회문 아님" },
        { stdin: "a", expectedOutput: "YES", label: "한 글자 — 항상 회문" },
        { stdin: "aa", expectedOutput: "YES", label: "두 글자 회문" },
        { stdin: "ab", expectedOutput: "NO", label: "두 글자 비회문" },
        { stdin: "racecar", expectedOutput: "YES", label: "긴 회문" },
        { stdin: "abba", expectedOutput: "YES", label: "짝수 길이 회문" },
        { stdin: "abca", expectedOutput: "NO", label: "양 끝만 같음" },
      ],
      hints: [
        "two-pointer: 왼쪽(l=0), 오른쪽(r=N-1) 에서 시작해 안쪽으로 좁히면서 비교.",
        "한 군데라도 다르면 즉시 NO. 끝까지 다 같으면 YES.",
        "또는 `string rev = s; reverse(rev.begin(), rev.end()); return s == rev;` 한 줄도 가능.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    int l = 0, r = (int)s.size() - 1;
    bool ok = true;
    while (l < r) {
        if (s[l] != s[r]) { ok = false; break; }
        l++; r--;
    }
    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "two-pointer 패턴의 기본형. l, r 이 가운데에서 만날 때까지 양 끝 글자를 비교. 한 번이라도 다르면 회문이 아님. 길이가 홀수일 때 가운데 글자는 자기 자신과 비교할 필요 없으므로 `l < r` 조건이 정확.",
      pyInitialCode: `import sys
input = sys.stdin.readline

def main():
    pass

main()`,
      pySolutionCode: `import sys
input = sys.stdin.readline

def main():
    s = input().strip()
    l, r = 0, len(s) - 1
    ok = True
    while l < r:
        if s[l] != s[r]:
            ok = False
            break
        l += 1
        r -= 1
    print("YES" if ok else "NO")

main()`,
      en: {
        title: "Palindrome Check",
        description: `Read a string S on one line. Print \`YES\` if S is a **palindrome** (reads the same forwards and backwards), otherwise \`NO\`.

Input is lowercase English only (no spaces, no case conversion).

Source: BOJ 10988 paraphrased`,
        constraints: "1 ≤ |S| ≤ 100, S is lowercase English",
        hints: [
          "Two-pointer: start at l=0 and r=N-1, walk inward comparing.",
          "Any mismatch → NO. Survive to the middle → YES.",
          "Or a one-liner: `string rev = s; reverse(rev.begin(), rev.end()); return s == rev;`",
        ],
        solutionExplanation:
          "The canonical two-pointer pattern. Compare end characters and walk inward until pointers meet. The `l < r` condition correctly skips the middle character when length is odd.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 가장 긴 회문 부분 문자열 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "astr-002",
      cluster: "algo-string-contest",
      unlockAfter: "algo-string",
      difficulty: "어려움",
      title: "가장 긴 회문 부분 문자열",
      description: `문자열 S 가 주어진다. S 의 부분 문자열(substring — 연속된 구간) 중 **회문인 것 중 가장 긴 것** 을 출력하라.

답이 여러 개면 **가장 먼저 발견되는 것**(시작 인덱스가 가장 작은 것) 을 출력한다. 같은 시작 인덱스에서는 길이가 더 큰 것이 우선.

핵심 아이디어: 각 위치를 회문의 **중심** 으로 보고 양옆으로 확장(expand-around-center). 길이가 짝수인 회문(중심 2글자)도 따로 확인해야 한다.

출처: LeetCode 5 simplified (N ≤ 1000)`,
      constraints: "1 ≤ |S| ≤ 1000, S 는 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "babad", expectedOutput: "bab", label: "기본 — bab 또는 aba 가능, 먼저 발견되는 bab" },
        { stdin: "cbbd", expectedOutput: "bb", label: "짝수 길이 회문" },
        { stdin: "a", expectedOutput: "a", label: "한 글자" },
        { stdin: "ac", expectedOutput: "a", label: "회문이 1글자만 — 첫 글자" },
        { stdin: "racecar", expectedOutput: "racecar", label: "전체가 회문" },
        { stdin: "abacdfgdcaba", expectedOutput: "aba", label: "여러 'aba' 중 첫 번째" },
        { stdin: "aaaa", expectedOutput: "aaaa", label: "전부 같은 글자" },
      ],
      hints: [
        "각 인덱스 i 를 회문의 중심으로 보고 양옆으로 확장한다.",
        "길이 홀수 회문: 중심 = s[i] 한 글자, l=i, r=i 에서 시작.",
        "길이 짝수 회문: 중심 = s[i], s[i+1] 두 글자, l=i, r=i+1 에서 시작.",
        "확장 가능한 만큼 l-- 와 r++ 하면서 s[l]==s[r] 인지 확인. 답을 갱신할 때 **strict 부등호** (>) 만 사용해야 '먼저 발견된 것' 유지.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    int n = (int)s.size();
    int bestL = 0, bestLen = 1; // 길이 1 은 항상 가능
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < n && s[l] == s[r]) { l--; r++; }
        // 확장 후 실제 회문 범위는 [l+1, r-1], 길이 = r - l - 1
        int len = r - l - 1;
        if (len > bestLen) { bestLen = len; bestL = l + 1; }
    };
    for (int i = 0; i < n; i++) {
        expand(i, i);     // 홀수 길이 중심
        expand(i, i + 1); // 짝수 길이 중심
    }
    cout << s.substr(bestL, bestLen) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "expand-around-center: 각 위치를 중심으로 양옆으로 확장. 홀수/짝수 두 경우 모두 시도해야 한다. 길이 갱신을 strict `>` 로 해서 '먼저 발견된 것' 을 자동 유지 (인덱스 i 가 증가하는 순서로 돌므로). O(N²) 이지만 N ≤ 1000 이라 충분.",
      pyInitialCode: `import sys
input = sys.stdin.readline

def main():
    pass

main()`,
      pySolutionCode: `import sys
input = sys.stdin.readline

def main():
    s = input().strip()
    n = len(s)
    best_l, best_len = 0, 1

    def expand(l, r):
        nonlocal best_l, best_len
        while l >= 0 and r < n and s[l] == s[r]:
            l -= 1
            r += 1
        # 실제 회문 범위 [l+1, r-1], 길이 = r - l - 1
        length = r - l - 1
        if length > best_len:
            best_len = length
            best_l = l + 1

    for i in range(n):
        expand(i, i)      # 홀수 길이
        expand(i, i + 1)  # 짝수 길이

    print(s[best_l:best_l + best_len])

main()`,
      en: {
        title: "Longest Palindromic Substring",
        description: `Given a string S, print the **longest palindromic substring** of S (a substring is a contiguous slice).

If multiple have the same maximum length, output the one with the **smallest starting index** (earliest occurrence).

Core idea: for each position, treat it as the **center** of a palindrome and expand outwards. Even-length palindromes (two-character centers) need a separate pass.

Source: LeetCode 5 simplified (N ≤ 1000)`,
        constraints: "1 ≤ |S| ≤ 1000, S is lowercase English",
        hints: [
          "Treat each index i as a palindrome center, expand outward.",
          "Odd length: l=i, r=i (single-char center).",
          "Even length: l=i, r=i+1 (two-char center).",
          "Walk l-- and r++ while s[l]==s[r]. Use **strict** `>` when updating the best, so the earliest-found one wins.",
        ],
        solutionExplanation:
          "Expand-around-center: from each index, expand outward in both odd and even modes. Updating only on strict `>` keeps the earliest occurrence automatically (because i walks left to right). O(N²) is fine for N ≤ 1000.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 아나그램 검사 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "astr-003",
      cluster: "algo-string-contest",
      unlockAfter: "algo-string",
      difficulty: "보통",
      title: "아나그램 검사",
      description: `두 문자열 A, B 가 각 줄에 주어진다. 두 문자열이 서로 **아나그램** 인지(글자 구성과 개수가 정확히 같은지) \`YES\` / \`NO\` 로 출력하라.

영문 소문자만 들어온다.

출처: BOJ 16171 simplified`,
      constraints: "1 ≤ |A|, |B| ≤ 100,000, 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "listen\nsilent", expectedOutput: "YES", label: "기본 아나그램" },
        { stdin: "hello\nworld", expectedOutput: "NO", label: "다른 단어" },
        { stdin: "a\na", expectedOutput: "YES", label: "한 글자 동일" },
        { stdin: "ab\nba", expectedOutput: "YES", label: "두 글자 순서만 다름" },
        { stdin: "ab\nabc", expectedOutput: "NO", label: "길이 다름" },
        { stdin: "aabbcc\nabcabc", expectedOutput: "YES", label: "각 글자 빈도 같음" },
        { stdin: "aabb\nabbb", expectedOutput: "NO", label: "글자 빈도 다름" },
      ],
      hints: [
        "길이가 다르면 즉시 NO.",
        "각 글자의 빈도를 세서 비교. 영문 소문자만이라면 크기 26 배열로 충분.",
        "또는 두 문자열을 모두 정렬해서 비교 — 코드가 짧다.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string a, b;
    cin >> a >> b;
    if (a.size() != b.size()) { cout << "NO\\n"; return 0; }
    int cnt[26] = {0};
    for (char c : a) cnt[c - 'a']++;
    for (char c : b) cnt[c - 'a']--;
    for (int i = 0; i < 26; i++) {
        if (cnt[i] != 0) { cout << "NO\\n"; return 0; }
    }
    cout << "YES\\n";
    return 0;
}`,
      solutionExplanation:
        "두 가지 표준 접근: (1) 빈도수 배열 — A 는 +1, B 는 -1 후 모두 0 인지 확인. O(N). (2) 둘 다 정렬 후 비교. O(N log N). 길이 다르면 무조건 NO 인 점을 먼저 체크하면 빠르게 종료할 수 있다.",
      pyInitialCode: `import sys
input = sys.stdin.readline

def main():
    pass

main()`,
      pySolutionCode: `import sys
from collections import Counter
input = sys.stdin.readline

def main():
    a = input().strip()
    b = input().strip()
    if len(a) != len(b):
        print("NO")
        return
    print("YES" if Counter(a) == Counter(b) else "NO")

main()`,
      en: {
        title: "Anagram Check",
        description: `Two strings A, B are given on separate lines. Print \`YES\` if they are **anagrams** (same multiset of characters), otherwise \`NO\`.

Lowercase English only.

Source: BOJ 16171 simplified`,
        constraints: "1 ≤ |A|, |B| ≤ 100,000, lowercase English",
        hints: [
          "Different lengths → immediately NO.",
          "Count character frequencies; a size-26 array suffices for lowercase English.",
          "Alternatively sort both strings and compare — shorter code.",
        ],
        solutionExplanation:
          "Two standard approaches: (1) frequency array — +1 for A, -1 for B, check all zero. O(N). (2) sort both and compare. O(N log N). Always check length mismatch first for an early exit.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 유효한 괄호 문자열 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "astr-004",
      cluster: "algo-string-contest",
      unlockAfter: "algo-string",
      difficulty: "보통",
      title: "유효한 괄호 문자열",
      description: `\`()\`, \`[]\`, \`{}\` 세 종류의 괄호로만 이루어진 문자열 S 가 주어진다. S 가 **유효한 괄호 문자열** 인지 \`YES\` / \`NO\` 로 출력하라.

유효한 괄호 문자열의 규칙:
- 열린 괄호는 같은 종류의 닫힌 괄호로 닫힌다.
- 닫힐 때는 가장 최근에 열린 괄호와 같은 종류여야 한다 (중첩 순서 유지).

예: \`([])\` YES, \`(]\` NO, \`([)]\` NO (순서 어긋남), \`{[]}\` YES.

출처: LeetCode 20 (Valid Parentheses)`,
      constraints: "1 ≤ |S| ≤ 10,000, S 는 위 6 가지 괄호 문자만",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "()", expectedOutput: "YES", label: "기본 쌍" },
        { stdin: "()[]{}", expectedOutput: "YES", label: "세 종류 나란히" },
        { stdin: "(]", expectedOutput: "NO", label: "타입 불일치" },
        { stdin: "([)]", expectedOutput: "NO", label: "순서 어긋남" },
        { stdin: "{[]}", expectedOutput: "YES", label: "중첩" },
        { stdin: "(", expectedOutput: "NO", label: "닫히지 않음" },
        { stdin: ")", expectedOutput: "NO", label: "여는 게 없음" },
        { stdin: "(((())))", expectedOutput: "YES", label: "깊은 중첩" },
        { stdin: "({[}])", expectedOutput: "NO", label: "내부 순서 꼬임" },
      ],
      hints: [
        "스택 자료구조 — 여는 괄호는 push, 닫는 괄호는 top 과 짝이 맞는지 확인 후 pop.",
        "닫는 괄호인데 스택이 비어있으면 즉시 NO.",
        "끝까지 처리한 후 스택이 비어있어야 YES — 안 그러면 닫지 않은 게 남은 것.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    stack<char> st;
    bool ok = true;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) { ok = false; break; }
            char t = st.top();
            if ((c == ')' && t != '(') ||
                (c == ']' && t != '[') ||
                (c == '}' && t != '{')) {
                ok = false; break;
            }
            st.pop();
        }
    }
    if (!st.empty()) ok = false;
    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "스택의 교과서적 응용. 여는 괄호는 모두 push, 닫는 괄호가 나오면 가장 최근에 열린 것(top)과 짝이 맞아야 함. 두 가지 실패 케이스: (1) 닫는데 스택 비어있음, (2) 짝이 안 맞음. 끝나고 스택 비어있는지도 확인 — 여는 게 남으면 짝이 안 된 것.",
      pyInitialCode: `import sys
input = sys.stdin.readline

def main():
    pass

main()`,
      pySolutionCode: `import sys
input = sys.stdin.readline

def main():
    s = input().strip()
    stack = []
    pair = {')': '(', ']': '[', '}': '{'}
    ok = True
    for c in s:
        if c in '([{':
            stack.append(c)
        else:
            if not stack or stack[-1] != pair[c]:
                ok = False
                break
            stack.pop()
    if stack:
        ok = False
    print("YES" if ok else "NO")

main()`,
      en: {
        title: "Valid Parentheses",
        description: `Given a string S containing only \`()\`, \`[]\`, \`{}\`, decide if it is a **valid** parenthesis string. Print \`YES\` or \`NO\`.

A valid string:
- Each opening bracket closes with the same type.
- Closing must match the **most recently opened** bracket (proper nesting).

E.g., \`([])\` YES, \`(]\` NO, \`([)]\` NO (order broken), \`{[]}\` YES.

Source: LeetCode 20 (Valid Parentheses)`,
        constraints: "1 ≤ |S| ≤ 10,000, S contains only the 6 bracket characters",
        hints: [
          "Stack: push openers; for closers, the top must match.",
          "Closer with empty stack → NO immediately.",
          "End: stack must be empty, otherwise there are unclosed openers.",
        ],
        solutionExplanation:
          "Textbook stack use. Push openers, and for each closer the most recent opener (top) must match. Two failure modes: closer-with-empty-stack and type-mismatch. Final stack must be empty too.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 문자열 압축 (Run-Length Encoding) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "astr-005",
      cluster: "algo-string-contest",
      unlockAfter: "algo-string",
      difficulty: "보통",
      title: "문자열 압축 (RLE)",
      description: `문자열 S 가 주어진다. **연속해서 반복되는 같은 글자** 를 \`글자개수\` 형식으로 압축한 결과를 출력하라.

예:
- \`aaabbc\` → \`a3b2c1\`
- \`abc\` → \`a1b1c1\` (압축해도 더 길어지지만 그대로 출력 — 단순 RLE)
- \`aaaaa\` → \`a5\`

영문 소문자만 입력. 개수는 항상 그대로 숫자로 적는다 (자릿수 제한 없음).

출처: LeetCode 443 simplified — 길이 비교 없이 항상 RLE 출력`,
      constraints: "1 ≤ |S| ≤ 100,000, 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "aaabbc", expectedOutput: "a3b2c1", label: "기본" },
        { stdin: "abc", expectedOutput: "a1b1c1", label: "반복 없음" },
        { stdin: "aaaaa", expectedOutput: "a5", label: "한 글자만 반복" },
        { stdin: "a", expectedOutput: "a1", label: "길이 1" },
        { stdin: "aabbaabb", expectedOutput: "a2b2a2b2", label: "그룹 다시 등장" },
        {
          stdin: "aaaaaaaaaaabbbcccccccccc",
          expectedOutput: "a11b3c10",
          label: "두 자리 개수",
        },
      ],
      hints: [
        "직전 글자와 같으면 카운터 +1, 다르면 (직전 글자, 카운터) 를 출력하고 새 글자로 카운터 리셋.",
        "마지막 그룹은 루프 종료 후 한 번 더 출력해야 한다 — 자주 빠뜨리는 부분.",
        "문자열을 누적할 때는 `+=` 또는 `ostringstream` 사용.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    string out;
    int i = 0, n = (int)s.size();
    while (i < n) {
        int j = i;
        while (j < n && s[j] == s[i]) j++;
        out += s[i];
        out += to_string(j - i);
        i = j;
    }
    cout << out << "\\n";
    return 0;
}`,
      solutionExplanation:
        "그룹화 패턴: 외부 인덱스 i, 같은 글자가 끝나는 위치 j 를 내부에서 찾아 한 번에 그룹 한 개 처리. 이렇게 하면 '마지막 그룹 빠뜨리기' 실수가 자연스럽게 사라진다. `i = j` 로 다음 그룹의 시작으로 이동.",
      pyInitialCode: `import sys
input = sys.stdin.readline

def main():
    pass

main()`,
      pySolutionCode: `import sys
input = sys.stdin.readline

def main():
    s = input().strip()
    out = []
    i, n = 0, len(s)
    while i < n:
        j = i
        while j < n and s[j] == s[i]:
            j += 1
        out.append(s[i])
        out.append(str(j - i))
        i = j
    print(''.join(out))

main()`,
      en: {
        title: "String Compression (RLE)",
        description: `Given string S, compress consecutive runs of the same character into \`char count\` form.

Examples:
- \`aaabbc\` → \`a3b2c1\`
- \`abc\` → \`a1b1c1\` (longer than the original, but still output — plain RLE)
- \`aaaaa\` → \`a5\`

Lowercase English only. Counts are written as plain integers (no digit cap).

Source: LeetCode 443 simplified — always emit RLE (no length comparison)`,
        constraints: "1 ≤ |S| ≤ 100,000, lowercase English",
        hints: [
          "Same as previous char → counter++. Different → emit (prev, count) and reset.",
          "Don't forget the **final group** after the loop — common bug.",
          "Use string `+=` or `ostringstream` to accumulate.",
        ],
        solutionExplanation:
          "Group-walk pattern: outer index i, inner index j skips through equal chars. Processing one full group per outer step prevents the 'forgot the last group' bug naturally.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 부분 문자열 찾기 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "astr-006",
      cluster: "algo-string-contest",
      unlockAfter: "algo-string",
      difficulty: "보통",
      title: "부분 문자열 찾기 (단순 검색)",
      description: `두 문자열 \`haystack\` 과 \`needle\` 이 각 줄에 주어진다. \`haystack\` 안에서 \`needle\` 이 **처음 등장하는 시작 인덱스** (0-based) 를 출력하라. 등장하지 않으면 \`-1\` 출력.

needle 이 빈 문자열일 가능성은 없다고 가정한다 (제약).

**제약**: \`string::find\` 사용 금지 — 직접 이중 루프로 구현하라. 이렇게 해야 검색 알고리즘이 어떻게 동작하는지 감이 잡힌다.

출처: LeetCode 28 (Find the Index of the First Occurrence)`,
      constraints: "1 ≤ |haystack| ≤ 10,000, 1 ≤ |needle| ≤ |haystack|, 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "hello\nll", expectedOutput: "2", label: "기본 — index 2" },
        { stdin: "abcdef\nde", expectedOutput: "3", label: "중간 위치" },
        { stdin: "abcabc\nabc", expectedOutput: "0", label: "맨 앞에서 시작" },
        { stdin: "aaaaa\naab", expectedOutput: "-1", label: "거의 매칭되지만 없음" },
        { stdin: "abc\nd", expectedOutput: "-1", label: "한 글자 없음" },
        { stdin: "mississippi\nissip", expectedOutput: "4", label: "부분 매칭 후 진짜 매칭" },
        { stdin: "abab\nbab", expectedOutput: "1", label: "조금 뒤에 시작" },
        { stdin: "a\na", expectedOutput: "0", label: "완전 동일" },
      ],
      hints: [
        "haystack 의 각 시작 위치 i (0 ~ N-M) 마다 needle 과 글자별로 비교.",
        "M 글자 모두 일치하면 i 반환. 어느 한 글자라도 다르면 다음 i 로 이동.",
        "**중요**: i 의 최대값은 N-M (그 뒤로는 needle 이 들어갈 자리가 없음).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string h, n;
    cin >> h >> n;
    int N = (int)h.size(), M = (int)n.size();
    int ans = -1;
    for (int i = 0; i <= N - M; i++) {
        int j = 0;
        while (j < M && h[i + j] == n[j]) j++;
        if (j == M) { ans = i; break; }
    }
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "단순(naive) 부분 문자열 검색 — O(N·M). 외부 루프는 시작 위치 i, 내부 루프는 needle 글자별 비교. `i <= N - M` 으로 제한해야 인덱스 범위를 안 벗어남. KMP/보이어-무어 같은 고급 알고리즘도 있지만, 이 규모에서는 단순 구현이 충분히 빠르다.",
      pyInitialCode: `import sys
input = sys.stdin.readline

def main():
    pass

main()`,
      pySolutionCode: `import sys
input = sys.stdin.readline

def main():
    h = input().strip()
    n = input().strip()
    N, M = len(h), len(n)
    ans = -1
    # str.find 금지 — 직접 이중 루프
    for i in range(N - M + 1):
        j = 0
        while j < M and h[i + j] == n[j]:
            j += 1
        if j == M:
            ans = i
            break
    print(ans)

main()`,
      en: {
        title: "Find Substring (Naive Search)",
        description: `Given two strings \`haystack\` and \`needle\` on separate lines, print the **first 0-based starting index** of \`needle\` inside \`haystack\`, or \`-1\` if not found.

needle is guaranteed non-empty.

**Constraint**: do **not** use \`string::find\` — implement the search with nested loops yourself, so you internalize how substring search works.

Source: LeetCode 28 (Find the Index of the First Occurrence)`,
        constraints: "1 ≤ |haystack| ≤ 10,000, 1 ≤ |needle| ≤ |haystack|, lowercase English",
        hints: [
          "For each candidate start i in haystack (0..N-M), compare char-by-char.",
          "Full M-length match → return i. Any mismatch → advance i.",
          "**Important**: cap i at N-M — past that, needle can't fit.",
        ],
        solutionExplanation:
          "Naive substring search — O(N·M). Outer loop walks i, inner loop compares characters. Capping i at N-M keeps indexing safe. KMP/Boyer-Moore exist but are overkill at this size.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 가장 긴 공통 접두사 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "astr-007",
      cluster: "algo-string-contest",
      unlockAfter: "algo-string",
      difficulty: "보통",
      title: "가장 긴 공통 접두사",
      description: `첫 줄에 N, 그 다음 N 줄에 영문 소문자 문자열들이 주어진다. **모든 문자열의 공통 접두사(prefix)** 중 가장 긴 것을 출력하라. 공통 접두사가 없으면 빈 줄을 출력 (개행만).

예: \`flower\`, \`flow\`, \`flight\` → \`fl\`

출처: LeetCode 14 (Longest Common Prefix)`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ 각 문자열 길이 ≤ 200, 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3\nflower\nflow\nflight", expectedOutput: "fl", label: "기본" },
        { stdin: "3\ndog\nracecar\ncar", expectedOutput: "", label: "공통 접두사 없음" },
        { stdin: "1\nhello", expectedOutput: "hello", label: "1개 — 자기 자신이 답" },
        { stdin: "3\nabc\nabc\nabc", expectedOutput: "abc", label: "전부 동일" },
        { stdin: "2\nabcd\nab", expectedOutput: "ab", label: "짧은 쪽이 한쪽의 접두사" },
        { stdin: "4\nprefix\npresent\npress\nprep", expectedOutput: "pre", label: "여러 단어 공통 pre" },
        { stdin: "2\na\nb", expectedOutput: "", label: "첫 글자부터 다름" },
      ],
      hints: [
        "첫 번째 문자열을 기준으로 잡고, 인덱스 i 를 0 부터 늘려가며 모든 문자열의 i번째 글자가 같은지 확인.",
        "**길이 초과** 도 mismatch 와 똑같이 처리: 어떤 문자열이 i 까지 도달 못하면 즉시 중단.",
        "끝까지 살아남은 i 가 공통 접두사의 길이.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<string> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int i = 0;
    while (true) {
        if (i >= (int)v[0].size()) break;
        char c = v[0][i];
        bool ok = true;
        for (int k = 1; k < n; k++) {
            if (i >= (int)v[k].size() || v[k][i] != c) { ok = false; break; }
        }
        if (!ok) break;
        i++;
    }
    cout << v[0].substr(0, i) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "세로 비교 (vertical scan): 인덱스 i 를 키워가며 모든 문자열의 같은 위치 글자를 비교. 두 가지 종료 조건 — 어떤 문자열이 짧아져서 인덱스가 범위를 벗어남, 또는 글자가 다름. 어느 쪽이든 i 가 답의 길이.",
      pyInitialCode: `import sys
input = sys.stdin.readline

def main():
    pass

main()`,
      pySolutionCode: `import sys
input = sys.stdin.readline

def main():
    n = int(input())
    v = [input().strip() for _ in range(n)]
    i = 0
    while True:
        if i >= len(v[0]):
            break
        c = v[0][i]
        ok = True
        for k in range(1, n):
            if i >= len(v[k]) or v[k][i] != c:
                ok = False
                break
        if not ok:
            break
        i += 1
    print(v[0][:i])

main()`,
      en: {
        title: "Longest Common Prefix",
        description: `First line N, then N lines of lowercase English strings. Print the **longest common prefix** of all of them. If none, output an empty line (newline only).

Example: \`flower\`, \`flow\`, \`flight\` → \`fl\`

Source: LeetCode 14 (Longest Common Prefix)`,
        constraints: "1 ≤ N ≤ 1000, 1 ≤ each string ≤ 200, lowercase English",
        hints: [
          "Anchor on the first string. Walk index i upward, checking every string's i-th char.",
          "Treat **length overflow** the same as mismatch: any string shorter than i halts.",
          "The surviving i is the prefix length.",
        ],
        solutionExplanation:
          "Vertical scan: increment i and compare the i-th char of every string. Two stop conditions — running off the end of some string, or a mismatch. Either way, i is the answer length.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 좋은 분할 개수 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "astr-008",
      cluster: "algo-string-contest",
      unlockAfter: "algo-string",
      difficulty: "어려움",
      title: "좋은 분할 개수",
      description: `영문 소문자 문자열 S 가 주어진다. S 를 **두 개의 비어있지 않은 부분** 으로 자르는 방법(split point) 중, **좌·우 부분의 서로 다른 문자 개수가 같은** 경우 (= "좋은 분할") 의 수를 출력하라.

|S| = N 이면 split point 는 1, 2, ..., N-1 (총 N-1 개).

예: \`aacaba\`
- "a" | "acaba" → 1 vs 3 ❌
- "aa" | "caba" → 1 vs 3 ❌
- "aac" | "aba" → 2 vs 2 ✓
- "aaca" | "ba" → 2 vs 2 ✓
- "aacab" | "a" → 3 vs 1 ❌
- 답: 2

출처: LeetCode 1525 (Number of Good Ways to Split a String)`,
      constraints: "1 ≤ |S| ≤ 100,000, 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "aacaba", expectedOutput: "2", label: "기본 — LC 예시" },
        { stdin: "abcd", expectedOutput: "1", label: "ab | cd 만 2 vs 2" },
        { stdin: "aaaaa", expectedOutput: "4", label: "전부 같음 — 모든 분할이 1 vs 1" },
        { stdin: "a", expectedOutput: "0", label: "분할 불가능" },
        { stdin: "ab", expectedOutput: "1", label: "a|b → 1 vs 1" },
        { stdin: "acbadbaada", expectedOutput: "2", label: "LC 다른 예시" },
        { stdin: "abcdef", expectedOutput: "1", label: "전부 다른 글자 — 가운데 'abc'|'def' 만 3 vs 3" },
      ],
      hints: [
        "단순 방법: 각 split point 마다 좌/우 distinct 를 매번 새로 세면 O(N²) — 너무 느리다.",
        "**두 번 훑기** — 한 번은 왼쪽에서 오른쪽으로 누적하면서 distinct 카운트, 한 번은 오른쪽에서 왼쪽으로.",
        "각 위치의 좌/우 distinct 를 미리 저장해 두면 split point 별 비교는 O(1).",
        "전체 시간 복잡도 O(N), 공간 O(N).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    int n = (int)s.size();
    if (n < 2) { cout << 0 << "\\n"; return 0; }

    vector<int> leftDist(n), rightDist(n);
    bool seen[26] = {false};
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        if (!seen[s[i] - 'a']) { seen[s[i] - 'a'] = true; cnt++; }
        leftDist[i] = cnt; // s[0..i] 의 distinct
    }
    bool seen2[26] = {false};
    cnt = 0;
    for (int i = n - 1; i >= 0; i--) {
        if (!seen2[s[i] - 'a']) { seen2[s[i] - 'a'] = true; cnt++; }
        rightDist[i] = cnt; // s[i..n-1] 의 distinct
    }
    int ans = 0;
    // split point: 좌 = s[0..i], 우 = s[i+1..n-1], i = 0 .. n-2
    for (int i = 0; i < n - 1; i++) {
        if (leftDist[i] == rightDist[i + 1]) ans++;
    }
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Prefix/Suffix distinct 패턴. 왼쪽 → 오른쪽 으로 한 번 훑어 \`leftDist[i]\` = s[0..i] 의 distinct 저장, 오른쪽 → 왼쪽으로 한 번 더 훑어 \`rightDist[i]\` = s[i..n-1] 의 distinct 저장. 그 다음 split point i (0..n-2) 마다 \`leftDist[i] == rightDist[i+1]\` 검사. O(N).",
      pyInitialCode: `import sys
input = sys.stdin.readline

def main():
    pass

main()`,
      pySolutionCode: `import sys
input = sys.stdin.readline

def main():
    s = input().strip()
    n = len(s)
    if n < 2:
        print(0)
        return
    left_dist = [0] * n
    seen = [False] * 26
    cnt = 0
    for i in range(n):
        idx = ord(s[i]) - ord('a')
        if not seen[idx]:
            seen[idx] = True
            cnt += 1
        left_dist[i] = cnt
    right_dist = [0] * n
    seen2 = [False] * 26
    cnt = 0
    for i in range(n - 1, -1, -1):
        idx = ord(s[i]) - ord('a')
        if not seen2[idx]:
            seen2[idx] = True
            cnt += 1
        right_dist[i] = cnt
    ans = 0
    for i in range(n - 1):
        if left_dist[i] == right_dist[i + 1]:
            ans += 1
    print(ans)

main()`,
      en: {
        title: "Number of Good Splits",
        description: `Given a lowercase string S, count the number of ways to split it into **two non-empty parts** such that the **number of distinct characters is the same** on both sides ("good split").

For |S|=N, the split points are 1, 2, ..., N-1.

Example: \`aacaba\`
- \`a | acaba\` → 1 vs 3 ❌
- \`aa | caba\` → 1 vs 3 ❌
- \`aac | aba\` → 2 vs 2 ✓
- \`aaca | ba\` → 2 vs 2 ✓
- \`aacab | a\` → 3 vs 1 ❌
- Answer: 2

Source: LeetCode 1525 (Number of Good Ways to Split a String)`,
        constraints: "1 ≤ |S| ≤ 100,000, lowercase English",
        hints: [
          "Naive O(N²) recounts distincts each split — too slow.",
          "**Two passes** — left-to-right cumulative distinct, then right-to-left.",
          "Store both arrays; comparing each split point becomes O(1).",
          "Overall O(N) time, O(N) space.",
        ],
        solutionExplanation:
          "Prefix/Suffix distinct pattern. One left-to-right pass to fill leftDist[i] = distinct in s[0..i]; one right-to-left pass for rightDist[i]. Then for each split point i (0..n-2), test leftDist[i] == rightDist[i+1].",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 한 글자 차이 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "astr-009",
      cluster: "algo-string-contest",
      unlockAfter: "algo-string",
      difficulty: "어려움",
      title: "한 글자 차이 (one edit distance)",
      description: `두 영문 소문자 문자열 A, B 가 각 줄에 주어진다. **정확히 한 번의 편집** 으로 A 를 B 로 만들 수 있는지 \`YES\` / \`NO\` 로 출력하라.

편집 = 다음 셋 중 하나, 정확히 한 번:
- **교체**: 한 글자를 다른 글자로 바꿈
- **삽입**: 한 글자를 끼워 넣음
- **삭제**: 한 글자를 지움

A 와 B 가 같으면 NO (0 번 편집).

핵심 아이디어: 길이 차이가 2 이상이면 즉시 NO. 길이가 같으면 교체 1 회만 검사. 길이 차이가 1 이면 짧은 쪽에 한 글자를 끼우면 같아지는지 검사.

출처: LeetCode 161 (One Edit Distance)`,
      constraints: "0 ≤ |A|, |B| ≤ 100,000, 영문 소문자. 빈 줄도 가능.",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "abc\nabd", expectedOutput: "YES", label: "교체 1회" },
        { stdin: "ab\nacb", expectedOutput: "YES", label: "삽입 1회" },
        { stdin: "abc\nab", expectedOutput: "YES", label: "삭제 1회" },
        { stdin: "abc\nabc", expectedOutput: "NO", label: "같으면 NO" },
        { stdin: "abc\nxyz", expectedOutput: "NO", label: "여러 글자 다름" },
        { stdin: "abc\naxyc", expectedOutput: "NO", label: "두 글자 삽입 — 거리 2" },
        { stdin: "a\n", expectedOutput: "YES", label: "한쪽 비어있음 — 삭제 1회" },
        { stdin: "\n\n", expectedOutput: "NO", label: "둘 다 비어있음 — 거리 0" },
        { stdin: "abcd\nabxd", expectedOutput: "YES", label: "중간 교체" },
        { stdin: "abcdef\nabcdfe", expectedOutput: "NO", label: "두 글자 자리 바뀜 — 거리 2" },
      ],
      hints: [
        "1) 길이 차이 > 1 이면 NO 즉시 종료.",
        "2) 같은 길이: 다른 글자 개수를 세서 정확히 1 이면 YES.",
        "3) 길이 차 1: 짧은 쪽과 긴 쪽을 동기화하면서 비교 — 첫 mismatch 에서 긴 쪽 포인터만 한 칸 전진, 그 후 나머지가 모두 일치하면 YES.",
        "주의: A == B (0 회 편집) 은 NO.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string a, b;
    getline(cin, a);
    getline(cin, b);
    int n = (int)a.size(), m = (int)b.size();
    if (abs(n - m) > 1) { cout << "NO\\n"; return 0; }
    if (n == m) {
        // 교체 정확히 1 회
        int diff = 0;
        for (int i = 0; i < n; i++) if (a[i] != b[i]) diff++;
        cout << (diff == 1 ? "YES" : "NO") << "\\n";
        return 0;
    }
    // 길이 차이가 정확히 1: 긴 쪽 = L, 짧은 쪽 = S
    const string& L = (n > m ? a : b);
    const string& S = (n > m ? b : a);
    int i = 0, j = 0;
    bool used = false;
    while (i < (int)L.size() && j < (int)S.size()) {
        if (L[i] == S[j]) { i++; j++; }
        else {
            if (used) { cout << "NO\\n"; return 0; }
            used = true;
            i++; // 긴 쪽에서만 한 칸 건너뜀 (삽입)
        }
    }
    cout << "YES\\n";
    return 0;
}`,
      solutionExplanation:
        "3 가지 케이스 분기. 길이 차 ≥ 2 면 즉시 NO. 길이 같으면 단순 mismatch 카운트 = 1 검사. 길이 차 1 이면 긴 쪽 포인터 i, 짧은 쪽 j 로 동기화 — mismatch 가 나면 긴 쪽만 한 칸 전진(삽입 처리), 두 번째 mismatch 면 NO. used 플래그 한 번만 허용. getline 으로 빈 줄도 입력으로 받음.",
      pyInitialCode: `import sys

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.read().split('\\n')
    # 빈 줄도 유효한 입력
    a = data[0] if len(data) > 0 else ''
    b = data[1] if len(data) > 1 else ''
    n, m = len(a), len(b)
    if abs(n - m) > 1:
        print("NO")
        return
    if n == m:
        diff = sum(1 for i in range(n) if a[i] != b[i])
        print("YES" if diff == 1 else "NO")
        return
    L = a if n > m else b
    S = b if n > m else a
    i = j = 0
    used = False
    while i < len(L) and j < len(S):
        if L[i] == S[j]:
            i += 1
            j += 1
        else:
            if used:
                print("NO")
                return
            used = True
            i += 1
    print("YES")

main()`,
      en: {
        title: "One Edit Distance",
        description: `Two lowercase strings A, B on separate lines. Print \`YES\` if A can be turned into B with **exactly one** edit, otherwise \`NO\`.

An edit = exactly one of:
- **Replace** one character
- **Insert** one character
- **Delete** one character

If A == B, the answer is NO (zero edits).

Idea: if |A| and |B| differ by ≥ 2, NO. If equal, count mismatches = 1. If they differ by 1, check whether inserting one char into the shorter matches the longer.

Source: LeetCode 161 (One Edit Distance)`,
        constraints: "0 ≤ |A|, |B| ≤ 100,000, lowercase English. Empty line is allowed.",
        hints: [
          "1) Length difference > 1 → NO.",
          "2) Equal lengths: count mismatches, must equal 1.",
          "3) Length difference 1: walk pointers on both, on first mismatch advance only the longer pointer; any second mismatch → NO.",
          "A == B (zero edits) is NO.",
        ],
        solutionExplanation:
          "Three-way case split. Length diff ≥ 2 → immediate NO. Equal length → mismatch count must equal 1. Length diff 1 → walk pointers, on mismatch advance the longer one once; second mismatch → NO.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. K 개 이하 서로 다른 글자 부분 문자열 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "astr-010",
      cluster: "algo-string-contest",
      unlockAfter: "algo-string",
      difficulty: "어려움",
      title: "K 개 이하 서로 다른 글자를 갖는 가장 긴 부분 문자열",
      description: `영문 소문자 문자열 S 와 정수 K 가 주어진다 (S 한 줄, K 한 줄). S 의 부분 문자열(연속 구간) 중 **서로 다른 글자가 K 개 이하** 인 것 중 가장 긴 길이를 출력하라.

예: \`eceba\`, K=2 → \`ece\` (길이 3) 가 답. \`eceb\` 는 distinct 3 이라 안 됨.

핵심 아이디어: 슬라이딩 윈도우. 윈도우의 글자별 빈도수를 추적하면서, distinct 가 K 를 초과하면 왼쪽에서 줄인다.

출처: LeetCode 340 (Longest Substring with At Most K Distinct Characters)`,
      constraints: "1 ≤ |S| ≤ 100,000, 1 ≤ K ≤ 26, 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "eceba\n2", expectedOutput: "3", label: "기본 — \"ece\"" },
        { stdin: "aa\n1", expectedOutput: "2", label: "전체가 같은 글자" },
        { stdin: "aabacbebebe\n3", expectedOutput: "7", label: "\"cbebebe\" 길이 7" },
        { stdin: "abc\n1", expectedOutput: "1", label: "K=1, 한 글자만" },
        { stdin: "abc\n3", expectedOutput: "3", label: "K≥distinct → 전체" },
        { stdin: "abc\n10", expectedOutput: "3", label: "K 매우 큼" },
        { stdin: "a\n1", expectedOutput: "1", label: "길이 1" },
        {
          stdin: "abaccc\n2",
          expectedOutput: "4",
          label: "\"accc\" 길이 4 (a, c 만 등장)",
        },
      ],
      hints: [
        "슬라이딩 윈도우: 오른쪽 포인터 r 을 한 칸씩 늘리며 빈도수 +1.",
        "윈도우의 distinct 가 K 를 초과하면 왼쪽 l 을 늘리면서 빈도수 -1 — 빈도가 0 이 된 글자는 distinct 감소.",
        "각 r 마다 윈도우 길이 r - l + 1 의 최댓값 갱신.",
        "전체 시간 복잡도 O(N) — 각 포인터가 N 까지만 움직임.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    int k;
    cin >> s >> k;
    int n = (int)s.size();
    int cnt[26] = {0};
    int distinct = 0, l = 0, ans = 0;
    for (int r = 0; r < n; r++) {
        if (cnt[s[r] - 'a'] == 0) distinct++;
        cnt[s[r] - 'a']++;
        while (distinct > k) {
            cnt[s[l] - 'a']--;
            if (cnt[s[l] - 'a'] == 0) distinct--;
            l++;
        }
        ans = max(ans, r - l + 1);
    }
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "전형적인 슬라이딩 윈도우. 오른쪽 r 을 늘리면서 새 글자는 distinct +1. distinct > K 가 되면 왼쪽 l 을 줄여 윈도우 축소 — 빈도가 0 으로 떨어진 글자는 distinct -1. 두 포인터 모두 N 번까지만 움직이므로 O(N).",
      pyInitialCode: `import sys
input = sys.stdin.readline

def main():
    pass

main()`,
      pySolutionCode: `import sys
input = sys.stdin.readline

def main():
    s = input().strip()
    k = int(input())
    n = len(s)
    cnt = [0] * 26
    distinct = 0
    l = 0
    ans = 0
    for r in range(n):
        idx = ord(s[r]) - ord('a')
        if cnt[idx] == 0:
            distinct += 1
        cnt[idx] += 1
        while distinct > k:
            lidx = ord(s[l]) - ord('a')
            cnt[lidx] -= 1
            if cnt[lidx] == 0:
                distinct -= 1
            l += 1
        if r - l + 1 > ans:
            ans = r - l + 1
    print(ans)

main()`,
      en: {
        title: "Longest Substring with At Most K Distinct Characters",
        description: `Given a lowercase string S (line 1) and integer K (line 2), find the length of the longest substring (contiguous slice) of S with **at most K distinct characters**.

Example: \`eceba\`, K=2 → answer 3 (\`ece\`). \`eceb\` has 3 distinct, not allowed.

Idea: sliding window. Track per-char frequency; when distinct count exceeds K, shrink from the left.

Source: LeetCode 340 (Longest Substring with At Most K Distinct Characters)`,
        constraints: "1 ≤ |S| ≤ 100,000, 1 ≤ K ≤ 26, lowercase English",
        hints: [
          "Sliding window: extend r, bump frequency of s[r].",
          "When distinct > K, advance l, decrement freq; if a freq drops to 0, distinct--.",
          "Update max of (r - l + 1) each step.",
          "Each pointer moves ≤ N times → O(N) total.",
        ],
        solutionExplanation:
          "Classic sliding window. Extend r and update distinct on new chars; shrink l until distinct ≤ K. Both pointers move at most N steps, so the total is O(N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 번호판 검증 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "astr-011",
      cluster: "algo-string-contest",
      unlockAfter: "algo-string",
      difficulty: "보통",
      title: "번호판 검증",
      description: `한 줄에 문자열 S 가 주어진다. 다음 패턴에 정확히 맞으면 \`VALID\`, 아니면 \`INVALID\` 를 출력하라.

**패턴**: \`XXX-NNNN\`
- 앞 3 글자: 영문 **대문자**
- 가운데: 하이픈 \`-\` 한 개
- 뒤 4 글자: **숫자** (0-9)
- 총 8 글자, 정확히 이 형식 (앞뒤 공백 없음)

**제약**: 정규식 사용 금지 — 직접 문자별로 검증하라. 길이/위치/문자 종류 세 단계를 차례로 통과해야 한다.

출처: 원본 (포맷 파싱 연습)`,
      constraints: "1 ≤ |S| ≤ 100, S 에는 영문/숫자/하이픈만 들어옴",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "ABC-1234", expectedOutput: "VALID", label: "기본 — 정확한 형식" },
        { stdin: "abc-1234", expectedOutput: "INVALID", label: "소문자 포함" },
        { stdin: "ABC1234", expectedOutput: "INVALID", label: "하이픈 없음" },
        { stdin: "AB-12345", expectedOutput: "INVALID", label: "앞이 2글자, 뒤가 5글자" },
        { stdin: "ABCD-123", expectedOutput: "INVALID", label: "앞이 4글자, 뒤가 3글자" },
        { stdin: "ABC-12A4", expectedOutput: "INVALID", label: "숫자 자리에 글자" },
        { stdin: "1BC-1234", expectedOutput: "INVALID", label: "글자 자리에 숫자" },
        { stdin: "ABC-1234X", expectedOutput: "INVALID", label: "뒤에 추가 글자" },
        { stdin: "ABC--234", expectedOutput: "INVALID", label: "하이픈이 두 번" },
        { stdin: "XYZ-0000", expectedOutput: "VALID", label: "모두 0 도 유효" },
      ],
      hints: [
        "1) 길이가 정확히 8 인지 먼저 확인.",
        "2) S[3] 이 '-' 인지 확인.",
        "3) S[0..2] 가 모두 'A'-'Z' 인지, S[4..7] 이 모두 '0'-'9' 인지 확인.",
        "한 단계라도 실패하면 즉시 INVALID 출력 후 종료.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    bool ok = true;
    if (s.size() != 8) ok = false;
    if (ok && s[3] != '-') ok = false;
    if (ok) {
        for (int i = 0; i < 3; i++) {
            if (s[i] < 'A' || s[i] > 'Z') { ok = false; break; }
        }
    }
    if (ok) {
        for (int i = 4; i < 8; i++) {
            if (s[i] < '0' || s[i] > '9') { ok = false; break; }
        }
    }
    cout << (ok ? "VALID" : "INVALID") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "포맷 검증은 '먼저 길이/구조, 그 다음 각 자리 내용' 순서가 깔끔하다. 짧고 단계적으로: 길이 → 구분자 위치 → 각 자리 문자 종류. ASCII 비교(`'A'<=c<='Z'`)는 표준 c-style 검증 패턴 — `<cctype>` 의 `isupper`, `isdigit` 도 같은 역할.",
      pyInitialCode: `import sys
input = sys.stdin.readline

def main():
    pass

main()`,
      pySolutionCode: `import sys
input = sys.stdin.readline

def main():
    s = input().strip()
    ok = True
    if len(s) != 8:
        ok = False
    if ok and s[3] != '-':
        ok = False
    if ok:
        for i in range(3):
            if not ('A' <= s[i] <= 'Z'):
                ok = False
                break
    if ok:
        for i in range(4, 8):
            if not ('0' <= s[i] <= '9'):
                ok = False
                break
    print("VALID" if ok else "INVALID")

main()`,
      en: {
        title: "License Plate Validator",
        description: `Given a string S on one line, print \`VALID\` if it matches the pattern \`XXX-NNNN\` exactly, else \`INVALID\`.

**Pattern**:
- First 3 chars: uppercase English letters
- Then: a single hyphen \`-\`
- Last 4 chars: digits 0-9
- Length exactly 8, no leading/trailing whitespace

**Constraint**: no regex — validate by hand, length first, then positions, then character classes.

Source: original (format-parsing practice)`,
        constraints: "1 ≤ |S| ≤ 100, S contains only letters/digits/hyphen",
        hints: [
          "1) Check length == 8.",
          "2) Check S[3] == '-'.",
          "3) Verify S[0..2] are 'A'-'Z' and S[4..7] are '0'-'9'.",
          "Any failed step → INVALID and stop.",
        ],
        solutionExplanation:
          "Validate 'shape first, then content': length → separator position → per-position character class. ASCII range checks like `'A' <= c <= 'Z'` are the standard pattern; `<cctype>`'s `isupper`/`isdigit` do the same.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 이진 문자열 분할 점수 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "astr-012",
      cluster: "algo-string-contest",
      unlockAfter: "algo-string",
      difficulty: "어려움",
      title: "이진 문자열 분할 점수 최대화",
      description: `\`0\` 과 \`1\` 로만 이루어진 문자열 S 가 주어진다. S 를 **두 개의 비어있지 않은 부분** 으로 자를 때, 점수를 다음과 같이 계산한다.

> **점수 = (왼쪽 부분의 0 개수) + (오른쪽 부분의 1 개수)**

가능한 모든 분할 중 **점수의 최댓값** 을 출력하라.

|S| = N 이면 분할 위치는 1, 2, ..., N-1 (총 N-1 개).

핵심 아이디어: 단순히 매번 0/1 을 세면 O(N²). 누적 카운트를 미리 만들거나 **한 번 훑어 전체 1 개수를 알고, 왼쪽으로 가면서 0 누적과 (총 1 - 왼쪽 1 누적) 으로 점수 계산** 하면 O(N).

출처: LeetCode 1422 (Maximum Score After Splitting a String)`,
      constraints: "2 ≤ |S| ≤ 100,000, S 는 '0' 과 '1' 만",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "011101",
          expectedOutput: "5",
          label: "분할 \"0\"|\"11101\" → 1 + 4 = 5",
        },
        { stdin: "00111", expectedOutput: "5", label: "분할 \"00\"|\"111\" → 2 + 3 = 5" },
        { stdin: "1111", expectedOutput: "3", label: "0 없음 — \"1\"|\"111\" 의 0 + 3 = 3" },
        { stdin: "0000", expectedOutput: "3", label: "1 없음 — \"000\"|\"0\" 의 3 + 0 = 3" },
        { stdin: "00", expectedOutput: "1", label: "\"0\"|\"0\" → 1 + 0 = 1" },
        { stdin: "01", expectedOutput: "2", label: "\"0\"|\"1\" → 1 + 1 = 2" },
        { stdin: "10", expectedOutput: "0", label: "\"1\"|\"0\" → 0 + 0 = 0" },
        {
          stdin: "1001100",
          expectedOutput: "4",
          label: "최적: \"100\"|\"1100\" → 2 + 2 = 4 (또는 \"10\"|\"01100\" → 1 + 2 = 3)",
        },
      ],
      hints: [
        "총 1 개수 = ones 를 미리 한 번 훑어 계산.",
        "왼쪽에서 오른쪽으로 한 번 더 훑으며 zerosLeft (왼쪽 0 누적), onesLeft (왼쪽 1 누적) 추적.",
        "분할 i 의 점수 = zerosLeft + (ones - onesLeft).",
        "분할 위치는 1 ~ N-1 — 양쪽이 비어있지 않도록.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    int n = (int)s.size();
    int ones = 0;
    for (char c : s) if (c == '1') ones++;
    int zerosLeft = 0, onesLeft = 0;
    int best = -1;
    // 분할 위치 i: 왼쪽 = s[0..i-1] (i 글자), 오른쪽 = s[i..n-1].
    // i 는 1 .. n-1 (양쪽 비어있지 않음).
    for (int i = 0; i < n - 1; i++) {
        if (s[i] == '0') zerosLeft++;
        else onesLeft++;
        int score = zerosLeft + (ones - onesLeft);
        if (score > best) best = score;
    }
    cout << best << "\\n";
    return 0;
}`,
      solutionExplanation:
        "총 1 개수를 미리 알면 오른쪽 1 개수 = ones - 왼쪽 1 개수 로 O(1) 계산 가능. 왼쪽에서 오른쪽으로 한 번 훑으며 분할 점 i (왼쪽이 i+1 글자) 마다 점수 계산. for 의 범위가 i < n-1 인 이유: 마지막 글자 전에서 분할해야 양쪽이 비어있지 않음.",
      pyInitialCode: `import sys
input = sys.stdin.readline

def main():
    pass

main()`,
      pySolutionCode: `import sys
input = sys.stdin.readline

def main():
    s = input().strip()
    n = len(s)
    ones = s.count('1')
    zeros_left = 0
    ones_left = 0
    best = -1
    # 분할 점 i: 왼쪽 = s[0..i], 오른쪽 = s[i+1..n-1]. i 는 0 .. n-2.
    for i in range(n - 1):
        if s[i] == '0':
            zeros_left += 1
        else:
            ones_left += 1
        score = zeros_left + (ones - ones_left)
        if score > best:
            best = score
    print(best)

main()`,
      en: {
        title: "Maximum Score After Splitting a Binary String",
        description: `Given a string S of \`0\`s and \`1\`s, split it into **two non-empty parts**. The score is:

> **score = (zeros on the left) + (ones on the right)**

Print the maximum score over all splits.

|S| = N → split positions 1, 2, ..., N-1.

Idea: counting per split is O(N²). Precompute total ones and use a single left-to-right pass tracking cumulative zeros/ones on the left — O(N).

Source: LeetCode 1422 (Maximum Score After Splitting a String)`,
        constraints: "2 ≤ |S| ≤ 100,000, S consists of '0' and '1' only",
        hints: [
          "Precompute total ones in one scan.",
          "Walk left-to-right tracking zerosLeft and onesLeft.",
          "Score at split i = zerosLeft + (total ones - onesLeft).",
          "Split position ranges over 1 ~ N-1 so both sides stay non-empty.",
        ],
        solutionExplanation:
          "Knowing total ones up front lets you compute right-side ones in O(1) (= total - left). One left-to-right pass per split. Loop bound i < n-1 ensures both halves are non-empty.",
      },
    },
  ],
}
