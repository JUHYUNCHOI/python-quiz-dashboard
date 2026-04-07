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
      description: `첫 줄에 정수 N이 주어지고, 두 번째 줄에 공백을 포함한 문장이 주어질 때, 문장을 그대로 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, 문장은 최대 100자",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    string line;
    cin >> n;
    // cin >> n 이후에 getline으로 문장을 읽어보세요
    return 0;
}`,
      testCases: [
        { stdin: "3\nhello world", expectedOutput: "hello world", label: "기본" },
        { stdin: "5\nC++ is fun", expectedOutput: "C++ is fun", label: "다른 N" },
        { stdin: "1\ngood morning everyone", expectedOutput: "good morning everyone", label: "공백 여러 개" },
      ],
      hints: [
        "cin >> n 이후 버퍼에 줄바꿈 문자가 남아 있어요. getline 전에 cin.ignore()로 제거하세요.",
        "getline(cin, line)으로 공백을 포함한 한 줄 전체를 읽을 수 있어요.",
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
    cout << line << "\n";
    return 0;
}`,
      solutionExplanation: "cin >> n 이후 버퍼에 남은 줄바꿈을 cin.ignore()로 버린 뒤, getline(cin, line)으로 공백을 포함한 문장을 읽어 출력합니다.",
    },
  ],
}
