import { LessonData } from '../types';

export const lessonCpp15: LessonData = {
    id: "cpp-15",
    title: "pair & tuple",
    description: "pair와 tuple 복습!",
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
          lines: [],
          code: 'pair<string, int> p1 = {"영희", 88};     // 중괄호 초기화\nauto p2 = make_pair("민수", 92);          // make_pair 사용',
          note: "make_pair는 타입을 안 써도 알아서 추론!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'pair<int, int> pos(3, 7);\ncout << pos.first << ", " << pos.second << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["3, 7", "(3, 7)", "3 7"],
            answer: 0,
            feedback: ".first는 3, .second는 7! 쉼표와 공백은 문자열로 넣어준 거예요."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["3, 7", "(3, 7)", "3 7"],
              feedback: ".first is 3 and .second is 7! The comma and space are part of the string literal."
            }
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "string과 int를 묶는 pair를 선언해요!",
          guide: "pair<타입1, 타입2> 형태!",
          template: 'pair<___, ___> student("철수", 95);',
          answer: "string",
          blanksAnswer: ["string", "int"],
          expect: 'pair<string, int> student("철수", 95);',
          en: {
            task: "Declare a pair that combines string and int!",
            guide: "Use the form: pair<type1, type2>"
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "pair에서 첫 번째 값을 꺼내요!",
          guide: ".first 또는 .second를 써요!",
          template: "cout << student.___ << endl;",
          answer: "first",
          expect: "cout << student.first << endl;",
          en: {
            task: "Get the first value from the pair!",
            guide: "Use .first or .second!"
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "pair<int, string> p(1, \"hello\"); 에서 p.second의 값은?",
          options: ["1", "\"hello\"", "에러", "(1, \"hello\")"],
          answer: 1,
          explanation: ".second는 두 번째 값이에요! pair<int, string>이니까 second는 string 타입으로 \"hello\"!",
          en: {
            question: "What is the value of p.second in pair<int, string> p(1, \"hello\");?",
            options: ["1", "\"hello\"", "error", "(1, \"hello\")"],
            explanation: ".second is the second value! Since it's pair<int, string>, second is of type string — \"hello\"!"
          }
        }
      },

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
          explanation: "pair는 딱 2개의 값만 저장해요! .first와 .second만 있고, .third는 없어요!",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "pair only has first and second — there is no third!",
              "Cannot assign values to a pair",
              "pair is not initialized"
            ],
            explanation: "pair stores exactly 2 values! Only .first and .second exist — .third does not!"
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "make_pair로 pair를 만들어요!",
          guide: "make_pair(값1, 값2) 형태!",
          template: 'auto p = ___("철수", 100);',
          answer: "make_pair",
          expect: 'auto p = make_pair("철수", 100);',
          en: {
            task: "Create a pair using make_pair!",
            guide: "Use the form: make_pair(value1, value2)"
          }
        }
      },

      {
        type: "reward",
        content: {
          message: "pair 마스터!",
          emoji: "🎒"
        }
      },

      {
        type: "summary",
        content: {
          num: 1,
          title: "pair",
          learned: [
            "pair<타입1, 타입2> — 두 값을 하나로 묶기",
            ".first — 첫 번째 값, .second — 두 번째 값",
            "make_pair() 또는 {값1, 값2}로 생성",
            "파이썬 tuple(a, b)와 비슷!"
          ],
          canDo: "pair로 두 값을 묶고, first/second로 접근할 수 있어요!",
          emoji: "🎒"
        }
      },

      // ==================== CHAPTER 2: pair 비교 & 벡터 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "pair 비교 & vector<pair>",
          desc: "pair끼리 비교하고, 벡터에 저장해봐요!"
        }
      },

      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: "pair에서 두 번째 값을 꺼내는 멤버 이름은?",
          template: "cout << p.___ << endl;",
          answer: "second",
          expect: "cout << p.second << endl;",
          en: {
            message: "Quick! Remember what we learned earlier?",
            task: "What is the member name to get the second value from a pair?"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<pair<int,string>> v = {\n    {3, "C"}, {1, "A"}, {2, "B"}, {1, "D"}\n};\nsort(v.begin(), v.end());\n// 결과: {1,"A"}, {1,"D"}, {2,"B"}, {3,"C"}',
          note: "first가 같으면 second 기준으로 정렬!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'pair<int,int> a = {1, 10};\npair<int,int> b = {1, 5};\nif (a > b) cout << "A";\nelse cout << "B";',
          predict: {
            question: "출력 결과는?",
            options: ["A", "B", "에러"],
            answer: 0,
            feedback: "first는 둘 다 1로 같아요. second를 비교하면 10 > 5이므로 a > b → A!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["A", "B", "Error"],
              feedback: "Both first values are 1 (equal). Comparing second: 10 > 5, so a > b → A!"
            }
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "vector<pair<string, int>>에 학생 2명을 추가해봐요!",
          guide: "push_back({이름, 점수}) 형태!",
          template: 'vector<pair<string, int>> v;\nv.___({\"Kim\", 95});\nv.___({\"Lee\", 88});',
          answer: "push_back",
          blanksAnswer: ["push_back", "push_back"],
          expect: 'vector<pair<string, int>> v;\nv.push_back({"Kim", 95});\nv.push_back({"Lee", 88});',
          en: {
            task: "Add 2 students to vector<pair<string, int>>!",
            guide: "Use the form: push_back({name, score})"
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "pair<int,int> a={2,5}; pair<int,int> b={2,3}; 일 때 a < b 는?",
          options: ["true (2<2 이니까)", "false (5>3 이니까)", "에러"],
          answer: 1,
          explanation: "first가 같으면(2==2) second를 비교해요. 5 > 3이므로 a > b → a < b는 false!",
          en: {
            question: "Given pair<int,int> a={2,5}; pair<int,int> b={2,3};, what is a < b?",
            options: ["true (because 2<2)", "false (because 5>3)", "error"],
            explanation: "When first values are equal (2==2), compare second. 5 > 3 means a > b → a < b is false!"
          }
        }
      },

      {
        type: "reward",
        content: {
          message: "pair 비교 완벽!",
          emoji: "🔍"
        }
      },

      {
        type: "summary",
        content: {
          num: 2,
          title: "pair 비교 & vector<pair>",
          learned: [
            "pair는 < > == 비교 연산자 자동 지원",
            "비교 순서: first 먼저, 같으면 second",
            "vector<pair>를 sort()하면 first 기준 자동 정렬",
            "점수+이름 묶어서 정렬할 때 아주 유용!"
          ],
          canDo: "pair끼리 비교하고 vector<pair>를 정렬할 수 있어요!",
          emoji: "🔍"
        }
      },

      {
        type: "done",
        content: {}
      }
    ]
};
