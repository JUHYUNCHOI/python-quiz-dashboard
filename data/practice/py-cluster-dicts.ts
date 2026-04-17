import type { PracticeCluster } from "./types"

export const pyDictsCluster: PracticeCluster = {
  id: "py-dicts",
  title: "딕셔너리/셋 활용",
  emoji: "🗂️",
  description: "dict, set, 빈도수, 그루핑, 집합 연산",
  unlockAfter: "21",
  en: {
    title: "Dictionary / Set Operations",
    description: "dict, set, frequency counting, grouping, set operations",
  },
  problems: [
    {
      id: "pydict-001",
      cluster: "py-dicts",
      unlockAfter: "21",
      difficulty: "쉬움",
      title: "단어 빈도 딕셔너리",
      description: `첫 줄에 정수 N이 주어지고, 이어서 N줄에 걸쳐 단어가 하나씩 주어집니다.
각 단어의 등장 횟수를 "단어: 횟수" 형식으로 출력하세요.
출력 순서는 단어의 알파벳 오름차순입니다.`,
      constraints: "1 ≤ N ≤ 1000, 모든 단어는 영소문자",
      initialCode: `n = int(input())
words = [input() for _ in range(n)]

# 각 단어의 빈도를 딕셔너리로 집계하고 알파벳 순으로 출력하세요
# 출력 형식: "apple: 3"
`,
      testCases: [
        { stdin: "5\napple\nbanana\napple\ncherry\nbanana", expectedOutput: "apple: 2\nbanana: 2\ncherry: 1", label: "기본" },
        { stdin: "3\ncat\ncat\ncat", expectedOutput: "cat: 3", label: "모두 같음" },
        { stdin: "2\nzebra\naardvark", expectedOutput: "aardvark: 1\nzebra: 1", label: "알파벳 정렬" },
      ],
      hints: [
        "딕셔너리의 get(key, 0)으로 현재 빈도를 가져오고 +1 합니다.",
        "for word in sorted(freq): print(f'{word}: {freq[word]}')",
      ],
      solutionCode: `n = int(input())
words = [input() for _ in range(n)]
freq = {}
for w in words:
    freq[w] = freq.get(w, 0) + 1
for word in sorted(freq):
    print(f"{word}: {freq[word]}")`,
      solutionExplanation: "딕셔너리로 빈도를 집계하고 sorted()로 키를 알파벳 순 정렬해 출력합니다.",
      en: {
        title: "Word Frequency Dictionary",
        description: `Given an integer N on the first line, followed by N words one per line,
count the occurrences of each word and print them in the format "word: count".
Output in alphabetical order.`,
        constraints: "1 ≤ N ≤ 1000, all words are lowercase English letters",
        hints: [
          "Use freq.get(key, 0) + 1 to update the frequency of each word.",
          "for word in sorted(freq): print(f'{word}: {freq[word]}')",
        ],
        solutionExplanation: "Tally frequencies in a dictionary, then use sorted() to iterate keys in alphabetical order.",
      },
      language: "python",
    },
    {
      id: "pydict-002",
      cluster: "py-dicts",
      unlockAfter: "21",
      difficulty: "쉬움",
      title: "중복 확인",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
중복된 숫자가 하나라도 있으면 "Yes", 모두 다르면 "No"를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100000, -10^9 ≤ 각 숫자 ≤ 10^9",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 중복이 있으면 Yes, 없으면 No를 출력하세요
`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "No", label: "중복 없음" },
        { stdin: "5\n1 2 3 2 5", expectedOutput: "Yes", label: "2가 중복" },
        { stdin: "1\n42", expectedOutput: "No", label: "N=1" },
        { stdin: "3\n0 0 0", expectedOutput: "Yes", label: "모두 같음" },
      ],
      hints: [
        "set()으로 변환하면 중복이 제거됩니다. 원본 길이와 set 길이를 비교하세요.",
        "len(nums) != len(set(nums)) 이면 중복 존재",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
print("Yes" if len(nums) != len(set(nums)) else "No")`,
      solutionExplanation: "set은 중복을 허용하지 않으므로, 원본과 set 변환 후 크기 비교로 중복을 확인합니다.",
      en: {
        title: "Duplicate Check",
        description: `Given an integer N on the first line and N integers separated by spaces on the second line,
print "Yes" if there is any duplicate number, or "No" if all numbers are distinct.`,
        constraints: "1 ≤ N ≤ 100000, -10^9 ≤ each number ≤ 10^9",
        hints: [
          "Converting to a set removes duplicates. Compare the original length with the set length.",
          "len(nums) != len(set(nums)) means there is a duplicate.",
        ],
        solutionExplanation: "Since sets do not allow duplicates, comparing the size of the original list and the converted set reveals whether duplicates exist.",
      },
      language: "python",
    },
    {
      id: "pydict-003",
      cluster: "py-dicts",
      unlockAfter: "21",
      difficulty: "쉬움",
      title: "두 집합 연산",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 집합 A의 N개 정수가 공백으로 구분되어 주어집니다.
셋째 줄에 정수 M이 주어지고, 넷째 줄에 집합 B의 M개 정수가 공백으로 구분되어 주어집니다.
합집합 크기와 교집합 크기를 공백으로 구분해 한 줄에 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 1000",
      initialCode: `n = int(input())
a = set(map(int, input().split()))
m = int(input())
b = set(map(int, input().split()))

# 합집합 크기와 교집합 크기를 출력하세요
`,
      testCases: [
        { stdin: "3\n1 2 3\n3\n2 3 4", expectedOutput: "4 2", label: "기본" },
        { stdin: "2\n1 2\n2\n3 4", expectedOutput: "4 0", label: "교집합 없음" },
        { stdin: "3\n1 2 3\n3\n1 2 3", expectedOutput: "3 3", label: "완전 일치" },
        { stdin: "1\n5\n1\n5", expectedOutput: "1 1", label: "하나씩 동일" },
      ],
      hints: [
        "| 연산자는 합집합, & 연산자는 교집합입니다.",
        "print(len(a | b), len(a & b))",
      ],
      solutionCode: `n = int(input())
a = set(map(int, input().split()))
m = int(input())
b = set(map(int, input().split()))
print(len(a | b), len(a & b))`,
      solutionExplanation: "파이썬 set의 | (합집합), & (교집합) 연산자로 간결하게 처리합니다.",
      en: {
        title: "Two Set Operations",
        description: `Given set A (N integers) and set B (M integers),
print the size of the union and the size of the intersection separated by a space on one line.`,
        constraints: "1 ≤ N, M ≤ 1000",
        hints: [
          "The | operator is union, the & operator is intersection.",
          "print(len(a | b), len(a & b))",
        ],
        solutionExplanation: "Python's set | (union) and & (intersection) operators handle this concisely.",
      },
      language: "python",
    },
    {
      id: "pydict-004",
      cluster: "py-dicts",
      unlockAfter: "21",
      difficulty: "쉬움",
      title: "최빈값",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
가장 많이 나온 수(최빈값)를 출력하세요. 빈도가 같은 수가 여럿이면 가장 작은 수를 출력합니다.`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ 각 숫자 ≤ 10000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 최빈값을 구하세요 (동수면 더 작은 수)
`,
      testCases: [
        { stdin: "5\n1 2 2 3 3", expectedOutput: "2", label: "동수일 때 작은 수" },
        { stdin: "4\n4 4 4 1", expectedOutput: "4", label: "명확한 최빈값" },
        { stdin: "3\n7 7 7", expectedOutput: "7", label: "모두 같음" },
        { stdin: "5\n1 2 3 4 5", expectedOutput: "1", label: "모두 빈도 1, 가장 작은 수" },
      ],
      hints: [
        "딕셔너리로 빈도를 집계한 후, (-빈도, 값) 튜플 리스트를 만들어 정렬하세요.",
        "sorted([(-v, k) for k, v in freq.items()])[0][1]  # 튜플은 앞 요소부터 자동 비교됨",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
freq = {}
for x in nums:
    freq[x] = freq.get(x, 0) + 1
# (-빈도, 값) 튜플로 만들어 오름차순 정렬
# → 빈도가 높을수록(-빈도가 작을수록) 앞, 동수면 값이 작을수록 앞
pairs = sorted([(-v, k) for k, v in freq.items()])
best = pairs[0][1]
print(best)`,
      solutionExplanation: "(-빈도, 값) 튜플을 만들어 오름차순 정렬하면, 빈도가 높을수록(-빈도가 작음) 앞에 오고, 동수면 값이 작은 것이 앞에 옵니다. 튜플은 앞 요소부터 차례로 비교하므로 이 방식으로 복합 정렬이 가능합니다.",
      en: {
        title: "Mode (Most Frequent Value)",
        description: `Given N integers, find the most frequently occurring number (mode).
If multiple numbers share the highest frequency, output the smallest one.`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ each number ≤ 10000",
        hints: [
          "Build a frequency dictionary, then build a list of (-count, value) tuples and sort it.",
          "sorted([(-v, k) for k, v in freq.items()])[0][1]  # tuples compare element-by-element",
        ],
        solutionExplanation: "Build (-count, value) tuples and sort ascending. The highest count comes first (because -count is smallest), and ties break on the smaller value. Tuples compare element-by-element, so this gives a compound sort without a key function.",
      },
      language: "python",
    },
    {
      id: "pydict-005",
      cluster: "py-dicts",
      unlockAfter: "21",
      difficulty: "보통",
      title: "전화번호부",
      description: `첫 줄에 정수 N과 M이 주어집니다.
이어서 N줄에 걸쳐 "이름 번호" 형식으로 전화번호부 데이터가 주어집니다.
그 다음 M줄에 걸쳐 검색할 이름이 주어집니다.
각 이름에 대해 번호가 있으면 번호를, 없으면 "없음"을 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 10000, 이름은 영소문자",
      initialCode: `n, m = map(int, input().split())
phonebook = {}
for _ in range(n):
    name, number = input().split()
    # 딕셔너리에 저장하세요

for _ in range(m):
    name = input()
    # 검색 결과를 출력하세요
`,
      testCases: [
        { stdin: "3 2\nalice 010-1234\nbob 010-5678\ncharlie 010-9999\nalice\ndave", expectedOutput: "010-1234\n없음", label: "기본" },
        { stdin: "1 1\ntest 123\ntest", expectedOutput: "123", label: "단순" },
        { stdin: "2 3\nann 111\nbob 222\nbob\nann\ncharlie", expectedOutput: "222\n111\n없음", label: "순서 섞임" },
      ],
      hints: [
        "딕셔너리 phonebook[name] = number 로 저장합니다.",
        "phonebook.get(name, '없음') 으로 없는 경우 기본값을 반환합니다.",
      ],
      solutionCode: `n, m = map(int, input().split())
phonebook = {}
for _ in range(n):
    line = input().split()
    phonebook[line[0]] = line[1]
for _ in range(m):
    name = input()
    print(phonebook.get(name, "없음"))`,
      solutionExplanation: "딕셔너리 get(key, default)은 키가 없을 때 기본값을 반환하므로 없음 처리가 한 줄로 가능합니다.",
      en: {
        title: "Phone Book",
        description: `Given N contact entries in the format "name number", then M search queries,
print the phone number for each name, or "없음" if not found.`,
        constraints: "1 ≤ N, M ≤ 10000, names are lowercase English letters",
        hints: [
          "Store entries as phonebook[name] = number.",
          "Use phonebook.get(name, '없음') to return the default value when the key is missing.",
        ],
        solutionExplanation: "dict.get(key, default) returns the default value when the key is absent, allowing the lookup and the missing-case handling in a single line.",
      },
      language: "python",
    },
    {
      id: "pydict-006",
      cluster: "py-dicts",
      unlockAfter: "21",
      difficulty: "보통",
      title: "그룹별 평균 점수",
      description: `첫 줄에 정수 N이 주어집니다. 이어서 N줄에 걸쳐 "이름 점수" 형식의 데이터가 주어집니다.
이름의 첫 글자를 기준으로 그루핑하여 각 그룹의 평균 점수를 출력하세요.
출력은 첫 글자의 알파벳 오름차순, 형식은 "글자: 평균(소수점 2자리)"입니다.`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ 점수 ≤ 100, 이름은 영소문자",
      initialCode: `n = int(input())
data = []
for _ in range(n):
    name, score = input().split()
    data.append((name, int(score)))

# 이름 첫 글자로 그루핑하여 평균 점수를 출력하세요
`,
      testCases: [
        { stdin: "4\nalice 80\nbob 70\nann 90\nbill 60", expectedOutput: "a: 85.00\nb: 65.00", label: "a/b 그룹" },
        { stdin: "3\ncat 50\ncow 70\ndog 90", expectedOutput: "c: 60.00\nd: 90.00", label: "c/d 그룹" },
        { stdin: "1\nzara 100", expectedOutput: "z: 100.00", label: "단독 그룹" },
      ],
      hints: [
        "groups = {} 딕셔너리에 첫 글자를 키, 점수 리스트를 값으로 저장하세요.",
        "for key in sorted(groups): avg = sum(groups[key]) / len(groups[key]); print(f'{key}: {avg:.2f}')",
      ],
      solutionCode: `n = int(input())
groups = {}
for _ in range(n):
    name, score = input().split()
    key = name[0]
    if key not in groups:
        groups[key] = []
    groups[key].append(int(score))
for key in sorted(groups):
    avg = sum(groups[key]) / len(groups[key])
    print(f"{key}: {avg:.2f}")`,
      solutionExplanation: "첫 글자를 키로 점수 리스트를 모은 후, 각 그룹 평균을 계산합니다.",
      en: {
        title: "Average Score by Group",
        description: `Given N entries in the format "name score", group them by the first letter of the name
and print the average score of each group.
Output in alphabetical order by first letter, formatted as "letter: average (2 decimal places)".`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ score ≤ 100, names are lowercase English letters",
        hints: [
          "Use a dictionary with the first letter as the key and a list of scores as the value.",
          "for key in sorted(groups): avg = sum(groups[key]) / len(groups[key]); print(f'{key}: {avg:.2f}')",
        ],
        solutionExplanation: "Collect score lists keyed by first letter, then compute the average for each group.",
      },
      language: "python",
    },
    {
      id: "pydict-007",
      cluster: "py-dicts",
      unlockAfter: "21",
      difficulty: "보통",
      title: "아나그램 그루핑",
      description: `첫 줄에 정수 N이 주어지고, 이어서 N줄에 걸쳐 단어가 하나씩 주어집니다.
아나그램끼리 한 줄에 공백으로 구분해 출력하세요.
각 그룹 내 단어는 입력 순서 유지, 그룹 간 정렬은 정렬된 키(sorted 문자열) 알파벳 오름차순.`,
      constraints: "1 ≤ N ≤ 1000, 모든 단어는 영소문자",
      initialCode: `n = int(input())
words = [input() for _ in range(n)]

# 아나그램끼리 그루핑해서 출력하세요
# 키: sorted(word) 문자열 → 같은 키면 같은 아나그램 그룹
`,
      testCases: [
        { stdin: "4\neat\ntea\ntan\nate", expectedOutput: "eat tea ate\ntan", label: "두 그룹" },
        { stdin: "3\nabc\nbca\ndef", expectedOutput: "abc bca\ndef", label: "2+1 그룹" },
        { stdin: "2\nhello\nworld", expectedOutput: "world\nhello", label: "아나그램 없음" },
        { stdin: "1\ncat", expectedOutput: "cat", label: "단어 하나" },
      ],
      hints: [
        "''.join(sorted(word)) 를 키로 사용해 그룹화합니다.",
        "groups 딕셔너리에 정렬된 키로 단어를 append하고, sorted(groups)로 키 순 출력합니다.",
      ],
      solutionCode: `n = int(input())
words = [input() for _ in range(n)]
groups = {}
for w in words:
    key = ''.join(sorted(w))
    if key not in groups:
        groups[key] = []
    groups[key].append(w)
for key in sorted(groups):
    print(' '.join(groups[key]))`,
      solutionExplanation: "정렬된 문자열을 키로 사용하면 아나그램끼리 동일한 키를 가집니다.",
      en: {
        title: "Anagram Grouping",
        description: `Given N words, group anagrams together and print each group on one line, words separated by spaces.
Within each group, preserve the input order. Sort groups by their sorted-character key in alphabetical order.`,
        constraints: "1 ≤ N ≤ 1000, all words are lowercase English letters",
        hints: [
          "Use ''.join(sorted(word)) as the key to group anagrams.",
          "Append words to their group in a dictionary, then iterate over sorted(groups) to print.",
        ],
        solutionExplanation: "Sorting the characters of each word produces the same key for all anagrams, making it easy to group them in a dictionary.",
      },
      language: "python",
    },
    {
      id: "pydict-008",
      cluster: "py-dicts",
      unlockAfter: "21",
      difficulty: "보통",
      title: "상위 K개 빈도 단어",
      description: `첫 줄에 정수 N과 K가 주어집니다. 이어서 N줄에 걸쳐 단어가 하나씩 주어집니다.
빈도 높은 순으로 K개의 단어를 출력하세요. 빈도가 같으면 알파벳 오름차순.
각 단어를 한 줄씩 출력합니다.`,
      constraints: "1 ≤ K ≤ N ≤ 10000",
      initialCode: `n, k = map(int, input().split())
words = [input() for _ in range(n)]

# 빈도 상위 K개 단어를 출력하세요
`,
      testCases: [
        { stdin: "6 2\napple\nbanana\napple\ncherry\nbanana\napple", expectedOutput: "apple\nbanana", label: "상위 2개" },
        { stdin: "4 3\na\nb\nc\nd", expectedOutput: "a\nb\nc", label: "모두 빈도 1, 알파벳 순" },
        { stdin: "3 1\ncat\ncat\ndog", expectedOutput: "cat", label: "상위 1개" },
      ],
      hints: [
        "빈도 딕셔너리를 만든 뒤, (-빈도, 단어) 튜플 리스트를 sorted()로 정렬하세요.",
        "정렬된 리스트에서 앞 K개를 [:k]로 잘라 단어만 출력합니다.",
      ],
      solutionCode: `n, k = map(int, input().split())
words = [input() for _ in range(n)]
freq = {}
for w in words:
    freq[w] = freq.get(w, 0) + 1
# (-빈도, 단어) 튜플 리스트를 오름차순 정렬
# → 빈도 높을수록 앞, 동수면 알파벳 빠른 단어가 앞
ranked = sorted([(-v, w) for w, v in freq.items()])
for neg_count, word in ranked[:k]:
    print(word)`,
      solutionExplanation: "(-빈도, 단어) 튜플로 묶어 오름차순 정렬하면 빈도 내림차순 + 알파벳 오름차순이 한 번에 처리됩니다.",
      en: {
        title: "Top K Frequent Words",
        description: `Given N words and an integer K, print the K most frequent words, one per line.
If words share the same frequency, output them in alphabetical order.`,
        constraints: "1 ≤ K ≤ N ≤ 10000",
        hints: [
          "Build a frequency dictionary, then build a list of (-count, word) tuples and sort it.",
          "Slice the sorted result with [:k] to get the top K words.",
        ],
        solutionExplanation: "Pack each entry as (-count, word) and sort ascending. This handles frequency-descending and alphabetical tie-breaking in one sort — no key function needed.",
      },
      language: "python",
    },
    {
      id: "pydict-009",
      cluster: "py-dicts",
      unlockAfter: "21",
      difficulty: "어려움",
      title: "두 배열 차집합",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분된 배열 A가 주어집니다.
셋째 줄에 정수 M이 주어지고, 넷째 줄에 M개의 정수가 공백으로 구분된 배열 B가 주어집니다.
A에는 있고 B에는 없는 원소를 중복 없이 오름차순으로 출력하세요. 없으면 빈 줄을 출력합니다.`,
      constraints: "1 ≤ N, M ≤ 100000",
      initialCode: `n = int(input())
a = list(map(int, input().split()))
m = int(input())
b = list(map(int, input().split()))

# A - B (차집합)를 오름차순으로 출력하세요
`,
      testCases: [
        { stdin: "5\n1 2 3 4 5\n3\n3 4 5", expectedOutput: "1 2", label: "기본" },
        { stdin: "3\n1 2 3\n3\n1 2 3", expectedOutput: "", label: "완전 포함" },
        { stdin: "4\n5 5 3 1\n2\n5 2", expectedOutput: "1 3", label: "중복 포함 A" },
        { stdin: "3\n7 8 9\n2\n1 2", expectedOutput: "7 8 9", label: "겹치는 없음" },
      ],
      hints: [
        "set(b)를 만들고, a에 있지만 b_set에 없는 원소를 골라냅니다.",
        "result = sorted(set(a) - set(b))",
      ],
      solutionCode: `n = int(input())
a = list(map(int, input().split()))
m = int(input())
b = list(map(int, input().split()))
result = sorted(set(a) - set(b))
if result:
    print(*result)
else:
    print()`,
      solutionExplanation: "집합 차집합 연산 set(a) - set(b)로 A에만 있는 원소를 O(N+M)에 구합니다.",
      en: {
        title: "Set Difference of Two Arrays",
        description: `Given array A (N integers) and array B (M integers),
print the elements that are in A but not in B, deduplicated and in ascending order.
If there are no such elements, print an empty line.`,
        constraints: "1 ≤ N, M ≤ 100000",
        hints: [
          "Build set(b) and filter out elements of a that are in b_set.",
          "result = sorted(set(a) - set(b))",
        ],
        solutionExplanation: "The set difference set(a) - set(b) finds elements only in A in O(N+M) time.",
      },
      language: "python",
    },
    {
      id: "pydict-010",
      cluster: "py-dicts",
      unlockAfter: "21",
      difficulty: "어려움",
      title: "멱집합 원소 수",
      description: `첫 줄에 정수 N이 주어집니다. 이어서 N줄에 걸쳐 서로 다른 원소가 하나씩 주어집니다.
이 N개 원소의 멱집합(모든 부분집합의 집합)에 포함된 부분집합의 수를 출력하세요.`,
      constraints: "0 ≤ N ≤ 30",
      initialCode: `n = int(input())
for _ in range(n):
    input()  # 원소 읽기 (값은 무시)

# 멱집합의 원소 수(부분집합 수)를 출력하세요
# 힌트: N개의 서로 다른 원소의 부분집합 수는 2^N
`,
      testCases: [
        { stdin: "3\na\nb\nc", expectedOutput: "8", label: "N=3, 2^3=8" },
        { stdin: "0", expectedOutput: "1", label: "N=0, 공집합만" },
        { stdin: "1\nx", expectedOutput: "2", label: "N=1, {}, {x}" },
        { stdin: "4\n1\n2\n3\n4", expectedOutput: "16", label: "N=4, 2^4=16" },
      ],
      hints: [
        "N개의 서로 다른 원소로 만들 수 있는 부분집합의 수는 2^N입니다.",
        "각 원소에 대해 '포함' or '미포함' 2가지 선택이 있으므로 2를 N번 곱합니다.",
      ],
      solutionCode: `n = int(input())
for _ in range(n):
    input()
print(2 ** n)`,
      solutionExplanation: "N개의 서로 다른 원소의 멱집합 크기는 항상 2^N입니다. 각 원소를 포함하거나 제외하는 2가지 선택이 독립적으로 적용됩니다.",
      en: {
        title: "Power Set Size",
        description: `Given N distinct elements, print the number of subsets in their power set (the set of all subsets).`,
        constraints: "0 ≤ N ≤ 30",
        hints: [
          "The number of subsets of N distinct elements is 2^N.",
          "Each element has 2 independent choices — include or exclude — so multiply 2 by itself N times.",
        ],
        solutionExplanation: "The power set of N distinct elements always has 2^N subsets, since each element independently has two choices: included or not.",
      },
      language: "python",
    },
    {
      id: "pydict-011",
      cluster: "py-dicts",
      unlockAfter: "21",
      difficulty: "어려움",
      title: "투 포인터 + 딕셔너리",
      description: `첫 줄에 정수 N과 T가 공백으로 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
합이 정확히 T가 되는 (i, j) 쌍의 수를 출력하세요. (i < j, 같은 원소 인덱스 사용 불가)
주의: 숫자 값이 아닌 인덱스 기준이므로 같은 값이 여러 개 있을 수 있습니다.`,
      constraints: "1 ≤ N ≤ 100000, -10^9 ≤ T, 각 숫자 ≤ 10^9",
      initialCode: `n, t = map(int, input().split())
nums = list(map(int, input().split()))

# 합이 T인 인덱스 쌍 (i < j)의 수를 구하세요
# 딕셔너리로 이미 본 숫자의 등장 횟수를 기록하세요
`,
      testCases: [
        { stdin: "4 5\n1 4 2 3", expectedOutput: "2", label: "(0,1)=1+4, (2,3)=2+3" },
        { stdin: "4 6\n1 2 3 3", expectedOutput: "1", label: "(2,3)=3+3=6" },
        { stdin: "3 10\n1 2 3", expectedOutput: "0", label: "없음" },
        { stdin: "4 4\n2 2 2 2", expectedOutput: "6", label: "모두 2, C(4,2)=6쌍" },
      ],
      hints: [
        "seen 딕셔너리를 만들고 각 원소를 순회하면서 t - nums[i]가 seen에 있는지 확인합니다.",
        "count += seen.get(t - nums[i], 0) 후 seen[nums[i]] = seen.get(nums[i], 0) + 1",
      ],
      solutionCode: `n, t = map(int, input().split())
nums = list(map(int, input().split()))
seen = {}
count = 0
for x in nums:
    need = t - x
    count += seen.get(need, 0)
    seen[x] = seen.get(x, 0) + 1
print(count)`,
      solutionExplanation: "각 원소를 볼 때 이전에 등장한 숫자 중 t-x가 몇 번 있었는지를 딕셔너리로 O(1)에 조회합니다.",
      en: {
        title: "Two Sum — Count Pairs",
        description: `Given N integers and a target T, count the number of index pairs (i, j) where i < j and nums[i] + nums[j] == T.
Note: index-based, so the same value appearing at different indices counts as different pairs.`,
        constraints: "1 ≤ N ≤ 100000, -10^9 ≤ T, each number ≤ 10^9",
        hints: [
          "Use a 'seen' dictionary to track how many times each number has appeared so far.",
          "count += seen.get(t - nums[i], 0), then update seen[nums[i]] += 1",
        ],
        solutionExplanation: "For each element, look up in the dictionary how many previous elements equal t - x. This gives an O(1) lookup per element.",
      },
      language: "python",
    },
    {
      id: "pydict-012",
      cluster: "py-dicts",
      unlockAfter: "21",
      difficulty: "어려움",
      title: "슬라이딩 윈도우 최빈값",
      description: `첫 줄에 정수 N과 K가 공백으로 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
크기 K의 슬라이딩 윈도우를 왼쪽에서 오른쪽으로 이동하며, 각 윈도우에서 가장 많이 나온 수를 출력하세요.
총 N-K+1개의 최빈값을 한 줄씩 출력합니다. 동수면 더 작은 수를 출력합니다.`,
      constraints: "1 ≤ K ≤ N ≤ 10000",
      initialCode: `n, k = map(int, input().split())
nums = list(map(int, input().split()))

# 슬라이딩 윈도우로 각 구간의 최빈값을 출력하세요
# 윈도우가 이동할 때 딕셔너리를 업데이트하세요
`,
      testCases: [
        { stdin: "6 3\n1 2 1 2 3 2", expectedOutput: "1\n2\n1\n2", label: "기본" },
        { stdin: "5 2\n1 1 2 2 3", expectedOutput: "1\n1\n2\n2", label: "K=2" },
        { stdin: "4 4\n3 1 3 2", expectedOutput: "3", label: "K=N" },
        { stdin: "3 1\n5 3 5", expectedOutput: "5\n3\n5", label: "K=1" },
      ],
      hints: [
        "첫 K개 원소로 freq 딕셔너리를 초기화하세요.",
        "윈도우가 이동할 때 왼쪽 원소의 빈도를 1 감소(0이 되면 삭제), 새 오른쪽 원소를 1 증가시킵니다.",
        "최빈값은 (-빈도, 값) 튜플 리스트를 sorted()한 뒤 첫 원소의 값([0][1])을 사용합니다.",
      ],
      solutionCode: `n, k = map(int, input().split())
nums = list(map(int, input().split()))
from collections import defaultdict

freq = defaultdict(int)
for x in nums[:k]:
    freq[x] += 1

def get_mode(freq):
    # (-빈도, 값) 튜플을 만들어 오름차순 정렬
    # → 빈도 높은 값이 앞, 동수면 값이 작은 쪽이 앞
    pairs = sorted([(-v, key) for key, v in freq.items()])
    return pairs[0][1]

print(get_mode(freq))
for i in range(k, n):
    # 새 원소 추가
    freq[nums[i]] += 1
    # 이전 원소 제거
    old = nums[i - k]
    freq[old] -= 1
    if freq[old] == 0:
        del freq[old]
    print(get_mode(freq))`,
      solutionExplanation: "딕셔너리를 유지하며 윈도우를 슬라이딩합니다. 매 이동마다 하나씩 추가·제거하고, 최빈값은 (-빈도, 값) 튜플을 정렬해 맨 앞 튜플의 값을 꺼냅니다.",
      en: {
        title: "Sliding Window Mode",
        description: `Given N integers and window size K, slide a window of size K from left to right
and print the most frequent number in each window, one per line.
Print N-K+1 values total. Break ties by choosing the smaller number.`,
        constraints: "1 ≤ K ≤ N ≤ 10000",
        hints: [
          "Initialize the freq dictionary with the first K elements.",
          "When the window slides, decrease the frequency of the outgoing element (delete if 0) and increase the frequency of the incoming element.",
          "Find the mode by sorting (-count, value) tuples and taking [0][1].",
        ],
        solutionExplanation: "Maintain a frequency dictionary as the window slides — add one element and remove one per step. Find the mode by building (-count, value) tuples and sorting: the first tuple holds the answer.",
      },
      language: "python",
    },
  ],
}
