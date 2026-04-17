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
마지막 줄에 전체 평균을 소수점 둘째 자리까지 출력하세요.`,
      constraints: "1 ≤ N ≤ 20, 0 ≤ 점수 ≤ 100, 이름은 영문 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
#include <cstdio>
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
          expectedOutput: "alice 90\nbob 80\ncarol 70\nAverage: 80.00",
        },
        {
          stdin: "2\nzara 100\nleo 50",
          expectedOutput: "zara 100\nleo 50\nAverage: 75.00",
        },
      ],
      hints: [
        "struct Student { string name; int score; }; 로 구조체를 선언하세요.",
        "printf(\"%.2f\", avg) 로 소수점 2자리 출력",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <cstdio>
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
    printf("Average: %.2f\\n", (double)total / n);
    return 0;
}`,
      solutionExplanation:
        "struct로 이름과 점수를 하나의 단위로 묶습니다. vector<Student>로 여러 학생을 관리하고, 범위 기반 for문으로 출력합니다.",
      en: {
        title: "Student Score Average",
        description: `Given N students (name, score), print each student's name and score, then print the overall average to two decimal places on the last line.`,
        constraints: "1 ≤ N ≤ 20, 0 ≤ score ≤ 100, names are up to 20 English characters",
        hints: [
          "Declare the struct as: struct Student { string name; int score; };",
          "Use printf(\"%.2f\", avg) to print two decimal places.",
        ],
        solutionExplanation: "Use a struct to bundle name and score as a single unit. Manage multiple students with vector<Student> and print with a range-based for loop.",
      },
    },
    {
      id: "struct-002",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "쉬움",
      title: "좌표 거리 계산",
      description: `N개의 점 (x, y)이 주어질 때, 각 점에서 원점(0,0)까지의 거리의 제곱을 출력하세요. (소수점 계산 불필요)
그리고 원점에서 가장 가까운 점의 번호(1-based)를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ x, y ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

// struct Point를 선언하세요 (x, y)

int dist2(const Point& p) {
    // 거리 제곱을 반환하세요
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
          expectedOutput: "25\n2\n25\nClosest: 2",
        },
        {
          stdin: "2\n0 5\n3 3",
          expectedOutput: "25\n18\nClosest: 2",
        },
        {
          stdin: "1\n0 0",
          expectedOutput: "0\nClosest: 1",
        },
      ],
      hints: [
        "struct Point { int x, y; };",
        "거리 제곱: p.x*p.x + p.y*p.y",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

struct Point {
    int x, y;
};

int dist2(const Point& p) {
    return p.x * p.x + p.y * p.y;
}

int main() {
    int n;
    cin >> n;
    vector<Point> pts(n);
    for (int i = 0; i < n; i++) cin >> pts[i].x >> pts[i].y;
    int minIdx = 0;
    for (int i = 0; i < n; i++) {
        cout << dist2(pts[i]) << "\n";
        if (dist2(pts[i]) < dist2(pts[minIdx])) minIdx = i;
    }
    cout << "Closest: " << minIdx + 1 << "\n";
    return 0;
}`,
      solutionExplanation:
        "struct + 함수 조합: dist2 함수가 Point를 받아 거리 제곱을 반환합니다. struct를 const 참조로 전달해 복사를 방지합니다.",
      en: {
        title: "Coordinate Distance",
        description: `Given N points (x, y), print the squared distance from each point to the origin (0, 0) (no floating-point needed). Then print the 1-based index of the point closest to the origin.`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ x, y ≤ 1000",
        hints: [
          "struct Point { int x, y; };",
          "Squared distance: p.x*p.x + p.y*p.y",
        ],
        solutionExplanation: "Combining a struct with a function: dist2 receives a Point and returns its squared distance. Pass the struct by const reference to avoid copying.",
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
        "1 ≤ N ≤ 100, 1 ≤ 가격 ≤ 100000, 0 ≤ 재고 ≤ 1000, 상품 이름 영문 소문자 최대 20자",
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
    long long totalValue = 0;
    for (auto& p : products) {
        if (p.stock == 0) outOfStock++;
        totalValue += (long long)p.price * p.stock;
    }
    cout << "Out of stock: " << outOfStock << "\n";
    cout << "Total value: " << totalValue << "\n";
    return 0;
}`,
      solutionExplanation:
        "struct로 상품 속성을 묶어 vector<Product>로 관리합니다. 가격×재고 합이 int 범위를 초과할 수 있으므로 long long을 사용합니다.",
      en: {
        title: "Inventory Management",
        description: `Given N products (name, price, stock), print: 1) the number of out-of-stock products (stock == 0), 2) the total inventory value (price × stock summed over all products).`,
        constraints: "1 ≤ N ≤ 100, 1 ≤ price ≤ 100000, 0 ≤ stock ≤ 1000, product names are lowercase English up to 20 characters",
        hints: [
          "struct Product { string name; int price, stock; };",
          "Inventory value: accumulate p.price * p.stock for each product.",
        ],
        solutionExplanation: "Bundle product attributes in a struct and manage them with vector<Product>. Use long long for the total value since price × stock can exceed the int range.",
      },
    },
    {
      id: "struct-004",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "보통",
      title: "학생 정보 정렬",
      description: `N명의 학생 (이름, 국어 점수, 영어 점수)이 주어질 때, 총점 내림차순으로 정렬하여 출력하세요. 총점이 같으면 이름 오름차순으로 정렬합니다.`,
      constraints:
        "1 ≤ N ≤ 100, 0 ≤ 점수 ≤ 100, 이름은 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

// struct를 선언하세요

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "3\nalice 90 80\nbob 70 100\ncarol 85 85",
          expectedOutput: "alice 170\nbob 170\ncarol 170",
        },
        {
          stdin: "3\nzack 50 50\nalex 90 90\nmike 80 70",
          expectedOutput: "alex 180\nmike 150\nzack 100",
        },
        {
          stdin: "2\nbob 60 40\nalex 40 60",
          expectedOutput: "alex 100\nbob 100",
        },
      ],
      hints: [
        "struct Student { string name; int kor, eng; };",
        "total = kor + eng. sort 람다: 총점이 다르면 내림차순, 같으면 이름 오름차순",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int kor, eng;
    int total() const { return kor + eng; }
};

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    for (auto& s : students) cin >> s.name >> s.kor >> s.eng;
    sort(students.begin(), students.end(), [](const Student& a, const Student& b) {
        if (a.total() != b.total()) return a.total() > b.total();
        return a.name < b.name;
    });
    for (auto& s : students)
        cout << s.name << " " << s.total() << "\n";
    return 0;
}`,
      solutionExplanation:
        "struct 내 멤버 함수 total()으로 총점을 계산합니다. 람다 comparator로 다중 기준 정렬을 구현합니다.",
      en: {
        title: "Student Info Sort",
        description: `Given N students (name, Korean score, English score), sort them by total score (descending). If two students have the same total, sort by name (ascending). Print each student's name and total score.`,
        constraints: "1 ≤ N ≤ 100, 0 ≤ score ≤ 100, names are lowercase English up to 20 characters",
        hints: [
          "struct Student { string name; int kor, eng; };",
          "total = kor + eng. Sort lambda: descending by total, then ascending by name if totals are equal.",
        ],
        solutionExplanation: "Use a member function total() inside the struct to compute the sum. Implement multi-key sorting with a lambda comparator.",
      },
    },
    {
      id: "struct-005",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "어려움",
      title: "점수 상위 K명",
      description: `N명의 학생 (이름, 점수)이 주어질 때, 점수 상위 K명의 평균을 소수점 둘째 자리까지 출력하고, 상위 K명의 이름을 순서대로 출력하세요. (점수 내림차순, 동점이면 이름 오름차순)`,
      constraints:
        "1 ≤ K ≤ N ≤ 100, 0 ≤ 점수 ≤ 100, 이름은 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <cstdio>
using namespace std;

// struct를 선언하세요

int main() {
    int n, k;
    cin >> n >> k;
    vector<Student> students(n);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "5 3\nalice 90\nbob 85\ncarol 90\ndave 70\neve 80",
          expectedOutput: "88.33\nalice\ncarol\nbob",
        },
        {
          stdin: "3 2\nzara 100\nalex 100\nmike 90",
          expectedOutput: "100.00\nalex\nzara",
        },
      ],
      hints: [
        "정렬 후 앞 K개만 처리합니다.",
        "printf(\"%.2f\\n\", avg) 로 소수점 2자리 출력",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <cstdio>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    int n, k;
    cin >> n >> k;
    vector<Student> students(n);
    for (auto& s : students) cin >> s.name >> s.score;
    sort(students.begin(), students.end(), [](const Student& a, const Student& b) {
        if (a.score != b.score) return a.score > b.score;
        return a.name < b.name;
    });
    double sum = 0;
    for (int i = 0; i < k; i++) sum += students[i].score;
    printf("%.2f\\n", sum / k);
    for (int i = 0; i < k; i++) cout << students[i].name << "\\n";
    return 0;
}`,
      solutionExplanation:
        "정렬 후 앞 K개만 접근하면 됩니다. 정렬 기준이 점수 내림차순+이름 오름차순이므로, 상위 K명이 앞에 정렬됩니다.",
      en: {
        title: "Top K Students",
        description: `Given N students (name, score), print the average score of the top K students to two decimal places, then print their names in order. Sort by score descending; break ties by name ascending.`,
        constraints: "1 ≤ K ≤ N ≤ 100, 0 ≤ score ≤ 100, names are lowercase English up to 20 characters",
        hints: [
          "Sort first, then only process the first K entries.",
          "Use printf(\"%.2f\\n\", avg) to print two decimal places.",
        ],
        solutionExplanation: "After sorting, access only the first K elements. Since the sort key is score descending then name ascending, the top K students are already at the front.",
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
        "1 ≤ N ≤ 100, 1 ≤ D ≤ 10, 1 ≤ 급여 ≤ 10000000, 이름/부서는 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

// struct를 선언하세요

int main() {
    int n;
    cin >> n;
    vector<Employee> emps(n);
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
        "부서별 카운트는 map을 쓰지 말고, 주어진 D개 부서 이름에 대해 순회하며 카운트하세요.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Employee {
    string name, dept;
    int salary;
};

int main() {
    int n;
    cin >> n;
    vector<Employee> emps(n);
    long long total = 0;
    for (auto& e : emps) {
        cin >> e.name >> e.dept >> e.salary;
        total += e.salary;
    }
    double avg = (double)total / n;
    int aboveAvg = 0;
    for (auto& e : emps) if (e.salary >= avg) aboveAvg++;
    sort(emps.begin(), emps.end(), [](const Employee& a, const Employee& b) {
        if (a.salary != b.salary) return a.salary > b.salary;
        return a.name < b.name;
    });
    cout << "Above avg: " << aboveAvg << "\n";
    cout << "Top salary: " << emps[0].name << "\n";
    int d;
    cin >> d;
    vector<string> depts(d);
    for (auto& dep : depts) cin >> dep;
    sort(depts.begin(), depts.end());
    for (auto& dep : depts) {
        int cnt = 0;
        for (auto& e : emps) if (e.dept == dep) cnt++;
        cout << dep << ": " << cnt << "\n";
    }
    return 0;
}`,
      solutionExplanation:
        "평균 이상 카운트, 최고 급여자 (정렬 후 첫 번째), 부서별 카운트를 단계별로 처리합니다. map을 쓰지 않고 이중 루프로 부서별 카운트를 구현합니다.",
      en: {
        title: "Employee Salary Statistics",
        description: `Given N employees (name, department, salary), print: 1) the number of employees earning at or above average, 2) the name of the highest-paid employee (ties broken by name ascending), 3) the employee count per department in alphabetical order. The number of departments D and their names are given at the end of the input.`,
        constraints: "1 ≤ N ≤ 100, 1 ≤ D ≤ 10, 1 ≤ salary ≤ 10000000, names/departments are lowercase English up to 20 characters",
        hints: [
          "struct Employee { string name, dept; int salary; };",
          "For department counts, don't use a map — iterate over the D given department names and count with a nested loop.",
        ],
        solutionExplanation: "Handle each part in sequence: count above-average earners, find the top earner (first after sorting), then count per department using a nested loop instead of a map.",
      },
    },
    {
      id: "struct-007",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "쉬움",
      title: "도서 정보 출력",
      description: `N개의 도서 (제목, 저자, 출판연도)가 주어질 때, 제목 오름차순으로 정렬하여 출력하세요.`,
      constraints: "1 ≤ N ≤ 50, 제목/저자는 영문 소문자 최대 20자, 1900 ≤ 출판연도 ≤ 2100",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

// struct Book을 선언하세요 (title, author, year)

int main() {
    int n;
    cin >> n;
    vector<Book> books(n);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "2\nPython Alice 2020\nCpp Bob 2019",
          expectedOutput: "Cpp Bob 2019\nPython Alice 2020",
        },
        {
          stdin: "3\nZebra Carol 2018\nApple Dave 2021\nMango Eve 2015",
          expectedOutput: "Apple Dave 2021\nMango Eve 2015\nZebra Carol 2018",
        },
        {
          stdin: "1\nOnlyBook Author 2000",
          expectedOutput: "OnlyBook Author 2000",
        },
      ],
      hints: [
        "struct Book { string title; string author; int year; }; 로 구조체를 선언하세요.",
        "sort의 람다에서 a.title < b.title 로 제목 오름차순 정렬합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
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
    for (auto& b : books)
        cin >> b.title >> b.author >> b.year;
    sort(books.begin(), books.end(), [](const Book& a, const Book& b) {
        return a.title < b.title;
    });
    for (auto& b : books)
        cout << b.title << " " << b.author << " " << b.year << "\\n";
    return 0;
}`,
      solutionExplanation:
        "struct로 도서 속성을 묶고 vector<Book>으로 관리합니다. sort 람다에서 title 기준으로 오름차순 정렬합니다.",
      en: {
        title: "Book Info Print",
        description: `Given N books (title, author, publication year), sort them by title in ascending order and print each book's information.`,
        constraints: "1 ≤ N ≤ 50, title/author are lowercase English up to 20 characters, 1900 ≤ year ≤ 2100",
        hints: [
          "Declare the struct as: struct Book { string title; string author; int year; };",
          "In the sort lambda, use a.title < b.title for ascending title order.",
        ],
        solutionExplanation: "Bundle book attributes in a struct and manage them with vector<Book>. Sort using a lambda that compares by title.",
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
      title: "경주 순위",
      description: `N명의 주자 (이름, 기록(초))가 주어질 때, 기록 오름차순으로 순위를 출력하세요. 출력 형식: "이름 순위"`,
      constraints: "1 ≤ N ≤ 50, 1 ≤ 기록 ≤ 10000, 이름은 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

