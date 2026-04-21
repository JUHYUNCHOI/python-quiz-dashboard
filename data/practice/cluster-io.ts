import type { PracticeCluster } from "./types"

export const ioCluster: PracticeCluster = {
  id: "io",
  title: "입출력 기초",
  emoji: "⌨️",
  description: "cin 다중 입력, 포맷 출력, 여러 값 처리 패턴",
  unlockAfter: "cpp-4",
  en: { title: "I/O Basics", description: "Multiple cin inputs, formatted output, handling multiple values" },
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
    // cin으로 a, b를 입력받으세요
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
    cout << a + b << "\\n";
    cout << a - b << "\\n";
    return 0;
}`,
      solutionExplanation: "cin >> a >> b는 공백이나 줄바꿈으로 구분된 두 값을 순서대로 읽습니다. cout으로 각 결과를 줄바꿈 문자와 함께 출력합니다.",
      en: {
        title: "Sum and Difference of Two Numbers",
        description: `Given two integers A and B, print their sum and difference.

- First line: A + B
- Second line: A - B`,
        constraints: "-1000 ≤ A, B ≤ 1000",
        hints: [
          "Use `cin >> a >> b` to read two variables on one line.",
          "Print `a + b` and `a - b` each followed by a newline.",
        ],
        solutionExplanation: "`cin >> a >> b` reads two values separated by whitespace or newline in order. Use `cout` to print each result with a newline character.",
      },
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
    // cin으로 a, b, c를 입력받으세요
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
    cout << sum << "\\n";
    cout << fixed << setprecision(1) << (double)sum / 3 << "\\n";
    return 0;
}`,
      solutionExplanation: "세 값을 더해 sum을 구합니다. 평균은 (double)sum / 3으로 실수 나눗셈을 수행하고, fixed + setprecision(1)로 소수점 한 자리를 출력합니다.",
      en: {
        title: "Sum and Average of Three Numbers",
        description: `Given three integers A, B, C, print their sum and average.

- First line: sum
- Second line: average (to one decimal place)`,
        constraints: "0 ≤ A, B, C ≤ 1000",
        hints: [
          "Compute the sum first, then calculate the average with `(double)sum / 3`.",
          "Use `fixed << setprecision(1)` to fix the output to one decimal place.",
        ],
        solutionExplanation: "Add the three values to get `sum`. Compute the average with `(double)sum / 3` for floating-point division, then use `fixed + setprecision(1)` to print one decimal place.",
      },
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
    // cin으로 name, age를 입력받으세요
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
    cout << "안녕하세요, " << name << "님! 내년에는 " << age + 1 << "살이 되시는군요." << "\\n";
    return 0;
}`,
      solutionExplanation: "cin >> name은 공백 전까지의 문자열을 읽습니다. cout에서 << 연산자로 문자열 리터럴과 변수를 이어 출력합니다. age + 1은 출력 중에 바로 계산합니다.",
      en: {
        title: "Name and Age Greeting",
        description: `Given a name (string) and an age (integer), print a greeting in the following format.

Format: \`안녕하세요, [name]님! 내년에는 [age+1]살이 되시는군요.\`

Note: the Korean characters in the output (안녕하세요, 님!, 내년에는, 살이 되시는군요.) must be printed exactly as shown to match the test cases.`,
        constraints: "Name is up to 20 characters (English or Korean). 1 ≤ age ≤ 120",
        hints: [
          "Use `cin >> name` to read the string and `cin >> age` to read the integer.",
          "Chain string literals and variables with `<<` in `cout`.",
        ],
        solutionExplanation: "`cin >> name` reads the string up to the first whitespace. In `cout`, use `<<` to concatenate string literals and variables. `age + 1` is evaluated inline during output.",
      },
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
    // cin으로 w, h를 입력받으세요
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
    cout << w * h << "\\n";
    cout << 2 * (w + h) << "\\n";
    return 0;
}`,
      solutionExplanation: "넓이는 두 변의 곱, 둘레는 두 변의 합에 2를 곱합니다. 괄호 안을 먼저 계산하도록 2 * (w + h) 형태로 작성합니다.",
      en: {
        title: "Rectangle Area and Perimeter",
        description: `Given the width (W) and height (H) of a rectangle, print its area and perimeter.

