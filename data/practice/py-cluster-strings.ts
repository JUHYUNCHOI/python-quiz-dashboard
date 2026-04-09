import type { PracticeCluster } from "./types"

export const pyStringsCluster: PracticeCluster = {
  id: "py-strings",
  title: "문자열 조작",
  emoji: "🔤",
  description: "split/join, 슬라이싱, 문자열 메서드, 파싱",
  unlockAfter: "18",
  en: {
    title: "String Manipulation",
    description: "split/join, slicing, string methods, parsing",
  },
  problems: [
    {
      id: "pystr-001",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "쉬움",
      title: "단어 뒤집기",
      description: `한 줄의 문장이 주어집니다.
각 단어를 개별적으로 뒤집어 공백으로 구분해 출력하세요. 단어 순서는 유지합니다.`,
      constraints: "1 ≤ 단어 수 ≤ 100, 1 ≤ 단어 길이 ≤ 100",
      initialCode: `sentence = input()

# 각 단어를 뒤집되 단어 순서는 그대로 유지하세요
# 예: "hello world" → "olleh dlrow"
`,
      testCases: [
        { stdin: "hello world", expectedOutput: "olleh dlrow", label: "기본" },
        { stdin: "I love Python", expectedOutput: "I evol nohtyP", label: "세 단어" },
        { stdin: "abcde", expectedOutput: "edcba", label: "단어 하나" },
        { stdin: "a bb ccc", expectedOutput: "a bb ccc", label: "대칭 단어 포함" },
      ],
      hints: [
        "split()으로 단어를 나누고, 각 단어에 [::-1] 슬라이싱을 적용하세요.",
        "' '.join(word[::-1] for word in sentence.split())",
      ],
      solutionCode: `sentence = input()
print(' '.join(word[::-1] for word in sentence.split()))`,
      solutionExplanation: "split()으로 단어 분리, [::-1]로 각 단어 역순, join()으로 재조합합니다.",
      en: {
        title: "Reverse Each Word",
        description: `Given a sentence on one line, reverse each word individually and print them separated by spaces. The word order stays the same.`,
        constraints: "1 ≤ number of words ≤ 100, 1 ≤ word length ≤ 100",
        hints: [
          "Use split() to separate words, then apply [::-1] slicing to each word.",
          "' '.join(word[::-1] for word in sentence.split())",
        ],
        solutionExplanation: "split() separates words, [::-1] reverses each one, and join() reassembles them.",
      },
      language: "python",
    },
    // ── strip ─────────────────────────────────────────────────────
    {
      id: "pystr-ST01",
      cluster: "py-strings",
      unlockAfter: "6",
      difficulty: "쉬움",
      title: "공백 제거 (strip)",
      description: `N개의 문자열이 주어집니다. 각 문자열의 **양쪽 공백을 strip()으로 제거**하고 출력하세요.

**strip()** — 문자열 양쪽 공백(또는 지정 문자)을 모두 제거합니다.
- \`"  hello  ".strip()\` → \`"hello"\`
- \`lstrip()\` : 왼쪽만, \`rstrip()\` : 오른쪽만`,
      constraints: "1 ≤ N ≤ 10",
      initialCode: `n = int(input())
for _ in range(n):
    s = input()
    # strip()을 사용해 양쪽 공백 제거 후 출력`,
      testCases: [
        { stdin: "3\n  hello  \n world\npython   ", expectedOutput: "hello\nworld\npython", label: "기본" },
        { stdin: "1\n   spaces   ", expectedOutput: "spaces", label: "양쪽 공백" },
        { stdin: "2\nnospace\n  both  ", expectedOutput: "nospace\nboth", label: "혼합" },
      ],
      hints: [
        "s.strip()은 문자열 양쪽의 공백을 제거합니다.",
        "print(s.strip())으로 바로 출력할 수 있어요.",
      ],
      solutionCode: `n = int(input())
for _ in range(n):
    s = input()
    print(s.strip())`,
      solutionExplanation: "s.strip()은 문자열 양쪽의 공백 문자(스페이스, 탭, 줄바꿈)를 모두 제거합니다. lstrip()은 왼쪽만, rstrip()은 오른쪽만 제거합니다.",
      language: "python",
      en: {
        title: "Remove Whitespace (strip)",
        description: `Given N strings, remove the whitespace from both sides of each string using **strip()** and print.\n\n**strip()** — removes leading and trailing whitespace (or specified characters).\n- \`"  hello  ".strip()\` → \`"hello"\`\n- \`lstrip()\`: left only, \`rstrip()\`: right only`,
        constraints: "1 ≤ N ≤ 10",
        hints: [
          "s.strip() removes whitespace from both ends of the string.",
          "You can print directly: print(s.strip())",
        ],
        solutionExplanation: "s.strip() removes all whitespace (spaces, tabs, newlines) from both ends. lstrip() removes only from the left, rstrip() only from the right.",
      },
    },
    // ── replace ───────────────────────────────────────────────────
    {
      id: "pystr-RP01",
      cluster: "py-strings",
      unlockAfter: "6",
      difficulty: "쉬움",
      title: "문자 바꾸기 (replace)",
      description: `문자열 S와 바꿀 문자 A, 바뀔 문자 B가 주어집니다. **replace()를 사용해** S에서 A를 모두 B로 바꿔 출력하세요.

**replace()** — \`s.replace(old, new)\` : old를 모두 new로 교체합니다.
- \`"banana".replace("a", "o")\` → \`"bonono"\``,
      constraints: "S 길이 ≤ 100",
      initialCode: `s = input()
a = input()
b = input()
# replace()를 사용해 a를 b로 교체 후 출력`,
      testCases: [
        { stdin: "banana\na\no", expectedOutput: "bonono", label: "기본" },
        { stdin: "hello world\no\n0", expectedOutput: "hell0 w0rld", label: "다중 교체" },
        { stdin: "python\nz\nZ", expectedOutput: "python", label: "없는 문자" },
        { stdin: "aaa\na\nbb", expectedOutput: "bbbbbb", label: "길이 변화" },
      ],
      hints: [
        "s.replace(a, b)는 s에서 a를 모두 b로 바꾼 새 문자열을 반환합니다.",
        "replace()는 원본 문자열을 바꾸지 않으므로 결과를 출력하거나 변수에 저장하세요.",
      ],
      solutionCode: `s = input()
a = input()
b = input()
print(s.replace(a, b))`,
      solutionExplanation: "s.replace(a, b)는 문자열 s에서 a를 모두 b로 교체한 새 문자열을 반환합니다. 파이썬 문자열은 불변(immutable)이므로 원본은 바뀌지 않습니다.",
      language: "python",
      en: {
        title: "Replace Characters (replace)",
        description: `Given string S, character A, and character B, use **replace()** to replace all occurrences of A with B in S.\n\n**replace()** — \`s.replace(old, new)\`: replaces all occurrences of old with new.\n- \`"banana".replace("a", "o")\` → \`"bonono"\``,
        constraints: "Length of S ≤ 100",
        hints: [
          "s.replace(a, b) returns a new string with all occurrences of a replaced by b.",
          "replace() doesn't modify the original string — print the result or store it in a variable.",
        ],
        solutionExplanation: "s.replace(a, b) returns a new string with all a replaced by b. Python strings are immutable, so the original is unchanged.",
      },
    },
    // ── find ──────────────────────────────────────────────────────
    {
      id: "pystr-FD01",
      cluster: "py-strings",
      unlockAfter: "6",
      difficulty: "쉬움",
      title: "위치 찾기 (find)",
      description: `문자열 S와 찾을 문자열 T가 주어집니다. **find()를 사용해** T가 S에서 처음 등장하는 위치(인덱스)를 출력하세요. 없으면 \`-1\`을 출력합니다.

**find()** — \`s.find(t)\` : t의 첫 등장 위치(0-based) 반환. 없으면 **-1** 반환.
- \`"hello".find("ll")\` → \`2\`
- \`"hello".find("z")\` → \`-1\``,
      constraints: "S 길이 ≤ 100, T 길이 ≥ 1",
      initialCode: `s = input()
t = input()
# find()를 사용해 t의 위치 출력`,
      testCases: [
        { stdin: "hello\nll", expectedOutput: "2", label: "기본" },
        { stdin: "python\nz", expectedOutput: "-1", label: "없는 경우" },
        { stdin: "banana\nan", expectedOutput: "1", label: "첫 등장" },
        { stdin: "abcabc\nabc", expectedOutput: "0", label: "시작" },
      ],
      hints: [
        "s.find(t)는 t의 첫 등장 위치를 반환합니다. 없으면 -1.",
        "find()와 index()의 차이: find()는 없을 때 -1, index()는 ValueError 발생.",
      ],
      solutionCode: `s = input()
t = input()
print(s.find(t))`,
      solutionExplanation: "s.find(t)는 t의 첫 번째 등장 위치(0-based 인덱스)를 반환합니다. 없으면 -1을 반환하므로 별도 예외 처리 없이 안전하게 사용할 수 있습니다.",
      language: "python",
      en: {
        title: "Find Position (find)",
        description: `Given string S and search string T, use **find()** to print the index of T's first occurrence in S. Print \`-1\` if not found.\n\n**find()** — \`s.find(t)\`: returns first occurrence index (0-based). Returns **-1** if absent.\n- \`"hello".find("ll")\` → \`2\`\n- \`"hello".find("z")\` → \`-1\``,
        constraints: "Length of S ≤ 100, length of T ≥ 1",
        hints: [
          "s.find(t) returns the first occurrence index. Returns -1 if not found.",
          "Difference between find() and index(): find() returns -1 when absent, index() raises ValueError.",
        ],
        solutionExplanation: "s.find(t) returns the 0-based index of t's first occurrence. Returning -1 when absent makes it safe to use without exception handling.",
      },
    },
    {
      id: "pystr-002",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "쉬움",
      title: "모음 개수 세기",
      description: `한 줄의 문자열이 주어집니다.
영소문자 모음(a, e, i, o, u)의 개수를 출력하세요. 대소문자 구분 없이 셉니다.`,
      constraints: "1 ≤ 문자열 길이 ≤ 1000",
      initialCode: `s = input()

# 모음(a, e, i, o, u) 개수를 세세요 (대소문자 무시)
`,
      testCases: [
        { stdin: "hello", expectedOutput: "2", label: "기본 (e, o)" },
        { stdin: "AEIOU", expectedOutput: "5", label: "대문자 모음" },
        { stdin: "bcdfg", expectedOutput: "0", label: "모음 없음" },
        { stdin: "Python Programming", expectedOutput: "4", label: "단어 포함" },
      ],
      hints: [
        "s.lower()로 소문자로 변환한 후 각 문자가 'aeiou'에 있는지 확인하세요.",
        "sum(1 for c in s.lower() if c in 'aeiou')",
      ],
      solutionCode: `s = input()
print(sum(1 for c in s.lower() if c in 'aeiou'))`,
      solutionExplanation: "lower()로 대소문자를 통일하고, 'aeiou' 문자열 멤버십 검사로 모음을 셉니다.",
      en: {
        title: "Count Vowels",
        description: `Given a string on one line, count the number of English vowels (a, e, i, o, u), case-insensitive.`,
        constraints: "1 ≤ string length ≤ 1000",
        hints: [
          "Convert to lowercase with s.lower(), then check each character against 'aeiou'.",
          "sum(1 for c in s.lower() if c in 'aeiou')",
        ],
        solutionExplanation: "lower() normalizes case, then membership testing against 'aeiou' counts the vowels.",
      },
      language: "python",
    },
    {
      id: "pystr-003",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "쉬움",
      title: "팰린드롬 판별",
      description: `한 줄에 영소문자로만 이루어진 단어가 주어집니다.
앞으로 읽어도 뒤로 읽어도 같으면 "Yes", 아니면 "No"를 출력하세요.`,
      constraints: "1 ≤ 단어 길이 ≤ 1000",
      initialCode: `word = input()

# 팰린드롬이면 Yes, 아니면 No를 출력하세요
`,
      testCases: [
        { stdin: "racecar", expectedOutput: "Yes", label: "팰린드롬" },
        { stdin: "hello", expectedOutput: "No", label: "아님" },
        { stdin: "a", expectedOutput: "Yes", label: "길이 1" },
        { stdin: "abba", expectedOutput: "Yes", label: "짝수 길이" },
      ],
      hints: [
        "word == word[::-1] 비교로 팰린드롬을 판별할 수 있습니다.",
        "또는 앞뒤를 투 포인터로 하나씩 비교하는 방법도 있습니다.",
      ],
      solutionCode: `word = input()
print("Yes" if word == word[::-1] else "No")`,
      solutionExplanation: "슬라이싱 [::-1]로 역순 문자열을 만들어 원본과 비교합니다.",
      en: {
        title: "Palindrome Check",
        description: `Given a word made up of lowercase English letters, print "Yes" if it reads the same forwards and backwards, otherwise print "No".`,
        constraints: "1 ≤ word length ≤ 1000",
        hints: [
          "Compare word == word[::-1] to check for a palindrome.",
          "Or use a two-pointer approach comparing characters from both ends one by one.",
        ],
        solutionExplanation: "Slicing [::-1] creates the reversed string; comparing it to the original determines whether it's a palindrome.",
      },
      language: "python",
    },
    {
      id: "pystr-004",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "쉬움",
      title: "가장 많이 나온 단어",
      description: `한 줄의 문장이 주어집니다.
가장 많이 나온 단어를 출력하세요. 빈도가 같으면 알파벳 순서가 앞선 단어를 출력합니다.
모든 단어는 소문자입니다.`,
      constraints: "1 ≤ 단어 수 ≤ 1000",
      initialCode: `sentence = input()
words = sentence.split()

# 가장 많이 나온 단어를 출력하세요
# 동수일 때는 알파벳 순서가 앞선 단어
`,
      testCases: [
        { stdin: "the cat sat on the mat the", expectedOutput: "the", label: "the 3번" },
        { stdin: "apple banana apple banana cherry", expectedOutput: "apple", label: "동수, apple이 앞" },
        { stdin: "hello", expectedOutput: "hello", label: "단어 하나" },
        { stdin: "a b c d", expectedOutput: "a", label: "모두 동수, a가 앞" },
      ],
      hints: [
        "딕셔너리로 각 단어의 빈도를 셉니다.",
        "max(freq, key=lambda w: (freq[w], -ord(w[0])))는 복잡합니다. 대신 max(freq, key=lambda w: (freq[w], [-ord(c) for c in w])) 보다 sorted 사용이 명확합니다.",
        "freq 딕셔너리 생성 후 sorted(freq.keys())로 알파벳 정렬, 그 중 max 빈도를 찾으면 동수 시 알파벳 앞 단어가 선택됩니다.",
      ],
      solutionCode: `sentence = input()
words = sentence.split()
freq = {}
for w in words:
    freq[w] = freq.get(w, 0) + 1
# 알파벳 순 정렬 후 최대 빈도 단어 선택 (동수면 알파벳 앞이 유지됨)
best = sorted(freq.keys())[0]
for w in sorted(freq.keys()):
    if freq[w] > freq[best]:
        best = w
print(best)`,
      solutionExplanation: "알파벳 순으로 정렬된 키를 순회하며 빈도가 더 높은 경우에만 갱신하면, 동수일 때 알파벳 앞선 단어가 유지됩니다.",
      en: {
        title: "Most Frequent Word",
        description: `Given a sentence on one line, print the most frequently occurring word. If there is a tie, print the word that comes first alphabetically.
All words are lowercase.`,
        constraints: "1 ≤ number of words ≤ 1000",
        hints: [
          "Use a dictionary to count the frequency of each word.",
          "After building the frequency dict, iterate over sorted keys and update the best word only when the frequency is strictly higher — ties preserve the alphabetically earlier word.",
          "Create the freq dict, then use sorted(freq.keys()) and find the max-frequency entry.",
        ],
        solutionExplanation: "Iterating over alphabetically sorted keys and only updating when frequency is strictly higher ensures that ties keep the alphabetically earlier word.",
      },
      language: "python",
    },
    {
      id: "pystr-005",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "보통",
      title: "카멜케이스 변환",
      description: `snake_case로 작성된 식별자가 한 줄로 주어집니다.
camelCase 형식으로 변환해 출력하세요. 첫 단어는 소문자로 시작합니다.`,
      constraints: "1 ≤ 단어 수 ≤ 20, 언더스코어(_)로 구분",
      initialCode: `s = input()

# snake_case를 camelCase로 변환하세요
# 예: "hello_world_foo" → "helloWorldFoo"
`,
      testCases: [
        { stdin: "hello_world", expectedOutput: "helloWorld", label: "기본" },
        { stdin: "get_user_name", expectedOutput: "getUserName", label: "세 단어" },
        { stdin: "simple", expectedOutput: "simple", label: "언더스코어 없음" },
        { stdin: "my_var_x", expectedOutput: "myVarX", label: "단일 문자 단어" },
      ],
      hints: [
        "split('_')으로 단어를 나누고, 첫 번째 단어 제외 나머지는 capitalize()로 첫 글자를 대문자로 변환하세요.",
        "parts = s.split('_'); result = parts[0] + ''.join(p.capitalize() for p in parts[1:])",
      ],
      solutionCode: `s = input()
parts = s.split('_')
result = parts[0] + ''.join(p.capitalize() for p in parts[1:])
print(result)`,
      solutionExplanation: "첫 단어는 그대로 두고, 나머지 단어들은 capitalize()로 첫 글자를 대문자로 만든 후 이어붙입니다.",
      en: {
        title: "snake_case to camelCase",
        description: `Given a snake_case identifier on one line, convert it to camelCase and print the result. The first word starts with a lowercase letter.`,
        constraints: "1 ≤ number of words ≤ 20, words separated by underscores (_)",
        hints: [
          "Use split('_') to split by underscore, leave the first part as-is, and capitalize() all remaining parts.",
          "parts = s.split('_'); result = parts[0] + ''.join(p.capitalize() for p in parts[1:])",
        ],
        solutionExplanation: "Keep the first word unchanged and capitalize the first letter of each subsequent word using capitalize(), then concatenate.",
      },
      language: "python",
    },
    {
      id: "pystr-006",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "보통",
      title: "문자열 압축 (RLE)",
      description: `영문자로 이루어진 문자열이 한 줄로 주어집니다.
연속된 같은 문자를 "문자횟수" 형식으로 압축하세요. 횟수가 1이면 숫자를 생략합니다.`,
      constraints: "1 ≤ 문자열 길이 ≤ 1000, 영소문자만 포함",
      initialCode: `s = input()

# Run-Length Encoding으로 문자열을 압축하세요
# 예: "aaabbbcc" → "a3b3c2"
# 예: "abcd" → "abcd" (1개는 숫자 생략)
`,
      testCases: [
        { stdin: "aaabbbcc", expectedOutput: "a3b3c2", label: "기본" },
        { stdin: "abcd", expectedOutput: "abcd", label: "모두 1개" },
        { stdin: "aaaaaa", expectedOutput: "a6", label: "단일 문자 반복" },
        { stdin: "aabbcc", expectedOutput: "a2b2c2", label: "각 2개" },
      ],
      hints: [
        "현재 문자와 이전 문자를 비교하며 연속 횟수를 셉니다.",
        "문자가 바뀌거나 끝에 도달했을 때 결과에 추가하세요. 횟수가 1이면 문자만, 아니면 문자+횟수를 이어붙입니다.",
      ],
      solutionCode: `s = input()
result = []
i = 0
while i < len(s):
    char = s[i]
    cnt = 1
    while i + cnt < len(s) and s[i + cnt] == char:
        cnt += 1
    if cnt == 1:
        result.append(char)
    else:
        result.append(f"{char}{cnt}")
    i += cnt
print(''.join(result))`,
      solutionExplanation: "연속 구간을 세는 두 포인터 패턴입니다. 내부 while로 같은 문자가 얼마나 이어지는지 확인합니다.",
      en: {
        title: "String Compression (RLE)",
        description: `Given a string of English letters on one line, compress consecutive identical characters using the format "character+count". If the count is 1, omit the number.`,
        constraints: "1 ≤ string length ≤ 1000, lowercase English letters only",
        hints: [
          "Compare the current character to the previous one and count consecutive runs.",
          "When the character changes or the end is reached, append to the result. If count is 1, append just the character; otherwise append character+count.",
        ],
        solutionExplanation: "A two-pointer pattern counts consecutive runs. The inner while checks how far the same character extends.",
      },
      language: "python",
    },
    {
      id: "pystr-007",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "보통",
      title: "아나그램 판별",
      description: `두 줄에 걸쳐 영소문자 단어가 하나씩 주어집니다.
두 단어가 아나그램(같은 문자들로 구성)이면 "Yes", 아니면 "No"를 출력하세요.`,
      constraints: "1 ≤ 단어 길이 ≤ 1000",
      initialCode: `a = input()
b = input()

# 두 단어가 아나그램인지 판별하세요
# 아나그램: 글자를 재배열하면 다른 단어가 됨
`,
      testCases: [
        { stdin: "listen\nsilent", expectedOutput: "Yes", label: "고전적 아나그램" },
        { stdin: "hello\nworld", expectedOutput: "No", label: "아님" },
        { stdin: "abc\nabc", expectedOutput: "Yes", label: "동일 단어" },
        { stdin: "ab\nabc", expectedOutput: "No", label: "길이 다름" },
      ],
      hints: [
        "두 단어를 정렬한 결과가 같으면 아나그램입니다.",
        "sorted(a) == sorted(b) 로 간단히 판별 가능합니다.",
      ],
      solutionCode: `a = input()
b = input()
print("Yes" if sorted(a) == sorted(b) else "No")`,
      solutionExplanation: "문자를 정렬하면 아나그램끼리는 동일한 결과가 나옵니다. O(N log N)으로 간단합니다.",
      en: {
        title: "Anagram Check",
        description: `Given two lowercase words on separate lines, print "Yes" if they are anagrams (made of the same characters), otherwise print "No".`,
        constraints: "1 ≤ word length ≤ 1000",
        hints: [
          "Sorting both words and comparing gives the same result for anagrams.",
          "sorted(a) == sorted(b) is a simple one-liner check.",
        ],
        solutionExplanation: "Sorting both strings yields identical results for anagrams. Simple and runs in O(N log N).",
      },
      language: "python",
    },
    {
      id: "pystr-008",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "보통",
      title: "숫자 추출 및 합산",
      description: `영문자, 공백, 숫자가 혼합된 문자열이 한 줄로 주어집니다.
문자열에서 등장하는 모든 정수(연속된 숫자들)를 추출해 합산한 결과를 출력하세요.`,
      constraints: "1 ≤ 문자열 길이 ≤ 1000, 음수는 없음",
      initialCode: `s = input()

# 문자열에서 숫자(연속된 digit)만 추출해 합산하세요
# 예: "abc12def34" → 12 + 34 = 46
`,
      testCases: [
        { stdin: "abc12def34", expectedOutput: "46", label: "기본" },
        { stdin: "no numbers here", expectedOutput: "0", label: "숫자 없음" },
        { stdin: "100abc200", expectedOutput: "300", label: "앞뒤 숫자" },
        { stdin: "a1b2c3d4", expectedOutput: "10", label: "각 1자리" },
      ],
      hints: [
        "re 모듈의 findall 또는 직접 구현: 연속된 숫자를 하나의 수로 파싱하세요.",
        "import re; sum(int(x) for x in re.findall(r'\\d+', s))",
      ],
      solutionCode: `import re
s = input()
numbers = re.findall(r'\\d+', s)
print(sum(int(x) for x in numbers))`,
      solutionExplanation: "정규식 \\d+로 연속된 숫자 그룹을 모두 찾아 정수로 변환 후 합산합니다.",
      en: {
        title: "Extract and Sum Numbers",
        description: `Given a string of mixed letters, spaces, and digits on one line, extract all integers (groups of consecutive digits) and print their sum.`,
        constraints: "1 ≤ string length ≤ 1000, no negative numbers",
        hints: [
          "Use re.findall or implement manually: parse consecutive digit characters as one number.",
          "import re; sum(int(x) for x in re.findall(r'\\d+', s))",
        ],
        solutionExplanation: "The regex \\d+ finds all consecutive digit groups, which are converted to integers and summed.",
      },
      language: "python",
    },
    {
      id: "pystr-009",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "어려움",
      title: "괄호 유효성 검사",
      description: `괄호로만 이루어진 문자열이 한 줄로 주어집니다. '(', ')', '[', ']', '{', '}'가 포함될 수 있습니다.
괄호가 올바르게 열리고 닫혔으면 "Valid", 아니면 "Invalid"를 출력하세요.`,
      constraints: "1 ≤ 문자열 길이 ≤ 10000",
      initialCode: `s = input()

# 스택을 사용해 괄호 유효성을 검사하세요
# 열린 괄호는 스택에 push, 닫힌 괄호는 스택 top과 매칭 확인
`,
      testCases: [
        { stdin: "([]{})", expectedOutput: "Valid", label: "중첩 올바름" },
        { stdin: "([)]", expectedOutput: "Invalid", label: "교차 중첩" },
        { stdin: "(((", expectedOutput: "Invalid", label: "열린 괄호만" },
        { stdin: "{[()]}", expectedOutput: "Valid", label: "복잡한 중첩" },
      ],
      hints: [
        "스택(리스트)을 사용하고, 열린 괄호는 push, 닫힌 괄호는 스택 top과 쌍을 이루는지 확인합니다.",
        "matching = {')': '(', ']': '[', '}': '{'}; 스택이 비어있거나 top이 매칭 안 되면 Invalid입니다.",
      ],
      solutionCode: `s = input()
stack = []
matching = {')': '(', ']': '[', '}': '{'}
valid = True
for c in s:
    if c in '([{':
        stack.append(c)
    elif c in ')]}':
        if not stack or stack[-1] != matching[c]:
            valid = False
            break
        stack.pop()
if stack:
    valid = False
print("Valid" if valid else "Invalid")`,
      solutionExplanation: "스택으로 괄호 유효성 검사: 열린 괄호를 push하고, 닫힌 괄호마다 스택 top이 쌍인지 확인합니다.",
      en: {
        title: "Bracket Validity Check",
        description: `Given a string consisting only of brackets — '(', ')', '[', ']', '{', '}' — print "Valid" if all brackets are properly matched and nested, otherwise print "Invalid".`,
        constraints: "1 ≤ string length ≤ 10000",
        hints: [
          "Use a stack (list): push opening brackets, and for closing brackets check that the top of the stack matches.",
          "matching = {')': '(', ']': '[', '}': '{'}; if the stack is empty or the top doesn't match, it's Invalid.",
        ],
        solutionExplanation: "Stack-based bracket validation: push opening brackets and for each closing bracket verify the stack top is the matching pair.",
      },
      language: "python",
    },
    {
      id: "pystr-010",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "어려움",
      title: "문자열 압축 (반복 단위)",
      description: `영소문자 문자열이 한 줄로 주어집니다.
단위 크기 1부터 절반까지 시도하여 가장 짧게 압축된 결과의 길이를 출력하세요.
압축: 단위 문자열이 연속 반복될 때 "횟수단위" 형식으로 줄임. 1번 등장하면 그대로.
예: "ababab" 단위 2 → "3ab" (길이 3), 원본 길이 6보다 짧음.`,
      constraints: "1 ≤ 문자열 길이 ≤ 1000",
      initialCode: `s = input()

# 1~len(s)//2 단위 크기를 모두 시도해 가장 짧은 압축 결과의 길이를 출력하세요
`,
      testCases: [
        { stdin: "aabbaccc", expectedOutput: "7", label: "k=1: a2b2ac3 (길이7)" },
        { stdin: "ababababab", expectedOutput: "3", label: "k=2: 5ab (길이3)" },
        { stdin: "xyzxyzxyz", expectedOutput: "4", label: "k=3: 3xyz (길이4)" },
        { stdin: "abcde", expectedOutput: "5", label: "압축 불가, 원본 길이" },
      ],
      hints: [
        "단위 크기 k에 대해 s를 k 글자씩 잘라 연속 반복 횟수를 세면서 압축 문자열을 만드세요.",
        "압축 결과 길이와 원본 길이를 비교해 가장 짧은 것을 선택합니다.",
      ],
      solutionCode: `s = input()
n = len(s)

def compress(s, k):
    result = []
    i = 0
    while i < len(s):
        unit = s[i:i+k]
        cnt = 1
        while s[i+cnt*k:i+(cnt+1)*k] == unit:
            cnt += 1
        if cnt > 1:
            result.append(str(cnt) + unit)
        else:
            result.append(unit)
        i += cnt * k
    return len(''.join(result))

best = n
for k in range(1, n // 2 + 1):
    best = min(best, compress(s, k))
print(best)`,
      solutionExplanation: "단위 크기 k마다 압축 함수를 실행해 최소 길이를 구합니다. 카카오 코딩 테스트 유형입니다.",
      en: {
        title: "String Compression (Unit Size)",
        description: `Given a lowercase string on one line, try all unit sizes from 1 to half the string length. Compress consecutive repeated units as "count+unit" (if a unit appears only once, keep it as-is). Print the length of the shortest compressed result.
Example: "ababab" with unit size 2 → "3ab" (length 3), shorter than the original length 6.`,
        constraints: "1 ≤ string length ≤ 1000",
        hints: [
          "For each unit size k, slice s into k-character chunks and count consecutive repetitions.",
          "Compare the compressed length to the original and keep the minimum.",
        ],
        solutionExplanation: "Run a compression function for each unit size k and track the minimum length. This is a classic Kakao coding test problem type.",
      },
      language: "python",
    },
    {
      id: "pystr-011",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "어려움",
      title: "로마 숫자 → 정수",
      description: `로마 숫자 문자열이 한 줄로 주어집니다.
해당 값의 정수를 출력하세요.
I=1, V=5, X=10, L=50, C=100, D=500, M=1000
작은 수가 큰 수 앞에 오면 뺍니다 (예: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900).`,
      constraints: "1 ≤ 입력값 ≤ 3999",
      initialCode: `s = input()

# 로마 숫자를 정수로 변환하세요
# 현재 값이 다음 값보다 작으면 빼고, 아니면 더합니다
`,
      testCases: [
        { stdin: "III", expectedOutput: "3", label: "기본" },
        { stdin: "XIV", expectedOutput: "14", label: "IX 포함" },
        { stdin: "MCMXCIX", expectedOutput: "1999", label: "복잡한 예" },
        { stdin: "IV", expectedOutput: "4", label: "빼기 규칙" },
      ],
      hints: [
        "오른쪽에서 왼쪽으로 읽으면서 이전 값보다 현재 값이 작으면 빼고 아니면 더하는 방법이 간단합니다.",
        "또는 왼쪽에서 읽으며 다음 문자와 비교: 다음이 더 크면 현재를 빼고, 아니면 더합니다.",
      ],
      solutionCode: `s = input()
roman = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
result = 0
for i in range(len(s)):
    if i + 1 < len(s) and roman[s[i]] < roman[s[i+1]]:
        result -= roman[s[i]]
    else:
        result += roman[s[i]]
print(result)`,
      solutionExplanation: "왼쪽에서 순회하며 다음 문자가 더 크면 현재 문자를 뺍니다. 나머지는 더합니다.",
      en: {
        title: "Roman Numerals to Integer",
        description: `Given a Roman numeral string on one line, print the corresponding integer.
I=1, V=5, X=10, L=50, C=100, D=500, M=1000
If a smaller value appears before a larger one, subtract it (e.g. IV=4, IX=9, XL=40, XC=90, CD=400, CM=900).`,
        constraints: "1 ≤ input value ≤ 3999",
        hints: [
          "Read right to left: if the current value is less than the previous one, subtract it; otherwise add it.",
          "Or read left to right: if the next character has a greater value, subtract the current character.",
        ],
        solutionExplanation: "Traverse left to right: if the next character's value is greater, subtract the current character. Otherwise add it.",
      },
      language: "python",
    },
    {
      id: "pystr-012",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "어려움",
      title: "CSV 파싱",
      description: `첫 줄에 정수 N과 열 번호 K(0-based)가 공백으로 주어집니다.
이어서 N줄의 CSV 데이터가 주어집니다 (각 줄은 쉼표로 구분된 숫자들).
K번째 열의 숫자들의 합을 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ K < 열 수",
      initialCode: `n, k = map(int, input().split())

# N줄의 CSV를 읽고 K번째 열(0-based)의 합을 출력하세요
`,
      testCases: [
        { stdin: "3 1\n1,2,3\n4,5,6\n7,8,9", expectedOutput: "15", label: "열 1 합 (2+5+8)" },
        { stdin: "2 0\n10,20\n30,40", expectedOutput: "40", label: "첫 번째 열" },
        { stdin: "4 2\n1,2,3\n4,5,6\n7,8,9\n10,11,12", expectedOutput: "30", label: "세 번째 열 (3+6+9+12)" },
        { stdin: "1 0\n100,200,300", expectedOutput: "100", label: "N=1" },
      ],
      hints: [
        "각 줄을 split(',')으로 나누면 CSV 컬럼을 얻습니다.",
        "total = sum(int(input().split(',')[k]) for _ in range(n))",
      ],
      solutionCode: `n, k = map(int, input().split())
total = 0
for _ in range(n):
    row = input().split(',')
    total += int(row[k])
print(total)`,
      solutionExplanation: "split(',')으로 CSV를 파싱하고 k번째 인덱스를 정수로 변환해 합산합니다.",
      en: {
        title: "CSV Parsing",
        description: `The first line gives two integers N and K (0-based column index). The following N lines are CSV data (each line has numbers separated by commas). Print the sum of the K-th column.`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ K < number of columns",
        hints: [
          "Use split(',') on each line to parse the CSV columns.",
          "total = sum(int(input().split(',')[k]) for _ in range(n))",
        ],
        solutionExplanation: "split(',') parses each CSV row, then index k is converted to an integer and summed.",
      },
      language: "python",
    },
    {
      id: "pystr-c01",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "어려움",
      title: "비밀번호 강도 검사",
      description: `비밀번호 문자열이 한 줄로 주어집니다.
다음 4가지 조건을 몇 개 만족하는지 세어 강도를 출력하세요.

조건:
1. 길이가 8 이상
2. 영대문자(A-Z) 포함
3. 숫자(0-9) 포함
4. 특수문자(@, #, $, ! 중 하나) 포함

- 4개 모두: "Strong"
- 3개: "Medium"
- 2개 이하: "Weak"`,
      constraints: "1 ≤ 비밀번호 길이 ≤ 50, 영문자/숫자/특수문자로 구성",
      initialCode: `p = input()
score = 0

# 조건 1: 길이 8 이상
# 조건 2: 대문자 포함 — any(c.isupper() for c in p)
# 조건 3: 숫자 포함 — any(c.isdigit() for c in p)
# 조건 4: 특수문자(@#$!) 포함

# score에 따라 Strong / Medium / Weak 출력
`,
      testCases: [
        { stdin: "Hello@123", expectedOutput: "Strong", label: "모두 충족" },
        { stdin: "Hello@1", expectedOutput: "Medium", label: "길이 미달" },
        { stdin: "hello123", expectedOutput: "Weak", label: "대문자·특수문자 없음" },
        { stdin: "Pass#1", expectedOutput: "Medium", label: "길이 미달" },
      ],
      hints: [
        "any(c.isupper() for c in p) — 대문자 포함 여부를 확인합니다.",
        "any(c in '@#$!' for c in p) — 특수문자 포함 여부를 확인합니다.",
        "조건마다 if 로 score += 1 하고, 마지막에 score 값에 따라 출력하세요.",
      ],
      solutionCode: `p = input()
score = 0
if len(p) >= 8:
    score += 1
if any(c.isupper() for c in p):
    score += 1
if any(c.isdigit() for c in p):
    score += 1
if any(c in '@#$!' for c in p):
    score += 1
if score == 4:
    print("Strong")
elif score == 3:
    print("Medium")
else:
    print("Weak")`,
      solutionExplanation: "any()는 시퀀스 중 하나라도 True이면 True를 반환합니다. 4가지 조건을 각각 검사해 score를 누적하고, 마지막에 score에 따라 강도를 출력합니다.",
      en: {
        title: "Password Strength Checker",
        description: `Given a password string, count how many of the following 4 conditions it satisfies and print its strength.\n\nConditions:\n1. Length ≥ 8\n2. Contains an uppercase letter (A–Z)\n3. Contains a digit (0–9)\n4. Contains a special character (@, #, $, or !)\n\n- All 4: "Strong"\n- Exactly 3: "Medium"\n- 2 or fewer: "Weak"`,
        constraints: "1 ≤ password length ≤ 50, consists of letters, digits, and special characters",
        hints: [
          "any(c.isupper() for c in p) — checks if any character is uppercase.",
          "any(c in '@#$!' for c in p) — checks if any character is a special character.",
          "Use if to increment score for each condition, then print based on the final score.",
        ],
        solutionExplanation: "any() returns True if at least one element in the iterable is True. Check all 4 conditions independently, accumulate the score, then print the strength based on the final score.",
      },
      language: "python",
    },
    {
      id: "pystr-c02",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "어려움",
      title: "카이사르 암호",
      description: `첫 줄에 평문 텍스트, 둘째 줄에 이동 칸 수 N(0~25)이 주어집니다.
각 영문자를 알파벳 순서에서 N칸 앞으로 이동하여 암호화하세요.
- 소문자는 소문자로, 대문자는 대문자로 유지합니다.
- z → a (또는 Z → A)로 순환합니다.
- 영문자가 아닌 문자(공백, 숫자 등)는 그대로 출력합니다.`,
      constraints: "1 ≤ 텍스트 길이 ≤ 1000, 0 ≤ N ≤ 25",
      initialCode: `text = input()
n = int(input())
result = []

for c in text:
    if c.isalpha():
        # 대소문자에 따라 base(기준 문자) 설정
        base = ord('A') if c.isupper() else ord('a')
        # (현재 위치 + N) % 26 으로 새 위치 계산
        # 여기에 코드를 작성하세요
    else:
        result.append(c)

print(''.join(result))
`,
      testCases: [
        { stdin: "Hello World\n3", expectedOutput: "Khoor Zruog", label: "기본" },
        { stdin: "abc\n1", expectedOutput: "bcd", label: "소문자 이동" },
        { stdin: "xyz\n3", expectedOutput: "abc", label: "순환 (z→a)" },
        { stdin: "Python3!\n13", expectedOutput: "Clguba3!", label: "ROT13" },
      ],
      hints: [
        "ord(c)로 문자의 아스키 코드를 얻습니다. chr(code)로 다시 문자로 변환합니다.",
        "새 코드: (ord(c) - base + n) % 26 + base",
        "대문자면 base = ord('A') = 65, 소문자면 base = ord('a') = 97",
      ],
      solutionCode: `text = input()
n = int(input())
result = []
for c in text:
    if c.isalpha():
        base = ord('A') if c.isupper() else ord('a')
        shifted = (ord(c) - base + n) % 26 + base
        result.append(chr(shifted))
    else:
        result.append(c)
print(''.join(result))`,
      solutionExplanation: "각 문자를 base(65 또는 97)에서의 상대적 위치로 변환하고 N을 더한 뒤 26으로 나머지를 취해 순환을 처리합니다. chr()로 다시 문자로 변환합니다.",
      en: {
        title: "Caesar Cipher",
        description: `Given a text string on the first line and a shift N (0–25) on the second line, encrypt the text by shifting each letter N positions forward in the alphabet.\n- Lowercase stays lowercase, uppercase stays uppercase.\n- Wraps around: z → a, Z → A.\n- Non-letter characters (spaces, digits, etc.) are unchanged.`,
        constraints: "1 ≤ text length ≤ 1000, 0 ≤ N ≤ 25",
        hints: [
          "Use ord(c) to get the ASCII code and chr(code) to convert back to a character.",
          "New code: (ord(c) - base + n) % 26 + base",
          "For uppercase use base = ord('A') = 65; for lowercase use base = ord('a') = 97.",
        ],
        solutionExplanation: "Convert each character to its position relative to base (65 or 97), add N, take mod 26 to handle wrap-around, then convert back with chr().",
      },
      language: "python",
    },
    {
      id: "pystr-c03",
      cluster: "py-strings",
      unlockAfter: "18",
      difficulty: "어려움",
      title: "문자열 템플릿 치환",
      description: `첫 줄에 템플릿 문자열이 주어지고, 둘째 줄에 치환 수 N이 주어집니다.
이어서 N줄에 걸쳐 "키 값" 형식으로 치환 규칙이 주어집니다.

템플릿에서 {키} 형식의 모든 부분을 해당 값으로 치환하여 출력하세요.
같은 키가 여러 번 등장하면 모두 치환합니다.`,
      constraints: "1 ≤ N ≤ 10, 템플릿 길이 ≤ 200, 키는 영문자로만 구성",
      initialCode: `template = input()
n = int(input())

for _ in range(n):
    parts = input().split(' ', 1)  # 첫 번째 공백으로만 분리
    key, value = parts[0], parts[1]
    # template에서 {key}를 value로 치환하세요
    # str.replace() 를 사용하세요

print(template)
`,
      testCases: [
        { stdin: "Hello {name}! You are {age} years old.\n2\nname Alice\nage 25", expectedOutput: "Hello Alice! You are 25 years old.", label: "기본" },
        { stdin: "{greeting}, {name}!\n2\ngreeting Hi\nname Bob", expectedOutput: "Hi, Bob!", label: "문장 시작" },
        { stdin: "I love {food}.\n1\nfood pizza", expectedOutput: "I love pizza.", label: "단일 치환" },
        { stdin: "{x} + {x} = {result}\n2\nx 5\nresult 10", expectedOutput: "5 + 5 = 10", label: "중복 키" },
      ],
      hints: [
        "input().split(' ', 1) 은 첫 번째 공백 기준으로만 나눕니다. (값에 공백이 있을 때 유용)",
        "template = template.replace('{' + key + '}', value) 로 치환합니다.",
        "replace()는 모든 일치하는 부분을 한 번에 교체합니다.",
      ],
      solutionCode: `template = input()
n = int(input())
for _ in range(n):
    parts = input().split(' ', 1)
    key, value = parts[0], parts[1]
    template = template.replace('{' + key + '}', value)
print(template)`,
      solutionExplanation: "split(' ', 1)은 첫 번째 공백에서만 분리해 값에 공백이 있어도 처리합니다. replace('{key}', value)는 해당 패턴의 모든 등장을 한 번에 치환합니다.",
      en: {
        title: "String Template Substitution",
        description: `Given a template string on the first line and N substitution rules (each as "key value"), replace every occurrence of {key} in the template with the corresponding value.\nIf the same key appears multiple times, all occurrences are replaced.`,
        constraints: "1 ≤ N ≤ 10, template length ≤ 200, keys consist of English letters only",
        hints: [
          "input().split(' ', 1) splits only on the first space — useful when values may contain spaces.",
          "Use template = template.replace('{' + key + '}', value) to substitute.",
          "replace() replaces all matching occurrences in one call.",
        ],
        solutionExplanation: "split(' ', 1) splits at the first space only, so values with spaces are handled correctly. replace('{key}', value) substitutes all occurrences of the pattern at once.",
      },
      language: "python",
    },
  ],
}
