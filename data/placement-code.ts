/**
 * 배치고사 문제 은행 — **백준식 코딩 문제 10개** (단계 1..10에 각 1개).
 *
 * ── 왜 출력 예측을 걷어냈나 ───────────────────────────────────────────────
 * 예전 배치고사는 "이 코드의 출력은?" 12문항 + 코드 작성 2문항이었다.
 * 출력 예측은 빠르다는 장점이 있지만 **읽기 능력만 잰다.** 우리가 배치하려는
 * 자리(티어)에서 학생이 할 일은 처음부터 끝까지 "문제를 읽고 코드를 짜는 것"
 * 하나다. 재는 것과 쓸 것이 다르면 배치가 틀린다.
 *
 * 그래서 배치고사는 **전부 코딩 문제**다. 이분 탐색이 단계를 한 번씩만
 * 방문하므로 3~4문항으로 끝난다 (`lib/placement-engine.ts`).
 *
 * ── 문제문은 백준 형식을 따른다 ───────────────────────────────────────────
 * 제목 / 문제 / 입력 / 출력 / 제한 / 예제 입력·출력.
 * 학생이 대회·백준에서 실제로 만나는 모양 그대로다. "입력 형식을 몰라서
 * 틀리는" 일을 줄이려고 **예제는 반드시 공개**한다 (`sampleCount`).
 *
 * ⚠️ 문제문은 `whitespace-pre-wrap` 으로 생짜 렌더된다 — 마크다운이 아니다.
 *    `**강조**` 를 쓰면 학생 화면에 별표가 그대로 보인다.
 *
 * ── 난이도 배분: 브론즈 2 · 실버 3 · 골드 3 · 플래티넘 2 ──────────────────
 * `step` 은 난이도 순서(1이 제일 쉬움)이고, `tier` 는 그 문제를 풀었을 때
 * 받는 티어다. 둘은 **1:1이 아니다** — 실버와 골드에 문제를 하나씩 더 둔다.
 *
 * 왜 가운데가 두꺼운가: 학교에서 코딩을 배운 학생 대부분이 실버~골드에
 * 몰린다. 1:1로 두면 그 구간의 판정이 문제 하나에 달려 있어서, 한 문제의
 * 난이도를 잘못 매긴 순간 학생 다수가 한 칸씩 밀린다. 사람이 적은 브론즈·
 * 플래티넘은 한 칸 오차가 영향을 덜 준다.
 *
 * 마스터·그랜드마스터 문제는 **은행에 아예 없다.** 배치고사로 받을 수 있는
 * 최고 티어가 "은행에 있는 가장 높은 티어"로 자동 결정된다 — 엔진에 상한
 * 숫자를 따로 박아 두면 은행과 어긋날 수 있다.
 *
 * ── 난이도의 기준은 사다리(`ladder-data`)의 level 이다 ─────────────────────
 * 배치가 끝나면 학생은 그 티어의 **연습 문제 10개**를 풀어 승급한다. 배치
 * 문제가 연습 문제보다 어려우면 "배치는 통과했는데 승급 문제는 쉬운" 또는 그
 * 반대의 어긋남이 생긴다. 그래서 티어는 감으로 매기지 않고, 사다리에 있는
 * **같은 문제의 level** 을 찾아 그 티어를 그대로 쓴다.
 *
 * 실제로 대조해서 4개를 고쳤다 (2026-11-24):
 *   양수/음수 개수(lv13=브론즈 I)가 실버 II에, 가장 많이 나온 단어(lv22=
 *   실버 I)가 골드 II에 있었다. 특히 연결 요소의 개수는 사다리에서 **lv48 =
 *   마스터**다 — 그걸 플래티넘 II 자리에 두고 있었다. 사다리의 DFS·BFS 는
 *   전부 lv45 이상이므로 **그래프 탐색 문제는 배치고사에 넣을 수 없다.**
 *
 * ── 제한은 실제로 지키는 값만 적는다 ──────────────────────────────────────
 * 백준은 N ≤ 100,000 같은 큰 제한으로 시간복잡도를 강제하지만, 우리 채점은
 * 작은 테스트만 돌린다. 지키지도 않는 큰 제한을 적으면 "제한을 읽고 누적합을
 * 짠 학생"과 "이중 루프를 짠 학생"이 똑같이 통과해 제한이 거짓말이 된다.
 * 그래서 테스트가 실제로 담보하는 범위만 적는다.
 *
 * ── 정답 키의 출처 ────────────────────────────────────────────────────────
 * 전 문제를 `scripts/gen-placement-keys.py` 의 레퍼런스 해답으로 **실제
 * 실행해서** 받은 stdout 이다. 손으로 예측한 값은 한 개도 없다.
 * 테스트케이스를 고치려면 그 스크립트를 고치고 다시 돌려 붙여넣는다.
 */