- First line: area (W × H)
- Second line: perimeter (2 × (W + H))`,
        constraints: "1 ≤ W, H ≤ 1000",
        hints: [
          "Area is `w * h`, perimeter is `2 * (w + h)`.",
          "Print each result on a separate line.",
        ],
        solutionExplanation: "Area is the product of the two sides; perimeter is twice their sum. Write `2 * (w + h)` to ensure the addition happens before multiplication.",
      },
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
    // cin으로 seconds를 입력받으세요
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
    cout << h << "시간 " << m << "분 " << s << "초" << "\\n";
    return 0;
}`,
      solutionExplanation: "3600으로 나눠 시간을 구하고, 나머지를 60으로 나눠 분을 구합니다. 최종 나머지가 초입니다. 정수 나눗셈은 자동으로 내림 처리됩니다.",
      en: {
        title: "Time Conversion",
        description: `Given a time value in seconds, convert it to hours, minutes, and seconds and print it in the following format.

Format: \`[h]시간 [m]분 [s]초\`

Note: the Korean labels (시간, 분, 초) in the output must be printed exactly as shown to match the test cases.`,
        constraints: "0 ≤ seconds ≤ 86400",
        hints: [
          "hours = seconds / 3600, minutes = (seconds % 3600) / 60, seconds = seconds % 60",
          "Use integer division and the modulo operator `%`.",
        ],
        solutionExplanation: "Divide by 3600 to get hours, then divide the remainder by 60 to get minutes. The final remainder is the seconds. Integer division truncates automatically.",
      },
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
    // cin으로 n을 입력받은 뒤, getline으로 문장을 읽어보세요
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
    cout << line << "\\n";
    return 0;
}`,
      solutionExplanation: "cin >> n 이후 버퍼에 남은 줄바꿈을 cin.ignore()로 버린 뒤, getline(cin, line)으로 공백을 포함한 문장을 읽어 출력합니다.",
      en: {
        title: "Reading a Sentence with Spaces",
        description: `An integer N is given on the first line, and a sentence (which may contain spaces) is given on the second line. Print the sentence as-is.`,
        constraints: "1 ≤ N ≤ 100, sentence is at most 100 characters",
        hints: [
          "After `cin >> n`, a newline character remains in the buffer. Call `cin.ignore()` before `getline` to discard it.",
          "Use `getline(cin, line)` to read an entire line including spaces.",
        ],
        solutionExplanation: "After `cin >> n`, the leftover newline in the buffer must be discarded with `cin.ignore()`. Then `getline(cin, line)` reads the full sentence including spaces.",
      },
    },
    {
      id: "io-007",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "보통",
      title: "온도 변환기",
      description: `섭씨(Celsius) 온도가 주어질 때, 화씨와 켈빈으로 변환하여 출력하세요.

- 첫 번째 줄: 화씨 (F = C × 9.0 / 5.0 + 32)
- 두 번째 줄: 켈빈 (K = C + 273.15)

소수점 둘째 자리까지 출력하세요.`,
      constraints: "-273.15 ≤ C ≤ 10000",
      initialCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double c;
    // cin으로 c를 입력받으세요
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "0", expectedOutput: "32.00\n273.15", label: "0도" },
        { stdin: "100", expectedOutput: "212.00\n373.15", label: "끓는점" },
        { stdin: "-40", expectedOutput: "-40.00\n233.15", label: "화씨=섭씨 교차점" },
      ],
      hints: [
        "double 타입으로 입력받아야 소수점 계산이 정확합니다.",
        "fixed << setprecision(2)로 소수점 두 자리를 고정하세요.",
      ],
      solutionCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double c;
    cin >> c;
    double f = c * 9.0 / 5.0 + 32;
    double k = c + 273.15;
    cout << fixed << setprecision(2) << f << "\\n" << k << "\\n";
    return 0;
}`,
      solutionExplanation: "9.0 / 5.0처럼 실수 리터럴을 사용해 정수 나눗셈을 방지합니다. fixed + setprecision(2)는 cout에 한 번만 설정하면 이후 출력 모두에 적용됩니다.",
      en: {
        title: "Temperature Converter",
        description: `Given a temperature in Celsius, convert it to Fahrenheit and Kelvin and print both.

- First line: Fahrenheit (F = C × 9.0 / 5.0 + 32)
- Second line: Kelvin (K = C + 273.15)

Print to two decimal places.`,
        constraints: "-273.15 ≤ C ≤ 10000",
        hints: [
          "Read the input as `double` to ensure accurate decimal calculations.",
          "Use `fixed << setprecision(2)` to fix output to two decimal places.",
        ],
        solutionExplanation: "Using floating-point literals like `9.0 / 5.0` prevents integer division. Setting `fixed + setprecision(2)` once on `cout` applies to all subsequent outputs.",
      },
    },
    {
      id: "io-008",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "보통",
      title: "거스름돈 계산기",
      description: `물건 가격(price)과 지불 금액(paid)이 주어질 때, 거스름돈을 50원, 10원, 1원 단위로 분해하여 각각 몇 개인지 한 줄씩 출력하세요.

출력 순서: 50원 개수, 10원 개수, 1원 개수`,
      constraints: "1 ≤ price ≤ paid ≤ 10000, price와 paid는 모두 정수",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int price, paid;
    // cin으로 price, paid를 입력받으세요
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "730 1000", expectedOutput: "5\n2\n0", label: "270원 거스름돈" },
        { stdin: "100 100", expectedOutput: "0\n0\n0", label: "거스름돈 없음" },
        { stdin: "451 500", expectedOutput: "0\n4\n9", label: "49원 거스름돈" },
      ],
      hints: [
        "거스름돈 = paid - price",
        "50원짜리 개수 = 거스름돈 / 50, 나머지 = 거스름돈 % 50",
        "같은 방식으로 10원, 1원 순서로 처리하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int price, paid;
    cin >> price >> paid;
    int change = paid - price;
    int w50 = change / 50;
    change %= 50;
    int w10 = change / 10;
    change %= 10;
    int w1 = change;
    cout << w50 << "\\n" << w10 << "\\n" << w1 << "\\n";
    return 0;
}`,
      solutionExplanation: "큰 단위부터 나눗셈으로 개수를 구하고, 나머지 연산으로 남은 금액을 줄여나가는 그리디 패턴입니다. 동전 거스름돈 문제의 기본 형태입니다.",
      en: {
        title: "Change Calculator",
        description: `Given an item price and the amount paid, break down the change into 50-won, 10-won, and 1-won coins and print the count of each on separate lines.