// struct를 선언하세요

int main() {
    int n;
    cin >> n;
    vector<Runner> runners(n);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "3\nalice 52\nbob 48\ncharlie 55",
          expectedOutput: "bob 1\nalice 2\ncharlie 3",
        },
        {
          stdin: "4\nzara 100\nalex 80\nmike 90\nlisa 70",
          expectedOutput: "lisa 1\nalex 2\nmike 3\nzara 4",
        },
        {
          stdin: "1\nsolo 42",
          expectedOutput: "solo 1",
        },
      ],
      hints: [
        "struct Runner { string name; int time; }; 로 구조체를 선언합니다.",
        "time 오름차순으로 정렬 후 인덱스+1이 순위가 됩니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Runner {
    string name;
    int time;
};

int main() {
    int n;
    cin >> n;
    vector<Runner> runners(n);
    for (auto& r : runners) cin >> r.name >> r.time;
    sort(runners.begin(), runners.end(), [](const Runner& a, const Runner& b) {
        return a.time < b.time;
    });
    for (int i = 0; i < n; i++)
        cout << runners[i].name << " " << i + 1 << "\\n";
    return 0;
}`,
      solutionExplanation:
        "기록(time) 오름차순으로 정렬하면 앞에서부터 1등, 2등, ... 순서가 됩니다. 정렬 후 인덱스+1을 순위로 출력합니다.",
      en: {
        title: "Race Rankings",
        description: `Given N runners (name, time in seconds), print their rankings sorted by time ascending. Output format: "name rank"`,
        constraints: "1 ≤ N ≤ 50, 1 ≤ time ≤ 10000, names are lowercase English up to 20 characters",
        hints: [
          "struct Runner { string name; int time; };",
          "Sorting by time ascending makes rank = index + 1 after sorting.",
        ],
        solutionExplanation: "Sorting by time ascending puts rank 1 at index 0, rank 2 at index 1, etc. Output the rank as index + 1 after sorting.",
      },
    },
    {
      id: "struct-011",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "어려움",
      title: "학생 성적 통계 II",
      description: `N명의 학생과 각 M개의 점수가 주어질 때, 평균이 가장 높은 학생의 이름과 전체 평균을 소수점 첫째 자리까지 출력하세요.
