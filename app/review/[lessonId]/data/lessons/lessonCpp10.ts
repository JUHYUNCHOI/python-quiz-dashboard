import { LessonData } from '../types';

export const lessonCpp10: LessonData = {
    id: "cpp-10",
    title: "Range-for & auto",
    description: "범위 기반 for와 auto 키워드 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: Range-based for ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "Range-based for",
          desc: "파이썬처럼 깔끔한 for 루프를 배워요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "C++에도 파이썬의 for x in list 같은 문법이 있어요! 🎯",
            "for (타입 변수 : 컨테이너) 형태예요."
          ],
          code: '// 파이썬:  for x in [1, 2, 3]:\n//              print(x)\n// C++:\nvector<int> v = {1, 2, 3};\nfor (int x : v) {\n    cout << x << endl;\n}',
          result: "1\n2\n3",
          note: "for (int x : v) = \"v의 각 원소를 x에 넣어서 반복!\""
        }
      },

      // 기존 for vs range-for 비교
      {
        type: "explain",
        content: {
          lines: [
            "기존 for 루프와 range-for를 비교해봐요!",
            "range-for가 훨씬 깔끔하죠?"
          ],
          code: 'vector<int> v = {10, 20, 30};\n\n// 기존 for:\nfor (int i = 0; i < v.size(); i++) {\n    cout << v[i] << " ";\n}\n\n// range-for (같은 결과!):\nfor (int x : v) {\n    cout << x << " ";\n}',
          result: "10 20 30",
          note: "인덱스가 필요 없으면 range-for가 더 좋아요!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "range-for는 배열에도 쓸 수 있어요!",
            "vector뿐만 아니라 C 배열에서도 동작해요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[4] = {5, 10, 15, 20};\n    int sum = 0;\n    for (int x : arr) {\n        sum += x;\n    }\n    cout << sum << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["50", "20", "15", "4"],
            answer: 0,
            feedback: "5 + 10 + 15 + 20 = 50! range-for로 모든 원소를 더했어요."
          }
        }
      },

      // Lv.1: range-for 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "range-for의 콜론을 채워요!",
          guide: "for (타입 변수 : 컨테이너) 형태!",
          template: "for (int x ___ v) {",
          answer: ":",
          expect: "for (int x : v) {"
        }
      },

      // Lv.1: range-for 변수 타입
      {
        type: "practice",
        content: {
          level: 1,
          task: "정수 벡터를 순회하는 range-for를 완성해요!",
          guide: "벡터가 int이면 변수도 int!",
          template: "for (___ x : nums) {",
          answer: "int",
          expect: "for (int x : nums) {"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "range-for는 파이썬의 어떤 문법과 비슷할까요?",
          options: [
            "while True:",
            "for i in range(10):",
            "for x in list:",
            "if x in list:"
          ],
          answer: 2,
          explanation: "for (int x : v)는 파이썬의 for x in list:와 같아요! 각 원소를 하나씩 꺼내서 반복해요."
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'vector<int> v = {1, 2, 3};\nfor (string x : v) {\n    cout << x << endl;\n}',
          options: [
            "v는 int인데 x를 string으로 받아서 타입 불일치",
            "range-for에서는 string을 못 써요",
            "콜론(:) 대신 세미콜론(;)을 써야 해요"
          ],
          answer: 0,
          explanation: "vector<int>의 원소는 int인데 string으로 받으면 타입이 안 맞아요! int x로 써야 해요."
        }
      },

      // Lv.2: range-for로 출력
      {
        type: "practice",
        content: {
          level: 2,
          task: "range-for로 벡터의 모든 값을 출력해요!",
          guide: "for (int x : v) { cout << x; }",
          template: 'for (___ x ___ v) {\n    cout << x << " ";\n}',
          answer: "int",
          blanksAnswer: ["int", ":"],
          expect: 'for (int x : v) {\n    cout << x << " ";\n}'
        }
      },

      // range-for 문자열 벡터
      {
        type: "quiz",
        content: {
          question: 'vector<string> names = {"A", "B"}; 를 range-for로 순회하려면?',
          options: [
            "for (int x : names)",
            "for (string x : names)",
            "for (char x : names)",
            "for (names : string x)"
          ],
          answer: 1,
          explanation: "벡터의 타입이 string이면 변수도 string으로 받아야 해요!"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "range-for 완벽!",
          emoji: "🔄"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "Range-based for",
          learned: [
            "for (int x : v) — v의 각 원소를 x에 넣어 반복",
            "파이썬 for x in list: 와 같은 개념!",
            "배열, vector 모두 사용 가능",
            "변수 타입 = 컨테이너 원소 타입",
            "인덱스 필요 없으면 기존 for보다 깔끔!"
          ],
          canDo: "range-for로 배열과 벡터를 깔끔하게 순회할 수 있어요!",
          emoji: "🔄"
        }
      },

      // ==================== CHAPTER 2: auto 키워드 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "auto 키워드",
          desc: "타입을 자동으로 추론하는 auto를 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! range-for 기억나요?",
          task: "정수 벡터 v를 range-for로 순회하는 코드의 빈칸을 채워요!",
          template: "for (int x ___ v) {",
          answer: ":",
          expect: "for (int x : v) {"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "auto를 쓰면 컴파일러가 타입을 알아서 추론해요! 🤖",
            "파이썬처럼 타입을 직접 안 써도 돼요."
          ],
          code: 'auto x = 42;          // int로 추론\nauto pi = 3.14;       // double로 추론\nauto name = "hello"s; // string으로 추론\n\n// range-for에서도 쓸 수 있어요!\nvector<int> v = {1, 2, 3};\nfor (auto x : v) {\n    cout << x << endl;\n}',
          note: "auto = \"타입은 컴파일러한테 맡길게!\"  (파이썬의 기본 동작과 비슷!)"
        }
      },

      // auto 타입 예측
      {
        type: "explain",
        content: {
          lines: [
            "auto는 오른쪽 값을 보고 타입을 결정해요!",
            "컴파일러가 타입을 추론하는 거예요."
          ],
          code: 'auto a = 10;       // int\nauto b = 3.14;     // double\nauto c = "hello";  // const char*\ncout << a + b << endl;',
          predict: {
            question: "a + b 의 결과는?",
            options: ["13", "13.14", "에러", "1013.14"],
            answer: 1,
            feedback: "int 10 + double 3.14 = double 13.14! auto는 각각 int, double로 추론했어요."
          }
        }
      },

      // auto& 참조 설명
      {
        type: "explain",
        content: {
          lines: [
            "auto&를 쓰면 원본을 직접 수정할 수 있어요! ✏️",
            "& 없이 auto만 쓰면 복사본이라 원본이 안 바뀌어요."
          ],
          code: 'vector<int> v = {1, 2, 3};\n\n// auto (복사) — 원본 안 바뀜\nfor (auto x : v) {\n    x = x * 2;  // 복사본만 바뀜!\n}\n// v = {1, 2, 3} 그대로\n\n// auto& (참조) — 원본 바뀜!\nfor (auto& x : v) {\n    x = x * 2;  // 원본이 바뀜!\n}\n// v = {2, 4, 6}',
          note: "auto = 복사 (읽기용) / auto& = 참조 (수정용)"
        }
      },

      // Lv.1: auto 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "auto로 range-for를 써봐요!",
          guide: "int 대신 auto를 써요!",
          template: "for (___ x : v) {",
          answer: "auto",
          expect: "for (auto x : v) {"
        }
      },

      // auto& 퀴즈
      {
        type: "quiz",
        content: {
          question: "for (auto& x : v) 에서 &의 역할은?",
          options: [
            "주소를 출력한다",
            "원본을 직접 수정할 수 있게 해준다",
            "타입을 문자열로 바꾼다",
            "벡터를 정렬한다"
          ],
          answer: 1,
          explanation: "&는 참조! 원본 벡터의 값을 직접 수정할 수 있어요. & 없으면 복사본이라 원본이 안 바뀌어요."
        }
      },

      // auto& 예측
      {
        type: "explain",
        content: {
          lines: [
            "auto&로 벡터의 모든 값을 2배로 만들어봐요!"
          ],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3};\n    for (auto& x : v) {\n        x = x * 2;\n    }\n    for (auto x : v) {\n        cout << x << " ";\n    }\n    cout << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["1 2 3", "2 4 6", "1 4 9", "에러"],
            answer: 1,
            feedback: "auto&로 원본을 수정해서 모든 값이 2배! {1,2,3} → {2,4,6}"
          }
        }
      },

      // Lv.2: auto& 수정
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터의 모든 값에 10을 더하는 코드를 완성해요!",
          guide: "원본을 수정하려면 & 가 필요해요!",
          template: "for (___& x : v) {\n    x = x + 10;\n}",
          answer: "auto",
          expect: "for (auto& x : v) {\n    x = x + 10;\n}"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'vector<int> v = {1, 2, 3};\nfor (auto x : v) {\n    x = x * 10;\n}\ncout << v[0] << endl;  // 기대: 10',
          options: [
            "auto는 복사라서 원본 v가 안 바뀌어요 (v[0]은 여전히 1)",
            "auto 대신 int를 써야 해요",
            "x = x * 10 문법이 틀렸어요"
          ],
          answer: 0,
          explanation: "auto는 복사본이에요! 원본을 바꾸려면 auto& x 로 써야 해요. 지금은 v[0]이 여전히 1이에요."
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "auto 키워드 마스터!",
          emoji: "🤖"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "auto 키워드",
          learned: [
            "auto = 컴파일러가 타입을 알아서 추론",
            "for (auto x : v) — 읽기용 (복사)",
            "for (auto& x : v) — 수정용 (참조)",
            "& 없으면 원본 안 바뀌고, & 있으면 원본 바뀜!",
            "파이썬은 기본이 참조, C++은 기본이 복사!"
          ],
          canDo: "auto와 auto&로 깔끔하게 벡터를 순회하고 수정할 수 있어요!",
          emoji: "🤖"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 벡터 통계",
          desc: "range-for와 auto로 합계, 평균, 최댓값을 구해요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! auto&로 원본 수정하는 법 기억나요?",
          task: "벡터의 모든 값을 2배로 만드는 for 문의 빈칸을 채워요!",
          template: "for (auto___ x : v) {\n    x = x * 2;\n}",
          answer: "&",
          expect: "for (auto& x : v) {\n    x = x * 2;\n}"
        }
      },

      // 최댓값 예측
      {
        type: "explain",
        content: {
          lines: [
            "range-for로 최댓값을 구하는 방법이에요!",
            "첫 번째 값을 max로 두고, 더 큰 값이 나오면 갱신해요."
          ],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {30, 10, 50, 20};\n    int maxVal = v[0];\n    for (auto x : v) {\n        if (x > maxVal) {\n            maxVal = x;\n        }\n    }\n    cout << maxVal << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["30", "10", "50", "20"],
            answer: 2,
            feedback: "30→30, 10<30 패스, 50>30 갱신, 20<50 패스 → 최댓값은 50!"
          }
        }
      },

      // 프로젝트 Step 1: 합계
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "range-for로 벡터의 합계를 구해요!",
          target: "int total = 0;\nfor (auto x : scores) {\n    total += x;\n}\ncout << \"합계: \" << total << endl;",
          hint: "int total = 0; 후 for (auto x : scores) { total += x; }",
          done: ["#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {90, 85, 70, 95, 80};"],
          answer: "int total = 0;\nfor (auto x : scores) {\n    total += x;\n}\ncout << \"합계: \" << total << endl;"
        }
      },

      // 프로젝트 Step 2: 평균
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "합계를 이용해서 평균을 출력해요!",
          target: 'cout << "평균: " << total / scores.size() << endl;',
          hint: "합계 / 개수 = 평균!",
          done: ["#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {90, 85, 70, 95, 80};", "int total = 0;\nfor (auto x : scores) {\n    total += x;\n}"],
          answer: 'cout << "평균: " << total / scores.size() << endl;'
        }
      },

      // 프로젝트 Step 3: 최댓값
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "range-for로 최댓값을 구해서 출력해요!",
          target: "int maxVal = scores[0];\nfor (auto x : scores) {\n    if (x > maxVal) maxVal = x;\n}\ncout << \"최댓값: \" << maxVal << endl;",
          hint: "int maxVal = scores[0]; 후 for로 비교!",
          done: ["#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {90, 85, 70, 95, 80};", "int total = 0;\nfor (auto x : scores) {\n    total += x;\n}\ncout << \"합계: \" << total << endl;\ncout << \"평균: \" << total / scores.size() << endl;"],
          answer: "int maxVal = scores[0];\nfor (auto x : scores) {\n    if (x > maxVal) maxVal = x;\n}\ncout << \"최댓값: \" << maxVal << endl;"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "벡터 통계 프로그램 완성!",
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
