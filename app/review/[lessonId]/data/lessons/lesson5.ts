import { LessonData } from '../types';

export const lesson5: LessonData = {
    id: "5",
    title: "문자열 연산",
    description: "문자열도 더하고 곱할 수 있어!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "문자열로 만드는 이름표",
          desc: "문자열 연산으로 뭔가 만들기!"
        }
      },

      // 프리뷰
      {
        type: "explain",
        content: {
          lines: [
            "🏷️ 오늘 만들 것!"
          ],
          code: "=== My Name Tag ===\nName: Alice\nSchool: Coding Middle School Grade 1\nCheer: Go! Go! Go! ",
          isPreview: true,
          note: "문자열 연산으로 뚝딱 만들어보자!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "문자열도 연산할 수 있어!"
          ],
          code: "'Hello' + 'World' → 'HelloWorld'\n'ha' * 3         → 'hahaha'",
          isPreview: true,
          note: "+ 는 이어붙이기, * 는 반복!"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "문자열 연산 시작!",
          emoji: "🔤"
        }
      },

      // ==================== CHAPTER 2: 문자열 이어붙이기 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "문자열 이어붙이기 (+)",
          desc: "문자열끼리 더해보자!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 문자열 출력 기억나?",
          task: "'안녕하세요' 출력해봐",
          template: null,
          answer: "print('안녕하세요')",
          expect: "안녕하세요",
          en: {
            message: "Wait! Remember printing strings?",
            task: "Print '안녕하세요'"
          }
        }
      },

      // + 연산자
      {
        type: "explain",
        content: {
          lines: [
            "문자열 + 문자열 = 이어붙이기!"
          ],
          code: "'Hello' + 'World'  → 'HelloWorld'\n'Py' + 'thon'      → 'Python'\n'Good' + 'bye'     → 'Goodbye'",
          note: "공백도 직접 넣어야 해! ' ' + '이름' 처럼"
        }
      },

      // ===== Lv.1: 이어붙이기 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "'Hello' + 'World' 를 출력해봐",
          guide: "+ 로 이어붙이기!",
          template: { before: "print(", after: ")" },
          answer: "'Hello' + 'World'",
          alternateAnswers: ["'Hello'+'World'"],
          expect: "HelloWorld",
          en: {
            task: "Print 'Hello' + 'World'",
            guide: "Use + to concatenate!"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "'김' + '코딩' 을 출력해봐",
          guide: "성 + 이름!",
          template: { before: "print(", after: ")" },
          answer: "'김' + '코딩'",
          alternateAnswers: ["'김'+'코딩'"],
          expect: "김코딩",
          en: {
            task: "Print '김' + '코딩'",
            guide: "Last name + first name!"
          }
        }
      },

      // 공백 포함
      {
        type: "explain",
        content: {
          lines: [
            "공백도 문자열이야!"
          ],
          code: "'Hello' + ' ' + 'World' → 'Hello World'\n'Code' + ' ' + 'rocks!'  → 'Code rocks!'",
          note: "공백을 넣으려면 ' ' 를 더해줘야 해!"
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "'코딩중학교' + ' ' + '1학년' 을 출력해봐",
          guide: "공백 ' ' 도 더하기!",
          template: { before: "print(", after: ")" },
          answer: "'코딩중학교' + ' ' + '1학년'",
          alternateAnswers: ["'코딩중학교'+' '+'1학년'"],
          expect: "코딩중학교 1학년",
          en: {
            task: "Print '코딩중학교' + ' ' + '1학년'",
            guide: "Add the space ' ' too!"
          }
        }
      },

      // 변수와 +
      {
        type: "explain",
        content: {
          lines: [
            "변수에 저장된 문자열도 이어붙일 수 있어!"
          ],
          code: "first = 'Alice'\nlast = 'Smith'\nprint(first + last)  → AliceSmith",
          note: "변수끼리도 + 로 연결!"
        }
      },

      // ===== Lv.2: 변수 + 문자열 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "name = '코딩' 으로 저장하고, '안녕, ' + name + '!' 을 출력해봐",
          guide: "변수를 + 로 이어붙이기!",
          template: null,
          answer: "name = '코딩'\nprint('안녕, ' + name + '!')",
          expect: "안녕, 코딩!",
          en: {
            task: "Store name = '코딩' and print '안녕, ' + name + '!'",
            guide: "Concatenate variables with +!"
          }
        }
      },

      // predict: + 연산자 결과 예측
      {
        type: "explain",
        content: {
          lines: ["결과가 뭘까? 직접 맞춰봐!"],
          code: "print('Code' + 'rocks')",
          predict: {
            question: "출력 결과는?",
            options: ["코딩짱", "코딩 짱", "에러"],
            answer: 0,
            feedback: "+ 는 그냥 이어붙이기야. 공백 없이 '코딩짱' 이 나와!"
          },
          result: "코딩짱",
          en: {
            lines: ["What's the result? Try to guess!"],
            predict: {
              question: "What is the output?",
              options: ["코딩짱", "코딩 짱 (with space)", "Error"],
              feedback: "+ just concatenates. No space — outputs '코딩짱'!"
            }
          }
        }
      },

      // predict: 변수 이어붙이기
      {
        type: "explain",
        content: {
          lines: ["변수 두 개를 이어붙이면?"],
          code: "a = 'Py'\nb = 'thon'\nprint(a + b)",
          predict: {
            question: "출력 결과는?",
            options: ["파이썬", "a + b", "파이 썬"],
            answer: 0,
            feedback: "변수 a와 b에 각각 '파이', '썬' 이 저장돼 있어서 이어붙이면 '파이썬'!"
          },
          result: "파이썬",
          en: {
            lines: ["What happens when you concatenate two variables?"],
            predict: {
              question: "What is the output?",
              options: ["파이썬", "a + b", "파이 썬"],
              feedback: "a holds '파이' and b holds '썬', so a + b = '파이썬'!"
            }
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "'파이' + '썬' 의 결과는?",
          options: [
            "'파이썬'",
            "'파이 썬' (공백 자동 추가)",
            "에러"
          ],
          answer: 0,
          explanation: "문자열 + 는 그냥 이어붙이기야! 공백은 자동으로 안 들어가.",
          en: {
            question: "What is the result of '파이' + '썬'?",
            options: [
              "'파이썬'",
              "'파이 썬' (space auto-added)",
              "Error"
            ],
            explanation: "String + just concatenates! No space is added automatically."
          }
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "문자열 이어붙이기",
          learned: [
            "'문자열' + '문자열' = 이어붙이기",
            "공백도 ' ' 로 직접 추가",
            "변수끼리도 + 로 연결 가능"
          ],
          canDo: "문자열을 자유롭게 이어붙일 수 있어!",
          emoji: "🔗"
        }
      },

      // ==================== CHAPTER 3: 문자열 반복 (*) ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "문자열 반복 (*)",
          desc: "문자열을 여러 번 반복!"
        }
      },

      // * 연산자
      {
        type: "explain",
        content: {
          lines: [
            "문자열 * 숫자 = 반복!"
          ],
          code: "'ha' * 3     → 'hahaha'\n'=-' * 5     → '=-=-=-=-'\n'Go! ' * 2   → 'Go! Go! '",
          note: "문자열을 숫자만큼 반복해줘!"
        }
      },

      // ===== Lv.1: 반복 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "'ha' * 3 을 출력해봐",
          guide: "* 는 반복!",
          template: { before: "print(", after: ")" },
          answer: "'ha' * 3",
          alternateAnswers: ["'ha'*3"],
          expect: "hahaha",
          en: {
            task: "Print 'ha' * 3",
            guide: "* repeats!"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "'화이팅! ' * 3 을 출력해봐",
          guide: "응원을 3번 반복!",
          template: { before: "print(", after: ")" },
          answer: "'화이팅! ' * 3",
          alternateAnswers: ["'화이팅! '*3"],
          expect: "화이팅! 화이팅! 화이팅! ",
          en: {
            task: "Print '화이팅! ' * 3",
            guide: "Repeat the cheer 3 times!"
          }
        }
      },

      // + 와 * 조합
      {
        type: "explain",
        content: {
          lines: [
            "+ 와 * 를 같이 쓸 수도 있어!"
          ],
          code: "'=' * 10           → '=========='\n'[ ' + '★' * 3 + ' ]' → '[ ★★★ ]'",
          note: "조합하면 다양한 표현이 가능해!"
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "'=' * 15 를 출력해봐 (구분선 만들기)",
          guide: "* 로 반복!",
          template: { before: "print(", after: ")" },
          answer: "'=' * 15",
          alternateAnswers: ["'='*15"],
          expect: "===============",
          en: {
            task: "Print '=' * 15 (create a divider line)",
            guide: "Use * to repeat!"
          }
        }
      },

      // predict: * 연산자 결과 예측
      {
        type: "explain",
        content: {
          lines: ["반복 결과를 맞춰봐!"],
          code: "print('-' * 5)",
          predict: {
            question: "출력 결과는?",
            options: ["-----", "- * 5", "-5"],
            answer: 0,
            feedback: "'-' 를 5번 반복하니까 '-----' 가 출력돼!"
          },
          result: "-----",
          en: {
            lines: ["Guess the repetition result!"],
            predict: {
              question: "What is the output?",
              options: ["-----", "- * 5", "-5"],
              feedback: "'-' repeated 5 times gives '-----'!"
            }
          }
        }
      },

      // errorQuiz: * 연산자 오용
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러가 날까?",
          code: "print('hi' * '3')",
          options: [
            "문자열 * 문자열 불가 — 숫자를 써야 해",
            "'hi' 가 짧아서",
            "print() 안에 * 를 못 씀"
          ],
          answer: 0,
          explanation: "* 반복 연산자는 문자열 * 정수 여야 해. '3' 은 문자열이라 에러! print('hi' * 3) 이라고 써야 해.",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "Can't do string * string — need an integer",
              "'hi' is too short",
              "Can't use * inside print()"
            ],
            explanation: "The * repetition operator requires string * integer. '3' is a string, so it errors! Use print('hi' * 3)."
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "'ab' * 3 의 결과는?",
          options: [
            "'ababab'",
            "'ab ab ab' (공백 추가)",
            "'aabbbb' (각 글자 반복)"
          ],
          answer: 0,
          explanation: "* 는 문자열 전체를 반복해! 'ab' * 3 = 'ababab'",
          en: {
            question: "What is the result of 'ab' * 3?",
            options: [
              "'ababab'",
              "'ab ab ab' (space added)",
              "'aabbbb' (each char repeated)"
            ],
            explanation: "* repeats the whole string! 'ab' * 3 = 'ababab'"
          }
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "문자열 반복",
          learned: [
            "'문자열' * 숫자 = 반복",
            "+ 와 * 를 조합 가능",
            "구분선, 장식 등에 유용"
          ],
          canDo: "문자열을 원하는 만큼 반복할 수 있어!",
          emoji: "🔁"
        }
      },

      // ==================== CHAPTER 4: TypeError & str() ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "문자열 + 숫자 = 에러!",
          desc: "str()로 해결하기!"
        }
      },

      // TypeError 소개
      {
        type: "explain",
        content: {
          lines: [
            "⚠️ 문자열 + 숫자는 에러!"
          ],
          code: "'age: ' + 16       → TypeError!\n'score: ' + 95.5    → TypeError!",
          isError: true,
          note: "문자열과 숫자는 + 로 바로 합칠 수 없어!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드를 실행하면 어떻게 될까?",
          code: "age = 16\nprint('age: ' + age)",
          options: [
            "나이: 16 출력",
            "TypeError! 문자열 + 정수 불가",
            "나이:  출력 (숫자 무시)"
          ],
          answer: 1,
          explanation: "Python에서 문자열과 숫자는 + 로 합칠 수 없어. str()로 변환해야 해!",
          en: {
            question: "What happens when this code runs?",
            options: [
              "Prints: 나이: 16",
              "TypeError! Cannot concatenate string + int",
              "Prints: 나이:  (number ignored)"
            ],
            explanation: "In Python you can't concatenate strings and numbers with +. You need to convert with str()!"
          }
        }
      },

      // str() 해결
      {
        type: "explain",
        content: {
          lines: [
            "str()로 숫자를 문자열로 변환!"
          ],
          code: "str(16)     → '16'   (convert to string)\nstr(95.5)   → '95.5'\n\n'age: ' + str(16)  → 'age: 16' ✅",
          note: "str()로 감싸면 문자열로 바꿔줘!"
        }
      },

      // predict: str() 없이 쓰면?
      {
        type: "explain",
        content: {
          lines: ["이 코드는 어떻게 될까?"],
          code: "year = 2025\nprint('This year is ' + year + '!')",
          predict: {
            question: "실행하면?",
            options: ["올해는 2025년!", "TypeError 에러", "올해는 year년!"],
            answer: 1,
            feedback: "year 는 숫자(정수)라서 문자열과 + 로 합칠 수 없어. str(year) 로 변환해야 해!"
          },
          isError: true,
          en: {
            lines: ["What happens with this code?"],
            predict: {
              question: "What happens when you run it?",
              options: ["올해는 2025년!", "TypeError", "올해는 year년!"],
              feedback: "year is an integer — you can't concatenate it with a string using +. Use str(year)!"
            }
          }
        }
      },

      // errorQuiz: str() 필요
      {
        type: "errorQuiz",
        content: {
          question: "이 코드에서 문제가 있는 부분은?",
          code: "price = 5000\nprint('price: ' + price + ' won')",
          options: [
            "price 를 str(price) 로 바꿔야 해",
            "'가격: ' 앞에 print 가 없어서",
            "'원' 뒤에 \\n 이 필요해서"
          ],
          answer: 0,
          explanation: "price 는 정수(int)야. 문자열 + 정수는 에러! str(price) 로 감싸면 '가격: 5000원' 이 출력돼.",
          en: {
            question: "What is the problem in this code?",
            options: [
              "price needs to be str(price)",
              "Missing print before '가격: '",
              "Missing \\n after '원'"
            ],
            explanation: "price is an integer. String + int causes an error! Wrap it as str(price) to output '가격: 5000원'."
          }
        }
      },

      // ===== Lv.2: str() 활용 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "'점수: ' + str(100) 을 출력해봐",
          guide: "str()로 변환 후 +!",
          template: { before: "print(", after: ")" },
          answer: "'점수: ' + str(100)",
          alternateAnswers: ["'점수: '+str(100)"],
          expect: "점수: 100",
          en: {
            task: "Print '점수: ' + str(100)",
            guide: "Convert with str() then +!"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "score = 95 로 저장하고, '내 점수는 ' + str(score) + '점!' 을 출력해봐",
          guide: "변수를 str()로 변환!",
          template: null,
          answer: "score = 95\nprint('내 점수는 ' + str(score) + '점!')",
          expect: "내 점수는 95점!",
          en: {
            task: "Store score = 95 and print '내 점수는 ' + str(score) + '점!'",
            guide: "Convert the variable with str()!"
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "'오늘은 ' + 7 + '월이야!' 를 출력하려면?",
          options: [
            "'오늘은 ' + 7 + '월이야!' 그대로",
            "'오늘은 ' + str(7) + '월이야!'",
            "에러라서 불가능"
          ],
          answer: 1,
          explanation: "숫자 7을 str(7)로 변환해야 해! '오늘은 ' + str(7) + '월이야!' = '오늘은 7월이야!'",
          en: {
            question: "To print '오늘은 ' + 7 + '월이야!', what should you do?",
            options: [
              "Use '오늘은 ' + 7 + '월이야!' as-is",
              "Use '오늘은 ' + str(7) + '월이야!'",
              "Impossible due to error"
            ],
            explanation: "Convert the number 7 to str(7)! '오늘은 ' + str(7) + '월이야!' = '오늘은 7월이야!'"
          }
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "str() 변환",
          learned: [
            "문자열 + 숫자 → TypeError!",
            "str(숫자)로 문자열로 변환",
            "'텍스트' + str(숫자) → 가능!"
          ],
          canDo: "숫자를 문자열로 변환해서 이어붙일 수 있어!",
          emoji: "🔄"
        }
      },

      // ==================== CHAPTER 5: 이름표 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "나의 이름표 만들기",
          desc: "배운 걸 모두 활용!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "str() 변환 기억나?",
          task: "'나이: ' + str(14) 출력해봐",
          template: null,
          answer: "print('나이: ' + str(14))",
          expect: "나이: 14",
          en: {
            message: "Remember str() conversion?",
            task: "Print '나이: ' + str(14)"
          }
        }
      },

      // ===== Lv.2: + 와 * 조합 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "'★' * 5 + ' 완료! ' + '★' * 5 를 출력해봐",
          guide: "* 로 반복하고 + 로 이어붙이기!",
          template: { before: "print(", after: ")" },
          answer: "'★' * 5 + ' 완료! ' + '★' * 5",
          alternateAnswers: ["'★'*5+' 완료! '+'★'*5"],
          expect: "★★★★★ 완료! ★★★★★",
          en: {
            task: "Print '★' * 5 + ' 완료! ' + '★' * 5",
            guide: "Use * to repeat and + to join!"
          }
        }
      },

      // ===== Lv.3: 전체 조합 =====
      {
        type: "practice",
        content: {
          level: 3,
          task: "grade = 3 으로 저장하고, '저는 ' + str(grade) + '학년이에요!' 를 출력해봐",
          guide: "변수를 str()로 변환해서 이어붙이기!",
          template: null,
          answer: "grade = 3\nprint('저는 ' + str(grade) + '학년이에요!')",
          expect: "저는 3학년이에요!",
          en: {
            task: "Store grade = 3 and print '저는 ' + str(grade) + '학년이에요!'",
            guide: "Convert the variable with str() and concatenate!"
          }
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "🏷️ 나의 이름표 만들기!"
          ],
          code: "=== My Name Tag ===\nName: Alice\nSchool: Coding Middle School Grade 1\nCheer: Go! Go! Go! ",
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
          task: "제목 출력 ('=' * 3 + ' 나의 이름표 ' + '=' * 3)",
          target: "=== 나의 이름표 ===",
          hint: "print('=' * 3 + ' 나의 이름표 ' + '=' * 3)",
          done: [],
          answer: "print('=' * 3 + ' 나의 이름표 ' + '=' * 3)"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 4,
          task: "이름 출력 (name = '김코딩')",
          target: "이름: 김코딩",
          hint: "print('이름: ' + name)",
          done: ["=== 나의 이름표 ==="],
          answer: "print('이름: ' + name)"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 4,
          task: "학교 출력 (school = '코딩중학교', grade = 1)",
          target: "학교: 코딩중학교 1학년",
          hint: "print('학교: ' + school + ' ' + str(grade) + '학년')",
          done: ["=== 나의 이름표 ===", "이름: 김코딩"],
          answer: "print('학교: ' + school + ' ' + str(grade) + '학년')"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 4,
          task: "응원 출력 ('화이팅! ' * 3)",
          target: "응원: 화이팅! 화이팅! 화이팅! ",
          hint: "print('응원: ' + '화이팅! ' * 3)",
          done: ["=== 나의 이름표 ===", "이름: 김코딩", "학교: 코딩중학교 1학년"],
          answer: "print('응원: ' + '화이팅! ' * 3)"
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 5,
          title: "문자열 연산 마스터",
          learned: [
            "'문자열' + '문자열' = 이어붙이기",
            "'문자열' * 숫자 = 반복",
            "문자열 + 숫자 → TypeError",
            "str(숫자)로 변환 후 + 가능"
          ],
          canDo: "문자열을 자유자재로 연결하고 반복할 수 있어!",
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
