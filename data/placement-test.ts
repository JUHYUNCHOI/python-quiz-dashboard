/**
 * 배치고사 문항 — "이 코드의 출력은?" 출력 예측 33문항.
 *
 * ── 왜 기존 연습 문제(data/practice, 885개)를 쓰지 않는가 ──────────────────
 * 1) 연습 문제는 **커리큘럼 토픽순**으로 묶여 있어 난이도가 보정돼 있지 않다.
 *    배치고사는 10단계를 균등하게 가로질러야 하므로 전용 문항이 필요하다.
 * 2) 이미 연습해 본 학생이 답을 외워 티어를 뚫는다.
 * 3) 코드 작성형은 한 문항에 5~10분이 걸려 12문항이면 시험이 한 시간이 된다.
 *    출력 예측은 30초~1분이라 12문항이 10분대에 끝난다.
 *
 * ── 정답 키의 출처 ────────────────────────────────────────────────────────
 * 전 문항을 CPython 으로 실제 실행해 stdout 을 받아 적었다 (2026-11-19).
 * 손으로 예측한 값을 쓰지 않는다 — 배치고사가 틀리면 티어 전체가 틀린다.
 *
 * ── step 과 티어의 관계 ───────────────────────────────────────────────────
 * step 1..10 은 TIERS 배열의 인덱스+1 이다. step N 을 풀 수 있으면 N번째
 * 티어 수준이라는 뜻. 학생에게 step 숫자는 보여주지 않는다.
 */

export interface PlacementItem {
  id: string
  /** 1..10 — TIERS 인덱스+1. 난이도 계단. */
  step: number
  /** 보여줄 파이썬 코드 (실행하지 않는다 — 예측 문제다) */
  code: string
  /** 검증된 정답 stdout. 여러 줄은 \n 으로 구분. */
  answer: string
  /** 무엇을 묻는지 한 줄 (문제 자체는 "출력은?" 로 공통) */
  topic: string
  topicEn: string
}

