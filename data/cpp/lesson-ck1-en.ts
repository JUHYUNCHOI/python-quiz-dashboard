import type { LessonData } from "../types"

export const cppLessonCk1EnData: LessonData = {
  id: "cpp-ck1",
  title: "🔁 Loop Practice Problems",
  emoji: "🔁",
  description: "Coding practice using loops and conditionals.",
  chapters: [
    {
      id: "ck1-main",
      title: "Loop Coding Practice",
      emoji: "💪",
      steps: [
        {
          id: "ck1-intro",
          type: "explain" as const,
          title: "Loop Practice Problems",
          content: `Solve real problems using the loops and conditionals you've learned.\n\n6 problems total. Use the hints if you get stuck — don't worry, just try coding it out!`,
        },
        {
          id: "ck1-p1",
          type: "practice" as const,
          title: "Problem 1: Sum of Odd Numbers from 1 to N",
          content: `Find the sum of only the odd numbers from 1 to 10.\n\n**Output:** Print the sum of odd numbers`,
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
    // Add only odd numbers from 1 to n

    cout << sum << endl;
    return 0;
}`,
          expectedOutput: `25`,
          hint: "i % 2 != 0 means i is odd. Use an if inside the for loop to add to sum only when i is odd.",
        },
        {
          id: "ck1-p2",
          type: "practice" as const,
          title: "Problem 2: FizzBuzz",
          content: `Print numbers from 1 to 15, but print "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for multiples of 15.\n\n**Rules:** Multiple of 15 → FizzBuzz, multiple of 3 → Fizz, multiple of 5 → Buzz, otherwise → the number`,
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
        // Print FizzBuzz, Fizz, Buzz, or number based on conditions

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
          hint: "Check for multiples of 15 first. The order of if/else if matters: check 15 → 3 → 5.",
        },
        {
          id: "ck1-p3",
          type: "practice" as const,
          title: "Problem 3: Multiplication Table",
          content: `Print only the 3-times table (3×1=3 through 3×9=27).\n\n**Output:** Print only the product, one per line`,
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
    // Use a for loop to print the 3 times table

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
          hint: "Print 3 * i inside the for loop. i goes from 1 to 9.",
        },
        {
          id: "ck1-p4",
          type: "practice" as const,
          title: "Problem 4: Prime Number Check",
          content: `Check if n=17 is a prime number.\n\n**Output:** Print "prime" if it is, "not prime" if it isn't`,
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
    // If any i from 2 to n-1 divides n evenly, it's not prime

    if (isPrime) {
        cout << "prime" << endl;
    } else {
        cout << "not prime" << endl;
    }
    return 0;
}`,
          expectedOutput: `prime`,
          hint: "Loop i from 2 to n-1. If n % i == 0, set isPrime = false and break.",
        },
        {
          id: "ck1-p5",
          type: "practice" as const,
          title: "Problem 5: Inverted Triangle of Stars",
          content: `Print an inverted triangle of stars when n=4.\n\n**Output:** First row has 4 stars, second has 3, ..., last has 1`,
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
    // Outer loop counts down, inner loop should shrink too

    return 0;
}`,
          expectedOutput: `****
***
**
*`,
          hint: "Outer for: i from n down to 1. Inner for: j from 0 to i-1, printing '*'. Print endl after each row.",
        },
        {
          id: "ck1-p6",
          type: "practice" as const,
          title: "Problem 6: Greatest Common Divisor (GCD)",
          content: `Find the GCD of a=24 and b=36.\n\n**Output:** Print the GCD`,
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
    // Use the Euclidean algorithm to find the GCD

    cout << a << endl;
    return 0;
}`,
          expectedOutput: `12`,
          hint: "Euclidean algorithm: repeat while b != 0. Inside: temp = b; b = a % b; a = temp;",
        },
      ],
    },
  ],
}
