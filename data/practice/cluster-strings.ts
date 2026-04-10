import type { PracticeCluster } from "./types"

export const stringsCluster: PracticeCluster = {
  id: "strings",
  title: "문자열",
  emoji: "🔤",
  description: "substr, find, length, 문자 비교, 변환 패턴",
  unlockAfter: "cpp-11",
  en: { title: "Strings", description: "substr, find, length, character comparison, and transformation patterns" },
  problems: [
    {
      id: "str-001",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "쉬움",
      title: "문자열 길이",
      description: `문자열이 주어질 때, 그 길이를 출력하세요.`,
      constraints: "문자열은 영문 소문자로만 구성, 길이 1 이상 100 이하",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "hello", expectedOutput: "5", label: "기본" },
        { stdin: "a", expectedOutput: "1", label: "1글자" },
        { stdin: "programming", expectedOutput: "11", label: "긴 문자열" },
      ],
      hints: [
        "string의 .length() 또는 .size() 메서드를 사용하세요.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    cout << s.length() << "\\n";
    return 0;
}`,
      solutionExplanation: "s.length()는 문자열의 문자 수를 반환합니다. s.size()도 동일한 결과를 줍니다.",
      en: {
        title: "String Length",
        description: `Given a string, print its length.`,
        constraints: "String consists of lowercase English letters only, length between 1 and 100",
        hints: [
          "Use the `.length()` or `.size()` method of string.",
        ],
        solutionExplanation: "`s.length()` returns the number of characters in the string. `s.size()` gives the same result.",
      },
    },
    {
      id: "str-002",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "쉬움",
      title: "첫 글자와 마지막 글자",
      description: `문자열이 주어질 때, 첫 번째 문자와 마지막 문자를 공백으로 구분하여 출력하세요.`,
      constraints: "문자열은 영문으로만 구성, 길이 1 이상 100 이하",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "hello", expectedOutput: "h o", label: "기본" },
        { stdin: "a", expectedOutput: "a a", label: "1글자" },
        { stdin: "abcde", expectedOutput: "a e", label: "5글자" },
      ],
      hints: [
        "s[0]은 첫 번째 문자, s[s.length()-1]은 마지막 문자입니다.",
        "s.back()으로 마지막 문자를 편리하게 접근할 수 있어요.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    cout << s[0] << " " << s.back() << "\\n";
    return 0;
}`,
      solutionExplanation: "s[0]으로 첫 번째 문자, s.back()으로 마지막 문자에 접근합니다. s[s.length()-1]도 동일합니다.",
      en: {
        title: "First and Last Characters",
        description: `Given a string, print its first and last characters separated by a space.`,
        constraints: "String consists of English letters only, length between 1 and 100",
        hints: [
          "`s[0]` is the first character; `s[s.length()-1]` is the last.",
          "`s.back()` is a convenient way to access the last character.",
        ],
        solutionExplanation: "Access the first character with `s[0]` and the last with `s.back()`. `s[s.length()-1]` is equivalent.",
      },
    },
    {
      id: "str-003",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "쉬움",
      title: "문자열 뒤집기",
      description: `문자열이 주어질 때, 뒤집은 문자열을 출력하세요.`,
      constraints: "문자열은 영문 소문자로만 구성, 길이 1 이상 50 이하",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "hello", expectedOutput: "olleh", label: "기본" },
        { stdin: "abcde", expectedOutput: "edcba", label: "5글자" },
        { stdin: "a", expectedOutput: "a", label: "1글자" },
        { stdin: "racecar", expectedOutput: "racecar", label: "팰린드롬" },
      ],
      hints: [
        "인덱스를 역순으로 순회하거나 reverse() 함수를 사용하세요.",
        "#include <algorithm>을 추가한 뒤 reverse(s.begin(), s.end())를 호출하면 됩니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    reverse(s.begin(), s.end());
    cout << s << "\\n";
    return 0;
}`,
      solutionExplanation: "reverse(s.begin(), s.end())는 문자열을 제자리에서 뒤집습니다. for 루프로 s[n-1-i]를 출력하는 방법도 가능합니다.",
      en: {
        title: "Reverse a String",
        description: `Given a string, print it reversed.`,
        constraints: "String consists of lowercase English letters only, length between 1 and 50",
        hints: [
          "Iterate through the string in reverse order, or use the `reverse()` function.",
          "Add `#include <algorithm>` and call `reverse(s.begin(), s.end())`.",
        ],
        solutionExplanation: "`reverse(s.begin(), s.end())` reverses the string in place. Alternatively, print `s[n-1-i]` in a for loop.",
      },
    },
    {
      id: "str-004",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "보통",
      title: "특정 문자 개수 세기",
      description: `문자열과 문자 하나가 주어질 때, 문자열에서 해당 문자가 몇 번 등장하는지 출력하세요.`,
      constraints: "문자열 길이 1 이상 1000 이하, 문자는 영문 소문자",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    char c;
    cin >> s >> c;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "hello l", expectedOutput: "2", label: "2번 등장" },
        { stdin: "banana a", expectedOutput: "3", label: "3번 등장" },
        { stdin: "xyz q", expectedOutput: "0", label: "0번 등장" },
        { stdin: "aaa a", expectedOutput: "3", label: "전부 같은 문자" },
      ],
      hints: [
        "문자열을 순회하면서 각 문자가 c와 같으면 카운터를 증가시키세요.",
        "또는 count(s.begin(), s.end(), c)를 사용할 수도 있어요.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    char c;
    cin >> s >> c;
    int cnt = 0;
    for (char ch : s)
        if (ch == c) cnt++;
    cout << cnt << "\\n";
    return 0;
}`,
      solutionExplanation: "범위 기반 for 루프로 문자열의 각 문자를 순회하며 일치 여부를 확인합니다. 표준 라이브러리의 count() 함수로도 한 줄에 처리할 수 있습니다.",
      en: {
        title: "Count a Specific Character",
        description: `Given a string and a single character, print how many times that character appears in the string.`,
        constraints: "String length between 1 and 1000, character is a lowercase English letter",
        hints: [
          "Iterate through the string and increment a counter each time a character matches `c`.",
          "Alternatively, use `count(s.begin(), s.end(), c)`.",
        ],
        solutionExplanation: "A range-based for loop iterates over each character and checks for a match. The standard library `count()` function can do the same in one line.",
      },
    },
    {
      id: "str-005",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "보통",
      title: "부분 문자열 추출",
      description: `문자열 S와 시작 인덱스 i, 길이 l이 주어질 때, S에서 인덱스 i부터 l개의 문자를 추출하여 출력하세요.`,
      constraints: "문자열 길이 1 이상 100 이하, 0 ≤ i, i+l ≤ 문자열 길이",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    int i, l;
    cin >> s >> i >> l;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "hello 1 3", expectedOutput: "ell", label: "기본" },
        { stdin: "programming 0 4", expectedOutput: "prog", label: "처음부터" },
        { stdin: "abcdef 3 2", expectedOutput: "de", label: "중간부터" },
        { stdin: "test 0 4", expectedOutput: "test", label: "전체" },
      ],
      hints: [
        "s.substr(시작인덱스, 길이)를 사용하세요.",
        "substr의 첫 번째 인수는 0-based 인덱스, 두 번째 인수는 추출할 문자 수입니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    int i, l;
    cin >> s >> i >> l;
    cout << s.substr(i, l) << "\\n";
    return 0;
}`,
      solutionExplanation: "s.substr(i, l)은 인덱스 i부터 l개의 문자를 새 문자열로 반환합니다. 두 번째 인수를 생략하면 끝까지 추출합니다.",
      en: {
        title: "Extract a Substring",
        description: `Given a string S, a start index i, and a length l, extract and print l characters from S starting at index i.`,
        constraints: "String length between 1 and 100, 0 ≤ i, i+l ≤ string length",
        hints: [
          "Use `s.substr(startIndex, length)`.",
          "The first argument is the 0-based start index; the second is the number of characters to extract.",
        ],
        solutionExplanation: "`s.substr(i, l)` returns a new string of `l` characters starting at index `i`. Omitting the second argument extracts to the end of the string.",
      },
    },
    {
      id: "str-006",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "보통",
      title: "문자열에서 단어 찾기",
      description: `문자열 S와 검색어 T가 주어질 때, S에서 T가 처음 등장하는 위치(0-based)를 출력하세요.
T가 S에 없으면 \`-1\`을 출력하세요.`,
      constraints: "S 길이 1 이상 1000 이하, T 길이 1 이상 100 이하",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s, t;
    cin >> s >> t;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "hello ell", expectedOutput: "1", label: "발견" },
        { stdin: "abcabc bc", expectedOutput: "1", label: "첫 등장 위치" },
        { stdin: "hello xyz", expectedOutput: "-1", label: "없는 경우" },
        { stdin: "programming gram", expectedOutput: "3", label: "중간" },
      ],
      hints: [
        "s.find(t)는 t가 처음 등장하는 인덱스를 반환합니다.",
        "찾지 못하면 string::npos를 반환합니다. npos와 비교해 -1을 출력하세요.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s, t;
    cin >> s >> t;
    size_t pos = s.find(t);
    if (pos == string::npos)
        cout << -1 << "\\n";
    else
        cout << pos << "\\n";
    return 0;
}`,
      solutionExplanation: "s.find(t)는 부분 문자열의 시작 위치를 반환합니다. 없으면 string::npos(매우 큰 값)를 반환하므로, npos와 비교하여 -1을 출력합니다.",
      en: {
        title: "Find a Word in a String",
        description: `Given a string S and a search term T, print the 0-based index of the first occurrence of T in S.
