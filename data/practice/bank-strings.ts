import type { PracticeCluster } from "./types"

export const bankStringsCluster: PracticeCluster = {
  id: "bank-str",
  title: "문자열 처리",
  emoji: "📝",
  description: "문자열을 파싱하고, 변환하고, 분석하는 실전 문제들",
  en: {
    title: "String Processing",
    description: "Parse, transform, and analyze strings in real-world scenarios",
  },
  unlockAfter: "cpp-p3",
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // EASY (bank-str-001 ~ 006)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "bank-str-001",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "팰린드롬",
      description:
        "문자열이 주어질 때, 이 문자열을 앞에서 읽은 것과 뒤에서 읽은 것이 같으면 \"YES\", 다르면 \"NO\"를 출력하세요.",
      constraints: "1 ≤ 문자열 길이 ≤ 100000, 소문자 알파벳만 포함",
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
        { stdin: "racecar", expectedOutput: "YES" },
        { stdin: "hello", expectedOutput: "NO" },
        { stdin: "abacaba", expectedOutput: "YES" },
      ],
      hints: [
        "원본 문자열과 어떤 형태의 문자열을 비교하면 같은지 생각해보세요.",
        "C++ string은 reverse iterator를 이용해 뒤집은 새 문자열을 만들 수 있습니다: string rev(s.rbegin(), s.rend())",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    string rev(s.rbegin(), s.rend());
    cout << (s == rev ? "YES" : "NO") << endl;
    return 0;
}`,
      solutionExplanation:
        "문자열을 뒤집은 rev를 만들어 원본 s와 비교합니다. 같으면 팰린드롬입니다. string(s.rbegin(), s.rend())는 역순 반복자를 이용해 뒤집힌 문자열을 생성합니다.",
      en: {
        title: "Palindrome",
        description:
          "Given a string, print \"YES\" if it reads the same forwards and backwards, otherwise print \"NO\".",
        hints: [
          "Think about what you'd compare the original string to in order to check this property.",
          "In C++, you can build a reversed string using reverse iterators: string rev(s.rbegin(), s.rend())",
        ],
        solutionExplanation:
          "Build a reversed copy rev and compare it to the original s. string(s.rbegin(), s.rend()) constructs a reversed string using reverse iterators.",
      },
    },
    {
      id: "bank-str-002",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "단어 뒤집기",
      description:
        "한 줄에 공백으로 구분된 N개의 단어가 주어집니다. 각 단어를 뒤집어 출력하되, 단어의 순서는 그대로 유지하세요.",
      constraints: "1 ≤ N ≤ 100, 각 단어 길이 ≤ 100",
      initialCode: `#include <iostream>
#include <string>
#include <sstream>
#include <vector>
using namespace std;

