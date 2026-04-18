import { LessonData } from '../types';

export const lesson11: LessonData = {
  id: "11",
  title: "조건문",
  description: "상황에 따라 다르게 실행!",
  steps: [
    // ==================== CHAPTER 1: 동기 부여 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "조건문 소개",
        desc: "상황에 따라 다르게!"
      }
    },

    // 프리뷰
    {
      type: "explain",
      content: {
        lines: [
          "🎯 오늘 만들 것!"
        ],
        code: "temp = 22\nif temp >= 30:\n    print('🔥 hot!')\nelif temp >= 20:\n    print('😊 nice!')\nelse:\n    print('🧥 cold!')",
        result: "😊 nice!",
        isPreview: true,
        note: "온도에 따라 다른 결과를 출력해!"
      }
    },

    {
      type: "reward",
      content: {
        message: "조건문 마스터 시작!",
        emoji: "🔀"
      }
    },

    // ==================== CHAPTER 2: if 문 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "if 문",
        desc: "콜론과 들여쓰기 필수!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "잠깐! 비교 연산자 기억나?",
        task: "100 > 50 출력해봐",
        template: { before: "print(", after: ")" },
        answer: "100 > 50",
        expect: "True",
        en: {
          message: "Wait! Remember comparison operators?",
          task: "Print 100 > 50"
        }
      }
    },

    // if 기본 구조
    {
      type: "explain",
      content: {
        lines: [
          "if 뒤에 조건, 콜론(:) 필수!"
        ],
        code: "score = 90\nif score >= 90:\n    print('합격!')   # indentation required!",
        result: "합격!",
        note: "if 조건: 뒤에 콜론(:), 실행할 코드는 들여쓰기 4칸!"
      }
    },

    // ===== Lv.1: if 기본 =====
    {
      type: "practice",
      content: {
        level: 1,
        task: "age = 18 로 변수 만들고,\nage >= 18 이면 '성인입니다' 출력해봐",
        guide: "변수를 만들고 if 조건 뒤에 콜론(:), 실행할 코드는 들여쓰기!",
        template: null,
        answer: "age = 18\nif age >= 18:\n    print('성인입니다')",
        expect: "성인입니다",
        en: {
          task: "Create variable age = 18,\nif age >= 18 print '성인입니다'",
          guide: "Create the variable, then write if condition: with a colon, and indent the code!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "temp = 35 로 변수 만들고,\ntemp > 30 이면 '더워요!' 출력해봐",
        template: null,
        answer: "temp = 35\nif temp > 30:\n    print('더워요!')",
        expect: "더워요!",
        en: {
          task: "Create variable temp = 35,\nif temp > 30 print '더워요!'"
        }
      }
    },

    // 들여쓰기 에러
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: "score = 100\nif score == 100:\nprint('perfect!')",
        options: [
          "score 변수가 없어",
          "들여쓰기가 없어서 IndentationError!",
          "== 대신 = 를 써야 해"
        ],
        answer: 1,
        explanation: "if 아래의 코드는 반드시 들여쓰기(4칸 또는 Tab)가 있어야 해! 없으면 IndentationError가 발생해.",
        en: {
          question: "What is the problem with this code?",
          options: [
            "The score variable is missing",
            "No indentation causes IndentationError!",
            "Should use = instead of =="
          ],
          explanation: "Code under if must have indentation (4 spaces or Tab)! Without it, IndentationError occurs."
        }
      }
    },

    // errorQuiz: 콜론 누락
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: "score = 80\nif score >= 90\n    print('A')",
        options: [
          "콜론(:)이 없어",
          "들여쓰기 문제",
          "score 변수 오류"
        ],
        answer: 0,
        explanation: "if 조건 뒤에 반드시 콜론(:)이 있어야 해! if score >= 90: 처럼 써야 해.",
        en: {
          question: "What's wrong with this code?",
          options: [
            "Missing colon (:)",
            "Indentation problem",
            "score variable error"
          ],
          explanation: "Must have colon (:) after the if condition! Write it as: if score >= 90:"
        }
      }
    },

    // predict: 조건이 False일 때 (아무것도 안 출력)
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "x = 3\nif x > 10:\n    print('크다')",
        predict: {
          options: ["크다", "아무것도 없음", "3", "False"],
          answer: 1,
          feedback: "x=3은 10보다 크지 않아서 조건이 False! if 블록이 실행되지 않으니 아무것도 출력 안 돼."
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["크다", "Nothing prints", "3", "False"],
            feedback: "x=3 is not greater than 10, so the condition is False! The if block doesn't run, so nothing prints."
          }
        }
      }
    },

    // predict: 별도 if 두 개 (둘 다 True 가능)
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "x = 15\nif x > 10:\n    print('10보다 크다')\nif x > 5:\n    print('5보다 크다')",
        predict: {
          options: ["10보다 크다", "5보다 크다", "10보다 크다\n5보다 크다", "아무것도 없음"],
          answer: 2,
          feedback: "if 문이 두 개야! 각각 독립적으로 확인해. x=15는 10도 크고 5도 크니까 둘 다 출력돼."
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["10보다 크다", "5보다 크다", "10보다 크다\n5보다 크다", "Nothing"],
            feedback: "There are two separate if statements! Each checks independently. x=15 satisfies both, so both print."
          }
        }
      }
    },

    // practice: 변수 조건 출력
    {
      type: "practice",
      content: {
        level: 1,
        task: "point = 0 으로 변수 만들고,\npoint == 0 이면 '시작 전이에요' 출력해봐",
        guide: "변수를 만들고 같은지 비교할 때는 == 를 사용해!",
        template: null,
        answer: "point = 0\nif point == 0:\n    print('시작 전이에요')",
        expect: "시작 전이에요",
        en: {
          task: "Create variable point = 0,\nif point == 0 print '시작 전이에요'",
          guide: "Create the variable and use == to check equality!"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "if 문에서 반드시 필요한 것 2가지는?",
        options: [
          "콜론(:)과 들여쓰기",
          "세미콜론(;)과 중괄호({})",
          "따옴표와 괄호"
        ],
        answer: 0,
        explanation: "Python if 문은 조건 뒤에 콜론(:), 실행 코드는 들여쓰기! C/Java의 {} 와 달라.",
        en: {
          question: "What are the 2 required things in an if statement?",
          options: [
            "Colon (:) and indentation",
            "Semicolon (;) and curly braces ({})",
            "Quotes and parentheses"
          ],
          explanation: "Python if statement needs a colon (:) after the condition, and indentation for the code! Unlike C/Java's {}."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 2,
        title: "if 문",
        learned: [
          "if 조건: (콜론 필수!)",
          "실행할 코드는 들여쓰기 4칸",
          "들여쓰기 없으면 IndentationError"
        ],
        canDo: "조건이 참일 때 코드를 실행할 수 있어!",
        emoji: "✅"
      }
    },

    // ==================== CHAPTER 3: if-else ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "if-else",
        desc: "참이면 이거, 아니면 저거!"
      }
    },

    // if-else 기본
    {
      type: "explain",
      content: {
        lines: [
          "else: 조건이 False일 때 실행!"
        ],
        code: "age = 15\nif age >= 18:\n    print('성인')\nelse:\n    print('미성년자')",
        result: "미성년자",
        note: "if 조건이 False면 else 블록 실행!"
      }
    },

    // ===== Lv.1: if-else =====
    {
      type: "practice",
      content: {
        level: 1,
        task: "score = 75 로 변수 만들고,\n60 이상이면 '합격', 아니면 '불합격' 출력해봐",
        guide: "if로 조건을 확인하고, else로 조건이 아닐 때를 처리해!",
        template: null,
        answer: "score = 75\nif score >= 60:\n    print('합격')\nelse:\n    print('불합격')",
        expect: "합격",
        en: {
          task: "Create variable score = 75,\nif 60 or above print '합격', otherwise print '불합격'",
          guide: "Use if to check the condition, and else to handle when it's not true!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "num = 7 로 변수 만들고,\n짝수면 '짝수', 홀수면 '홀수' 출력해봐",
        guide: "나머지 연산자 % 로 짝수인지 확인할 수 있어!",
        template: null,
        answer: "num = 7\nif num % 2 == 0:\n    print('짝수')\nelse:\n    print('홀수')",
        expect: "홀수",
        en: {
          task: "Create variable num = 7,\nif even print '짝수', if odd print '홀수'",
          guide: "Use the remainder operator % to check if a number is even!"
        }
      }
    },

    // predict: if-else 특정 값
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "num = 0\nif num > 0:\n    print('양수')\nelse:\n    print('양수 아님')",
        predict: {
          options: ["양수", "양수 아님", "0", "아무것도 없음"],
          answer: 1,
          feedback: "num=0은 0보다 크지 않아서 False! 그래서 else 블록의 '양수 아님'이 출력돼."
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["양수", "양수 아님", "0", "Nothing"],
            feedback: "num=0 is not greater than 0, so False! The else block '양수 아님' runs."
          }
        }
      }
    },

    // predict: 중첩 if
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "age = 20\nhas_ticket = True\nif age >= 18:\n    if has_ticket:\n        print('입장 가능')\n    else:\n        print('티켓 없음')\nelse:\n    print('미성년자')",
        predict: {
          options: ["입장 가능", "티켓 없음", "미성년자", "아무것도 없음"],
          answer: 0,
          feedback: "age=20 ≥ 18이라 첫 번째 if 통과! has_ticket=True이라 두 번째 if도 통과 → '입장 가능'."
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["입장 가능", "티켓 없음", "미성년자", "Nothing"],
            feedback: "age=20 ≥ 18 passes the first if! has_ticket=True passes the second if → '입장 가능'."
          }
        }
      }
    },

    // interleaving: 변수와 연산자 복습
    {
      type: "interleaving",
      content: {
        message: "잠깐! 변수 대입 기억나?",
        task: "x = 10 으로 변수 만들고, x * 2 출력해봐",
        template: { before: "x = 10\nprint(", after: ")" },
        answer: "x * 2",
        expect: "20",
        en: {
          message: "Wait! Remember variable assignment?",
          task: "Create variable x = 10 and print x * 2"
        }
      }
    },

    // practice: if-else 음수/양수
    {
      type: "practice",
      content: {
        level: 1,
        task: "n = -5 로 변수 만들고,\n0 이상이면 '양수 또는 0', 아니면 '음수' 출력해봐",
        guide: "if-else 구조로 두 가지 경우를 나눠봐!",
        template: null,
        answer: "n = -5\nif n >= 0:\n    print('양수 또는 0')\nelse:\n    print('음수')",
        expect: "음수",
        en: {
          task: "Create variable n = -5,\nif 0 or above print '양수 또는 0', otherwise print '음수'",
          guide: "Use if-else structure to handle two separate cases!"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "n = 10 일 때, 다음 코드의 출력은?\nif n > 10:\n    print('크다')\nelse:\n    print('작거나 같다')",
        options: [
          "크다",
          "작거나 같다",
          "아무것도 안 나와"
        ],
        answer: 1,
        explanation: "10 > 10은 False! 그래서 else 블록의 '작거나 같다'가 출력돼.",
        en: {
          question: "When n = 10, what does this code print?\nif n > 10:\n    print('크다')\nelse:\n    print('작거나 같다')",
          options: [
            "크다",
            "작거나 같다",
            "Nothing prints"
          ],
          explanation: "10 > 10 is False! So the else block's '작거나 같다' prints."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 3,
        title: "if-else",
        learned: [
          "if 조건이 True → if 블록 실행",
          "if 조건이 False → else 블록 실행",
          "둘 중 하나만 실행돼"
        ],
        canDo: "조건에 따라 두 가지 중 하나를 실행할 수 있어!",
        emoji: "↔️"
      }
    },

    // ==================== CHAPTER 4: elif ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "elif",
        desc: "세 가지 이상 조건!"
      }
    },

    // elif 기본
    {
      type: "explain",
      content: {
        lines: [
          "elif 로 조건을 여러 개 추가해!"
        ],
        code: "speed = 75\nif speed >= 100:\n    print('🚨 과속')\nelif speed >= 80:\n    print('⚠️ 주의')\nelif speed >= 60:\n    print('✅ 정상')\nelse:\n    print('🐢 너무 느림')",
        result: "✅ 정상",
        note: "elif = else if! 위에서부터 순서대로 확인해"
      }
    },

    // predict: elif 체인 — 어느 블록이 실행?
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "score = 85\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 70:\n    print('C')\nelse:\n    print('D')",
        predict: {
          options: ["A", "B", "C", "D"],
          answer: 1,
          feedback: "score=85는 90 미만이라 첫 if 패스, 80 이상이라 elif score>=80 에서 True! 'B'가 출력되고 나머지는 건너뜀."
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["A", "B", "C", "D"],
            feedback: "score=85 is less than 90 so the first if fails, but 85 >= 80 so the first elif is True! 'B' prints and the rest are skipped."
          }
        }
      }
    },

    // predict: elif vs 별도 if 차이
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "score = 95\nif score >= 60:\n    print('C or above')\nif score >= 90:\n    print('A or above')",
        predict: {
          options: ["C이상", "A이상", "C이상\nA이상", "아무것도 없음"],
          answer: 2,
          feedback: "if 문이 두 개라서 각각 독립 확인! score=95는 60 이상이고 90 이상이니까 둘 다 True → 둘 다 출력!"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["C이상", "A이상", "C이상\nA이상", "Nothing"],
            feedback: "Two separate if statements check independently! score=95 is both ≥60 and ≥90, so both are True → both print!"
          }
        }
      }
    },

    // errorQuiz: elif 대신 else if 사용
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: "grade = 85\nif grade >= 90:\n    print('A')\nelse if grade >= 80:\n    print('B')",
        options: [
          "else if 는 Python에서 사용 안 해. elif 써야 해",
          "들여쓰기가 잘못됐어",
          "grade 변수 선언이 잘못됐어"
        ],
        answer: 0,
        explanation: "Python에서는 'else if' 대신 반드시 'elif'를 써야 해! C/Java 습관 주의.",
        en: {
          question: "What's wrong with this code?",
          options: [
            "'else if' is not used in Python. Use 'elif'",
            "The indentation is wrong",
            "grade variable declaration is wrong"
          ],
          explanation: "Python uses 'elif', not 'else if'! Be careful if you're used to C/Java."
        }
      }
    },

    // ===== Lv.2: elif =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "temp = 10 으로 변수 만들고,\n30 이상이면 '더워', 20 이상이면 '따뜻해',\n10 이상이면 '선선해', 아니면 '추워' 출력해봐",
        guide: "if-elif-elif-else 구조로 4가지 경우를 순서대로 처리해!",
        template: null,
        answer: "temp = 10\nif temp >= 30:\n    print('더워')\nelif temp >= 20:\n    print('따뜻해')\nelif temp >= 10:\n    print('선선해')\nelse:\n    print('추워')",
        expect: "선선해",
        en: {
          task: "Create variable temp = 10,\nif 30+ print '더워', if 20+ print '따뜻해',\nif 10+ print '선선해', otherwise print '추워'",
          guide: "Use if-elif-elif-else structure to handle 4 cases in order!"
        }
      }
    },

    // practice: elif로 학년 분류
    {
      type: "practice",
      content: {
        level: 2,
        task: "grade_year = 2 로 변수 만들고,\n1이면 '1학년', 2이면 '2학년', 3이면 '3학년', 아니면 '해당없음' 출력해봐",
        guide: "== 로 정확히 일치하는지 확인하고 elif로 여러 경우를 처리해!",
        template: null,
        answer: "grade_year = 2\nif grade_year == 1:\n    print('1학년')\nelif grade_year == 2:\n    print('2학년')\nelif grade_year == 3:\n    print('3학년')\nelse:\n    print('해당없음')",
        expect: "2학년",
        en: {
          task: "Create variable grade_year = 2,\nif 1 print '1학년', if 2 print '2학년', if 3 print '3학년', otherwise print '해당없음'",
          guide: "Use == to check exact matches and elif to handle multiple cases!"
        }
      }
    },

    // elif 주의점
    {
      type: "explain",
      content: {
        lines: [
          "⚠️ 위에서부터 순서대로 확인해!"
        ],
        code: "# only the first True block runs!\nscore = 95\nif score >= 60:     # True → stops here!\n    print('C or above')\nelif score >= 90:   # never checked!\n    print('A or above')",
        result: "C or above",
        note: "순서가 중요해! 넓은 조건을 먼저 쓰면 안 돼."
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "if-elif-else 에서 몇 개의 블록이 실행될까?",
        options: [
          "모든 True인 블록 전부",
          "오직 하나만",
          "상황에 따라 다름"
        ],
        answer: 1,
        explanation: "if-elif-else 는 위에서 아래로 확인하다가 처음 True인 블록 하나만 실행해! 나머지는 건너뜀.",
        en: {
          question: "How many blocks execute in if-elif-else?",
          options: [
            "All blocks that are True",
            "Only one",
            "Depends on the situation"
          ],
          explanation: "if-elif-else checks from top to bottom and runs only the first True block! The rest are skipped."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 4,
        title: "elif",
        learned: [
          "elif 로 조건을 여러 개 추가",
          "위에서부터 순서대로 확인",
          "첫 번째 True인 블록만 실행"
        ],
        canDo: "세 가지 이상의 경우를 처리할 수 있어!",
        emoji: "🔢"
      }
    },

    // ==================== CHAPTER 5: 프로젝트 ====================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "등급 판정기",
        desc: "조건문 총 활용!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "홀짝 판단 기억나?",
        task: "num = 8 로 변수 만들고\n짝수면 '짝수', 홀수면 '홀수' 출력해봐",
        template: null,
        answer: "num = 8\nif num % 2 == 0:\n    print('짝수')\nelse:\n    print('홀수')",
        expect: "짝수",
        en: {
          message: "Remember even/odd checking?",
          task: "Create variable num = 8\nif even print '짝수', if odd print '홀수'"
        }
      }
    },

    // 프로젝트 소개
    {
      type: "explain",
      content: {
        lines: [
          "🏆 성적 등급 판정기!"
        ],
        code: "=== Grade Calculator ===\nScore: 85\nGrade: B\nResult: pass",
        isPreview: true,
        note: "조건문으로 하나씩 만들어보자!"
      }
    },

    // 프로젝트
    {
      type: "project",
      content: {
        step: 1,
        total: 4,
        task: "제목 출력",
        target: "=== 성적 등급 판정기 ===",
        hint: "print('=== 성적 등급 판정기 ===')",
        done: [],
        answer: "print('=== 성적 등급 판정기 ===')"
      }
    },
    {
      type: "project",
      content: {
        step: 2,
        total: 4,
        task: "score = 85 로 변수 만들고\n점수 출력",
        target: "점수: 85",
        hint: "print('점수:', score)",
        done: ["=== 성적 등급 판정기 ==="],
        answer: "score = 85\nprint('점수:', score)"
      }
    },
    {
      type: "project",
      content: {
        step: 3,
        total: 4,
        task: "90 이상 A, 80 이상 B, 70 이상 C, 나머지 D\n등급 출력",
        target: "등급: B",
        hint: "if score >= 90: 'A'\nelif score >= 80: 'B'...",
        done: ["=== 성적 등급 판정기 ===", "점수: 85"],
        answer: "if score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelif score >= 70:\n    grade = 'C'\nelse:\n    grade = 'D'\nprint('등급:', grade)"
      }
    },
    {
      type: "project",
      content: {
        step: 4,
        total: 4,
        task: "60 이상이면 '합격', 아니면 '불합격' 출력",
        target: "결과: 합격",
        hint: "if score >= 60: '합격'",
        done: ["=== 성적 등급 판정기 ===", "점수: 85", "등급: B"],
        answer: "if score >= 60:\n    print('결과: 합격')\nelse:\n    print('결과: 불합격')"
      }
    },

    // 최종 요약
    {
      type: "summary",
      content: {
        num: 5,
        title: "조건문 마스터",
        learned: [
          "if 조건: (콜론 + 들여쓰기 필수)",
          "if ... else ... (둘 중 하나)",
          "if ... elif ... elif ... else (여러 조건)",
          "들여쓰기 없으면 IndentationError"
        ],
        canDo: "다양한 조건에 따라 다른 코드를 실행할 수 있어!",
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
