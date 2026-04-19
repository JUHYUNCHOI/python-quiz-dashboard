import { LessonData } from '../types';

export const lessonCpp20: LessonData = {
    id: "cpp-20",
    title: "CP 실전 팁",
    description: "Competitive Programming 실전 팁 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: 입출력 최적화 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "입출력 최적화",
          desc: "Fast I/O 템플릿과 '\\n' vs endl을 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    // start solving here!\n\n    return 0;\n}',
          note: "bits/stdc++.h = 모든 헤더를 한 번에 포함! (대회 전용)"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <bits/stdc++.h>  // this one is enough!\n// no need for any of these:\n// #include <iostream>\n// #include <vector>\n// #include <algorithm>\n// #include <map>',
          predict: {
            question: "bits/stdc++.h를 실제 프로젝트에서도 쓸까요?",
            options: ["네, 항상 써요", "아니요, 대회에서만 써요", "C++20부터 사라졌어요"],
            answer: 1,
            feedback: "bits/stdc++.h는 컴파일이 느려서 대회에서만 써요! 실제 프로젝트에서는 필요한 헤더만 포함해요."
          },
          en: {
            predict: {
              question: "Is bits/stdc++.h used in real projects too?",
              options: ["Yes, always", "No, only in competitive programming", "It was removed in C++20"],
              feedback: "bits/stdc++.h slows down compilation, so it's only for competitions! In real projects, include only the needed headers."
            }
          }
        }
      },

      // Lv.1: 헤더 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "대회용 만능 헤더를 써봐요!",
          guide: "bits/stdc++.h를 include 해요!",
          template: "#include <___>",
          answer: "bits/stdc++.h",
          expect: "#include <bits/stdc++.h>",
          en: {
            task: "Write the all-in-one competition header!",
            guide: "Include bits/stdc++.h!"
          }
        }
      },

      // endl vs \n 퀴즈
      {
        type: "quiz",
        content: {
          question: "대회에서 endl 대신 '\\n'을 쓰는 이유는?",
          options: [
            "endl은 에러가 나서",
            "endl은 flush를 해서 느리니까",
            "'\\n'이 타이핑이 더 짧아서",
            "endl은 C++에서 없어질 예정이라"
          ],
          answer: 1,
          explanation: "endl은 줄바꿈 + 버퍼 flush를 하지만, '\\n'은 줄바꿈만 해서 빨라요!",
          en: {
            question: "Why use '\\n' instead of endl in competitive programming?",
            options: [
              "endl causes errors",
              "endl flushes the buffer and is slow",
              "'\\n' is shorter to type",
              "endl is scheduled to be removed from C++"
            ],
            explanation: "endl does newline + buffer flush, but '\\n' only does newline — which is faster!"
          }
        }
      },

      // Lv.1: Fast I/O 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "Fast I/O 두 줄을 완성해요!",
          guide: "sync_with_stdio(false)와 cin.tie(NULL)!",
          template: "ios::sync_with_stdio(___);\ncin.tie(___);",
          answer: "false",
          blanksAnswer: ["false", "NULL"],
          expect: "ios::sync_with_stdio(false);\ncin.tie(NULL);",
          en: {
            task: "Complete the two Fast I/O lines!",
            guide: "sync_with_stdio(false) and cin.tie(NULL)!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 대회 코드에서 성능 문제가 있어요. 어디일까요?",
          code: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; i++) {\n        cout << i << endl;\n    }\n    return 0;\n}',
          options: [
            "endl 대신 \"\\n\"을 써야 빨라요",
            "cin.tie(NULL) 때문에 에러가 나요",
            "int 대신 long long을 써야 해요"
          ],
          answer: 0,
          explanation: "반복문 안에서 endl을 쓰면 매번 flush해서 느려요! \"\\n\"으로 바꾸세요!",
          en: {
            question: "This competition code has a performance issue. Where is it?",
            options: [
              "Using endl instead of \"\\n\" makes it slow",
              "cin.tie(NULL) causes an error",
              "Should use long long instead of int"
            ],
            explanation: "Using endl inside a loop flushes the buffer every iteration — use \"\\n\" instead!"
          }
        }
      },

      // Lv.2: \n 출력 연습
      {
        type: "practice",
        content: {
          level: 2,
          task: "빠르게 줄바꿈하며 출력해요!",
          guide: "endl 대신 \"\\n\"을 써요!",
          template: 'cout << n << ___;',
          answer: '"\\n"',
          alternateAnswers: ["'\\n'"],
          expect: 'cout << n << "\\n";',
          en: {
            task: "Output with a fast newline!",
            guide: "Use \"\\n\" instead of endl!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "입출력 최적화 완벽!",
          emoji: "⚡"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "입출력 최적화",
          learned: [
            "#include <bits/stdc++.h> — 만능 헤더 (대회 전용)",
            "ios::sync_with_stdio(false) — C/C++ 동기화 끊기",
            "cin.tie(NULL) — cin/cout 묶음 풀기",
            "endl 대신 \"\\n\" — flush 안 해서 빠름!"
          ],
          canDo: "대회용 Fast I/O 템플릿을 바로 쓸 수 있어요!",
          emoji: "⚡"
        }
      },

      // ==================== CHAPTER 2: 자주 쓰는 패턴 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "자주 쓰는 패턴",
          desc: "typedef, using, 매크로 등 대회에서 자주 쓰는 패턴을 복습해요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 대회용 만능 헤더 기억나요?",
          task: "모든 헤더를 한 번에 포함하는 include를 써봐요!",
          template: "#include <___>",
          answer: "bits/stdc++.h",
          expect: "#include <bits/stdc++.h>",
          en: {
            message: "Quick check! Do you remember the all-in-one competition header?",
            task: "Write the include that brings in all headers at once!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '#define FOR(i, n) for(int i = 0; i < (n); i++)\n#define pb push_back\n#define all(v) (v).begin(), (v).end()\n\nint main() {\n    vector<int> v;\n    FOR(i, 5) v.pb(i);  // add 0,1,2,3,4\n    sort(all(v));        // sort all\n}',
          note: "#define은 코드를 치환해요! pb → push_back으로 바뀜"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: '#define SQ(x) ((x)*(x))\n\ncout << SQ(3) << "\\n";\ncout << SQ(2+1) << "\\n";',
          predict: {
            question: "두 cout의 출력은?",
            options: ["9, 9", "9, 5", "9, 6"],
            answer: 0,
            feedback: "SQ(3) = 3*3 = 9, SQ(2+1) = (2+1)*(2+1) = 9! 괄호가 중요해요!"
          },
          en: {
            predict: {
              question: "What do the two couts print?",
              options: ["9, 9", "9, 5", "9, 6"],
              feedback: "SQ(3) = 3*3 = 9, SQ(2+1) = (2+1)*(2+1) = 9! Parentheses matter!"
            }
          }
        }
      },

      // Lv.2: define 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "push_back을 pb로 줄여봐요!",
          guide: "#define 별명 원래코드 형태!",
          template: "#define ___ push_back",
          answer: "pb",
          expect: "#define pb push_back",
          en: {
            task: "Shorten push_back to pb!",
            guide: "Use the form #define alias original_code!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 매크로의 문제점은?",
          code: '#define SQ(x) x*x\n\ncout << SQ(2+1) << "\\n";\n// expected: 9, actual: ?',
          options: [
            "2+1*2+1 = 5가 돼서 괄호가 필요해요",
            "SQ는 예약어라 매크로 이름으로 못 써요",
            "#define은 함수 대신 쓸 수 없어요"
          ],
          answer: 0,
          explanation: "x*x에서 x가 2+1이면 2+1*2+1 = 5! ((x)*(x))로 괄호를 써야 9가 돼요.",
          en: {
            question: "What is wrong with this macro?",
            options: [
              "2+1*2+1 = 5, so parentheses are needed",
              "SQ is a reserved keyword and cannot be used as a macro name",
              "#define cannot be used instead of a function"
            ],
            explanation: "In x*x, when x is 2+1 it becomes 2+1*2+1 = 5! Use ((x)*(x)) with parentheses to get 9."
          }
        }
      },

      // Lv.2: all 매크로 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터 전체 범위 매크로를 만들어요!",
          guide: "begin()과 end()를 짧게!",
          template: "#define all(v) (v).___(), (v).___() ",
          answer: "begin",
          blanksAnswer: ["begin", "end"],
          expect: "#define all(v) (v).begin(), (v).end()",
          en: {
            task: "Create a macro for the full range of a vector!",
            guide: "Shorten begin() and end()!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "CP 패턴 마스터!",
          emoji: "🧩"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "자주 쓰는 패턴",
          learned: [
            "typedef long long ll — 타입 별명",
            "using vi = vector<int> — 현대적 별명",
            "#define pb push_back — 매크로 줄임",
            "#define all(v) (v).begin(), (v).end()",
            "매크로에서 괄호가 중요!"
          ],
          canDo: "대회에서 자주 쓰는 줄임말과 매크로를 쓸 수 있어요!",
          emoji: "🧩"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "USACO Bronze 풀이 템플릿",
          desc: "USACO Bronze 문제를 풀 때 쓰는 완전한 템플릿을 만들어요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! typedef 기억나요?",
          task: "long long을 ll로 줄이는 코드를 써봐요!",
          template: null,
          answer: "typedef long long ll;",
          alternateAnswers: [
            "typedef long long ll",
            "using ll = long long;",
            "using ll = long long"
          ],
          expect: "typedef long long ll;",
          en: {
            message: "Quick check! Do you remember typedef?",
            task: "Write the code that shortens long long to ll!"
          }
        }
      },

      // 종합 설명
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <bits/stdc++.h>\nusing namespace std;\n\ntypedef long long ll;\ntypedef vector<int> vi;\n#define pb push_back\n#define all(v) (v).begin(), (v).end()\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);\n    freopen("problem.in", "r", stdin);\n    freopen("problem.out", "w", stdout);\n\n    // start solving\n\n    return 0;\n}',
          predict: {
            question: "이 템플릿에서 freopen은 왜 쓰나요?",
            options: [
              "속도를 빠르게 하려고",
              "USACO가 파일 입출력을 요구하니까",
              "cout을 쓰기 위해서"
            ],
            answer: 1,
            feedback: "USACO 문제는 problem.in에서 읽고 problem.out에 써야 해요!"
          },
          en: {
            predict: {
              question: "Why is freopen used in this template?",
              options: [
                "To speed things up",
                "Because USACO requires file I/O",
                "To enable cout"
              ],
              feedback: "USACO problems require reading from problem.in and writing to problem.out!"
            }
          }
        }
      },

      // 프로젝트
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "헤더, namespace, typedef를 써봐요!",
          target: "#include <bits/stdc++.h>\nusing namespace std;\n\ntypedef long long ll;\ntypedef vector<int> vi;\n#define pb push_back\n#define all(v) (v).begin(), (v).end()",
          hint: "bits/stdc++.h + using namespace std + typedef + #define",
          done: [],
          answer: "#include <bits/stdc++.h>\nusing namespace std;\n\ntypedef long long ll;\ntypedef vector<int> vi;\n#define pb push_back\n#define all(v) (v).begin(), (v).end()"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "main 함수와 Fast I/O를 써봐요!",
          target: "int main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);",
          hint: "int main() + ios::sync_with_stdio(false) + cin.tie(NULL)",
          done: ["#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\ntypedef vector<int> vi;\n#define pb push_back\n#define all(v) (v).begin(), (v).end()"],
          answer: "int main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "freopen으로 cow.in/cow.out을 연결하고 마무리해요!",
          target: '    freopen("cow.in", "r", stdin);\n    freopen("cow.out", "w", stdout);\n\n    // 풀이 시작\n\n    return 0;\n}',
          hint: 'freopen("cow.in", "r", stdin) + freopen("cow.out", "w", stdout)',
          done: ["#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\n...", "int main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);"],
          answer: '    freopen("cow.in", "r", stdin);\n    freopen("cow.out", "w", stdout);\n\n    return 0;\n}'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "USACO 템플릿 완성!",
          emoji: "🏆"
        }
      },

      // ==================== CHAPTER 4: 비트 연산 & 심화 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "비트 연산 & 심화",
          desc: "비트 연산과 auto, typedef를 추가로 연습해요!"
        }
      },

      // quiz: what does ios::sync_with_stdio(false) do?
      {
        type: "quiz",
        content: {
          question: "ios::sync_with_stdio(false)를 호출하면 어떻게 되나요?",
          options: [
            "C의 printf/scanf와 C++ cin/cout의 동기화를 끊어서 입출력이 빨라진다",
            "모든 cout 출력이 즉시 화면에 표시된다",
            "cin으로 입력을 받을 수 없게 된다",
            "컴파일 속도가 빨라진다"
          ],
          answer: 0,
          explanation: "기본적으로 C의 stdio와 C++의 iostream은 동기화되어 있어요. sync_with_stdio(false)로 이 연결을 끊으면 cin/cout이 훨씬 빨라져요! 단, 이후에 printf/scanf와 섞어 쓰면 안 돼요.",
          en: {
            question: "What does ios::sync_with_stdio(false) do?",
            options: [
              "It unlinks C stdio and C++ iostream synchronization, making I/O faster",
              "It makes all cout output appear on screen immediately",
              "It disables cin input",
              "It speeds up compilation"
            ],
            explanation: "By default C stdio and C++ iostream are synchronized. Calling sync_with_stdio(false) breaks this link, making cin/cout much faster! However, you must not mix printf/scanf after this."
          }
        }
      },

      // quiz: what is cin.tie(NULL) for?
      {
        type: "quiz",
        content: {
          question: "cin.tie(NULL)의 역할은?",
          options: [
            "cin 입력을 NULL로 초기화한다",
            "cin과 cout의 연결을 끊어 불필요한 flush를 막아준다",
            "cin으로 NULL 값을 받을 수 있게 해준다",
            "입력 버퍼를 비워준다"
          ],
          answer: 1,
          explanation: "기본적으로 cin은 cout과 묶여(tie) 있어서 cin 사용 전 cout을 자동 flush해요. cin.tie(NULL)로 이 연결을 끊으면 불필요한 flush가 없어져 속도가 빨라져요!",
          en: {
            question: "What is cin.tie(NULL) for?",
            options: [
              "It initializes cin input to NULL",
              "It unties cin from cout, preventing unnecessary flushes",
              "It allows cin to receive NULL values",
              "It clears the input buffer"
            ],
            explanation: "By default cin is tied to cout, causing automatic cout flush before each cin. cin.tie(NULL) unties them, removing unnecessary flushes and improving speed!"
          }
        }
      },

      // quiz: what does #include <bits/stdc++.h> include?
      {
        type: "quiz",
        content: {
          question: "#include <bits/stdc++.h>는 무엇을 포함하나요?",
          options: [
            "iostream과 vector만 포함한다",
            "표준 라이브러리의 거의 모든 헤더를 한 번에 포함한다",
            "C 표준 라이브러리만 포함한다",
            "사용자 정의 헤더를 자동으로 찾아서 포함한다"
          ],
          answer: 1,
          explanation: "bits/stdc++.h는 GCC에서 제공하는 비공식 헤더로, iostream/vector/algorithm/map/set 등 거의 모든 표준 헤더를 한 번에 포함해요! 컴파일이 느려지므로 대회에서만 써요.",
          en: {
            question: "What does #include <bits/stdc++.h> include?",
            options: [
              "Only iostream and vector",
              "Almost all standard library headers at once",
              "Only the C standard library",
              "User-defined headers found automatically"
            ],
            explanation: "bits/stdc++.h is an unofficial GCC header that includes nearly all standard headers (iostream, vector, algorithm, map, set, etc.) at once! It slows compilation, so use only in competitive programming."
          }
        }
      },

      // practice: fill in fast I/O lines
      {
        type: "practice",
        content: {
          level: 1,
          task: "Fast I/O를 활성화하는 두 줄을 완성해요! (첫 번째 빈칸)",
          guide: "C/C++ 동기화를 끊는 함수 이름은? (sync_with_stdio)",
          template: "ios::___(false);\ncin.tie(NULL);",
          answer: "sync_with_stdio",
          expect: "ios::sync_with_stdio(false);\ncin.tie(NULL);",
          en: {
            task: "Complete the two lines that enable Fast I/O! (first blank)",
            guide: "What function breaks C/C++ synchronization? (sync_with_stdio)"
          }
        }
      },

      // practice: fill in typedef long long ___
      {
        type: "practice",
        content: {
          level: 1,
          task: "long long을 ll로 줄이는 typedef를 완성해요!",
          guide: "typedef 원래타입 별명; 형태예요!",
          template: "typedef long long ___;",
          answer: "ll",
          expect: "typedef long long ll;",
          en: {
            task: "Complete the typedef that shortens long long to ll!",
            guide: "The form is: typedef original_type alias;"
          }
        }
      },

      // practice: fill in bit AND operator n ___ 1
      {
        type: "practice",
        content: {
          level: 2,
          task: "비트 AND 연산으로 n이 홀수인지 확인해요!",
          guide: "비트 AND 연산자는 & 예요. n의 최하위 비트가 1이면 홀수!",
          template: "if (n ___ 1) {\n    cout << \"홀수\\n\";\n}",
          answer: "&",
          expect: "if (n & 1) {\n    cout << \"홀수\\n\";\n}",
          en: {
            task: "Use bitwise AND to check if n is odd!",
            guide: "The bitwise AND operator is &. If n's lowest bit is 1, it's odd!"
          }
        }
      },

      // errorQuiz: using endl instead of "\n" (performance issue)
      {
        type: "errorQuiz",
        content: {
          question: "이 대회 코드에서 TLE(시간 초과)가 나는 이유는?",
          code: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        cout << i * i << endl;\n    }\n}',
          options: [
            "endl이 매 반복마다 버퍼를 flush해서 느려요 — \"\\n\"으로 바꿔야 해요",
            "ios::sync_with_stdio(false)와 endl을 같이 쓰면 에러가 나요",
            "i * i 연산이 너무 느려서 long long을 써야 해요"
          ],
          answer: 0,
          explanation: "Fast I/O를 설정해도 endl을 쓰면 매번 flush가 발생해서 느려져요! \"\\n\"으로 바꾸면 flush 없이 줄바꿈만 돼요. 대회에서 endl은 쓰지 마세요.",
          en: {
            question: "Why does this competition code get TLE (Time Limit Exceeded)?",
            options: [
              "endl flushes the buffer on every iteration, making it slow — use \"\\n\" instead",
              "Using ios::sync_with_stdio(false) together with endl causes an error",
              "The i * i calculation is too slow and requires long long"
            ],
            explanation: "Even with Fast I/O set up, endl causes a flush every iteration! Using \"\\n\" does only a newline without flushing. Never use endl in competitive programming."
          }
        }
      },

      // predict: bit shift 1 << 3
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << (1 << 3) << "\\n";\n    return 0;\n}',
          predict: {
            question: "1 << 3의 출력 결과는?",
            options: ["8", "3", "6", "4"],
            answer: 0,
            feedback: "1 << 3은 1을 왼쪽으로 3비트 시프트해요. 이진수 0001 → 1000 = 십진수 8이에요! 1 << n은 2의 n승이에요."
          },
          en: {
            predict: {
              question: "What is the output of 1 << 3?",
              options: ["8", "3", "6", "4"],
              feedback: "1 << 3 shifts 1 left by 3 bits. Binary 0001 → 1000 = decimal 8! 1 << n equals 2 to the power of n."
            }
          }
        }
      },

      // predict: n & (n-1) meaning
      {
        type: "explain",
        content: {
          lines: [
            "n & (n-1)은 n의 최하위 1비트를 지우는 연산이에요! 🔢",
            "n이 2의 거듭제곱이면 n & (n-1) == 0이 됩니다."
          ],
          code: '#include <iostream>\nusing namespace std;\nint main() {\n    int n = 8;  // 8 = 1000 (binary)\n    cout << (n & (n-1)) << "\\n";  // 1000 & 0111 = 0000\n    return 0;\n}',
          predict: {
            question: "n=8일 때 n & (n-1)의 출력은?",
            options: ["0", "7", "8", "1"],
            answer: 0,
            feedback: "8은 이진수 1000, 7은 이진수 0111이에요. 1000 & 0111 = 0000 = 0! n이 2의 거듭제곱이면 n & (n-1)은 항상 0이에요."
          },
          en: {
            predict: {
              question: "When n=8, what is the output of n & (n-1)?",
              options: ["0", "7", "8", "1"],
              feedback: "8 is binary 1000, and 7 is binary 0111. 1000 & 0111 = 0000 = 0! When n is a power of 2, n & (n-1) is always 0."
            }
          }
        }
      },

      // interleaving: from cpp-19 (file I/O) — fill in ifstream
      {
        type: "interleaving",
        content: {
          message: "잠깐! cpp-19 파일 입출력 기억나요?",
          task: "input.txt 파일을 읽기 위한 스트림을 선언해요!",
          template: "___ fin(\"input.txt\");",
          answer: "ifstream",
          expect: "ifstream fin(\"input.txt\");",
          en: {
            message: "Quick check! Do you remember file I/O from cpp-19?",
            task: "Declare a stream to read from input.txt!"
          }
        }
      },

      // quiz: what is `auto` used for in modern C++?
      {
        type: "quiz",
        content: {
          question: "현대 C++에서 auto 키워드는 주로 무엇에 사용되나요?",
          options: [
            "자동 메모리 해제",
            "컴파일러가 변수 타입을 초기값으로 자동 추론하게 함",
            "자동으로 헤더를 포함",
            "반복문을 자동으로 최적화"
          ],
          answer: 1,
          explanation: "auto는 컴파일러에게 '타입을 알아서 추론해!'라고 하는 키워드예요. auto x = 3.14;면 x는 double이 되고, for(auto v : vec)에서 v는 vec 원소 타입이 돼요!",
          en: {
            question: "What is the auto keyword primarily used for in modern C++?",
            options: [
              "Automatic memory deallocation",
              "Letting the compiler automatically infer the variable type from the initializer",
              "Automatically including headers",
              "Automatically optimizing loops"
            ],
            explanation: "auto tells the compiler 'infer the type for me!' auto x = 3.14 makes x a double, and in for(auto v : vec), v takes the element type of vec!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "비트 연산 & 심화 완료!",
          emoji: "💡"
        }
      },

      // quiz: typedef long long ll
      {
        type: "quiz",
        content: {
          question: "`typedef long long ll;`을 쓰면 ll은 무엇을 의미하나요?",
          options: [
            "long",
            "long long",
            "long double",
            "long long long"
          ],
          answer: 1,
          explanation: "typedef는 타입 별명을 만들어요. `ll`은 이제 `long long`의 줄임말이에요.",
          en: {
            question: "After writing `typedef long long ll;`, what does `ll` mean?",
            options: [
              "long",
              "long long",
              "long double",
              "long long long"
            ],
            explanation: "typedef creates an alias. `ll` is now shorthand for `long long`."
          }
        }
      },

      // practice Lv.2: fast I/O setup fill-in
      {
        type: "practice",
        content: {
          level: 2,
          task: "빠른 입출력 설정 2줄을 완성해요!",
          guide: "sync_with_stdio(false)와 cin.tie(NULL)을 써요!",
          template: "ios::sync_with_stdio(___);\ncin.tie(___);",
          answer: "false",
          blanksAnswer: ["false", "NULL"],
          expect: "ios::sync_with_stdio(false);\ncin.tie(NULL);",
          en: {
            task: "Complete the 2-line fast I/O setup!",
            guide: "Use sync_with_stdio(false) and cin.tie(NULL)!"
          }
        }
      },

      // errorQuiz: endl in competitive programming
      {
        type: "errorQuiz",
        content: {
          question: "이 코드에서 TLE(시간 초과)가 날 수 있는 이유는?",
          code: 'for (int i = 0; i < 100000; i++) {\n    cout << i << endl;\n}',
          options: [
            "for문이 너무 많이 돌아서",
            "endl이 매번 버퍼를 flush해서 느려서",
            "cout이 느려서"
          ],
          answer: 1,
          explanation: "`endl`은 `'\\n'`과 달리 출력 버퍼를 강제로 flush해요. 반복문 안에서는 `'\\n'`을 써야 빨라요.",
          en: {
            question: "Why might this code get TLE (Time Limit Exceeded)?",
            options: [
              "The for loop iterates too many times",
              "endl flushes the buffer every iteration, making it slow",
              "cout is slow"
            ],
            explanation: "`endl` forcibly flushes the output buffer, unlike `'\\n'`. Use `'\\n'` inside loops to go faster."
          }
        }
      },

      // predict: bit AND operation
      {
        type: "explain",
        content: {
          lines: [],
          code: 'int n = 6;\ncout << (n & 1) << endl;',
          predict: {
            question: "출력 결과는? (6은 이진수로 110)",
            options: ["0", "1", "6", "에러"],
            answer: 0,
            feedback: "6은 이진수 110이에요. &1은 마지막 비트 확인 → 110 & 001 = 000 = 0 (짝수!)"
          },
          en: {
            predict: {
              question: "What is the output? (6 is 110 in binary)",
              options: ["0", "1", "6", "error"],
              feedback: "6 is binary 110. &1 checks the last bit → 110 & 001 = 000 = 0 (even number!)"
            }
          }
        }
      },

      // quiz: what does #include <bits/stdc++.h> do?
      {
        type: "quiz",
        content: {
          question: "`#include <bits/stdc++.h>`를 쓰면?",
          options: [
            "비트 연산만 포함된다",
            "모든 표준 헤더가 한 번에 포함된다",
            "C 라이브러리만 포함된다",
            "컴파일이 더 빨라진다"
          ],
          answer: 1,
          explanation: "대회용 헤더로, iostream/vector/algorithm 등 모든 표준 라이브러리를 한 번에 포함해요. 컴파일은 느려지지만 코드가 짧아져요.",
          en: {
            question: "What happens when you write `#include <bits/stdc++.h>`?",
            options: [
              "Only bitwise operations are included",
              "All standard headers are included at once",
              "Only the C library is included",
              "Compilation becomes faster"
            ],
            explanation: "It's a competition header that includes all standard libraries (iostream, vector, algorithm, etc.) at once. Compilation slows down, but the code gets shorter."
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
