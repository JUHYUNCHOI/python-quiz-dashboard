import type { LessonData } from "../types"

export const cppLessonCk7EnData: LessonData = {
  id: "cpp-ck7",
  title: "🔧 Functions Practice Problems",
  emoji: "🔧",
  description: "Practice writing and using functions with real problems.",
  chapters: [
    {
      id: "ck7-main",
      title: "Functions Coding Practice",
      emoji: "💪",
      steps: [
        {
          id: "ck7-intro",
          type: "explain" as const,
          title: "Functions Practice Problems",
          content: `Practice core patterns for defining functions, passing parameters, and returning values.\n\n6 problems total. Don't worry before you start — use the hints if you get stuck!`,
        },
        {
          id: "ck7-p1",
          type: "practice" as const,
          title: "Problem 1: Return the Maximum of Two Numbers",
          content: `Write a function that takes two integers and returns the larger one.\n\n**Output:** Print the results of maxOf(7,3) and maxOf(2,9) on separate lines`,
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
    // Return a if a > b, otherwise return b

}

int main() {
    cout << maxOf(7, 3) << endl;
    cout << maxOf(2, 9) << endl;
    return 0;
}`,
          expectedOutput: `7
9`,
          hint: "if (a > b) return a; otherwise return b;",
        },
        {
          id: "ck7-p2",
          type: "practice" as const,
          title: "Problem 2: Factorial Function",
          content: `Write a function that computes n! (n factorial) and returns the result.\n\n**Output:** Print factorial(5) and factorial(0) on separate lines`,
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
    // Multiply result by each number from 1 to n
    // If n=0 the loop doesn't run → returns 1

    return result;
}

int main() {
    cout << factorial(5) << endl;
    cout << factorial(0) << endl;
    return 0;
}`,
          expectedOutput: `120
1`,
          hint: "Start result at 1 and multiply by each number from 1 to n. If n=0 the loop doesn't run → returns 1",
        },
        {
          id: "ck7-p3",
          type: "practice" as const,
          title: "Problem 3: Prime Number Check",
          content: `Write a function that returns true if a number is prime, false otherwise.\n\n**Output:** Print "prime" for isPrime(7) and "not prime" for isPrime(10)`,
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
    // From 2 to n-1: if n%i==0, return false
    // If all pass, return true

}

int main() {
    cout << (isPrime(7) ? "prime" : "not prime") << endl;
    cout << (isPrime(10) ? "prime" : "not prime") << endl;
    return 0;
}`,
          expectedOutput: `prime
not prime`,
          hint: "From 2 to n-1: if n%i==0 return false. If all pass, return true",
        },
        {
          id: "ck7-p4",
          type: "practice" as const,
          title: "Problem 4: Array Sum Function",
          content: `Write a function that takes an array and its size, and returns the sum of all elements.\n\n**Output:** Print the sum of {1,2,3,4,5}`,
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
    // Loop through arr[i] and add each element to s, then return s

}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    cout << sumArray(arr, 5) << endl;
    return 0;
}`,
          expectedOutput: `15`,
          hint: "Accept the array and its size as parameters, loop to sum, then return the total",
        },
        {
          id: "ck7-p5",
          type: "practice" as const,
          title: "Problem 5: Absolute Value Function",
          content: `Write a function that returns the absolute value of an integer.\n\n**Output:** Print myAbs(-5), myAbs(3), and myAbs(-12) on separate lines`,
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
    // If n is negative return -n, otherwise return n

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
          hint: "If n is negative return -n, if positive return n",
        },
        {
          id: "ck7-p6",
          type: "practice" as const,
          title: "Problem 6: void Function to Print Stars",
          content: `Write a void function that prints n asterisks on one line.\n\n**Output:** Call printStars(3), printStars(5), printStars(1) in order`,
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
    // void functions don't return a value
    // Use a for loop to print n '*' characters, then endl

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
          hint: "void functions have no return value. Use a for loop to print n '*' characters, then end with endl",
        },
      ],
    },
  ],
}
