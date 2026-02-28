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
          code: '#include <iostream>\n#include <map>\nusing namespace std;\n\nint main() {\n    map<string, int> scores;\n    scores["철수"] = 95;\n    scores["영희"] = 88;\n    cout << scores["철수"] << endl;\n    return 0;\n}',
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
          code: 'map<string, int> m;\nm["apple"] = 3;                            // 방법 1: []\nm.insert(make_pair("banana", 5));          // 방법 2: insert\nm.insert({"cherry", 7});                   // 방법 3: insert (간단)',
          note: "[]는 이미 있으면 덮어쓰고, insert는 이미 있으면 무시!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "map에서 없는 키를 []로 접근하면 어떻게 될까요?"
          ],
          code: 'map<string, int> m;\nm["apple"] = 3;\ncout << m["banana"] << endl;\ncout << m.size() << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["에러 발생", "0\\n2", "0\\n1"],
            answer: 1,
            feedback: "없는 키를 []로 접근하면 기본값(int는 0)이 자동 생성돼요! 그래서 size가 2!"
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
          expect: "map<string, int> scores;"
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
          expect: 'scores["철수"] = 95;'
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
          code: 'map<string, int> m = {{"apple", 3}, {"banana", 5}};\n\nif (m.find("apple") != m.end()) {\n    cout << "찾았다! " << m["apple"] << endl;\n} else {\n    cout << "없다!" << endl;\n}',
          result: "찾았다! 3",
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
          explanation: "find()가 end()가 아니면 키가 있다는 뜻이에요! (C++20부터는 contains()도 사용 가능!)"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는 뭘까요?",
          code: 'map<string, int> m;\ncout << m["hello"] << endl;\n// 의도: hello 키가 없으면 에러 발생',
          options: [
            "에러가 나지 않고 0이 출력된다 (키가 자동 생성됨!)",
            "컴파일 에러가 난다",
            "런타임 에러가 난다"
          ],
          answer: 0,
          explanation: "map에서 없는 키를 []로 접근하면 기본값(0)이 자동으로 생성돼요! 의도치 않은 키가 추가될 수 있어요."
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
          expect: 'if (m.find("apple") != m.end()) {'
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
          expect: 'm.find("apple")'
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
          code: '#include <set>\nusing namespace std;\n\nset<int> s;\ns.insert(3);\ns.insert(1);\ns.insert(3);  // 중복! 무시됨\ns.insert(2);\n// s = {1, 2, 3} — 중복 제거 + 자동 정렬!',
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
          code: 'set<int> s = {1, 2, 3, 4, 5};\ncout << s.count(3) << endl;  // 1 (있음)\ncout << s.count(9) << endl;  // 0 (없음)\ns.erase(3);\ncout << s.count(3) << endl;  // 0 (삭제됨)',
          result: "1\n0\n0",
          note: "count(값) → 있으면 1, 없으면 0"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "set에 중복 값을 넣으면 어떻게 될까요?"
          ],
          code: 'set<int> s;\ns.insert(5);\ns.insert(3);\ns.insert(5);\ns.insert(1);\ncout << s.size() << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["4", "3", "2"],
            answer: 1,
            feedback: "중복된 5는 무시! {1, 3, 5} 3개만 들어가요!"
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
          expect: "s.insert(10);"
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
          code: '#include <unordered_map>\n#include <unordered_set>\nusing namespace std;\n\nunordered_map<string, int> um;  // 정렬 안 됨, 더 빠름!\nunordered_set<int> us;          // 정렬 안 됨, 더 빠름!',
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
          explanation: "set은 자동 정렬(레드블랙트리), unordered_set은 정렬 없음(해시테이블)! 정렬 필요 없으면 unordered가 더 빨라요."
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는 뭘까요?",
          code: '#include <set>\nusing namespace std;\n\nset<int> s = {3, 1, 4, 1, 5};\ncout << s.size() << endl;\n// 기대: 5개',
          options: [
            "set은 중복을 무시하니까 size가 4",
            "초기화 문법이 틀렸다",
            "set은 정수를 못 넣는다"
          ],
          answer: 0,
          explanation: "set은 중복을 허용하지 않아요! {3, 1, 4, 5} 이렇게 4개만 들어가요. (1이 중복!)"
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
          expect: "if (s.count(5)) {\n    cout << \"있다!\" << endl;\n}"
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
          expect: "s.count(3)"
        }
      },

      // 종합 예측
      {
        type: "explain",
        content: {
          lines: [
            "map으로 단어 빈도수를 셀 수 있어요!",
            "[]로 접근하면 없는 키는 0으로 자동 생성되니까 바로 ++!"
          ],
          code: 'map<string, int> freq;\nvector<string> words = {"apple", "banana", "apple", "cherry", "apple"};\nfor (auto w : words) {\n    freq[w]++;\n}\ncout << "apple: " << freq["apple"] << endl;',
          predict: {
            question: "apple의 빈도수는?",
            options: ["1", "2", "3"],
            answer: 2,
            feedback: "apple이 3번 나오니까 freq[\"apple\"]은 3!"
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

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
