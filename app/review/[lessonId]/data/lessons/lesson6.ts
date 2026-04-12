import { LessonData } from '../types';

export const lesson6: LessonData = {
    id: "6",
    title: "문자열 메서드",
    description: "문자열을 마음대로 다루기!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "문자열 정리 도구",
          desc: "대소문자, 공백, 찾기까지!"
        }
      },

      // 프리뷰
      {
        type: "explain",
        content: {
          lines: [
            "🛠️ 오늘 만들 것!"
          ],
          code: "original: '  Hello, World!  '\nuppercase: 'HELLO, WORLD!'\nlowercase: 'hello, world!'\ntrimmed: 'Hello, World!'\nreplaced: 'Hello, Python!'",
          isPreview: true,
          note: "메서드로 문자열을 자유자재로!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "메서드란? 문자열이 가진 기능들!"
          ],
          code: "text.upper()         → uppercase\ntext.lower()         → lowercase\ntext.strip()         → remove spaces\ntext.replace('a','b')→ replace",
          isPreview: true,
          note: "text.메서드() 형태로 사용!"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "문자열 메서드 시작!",
          emoji: "🛠️"
        }
      },

      // ==================== CHAPTER 2: 대소문자 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "대소문자 변환",
          desc: "upper()와 lower()!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 문자열 이어붙이기 기억나?",
          task: "'Hello' + ' ' + 'World' 출력해봐",
          template: null,
          answer: "print('Hello' + ' ' + 'World')",
          expect: "Hello World",
          en: {
            message: "Wait! Remember string concatenation?",
            task: "Print 'Hello' + ' ' + 'World'"
          }
        }
      },

      // upper()
      {
        type: "explain",
        content: {
          lines: [
            "upper() = 모두 대문자로!"
          ],
          code: "text = 'hello'\nprint(text.upper())  → 'HELLO'\n\n'python'.upper()  → 'PYTHON'",
          note: ".upper() 를 붙이면 대문자로 변환!"
        }
      },

      // ===== Lv.1: upper() =====
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\nHELLO WORLD",
          guide: ".upper() 사용!",
          hint: "print('hello world'.upper())",
          template: null,
          answer: "print('hello world'.upper())",
          expect: "HELLO WORLD",
          en: {
            task: "Make it print like this ↓\nHELLO WORLD",
            guide: "Use .upper()!",
            hint: "print('hello world'.upper())"
          }
        }
      },

      // lower()
      {
        type: "explain",
        content: {
          lines: [
            "lower() = 모두 소문자로!"
          ],
          code: "text = 'PYTHON'\nprint(text.lower())  → 'python'\n\n'Hello World'.lower() → 'hello world'",
          note: ".lower() 를 붙이면 소문자로 변환!"
        }
      },

      // ===== Lv.1: lower() =====
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\nhello world",
          guide: ".lower() 사용!",
          hint: "print('HELLO WORLD'.lower())",
          template: null,
          answer: "print('HELLO WORLD'.lower())",
          expect: "hello world",
          en: {
            task: "Make it print like this ↓\nhello world",
            guide: "Use .lower()!",
            hint: "print('HELLO WORLD'.lower())"
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "'Python'.upper() 의 결과는?",
          options: [
            "'PYTHON'",
            "'python'",
            "'Python' (변화 없음)"
          ],
          answer: 0,
          explanation: "upper()는 모든 글자를 대문자로 바꿔! 'Python' → 'PYTHON'",
          en: {
            question: "What is the result of 'Python'.upper()?",
            options: [
              "'PYTHON'",
              "'python'",
              "'Python' (no change)"
            ],
            explanation: "upper() converts all letters to uppercase! 'Python' → 'PYTHON'"
          }
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "대소문자 변환",
          learned: [
            ".upper() → 모두 대문자",
            ".lower() → 모두 소문자",
            "원본 문자열은 변하지 않음"
          ],
          canDo: "문자열을 대소문자로 변환할 수 있어!",
          emoji: "🔡"
        }
      },

      // ==================== CHAPTER 3: strip()과 replace() ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "공백 제거와 치환",
          desc: "strip()과 replace()!"
        }
      },

      // strip()
      {
        type: "explain",
        content: {
          lines: [
            "strip() = 앞뒤 공백 제거!"
          ],
          code: "text = '  Hello  '\nprint(text.strip())  → 'Hello'\n\n'  Python  '.strip()  → 'Python'",
          note: "앞뒤 공백만 제거! 중간 공백은 그대로."
        }
      },

      // ===== Lv.1: strip() =====
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\n코딩",
          guide: ".strip() 사용!",
          hint: "print('  코딩  '.strip())",
          template: null,
          answer: "print('  코딩  '.strip())",
          expect: "코딩",
          en: {
            task: "Make it print like this ↓\n코딩",
            guide: "Use .strip()!",
            hint: "print('  코딩  '.strip())"
          }
        }
      },

      // replace()
      {
        type: "explain",
        content: {
          lines: [
            "replace() = 문자열 치환!"
          ],
          code: "text = 'Hello, World!'\nprint(text.replace('World', 'Python'))\n→ 'Hello, Python!'\n\n'aabbcc'.replace('b', 'X') → 'aaXXcc'",
          note: "replace('찾을것', '바꿀것') 형태!"
        }
      },

      // ===== Lv.1: replace() =====
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\n나는 강아지",
          guide: ".replace('고양이', '강아지') 사용!",
          hint: "print('나는 고양이'.replace('고양이', '강아지'))",
          template: null,
          answer: "print('나는 고양이'.replace('고양이', '강아지'))",
          expect: "나는 강아지",
          en: {
            task: "Make it print like this ↓\n나는 강아지",
            guide: "Use .replace('고양이', '강아지')!",
            hint: "print('나는 고양이'.replace('고양이', '강아지'))"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 결과는?",
          code: "text = '  Python  '\nresult = text.strip()\nprint(result)",
          options: [
            "'Python' (앞뒤 공백 제거됨)",
            "'  Python  ' (원본 그대로)",
            "에러"
          ],
          answer: 0,
          explanation: "strip()은 앞뒤 공백을 제거하고 결과를 반환해. result에 저장했으니 'Python'이 출력돼!",
          en: {
            question: "What is the result of this code?",
            options: [
              "'Python' (leading/trailing spaces removed)",
              "'  Python  ' (original unchanged)",
              "Error"
            ],
            explanation: "strip() removes leading/trailing spaces and returns the result. We stored it in result so 'Python' is printed!"
          }
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "strip()과 replace()",
          learned: [
            ".strip() → 앞뒤 공백 제거",
            ".replace('a', 'b') → a를 b로 치환",
            "모든 메서드는 새 문자열 반환"
          ],
          canDo: "문자열의 공백을 제거하고 원하는 부분을 바꿀 수 있어!",
          emoji: "✂️"
        }
      },

      // ==================== CHAPTER 4: len()과 find() ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "길이와 위치 찾기",
          desc: "len()과 find()!"
        }
      },

      // len()
      {
        type: "explain",
        content: {
          lines: [
            "len() = 문자열 길이!"
          ],
          code: "len('Hello')      → 5\nlen('Python')     → 6\nlen('Hi there')   → 8\nlen('')          → 0",
          note: "공백도 글자 수에 포함돼!"
        }
      },

      // ===== len() 직접 써보기 =====
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\n6",
          guide: "len('Python') 출력!",
          hint: "print(len('Python'))",
          template: null,
          answer: "print(len('Python'))",
          expect: "6",
          en: {
            task: "Make it print like this ↓\n6",
            guide: "Print len('Python')!",
            hint: "print(len('Python'))"
          }
        }
      },
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\n11",
          guide: "'Hello World' 길이 — 공백도 포함!",
          template: null,
          answer: "print(len('Hello World'))",
          expect: "11",
          en: {
            task: "Make it print like this ↓\n11",
            guide: "Length of 'Hello World' — space counts too!"
          }
        }
      },

      // find()
      {
        type: "explain",
        content: {
          lines: [
            "find() = 위치 찾기!"
          ],
          code: "text = 'Hello'\ntext.find('e')   → 1  (index 1)\ntext.find('l')   → 2  (first occurrence)\ntext.find('z')   → -1 (not found = -1)",
          note: "위치는 0부터 시작! 없으면 -1 반환."
        }
      },

      // ===== find() 직접 써보기 =====
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\n1",
          guide: "'Python'에서 'y' 위치 찾기!",
          hint: "print('Python'.find('y'))",
          template: null,
          answer: "print('Python'.find('y'))",
          expect: "1",
          en: {
            task: "Make it print like this ↓\n1",
            guide: "Find position of 'y' in 'Python'!",
            hint: "print('Python'.find('y'))"
          }
        }
      },
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\n-1",
          guide: "'Hello'에서 없는 글자 'z' 찾기!",
          template: null,
          answer: "print('Hello'.find('z'))",
          expect: "-1",
          en: {
            task: "Make it print like this ↓\n-1",
            guide: "Find a character 'z' that doesn't exist in 'Hello'!"
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "len('Hello World') 의 결과는?",
          options: [
            "10 (공백 제외)",
            "11 (공백 포함)",
            "9 (알파벳만)"
          ],
          answer: 1,
          explanation: "len()은 공백도 글자로 세! 'Hello World' = H+e+l+l+o+' '+W+o+r+l+d = 11",
          en: {
            question: "What is the result of len('Hello World')?",
            options: [
              "10 (excluding space)",
              "11 (including space)",
              "9 (letters only)"
            ],
            explanation: "len() counts spaces too! 'Hello World' = H+e+l+l+o+' '+W+o+r+l+d = 11"
          }
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "len()과 find()",
          learned: [
            "len(text) → 문자열 길이",
            "text.find('x') → 위치 (0부터)",
            "없으면 -1 반환"
          ],
          canDo: "문자열의 길이를 재고 원하는 글자의 위치를 찾을 수 있어!",
          emoji: "🔍"
        }
      },

      // ==================== CHAPTER 5: 메서드 체이닝 & 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "문자열 정리 도구 만들기",
          desc: "메서드 조합 활용!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "replace() 기억나?",
          task: "'I like cats' 에서 'cats' 를 'dogs' 로 바꿔서 출력해봐",
          template: null,
          answer: "print('I like cats'.replace('cats', 'dogs'))",
          expect: "I like dogs",
          en: {
            message: "Remember replace()?",
            task: "Replace 'cats' with 'dogs' in 'I like cats' and print it"
          }
        }
      },

      // 메서드 체이닝
      {
        type: "explain",
        content: {
          lines: [
            "메서드를 이어서 사용할 수 있어!"
          ],
          code: "text = '  hello world  '\nresult = text.strip().upper()\nprint(result)  → 'HELLO WORLD'",
          note: ".strip().upper() 처럼 이어서 연결!"
        }
      },

      // ===== Lv.2: 체이닝 =====
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\nPYTHON",
          guide: ".strip().upper() 체이닝!",
          hint: "print('  python  '.strip().upper())",
          template: null,
          answer: "print('  python  '.strip().upper())",
          expect: "PYTHON",
          en: {
            task: "Make it print like this ↓\nPYTHON",
            guide: "Chain .strip().upper()!",
            hint: "print('  python  '.strip().upper())"
          }
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "🛠️ 문자열 정리 도구!"
          ],
          code: "original: '  Hello, World!  '\nlength: 19\nuppercase: 'HELLO, WORLD!'\nreplaced: 'Hello, Python!'",
          isPreview: true,
          note: "한 줄씩 만들어보자!"
        }
      },

      // 프로젝트
      {
        type: "project",
        content: {
          step: 1,
          total: 4,
          task: "원본 text 출력 (text = '  Hello, World!  ')",
          target: "원본: '  Hello, World!  '",
          hint: "print('원본:', repr(text))",
          done: [],
          answer: "print('원본:', repr(text))"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 4,
          task: "text의 길이 출력 (len 사용)",
          target: "길이: 19",
          hint: "print('길이:', len(text))",
          done: ["원본: '  Hello, World!  '"],
          answer: "print('길이:', len(text))"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 4,
          task: "공백 제거 후 대문자 출력",
          target: "대문자: HELLO, WORLD!",
          hint: "print('대문자:', text.strip().upper())",
          done: ["원본: '  Hello, World!  '", "길이: 19"],
          answer: "print('대문자:', text.strip().upper())"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 4,
          task: "공백 제거 후 'World'를 'Python'으로 치환해서 출력",
          target: "치환: Hello, Python!",
          hint: "print('치환:', text.strip().replace('World', 'Python'))",
          done: ["원본: '  Hello, World!  '", "길이: 19", "대문자: HELLO, WORLD!"],
          answer: "print('치환:', text.strip().replace('World', 'Python'))"
        }
      },

      // ==================== 추가 예측 & 심화 ====================

      // predict 1: strip() 체이닝
      {
        type: "explain",
        content: {
          lines: ["코드 결과를 예측해봐!"],
          code: "text = '  Python  '\nprint(text.strip().lower())",
          predict: {
            options: ["  Python  ", "python", "PYTHON", "에러"],
            answer: 1,
            feedback: "strip()으로 공백 제거 후 lower()로 소문자 변환! '  Python  ' → 'Python' → 'python'"
          },
          en: {
            lines: ["Predict the output!"],
            predict: {
              options: ["  Python  ", "python", "PYTHON", "Error"],
              feedback: "strip() removes spaces, then lower() converts to lowercase! '  Python  ' → 'Python' → 'python'"
            }
          }
        }
      },

      // predict 2: replace() 여러 번
      {
        type: "explain",
        content: {
          lines: ["코드 결과를 예측해봐!"],
          code: "s = 'aabbcc'\nprint(s.replace('b', 'X'))",
          predict: {
            options: ["aaXXcc", "aaXcc", "XXbbcc", "에러"],
            answer: 0,
            feedback: "replace()는 해당 문자 모두를 바꿔! 'b'가 2개이므로 둘 다 'X'로 → 'aaXXcc'"
          },
          en: {
            lines: ["Predict the output!"],
            predict: {
              options: ["aaXXcc", "aaXcc", "XXbbcc", "Error"],
              feedback: "replace() changes ALL occurrences! Both 'b's become 'X' → 'aaXXcc'"
            }
          }
        }
      },

      // predict 3: find() 없는 문자
      {
        type: "explain",
        content: {
          lines: ["코드 결과를 예측해봐!"],
          code: "word = 'Hello'\nprint(word.find('z'))",
          predict: {
            options: ["0", "5", "-1", "에러"],
            answer: 2,
            feedback: "find()는 찾는 문자가 없으면 -1을 반환해! 'z'는 'Hello'에 없으므로 -1"
          },
          en: {
            lines: ["Predict the output!"],
            predict: {
              options: ["0", "5", "-1", "Error"],
              feedback: "find() returns -1 when the character is not found! 'z' is not in 'Hello' → -1"
            }
          }
        }
      },

      // predict 4: count()
      {
        type: "explain",
        content: {
          lines: ["코드 결과를 예측해봐!"],
          code: "sentence = 'banana'\nprint(sentence.count('a'))",
          predict: {
            options: ["1", "2", "3", "에러"],
            answer: 2,
            feedback: "'banana'에서 'a'는 b-A-n-A-n-A 위치에 3번 나와! count()는 등장 횟수를 세줘."
          },
          en: {
            lines: ["Predict the output!"],
            predict: {
              options: ["1", "2", "3", "Error"],
              feedback: "'a' appears 3 times in 'banana' — b-A-n-A-n-A! count() counts occurrences."
            }
          }
        }
      },

      // errorQuiz 1: startswith() 대소문자
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는?",
          code: "email = 'User@Gmail.com'\nif email.endswith('.com'):\n    print('valid email')",
          options: [
            "문제없음 — '.com'으로 끝나면 '유효한 이메일'이 출력돼",
            "endswith는 대문자에 안 써",
            "if문에 콜론이 없어서 에러"
          ],
          answer: 0,
          explanation: "이 코드는 정상 동작해! endswith('.com')은 문자열 끝이 '.com'이면 True를 반환해. 'User@Gmail.com'은 '.com'으로 끝나므로 출력돼.",
          en: {
            question: "What's wrong with this code?",
            options: [
              "Nothing wrong — if it ends with '.com', '유효한 이메일' is printed",
              "endswith doesn't work with uppercase",
              "Missing colon after if — error"
            ],
            explanation: "This code works correctly! endswith('.com') returns True if the string ends with '.com'. 'User@Gmail.com' ends with '.com' so it prints."
          }
        }
      },

      // errorQuiz 2: replace() 순서 착각
      {
        type: "errorQuiz",
        content: {
          question: "원하는 결과가 '안녕 파이썬'인데 출력이 다르게 나와. 문제는?",
          code: "msg = 'Hello world'\nprint(msg.replace('Python', 'world'))",
          options: [
            "replace('찾을것', '바꿀것') 인데 순서가 반대야 — '세상'을 '파이썬'으로 바꿔야 해",
            "replace는 한국어에 안 써",
            "msg 변수가 없어서 에러"
          ],
          answer: 0,
          explanation: "replace(찾을것, 바꿀것) 순서야! '세상'을 '파이썬'으로 바꾸려면 replace('세상', '파이썬')이어야 해.",
          en: {
            question: "The desired output is '안녕 파이썬' but something else prints. What's wrong?",
            options: [
              "replace(find, replace) order is reversed — need to replace '세상' with '파이썬'",
              "replace doesn't work with Korean",
              "Variable msg is missing — error"
            ],
            explanation: "The order is replace(find_this, replace_with)! To change '세상' to '파이썬', use replace('세상', '파이썬')."
          }
        }
      },

      // practice 1: count() + find() 조합
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\n4\n1",
          guide: "'mississippi'에서 's'가 몇 번 나오는지 count()로 세고,\n'i'의 첫 위치를 find()로 구해봐",
          template: "word = 'mississippi'\nprint(___)\nprint(___)",
          answer: "word = 'mississippi'\nprint(word.count('s'))\nprint(word.find('i'))",
          expect: "4\n1",
          en: {
            task: "Make it print like this ↓\n4\n1",
            guide: "Count how many 's' in 'mississippi' with count(), then find first 'i' with find()"
          }
        }
      },

      // practice 2: startswith + endswith
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\nTrue\nTrue",
          guide: "'Hello, World!'가 'Hello'로 시작하는지, '!'로 끝나는지 각각 출력해봐",
          template: "text = 'Hello, World!'\nprint(___)\nprint(___)",
          answer: "text = 'Hello, World!'\nprint(text.startswith('Hello'))\nprint(text.endswith('!'))",
          expect: "True\nTrue",
          en: {
            task: "Make it print like this ↓\nTrue\nTrue",
            guide: "Check if 'Hello, World!' starts with 'Hello' and ends with '!'"
          }
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 5,
          title: "문자열 메서드 마스터",
          learned: [
            ".upper() / .lower() → 대소문자 변환",
            ".strip() → 앞뒤 공백 제거",
            ".replace('a','b') → 치환",
            "len(text) → 길이, .find('x') → 위치"
          ],
          canDo: "문자열을 다양한 방법으로 다룰 수 있어!",
          emoji: "🏆"
        }
      },

      // 완료
      {
        type: "done",
        content: {}
      }
    ]
  };