export const PLACEMENT_ITEMS: PlacementItem[] = [
  // ── step 1 — 출력·연산자 ───────────────────────────────────────────────
  { id: "p01a", step: 1, topic: "연산자 우선순위", topicEn: "Operator precedence",
    code: `print(3 + 4 * 2)`, answer: `11` },
  { id: "p01b", step: 1, topic: "문자열 반복", topicEn: "String repetition",
    code: `print("ab" * 3)`, answer: `ababab` },
  { id: "p01c", step: 1, topic: "몫과 나머지", topicEn: "Floor division & modulo",
    code: `print(10 // 3, 10 % 3)`, answer: `3 1` },

  { id: "p01d", step: 1, topic: "거듭제곱", topicEn: "Exponentiation",
    code: `print(2 ** 5)`, answer: `32` },
  { id: "p01e", step: 1, topic: "왼쪽 결합", topicEn: "Left associativity",
    code: `print(7 - 2 - 1)`, answer: `4` },
  { id: "p01f", step: 1, topic: "문자열 연결", topicEn: "String concatenation",
    code: `print("1" + "2")`, answer: `12` },

  // ── step 2 — 변수·형변환·조건 ─────────────────────────────────────────
  { id: "p02a", step: 2, topic: "변수 재대입", topicEn: "Reassigning a variable",
    code: `x = 7\nx = x + 3\nprint(x)`, answer: `10` },
  { id: "p02b", step: 2, topic: "f-string", topicEn: "f-strings",
    code: `n = 5\nprint(f"n={n * 2}")`, answer: `n=10` },
  { id: "p02c", step: 2, topic: "if / else", topicEn: "if / else",
    code: `a = 4\nif a > 3:\n    print("big")\nelse:\n    print("small")`, answer: `big` },
  { id: "p02d", step: 2, topic: "형변환", topicEn: "Type conversion",
    code: `print(int("12") + 3)`, answer: `15` },

  { id: "p02e", step: 2, topic: "튜플 언패킹", topicEn: "Tuple unpacking",
    code: `a, b = 3, 8\nprint(b - a)`, answer: `5` },
  { id: "p02f", step: 2, topic: "float 형변환", topicEn: "float conversion",
    code: `print(float("2.5") * 2)`, answer: `5.0` },
  { id: "p02g", step: 2, topic: "나머지로 짝수 판정", topicEn: "Even check with modulo",
    code: `x = 10\nif x % 2 == 0:\n    print("even")`, answer: `even` },

  // ── step 3 — 반복문 누적 ──────────────────────────────────────────────
  { id: "p03a", step: 3, topic: "합 누적", topicEn: "Accumulating a sum",
    code: `s = 0\nfor i in range(1, 5):\n    s += i\nprint(s)`, answer: `10` },
  { id: "p03b", step: 3, topic: "여러 줄 출력", topicEn: "Multi-line output",
    code: `for i in range(3):\n    print(i * i)`, answer: `0\n1\n4` },
  { id: "p03c", step: 3, topic: "곱 누적", topicEn: "Accumulating a product",
    code: `x = 1\nfor i in range(3):\n    x *= 2\nprint(x)`, answer: `8` },

  { id: "p03d", step: 3, topic: "역방향 range 와 end", topicEn: "Reverse range & end",
    code: `for i in range(5, 0, -2):\n    print(i, end=" ")`, answer: `5 3 1` },
  { id: "p03e", step: 3, topic: "조건에 맞는 개수 세기", topicEn: "Counting matches",
    code: `n = 0\nfor i in range(1, 11):\n    if i % 3 == 0:\n        n += 1\nprint(n)`, answer: `3` },
  { id: "p03f", step: 3, topic: "range 의 길이", topicEn: "Length of a range",
    code: `print(len(range(2, 10, 3)))`, answer: `3` },

  // ── step 4 — 리스트 ──────────────────────────────────────────────────
  { id: "p04a", step: 4, topic: "정렬", topicEn: "Sorting in place",
    code: `a = [3, 1, 2]\na.sort()\nprint(a)`, answer: `[1, 2, 3]` },
  { id: "p04b", step: 4, topic: "슬라이싱", topicEn: "Slicing",
    code: `a = [1, 2, 3, 4, 5]\nprint(a[1:4])`, answer: `[2, 3, 4]` },
  { id: "p04c", step: 4, topic: "append / 음수 인덱스", topicEn: "append & negative index",
    code: `a = [1, 2, 3]\na.append(4)\nprint(len(a), a[-1])`, answer: `4 4` },

  { id: "p04d", step: 4, topic: "대입은 복사가 아니다", topicEn: "Assignment is not a copy",
    code: `a = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))`, answer: `4` },
  { id: "p04e", step: 4, topic: "max 와 min", topicEn: "max & min",
    code: `a = [5, 3, 8, 1]\nprint(max(a), min(a))`, answer: `8 1` },
  { id: "p04f", step: 4, topic: "뒤집는 슬라이스", topicEn: "Reversing slice",
    code: `a = [1, 2, 3, 4]\nprint(a[::-1])`, answer: `[4, 3, 2, 1]` },

  // ── step 5 — 중첩 반복·while·문자열 메서드 ────────────────────────────
  { id: "p05a", step: 5, topic: "중첩 반복 세기", topicEn: "Counting in nested loops",
    code: `c = 0\nfor i in range(3):\n    for j in range(3):\n        if i < j:\n            c += 1\nprint(c)`, answer: `3` },
  { id: "p05b", step: 5, topic: "while 로 2진 변환", topicEn: "Binary conversion with while",
    code: `n = 13\nr = ""\nwhile n > 0:\n    r += str(n % 2)\n    n //= 2\nprint(r)`, answer: `1011` },
  { id: "p05c", step: 5, topic: "split 과 메서드 연결", topicEn: "split & method chaining",
    code: `s = "hello world"\nprint(s.split()[1].upper())`, answer: `WORLD` },

  { id: "p05d", step: 5, topic: "break 로 빠져나오기", topicEn: "Exiting with break",
    code: `i = 0\nwhile True:\n    i += 3\n    if i > 8:\n        break\nprint(i)`, answer: `9` },
  { id: "p05e", step: 5, topic: "간격 있는 슬라이스", topicEn: "Slicing with a step",
    code: `s = "abcdef"\nprint(s[1:5:2])`, answer: `bd` },
  { id: "p05f", step: 5, topic: "안쪽 반복 횟수가 변할 때", topicEn: "Variable inner loop count",
    code: `t = 0\nfor i in range(1, 4):\n    for j in range(i):\n        t += 1\nprint(t)`, answer: `6` },

  // ── step 6 — 딕셔너리·집합·정렬 키·컴프리헨션 ─────────────────────────
  { id: "p06a", step: 6, topic: "딕셔너리로 개수 세기", topicEn: "Counting with a dict",
    code: `d = {}\nfor ch in "banana":\n    d[ch] = d.get(ch, 0) + 1\nprint(d)`, answer: `{'b': 1, 'a': 3, 'n': 2}` },
  { id: "p06b", step: 6, topic: "key 로 정렬", topicEn: "Sorting with a key",
    code: `w = ["bb", "a", "ccc"]\nprint(sorted(w, key=len))`, answer: `['a', 'bb', 'ccc']` },
  { id: "p06c", step: 6, topic: "집합으로 중복 제거", topicEn: "Deduplicating with a set",
    code: `print(len(set([1, 2, 2, 3, 3, 3])))`, answer: `3` },
  { id: "p06d", step: 6, topic: "조건 붙은 컴프리헨션", topicEn: "Comprehension with a filter",
    code: `print([x * x for x in range(5) if x % 2 == 1])`, answer: `[1, 9]` },

  { id: "p06e", step: 6, topic: "딕셔너리 순회", topicEn: "Iterating a dict",
    code: `d = {"a": 1, "b": 2}\nfor k in d:\n    print(k, d[k])`, answer: `a 1\nb 2` },
  { id: "p06f", step: 6, topic: "집합은 순서가 없다", topicEn: "Sets are unordered",
    code: `print(sorted({3, 1, 2}))`, answer: `[1, 2, 3]` },
  { id: "p06g", step: 6, topic: "교집합", topicEn: "Set intersection",
    code: `a = [1, 2, 3]\nb = [2, 3, 4]\nprint(sorted(set(a) & set(b)))`, answer: `[2, 3]` },

  // ── step 7 — 함수·재귀·스코프 ─────────────────────────────────────────
  { id: "p07a", step: 7, topic: "재귀 팩토리얼", topicEn: "Recursive factorial",
    code: `def f(n):\n    return 1 if n <= 1 else n * f(n - 1)\n\nprint(f(5))`, answer: `120` },
  { id: "p07b", step: 7, topic: "가변 기본 인자", topicEn: "Mutable default argument",
    code: `def g(x, acc=[]):\n    acc.append(x)\n    return acc\n\nprint(g(1))\nprint(g(2))`, answer: `[1]\n[1, 2]` },
  { id: "p07c", step: 7, topic: "지역 변수 스코프", topicEn: "Local variable scope",
    code: `x = 1\n\ndef h():\n    x = 2\n\nh()\nprint(x)`, answer: `1` },

  { id: "p07d", step: 7, topic: "가변 인자", topicEn: "Variadic arguments",
    code: `def f(*a):\n    return len(a)\n\nprint(f(1, 2, 3))`, answer: `3` },
  { id: "p07e", step: 7, topic: "재귀 피보나치", topicEn: "Recursive Fibonacci",
    code: `def fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(7))`, answer: `13` },
  { id: "p07f", step: 7, topic: "global", topicEn: "global",
    code: `c = 0\n\ndef inc():\n    global c\n    c += 1\n\ninc()\ninc()\nprint(c)`, answer: `2` },

  // ── step 8 — 묶어 다루기·투 포인터 ───────────────────────────────────
  { id: "p08a", step: 8, topic: "enumerate", topicEn: "enumerate",
    code: `for i, ch in enumerate("abc"):\n    print(i, ch)`, answer: `0 a\n1 b\n2 c` },
  { id: "p08b", step: 8, topic: "zip 은 짧은 쪽에서 멈춘다", topicEn: "zip stops at the shorter side",
    code: `print(list(zip([1, 2, 3], "ab")))`, answer: `[(1, 'a'), (2, 'b')]` },
  { id: "p08c", step: 8, topic: "투 포인터 추적", topicEn: "Tracing two pointers",
    code: `a = [1, 2, 3, 4, 6]\ni, j = 0, len(a) - 1\ncnt = 0\nwhile i < j:\n    s = a[i] + a[j]\n    if s == 7:\n        cnt += 1\n        i += 1\n        j -= 1\n    elif s < 7:\n        i += 1\n    else:\n        j -= 1\nprint(cnt)`, answer: `2` },

  { id: "p08d", step: 8, topic: "튜플 정렬은 앞칸부터", topicEn: "Tuples sort by first slot",
    code: `p = [(2, "b"), (1, "a")]\np.sort()\nprint(p[0])`, answer: `(1, 'a')` },
  { id: "p08e", step: 8, topic: "zip 으로 딕셔너리 만들기", topicEn: "Building a dict from zip",
    code: `print(dict(zip("ab", [1, 2])))`, answer: `{'a': 1, 'b': 2}` },
  { id: "p08f", step: 8, topic: "누적합 구간 조회", topicEn: "Prefix-sum range query",
    code: `a = [2, 4, 1, 3]\npre = [0]\nfor x in a:\n    pre.append(pre[-1] + x)\nprint(pre[3] - pre[1])`, answer: `5` },

  // ── step 9 — 알고리즘 추적 ───────────────────────────────────────────
  { id: "p09a", step: 9, topic: "이분 탐색 반복 횟수", topicEn: "Binary search step count",
    code: `a = [1, 3, 5, 7, 9, 11, 13]\nlo, hi, steps = 0, len(a) - 1, 0\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    steps += 1\n    if a[mid] == 11:\n        break\n    if a[mid] < 11:\n        lo = mid + 1\n    else:\n        hi = mid - 1\nprint(steps)`, answer: `2` },
  { id: "p09b", step: 9, topic: "동전 DP", topicEn: "Coin-change DP",
    code: `coins = [1, 3, 4]\ndp = [0] + [99] * 6\nfor i in range(1, 7):\n    for c in coins:\n        if i >= c:\n            dp[i] = min(dp[i], dp[i - c] + 1)\nprint(dp[6])`, answer: `2` },
  { id: "p09c", step: 9, topic: "제너레이터는 늦게 실행된다", topicEn: "Generators are lazy",
    code: `def gen():\n    for i in range(3):\n        print("y", i)\n        yield i\n\ng = gen()\nprint("start")\nprint(next(g))`, answer: `start\ny 0\n0` },

  { id: "p09d", step: 9, topic: "BFS 방문 순서", topicEn: "BFS visit order",
    code: `from collections import deque\n\ng = {1: [2, 3], 2: [4], 3: [4], 4: []}\nq = deque([1])\nseen = {1}\norder = []\nwhile q:\n    v = q.popleft()\n    order.append(v)\n    for w in g[v]:\n        if w not in seen:\n            seen.add(w)\n            q.append(w)\nprint(order)`, answer: `[1, 2, 3, 4]` },
  { id: "p09e", step: 9, topic: "정렬은 안정적이다", topicEn: "Sorting is stable",
    code: `a = [("b", 2), ("a", 2), ("c", 1)]\nprint(sorted(a, key=lambda x: x[1]))`, answer: `[('c', 1), ('b', 2), ('a', 2)]` },
  { id: "p09f", step: 9, topic: "유클리드 최대공약수", topicEn: "Euclidean GCD",
    code: `def gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a\n\nprint(gcd(48, 18))`, answer: `6` },

  // ── step 10 — 언어 함정 ──────────────────────────────────────────────
  { id: "p10a", step: 10, topic: "클로저의 늦은 바인딩", topicEn: "Closure late binding",
    code: `fs = []\nfor i in range(3):\n    fs.append(lambda: i)\nprint([f() for f in fs])`, answer: `[2, 2, 2]` },
  { id: "p10b", step: 10, topic: "슬라이스 대입", topicEn: "Slice assignment",
    code: `a = [1, 2, 3, 4, 5]\na[1:4] = [9]\nprint(a)`, answer: `[1, 9, 5]` },
  { id: "p10c", step: 10, topic: "리스트 곱셈은 얕은 복사다", topicEn: "List multiplication aliases rows",
    code: `g = [[0] * 3] * 2\ng[0][0] = 1\nprint(g)`, answer: `[[1, 0, 0], [1, 0, 0]]` },
  { id: "p10d", step: 10, topic: "== 와 is 의 차이", topicEn: "== versus is",
    code: `print([1, 2] == [1, 2], [1, 2] is [1, 2])`, answer: `True False` },
  { id: "p10e", step: 10, topic: "실수는 정확하지 않다", topicEn: "Floats are inexact",
    code: `print(0.1 + 0.2 == 0.3)`, answer: `False` },
  { id: "p10f", step: 10, topic: "기본 인자는 한 번만 만들어진다", topicEn: "Default args are created once",
    code: `def f(n, memo={}):\n    if n in memo:\n        return "cached"\n    memo[n] = n\n    return "computed"\n\nprint(f(1))\nprint(f(1))`, answer: `computed\ncached` },
  { id: "p10g", step: 10, topic: "참/거짓 연산은 값을 돌려준다", topicEn: "Boolean operators return values",
    code: `print([] or "x", 0 and 5, bool("0"))`, answer: `x 0 True` },
]

