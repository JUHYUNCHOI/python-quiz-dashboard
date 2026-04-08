import type { PracticeCluster } from "./types"

export const pyListsCluster: PracticeCluster = {
  id: "py-lists",
  title: "리스트 활용",
  emoji: "📋",
  description: "리스트 생성, 순회, 최대/최소, 정렬, 이중 리스트",
  unlockAfter: "17",
  en: {
    title: "List Operations",
    description: "List creation, traversal, maximum/minimum, sorting, 2D lists",
  },
  problems: [
    {
      id: "pylist-001",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "쉬움",
      title: "리스트 합계",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
N개 숫자의 합을 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 숫자 ≤ 10000",
      initialCode: `# 첫 줄: N (숫자 개수)
# 둘째 줄: N개의 정수 (공백 구분)
n = int(input())
nums = list(map(int, input().split()))

# 합계를 구하세요
`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "15", label: "기본" },
        { stdin: "1\n42", expectedOutput: "42", label: "N=1" },
        { stdin: "4\n-1 -2 3 4", expectedOutput: "4", label: "음수 포함" },
        { stdin: "3\n100 200 300", expectedOutput: "600", label: "큰 수" },
      ],
      hints: [
        "sum() 함수를 사용하거나 for 루프로 누적 합을 구하세요.",
        "print(sum(nums)) 또는 total = 0; for x in nums: total += x",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
print(sum(nums))`,
      solutionExplanation: "파이썬 내장 sum() 함수로 리스트 합계를 한 줄에 구할 수 있습니다.",
      en: {
        title: "List Sum",
        description: `Given N on the first line and N integers on the second line (space-separated), print the sum of all N numbers.`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each number ≤ 10000",
        hints: [
          "Use the sum() function or accumulate with a for loop.",
          "print(sum(nums)) or total = 0; for x in nums: total += x",
        ],
        solutionExplanation: "Python's built-in sum() function computes the list total in a single line.",
      },
      language: "python",
    },
    {
      id: "pylist-002",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "쉬움",
      title: "최댓값과 최솟값",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
최댓값과 최솟값을 공백으로 구분하여 한 줄에 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 숫자 ≤ 10000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 최댓값과 최솟값을 구하세요
# 출력 형식: "최댓값 최솟값"
`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "5 1", label: "기본" },
        { stdin: "1\n7", expectedOutput: "7 7", label: "N=1" },
        { stdin: "4\n-5 -1 -3 -2", expectedOutput: "-1 -5", label: "음수 전체" },
        { stdin: "3\n0 0 0", expectedOutput: "0 0", label: "모두 같음" },
      ],
      hints: [
        "max()와 min() 내장 함수를 사용하세요.",
        "print(max(nums), min(nums)) — print에 두 값을 넣으면 공백으로 구분됩니다.",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
print(max(nums), min(nums))`,
      solutionExplanation: "max()와 min() 함수로 최댓값·최솟값을 구하고, print에 두 값을 넘기면 자동으로 공백 구분됩니다.",
      en: {
        title: "Maximum and Minimum",
        description: `Given N on the first line and N integers on the second line (space-separated), print the maximum and minimum values separated by a space on one line.`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each number ≤ 10000",
        hints: [
          "Use the max() and min() built-in functions.",
          "print(max(nums), min(nums)) — passing two values to print separates them with a space automatically.",
        ],
        solutionExplanation: "max() and min() find the maximum and minimum respectively. Passing both to print() automatically separates them with a space.",
      },
      language: "python",
    },
    {
      id: "pylist-003",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "쉬움",
      title: "리스트 뒤집기",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
입력된 숫자들을 역순으로 공백 구분하여 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 리스트를 역순으로 출력하세요
`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "5 4 3 2 1", label: "기본" },
        { stdin: "1\n9", expectedOutput: "9", label: "N=1" },
        { stdin: "3\n7 3 5", expectedOutput: "5 3 7", label: "N=3" },
        { stdin: "4\n10 20 30 40", expectedOutput: "40 30 20 10", label: "N=4" },
      ],
      hints: [
        "슬라이싱 nums[::-1] 또는 reversed(nums)를 활용하세요.",
        "print(*nums[::-1]) — * 언패킹으로 공백 구분 출력이 가능합니다.",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
print(*nums[::-1])`,
      solutionExplanation: "슬라이싱 [::-1]로 역순 리스트를 만들고, *언패킹으로 공백 구분 출력합니다.",
      en: {
        title: "Reverse a List",
        description: `Given N on the first line and N integers on the second line (space-separated), print the numbers in reversed order separated by spaces.`,
        constraints: "1 ≤ N ≤ 1000",
        hints: [
          "Use slicing nums[::-1] or reversed(nums).",
          "print(*nums[::-1]) — * unpacking prints elements space-separated.",
        ],
        solutionExplanation: "Slicing [::-1] creates a reversed list, and * unpacking prints it space-separated.",
      },
      language: "python",
    },
    {
      id: "pylist-004",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "쉬움",
      title: "평균보다 큰 수",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
평균보다 엄격히 큰 숫자들을 오름차순으로 공백 구분하여 출력하세요.
조건을 만족하는 숫자가 없으면 아무것도 출력하지 않습니다.`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ 각 숫자 ≤ 10000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 평균을 계산하고, 평균보다 큰 수만 오름차순으로 출력하세요
`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "4 5", label: "기본 (평균=3)" },
        { stdin: "3\n10 10 10", expectedOutput: "", label: "모두 같음" },
        { stdin: "4\n1 5 9 5", expectedOutput: "9", label: "평균=5, 9만 초과" },
        { stdin: "1\n7", expectedOutput: "", label: "N=1 (평균=자신)" },
      ],
      hints: [
        "avg = sum(nums) / len(nums) 로 평균을 구하세요.",
        "리스트 컴프리헨션: [x for x in nums if x > avg] 후 sorted()로 정렬하세요.",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
avg = sum(nums) / n
result = sorted([x for x in nums if x > avg])
if result:
    print(*result)`,
      solutionExplanation: "평균 계산 후 리스트 컴프리헨션으로 필터링, sorted()로 오름차순 정렬합니다.",
      en: {
        title: "Numbers Above Average",
        description: `Given N on the first line and N integers on the second line (space-separated), print the numbers that are strictly greater than the average, in ascending order separated by spaces.
If no numbers qualify, print nothing.`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ each number ≤ 10000",
        hints: [
          "Compute avg = sum(nums) / len(nums).",
          "List comprehension: [x for x in nums if x > avg], then sort with sorted().",
        ],
        solutionExplanation: "After computing the average, filter with a list comprehension and sort the result with sorted().",
      },
      language: "python",
    },
    {
      id: "pylist-005",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "쉬움",
      title: "중복 제거",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
중복을 제거하되 처음 나온 순서를 유지하여 공백으로 구분해 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ 각 숫자 ≤ 1000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 입력 순서를 유지하며 중복을 제거하세요
`,
      testCases: [
        { stdin: "6\n1 2 2 3 1 4", expectedOutput: "1 2 3 4", label: "기본" },
        { stdin: "3\n5 5 5", expectedOutput: "5", label: "모두 같음" },
        { stdin: "4\n4 3 2 1", expectedOutput: "4 3 2 1", label: "중복 없음" },
        { stdin: "5\n1 3 1 3 2", expectedOutput: "1 3 2", label: "교차 중복" },
      ],
      hints: [
        "seen = set()을 만들고, 아직 seen에 없는 숫자만 결과에 추가하세요.",
        "for x in nums: if x not in seen: seen.add(x); result.append(x)",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
seen = set()
result = []
for x in nums:
    if x not in seen:
        seen.add(x)
        result.append(x)
print(*result)`,
      solutionExplanation: "set으로 방문 여부를 O(1)에 확인하면서 순서를 유지한 채 중복을 제거합니다.",
      en: {
        title: "Remove Duplicates",
        description: `Given N on the first line and N integers on the second line (space-separated), remove duplicates while preserving the original order and print the result separated by spaces.`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ each number ≤ 1000",
        hints: [
          "Create seen = set() and only add numbers not yet in seen to the result.",
          "for x in nums: if x not in seen: seen.add(x); result.append(x)",
        ],
        solutionExplanation: "Using a set to check membership in O(1), duplicates are removed while preserving order.",
      },
      language: "python",
    },
    {
      id: "pylist-006",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "보통",
      title: "두 번째로 큰 수",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
두 번째로 큰 수를 출력하세요. (중복값 포함 — 예: [5, 5, 3]의 두 번째로 큰 수는 5)`,
      constraints: "2 ≤ N ≤ 1000, -10000 ≤ 각 숫자 ≤ 10000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 두 번째로 큰 수를 출력하세요
# 힌트: 정렬 후 인덱스를 활용하거나, 최댓값을 한 번 제거한 후 max를 구하세요
`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "4", label: "기본" },
        { stdin: "3\n5 5 3", expectedOutput: "5", label: "최댓값 중복" },
        { stdin: "2\n7 2", expectedOutput: "2", label: "N=2" },
        { stdin: "4\n10 9 8 7", expectedOutput: "9", label: "내림차순 입력" },
      ],
      hints: [
        "sorted()로 내림차순 정렬 후 두 번째 인덱스를 출력하세요.",
        "sorted(nums, reverse=True)[1] — 인덱스 1이 두 번째로 큰 값입니다.",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
sorted_nums = sorted(nums, reverse=True)
print(sorted_nums[1])`,
      solutionExplanation: "내림차순 정렬 후 인덱스 [1]이 두 번째로 큰 값입니다. 중복을 제거하지 않으므로 [5,5,3]→5가 올바르게 출력됩니다.",
      en: {
        title: "Second Largest Number",
        description: `Given N on the first line and N integers on the second line (space-separated), print the second largest number. (Duplicates count — e.g., the second largest in [5, 5, 3] is 5.)`,
        constraints: "2 ≤ N ≤ 1000, -10000 ≤ each number ≤ 10000",
        hints: [
          "Sort in descending order and take index [1].",
          "sorted(nums, reverse=True)[1] — index 1 is the second largest value.",
        ],
        solutionExplanation: "After sorting in descending order, index [1] is the second largest. Duplicates are not removed, so [5,5,3] correctly outputs 5.",
      },
      language: "python",
    },
    {
      id: "pylist-007",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "보통",
      title: "리스트 회전",
      description: `첫 줄에 정수 N과 K가 공백으로 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
리스트를 오른쪽으로 K번 회전한 결과를 공백으로 구분해 출력하세요.
(오른쪽 회전: 마지막 원소가 맨 앞으로 이동)`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ K ≤ 10000",
      initialCode: `n, k = map(int, input().split())
nums = list(map(int, input().split()))

# 오른쪽으로 K번 회전한 결과를 출력하세요
# 힌트: k를 n으로 나눈 나머지만큼 실제 회전
`,
      testCases: [
        { stdin: "5 2\n1 2 3 4 5", expectedOutput: "4 5 1 2 3", label: "기본" },
        { stdin: "3 3\n1 2 3", expectedOutput: "1 2 3", label: "K=N (제자리)" },
        { stdin: "4 1\n10 20 30 40", expectedOutput: "40 10 20 30", label: "K=1" },
        { stdin: "5 7\n1 2 3 4 5", expectedOutput: "4 5 1 2 3", label: "K>N" },
      ],
      hints: [
        "K가 N보다 클 수 있으므로 k = k % n 으로 실제 회전 횟수를 줄이세요.",
        "nums[-k:] + nums[:-k] 슬라이싱으로 회전 결과를 만들 수 있습니다.",
      ],
      solutionCode: `n, k = map(int, input().split())
nums = list(map(int, input().split()))
k = k % n
if k == 0:
    print(*nums)
else:
    rotated = nums[-k:] + nums[:-k]
    print(*rotated)`,
      solutionExplanation: "k % n으로 실제 회전량을 구하고, 슬라이싱으로 뒤쪽 k개를 앞으로 붙입니다.",
      en: {
        title: "List Rotation",
        description: `Given N and K on the first line and N integers on the second line (space-separated), print the list after rotating it K positions to the right.
(Right rotation: the last element moves to the front.)`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ K ≤ 10000",
        hints: [
          "K can exceed N, so reduce it with k = k % n first.",
          "nums[-k:] + nums[:-k] slicing produces the rotated result.",
        ],
        solutionExplanation: "k % n gives the effective rotation count, and slicing appends the last k elements to the front.",
      },
      language: "python",
    },
    {
      id: "pylist-008",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "보통",
      title: "빈도수 계산",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 0~9 범위의 정수 N개가 공백으로 구분되어 주어집니다.
0부터 9까지 각 숫자가 몇 번 나왔는지, 숫자와 빈도수를 "숫자: 횟수" 형식으로 한 줄씩 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ 각 숫자 ≤ 9",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 0~9 각 숫자의 빈도수를 출력하세요
# 출력 형식: "0: 2", "1: 0", ...
`,
      testCases: [
        { stdin: "5\n1 2 2 3 1", expectedOutput: "0: 0\n1: 2\n2: 2\n3: 1\n4: 0\n5: 0\n6: 0\n7: 0\n8: 0\n9: 0", label: "기본" },
        { stdin: "3\n0 0 9", expectedOutput: "0: 2\n1: 0\n2: 0\n3: 0\n4: 0\n5: 0\n6: 0\n7: 0\n8: 0\n9: 1", label: "경계값" },
        { stdin: "1\n5", expectedOutput: "0: 0\n1: 0\n2: 0\n3: 0\n4: 0\n5: 1\n6: 0\n7: 0\n8: 0\n9: 0", label: "N=1" },
      ],
      hints: [
        "크기 10짜리 count 리스트를 0으로 초기화하고 count[x] += 1 으로 집계하세요.",
        "for i in range(10): print(f'{i}: {count[i]}')",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
count = [0] * 10
for x in nums:
    count[x] += 1
for i in range(10):
    print(f"{i}: {count[i]}")`,
      solutionExplanation: "크기 10의 배열을 빈도 카운터로 활용합니다. 0~9 인덱스가 각 숫자에 대응합니다.",
      en: {
        title: "Frequency Count",
        description: `Given N on the first line and N integers (each 0–9) on the second line (space-separated), print how many times each digit 0 through 9 appears, one per line in the format "digit: count".`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ each number ≤ 9",
        hints: [
          "Initialize a count list of size 10 with zeros and increment count[x] for each x.",
          "for i in range(10): print(f'{i}: {count[i]}')",
        ],
        solutionExplanation: "An array of size 10 acts as a frequency counter. Indices 0–9 map directly to each digit.",
      },
      language: "python",
    },
    {
      id: "pylist-009",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "보통",
      title: "선형 탐색",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
셋째 줄에 찾을 정수 T가 주어집니다.
T가 처음 등장하는 0-based 인덱스를 출력하세요. 없으면 -1을 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 숫자 ≤ 10000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))
t = int(input())

# t가 처음 나오는 인덱스를 출력하고, 없으면 -1 출력
`,
      testCases: [
        { stdin: "5\n3 1 4 1 5\n4", expectedOutput: "2", label: "기본" },
        { stdin: "5\n3 1 4 1 5\n1", expectedOutput: "1", label: "첫 등장" },
        { stdin: "3\n1 2 3\n9", expectedOutput: "-1", label: "없음" },
        { stdin: "4\n5 5 5 5\n5", expectedOutput: "0", label: "모두 같음" },
      ],
      hints: [
        "for i, x in enumerate(nums): if x == t: print(i); break 패턴을 활용하세요.",
        "리스트 메서드 nums.index(t)도 사용할 수 있지만, 없을 때 ValueError가 발생하므로 try-except 필요.",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
t = int(input())
result = -1
for i, x in enumerate(nums):
    if x == t:
        result = i
        break
print(result)`,
      solutionExplanation: "enumerate()로 인덱스와 값을 동시에 순회하며 첫 등장 위치를 기록합니다.",
      en: {
        title: "Linear Search",
        description: `Given N on the first line, N integers on the second line (space-separated), and a target integer T on the third line, print the 0-based index of T's first occurrence. If T is not found, print -1.`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each number ≤ 10000",
        hints: [
          "Use for i, x in enumerate(nums): if x == t: print(i); break to find the first occurrence.",
          "nums.index(t) also works but raises ValueError if not found — requires try-except.",
        ],
        solutionExplanation: "enumerate() iterates with both index and value simultaneously, letting us record the first occurrence position.",
      },
      language: "python",
    },
    {
      id: "pylist-010",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "보통",
      title: "리스트 교집합",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
셋째 줄에 정수 M이 주어지고, 넷째 줄에 M개의 정수가 공백으로 구분되어 주어집니다.
두 리스트에 모두 존재하는 숫자들을 중복 없이 오름차순으로 공백 구분해 출력하세요.
공통 원소가 없으면 아무것도 출력하지 않습니다.`,
      constraints: "1 ≤ N, M ≤ 1000",
      initialCode: `n = int(input())
a = list(map(int, input().split()))
m = int(input())
b = list(map(int, input().split()))

# 두 리스트의 공통 원소를 중복 없이 오름차순으로 출력하세요
`,
      testCases: [
        { stdin: "5\n1 2 3 4 5\n5\n3 4 5 6 7", expectedOutput: "3 4 5", label: "기본" },
        { stdin: "3\n1 2 3\n3\n4 5 6", expectedOutput: "", label: "공통 없음" },
        { stdin: "4\n1 1 2 3\n3\n1 2 2", expectedOutput: "1 2", label: "중복 포함 입력" },
        { stdin: "2\n7 8\n2\n8 7", expectedOutput: "7 8", label: "순서 다름" },
      ],
      hints: [
        "set(a) & set(b) 집합 연산으로 교집합을 구하세요.",
        "sorted(set(a) & set(b))로 정렬 후 출력하면 됩니다.",
      ],
      solutionCode: `n = int(input())
a = list(map(int, input().split()))
m = int(input())
b = list(map(int, input().split()))
common = sorted(set(a) & set(b))
if common:
    print(*common)`,
      solutionExplanation: "set() 변환 후 & 연산으로 교집합을 구하면 O(N+M)으로 효율적입니다.",
      en: {
        title: "List Intersection",
        description: `Given two lists (N integers and M integers on separate lines), print the numbers that appear in both lists — no duplicates, in ascending order separated by spaces.
If there are no common elements, print nothing.`,
        constraints: "1 ≤ N, M ≤ 1000",
        hints: [
          "Use set(a) & set(b) for the intersection.",
          "sorted(set(a) & set(b)) gives the sorted result.",
        ],
        solutionExplanation: "Converting to sets and using & finds the intersection in O(N+M) efficiently.",
      },
      language: "python",
    },
    {
      id: "pylist-011",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "보통",
      title: "연속 부분합 최대",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
연속된 부분 배열의 합 중 최댓값을 출력하세요. (Kadane's Algorithm)`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 숫자 ≤ 10000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 연속 부분합의 최댓값을 구하세요
# 힌트: 현재까지의 합이 음수가 되면 새로 시작하는 것이 유리합니다
`,
      testCases: [
        { stdin: "8\n-2 1 -3 4 -1 2 1 -5", expectedOutput: "6", label: "기본 (4,-1,2,1)" },
        { stdin: "3\n1 2 3", expectedOutput: "6", label: "전체 합" },
        { stdin: "3\n-3 -1 -2", expectedOutput: "-1", label: "모두 음수" },
        { stdin: "1\n5", expectedOutput: "5", label: "N=1" },
      ],
      hints: [
        "current = max(nums[0], 0) 대신 current = nums[0]으로 시작하세요 (모두 음수 케이스 대비).",
        "for x in nums[1:]: current = max(x, current + x); best = max(best, current)",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
current = best = nums[0]
for x in nums[1:]:
    current = max(x, current + x)
    best = max(best, current)
print(best)`,
      solutionExplanation: "Kadane 알고리즘: 현재 원소만 선택(새로 시작)하는 것과 이전 합에 더하는 것 중 큰 쪽을 선택합니다.",
      en: {
        title: "Maximum Subarray Sum",
        description: `Given N on the first line and N integers on the second line (space-separated), print the maximum sum of any contiguous subarray. (Kadane's Algorithm)`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each number ≤ 10000",
        hints: [
          "Start with current = best = nums[0] (not 0) to handle all-negative inputs.",
          "for x in nums[1:]: current = max(x, current + x); best = max(best, current)",
        ],
        solutionExplanation: "Kadane's algorithm: at each step, choose the larger of starting fresh (current element alone) or extending the previous sum.",
      },
      language: "python",
    },
    {
      id: "pylist-012",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "보통",
      title: "누적합 배열",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
누적합 배열을 출력하세요. i번째 원소는 처음부터 i번째까지의 합입니다.`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 숫자 ≤ 10000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 누적합 배열을 만들어 공백으로 구분해 출력하세요
# prefix[0]=nums[0], prefix[1]=nums[0]+nums[1], ...
`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "1 3 6 10 15", label: "기본" },
        { stdin: "1\n7", expectedOutput: "7", label: "N=1" },
        { stdin: "4\n-1 2 -3 4", expectedOutput: "-1 1 -2 2", label: "음수 포함" },
        { stdin: "3\n0 0 0", expectedOutput: "0 0 0", label: "모두 0" },
      ],
      hints: [
        "prefix 리스트를 만들고 앞 원소에 현재 원소를 더하면서 채우세요.",
        "for i in range(1, n): prefix[i] = prefix[i-1] + nums[i]",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
prefix = nums[:]
for i in range(1, n):
    prefix[i] = prefix[i-1] + nums[i]
print(*prefix)`,
      solutionExplanation: "누적합 배열은 prefix[i] = prefix[i-1] + nums[i] 점화식으로 O(N)에 구성합니다.",
      en: {
        title: "Prefix Sum Array",
        description: `Given N on the first line and N integers on the second line (space-separated), print the prefix sum array. The i-th element is the sum of all elements from index 0 to i.`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each number ≤ 10000",
        hints: [
          "Build a prefix list and fill it using prefix[i] = prefix[i-1] + nums[i].",
          "for i in range(1, n): prefix[i] = prefix[i-1] + nums[i]",
        ],
        solutionExplanation: "The prefix sum array is built in O(N) using the recurrence prefix[i] = prefix[i-1] + nums[i].",
      },
      language: "python",
    },
    {
      id: "pylist-013",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "어려움",
      title: "이진 탐색 구현",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 오름차순으로 정렬된 N개의 정수가 공백으로 구분되어 주어집니다.
셋째 줄에 찾을 정수 T가 주어집니다.
이진 탐색 알고리즘으로 T의 인덱스(0-based)를 출력하세요. T가 없으면 -1을 출력하세요.`,
      constraints: "1 ≤ N ≤ 100000, -10^9 ≤ 각 숫자 ≤ 10^9",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))
