import type { LessonData } from "../types"

export const cppLessonCk9EnData: LessonData = {
  id: "cpp-ck9",
  title: "🔗 References & Pointers Practice",
  emoji: "🔗",
  description: "Hands-on coding practice with references and pointers.",
  chapters: [
    {
      id: "ck9-main",
      title: "References & Pointers Coding Practice",
      emoji: "💪",
      steps: [
        {
          id: "ck9-intro",
          type: "explain" as const,
          title: "References & Pointers Practice Problems",
          content: `Practice the core usage of references (\`&\`) and pointers (\`*\`).\n\n6 problems total. Use hints if you get stuck!`,
        },
        {
          id: "ck9-p1",
          type: "practice" as const,
          title: "Problem 1: Swap with References",
          content: `Complete the \`swap\` function using reference parameters to exchange two values.\n\n**Output:** Print x and y after swapping, separated by a space`,
          code: `#include <iostream>
using namespace std;

void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(x, y);
    cout << x << " " << y << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

void swap(int& a, int& b) {
    // Store a in temp, then a = b, b = temp

}

int main() {
    int x = 5, y = 10;
    swap(x, y);
    cout << x << " " << y << endl;
    return 0;
}`,
          expectedOutput: `10 5`,
          hint: "int temp = a; a = b; b = temp; — Use a temp variable to swap. The & means the originals are modified.",
        },
        {
          id: "ck9-p2",
          type: "practice" as const,
          title: "Problem 2: Double a Value via Reference",
          content: `Complete the \`doubleIt\` function that takes a reference and doubles the value.\n\n**Output:** The doubled number`,
          code: `#include <iostream>
using namespace std;

void doubleIt(int& n) {
    n *= 2;
}

int main() {
    int x = 7;
    doubleIt(x);
    cout << x << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

void doubleIt(int& n) {
    // Double n in place (n *= 2)

}

int main() {
    int x = 7;
    doubleIt(x);
    cout << x << endl;
    return 0;
}`,
          expectedOutput: `14`,
          hint: "n *= 2; — Since n is a reference (&), changing n inside the function changes the original x.",
        },
        {
          id: "ck9-p3",
          type: "practice" as const,
          title: "Problem 3: Change a Value via Pointer",
          content: `Use the pointer \`ptr\` to change x's value from 42 to 100.\n\n**Output:** The updated x`,
          code: `#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int* ptr = &x;
    *ptr = 100;
    cout << x << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int* ptr = &x;   // ptr points to x's address
    // Use *ptr to change x to 100

    cout << x << endl;
    return 0;
}`,
          expectedOutput: `100`,
          hint: "*ptr = 100; — *ptr means \"the value at the address ptr points to\", which is x. So *ptr = 100 changes x.",
        },
        {
          id: "ck9-p4",
          type: "practice" as const,
          title: "Problem 4: Add 10 via Pointer Parameter",
          content: `Complete the \`addTen\` function that takes a pointer and adds 10 to the pointed-to value.\n\n**Output:** The result`,
          code: `#include <iostream>
using namespace std;

void addTen(int* p) {
    *p += 10;
}

int main() {
    int n = 5;
    addTen(&n);
    cout << n << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

void addTen(int* p) {
    // Add 10 to the value at *p

}

int main() {
    int n = 5;
    addTen(&n);   // &n passes n's address
    cout << n << endl;
    return 0;
}`,
          expectedOutput: `15`,
          hint: "*p += 10; — p is the address of n, *p is the actual value of n. So *p += 10 changes n from 5 to 15.",
        },
        {
          id: "ck9-p5",
          type: "practice" as const,
          title: "Problem 5: Accumulate a Sum via Reference",
          content: `Complete \`addToSum\` to accumulate a running total using a reference parameter.\n\n**Output:** Sum of the vector elements`,
          code: `#include <iostream>
#include <vector>
using namespace std;

void addToSum(int val, int& sum) {
    sum += val;
}

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    int total = 0;
    for (int i = 0; i < v.size(); i++) {
        addToSum(v[i], total);
    }
    cout << total << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

void addToSum(int val, int& sum) {
    // Add val to sum

}

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    int total = 0;
    for (int i = 0; i < v.size(); i++) {
        addToSum(v[i], total);
    }
    cout << total << endl;
    return 0;
}`,
          expectedOutput: `15`,
          hint: "sum += val; — sum is int& so modifying it inside the function updates total in main.",
        },
        {
          id: "ck9-p6",
          type: "practice" as const,
          title: "Problem 6: Modify a Struct via Reference",
          content: `Complete \`giveBonus\` to add bonus points to a Student struct passed by reference.\n\n**Output:** Score after bonus`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

void giveBonus(Student& s, int bonus) {
    s.score += bonus;
}

int main() {
    Student alice = {"Alice", 85};
    giveBonus(alice, 10);
    cout << alice.score << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

void giveBonus(Student& s, int bonus) {
    // Add bonus to s.score

}

int main() {
    Student alice = {"Alice", 85};
    giveBonus(alice, 10);
    cout << alice.score << endl;
    return 0;
}`,
          expectedOutput: `95`,
          hint: "s.score += bonus; — Passing a struct by reference (&) lets you modify the original without copying it.",
        },
      ],
    },
  ],
}
