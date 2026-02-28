import { LessonData } from '../types';

export const lessonCpp15: LessonData = {
    id: "cpp-15",
    title: "pair & 정렬",
    description: "pair와 sort 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: pair ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "pair",
          desc: "두 값을 하나로 묶는 pair를 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "pair는 두 값을 하나로 묶는 자료형이에요! 🎒",
            "파이썬의 tuple(2개짜리)과 비슷해요!",
            ".first와 .second로 각각 꺼낼 수 있어요."
          ],
          code: '#include <iostream>\n#include <utility>\nusing namespace std;\n\nint main() {\n    pair<string, int> student("철수", 95);\n    cout << student.first << ": " << student.second << endl;\n    return 0;\n}',
          result: "철수: 95",
          note: "pair<타입1, 타입2> — 두 값의 타입을 지정해요!"
        }
      },

      // make_pair 설명
      {
        type: "explain",
        content: {
          lines: [
            "make_pair()로 더 간편하게 pair를 만들 수 있어요! ⚡",
            "타입을 자동으로 추론해줘요."
          ],
          code: 'pair<string, int> p1("영희", 88);    // 직접 생성\nauto p2 = make_pair("민수", 92);     // make_pair 사용',
          note: "make_pair는 타입을 안 써도 알아서 추론!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "pair의 .first와 .second를 써봐요!"
          ],
          code: 'pair<int, int> pos(3, 7);\ncout << pos.first << ", " << pos.second << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["3, 7", "(3, 7)", "3 7"],
            answer: 0,
            feedback: ".first는 3, .second는 7! 쉼표와 공백은 문자열로 넣어준 거예요."
          }
        }
      },

      // Lv.1: pair 타입 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "string과 int를 묶는 pair를 선언해요!",
          guide: "pair<타입1, 타입2> 형태!",
          template: 'pair<___, ___> student("철수", 95);',
          answer: "string",
          blanksAnswer: ["string", "int"],
          expect: 'pair<string, int> student("철수", 95);'
        }
      },

      // Lv.1: first/second 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "pair에서 첫 번째 값을 꺼내요!",
          guide: ".first 또는 .second를 써요!",
          template: "cout << student.___ << endl;",
          answer: "first",
          expect: "cout << student.first << endl;"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "pair<int, string> p(1, \"hello\"); 에서 p.second의 값은?",
          options: ["1", "\"hello\"", "에러", "(1, \"hello\")"],
          answer: 1,
          explanation: ".second는 두 번째 값이에요! pair<int, string>이니까 second는 string 타입으로 \"hello\"!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: 'pair<int, int> p;\np.first = 10;\np.third = 30;',
          options: [
            "pair는 first, second만 있어서 (third 없음!)",
            "pair에 값을 대입할 수 없어서",
            "pair를 초기화 안 해서"
          ],
          answer: 0,
          explanation: "pair는 딱 2개의 값만 저장해요! .first와 .second만 있고, .third는 없어요!"
        }
      },

      // Lv.2: make_pair 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "make_pair로 pair를 만들어요!",
          guide: "make_pair(값1, 값2) 형태!",
          template: 'auto p = ___("철수", 100);',
          answer: "make_pair",
          expect: 'auto p = make_pair("철수", 100);'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "pair 마스터!",
          emoji: "🎒"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "pair",
          learned: [
            "pair<타입1, 타입2> — 두 값을 하나로 묶기",
            ".first — 첫 번째 값, .second — 두 번째 값",
            "make_pair()로 간편하게 생성",
            "파이썬 tuple(a, b)와 비슷!"
          ],
          canDo: "pair로 두 값을 묶고, first/second로 접근할 수 있어요!",
          emoji: "🎒"
        }
      },

      // ==================== CHAPTER 2: sort 정렬 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "sort 정렬",
          desc: "sort()와 커스텀 정렬을 복습해요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: "pair에서 두 번째 값을 꺼내는 멤버 이름은?",
          template: "cout << p.___ << endl;",
          answer: "second",
          expect: "cout << p.second << endl;"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "sort()는 벡터나 배열을 정렬해요! 📊",
            "기본은 오름차순(작은 → 큰 순서)!",
            "파이썬의 .sort()와 비슷하지만, begin/end를 넘겨줘요."
          ],
          code: '#include <algorithm>\n#include <vector>\nusing namespace std;\n\nvector<int> v = {5, 2, 8, 1, 9};\nsort(v.begin(), v.end());\n// v = {1, 2, 5, 8, 9}',
          result: "1 2 5 8 9",
          note: "sort(시작, 끝) — <algorithm> 헤더 필요!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "내림차순 정렬은 greater<int>()를 세 번째 인자로!",
            "또는 rbegin/rend를 쓸 수도 있어요."
          ],
          code: 'vector<int> v = {5, 2, 8, 1, 9};\nsort(v.begin(), v.end(), greater<int>());\ncout << v[0] << " " << v[4] << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["1 9", "9 1", "5 2"],
            answer: 1,
            feedback: "greater<int>()는 내림차순! 가장 큰 9가 앞, 가장 작은 1이 뒤!"
          }
        }
      },

      // Lv.1: sort 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "벡터를 오름차순으로 정렬해요!",
          guide: "sort(시작, 끝) 형태!",
          template: "sort(v.___(), v.___());",
          answer: "begin",
          blanksAnswer: ["begin", "end"],
          expect: "sort(v.begin(), v.end());"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "sort()를 쓰려면 어떤 헤더가 필요할까요?",
          options: ["<iostream>", "<vector>", "<algorithm>", "<sort>"],
          answer: 2,
          explanation: "sort()는 <algorithm> 헤더에 들어있어요!"
        }
      },

      // 람다 정렬 설명
      {
        type: "explain",
        content: {
          lines: [
            "람다(lambda)로 정렬 기준을 직접 만들 수 있어요! 🎯",
            "파이썬의 key=lambda와 비슷해요!",
            "[](매개변수) { return 비교조건; }"
          ],
          code: 'vector<string> names = {"banana", "apple", "cherry"};\nsort(names.begin(), names.end(), [](string a, string b) {\n    return a.size() < b.size();  // 짧은 것부터\n});\n// names = {"apple", "banana", "cherry"}',
          result: "apple banana cherry",
          note: "람다 = 이름 없는 함수! []가 캡처, ()가 매개변수!"
        }
      },

      // Lv.2: 내림차순 정렬 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터를 내림차순으로 정렬해요!",
          guide: "세 번째 인자로 greater를 써요!",
          template: "sort(v.begin(), v.end(), ___<int>());",
          answer: "greater",
          expect: "sort(v.begin(), v.end(), greater<int>());"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: '#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {3, 1, 2};\n    sort(v.begin(), v.end());\n    return 0;\n}',
          options: [
            "#include <algorithm>이 빠져서",
            "vector가 빈칸이라서",
            "sort()의 인자가 틀려서"
          ],
          answer: 0,
          explanation: "sort()는 <algorithm> 헤더에 있어요! #include <algorithm>을 추가해야 해요."
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "sort 정렬 완벽!",
          emoji: "📊"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "sort 정렬",
          learned: [
            "sort(begin, end) — 오름차순 정렬",
            "sort(begin, end, greater<타입>()) — 내림차순",
            "람다로 커스텀 정렬 기준 만들기",
            "<algorithm> 헤더 필요!"
          ],
          canDo: "sort()로 벡터를 오름차순/내림차순/커스텀 정렬할 수 있어요!",
          emoji: "📊"
        }
      },

      // ==================== CHAPTER 3: 종합 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 학생 점수 정렬",
          desc: "pair 벡터로 학생 점수를 정렬해요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! sort 사용법 기억나요?",
          task: "벡터 v를 오름차순 정렬하는 코드를 써봐요!",
          template: null,
          answer: "sort(v.begin(), v.end());",
          alternateAnswers: [
            "sort(v.begin(), v.end())"
          ],
          expect: "sort(v.begin(), v.end());"
        }
      },

      // 종합 예측
      {
        type: "explain",
        content: {
          lines: [
            "pair<string, int> 벡터를 점수 기준으로 정렬해봐요!",
            "람다에서 .second를 비교하면 점수 기준 정렬!"
          ],
          code: 'vector<pair<string, int>> students = {\n    {"철수", 85}, {"영희", 92}, {"민수", 78}\n};\nsort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });\ncout << students[0].first << ": " << students[0].second << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["철수: 85", "영희: 92", "민수: 78"],
            answer: 1,
            feedback: "내림차순(>)이니까 가장 높은 점수 92점인 영희가 맨 앞!"
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
          target: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;",
          hint: "iostream, vector, algorithm 세 개!",
          done: [],
          answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;"
        }
      },

      // 프로젝트 Step 2
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "pair 벡터에 학생 3명을 넣어요!",
          target: 'vector<pair<string, int>> students = {\n    {"철수", 85}, {"영희", 92}, {"민수", 78}\n};',
          hint: 'vector<pair<string, int>> students = { {"이름", 점수}, ... };',
          done: ["#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {"],
          answer: 'vector<pair<string, int>> students = {\n    {"철수", 85}, {"영희", 92}, {"민수", 78}\n};'
        }
      },

      // 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "점수 내림차순으로 정렬하는 sort를 써봐요!",
          target: "sort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });",
          hint: "람다에서 a.second > b.second 로 내림차순!",
          done: ["#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {", 'vector<pair<string, int>> students = {\n    {"철수", 85}, {"영희", 92}, {"민수", 78}\n};'],
          answer: "sort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "학생 점수 정렬 프로젝트 완성!",
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