t = int(input())

# 이진 탐색으로 t의 인덱스를 구하세요
# left, right 포인터를 활용하세요
`,
      testCases: [
        { stdin: "7\n1 3 5 7 9 11 13\n7", expectedOutput: "3", label: "기본" },
        { stdin: "5\n2 4 6 8 10\n1", expectedOutput: "-1", label: "없음" },
        { stdin: "1\n5\n5", expectedOutput: "0", label: "N=1 존재" },
        { stdin: "6\n1 2 3 4 5 6\n6", expectedOutput: "5", label: "마지막 원소" },
      ],
      hints: [
        "left=0, right=n-1로 시작하고 mid=(left+right)//2를 계산하세요.",
        "nums[mid]과 t를 비교해 left 또는 right를 좁혀나가고, left>right가 되면 탐색 실패(-1)입니다.",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
t = int(input())
left, right = 0, n - 1
result = -1
while left <= right:
    mid = (left + right) // 2
    if nums[mid] == t:
        result = mid
        break
    elif nums[mid] < t:
        left = mid + 1
    else:
        right = mid - 1
print(result)`,
      solutionExplanation: "이진 탐색: 매 단계마다 탐색 범위를 절반으로 줄여 O(log N)에 검색합니다.",
      en: {
        title: "Binary Search Implementation",
        description: `Given N on the first line, a sorted list of N integers on the second line, and a target T on the third line, use binary search to find the 0-based index of T. Print -1 if T is not found.`,
        constraints: "1 ≤ N ≤ 100000, -10^9 ≤ each number ≤ 10^9",
        hints: [
          "Start with left=0, right=n-1 and compute mid=(left+right)//2.",
          "Compare nums[mid] to t, then narrow left or right accordingly. Stop when left > right (not found).",
        ],
        solutionExplanation: "Binary search halves the search range at every step, finding the target in O(log N).",
      },
      language: "python",
    },
    {
      id: "pylist-014",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "어려움",
      title: "버블정렬 스왑 횟수",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
버블정렬로 오름차순 정렬할 때 일어나는 총 스왑 횟수를 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 숫자 ≤ 10000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 버블정렬을 직접 구현하고 스왑 횟수를 세세요
# 인접한 원소를 비교해 순서가 틀리면 교환합니다
`,
      testCases: [
        { stdin: "4\n4 3 2 1", expectedOutput: "6", label: "역순 (최악)" },
        { stdin: "3\n1 2 3", expectedOutput: "0", label: "이미 정렬됨" },
        { stdin: "5\n5 1 4 2 8", expectedOutput: "5", label: "일반 케이스" },
        { stdin: "1\n7", expectedOutput: "0", label: "N=1" },
      ],
      hints: [
        "이중 for 루프로 버블정렬을 구현하고, 스왑이 발생할 때마다 count += 1 하세요.",
        "for i in range(n): for j in range(n-i-1): if nums[j] > nums[j+1]: nums[j], nums[j+1] = nums[j+1], nums[j]; count += 1",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
count = 0
for i in range(n):
    for j in range(n - i - 1):
        if nums[j] > nums[j + 1]:
            nums[j], nums[j + 1] = nums[j + 1], nums[j]
            count += 1
print(count)`,
      solutionExplanation: "버블정렬의 스왑 횟수는 역순 쌍(inversion)의 수와 같습니다. O(N²) 이중 루프로 직접 셉니다.",
      en: {
        title: "Bubble Sort Swap Count",
        description: `Given N on the first line and N integers on the second line (space-separated), print the total number of swaps bubble sort would perform to sort the list in ascending order.`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each number ≤ 10000",
        hints: [
          "Implement bubble sort with a double for loop and increment count whenever a swap occurs.",
          "for i in range(n): for j in range(n-i-1): if nums[j] > nums[j+1]: swap and count += 1",
        ],
        solutionExplanation: "The swap count in bubble sort equals the number of inversions (out-of-order pairs). An O(N²) double loop counts them directly.",
      },
      language: "python",
    },
    {
      id: "pylist-015",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "어려움",
      title: "리스트 압축 (RLE)",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
연속적으로 같은 수가 반복될 경우 "(값 횟수)" 형식으로, 1개만 있으면 "(값)" 형식으로 압축해 공백으로 구분 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# Run-Length Encoding: 연속 반복을 압축하세요
# 예: [1, 1, 2, 3, 3, 3] → "(1 2) (2) (3 3)"
`,
      testCases: [
        { stdin: "6\n1 1 2 3 3 3", expectedOutput: "(1 2) (2) (3 3)", label: "기본" },
        { stdin: "3\n5 5 5", expectedOutput: "(5 3)", label: "모두 같음" },
        { stdin: "4\n1 2 3 4", expectedOutput: "(1) (2) (3) (4)", label: "중복 없음" },
        { stdin: "1\n9", expectedOutput: "(9)", label: "N=1" },
      ],
      hints: [
        "현재 값과 이전 값을 비교하며 연속 횟수(count)를 셉니다. 값이 바뀌면 결과에 추가하고 count를 1로 리셋하세요.",
        "횟수가 1이면 f'({val})', 아니면 f'({val} {cnt})' 형식으로 출력하세요.",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
result = []
i = 0
while i < n:
    val = nums[i]
    cnt = 1
    while i + cnt < n and nums[i + cnt] == val:
        cnt += 1
    if cnt == 1:
        result.append(f"({val})")
    else:
        result.append(f"({val} {cnt})")
    i += cnt
print(" ".join(result))`,
      solutionExplanation: "연속 구간을 찾는 두 포인터 패턴입니다. 내부 while로 같은 값이 얼마나 이어지는지 세고 결과를 조합합니다.",
      en: {
        title: "List Compression (RLE)",
        description: `Given N on the first line and N integers on the second line (space-separated), compress consecutive repeated values in "(value count)" format, or "(value)" if the count is 1. Print the compressed groups separated by spaces.`,
        constraints: "1 ≤ N ≤ 1000",
        hints: [
          "Compare each value to the previous; when the value changes, append the current group to the result and reset count.",
          "If count is 1, output f'({val})'; otherwise f'({val} {cnt})'.",
        ],
        solutionExplanation: "A two-pointer pattern finds consecutive runs. An inner while counts how many times the same value repeats, then the group is formatted and appended.",
      },
      language: "python",
    },
    {
      id: "pylist-016",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "어려움",
      title: "행렬 전치",
      description: `첫 줄에 정수 N과 M이 주어집니다. 이어서 N줄에 걸쳐 각 줄에 M개의 정수가 공백으로 구분되어 주어집니다.
이 N×M 행렬의 전치행렬(M×N)을 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 100",
      initialCode: `n, m = map(int, input().split())
matrix = []
for _ in range(n):
    row = list(map(int, input().split()))
    matrix.append(row)

# N×M 행렬을 M×N 전치행렬로 변환해 출력하세요
`,
      testCases: [
        { stdin: "2 3\n1 2 3\n4 5 6", expectedOutput: "1 4\n2 5\n3 6", label: "2x3→3x2" },
        { stdin: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "1 4 7\n2 5 8\n3 6 9", label: "정방행렬" },
        { stdin: "1 3\n10 20 30", expectedOutput: "10\n20\n30", label: "1x3→3x1" },
        { stdin: "3 1\n5\n6\n7", expectedOutput: "5 6 7", label: "3x1→1x3" },
      ],
      hints: [
        "이중 리스트 컴프리헨션이나 zip(*matrix)를 활용하세요.",
        "for row in zip(*matrix): print(*row) — zip(*matrix)가 전치를 자동으로 수행합니다.",
      ],
      solutionCode: `n, m = map(int, input().split())
matrix = []
for _ in range(n):
    row = list(map(int, input().split()))
    matrix.append(row)
for row in zip(*matrix):
    print(*row)`,
      solutionExplanation: "zip(*matrix)는 행렬 전치의 파이썬다운 표현입니다. *로 언패킹하면 각 열이 zip의 인수로 전달됩니다.",
      en: {
        title: "Matrix Transpose",
        description: `Given N and M on the first line, then N rows each with M integers (space-separated), print the transposed M×N matrix.`,
        constraints: "1 ≤ N, M ≤ 100",
        hints: [
          "Use a nested list comprehension or zip(*matrix).",
          "for row in zip(*matrix): print(*row) — zip(*matrix) automatically transposes.",
        ],
        solutionExplanation: "zip(*matrix) is the Pythonic way to transpose a matrix. The * unpacking passes each column as a separate argument to zip.",
      },
      language: "python",
    },
    {
      id: "pylist-017",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "어려움",
      title: "달팽이 수열",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
양쪽에서 번갈아 선택합니다: 앞에서 한 개, 뒤에서 한 개 순서로 반복합니다.
선택 순서대로 공백으로 구분해 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 앞/뒤를 번갈아 선택하세요
# 홀수번째(1,3,5...): 앞에서 선택, 짝수번째(2,4,6...): 뒤에서 선택
`,
      testCases: [
        { stdin: "6\n1 2 3 4 5 6", expectedOutput: "1 6 2 5 3 4", label: "짝수 N" },
        { stdin: "5\n1 2 3 4 5", expectedOutput: "1 5 2 4 3", label: "홀수 N" },
        { stdin: "1\n7", expectedOutput: "7", label: "N=1" },
        { stdin: "2\n3 9", expectedOutput: "3 9", label: "N=2" },
      ],
      hints: [
        "left=0, right=n-1 두 포인터를 사용하고 번갈아가며 선택하세요.",
        "turn 변수로 홀수/짝수 턴을 구분하거나, while left <= right: 루프로 앞뒤 교대 처리합니다.",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
left, right = 0, n - 1
result = []
turn = 0
while left <= right:
    if turn % 2 == 0:
        result.append(nums[left])
        left += 1
    else:
        result.append(nums[right])
        right -= 1
    turn += 1
print(*result)`,
      solutionExplanation: "두 포인터로 양끝을 번갈아 선택합니다. turn % 2로 앞/뒤 선택을 결정합니다.",
      en: {
        title: "Alternating Pick Sequence",
        description: `Given N on the first line and N integers on the second line (space-separated), alternately pick from the front and back: 1st pick from the front, 2nd from the back, 3rd from the front, and so on.
Print the picks in selection order, separated by spaces.`,
        constraints: "1 ≤ N ≤ 1000",
        hints: [
          "Use two pointers: left=0, right=n-1, and alternate between them.",
          "A turn variable (or turn % 2) decides whether to pick from the front or back.",
        ],
        solutionExplanation: "Two pointers alternate picking from both ends. turn % 2 determines front or back selection each step.",
      },
      language: "python",
    },
    {
      id: "pylist-018",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "어려움",
      title: "부분집합 합",
      description: `첫 줄에 정수 N과 T가 공백으로 주어집니다. 둘째 줄에 N개의 양의 정수가 공백으로 구분되어 주어집니다.
N개의 수 중 일부를 골라 합이 T가 되는 부분집합이 존재하면 "YES", 없으면 "NO"를 출력하세요.`,
      constraints: "1 ≤ N ≤ 20, 1 ≤ T ≤ 1000, 1 ≤ 각 숫자 ≤ 100",
      initialCode: `n, t = map(int, input().split())
nums = list(map(int, input().split()))

# 합이 T가 되는 부분집합이 존재하는지 확인하세요
# DP 또는 재귀/완전탐색으로 풀 수 있습니다
`,
      testCases: [
        { stdin: "4 9\n3 1 4 2", expectedOutput: "YES", label: "3+4+2=9" },
        { stdin: "3 10\n1 2 3", expectedOutput: "NO", label: "최대 6" },
        { stdin: "1 5\n5", expectedOutput: "YES", label: "N=1 일치" },
        { stdin: "3 7\n2 3 5", expectedOutput: "YES", label: "2+5=7" },
      ],
      hints: [
        "DP 방식: dp[i]를 합 i가 가능한지 True/False로 관리하세요.",
        "dp = {0}으로 시작, 각 숫자 x에 대해 dp에 x를 더한 값을 새 set에 추가하세요.",
      ],
      solutionCode: `n, t = map(int, input().split())
nums = list(map(int, input().split()))
dp = {0}
for x in nums:
    dp = dp | {s + x for s in dp}
print("YES" if t in dp else "NO")`,
      solutionExplanation: "집합 DP: 현재까지 만들 수 있는 모든 합을 집합으로 유지합니다. 각 원소를 추가하거나 건너뜁니다.",
      en: {
        title: "Subset Sum",
        description: `Given N and T on the first line and N positive integers on the second line (space-separated), print "YES" if any subset of the N numbers sums to T, otherwise print "NO".`,
        constraints: "1 ≤ N ≤ 20, 1 ≤ T ≤ 1000, 1 ≤ each number ≤ 100",
        hints: [
          "DP approach: maintain dp as a set of all reachable sums. Start with dp = {0}.",
          "For each number x, add s + x for every s in dp to the new set.",
        ],
        solutionExplanation: "Set-based DP: maintain all reachable sums as a set. For each element, we either include it or skip it.",
      },
      language: "python",
    },
    {
      id: "pylist-019",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "어려움",
      title: "행렬 사각형 합",
      description: `첫 줄에 정수 N이 주어집니다. 이어서 N줄에 걸쳐 각 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
그 다음 줄에 좌상단 좌표 r1 c1과 우하단 좌표 r2 c2가 주어집니다 (0-based 인덱스).
해당 직사각형 영역의 원소 합을 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, 0 ≤ r1 ≤ r2 < N, 0 ≤ c1 ≤ c2 < N",
      initialCode: `n = int(input())
matrix = []
for _ in range(n):
    row = list(map(int, input().split()))
    matrix.append(row)
r1, c1, r2, c2 = map(int, input().split())

# r1,c1 ~ r2,c2 직사각형 영역의 합을 구하세요
`,
      testCases: [
        { stdin: "3\n1 2 3\n4 5 6\n7 8 9\n0 0 1 1", expectedOutput: "12", label: "좌상단 2x2" },
        { stdin: "3\n1 2 3\n4 5 6\n7 8 9\n1 1 2 2", expectedOutput: "28", label: "중앙 2x2" },
        { stdin: "3\n1 2 3\n4 5 6\n7 8 9\n0 0 2 2", expectedOutput: "45", label: "전체" },
        { stdin: "2\n3 7\n2 8\n0 1 1 1", expectedOutput: "15", label: "단일 열" },
      ],
      hints: [
        "이중 for 루프로 r1~r2 행, c1~c2 열을 순회하며 합산하세요.",
        "total = sum(matrix[r][c] for r in range(r1, r2+1) for c in range(c1, c2+1))",
      ],
      solutionCode: `n = int(input())
matrix = []
for _ in range(n):
    row = list(map(int, input().split()))
    matrix.append(row)
r1, c1, r2, c2 = map(int, input().split())
total = 0
for r in range(r1, r2 + 1):
    for c in range(c1, c2 + 1):
        total += matrix[r][c]
print(total)`,
      solutionExplanation: "이중 루프로 직사각형 범위를 순회해 합산합니다. 2D 누적합(prefix sum)으로 O(1) 쿼리도 가능합니다.",
      en: {
        title: "Matrix Rectangle Sum",
        description: `Given N on the first line, then an N×N matrix (N rows, each with N space-separated integers), then coordinates r1 c1 r2 c2 (0-based), print the sum of all elements in the rectangle from (r1, c1) to (r2, c2) inclusive.`,
        constraints: "1 ≤ N ≤ 100, 0 ≤ r1 ≤ r2 < N, 0 ≤ c1 ≤ c2 < N",
        hints: [
          "Use a double for loop to iterate rows r1 to r2 and columns c1 to c2.",
          "total = sum(matrix[r][c] for r in range(r1, r2+1) for c in range(c1, c2+1))",
        ],
        solutionExplanation: "A double loop iterates over the rectangular region and sums all elements. A 2D prefix sum array would allow O(1) queries.",
      },
      language: "python",
    },
    {
      id: "pylist-020",
      cluster: "py-lists",
      unlockAfter: "17",
      difficulty: "어려움",
      title: "이동 평균",
      description: `첫 줄에 정수 N과 K가 공백으로 주어집니다. 둘째 줄에 N개의 실수가 공백으로 구분되어 주어집니다.
크기 K의 슬라이딩 윈도우 이동 평균을 소수점 둘째 자리까지 출력하세요. 총 N-K+1개의 평균을 한 줄씩 출력합니다.`,
      constraints: "1 ≤ K ≤ N ≤ 1000",
      initialCode: `n, k = map(int, input().split())
nums = list(map(float, input().split()))

# 크기 K 슬라이딩 윈도우의 이동 평균을 계산하세요
# 각 평균을 소수점 2자리로 출력합니다
`,
      testCases: [
        { stdin: "5 3\n1 2 3 4 5", expectedOutput: "2.00\n3.00\n4.00", label: "기본" },
        { stdin: "4 2\n1.5 2.5 3.5 4.5", expectedOutput: "2.00\n3.00\n4.00", label: "실수 입력" },
        { stdin: "3 3\n10 20 30", expectedOutput: "20.00", label: "K=N" },
        { stdin: "5 1\n1 2 3 4 5", expectedOutput: "1.00\n2.00\n3.00\n4.00\n5.00", label: "K=1" },
      ],
      hints: [
        "첫 윈도우 합을 구한 후, 이후에는 새 원소를 더하고 이전 원소를 빼는 방식(슬라이딩)으로 효율적으로 계산하세요.",
        "window_sum = sum(nums[:k]) 후, for i in range(k, n): window_sum += nums[i] - nums[i-k]",
      ],
      solutionCode: `n, k = map(int, input().split())
nums = list(map(float, input().split()))
window_sum = sum(nums[:k])
print(f"{window_sum / k:.2f}")
for i in range(k, n):
    window_sum += nums[i] - nums[i - k]
    print(f"{window_sum / k:.2f}")`,
      solutionExplanation: "슬라이딩 윈도우: 매번 전체를 다시 합산하는 O(NK) 대신, 윈도우를 한 칸 이동할 때 하나 빼고 하나 더해 O(N)으로 처리합니다.",
      en: {
        title: "Moving Average",
        description: `Given N and K on the first line and N floats on the second line (space-separated), print the sliding window average of size K to 2 decimal places. Print N-K+1 averages, one per line.`,
        constraints: "1 ≤ K ≤ N ≤ 1000",
        hints: [
          "Compute the first window sum, then slide by adding the incoming element and subtracting the outgoing one.",
          "window_sum = sum(nums[:k]) then for i in range(k, n): window_sum += nums[i] - nums[i-k]",
        ],
        solutionExplanation: "Sliding window: instead of recomputing the full sum each step in O(NK), shift the window by adding one element and removing one, running in O(N).",
      },
      language: "python",
    },
  ],
}
