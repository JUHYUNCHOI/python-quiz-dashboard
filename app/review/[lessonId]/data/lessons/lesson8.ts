import { LessonData } from '../types';

export const lesson8: LessonData = {
  id: "8",
  title: "f-string",
  description: "변수를 문자열 안에 쏙!",
  steps: [
    // ==================== CHAPTER 1: 동기 부여 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "f-string 소개",
        desc: "변수를 문자열 안에 넣기!"
      }
    },

    // 프리뷰
    {
      type: "explain",
      content: {
        lines: [
          "🎯 오늘 만들 것!"
        ],
        code: "name = 'Alice'\nscore = 95\nprint(f'{name}\\'s score: {score} points')",
        result: "Alice's score: 95 points",
        isPreview: true,
        note: "변수를 문자열 안에 바로 넣을 수 있어!"
      }
    },

    {
      type: "reward",
      content: {
        message: "f-string 마스터 시작!",
        emoji: "✨"
      }
    },

    // ==================== CHAPTER 2: 기본 f-string ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "기본 f-string",
        desc: "f'' 안에 {변수} 넣기!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "잠깐! 변수 기억나?",
        task: "name = '코린이' 로 변수 만들고 출력해봐",
        template: null,
        answer: "name = '코린이'\nprint(name)",
        expect: "코린이",
        en: {
          message: "Wait! Remember variables?",
          task: "Create name = '코린이' and print it"
        }
      }
    },

    // f-string 기본
    {
      type: "explain",
      content: {
        lines: [
          "f-string: 문자열 앞에 f를 붙여!"
        ],
        code: "name = 'Alice'\nprint(f'Hello, {name}!')   # Hello, Alice!\nprint(f'Name: {name}')   # Name: Alice",
        note: "f'' 안에서 {변수} 로 값을 넣어!"
      }
    },

    // ===== Lv.1: 기본 변수 삽입 =====
    {
      type: "practice",
      content: {
        level: 1,
        task: "city = '서울' 로 변수 만들고,\nf-string으로 '나는 서울에 살아' 출력해봐",
        guide: "f-string은 따옴표 앞에 f를 붙이고, 변수를 {} 안에 넣어요",
        hint: "변수를 중괄호 {} 안에 넣어요",
        template: null,
        answer: "city = '서울'\nprint(f'나는 {city}에 살아')",
        expect: "나는 서울에 살아",
        en: {
          task: "Create city = '서울' and print '나는 서울에 살아' using f-string",
          guide: "Put f before the quote, and put the variable inside {}",
          hint: "Put the variable inside curly braces {}"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "age = 15 로 변수 만들고,\nf-string으로 '내 나이는 15살이야' 출력해봐",
        guide: "f-string은 따옴표 앞에 f를 붙이고, 변수를 {} 안에 넣어요",
        hint: "변수를 중괄호 {} 안에 넣어요",
        template: null,
        answer: "age = 15\nprint(f'내 나이는 {age}살이야')",
        expect: "내 나이는 15살이야",
        en: {
          task: "Create age = 15 and print '내 나이는 15살이야' using f-string",
          guide: "Put f before the quote, and put the variable inside {}",
          hint: "Put the variable inside curly braces {}"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "name = '민준' 일 때, f'안녕 {name}' 의 출력은?",
        options: [
          "안녕 {name}",
          "안녕 민준",
          "에러"
        ],
        answer: 1,
        explanation: "f-string에서 {name}은 변수의 값으로 바뀌어! 그래서 '안녕 민준'이 출력돼.",
        en: {
          question: "When name = '민준', what does f'안녕 {name}' print?",
          options: [
            "안녕 {name}",
            "안녕 민준",
            "Error"
          ],
          explanation: "In f-strings, {name} is replaced with the variable's value! So '안녕 민준' is printed."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 2,
        title: "기본 f-string",
        learned: [
          "f'' 앞에 f를 붙인다",
          "{변수} 로 값을 삽입",
          "숫자 변수도 바로 삽입 가능"
        ],
        canDo: "변수를 문자열 안에 넣을 수 있어!",
        emoji: "🔤"
      }
    },

    // ==================== CHAPTER 3: 식 계산 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "식 계산",
        desc: "{ } 안에서 계산도 돼!"
      }
    },

    // 식 삽입
    {
      type: "explain",
      content: {
        lines: [
          "{ } 안에 계산식도 넣을 수 있어!"
        ],
        code: "a = 10\nb = 5\nprint(f'{a} + {b} = {a + b}')",
        result: "10 + 5 = 15",
        note: "{ } 안에 변수뿐만 아니라 계산식도 OK!"
      }
    },

    // ===== Lv.2: 식 계산 =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "price = 1000, count = 3 으로 변수 만들고,\nf-string으로 '총 가격: 3000원' 출력해봐",
        guide: "{ } 안에서 계산식도 넣을 수 있어요",
        hint: "{ } 안에 두 변수를 곱하는 식을 넣어봐요",
        template: null,
        answer: "price = 1000\ncount = 3\nprint(f'총 가격: {price * count}원')",
        expect: "총 가격: 3000원",
        en: {
          task: "Create price = 1000, count = 3 and print '총 가격: 3000원' using f-string",
          guide: "You can put expressions inside {}",
          hint: "Put the multiplication expression of two variables inside {}"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "x = 7, y = 3 으로 변수 만들고,\nf'{x} - {y} = {x - y}' 출력해봐",
        template: null,
        answer: "x = 7\ny = 3\nprint(f'{x} - {y} = {x - y}')",
        expect: "7 - 3 = 4",
        en: {
          task: "Create x = 7, y = 3 and print f'{x} - {y} = {x - y}'"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "a = 6, b = 2 일 때, f'{a * b}' 의 출력은?",
        options: [
          "{a * b}",
          "6 * 2",
          "12"
        ],
        answer: 2,
        explanation: "{ } 안의 식이 계산돼서 6 * 2 = 12가 출력돼!",
        en: {
          question: "When a = 6, b = 2, what does f'{a * b}' print?",
          options: [
            "{a * b}",
            "6 * 2",
            "12"
          ],
          explanation: "The expression inside { } is calculated! 6 * 2 = 12 is printed!"
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 3,
        title: "식 계산",
        learned: [
          "{ } 안에 계산식도 OK",
          "f'{a + b}' 처럼 계산 결과 삽입",
          "변수와 계산을 함께 출력"
        ],
        canDo: "f-string 안에서 계산도 할 수 있어!",
        emoji: "🧮"
      }
    },

    // ==================== CHAPTER 4: 소수점 포맷 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "소수점 포맷",
        desc: ":.2f 로 소수점 자리 지정!"
      }
    },

    // 소수점 포맷
    {
      type: "explain",
      content: {
        lines: [
          ":.2f 로 소수점 자리 수를 정해!"
        ],
        code: "pi = 3.14159\nprint(f'{pi:.2f}')   # 3.14\nprint(f'{pi:.4f}')   # 3.1416",
        note: ":.2f = 소수점 2자리, :.4f = 소수점 4자리"
      }
    },

    // ===== Lv.2: 소수점 포맷 =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "avg = 87.6789 로 변수 만들고,\nf-string으로 소수점 2자리만 출력해봐 (87.68)",
        guide: "{ } 안에서 :.2f 포맷을 쓰면 소수점 자리수를 지정할 수 있어요",
        hint: "변수 뒤에 콜론(:)을 붙이고 소수점 자리 지정 포맷을 써봐요",
        template: null,
        answer: "avg = 87.6789\nprint(f'{avg:.2f}')",
        expect: "87.68",
        en: {
          task: "Create avg = 87.6789 and print it with 2 decimal places using f-string (87.68)",
          guide: "Use :.2f format inside {} to specify decimal places",
          hint: "Add a colon (:) after the variable and write the decimal format"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "price = 1234.5 로 변수 만들고,\n'가격: 1234.50원' 형식으로 출력해봐",
        guide: "소수점 포맷으로 자릿수를 맞춰봐요",
        hint: "변수 뒤에 :.2f를 붙이면 소수점 2자리로 맞춰줘요",
        template: null,
        answer: "price = 1234.5\nprint(f'가격: {price:.2f}원')",
        expect: "가격: 1234.50원",
        en: {
          task: "Create price = 1234.5 and print it in '가격: 1234.50원' format",
          guide: "Use decimal format to align decimal places",
          hint: "Add :.2f after the variable to fix 2 decimal places"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "n = 3.14159 일 때, f'{n:.1f}' 의 출력은?",
        options: [
          "3.14",
          "3.1",
          "3.14159"
        ],
        answer: 1,
        explanation: ":.1f는 소수점 1자리! 그래서 3.1이 출력돼 (반올림).",
        en: {
          question: "When n = 3.14159, what does f'{n:.1f}' print?",
          options: [
            "3.14",
            "3.1",
            "3.14159"
          ],
          explanation: ":.1f means 1 decimal place! So 3.1 is printed (rounded)."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 4,
        title: "소수점 포맷",
        learned: [
          ":.2f → 소수점 2자리",
          ":.4f → 소수점 4자리",
          "자동으로 반올림해줘"
        ],
        canDo: "소수점 자리를 원하는 만큼 표시할 수 있어!",
        emoji: "🔢"
      }
    },

    // ==================== CHAPTER 5: 0 채우기와 메서드 ====================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "0 채우기와 메서드",
        desc: ":03d 와 메서드 호출!"
      }
    },

    // 0 채우기
    {
      type: "explain",
      content: {
        lines: [
          ":03d 로 앞을 0으로 채워!"
        ],
        code: "n = 7\nprint(f'{n:03d}')   # 007\nprint(f'{n:05d}')   # 00007",
        note: ":03d = 3자리, 빈 자리는 0으로 채움"
      }
    },

    // ===== Lv.2: 0 채우기 =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "num = 42 로 변수 만들고,\n'042' 처럼 3자리로 0 채워서 출력해봐",
        guide: "자리 수를 지정하면 빈 자리를 0으로 채울 수 있어요",
        hint: "변수 뒤에 :03d 처럼 콜론, 0, 자리수, d를 붙여봐요",
        template: null,
        answer: "num = 42\nprint(f'{num:03d}')",
        expect: "042",
        en: {
          task: "Create num = 42 and print it zero-padded to 3 digits like '042'",
          guide: "You can fill empty spots with 0 by specifying digit count",
          hint: "After the variable, write :03d — colon, 0, digit count, d"
        }
      }
    },

    // 메서드 호출
    {
      type: "explain",
      content: {
        lines: [
          "{ } 안에서 메서드도 호출돼!"
        ],
        code: "name = 'python'\nprint(f'{name.upper()}')   # PYTHON\nprint(f'{name.title()}')   # Python",
        note: "{ } 안에서 .upper(), .lower() 등 메서드 사용 OK!"
      }
    },

    // ===== Lv.2: 메서드 호출 =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "lang = 'python' 으로 변수 만들고,\nf-string으로 'PYTHON' (대문자) 출력해봐",
        guide: "{ } 안에서 문자열 메서드를 바로 호출할 수 있어요",
        hint: "{ } 안에서 변수에 .upper()를 붙여봐요",
        template: null,
        answer: "lang = 'python'\nprint(f'{lang.upper()}')",
        expect: "PYTHON",
        en: {
          task: "Create lang = 'python' and print 'PYTHON' (uppercase) using f-string",
          guide: "You can call string methods directly inside {}",
          hint: "Add .upper() to the variable inside {}"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "n = 5 일 때, f'{n:04d}' 의 출력은?",
        options: [
          "5",
          "0005",
          "5000"
        ],
        answer: 1,
        explanation: ":04d는 4자리! 빈 자리를 0으로 채우니까 0005가 출력돼.",
        en: {
          question: "When n = 5, what does f'{n:04d}' print?",
          options: [
            "5",
            "0005",
            "5000"
          ],
          explanation: ":04d means 4 digits! Empty spaces are filled with 0, so 0005 is printed."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 5,
        title: "포맷 옵션",
        learned: [
          ":03d → 0 채우기 (3자리)",
          "{ } 안에서 메서드 호출 가능",
          "f'{name.upper()}' 처럼 사용"
        ],
        canDo: "f-string으로 다양한 형태로 출력할 수 있어!",
        emoji: "🎨"
      }
    },

    // ==================== CHAPTER 6: 프로젝트 ====================
    {
      type: "chapter",
      content: {
        num: 6,
        title: "성적표 만들기",
        desc: "f-string으로 깔끔하게!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "소수점 포맷 기억나?",
        task: "pi = 3.14159 를 소수점 2자리로 출력해봐",
        template: null,
        answer: "pi = 3.14159\nprint(f'{pi:.2f}')",
        expect: "3.14",
        en: {
          message: "Remember decimal formatting?",
          task: "Print pi = 3.14159 with 2 decimal places"
        }
      }
    },

    // 프로젝트 소개
    {
      type: "explain",
      content: {
        lines: [
          "📋 성적표 만들기!"
        ],
        code: "=== Report Card ===\nName: Alice\nScore: 92.67 points\nGrade: A",
        isPreview: true,
        note: "f-string으로 하나씩 만들어보자!"
      }
    },

    // 프로젝트
    {
      type: "project",
      content: {
        step: 1,
        total: 4,
        task: "제목 출력",
        target: "=== 성적표 ===",
        hint: "print('=== 성적표 ===')",
        done: [],
        answer: "print('=== 성적표 ===')"
      }
    },
    {
      type: "project",
      content: {
        step: 2,
        total: 4,
        task: "name = '김민준' 으로 변수 만들고\nf-string으로 이름 출력",
        target: "이름: 김민준",
        hint: "f'이름: {name}'",
        done: ["=== 성적표 ==="],
        answer: "name = '김민준'\nprint(f'이름: {name}')"
      }
    },
    {
      type: "project",
      content: {
        step: 3,
        total: 4,
        task: "score = 92.6666 으로 변수 만들고\n소수점 2자리로 출력",
        target: "점수: 92.67점",
        hint: "f'점수: {score:.2f}점'",
        done: ["=== 성적표 ===", "이름: 김민준"],
        answer: "score = 92.6666\nprint(f'점수: {score:.2f}점')"
      }
    },
    {
      type: "project",
      content: {
        step: 4,
        total: 4,
        task: "grade = 'a' 로 변수 만들고\n대문자로 등급 출력",
        target: "등급: A",
        hint: "f'등급: {grade.upper()}'",
        done: ["=== 성적표 ===", "이름: 김민준", "점수: 92.67점"],
        answer: "grade = 'a'\nprint(f'등급: {grade.upper()}')"
      }
    },

    // ==================== 추가 예측 & 심화 ====================

    // predict 1: 중괄호 없이 변수명 그대로
    {
      type: "explain",
      content: {
        lines: ["코드 결과를 예측해봐!"],
        code: "name = 'Alice'\nprint(f'Hello, name!')",
        predict: {
          options: ["Hello, Alice!", "Hello, name!", "에러", "Hello, {name}!"],
          answer: 1,
          feedback: "{}로 감싸지 않으면 'name'이 변수가 아닌 글자 그대로 출력돼! f'Hello, {name}!'이어야 해."
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["Hello, Alice!", "Hello, name!", "Error", "Hello, {name}!"],
            feedback: "Without {}, 'name' is treated as literal text, not a variable! Should be f'Hello, {name}!'"
          }
        }
      }
    },

    // predict 2: 소수점 반올림
    {
      type: "explain",
      content: {
        lines: ["코드 결과를 예측해봐!"],
        code: "val = 2.555\nprint(f'{val:.2f}')",
        predict: {
          options: ["2.55", "2.56", "2.5", "에러"],
          answer: 1,
          feedback: ":.2f는 소수점 2자리로 반올림해! 2.555에서 세 번째 자리가 5이므로 → 2.56"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["2.55", "2.56", "2.5", "Error"],
            feedback: ":.2f rounds to 2 decimal places! The 3rd decimal of 2.555 is 5, so → 2.56"
          }
        }
      }
    },

    // predict 3: f-string 안에서 메서드
    {
      type: "explain",
      content: {
        lines: ["코드 결과를 예측해봐!"],
        code: "lang = 'python'\nprint(f'language: {lang.upper()}')",
        predict: {
          options: ["언어: python", "언어: PYTHON", "언어: {lang.upper()}", "에러"],
          answer: 1,
          feedback: "{}안에서 .upper() 메서드가 실행돼! 'python'.upper() = 'PYTHON' → '언어: PYTHON'"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["언어: python", "언어: PYTHON", "언어: {lang.upper()}", "Error"],
            feedback: ".upper() runs inside {}! 'python'.upper() = 'PYTHON' → '언어: PYTHON'"
          }
        }
      }
    },

    // predict 4: 0 채우기와 길이
    {
      type: "explain",
      content: {
        lines: ["코드 결과를 예측해봐!"],
        code: "num = 3\nprint(f'{num:05d}')",
        predict: {
          options: ["3", "00003", "3000", "에러"],
          answer: 1,
          feedback: ":05d는 5자리! 빈 자리를 0으로 채워. 3은 한 자리이므로 앞에 0이 4개 → '00003'"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["3", "00003", "3000", "Error"],
            feedback: ":05d means 5 digits! Fill empty spots with 0. 3 is 1 digit, so 4 zeros in front → '00003'"
          }
        }
      }
    },

    // errorQuiz 1: f 없이 사용
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제는?",
        code: "score = 90\nprint('{score} points!')",
        options: [
          "문자열 앞에 f가 없어서 {score}가 변수 값이 아닌 글자 그대로 출력돼",
          "변수 이름 score가 잘못됨",
          "print() 사용법 오류"
        ],
        answer: 0,
        explanation: "f-string을 쓰려면 따옴표 앞에 f를 붙여야 해! f'{score}점 받았어!'처럼.",
        en: {
          question: "What's wrong with this code?",
          options: [
            "Missing f before the string — {score} prints as literal text, not the variable's value",
            "Variable name score is wrong",
            "print() usage error"
          ],
          explanation: "You need f before the quotes to use f-string! Should be f'{score}점 받았어!'"
        }
      }
    },

    // errorQuiz 2: 계산식 자리 혼동
    {
      type: "errorQuiz",
      content: {
        question: "원하는 출력이 '합계: 15'인데 다르게 나와. 문제는?",
        code: "a = 10\nb = 5\nprint(f'total: a + b')",
        options: [
          "a + b를 {}로 감싸야 해 — f'합계: {a + b}'",
          "변수 a, b는 print 안에서 쓸 수 없어",
          "더하기 연산은 f-string에서 안 돼"
        ],
        answer: 0,
        explanation: "f-string에서 변수나 식은 반드시 {}로 감싸야 해! f'합계: {a + b}'처럼 써야 15가 출력돼.",
        en: {
          question: "The desired output is '합계: 15' but it prints differently. What's wrong?",
          options: [
            "a + b must be wrapped in {} — f'합계: {a + b}'",
            "Variables a, b can't be used inside print",
            "Addition doesn't work in f-strings"
          ],
          explanation: "In f-strings, variables and expressions must be inside {}! Write f'합계: {a + b}' to get 15."
        }
      }
    },

    // practice 1: 여러 변수 + 소수점 조합
    {
      type: "practice",
      content: {
        task: "이렇게 나오게 해봐 ↓\n민수의 평균: 88.50점",
        guide: "변수 삽입과 소수점 포맷을 함께 사용해봐요",
        hint: "변수 이름과 소수점 포맷(:.2f)을 같은 f-string 안에 넣어봐요",
        template: "name = '민수'\navg = 88.5\nprint(___)",
        answer: "f'{name}의 평균: {avg:.2f}점'",
        expect: "민수의 평균: 88.50점",
        en: {
          task: "Make it print like this ↓\n민수의 평균: 88.50점",
          guide: "Use variable insertion and decimal format together",
          hint: "Put both the variable name and decimal format (:.2f) in the same f-string"
        }
      }
    },

    // practice 2: 0 채우기 + 메서드 혼합
    {
      type: "practice",
      content: {
        task: "이렇게 나오게 해봐 ↓\n[007] JAMES",
        guide: "0 채우기 포맷과 메서드 호출을 함께 사용해봐요",
        hint: "번호는 3자리 0 채우기 포맷, 이름은 대문자 메서드를 써봐요",
        template: "num = 7\nagent = 'james'\nprint(___)",
        answer: "f'[{num:03d}] {agent.upper()}'",
        expect: "[007] JAMES",
        en: {
          task: "Make it print like this ↓\n[007] JAMES",
          guide: "Combine zero-padding format and method call together",
          hint: "Use zero-padding format for the number, and uppercase method for the name"
        }
      }
    },

    // 최종 요약
    {
      type: "summary",
      content: {
        num: 6,
        title: "f-string 마스터",
        learned: [
          "f'{변수}' → 변수 값 삽입",
          "f'{식}' → 계산 결과 삽입",
          "f'{n:.2f}' → 소수점 2자리",
          "f'{n:03d}' → 0 채우기",
          "f'{s.upper()}' → 메서드 호출"
        ],
        canDo: "f-string으로 원하는 형태의 문자열을 만들 수 있어!",
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
