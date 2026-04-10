import { LessonData } from '../types';

export const lessonCpp21: LessonData = {
    id: "cpp-21",
    title: "2차원 배열 & 2D vector",
    description: "격자와 표를 코드로 표현해요!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: C-style 2D 배열 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "C-style 2차원 배열",
          desc: "행과 열로 이루어진 격자를 배워요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "2차원 배열은 표처럼 행(row)과 열(column)로 이루어진 배열이에요! 🗂️",
            "파이썬에서는 리스트 안에 리스트를 쓰지만, C++에서는 int grid[행][열]; 형태예요!"
          ],
          code: '// 파이썬:  grid = [[0, 0, 0], [0, 0, 0]]\n// C++:\nint grid[2][3];  // 2행 3열 배열',
          result: "// 2행, 3열 — 총 6개 칸",
          note: "grid[행][열] — 행(row) 먼저, 열(column) 나중!"
        }
      },

      // 초기화 설명
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int grid[2][3] = {\n        {1, 2, 3},\n        {4, 5, 6}\n    };\n    cout << grid[0][0] << endl;\n    cout << grid[1][2] << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["1\n6", "1\n3", "0\n6", "에러"],
            answer: 0,
            feedback: "grid[0][0]은 0행 0열 = 1, grid[1][2]는 1행 2열 = 6이에요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["1\n6", "1\n3", "0\n6", "Error"],
              feedback: "grid[0][0] is row 0, col 0 = 1; grid[1][2] is row 1, col 2 = 6!"
            }
          }
        }
      },

      // Lv.1: 2D 배열 선언 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "3행 4열짜리 정수 2D 배열을 선언해요!",
          guide: "int 이름[행][열]; 형태예요!",
          template: "int table[___][___];",
          answer: "3",
          blanksAnswer: ["3", "4"],
          expect: "int table[3][4];",
          en: {
            task: "Declare a 3-row 4-column integer 2D array!",
            guide: "Use the form int name[rows][cols]!"
          }
        }
      },

      // Lv.1: 값 접근
      {
        type: "practice",
        content: {
          level: 1,
          task: "grid의 1행 2열 값에 접근해요!",
          guide: "행 먼저, 열 나중! grid[행][열]",
          template: "cout << grid[___][___] << endl;",
          answer: "1",
          blanksAnswer: ["1", "2"],
          expect: "cout << grid[1][2] << endl;",
          en: {
            task: "Access the value at row 1, column 2 of grid!",
            guide: "Row first, column second! grid[row][col]"
          }
        }
      },

      // 퀴즈: 행/열 순서
      {
        type: "quiz",
        content: {
          question: "int grid[3][4]; 에서 grid[2][3]은 몇 번째 행, 몇 번째 열인가요?",
          options: [
            "3번째 행, 4번째 열",
            "3번째 행, 3번째 열",
            "2번째 행, 3번째 열 (0-based: 마지막 행, 마지막 열)",
            "4번째 행, 3번째 열"
          ],
          answer: 2,
          explanation: "인덱스는 0부터 시작해요! grid[2][3]은 0-based로 3번째 행, 4번째 열이지만, 표현상으로는 마지막 행(2)의 마지막 열(3)이에요. grid[3][4]처럼 범위를 넘으면 안 돼요!",
          en: {
            question: "In int grid[3][4];, which row and column is grid[2][3]?",
            options: [
              "3rd row, 4th column",
              "3rd row, 3rd column",
              "2nd row, 3rd column (0-based: last row, last column)",
              "4th row, 3rd column"
            ],
            explanation: "Indices start from 0! grid[2][3] is 0-based 3rd row, 4th column — the last row (2) and last column (3). Never go out of bounds like grid[3][4]!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'int grid[2][3];\ncout << grid[2][0] << endl;',
          options: [
            "grid[2][0]은 범위 밖이에요 (행은 0~1만 가능)",
            "2D 배열 선언이 잘못됐어요",
            "cout 사용법이 틀렸어요"
          ],
          answer: 0,
          explanation: "grid[2][3]이면 행 인덱스는 0, 1만 가능해요! grid[2]는 세 번째 행인데 없어요. 범위 밖 접근은 위험해요!",
          en: {
            question: "What is wrong with this code?",
            options: [
              "grid[2][0] is out of bounds (row indices are only 0 and 1)",
              "The 2D array declaration is wrong",
              "The cout usage is incorrect"
            ],
            explanation: "For int grid[2][3], valid row indices are only 0 and 1! grid[2] would be a third row that doesn't exist. Out-of-bounds access is dangerous!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "C-style 2D 배열 완료!",
          emoji: "🗂️"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "C-style 2차원 배열",
          learned: [
            "int grid[행][열]; — 2D 배열 선언",
            "grid[i][j] — i번째 행, j번째 열 접근",
            "중괄호 중첩으로 초기화: { {행0}, {행1} }",
            "인덱스는 0부터 시작!",
            "범위 밖 접근 주의 (grid[행크기] = 위험)"
          ],
          canDo: "C-style 2D 배열을 선언하고 값에 접근할 수 있어요!",
          emoji: "🗂️"
        }
      },

      // ==================== CHAPTER 2: 2D vector ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "2D vector",
          desc: "크기가 자유로운 2D vector를 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 2D 배열 기억나요?",
          task: "2행 3열짜리 2D 배열을 선언해요!",
          template: "int grid[___][___];",
          answer: "2",
          blanksAnswer: ["2", "3"],
          expect: "int grid[2][3];",
          en: {
            message: "Quick check! Do you remember 2D arrays?",
            task: "Declare a 2-row 3-column 2D array!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "2D vector는 vector 안에 vector를 넣는 형태예요! 🚀",
            "크기를 미리 정할 필요가 없고, 유연하게 쓸 수 있어요.",
            "vector<vector<int>> grid(행, vector<int>(열, 초기값)); 으로 선언해요."
          ],
          code: '#include <vector>\nusing namespace std;\n\n// 3행 4열, 모든 값을 0으로 초기화\nvector<vector<int>> grid(3, vector<int>(4, 0));\n\n// 접근 방법은 C 배열과 동일\ngrid[1][2] = 5;\n// grid[1][2] = 5',
          note: "vector<vector<int>> = 벡터들의 벡터! 크기가 자유로워요."
        }
      },

      // size() 설명 + 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<vector<int>> grid(3, vector<int>(4, 0));\n    cout << grid.size() << endl;\n    cout << grid[0].size() << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["3\n4", "4\n3", "3\n3", "에러"],
            answer: 0,
            feedback: "grid.size() = 행의 수 = 3, grid[0].size() = 열의 수 = 4이에요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["3\n4", "4\n3", "3\n3", "Error"],
              feedback: "grid.size() = number of rows = 3; grid[0].size() = number of columns = 4!"
            }
          }
        }
      },

      // Lv.1: 2D vector 선언
      {
        type: "practice",
        content: {
          level: 1,
          task: "2행 3열짜리 2D vector를 0으로 초기화해요!",
          guide: "vector<vector<int>> 이름(행, vector<int>(열, 0));",
          template: "vector<vector<int>> grid(___, vector<int>(___, 0));",
          answer: "2",
          blanksAnswer: ["2", "3"],
          expect: "vector<vector<int>> grid(2, vector<int>(3, 0));",
          en: {
            task: "Initialize a 2-row 3-column 2D vector with all zeros!",
            guide: "vector<vector<int>> name(rows, vector<int>(cols, 0));"
          }
        }
      },

      // Lv.2: size 사용
      {
        type: "practice",
        content: {
          level: 2,
          task: "2D vector의 행 개수를 출력해요!",
          guide: "행 수 = grid.size()",
          template: 'vector<vector<int>> grid(4, vector<int>(5, 0));\ncout << grid.___() << endl;',
          answer: "size",
          expect: 'vector<vector<int>> grid(4, vector<int>(5, 0));\ncout << grid.size() << endl;',
          en: {
            task: "Print the number of rows in a 2D vector!",
            guide: "number of rows = grid.size()"
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "2D vector에서 열의 수를 구하는 코드는?",
          options: [
            "grid.size()",
            "grid[0].size()",
            "grid.cols()",
            "grid.length()"
          ],
          answer: 1,
          explanation: "grid.size()는 행의 수, grid[0].size()는 첫 번째 행의 크기 = 열의 수예요! .cols()나 .length()는 vector에 없어요.",
          en: {
            question: "What is the code to get the number of columns in a 2D vector?",
            options: [
              "grid.size()",
              "grid[0].size()",
              "grid.cols()",
              "grid.length()"
            ],
            explanation: "grid.size() gives the number of rows; grid[0].size() gives the size of the first row = number of columns! .cols() and .length() don't exist on vector."
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 문제일까요?",
          code: 'vector<vector<int>> grid;\ncout << grid[0][0] << endl;',
          options: [
            "빈 2D vector에서 grid[0][0]을 읽으려 해서 위험해요",
            "vector 선언이 잘못됐어요",
            "cout 사용법이 틀렸어요"
          ],
          answer: 0,
          explanation: "아무 행도 없는 빈 2D vector에서 grid[0]을 접근하면 위험해요! 먼저 크기를 지정해서 초기화해야 해요.",
          en: {
            question: "Why is this code problematic?",
            options: [
              "Accessing grid[0][0] on an empty 2D vector is dangerous",
              "The vector declaration is wrong",
              "The cout usage is incorrect"
            ],
            explanation: "Accessing grid[0] on an empty 2D vector with no rows is dangerous! You must initialize with a specified size first."
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "2D vector 마스터!",
          emoji: "🚀"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "2D vector",
          learned: [
            "vector<vector<int>> grid(r, vector<int>(c, 0)); — r행 c열 초기화",
            "grid[i][j] — i번째 행, j번째 열 접근",
            "grid.size() — 행의 수",
            "grid[0].size() — 열의 수",
            "C 배열보다 유연! 크기를 미리 정하지 않아도 돼요"
          ],
          canDo: "2D vector를 선언하고 크기를 확인할 수 있어요!",
          emoji: "🚀"
        }
      },

      // ==================== CHAPTER 3: 중첩 for문으로 순회 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "중첩 for문으로 순회",
          desc: "격자 전체를 탐색해요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 2D vector 기억나요?",
          task: "5행 6열 2D vector를 0으로 선언해요!",
          template: null,
          answer: "vector<vector<int>> grid(5, vector<int>(6, 0));",
          alternateAnswers: [
            "vector<vector<int>> grid(5, vector<int>(6, 0))"
          ],
          expect: "vector<vector<int>> grid(5, vector<int>(6, 0));",
          en: {
            message: "Quick check! Do you remember 2D vectors?",
            task: "Declare a 5-row 6-column 2D vector initialized to 0!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<vector<int>> grid = {\n        {1, 2, 3},\n        {4, 5, 6}\n    };\n    for (int i = 0; i < grid.size(); i++) {\n        for (int j = 0; j < grid[0].size(); j++) {\n            cout << grid[i][j] << " ";\n        }\n        cout << endl;\n    }\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["1 2 3\n4 5 6", "1 4\n2 5\n3 6", "1 2 3 4 5 6", "에러"],
            answer: 0,
            feedback: "바깥 루프가 행, 안쪽 루프가 열이에요. 행마다 endl로 줄바꿈해서 1 2 3 / 4 5 6 이 돼요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["1 2 3\n4 5 6", "1 4\n2 5\n3 6", "1 2 3 4 5 6", "Error"],
              feedback: "The outer loop iterates over rows, the inner loop over columns. endl after each row gives 1 2 3 / 4 5 6!"
            }
          }
        }
      },

      // Lv.2: 합계 구하기
      {
        type: "practice",
        content: {
          level: 2,
          task: "중첩 for문으로 grid 모든 값의 합을 구해요!",
          guide: "total += grid[i][j]; 패턴!",
          template: 'int total = 0;\nfor (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        total ___ grid[i][j];\n    }\n}',
          answer: "+=",
          expect: 'int total = 0;\nfor (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        total += grid[i][j];\n    }\n}',
          en: {
            task: "Use nested for loops to sum all values in grid!",
            guide: "Use the pattern total += grid[i][j]!"
          }
        }
      },

      // 최대값 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<vector<int>> grid = {\n    {3, 7, 2},\n    {8, 1, 5}\n};\nint maxVal = grid[0][0];\nfor (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        if (grid[i][j] > maxVal) {\n            maxVal = grid[i][j];\n        }\n    }\n}\ncout << maxVal << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["3", "7", "8", "5"],
            answer: 2,
            feedback: "3, 7, 2, 8, 1, 5 중에서 가장 큰 값은 8이에요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["3", "7", "8", "5"],
              feedback: "Among 3, 7, 2, 8, 1, 5 the largest value is 8!"
            }
          }
        }
      },

      // Lv.2: 특정 패턴 채우기
      {
        type: "practice",
        content: {
          level: 2,
          task: "grid[i][j]에 i+j 값을 넣어요! (대각선 패턴)",
          guide: "grid[i][j] = i + j;",
          template: 'vector<vector<int>> grid(3, vector<int>(3, 0));\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        grid[i][j] = ___;\n    }\n}',
          answer: "i + j",
          alternateAnswers: ["i+j"],
          expect: 'vector<vector<int>> grid(3, vector<int>(3, 0));\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        grid[i][j] = i + j;\n    }\n}',
          en: {
            task: "Fill grid[i][j] with the value i+j! (diagonal pattern)",
            guide: "grid[i][j] = i + j;"
          }
        }
      },

      // Lv.2: 2D 그리드 행별로 출력
      {
        type: "practice",
        content: {
          level: 2,
          task: "2D 그리드를 행 단위로 출력해요! (각 행 끝에 줄바꿈)",
          guide: "안쪽 루프에서 값 출력, 행이 끝나면 endl",
          hint: "cout << grid[i][j] << \" \"; 후 안쪽 루프 끝나면 cout << endl;",
          template: 'vector<vector<int>> grid = {{1,2,3},{4,5,6},{7,8,9}};\nfor (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        cout << grid[i][j] << " ";\n    }\n    cout << ___;\n}',
          blanksAnswer: ["endl"],
          answer: 'vector<vector<int>> grid = {{1,2,3},{4,5,6},{7,8,9}};\nfor (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        cout << grid[i][j] << " ";\n    }\n    cout << endl;\n}',
          expect: "1 2 3 \n4 5 6 \n7 8 9 ",
          en: {
            task: "Print a 2D grid row by row! (newline after each row)",
            guide: "Print each value in the inner loop, then endl after the row ends",
            hint: "After cout << grid[i][j], use cout << endl after the inner loop"
          }
        }
      },

      // Lv.2: 2D 배열에서 최댓값 찾기
      {
        type: "practice",
        content: {
          level: 2,
          task: "2D vector에서 최댓값을 찾아서 출력해요!",
          guide: "maxVal을 grid[0][0]으로 초기화 후 모든 원소와 비교",
          hint: "if (grid[i][j] > maxVal) maxVal = grid[i][j];",
          template: 'vector<vector<int>> grid = {{3,7,2},{8,1,5}};\nint maxVal = grid[0][0];\nfor (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        if (grid[i][j] > ___) {\n            maxVal = grid[i][j];\n        }\n    }\n}\ncout << maxVal << endl;',
          blanksAnswer: ["maxVal"],
          answer: 'vector<vector<int>> grid = {{3,7,2},{8,1,5}};\nint maxVal = grid[0][0];\nfor (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        if (grid[i][j] > maxVal) {\n            maxVal = grid[i][j];\n        }\n    }\n}\ncout << maxVal << endl;',
          expect: "8",
          en: {
            task: "Find and print the maximum value in a 2D vector!",
            guide: "Initialize maxVal to grid[0][0], then compare with every element",
            hint: "if (grid[i][j] > maxVal) maxVal = grid[i][j];"
          }
        }
      },

      // Lv.3: 특정 값 개수 세기
      {
        type: "practice",
        content: {
          level: 3,
          task: "2D 그리드에서 5보다 큰 원소가 몇 개인지 세어서 출력해요!",
          guide: "count 변수 선언 → 조건 충족 시 count++",
          hint: "if (grid[i][j] > 5) count++;",
          template: 'vector<vector<int>> grid = {{1,6,3},{9,2,7},{4,8,5}};\nint count = 0;\nfor (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        if (grid[i][j] ___) count++;\n    }\n}\ncout << count << endl;',
          blanksAnswer: ["> 5"],
          alternateAnswers: [">5"],
          answer: 'vector<vector<int>> grid = {{1,6,3},{9,2,7},{4,8,5}};\nint count = 0;\nfor (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        if (grid[i][j] > 5) count++;\n    }\n}\ncout << count << endl;',
          expect: "4",
          en: {
            task: "Count how many elements in the 2D grid are greater than 5!",
            guide: "Declare a count variable → increment when condition is met",
            hint: "if (grid[i][j] > 5) count++;"
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "3행 4열 2D vector를 중첩 for문으로 순회할 때, 안쪽 루프 조건은?",
          options: [
            "j < grid.size()",
            "j < grid[0].size()",
            "j < 3",
            "j < grid[j].size()"
          ],
          answer: 1,
          explanation: "안쪽 루프는 열(column)을 순회해요! 열의 수는 grid[0].size()로 구해요. grid.size()는 행의 수예요.",
          en: {
            question: "When traversing a 3-row 4-column 2D vector with nested for loops, what is the inner loop condition?",
            options: [
              "j < grid.size()",
              "j < grid[0].size()",
              "j < 3",
              "j < grid[j].size()"
            ],
            explanation: "The inner loop traverses columns! The number of columns is grid[0].size(). grid.size() gives the number of rows."
          }
        }
      },

      // 프로젝트 Step 1
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "3행 3열 2D vector를 선언하고 1~9로 채워요!",
          target: "vector<vector<int>> grid(3, vector<int>(3, 0));\nint val = 1;\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        grid[i][j] = val++;\n    }\n}",
          hint: "vector 선언 후 중첩 for문으로 val을 1씩 올리며 채워요!",
          done: ["#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {"],
          answer: "vector<vector<int>> grid(3, vector<int>(3, 0));\nint val = 1;\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        grid[i][j] = val++;\n    }\n}"
        }
      },

      // 프로젝트 Step 2
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "모든 값을 행 단위로 출력해요! (각 행 끝에 줄바꿈)",
          target: "for (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        cout << grid[i][j] << \" \";\n    }\n    cout << endl;\n}",
          hint: "바깥 루프 = 행, 안쪽 루프 = 열, 행 끝에 cout << endl;",
          done: ["#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {", "vector<vector<int>> grid(3, vector<int>(3, 0));\nint val = 1;\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        grid[i][j] = val++;\n    }\n}"],
          answer: "for (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        cout << grid[i][j] << \" \";\n    }\n    cout << endl;\n}"
        }
      },

      // 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "grid의 모든 값의 합계를 구해서 출력해요!",
          target: "int total = 0;\nfor (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        total += grid[i][j];\n    }\n}\ncout << \"합계: \" << total << endl;",
          hint: "int total = 0; 후 중첩 for문으로 total += grid[i][j];",
          done: ["#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {", "vector<vector<int>> grid = {{1,2,3},{4,5,6},{7,8,9}};"],
          answer: "int total = 0;\nfor (int i = 0; i < grid.size(); i++) {\n    for (int j = 0; j < grid[0].size(); j++) {\n        total += grid[i][j];\n    }\n}\ncout << \"합계: \" << total << endl;"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "2차원 배열 & 2D vector 완전 정복!",
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
