import type { PracticeCluster } from "./types"

export const pyStringsCluster: PracticeCluster = {
  id: "py-strings",
  title: "문자열 조작",
  emoji: "🔤",
  description: "split/join, 슬라이싱, 문자열 메서드, 파싱",
  unlockAfter: "18",
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
      language: "python",
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
      language: "python",
    },
  ],
}
