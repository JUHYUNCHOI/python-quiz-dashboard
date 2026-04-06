import type { LessonData } from "../types"

export const cppLessonCk5Data: LessonData = {
  id: "cpp-ck5",
  title: "🗺️ map/set 연습 문제",
  emoji: "🗺️",
  description: "map과 set으로 실제 문제를 풀어봅니다.",
  chapters: [
    {
      id: "ck5-main",
      title: "map/set 코딩 연습",
      emoji: "💪",
      steps: [
        {
          id: "ck5-intro",
          type: "explain" as const,
          title: "map/set 연습 문제",
          content: `map과 set의 핵심 활용 패턴을 연습합니다.\n\n총 6문제입니다. 이 문제들을 풀기 전에 걱정하지 마세요. 막히면 힌트를 활용하세요!`,
        },
        {
          id: "ck5-p1",
          type: "practice" as const,
          title: "문제 1: 단어 빈도수",
          content: `단어 목록에서 각 단어가 몇 번 나오는지 출력하세요.\n\n**출력:** 알파벳 순서로 "단어: 횟수" 형식으로 출력`,
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
    // wordCount[word]++ 로 빈도수를 세세요

    for (auto it = wordCount.begin(); it != wordCount.end(); it++) {
        cout << it->first << ": " << it->second << endl;
    }
    return 0;
}`,
          expectedOutput: `apple: 3
banana: 2
cherry: 1`,
          hint: "for문으로 words를 순회하며 wordCount[words[i]]++ 로 빈도수를 셉니다. map은 자동으로 알파벳순 정렬됩니다.",
        },
        {
          id: "ck5-p2",
          type: "practice" as const,
          title: "문제 2: 중복 제거",
          content: `벡터에서 중복을 제거하고 오름차순으로 출력하세요.\n\n**출력:** 중복 제거된 수를 공백으로 구분하여 출력`,
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
    // set<int> s(v.begin(), v.end()) 으로 한번에 중복 제거

    return 0;
}`,
          expectedOutput: `1 2 3 4 5 6 9`,
          hint: "set<int> s(v.begin(), v.end()) 으로 벡터에서 바로 set을 만들면 중복이 제거됩니다. set은 자동으로 정렬됩니다.",
        },
        {
          id: "ck5-p3",
          type: "practice" as const,
          title: "문제 3: map으로 성적 관리",
          content: `map으로 학생 성적을 저장하고 Alice의 점수를 출력하세요.\n\n**출력:** Alice의 점수`,
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
    // scores["Alice"] 로 접근하세요

    return 0;
}`,
          expectedOutput: `85`,
          hint: "scores[\"Alice\"] 로 map에서 Alice의 점수를 가져올 수 있습니다.",
        },
        {
          id: "ck5-p4",
          type: "practice" as const,
          title: "문제 4: 가장 많이 나온 수",
          content: `벡터에서 가장 많이 나온 수를 출력하세요.\n\n**출력:** 빈도수가 가장 높은 수`,
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
    // map으로 빈도수를 세고, 가장 큰 빈도수의 키를 찾으세요

    return 0;
}`,
          expectedOutput: `3`,
          hint: "먼저 for문으로 freq[v[i]]++로 빈도수를 세고, 다시 map을 순회하며 가장 빈도수가 높은 키를 찾으세요.",
        },
        {
          id: "ck5-p5",
          type: "practice" as const,
          title: "문제 5: 두 집합의 교집합",
          content: `두 집합의 교집합을 오름차순으로 출력하세요.\n\n**출력:** 교집합 원소를 공백으로 구분하여 출력`,
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
    // s1의 원소가 s2에도 있으면(s2.count(x)>0) 교집합

    return 0;
}`,
          expectedOutput: `3 4 5`,
          hint: "s1을 순회하며 s2.count(*it) > 0 이면 교집합입니다. set은 자동 정렬되므로 s1을 순회하면 오름차순으로 출력됩니다.",
        },
        {
          id: "ck5-p6",
          type: "practice" as const,
          title: "문제 6: map으로 전화번호부",
          content: `map으로 전화번호부를 만들고 Bob의 번호를 출력하세요.\n\n**출력:** Bob의 전화번호`,
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
    // phonebook["Bob"] 로 검색합니다

    return 0;
}`,
          expectedOutput: `010-5678`,
          hint: "phonebook[\"Bob\"] 로 map에서 Bob의 전화번호를 가져올 수 있습니다.",
        },
      ],
    },
  ],
}
