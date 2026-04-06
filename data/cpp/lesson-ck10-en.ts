import type { LessonData } from "../types"

export const cppLessonCk10EnData: LessonData = {
  id: "cpp-ck10",
  title: "🔍 STL Search Functions Practice",
  emoji: "🔍",
  description: "Hands-on practice with find, count_if, accumulate and other STL search tools.",
  chapters: [
    {
      id: "ck10-main",
      title: "STL Search Functions Coding Practice",
      emoji: "💪",
      steps: [
        {
          id: "ck10-intro",
          type: "explain" as const,
          title: "STL Search Functions Practice",
          content: `Practice find, count_if, accumulate — STL search tools commonly used in USACO.\n\n6 problems total. Use hints if you get stuck!`,
        },
        {
          id: "ck10-p1",
          type: "practice" as const,
          title: "Problem 1: Check if Element Exists (find)",
          content: `Use find to check if 7 is in the vector and print the result.\n\n**Output:** Found or Not found`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
    auto it = find(v.begin(), v.end(), 7);
    if (it != v.end()) {
        cout << "Found" << endl;
    } else {
        cout << "Not found" << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
    // Use find(v.begin(), v.end(), 7) to search for 7
    // If result == v.end(), the element is not found

    return 0;
}`,
          expectedOutput: `Not found`,
          hint: "auto it = find(v.begin(), v.end(), 7); — if it != v.end() the element was found, otherwise it's absent.",
        },
        {
          id: "ck10-p2",
          type: "practice" as const,
          title: "Problem 2: Count Even Numbers (count_if)",
          content: `Use count_if to count how many even numbers are in the vector.\n\n**Output:** Count of even numbers`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
    int cnt = count_if(v.begin(), v.end(), [](int x) {
        return x % 2 == 0;
    });
    cout << cnt << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
    // Use count_if with a lambda to count even numbers (x % 2 == 0)

    return 0;
}`,
          expectedOutput: `4`,
          hint: "count_if(v.begin(), v.end(), [](int x){ return x % 2 == 0; }); — the lambda returns true for even numbers.",
        },
        {
          id: "ck10-p3",
          type: "practice" as const,
          title: "Problem 3: Sum All Elements (accumulate)",
          content: `Use accumulate to find the sum of all elements in the vector.\n\n**Output:** Total sum`,
          code: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    int total = accumulate(v.begin(), v.end(), 0);
    cout << total << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    // accumulate(v.begin(), v.end(), 0) computes the sum starting from 0

    return 0;
}`,
          expectedOutput: `150`,
          hint: "accumulate(v.begin(), v.end(), 0); — the third argument is the starting value (0). Requires #include <numeric>.",
        },
        {
          id: "ck10-p4",
          type: "practice" as const,
          title: "Problem 4: Count Elements Greater Than 10",
          content: `Use count_if to count how many elements are greater than 10.\n\n**Output:** Count`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 12, 3, 18, 7, 25, 1, 11};
    int cnt = count_if(v.begin(), v.end(), [](int x) {
        return x > 10;
    });
    cout << cnt << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 12, 3, 18, 7, 25, 1, 11};
    // Count elements greater than 10 using count_if

    return 0;
}`,
          expectedOutput: `4`,
          hint: "count_if(v.begin(), v.end(), [](int x){ return x > 10; }); — 12, 18, 25, and 11 satisfy the condition.",
        },
        {
          id: "ck10-p5",
          type: "practice" as const,
          title: "Problem 5: Sort then Binary Search",
          content: `Sort the vector, then use binary_search to check if 6 is present.\n\n**Output:** Yes or No`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {4, 2, 7, 1, 6, 3};
    sort(v.begin(), v.end());
    if (binary_search(v.begin(), v.end(), 6)) {
        cout << "Yes" << endl;
    } else {
        cout << "No" << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {4, 2, 7, 1, 6, 3};
    sort(v.begin(), v.end());
    // Use binary_search(v.begin(), v.end(), 6) to check if 6 is present

    return 0;
}`,
          expectedOutput: `Yes`,
          hint: "binary_search only works on sorted ranges. After sort(), use binary_search(v.begin(), v.end(), 6).",
        },
        {
          id: "ck10-p6",
          type: "practice" as const,
          title: "Problem 6: Max and Min Elements",
          content: `Use max_element and min_element to print the max and min values on one line.\n\n**Output:** max min (space-separated)`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
    int maxVal = *max_element(v.begin(), v.end());
    int minVal = *min_element(v.begin(), v.end());
    cout << maxVal << " " << minVal << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
    // *max_element(v.begin(), v.end()) for max
    // *min_element(v.begin(), v.end()) for min

    return 0;
}`,
          expectedOutput: `9 1`,
          hint: "max_element returns an iterator, so dereference it with *. *max_element(v.begin(), v.end()) gives the max value.",
        },
      ],
    },
  ],
}