전체 평균은 모든 학생의 모든 점수의 평균입니다.`,
      constraints: "1 ≤ N ≤ 20, 1 ≤ M ≤ 10, 0 ≤ 점수 ≤ 100, 이름은 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
#include <cstdio>
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
          expectedOutput: "bob\n85.0",
        },
        {
          stdin: "3 2\nzara 100 100\nalex 80 60\nmike 90 70",
          expectedOutput: "zara\n83.3",
        },
        {
          stdin: "1 4\nonly 60 70 80 90",
          expectedOutput: "only\n75.0",
        },
      ],
      hints: [
        "각 학생의 점수 합계를 M으로 나누어 개인 평균을 구하고, 가장 높은 학생을 찾습니다.",
        "전체 평균 = 모든 점수 합 / (N * M). printf(\"%.1f\\n\", avg) 로 소수점 1자리 출력.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <cstdio>
using namespace std;

struct Student {
    string name;
    vector<int> scores;
};

int main() {
    int n, m;
    cin >> n >> m;
    vector<Student> students(n);
    long long totalAll = 0;
    for (auto& s : students) {
        cin >> s.name;
        s.scores.resize(m);
        for (int& sc : s.scores) {
            cin >> sc;
            totalAll += sc;
        }
    }
    int bestIdx = 0;
    double bestAvg = 0;
    for (int i = 0; i < n; i++) {
        long long sum = 0;
        for (int sc : students[i].scores) sum += sc;
        double avg = (double)sum / m;
        if (avg > bestAvg) {
            bestAvg = avg;
            bestIdx = i;
        }
    }
    cout << students[bestIdx].name << "\\n";
    printf("%.1f\\n", (double)totalAll / (n * m));
    return 0;
}`,
      solutionExplanation:
        "struct 내 vector<int>로 여러 점수를 저장합니다. 각 학생의 평균을 계산해 최고 평균 학생을 찾고, 전체 평균은 누적 합을 N*M으로 나눕니다.",
      en: {
        title: "Student Score Statistics II",
        description: `Given N students each with M scores, print the name of the student with the highest average, then print the overall average (average of all scores from all students) to one decimal place.`,
        constraints: "1 ≤ N ≤ 20, 1 ≤ M ≤ 10, 0 ≤ score ≤ 100, names are lowercase English up to 20 characters",
        hints: [
          "Compute each student's average (sum of scores / M) and find the one with the highest average.",
          "Overall average = total of all scores / (N * M). Use printf(\"%.1f\\n\", avg).",
        ],
        solutionExplanation: "Store multiple scores per student using vector<int> inside the struct. Compute each student's average to find the best, and divide the grand total by N*M for the overall average.",
      },
    },
    {
      id: "struct-012",
      cluster: "structs",
      unlockAfter: "cpp-14",
      difficulty: "어려움",
      title: "복소수 계산",
      description: `두 복소수 (실수부, 허수부)가 주어질 때, 합과 곱을 출력하세요.
출력 형식: "실수부+허수부i" (예: "4.0+6.0i"). 허수부가 음수이면 "실수부-|허수부|i" 형식으로 출력하세요.`,
      constraints: "-100 ≤ 실수부, 허수부 ≤ 100",
      initialCode: `#include <iostream>
#include <cstdio>
using namespace std;

// struct Complex를 선언하세요

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
          expectedOutput: "4.0+6.0i\n-5.0+10.0i",
        },
        {
          stdin: "2 -3\n1 4",
          expectedOutput: "3.0+1.0i\n14.0+5.0i",
        },
        {
          stdin: "0 0\n5 -2",
          expectedOutput: "5.0-2.0i\n0.0+0.0i",
        },
      ],
      hints: [
        "복소수 곱: (a+bi)(c+di) = (ac-bd) + (ad+bc)i",
        "허수부가 음수이면 부호를 별도로 처리해 출력합니다. printf(\"%.1f\", val) 사용.",
      ],
      solutionCode: `#include <iostream>
#include <cstdio>
using namespace std;

struct Complex {
    double real, imag;
};

Complex add(Complex a, Complex b) {
    return {a.real + b.real, a.imag + b.imag};
}

Complex multiply(Complex a, Complex b) {
    return {a.real * b.real - a.imag * b.imag,
            a.real * b.imag + a.imag * b.real};
}

void print(Complex c) {
    if (c.imag >= 0)
        printf("%.1f+%.1fi\\n", c.real, c.imag);
    else
        printf("%.1f%.1fi\\n", c.real, c.imag);
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
        description: `Given two complex numbers (real part, imaginary part), print their sum and product.\nOutput format: "real+imagi" (e.g. "4.0+6.0i"). If the imaginary part is negative, use "real-|imag|i".`,
        constraints: "-100 ≤ real, imag ≤ 100",
        hints: [
          "Complex multiplication: (a+bi)(c+di) = (ac-bd) + (ad+bc)i",
          "Handle the sign of the imaginary part separately. Use printf(\"%.1f\", val).",
        ],
        solutionExplanation: "Complex addition adds real and imaginary parts separately. Multiplication uses the formula (ac-bd)+(ad+bc)i. When the imaginary part is negative, cout already prints the '-' sign, so only branch on the condition.",
      },
    },
  ],
}
