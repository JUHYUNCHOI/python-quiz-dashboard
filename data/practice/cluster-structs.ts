import type { PracticeCluster } from "./types"

export const structsCluster: PracticeCluster = {
  id: "structs",
  title: "struct 활용",
  emoji: "📦",
  description: "struct 선언과 멤버 접근, struct 배열 정렬, 복합 조건 처리",
  unlockAfter: "cpp-14",
  en: {
    title: "Structs",
    description: "struct declarations, member access, struct arrays",
  },
  problems: [
    {
      id: "struct-001",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "쉬움",
      title: "학생 성적 평균",
      description: `N명의 학생 (이름, 점수)이 주어질 때, 각 학생의 점수와 평균을 출력하세요.
마지막 줄에 전체 평균을 정수로 출력하세요. (정수 나눗셈)`,
      constraints: "1 ≤ N ≤ 20, 0 ≤ 점수 ≤ 100, 이름은 영문 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// struct Student를 선언하세요 (name, score)

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "3\nalice 90\nbob 80\ncarol 70",
          expectedOutput: "alice 90\nbob 80\ncarol 70\nAverage: 80",
        },
        {
          stdin: "2\nzara 100\nleo 50",
          expectedOutput: "zara 100\nleo 50\nAverage: 75",
        },
      ],
      hints: [
        "struct Student { string name; int score; }; 로 구조체를 선언하세요.",
        "total / n 으로 정수 평균 계산 (정수 나눗셈)",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    int total = 0;
    for (int i = 0; i < n; i++) {
        cin >> students[i].name >> students[i].score;
        total += students[i].score;
    }
    for (auto& s : students)
        cout << s.name << " " << s.score << "\\n";
    cout << "Average: " << total / n << "\\n";
    return 0;
}`,
      solutionExplanation:
        "struct로 이름과 점수를 하나의 단위로 묶습니다. vector<Student>로 여러 학생을 관리하고, 평균은 정수 나눗셈 total / n 으로 계산합니다.",
      en: {
        title: "Student Score Average",
        description: `Given N students (name, score), print each student's name and score, then print the overall average as an integer (integer division) on the last line.`,
        constraints: "1 ≤ N ≤ 20, 0 ≤ score ≤ 100, names are up to 20 English characters",
        hints: [
          "Declare the struct as: struct Student { string name; int score; };",
          "Integer division: total / n gives the integer average.",
        ],
        solutionExplanation: "Use a struct to bundle name and score as a single unit. Manage multiple students with vector<Student>. The average is computed with integer division total / n.",
      },
    },
    {
      id: "struct-002",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "쉬움",
      title: "좌표 합계 최대값",
      description: `N개의 점 (x, y)이 주어질 때, 각 점의 x+y 값을 한 줄씩 출력하세요.
마지막 줄에 x+y 가 가장 큰 점의 번호(1-based)를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ x, y ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

// struct Point를 선언하세요 (x, y)

int sumXY(const Point& p) {
    // p.x + p.y 를 반환하세요
}

int main() {
    int n;
    cin >> n;
    vector<Point> pts(n);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "3\n3 4\n1 1\n5 0",
          expectedOutput: "7\n2\n5\nMax: 1",
        },
        {
          stdin: "2\n0 5\n3 3",
          expectedOutput: "5\n6\nMax: 2",
        },
        {
          stdin: "1\n-5 10",
          expectedOutput: "5\nMax: 1",
        },
      ],
      hints: [
        "struct Point { int x, y; };",
        "함수에서 p.x + p.y 를 반환하고, main에서 최대값을 가진 점의 번호를 찾습니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

struct Point {
    int x, y;
};

int sumXY(const Point& p) {
    return p.x + p.y;
}

int main() {
    int n;
    cin >> n;
    vector<Point> pts(n);
    for (int i = 0; i < n; i++) cin >> pts[i].x >> pts[i].y;
    int maxIdx = 0;
    for (int i = 0; i < n; i++) {
        cout << sumXY(pts[i]) << "\\n";
        if (sumXY(pts[i]) > sumXY(pts[maxIdx])) maxIdx = i;
    }
    cout << "Max: " << maxIdx + 1 << "\\n";
    return 0;
}`,
      solutionExplanation:
        "struct + 함수 조합: sumXY 함수가 Point를 받아 x+y를 반환합니다. struct를 const 참조로 전달해 복사를 방지합니다.",
      en: {
        title: "Max Coordinate Sum",
        description: `Given N points (x, y), print x+y for each point on its own line. On the last line, print the 1-based index of the point with the largest x+y.`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ x, y ≤ 1000",
        hints: [
          "struct Point { int x, y; };",
          "Return p.x + p.y from the function, then find the point with the maximum sum in main.",
        ],
        solutionExplanation: "Combining a struct with a function: sumXY receives a Point and returns x+y. Pass the struct by const reference to avoid copying.",
      },
    },
    {
      id: "struct-003",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "보통",
      title: "상품 재고 관리",
      description: `N개의 상품 (이름, 가격, 재고)이 주어질 때:
1. 재고가 0인 상품의 수
2. 전체 재고 가치 합계 (가격 × 재고)를 출력하세요.`,
      constraints:
        "1 ≤ N ≤ 50, 1 ≤ 가격 ≤ 1000, 0 ≤ 재고 ≤ 100, 상품 이름 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// struct를 선언하세요

int main() {
    int n;
    cin >> n;
    vector<Product> products(n);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "4\napple 300 10\nbanana 150 0\norange 200 5\ngrape 500 0",
          expectedOutput: "Out of stock: 2\nTotal value: 4000",
        },
        {
          stdin: "2\npencil 100 50\npen 200 30",
          expectedOutput: "Out of stock: 0\nTotal value: 11000",
        },
      ],
      hints: [
        "struct Product { string name; int price, stock; };",
        "재고 가치: p.price * p.stock을 누적",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Product {
    string name;
    int price, stock;
};

int main() {
    int n;
    cin >> n;
    vector<Product> products(n);
    for (auto& p : products)
        cin >> p.name >> p.price >> p.stock;
    int outOfStock = 0;
    int totalValue = 0;
    for (auto& p : products) {
        if (p.stock == 0) outOfStock++;
        totalValue += p.price * p.stock;
    }
    cout << "Out of stock: " << outOfStock << "\\n";
    cout << "Total value: " << totalValue << "\\n";
    return 0;
}`,
      solutionExplanation:
        "struct로 상품 속성을 묶어 vector<Product>로 관리합니다. 품절 상품 수와 총 재고 가치를 한 번의 순회로 계산합니다.",
      en: {
        title: "Inventory Management",
        description: `Given N products (name, price, stock), print: 1) the number of out-of-stock products (stock == 0), 2) the total inventory value (price × stock summed over all products).`,
        constraints: "1 ≤ N ≤ 50, 1 ≤ price ≤ 1000, 0 ≤ stock ≤ 100, product names are lowercase English up to 20 characters",
        hints: [
          "struct Product { string name; int price, stock; };",
          "Inventory value: accumulate p.price * p.stock for each product.",
        ],
        solutionExplanation: "Bundle product attributes in a struct and manage them with vector<Product>. Count out-of-stock items and total value in a single pass.",
      },
    },
    {
      id: "struct-004",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "보통",
      title: "최고 득점 학생",
      description: `N명의 학생 (이름, 국어 점수, 영어 점수)이 주어질 때, 각 학생의 "이름 총점"을 한 줄씩 출력하세요.
