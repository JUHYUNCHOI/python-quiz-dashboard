import type { LessonData } from "../types"

export const cppLessonCk3EnData: LessonData = {
  id: "cpp-ck3",
  title: "🔧 Struct + Vector Practice",
  emoji: "🔧",
  description: "Practice combining structs and vectors together.",
  chapters: [
    {
      id: "ck3-main",
      title: "Struct + Vector Coding Practice",
      emoji: "💪",
      steps: [
        {
          id: "ck3-intro",
          type: "explain" as const,
          title: "Struct + Vector Practice Problems",
          content: `Practice using structs and vectors together.\n\n6 problems total. Don't worry before you start — use the hints if you get stuck!`,
        },
        {
          id: "ck3-p1",
          type: "practice" as const,
          title: "Problem 1: Highest Score in a Struct Vector",
          content: `From a vector of student structs, print the name of the student with the highest score.\n\n**Output:** The name of the top scorer`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    int max_score = students[0].score;
    string best = students[0].name;
    for (int i = 1; i < students.size(); i++) {
        if (students[i].score > max_score) {
            max_score = students[i].score;
            best = students[i].name;
        }
    }
    cout << best << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    int max_score = students[0].score;
    string best = students[0].name;
    // Track the highest score and update the student's name

    cout << best << endl;
    return 0;
}`,
          expectedOutput: `Bob`,
          hint: "Compare students[i].score with max_score in the loop. If larger, update both max_score and best.",
        },
        {
          id: "ck3-p2",
          type: "practice" as const,
          title: "Problem 2: Print Passing Students",
          content: `Print the names of students who scored 80 or above, in order.\n\n**Output:** Print each passing student's name on a new line`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    for (int i = 0; i < students.size(); i++) {
        if (students[i].score >= 80) {
            cout << students[i].name << endl;
        }
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    // Print the name of each student with score >= 80

    return 0;
}`,
          expectedOutput: `Alice
Bob`,
          hint: "Loop through each student. If students[i].score >= 80, print students[i].name.",
        },
        {
          id: "ck3-p3",
          type: "practice" as const,
          title: "Problem 3: Swap Function Using References",
          content: `Write a swap function using references to exchange the values of two variables.\n\n**Output:** Print a and b after swapping, separated by a space`,
          code: `#include <iostream>
using namespace std;

void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int a = 10, b = 20;
    swap(a, b);
    cout << a << " " << b << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

void swap(int& a, int& b) {
    // Use a temp variable to exchange a and b

}

int main() {
    int a = 10, b = 20;
    swap(a, b);
    cout << a << " " << b << endl;
    return 0;
}`,
          expectedOutput: `20 10`,
          hint: "Inside void swap(int& a, int& b): int temp = a; a = b; b = temp;",
        },
        {
          id: "ck3-p4",
          type: "practice" as const,
          title: "Problem 4: Reverse a String",
          content: `Reverse the string \"Hello\" and print it.\n\n**Output:** The reversed string`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    for (int i = s.length() - 1; i >= 0; i--) {
        cout << s[i];
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    // Decrease i from s.length()-1 down to 0 and print each character

    cout << endl;
    return 0;
}`,
          expectedOutput: `olleH`,
          hint: "Loop i from s.length()-1 down to 0, printing s[i] each iteration.",
        },
        {
          id: "ck3-p5",
          type: "practice" as const,
          title: "Problem 5: Average Score (Struct Vector)",
          content: `Calculate the average score from a vector of student structs.\n\n**Output:** Print the average score as an integer`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    int sum = 0;
    for (int i = 0; i < students.size(); i++) {
        sum += students[i].score;
    }
    cout << sum / students.size() << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    int sum = 0;
    // Add up scores with sum += students[i].score

    cout << sum / students.size() << endl;
    return 0;
}`,
          expectedOutput: `85`,
          hint: "Loop through each student and do sum += students[i].score. Then divide by students.size().",
        },
        {
          id: "ck3-p6",
          type: "practice" as const,
          title: "Problem 6: Class Member Function",
          content: `Call the getFullName() method on a Person class to print the full name.\n\n**Output:** Print first and last name separated by a space`,
          code: `#include <iostream>
#include <string>
using namespace std;

class Person {
public:
    string first;
    string last;
    string getFullName() {
        return first + " " + last;
    }
};

int main() {
    Person p;
    p.first = "John";
    p.last = "Doe";
    cout << p.getFullName() << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <string>
using namespace std;

class Person {
public:
    string first;
    string last;
    string getFullName() {
        // Concatenate first and last with a space and return

    }
};

int main() {
    Person p;
    p.first = "John";
    p.last = "Doe";
    cout << p.getFullName() << endl;
    return 0;
}`,
          expectedOutput: `John Doe`,
          hint: "Inside the member function you can access first and last directly. Use: return first + \" \" + last;",
        },
      ],
    },
  ],
}
