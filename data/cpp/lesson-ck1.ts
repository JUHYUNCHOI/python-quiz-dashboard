import type { LessonData } from "../types"

export const cppLessonCk1Data: LessonData = {
  id: "cpp-ck1",
  title: "🔁 반복문 연습 문제",
  emoji: "🔁",
  description: "반복문과 조건문을 활용한 코딩 연습입니다.",
  chapters: [
    {
      id: "ck1-main",
      title: "반복문 코딩 연습",
      emoji: "💪",
      steps: [
        {
          id: "ck1-intro",
          type: "explain" as const,
          title: "반복문 연습 문제",
          content: `배운 반복문과 조건문 개념으로 실제 문제를 풀어봅니다.\n\n총 6문제입니다. 막히면 힌트를 활용하세요! 걱정하지 말고 직접 코딩으로 해결해보세요.`,
        },
        {
          id: "ck1-p1",
          type: "practice" as const,
          title: "문제 1: 1부터 N까지 홀수의 합",
          content: `1부터 10까지의 홀수만 더한 합을 구하세요.\n\n**출력:** 홀수의 합을 출력`,
          code: `#include <iostream>
using namespace std;

int main() {
    int n = 10;
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        if (i % 2 != 0) {
            sum += i;
        }
    }
    cout << sum << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int n = 10;
    int sum = 0;
    // 1부터 n까지 홀수만 더하세요

    cout << sum << endl;
    return 0;
}`,
          expectedOutput: `25`,
          hint: "i % 2 != 0 이면 홀수입니다. for문 안에 if를 써서 홀수일 때만 sum에 더하세요.",
        },
        {
          id: "ck1-p2",
          type: "practice" as const,
          title: "문제 2: FizzBuzz",
          content: `1부터 15까지 수를 출력하되, 3의 배수는 "Fizz", 5의 배수는 "Buzz", 15의 배수는 "FizzBuzz"를 출력하세요.\n\n**조건:** 15의 배수 → FizzBuzz, 3의 배수 → Fizz, 5의 배수 → Buzz, 나머지 → 숫자`,
          code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 15; i++) {
        if (i % 15 == 0) {
            cout << "FizzBuzz" << endl;
        } else if (i % 3 == 0) {
            cout << "Fizz" << endl;
        } else if (i % 5 == 0) {
            cout << "Buzz" << endl;
        } else {
            cout << i << endl;
        }
    }
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 15; i++) {
        // 조건에 따라 FizzBuzz, Fizz, Buzz, 숫자를 출력하세요

    }
    return 0;
}`,
          expectedOutput: `1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz`,
          hint: "15의 배수 체크를 먼저 해야 합니다. if/else if 순서가 중요합니다 (15 → 3 → 5 순서로).",
        },
        {
          id: "ck1-p3",
          type: "practice" as const,
          title: "문제 3: 구구단 출력",
          content: `3단만 출력하세요 (3×1=3 ~ 3×9=27).\n\n**출력:** 곱셈 결과만 한 줄씩 출력`,
          code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 9; i++) {
        cout << 3 * i << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    // for문으로 3단을 출력하세요

    return 0;
}`,
          expectedOutput: `3
6
9
12
15
18
21
24
27`,
          hint: "for문 안에서 3 * i를 출력하세요. i는 1부터 9까지입니다.",
        },
        {
          id: "ck1-p4",
          type: "practice" as const,
          title: "문제 4: 소수 판별",
          content: `n=17이 소수인지 판별하세요.\n\n**출력:** 소수이면 "prime", 아니면 "not prime"`,
          code: `#include <iostream>
using namespace std;

int main() {
    int n = 17;
    bool isPrime = true;
    for (int i = 2; i < n; i++) {
        if (n % i == 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) {
        cout << "prime" << endl;
    } else {
        cout << "not prime" << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int n = 17;
    bool isPrime = true;
    // 2부터 n-1까지 나누어 떨어지면 소수가 아닙니다

    if (isPrime) {
        cout << "prime" << endl;
    } else {
        cout << "not prime" << endl;
    }
    return 0;
}`,
          expectedOutput: `prime`,
          hint: "2부터 n-1까지 for문을 돌려서 n % i == 0이면 isPrime = false로 설정하고 break 하세요.",
        },
        {
          id: "ck1-p5",
          type: "practice" as const,
          title: "문제 5: 역삼각형 별",
          content: `n=4일 때 역삼각형 모양의 별을 출력하세요.\n\n**출력:** 첫 줄 4개, 둘째 줄 3개, ... 마지막 줄 1개`,
          code: `#include <iostream>
using namespace std;

int main() {
    int n = 4;
    for (int i = n; i >= 1; i--) {
        for (int j = 0; j < i; j++) {
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int n = 4;
    // 바깥 for는 n번, 안쪽 for는 점점 줄어들어야 합니다

    return 0;
}`,
          expectedOutput: `****
***
**
*`,
          hint: "바깥 for: i를 n에서 1까지 감소. 안쪽 for: j를 0부터 i-1까지 증가하며 '*' 출력. 각 줄 끝에 endl.",
        },
        {
          id: "ck1-p6",
          type: "practice" as const,
          title: "문제 6: 최대공약수(GCD)",
          content: `a=24, b=36의 최대공약수를 구하세요.\n\n**출력:** 최대공약수를 출력`,
          code: `#include <iostream>
using namespace std;

int main() {
    int a = 24, b = 36;
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    cout << a << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int a = 24, b = 36;
    // 유클리드 호제법으로 최대공약수를 구하세요

    cout << a << endl;
    return 0;
}`,
          expectedOutput: `12`,
          hint: "유클리드 호제법: b가 0이 될 때까지 반복합니다. temp = b; b = a % b; a = temp;",
        },
      ],
    },
  ],
}