마지막 줄에 총점이 가장 높은 학생의 이름을 출력하세요. 동점이면 이름 오름차순으로 먼저 나오는 학생을 선택합니다.`,
      constraints:
        "1 ≤ N ≤ 100, 0 ≤ 점수 ≤ 100, 이름은 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// struct를 선언하세요

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "3\nalice 90 80\nbob 70 100\ncarol 85 85",
          expectedOutput: "alice 170\nbob 170\ncarol 170\nBest: alice",
        },
        {
          stdin: "3\nzack 50 50\nalex 90 90\nmike 80 70",
          expectedOutput: "zack 100\nalex 180\nmike 150\nBest: alex",
        },
        {
          stdin: "2\nbob 60 40\nalex 40 60",
          expectedOutput: "bob 100\nalex 100\nBest: alex",
        },
      ],
      hints: [
        "struct Student { string name; int kor, eng; int total() { return kor + eng; } };",
        "총점이 같으면 이름이 알파벳 순으로 앞선 학생이 이긴다 — a.name < b.name 으로 비교",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int kor, eng;
    int total() { return kor + eng; }
};

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    for (int i = 0; i < n; i++)
        cin >> students[i].name >> students[i].kor >> students[i].eng;
    int bestIdx = 0;
    for (int i = 0; i < n; i++) {
        cout << students[i].name << " " << students[i].total() << "\\n";
        if (students[i].total() > students[bestIdx].total()) {
            bestIdx = i;
        } else if (students[i].total() == students[bestIdx].total() &&
                   students[i].name < students[bestIdx].name) {
            bestIdx = i;
        }
    }
    cout << "Best: " << students[bestIdx].name << "\\n";
    return 0;
}`,
      solutionExplanation:
        "struct 멤버 함수 total()로 총점을 계산합니다. 선형 탐색으로 최고점 학생을 찾고, 동점이면 이름 사전순으로 앞선 학생을 선택합니다 (a.name < b.name 문자열 비교).",
      en: {
        title: "Best Student",
        description: `Given N students (name, Korean score, English score), print each student's "name total" on its own line. On the last line, print the name of the student with the highest total. For ties, choose the one with the alphabetically smaller name.`,
        constraints: "1 ≤ N ≤ 100, 0 ≤ score ≤ 100, names are lowercase English up to 20 characters",
        hints: [
          "struct Student { string name; int kor, eng; int total() { return kor + eng; } };",
          "For ties on total, pick the one with smaller name — compare using a.name < b.name.",
        ],
        solutionExplanation: "Compute the total with a struct member function total(). Use linear search to find the best student, breaking ties by string comparison a.name < b.name.",
      },
    },
    {
      id: "struct-014",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "쉬움",
      title: "짝수/홀수 분류",
      description: `N개의 정수가 주어집니다. 짝수는 짝수끼리, 홀수는 홀수끼리 모아서 개수를 출력하세요.

Even: {짝수 개수}
Odd: {홀수 개수}

💡 힌트: struct 안에 vector<int> 를 넣어서 "이 버킷의 이름"과 "여기 속한 숫자들"을 같이 담아보세요.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 값 ≤ 1000",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// TODO: struct Bucket 을 선언하세요 (label, nums — 이 버킷에 속한 숫자들)

int main() {
    int n;
    cin >> n;
    // TODO: 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "5\n1 2 3 4 5",
          expectedOutput: "Even: 2\nOdd: 3",
        },
        {
          stdin: "4\n2 4 6 8",
          expectedOutput: "Even: 4\nOdd: 0",
        },
        {
          stdin: "6\n-1 -2 0 7 10 15",
          expectedOutput: "Even: 3\nOdd: 3",
        },
      ],
      hints: [
        "struct Bucket { string label; vector<int> nums; }; — struct 안에 vector 가 들어갈 수 있어요",
        "Even, Odd 두 버킷을 만들고, 각 숫자를 x % 2 로 분기해 해당 버킷의 nums 에 push_back",
        "출력은 buckets[i].label << \": \" << buckets[i].nums.size() 형식",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Bucket {
    string label;
    vector<int> nums;
};

int main() {
    int n;
    cin >> n;
    vector<Bucket> buckets = {{"Even", {}}, {"Odd", {}}};
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x % 2 == 0) buckets[0].nums.push_back(x);
        else buckets[1].nums.push_back(x);
    }
    for (int i = 0; i < 2; i++) {
        cout << buckets[i].label << ": " << buckets[i].nums.size() << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "struct Bucket 에 라벨(\"Even\"/\"Odd\")과 vector<int> 를 같이 담아 한 단위로 다룹니다. 입력을 % 2 결과에 따라 해당 버킷에 push_back 하고, 끝나면 각 버킷의 라벨과 size() 를 출력합니다. (음수 x 에 대해서도 x%2==0 이면 짝수 — -2, 0 등 포함)",
      en: {
        title: "Even/Odd Buckets",
        description: `Given N integers, group them by parity and print each bucket's count.

Even: {count of even numbers}
Odd: {count of odd numbers}

💡 Hint: Put a vector<int> inside a struct to bundle "the bucket's name" and "the numbers in this bucket" together.`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ value ≤ 1000",
        hints: [
          "struct Bucket { string label; vector<int> nums; }; — a struct can contain a vector.",
          "Make two buckets (Even, Odd). For each number, use x % 2 to decide which bucket, then push_back.",
          "Print as: buckets[i].label << \": \" << buckets[i].nums.size()",
        ],
        solutionExplanation: "Bundle the label (\"Even\"/\"Odd\") and a vector<int> into a Bucket struct, treated as one unit. Push each input into the right bucket based on x%2, then print each bucket's label and size(). (Negative x with x%2==0 still counts as even — e.g. -2, 0.)",
      },
    },
    {
      id: "struct-013",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "보통",
      title: "동아리 회원 관리",
      description: `N개의 동아리가 있습니다. 각 동아리는 이름과 여러 명의 회원을 가집니다.
각 동아리별로 "이름: 회원수" 형식으로 출력하세요.
마지막 줄에 회원이 가장 많은 동아리의 이름을 "Largest: 이름" 형식으로 출력하세요. 동점이면 입력 순서상 먼저 나온 동아리를 선택합니다.

💡 힌트: 동아리 하나를 struct로 만들어보세요. 한 동아리는 "이름"과 "회원 목록"을 갖고 있으니, struct 안에 vector<string>을 넣을 수 있어요.`,
      constraints:
        "1 ≤ N ≤ 20, 각 동아리 회원 수 1 ≤ k ≤ 30, 동아리 이름과 회원 이름은 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// TODO: struct Club을 선언하세요 (name, members — 회원 이름 목록)

int main() {
    int n;
    cin >> n;
    // TODO: 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "3\nprogramming 4 alice bob carol dave\nmusic 2 eve frank\ndance 3 grace henry ivy",
          expectedOutput: "programming: 4\nmusic: 2\ndance: 3\nLargest: programming",
        },
        {
          stdin: "2\nfootball 11 a b c d e f g h i j k\nchess 3 x y z",
          expectedOutput: "football: 11\nchess: 3\nLargest: football",
        },
        {
          stdin: "3\nalpha 2 p q\nbeta 3 x y z\ngamma 3 i j k",
          expectedOutput: "alpha: 2\nbeta: 3\ngamma: 3\nLargest: beta",
        },
      ],
      hints: [
        "struct Club { string name; vector<string> members; }; — struct 안에 vector를 넣을 수 있어요",
        "동아리 N개 → vector<Club> clubs(n); 로 관리. 각 동아리는 clubs[i].members.push_back(...) 으로 회원 추가",
        "가장 큰 동아리 찾기: 순회하며 .members.size() 가 더 큰 것을 만나면 인덱스 갱신. 동점은 먼저 나온 것 유지",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Club {
    string name;
    vector<string> members;
};

int main() {
    int n;
    cin >> n;
    vector<Club> clubs(n);
    for (int i = 0; i < n; i++) {
        int k;
        cin >> clubs[i].name >> k;
        for (int j = 0; j < k; j++) {
            string member;
            cin >> member;
            clubs[i].members.push_back(member);
        }
    }
    for (int i = 0; i < n; i++) {
        cout << clubs[i].name << ": " << clubs[i].members.size() << "\\n";
    }
    int largestIdx = 0;
    for (int i = 1; i < n; i++) {
        if (clubs[i].members.size() > clubs[largestIdx].members.size()) {
            largestIdx = i;
        }
    }
    cout << "Largest: " << clubs[largestIdx].name << "\\n";
    return 0;
}`,
      solutionExplanation:
        "struct에 vector<string>을 멤버로 넣어 한 동아리가 \"이름\"과 \"회원 목록\"을 같이 들고 있게 합니다. vector<Club>로 N개를 관리하고, 각 동아리마다 이름+k+회원들을 읽어 members에 push_back 합니다. 가장 큰 동아리는 선형 탐색으로 찾고, 동점은 먼저 나온 것을 유지합니다.",
      en: {
        title: "Club Roster",
        description: `There are N clubs. Each club has a name and a list of members.
For each club, print "name: memberCount" on its own line.
On the last line, print the name of the club with the most members, prefixed with "Largest: ". For ties, choose the club that appeared first in the input.

💡 Hint: Model a single club as a struct. Since one club has a "name" and a "list of members", you can put a vector<string> inside the struct.`,
        constraints: "1 ≤ N ≤ 20, each club has 1 ≤ k ≤ 30 members, club and member names are lowercase English up to 20 characters",
        hints: [
          "struct Club { string name; vector<string> members; }; — a struct can contain a vector.",
          "For N clubs, use vector<Club> clubs(n); then clubs[i].members.push_back(...) to add each member.",
          "Find the largest club with a linear scan comparing .members.size(). Keep the earlier one on a tie.",
        ],
        solutionExplanation: "Model one club as a struct holding both a name and a vector<string> of members. Use vector<Club> to manage N clubs, reading name+k+members for each and pushing members into the inner vector. Find the largest club with a linear scan, keeping the earliest one on ties.",
      },
    },
    {
      id: "struct-015",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "보통",
      title: "합격/불합격 분리",
      description: `N명의 학생 (이름, 점수)이 주어집니다. 60점 이상이면 합격(Pass), 미만이면 불합격(Fail) 입니다.
각 그룹의 인원 수를 출력하고, 마지막 줄에 "입력 순서상 첫 번째 합격자" 의 이름을 출력하세요. 합격자가 없으면 "First pass: none" 을 출력하세요.

Pass: {합격자 수}
Fail: {불합격자 수}
First pass: {첫 합격자 이름 또는 none}

💡 힌트: struct 안에 vector<string> 을 넣어 각 그룹별로 "이름들" 을 저장하세요. 첫 합격자는 Pass 그룹의 students[0] (있다면).`,
      constraints: "1 ≤ N ≤ 100, 0 ≤ 점수 ≤ 100, 이름은 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// TODO: struct Result 를 선언하세요 (label, students — 이 그룹에 속한 학생 이름들)

int main() {
    int n;
    cin >> n;
    // TODO: 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "4\nalice 85\nbob 50\ncarol 72\ndave 40",
          expectedOutput: "Pass: 2\nFail: 2\nFirst pass: alice",
        },
        {
          stdin: "3\nzara 30\nalex 20\nmike 45",
          expectedOutput: "Pass: 0\nFail: 3\nFirst pass: none",
        },
        {
          stdin: "5\nann 60\nbob 59\ncoe 99\nddd 100\neve 0",
          expectedOutput: "Pass: 3\nFail: 2\nFirst pass: ann",
        },
      ],
      hints: [
        "struct Result { string label; vector<string> students; }; — 한 그룹 = 라벨 + 학생 이름 목록",
        "Pass, Fail 두 그룹. 점수 >= 60 이면 Pass 에, 아니면 Fail 에 push_back",
        "First pass: Pass 그룹의 students 가 비어있지 않으면 students[0], 비어있으면 \"none\"",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Result {
    string label;
    vector<string> students;
};

int main() {
    int n;
    cin >> n;
    vector<Result> results = {{"Pass", {}}, {"Fail", {}}};
    for (int i = 0; i < n; i++) {
        string name;
        int score;
        cin >> name >> score;
        if (score >= 60) results[0].students.push_back(name);
        else results[1].students.push_back(name);
    }
    for (int i = 0; i < 2; i++) {
        cout << results[i].label << ": " << results[i].students.size() << "\\n";
    }
    if (!results[0].students.empty()) {
        cout << "First pass: " << results[0].students[0] << "\\n";
    } else {
        cout << "First pass: none" << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "struct Result 에 라벨(\"Pass\"/\"Fail\")과 vector<string> 학생 이름 목록을 같이 담습니다. 점수 >= 60 기준으로 해당 그룹에 push_back (입력 순서대로) 하면, Pass 그룹의 students[0] 가 자연스럽게 \"입력 순서상 첫 합격자\" 가 됩니다. Pass 그룹이 비어있으면 \"none\" 출력.",
      en: {
        title: "Pass/Fail Split",
        description: `Given N students (name, score), print the count in each group. Pass means score ≥ 60, Fail means score < 60.
On the last line, print the name of the first student in input order who passed, prefixed with "First pass: ". If nobody passed, print "First pass: none".

Pass: {number who passed}
Fail: {number who failed}
First pass: {first passer's name or none}

💡 Hint: Put vector<string> inside a struct so each group can hold its own list of names. The first passer is just students[0] of the Pass group (if it's not empty).`,
        constraints: "1 ≤ N ≤ 100, 0 ≤ score ≤ 100, names are lowercase English up to 20 characters",
        hints: [
          "struct Result { string label; vector<string> students; }; — one group = label + list of names.",
          "Two groups: Pass and Fail. If score ≥ 60 push_back into Pass, otherwise Fail.",
          "First pass: if the Pass group's students is non-empty use students[0]; otherwise print \"none\".",
        ],
        solutionExplanation: "Bundle the label (\"Pass\"/\"Fail\") and vector<string> of student names in a Result struct. Push each student into the matching group (score ≥ 60 or not) in input order, so the Pass group's students[0] is naturally the first passer. If Pass is empty, print \"none\".",
      },
    },
    {
      id: "struct-005",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "어려움",
      title: "점수 구간 통계",
      description: `N명의 학생 (이름, 점수)이 주어질 때, 등급별 인원을 출력하세요. 등급: A (90점 이상), B (80~89), C (70~79), D (60~69), F (60 미만).
마지막 줄에 가장 높은 등급에 있는 학생 중 입력 순서상 첫 번째 학생의 이름을 출력하세요 (Top: 이름).`,
      constraints:
        "1 ≤ N ≤ 100, 0 ≤ 점수 ≤ 100, 이름은 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// struct를 선언하세요

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "5\nalice 90\nbob 85\ncarol 95\ndave 70\neve 80",
          expectedOutput: "A: 2\nB: 2\nC: 1\nD: 0\nF: 0\nTop: alice",
        },
        {
          stdin: "3\nzara 65\nalex 55\nmike 72",
          expectedOutput: "A: 0\nB: 0\nC: 1\nD: 1\nF: 1\nTop: mike",
        },
        {
          stdin: "2\nonly 50\nother 45",
          expectedOutput: "A: 0\nB: 0\nC: 0\nD: 0\nF: 2\nTop: only",
        },
      ],
      hints: [
        "struct Student { string name; int score; };",
        "A/B/C/D/F 카운터 5개를 0으로 초기화 후 if/else if로 구간 판정",
        "Top 학생: A부터 F까지 순서대로 확인하며 첫 번째 매칭 학생 찾기",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    int cntA = 0, cntB = 0, cntC = 0, cntD = 0, cntF = 0;
    for (int i = 0; i < n; i++) {
        cin >> students[i].name >> students[i].score;
        int s = students[i].score;
        if (s >= 90) cntA++;
        else if (s >= 80) cntB++;
        else if (s >= 70) cntC++;
        else if (s >= 60) cntD++;
        else cntF++;
    }
    cout << "A: " << cntA << "\\n";
    cout << "B: " << cntB << "\\n";
    cout << "C: " << cntC << "\\n";
    cout << "D: " << cntD << "\\n";
    cout << "F: " << cntF << "\\n";
    int topMin;
    if (cntA > 0) topMin = 90;
    else if (cntB > 0) topMin = 80;
    else if (cntC > 0) topMin = 70;
    else if (cntD > 0) topMin = 60;
    else topMin = 0;
    for (int i = 0; i < n; i++) {
        if (students[i].score >= topMin) {
            cout << "Top: " << students[i].name << "\\n";
            break;
        }
    }
    return 0;
}`,
      solutionExplanation:
        "등급별 카운터 5개를 if/else if로 분기하여 카운팅합니다. 최고 등급을 찾은 뒤, 입력 순서대로 순회하며 해당 등급에 속하는 첫 학생을 출력합니다.",
      en: {
        title: "Grade Distribution",
        description: `Given N students (name, score), print the count per grade. Grades: A (90+), B (80-89), C (70-79), D (60-69), F (below 60). On the last line, print the name of the first student (in input order) in the highest non-empty grade, prefixed with "Top: ".`,
        constraints: "1 ≤ N ≤ 100, 0 ≤ score ≤ 100, names are lowercase English up to 20 characters",
        hints: [
          "struct Student { string name; int score; };",
          "Initialize 5 counters to 0 and use if/else if to bucket each score.",
          "Top student: check A down to F, then scan input order for the first student in that bucket.",
        ],
        solutionExplanation: "Bucket each score into one of five counters with if/else if. Find the highest non-empty bucket, then scan in input order for the first student matching it.",
      },
    },
    {
      id: "struct-006",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "어려움",
      title: "직원 급여 통계",
      description: `N명의 직원 (이름, 부서, 급여)이 주어질 때:
1. 급여가 평균 이상인 직원 수
2. 가장 높은 급여를 받는 직원 이름 (동점이면 이름 오름차순 첫 번째)
3. 부서별 직원 수를 부서 이름 오름차순으로 출력하세요.

입력 마지막에 부서 종류 수 D와 D개의 부서 이름이 주어집니다.`,
      constraints:
        "1 ≤ N ≤ 100, 1 ≤ D ≤ 10, 1 ≤ 급여 ≤ 100000, 이름/부서는 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// struct를 선언하세요

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "4\nalice dev 5000\nbob hr 3000\ncarol dev 7000\ndave hr 4000\n2\ndev\nhr",
          expectedOutput: "Above avg: 2\nTop salary: carol\ndev: 2\nhr: 2",
        },
        {
          stdin: "3\nzara eng 8000\nalex eng 8000\nmike mkt 5000\n2\neng\nmkt",
          expectedOutput: "Above avg: 2\nTop salary: alex\neng: 2\nmkt: 1",
        },
      ],
      hints: [
        "struct Employee { string name, dept; int salary; };",
        "평균 이상 카운트 + 최고 급여자는 선형 탐색으로 찾습니다 (동점이면 이름 오름차순)",
        "부서 이름은 선택 정렬 (이중 for + swap)로 직접 정렬",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Employee {
    string name, dept;
    int salary;
};

int main() {
    int n;
    cin >> n;
    vector<Employee> emps(n);
    int total = 0;
    for (int i = 0; i < n; i++) {
        cin >> emps[i].name >> emps[i].dept >> emps[i].salary;
        total += emps[i].salary;
    }
    int avg = total / n;
    int aboveAvg = 0;
    for (int i = 0; i < n; i++) if (emps[i].salary >= avg) aboveAvg++;
    int topIdx = 0;
    for (int i = 0; i < n; i++) {
        if (emps[i].salary > emps[topIdx].salary) topIdx = i;
        else if (emps[i].salary == emps[topIdx].salary && emps[i].name < emps[topIdx].name) topIdx = i;
    }
    cout << "Above avg: " << aboveAvg << "\\n";
    cout << "Top salary: " << emps[topIdx].name << "\\n";
    int d;
    cin >> d;
    vector<string> depts(d);
    for (int i = 0; i < d; i++) cin >> depts[i];
    // 부서 이름 오름차순 정렬을 선택 정렬로 수동 구현
    for (int i = 0; i < d; i++) {
        for (int j = i + 1; j < d; j++) {
            if (depts[j] < depts[i]) {
                string tmp = depts[i];
                depts[i] = depts[j];
                depts[j] = tmp;
            }
        }
    }
    for (int i = 0; i < d; i++) {
        int cnt = 0;
        for (int j = 0; j < n; j++) if (emps[j].dept == depts[i]) cnt++;
        cout << depts[i] << ": " << cnt << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "평균 이상 카운트와 최고 급여자를 선형 탐색으로 구합니다. 부서 이름 정렬은 sort 대신 선택 정렬을 수동 구현해 sort/람다를 피합니다.",
      en: {
        title: "Employee Salary Statistics",
        description: `Given N employees (name, department, salary), print: 1) the number of employees earning at or above average, 2) the name of the highest-paid employee (ties broken by name ascending), 3) the employee count per department in alphabetical order. The number of departments D and their names are given at the end of the input.`,
        constraints: "1 ≤ N ≤ 100, 1 ≤ D ≤ 10, 1 ≤ salary ≤ 100000, names/departments are lowercase English up to 20 characters",
        hints: [
          "struct Employee { string name, dept; int salary; };",
          "Count above-average employees and find the top earner with linear search (tie: smaller name wins).",
          "Sort department names manually with selection sort (nested for + swap).",
        ],
        solutionExplanation: "Count above-average earners and find the top earner with linear search. Implement selection sort manually for department names to avoid sort/lambda.",
      },
    },
    {
      id: "struct-007",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "쉬움",
      title: "가장 오래된 책",
      description: `N개의 도서 (제목, 저자, 출판연도)가 주어질 때, 출판연도가 가장 작은 책의 "제목 저자 연도"를 출력하세요. 동점이면 입력 순서상 먼저 나온 책을 선택합니다.`,
      constraints: "1 ≤ N ≤ 50, 제목/저자는 영문 소문자 최대 20자, 1900 ≤ 출판연도 ≤ 2100",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// struct Book을 선언하세요 (title, author, year)

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "2\nPython Alice 2020\nCpp Bob 2019",
          expectedOutput: "Cpp Bob 2019",
        },
        {
          stdin: "3\nZebra Carol 2018\nApple Dave 2021\nMango Eve 2015",
          expectedOutput: "Mango Eve 2015",
        },
        {
          stdin: "1\nOnlyBook Author 2000",
          expectedOutput: "OnlyBook Author 2000",
        },
      ],
      hints: [
        "struct Book { string title; string author; int year; };",
        "선형 탐색으로 year가 가장 작은 책의 인덱스를 찾습니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Book {
    string title;
    string author;
    int year;
};

int main() {
    int n;
    cin >> n;
    vector<Book> books(n);
    for (int i = 0; i < n; i++)
        cin >> books[i].title >> books[i].author >> books[i].year;
    int oldestIdx = 0;
    for (int i = 1; i < n; i++) {
        if (books[i].year < books[oldestIdx].year) oldestIdx = i;
    }
    cout << books[oldestIdx].title << " " << books[oldestIdx].author << " " << books[oldestIdx].year << "\\n";
    return 0;
}`,
      solutionExplanation:
        "선형 탐색으로 가장 작은 year 값을 가진 책을 찾습니다. `<` 비교이므로 동점인 경우 먼저 발견된(입력 순서상 앞선) 책이 유지됩니다.",
      en: {
        title: "Oldest Book",
        description: `Given N books (title, author, publication year), print "title author year" for the book with the smallest year. For ties, choose the one that appears first in the input.`,
        constraints: "1 ≤ N ≤ 50, title/author are lowercase English up to 20 characters, 1900 ≤ year ≤ 2100",
        hints: [
          "struct Book { string title; string author; int year; };",
          "Linear-scan to find the index with the smallest year.",
        ],
        solutionExplanation: "Linear-scan for the book with the smallest year. Because we use strict `<`, ties are broken by input order (first one wins).",
      },
    },
    {
      id: "struct-008",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "쉬움",
      title: "직사각형 비교",
      description: `두 직사각형의 가로/세로가 주어질 때, 넓이가 더 큰 직사각형의 넓이를 출력하세요. 넓이가 같으면 "SAME"을 출력하세요.`,
      constraints: "1 ≤ w, h ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

// struct Rect를 선언하세요 (w, h, area() 멤버 함수)

int main() {
    Rect r1, r2;
    cin >> r1.w >> r1.h;
    cin >> r2.w >> r2.h;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "3 4\n2 7",
          expectedOutput: "14",
        },
        {
          stdin: "4 4\n2 8",
          expectedOutput: "SAME",
        },
        {
          stdin: "1 1\n2 2",
          expectedOutput: "4",
        },
        {
          stdin: "10 5\n3 20",
          expectedOutput: "60",
        },
      ],
      hints: [
        "struct Rect { int w, h; int area() { return w * h; } }; 로 멤버 함수를 선언합니다.",
        "r1.area()와 r2.area()를 비교하여 큰 것의 넓이를 출력하거나 SAME을 출력합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

struct Rect {
    int w, h;
    int area() { return w * h; }
};

int main() {
    Rect r1, r2;
    cin >> r1.w >> r1.h;
    cin >> r2.w >> r2.h;
    int a1 = r1.area(), a2 = r2.area();
    if (a1 > a2) cout << a1 << "\\n";
    else if (a2 > a1) cout << a2 << "\\n";
    else cout << "SAME\\n";
    return 0;
}`,
      solutionExplanation:
        "struct 멤버 함수 area()로 넓이를 캡슐화합니다. 두 넓이를 비교해 큰 값 출력 또는 SAME을 출력합니다.",
      en: {
        title: "Rectangle Comparison",
        description: `Given the width and height of two rectangles, print the area of the larger rectangle. If both areas are equal, print "SAME".`,
        constraints: "1 ≤ w, h ≤ 10000",
        hints: [
          "Declare a member function: struct Rect { int w, h; int area() { return w * h; } };",
          "Compare r1.area() and r2.area(), then print the larger or SAME.",
        ],
        solutionExplanation: "Encapsulate the area calculation in a struct member function area(). Compare the two areas and print the larger value or SAME.",
      },
    },
    {
      id: "struct-009",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "보통",
      title: "시간 더하기",
      description: `두 시간 (시 분 초)이 주어질 때, 두 시간의 합을 h:m:s 형식으로 출력하세요. 초가 60 이상이면 분으로, 분이 60 이상이면 시간으로 올림하고, 시간은 24시간 mod를 적용합니다.`,
      constraints: "0 ≤ h < 24, 0 ≤ m < 60, 0 ≤ s < 60",
      initialCode: `#include <iostream>
using namespace std;

// struct를 선언하세요

int main() {
    Time t1, t2;
    cin >> t1.h >> t1.m >> t1.s;
    cin >> t2.h >> t2.m >> t2.s;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "1 30 45\n0 40 20",
          expectedOutput: "2:11:5",
        },
        {
          stdin: "0 0 59\n0 0 1",
          expectedOutput: "0:1:0",
        },
        {
          stdin: "23 59 0\n0 1 0",
          expectedOutput: "0:0:0",
        },
        {
          stdin: "10 20 30\n5 10 15",
          expectedOutput: "15:30:45",
        },
      ],
      hints: [
        "먼저 초를 더하고 60 이상이면 분에 올림, 마찬가지로 분도 60 이상이면 시간에 올림합니다.",
        "시간은 % 24로 24시간 mod를 적용합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

struct Time {
    int h, m, s;
};

int main() {
    Time t1, t2;
    cin >> t1.h >> t1.m >> t1.s;
    cin >> t2.h >> t2.m >> t2.s;
    int s = t1.s + t2.s;
    int m = t1.m + t2.m + s / 60;
    int h = t1.h + t2.h + m / 60;
    s %= 60;
    m %= 60;
    h %= 24;
    cout << h << ":" << m << ":" << s << "\\n";
    return 0;
}`,
      solutionExplanation:
        "초 → 분 → 시간 순으로 올림을 처리합니다. 각 단위를 더한 뒤 / 60으로 올림 값을 구하고 % 60으로 나머지를 구합니다. 시간은 % 24로 하루를 순환합니다.",
      en: {
        title: "Add Two Times",
        description: `Given two times (hours, minutes, seconds), print their sum in h:m:s format. Carry seconds into minutes when ≥ 60, carry minutes into hours when ≥ 60, and wrap hours modulo 24.`,
        constraints: "0 ≤ h < 24, 0 ≤ m < 60, 0 ≤ s < 60",
        hints: [
          "Add seconds first, carry into minutes if ≥ 60, then carry minutes into hours the same way.",
          "Apply % 24 to hours to wrap around a full day.",
        ],
        solutionExplanation: "Carry in order: seconds → minutes → hours. After adding each unit, use / 60 to get the carry and % 60 for the remainder. Apply % 24 to hours to handle day wraparound.",
      },
    },
    {
      id: "struct-010",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "보통",
      title: "가장 빠른 주자",
      description: `첫 줄에 주자 수 N과 기준 시간 T가 주어집니다. 다음 N줄에 (이름, 기록(초))가 주어질 때, 가장 빠른 주자의 "이름 기록"과 기준 시간 T 이하로 완주한 주자의 수를 출력하세요. 가장 빠른 기록이 동점이면 입력 순서상 먼저 나온 주자를 선택합니다.`,
      constraints: "1 ≤ N ≤ 50, 1 ≤ 기록, T ≤ 10000, 이름은 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// struct를 선언하세요

int main() {
    int n, t;
    cin >> n >> t;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "3 55\nalice 52\nbob 48\ncharlie 55",
          expectedOutput: "bob 48\nUnder T: 3",
        },
        {
          stdin: "4 85\nzara 100\nalex 80\nmike 90\nlisa 70",
          expectedOutput: "lisa 70\nUnder T: 2",
        },
        {
          stdin: "1 50\nsolo 42",
          expectedOutput: "solo 42\nUnder T: 1",
        },
      ],
      hints: [
        "struct Runner { string name; int time; };",
        "최솟값 탐색으로 가장 빠른 주자를 찾고, 루프에서 time ≤ t 조건으로 카운트합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Runner {
    string name;
    int time;
};

int main() {
    int n, t;
    cin >> n >> t;
    vector<Runner> runners(n);
    for (int i = 0; i < n; i++) cin >> runners[i].name >> runners[i].time;
    int fastestIdx = 0;
    int underT = 0;
    for (int i = 0; i < n; i++) {
        if (runners[i].time < runners[fastestIdx].time) fastestIdx = i;
        if (runners[i].time <= t) underT++;
    }
    cout << runners[fastestIdx].name << " " << runners[fastestIdx].time << "\\n";
    cout << "Under T: " << underT << "\\n";
    return 0;
}`,
      solutionExplanation:
        "한 번의 순회로 최솟값 탐색 (가장 빠른 주자)과 조건 카운트(T 이하 주자 수)를 동시에 처리합니다.",
      en: {
        title: "Fastest Runner",
        description: `The first line gives N runners and a time limit T. The next N lines give (name, time in seconds). Print "name time" for the fastest runner, then print the count of runners who finished in T seconds or fewer. Tie on fastest goes to the one appearing first in the input.`,
        constraints: "1 ≤ N ≤ 50, 1 ≤ time, T ≤ 10000, names are lowercase English up to 20 characters",
        hints: [
          "struct Runner { string name; int time; };",
          "Find the min-time runner with linear search, and count time ≤ t in the same loop.",
        ],
        solutionExplanation: "Single-pass: find the fastest runner with a min-search and count runners with time ≤ t simultaneously.",
      },
    },
    {
      id: "struct-011",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "어려움",
      title: "학생 성적 통계 II",
      description: `N명의 학생과 각 M개의 점수가 주어질 때, 평균이 가장 높은 학생의 이름과 전체 평균을 정수로 출력하세요.
전체 평균은 모든 학생의 모든 점수의 평균입니다.`,
      constraints: "1 ≤ N ≤ 20, 1 ≤ M ≤ 10, 0 ≤ 점수 ≤ 100, 이름은 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// struct를 선언하세요

int main() {
    int n, m;
    cin >> n >> m;
    vector<Student> students(n);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "2 3\nalice 80 90 70\nbob 95 85 90",
          expectedOutput: "bob\n85",
        },
        {
          stdin: "3 2\nzara 100 100\nalex 80 60\nmike 90 70",
          expectedOutput: "zara\n83",
        },
        {
          stdin: "1 4\nonly 60 70 80 90",
          expectedOutput: "only\n75",
        },
      ],
      hints: [
        "각 학생의 점수 합계를 비교해 가장 높은 학생을 찾습니다 (합계 비교는 평균 비교와 동일).",
        "전체 평균 = 모든 점수 합 / (N * M) 정수 나눗셈",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    vector<int> scores;
};