import type { TierId } from "@/lib/tier-system"

export interface PlacementCodeTask {
  id: string
  /**
   * 난이도 순서 1..10 (1이 제일 쉬움). 이분 탐색이 이 값으로 구간을 좁힌다.
   * 학생에게 숫자는 보여주지 않는다 — 보여주면 일부러 틀리는 선택이 생긴다.
   */
  step: number
  /** 이 문제를 풀었을 때 받는 티어. 아래 `step` 과 1:1이 아니다 (머리말 참고). */
  tier: TierId
  /** 어떤 능력을 보는지 한 줄. 결과 화면의 해설에 쓴다. */
  skill: string
  skillEn: string
  title: string
  titleEn: string
  /** 문제 — 무엇을 구하는가 */
  desc: string
  descEn: string
  /** 입력 형식. 바이트 비교 채점이므로 빠짐없이 적는다. */
  input: string
  inputEn: string
  /** 출력 형식 */
  output: string
  outputEn: string
  /** 제한. 테스트가 실제로 담보하는 범위만 적는다. */
  limits: string
  limitsEn: string
  /**
   * `tests` 중 **앞에서 몇 개를 예제로 공개**하는가.
   * 예제와 테스트를 따로 적으면 둘이 어긋난다 — 한 배열에서 잘라 쓴다.
   */
  sampleCount: number
  /** stdin → 기대 stdout. 전부 통과해야 합격. */
  tests: { stdin: string; expected: string }[]
}

