import { LessonData } from '../types';

export const lessonCpp16: LessonData = {
    id: "cpp-16",
    title: "map & set",
    description: "map과 set 컨테이너 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: map ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "map",
          desc: "키-값 쌍을 저장하는 map을 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "map은 키-값 쌍을 저장하는 자료구조예요! 🗺️",
            "파이썬의 dict와 거의 똑같아요!",
            "키로 값을 빠르게 찾을 수 있어요."
          ],
          code: '#include <iostream>\n#include <map>\nusing namespace std;\n\nint main() {\n    map<string, int> scores;\n    scores["alice"] = 95;\n    scores["bob"] = 88;\n    cout << scores["alice"] << endl;\n    return 0;\n}',
          result: "95",
          note: "map<키타입, 값타입> — 파이썬 dict처럼 []로 접근!"
        }
      },

      // insert vs [] 설명
      {
        type: "explain",
        content: {
          lines: [
            "map에 값을 넣는 방법이 2가지 있어요!",
            "[] 연산자와 insert() 함수!"
          ],
          code: 'map<string, int> m;\nm["apple"] = 3;                            // method 1: []\nm.insert(make_pair("banana", 5));          // method 2: insert\nm.insert({"cherry", 7});                   // method 3: insert (concise)',
          note: "[]는 이미 있으면 덮어쓰고, insert는 이미 있으면 무시!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: 'map<string, int> m;\nm["apple"] = 3;\ncout << m["banana"] << endl;\ncout << m.size() << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["에러 발생", "0\n2", "0\n1"],
            answer: 1,
            feedback: "없는 키를 []로 접근하면 기본값(int는 0)이 자동 생성돼요! 그래서 size가 2!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["Error", "0\n2", "0\n1"],
              feedback: "Accessing a missing key with [] auto-creates it with the default value (0 for int)! So the size becomes 2!"
            }
          }
        }
      },

      // Lv.1: map 선언 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "string을 키, int를 값으로 하는 map을 선언해요!",
          guide: "map<키타입, 값타입> 형태!",
          template: "map<___, ___> scores;",
          answer: "string",
          blanksAnswer: ["string", "int"],
          expect: "map<string, int> scores;",
          en: {
            task: "Declare a map with string keys and int values!",
            guide: "Use the form: map<keyType, valueType>"
          }
        }
      },

      // Lv.1: map 값 넣기
      {
        type: "practice",
        content: {
          level: 1,
          task: "map에 \"철수\" 키로 95 값을 넣어요!",
          guide: 'map이름["키"] = 값; 형태!',
          template: 'scores[___] = ___;',
          answer: '"철수"',
          blanksAnswer: ['"철수"', '95'],
          expect: 'scores["철수"] = 95;',
          en: {
            task: 'Insert value 95 with key "Tom" into the map!',
            guide: 'Use the form: mapName["key"] = value;',
            answer: '"Tom"',
            blanksAnswer: ['"Tom"', '95'],
          }
        }
      },

      // find 설명
      {
        type: "explain",
        content: {
          lines: [
            "find()로 키가 있는지 확인할 수 있어요! 🔍",
            "못 찾으면 end()를 리턴해요."
          ],
          code: 'map<string, int> m = {{"apple", 3}, {"banana", 5}};\n\nif (m.find("apple") != m.end()) {\n    cout << "found! " << m["apple"] << endl;\n} else {\n    cout << "not found!" << endl;\n}',
          result: "found! 3",
          note: "find(키) != end() → 키가 있다! / find(키) == end() → 키가 없다!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "map에서 키가 존재하는지 확인하려면?",
          options: [
            "m.exists(\"key\")",
            "m.find(\"key\") != m.end()",
            "m.has(\"key\")",
            "m.contains(\"key\")"
          ],
          answer: 1,
          explanation: "find()가 end()가 아니면 키가 있다는 뜻이에요! (C++20부터는 contains()도 사용 가능!)",
          en: {
            question: "How do you check if a key exists in a map?",
            options: [
              "m.exists(\"key\")",
              "m.find(\"key\") != m.end()",
              "m.has(\"key\")",
              "m.contains(\"key\")"
            ],
            explanation: "If find() doesn't return end(), the key exists! (C++20 also supports contains()!)"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "프로그래머는 \"hello 키가 없으면 에러를 내고 싶었어요\". 그런데 위 코드는 의도대로 동작할까요?",
          code: 'map<string, int> m;\ncout << m["hello"] << endl;  // 없는 키니까 에러가 날까?',
          options: [
            "에러가 나지 않고 0이 출력된다 (키가 자동 생성됨!)",
            "컴파일 에러가 난다",
            "런타임 에러가 난다"
          ],
          answer: 0,
          explanation: "map에서 없는 키를 []로 접근하면 기본값(0)이 자동으로 생성돼요! 의도치 않은 키가 추가될 수 있어요.",
          en: {
            question: "The programmer wanted \"hello\" to cause an error if it's missing. Does the code above behave as intended?",
            code: 'map<string, int> m;\ncout << m["hello"] << endl;  // does a missing key error out?',
            options: [
              "No error — 0 is printed (the key is automatically created!)",
              "Compile error",
              "Runtime error"
            ],
            explanation: "Accessing a missing key with [] in a map auto-creates it with a default value (0)! An unintended key may be added."
          }
        }
      },

      // Lv.2: find 사용
      {
        type: "practice",
        content: {
          level: 2,
          task: "map에서 \"apple\" 키를 찾아요!",
          guide: "find(키) != end() 형태!",
          template: 'if (m.___("apple") != m.___()) {',
          answer: "find",
          blanksAnswer: ["find", "end"],
          expect: 'if (m.find("apple") != m.end()) {',
          en: {
            task: 'Find the key "apple" in the map!',
            guide: "Use the form: find(key) != end()"
          }
        }
      },

      // 🆕 map vs vector<pair> 결정 quiz
      {
        type: "quiz",
        content: {
          question: "학생들 점수표를 점수 내림차순으로 정렬해서 출력하려고 해요. 어떤 자료구조가 가장 적합할까요?",
          options: [
            "map<string, int>",
            "vector<pair<string, int>> + sort",
            "set<pair<string, int>>",
            "unordered_map<string, int>"
          ],
          answer: 1,
          explanation: "map은 키 (이름) 기준 자동 정렬만 됨 — 값 (점수) 기준으로 못 바꿔요. vector<pair> 로 묶고 sort 의 lambda 로 .second 기준 정렬해야 점수 순으로 나와요. 결정 규칙: \"이름 빠른 검색\" → map, \"점수 순 정렬\" → vector<pair>.",
          en: {
            question: "You want to sort student records by score (descending) and print them. Which container fits best?",
            options: [
              "map<string, int>",
              "vector<pair<string, int>> + sort",
              "set<pair<string, int>>",
              "unordered_map<string, int>"
            ],
            explanation: "map only auto-sorts by key (name) — can't reorder by value (score). Use vector<pair> and sort with a lambda comparing .second. Rule: \"fast lookup by name\" → map, \"sort by score\" → vector<pair>."
          }
        }
      },

      // 🆕 count vs find 결정 quiz
      {
        type: "quiz",
        content: {
          question: "map 에서 \"이 키가 있는지 **있다/없다** 만\" 알면 돼요. 가장 깔끔한 방법은?",
          options: [
            "m.count(key) > 0",
            "m.find(key) != m.end()",
            "m[key] != 0",
            "m.size() > 0"
          ],
          answer: 0,
          explanation: "count() 는 0 또는 1 을 돌려줘서 \"있다/없다\" 질문에 가장 직관적이에요. find/end 비교는 iterator 다뤄야 해서 약간 복잡. m[key] != 0 은 위험 — 없는 키도 자동 생성되고 0 인 값이랑 구분 안 돼요.",
          en: {
            question: "You only need to know whether a key exists or not in a map. Which is cleanest?",
            options: [
              "m.count(key) > 0",
              "m.find(key) != m.end()",
              "m[key] != 0",
              "m.size() > 0"
            ],
            explanation: "count() returns 0 or 1, the most direct yes/no answer. find/end requires handling iterators. m[key] != 0 is unsafe — auto-creates missing keys and can't distinguish from value 0."
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "map 마스터!",
          emoji: "🗺️"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "map",
          learned: [
            "map<키, 값> — 키-값 쌍 저장 (파이썬 dict)",
            "m[\"key\"] = value — 값 넣기/접근",
            "m.find(key) != m.end() — 키 존재 확인",
            "없는 키를 []로 접근하면 기본값이 자동 생성!",
            "insert()는 이미 있는 키면 무시"
          ],
          canDo: "map으로 키-값 쌍을 저장하고 검색할 수 있어요!",
          emoji: "🗺️"
        }
      },

      // ==================== CHAPTER 2: set ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "set",
          desc: "중복 없는 집합 set을 복습해요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: "map에서 키를 찾는 함수 이름은?",
          template: 'm.___("apple")',
          answer: "find",
          expect: 'm.find("apple")',
          en: {
            message: "Quick! Remember what we learned earlier?",
            task: "What is the function name for finding a key in a map?"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "set은 중복 없이 값을 저장해요! 🎯",
            "파이썬의 set과 똑같은 개념!",
            "자동으로 정렬돼요 (오름차순)."
          ],
          code: '#include <set>\nusing namespace std;\n\nset<int> s;\ns.insert(3);\ns.insert(1);\ns.insert(3);  // duplicate! ignored\ns.insert(2);\n// s = {1, 2, 3} — duplicates removed + auto sorted!',
          result: "1 2 3",
          note: "set<타입> — 중복 없는 정렬된 집합!"
        }
      },

      // count와 erase 설명
      {
        type: "explain",
        content: {
          lines: [
            "count()로 존재 여부, erase()로 삭제!",
            "set에서 count()는 0 또는 1만 리턴해요."
          ],
          code: 'set<int> s = {1, 2, 3, 4, 5};\ncout << s.count(3) << endl;  // 1 (found)\ncout << s.count(9) << endl;  // 0 (not found)\ns.erase(3);\ncout << s.count(3) << endl;  // 0 (deleted)',
          result: "1\n0\n0",
          note: "count(값) → 있으면 1, 없으면 0"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: 'set<int> s;\ns.insert(5);\ns.insert(3);\ns.insert(5);\ns.insert(1);\ncout << s.size() << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["4", "3", "2"],
            answer: 1,
            feedback: "중복된 5는 무시! {1, 3, 5} 3개만 들어가요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["4", "3", "2"],
              feedback: "The duplicate 5 is ignored! Only {1, 3, 5} — 3 elements!"
            }
          }
        }
      },

      // Lv.1: set insert 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "set에 값 10을 넣어요!",
          guide: "insert(값) 형태!",
          template: "s.___(10);",
          answer: "insert",
          expect: "s.insert(10);",
          en: {
            task: "Insert the value 10 into the set!",
            guide: "Use the form: insert(value)"
          }
        }
      },

      // unordered 설명
      {
        type: "explain",
        content: {
          lines: [
            "unordered_map과 unordered_set도 있어요! ⚡",
            "정렬이 필요 없으면 unordered가 더 빨라요!",
            "해시 테이블 기반 — 평균 O(1)!"
          ],
          code: '#include <unordered_map>\n#include <unordered_set>\nusing namespace std;\n\nunordered_map<string, int> um;  // not sorted, faster!\nunordered_set<int> us;          // not sorted, faster!',
          note: "정렬 필요 → map/set, 속도 중요 → unordered!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "set과 unordered_set의 차이는?",
          options: [
            "set은 중복 허용, unordered_set은 불허",
            "set은 자동 정렬, unordered_set은 정렬 안 됨",
            "set은 느리고, unordered_set도 느리다",
            "차이 없다"
          ],
          answer: 1,
          explanation: "set은 자동 정렬(레드블랙트리), unordered_set은 정렬 없음(해시테이블)! 정렬 필요 없으면 unordered가 더 빨라요.",
          en: {
            question: "What is the difference between set and unordered_set?",
            options: [
              "set allows duplicates, unordered_set does not",
              "set is automatically sorted, unordered_set is not",
              "Both set and unordered_set are slow",
              "No difference"
            ],
            explanation: "set is automatically sorted (red-black tree), unordered_set is not (hash table)! If you don't need sorting, unordered is faster."
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는 뭘까요?",
          code: '#include <set>\nusing namespace std;\n\nset<int> s = {3, 1, 4, 1, 5};\ncout << s.size() << endl;\n// expected: 5 elements',
          options: [
            "set은 중복을 무시하니까 size가 4",
            "초기화 문법이 틀렸다",
            "set은 정수를 못 넣는다"
          ],
          answer: 0,
          explanation: "set은 중복을 허용하지 않아요! {3, 1, 4, 5} 이렇게 4개만 들어가요. (1이 중복!)",
          en: {
            question: "What is the problem with this code?",
            options: [
              "set ignores duplicates so size is 4, not 5",
              "The initialization syntax is wrong",
              "set cannot hold integers"
            ],
            explanation: "set does not allow duplicates! Only {3, 1, 4, 5} — 4 elements go in. (1 is duplicated!)"
          }
        }
      },

      // Lv.2: count 사용
      {
        type: "practice",
        content: {
          level: 2,
          task: "set에서 값 5가 있는지 확인해요!",
          guide: "count(값)는 있으면 1, 없으면 0!",
          template: "if (s.___(5)) {\n    cout << \"있다!\" << endl;\n}",
          answer: "count",
          expect: "if (s.count(5)) {\n    cout << \"있다!\" << endl;\n}",
          en: {
            task: "Check if the value 5 exists in the set!",
            guide: "count(value) returns 1 if found, 0 if not!",
            template: "if (s.___(5)) {\n    cout << \"found!\" << endl;\n}",
            expect: "if (s.count(5)) {\n    cout << \"found!\" << endl;\n}",
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "set 마스터!",
          emoji: "🎯"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "set",
          learned: [
            "set<타입> — 중복 없는 정렬된 집합",
            "insert(값) — 값 추가 (중복이면 무시)",
            "count(값) — 있으면 1, 없으면 0",
            "erase(값) — 값 삭제",
            "unordered_map/set — 정렬 없이 더 빠름!"
          ],
          canDo: "set으로 중복 없는 집합을 관리하고, unordered를 선택할 수 있어요!",
          emoji: "🎯"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 단어 빈도수 카운터",
          desc: "map으로 단어 빈도수를 세봐요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! set에서 값이 있는지 확인하는 법?",
          task: "set에서 count()로 3이 있는지 확인해요!",
          template: "s.___(3)",
          answer: "count",
          expect: "s.count(3)",
          en: {
            message: "Quick! How do you check if a value exists in a set?",
            task: "Use count() to check if 3 exists in the set!"
          }
        }
      },

      // 종합 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: 'map<string, int> freq;\nvector<string> words = {"apple", "banana", "apple", "cherry", "apple"};\nfor (auto w : words) {\n    freq[w]++;\n}\ncout << "apple: " << freq["apple"] << endl;',
          predict: {
            question: "apple의 빈도수는?",
            options: ["1", "2", "3"],
            answer: 2,
            feedback: "apple이 3번 나오니까 freq[\"apple\"]은 3!"
          },
          en: {
            predict: {
              question: "What is the frequency of \"apple\"?",
              options: ["1", "2", "3"],
              feedback: "\"apple\" appears 3 times, so freq[\"apple\"] is 3!"
            }
          }
        }
      },

      // 프로젝트 Step 1
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "헤더와 using namespace std를 써봐요!",
          target: "#include <iostream>\n#include <map>\n#include <vector>\nusing namespace std;",
          hint: "iostream, map, vector 세 개!",
          done: [],
          answer: "#include <iostream>\n#include <map>\n#include <vector>\nusing namespace std;"
        }
      },

      // 프로젝트 Step 2
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "map으로 빈도수를 세는 for 루프를 써봐요!",
          target: 'for (auto w : words) {\n    freq[w]++;\n}',
          hint: "freq[w]++; 로 카운트!",
          done: ['#include <iostream>\n#include <map>\n#include <vector>\nusing namespace std;\n\nint main() {\n    map<string, int> freq;\n    vector<string> words = {"apple", "banana", "apple"};'],
          answer: 'for (auto w : words) {\n    freq[w]++;\n}'
        }
      },

      // 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "모든 단어와 빈도수를 출력하는 for 루프를 써봐요!",
          target: 'for (auto p : freq) {\n    cout << p.first << ": " << p.second << endl;\n}',
          hint: "p.first가 키(단어), p.second가 값(빈도수)!",
          done: ['#include <iostream>\n#include <map>\n#include <vector>\nusing namespace std;\n\nint main() {\n    map<string, int> freq;\n    vector<string> words = {"apple", "banana", "apple"};', 'for (auto w : words) {\n    freq[w]++;\n}'],
          answer: 'for (auto p : freq) {\n    cout << p.first << ": " << p.second << endl;\n}'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "단어 빈도수 카운터 완성!",
          emoji: "🏆"
        }
      },

      // ==================== CHAPTER 4: map & set 손에 익히기 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "map & set 손에 익히기",
          desc: "빈도수 세기, 중복 제거 — 실제 문제 풀 때 쓰는 패턴!"
        }
      },

      // Drill 1: map 기본 (선언 + 삽입 + 접근)
      {
        type: "practice",
        content: {
          level: 1,
          task: "과일 이름 → 가격(정수) 을 저장하는 map 을 만들고, 두 과일을 넣은 뒤 사과의 가격을 출력해요.",
          guide: "꺾쇠 < > 안에 키 타입과 값 타입을 순서대로! 가격이 정수면 값 타입은 뭘까요?",
          template: "map<string, ___> m;\nm[\"apple\"] = 3;\nm[\"banana\"] = 5;\ncout << m[___] << endl;",
          blanksAnswer: ["int", "\"apple\""],
          answer: "map<string, int> m;\nm[\"apple\"] = 3;\nm[\"banana\"] = 5;\ncout << m[\"apple\"] << endl;",
          expect: "3",
          en: {
            task: "Build a map of fruit name → price (integer). Insert two fruits, then print the apple's price.",
            guide: "Inside <  >, put the key type then the value type. If prices are integers, what type goes there?"
          }
        }
      },

      // Drill 2: 빈도수 카운트 (핵심 패턴!)
      {
        type: "practice",
        content: {
          level: 2,
          task: "단어 배열에서 각 단어의 등장 횟수를 map으로 세어 \"apple\"의 빈도를 출력해요",
          guide: "range-for로 각 단어를 순회하면서 map에서 그 단어의 카운트를 1씩 늘려!",
          template: "vector<string> words = {\"apple\",\"banana\",\"apple\",\"cherry\",\"apple\"};\nmap<string, int> freq;\nfor (___ w : words) {\n    ___[w]++;\n}\ncout << freq[\"apple\"] << endl;",
          blanksAnswer: ["auto", "freq"],
          answer: "vector<string> words = {\"apple\",\"banana\",\"apple\",\"cherry\",\"apple\"};\nmap<string, int> freq;\nfor (auto w : words) {\n    freq[w]++;\n}\ncout << freq[\"apple\"] << endl;",
          // 빈칸은 inputs.join(", ") 로 비교됨 — auto& / const auto& 도 허용 (더 좋은 답)
          alternateAnswers: ["auto&, freq", "const auto&, freq"],
          expect: "3",
          en: {
            task: "Count word frequencies using a map and print how many times \"apple\" appears",
            guide: "Use range-for to loop through each word and increment its count in the map by 1!"
          }
        }
      },

      // 🆕 Drill 2.5: map 순회 (구조적 바인딩)
      {
        type: "practice",
        content: {
          level: 2,
          task: "점수 map 을 순회하며 \"이름: 점수\" 형식으로 한 줄씩 출력 — 구조적 바인딩 사용",
          guide: "for (auto& [key, value] : m) 형태. map 은 키 알파벳 순으로 자동 정렬된 채 순회됨.",
          template: "map<string, int> scores = {{\"Bob\",87}, {\"Alice\",95}, {\"Carol\",92}};\nfor (auto& [___, ___] : scores) {\n    cout << name << \": \" << score << endl;\n}",
          blanksAnswer: ["name", "score"],
          answer: "map<string, int> scores = {{\"Bob\",87}, {\"Alice\",95}, {\"Carol\",92}};\nfor (auto& [name, score] : scores) {\n    cout << name << \": \" << score << endl;\n}",
          expect: "Alice: 95\nBob: 87\nCarol: 92",
          en: {
            task: "Iterate the score map and print 'name: score' per line — use structured bindings",
            guide: "for (auto& [key, value] : m) form. map iterates in alphabetical key order automatically."
          }
        }
      },

      // Drill 3: set으로 중복 제거
      {
        type: "practice",
        content: {
          level: 2,
          task: "중복이 있는 벡터에서 set으로 고유한 값의 개수를 구해 출력해요",
          guide: "set 생성자에 벡터의 시작과 끝 반복자를 넣으면 중복 없이 복사돼!",
          template: "vector<int> v = {1,2,2,3,3,3,4};\nset<int> s(v.___, v.___);\ncout << s.size() << endl;",
          blanksAnswer: ["begin()", "end()"],
          answer: "vector<int> v = {1,2,2,3,3,3,4};\nset<int> s(v.begin(), v.end());\ncout << s.size() << endl;",
          expect: "4",
          en: {
            task: "Use a set to count unique values in a vector with duplicates",
            guide: "Pass the start and end iterators of the vector to the set constructor to copy without duplicates!"
          }
        }
      },

      // Drill 4: 처음부터 — 빈도수 + 최댓값
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 정수 5 개를 입력받아 **가장 많이 등장한 숫자** 와 **그 횟수** 를 한 줄에 (공백 한 칸으로 구분해) 출력해요.\n\n💡 풀이 흐름: map 으로 빈도 계산 → map 순회하며 최대 빈도 찾기",
          guide: "map<int, int> freq; 로 각 숫자의 등장 횟수를 세고, 두 번째 for 루프에서 p.second(횟수)가 최대인 항목을 추적해!",
          hint: "1) for 5번 cin >> x; freq[x]++;\n2) maxCnt = 0, maxVal = 0;\n3) for (auto p : freq) if (p.second > maxCnt) { maxCnt = p.second; maxVal = p.first; }\n4) cout << maxVal << \" \" << maxCnt;",
          template: null,
          stdin: "3 1 3 2 3\n",
          sampleInput: "3 1 3 2 3",
          answer: "map<int, int> freq;\nfor (int i = 0; i < 5; i++) {\n    int x;\n    cin >> x;\n    freq[x]++;\n}\nint maxVal = 0, maxCnt = 0;\nfor (auto p : freq) {\n    if (p.second > maxCnt) {\n        maxCnt = p.second;\n        maxVal = p.first;\n    }\n}\ncout << maxVal << \" \" << maxCnt << endl;",
          alternateAnswers: [
            "map<int,int> freq;\nfor(int i=0;i<5;i++){int x;cin>>x;freq[x]++;}\nint maxVal=0,maxCnt=0;\nfor(auto p:freq)if(p.second>maxCnt){maxCnt=p.second;maxVal=p.first;}\ncout<<maxVal<<\" \"<<maxCnt<<endl;"
          ],
          expect: "3 3",
          en: {
            task: "Write from scratch! Read 5 integers and print the **most frequent number** and **its count** on one line, separated by a single space.\n\n💡 Plan: count frequencies with map → loop the map to find the max count.",
            guide: "Use map<int, int> freq; to count each number's occurrences, then loop through all map entries to track the entry where p.second (count) is the largest!",
            hint: "1) for 5 times: cin >> x; freq[x]++;\n2) maxCnt = 0, maxVal = 0;\n3) for (auto p : freq) if (p.second > maxCnt) { maxCnt = p.second; maxVal = p.first; }\n4) cout << maxVal << \" \" << maxCnt;"
          }
        }
      },

      // Drill 5: 처음부터 — set으로 중복 없는 입력
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 단어 5 개를 입력받아 **중복을 제거** 한 뒤 **알파벳 순서대로 한 줄에 하나씩** 출력해요.\n\n💡 set 에 넣기만 하면 중복 제거 + 자동 정렬이 한 방에!",
          guide: "set에 insert()로 단어를 넣으면 중복이 자동 제거되고, range-for 로 순회하면 알파벳 순서로 나와! 한 줄에 하나씩이니까 endl (또는 \"\\n\") 로 줄바꿈.",
          hint: "1) for 5번: cin >> w; s.insert(w);\n2) for (auto w : s) cout << w << endl;  ← endl 빠뜨리면 한 줄로 붙어 나와요!",
          template: null,
          stdin: "cherry apple banana apple cherry\n",
          sampleInput: "cherry apple banana apple cherry",
          answer: "set<string> s;\nfor (int i = 0; i < 5; i++) {\n    string w;\n    cin >> w;\n    s.insert(w);\n}\nfor (auto w : s) {\n    cout << w << endl;\n}",
          alternateAnswers: [
            "set<string> s;\nfor(int i=0;i<5;i++){string w;cin>>w;s.insert(w);}\nfor(auto w:s)cout<<w<<endl;"
          ],
          expect: "apple\nbanana\ncherry",
          en: {
            task: "Write from scratch! Read 5 words, **remove duplicates**, then print **one per line in alphabetical order**.\n\n💡 Inserting into a set both dedups and auto-sorts in one shot!",
            guide: "Inserting words into a set automatically removes duplicates, and iterating with range-for gives them in alphabetical order! Use endl (or \"\\n\") to put each word on its own line.",
            hint: "1) for 5 times: cin >> w; s.insert(w);\n2) for (auto w : s) cout << w << endl;  ← without endl, the words run together on one line!"
          }
        }
      },

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
