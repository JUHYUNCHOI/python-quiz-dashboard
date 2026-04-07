import type { LessonData } from "../types"

export const cppLessonCk4EnData: LessonData = {
  id: "cpp-ck4",
  title: "🔢 Sorting Practice Problems",
  emoji: "🔢",
  description: "Practice using sort and custom comparators.",
  chapters: [
    {
      id: "ck4-main",
      title: "Sorting Coding Practice",
      emoji: "💪",
      steps: [
        {
          id: "ck4-intro",
          type: "explain" as const,
          title: "Sorting Practice Problems",
          content: `Problems using sort and custom comparators.\n\n6 problems total. Don't worry before you start — use the hints if you get stuck!`,
        },
        {
          id: "ck4-p1",
          type: "practice" as const,
          title: "Problem 1: Sort in Descending Order",
          content: `Sort the given vector in descending order and print it.\n\n**Output:** Print sorted elements separated by spaces`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};
    sort(v.begin(), v.end(), greater<int>());
    for (int i = 0; i < v.size(); i++) {
        cout << v[i];
        if (i < v.size() - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};
    // Sort in descending order

    for (int i = 0; i < v.size(); i++) {
        cout << v[i];
        if (i < v.size() - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
          expectedOutput: `9 8 5 3 2 1`,
          hint: "Use sort(v.begin(), v.end(), greater<int>()) for descending order.",
        },
        {
          id: "ck4-p2",
          type: "practice" as const,
          title: "Problem 2: Sort Struct Vector by Score",
          content: `Sort students by score in descending order and print their names.\n\n**Output:** Print names from highest to lowest score, one per line`,
          code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    sort(students.begin(), students.end(), [](Student a, Student b) {
        return a.score > b.score;
    });
    for (int i = 0; i < students.size(); i++) {
        cout << students[i].name << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    // Sort by score descending using a lambda

    for (int i = 0; i < students.size(); i++) {
        cout << students[i].name << endl;
    }
    return 0;
}`,
          expectedOutput: `Bob
Alice
Charlie`,
          hint: "sort with lambda: sort(students.begin(), students.end(), [](Student a, Student b){ return a.score > b.score; });",
        },
        {
          id: "ck4-p3",
          type: "practice" as const,
          title: "Problem 3: Find the Median",
          content: `Sort the vector and print the median value.\n\n**Output:** Print the median`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {7, 2, 5, 9, 1};
    sort(v.begin(), v.end());
    cout << v[v.size() / 2] << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {7, 2, 5, 9, 1};
    // Sort first, then print the median

    return 0;
}`,
          expectedOutput: `5`,
          hint: "After sorting, v[v.size()/2] is the median.",
        },
        {
          id: "ck4-p4",
          type: "practice" as const,
          title: "Problem 4: Handle Ties",
          content: `Sort by score descending; if scores are equal, sort by name ascending.\n\n**Output:** Print names in the sorted order, one per line`,
          code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 85}};
    sort(students.begin(), students.end(), [](Student a, Student b) {
        if (a.score != b.score) return a.score > b.score;
        return a.name < b.name;
    });
    for (int i = 0; i < students.size(); i++) {
        cout << students[i].name << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 85}};
    // Sort by score descending, then by name ascending if tied

    for (int i = 0; i < students.size(); i++) {
        cout << students[i].name << endl;
    }
    return 0;
}`,
          expectedOutput: `Bob
Alice
Charlie`,
          hint: "In the lambda: if (a.score != b.score) return a.score > b.score; return a.name < b.name;",
        },
        {
          id: "ck4-p5",
          type: "practice" as const,
          title: "Problem 5: Kth Smallest Number",
          content: `Print the 3rd smallest number in the vector.\n\n**Output:** The Kth smallest number`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {7, 2, 5, 9, 1, 3};
    int k = 3;
    sort(v.begin(), v.end());
    cout << v[k - 1] << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {7, 2, 5, 9, 1, 3};
    int k = 3;
    // After sorting, access the kth smallest element

    return 0;
}`,
          expectedOutput: `3`,
          hint: "After sorting in ascending order, v[k-1] is the kth smallest (indices start at 0).",
        },
        {
          id: "ck4-p6",
          type: "practice" as const,
          title: "Problem 6: Find Duplicates by Sorting",
          content: `Print duplicate numbers in ascending order (each duplicate printed only once).\n\n**Output:** Duplicate numbers separated by spaces`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    sort(v.begin(), v.end());
    for (int i = 0; i < v.size() - 1; i++) {
        if (v[i] == v[i + 1]) {
            cout << v[i];
            // Skip consecutive duplicates
            while (i + 1 < v.size() && v[i] == v[i + 1]) i++;
            if (i < v.size() - 1) cout << " ";
        }
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    sort(v.begin(), v.end());
    // After sorting, v[i] == v[i+1] means a duplicate

    cout << endl;
    return 0;
}`,
          expectedOutput: `1 5`,
          hint: "After sorting, compare adjacent elements. If v[i] == v[i+1], it's a duplicate.",
        },
      ],
    },
  ],
}
