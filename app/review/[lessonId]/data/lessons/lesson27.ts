import { LessonData } from '../types';

export const lesson27: LessonData = {
  id: "27",
  title: "가위바위보 게임",
  description: "리스트, 조건문, 반복문으로 가위바위보를 만들어요!",
  steps: [
    // ==================== CHAPTER 1: 컴퓨터 선택 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "컴퓨터의 선택",
        desc: "random으로 가위/바위/보 중 하나 뽑기!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["컴퓨터는 random.choice로 선택!"],
        code: `import random
random.seed(0)

choices = ['가위', '바위', '보']
computer = random.choice(choices)
print(f'컴퓨터: {computer}')`,
        result: "컴퓨터: 바위",
        note: "random.choice(리스트)는 리스트에서 하나를 무작위로 골라줘요!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "리스트에서 무작위로 하나를 뽑는 함수는?",
        options: ["random.randint()", "random.choice()", "random.range()", "random.sample()"],
        answer: 1,
        explanation: "random.choice(리스트)는 리스트에서 무작위로 하나를 뽑아요. randint는 숫자 범위, sample은 여러 개!",
        en: {
          question: "Which function picks one random element from a list?",
          options: ["random.randint()", "random.choice()", "random.range()", "random.sample()"],
          explanation: "random.choice(list) picks one random element. randint is for number ranges, sample picks multiple!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "리스트에서 컴퓨터의 선택을 무작위로 뽑으세요",
        guide: "random.choice(리스트)!",
        hint: "choices 리스트를 넣으면 돼요",
        template: "import random\nrandom.seed(1)\n\nchoices = ['가위', '바위', '보']\ncomputer = random.___(choices)\nprint(computer)",
        answer: "choice",
        expect: "보"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["인덱스로 직접 꺼낼 수도 있어요"],
        code: `choices = ['가위', '바위', '보']
print(choices[0])
print(choices[2])`,
        predict: {
          options: ["가위 / 보", "가위 / 바위", "바위 / 보", "0 / 2"],
          answer: 0,
          feedback: "리스트는 0부터 시작! [0]은 '가위', [2]는 '보'."
        },
        en: {
          lines: ["You can also access by index"],
          predict: {
            options: ["가위 / 보", "가위 / 바위", "바위 / 보", "0 / 2"],
            feedback: "List indices start at 0! [0] is '가위', [2] is '보'."
          }
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "컴퓨터의 선택",
        learned: [
          "random.choice(리스트) → 무작위 하나",
          "choices = ['가위', '바위', '보']",
          "리스트 인덱스: 0부터 시작"
        ],
        canDo: "컴퓨터가 가위/바위/보 중 하나를 뽑게 할 수 있어!",
        emoji: "🎲"
      }
    },

    // ==================== CHAPTER 2: 승패 판정 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "승패 판정",
        desc: "if/elif/else로 누가 이겼는지 가리기!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 if/else 복습!",
        task: "두 값이 같은지 비교하세요",
        template: "a = '가위'\nb = '가위'\nif a ___ b:\n    print('같다')",
        answer: "==",
        expect: "같다",
        en: {
          message: "🔄 if/else review!",
          task: "Compare if two values are equal"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["같으면 무승부, 다르면 누가 이겼는지 확인!"],
        code: `player = '가위'
computer = '보'

if player == computer:
    result = '무승부'
elif player == '가위' and computer == '보':
    result = '승리'
elif player == '바위' and computer == '가위':
    result = '승리'
elif player == '보' and computer == '바위':
    result = '승리'
else:
    result = '패배'

print(result)`,
        result: "승리",
        note: "if → elif → elif → else 순서대로 검사해요!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "가위는 무엇을 이길까요?",
        options: ["가위", "바위", "보", "아무것도"],
        answer: 2,
        explanation: "가위는 보를 자르죠! 가위 > 보, 바위 > 가위, 보 > 바위.",
        en: {
          question: "What does 가위 (scissors) beat?",
          options: ["Scissors", "Rock", "Paper", "Nothing"],
          explanation: "Scissors cut paper! Scissors > Paper, Rock > Scissors, Paper > Rock."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "두 값이 다르면서 첫 번째가 '바위', 두 번째가 '가위'인 조건을 만드세요",
        guide: "and로 두 조건을 연결!",
        hint: "player == '바위' and computer == '가위'",
        template: "player = '바위'\ncomputer = '가위'\nif player == '바위' ___ computer == '가위':\n    print('승리')",
        answer: "and",
        expect: "승리"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `player = '보'
computer = '바위'

if player == computer:
    print('무승부')
elif player == '보' and computer == '바위':
    print('승리')
else:
    print('패배')`,
        predict: {
          options: ["무승부", "승리", "패배", "에러"],
          answer: 1,
          feedback: "보는 바위를 감싸요! 두 번째 elif에 걸려서 '승리'."
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["Draw", "Win", "Lose", "Error"],
            feedback: "Paper covers rock! The second elif matches → 'Win'."
          }
        }
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드가 가위 vs 보일 때 항상 '패배'가 나오는 이유는?",
        code: `player = '가위'
computer = '보'

if player == '가위' and computer == '바위':
    print('승리')
else:
    print('패배')`,
        options: [
          "가위가 이기는 상대는 '보'인데 코드가 '바위'를 검사",
          "if 문법이 잘못됨",
          "and 대신 or를 써야 함",
          "문제없음"
        ],
        answer: 0,
        explanation: "가위는 보를 이겨요! computer == '바위'가 아니라 computer == '보'여야 해요.",
        en: {
          question: "Why does this always print 'Lose' for 가위 vs 보?",
          options: [
            "Scissors beats paper, but the code checks for rock",
            "if syntax is wrong",
            "Should use or instead of and",
            "No problem"
          ],
          explanation: "Scissors beats paper! It should be computer == '보' not computer == '바위'."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "if/elif/else로 가위 vs 보 결과를 출력하세요 (가위가 이김)",
        guide: "같으면 무승부, 가위 vs 보면 승리!",
        hint: "and로 두 조건 연결!",
        template: "player = '가위'\ncomputer = '보'\n\nif player == computer:\n    print('무승부')\nelif player == '가위' and computer == '___':\n    print('승리')\nelse:\n    print('패배')",
        answer: "보",
        expect: "승리"
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "승패 판정",
        learned: [
          "같으면 무승부: ==",
          "if → elif → else 순서로 검사",
          "and로 두 조건 연결",
          "3가지 승리 조합: 가위>보, 바위>가위, 보>바위"
        ],
        canDo: "조건문으로 가위바위보 승패를 가릴 수 있어!",
        emoji: "⚔️"
      }
    },

    // ==================== CHAPTER 3: 반복과 점수 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "여러 판 + 점수",
        desc: "while/for로 반복하면서 승/패/무 카운트!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 누적 합 복습!",
        task: "0부터 시작해서 1씩 늘리는 방법",
        template: "wins = 0\nwins ___ 1\nprint(wins)",
        answer: "+=",
        expect: "1",
        en: {
          message: "🔄 Accumulator review!",
          task: "Start at 0 and add 1"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["3판 반복하며 승수 누적"],
        code: `player_list = ['가위', '바위', '보']
computer_list = ['보', '가위', '바위']

wins = 0
for i in range(3):
    if player_list[i] == '가위' and computer_list[i] == '보':
        wins += 1
    elif player_list[i] == '바위' and computer_list[i] == '가위':
        wins += 1
    elif player_list[i] == '보' and computer_list[i] == '바위':
        wins += 1

print(f'{wins}승')`,
        result: "3승",
        note: "for문으로 인덱스 i를 돌면서 매 판 결과를 누적!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "wins = 0으로 시작한 변수에 1씩 더하는 가장 간단한 방법은?",
        options: ["wins = wins + 1", "wins += 1", "wins.add(1)", "둘 다 가능 (1, 2번)"],
        answer: 3,
        explanation: "wins = wins + 1과 wins += 1은 똑같은 동작! += 가 더 짧아서 자주 써요.",
        en: {
          question: "Simplest way to add 1 to wins (starting at 0)?",
          options: ["wins = wins + 1", "wins += 1", "wins.add(1)", "Both 1 and 2"],
          explanation: "wins = wins + 1 and wins += 1 do the same thing! += is shorter and more common."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "for문으로 player_list 길이만큼 반복하세요",
        guide: "range(len(리스트))!",
        hint: "range로 인덱스 0~len-1 생성!",
        template: "player_list = ['가위', '바위', '보']\nfor i in ___(len(player_list)):\n    print(player_list[i])",
        answer: "range",
        expect: "가위\n바위\n보"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `wins = 0
losses = 0
draws = 0

results = ['승', '승', '무', '패', '승']
for r in results:
    if r == '승':
        wins += 1
    elif r == '무':
        draws += 1
    else:
        losses += 1

print(f'{wins}승 {losses}패 {draws}무')`,
        predict: {
          options: ["3승 1패 1무", "2승 2패 1무", "5승 0패 0무", "3승 2패 0무"],
          answer: 0,
          feedback: "승 3번, 무 1번, 패 1번 → 3승 1패 1무!"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["3W 1L 1D", "2W 2L 1D", "5W 0L 0D", "3W 2L 0D"],
            feedback: "3 wins, 1 draw, 1 loss → 3W 1L 1D!"
          }
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "while문으로 wins가 3이 될 때까지 i를 늘리며 'win!'을 출력하세요",
        guide: "while 조건 + break 또는 단순 카운트",
        hint: "wins < 3 동안 반복!",
        template: "wins = 0\nwhile wins ___ 3:\n    wins += 1\n    print(f'win {wins}!')",
        answer: "<",
        expect: "win 1!\nwin 2!\nwin 3!"
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "for문으로 점수 리스트 [10, -5, 10, 0, 10]을 더하세요 (총점 출력)",
        guide: "score += 각 값!",
        hint: "score = 0으로 시작, for로 누적!",
        template: null,
        answer: "scores = [10, -5, 10, 0, 10]\ntotal = 0\nfor s in scores:\n    total += s\nprint(total)",
        alternateAnswers: [
          "scores = [10, -5, 10, 0, 10]\ntotal = 0\nfor i in range(len(scores)):\n    total += scores[i]\nprint(total)",
          "scores = [10, -5, 10, 0, 10]\nprint(sum(scores))"
        ],
        expect: "25"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "반복 + 점수",
        learned: [
          "for/while로 여러 판 반복",
          "wins/losses/draws 변수로 카운트",
          "wins += 1 로 누적",
          "range(len(리스트))로 인덱스 순회"
        ],
        canDo: "여러 판 가위바위보의 승/패/무를 셀 수 있어!",
        emoji: "🔄"
      }
    },

    // ==================== CHAPTER 4: 종합 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "종합 정리",
        desc: "가위바위보 게임 종합 퀴즈!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "random.choice(['가위', '바위', '보'])가 반환할 수 있는 값은?",
        options: [
          "리스트 하나 (3개 다)",
          "'가위', '바위', '보' 중 하나",
          "인덱스 (0, 1, 2)",
          "랜덤 숫자"
        ],
        answer: 1,
        explanation: "random.choice는 리스트의 요소 중 하나를 무작위로 골라요. 인덱스가 아닌 값 자체를!",
        en: {
          question: "What can random.choice(['Rock', 'Paper', 'Scissors']) return?",
          options: [
            "The whole list",
            "One of 'Rock', 'Paper', 'Scissors'",
            "An index (0, 1, 2)",
            "A random number"
          ],
          explanation: "random.choice picks one element (the value, not the index)."
        }
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `wins = 0
results = ['승', '승', '무']
for r in results:
    if r = '승':
        wins += 1
print(wins)`,
        options: [
          "비교는 == 인데 = 를 씀 (SyntaxError)",
          "for 문법이 잘못됨",
          "wins 초기화가 빠짐",
          "문제없음"
        ],
        answer: 0,
        explanation: "비교할 때는 == 두 개! = 하나는 대입 연산자라 if 안에서 SyntaxError가 나요.",
        en: {
          question: "What's wrong with this code?",
          options: [
            "Uses = instead of == for comparison (SyntaxError)",
            "for syntax is wrong",
            "wins not initialized",
            "No problem"
          ],
          explanation: "Comparison uses ==! Single = is assignment, which causes SyntaxError in an if."
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `player = '바위'
computer = '바위'

if player == computer:
    print('무승부')
elif player == '바위' and computer == '가위':
    print('승리')
else:
    print('패배')`,
        predict: {
          options: ["무승부", "승리", "패배", "에러"],
          answer: 0,
          feedback: "둘 다 '바위'라 첫 if에 걸려서 '무승부'!"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["Draw", "Win", "Lose", "Error"],
            feedback: "Both are 바위, matching the first if → 'Draw'!"
          }
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "결과 리스트에서 '승'의 개수를 세서 출력하세요",
        guide: "count() 메서드 또는 for + if!",
        hint: "list.count('승')이 간단!",
        template: "results = ['승', '패', '승', '무', '승', '승']\nprint(results.___('승'))",
        answer: "count",
        expect: "4"
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "전체 코드: 컴퓨터 선택 후 무승부면 '무승부' 출력, 아니면 '승부' 출력",
        guide: "random.choice → if/else",
        hint: "computer가 player와 같으면 무승부!",
        template: null,
        answer: "import random\nrandom.seed(5)\nchoices = ['가위', '바위', '보']\nplayer = '가위'\ncomputer = random.choice(choices)\nif player == computer:\n    print('무승부')\nelse:\n    print('승부')",
        alternateAnswers: [
          "import random\nrandom.seed(5)\nplayer = '가위'\ncomputer = random.choice(['가위', '바위', '보'])\nif player == computer:\n    print('무승부')\nelse:\n    print('승부')"
        ],
        expect: "승부"
      }
    },
    {
      type: "reward",
      content: {
        emoji: "✊",
        message: "가위바위보 마스터!"
      }
    },
    {
      type: "summary",
      content: {
        num: 4,
        title: "가위바위보 게임 완성!",
        learned: [
          "random.choice로 컴퓨터 선택",
          "if/elif/else로 승패 판정",
          "and로 두 조건 결합",
          "for/while로 여러 판 반복",
          "변수로 승/패/무 카운트"
        ],
        canDo: "리스트 + 조건문 + 반복문으로 게임을 만들 수 있어!",
        emoji: "🏆"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