export const PLACEMENT_CODE_TASKS: PlacementCodeTask[] = [
  {
    id: "pc01", step: 1, tier: "bronze2",
    skill: "입출력과 사칙연산", skillEn: "I/O and arithmetic",
    title: "합과 차", titleEn: "Sum and Difference",
    desc:
      "두 정수 A와 B가 주어진다. A+B와 A-B를 구하는 프로그램을 작성하시오.",
    descEn:
      "Two integers A and B are given. Write a program that computes A+B and A-B.",
    input:
      "첫째 줄에 A와 B가 공백 한 칸으로 구분되어 주어진다.",
    inputEn:
      "The first line contains A and B, separated by a single space.",
    output:
      "첫째 줄에 A+B를, 둘째 줄에 A-B를 출력한다.",
    outputEn:
      "Print A+B on the first line and A-B on the second line.",
    limits: "-1,000 ≤ A, B ≤ 1,000",
    limitsEn: "-1,000 ≤ A, B ≤ 1,000",
    sampleCount: 1,
    tests: [
      { stdin: "3 4\n", expected: "7\n-1" },
      { stdin: "-10 25\n", expected: "15\n-35" },
      { stdin: "0 0\n", expected: "0\n0" },
      { stdin: "1000 -1000\n", expected: "0\n2000" },
    ],
  },
  {
    id: "pc02", step: 2, tier: "bronze1",
    skill: "조건문", skillEn: "Conditionals",
    title: "성적 등급", titleEn: "Letter Grade",
    desc:
      "시험 점수를 등급으로 바꾼다. 90점 이상은 A, 80점 이상은 B, 70점 이상은 C, " +
      "60점 이상은 D, 그보다 낮으면 F이다.\n" +
      "점수가 주어졌을 때 등급을 출력하는 프로그램을 작성하시오.",
    descEn:
      "A test score maps to a letter grade. 90 or above is A, 80 or above is B, " +
      "70 or above is C, 60 or above is D, and anything lower is F.\n" +
      "Given a score, write a program that prints its grade.",
    input: "첫째 줄에 점수 S가 주어진다.",
    inputEn: "The first line contains the score S.",
    output: "등급을 나타내는 대문자 한 글자를 출력한다.",
    outputEn: "Print the grade as a single uppercase letter.",
    limits: "0 ≤ S ≤ 100 (S는 정수)",
    limitsEn: "0 ≤ S ≤ 100 (S is an integer)",
    sampleCount: 2,
    tests: [
      { stdin: "95\n", expected: "A" },
      { stdin: "72\n", expected: "C" },
      { stdin: "80\n", expected: "B" },
      { stdin: "60\n", expected: "D" },
      { stdin: "59\n", expected: "F" },
      { stdin: "100\n", expected: "A" },
      { stdin: "0\n", expected: "F" },
    ],
  },
  {
    id: "pc03", step: 3, tier: "silver2",
    skill: "중복 제거와 정렬", skillEn: "Deduplication and sorting",
    title: "중복 빼고 정렬", titleEn: "Sort Without Duplicates",
    desc:
      "N개의 정수가 주어진다. 이 중 중복을 없애고, 남은 수들을 작은 것부터 " +
      "차례로 출력하는 프로그램을 작성하시오.",
    descEn:
      "N integers are given. Write a program that removes duplicates and prints the " +
      "remaining numbers in increasing order.",
    input:
      "첫째 줄에 정수의 개수 N이 주어진다.\n둘째 줄에 N개의 정수가 공백으로 구분되어 주어진다.",
    inputEn:
      "The first line contains the count N.\nThe second line contains N integers separated by spaces.",
    output:
      "중복을 없앤 수들을 오름차순으로 한 줄에 출력한다. 수 사이는 공백 한 칸으로 구분한다.",
    outputEn:
      "Print the deduplicated numbers in increasing order on one line, separated by single spaces.",
    limits: "1 ≤ N ≤ 100, 각 정수의 절댓값은 1,000 이하",
    limitsEn: "1 ≤ N ≤ 100, and each integer has absolute value at most 1,000",
    sampleCount: 1,
    tests: [
      { stdin: "5\n3 1 3 2 1\n", expected: "1 2 3" },
      { stdin: "1\n7\n", expected: "7" },
      { stdin: "4\n5 5 5 5\n", expected: "5" },
      { stdin: "6\n-1 0 -1 2 0 3\n", expected: "-1 0 2 3" },
    ],
  },
  {
    id: "pc04", step: 4, tier: "silver2",
    skill: "리스트와 인덱스", skillEn: "Lists and indices",
    title: "최댓값은 몇 번째", titleEn: "Where Is the Maximum",
    desc:
      "서로 다른 N개의 정수가 주어진다. 이 중 최댓값을 찾고, 그 최댓값이 몇 번째 " +
      "수인지 구하는 프로그램을 작성하시오.",
    descEn:
      "N distinct integers are given. Write a program that finds the maximum and " +
      "reports its position in the input.",
    input:
      "첫째 줄에 정수의 개수 N이 주어진다.\n둘째 줄에 서로 다른 N개의 정수가 공백으로 구분되어 주어진다.",
    inputEn:
      "The first line contains the count N.\nThe second line contains N distinct integers separated by spaces.",
    output:
      "첫째 줄에 최댓값을, 둘째 줄에 그 최댓값이 몇 번째 수인지 출력한다. " +
      "첫 번째 수를 1번째로 센다.",
    outputEn:
      "Print the maximum on the first line, then its position on the second line. " +
      "The first number counts as position 1.",
    limits: "1 ≤ N ≤ 100, 각 정수의 절댓값은 1,000 이하",
    limitsEn: "1 ≤ N ≤ 100, and each integer has absolute value at most 1,000",
    sampleCount: 1,
    tests: [
      { stdin: "5\n3 29 38 12 57\n", expected: "57\n5" },
      { stdin: "3\n-5 -2 -9\n", expected: "-2\n2" },
      { stdin: "1\n7\n", expected: "7\n1" },
      { stdin: "4\n10 40 20 30\n", expected: "40\n2" },
    ],
  },
  {
    id: "pc05", step: 5, tier: "silver1",
    skill: "문자열 다루기", skillEn: "String manipulation",
    title: "회문 판별", titleEn: "Palindrome Check",
    desc:
      "앞에서 읽어도 뒤에서 읽어도 똑같은 문자열을 회문이라고 한다. " +
      "예를 들어 level은 회문이고, python은 회문이 아니다.\n" +
      "문자열이 주어졌을 때 회문인지 판별하는 프로그램을 작성하시오.",
    descEn:
      "A string that reads the same forwards and backwards is a palindrome. " +
      "For example, level is a palindrome but python is not.\n" +
      "Given a string, write a program that decides whether it is a palindrome.",
    input: "첫째 줄에 영어 소문자로만 이루어진 문자열 S가 주어진다.",
    inputEn: "The first line contains a string S made only of lowercase English letters.",
    output: "S가 회문이면 1, 아니면 0을 출력한다.",
    outputEn: "Print 1 if S is a palindrome, otherwise print 0.",
    limits: "S의 길이는 1 이상 100 이하이고, 공백은 없다.",
    limitsEn: "The length of S is between 1 and 100, and it contains no spaces.",
    sampleCount: 2,
    tests: [
      { stdin: "level\n", expected: "1" },
      { stdin: "python\n", expected: "0" },
      { stdin: "a\n", expected: "1" },
      { stdin: "abba\n", expected: "1" },
      { stdin: "abca\n", expected: "0" },
    ],
  },
  {
    id: "pc06", step: 6, tier: "gold2",
    skill: "함수와 수학", skillEn: "Functions and math",
    title: "소수 찾기", titleEn: "Counting Primes",
    desc:
      "1보다 큰 자연수 중에서 1과 자기 자신만을 약수로 가지는 수를 소수라고 한다. " +
      "1은 소수가 아니다.\n" +
      "주어진 수들 중 소수가 몇 개인지 구하는 프로그램을 작성하시오.",
    descEn:
      "A prime is a natural number greater than 1 whose only divisors are 1 and itself. " +
      "1 is not prime.\n" +
      "Write a program that counts how many of the given numbers are prime.",
    input:
      "첫째 줄에 수의 개수 N이 주어진다.\n둘째 줄에 N개의 수가 공백으로 구분되어 주어진다.",
    inputEn:
      "The first line contains the count N.\nThe second line contains N numbers separated by spaces.",
    output: "주어진 수들 중 소수의 개수를 출력한다.",
    outputEn: "Print how many of the given numbers are prime.",
    limits: "1 ≤ N ≤ 100. 각 수는 1 이상 1,000 이하의 자연수다.",
    limitsEn: "1 ≤ N ≤ 100. Each number is a natural number between 1 and 1,000.",
    sampleCount: 1,
    tests: [
      { stdin: "4\n1 3 5 7\n", expected: "3" },
      { stdin: "5\n2 4 6 8 9\n", expected: "1" },
      { stdin: "1\n1\n", expected: "0" },
      { stdin: "3\n997 999 1000\n", expected: "1" },
    ],
  },
  {
    id: "pc07", step: 7, tier: "gold2",
    skill: "딕셔너리와 다중 기준 정렬", skillEn: "Dictionaries and multi-key sorting",
    title: "많이 나온 단어 K개", titleEn: "Top K Frequent Words",
    desc:
      "N개의 단어가 주어진다. 많이 나온 순서대로 K개의 단어를 출력하는 프로그램을 " +
      "작성하시오.\n" +
      "나온 횟수가 같은 단어끼리는 사전순으로 앞선 것을 먼저 출력한다.",
    descEn:
      "N words are given. Write a program that prints K words, most frequent first.\n" +
      "Words that appear the same number of times are printed in alphabetical order.",
    input:
      "첫째 줄에 단어의 개수 N과 출력할 개수 K가 공백으로 구분되어 주어진다.\n" +
      "다음 N개의 줄에 단어가 한 줄에 하나씩 주어진다.",
    inputEn:
      "The first line contains the number of words N and the count to print K, separated by a space.\n" +
      "Each of the next N lines contains one word.",
    output: "조건에 맞는 단어 K개를 한 줄에 하나씩 순서대로 출력한다.",
    outputEn: "Print the K words in order, one per line.",
    limits:
      "1 ≤ N ≤ 100. K는 1 이상이고 서로 다른 단어의 개수 이하다. " +
      "각 단어는 영어 소문자로만 이루어지고 길이는 20 이하다.",
    limitsEn:
      "1 ≤ N ≤ 100. K is at least 1 and at most the number of distinct words. " +
      "Each word is made of lowercase English letters and is at most 20 characters long.",
    sampleCount: 1,
    tests: [
      { stdin: "6 2\napple\nbanana\napple\ncherry\nbanana\napple\n", expected: "apple\nbanana" },
      { stdin: "4 2\nb\na\nb\na\n", expected: "a\nb" },
      { stdin: "1 1\nhello\n", expected: "hello" },
      { stdin: "7 3\nz\ny\nz\nx\ny\nz\nw\n", expected: "z\ny\nw" },
    ],
  },
  {
    id: "pc08", step: 8, tier: "gold1",
    skill: "누적 합", skillEn: "Prefix sums",
    title: "구간 합 구하기", titleEn: "Range Sum Queries",
    desc:
      "N개의 수가 순서대로 주어진다. 이때 i번째 수부터 j번째 수까지의 합을 " +
      "묻는 질의가 M번 들어온다. 각 질의의 답을 구하는 프로그램을 작성하시오.",
    descEn:
      "N numbers are given in order. Then M queries arrive, each asking for the sum " +
      "of the i-th through j-th numbers. Write a program that answers every query.",
    input:
      "첫째 줄에 수의 개수 N과 질의의 개수 M이 공백으로 구분되어 주어진다.\n" +
      "둘째 줄에 N개의 수가 공백으로 구분되어 주어진다.\n" +
      "다음 M개의 줄에 질의마다 i와 j가 공백으로 구분되어 주어진다. 양 끝을 모두 포함한다.",
    inputEn:
      "The first line contains N and M, separated by a space.\n" +
      "The second line contains N numbers separated by spaces.\n" +
      "Each of the next M lines contains i and j, separated by a space. Both ends are inclusive.",
    output: "M개의 줄에 각 질의의 답을 순서대로 한 줄씩 출력한다.",
    outputEn: "Print the answer to each query on its own line, in order.",
    limits:
      "1 ≤ N, M ≤ 1,000. 첫 번째 수를 1번째로 센다 (1 ≤ i ≤ j ≤ N). " +
      "각 수의 절댓값은 1,000 이하다.",
    limitsEn:
      "1 ≤ N, M ≤ 1,000. The first number counts as position 1 (1 ≤ i ≤ j ≤ N). " +
      "Each number has absolute value at most 1,000.",
    sampleCount: 1,
    tests: [
      { stdin: "5 3\n5 4 3 2 1\n1 3\n2 4\n5 5\n", expected: "12\n9\n1" },
      { stdin: "3 1\n1 2 3\n1 3\n", expected: "6" },
      { stdin: "4 2\n1 1 1 1\n2 2\n1 4\n", expected: "1\n4" },
    ],
  },
  {
    id: "pc09", step: 9, tier: "plat2",
    skill: "정렬 후 훑기", skillEn: "Sort and sweep",
    title: "구간 병합", titleEn: "Merging Intervals",
    desc:
      "수직선 위의 구간 N개가 주어진다. 겹치는 구간들을 하나로 합쳤을 때 남는 " +
      "구간들을 구하는 프로그램을 작성하시오.\n" +
      "두 구간은 한 점이라도 공유하면 겹친 것으로 본다. 예를 들어 [1, 4]와 [4, 5]는 " +
      "합쳐서 [1, 5]가 된다.",
    descEn:
      "N intervals on a number line are given. Write a program that merges overlapping " +
      "intervals and reports the ones that remain.\n" +
      "Two intervals overlap if they share even a single point. For example, [1, 4] and " +
      "[4, 5] merge into [1, 5].",
    input:
      "첫째 줄에 구간의 개수 N이 주어진다.\n" +
      "다음 N개의 줄에 구간의 왼쪽 끝 L과 오른쪽 끝 R이 공백으로 구분되어 주어진다.\n" +
      "구간은 양 끝을 모두 포함하며, 아무 순서로나 주어진다.",
    inputEn:
      "The first line contains the number of intervals N.\n" +
      "Each of the next N lines contains an interval's left end L and right end R, separated by a space.\n" +
      "Intervals include both ends and are given in no particular order.",
    output:
      "첫째 줄에 합친 뒤 남은 구간의 개수를 출력한다.\n" +
      "다음 줄부터 남은 구간을 왼쪽 끝이 작은 것부터 한 줄에 하나씩 \"L R\" 형태로 출력한다.",
    outputEn:
      "On the first line, print how many intervals remain after merging.\n" +
      "Then print each remaining interval as \"L R\" on its own line, ordered by left end.",
    limits: "1 ≤ N ≤ 1,000, 0 ≤ L ≤ R ≤ 10,000",
    limitsEn: "1 ≤ N ≤ 1,000 and 0 ≤ L ≤ R ≤ 10,000",
    sampleCount: 1,
    tests: [
      { stdin: "4\n1 3\n2 6\n8 10\n15 18\n", expected: "3\n1 6\n8 10\n15 18" },
      { stdin: "2\n1 4\n4 5\n", expected: "1\n1 5" },
      { stdin: "1\n5 7\n", expected: "1\n5 7" },
      { stdin: "3\n5 6\n1 2\n3 4\n", expected: "3\n1 2\n3 4\n5 6" },
      { stdin: "3\n1 10\n2 3\n4 5\n", expected: "1\n1 10" },
    ],
  },
  {
    id: "pc10", step: 10, tier: "plat1",
    skill: "동적 계획법", skillEn: "Dynamic programming",
    title: "동전 최소 개수", titleEn: "Fewest Coins",
    desc:
      "N가지 종류의 동전이 있다. 이 동전들을 적절히 써서 가치의 합이 K원이 되게 하고 싶다.\n" +
      "이때 쓰는 동전 개수를 최소로 하는 프로그램을 작성하시오. " +
      "같은 종류의 동전을 여러 번 써도 된다.",
    descEn:
      "There are N kinds of coins. You want to combine them so that their values sum to K.\n" +
      "Write a program that uses as few coins as possible. You may use the same kind of coin " +
      "more than once.",
    input:
      "첫째 줄에 동전의 종류 수 N과 목표 금액 K가 공백으로 구분되어 주어진다.\n" +
      "다음 N개의 줄에 각 동전의 가치가 한 줄에 하나씩 주어진다.",
    inputEn:
      "The first line contains the number of coin kinds N and the target amount K, separated by a space.\n" +
      "Each of the next N lines contains the value of one coin.",
    output:
      "K원을 만드는 데 필요한 동전 개수의 최솟값을 출력한다. " +
      "K원을 만들 수 없으면 -1을 출력한다.",
    outputEn:
      "Print the minimum number of coins needed to make K. " +
      "If K cannot be made, print -1.",
    limits: "1 ≤ N ≤ 100, 1 ≤ K ≤ 10,000. 각 동전의 가치는 1 이상 10,000 이하다.",
    limitsEn: "1 ≤ N ≤ 100 and 1 ≤ K ≤ 10,000. Each coin value is between 1 and 10,000.",
    sampleCount: 2,
    tests: [
      { stdin: "3 15\n1\n5\n12\n", expected: "3" },
      { stdin: "2 7\n3\n5\n", expected: "-1" },
      { stdin: "1 10\n3\n", expected: "-1" },
      { stdin: "3 6\n1\n3\n4\n", expected: "2" },
      { stdin: "2 10\n2\n5\n", expected: "2" },
    ],
  },
]

