import type { LessonData } from "../types"

export const cppLessonCk7Data: LessonData = {
  id: "cpp-ck7",
  title: "🔧 함수 연습 문제",
  emoji: "🔧",
  description: "함수 작성과 활용 패턴을 실전 문제로 연습합니다.",
  chapters: [
    {
      id: "ck7-main",
      title: "함수 코딩 연습",
      emoji: "💪",
      steps: [
        {
          id: "ck7-intro",
          type: "explain" as const,
          title: "함수 연습 문제",
          content: `함수 정의, 매개변수, 반환값의 핵심 패턴을 연습합니다.\n\n총 6문제입니다. 막히면 힌트를 활용하세요!`,
        },
        {
          id: "ck7-p1",
          type: "practice" as const,
          title: "문제 1: 두 수의 최댓값 반환 함수",
          content: `두 정수를 받아 더 큰 값을 반환하는 함수를 작성하세요.\n\n**출력:** maxOf(7,3)과 maxOf(2,9)의 결과를 각각 출력`,
          code: `#include <iostream>
using namespace std;

int maxOf(int a, int b) {
    if (a > b) return a;
    return b;
}

int main() {
    cout << maxOf(7, 3) << endl;
    cout << maxOf(2, 9) << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int maxOf(int a, int b) {
    // a > b이면 a를, 아니면 b를 반환하세요

}

int main() {
    cout << maxOf(7, 3) << endl;
    cout << maxOf(2, 9) << endl;
    return 0;
}`,
          expectedOutput: `7
9`,
          hint: "if (a > b) return a; 아니면 return b;",
        },
        {
          id: "ck7-p2",
          type: "practice" as const,
          title: "문제 2: 팩토리얼 함수",
          content: `n의 팩토리얼(n!)을 계산해 반환하는 함수를 작성하세요.\n\n**출력:** factorial(5)와 factorial(0)의 결과를 각각 출력`,
          code: `#include <iostream>
using namespace std;

int factorial(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    cout << factorial(5) << endl;
    cout << factorial(0) << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int factorial(int n) {
    int result = 1;
    // 1부터 n까지 result에 곱하세요 (n=0이면 반복 안 함 → 1 반환)

    return result;
}

int main() {
    cout << factorial(5) << endl;
    cout << factorial(0) << endl;
    return 0;
}`,
          expectedOutput: `120
1`,
          hint: "result=1로 시작해서 1부터 n까지 곱하세요. n=0이면 반복 안 함 → 1 반환",
        },
        {
          id: "ck7-p3",
          type: "practice" as const,
          title: "문제 3: 소수 판별 함수",
          content: `주어진 수가 소수인지 판별하는 함수를 작성하세요.\n\n**출력:** isPrime(7)은 "prime", isPrime(10)은 "not prime" 출력`,
          code: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    cout << (isPrime(7) ? "prime" : "not prime") << endl;
    cout << (isPrime(10) ? "prime" : "not prime") << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    // 2부터 n-1까지 n%i==0이면 false 반환
    // 다 통과하면 true 반환

}

int main() {
    cout << (isPrime(7) ? "prime" : "not prime") << endl;
    cout << (isPrime(10) ? "prime" : "not prime") << endl;
    return 0;
}`,
          expectedOutput: `prime
not prime`,
          hint: "2부터 n-1까지 n%i==0이면 false 반환. 다 통과하면 true",
        },
        {
          id: "ck7-p4",
          type: "practice" as const,
          title: "문제 4: 배열 합 반환 함수",
          content: `배열과 크기를 받아 모든 원소의 합을 반환하는 함수를 작성하세요.\n\n**출력:** {1,2,3,4,5} 배열의 합`,
          code: `#include <iostream>
using namespace std;

int sumArray(int arr[], int size) {
    int s = 0;
    for (int i = 0; i < size; i++) {
        s += arr[i];
    }
    return s;
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    cout << sumArray(arr, 5) << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int sumArray(int arr[], int size) {
    int s = 0;
    // for문으로 arr[i]를 s에 더한 뒤 return하세요

}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    cout << sumArray(arr, 5) << endl;
    return 0;
}`,
          expectedOutput: `15`,
          hint: "매개변수로 배열과 크기를 받아서, for문으로 합산하고 return하세요",
        },
        {
          id: "ck7-p5",
          type: "practice" as const,
          title: "문제 5: 절댓값 함수",
          content: `정수의 절댓값을 반환하는 함수를 작성하세요.\n\n**출력:** myAbs(-5), myAbs(3), myAbs(-12)의 결과를 각각 출력`,
          code: `#include <iostream>
using namespace std;

int myAbs(int n) {
    if (n < 0) return -n;
    return n;
}

int main() {
    cout << myAbs(-5) << endl;
    cout << myAbs(3) << endl;
    cout << myAbs(-12) << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int myAbs(int n) {
    // n이 음수면 -n을, 양수면 n을 반환하세요

}

int main() {
    cout << myAbs(-5) << endl;
    cout << myAbs(3) << endl;
    cout << myAbs(-12) << endl;
    return 0;
}`,
          expectedOutput: `5
3
12`,
          hint: "n이 음수면 -n을 반환, 양수면 그냥 n을 반환하세요",
        },
        {
          id: "ck7-p6",
          type: "practice" as const,
          title: "문제 6: void 함수로 별 출력",
          content: `n개의 '*'를 한 줄에 출력하는 void 함수를 작성하세요.\n\n**출력:** printStars(3), printStars(5), printStars(1) 순서로 출력`,
          code: `#include <iostream>
using namespace std;

void printStars(int n) {
    for (int i = 0; i < n; i++) {
        cout << "*";
    }
    cout << endl;
}

int main() {
    printStars(3);
    printStars(5);
    printStars(1);
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

void printStars(int n) {
    // for문으로 n개의 '*'를 출력하고 endl로 줄 바꾸세요
    // void 함수는 return 값이 없어요

}

int main() {
    printStars(3);
    printStars(5);
    printStars(1);
    return 0;
}`,
          expectedOutput: `***
*****
*`,
          hint: "void 함수는 return 값이 없어요. for문으로 n개의 '*'를 출력하고 endl로 줄 바꾸세요",
        },
      ],
    },
  ],
}
