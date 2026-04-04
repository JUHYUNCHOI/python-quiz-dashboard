import type { PracticeCluster } from "./types"

export const ioCluster: PracticeCluster = {
  id: "io",
  title: "입출력 기초",
  emoji: "⌨️",
  description: "cin 다중 입력, 포맷 출력, 여러 값 처리 패턴",
  unlockAfter: "cpp-4",
  problems: [
    {
      id: "io-001",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "쉬움",
      title: "두 수의 합과 차",
      description: `두 정수 A와 B가 주어질 때, 합과 차를 출력하세요.

- 첫 번째 줄: A + B
- 두 번째 줄: A - B`,
      constraints: "-1000 ≤ A, B ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 5", expectedOutput: "8\n-2", label: "기본" },
        { stdin: "10 10", expectedOutput: "20\n0", label: "같은 수" },
        { stdin: "-3 7", expectedOutput: "4\n-10", label: "음수 포함" },
        { stdin: "0 0", expectedOutput: "0\n0", label: "둘 다 0" },
      ],
      hints: [
        "cin >> a >> b로 두 변수를 한 줄에 입력받을 수 있어요.",
        "cout << a + b 와 cout << a - b 를 각각 줄바꿈과 함께 출력하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << "\n";
    cout << a - b << "\n";
    return 0;
}`,
      solutionExplanation: "cin >> a >> b는 공백이나 줄바꿈으로 구분된 두 값을 순서대로 읽습니다. cout으로 각 결과를 줄바꿈 문자와 함께 출력합니다.",
    },
    {
      id: "io-002",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "쉬움",
      title: "세 수의 합과 평균",
      description: `세 정수 A, B, C가 주어질 때, 합계와 평균을 출력하세요.

- 첫 번째 줄: 합계
- 두 번째 줄: 평균 (소수점 첫째 자리까지)`,
      constraints: "0 ≤ A, B, C ≤ 1000",
      initialCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "1 2 3", expectedOutput: "6\n2.0", label: "기본" },
        { stdin: "10 20 30", expectedOutput: "60\n20.0", label: "정수 평균" },
        { stdin: "1 2 4", expectedOutput: "7\n2.3", label: "소수 평균" },
        { stdin: "0 0 0", expectedOutput: "0\n0.0", label: "모두 0" },
      ],
      hints: [
        "합계를 먼저 구한 뒤, (double)sum / 3으로 평균을 계산하세요.",
        "fixed << setprecision(1)로 소수점 첫째 자리를 고정할 수 있어요.",
      ],
      solutionCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int sum = a + b + c;
    cout << sum << "\n";
    cout << fixed << setprecision(1) << (double)sum / 3 << "\n";
    return 0;
}`,
      solutionExplanation: "세 값을 더해 sum을 구합니다. 평균은 (double)sum / 3으로 실수 나눗셈을 수행하고, fixed + setprecision(1)로 소수점 한 자리를 출력합니다.",
    },
    {
      id: "io-003",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "쉬움",
      title: "이름과 나이 인사말",
      description: `이름(문자열)과 나이(정수)가 주어질 때, 아래 형식으로 출력하세요.

형식: \`안녕하세요, [이름]님! 내년에는 [나이+1]살이 되시는군요.\``,
      constraints: "이름은 영문 또는 한글, 최대 20자. 1 ≤ 나이 ≤ 120",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;
    cin >> name >> age;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "Alice 20", expectedOutput: "안녕하세요, Alice님! 내년에는 21살이 되시는군요.", label: "기본" },
        { stdin: "Bob 99", expectedOutput: "안녕하세요, Bob님! 내년에는 100살이 되시는군요.", label: "100살" },
        { stdin: "Charlie 1", expectedOutput: "안녕하세요, Charlie님! 내년에는 2살이 되시는군요.", label: "아기" },
      ],
      hints: [
        "cin >> name으로 문자열을, cin >> age로 정수를 입력받으세요.",
        "cout에서 문자열과 변수를 << 연산자로 이어 붙여 출력할 수 있어요.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;
    cin >> name >> age;
    cout << "안녕하세요, " << name << "님! 내년에는 " << age + 1 << "살이 되시는군요." << "\n";
    return 0;
}`,
      solutionExplanation: "cin >> name은 공백 전까지의 문자열을 읽습니다. cout에서 << 연산자로 문자열 리터럴과 변수를 이어 출력합니다. age + 1은 출력 중에 바로 계산합니다.",
    },
    {
      id: "io-004",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "쉬움",
      title: "직사각형 넓이와 둘레",
      description: `직사각형의 가로(W)와 세로(H)가 주어질 때, 넓이와 둘레를 출력하세요.