int main() {
    string line;
    getline(cin, line);

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "hello world", expectedOutput: "olleh dlrow" },
        { stdin: "abc def ghi", expectedOutput: "cba fed ihg" },
        { stdin: "a", expectedOutput: "a" },
      ],
      hints: [
        "istringstream을 사용하면 공백으로 구분된 단어를 하나씩 읽을 수 있습니다.",
        "각 단어를 string으로 읽은 뒤, reverse() 함수 또는 역순 반복자를 이용해 뒤집으세요.",
        "출력할 때 마지막 단어 뒤에 공백이 오지 않도록 주의하세요.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    istringstream iss(line);
    vector<string> words;
    string w;
    while (iss >> w) words.push_back(w);
    for (int i = 0; i < (int)words.size(); i++) {
        reverse(words[i].begin(), words[i].end());
        if (i > 0) cout << " ";
        cout << words[i];
    }
    cout << endl;
    return 0;
}`,
      solutionExplanation:
        "getline으로 한 줄을 읽고 istringstream으로 단어를 분리합니다. 각 단어에 reverse()를 적용해 뒤집은 뒤 공백으로 이어 출력합니다.",
      en: {
        title: "Reverse Each Word",
        description:
          "Given a line of N words separated by spaces, reverse each individual word while keeping their original order.",
        hints: [
          "Use istringstream to read space-separated words one at a time.",
          "After reading each word as a string, use reverse() or reverse iterators to flip it.",
          "Be careful not to print a trailing space after the last word.",
        ],
        solutionExplanation:
          "Read the full line with getline, then parse words using istringstream. Apply reverse() to each word and print them separated by spaces.",
      },
    },
    {
      id: "bank-str-003",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "모음 자음 개수",
      description:
        "영어 소문자로만 이루어진 문자열이 주어질 때, 모음(a, e, i, o, u)과 자음의 개수를 출력하세요.\n출력 형식: \"모음: X 자음: Y\"",
      constraints: "1 ≤ 문자열 길이 ≤ 100000, 소문자 알파벳만 포함",
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
        { stdin: "hello", expectedOutput: "모음: 2 자음: 3" },
        { stdin: "aeiou", expectedOutput: "모음: 5 자음: 0" },
        { stdin: "bcdfg", expectedOutput: "모음: 0 자음: 5" },
      ],
      hints: [
        "각 문자가 a, e, i, o, u 중 하나인지 확인해 모음 개수를 셉니다.",
        "자음 개수 = 전체 길이 - 모음 개수",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    int vowels = 0;
    string v = "aeiou";
    for (char c : s) {
        if (v.find(c) != string::npos) vowels++;
    }
    int consonants = (int)s.size() - vowels;
    cout << "모음: " << vowels << " 자음: " << consonants << endl;
    return 0;
}`,
      solutionExplanation:
        "각 문자가 \"aeiou\" 문자열 안에 있으면 모음으로 셉니다. 자음 수는 전체 길이에서 모음 수를 빼면 됩니다.",
      en: {
        title: "Count Vowels and Consonants",
        description:
          "Given a string of lowercase English letters, count the number of vowels (a, e, i, o, u) and consonants.\nOutput format: \"모음: X 자음: Y\"",
        hints: [
          "Check if each character is one of a, e, i, o, u to count vowels.",
          "Consonant count = total length - vowel count",
        ],
        solutionExplanation:
          "For each character, check if it exists in the string \"aeiou\". Consonants = total length minus vowel count.",
      },
    },
    {
      id: "bank-str-004",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "단어 수 세기",
      description:
        "한 줄의 문장이 주어질 때, 공백으로 구분된 단어의 수를 출력하세요.",
      constraints: "0 ≤ 단어 수 ≤ 1000, 각 단어는 공백 없는 연속 문자열",
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
        { stdin: "hello world foo", expectedOutput: "3" },
        { stdin: "one", expectedOutput: "1" },
        { stdin: "a b c d e", expectedOutput: "5" },
      ],
      hints: [
        "istringstream을 사용하면 >> 연산자로 단어를 하나씩 추출할 수 있습니다.",
        "while (iss >> word) count++; 패턴으로 단어 수를 셀 수 있습니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    istringstream iss(line);
    string word;
    int count = 0;
    while (iss >> word) count++;
    cout << count << endl;
    return 0;
}`,
      solutionExplanation:
        "istringstream에 줄 전체를 넣고 >> 연산자로 단어를 하나씩 꺼내며 count를 증가시킵니다. 빈 줄이면 while이 바로 종료되어 0이 출력됩니다.",
      en: {
        title: "Word Count",
        description:
          "Given a line of text, count the number of words separated by spaces.",
        hints: [
          "istringstream lets you extract words one at a time using the >> operator.",
          "The pattern while (iss >> word) count++; counts all whitespace-separated tokens.",
        ],
        solutionExplanation:
          "Wrap the line in an istringstream and use >> to pull tokens one by one. An empty line causes the while loop to exit immediately, correctly outputting 0.",
      },
    },
    {
      id: "bank-str-005",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "대소문자 변환",
      description:
        "영문자로만 이루어진 문자열이 주어질 때, 대문자는 소문자로, 소문자는 대문자로 변환하여 출력하세요.",
      constraints: "1 ≤ 문자열 길이 ≤ 100000, 영문자만 포함",
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
        { stdin: "Hello", expectedOutput: "hELLO" },
        { stdin: "ABC", expectedOutput: "abc" },
        { stdin: "abcXYZ", expectedOutput: "ABCxyz" },
      ],
      hints: [
        "isupper(c)와 islower(c)로 대소문자를 구분할 수 있습니다.",
        "toupper(c)와 tolower(c)로 변환할 수 있습니다.",
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
    cout << s << endl;
    return 0;
}`,
      solutionExplanation:
        "각 문자에 대해 isupper()로 대문자인지 확인하고, 대문자면 tolower(), 소문자면 toupper()를 적용합니다. 참조(&)를 사용해 원본 문자열을 직접 수정합니다.",
      en: {
        title: "Swap Case",
        description:
          "Given a string of English letters, convert uppercase to lowercase and lowercase to uppercase.",
        hints: [
          "isupper(c) and islower(c) let you distinguish letter cases.",
          "toupper(c) and tolower(c) perform the conversion.",
        ],
        solutionExplanation:
          "Iterate over each character with a reference. If it is uppercase, convert with tolower(); otherwise convert with toupper(). The reference modifies the original string in place.",
      },
    },
    {
      id: "bank-str-006",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "문자 빈도수",
      description:
        "영문 소문자 문자열이 주어질 때, 각 문자의 등장 횟수를 알파벳 순서로 출력하세요. 한 번도 등장하지 않은 문자는 출력하지 않습니다.\n출력 형식: \"문자: 횟수\" (한 줄씩)",
      constraints: "1 ≤ 문자열 길이 ≤ 100000, 소문자 알파벳만 포함",
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
        { stdin: "banana", expectedOutput: "a: 3\nb: 1\nn: 2" },
        { stdin: "hello", expectedOutput: "e: 1\nh: 1\nl: 2\no: 1" },
        { stdin: "aaa", expectedOutput: "a: 3" },
      ],
      hints: [
        "크기 26인 int 배열을 0으로 초기화하고, 각 문자에 대해 cnt[c - 'a']++ 합니다.",
        "a부터 z까지 순서대로 순회하며 count가 0보다 큰 항목만 출력합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    int cnt[26] = {};
    for (char c : s) cnt[c - 'a']++;
    for (int i = 0; i < 26; i++) {
        if (cnt[i] > 0) {
            cout << (char)('a' + i) << ": " << cnt[i] << "\n";
        }
    }
    return 0;
}`,
      solutionExplanation:
        "크기 26인 배열에 각 소문자의 빈도를 기록합니다. c - 'a'를 인덱스로 사용하면 a=0, b=1, ..., z=25에 해당합니다. 마지막에 0~25를 순서대로 순회하며 0보다 큰 것만 출력하면 알파벳 순 보장됩니다.",
      en: {
        title: "Character Frequency",
        description:
          "Given a lowercase string, print the count of each character in alphabetical order. Skip characters that do not appear.\nOutput format: \"char: count\" (one per line)",
        hints: [
          "Use an int array of size 26 initialized to 0; increment cnt[c - 'a'] for each character.",
          "Iterate from a to z and print only entries with a count greater than 0.",
        ],
        solutionExplanation:
          "A 26-element array stores frequencies. c - 'a' maps a→0, b→1, ..., z→25. Iterating indices 0–25 in order guarantees alphabetical output.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // MEDIUM (bank-str-007 ~ 015)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "bank-str-007",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "문자열 압축",
      description:
        "문자열에서 연속으로 같은 문자가 반복되면 \"문자+횟수\" 형태로 압축하여 출력하세요. 1번만 나오는 문자는 횟수를 생략합니다.",
      constraints: "1 ≤ 문자열 길이 ≤ 100000, 소문자 알파벳만 포함",
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
        { stdin: "aaabbbcc", expectedOutput: "a3b3c2" },
        { stdin: "abcde", expectedOutput: "abcde" },
        { stdin: "aabbaa", expectedOutput: "a2b2a2" },
      ],
      hints: [
        "문자열을 순서대로 훑으면서 현재 문자가 이전 문자와 같으면 횟수를 증가시킵니다.",
        "현재 문자가 달라지는 순간 이전 문자와 횟수를 결과에 추가합니다.",
        "횟수가 1이면 숫자를 출력하지 않습니다 (to_string(count)를 조건부로 추가).",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    string result = "";
    int i = 0;
    while (i < (int)s.size()) {
        char cur = s[i];
        int count = 0;
        while (i < (int)s.size() && s[i] == cur) {
            count++;
            i++;
        }
        result += cur;
        if (count > 1) result += to_string(count);
    }
    cout << result << endl;
    return 0;
}`,
      solutionExplanation:
        "두 개의 while 루프로 연속 구간(run)을 처리합니다. 내부 루프가 같은 문자가 연속되는 동안 count를 올리고, 외부 루프에서 문자와 (count > 1이면) 숫자를 결과에 추가합니다.",
      en: {
        title: "Run-Length Encoding",
        description:
          "Compress a string so that consecutive repeated characters are written as \"char+count\". If a character appears only once, omit the count.",
        hints: [
          "Scan the string; while the current character matches the previous one, increment a counter.",
          "When the character changes, append the previous character and its run count to the result.",
          "Only append the count when it is greater than 1.",
        ],
        solutionExplanation:
          "A nested while loop processes each run of identical characters. The inner loop increments count while characters match; the outer loop appends the character and (if count > 1) its count to the result.",
      },
    },
    {
      id: "bank-str-008",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "아나그램 확인",
      description:
        "두 문자열이 주어질 때, 두 문자열이 아나그램 관계(같은 문자를 같은 수만큼 포함)인지 확인하여 \"YES\" 또는 \"NO\"를 출력하세요.",
      constraints: "1 ≤ 각 문자열 길이 ≤ 100000, 소문자 알파벳만 포함",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "listen\nsilent", expectedOutput: "YES" },
        { stdin: "hello\nworld", expectedOutput: "NO" },
        { stdin: "abc\ncba", expectedOutput: "YES" },
      ],
      hints: [
        "두 문자열의 길이가 다르면 아나그램이 될 수 없습니다.",
        "두 문자열을 각각 정렬했을 때 결과가 같으면 아나그램입니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());
    cout << (a == b ? "YES" : "NO") << endl;
    return 0;
}`,
      solutionExplanation:
        "두 문자열을 각각 정렬하면 같은 문자를 같은 수만큼 포함한 경우 결과가 동일합니다. 정렬 후 비교하는 것이 가장 간결한 방법입니다.",
      en: {
        title: "Anagram Check",
        description:
          "Given two strings, determine whether they are anagrams (contain the same characters with the same frequencies). Print \"YES\" or \"NO\".",
        hints: [
          "If the two strings have different lengths they cannot be anagrams.",
          "Sort both strings; if the sorted results are equal, they are anagrams.",
        ],
        solutionExplanation:
          "Sorting both strings normalizes the character order. If the sorted strings are equal, the originals contain identical characters with identical counts.",
      },
    },
    {
      id: "bank-str-009",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "가장 긴 공통 접두사",
      description:
        "N개의 문자열이 주어질 때, 모든 문자열에 공통으로 나타나는 가장 긴 접두사를 출력하세요. 공통 접두사가 없으면 빈 줄을 출력합니다.",
      constraints: "1 ≤ N ≤ 1000, 각 문자열 길이 ≤ 1000, 소문자 알파벳만 포함",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> words(n);
    for (int i = 0; i < n; i++) cin >> words[i];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3\nflower\nflow\nflight", expectedOutput: "fl" },
        { stdin: "3\ndog\ncar\nrace", expectedOutput: "" },
        { stdin: "3\nabc\nabc\nabc", expectedOutput: "abc" },
      ],
      hints: [
        "첫 번째 문자열을 초기 접두사 후보로 설정합니다.",
        "나머지 문자열을 순서대로 확인하면서, 현재 접두사로 시작하지 않으면 접두사를 한 글자씩 줄입니다.",
        "string::substr(0, len)과 string::find() 또는 직접 비교로 접두사 일치를 확인할 수 있습니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> words(n);
    for (int i = 0; i < n; i++) cin >> words[i];

    string prefix = words[0];
    for (int i = 1; i < n; i++) {
        while (words[i].find(prefix) != 0) {
            prefix = prefix.substr(0, prefix.size() - 1);
            if (prefix.empty()) break;
        }
    }
    cout << prefix << "\n";
    return 0;
}`,
      solutionExplanation:
        "첫 번째 문자열을 초기 접두사로 설정하고, 각 나머지 문자열이 해당 접두사로 시작하지 않을 때마다 접두사의 마지막 문자를 제거합니다. 접두사가 빈 문자열이 되면 공통 접두사가 없는 것입니다.",
      en: {
        title: "Longest Common Prefix",
        description:
          "Given N strings, find and print the longest prefix shared by all of them. If there is no common prefix, print an empty line.",
        hints: [
          "Start with the first string as the candidate prefix.",
          "For each subsequent string, if it does not start with the current prefix, shorten the prefix by one character at a time.",
          "Use string::find() or direct comparison to check whether a string starts with the prefix.",
        ],
        solutionExplanation:
          "Initialize the prefix to the first word. For every following word, repeatedly trim the prefix's last character until the word starts with it or the prefix becomes empty.",
      },
    },
    {
      id: "bank-str-010",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "괄호 유효성",
      description:
        "'(', ')', '[', ']', '{', '}' 문자로만 이루어진 문자열이 주어질 때, 괄호가 올바르게 열리고 닫혔는지 확인하여 \"YES\" 또는 \"NO\"를 출력하세요.",
      constraints: "1 ≤ 문자열 길이 ≤ 100000",
      initialCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int main() {
    string s;
    cin >> s;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "()[]{}", expectedOutput: "YES", label: "기본" },
        { stdin: "([)]", expectedOutput: "NO", label: "교차 괄호" },
        { stdin: "{[]}", expectedOutput: "YES", label: "중첩 괄호" },
      ],
      hints: [
        "여는 괄호 '(', '[', '{'를 만나면 스택에 넣습니다.",
        "닫는 괄호를 만나면 스택 top의 여는 괄호와 쌍이 맞는지 확인합니다. 맞지 않거나 스택이 비어있으면 유효하지 않습니다.",
        "문자열을 모두 처리한 후 스택이 비어있어야 유효합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int main() {
    string s;
    cin >> s;
    stack<char> st;
    bool valid = true;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) { valid = false; break; }
            char top = st.top(); st.pop();
            if (c == ')' && top != '(') { valid = false; break; }
            if (c == ']' && top != '[') { valid = false; break; }
            if (c == '}' && top != '{') { valid = false; break; }
        }
    }
    if (!st.empty()) valid = false;
    cout << (valid ? "YES" : "NO") << endl;
    return 0;
}`,
      solutionExplanation:
        "스택을 이용해 여는 괄호를 쌓고, 닫는 괄호를 만나면 top과 쌍이 맞는지 확인합니다. 불일치하거나 스택이 비어있으면 즉시 false. 끝에 스택이 비어있지 않으면 닫히지 않은 괄호가 남아있는 것입니다.",
      en: {
        title: "Valid Parentheses",
        description:
          "Given a string containing only '(', ')', '[', ']', '{', '}', determine whether the brackets are correctly matched and nested. Print \"YES\" or \"NO\".",
        hints: [
          "Push opening brackets '(', '[', '{' onto a stack.",
          "When encountering a closing bracket, check whether it matches the top of the stack. If not, or if the stack is empty, the string is invalid.",
          "After processing all characters, the stack must be empty for the string to be valid.",
        ],
        solutionExplanation:
          "Use a stack for opening brackets. On each closing bracket, verify it matches the top of the stack. Any mismatch or empty stack means invalid. A non-empty stack at the end means unclosed brackets remain.",
      },
    },
    {
      id: "bank-str-011",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "시저 암호",
      description:
        "문자열을 K칸 오른쪽으로 밀어 암호화하세요. 소문자 알파벳만 순환 처리하고, 공백이나 숫자는 그대로 출력합니다.",
      constraints: "0 ≤ K ≤ 25, 1 ≤ 문자열 길이 ≤ 100000",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int k;
    string s;
    cin >> k;
    cin.ignore();
    getline(cin, s);

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3\nhello", expectedOutput: "khoor" },
        { stdin: "1\nxyz", expectedOutput: "yza" },
        { stdin: "13\nabc", expectedOutput: "nop" },
      ],
      hints: [
        "소문자 c에 대해, 0~25 범위의 값으로 변환한 뒤 K를 더하고 26으로 나머지를 구하면 순환이 됩니다.",
        "공식: (c - 'a' + K) % 26 + 'a'",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int k;
    string s;
    cin >> k;
    cin.ignore();
    getline(cin, s);
    for (char& c : s) {
        if (c >= 'a' && c <= 'z') {
            c = (char)(((c - 'a') + k) % 26 + 'a');
        }
    }
    cout << s << endl;
    return 0;
}`,
      solutionExplanation:
        "각 소문자 c에 대해 (c - 'a' + K) % 26으로 0~25 범위 내에서 K칸 이동한 값을 구하고, 'a'를 더해 다시 문자로 변환합니다. 소문자가 아닌 문자는 그대로 둡니다.",
      en: {
        title: "Caesar Cipher",
        description:
          "Encode a string by shifting each lowercase letter K positions to the right (wrapping around). Non-letter characters are left unchanged.",
        hints: [
          "Map a lowercase letter c to 0–25, add K, take modulo 26 to wrap, then map back to a character.",
          "Formula: (c - 'a' + K) % 26 + 'a'",
        ],
        solutionExplanation:
          "For each lowercase letter, compute (c - 'a' + K) % 26 to shift within the 0–25 range, then add 'a' to restore it to a character. Non-lowercase characters pass through unchanged.",
      },
    },
    {
      id: "bank-str-012",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "단어 빈도 분석",
      description:
        "N개의 단어가 주어질 때 다음 세 가지를 순서대로 출력하세요.\n1. 가장 많이 등장한 단어 (대소문자 구분 없음)\n2. 총 단어 수\n3. 고유 단어 수\n(동률이면 어떤 것을 출력해도 됩니다)",
      constraints: "1 ≤ N ≤ 10000, 각 단어 길이 ≤ 100",
      initialCode: `#include <iostream>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "5\nHello\nhello\nworld\nHello\nfoo",
          expectedOutput: "hello\n5\n3",
        },
        { stdin: "3\nA\nB\nC", expectedOutput: "a\n3\n3" },
        {
          stdin: "4\napple\nAPPLE\nApple\nbanana",
          expectedOutput: "apple\n4\n2",
        },
      ],
      hints: [
        "각 단어를 소문자로 변환한 후 map<string, int>에 빈도를 기록합니다.",
        "map을 순회해 가장 큰 값을 가진 키를 찾습니다.",
        "고유 단어 수는 map의 크기(size())와 같습니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, int> freq;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        transform(w.begin(), w.end(), w.begin(), ::tolower);
        freq[w]++;
    }
    string best;
    int maxCnt = 0;
    for (auto& p : freq) {
        if (p.second > maxCnt) {
            maxCnt = p.second;
            best = p.first;
        }
    }
    cout << best << "\n" << n << "\n" << freq.size() << "\n";
    return 0;
}`,
      solutionExplanation:
        "transform으로 모든 단어를 소문자로 변환한 뒤 map에 빈도를 기록합니다. 맵을 순회해 최대 빈도 단어를 찾고, 총 단어 수는 N, 고유 단어 수는 map.size()로 구합니다.",
      en: {
        title: "Word Frequency Analysis",
        description:
          "Given N words, print the following in order:\n1. The most frequent word (case-insensitive)\n2. Total word count\n3. Number of unique words\n(Ties may be broken arbitrarily.)",
        hints: [
          "Lowercase every word, then store frequencies in a map<string, int>.",
          "Scan the map to find the key with the highest value.",
          "The number of unique words equals map.size().",
        ],
        solutionExplanation:
          "Use transform to lowercase each word, then record it in a map. Scan the map for the maximum-count entry. Total count is N; unique count is map.size().",
      },
    },
    {
      id: "bank-str-013",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "문장 뒤집기",
      description:
        "한 줄의 문장이 주어질 때, 단어의 순서를 뒤집어 출력하세요. 단어는 공백으로 구분됩니다.",
      constraints: "1 ≤ 단어 수 ≤ 10000, 각 단어 길이 ≤ 100",
      initialCode: `#include <iostream>
#include <string>
#include <sstream>
#include <vector>
using namespace std;

int main() {
    string line;
    getline(cin, line);

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "hello world", expectedOutput: "world hello" },
        { stdin: "I love coding", expectedOutput: "coding love I" },
        { stdin: "one", expectedOutput: "one" },
      ],
      hints: [
        "단어를 vector에 저장한 뒤 역순으로 출력하거나 reverse()를 사용합니다.",
        "istringstream으로 단어를 하나씩 읽을 수 있습니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    istringstream iss(line);
    vector<string> words;
    string w;
    while (iss >> w) words.push_back(w);
    reverse(words.begin(), words.end());
    for (int i = 0; i < (int)words.size(); i++) {
        if (i > 0) cout << " ";
        cout << words[i];
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation:
        "istringstream으로 단어를 vector에 저장한 후 reverse()로 벡터 전체를 뒤집습니다. 그 후 공백으로 이어 출력합니다.",
      en: {
        title: "Reverse Words",
        description:
          "Given a sentence, print the words in reverse order. Words are separated by single spaces.",
        hints: [
          "Store words in a vector, then either iterate in reverse or call reverse().",
          "Use istringstream to parse words one at a time.",
        ],
        solutionExplanation:
          "Parse words into a vector with istringstream, call reverse() on the vector, then join them with spaces for output.",
      },
    },
    {
      id: "bank-str-014",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "URL 파싱",
      description:
        "\"프로토콜://호스트/경로\" 형태의 URL 문자열이 주어질 때 각 부분을 분리해 세 줄에 출력하세요.\n- 1번째 줄: 프로토콜\n- 2번째 줄: 호스트\n- 3번째 줄: 경로 (없으면 빈 줄)",
      constraints: "URL 길이 ≤ 2000, \"://\" 는 반드시 포함됨",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string url;
    cin >> url;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "https://example.com/path/to/page",
          expectedOutput: "https\nexample.com\npath/to/page",
        },
        {
          stdin: "http://google.com/",
          expectedOutput: "http\ngoogle.com\n",
        },
        {
          stdin: "ftp://files.server.net",
          expectedOutput: "ftp\nfiles.server.net\n",
        },
      ],
      hints: [
        "string::find(\"://\")로 프로토콜 끝 위치를 찾습니다.",
        "\"://\" 이후에서 다음 '/'를 찾아 호스트와 경로를 분리합니다.",
        "경로가 없거나 빈 경우에도 세 번째 줄은 항상 출력합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string url;
    cin >> url;

    size_t sep = url.find("://");
    string protocol = url.substr(0, sep);
    string rest = url.substr(sep + 3); // after "://"

    size_t slash = rest.find('/');
    string host, path;
    if (slash == string::npos) {
        host = rest;
        path = "";
    } else {
        host = rest.substr(0, slash);
        path = rest.substr(slash + 1);
    }

    cout << protocol << "\n" << host << "\n" << path << "\n";
    return 0;
}`,
      solutionExplanation:
        "find(\"://\")로 프로토콜을 분리하고, 그 이후 문자열에서 첫 번째 '/'를 찾아 호스트와 경로를 나눕니다. '/'가 없으면 경로는 빈 문자열입니다. 항상 세 줄을 출력합니다.",
      en: {
        title: "URL Parser",
        description:
          "Given a URL in \"protocol://host/path\" format, split and print each part on a separate line.\n- Line 1: protocol\n- Line 2: host\n- Line 3: path (empty line if absent)",
        hints: [
          "Use string::find(\"://\") to locate the end of the protocol.",
          "Search for the first '/' after the host section to separate host from path.",
          "Always print three lines even if the path is empty.",
        ],
        solutionExplanation:
          "find(\"://\") isolates the protocol. In the remaining string, the first '/' separates host from path. If no '/' is found, path is empty. Three lines are always printed.",
      },
    },
    {
      id: "bank-str-015",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "가장 긴 반복 부분 문자열",
      description:
        "소문자 문자열에서 연속으로 같은 문자가 가장 길게 반복되는 구간을 찾아, 해당 문자와 길이를 공백으로 구분해 출력하세요. 동률이면 먼저 나타나는 것을 출력합니다.",
      constraints: "1 ≤ 문자열 길이 ≤ 100000, 소문자 알파벳만 포함",
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
        { stdin: "aabbcccdddd", expectedOutput: "d 4" },
        { stdin: "aaaa", expectedOutput: "a 4" },
        { stdin: "abcde", expectedOutput: "a 1" },
      ],
      hints: [
        "문자열을 순서대로 훑으며 현재 문자와 이전 문자를 비교해 연속 구간 길이를 셉니다.",
        "구간이 끊길 때마다 현재 구간 길이와 최대 구간 길이를 비교하고, 더 크면 최대값과 해당 문자를 갱신합니다.",
        "동률 처리를 위해 엄격한 부등호(>)를 사용해 먼저 나타난 것을 유지합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    char bestChar = s[0];
    int bestLen = 1;
    char cur = s[0];
    int curLen = 1;
    for (int i = 1; i < (int)s.size(); i++) {
        if (s[i] == cur) {
            curLen++;
        } else {
            if (curLen > bestLen) {
                bestLen = curLen;
                bestChar = cur;
            }
            cur = s[i];
            curLen = 1;
        }
    }
    if (curLen > bestLen) {
        bestLen = curLen;
        bestChar = cur;
    }
    cout << bestChar << " " << bestLen << endl;
    return 0;
}`,
      solutionExplanation:
        "단일 패스로 현재 연속 구간(cur, curLen)과 최대 구간(bestChar, bestLen)을 추적합니다. 문자가 바뀔 때마다 이전 구간을 최대값과 비교합니다. 루프 종료 후 마지막 구간도 비교합니다.",
      en: {
        title: "Longest Consecutive Run",
        description:
          "Find the character that appears in the longest consecutive run in a lowercase string, and print the character and its run length separated by a space. Break ties by choosing the first occurrence.",
        hints: [
          "Scan the string, comparing each character to the previous one to measure run lengths.",
          "Whenever the run breaks, compare the current run length to the maximum and update if larger.",
          "Use strict greater-than (>) to keep the earlier occurrence on ties.",
        ],
        solutionExplanation:
          "A single pass tracks the current run (cur, curLen) and the best run seen so far (bestChar, bestLen). Each time the character changes, compare and possibly update the best. Check the final run after the loop ends.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // HARD (bank-str-016 ~ 020)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "bank-str-016",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "가장 긴 팰린드롬 부분문자열",
      description:
        "소문자 문자열이 주어질 때, 이 문자열에 포함된 부분문자열 중 팰린드롬인 것의 최대 길이를 출력하세요.",
      constraints: "1 ≤ 문자열 길이 ≤ 2000, 소문자 알파벳만 포함",
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
        { stdin: "babad", expectedOutput: "3" },
        { stdin: "cbbd", expectedOutput: "2" },
        { stdin: "racecar", expectedOutput: "7" },
      ],
      hints: [
        "모든 가능한 부분문자열을 확인하는 O(N³) 방법보다 효율적인 방법을 생각해보세요.",
        "팰린드롬은 중심에서 바깥으로 확장하는 성질이 있습니다. 각 위치를 중심으로 삼아 확장해 보세요.",
        "홀수 길이 팰린드롬(중심 1칸)과 짝수 길이 팰린드롬(중심 2칸) 두 경우를 모두 처리해야 합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int expand(const string& s, int left, int right) {
    while (left >= 0 && right < (int)s.size() && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

int main() {
    string s;
    cin >> s;
    int maxLen = 1;
    for (int i = 0; i < (int)s.size(); i++) {
        int odd  = expand(s, i, i);
        int even = expand(s, i, i + 1);
        maxLen = max(maxLen, max(odd, even));
    }
    cout << maxLen << endl;
    return 0;
}`,
      solutionExplanation:
        "각 위치 i를 중심으로 삼아 좌우로 확장하며 팰린드롬 길이를 측정합니다. 홀수 길이는 (i, i)에서, 짝수 길이는 (i, i+1)에서 시작해 확장합니다. 전체 시간복잡도 O(N²)입니다.",
      en: {
        title: "Longest Palindromic Substring",
        description:
          "Given a lowercase string, find the length of its longest palindromic substring.",
        hints: [
          "Consider a more efficient approach than checking every possible substring in O(N³).",
          "Every palindrome expands outward from its center. Try treating each position as a center.",
          "Handle both odd-length palindromes (single-character center) and even-length ones (two-character center).",
        ],
        solutionExplanation:
          "For each index i, expand outward from (i, i) for odd-length and (i, i+1) for even-length palindromes. Track the maximum length found. Overall time complexity is O(N²).",
      },
    },
    {
      id: "bank-str-017",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "암호 해독",
      description:
        "26개의 소문자를 다른 소문자로 치환하는 치환표가 주어집니다. 치환표의 i번째 문자가 알파벳의 i번째 소문자('a'부터 시작)가 변환될 결과입니다. 이 치환표를 사용해 문자열을 암호화하여 출력하세요. 공백은 그대로 출력합니다.",
      constraints: "치환표: 정확히 26개 소문자, 입력 문자열 길이 ≤ 100000",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string table, s;
    cin >> table;
    cin.ignore();
    getline(cin, s);

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "zyxwvutsrqponmlkjihgfedcba\nhello world",
          expectedOutput: "svool dliow",
        },
        {
          stdin: "abcdefghijklmnopqrstuvwxyz\nhello",
          expectedOutput: "hello",
        },
        {
          stdin: "bcdefghijklmnopqrstuvwxyza\nabc",
          expectedOutput: "bcd",
        },
      ],
      hints: [
        "치환표 table에서 소문자 c의 암호화 결과는 table[c - 'a']입니다.",
        "공백이 포함된 문자열이므로 getline으로 읽어야 합니다.",
        "소문자인 문자만 치환하고, 공백은 그대로 출력합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string table, s;
    cin >> table;
    cin.ignore();
    getline(cin, s);
    for (char& c : s) {
        if (c >= 'a' && c <= 'z') {
            c = table[c - 'a'];
        }
    }
    cout << s << endl;
    return 0;
}`,
      solutionExplanation:
        "각 소문자 c에 대해 table[c - 'a']로 치환합니다. table의 i번째 문자가 'a'+i를 치환한 결과이므로, c - 'a'를 인덱스로 바로 사용할 수 있습니다. 공백은 조건에 걸리지 않아 그대로 유지됩니다.",
      en: {
        title: "Substitution Cipher",
        description:
          "A substitution table of 26 lowercase letters is given, where the i-th character is the replacement for the i-th letter of the alphabet (starting from 'a'). Encode the input string using this table. Spaces pass through unchanged.",
        hints: [
          "For a lowercase letter c, its encoded form is table[c - 'a'].",
          "The input string may contain spaces, so use getline to read it.",
          "Only substitute lowercase letters; leave spaces as-is.",
        ],
        solutionExplanation:
          "For each lowercase letter c, table[c - 'a'] gives the substitution. Since c - 'a' directly indexes the table, no extra mapping is needed. Spaces are skipped by the conditional check.",
      },
    },
    {
      id: "bank-str-018",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "수식 계산",
      description:
        "괄호 없이 정수와 사칙연산자(+, -, *, /)로만 이루어진 수식 문자열이 주어질 때, 연산자 우선순위(곱셈·나눗셈 우선)를 지켜 계산한 결과를 출력하세요. 나눗셈은 정수 나눗셈(내림)을 사용합니다.",
      constraints: "수식 길이 ≤ 1000, 모든 수는 양의 정수, 공백 없음",
      initialCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int main() {
    string expr;
    cin >> expr;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3+5*2", expectedOutput: "13" },
        { stdin: "10-4/2", expectedOutput: "8" },
        { stdin: "2*3+4*5", expectedOutput: "26" },
      ],
      hints: [
        "수식을 좌→우로 파싱하면서 숫자와 연산자를 분리합니다.",
        "두 개의 스택(숫자 스택, 연산자 스택)을 사용하거나, 먼저 *와 /를 처리한 후 +와 -를 처리하는 2단계 방식을 사용할 수 있습니다.",
        "현재 연산자의 우선순위가 스택 top의 연산자보다 낮거나 같으면 스택 top 연산을 먼저 처리합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int main() {
    string expr;
    cin >> expr;

    stack<long long> nums;
    stack<char> ops;

    auto precedence = [](char op) {
        return (op == '*' || op == '/') ? 2 : 1;
    };

    auto applyOp = [&]() {
        long long b = nums.top(); nums.pop();
        long long a = nums.top(); nums.pop();
        char op = ops.top(); ops.pop();
        if (op == '+') nums.push(a + b);
        else if (op == '-') nums.push(a - b);
        else if (op == '*') nums.push(a * b);
        else nums.push(a / b);
    };

    int i = 0;
    int n = (int)expr.size();
    while (i < n) {
        if (isdigit(expr[i])) {
            long long num = 0;
            while (i < n && isdigit(expr[i])) {
                num = num * 10 + (expr[i] - '0');
                i++;
            }
            nums.push(num);
        } else {
            char op = expr[i++];
            while (!ops.empty() && precedence(ops.top()) >= precedence(op)) {
                applyOp();
            }
            ops.push(op);
        }
    }
    while (!ops.empty()) applyOp();
    cout << nums.top() << endl;
    return 0;
}`,
      solutionExplanation:
        "숫자 스택과 연산자 스택을 이용한 Shunting-Yard 방식입니다. 새 연산자를 만날 때, 스택 top의 연산자 우선순위가 같거나 높으면 먼저 처리한 뒤 새 연산자를 push합니다. 수식 끝에 남은 연산자를 모두 처리하면 완료됩니다.",
      en: {
        title: "Expression Evaluator",
        description:
          "Given an arithmetic expression string containing positive integers and operators (+, -, *, /) without parentheses or spaces, evaluate it respecting operator precedence (multiplication and division first). Use integer (floor) division.",
        hints: [
          "Parse the expression left-to-right, separating numbers from operators.",
          "Use two stacks (one for numbers, one for operators), or a two-pass approach: handle */ first, then +-.",
          "When encountering a new operator, process any stack-top operators with equal or higher precedence first.",
        ],
        solutionExplanation:
          "A Shunting-Yard approach with number and operator stacks. When a new operator arrives, pop and apply all stack operators with equal or higher precedence, then push the new operator. After parsing, flush the operator stack to get the final result.",
      },
    },
    {
      id: "bank-str-019",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "단어 패턴 매칭",
      description:
        "패턴 문자열과 단어 시퀀스가 주어질 때, 패턴의 각 글자와 각 단어가 일대일로 대응되면 \"YES\", 아니면 \"NO\"를 출력하세요.\n(같은 글자는 항상 같은 단어, 다른 글자는 항상 다른 단어여야 합니다)",
      constraints: "패턴 길이 = 단어 수, 1 ≤ 패턴 길이 ≤ 1000",
      initialCode: `#include <iostream>
#include <string>
#include <map>
#include <sstream>
#include <vector>
using namespace std;

int main() {
    string pattern, line;
    cin >> pattern;
    cin.ignore();
    getline(cin, line);

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "abba\ndog cat cat dog", expectedOutput: "YES" },
        { stdin: "abba\ndog cat cat fish", expectedOutput: "NO" },
        { stdin: "aaaa\ndog cat cat dog", expectedOutput: "NO" },
      ],
      hints: [
        "패턴 길이와 단어 수가 다르면 즉시 NO입니다.",
        "char→string 방향 매핑과 string→char 방향 매핑을 동시에 유지해야 진정한 일대일 대응을 검사할 수 있습니다.",
        "i번째 패턴 글자와 i번째 단어를 함께 확인하면서 기존 매핑과 충돌하는지 검사합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <map>
#include <sstream>
#include <vector>
using namespace std;

int main() {
    string pattern, line;
    cin >> pattern;
    cin.ignore();
    getline(cin, line);

    istringstream iss(line);
    vector<string> words;
    string w;
    while (iss >> w) words.push_back(w);

    if ((int)words.size() != (int)pattern.size()) {
        cout << "NO" << endl;
        return 0;
    }

    map<char, string> charToWord;
    map<string, char> wordToChar;
    for (int i = 0; i < (int)pattern.size(); i++) {
        char c = pattern[i];
        string& word = words[i];
        if (charToWord.count(c) && charToWord[c] != word) {
            cout << "NO" << endl;
            return 0;
        }
        if (wordToChar.count(word) && wordToChar[word] != c) {
            cout << "NO" << endl;
            return 0;
        }
        charToWord[c] = word;
        wordToChar[word] = c;
    }
    cout << "YES" << endl;
    return 0;
}`,
      solutionExplanation:
        "char→string과 string→char 두 방향의 맵을 동시에 유지합니다. 각 위치에서 새 매핑이 기존 매핑과 충돌하면 NO, 모두 통과하면 YES입니다. 양방향 맵 없이 단방향만 쓰면 \"aaaa\" / \"dog cat cat dog\" 같은 경우를 걸러내지 못합니다.",
      en: {
        title: "Word Pattern Matching",
        description:
          "Given a pattern string and a sequence of words, print \"YES\" if there is a bijection between pattern characters and words (same letter = same word, different letters = different words), otherwise \"NO\".",
        hints: [
          "If the pattern length differs from the word count, immediately print NO.",
          "Maintain mappings in both directions (char→word and word→char) to enforce true bijection.",
          "At each position, check whether the new pair conflicts with any existing mapping.",
        ],
        solutionExplanation:
          "Two maps are kept simultaneously: char→string and string→char. Any conflict at position i causes an immediate NO. Without the reverse map, cases like \"aaaa\" / \"dog cat cat dog\" would be incorrectly accepted.",
      },
    },
    {
      id: "bank-str-020",
      cluster: "bank-str",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "문자열 편집 거리",
      description:
        "두 문자열이 주어질 때, 한 문자열을 다른 문자열로 바꾸는 데 필요한 최소 편집 횟수를 출력하세요. 허용되는 연산은 삽입, 삭제, 교체이며 각 연산의 비용은 1입니다.",
      constraints: "각 문자열 길이 ≤ 500, 소문자 알파벳만 포함",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s1, s2;
    cin >> s1 >> s2;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "kitten\nsitting", expectedOutput: "3" },
        { stdin: "sunday\nsaturday", expectedOutput: "3" },
        { stdin: "abc\nabc", expectedOutput: "0" },
      ],
      hints: [
        "dp[i][j]를 s1의 앞 i글자를 s2의 앞 j글자로 바꾸는 최소 비용으로 정의하면 점화식을 세울 수 있습니다.",
        "dp[i][0] = i (모두 삭제), dp[0][j] = j (모두 삽입)로 초기화합니다.",
        "s1[i-1] == s2[j-1]이면 dp[i][j] = dp[i-1][j-1], 다르면 dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) 입니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    int m = (int)s1.size(), n = (int)s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
            }
        }
    }
    cout << dp[m][n] << endl;
    return 0;
}`,
      solutionExplanation:
        "Levenshtein 거리 DP입니다. dp[i][j]는 s1[0..i-1]을 s2[0..j-1]로 변환하는 최소 편집 횟수입니다. 두 문자가 같으면 비용 없이 dp[i-1][j-1]을 상속하고, 다르면 삭제(dp[i-1][j]), 삽입(dp[i][j-1]), 교체(dp[i-1][j-1]) 중 최솟값에 1을 더합니다.",
      en: {
        title: "Edit Distance",
        description:
          "Given two strings, find the minimum number of single-character edits (insertions, deletions, or substitutions, each costing 1) required to transform one string into the other.",
        hints: [
          "Define dp[i][j] as the minimum cost to transform the first i characters of s1 into the first j characters of s2.",
          "Initialize dp[i][0] = i (delete all) and dp[0][j] = j (insert all).",
          "If s1[i-1] == s2[j-1], then dp[i][j] = dp[i-1][j-1]; otherwise dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).",
        ],
        solutionExplanation:
          "Classic Levenshtein DP. dp[i][j] represents the minimum edits to convert s1[0..i-1] to s2[0..j-1]. When characters match, inherit the diagonal value; when they differ, take the minimum of delete, insert, and substitute costs, each plus 1.",
      },
    },
  ],
}

export default bankStringsCluster