If T is not found in S, print \`-1\`.`,
        constraints: "S length between 1 and 1000, T length between 1 and 100",
        hints: [
          "`s.find(t)` returns the index of the first occurrence of `t`.",
          "If not found, it returns `string::npos`. Compare with `npos` and print -1 in that case.",
        ],
        solutionExplanation: "`s.find(t)` returns the starting position of the substring. If absent, it returns `string::npos` (a very large value), so compare against `npos` and output -1 accordingly.",
      },
    },
    // ── replace ───────────────────────────────────────────────────
    {
      id: "str-R01",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "쉬움",
      title: "단어 치환 (replace)",
      description: `문자열 S에서 단어 A를 단어 B로 **replace를 사용해** 모두 바꾸세요.

**s.replace(pos, len, newStr)** — pos 위치부터 len 글자를 newStr로 교체합니다.
find()와 조합해 모든 등장 위치를 찾아 교체하세요.

**예시:** S=\`"hello world hello"\`, A=\`"hello"\`, B=\`"hi"\` → \`"hi world hi"\``,
      constraints: "S의 길이 ≤ 100, A 길이 ≥ 1",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s, a, b;
    getline(cin, s);
    getline(cin, a);
    getline(cin, b);
    // 여기에 코드를 작성하세요
    cout << s << "\\n";
    return 0;
}`,
      scaffoldCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s, a, b;
    getline(cin, s);
    getline(cin, a);
    getline(cin, b);
    size_t pos = 0;
    while ((pos = s.find(a, pos)) != string::npos) {
        // 여기에 코드를 작성하세요
    }
    cout << s << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "hello world hello\nhello\nhi", expectedOutput: "hi world hi", label: "기본" },
        { stdin: "aaa\na\nbb", expectedOutput: "bbbbbb", label: "연속 교체" },
        { stdin: "no match here\nxxx\nyyy", expectedOutput: "no match here", label: "없는 단어" },
        { stdin: "cat and cat\ncat\ndog", expectedOutput: "dog and dog", label: "두 번" },
      ],
      hints: [
        "size_t pos = s.find(a); 로 a의 위치를 찾고, pos != string::npos 이면 s.replace(pos, a.size(), b); 로 교체",
        "교체 후 pos를 b.size()만큼 이동해야 다음 find()가 이미 교체된 부분을 다시 건드리지 않아요.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s, a, b;
    getline(cin, s);
    getline(cin, a);
    getline(cin, b);
    size_t pos = 0;
    while ((pos = s.find(a, pos)) != string::npos) {
        s.replace(pos, a.size(), b);
        pos += b.size();
    }
    cout << s << "\\n";
    return 0;
}`,
      solutionExplanation: "find(a, pos)로 pos 이후 첫 등장 위치를 찾고, replace(pos, a.size(), b)로 교체합니다. 교체 후 pos += b.size()로 이동해 무한 루프를 방지합니다.",
      en: {
        title: "Word Replacement (replace)",
        description: `In string S, replace all occurrences of word A with word B **using replace**.\n\n**s.replace(pos, len, newStr)** — replaces len characters starting at pos with newStr.\nCombine with find() to locate all occurrences.\n\n**Example:** S=\`"hello world hello"\`, A=\`"hello"\`, B=\`"hi"\` → \`"hi world hi"\``,
        constraints: "Length of S ≤ 100, length of A ≥ 1",
        hints: [
          "size_t pos = s.find(a); finds the position. If pos != string::npos, use s.replace(pos, a.size(), b);",
          "After replacing, advance pos by b.size() so find() doesn't revisit the replaced part.",
        ],
        solutionExplanation: "find(a, pos) finds the first occurrence after pos, replace(pos, a.size(), b) replaces it. Advancing pos += b.size() prevents infinite loops.",
      },
    },
    // ── compare ───────────────────────────────────────────────────
    {
      id: "str-CMP01",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "쉬움",
      title: "사전 순서 비교 (compare)",
      description: `두 문자열 A, B를 **s.compare()를 사용해** 사전순으로 비교하세요.

- A가 B보다 앞이면 \`A first\`
- B가 A보다 앞이면 \`B first\`
- 같으면 \`equal\`

**s.compare(t)** — s < t면 음수, s > t면 양수, 같으면 0을 반환합니다.`,
      constraints: "각 문자열 길이 ≤ 50, 소문자만 사용",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;
    int result = a.compare(b);  // compare 사용
    // result로 출력 결정
    return 0;
}`,
      testCases: [
        { stdin: "apple banana", expectedOutput: "A first", label: "apple < banana" },
        { stdin: "zebra ant", expectedOutput: "B first", label: "zebra > ant" },
        { stdin: "hello hello", expectedOutput: "equal", label: "같음" },
        { stdin: "abc abcd", expectedOutput: "A first", label: "접두사" },
      ],
      hints: [
        "a.compare(b)의 반환값: 음수면 a가 사전순 앞, 양수면 b가 앞, 0이면 같아요.",
        "if (result < 0) → A first, if (result > 0) → B first, if (result == 0) → equal",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;
    int result = a.compare(b);
    if (result < 0) cout << "A first\\n";
    else if (result > 0) cout << "B first\\n";
    else cout << "equal\\n";
    return 0;
}`,
      solutionExplanation: "compare()는 사전순 비교 결과를 정수로 반환합니다. 음수=a가 앞, 양수=b가 앞, 0=같음. < 연산자로도 같은 결과를 낼 수 있지만, compare()는 부분 문자열 비교 등 확장이 가능합니다.",
      en: {
        title: "Lexicographic Comparison (compare)",
        description: `Compare two strings A and B in lexicographic order **using s.compare()**.\n\n- A comes first → print \`A first\`\n- B comes first → print \`B first\`\n- Equal → print \`equal\`\n\n**s.compare(t)** — returns negative if s < t, positive if s > t, 0 if equal.`,
        constraints: "Each string length ≤ 50, lowercase letters only",
        hints: [
          "a.compare(b): negative means a comes first, positive means b comes first, 0 means equal.",
          "if (result < 0) → A first, if (result > 0) → B first, if (result == 0) → equal",
        ],
        solutionExplanation: "compare() returns an integer for lexicographic comparison. Negative=a first, positive=b first, 0=equal. < operator would also work, but compare() supports extensions like partial string comparison.",
      },
    },
    {
      id: "str-007",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "보통",
      title: "대소문자 변환",
      description: `영문 문자열이 주어질 때, 대문자는 소문자로, 소문자는 대문자로 변환하여 출력하세요.`,
      constraints: "문자열은 영문자로만 구성, 길이 1 이상 100 이하",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "Hello", expectedOutput: "hELLO", label: "기본" },
        { stdin: "ABC", expectedOutput: "abc", label: "전부 대문자" },
        { stdin: "abc", expectedOutput: "ABC", label: "전부 소문자" },
        { stdin: "HeLLo", expectedOutput: "hEllO", label: "혼합" },
      ],
      hints: [
        "isupper(c), islower(c), toupper(c), tolower(c) 함수를 활용하세요.",
        "각 문자를 순회하면서 대문자면 tolower, 소문자면 toupper로 변환합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string s;
    cin >> s;
    for (char& c : s) {
        if (isupper(c)) c = tolower(c);
        else c = toupper(c);
    }
    cout << s << "\\n";
    return 0;
}`,
      solutionExplanation: "참조형 char& c를 사용해 원본 문자열을 직접 수정합니다. isupper로 대문자 여부를 확인하고 tolower/toupper로 변환합니다.",
      en: {
        title: "Swap Case",
        description: `Given an English string, convert every uppercase letter to lowercase and every lowercase letter to uppercase, then print the result.`,
        constraints: "String consists of English letters only, length between 1 and 100",
        hints: [
          "Use `isupper(c)`, `islower(c)`, `toupper(c)`, and `tolower(c)` from `<cctype>`.",
          "Iterate through each character: if uppercase, convert to lowercase; otherwise convert to uppercase.",
        ],
        solutionExplanation: "Using `char& c` (reference) modifies the original string in place. `isupper` checks for uppercase, then `tolower`/`toupper` performs the conversion.",
      },
    },
    {
      id: "str-008",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "어려움",
      title: "단어 개수 세기",
      description: `공백으로 구분된 단어가 여러 개 포함된 문장이 주어질 때, 단어의 개수를 출력하세요.
