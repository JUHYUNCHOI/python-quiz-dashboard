import type { PracticeCluster } from "./types"

export const structsCluster: PracticeCluster = {
  id: "structs",
  title: "struct 활용",
  emoji: "📦",
  description: "struct 선언과 멤버 접근, struct 배열 정렬, 복합 조건 처리",
  unlockAfter: "cpp-14",
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
#include <iomanip>
using namespace std;

struct Student {
    string name;
    int score;
};

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
          expectedOutput: "alice 90\nbob 80\ncarol 70\n평균: 80.00",
        },
        {
          stdin: "2\nzara 100\nleo 50",
          expectedOutput: "zara 100\nleo 50\n평균: 75.00",
        },
      ],
      hints: [
        "struct Student { string name; int score; }; 로 구조체를 선언하세요.",
        "printf(\"%.2f\", avg) 또는 cout << fixed << setprecision(2) << avg 로 소수점 2자리 출력",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <iomanip>
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
        cout << s.name << " " << s.score << "\n";
    cout << "평균: " << fixed << setprecision(2) << (double)total / n << "\n";
    return 0;
}`,
      solutionExplanation:
        "struct로 이름과 점수를 하나의 단위로 묶습니다. vector<Student>로 여러 학생을 관리하고, 범위 기반 for문으로 출력합니다.",
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

struct Point {
    int x, y;
};

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
          expectedOutput: "25\n2\n25\n가장 가까운 점: 2",
        },
        {
          stdin: "2\n0 5\n3 3",
          expectedOutput: "25\n18\n가장 가까운 점: 2",
        },
        {
          stdin: "1\n0 0",
          expectedOutput: "0\n가장 가까운 점: 1",
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
    cout << "가장 가까운 점: " << minIdx + 1 << "\n";
    return 0;
}`,
      solutionExplanation:
        "struct + 함수 조합: dist2 함수가 Point를 받아 거리 제곱을 반환합니다. struct를 const 참조로 전달해 복사를 방지합니다.",
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

struct Product {
    string name;
    int price, stock;
};

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
          expectedOutput: "품절 상품: 2\n총 재고 가치: 4000",
        },
        {
          stdin: "2\npencil 100 50\npen 200 30",
          expectedOutput: "품절 상품: 0\n총 재고 가치: 11000",
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
    cout << "품절 상품: " << outOfStock << "\n";
    cout << "총 재고 가치: " << totalValue << "\n";
    return 0;
}`,
      solutionExplanation:
        "struct로 상품 속성을 묶어 vector<Product>로 관리합니다. 가격×재고 합이 int 범위를 초과할 수 있으므로 long long을 사용합니다.",
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

struct Student {
    string name;
    int kor, eng;
    int total() const { return kor + eng; }
};

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
#include <iomanip>
using namespace std;

struct Student {
    string name;
    int score;
};

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
        "cout << fixed << setprecision(2) << 평균",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <iomanip>
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
    cout << fixed << setprecision(2) << sum / k << "\n";
    for (int i = 0; i < k; i++) cout << students[i].name << "\n";
    return 0;
}`,
      solutionExplanation:
        "정렬 후 앞 K개만 접근하면 됩니다. 정렬 기준이 점수 내림차순+이름 오름차순이므로, 상위 K명이 앞에 정렬됩니다.",
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

struct Employee {
    string name, dept;
    int salary;
};

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
          expectedOutput: "평균 이상: 2\n최고 급여: carol\ndev: 2\nhr: 2",
        },
        {
          stdin: "3\nzara eng 8000\nalex eng 8000\nmike mkt 5000\n2\neng\nmkt",
          expectedOutput: "평균 이상: 2\n최고 급여: alex\neng: 2\nmkt: 1",
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
    cout << "평균 이상: " << aboveAvg << "\n";
    cout << "최고 급여: " << emps[0].name << "\n";
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
    },
  ],
}