- 첫 번째 줄: 넓이 (W × H)
- 두 번째 줄: 둘레 (2 × (W + H))`,
      constraints: "1 ≤ W, H ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int w, h;
    cin >> w >> h;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4 3", expectedOutput: "12\n14", label: "기본" },
        { stdin: "1 1", expectedOutput: "1\n4", label: "정사각형 최소" },
        { stdin: "10 5", expectedOutput: "50\n30", label: "가로가 더 긴 경우" },
      ],
      hints: [
        "넓이는 w * h, 둘레는 2 * (w + h)입니다.",
        "각 결과를 줄바꿈으로 구분해 출력하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int w, h;
    cin >> w >> h;
    cout << w * h << "\n";
    cout << 2 * (w + h) << "\n";
    return 0;
}`,
      solutionExplanation: "넓이는 두 변의 곱, 둘레는 두 변의 합에 2를 곱합니다. 괄호 안을 먼저 계산하도록 2 * (w + h) 형태로 작성합니다.",
    },
    {
      id: "io-005",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "보통",
      title: "시간 변환",
      description: `초(seconds) 단위의 시간이 주어질 때, 시/분/초 형식으로 변환하여 출력하세요.

형식: \`[시]시간 [분]분 [초]초\``,
      constraints: "0 ≤ 초 ≤ 86400",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int seconds;
    cin >> seconds;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3661", expectedOutput: "1시간 1분 1초", label: "기본" },
        { stdin: "0", expectedOutput: "0시간 0분 0초", label: "0초" },
        { stdin: "86400", expectedOutput: "24시간 0분 0초", label: "하루" },
        { stdin: "3600", expectedOutput: "1시간 0분 0초", label: "정확히 1시간" },
      ],
      hints: [
        "시간 = 초 / 3600, 분 = (초 % 3600) / 60, 초 = 초 % 60",
        "정수 나눗셈과 나머지 연산자(%)를 활용하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int seconds;
    cin >> seconds;
    int h = seconds / 3600;
    int m = (seconds % 3600) / 60;
    int s = seconds % 60;
    cout << h << "시간 " << m << "분 " << s << "초" << "\n";
    return 0;
}`,
      solutionExplanation: "3600으로 나눠 시간을 구하고, 나머지를 60으로 나눠 분을 구합니다. 최종 나머지가 초입니다. 정수 나눗셈은 자동으로 내림 처리됩니다.",
    },
    {
      id: "io-006",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "보통",
      title: "공백 포함 문장 입력",
      description: `첫 줄에 정수 N, 두 번째 줄에 공백을 포함한 문장이 주어질 때, 문장을 N번 반복 출력하세요.`,
      constraints: "1 ≤ N ≤ 10, 문장은 최대 100자",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    string line;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3\nhello world", expectedOutput: "hello world\nhello world\nhello world", label: "기본" },
        { stdin: "1\nC++ is fun", expectedOutput: "C++ is fun", label: "1회" },
        { stdin: "2\ngood morning everyone", expectedOutput: "good morning everyone\ngood morning everyone", label: "공백 3개" },
      ],
      hints: [
        "cin >> n 이후 줄바꿈이 남아 있으므로 getline 전에 cin.ignore()를 호출하세요.",
        "getline(cin, line)으로 공백 포함 한 줄 전체를 읽을 수 있어요.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    string line;
    cin >> n;
    cin.ignore();
    getline(cin, line);
    for (int i = 0; i < n; i++)
        cout << line << "\n";
    return 0;
}`,
      solutionExplanation: "cin >> n 이후 버퍼에 남은 줄바꿈을 cin.ignore()로 버린 뒤 getline으로 공백 포함 문장을 읽습니다. for 루프로 n번 출력합니다.",
    },
    {
      id: "io-007",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "보통",
      title: "최댓값과 위치",
      description: `N개의 정수가 주어질 때, 최댓값과 그 값이 처음 등장하는 위치(1-based)를 출력하세요.

- 첫 번째 줄: 최댓값
- 두 번째 줄: 위치 (1-based)`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 7 2 7 1", expectedOutput: "7\n2", label: "기본 (첫 번째 최댓값)" },
        { stdin: "4\n-1 -5 -2 -3", expectedOutput: "-1\n1", label: "음수만" },
        { stdin: "1\n42", expectedOutput: "42\n1", label: "원소 1개" },
        { stdin: "3\n10 10 10", expectedOutput: "10\n1", label: "전부 최댓값" },
      ],
      hints: [
        "첫 번째 값을 최댓값으로 초기화하고, 나머지 값과 비교하면서 갱신하세요.",
        "최댓값을 갱신할 때만 위치를 업데이트합니다 (같은 값이면 갱신하지 않음).",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int maxVal, maxPos = 1, x;
    cin >> maxVal;
    for (int i = 2; i <= n; i++) {
        cin >> x;
        if (x > maxVal) {
            maxVal = x;
            maxPos = i;
        }
    }
    cout << maxVal << "\\n" << maxPos << "\\n";
    return 0;
}`,
      solutionExplanation: "첫 번째 원소로 초기화 후 2번째부터 비교합니다. 엄격하게 큰 경우(>)만 갱신하므로 같은 값이 있어도 처음 위치를 유지합니다.",
    },
    {
      id: "io-008",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "어려움",
      title: "EOF까지 합계",
      description: `입력이 끝날 때까지 정수를 읽어 모두 더한 합계를 출력하세요.
입력의 개수는 미리 주어지지 않습니다.`,
      constraints: "정수 개수는 1 이상 100 이하, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int x;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "1 2 3 4 5", expectedOutput: "15", label: "5개" },
        { stdin: "10", expectedOutput: "10", label: "1개" },
        { stdin: "-5 3 -2 10", expectedOutput: "6", label: "음수 포함" },
        { stdin: "100 200 300", expectedOutput: "600", label: "3개" },
      ],
      hints: [
        "while (cin >> x)는 입력 성공 여부를 반환하므로 EOF 처리에 사용할 수 있어요.",
        "루프 내에서 sum += x를 반복하고, 루프 종료 후 sum을 출력하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int x, sum = 0;
    while (cin >> x) sum += x;
    cout << sum << "\n";
    return 0;
}`,
      solutionExplanation: "while (cin >> x)는 입력에 성공하면 true, EOF나 오류면 false를 반환합니다. 이 패턴으로 개수를 모르는 입력을 처리할 수 있습니다.",
    },
  ],
}
