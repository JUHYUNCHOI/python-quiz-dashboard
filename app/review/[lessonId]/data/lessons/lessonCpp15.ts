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
          note: "make_pair는 타입을 안 써도 알아서 추론!",
          en: {
            code: 'pair<string, int> p1 = {"Emma", 88};     // brace initialization\nauto p2 = make_pair("Tom", 92);           // using make_pair',
            note: "make_pair infers the types automatically!"
          }
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
            guide: "Use the form: pair<type1, type2>",
            template: 'pair<___, ___> student("Tom", 95);',
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "pair에서 첫 번째 값을 꺼내요!",
          guide: ".first 또는 .second를 써요!",
          context: 'pair<string, int> student("철수", 95);',
          template: "cout << student.___ << endl;",
          answer: "first",
          expect: "cout << student.first << endl;",
          en: {
            task: "Get the first value from the pair!",
            guide: "Use .first or .second!",
            context: 'pair<string, int> student("Emma", 95);'
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
          task: "캐릭터 철수의 HP 100 을 pair 로 묶고, HP 만 꺼내 출력하세요.",
          guide: "auto + 함수 호출로 pair 만들기. 멤버 접근은 .first / .second.",
          template: 'auto p = ___("철수", 100);\ncout << p.___;',
          answer: 'auto p = make_pair("철수", 100);\ncout << p.second;',
          blanksAnswer: ["make_pair", "second"],
          expect: '100',
          en: {
            task: "Bundle character Tom's HP 100 as a pair, then print just the HP.",
            guide: "auto + function call to build a pair. Use .first / .second for members.",
            template: 'auto p = ___("Tom", 100);\ncout << p.___;',
            answer: 'auto p = make_pair("Tom", 100);\ncout << p.second;',
          }
        }
      },

      // 🆕 structured bindings — 개념 이해 (코드 블록 + 예측)
      {
        type: "explain",
        content: {
          lines: [],
          code: 'pair<string, int> p = {"Alice", 95};\nauto [name, score] = p;',
          predict: {
            question: "위 코드 이후 `name` 의 값은?",
            options: ["\"Alice\"", "95", "p.first", "에러 (name 이라는 변수는 없음)"],
            answer: 0,
            feedback: "structured bindings 는 `auto [a, b] = p;` 한 줄로 **두 변수 (name, score) 를 새로 만들고** pair 의 .first / .second 를 순서대로 자동 담아줘요. → name = \"Alice\", score = 95."
          },
          en: {
            predict: {
              question: "After the code above, what is `name`?",
              options: ["\"Alice\"", "95", "p.first", "Error (no variable called name)"],
              feedback: "structured bindings creates two new variables (name, score) and auto-fills them with .first / .second in order. → name = \"Alice\", score = 95."
            }
          }
        }
      },

      // 🆕 structured bindings — predict (출력 예측)
      {
        type: "explain",
        content: {
          lines: [],
          code: 'pair<string, int> p = {"Bob", 88};\nauto [name, score] = p;\ncout << score << " " << name;',
          predict: {
            question: "출력 결과는?",
            options: ["88 Bob", "Bob 88", "first second", "컴파일 에러"],
            answer: 0,
            feedback: "auto [name, score] = p; → name=\"Bob\", score=88. cout << score << \" \" << name; 순서대로 출력 → 88 Bob."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["88 Bob", "Bob 88", "first second", "Compile error"],
              feedback: "auto [name, score] = p; → name=\"Bob\", score=88. cout << score << \" \" << name; prints in that order → 88 Bob."
            }
          }
        }
      },

      // 🆕 structured bindings — fill-blank (구조 떠올리기)
      {
        type: "practice",
        content: {
          level: 1,
          task: "structured bindings 로 pair 의 두 값을 한 줄에 풀어 담으세요.",
          guide: "auto [변수1, 변수2] = pair; — 변수 이름은 task 가 시키는 대로 (name, score).",
          template: 'pair<string, int> p = {"Carol", 92};\nauto [___, ___] = p;\ncout << name << ":" << score;',
          answer: "name",
          blanksAnswer: ["name", "score"],
          expect: 'pair<string, int> p = {"Carol", 92};\nauto [name, score] = p;\ncout << name << ":" << score;',
          en: {
            task: "Use structured bindings to unpack a pair's two values in one line.",
            guide: "auto [var1, var2] = pair; — names per the task (name, score)."
          }
        }
      },

      // 🆕 auto vs auto& — predict (복사 동작 이해)
      {
        type: "explain",
        content: {
          lines: [],
          code: 'pair<string, int> p = {"Alice", 95};\nauto [name, score] = p;\nname = "James";\ncout << p.first;',
          predict: {
            question: "출력 결과는?",
            options: ["Alice", "James", "둘 다 출력", "에러"],
            answer: 0,
            feedback: "auto [name, score] = p; 는 **복사**. name 은 새 변수라 바꿔도 원본 p 는 그대로. → p.first 는 여전히 \"Alice\"."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["Alice", "James", "both printed", "error"],
              feedback: "auto [name, score] = p; **copies** values. name is a new variable, so changing it doesn't touch p. → p.first stays \"Alice\"."
            }
          }
        }
      },

      // 🆕 auto vs auto& — predict (reference 동작 이해)
      {
        type: "explain",
        content: {
          lines: [],
          code: 'pair<string, int> p = {"Alice", 95};\nauto& [name, score] = p;\nname = "James";\ncout << p.first;',
          predict: {
            question: "출력 결과는?",
            options: ["Alice", "James", "둘 다 출력", "에러"],
            answer: 1,
            feedback: "auto& [name, score] = p; 는 **reference**. name 은 p.first 의 별명 (같은 자리 가리킴). name 바꾸면 p.first 도 바뀜. → \"James\"."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["Alice", "James", "both printed", "error"],
              feedback: "auto& [name, score] = p; is a **reference**. name aliases p.first (same slot). Changing name changes p.first too. → \"James\"."
            }
          }
        }
      },

      // 🆕 auto vs auto& — quiz (range-for 정석 선택)
      {
        type: "quiz",
        content: {
          question: "vector<pair<string, int>> 를 range-for 로 순회할 때, **실전에서 거의 항상** 쓰는 형태는?",
          options: [
            "for (auto [name, score] : v) — 매번 복사",
            "for (auto& [name, score] : v) — reference (복사 X)",
            "for (pair<string,int> p : v) — 명시적 타입 + 복사",
            "셋 다 동일하니 아무거나"
          ],
          answer: 1,
          explanation: "range-for 에선 거의 항상 `auto&` — 매 원소를 복사하지 않고 가리키기만 해서 효율적. vector 안 데이터가 클수록 차이 커짐. 원본 수정도 가능 (필요 없으면 const auto& 도 OK).",
          en: {
            question: "When iterating vector<pair<string, int>> with range-for, which form is **almost always** used in practice?",
            options: [
              "for (auto [name, score] : v) — copies each",
              "for (auto& [name, score] : v) — reference (no copy)",
              "for (pair<string,int> p : v) — explicit type + copy",
              "All equivalent, pick anything"
            ],
            explanation: "Almost always `auto&` in range-for — aliases each element instead of copying, so it's efficient. The bigger each element, the bigger the win. Lets you mutate too (use const auto& if you don't need to)."
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

      // 🆕 range-for + structured bindings — 실전에서 가장 많이 쓰는 패턴
      {
        type: "practice",
        content: {
          level: 2,
          task: "range-for 와 structured bindings 로 vector<pair> 를 순회하며 \"이름:점수 \" 형식으로 출력하세요.",
          guide: "for (auto& [변수1, 변수2] : 벡터) — 대괄호 안에 두 변수 이름. 그 안에서 그대로 변수 이름으로 사용.",
          template: 'vector<pair<string, int>> v = {{"Alice", 90}, {"Bob", 80}};\nfor (auto& [___, ___] : v)\n    cout << name << ":" << score << " ";',
          answer: "name",
          blanksAnswer: ["name", "score"],
          expect: 'vector<pair<string, int>> v = {{"Alice", 90}, {"Bob", 80}};\nfor (auto& [name, score] : v)\n    cout << name << ":" << score << " ";',
          en: {
            task: "Iterate vector<pair> with range-for + structured bindings, printing as \"name:score \".",
            guide: "for (auto& [var1, var2] : vec) — two variable names in the brackets, then use them by name."
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
            "점수+이름 묶어서 정렬할 때 아주 유용!",
            "range-for + structured bindings (`for (auto& [a, b] : v)`) 가 실전 정석"
          ],
          canDo: "pair끼리 비교하고 vector<pair>를 정렬할 수 있어요!",
          emoji: "🔍"
        }
      },

      // ==================== CHAPTER 3: tuple & 심화 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "tuple & 심화 연습",
          desc: "tuple, get<>(), pair 정렬을 완전히 익혀요!"
        }
      },

      // quiz: tuple이란?
      {
        type: "quiz",
        content: {
          question: "tuple<int, string, double> t(1, \"hello\", 3.14); 에서 두 번째 값을 꺼내는 방법은?",
          options: ["t.second", "t[1]", "get<1>(t)", "t.at(1)"],
          answer: 2,
          explanation: "tuple은 get<인덱스>(튜플)로 접근해요! 인덱스는 0부터 시작해요.",
          en: {
            question: "How do you access the second value in tuple<int, string, double> t(1, \"hello\", 3.14);?",
            options: ["t.second", "t[1]", "get<1>(t)", "t.at(1)"],
            explanation: "Use get<index>(tuple) to access tuple elements! Index starts at 0."
          }
        }
      },

      // practice: tuple 사용
      {
        type: "practice",
        content: {
          level: 2,
          task: "tuple에서 첫 번째 값을 꺼내요!",
          guide: "get<0>(t) 형태!",
          template: 'tuple<string, int, double> t = {"Alice", 20, 4.5};\ncout << ___<0>(t) << endl;',
          answer: "get",
          expect: 'tuple<string, int, double> t = {"Alice", 20, 4.5};\ncout << get<0>(t) << endl;',
          en: {
            task: "Get the first value from a tuple!",
            guide: "Use the form get<0>(t)!"
          }
        }
      },

      // 🆕 tuple structured bindings — fill-blank (세 변수 풀어 담기)
      {
        type: "practice",
        content: {
          level: 1,
          task: "structured bindings 로 tuple 의 세 값을 한 줄에 풀어 담으세요. (get<0>, get<1>, get<2> 일일이 안 적어도 됨)",
          guide: "auto [변수1, 변수2, 변수3] = tuple; — 변수 이름은 task 의 사용처에 맞게 (name, age, gpa).",
          template: 'tuple<string, int, double> t = {"Alice", 20, 4.5};\nauto [___, ___, ___] = t;\ncout << name << "/" << age << "/" << gpa;',
          answer: "name",
          blanksAnswer: ["name", "age", "gpa"],
          expect: 'tuple<string, int, double> t = {"Alice", 20, 4.5};\nauto [name, age, gpa] = t;\ncout << name << "/" << age << "/" << gpa;',
          en: {
            task: "Use structured bindings to unpack a tuple's three values in one line. (No more get<0>, get<1>, get<2> for each!)",
            guide: "auto [v1, v2, v3] = tuple; — names matching what's used below (name, age, gpa)."
          }
        }
      },

      // 🆕 tuple structured bindings — predict (출력 결과 예측)
      {
        type: "explain",
        content: {
          lines: [],
          code: 'tuple<string, int, double> t = {"Bob", 17, 3.8};\nauto [name, age, gpa] = t;\ncout << age << " " << gpa;',
          predict: {
            question: "출력 결과는?",
            options: ["17 3.8", "3.8 17", "Bob 17", "컴파일 에러"],
            answer: 0,
            feedback: "auto [name, age, gpa] = t; → name=\"Bob\", age=17, gpa=3.8. cout << age << \" \" << gpa; 순서대로 → 17 3.8."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["17 3.8", "3.8 17", "Bob 17", "Compile error"],
              feedback: "auto [name, age, gpa] = t; → name=\"Bob\", age=17, gpa=3.8. cout << age << \" \" << gpa; prints in that order → 17 3.8."
            }
          }
        }
      },

      // errorQuiz: get<> 인덱스 범위 초과
      {
        type: "errorQuiz",
        content: {
          question: "이 코드에서 에러가 발생하는 이유는?",
          code: 'tuple<int, string> t(42, "hi");\ncout << get<2>(t) << endl;',
          options: [
            "tuple은 2개만 있는데 get<2>는 세 번째(존재 안 함)를 접근",
            "get 대신 .first를 써야 함",
            "tuple 대신 pair를 써야 함"
          ],
          answer: 0,
          explanation: "get<2>는 세 번째 원소! 이 tuple은 2개(인덱스 0, 1)만 있어요. get<1>(t)이 마지막!",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "tuple has only 2 elements, but get<2> tries to access the third (which doesn't exist)",
              "Should use .first instead of get",
              "Should use pair instead of tuple"
            ],
            explanation: "get<2> accesses the third element! This tuple only has 2 elements (index 0 and 1). get<1>(t) is the last valid access!"
          }
        }
      },

      // quiz: make_tuple
      {
        type: "quiz",
        content: {
          question: "auto t = make_tuple(1, \"apple\", 3.14); 에서 get<2>(t) 의 값은?",
          options: ["1", "\"apple\"", "3.14", "에러"],
          answer: 2,
          explanation: "make_tuple(1, \"apple\", 3.14)의 인덱스 2는 세 번째 값 3.14예요!",
          en: {
            question: "What is get<2>(t) for auto t = make_tuple(1, \"apple\", 3.14);?",
            options: ["1", "\"apple\"", "3.14", "error"],
            explanation: "Index 2 of make_tuple(1, \"apple\", 3.14) is the third value: 3.14!"
          }
        }
      },

      // practice: pair 정렬 — vector<pair> sort
      {
        type: "practice",
        content: {
          level: 2,
          task: "vector<pair<int,string>>를 오름차순으로 정렬해요!",
          guide: "sort(v.begin(), v.end()) — pair는 first 기준 자동 정렬!",
          template: 'vector<pair<int, string>> v = {{3,"C"},{1,"A"},{2,"B"}};\n___(v.begin(), v.end());\ncout << v[0].second << endl;',
          answer: "sort",
          expect: 'vector<pair<int, string>> v = {{3,"C"},{1,"A"},{2,"B"}};\nsort(v.begin(), v.end());\ncout << v[0].second << endl;',
          en: {
            task: "Sort a vector<pair<int,string>> in ascending order!",
            guide: "sort(v.begin(), v.end()) — pairs are automatically sorted by first!"
          }
        }
      },

      // interleaving: cpp-9 vector push_back 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 벡터에 원소 추가 기억나요?",
          task: "vector에 pair {5, \"hello\"}를 추가하는 코드를 완성해요!",
          template: 'vector<pair<int, string>> v;\nv.___({5, "hello"});',
          answer: "push_back",
          expect: 'vector<pair<int, string>> v;\nv.push_back({5, "hello"});',
          en: {
            message: "Quick! Remember how to add elements to a vector?",
            task: "Complete the code to add pair {5, \"hello\"} to a vector!"
          }
        }
      },

      // practice: pair 비교 직접 작성
      {
        type: "practice",
        content: {
          level: 2,
          task: "두 pair 중 더 큰 것의 first 값을 출력해요!",
          guide: "pair는 < > 비교 연산자 지원 — first 먼저, 같으면 second 비교!",
          template: "pair<int,int> a = {3, 10};\npair<int,int> b = {3, 5};\nif (a ___ b) {\n    cout << a.first << endl;\n} else {\n    cout << b.first << endl;\n}",
          answer: ">",
          expect: "pair<int,int> a = {3, 10};\npair<int,int> b = {3, 5};\nif (a > b) {\n    cout << a.first << endl;\n} else {\n    cout << b.first << endl;\n}",
          en: {
            task: "Print the first value of the larger pair among two pairs!",
            guide: "pair supports < > comparison operators — compares first first, then second if equal!"
          }
        }
      },

      // practice: 처음부터 작성 — 최고점 학생 찾기
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! pair 벡터에서 **점수가 가장 높은 학생의 이름** 만 출력하세요. (정렬 X — 한 번 훑으면서 최댓값 추적하는 패턴이에요. 카페 메뉴에서 가장 비싼 음료 찾기랑 같은 패턴.)\n\n입력 데이터: {{\"Alice\",85},{\"Bob\",92},{\"Carol\",78}}\n기대 출력: Bob",
          guide: "best = v[0] 으로 시작 → range-for 로 돌면서 p.second > best.second 면 갱신 → 끝에 best.first 출력",
          template: null,
          answer: 'vector<pair<string,int>> v = {{"Alice",85},{"Bob",92},{"Carol",78}};\npair<string,int> best = v[0];\nfor (auto p : v) {\n    if (p.second > best.second) {\n        best = p;\n    }\n}\ncout << best.first << endl;',
          expect: "Bob",
          en: {
            task: "Write from scratch! Print **just the name of the student with the highest score**. (No sort needed — single-pass max tracking, same pattern as 'find the most expensive drink' from the lesson.)\n\nInput: {{\"Alice\",85},{\"Bob\",92},{\"Carol\",78}}\nExpected output: Bob",
            guide: "Seed best = v[0], range-for the rest, update best when p.second > best.second, then print best.first"
          }
        }
      },

      // interleaving: cpp-14 struct 복습 (pair vs struct 진짜 비교)
      {
        type: "interleaving",
        content: {
          message: "잠깐! struct와 pair의 진짜 차이 — 멤버 이름",
          task: "같은 데이터를 두 방식으로 표현했어요. **struct 와 pair 양쪽 모두 'name' 에 해당하는 부분에 접근**해서 \"Alice\" 로 설정하세요.\n\n👉 차이가 보이죠? struct 는 .name 처럼 **의미가 보이는** 이름, pair 는 .first / .second 처럼 **순서로만** 접근.",
          template: "// struct — meaningful names\nstruct Student { string name; int age; };\nStudent s;\ns.___ = \"Alice\";\n\n// pair — by position only\npair<string, int> p;\np.___ = \"Alice\";",
          answer: "name",
          blanksAnswer: ["name", "first"],
          expect: "// struct — meaningful names\nstruct Student { string name; int age; };\nStudent s;\ns.name = \"Alice\";\n\n// pair — by position only\npair<string, int> p;\np.first = \"Alice\";",
          en: {
            message: "Quick! The real difference between struct and pair — member **names**",
            task: "Same data, two representations. **Set the 'name' equivalent to \"Alice\" in BOTH struct and pair.**\n\n👉 See the difference? struct uses meaningful names like .name; pair only uses .first / .second by position."
          }
        }
      },

      {
        type: "done",
        content: {}
      }
    ]
};
