import type { LessonData } from "../types"

export const cppLessonCk5EnData: LessonData = {
  id: "cpp-ck5",
  title: "🗺️ map/set Practice Problems",
  emoji: "🗺️",
  description: "Solve real problems using map and set.",
  chapters: [
    {
      id: "ck5-main",
      title: "map/set Coding Practice",
      emoji: "💪",
      steps: [
        {
          id: "ck5-intro",
          type: "explain" as const,
          title: "map/set Practice Problems",
          content: `Practice the core usage patterns of map and set.\n\n6 problems total. Don't worry before you start — use the hints if you get stuck!`,
        },
        {
          id: "ck5-p1",
          type: "practice" as const,
          title: "Problem 1: Word Frequency",
          content: `Count how many times each word appears in the list.\n\n**Output:** Print in alphabetical order as "word: count"`,
          code: `#include <iostream>
#include <vector>
#include <map>
#include <string>
using namespace std;

int main() {
    vector<string> words = {"apple", "banana", "apple", "cherry", "banana", "apple"};
    map<string, int> wordCount;
    for (int i = 0; i < words.size(); i++) {
        wordCount[words[i]]++;
    }
    for (auto it = wordCount.begin(); it != wordCount.end(); it++) {
        cout << it->first << ": " << it->second << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <map>
#include <string>
using namespace std;

int main() {
    vector<string> words = {"apple", "banana", "apple", "cherry", "banana", "apple"};
    map<string, int> wordCount;
    // Use wordCount[word]++ to count frequencies

    for (auto it = wordCount.begin(); it != wordCount.end(); it++) {
        cout << it->first << ": " << it->second << endl;
    }
    return 0;
}`,
          expectedOutput: `apple: 3
banana: 2
cherry: 1`,
          hint: "Loop through words and do wordCount[words[i]]++. map sorts alphabetically automatically.",
        },
        {
          id: "ck5-p2",
          type: "practice" as const,
          title: "Problem 2: Remove Duplicates",
          content: `Remove duplicates from the vector and print in ascending order.\n\n**Output:** Unique numbers separated by spaces`,
          code: `#include <iostream>
#include <vector>
#include <set>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
    set<int> s(v.begin(), v.end());
    for (auto it = s.begin(); it != s.end(); it++) {
        if (it != s.begin()) cout << " ";
        cout << *it;
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <set>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
    // set<int> s(v.begin(), v.end()) removes duplicates at once

    return 0;
}`,
          expectedOutput: `1 2 3 4 5 6 9`,
          hint: "set<int> s(v.begin(), v.end()) creates a set from the vector, removing duplicates. set is automatically sorted.",
        },
        {
          id: "ck5-p3",
          type: "practice" as const,
          title: "Problem 3: Grade Book with map",
          content: `Store student scores in a map and print Alice's score.\n\n**Output:** Alice's score`,
          code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> scores;
    scores["Alice"] = 85;
    scores["Bob"] = 92;
    scores["Charlie"] = 78;
    cout << scores["Alice"] << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> scores;
    scores["Alice"] = 85;
    scores["Bob"] = 92;
    scores["Charlie"] = 78;
    // Access scores["Alice"]

    return 0;
}`,
          expectedOutput: `85`,
          hint: "Use scores[\"Alice\"] to retrieve Alice's score from the map.",
        },
        {
          id: "ck5-p4",
          type: "practice" as const,
          title: "Problem 4: Most Frequent Number",
          content: `Print the number that appears most often in the vector.\n\n**Output:** The most frequent number`,
          code: `#include <iostream>
#include <vector>
#include <map>
using namespace std;

int main() {
    vector<int> v = {1, 3, 2, 3, 1, 3, 2, 3, 1};
    map<int, int> freq;
    for (int i = 0; i < v.size(); i++) {
        freq[v[i]]++;
    }
    int max_count = 0;
    int result = 0;
    for (auto it = freq.begin(); it != freq.end(); it++) {
        if (it->second > max_count) {
            max_count = it->second;
            result = it->first;
        }
    }
    cout << result << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <map>
using namespace std;

int main() {
    vector<int> v = {1, 3, 2, 3, 1, 3, 2, 3, 1};
    map<int, int> freq;
    // Count frequencies with map, then find the key with the highest count

    return 0;
}`,
          expectedOutput: `3`,
          hint: "First count frequencies with freq[v[i]]++. Then iterate the map to find the key with the highest value.",
        },
        {
          id: "ck5-p5",
          type: "practice" as const,
          title: "Problem 5: Set Intersection",
          content: `Print the intersection of two sets in ascending order.\n\n**Output:** Intersection elements separated by spaces`,
          code: `#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> s1 = {1, 2, 3, 4, 5};
    set<int> s2 = {3, 4, 5, 6, 7};
    bool first = true;
    for (auto it = s1.begin(); it != s1.end(); it++) {
        if (s2.count(*it) > 0) {
            if (!first) cout << " ";
            cout << *it;
            first = false;
        }
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> s1 = {1, 2, 3, 4, 5};
    set<int> s2 = {3, 4, 5, 6, 7};
    // If an element in s1 is also in s2 (s2.count(x)>0), it's in the intersection

    return 0;
}`,
          expectedOutput: `3 4 5`,
          hint: "Iterate s1 and check if s2.count(*it) > 0. Since s1 is sorted, the output will be in ascending order.",
        },
        {
          id: "ck5-p6",
          type: "practice" as const,
          title: "Problem 6: Phone Book with map",
          content: `Create a phone book using a map and print Bob's number.\n\n**Output:** Bob's phone number`,
          code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, string> phonebook;
    phonebook["Alice"] = "010-1234";
    phonebook["Bob"] = "010-5678";
    phonebook["Charlie"] = "010-9012";
    cout << phonebook["Bob"] << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, string> phonebook;
    phonebook["Alice"] = "010-1234";
    phonebook["Bob"] = "010-5678";
    phonebook["Charlie"] = "010-9012";
    // Look up phonebook["Bob"]

    return 0;
}`,
          expectedOutput: `010-5678`,
          hint: "Use phonebook[\"Bob\"] to retrieve Bob's number from the map.",
        },
      ],
    },
  ],
}