단어 사이에 연속된 공백이 있을 수 있습니다.`,
      constraints: "문장 길이 1 이상 200 이하",
      initialCode: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "hello world", expectedOutput: "2", label: "2단어" },
        { stdin: "one two three four", expectedOutput: "4", label: "4단어" },
        { stdin: "single", expectedOutput: "1", label: "1단어" },
        { stdin: "a  b   c", expectedOutput: "3", label: "연속 공백" },
      ],
      hints: [
        "istringstream을 사용하면 공백을 기준으로 단어를 쉽게 분리할 수 있어요.",
        "istringstream iss(line); while (iss >> word) cnt++;",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string line, word;
    getline(cin, line);
    istringstream iss(line);
    int cnt = 0;
    while (iss >> word) cnt++;
    cout << cnt << "\\n";
    return 0;
}`,
      solutionExplanation: "istringstream으로 문자열을 스트림처럼 처리합니다. iss >> word는 공백을 자동으로 건너뛰고 단어를 읽으므로, 연속 공백도 자연스럽게 처리됩니다.",
      en: {
        title: "Count Words",
        description: `Given a sentence containing multiple words separated by spaces, print the number of words.
There may be consecutive spaces between words.`,
        constraints: "Sentence length between 1 and 200",
        hints: [
          "Use `istringstream` to split words by whitespace easily.",
          "`istringstream iss(line); while (iss >> word) cnt++;`",
        ],
        solutionExplanation: "`istringstream` lets you treat a string like a stream. `iss >> word` automatically skips whitespace when reading, so consecutive spaces are handled naturally.",
      },
    },
    {
      id: "str-009",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "어려움",
      title: "팰린드롬 확인",
      description: `문자열이 주어질 때, 팰린드롬(앞뒤로 읽어도 같은 문자열)인지 확인하세요.
팰린드롬이면 \`YES\`, 아니면 \`NO\`를 출력하세요.`,
      constraints: "문자열은 영문 소문자로만 구성, 길이 1 이상 1000 이하",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "racecar", expectedOutput: "YES", label: "팰린드롬" },
        { stdin: "hello", expectedOutput: "NO", label: "아님" },
        { stdin: "a", expectedOutput: "YES", label: "1글자" },
        { stdin: "abba", expectedOutput: "YES", label: "짝수 길이" },
        { stdin: "abcd", expectedOutput: "NO", label: "일반 문자열" },
      ],
      hints: [
        "문자열과 그 역순 문자열을 비교하거나, 양 끝에서 안쪽으로 비교하세요.",
        "두 포인터로 s[i]와 s[n-1-i]를 비교하면 됩니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    int n = s.length();
    bool ok = true;
    for (int i = 0; i < n / 2; i++) {
        if (s[i] != s[n - 1 - i]) { ok = false; break; }
    }
    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation: "앞 인덱스 i와 뒤 인덱스 n-1-i의 문자를 비교합니다. n/2번만 비교하면 전체 확인이 완료됩니다. 불일치 발견 즉시 break로 탈출합니다.",
      en: {
        title: "Palindrome Check",
        description: `Given a string, check whether it is a palindrome (reads the same forwards and backwards).
Print \`YES\` if it is a palindrome, \`NO\` otherwise.`,
        constraints: "String consists of lowercase English letters only, length between 1 and 1000",
        hints: [
          "Compare the string with its reverse, or compare characters from both ends moving inward.",
          "Use two pointers: compare `s[i]` with `s[n-1-i]`.",
        ],
        solutionExplanation: "Compare the character at front index `i` with the one at back index `n-1-i`. Only `n/2` comparisons are needed to check the whole string. Break out immediately upon finding a mismatch.",
      },
    },
    {
      id: "str-010",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "어려움",
      title: "문자열 치환",
      description: `문자열 S, 찾을 문자열 from, 바꿀 문자열 to가 주어질 때, S에서 from을 모두 to로 교체한 결과를 출력하세요.`,
      constraints: "S 길이 1 이상 1000 이하, from 길이 1 이상 50 이하",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s, from, to;
    cin >> s >> from >> to;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "hello world hello", expectedOutput: "hi world hi", label: "기본" },
        { stdin: "aabbaa aa", expectedOutput: "bb", label: "to가 빈 문자열" },
        { stdin: "abcabc bc BC", expectedOutput: "aBCaBC", label: "치환 후 새 패턴 없음" },
      ],
      hints: [
        "s.find(from)으로 위치를 찾고, s.replace(pos, from.length(), to)로 교체하세요.",
        "교체 후 검색 위치를 pos + to.length()로 이동해야 무한 루프를 방지합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s, from, to;
    cin >> s >> from >> to;
    size_t pos = 0;
    while ((pos = s.find(from, pos)) != string::npos) {
        s.replace(pos, from.length(), to);
        pos += to.length();
    }
    cout << s << "\\n";
    return 0;
}`,
      solutionExplanation: "find의 두 번째 인수로 검색 시작 위치를 지정합니다. replace 후 pos를 to.length()만큼 앞으로 이동해 이미 교체한 부분을 다시 검색하지 않도록 합니다.",
      en: {
        title: "String Replace",
        description: `Given a string S, a search string from, and a replacement string to, replace every occurrence of from in S with to and print the result.`,
        constraints: "S length between 1 and 1000, from length between 1 and 50",
        hints: [
          "Use `s.find(from)` to locate occurrences, and `s.replace(pos, from.length(), to)` to replace them.",
          "After replacing, advance `pos` by `to.length()` to avoid re-examining the replaced section and causing an infinite loop.",
        ],
        solutionExplanation: "Pass a start position as the second argument to `find` to resume the search after each replacement. Advancing `pos` by `to.length()` ensures already-replaced text is skipped.",
      },
    },
    {
      id: "str-011",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "어려움",
      title: "가장 긴 단어",
      description: `공백으로 구분된 단어들이 한 줄로 주어질 때, 가장 긴 단어를 출력하세요.