export const PLACEMENT_MIN_STEP = 1
export const PLACEMENT_MAX_STEP = 10

const BY_STEP = new Map<number, PlacementItem[]>()
for (const it of PLACEMENT_ITEMS) {
  const arr = BY_STEP.get(it.step) ?? []
  arr.push(it)
  BY_STEP.set(it.step, arr)
}

export function itemsAtStep(step: number): PlacementItem[] {
  return BY_STEP.get(step) ?? []
}

// ── 채점 ──────────────────────────────────────────────────────────────────

/**
 * 출력 비교용 정규화.
 *
 * 관용 범위를 좁게 잡는다 — 넓히면 `3 1` 과 `31` 이 같아져서 시험이 무너진다.
 *   - 줄 단위 trim, 뒤쪽 빈 줄 제거
 *   - 줄 안의 연속 공백은 한 칸으로
 *   - 큰따옴표는 작은따옴표로 (파이썬 repr 이 작은따옴표를 쓰므로)
 * 대소문자는 **구분한다** — `True` / `WORLD` 가 정답의 일부다.
 */
export function normalizeOutput(s: string): string {
  return s
    .replace(/\r/g, "")
    .split("\n")
    .map(l => l.trim().replace(/\s+/g, " ").replace(/"/g, "'"))
    .join("\n")
    .replace(/\n+$/, "")
}

/** 구두점 옆 공백만 추가로 흘려준다 — `[1,2,3]` 과 `[1, 2, 3]` 을 같게 본다. */
function punctLoose(s: string): string {
  return s.replace(/\s*([,[\](){}:])\s*/g, "$1")
}

export function isPlacementCorrect(input: string, answer: string): boolean {
  const a = normalizeOutput(input)
  const b = normalizeOutput(answer)
  if (a === b) return true
  return punctLoose(a) === punctLoose(b)
}
