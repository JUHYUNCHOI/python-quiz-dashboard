import { LessonData } from '../types';

export const lesson22: LessonData = {
  id: "22",
  title: "슬라이싱",
  description: "리스트와 문자열을 자유자재로 잘라보자!",
  steps: [
    // ==================== CHAPTER 1: 기본 슬라이싱 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "기본 슬라이싱 [start:end]",
        desc: "리스트를 원하는 만큼 잘라보자!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["리스트에서 여러 개를 한 번에 꺼내고 싶다면?", "슬라이싱을 쓰면 돼요!"],
        code: `fruits = ["사과", "바나나", "포도", "딸기", "수박"]
print(fruits[1:4])`,
        predict: {
          question: "결과가 뭘까?",
          options: ["['바나나', '포도', '딸기']", "['사과', '바나나', '포도', '딸기']", "['바나나', '포도', '딸기', '수박']", "['사과', '바나나', '포도']"],
          answer: 0,
          feedback: "인덱스 1부터 3까지! end(4)는 포함 안 돼요!"
        },
        result: "['바나나', '포도', '딸기']",
        note: "[start:end] → start부터 end-1까지! end는 포함 안 됨!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["start를 생략하면 처음부터!"],
        code: `nums = [10, 20, 30, 40, 50]
print(nums[:3])`,
        predict: {
          question: "결과는?",
          options: ["[10, 20, 30]", "[10, 20, 30, 40]", "[30, 40, 50]", "[20, 30, 40]"],
          answer: 0,
          feedback: "[:3]은 처음(인덱스 0)부터 인덱스 2까지!"
        },
        result: "[10, 20, 30]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["end를 생략하면 끝까지!"],
        code: `nums = [10, 20, 30, 40, 50]
print(nums[2:])`,
        predict: {
          question: "결과는?",
          options: ["[30, 40, 50]", "[10, 20, 30]", "[30, 40]", "[20, 30, 40, 50]"],
          answer: 0,
          feedback: "[2:]는 인덱스 2부터 끝까지!"
        },
        result: "[30, 40, 50]"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "리스트에서 앞의 3개 요소만 슬라이싱하세요",
        guide: "[:3]을 사용!",
        hint: "start를 생략하면 처음부터!",
        template: "colors = ['빨강', '주황', '노랑', '초록', '파랑']\nprint(colors[:___])",
        blanksAnswer: ["3"],
        answer: "colors = ['빨강', '주황', '노랑', '초록', '파랑']\nprint(colors[:3])",
        expect: "['빨강', '주황', '노랑']"
      }
    },
    {
      type: "quiz",
      content: {
        question: "nums = [1,2,3,4,5] 일 때 nums[1:3]의 결과는?",
        options: ["[1, 2, 3]", "[2, 3]", "[2, 3, 4]", "[1, 2]"],
        answer: 1,
        explanation: "인덱스 1부터 2까지! end(3)는 포함 안 돼요. 결과: [2, 3]"
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "기본 슬라이싱",
        learned: [
          "[start:end] → start부터 end-1까지",
          "[:end] → 처음부터 end-1까지",
          "[start:] → start부터 끝까지",
          "[:] → 전체 복사"
        ],
        canDo: "리스트를 원하는 범위로 잘라낼 수 있어!",
        emoji: "✂️"
      }
    },

    // ==================== CHAPTER 2: 스텝 슬라이싱 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "스텝 슬라이싱과 역순",
        desc: "건너뛰기와 뒤집기까지!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 기본 슬라이싱 복습!",
        task: "리스트에서 인덱스 1부터 3까지(3 포함 안 됨) 슬라이싱하세요",
        template: "data = [10, 20, 30, 40, 50]\nprint(data[___:___])",
        blanksAnswer: ["1", "3"],
        answer: "data = [10, 20, 30, 40, 50]\nprint(data[1:3])",
        expect: "[20, 30]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["[::step]으로 건너뛰기!", "step은 몇 칸씩 이동할지 정해요"],
        code: `nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(nums[::2])`,
        predict: {
          question: "결과는?",
          options: ["[0, 2, 4, 6, 8]", "[0, 1, 2]", "[2, 4, 6, 8]", "[1, 3, 5, 7, 9]"],
          answer: 0,
          feedback: "처음부터 2칸씩 건너뛰면서 가져와요!"
        },
        result: "[0, 2, 4, 6, 8]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["step을 -1로 하면? 뒤집기!"],
        code: `nums = [1, 2, 3, 4, 5]
print(nums[::-1])`,
        predict: {
          question: "결과는?",
          options: ["[5, 4, 3, 2, 1]", "[1, 2, 3, 4, 5]", "[5, 3, 1]", "에러"],
          answer: 0,
          feedback: "[::-1]은 리스트를 완전히 뒤집어요!"
        },
        result: "[5, 4, 3, 2, 1]",
        note: "[::-1]은 아주 자주 쓰이는 파이썬 트릭!"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "리스트에서 홀수 인덱스(1, 3, 5) 요소만 가져오세요",
        guide: "[1::2] → 인덱스 1부터 2칸씩!",
        hint: "시작을 1로, 스텝을 2로!",
        template: "data = ['a', 'b', 'c', 'd', 'e', 'f']\nprint(data[___::___])",
        blanksAnswer: ["1", "2"],
        answer: "data = ['a', 'b', 'c', 'd', 'e', 'f']\nprint(data[1::2])",
        expect: "['b', 'd', 'f']"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "리스트를 뒤집어서 출력하세요",
        guide: "[::-1]을 사용!",
        hint: "스텝에 -1을 넣으면 뒤집혀요!",
        template: "words = ['I', 'love', 'Python']\nprint(words[::___])",
        blanksAnswer: ["-1"],
        answer: "words = ['I', 'love', 'Python']\nprint(words[::-1])",
        expect: "['Python', 'love', 'I']"
      }
    },
    {
      type: "quiz",
      content: {
        question: "[0,1,2,3,4,5][::3]의 결과는?",
        options: ["[0, 3]", "[0, 1, 2]", "[3, 4, 5]", "[0, 3, 6]"],
        answer: 0,
        explanation: "인덱스 0에서 시작해서 3칸씩 건너뛰면 인덱스 0, 3 → [0, 3]"
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "스텝 슬라이싱",
        learned: [
          "[::2] → 2칸씩 건너뛰기",
          "[1::2] → 홀수 인덱스만",
          "[::-1] → 리스트 뒤집기",
          "[start:end:step] 세 가지 조합 가능"
        ],
        canDo: "건너뛰기와 뒤집기를 자유자재로!",
        emoji: "🔄"
      }
    },

    // ==================== CHAPTER 3: 문자열 슬라이싱 활용 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "문자열 슬라이싱 활용",
        desc: "문자열도 똑같이 잘라요!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 스텝 슬라이싱 복습!",
        task: "리스트를 뒤집어서 출력하세요",
        template: "nums = [5, 10, 15, 20]\nprint(nums[::___])",
        blanksAnswer: ["-1"],
        answer: "nums = [5, 10, 15, 20]\nprint(nums[::-1])",
        expect: "[20, 15, 10, 5]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["문자열도 슬라이싱 가능!"],
        code: `msg = "Hello, Python!"
print(msg[7:13])`,
        predict: {
          question: "결과는?",
          options: ["Python", "Hello,", " Pytho", "Python!"],
          answer: 0,
          feedback: "인덱스 7부터 12까지 → 'Python'"
        },
        result: "Python"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["문자열 뒤집기도 [::-1]!"],
        code: `word = "파이썬"
print(word[::-1])`,
        result: "썬이파",
        note: "회문(앞뒤 똑같은 단어) 검사할 때 유용해요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["실전 활용: 파일 확장자 추출하기!"],
        code: `filename = "photo.jpg"
ext = filename[-3:]
print(ext)`,
        predict: {
          question: "결과는?",
          options: ["jpg", "photo", ".jpg", "oto"],
          answer: 0,
          feedback: "[-3:]은 뒤에서 3글자! 확장자를 쉽게 가져와요."
        },
        result: "jpg"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "문자열의 처음 5글자만 출력하세요",
        guide: "[:5]를 사용!",
        hint: "end를 5로!",
        template: "text = \"프로그래밍은 재밌다!\"\nprint(text[:___])",
        blanksAnswer: ["5"],
        answer: "text = \"프로그래밍은 재밌다!\"\nprint(text[:5])",
        expect: "프로그래밍은"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "'level'이 회문(앞뒤 똑같은 단어)인지 확인하세요",
        guide: "원본 == 뒤집은 것 비교!",
        hint: "word == word[::-1]로 비교!",
        template: "word = 'level'\nprint(word ___ word[::___])",
        blanksAnswer: ["==", "-1"],
        answer: "word = 'level'\nprint(word == word[::-1])",
        expect: "True"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `msg = "Hello"
print(msg[1,3])`,
        options: [
          "슬라이싱은 콤마(,)가 아니라 콜론(:)",
          "인덱스가 범위를 초과",
          "문자열은 슬라이싱 불가",
          "문제없음"
        ],
        answer: 0,
        explanation: "슬라이싱은 msg[1:3]처럼 콜론(:)을 사용해야 해요! 콤마는 튜플을 만들어요."
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "문자열 슬라이싱",
        learned: [
          "문자열도 리스트처럼 슬라이싱 가능",
          "[-3:]로 뒤에서 N글자 추출",
          "[::-1]로 문자열 뒤집기",
          "회문 검사: word == word[::-1]"
        ],
        canDo: "문자열을 자유자재로 잘라내고 활용할 수 있어!",
        emoji: "🔤"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
