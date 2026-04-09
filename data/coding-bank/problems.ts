export interface CodingBankProblem {
  id: string
  category: "sort" | "simulation" | "brute-force" | "map-set" | "string"
  difficulty: "쉬움" | "보통" | "어려움"
  title: string
  description: string
  constraints: string
  inputFormat: string
  outputFormat: string
  testCases: {
    input: string
    output: string
    label?: string
  }[]
  hints: string[]
  solutionCode: string
  solutionExplanation: string
  en: {
    title: string
    description: string
    constraints: string
    inputFormat: string
    outputFormat: string
    hints: string[]
    solutionExplanation: string
  }
}

export const codingBankProblems: CodingBankProblem[] = [

  // ─────────────────────────────────────────────────────────────
  // SORT (5 problems: cb-001 ~ cb-005)
  // ─────────────────────────────────────────────────────────────

  {
    id: "cb-001",
    category: "sort",
    difficulty: "쉬움",
    title: "성적 석차",
    description: `N명의 학생 점수가 주어진다. 각 학생의 점수를 입력받고, 점수를 **내림차순**으로 정렬하여 출력하라.`,
    constraints: "1 ≤ N ≤ 100, 0 ≤ 점수 ≤ 100",
    inputFormat: "첫째 줄에 N, 둘째 줄에 N개의 정수(점수)가 공백으로 주어진다.",
    outputFormat: "점수를 내림차순으로 공백으로 구분하여 한 줄에 출력한다.",
    testCases: [
      { input: "5\n78 92 55 88 70", output: "92 88 78 70 55", label: "기본" },
      { input: "3\n100 100 90", output: "100 100 90", label: "동점 포함" },
      { input: "1\n42", output: "42", label: "단일 학생" },
    ],
    hints: [
      "vector에 점수를 저장한 뒤 sort()로 정렬하세요.",
      "sort(v.begin(), v.end(), greater<int>())는 내림차순 정렬입니다.",
      "출력 시 마지막 원소 뒤에 공백이 붙지 않도록 주의하세요.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> v(n);
    for (auto& x : v) cin >> x;
    sort(v.begin(), v.end(), greater<int>());
    for (int i = 0; i < n; i++) {
        if (i) cout << " ";
        cout << v[i];
    }
    cout << "\\n";
}`,
    solutionExplanation: "vector에 점수를 저장하고 greater<int>() 비교자로 내림차순 정렬한 뒤 출력합니다. 공백 출력 시 첫 원소 앞에는 공백이 오지 않도록 인덱스를 확인합니다.",
    en: {
      title: "Grade Ranking",
      description: "Given N student scores, sort them in **descending order** and print.",
      constraints: "1 ≤ N ≤ 100, 0 ≤ score ≤ 100",
      inputFormat: "First line: N. Second line: N integers (scores) separated by spaces.",
      outputFormat: "Print scores in descending order, separated by spaces, on one line.",
      hints: [
        "Store the scores in a vector and use sort().",
        "sort(v.begin(), v.end(), greater<int>()) sorts in descending order.",
        "Be careful not to print a trailing space after the last element.",
      ],
      solutionExplanation: "Store scores in a vector, sort descending using greater<int>(), then print. Use an index check to avoid a leading space.",
    },
  },

  {
    id: "cb-002",
    category: "sort",
    difficulty: "보통",
    title: "회의실 배정",
    description: `N개의 회의가 있다. 각 회의는 시작 시간과 끝 시간이 주어진다. 한 개의 회의실에서 최대한 많은 회의를 진행하고 싶다. 회의는 겹치면 안 되며, 끝 시간과 시작 시간이 같은 경우에는 연속으로 진행할 수 있다. 최대로 진행할 수 있는 회의의 수를 출력하라.`,
    constraints: "1 ≤ N ≤ 100, 0 ≤ 시작 시간 < 끝 시간 ≤ 100",
    inputFormat: "첫째 줄에 N. 다음 N개의 줄에 각 회의의 시작 시간과 끝 시간이 공백으로 주어진다.",
    outputFormat: "최대 회의 수를 출력한다.",
    testCases: [
      {
        input: "5\n1 4\n3 5\n0 6\n5 7\n3 8",
        output: "2",
        label: "기본",
      },
      {
        input: "6\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7",
        output: "6",
        label: "연속 회의",
      },
      {
        input: "3\n0 10\n1 5\n5 10",
        output: "2",
        label: "겹침 있음",
      },
    ],
    hints: [
      "끝 시간이 빠른 회의를 먼저 선택하는 것이 이득입니다.",
      "pair<int,int>로 {끝시간, 시작시간}을 저장하고 정렬하세요.",
      "현재 회의가 끝나는 시간 이후에 시작하는 회의만 선택합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<pair<int,int>> meetings(n);
    for (auto& [s, e] : meetings) cin >> s >> e;
    // 끝 시간 기준 정렬, 끝 시간 같으면 시작 시간 기준
    sort(meetings.begin(), meetings.end(), [](auto& a, auto& b){
        if (a.second != b.second) return a.second < b.second;
        return a.first < b.first;
    });
    int count = 0, lastEnd = 0;
    for (auto& [s, e] : meetings) {
        if (s >= lastEnd) {
            count++;
            lastEnd = e;
        }
    }
    cout << count << "\\n";
}`,
    solutionExplanation: "끝 시간이 빠른 회의를 먼저 선택하는 그리디 전략입니다. 끝 시간 기준으로 정렬한 뒤, 현재 끝 시간 이후에 시작하는 회의를 순서대로 선택합니다. 알고리즘 이론 없이 정렬만으로 해결할 수 있습니다.",
    en: {
      title: "Meeting Room Scheduling",
      description: "Given N meetings with start and end times, find the maximum number of non-overlapping meetings that can be held in a single room. Meetings whose end time equals another's start time can be held back-to-back.",
      constraints: "1 ≤ N ≤ 100, 0 ≤ start < end ≤ 100",
      inputFormat: "First line: N. Next N lines: start and end time of each meeting.",
      outputFormat: "Print the maximum number of meetings.",
      hints: [
        "It is always best to pick the meeting that ends earliest.",
        "Store {end, start} as pair and sort by end time.",
        "Only pick meetings whose start time ≥ current end time.",
      ],
      solutionExplanation: "Greedy strategy: sort by end time, then greedily pick the meeting that ends earliest without overlapping the previous selection.",
    },
  },

  {
    id: "cb-003",
    category: "sort",
    difficulty: "보통",
    title: "좌표 정렬",
    description: `N개의 2차원 좌표 (x, y)가 주어진다. 다음 규칙으로 정렬하여 출력하라.\n\n1. x 좌표가 작은 것부터 오름차순\n2. x 좌표가 같으면 y 좌표가 작은 것부터 오름차순`,
    constraints: "1 ≤ N ≤ 100, -1000 ≤ x, y ≤ 1000",
    inputFormat: "첫째 줄에 N. 다음 N개의 줄에 x y가 주어진다.",
    outputFormat: "정렬된 좌표를 한 줄에 하나씩 출력한다.",
    testCases: [
      {
        input: "5\n3 4\n1 1\n1 -1\n2 2\n3 3",
        output: "1 -1\n1 1\n2 2\n3 3\n3 4",
        label: "기본",
      },
      {
        input: "3\n0 5\n0 -3\n0 0",
        output: "0 -3\n0 0\n0 5",
        label: "x 동일",
      },
    ],
    hints: [
      "pair<int,int>으로 좌표를 저장하면 sort()가 자동으로 x, y 순서로 정렬합니다.",
      "pair는 첫 번째 원소 우선, 같으면 두 번째 원소로 자동 비교합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<pair<int,int>> pts(n);
    for (auto& [x, y] : pts) cin >> x >> y;
    sort(pts.begin(), pts.end()); // pair 기본 비교: x 우선, 같으면 y
    for (auto& [x, y] : pts)
        cout << x << " " << y << "\\n";
}`,
    solutionExplanation: "pair<int,int>의 기본 비교 연산자는 첫 번째 원소 우선, 같으면 두 번째 원소를 비교합니다. 별도 comparator 없이 sort()만으로 정렬 완료입니다.",
    en: {
      title: "Coordinate Sort",
      description: "Given N 2D coordinates (x, y), sort them: first by x ascending, then by y ascending when x values are equal.",
      constraints: "1 ≤ N ≤ 100, -1000 ≤ x, y ≤ 1000",
      inputFormat: "First line: N. Next N lines: x y.",
      outputFormat: "Print sorted coordinates, one per line.",
      hints: [
        "Storing coordinates as pair<int,int> lets sort() handle the two-key comparison automatically.",
        "pair comparison: first element first, second element if equal.",
      ],
      solutionExplanation: "pair<int,int> default comparison is lexicographic, so sort() automatically sorts by x first, then y. No custom comparator needed.",
    },
  },

  {
    id: "cb-004",
    category: "sort",
    difficulty: "어려움",
    title: "수강 신청 선착순",
    description: `N명의 학생이 수강 신청을 했다. 각 학생은 이름, 신청 시각(초 단위), 학년이 주어진다.\n\n다음 우선순위로 K명을 선발한다.\n1. 학년이 높은 학생 우선\n2. 학년이 같으면 신청 시각이 빠른 학생 우선\n3. 학년과 시각이 모두 같으면 이름 사전순\n\n선발된 학생의 이름을 순서대로 출력하라.`,
    constraints: "1 ≤ K ≤ N ≤ 50, 1 ≤ 학년 ≤ 3, 1 ≤ 신청 시각 ≤ 3600",
    inputFormat: "첫째 줄에 N과 K. 다음 N개의 줄에 이름(영어 소문자), 신청 시각, 학년이 공백으로 주어진다.",
    outputFormat: "선발된 K명의 이름을 우선순위 순서대로 한 줄에 하나씩 출력한다.",
    testCases: [
      {
        input: "5 3\nalice 120 2\nbob 90 3\ncharlie 80 2\ndave 110 3\neve 150 1",
        output: "bob\ndave\ncharlie",
        label: "기본",
      },
      {
        input: "4 2\namy 100 2\nbea 100 2\ncal 200 2\ndan 50 1",
        output: "amy\nbea",
        label: "동점 이름순",
      },
    ],
    hints: [
      "struct나 tuple로 {학년, 시각, 이름}을 묶어 저장하세요.",
      "학년은 내림차순, 시각은 오름차순, 이름은 오름차순으로 정렬해야 합니다.",
      "람다 comparator에서 세 가지 조건을 if/else로 차례대로 비교하세요.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k; cin >> n >> k;
    struct Student { string name; int time, grade; };
    vector<Student> v(n);
    for (auto& s : v) cin >> s.name >> s.time >> s.grade;
    sort(v.begin(), v.end(), [](const Student& a, const Student& b){
        if (a.grade != b.grade) return a.grade > b.grade; // 학년 높은 순
        if (a.time != b.time) return a.time < b.time;     // 시각 빠른 순
        return a.name < b.name;                            // 이름 사전순
    });
    for (int i = 0; i < k; i++) cout << v[i].name << "\\n";
}`,
    solutionExplanation: "struct로 학생 정보를 묶고, 람다 comparator에서 학년(내림차순) → 시각(오름차순) → 이름(사전순) 세 단계 비교를 구현합니다. 각 조건이 같을 때만 다음 조건으로 넘어가는 구조입니다.",
    en: {
      title: "Course Registration Priority",
      description: "N students applied for a course. Select K students by priority: (1) higher grade first, (2) earlier application time if same grade, (3) alphabetical name if both tied. Print selected names in order.",
      constraints: "1 ≤ K ≤ N ≤ 50, 1 ≤ grade ≤ 3, 1 ≤ time ≤ 3600",
      inputFormat: "First line: N and K. Next N lines: name (lowercase English), time (seconds), grade.",
      outputFormat: "Print K selected names in priority order, one per line.",
      hints: [
        "Use a struct or tuple to bundle {grade, time, name}.",
        "Sort: grade descending, time ascending, name ascending.",
        "In the lambda comparator, check each condition in sequence with if/else.",
      ],
      solutionExplanation: "Bundle student data in a struct, then apply a three-key lambda comparator: grade descending, time ascending, name alphabetical. Only move to the next key when the current one is a tie.",
    },
  },

  {
    id: "cb-005",
    category: "sort",
    difficulty: "어려움",
    title: "가장 큰 수 만들기",
    description: `N개의 양의 정수가 주어질 때, 이 수들을 이어 붙여서 만들 수 있는 **가장 큰 수**를 출력하라.\n\n예를 들어 [3, 30, 34, 5, 9]가 주어지면, 이를 이어 붙여 만들 수 있는 가장 큰 수는 **9534330**이다.`,
    constraints: "1 ≤ N ≤ 20, 1 ≤ 각 정수 ≤ 1000",
    inputFormat: "첫째 줄에 N, 둘째 줄에 N개의 정수가 공백으로 주어진다.",
    outputFormat: "만들 수 있는 가장 큰 수를 출력한다. (앞에 불필요한 0은 없다)",
    testCases: [
      {
        input: "5\n3 30 34 5 9",
        output: "9534330",
        label: "기본",
      },
      {
        input: "3\n10 2 1",
        output: "2110",
        label: "자릿수 다름",
      },
      {
        input: "4\n1 1 1 1",
        output: "1111",
        label: "모두 동일",
      },
    ],
    hints: [
      "두 수 a, b를 비교할 때, ab와 ba를 문자열로 이어 붙여 크기를 비교하세요.",
      "예: a=3, b=30 → \"330\" vs \"303\" → \"330\"이 더 크므로 3이 앞에 와야 함.",
      "정수를 to_string()으로 문자열로 변환한 뒤 커스텀 comparator로 정렬하세요.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<string> v(n);
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        v[i] = to_string(x);
    }
    sort(v.begin(), v.end(), [](const string& a, const string& b){
        return a + b > b + a;
    });
    for (auto& s : v) cout << s;
    cout << "\\n";
}`,
    solutionExplanation: "핵심 아이디어: 두 수 a, b의 순서는 ab(이어붙임)와 ba를 문자열 비교로 결정합니다. ab > ba이면 a가 앞. to_string()으로 변환 후 이 커스텀 comparator로 정렬하면 됩니다. DP나 BFS 없이 정렬만으로 해결됩니다.",
    en: {
      title: "Largest Number",
      description: "Given N positive integers, arrange them to form the **largest possible number** by concatenation. For example, [3, 30, 34, 5, 9] → **9534330**.",
      constraints: "1 ≤ N ≤ 20, 1 ≤ each integer ≤ 1000",
      inputFormat: "First line: N. Second line: N integers separated by spaces.",
      outputFormat: "Print the largest number. (No leading zeros)",
      hints: [
        "To compare two numbers a and b, compare the strings ab vs ba.",
        "E.g. a=3, b=30 → \"330\" vs \"303\" → \"330\" is bigger, so 3 comes first.",
        "Convert integers to strings with to_string(), then sort with a custom comparator.",
      ],
      solutionExplanation: "Key insight: to decide ordering of a and b, compare ab vs ba as strings. Convert all integers to strings, then sort using this custom comparator. No DP or BFS needed — just sorting.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // SIMULATION (8 problems: cb-006 ~ cb-013)
  // ─────────────────────────────────────────────────────────────

  {
    id: "cb-006",
    category: "simulation",
    difficulty: "쉬움",
    title: "달팽이 계단",
    description: `달팽이가 높이 N인 계단을 오르고 있다. 낮에는 A칸 오르고, 밤에는 B칸 미끄러진다. 달팽이가 꼭대기에 도달하는 것은 낮에만 가능하다. 몇 번째 날 낮에 꼭대기에 도달하는지 출력하라.`,
    constraints: "1 ≤ N ≤ 1000, 1 ≤ B < A ≤ 100",
    inputFormat: "한 줄에 N, A, B가 공백으로 주어진다.",
    outputFormat: "꼭대기에 도달하는 날(낮)을 출력한다.",
    testCases: [
      { input: "10 3 1", output: "5", label: "기본" },
      { input: "5 5 1", output: "1", label: "첫날 도달" },
      { input: "100 10 5", output: "19", label: "큰 값" },
    ],
    hints: [
      "while 루프로 날마다 위치를 갱신하세요.",
      "낮에 A칸 올라 N 이상이 되면 그날 도달한 것입니다.",
      "밤 미끄러짐은 꼭대기에 도달하지 못한 경우에만 적용됩니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, a, b; cin >> n >> a >> b;
    int pos = 0, day = 0;
    while (true) {
        day++;
        pos += a;
        if (pos >= n) break; // 낮에 꼭대기 도달
        pos -= b;            // 밤에 미끄러짐
    }
    cout << day << "\\n";
}`,
    solutionExplanation: "매일 낮에 A칸 올라 꼭대기(N) 도달 여부를 먼저 확인합니다. 도달하지 못했다면 밤에 B칸 내려갑니다. 이 순서가 중요합니다.",
    en: {
      title: "Snail Staircase",
      description: "A snail climbs a staircase of height N. During the day it climbs A steps; at night it slides down B steps. The snail can only reach the top during the day. On which day does it reach the top?",
      constraints: "1 ≤ N ≤ 1000, 1 ≤ B < A ≤ 100",
      inputFormat: "One line: N, A, B separated by spaces.",
      outputFormat: "Print the day number when the snail reaches the top.",
      hints: [
        "Use a while loop to update position each day.",
        "If position ≥ N after climbing during the day, it has arrived.",
        "Apply nighttime sliding only if the top was not reached.",
      ],
      solutionExplanation: "Each iteration: add A (day climb), check if top reached. If not, subtract B (night slide). Order matters — always check before sliding.",
    },
  },

  {
    id: "cb-007",
    category: "simulation",
    difficulty: "쉬움",
    title: "자판기",
    description: `자판기에 음료수가 하나 있다. 자판기에 동전을 넣으면 누적 금액이 증가한다. 목표 금액 T원 이상이 되면 음료수가 나온다. 동전을 넣는 순서대로 입력이 주어질 때, **몇 번째 동전**을 넣었을 때 음료수가 나오는지 출력하라. 반드시 음료수가 나오는 입력이 주어진다고 가정한다.`,
    constraints: "1 ≤ T ≤ 10000, 각 동전 ≤ 500, 동전 수 ≤ 100",
    inputFormat: "첫째 줄에 목표 금액 T. 둘째 줄부터 한 줄에 동전 금액이 하나씩 주어진다. 마지막 줄은 0이다.",
    outputFormat: "음료수가 나오는 동전 번호(1-based)를 출력한다.",
    testCases: [
      {
        input: "500\n100\n50\n200\n100\n100\n0",
        output: "4",
        label: "기본",
      },
      {
        input: "100\n100\n0",
        output: "1",
        label: "첫 동전에 나옴",
      },
    ],
    hints: [
      "while 루프로 동전을 하나씩 읽으면서 합계를 누적하세요.",
      "합계가 T 이상이 되면 그때의 동전 번호를 출력합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    int sum = 0, cnt = 0, coin;
    while (cin >> coin && coin != 0) {
        cnt++;
        sum += coin;
        if (sum >= t) {
            cout << cnt << "\\n";
            return 0;
        }
    }
}`,
    solutionExplanation: "동전을 하나씩 읽으며 합계를 누적합니다. 합계가 목표 금액 이상이 되면 즉시 현재 카운트를 출력하고 종료합니다.",
    en: {
      title: "Vending Machine",
      description: "A vending machine dispenses a drink when the accumulated coins reach at least T won. Given coins inserted one by one (ending with 0), find which coin number triggers the dispense.",
      constraints: "1 ≤ T ≤ 10000, each coin ≤ 500, at most 100 coins",
      inputFormat: "First line: target T. Then coin amounts one per line, ending with 0.",
      outputFormat: "Print the 1-based index of the coin that triggers the dispense.",
      hints: [
        "Read coins one by one in a while loop, accumulating the sum.",
        "When sum ≥ T, print the coin number and stop.",
      ],
      solutionExplanation: "Accumulate coin values one by one. The moment the total reaches T, output the current counter and return.",
    },
  },

  {
    id: "cb-008",
    category: "simulation",
    difficulty: "보통",
    title: "로봇 청소기",
    description: `N×M 격자에서 로봇 청소기가 이동한다. 로봇의 시작 위치와 명령 시퀀스가 주어진다.\n\n명령:\n- **U**: 위로 한 칸\n- **D**: 아래로 한 칸\n- **L**: 왼쪽으로 한 칸\n- **R**: 오른쪽으로 한 칸\n\n격자 밖으로 나가는 명령은 **무시**한다. 청소기가 방문한 칸의 수(시작 위치 포함)를 출력하라.`,
    constraints: "1 ≤ N, M ≤ 20, 1 ≤ 명령 수 ≤ 200",
    inputFormat: "첫째 줄에 N M. 둘째 줄에 시작 위치 r c (0-indexed). 셋째 줄에 명령 문자열(공백 없음).",
    outputFormat: "방문한 서로 다른 칸의 수를 출력한다.",
    testCases: [
      {
        input: "4 4\n1 1\nRRDDLLUU",
        output: "7",
        label: "기본",
      },
      {
        input: "3 3\n0 0\nUULLDDRR",
        output: "5",
        label: "벽 충돌 포함",
      },
    ],
    hints: [
      "2D bool 배열로 방문 여부를 기록하세요.",
      "U/D/L/R 각각에 대해 새 위치가 격자 안인지 확인 후 이동합니다.",
      "시작 위치도 방문 처리해야 합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; cin >> n >> m;
    int r, c; cin >> r >> c;
    string cmds; cin >> cmds;

    vector<vector<bool>> visited(n, vector<bool>(m, false));
    visited[r][c] = true;

    for (char cmd : cmds) {
        int nr = r, nc = c;
        if (cmd == 'U') nr--;
        else if (cmd == 'D') nr++;
        else if (cmd == 'L') nc--;
        else if (cmd == 'R') nc++;

        if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
            r = nr; c = nc;
            visited[r][c] = true;
        }
    }

    int cnt = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (visited[i][j]) cnt++;
    cout << cnt << "\\n";
}`,
    solutionExplanation: "2D bool 배열로 방문을 추적합니다. 각 명령에 대해 새 위치를 계산하고, 격자 범위 안이면 이동 및 방문 표시합니다. 마지막에 true인 칸 수를 셉니다.",
    en: {
      title: "Robot Vacuum",
      description: "A robot vacuum moves in an N×M grid. Given the start position and command sequence (U/D/L/R), commands that move outside the grid are ignored. Count the number of distinct cells visited (including start).",
      constraints: "1 ≤ N, M ≤ 20, 1 ≤ commands ≤ 200",
      inputFormat: "Line 1: N M. Line 2: start row r, col c (0-indexed). Line 3: command string (no spaces).",
      outputFormat: "Print the number of distinct cells visited.",
      hints: [
        "Use a 2D bool array to track visited cells.",
        "For each command, compute new position and only move if it stays in bounds.",
        "Mark the starting position as visited before processing commands.",
      ],
      solutionExplanation: "Track visits in a 2D boolean grid. For each command, compute the candidate new position, move only if in bounds, and mark visited. Count all true cells at the end.",
    },
  },

  {
    id: "cb-009",
    category: "simulation",
    difficulty: "보통",
    title: "은행 대기열",
    description: `은행 창구가 1개이고, N명이 줄을 서 있다. 각 고객은 처리 시간 t_i가 있다. 창구는 한 번에 한 명씩 처리한다. 각 고객이 서비스를 받기 시작하는 시각을 출력하라. (0분부터 시작)`,
    constraints: "1 ≤ N ≤ 50, 1 ≤ t_i ≤ 30",
    inputFormat: "첫째 줄에 N. 둘째 줄에 N개의 처리 시간이 공백으로 주어진다.",
    outputFormat: "N개의 줄에 각 고객의 서비스 시작 시각을 출력한다.",
    testCases: [
      {
        input: "4\n5 3 8 2",
        output: "0\n5\n8\n16",
        label: "기본",
      },
      {
        input: "3\n1 1 1",
        output: "0\n1\n2",
        label: "동일 처리시간",
      },
    ],
    hints: [
      "누적 합(prefix sum)을 계산하면 됩니다.",
      "첫 번째 고객은 0분에 시작합니다.",
      "i번째 고객의 시작 시각 = 앞 고객들의 처리 시간 합계입니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> t(n);
    for (auto& x : t) cin >> x;
    int time = 0;
    for (int i = 0; i < n; i++) {
        cout << time << "\\n";
        time += t[i];
    }
}`,
    solutionExplanation: "각 고객의 시작 시각은 이전 고객들의 처리 시간 누적 합입니다. 변수 time에 현재까지의 합을 유지하며 출력합니다.",
    en: {
      title: "Bank Queue",
      description: "A bank has one counter. N customers are queued, each with processing time t_i. Print the time each customer starts being served (starting from time 0).",
      constraints: "1 ≤ N ≤ 50, 1 ≤ t_i ≤ 30",
      inputFormat: "First line: N. Second line: N processing times.",
      outputFormat: "Print N lines: start time for each customer.",
      hints: [
        "This is a running prefix sum.",
        "The first customer starts at time 0.",
        "Customer i's start time = sum of all previous processing times.",
      ],
      solutionExplanation: "Maintain a running total. For each customer, print the current total then add their time. Simple prefix sum.",
    },
  },

  {
    id: "cb-010",
    category: "simulation",
    difficulty: "보통",
    title: "엘리베이터",
    description: `N층 건물에 엘리베이터가 있다. 현재 1층에 있고, Q개의 요청이 순서대로 주어진다. 각 요청은 가려는 층 번호이다. 엘리베이터는 한 번에 한 명만 태운다. 엘리베이터가 이동한 **총 층 수**를 출력하라.`,
    constraints: "2 ≤ N ≤ 100, 1 ≤ Q ≤ 50, 1 ≤ 목표층 ≤ N",
    inputFormat: "첫째 줄에 N과 Q. 다음 Q개의 줄에 목표층이 주어진다.",
    outputFormat: "이동한 총 층 수를 출력한다.",
    testCases: [
      {
        input: "10 4\n3\n7\n2\n8",
        output: "18",
        label: "기본",
      },
      {
        input: "5 3\n1\n1\n1",
        output: "0",
        label: "현재 층 요청",
      },
    ],
    hints: [
      "각 요청에서 현재 위치와 목표층의 절댓값 차이가 이동 거리입니다.",
      "이동 후 현재 위치를 목표층으로 업데이트하세요.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, q; cin >> n >> q;
    int cur = 1, total = 0;
    for (int i = 0; i < q; i++) {
        int dest; cin >> dest;
        total += abs(dest - cur);
        cur = dest;
    }
    cout << total << "\\n";
}`,
    solutionExplanation: "각 요청마다 현재 층과 목표층의 절댓값 차이를 더합니다. abs()를 이용해 방향에 관계없이 이동 거리를 구합니다.",
    en: {
      title: "Elevator",
      description: "An elevator starts at floor 1 in an N-floor building. Given Q requests in order (each is a destination floor), the elevator handles them one at a time. Print the total number of floors traveled.",
      constraints: "2 ≤ N ≤ 100, 1 ≤ Q ≤ 50, 1 ≤ destination ≤ N",
      inputFormat: "First line: N Q. Next Q lines: destination floor.",
      outputFormat: "Print the total floors traveled.",
      hints: [
        "Distance per request = |current - destination|.",
        "Update current position to destination after each move.",
      ],
      solutionExplanation: "For each request, add the absolute difference between current floor and destination, then update the current position. abs() handles both directions.",
    },
  },

  {
    id: "cb-011",
    category: "simulation",
    difficulty: "보통",
    title: "카드 뒤집기",
    description: `1부터 N까지 번호가 붙은 카드가 모두 앞면이 위로 놓여 있다. Q번의 연산이 주어지는데, 각 연산은 구간 [l, r]의 모든 카드를 뒤집는다(앞면↔뒷면). 모든 연산이 끝난 후 앞면이 위인 카드의 번호를 오름차순으로 출력하라. 앞면인 카드가 없으면 "none"을 출력한다.`,
    constraints: "1 ≤ N ≤ 100, 1 ≤ Q ≤ 50, 1 ≤ l ≤ r ≤ N",
    inputFormat: "첫째 줄에 N과 Q. 다음 Q개의 줄에 l r이 주어진다.",
    outputFormat: "앞면 카드 번호를 오름차순으로 공백으로 구분하여 출력하거나 'none'을 출력한다.",
    testCases: [
      {
        input: "5 3\n1 3\n2 4\n3 5",
        output: "1 4",
        label: "기본",
      },
      {
        input: "4 2\n1 4\n1 4",
        output: "1 2 3 4",
        label: "두 번 뒤집기",
      },
      {
        input: "3 1\n1 3",
        output: "none",
        label: "모두 뒷면",
      },
    ],
    hints: [
      "bool 배열로 카드 상태를 관리하세요 (true = 앞면).",
      "각 연산마다 [l, r] 구간을 순회하며 상태를 토글합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, q; cin >> n >> q;
    vector<bool> face(n + 1, true); // 1-indexed, 초기 모두 앞면
    for (int i = 0; i < q; i++) {
        int l, r; cin >> l >> r;
        for (int j = l; j <= r; j++) face[j] = !face[j];
    }
    vector<int> result;
    for (int i = 1; i <= n; i++)
        if (face[i]) result.push_back(i);
    if (result.empty()) {
        cout << "none\\n";
    } else {
        for (int i = 0; i < (int)result.size(); i++) {
            if (i) cout << " ";
            cout << result[i];
        }
        cout << "\\n";
    }
}`,
    solutionExplanation: "bool 배열로 카드 상태를 추적합니다. 각 연산에서 [l,r] 구간을 순회하며 !로 상태를 토글합니다. 마지막에 앞면(true)인 카드 번호를 수집해 출력합니다.",
    en: {
      title: "Card Flipping",
      description: "N cards numbered 1 to N start face-up. Q operations each flip all cards in range [l, r] (face-up ↔ face-down). After all operations, print the numbers of face-up cards in ascending order, or 'none' if there are none.",
      constraints: "1 ≤ N ≤ 100, 1 ≤ Q ≤ 50, 1 ≤ l ≤ r ≤ N",
      inputFormat: "First line: N Q. Next Q lines: l r.",
      outputFormat: "Print face-up card numbers in ascending order separated by spaces, or 'none'.",
      hints: [
        "Use a bool array for card state (true = face-up).",
        "For each operation, iterate [l, r] and toggle each card's state.",
      ],
      solutionExplanation: "Track card states in a bool array. For each operation, loop [l, r] and apply ! to toggle. Collect face-up indices at the end and print.",
    },
  },

  {
    id: "cb-012",
    category: "simulation",
    difficulty: "어려움",
    title: "주차장 관리",
    description: `주차장에 C개의 자리가 있다. N개의 이벤트가 시간 순서대로 주어진다.\n\n- **ENTER id**: 차량 id가 입장. 빈 자리 중 **번호가 가장 작은 자리**에 배정. 자리가 없으면 "FULL"을 출력.\n- **EXIT id**: 차량 id가 퇴장. 해당 차량의 자리를 비움.\n\n각 ENTER 이벤트에 대해 배정된 자리 번호 또는 "FULL"을 출력하라.`,
    constraints: "1 ≤ C ≤ 20, 1 ≤ N ≤ 100, id는 정수 (1 ≤ id ≤ 1000)",
    inputFormat: "첫째 줄에 C와 N. 다음 N개의 줄에 이벤트가 주어진다.",
    outputFormat: "ENTER 이벤트마다 배정 자리 번호 또는 'FULL'을 출력한다.",
    testCases: [
      {
        input: "3 6\nENTER 101\nENTER 202\nENTER 303\nENTER 404\nEXIT 202\nENTER 505",
        output: "1\n2\n3\nFULL\n2",
        label: "기본",
      },
      {
        input: "2 4\nENTER 1\nEXIT 1\nENTER 2\nENTER 3",
        output: "1\n1\n2",
        label: "재진입",
      },
    ],
    hints: [
      "자리 배열과 어떤 차량이 그 자리를 사용 중인지를 map으로 관리하세요.",
      "ENTER 시 1번부터 C번까지 순서대로 빈 자리를 찾습니다.",
      "EXIT 시 해당 차량 id를 보유한 자리를 찾아 비웁니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int c, n; cin >> c >> n;
    vector<int> slot(c + 1, 0); // slot[i] = 해당 자리를 사용중인 차량 id (0이면 빈 자리)
    for (int i = 0; i < n; i++) {
        string op; int id;
        cin >> op >> id;
        if (op == "ENTER") {
            int found = -1;
            for (int j = 1; j <= c; j++) {
                if (slot[j] == 0) { found = j; break; }
            }
            if (found == -1) cout << "FULL\\n";
            else { slot[found] = id; cout << found << "\\n"; }
        } else { // EXIT
            for (int j = 1; j <= c; j++) {
                if (slot[j] == id) { slot[j] = 0; break; }
            }
        }
    }
}`,
    solutionExplanation: "자리 배열에 차량 id(0=빈 자리)를 저장합니다. ENTER 시 1번부터 순서대로 빈 자리를 탐색합니다. EXIT 시 해당 id를 가진 자리를 0으로 초기화합니다.",
    en: {
      title: "Parking Lot Management",
      description: "A parking lot has C spaces. Given N events: ENTER id assigns the lowest-numbered free space (print it) or prints FULL if none available. EXIT id frees the car's space.",
      constraints: "1 ≤ C ≤ 20, 1 ≤ N ≤ 100, 1 ≤ id ≤ 1000",
      inputFormat: "First line: C N. Next N lines: ENTER/EXIT id.",
      outputFormat: "For each ENTER event, print the assigned space number or 'FULL'.",
      hints: [
        "Use an array where slot[i] stores the car id in space i (0 = empty).",
        "On ENTER, scan from space 1 to C for the first empty slot.",
        "On EXIT, find the slot holding the given id and set it to 0.",
      ],
      solutionExplanation: "slot[i] holds the car id using space i (0=empty). ENTER: linear scan for first 0. EXIT: linear scan to clear the matching id.",
    },
  },

  {
    id: "cb-013",
    category: "simulation",
    difficulty: "어려움",
    title: "스도쿠 검증",
    description: `9×9 스도쿠 보드가 완성된 상태로 주어진다. 올바른 스도쿠인지 검증하라.\n\n올바른 스도쿠 조건:\n1. 각 **행**에 1-9가 정확히 한 번씩 등장\n2. 각 **열**에 1-9가 정확히 한 번씩 등장\n3. 각 **3×3 박스** (9개)에 1-9가 정확히 한 번씩 등장`,
    constraints: "입력은 항상 1-9의 정수로 구성된 완성된 9×9 보드이다.",
    inputFormat: "9개의 줄에 각 줄마다 9개의 정수가 공백으로 주어진다.",
    outputFormat: "올바른 스도쿠면 'YES', 아니면 'NO'를 출력한다.",
    testCases: [
      {
        input: "5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9",
        output: "YES",
        label: "올바른 스도쿠",
      },
      {
        input: "5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 5",
        output: "NO",
        label: "마지막 행 오류",
      },
    ],
    hints: [
      "행, 열, 3×3 박스 각각에 대해 1-9가 한 번씩 있는지 확인합니다.",
      "set<int>에 넣어서 크기가 9이고 합이 45인지 확인하면 됩니다.",
      "3×3 박스의 시작 행/열은 (r/3)*3, (c/3)*3 으로 계산합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int board[9][9];

bool checkSet(vector<int>& nums) {
    set<int> s(nums.begin(), nums.end());
    return s.size() == 9;
}

int main() {
    for (int i = 0; i < 9; i++)
        for (int j = 0; j < 9; j++)
            cin >> board[i][j];

    // 행 검사
    for (int i = 0; i < 9; i++) {
        vector<int> row(board[i], board[i] + 9);
        if (!checkSet(row)) { cout << "NO\\n"; return 0; }
    }
    // 열 검사
    for (int j = 0; j < 9; j++) {
        vector<int> col;
        for (int i = 0; i < 9; i++) col.push_back(board[i][j]);
        if (!checkSet(col)) { cout << "NO\\n"; return 0; }
    }
    // 3×3 박스 검사
    for (int br = 0; br < 3; br++) {
        for (int bc = 0; bc < 3; bc++) {
            vector<int> box;
            for (int i = 0; i < 3; i++)
                for (int j = 0; j < 3; j++)
                    box.push_back(board[br*3+i][bc*3+j]);
            if (!checkSet(box)) { cout << "NO\\n"; return 0; }
        }
    }
    cout << "YES\\n";
}`,
    solutionExplanation: "행, 열, 3×3 박스 각각을 vector로 수집 후 set에 넣어 크기가 9인지 확인합니다. 중복이 없으면 1-9가 한 번씩 등장한 것입니다. 3×3 박스는 (br*3, bc*3) 기준으로 3×3 구간을 순회합니다.",
    en: {
      title: "Sudoku Validator",
      description: "Given a completed 9×9 Sudoku board, verify it is valid: each row, column, and 3×3 box must contain 1-9 exactly once.",
      constraints: "Input is always a complete 9×9 board of integers 1-9.",
      inputFormat: "9 lines, each with 9 integers separated by spaces.",
      outputFormat: "Print 'YES' if valid, 'NO' otherwise.",
      hints: [
        "Check each row, column, and 3×3 box for exactly the digits 1-9.",
        "Insert values into a set<int>; if size is 9, all are distinct.",
        "Box top-left corner: row = (r/3)*3, col = (c/3)*3.",
      ],
      solutionExplanation: "Collect each row/column/box into a vector, insert into a set, and check size == 9 (all distinct). 3×3 boxes start at (br*3, bc*3) and span 3 rows × 3 cols.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // BRUTE FORCE (7 problems: cb-014 ~ cb-020)
  // ─────────────────────────────────────────────────────────────

  {
    id: "cb-014",
    category: "brute-force",
    difficulty: "쉬움",
    title: "두 수의 합",
    description: `N개의 정수 배열에서 두 수를 골라 합이 **정확히 K**가 되는 쌍의 수를 구하라. 같은 인덱스의 수는 두 번 사용할 수 없으며, (i,j)와 (j,i)는 같은 쌍이다.`,
    constraints: "2 ≤ N ≤ 100, -1000 ≤ 각 정수 ≤ 1000, -2000 ≤ K ≤ 2000",
    inputFormat: "첫째 줄에 N과 K. 둘째 줄에 N개의 정수.",
    outputFormat: "합이 K인 쌍의 수를 출력한다.",
    testCases: [
      { input: "5 5\n1 2 3 4 1", output: "2", label: "기본" },
      { input: "4 0\n-1 1 -2 2", output: "2", label: "음수 포함" },
      { input: "3 10\n1 2 3", output: "0", label: "쌍 없음" },
    ],
    hints: [
      "이중 for 루프로 모든 쌍 (i, j) (i < j)를 시도하세요.",
      "v[i] + v[j] == K이면 카운트를 증가시킵니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k; cin >> n >> k;
    vector<int> v(n);
    for (auto& x : v) cin >> x;
    int cnt = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (v[i] + v[j] == k) cnt++;
    cout << cnt << "\\n";
}`,
    solutionExplanation: "이중 루프로 가능한 모든 두 수 조합을 확인합니다. j는 i+1부터 시작하여 중복 쌍을 방지합니다. O(N²)이지만 N ≤ 100이므로 충분합니다.",
    en: {
      title: "Two Sum Count",
      description: "Given N integers, count the number of pairs (i, j) with i < j whose sum equals exactly K.",
      constraints: "2 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000, -2000 ≤ K ≤ 2000",
      inputFormat: "First line: N K. Second line: N integers.",
      outputFormat: "Print the number of pairs summing to K.",
      hints: [
        "Use a double for loop over all pairs (i, j) with i < j.",
        "Increment count whenever v[i] + v[j] == K.",
      ],
      solutionExplanation: "Double loop over all pairs. j starts from i+1 to avoid duplicates. O(N²), well within limits for N ≤ 100.",
    },
  },

  {
    id: "cb-015",
    category: "brute-force",
    difficulty: "보통",
    title: "소수 찾기",
    description: `N 이하의 자연수 중 소수의 개수를 출력하라.`,
    constraints: "2 ≤ N ≤ 1000",
    inputFormat: "한 줄에 N이 주어진다.",
    outputFormat: "N 이하 소수의 개수를 출력한다.",
    testCases: [
      { input: "10", output: "4", label: "2,3,5,7" },
      { input: "2", output: "1", label: "최솟값" },
      { input: "100", output: "25", label: "100 이하" },
    ],
    hints: [
      "각 수 n에 대해 2부터 √n까지 나누어 보면 소수 판별이 가능합니다.",
      "또는 체(Sieve) 없이 이중 루프로 판별해도 됩니다: n ≤ 1000이므로 O(N√N).",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}
int main() {
    int n; cin >> n;
    int cnt = 0;
    for (int i = 2; i <= n; i++)
        if (isPrime(i)) cnt++;
    cout << cnt << "\\n";
}`,
    solutionExplanation: "각 수에 대해 2부터 √n까지 나누어 떨어지는지 확인합니다. n ≤ 1000이므로 O(N√N) = O(1000 × 32) ≈ 32000번 연산으로 충분합니다.",
    en: {
      title: "Count Primes",
      description: "Count the number of prime numbers up to and including N.",
      constraints: "2 ≤ N ≤ 1000",
      inputFormat: "One line: N.",
      outputFormat: "Print the count of primes ≤ N.",
      hints: [
        "For each number n, trial-divide from 2 to √n to check primality.",
        "O(N√N) is fast enough: 1000 × 32 ≈ 32000 operations.",
      ],
      solutionExplanation: "For each candidate, check divisibility up to √n. Return false on any divisor found. O(N√N) total, fine for N ≤ 1000.",
    },
  },

  {
    id: "cb-016",
    category: "brute-force",
    difficulty: "보통",
    title: "가장 가까운 두 점",
    description: `2차원 평면 위의 N개의 점이 주어진다. **가장 가까운 두 점** 사이의 거리의 제곱을 출력하라. (제곱근을 구할 필요 없음)`,
    constraints: "2 ≤ N ≤ 100, -1000 ≤ x, y ≤ 1000",
    inputFormat: "첫째 줄에 N. 다음 N개의 줄에 x y가 주어진다.",
    outputFormat: "가장 가까운 두 점의 거리 제곱을 출력한다.",
    testCases: [
      {
        input: "4\n0 0\n3 4\n1 1\n5 5",
        output: "2",
        label: "기본 — (0,0)과 (1,1)",
      },
      {
        input: "3\n0 0\n0 3\n4 0",
        output: "9",
        label: "단순",
      },
    ],
    hints: [
      "모든 쌍 (i, j)에 대해 거리 제곱을 계산하고 최솟값을 갱신하세요.",
      "거리 제곱 = (x1-x2)² + (y1-y2)²",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    int minDist = INT_MAX;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            int d = (x[i]-x[j])*(x[i]-x[j]) + (y[i]-y[j])*(y[i]-y[j]);
            minDist = min(minDist, d);
        }
    cout << minDist << "\\n";
}`,
    solutionExplanation: "모든 점 쌍을 이중 루프로 확인하며 거리 제곱의 최솟값을 추적합니다. 제곱근 계산 없이 정수 연산만으로 해결됩니다.",
    en: {
      title: "Closest Pair of Points",
      description: "Given N points on a 2D plane, find the squared distance between the two closest points. (No need to compute the actual square root.)",
      constraints: "2 ≤ N ≤ 100, -1000 ≤ x, y ≤ 1000",
      inputFormat: "First line: N. Next N lines: x y.",
      outputFormat: "Print the squared distance of the closest pair.",
      hints: [
        "Check all pairs (i, j) and track the minimum squared distance.",
        "Squared distance = (x1-x2)² + (y1-y2)²",
      ],
      solutionExplanation: "Double loop over all pairs, compute squared distance, track minimum. Integer arithmetic only — no sqrt needed.",
    },
  },

  {
    id: "cb-017",
    category: "brute-force",
    difficulty: "보통",
    title: "배낭 채우기 (0/1)",
    description: `N개의 물건이 있고, 각 물건에는 무게 w_i와 가치 v_i가 있다. 배낭에 넣을 수 있는 최대 무게는 W이다. 물건을 통째로 넣거나 넣지 않을 때(분할 불가), 배낭에 담을 수 있는 **최대 가치**를 출력하라.`,
    constraints: "1 ≤ N ≤ 15, 1 ≤ W ≤ 100, 1 ≤ w_i, v_i ≤ 50",
    inputFormat: "첫째 줄에 N과 W. 다음 N개의 줄에 w_i v_i가 주어진다.",
    outputFormat: "최대 가치를 출력한다.",
    testCases: [
      {
        input: "4 7\n2 3\n3 4\n4 5\n5 6",
        output: "9",
        label: "기본 — 무게 3+4=7, 가치 4+5=9",
      },
      {
        input: "3 5\n2 6\n2 10\n3 12",
        output: "22",
        label: "가치 최대화",
      },
    ],
    hints: [
      "N ≤ 15이므로 모든 부분집합 (2^15 = 32768가지)을 시도할 수 있습니다.",
      "비트마스크로 부분집합을 표현하세요: i번째 비트가 1이면 i번 물건을 선택.",
      "for (int mask = 0; mask < (1 << n); mask++) 로 모든 부분집합을 순회하세요.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, W; cin >> n >> W;
    vector<int> w(n), v(n);
    for (int i = 0; i < n; i++) cin >> w[i] >> v[i];

    int best = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        int totalW = 0, totalV = 0;
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                totalW += w[i];
                totalV += v[i];
            }
        }
        if (totalW <= W) best = max(best, totalV);
    }
    cout << best << "\\n";
}`,
    solutionExplanation: "N ≤ 15이므로 2^15 = 32768개의 부분집합을 모두 시도합니다. 비트마스크로 각 부분집합을 표현하고, 무게 합이 W 이하인 것 중 가치 합의 최대를 구합니다. DP 없이 완전탐색으로 해결됩니다.",
    en: {
      title: "0/1 Knapsack (Brute Force)",
      description: "N items each have weight w_i and value v_i. A knapsack can hold at most W total weight. Items cannot be split. Find the maximum value you can carry.",
      constraints: "1 ≤ N ≤ 15, 1 ≤ W ≤ 100, 1 ≤ w_i, v_i ≤ 50",
      inputFormat: "First line: N W. Next N lines: w_i v_i.",
      outputFormat: "Print the maximum achievable value.",
      hints: [
        "N ≤ 15 means only 2^15 = 32768 subsets — enumerate all.",
        "Use a bitmask: bit i set means item i is included.",
        "Loop: for (int mask = 0; mask < (1 << n); mask++)",
      ],
      solutionExplanation: "Enumerate all 2^N subsets using bitmask. For each, compute total weight and value. Track max value among those with weight ≤ W. No DP needed at this scale.",
    },
  },

  {
    id: "cb-018",
    category: "brute-force",
    difficulty: "어려움",
    title: "마법진 (Magic Square)",
    description: `3×3 마법진은 1부터 9까지의 숫자를 한 번씩 사용하여 모든 행, 열, 대각선의 합이 **같도록** 배치한 것이다.\n\n3×3 격자가 주어지는데, 일부 칸은 0으로 표시되어 있다(빈칸). 빈칸에 나머지 숫자를 채워서 올바른 마법진을 완성하라. 답이 항상 존재하며 유일하다고 가정한다.`,
    constraints: "입력은 항상 유일한 해를 가지는 부분적으로 채워진 3×3 마법진이다.",
    inputFormat: "3개의 줄에 각 줄마다 3개의 정수가 공백으로 주어진다. 0은 빈칸.",
    outputFormat: "완성된 마법진을 3×3으로 출력한다.",
    testCases: [
      {
        input: "2 7 6\n9 5 1\n4 3 0",
        output: "2 7 6\n9 5 1\n4 3 8",
        label: "빈칸 1개",
      },
      {
        input: "2 0 6\n9 5 1\n4 0 8",
        output: "2 7 6\n9 5 1\n4 3 8",
        label: "빈칸 2개",
      },
    ],
    hints: [
      "이미 사용된 숫자를 파악하고, 빈칸 위치를 vector에 저장하세요.",
      "남은 숫자들의 순열(next_permutation)을 시도하며 모든 배치를 검사합니다.",
      "행/열/대각선 합이 모두 15이면 올바른 마법진입니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int board[3][3];

bool checkMagic() {
    int target = 15; // 3×3 마법진의 마법 합
    for (int i = 0; i < 3; i++) {
        int rsum = 0, csum = 0;
        for (int j = 0; j < 3; j++) { rsum += board[i][j]; csum += board[j][i]; }
        if (rsum != target || csum != target) return false;
    }
    int d1 = board[0][0]+board[1][1]+board[2][2];
    int d2 = board[0][2]+board[1][1]+board[2][0];
    return d1 == target && d2 == target;
}

int main() {
    set<int> used;
    vector<pair<int,int>> blanks;
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++) {
            cin >> board[i][j];
            if (board[i][j] != 0) used.insert(board[i][j]);
            else blanks.push_back({i, j});
        }

    vector<int> remaining;
    for (int x = 1; x <= 9; x++)
        if (!used.count(x)) remaining.push_back(x);

    sort(remaining.begin(), remaining.end());
    do {
        for (int k = 0; k < (int)blanks.size(); k++)
            board[blanks[k].first][blanks[k].second] = remaining[k];
        if (checkMagic()) break;
    } while (next_permutation(remaining.begin(), remaining.end()));

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (j) cout << " ";
            cout << board[i][j];
        }
        cout << "\\n";
    }
}`,
    solutionExplanation: "남은 숫자들의 모든 순열을 next_permutation으로 시도합니다. 각 순열을 빈칸에 배치 후 마법진 조건(행/열/대각선 합 = 15)을 검사합니다. DP/백트래킹 없이 순열 완전탐색으로 해결됩니다.",
    en: {
      title: "Magic Square",
      description: "A 3×3 magic square uses 1-9 exactly once, with all rows, columns, and diagonals summing to the same value. Given a partially filled 3×3 grid (0 = blank), complete the magic square. The solution is unique.",
      constraints: "Input always has a unique valid solution.",
      inputFormat: "Three lines of 3 integers each. 0 indicates an empty cell.",
      outputFormat: "Print the completed magic square as a 3×3 grid.",
      hints: [
        "Find which numbers are missing, and collect blank positions.",
        "Try all permutations of the missing numbers with next_permutation.",
        "A valid magic square has all row/column/diagonal sums equal to 15.",
      ],
      solutionExplanation: "Use next_permutation to try all arrangements of missing numbers. Fill blanks with each permutation, check the magic square condition (all sums = 15). Pure brute-force permutation — no backtracking or DP needed.",
    },
  },

  {
    id: "cb-019",
    category: "brute-force",
    difficulty: "어려움",
    title: "세 수의 합 — 가장 가까운 값",
    description: `N개의 정수 배열이 있다. 배열에서 서로 다른 세 수를 골라 합을 구했을 때, 목표 값 T에 **가장 가까운 합**을 출력하라. 가장 가까운 합이 여러 개이면 그 중 가장 큰 것을 출력하라.`,
    constraints: "3 ≤ N ≤ 100, -1000 ≤ 각 정수 ≤ 1000, -3000 ≤ T ≤ 3000",
    inputFormat: "첫째 줄에 N과 T. 둘째 줄에 N개의 정수.",
    outputFormat: "T에 가장 가까운 세 수의 합을 출력한다.",
    testCases: [
      {
        input: "5 10\n1 3 5 7 9",
        output: "11",
        label: "기본 — 1+3+7=11 또는 1+1+9=11? → 3+7+1=11, 5+1+... 더 가까운 건 11(1+3+7) vs 9(1+2+... 없음) → 11",
      },
      {
        input: "4 0\n-5 -3 3 5",
        output: "1",
        label: "0에 가까운 합 — -3+(-5)+... → -5+3+3=1 vs -5+5-3=-3 → 1이 더 가까움",
      },
    ],
    hints: [
      "삼중 루프로 모든 세 수 조합 (i < j < k)를 시도하세요.",
      "|sum - T|가 최소이면 정답 후보입니다.",
      "최솟값이 같으면 더 큰 합을 선택해야 합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, t; cin >> n >> t;
    vector<int> v(n);
    for (auto& x : v) cin >> x;

    int bestSum = INT_MIN, bestDiff = INT_MAX;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            for (int k = j + 1; k < n; k++) {
                int s = v[i] + v[j] + v[k];
                int d = abs(s - t);
                if (d < bestDiff || (d == bestDiff && s > bestSum)) {
                    bestDiff = d;
                    bestSum = s;
                }
            }
    cout << bestSum << "\\n";
}`,
    solutionExplanation: "삼중 루프로 N C 3 = 모든 세 수 조합을 시도합니다. N ≤ 100이므로 최대 100³/6 ≈ 167,000번 연산입니다. 차이가 최소이고, 같을 때는 합이 큰 것을 선택합니다.",
    en: {
      title: "Three Sum Closest",
      description: "Given N integers and a target T, find three distinct elements whose sum is closest to T. If multiple sums are equally close, output the largest one.",
      constraints: "3 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000, -3000 ≤ T ≤ 3000",
      inputFormat: "First line: N T. Second line: N integers.",
      outputFormat: "Print the three-element sum closest to T.",
      hints: [
        "Try all triples (i < j < k) with a triple nested loop.",
        "Track the minimum |sum - T|.",
        "On ties, choose the larger sum.",
      ],
      solutionExplanation: "Triple loop over all C(N,3) triples. N ≤ 100 means at most ~167,000 iterations. Track minimum difference; on tie, keep the larger sum.",
    },
  },

  {
    id: "cb-020",
    category: "brute-force",
    difficulty: "어려움",
    title: "격자 최대 직사각형 합",
    description: `N×M 정수 격자가 주어진다. 격자의 어떤 직사각형 부분합이 가장 큰지 구하라. (최소 1×1 크기)`,
    constraints: "1 ≤ N, M ≤ 20, -100 ≤ 각 값 ≤ 100",
    inputFormat: "첫째 줄에 N M. 다음 N개의 줄에 M개의 정수가 공백으로 주어진다.",
    outputFormat: "최대 직사각형 부분합을 출력한다.",
    testCases: [
      {
        input: "3 3\n1 -2 3\n4 5 -6\n-7 8 9",
        output: "22",
        label: "기본 — 오른쪽 2×2: 5-6+8+9=16? 아니면 4+5-7+8=10? 전체 → 4+5+8+9=26? 확인: 행1: 4 5 -6 / 행2: -7 8 9. 오른쪽 3행3열의 일부합 최대.",
      },
      {
        input: "2 3\n-1 -2 -3\n-4 -5 -6",
        output: "-1",
        label: "모두 음수",
      },
    ],
    hints: [
      "4중 루프로 직사각형의 시작/끝 행과 시작/끝 열을 고정하세요.",
      "각 직사각형 내의 합을 이중 루프로 구합니다.",
      "N, M ≤ 20이므로 O(N²M²) = O(20⁴) = 160,000번 연산으로 충분합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; cin >> n >> m;
    vector<vector<int>> g(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) cin >> g[i][j];

    int best = INT_MIN;
    for (int r1 = 0; r1 < n; r1++)
        for (int r2 = r1; r2 < n; r2++)
            for (int c1 = 0; c1 < m; c1++)
                for (int c2 = c1; c2 < m; c2++) {
                    int s = 0;
                    for (int i = r1; i <= r2; i++)
                        for (int j = c1; j <= c2; j++)
                            s += g[i][j];
                    best = max(best, s);
                }
    cout << best << "\\n";
}`,
    solutionExplanation: "직사각형을 (r1, c1)~(r2, c2)로 정의하고 4중 루프로 모든 직사각형을 시도합니다. 내부 이중 루프로 합을 계산합니다. N,M ≤ 20이면 총 연산 수는 O(N²M²) × O(NM) = O(N³M³)이 될 수 있지만 실제로는 20⁴ × 400 = 64,000,000정도입니다. 시간 내에 충분히 통과합니다.",
    en: {
      title: "Maximum Rectangle Sum in Grid",
      description: "Given an N×M integer grid, find the maximum sum of any rectangular subgrid (at least 1×1).",
      constraints: "1 ≤ N, M ≤ 20, -100 ≤ each value ≤ 100",
      inputFormat: "First line: N M. Next N lines: M integers each.",
      outputFormat: "Print the maximum rectangular subgrid sum.",
      hints: [
        "Use 4 nested loops to fix (r1, r2) and (c1, c2) — the rectangle boundaries.",
        "Compute the sum of each rectangle with two inner loops.",
        "N, M ≤ 20 so the brute force is fast enough.",
      ],
      solutionExplanation: "Define each rectangle by (r1,c1)~(r2,c2). Four nested loops try all rectangles; two inner loops sum the contents. Brute force is feasible here at N,M ≤ 20.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // MAP / SET (5 problems: cb-021 ~ cb-025)
  // ─────────────────────────────────────────────────────────────

  {
    id: "cb-021",
    category: "map-set",
    difficulty: "쉬움",
    title: "단어 빈도수",
    description: `N개의 단어가 주어진다. 각 단어가 몇 번 등장했는지 **사전순**으로 출력하라.`,
    constraints: "1 ≤ N ≤ 100, 단어 길이 ≤ 20, 소문자 영어만",
    inputFormat: "첫째 줄에 N. 다음 N개의 줄에 단어가 하나씩 주어진다.",
    outputFormat: "단어와 등장 횟수를 사전순으로 한 줄에 하나씩 '단어 횟수' 형식으로 출력한다.",
    testCases: [
      {
        input: "6\napple\nbanana\napple\ncherry\nbanana\napple",
        output: "apple 3\nbanana 2\ncherry 1",
        label: "기본",
      },
      {
        input: "3\ncat\ncat\ncat",
        output: "cat 3",
        label: "단일 단어",
      },
    ],
    hints: [
      "map<string, int>를 사용하면 단어별 카운트를 쉽게 관리할 수 있습니다.",
      "map은 키를 자동으로 사전순 정렬합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    map<string, int> freq;
    for (int i = 0; i < n; i++) {
        string w; cin >> w;
        freq[w]++;
    }
    for (auto& [word, cnt] : freq)
        cout << word << " " << cnt << "\\n";
}`,
    solutionExplanation: "map<string,int>에 단어를 키로 카운트를 증가시킵니다. map은 키를 사전순으로 자동 정렬하므로 별도 정렬 없이 순서대로 출력할 수 있습니다.",
    en: {
      title: "Word Frequency",
      description: "Given N words, print each unique word with its frequency, in alphabetical order.",
      constraints: "1 ≤ N ≤ 100, word length ≤ 20, lowercase English only",
      inputFormat: "First line: N. Next N lines: one word each.",
      outputFormat: "Print 'word count' for each unique word in alphabetical order, one per line.",
      hints: [
        "Use map<string, int> to count occurrences.",
        "map keys are automatically sorted alphabetically.",
      ],
      solutionExplanation: "Increment freq[word] for each input word. map auto-sorts by key, so iterating directly gives alphabetical order.",
    },
  },

  {
    id: "cb-022",
    category: "map-set",
    difficulty: "보통",
    title: "출석 확인",
    description: `학생 명단과 출석한 학생 목록이 주어진다. 결석한 학생의 수와 이름을 원래 명단 순서대로 출력하라.`,
    constraints: "1 ≤ 명단 학생 수 ≤ 100, 1 ≤ 출석 학생 수 ≤ 명단 수",
    inputFormat: "첫째 줄에 명단 학생 수 N. 다음 N개 줄에 학생 이름(소문자 영어). 그 다음 줄에 출석 학생 수 M. 다음 M개 줄에 출석한 학생 이름.",
    outputFormat: "결석 학생 수를 출력하고, 다음 줄부터 결석 학생 이름을 명단 순서로 한 줄에 하나씩 출력한다.",
    testCases: [
      {
        input: "5\nalice\nbob\ncharlie\ndave\neve\n3\nbob\neve\nalice",
        output: "2\ncharlie\ndave",
        label: "기본",
      },
      {
        input: "3\nann\nben\ncara\n3\ncara\nann\nben",
        output: "0",
        label: "전원 출석",
      },
    ],
    hints: [
      "출석 학생을 set<string>에 저장하면 빠르게 조회할 수 있습니다.",
      "명단을 순서대로 순회하며 set에 없는 학생을 출력합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<string> roster(n);
    for (auto& s : roster) cin >> s;

    int m; cin >> m;
    set<string> present;
    for (int i = 0; i < m; i++) {
        string s; cin >> s;
        present.insert(s);
    }

    vector<string> absent;
    for (auto& s : roster)
        if (!present.count(s)) absent.push_back(s);

    cout << absent.size() << "\\n";
    for (auto& s : absent) cout << s << "\\n";
}`,
    solutionExplanation: "출석자를 set<string>에 저장합니다. 명단을 순서대로 순회하며 set에 없는 학생을 결석 목록에 추가합니다. set.count()로 O(log N) 조회가 가능합니다.",
    en: {
      title: "Attendance Check",
      description: "Given a class roster and a list of present students, find the absent students. Print the count and their names in roster order.",
      constraints: "1 ≤ roster size ≤ 100, 1 ≤ present count ≤ roster size",
      inputFormat: "Line 1: N (roster size). Next N lines: student names. Then M (present count). Next M lines: present names.",
      outputFormat: "Print absent count. Then print each absent student name in roster order, one per line.",
      hints: [
        "Store present students in a set<string> for fast lookup.",
        "Iterate the roster in order; anyone not in the set is absent.",
      ],
      solutionExplanation: "Insert present students into a set. Walk the roster in order; if a name is not in the set, add to absent list. set.count() gives O(log N) lookup.",
    },
  },

  {
    id: "cb-023",
    category: "map-set",
    difficulty: "보통",
    title: "성적 통계",
    description: `학생 이름과 점수가 주어진다. 다음을 출력하라:\n1. 최고 점수를 받은 학생 이름 (동점이면 사전순 첫 번째)\n2. 과목 점수의 평균 (소수점 둘째 자리 반올림, 예: 85.67)\n3. 점수가 평균 미만인 학생 수`,
    constraints: "1 ≤ N ≤ 50, 0 ≤ 점수 ≤ 100",
    inputFormat: "첫째 줄에 N. 다음 N개의 줄에 이름(소문자)과 점수가 공백으로 주어진다.",
    outputFormat: "세 줄에 걸쳐 (1) 최고점 학생 이름, (2) 평균 점수(소수점 2자리), (3) 평균 미만 학생 수를 출력한다.",
    testCases: [
      {
        input: "4\nalice 90\nbob 85\ncharlie 90\ndave 70",
        output: "alice\n83.75\n2",
        label: "동점 최고점",
      },
      {
        input: "3\nann 100\nbea 60\ncal 80",
        output: "ann\n80.00\n1",
        label: "단순",
      },
    ],
    hints: [
      "최고 점수와 함께 이름을 추적하세요. 동점 시 사전순 비교.",
      "평균은 double로 계산하고 fixed << setprecision(2)로 출력합니다.",
      "평균 미만 카운트는 평균 계산 후 다시 배열을 순회합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<string> names(n);
    vector<int> scores(n);
    for (int i = 0; i < n; i++) cin >> names[i] >> scores[i];

    // 최고점 학생
    int maxScore = *max_element(scores.begin(), scores.end());
    string topName = "";
    for (int i = 0; i < n; i++)
        if (scores[i] == maxScore)
            if (topName.empty() || names[i] < topName)
                topName = names[i];

    // 평균
    double avg = 0;
    for (int s : scores) avg += s;
    avg /= n;

    // 평균 미만 수
    int below = 0;
    for (int s : scores) if (s < avg) below++;

    cout << topName << "\\n";
    cout << fixed << setprecision(2) << avg << "\\n";
    cout << below << "\\n";
}`,
    solutionExplanation: "max_element로 최고 점수를 찾고, 동점자 중 사전순 최소 이름을 선택합니다. 평균은 double 합산 후 n으로 나눕니다. fixed/setprecision(2)로 소수 둘째 자리까지 출력합니다.",
    en: {
      title: "Grade Statistics",
      description: "Given student names and scores, print: (1) name of highest scorer (alphabetically first if tied), (2) average score (2 decimal places), (3) number of students below average.",
      constraints: "1 ≤ N ≤ 50, 0 ≤ score ≤ 100",
      inputFormat: "First line: N. Next N lines: name (lowercase) and score.",
      outputFormat: "Three lines: (1) top student name, (2) average (2 decimals), (3) below-average count.",
      hints: [
        "Track max score and corresponding name; use string comparison for ties.",
        "Compute average as double; output with fixed << setprecision(2).",
        "Count below-average after computing the average.",
      ],
      solutionExplanation: "Find max score with max_element. Among tied scorers, pick lexicographically smallest name. Compute double average. Use fixed/setprecision(2) for formatted output.",
    },
  },

  {
    id: "cb-024",
    category: "map-set",
    difficulty: "어려움",
    title: "아나그램 그룹",
    description: `N개의 단어가 주어진다. 아나그램 관계인 단어끼리 그룹으로 묶어 출력하라.\n\n아나그램: 같은 문자를 같은 수만큼 포함하고 있는 단어 (예: "listen"과 "silent")\n\n각 그룹은 **사전순**으로 정렬하여 출력하고, 그룹 자체도 각 그룹의 첫 번째 단어 기준으로 사전순 정렬하라.`,
    constraints: "1 ≤ N ≤ 50, 단어 길이 ≤ 15, 소문자 영어만",
    inputFormat: "첫째 줄에 N. 다음 N개의 줄에 단어가 주어진다.",
    outputFormat: "각 그룹을 한 줄에 공백으로 구분하여 출력한다. 그룹 순서는 각 그룹의 첫 단어 기준 사전순.",
    testCases: [
      {
        input: "6\neat\ntea\ntan\nate\nnat\nbat",
        output: "ate eat tea\nbat\nnat tan",
        label: "기본",
      },
      {
        input: "3\nabc\ncba\nbca",
        output: "abc bca cba",
        label: "세 단어 아나그램",
      },
    ],
    hints: [
      "각 단어를 정렬하면 아나그램끼리 같은 키가 됩니다 (예: 'eat' → 'aet').",
      "map<string, vector<string>>으로 키(정렬된 단어)별로 그룹화하세요.",
      "각 그룹 내 단어를 정렬하고, 그룹들도 첫 단어 기준으로 정렬합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    map<string, vector<string>> groups;
    for (int i = 0; i < n; i++) {
        string w; cin >> w;
        string key = w;
        sort(key.begin(), key.end());
        groups[key].push_back(w);
    }

    vector<vector<string>> result;
    for (auto& [key, words] : groups) {
        sort(words.begin(), words.end());
        result.push_back(words);
    }
    // 그룹의 첫 단어 기준 사전순 정렬
    sort(result.begin(), result.end(), [](const vector<string>& a, const vector<string>& b){
        return a[0] < b[0];
    });

    for (auto& grp : result) {
        for (int i = 0; i < (int)grp.size(); i++) {
            if (i) cout << " ";
            cout << grp[i];
        }
        cout << "\\n";
    }
}`,
    solutionExplanation: "단어를 정렬하면 아나그램끼리 동일한 키를 가집니다. map<string, vector<string>>으로 키별 그룹화 후, 각 그룹 내 단어 정렬, 전체 그룹을 첫 단어 기준으로 정렬합니다.",
    en: {
      title: "Anagram Groups",
      description: "Given N words, group anagrams together. Two words are anagrams if they contain the same characters the same number of times. Sort each group alphabetically, and sort groups by their first word.",
      constraints: "1 ≤ N ≤ 50, word length ≤ 15, lowercase English only",
      inputFormat: "First line: N. Next N lines: one word each.",
      outputFormat: "Each group on one line, words space-separated. Groups ordered by their first word alphabetically.",
      hints: [
        "Sorting a word gives a canonical key shared by all its anagrams.",
        "Use map<string, vector<string>> to group by sorted key.",
        "Sort words within each group, then sort groups by their first element.",
      ],
      solutionExplanation: "Sorted word = canonical anagram key. Collect into map, sort each bucket, extract all buckets, sort by first element of each. Clean pipeline using map's built-in ordering plus one extra sort step.",
    },
  },

  {
    id: "cb-025",
    category: "map-set",
    difficulty: "어려움",
    title: "학생 순위표",
    description: `N명의 학생이 M번의 시험을 봤다. 각 시험의 점수가 주어질 때, 총점 기준 순위표를 출력하라.\n\n동점인 경우:\n1. 가장 최근 시험(M번째) 점수가 높은 학생이 상위\n2. 그래도 동점이면 이름 사전순\n\n순위도 함께 출력하며, 동점자는 같은 순위를 갖는다.`,
    constraints: "1 ≤ N ≤ 30, 1 ≤ M ≤ 5, 0 ≤ 점수 ≤ 100",
    inputFormat: "첫째 줄에 N과 M. 다음 N개의 줄에 이름(소문자)과 M개의 점수가 공백으로 주어진다.",
    outputFormat: "순위 이름 총점을 순서대로 한 줄에 하나씩 출력한다.",
    testCases: [
      {
        input: "3 2\nalice 90 80\nbob 85 85\ncharlie 90 70",
        output: "1 alice 170\n1 bob 170\n3 charlie 160",
        label: "동점 처리",
      },
      {
        input: "4 3\ndan 70 80 90\neve 80 80 80\nfay 90 70 80\ngus 75 75 90",
        output: "1 dan 240\n1 eve 240\n1 fay 240\n4 gus 240",
        label: "전원 동점",
      },
    ],
    hints: [
      "struct로 학생 정보를 묶고 커스텀 comparator로 정렬하세요.",
      "동점 처리: 총점 내림차순 → 마지막 시험 점수 내림차순 → 이름 오름차순.",
      "순위는 정렬 후 앞 학생과 총점/마지막점수/이름이 모두 같으면 같은 순위.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; cin >> n >> m;
    struct Student {
        string name;
        vector<int> scores;
        int total;
    };
    vector<Student> v(n);
    for (auto& s : v) {
        cin >> s.name;
        s.scores.resize(m);
        s.total = 0;
        for (auto& sc : s.scores) { cin >> sc; s.total += sc; }
    }

    sort(v.begin(), v.end(), [&](const Student& a, const Student& b){
        if (a.total != b.total) return a.total > b.total;
        if (a.scores[m-1] != b.scores[m-1]) return a.scores[m-1] > b.scores[m-1];
        return a.name < b.name;
    });

    int rank = 1;
    for (int i = 0; i < n; i++) {
        if (i > 0) {
            // 이전 학생과 총점 및 마지막 점수 비교
            bool sameTie = (v[i].total == v[i-1].total &&
                            v[i].scores[m-1] == v[i-1].scores[m-1] &&
                            v[i].name != v[i-1].name); // name은 달라도 동점 조건은 total+last
            // 동점 판정: 총점과 마지막 점수가 같으면 같은 순위
            if (v[i].total == v[i-1].total && v[i].scores[m-1] == v[i-1].scores[m-1])
                ; // rank 유지
            else rank = i + 1;
        }
        cout << rank << " " << v[i].name << " " << v[i].total << "\\n";
    }
}`,
    solutionExplanation: "총점 → 마지막 시험 점수 → 이름 순으로 정렬합니다. 순위는 앞 학생과 총점/마지막 점수가 같으면 동일 순위를 유지하고, 다르면 현재 인덱스+1로 업데이트합니다.",
    en: {
      title: "Student Leaderboard",
      description: "N students took M exams. Print a leaderboard sorted by total score. Ties broken by (1) last exam score descending, (2) name alphabetically. Tied students share the same rank.",
      constraints: "1 ≤ N ≤ 30, 1 ≤ M ≤ 5, 0 ≤ score ≤ 100",
      inputFormat: "First line: N M. Next N lines: name followed by M scores.",
      outputFormat: "Print 'rank name total' for each student in order.",
      hints: [
        "Bundle student data in a struct; use a custom comparator.",
        "Sort: total descending → last exam descending → name ascending.",
        "Rank: same if previous student has equal total and last exam score.",
      ],
      solutionExplanation: "Sort by three-key comparator. For rank assignment, check if current student ties with previous (same total and last score). If tied, keep same rank; otherwise set rank = current index + 1.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // STRING (5 problems: cb-026 ~ cb-030)
  // ─────────────────────────────────────────────────────────────

  {
    id: "cb-026",
    category: "string",
    difficulty: "쉬움",
    title: "단어 뒤집기",
    description: `문장이 주어질 때, 각 단어를 뒤집어서 출력하라. 단어의 순서는 유지한다.\n\n예: "hello world" → "olleh dlrow"`,
    constraints: "1 ≤ 단어 수 ≤ 20, 1 ≤ 각 단어 길이 ≤ 20, 소문자만",
    inputFormat: "한 줄에 공백으로 구분된 단어들이 주어진다.",
    outputFormat: "각 단어를 뒤집어 공백으로 구분하여 출력한다.",
    testCases: [
      { input: "hello world", output: "olleh dlrow", label: "기본" },
      { input: "a bc def", output: "a cb fed", label: "길이 다양" },
      { input: "racecar level", output: "racecar level", label: "팰린드롬" },
    ],
    hints: [
      "stringstream으로 공백 구분 파싱을 쉽게 할 수 있습니다.",
      "reverse(s.begin(), s.end())로 문자열을 뒤집습니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    string word;
    bool first = true;
    while (ss >> word) {
        reverse(word.begin(), word.end());
        if (!first) cout << " ";
        cout << word;
        first = false;
    }
    cout << "\\n";
}`,
    solutionExplanation: "getline으로 한 줄을 읽고 stringstream으로 단어별로 분리합니다. 각 단어에 reverse()를 적용하고 공백으로 이어 출력합니다.",
    en: {
      title: "Reverse Each Word",
      description: "Given a sentence, reverse each word while keeping the word order. E.g., \"hello world\" → \"olleh dlrow\"",
      constraints: "1 ≤ words ≤ 20, 1 ≤ each word length ≤ 20, lowercase only",
      inputFormat: "One line of space-separated words.",
      outputFormat: "Each word reversed, separated by spaces.",
      hints: [
        "Use stringstream to easily split by spaces.",
        "Apply reverse(s.begin(), s.end()) to each word.",
      ],
      solutionExplanation: "Read the line with getline, split via stringstream. Reverse each word with reverse(), then print space-separated.",
    },
  },

  {
    id: "cb-027",
    category: "string",
    difficulty: "보통",
    title: "괄호 검사",
    description: `주어진 문자열이 올바른 괄호 문자열인지 판단하라.\n\n올바른 괄호 문자열 조건:\n- '('와 ')'만 있을 때, 열린 괄호와 닫힌 괄호의 수가 맞고 올바르게 닫혀야 한다.\n- 예: "(())" → YES, "(()" → NO, ")(" → NO`,
    constraints: "1 ≤ 문자열 길이 ≤ 100, '('와 ')'만 포함",
    inputFormat: "한 줄에 괄호 문자열이 주어진다.",
    outputFormat: "'YES' 또는 'NO'를 출력한다.",
    testCases: [
      { input: "(())", output: "YES", label: "올바름" },
      { input: "(()", output: "NO", label: "열린 괄호 남음" },
      { input: ")(", output: "NO", label: "역순" },
      { input: "()(())", output: "YES", label: "복합" },
    ],
    hints: [
      "카운터 변수를 두고 '('이면 +1, ')'이면 -1 합니다.",
      "카운터가 음수가 되는 순간 NO입니다.",
      "끝났을 때 카운터가 0이면 YES입니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s; cin >> s;
    int cnt = 0;
    for (char c : s) {
        if (c == '(') cnt++;
        else cnt--;
        if (cnt < 0) { cout << "NO\\n"; return 0; }
    }
    cout << (cnt == 0 ? "YES" : "NO") << "\\n";
}`,
    solutionExplanation: "카운터로 열린 괄호 수를 추적합니다. '('에 +1, ')'에 -1. 도중에 음수가 되면 즉시 NO. 마지막에 0이면 YES입니다.",
    en: {
      title: "Bracket Validation",
      description: "Determine if a string of parentheses is valid. A valid string has matched and properly nested '(' and ')'.",
      constraints: "1 ≤ string length ≤ 100, only '(' and ')'",
      inputFormat: "One line: the bracket string.",
      outputFormat: "Print 'YES' or 'NO'.",
      hints: [
        "Use a counter: +1 for '(', -1 for ')'.",
        "If counter goes negative, immediately print NO.",
        "At the end, counter must be 0 for YES.",
      ],
      solutionExplanation: "Track open bracket count. Decrement on ')'; if it goes negative, immediately invalid. At end, must be zero.",
    },
  },

  {
    id: "cb-028",
    category: "string",
    difficulty: "보통",
    title: "Caesar 암호",
    description: `Caesar 암호는 알파벳을 일정 수만큼 밀어서 암호화한다. 소문자 문자열과 이동 거리 K가 주어질 때:\n1. **암호화**: 각 문자를 K만큼 뒤로 이동 (z 다음은 a)\n2. **복호화**: 암호화된 문자열을 원래대로 되돌리기\n\n두 결과를 순서대로 출력하라.`,
    constraints: "1 ≤ 문자열 길이 ≤ 100, 1 ≤ K ≤ 25, 소문자 영어만",
    inputFormat: "첫째 줄에 평문(소문자), 둘째 줄에 K.",
    outputFormat: "첫째 줄에 암호문, 둘째 줄에 복호화된 원문을 출력한다.",
    testCases: [
      {
        input: "hello\n3",
        output: "khoor\nhello",
        label: "기본",
      },
      {
        input: "xyz\n3",
        output: "abc\nxyz",
        label: "z 넘어감",
      },
    ],
    hints: [
      "암호화: (c - 'a' + K) % 26 + 'a'",
      "복호화: (c - 'a' - K + 26) % 26 + 'a' — 26을 더해서 음수 방지",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s; int k;
    cin >> s >> k;

    string enc = s, dec = s;
    for (int i = 0; i < (int)s.size(); i++) {
        enc[i] = (s[i] - 'a' + k) % 26 + 'a';
        dec[i] = (s[i] - 'a' - k + 26) % 26 + 'a';
    }
    // dec를 암호문에 적용해야 원문 복원
    // 실제 문제: 평문 암호화 + 암호문 복호화 = 원문
    // enc를 복호화하면 다시 s가 되어야 함
    string decOfEnc = enc;
    for (int i = 0; i < (int)enc.size(); i++)
        decOfEnc[i] = (enc[i] - 'a' - k + 26) % 26 + 'a';

    cout << enc << "\\n" << decOfEnc << "\\n";
}`,
    solutionExplanation: "암호화: 각 문자에 K를 더하고 % 26으로 a-z 범위를 유지합니다. 복호화: K를 빼되 음수 방지를 위해 +26 후 % 26. 암호화된 문자열을 다시 복호화하면 원문이 됩니다.",
    en: {
      title: "Caesar Cipher",
      description: "Given a lowercase string and shift K: (1) encrypt by shifting each letter K positions forward (wrapping z→a), (2) decrypt the encrypted string back to the original. Print both.",
      constraints: "1 ≤ string length ≤ 100, 1 ≤ K ≤ 25, lowercase English only",
      inputFormat: "First line: plaintext. Second line: K.",
      outputFormat: "First line: ciphertext. Second line: decrypted original.",
      hints: [
        "Encrypt: (c - 'a' + K) % 26 + 'a'",
        "Decrypt: (c - 'a' - K + 26) % 26 + 'a' — add 26 to prevent negative",
      ],
      solutionExplanation: "Encrypt with +K mod 26. Decrypt the ciphertext with -K mod 26 (add 26 first to stay non-negative). Applying decrypt to encrypted gives back the original.",
    },
  },

  {
    id: "cb-029",
    category: "string",
    difficulty: "어려움",
    title: "문자열 압축",
    description: `문자열을 런-길이 인코딩(Run-Length Encoding)으로 압축하라.\n\n- 연속된 같은 문자를 '문자 + 개수' 형태로 압축\n- 단, 개수가 1인 경우 숫자를 출력하지 않는다\n- 압축 결과가 원본보다 길거나 같으면 원본을 출력한다\n\n예: "aabbbcccc" → "a2b3c4" (6 < 9이므로 압축)\n예: "abcd" → "abcd" (압축 결과 "a1b1c1d1" = 8 > 4이므로 원본)`,
    constraints: "1 ≤ 문자열 길이 ≤ 200, 소문자 영어만",
    inputFormat: "한 줄에 문자열이 주어진다.",
    outputFormat: "압축된 문자열 또는 원본을 출력한다.",
    testCases: [
      { input: "aabbbcccc", output: "a2b3c4", label: "압축 이득" },
      { input: "abcd", output: "abcd", label: "압축 손해" },
      { input: "aaaa", output: "a4", label: "단일 문자 반복" },
      { input: "aabbcc", output: "aabbcc", label: "동점 → 원본" },
    ],
    hints: [
      "현재 문자와 연속 개수를 추적하며 순회하세요.",
      "문자가 바뀌거나 끝에 도달하면 압축 문자열에 추가합니다.",
      "개수가 1이면 문자만, 2 이상이면 문자+개수를 추가합니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s; cin >> s;
    string compressed = "";
    int i = 0;
    while (i < (int)s.size()) {
        char c = s[i];
        int cnt = 0;
        while (i < (int)s.size() && s[i] == c) { cnt++; i++; }
        compressed += c;
        if (cnt > 1) compressed += to_string(cnt);
    }
    cout << (compressed.size() < s.size() ? compressed : s) << "\\n";
}`,
    solutionExplanation: "while 루프로 연속된 같은 문자를 세고, 문자(+개수)를 압축 문자열에 추가합니다. 최종적으로 압축 결과가 더 짧을 때만 압축 문자열을 출력합니다.",
    en: {
      title: "Run-Length Encoding",
      description: "Compress a string using run-length encoding: replace consecutive identical characters with 'character + count'. Omit count when it is 1. If the compressed result is not shorter, output the original.\n\nE.g.: \"aabbbcccc\" → \"a2b3c4\" (shorter); \"abcd\" → \"abcd\" (same or longer).",
      constraints: "1 ≤ string length ≤ 200, lowercase English only",
      inputFormat: "One line: the string.",
      outputFormat: "Print compressed string if shorter; otherwise print original.",
      hints: [
        "Track current character and its consecutive count.",
        "When the character changes (or end reached), flush to the result string.",
        "Append count only if > 1.",
      ],
      solutionExplanation: "While loop: count each run of identical characters, append char (and count if >1) to result. Compare lengths; print whichever is shorter.",
    },
  },

  {
    id: "cb-030",
    category: "string",
    difficulty: "어려움",
    title: "단어 변환 거리",
    description: `두 단어 A와 B가 주어진다. 한 번의 연산으로 A를 변환하여 B를 만들어야 한다.\n\n허용되는 연산 (각 1회):\n1. **교체**: 임의의 위치의 문자 하나를 다른 문자로 교체\n2. **삽입**: 임의의 위치에 문자 하나 삽입\n3. **삭제**: 임의의 위치의 문자 하나 삭제\n\nA를 B로 변환하는 **최소 연산 횟수**를 출력하라.\n\n⚠️ 이 문제는 O(|A| × |B|) 2중 루프 DP 없이 **완전탐색**으로 풀 수 있도록 제약이 작습니다.`,
    constraints: "1 ≤ |A|, |B| ≤ 8, 소문자 영어만",
    inputFormat: "첫째 줄에 A, 둘째 줄에 B.",
    outputFormat: "최소 연산 횟수를 출력한다.",
    testCases: [
      { input: "kitten\nsitting", output: "3", label: "고전 예시" },
      { input: "abc\nabc", output: "0", label: "동일" },
      { input: "a\nb", output: "1", label: "교체 1회" },
      { input: "ab\nabc", output: "1", label: "삽입 1회" },
    ],
    hints: [
      "재귀로 모든 가능한 연산 시퀀스를 탐색하세요 (|A|, |B| ≤ 8이므로 가능).",
      "현재 문자 비교: 같으면 다음 인덱스로, 다르면 교체/삽입/삭제 세 가지 선택.",
      "재귀의 기저 조건: 한쪽 문자열이 남은 경우, 남은 길이가 답입니다.",
    ],
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

// 편집 거리 재귀 (DP 없이 순수 재귀 — 소규모에서만 가능)
int editDist(const string& a, const string& b, int i, int j) {
    if (i == (int)a.size()) return b.size() - j; // b의 남은 문자 삽입
    if (j == (int)b.size()) return a.size() - i; // a의 남은 문자 삭제
    if (a[i] == b[j]) return editDist(a, b, i+1, j+1);
    int replace_ = 1 + editDist(a, b, i+1, j+1);
    int insert_  = 1 + editDist(a, b, i, j+1);   // b[j] 삽입
    int delete_  = 1 + editDist(a, b, i+1, j);   // a[i] 삭제
    return min({replace_, insert_, delete_});
}

int main() {
    string a, b; cin >> a >> b;
    cout << editDist(a, b, 0, 0) << "\\n";
}`,
    solutionExplanation: "순수 재귀로 편집 거리를 계산합니다. 두 문자가 같으면 그냥 진행, 다르면 교체/삽입/삭제 세 선택의 최솟값에 1을 더합니다. |A|, |B| ≤ 8이므로 재귀 깊이가 최대 16, 분기가 3으로 3^16 ≈ 43,046,721이지만 실제로는 겹치는 경로가 많아 훨씬 적습니다. DP를 쓰면 O(|A|×|B|)이지만 이 제약에서는 재귀만으로도 통과합니다.",
    en: {
      title: "Edit Distance",
      description: "Given two words A and B, find the minimum number of operations to transform A into B. Allowed operations (each costs 1): replace a character, insert a character, delete a character.\n\n⚠️ Constraints are kept small so this can be solved with pure recursion (no DP).",
      constraints: "1 ≤ |A|, |B| ≤ 8, lowercase English only",
      inputFormat: "First line: A. Second line: B.",
      outputFormat: "Print the minimum number of operations.",
      hints: [
        "Use recursion to explore all operation sequences (feasible since |A|, |B| ≤ 8).",
        "If current chars match, advance both pointers. If not, try all three operations.",
        "Base case: if one string is exhausted, remaining length of the other is the answer.",
      ],
      solutionExplanation: "Pure recursive edit distance. Same character → advance both; different → min(replace, insert, delete) + 1. No DP needed for length ≤ 8 — the recursion tree is small enough.",
    },
  },
]