int main() {
    int n, m;
    cin >> n >> m;
    vector<Student> students(n);
    int totalAll = 0;
    for (auto& s : students) {
        cin >> s.name;
        for (int j = 0; j < m; j++) {
            int sc;
            cin >> sc;
            s.scores.push_back(sc);
            totalAll += sc;
        }
    }
    int bestIdx = 0;
    int bestSum = -1;
    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int sc : students[i].scores) sum += sc;
        if (sum > bestSum) {
            bestSum = sum;
            bestIdx = i;
        }
    }
    cout << students[bestIdx].name << "\\n";
    cout << totalAll / (n * m) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "struct 내 vector<int>로 여러 점수를 저장합니다. 각 학생의 점수 합계를 비교해 최고 합계 학생을 찾고 (합계 비교는 평균 비교와 동일), 전체 평균은 정수 나눗셈으로 계산합니다.",
      en: {
        title: "Student Score Statistics II",
        description: `Given N students each with M scores, print the name of the student with the highest average, then print the overall average (average of all scores from all students) as an integer (integer division).`,
        constraints: "1 ≤ N ≤ 20, 1 ≤ M ≤ 10, 0 ≤ score ≤ 100, names are lowercase English up to 20 characters",
        hints: [
          "Compare each student's score sum to find the best (comparing sums is equivalent to comparing averages since all have M scores).",
          "Overall average = total of all scores / (N * M) using integer division.",
        ],
        solutionExplanation: "Store multiple scores per student using vector<int> inside the struct. Compare score sums to find the best student (equivalent to comparing averages), and compute the overall average using integer division.",
      },
    },
    {
      id: "struct-012",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "어려움",
      title: "복소수 계산",
      description: `두 복소수 (실수부, 허수부)가 주어질 때, 합과 곱을 출력하세요.
출력 형식: "실수부+허수부i" (예: "4+6i"). 허수부가 음수이면 "실수부-|허수부|i" 형식으로 출력하세요.`,
      constraints: "정수, -100 ≤ 실수부, 허수부 ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

// struct Complex를 선언하세요 (정수 real, imag)

Complex add(Complex a, Complex b) {
    // 합을 반환하세요
}

Complex multiply(Complex a, Complex b) {
    // 곱을 반환하세요
    // (a+bi)(c+di) = (ac-bd) + (ad+bc)i
}

void print(Complex c) {
    // 여기에 출력 코드를 작성하세요
}

int main() {
    Complex c1, c2;
    cin >> c1.real >> c1.imag;
    cin >> c2.real >> c2.imag;
    print(add(c1, c2));
    print(multiply(c1, c2));
    return 0;
}`,
      testCases: [
        {
          stdin: "1 2\n3 4",
          expectedOutput: "4+6i\n-5+10i",
        },
        {
          stdin: "2 -3\n1 4",
          expectedOutput: "3+1i\n14+5i",
        },
        {
          stdin: "0 0\n5 -2",
          expectedOutput: "5-2i\n0+0i",
        },
      ],
      hints: [
        "복소수 곱: (a+bi)(c+di) = (ac-bd) + (ad+bc)i",
        "허수부가 음수이면 부호를 별도로 처리해 출력합니다 (cout이 자동으로 '-' 출력).",
      ],
      solutionCode: `#include <iostream>
using namespace std;

struct Complex {
    int real, imag;
};

Complex add(Complex a, Complex b) {
    Complex c;
    c.real = a.real + b.real;
    c.imag = a.imag + b.imag;
    return c;
}

Complex multiply(Complex a, Complex b) {
    Complex c;
    c.real = a.real * b.real - a.imag * b.imag;
    c.imag = a.real * b.imag + a.imag * b.real;
    return c;
}

void print(Complex c) {
    if (c.imag >= 0)
        cout << c.real << "+" << c.imag << "i\\n";
    else
        cout << c.real << c.imag << "i\\n";
}

int main() {
    Complex c1, c2;
    cin >> c1.real >> c1.imag;
    cin >> c2.real >> c2.imag;
    print(add(c1, c2));
    print(multiply(c1, c2));
    return 0;
}`,
      solutionExplanation:
        "복소수 덧셈은 실수/허수 각각 더합니다. 곱셈은 (ac-bd)+(ad+bc)i 공식을 사용합니다. 허수부가 음수면 cout이 자동으로 '-' 부호를 출력하므로 조건 분기만 처리합니다.",
      en: {
        title: "Complex Number Arithmetic",
        description: `Given two complex numbers (real part, imaginary part), print their sum and product.\nOutput format: "real+imagi" (e.g. "4+6i"). If the imaginary part is negative, use "real-|imag|i".`,
        constraints: "integers, -100 ≤ real, imag ≤ 100",
        hints: [
          "Complex multiplication: (a+bi)(c+di) = (ac-bd) + (ad+bc)i",
          "Handle the sign of the imaginary part separately (cout auto-prints '-').",
        ],
        solutionExplanation: "Complex addition adds real and imaginary parts separately. Multiplication uses the formula (ac-bd)+(ad+bc)i. When the imaginary part is negative, cout already prints the '-' sign, so only branch on the condition.",
      },
    },
  ],
}