길이가 같은 단어가 여럿이면 먼저 등장한 것을 출력하세요.`,
      constraints: "단어 수 1 이상 100 이하, 각 단어 길이 1 이상 50 이하",
      initialCode: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "the quick brown fox", expectedOutput: "quick", label: "기본" },
        { stdin: "a bb ccc", expectedOutput: "ccc", label: "길이 증가" },
        { stdin: "hello world", expectedOutput: "hello", label: "같은 길이 — 앞 우선" },
        { stdin: "programming", expectedOutput: "programming", label: "단어 1개" },
      ],
      hints: [
        "istringstream으로 단어를 하나씩 읽으면서 최장 단어를 추적하세요.",
        "현재 단어 길이 > 최장 단어 길이일 때만 업데이트하면 앞에 등장한 것이 유지됩니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string line, word, best;
    getline(cin, line);
    istringstream iss(line);
    while (iss >> word) {
        if (word.length() > best.length())
            best = word;
    }
    cout << best << "\\n";
    return 0;
}`,
      solutionExplanation: "best를 빈 문자열로 초기화하고, 더 긴 단어를 만날 때만 업데이트합니다. 길이가 같으면 업데이트하지 않으므로 자연스럽게 첫 번째 최장 단어가 유지됩니다.",
      en: {
        title: "Longest Word",
        description: `Given a line of words separated by spaces, print the longest word.
If multiple words share the maximum length, print the one that appears first.`,
        constraints: "Between 1 and 100 words, each word length between 1 and 50",
        hints: [
          "Read words one by one with `istringstream` and track the longest word seen so far.",
          "Only update when the current word length is strictly greater than the best — this keeps the first longest word.",
        ],
        solutionExplanation: "Initialize `best` as an empty string and update only when a strictly longer word is found. Ties are not updated, so the first longest word is preserved naturally.",
      },
    },
    {
      id: "str-012",
      cluster: "strings",
      unlockAfter: "cpp-11",
      difficulty: "어려움",
      title: "숫자 문자열 합계",
      description: `공백으로 구분된 숫자 문자열들이 한 줄로 주어질 때, 각 문자열을 정수로 변환하여 합계를 출력하세요.`,
      constraints: "숫자 개수 1 이상 50 이하, 각 숫자 -10000 이상 10000 이하",
      initialCode: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "1 2 3 4 5", expectedOutput: "15", label: "기본" },
        { stdin: "-10 20 -5", expectedOutput: "5", label: "음수 포함" },
        { stdin: "100", expectedOutput: "100", label: "1개" },
        { stdin: "0 0 0", expectedOutput: "0", label: "모두 0" },
      ],
      hints: [
        "istringstream으로 문자열을 파싱하고, stoi()로 각 단어를 정수로 변환하세요.",
        "또는 iss >> int 변수 방식으로 바로 정수로 읽을 수도 있어요.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    istringstream iss(line);
    int x, sum = 0;
    while (iss >> x) sum += x;
    cout << sum << "\\n";
    return 0;
}`,
      solutionExplanation: "istringstream을 통해 iss >> x로 정수를 직접 읽을 수 있습니다. stoi(word) 방식보다 더 간결합니다.",
      en: {
        title: "Sum of Number Strings",
        description: `Given a line of number strings separated by spaces, convert each to an integer and print their sum.`,
        constraints: "Between 1 and 50 numbers, each between -10000 and 10000",
        hints: [
          "Parse the string with `istringstream` and convert each token to an integer with `stoi()`.",
          "Or read directly into an `int` variable with `iss >> x` — simpler and more concise.",
        ],
        solutionExplanation: "Using `iss >> x` reads integers directly from an `istringstream`, which is more concise than using `stoi(word)` on each token.",
      },
    },
  ],
}
