import { LessonData } from '../types';

export const lessonCpp23: LessonData = {
    id: "cpp-23",
    title: "sort 마스터",
    description: "sort 기초부터 lower_bound까지 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: sort 기초 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "sort 기초",
          desc: "pair 잠깐 떠올리고, sort() 기본기 복습!"
        }
      },

      // 🆕 pair vs tuple 분별 — sort 들어가기 전 anchor
      {
        type: "quiz",
        content: {
          question: "다음 중 pair 가 가장 적절한 상황은?",
          options: [
            "이름·나이·학점 세 값을 잠깐 묶기",
            "학생 이름과 점수를 짝지어 묶기",
            "학생 30 명을 자주 다룰 데이터 (이름·점수·반·…)",
            "정수 5 개를 하나의 컨테이너에"
          ],
          answer: 1,
          explanation: "pair = 딱 2 개! 이름+점수처럼 두 값이 짝꿍일 때 정답. 3 개 이상은 tuple, 자주 다루는 데이터는 struct, 같은 타입 여러 개는 vector!",
          en: {
            question: "Which scenario best fits pair?",
            options: [
              "Bundling three values briefly: name, age, gpa",
              "Bundling a student's name and score together",
              "Student data you'll work with often (name, score, class, …)",
              "Storing 5 integers in one container"
            ],
            explanation: "pair = exactly 2 values! Use it for name+score-style pairings. 3+ values → tuple, frequently-used data → struct, many of the same type → vector!"
          }
        }
      },

      // 🆕 pair 기본 — .first / .second 접근 (level 1)
      {
        type: "practice",
        content: {
          level: 1,
          task: "pair 만들고 두 값 출력 — sort 들어가기 전 잠깐 떠올리기!",
          guide: "두 값은 .first 와 .second 로 꺼내요!",
          template: 'pair<string, int> p = {"Kim", 95};\ncout << p.___ << ": " << p.___;',
          answer: "first",
          blanksAnswer: ["first", "second"],
          expect: 'pair<string, int> p = {"Kim", 95};\ncout << p.first << ": " << p.second;',
          en: {
            task: "Create a pair and print both values — quick refresh before sort!",
            guide: "Access the two values via .first and .second!"
          }
        }
      },

      // 🆕 pair + sort 자동 연결 (level 1) — 학생 pain point 직격
      {
        type: "practice",
        content: {
          level: 1,
          task: "pair 벡터를 sort — first 기준으로 자동 정렬돼요!",
          guide: "begin/end 만 넣으면 pair 가 알아서 first 비교. 정렬 후 첫 번째 학생의 이름 출력.",
          template: 'vector<pair<int, string>> v = {{85,"Kim"},{72,"Lee"},{90,"Park"}};\nsort(v.___, v.___);\ncout << v[0].second;',
          answer: "begin()",
          blanksAnswer: ["begin()", "end()"],
          expect: 'vector<pair<int, string>> v = {{85,"Kim"},{72,"Lee"},{90,"Park"}};\nsort(v.begin(), v.end());\ncout << v[0].second;',
          en: {
            task: "Sort a pair vector — auto-sorts by first!",
            guide: "Just begin/end — pair compares by first automatically. Print the first student's name after sort."
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <algorithm>\n#include <vector>\nusing namespace std;\n\nvector<int> v = {5, 2, 8, 1, 9};\nsort(v.begin(), v.end());\n// v = {1, 2, 5, 8, 9}',
          result: "1 2 5 8 9",
          note: "sort(시작, 끝) — <algorithm> 헤더 필요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {5, 2, 8, 1, 9};\nsort(v.begin(), v.end(), greater<int>());\ncout << v[0] << " " << v[4] << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["1 9", "9 1", "5 2"],
            answer: 1,
            feedback: "greater<int>()는 내림차순! 가장 큰 9가 앞, 가장 작은 1이 뒤!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["1 9", "9 1", "5 2"],
              feedback: "greater<int>() sorts in descending order! The largest value 9 comes first, smallest 1 comes last!"
            }
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "벡터를 오름차순으로 정렬해요!",
          guide: "sort(시작, 끝) 형태!",
          template: "sort(v.___(), v.___());",
          answer: "begin",
          blanksAnswer: ["begin", "end"],
          expect: "sort(v.begin(), v.end());",
          en: {
            task: "Sort a vector in ascending order!",
            guide: "Use the form sort(begin, end)!"
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "sort()를 쓰려면 어떤 헤더가 필요할까요?",
          options: ["<iostream>", "<vector>", "<algorithm>", "<sort>"],
          answer: 2,
          explanation: "sort()는 <algorithm> 헤더에 들어있어요!",
          en: {
            question: "Which header is required to use sort()?",
            options: ["<iostream>", "<vector>", "<algorithm>", "<sort>"],
            explanation: "sort() is found in the <algorithm> header!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<pair<string, int>> students = {\n    {"Alice", 85}, {"Bob", 92}, {"Carol", 78}\n};\nsort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });\ncout << students[0].first << ": " << students[0].second << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["Alice: 85", "Bob: 92", "Carol: 78"],
            answer: 1,
            feedback: "내림차순(>)이니까 가장 높은 점수 92점인 Bob 이 맨 앞!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["Alice: 85", "Bob: 92", "Carol: 78"],
              feedback: "Descending order (>) puts the highest score 92 (Bob) at the front!"
            }
          }
        }
      },

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

      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "pair 벡터에 학생 3명을 넣어요!",
          target: 'vector<pair<string, int>> students = {\n    {"Alice", 85}, {"Bob", 92}, {"Carol", 78}\n};',
          hint: 'vector<pair<string, int>> students = { {"이름", 점수}, ... };',
          done: ["#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {"],
          answer: 'vector<pair<string, int>> students = {\n    {"Alice", 85}, {"Bob", 92}, {"Carol", 78}\n};'
        }
      },

      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "점수 내림차순으로 정렬하는 sort를 써봐요!",
          target: "sort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });",
          hint: "람다에서 a.second > b.second 로 내림차순!",
          done: ["#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {", 'vector<pair<string, int>> students = {\n    {"Alice", 85}, {"Bob", 92}, {"Carol", 78}\n};'],
          answer: "sort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });"
        }
      },

      {
        type: "reward",
        content: {
          message: "학생 점수 정렬 프로젝트 완성!",
          emoji: "🏆"
        }
      },

      // ==================== CHAPTER 2: 커스텀 정렬 심화 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "커스텀 정렬 심화",
          desc: "람다 comparator, 다중 조건 정렬, 정렬 안정성을 익혀요!"
        }
      },

      // quiz: comparator 조건
      {
        type: "quiz",
        content: {
          question: "sort의 커스텀 comparator에서 return a < b; 는 어떤 정렬인가요?",
          options: [
            "내림차순 (큰 것부터)",
            "오름차순 (작은 것부터)",
            "무작위 순서",
            "컴파일 에러"
          ],
          answer: 1,
          explanation: "comparator에서 a < b이면 a가 앞에 와요 → 오름차순! b < a이면 내림차순이에요.",
          en: {
            question: "In a custom comparator for sort, what order does return a < b; produce?",
            options: [
              "Descending (largest first)",
              "Ascending (smallest first)",
              "Random order",
              "Compile error"
            ],
            explanation: "If a < b in the comparator, a comes first → ascending order! b < a would be descending."
          }
        }
      },

      // 🆕 lambda return 규칙 — 코드 기반 predict
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {3, 1, 4, 1, 5};\nsort(v.begin(), v.end(), [](int a, int b) {\n    return a > b;\n});\ncout << v[0] << " " << v[4];',
          predict: {
            question: "출력 결과는?",
            options: ["1 5", "5 1", "3 5", "1 1"],
            answer: 1,
            feedback: "return a > b → a 가 더 크면 a 가 앞 → **내림차순**. 정렬 후 {5, 4, 3, 1, 1}. v[0] = 5, v[4] = 1 → '5 1'."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["1 5", "5 1", "3 5", "1 1"],
              feedback: "return a > b → a first when a is bigger → **descending**. Sorted: {5, 4, 3, 1, 1}. v[0] = 5, v[4] = 1 → '5 1'."
            }
          }
        }
      },

      // errorQuiz: >= 대신 > 을 써야 함
      {
        type: "errorQuiz",
        content: {
          question: "이 comparator의 문제점은?",
          code: 'sort(v.begin(), v.end(),\n    [](int a, int b) { return a >= b; });',
          options: [
            ">= 대신 > 를 써야 해요 (같을 때 true 반환하면 안 됨)",
            "람다 대신 함수 포인터를 써야 해요",
            "sort에서 람다를 사용할 수 없어요"
          ],
          answer: 0,
          explanation: "comparator는 a == b 일 때 false를 반환해야 해요! >= 는 같을 때도 true → 정렬 동작 undefined behavior!",
          en: {
            question: "What is wrong with this comparator?",
            options: [
              "Should use > instead of >= (must not return true when equal)",
              "Should use a function pointer instead of a lambda",
              "Cannot use a lambda with sort"
            ],
            explanation: "A comparator must return false when a == b! >= returns true even when equal → undefined behavior in sorting!"
          }
        }
      },

      // practice: 내림차순 정렬
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터를 내림차순으로 정렬해요!",
          guide: "내림차순 정렬을 위해 sort의 세 번째 인자로 '더 큰' 비교자를 넣어봐!",
          template: "vector<int> v = {3, 1, 4, 1, 5, 9, 2};\nsort(v.begin(), v.end(), ___<int>());\ncout << v[0] << endl;",
          answer: "greater",
          expect: "vector<int> v = {3, 1, 4, 1, 5, 9, 2};\nsort(v.begin(), v.end(), greater<int>());\ncout << v[0] << endl;",
          en: {
            task: "Sort a vector in descending order!",
            guide: "Pass a comparator meaning 'greater than' as the third argument to sort for descending order!"
          }
        }
      },

      // practice: 람다로 커스텀 정렬
      {
        type: "practice",
        content: {
          level: 2,
          task: "pair 벡터를 second(점수) 기준 오름차순으로 정렬해요!",
          guide: "pair의 두 번째 값으로 정렬하려면 람다에서 어떤 멤버를 비교해야 할까?",
          template: 'vector<pair<string, int>> v = {{"A",85},{"B",70},{"C",92}};\nsort(v.begin(), v.end(),\n    [](auto a, auto b){ return a.___ < b.___; });',
          answer: "second",
          blanksAnswer: ["second", "second"],
          expect: 'vector<pair<string, int>> v = {{"A",85},{"B",70},{"C",92}};\nsort(v.begin(), v.end(),\n    [](auto a, auto b){ return a.second < b.second; });',
          en: {
            task: "Sort a pair vector in ascending order by second (score)!",
            guide: "To sort by the second value of a pair, which member should the lambda compare?"
          }
        }
      },

      // predict: 정렬 결과 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<string> words = {"banana", "apple", "cherry", "date"};\nsort(words.begin(), words.end());\ncout << words[0] << " " << words[3] << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["banana cherry", "apple date", "date apple", "cherry banana"],
            answer: 1,
            feedback: "문자열은 사전순 정렬! a<b<c<d 순서로 apple이 첫 번째, date가 마지막!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["banana cherry", "apple date", "date apple", "cherry banana"],
              feedback: "Strings are sorted lexicographically! a<b<c<d order puts apple first and date last!"
            }
          }
        }
      },

      // quiz: stable_sort
      {
        type: "quiz",
        content: {
          question: "stable_sort와 sort의 차이점은?",
          options: [
            "stable_sort는 내림차순만 지원한다",
            "stable_sort는 동일한 값의 원래 순서를 보존한다",
            "stable_sort는 <numeric> 헤더가 필요하다",
            "stable_sort는 포인터 배열에서만 사용 가능하다"
          ],
          answer: 1,
          explanation: "stable_sort는 같은 값이 있을 때 원래 순서를 유지해요! 이름-점수 묶음에서 점수 같으면 이름 순서 보존 시 유용!",
          en: {
            question: "What is the difference between stable_sort and sort?",
            options: [
              "stable_sort only supports descending order",
              "stable_sort preserves the original order of equal elements",
              "stable_sort requires the <numeric> header",
              "stable_sort can only be used on pointer arrays"
            ],
            explanation: "stable_sort preserves the original order of equal elements! Useful when you want to keep the name order when scores are equal."
          }
        }
      },

      // practice: 다중 조건 정렬
      {
        type: "practice",
        content: {
          level: 3,
          task: "점수 내림차순, 동점이면 이름 오름차순으로 정렬해요!",
          guide: "점수가 다르면 높은 점수가 앞에, 점수가 같으면 이름 알파벳 순서가 앞에 오도록 비교 방향을 결정해!",
          template: 'vector<pair<string,int>> v = {{"Bob",90},{"Alice",90},{"Carol",85}};\nsort(v.begin(), v.end(), [](auto a, auto b) {\n    if (a.second != b.second) return a.second ___ b.second;\n    return a.first ___ b.first;\n});\ncout << v[0].first << endl;',
          answer: ">",
          blanksAnswer: [">", "<"],
          expect: 'vector<pair<string,int>> v = {{"Bob",90},{"Alice",90},{"Carol",85}};\nsort(v.begin(), v.end(), [](auto a, auto b) {\n    if (a.second != b.second) return a.second > b.second;\n    return a.first < b.first;\n});\ncout << v[0].first << endl;',
          en: {
            task: "Sort by score descending, then by name ascending if scores are equal!",
            guide: "When scores differ, higher scores come first; when scores tie, earlier alphabetical names come first — decide the comparison direction!"
          }
        }
      },

      // errorQuiz: sort 범위 지정 실수
      {
        type: "errorQuiz",
        content: {
          question: "이 sort 코드의 문제점은?",
          code: 'vector<int> v = {3, 1, 4, 1, 5};\nsort(v.begin(), v.end() + 1);',
          options: [
            "v.end() + 1은 범위 밖 — 반드시 v.end()만 써야 함",
            "sort는 +1 없이 end()를 쓰면 안 됨",
            "v.begin() 대신 v.start()를 써야 함"
          ],
          answer: 0,
          explanation: "v.end()는 마지막 원소의 다음 위치예요! +1을 하면 범위 밖 → 미정의 동작(undefined behavior)!",
          en: {
            question: "What is wrong with this sort code?",
            options: [
              "v.end() + 1 goes out of bounds — must use v.end() only",
              "sort requires using end() with +1",
              "Should use v.start() instead of v.begin()"
            ],
            explanation: "v.end() points one past the last element! Adding +1 goes out of bounds → undefined behavior!"
          }
        }
      },

      // practice: 처음부터 작성 — tuple 다중 키 정렬 (학점 내림 + 동점 시 나이 오름)
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 학생 정보 tuple<string, int, double> (이름, 나이, 학점) 벡터를 **학점 내림차순**, 동점이면 **나이 오름차순** 으로 정렬해서 1등의 이름만 출력하세요.\n\n입력: {{\"Alice\", 17, 3.8}, {\"Bob\", 16, 3.9}, {\"Carol\", 17, 3.9}}\n기대 출력: Carol",
          guide: "auto [name, age, gpa] = student; 로 풀고, lambda comparator 에서 학점이 다르면 학점 비교, 같으면 나이 비교. 학점 내림차순 = a.gpa > b.gpa 또는 get<2>(a) > get<2>(b).",
          template: null,
          answer: 'vector<tuple<string, int, double>> v = {{"Alice", 17, 3.8}, {"Bob", 16, 3.9}, {"Carol", 17, 3.9}};\nsort(v.begin(), v.end(), [](auto& a, auto& b) {\n    auto [na, aa, ga] = a;\n    auto [nb, ab, gb] = b;\n    if (ga != gb) return ga > gb;\n    return aa < ab;\n});\nauto [name, age, gpa] = v[0];\ncout << name;',
          expect: "Carol",
          en: {
            task: "Write from scratch! Given a vector<tuple<string, int, double>> of (name, age, gpa), sort by **gpa descending**, breaking ties by **age ascending**, then print just the top student's name.\n\nInput: {{\"Alice\", 17, 3.8}, {\"Bob\", 16, 3.9}, {\"Carol\", 17, 3.9}}\nExpected output: Carol",
            guide: "Unpack with structured bindings: auto [name, age, gpa] = student;. In the lambda comparator, if gpa differs use gpa, otherwise use age. Descending gpa = a.gpa > b.gpa (or get<2>(a) > get<2>(b))."
          }
        }
      },

      // interleaving: cpp-9 벡터 접근
      {
        type: "interleaving",
        content: {
          message: "잠깐! 벡터의 마지막 원소에 접근하는 방법?",
          task: "정렬된 벡터의 마지막(가장 큰) 원소를 출력해요!",
          template: "vector<int> v = {1, 3, 5, 7, 9};\ncout << v[v.___() - 1] << endl;",
          answer: "size",
          expect: "vector<int> v = {1, 3, 5, 7, 9};\ncout << v[v.size() - 1] << endl;",
          en: {
            message: "Quick! How do you access the last element of a vector?",
            task: "Print the last (largest) element of a sorted vector!"
          }
        }
      },

      // 🆕 sort + unique 패턴 — 중복 제거 (lesson chapter 3)
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};\nsort(v.begin(), v.end());\nv.erase(unique(v.begin(), v.end()), v.end());\ncout << v.size();',
          predict: {
            question: "출력 결과는? (중복 제거 후 원소 개수)",
            options: ["7", "10", "5", "9"],
            answer: 0,
            feedback: "정렬 후 v = {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}. unique + erase 로 중복 제거 → {1, 2, 3, 4, 5, 6, 9} = 7 개."
          },
          en: {
            predict: {
              question: "What's the output? (count after dedup)",
              options: ["7", "10", "5", "9"],
              feedback: "After sort: {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}. unique + erase removes duplicates → {1, 2, 3, 4, 5, 6, 9} = 7 elements."
            }
          }
        }
      },

      // 🆕 sort + unique 빈칸 채우기
      {
        type: "practice",
        content: {
          level: 2,
          task: "vector 의 중복을 제거하고 정렬된 결과를 만드세요. (sort → unique → erase 패턴)",
          guide: "1) sort 먼저 (unique 는 인접 중복만 제거하니까!) 2) v.erase(unique(begin, end), end()) 으로 중복 잘라내기.",
          template: 'vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};\nsort(v.begin(), v.end());\nv.erase(___(v.begin(), v.end()), v.end());',
          answer: "unique",
          expect: 'vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};\nsort(v.begin(), v.end());\nv.erase(unique(v.begin(), v.end()), v.end());',
          en: {
            task: "Remove duplicates from a vector and keep it sorted. (sort → unique → erase pattern)",
            guide: "1) sort first (unique only removes adjacent duplicates!). 2) v.erase(unique(begin, end), end()) trims the duplicates."
          }
        }
      },

      // 🆕 sort + unique 핵심 이해 quiz
      {
        type: "quiz",
        content: {
          question: "`unique()` 만 호출하고 sort 안 하면 어떻게 될까요?",
          options: [
            "정상적으로 모든 중복 제거됨",
            "**인접한** 중복만 제거됨 — {1, 3, 1, 3} 은 그대로 4 개",
            "컴파일 에러",
            "프로그램이 멈춤"
          ],
          answer: 1,
          explanation: "`unique()` 는 **인접한** 중복만 제거해요. 정렬 안 하면 같은 값이 떨어져 있어서 중복으로 안 봐요. 그래서 **sort + unique 가 한 세트** 입니다.",
          en: {
            question: "What happens if you call `unique()` without sorting first?",
            options: [
              "All duplicates removed normally",
              "Only **adjacent** duplicates removed — {1, 3, 1, 3} stays as 4 elements",
              "Compile error",
              "Program crashes"
            ],
            explanation: "`unique()` only removes **adjacent** duplicates. Without sorting, equal values aren't next to each other and won't be detected. That's why **sort + unique is a pair**."
          }
        }
      },

      // ==================== CHAPTER 3: lower_bound 활용 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "lower_bound 활용",
          desc: "정렬된 배열에서 빠르게 위치/개수 찾기!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {1, 3, 5, 7, 9};\nauto it = lower_bound(v.begin(), v.end(), 5);\ncout << *it << endl;         // 5\ncout << (it - v.begin());    // index: 2',
          result: "5\n2",
          note: "반드시 정렬된 배열에서만 사용! * 로 값 꺼내기!"
        }
      },

      {
        type: "quiz",
        content: {
          question: "lower_bound()를 쓰기 전에 반드시 해야 하는 것은?",
          options: ["벡터를 비워야 함", "벡터를 정렬해야 함", "헤더를 <utility>로 해야 함"],
          answer: 1,
          explanation: "lower_bound는 이진 탐색이라 반드시 정렬된 배열에서만 동작해요! sort() 먼저!",
          en: {
            question: "What must you do before using lower_bound()?",
            options: ["Empty the vector", "Sort the vector", "Change the header to <utility>"],
            explanation: "lower_bound is a binary search and only works on sorted arrays! sort() first!"
          }
        }
      },

      // 🆕 level 1 — lower_bound 호출 형태만 떠올리기
      {
        type: "practice",
        content: {
          level: 1,
          task: "lower_bound 호출! 정렬된 벡터에서 값 5 찾기",
          guide: "sort 와 같은 (begin, end, 값) 형태!",
          template: "vector<int> v = {1, 3, 5, 7, 9};\nauto it = lower_bound(v.___, v.___, 5);\ncout << *it;",
          answer: "begin()",
          blanksAnswer: ["begin()", "end()"],
          expect: "vector<int> v = {1, 3, 5, 7, 9};\nauto it = lower_bound(v.begin(), v.end(), 5);\ncout << *it;",
          en: {
            task: "Call lower_bound to find value 5 in a sorted vector!",
            guide: "Same (begin, end, value) shape as sort!"
          }
        }
      },

      // practice: lower_bound 사용 — 함수 이름 자체 떠올리기
      {
        type: "practice",
        content: {
          level: 2,
          task: "정렬된 벡터에서 어떤 함수로 값 5의 위치를 찾을까요?",
          guide: "이름은 'lower_bound' — 정렬된 배열에서 값을 빠르게 찾을 때!",
          template: "vector<int> v = {1, 3, 5, 7, 9};\nauto it = ___(v.begin(), v.end(), 5);\ncout << *it << endl;",
          answer: "lower_bound",
          expect: "vector<int> v = {1, 3, 5, 7, 9};\nauto it = lower_bound(v.begin(), v.end(), 5);\ncout << *it << endl;",
          en: {
            task: "Which function finds the position of value 5 in a sorted vector?",
            guide: "Name is 'lower_bound' — fast value lookup in sorted arrays!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {1, 3, 5, 5, 5, 7};\nauto lo = lower_bound(v.begin(), v.end(), 5);\nauto hi = upper_bound(v.begin(), v.end(), 5);\ncout << (hi - lo);  // count of 5: 3',
          predict: {
            question: "출력 결과는?",
            options: ["2", "3", "5"],
            answer: 1,
            feedback: "5가 인덱스 2,3,4에 3개 있어요! hi - lo = 3!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["2", "3", "5"],
              feedback: "5 appears at indices 2, 3, 4 — that's 3 occurrences! hi - lo = 3!"
            }
          }
        }
      },

      {
        type: "done",
        content: {}
      }
    ]
};