const BY_STEP = new Map<number, PlacementCodeTask>(
  PLACEMENT_CODE_TASKS.map(t => [t.step, t]),
)

/** 은행에 있는 가장 높은 단계 = 이분 탐색 구간의 위쪽 끝. */
export const CODE_TASK_MAX_STEP = Math.max(...PLACEMENT_CODE_TASKS.map(t => t.step))

/** **정확히** 그 단계의 문제. 없으면 null — 아래로 내려가지 않는다. */
export function codeTaskAtStep(step: number): PlacementCodeTask | null {
  return BY_STEP.get(step) ?? null
}

/**
 * 그 단계의 문제. 단계가 비어 있으면 **바로 아래 단계**로 내려간다.
 * 이분 탐색이 빈 단계를 짚었을 때 시험이 거기서 끝나지 않게 하는 보험이다.
 */
export function codeTaskForStep(step: number): PlacementCodeTask | null {
  for (let s = step; s >= 1; s--) {
    const t = BY_STEP.get(s)
    if (t) return t
  }
  return null
}

export function findCodeTask(id: string): PlacementCodeTask | undefined {
  return PLACEMENT_CODE_TASKS.find(t => t.id === id)
}

/** 학생에게 공개하는 예제 입출력. `tests` 의 앞에서 `sampleCount` 개를 잘라 쓴다. */
export function codeTaskSamples(t: PlacementCodeTask) {
  return t.tests.slice(0, t.sampleCount)
}

/**
 * 화면에 쓸 한 언어짜리 문제문.
 *
 * 필드를 화면에서 하나하나 `lang === "ko" ? x : xEn` 로 고르면 한 군데를
 * 빠뜨렸을 때 한국어가 영어 화면에 섞여 나온다 (이 앱에서 실제로 반복된
 * 사고다). 고르는 자리를 여기 한 곳으로 모은다.
 */
export function codeTaskText(t: PlacementCodeTask, lang: string) {
  const ko = lang === "ko"
  return {
    title: ko ? t.title : t.titleEn,
    skill: ko ? t.skill : t.skillEn,
    desc: ko ? t.desc : t.descEn,
    input: ko ? t.input : t.inputEn,
    output: ko ? t.output : t.outputEn,
    limits: ko ? t.limits : t.limitsEn,
  }
}
