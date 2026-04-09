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
          lines: [
            "대회에서 가장 먼저 치는 코드가 있어요!",
            "이걸 '템플릿(template)'이라고 해요. 매번 복사해서 써요!"
          ],
          code: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    // 여기서부터 풀이 시작!\n\n    return 0;\n}',
          note: "bits/stdc++.h = 모든 헤더를 한 번에 포함! (대회 전용)"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "bits/stdc++.h는 iostream, vector, algorithm 등을 전부 포함해요!",
            "대회에서만 쓰고, 실제 프로젝트에서는 안 써요."
          ],
          code: '#include <bits/stdc++.h>  // 이것 하나면 끝!\n// 아래 전부 필요 없음:\n// #include <iostream>\n// #include <vector>\n// #include <algorithm>\n// #include <map>',
          predict: {
            question: "bits/stdc++.h를 실제 프로젝트에서도 쓸까요?",
            options: ["네, 항상 써요", "아니요, 대회에서만 써요", "C++20부터 사라졌어요"],
            answer: 1,
            feedback: "bits/stdc++.h는 컴파일이 느려서 대회에서만 써요! 실제 프로젝트에서는 필요한 헤더만 포함해요."
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
          lines: [
            "대회에서 long long을 자주 쓰는데, 너무 길어요!",
            "typedef나 using으로 줄여서 쓸 수 있어요."
          ],
          code: '// 방법 1: typedef\ntypedef long long ll;\ntypedef vector<int> vi;\ntypedef pair<int,int> pii;\n\n// 방법 2: using (더 현대적)\nusing ll = long long;\nusing vi = vector<int>;\nusing pii = pair<int,int>;',
          note: "ll, vi, pii는 대회에서 아주 자주 쓰는 줄임말이에요!"
        }
      },

      // 퀴즈: typedef
      {
        type: "quiz",
        content: {
          question: "typedef long long ll; 이후에 ll n; 은 무슨 뜻일까요?",
          options: [
            "long n; 과 같다",
            "long long n; 과 같다",
            "int n; 과 같다",
            "에러가 난다"
          ],
          answer: 1,
          explanation: "typedef long long ll; 은 ll을 long long의 별명으로 만들어요! ll n = long long n;",
          en: {
            question: "After typedef long long ll;, what does ll n; mean?",
            options: [
              "Same as long n;",
              "Same as long long n;",
              "Same as int n;",
              "Causes an error"
            ],
            explanation: "typedef long long ll; creates ll as an alias for long long! ll n = long long n"
          }
        }
      },

      // Lv.1: typedef 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "long long을 ll로 줄여봐요!",
          guide: "typedef 원래타입 별명; 형태!",
          template: "typedef long long ___;",
          answer: "ll",
          expect: "typedef long long ll;",
          en: {
            task: "Shorten long long to ll!",
            guide: "Use the form typedef original_type alias!"
          }
        }
      },

      // 매크로 설명
      {
        type: "explain",
        content: {
          lines: [
            "#define으로 자주 쓰는 코드를 매크로로 만들어요!",
            "FOR문, MIN/MAX 등을 줄여서 쓸 수 있어요."
          ],
          code: '#define FOR(i, n) for(int i = 0; i < (n); i++)\n#define pb push_back\n#define all(v) (v).begin(), (v).end()\n\nint main() {\n    vector<int> v;\n    FOR(i, 5) v.pb(i);  // 0,1,2,3,4 추가\n    sort(all(v));        // 전체 정렬\n}',
          note: "#define은 코드를 치환해요! pb → push_back으로 바뀜"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "#define은 단순 텍스트 치환이에요!",
            "컴파일 전에 바뀌어요."
          ],
          code: '#define SQ(x) ((x)*(x))\n\ncout << SQ(3) << "\\n";\ncout << SQ(2+1) << "\\n";',
          predict: {
            question: "두 cout의 출력은?",
            options: ["9, 9", "9, 5", "9, 6"],
            answer: 0,
            feedback: "SQ(3) = 3*3 = 9, SQ(2+1) = (2+1)*(2+1) = 9! 괄호가 중요해요!"
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
          code: '#define SQ(x) x*x\n\ncout << SQ(2+1) << "\\n";\n// 기대: 9, 실제: ?',
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
          lines: [
            "이제 USACO Bronze 문제를 풀 때 쓸 완전한 템플릿을 만들어요!",
            "이 템플릿만 외우면 바로 문제 풀이에 집중할 수 있어요!"
          ],
          code: '#include <bits/stdc++.h>\nusing namespace std;\n\ntypedef long long ll;\ntypedef vector<int> vi;\n#define pb push_back\n#define all(v) (v).begin(), (v).end()\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);\n    freopen("problem.in", "r", stdin);\n    freopen("problem.out", "w", stdout);\n\n    // 풀이 시작\n\n    return 0;\n}',
          predict: {
            question: "이 템플릿에서 freopen은 왜 쓰나요?",
            options: [
              "속도를 빠르게 하려고",
              "USACO가 파일 입출력을 요구하니까",
              "cout을 쓰기 위해서"
            ],
            answer: 1,
            feedback: "USACO 문제는 problem.in에서 읽고 problem.out에 써야 해요!"
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

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
