import { LessonData } from '../types';

export const lessonCpp19: LessonData = {
    id: "cpp-19",
    title: "파일 I/O & Fast I/O",
    description: "파일 입출력과 빠른 I/O 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: fstream 파일 입출력 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "fstream 파일 입출력",
          desc: "ifstream, ofstream으로 파일을 읽고 써요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "C++에서 파일을 다루려면 <fstream> 헤더가 필요해요!",
            "ifstream = input file stream (파일에서 읽기)",
            "ofstream = output file stream (파일에 쓰기)"
          ],
          code: '#include <fstream>\nusing namespace std;\n\nint main() {\n    ofstream fout("output.txt");\n    fout << "Hello, File!" << endl;\n    fout.close();\n    return 0;\n}',
          result: "output.txt 파일에 \"Hello, File!\" 저장됨",
          note: "ofstream = 파일에 쓰기, ifstream = 파일에서 읽기"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "ifstream으로 파일에서 데이터를 읽어올 수 있어요!",
            "cin처럼 >> 연산자를 써요."
          ],
          code: '#include <fstream>\nusing namespace std;\n\nint main() {\n    ifstream fin("input.txt");\n    int n;\n    fin >> n;\n    cout << "읽은 값: " << n << endl;\n    fin.close();\n    return 0;\n}',
          result: "읽은 값: 42",
          note: "fin >> n 은 cin >> n 과 같은 형태!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: 'ofstream fout("data.txt");\nfout << 100 << " " << 200 << endl;\nfout.close();\n\nifstream fin("data.txt");\nint a, b;\nfin >> a >> b;\ncout << a + b << endl;',
          predict: {
            question: "마지막 cout의 출력은?",
            options: ["100 200", "300", "100200"],
            answer: 1,
            feedback: "fin >> a >> b로 100, 200을 읽고, a + b = 300이 출력돼요!"
          },
          en: {
            predict: {
              question: "What does the last cout print?",
              options: ["100 200", "300", "100200"],
              feedback: "fin >> a >> b reads 100 and 200, then a + b = 300 is printed!"
            }
          }
        }
      },

      // Lv.1: 파일 헤더 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "파일 입출력 헤더를 불러와요!",
          guide: "파일 스트림을 쓰려면 어떤 헤더가 필요할까요?",
          template: "#include <___>",
          answer: "fstream",
          expect: "#include <fstream>",
          en: {
            task: "Include the file I/O header!",
            guide: "What header is needed for file streams?"
          }
        }
      },

      // Lv.1: ofstream 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "파일에 쓰기 위한 스트림을 만들어요!",
          guide: "output file stream의 줄임말이에요!",
          template: '___ fout("output.txt");',
          answer: "ofstream",
          expect: 'ofstream fout("output.txt");',
          en: {
            task: "Create a stream for writing to a file!",
            guide: "It's short for output file stream!"
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "파일에서 데이터를 읽어오는 스트림은?",
          options: ["ofstream", "ifstream", "fstream", "iostream"],
          answer: 1,
          explanation: "ifstream = input file stream! 파일에서 읽어오는 스트림이에요.",
          en: {
            question: "Which stream is used to read data from a file?",
            options: ["ofstream", "ifstream", "fstream", "iostream"],
            explanation: "ifstream = input file stream! It's the stream for reading from a file."
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'ofstream fout("output.txt");\nfout << "Hello!" << endl;\n// 프로그램 계속...',
          options: [
            "fout.close()를 안 해서 파일이 제대로 저장 안 될 수 있음",
            "endl 대신 \\n을 써야 함",
            "ofstream 대신 ifstream을 써야 함"
          ],
          answer: 0,
          explanation: "파일을 다 쓴 후 fout.close()를 호출해야 안전하게 저장돼요!",
          en: {
            question: "What is wrong with this code?",
            options: [
              "Not calling fout.close() may prevent the file from being saved properly",
              "Should use \\n instead of endl",
              "Should use ifstream instead of ofstream"
            ],
            explanation: "After writing to a file, you need to call fout.close() to ensure it is saved safely!"
          }
        }
      },

      // Lv.2: ifstream 읽기 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "파일에서 정수를 읽어와요!",
          guide: "cin >> 처럼 fin >> 을 써요!",
          template: 'ifstream fin("input.txt");\nint n;\n___ >> ___;',
          answer: "fin",
          blanksAnswer: ["fin", "n"],
          expect: 'ifstream fin("input.txt");\nint n;\nfin >> n;',
          en: {
            task: "Read an integer from a file!",
            guide: "Use fin >> just like cin >>!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "파일 입출력 기초 완벽!",
          emoji: "📁"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "fstream 파일 입출력",
          learned: [
            "#include <fstream> — 파일 I/O 헤더",
            "ofstream — 파일에 쓰기 (output)",
            "ifstream — 파일에서 읽기 (input)",
            "<< 로 쓰기, >> 로 읽기 (cout/cin과 같은 형태!)",
            "close()로 파일 닫기!"
          ],
          canDo: "ifstream/ofstream으로 파일을 읽고 쓸 수 있어요!",
          emoji: "📁"
        }
      },

      // ==================== CHAPTER 2: Fast I/O ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "Fast I/O",
          desc: "빠른 입출력으로 시간 초과를 막아요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: "파일 입출력 헤더 이름은?",
          template: "#include <___>",
          answer: "fstream",
          expect: "#include <fstream>",
          en: {
            message: "Quick check! Do you remember what we learned earlier?",
            task: "What is the name of the file I/O header?"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "대회에서 cin/cout이 느려서 시간 초과가 날 수 있어요! 😱",
            "이 두 줄을 main() 첫 부분에 넣으면 훨씬 빨라져요!",
            "이걸 Fast I/O라고 해요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int n;\n    cin >> n;\n    cout << n << "\\n";\n    return 0;\n}',
          result: "(입력한 값이 그대로 출력)",
          note: "Fast I/O 후에는 endl 대신 \"\\n\"을 써야 더 빨라요!"
        }
      },

      // 퀴즈: sync_with_stdio
      {
        type: "quiz",
        content: {
          question: "ios::sync_with_stdio(false)의 역할은?",
          options: [
            "cin/cout을 비활성화한다",
            "C와 C++ 입출력 동기화를 끊어서 속도를 높인다",
            "파일 입출력을 활성화한다",
            "endl을 자동으로 넣어준다"
          ],
          answer: 1,
          explanation: "C의 scanf/printf와 C++의 cin/cout 사이 동기화를 끊어서 cin/cout이 훨씬 빨라져요!",
          en: {
            question: "What does ios::sync_with_stdio(false) do?",
            options: [
              "Disables cin/cout",
              "Breaks the synchronization between C and C++ I/O to speed things up",
              "Enables file input/output",
              "Automatically inserts endl"
            ],
            explanation: "Breaking the sync between C's scanf/printf and C++'s cin/cout makes cin/cout much faster!"
          }
        }
      },

      // 퀴즈: cin.tie
      {
        type: "quiz",
        content: {
          question: "cin.tie(NULL)의 역할은?",
          options: [
            "cin을 비활성화한다",
            "cin과 cout의 묶음을 풀어서 속도를 높인다",
            "cin 대신 scanf를 쓰게 한다",
            "cout의 버퍼를 비운다"
          ],
          answer: 1,
          explanation: "cin.tie(NULL)은 cin과 cout의 연결을 끊어서 불필요한 flush를 막아요!",
          en: {
            question: "What does cin.tie(NULL) do?",
            options: [
              "Disables cin",
              "Unties cin from cout to prevent unnecessary flushes",
              "Makes cin use scanf instead",
              "Clears the cout buffer"
            ],
            explanation: "cin.tie(NULL) unties cin from cout to prevent unnecessary flushes!"
          }
        }
      },

      // Lv.1: Fast I/O 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "C/C++ 동기화를 끊는 코드를 써요!",
          guide: "ios::sync_with_stdio에 false를 넣어요!",
          template: "ios::sync_with_stdio(___);",
          answer: "false",
          expect: "ios::sync_with_stdio(false);",
          en: {
            task: "Write the code that breaks C/C++ synchronization!",
            guide: "Pass false to ios::sync_with_stdio!"
          }
        }
      },

      // Lv.2: cin.tie 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "cin과 cout의 묶음을 풀어요!",
          guide: "cin.tie에 NULL을 넣으면 돼요!",
          template: "cin.tie(___);",
          answer: "NULL",
          alternateAnswers: ["nullptr", "0"],
          expect: "cin.tie(NULL);",
          en: {
            task: "Untie cin from cout!",
            guide: "Pass NULL to cin.tie!"
          }
        }
      },

      // endl vs \n 설명
      {
        type: "explain",
        content: {
          lines: [
            "Fast I/O를 쓸 때 endl은 느려요! 😰",
            "endl은 줄바꿈 + 버퍼 비우기(flush)를 해요.",
            "\"\\n\"은 줄바꿈만 해서 훨씬 빨라요!"
          ],
          code: '// 느림 (버퍼 flush)\ncout << "Hello" << endl;\n\n// 빠름 (줄바꿈만)\ncout << "Hello" << "\\n";',
          note: "대회에서는 항상 \"\\n\"을 쓰세요!"
        }
      },

      // 퀴즈: endl vs \n
      {
        type: "quiz",
        content: {
          question: "대회에서 endl 대신 \"\\n\"을 쓰는 이유는?",
          options: [
            "endl은 에러가 나서",
            "endl은 버퍼를 flush해서 느리니까",
            "\\n이 더 보기 좋아서",
            "endl은 C++20부터 사라져서"
          ],
          answer: 1,
          explanation: "endl은 줄바꿈 + flush를 하지만, \"\\n\"은 줄바꿈만 해서 빨라요!",
          en: {
            question: "Why use \"\\n\" instead of endl in competitive programming?",
            options: [
              "endl causes errors",
              "endl flushes the buffer and is slow",
              "\\n looks better",
              "endl is being removed from C++20"
            ],
            explanation: "endl does newline + flush, but \"\\n\" only does newline — which is faster!"
          }
        }
      },

      // freopen 설명
      {
        type: "explain",
        content: {
          lines: [
            "freopen은 cin/cout을 파일로 바꿔주는 마법이에요! 🪄",
            "USACO처럼 파일 입출력이 필요할 때 아주 편리해요!"
          ],
          code: '#include <cstdio>\nusing namespace std;\n\nint main() {\n    freopen("input.txt", "r", stdin);\n    freopen("output.txt", "w", stdout);\n\n    int n;\n    cin >> n;  // input.txt에서 읽음!\n    cout << n << "\\n";  // output.txt에 씀!\n    return 0;\n}',
          note: "freopen 후에도 cin/cout을 그대로 쓸 수 있어요!"
        }
      },

      // Lv.2: freopen 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "cin이 input.txt에서 읽도록 만들어요!",
          guide: "freopen(파일명, 모드, stdin) 형태!",
          template: 'freopen("input.txt", "___", ___);',
          answer: "r",
          blanksAnswer: ["r", "stdin"],
          expect: 'freopen("input.txt", "r", stdin);',
          en: {
            task: "Make cin read from input.txt!",
            guide: "Use the form freopen(filename, mode, stdin)!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'freopen("output.txt", "r", stdout);',
          options: [
            "output.txt에 쓰려면 \"w\" 모드여야 해요",
            "stdout 대신 stdin을 써야 해요",
            "freopen은 C++에서 못 써요"
          ],
          answer: 0,
          explanation: "출력 파일에는 \"w\"(write) 모드를 써야 해요! \"r\"은 읽기(read) 모드예요.",
          en: {
            question: "What is wrong with this code?",
            options: [
              "Should use \"w\" mode for writing to output.txt",
              "Should use stdin instead of stdout",
              "freopen cannot be used in C++"
            ],
            explanation: "For an output file, use \"w\" (write) mode! \"r\" is for reading (read mode)."
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "Fast I/O 마스터!",
          emoji: "⚡"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "Fast I/O",
          learned: [
            "ios::sync_with_stdio(false) — C/C++ 동기화 끊기",
            "cin.tie(NULL) — cin/cout 묶음 풀기",
            "endl 대신 \"\\n\" — flush 안 해서 빠름!",
            "freopen — cin/cout을 파일로 연결"
          ],
          canDo: "Fast I/O와 freopen으로 빠른 파일 입출력을 할 수 있어요!",
          emoji: "⚡"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "USACO 스타일 파일 입출력",
          desc: "USACO 문제처럼 파일로 입출력하는 프로그램을 만들어요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! Fast I/O 두 줄 기억나요?",
          task: "C/C++ 동기화를 끊는 코드를 써봐요!",
          template: null,
          answer: "ios::sync_with_stdio(false);",
          alternateAnswers: [
            "ios::sync_with_stdio(false)"
          ],
          expect: "ios::sync_with_stdio(false);",
          en: {
            message: "Quick check! Do you remember the two Fast I/O lines?",
            task: "Write the code that breaks C/C++ synchronization!"
          }
        }
      },

      // 종합 설명
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <cstdio>\nusing namespace std;\n\nint main() {\n    freopen("paint.in", "r", stdin);\n    freopen("paint.out", "w", stdout);\n\n    int a, b, c, d;\n    cin >> a >> b >> c >> d;\n    // 문제 풀이...\n    cout << answer << "\\n";\n    return 0;\n}',
          predict: {
            question: "freopen 후 cin은 어디서 읽나요?",
            options: ["키보드", "paint.in 파일", "paint.out 파일"],
            answer: 1,
            feedback: "freopen(\"paint.in\", \"r\", stdin) 후 cin은 paint.in에서 읽어요!"
          },
          en: {
            predict: {
              question: "After freopen, where does cin read from?",
              options: ["Keyboard", "paint.in file", "paint.out file"],
              feedback: "After freopen(\"paint.in\", \"r\", stdin), cin reads from paint.in!"
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
          task: "헤더와 Fast I/O를 세팅해요!",
          target: "#include <iostream>\n#include <cstdio>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);",
          hint: "#include + using namespace std + Fast I/O 두 줄",
          done: [],
          answer: "#include <iostream>\n#include <cstdio>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "freopen으로 fence.in에서 읽고 fence.out에 쓰게 해요!",
          target: '    freopen("fence.in", "r", stdin);\n    freopen("fence.out", "w", stdout);',
          hint: 'freopen("파일명", "모드", stdin/stdout)',
          done: ["#include <iostream>\n#include <cstdio>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);"],
          answer: '    freopen("fence.in", "r", stdin);\n    freopen("fence.out", "w", stdout);'
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "정수 n을 읽고 출력하는 코드를 써봐요!",
          target: '    int n;\n    cin >> n;\n    cout << n << "\\n";\n    return 0;\n}',
          hint: "cin >> n; 으로 읽고 cout << n 으로 출력!",
          done: ["#include <iostream>\n#include <cstdio>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);", '    freopen("fence.in", "r", stdin);\n    freopen("fence.out", "w", stdout);'],
          answer: '    int n;\n    cin >> n;\n    cout << n << "\\n";\n    return 0;\n}'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "USACO 파일 I/O 완성!",
          emoji: "🏆"
        }
      },

      // 예측 퀴즈: ifstream 읽기
      {
        type: "explain",
        content: {
          lines: [],
          code: 'ifstream fin("input.txt");\nint n;\nfin >> n;\ncout << n * 2 << endl;',
          predict: {
            question: "input.txt에 5가 들어있을 때 출력은?",
            options: ["5", "10", "52"],
            answer: 1,
            feedback: "fin >> n으로 5를 읽고, n * 2 = 10이 출력돼요!"
          },
          en: {
            predict: {
              question: "If input.txt contains 5, what is the output?",
              options: ["5", "10", "52"],
              feedback: "fin >> n reads 5, then n * 2 = 10 is printed!"
            }
          }
        }
      },

      // 에러 퀴즈: 파일 열기 확인
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'ifstream fin("data.txt");\ncout << fin.get() << endl;',
          options: [
            "파일이 없어도 에러 없이 실행된다",
            "fin.is_open()으로 확인 안 해서 문제가 생길 수 있다",
            "get()은 ifstream에 못 써서"
          ],
          answer: 1,
          explanation: "파일을 열기 전에 fin.is_open()으로 파일이 제대로 열렸는지 확인해야 해요!",
          en: {
            question: "What is wrong with this code?",
            options: [
              "It runs without error even if the file doesn't exist",
              "Not checking fin.is_open() can cause issues",
              "get() cannot be used with ifstream"
            ],
            explanation: "Always check fin.is_open() to verify the file was opened successfully before reading!"
          }
        }
      },

      // 퀴즈: ofstream
      {
        type: "quiz",
        content: {
          question: "ofstream이 하는 일은?",
          options: [
            "파일에서 읽어온다",
            "파일에 쓴다",
            "파일을 삭제한다",
            "파일 크기를 반환한다"
          ],
          answer: 1,
          explanation: "ofstream = output file stream! 파일에 데이터를 쓸 때 사용해요.",
          en: {
            question: "What does ofstream do?",
            options: [
              "Reads from a file",
              "Writes to a file",
              "Deletes a file",
              "Returns the file size"
            ],
            explanation: "ofstream = output file stream! It is used to write data to a file."
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
