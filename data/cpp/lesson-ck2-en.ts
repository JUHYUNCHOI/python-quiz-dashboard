import type { LessonData } from "../types"

export const cppLessonCk2EnData: LessonData = {
  id: "cpp-ck2",
  title: "📦 Vector Practice Problems",
  emoji: "📦",
  description: "Solve real problems using vectors.",
  chapters: [
    {
      id: "ck2-main",
      title: "Vector Coding Practice",
      emoji: "💪",
      steps: [
        {
          id: "ck2-intro",
          type: "explain" as const,
          title: "Vector Practice Problems",
          content: `Solve real problems using the vector concepts you've learned.\n\n8 problems total. Try each one yourself — use the hints if you get stuck!`,
        },
        {
          id: "ck2-p1",
          type: "practice" as const,
          title: "Problem 1: Sum of Vector Elements",
          content: `Find the sum of all elements in the given vector.\n\n**Output:** Print the total sum`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {3, 7, 2, 9, 1};
    int sum = 0;
    for (int i = 0; i < v.size(); i++) {
        sum += v[i];
    }
    cout << sum << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {3, 7, 2, 9, 1};
    int sum = 0;
    // Add all elements of v to sum

    cout << sum << endl;
    return 0;
}`,
          expectedOutput: `22`,
          hint: "Use a for loop to add v[i] to sum one by one. i goes from 0 to v.size()-1.",
        },
        {
          id: "ck2-p2",
          type: "practice" as const,
          title: "Problem 2: Find the Maximum",
          content: `Print the largest value in the given vector.\n\n**Output:** Print the maximum value`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {4, 2, 8, 1, 5};
    int max_val = v[0];
    for (int i = 1; i < v.size(); i++) {
        if (v[i] > max_val) {
            max_val = v[i];
        }
    }
    cout << max_val << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {4, 2, 8, 1, 5};
    int max_val = v[0];
    // Update max_val whenever you find a larger value

    cout << max_val << endl;
    return 0;
}`,
          expectedOutput: `8`,
          hint: "Initialize max_val to v[0]. In the for loop, if v[i] > max_val, update max_val = v[i].",
        },
        {
          id: "ck2-p3",
          type: "practice" as const,
          title: "Problem 3: Print Numbers Greater Than 5",
          content: `Print only the numbers in the vector that are greater than 5.\n\n**Output:** Print matching numbers in order, one per line`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {3, 7, 2, 9, 1, 6};
    for (int i = 0; i < v.size(); i++) {
        if (v[i] > 5) {
            cout << v[i] << endl;
        }
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {3, 7, 2, 9, 1, 6};
    // Print only numbers greater than 5

    return 0;
}`,
          expectedOutput: `7
9
6`,
          hint: "Inside the for loop: if (v[i] > 5) cout << v[i] << endl;",
        },
        {
          id: "ck2-p4",
          type: "practice" as const,
          title: "Problem 4: Calculate the Average",
          content: `Find the average of all elements in the given vector.\n\n**Output:** Print the average as an integer`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    int sum = 0;
    for (int i = 0; i < v.size(); i++) {
        sum += v[i];
    }
    cout << sum / v.size() << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    int sum = 0;
    // Compute the sum, then divide by v.size()

    cout << sum / v.size() << endl;
    return 0;
}`,
          expectedOutput: `30`,
          hint: "First compute the sum with a for loop, then divide by v.size() for the average.",
        },
        {
          id: "ck2-p5",
          type: "practice" as const,
          title: "Problem 5: Print in Reverse",
          content: `Print the elements of the vector in reverse order.\n\n**Output:** Print elements from back to front, separated by spaces`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (int i = v.size() - 1; i >= 0; i--) {
        cout << v[i];
        if (i > 0) cout << " ";
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    // Decrease i from v.size()-1 down to 0

    cout << endl;
    return 0;
}`,
          expectedOutput: `5 4 3 2 1`,
          hint: "Loop i from v.size()-1 down to 0, printing v[i]. Add a space between elements.",
        },
        {
          id: "ck2-p6",
          type: "practice" as const,
          title: "Problem 6: Print Even Numbers Only",
          content: `Print only the even numbers in the vector.\n\n**Output:** Print even numbers in order, one per line`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
    for (int i = 0; i < v.size(); i++) {
        if (v[i] % 2 == 0) {
            cout << v[i] << endl;
        }
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
    // Print only even numbers

    return 0;
}`,
          expectedOutput: `2
4
6
8`,
          hint: "v[i] % 2 == 0 means v[i] is even. Print only when the condition is true.",
        },
        {
          id: "ck2-p7",
          type: "practice" as const,
          title: "Problem 7: Count Numbers Matching a Condition",
          content: `Count how many numbers in the vector are greater than 3.\n\n**Output:** Print the count`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 5, 2, 7, 3, 8};
    int count = 0;
    for (int i = 0; i < v.size(); i++) {
        if (v[i] > 3) {
            count++;
        }
    }
    cout << count << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 5, 2, 7, 3, 8};
    int count = 0;
    // Count numbers greater than 3

    cout << count << endl;
    return 0;
}`,
          expectedOutput: `3`,
          hint: "Create a count variable and do ++count whenever v[i] > 3.",
        },
        {
          id: "ck2-p8",
          type: "practice" as const,
          title: "Problem 8: Merge Two Vectors",
          content: `Add all elements of v2 to v1 and print the merged vector.\n\n**Output:** Print all elements separated by spaces`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v1 = {1, 2, 3};
    vector<int> v2 = {4, 5, 6};
    for (int i = 0; i < v2.size(); i++) {
        v1.push_back(v2[i]);
    }
    for (int i = 0; i < v1.size(); i++) {
        cout << v1[i];
        if (i < v1.size() - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v1 = {1, 2, 3};
    vector<int> v2 = {4, 5, 6};
    // Use a for loop to push_back each element of v2 into v1

    for (int i = 0; i < v1.size(); i++) {
        cout << v1[i];
        if (i < v1.size() - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
          expectedOutput: `1 2 3 4 5 6`,
          hint: "Loop through v2 and call v1.push_back(v2[i]) for each element.",
        },
      ],
    },
  ],
}