Output order: count of 50-won, count of 10-won, count of 1-won`,
        constraints: "1 ≤ price ≤ paid ≤ 10000, both are integers",
        hints: [
          "change = paid - price",
          "Count of 50-won coins = change / 50, remainder = change % 50",
          "Apply the same process for 10-won and 1-won coins in order.",
        ],
        solutionExplanation: "This is a greedy pattern: divide by the largest denomination first to get the coin count, then use modulo to reduce the remaining amount. Repeat for smaller denominations.",
      },
    },
    {
      id: "io-009",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "보통",
      title: "BMI 계산기",
      description: `몸무게(kg)와 키(m)가 주어질 때 BMI를 계산하여 소수점 첫째 자리까지 출력하세요.

BMI = 몸무게 / (키 × 키)`,
      constraints: "1 ≤ 몸무게 ≤ 500, 0.5 ≤ 키 ≤ 3.0",
      initialCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double weight, height;
    // cin으로 weight, height를 입력받으세요
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "70 1.75", expectedOutput: "22.9", label: "정상 범위" },
        { stdin: "90 1.80", expectedOutput: "27.8", label: "과체중" },
        { stdin: "50 1.60", expectedOutput: "19.5", label: "저체중 경계" },
      ],
      hints: [
        "BMI = weight / (height * height)로 계산합니다.",
        "fixed << setprecision(1)로 소수점 한 자리를 출력하세요.",
      ],
      solutionCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double weight, height;
    cin >> weight >> height;
    double bmi = weight / (height * height);
    cout << fixed << setprecision(1) << bmi << "\\n";
    return 0;
}`,
      solutionExplanation: "height * height로 키의 제곱을 구하고 몸무게를 나눕니다. double 타입이므로 실수 나눗셈이 자동으로 수행됩니다. setprecision(1)로 소수 첫째 자리까지 반올림 출력합니다.",
      en: {
        title: "BMI Calculator",
        description: `Given weight (kg) and height (m), calculate BMI and print it to one decimal place.

BMI = weight / (height × height)`,
        constraints: "1 ≤ weight ≤ 500, 0.5 ≤ height ≤ 3.0",
        hints: [
          "Compute `bmi = weight / (height * height)`.",
          "Use `fixed << setprecision(1)` to print one decimal place.",
        ],
        solutionExplanation: "Square the height with `height * height` and divide the weight by it. Since both are `double`, floating-point division happens automatically. `setprecision(1)` rounds the output to one decimal place.",
      },
    },
    {
      id: "io-010",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "어려움",
      title: "N개 정수 최대/최소/합",
      description: `첫 줄에 정수 N이 주어지고, 다음 줄에 N개의 정수가 공백으로 구분되어 주어질 때, 최댓값, 최솟값, 합계를 각각 한 줄씩 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "5\n1\n14", label: "기본" },
        { stdin: "3\n-2 -5 -1", expectedOutput: "-1\n-5\n-8", label: "음수만" },
        { stdin: "1\n42", expectedOutput: "42\n42\n42", label: "단일 입력" },
      ],
      hints: [
        "첫 번째 값을 읽어 maxVal, minVal, sum을 모두 초기화한 뒤, 나머지 N-1개를 처리하세요.",
        "또는 maxVal = INT_MIN, minVal = INT_MAX로 초기화하고 N개 모두 처리해도 됩니다.",
        "#include <climits>에서 INT_MIN, INT_MAX를 사용할 수 있어요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int x;
    cin >> x;
    int maxVal = x, minVal = x, sum = x;
    for (int i = 1; i < n; i++) {
        cin >> x;
        if (x > maxVal) maxVal = x;
        if (x < minVal) minVal = x;
        sum += x;
    }
    cout << maxVal << "\\n" << minVal << "\\n" << sum << "\\n";
    return 0;
}`,
      solutionExplanation: "첫 번째 값으로 최댓값/최솟값/합계를 초기화한 뒤 나머지를 순회합니다. N=1일 때도 올바르게 동작합니다. INT_MIN/INT_MAX 초기화 방식도 가능하지만, 첫 값으로 초기화하면 헤더 없이도 안전합니다.",
      en: {
        title: "Max / Min / Sum of N Integers",
        description: `Given N on the first line and N space-separated integers on the second line, print the maximum, minimum, and sum each on their own line.`,
        constraints: "1 ≤ N ≤ 100, -10000 ≤ each integer ≤ 10000",
        hints: [
          "Read the first value and use it to initialize `maxVal`, `minVal`, and `sum`, then process the remaining N-1 values.",
          "Alternatively, initialize `maxVal = INT_MIN` and `minVal = INT_MAX` and process all N values.",
          "`INT_MIN` and `INT_MAX` are available with `#include <climits>`.",
        ],
        solutionExplanation: "Initialize max/min/sum with the first value, then iterate over the rest. This handles N=1 correctly without any special case. Using the first value for initialization is safe without needing extra headers.",
      },
    },
    {
      id: "io-011",
      cluster: "io",
      unlockAfter: "cpp-4",
      difficulty: "어려움",
      title: "성적 통계",
      description: `첫 줄에 학생 수 N이 주어지고, 이후 N줄에 걸쳐 이름(문자열)과 점수(정수)가 주어질 때, 평균(소수점 첫째 자리)과 최고점 학생의 이름을 출력하세요.

동점자가 있을 경우 먼저 입력된 학생의 이름을 출력합니다.`,
      constraints: "1 ≤ N ≤ 100, 0 ≤ 점수 ≤ 100, 이름은 공백 없는 영문자",
      initialCode: `#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3\nalice 90\nbob 85\ncharlie 95", expectedOutput: "90.0\ncharlie", label: "기본" },
        { stdin: "2\nlee 70\nkim 70", expectedOutput: "70.0\nlee", label: "동점 시 첫 번째" },
        { stdin: "1\nsolo 100", expectedOutput: "100.0\nsolo", label: "단일 학생" },
      ],
      hints: [
        "이름과 점수를 각각 string과 int로 읽으세요: cin >> name >> score",
        "합계를 누적하고, 최고점과 해당 학생 이름을 별도 변수로 추적하세요.",
        "동점 처리: 현재 점수가 최고점보다 strictly 클 때만 갱신하면 첫 번째 학생이 유지됩니다.",
        "평균은 소수점 첫째 자리까지: cout << fixed << setprecision(1) << avg; (<iomanip> 이미 포함)",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    string topName;
    int topScore = -1, sum = 0;
    for (int i = 0; i < n; i++) {
        string name;
        int score;
        cin >> name >> score;
        sum += score;
        if (score > topScore) {
            topScore = score;
            topName = name;
        }
    }
    cout << fixed << setprecision(1) << (double)sum / n << "\\n";
    cout << topName << "\\n";
    return 0;
}`,
      solutionExplanation: "topScore를 -1로 초기화하면 첫 학생이 반드시 최고점으로 등록됩니다. score > topScore (엄격한 부등호)를 사용하면 동점 시 첫 번째 학생이 유지됩니다. 평균은 (double)sum / n으로 실수 나눗셈합니다.",
      en: {
        title: "Grade Statistics",
        description: `Given N on the first line, followed by N lines each containing a name (string) and a score (integer), print the average (to one decimal place) and the name of the top scorer.

If there is a tie for the highest score, print the name of the student who appeared first in the input.`,
        constraints: "1 ≤ N ≤ 100, 0 ≤ score ≤ 100, names contain only English letters with no spaces",
        hints: [
          "Read name and score with `cin >> name >> score`.",
          "Accumulate the sum and track the top score and the corresponding student name separately.",
          "Tie-breaking: only update when the current score is strictly greater than the top score — this preserves the first student in case of a tie.",
        ],
        solutionExplanation: "Initializing `topScore` to -1 ensures the first student is always recorded as the top scorer. Using a strict `>` comparison means ties do not replace the existing top name. Compute the average with `(double)sum / n` for floating-point division.",
      },
    },
  ],
}
