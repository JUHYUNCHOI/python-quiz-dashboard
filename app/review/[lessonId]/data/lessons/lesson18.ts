// 레슨 18: split()과 join()
import { LessonData } from '../types';

export const lesson18: LessonData = {
  id: "18",
  title: "split()과 join()",
  description: "문자열을 쪼개고 합치는 마법!",
  steps: [
    // ==================== CHAPTER 1: split() 기본 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "split() - 문자열 쪼개기",
        desc: "문자열을 리스트로 변환!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "sentence = \"나는 파이썬을 좋아해\"\nwords = sentence.split()\nprint(words)",
        predict: {
          question: "결과는?",
          options: [
            "나는 파이썬을 좋아해",
            "[\"나는\", \"파이썬을\", \"좋아해\"]",
            "[\"나\", \"는\", \" \", \"파\", \"이\", \"썬\"]",
            "에러"
          ],
          answer: 1,
          feedback: "split()은 공백을 기준으로 문자열을 쪼개서 리스트로 만들어요!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: [
              "나는 파이썬을 좋아해",
              "[\"나는\", \"파이썬을\", \"좋아해\"]",
              "[\"나\", \"는\", \" \", \"파\", \"이\", \"썬\"]",
              "Error"
            ],
            feedback: "split() splits the string by spaces and returns a list!"
          }
        },
        result: "['나는', '파이썬을', '좋아해']"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "data = \"사과,바나나,포도\"\nfruits = data.split(\",\")\nprint(fruits)",
        result: "['사과', '바나나', '포도']",
        note: "콤마(,)를 기준으로 쪼개졌어요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "date = \"2025-01-15\"\nparts = date.split(\"-\")\nprint(parts)",
        predict: {
          question: "parts[1]의 값은?",
          options: ["2025", "01", "15", "-"],
          answer: 1,
          feedback: "split(\"-\")로 쪼개면 [\"2025\", \"01\", \"15\"], 인덱스 1은 \"01\"!"
        },
        en: {
          predict: {
            question: "What is the value of parts[1]?",
            options: ["2025", "01", "15", "-"],
            feedback: "split(\"-\") gives [\"2025\", \"01\", \"15\"], so index 1 is \"01\"!"
          }
        },
        result: "['2025', '01', '15']"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "sentence = \"hello world python\"\nwords = sentence.split()\nprint(len(words))",
        predict: {
          question: "결과는?",
          options: ["1", "2", "3", "18"],
          answer: 2,
          feedback: "공백으로 쪼개면 3개의 단어!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["1", "2", "3", "18"],
            feedback: "Splitting by spaces gives 3 words!"
          }
        },
        result: "3"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "콤마로 구분된 과일을 리스트로 쪼개기",
        guide: "split(구분자) 사용!",
        hint: "split(\",\") 사용!",
        template: "data = \"딸기,망고,키위\"\nfruits = data.___(___)\nprint(fruits)",
        blanksAnswer: ["split", "\",\""],
        answer: "data = \"딸기,망고,키위\"\nfruits = data.split(\",\")\nprint(fruits)",
        expect: "['딸기', '망고', '키위']",
        en: {
          task: "Split comma-separated fruits into a list",
          guide: "Use split(delimiter)!",
          hint: "Use split(\",\")!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "\"a-b-c\".split(\"-\")의 결과는?",
        options: ["\"abc\"", "[\"a-b-c\"]", "[\"a\", \"b\", \"c\"]", "[\"a\", \"-\", \"b\", \"-\", \"c\"]"],
        answer: 2,
        explanation: "\"-\"를 기준으로 쪼개면 [\"a\", \"b\", \"c\"]가 돼요!",
        en: {
          question: "What is the result of \"a-b-c\".split(\"-\")?",
          options: ["\"abc\"", "[\"a-b-c\"]", "[\"a\", \"b\", \"c\"]", "[\"a\", \"-\", \"b\", \"-\", \"c\"]"],
          explanation: "Splitting by \"-\" gives [\"a\", \"b\", \"c\"]!"
        }
      }
    },
    {
      type: "reward",
      content: {
        message: "split() 마스터!",
        emoji: "✂️"
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "split() - 문자열 쪼개기",
        learned: [
          "split() = 공백 기준으로 쪼개기",
          "split(구분자) = 원하는 기준으로 쪼개기",
          "결과는 항상 리스트!"
        ],
        canDo: "문자열을 원하는 기준으로 리스트로 변환할 수 있어!",
        emoji: "✂️"
      }
    },

    // ==================== CHAPTER 2: join() 기본 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "join() - 리스트 합치기",
        desc: "리스트를 하나의 문자열로!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 리스트 기초 복습! (레슨 16)",
        task: "리스트에서 마지막 요소 출력하기",
        template: "fruits = [\"사과\", \"바나나\", \"포도\"]\nprint(fruits[___])",
        answer: "-1",
        expect: "포도",
        en: {
          message: "🔄 List basics review! (Lesson 16)",
          task: "Print the last element of the list"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "words = [\"나는\", \"파이썬을\", \"좋아해\"]\nsentence = \" \".join(words)\nprint(sentence)",
        predict: {
          question: "결과는?",
          options: [
            "[\"나는\", \"파이썬을\", \"좋아해\"]",
            "나는파이썬을좋아해",
            "나는 파이썬을 좋아해",
            "에러"
          ],
          answer: 2,
          feedback: "\" \"(공백)을 사이사이에 넣어서 합쳐요!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: [
              "[\"나는\", \"파이썬을\", \"좋아해\"]",
              "나는파이썬을좋아해",
              "나는 파이썬을 좋아해",
              "Error"
            ],
            feedback: "\" \" (space) is inserted between each element when joining!"
          }
        },
        result: "나는 파이썬을 좋아해"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "fruits = [\"사과\", \"바나나\", \"포도\"]\nresult = \", \".join(fruits)\nprint(result)",
        result: "사과, 바나나, 포도",
        note: "\", \"(콤마+공백)으로 합쳐서 보기 좋게!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "letters = [\"P\", \"y\", \"t\", \"h\", \"o\", \"n\"]\nword = \"\".join(letters)\nprint(word)",
        predict: {
          question: "결과는?",
          options: ["P y t h o n", "Python", "[\"P\", \"y\", \"t\", \"h\", \"o\", \"n\"]", "에러"],
          answer: 1,
          feedback: "빈 문자열 \"\"로 합치면 글자가 바로 붙어요!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["P y t h o n", "Python", "[\"P\", \"y\", \"t\", \"h\", \"o\", \"n\"]", "Error"],
            feedback: "Joining with an empty string \"\" puts the letters right next to each other!"
          }
        },
        result: "Python"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["join()은 문자열 리스트만 가능해요!"],
        code: "numbers = [1, 2, 3]\n# \"-\".join(numbers)  # TypeError!\n\n# 숫자는 str()로 변환 필요!\nresult = \"-\".join(str(n) for n in numbers)\nprint(result)",
        result: "1-2-3",
        note: "숫자 리스트는 str()로 변환 후 join!"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "단어 리스트를 공백으로 합치기",
        guide: "구분자.join(리스트) 형태!",
        hint: "\" \".join(words)",
        template: "words = [\"Hello\", \"Python\", \"World\"]\nresult = ___.join(___)\nprint(result)",
        blanksAnswer: ["\" \"", "words"],
        answer: "words = [\"Hello\", \"Python\", \"World\"]\nresult = \" \".join(words)\nprint(result)",
        expect: "Hello Python World",
        en: {
          task: "Join a list of words with spaces",
          guide: "Use the delimiter.join(list) format!",
          hint: "\" \".join(words)"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "과일 리스트를 \" / \"로 합치기",
        guide: "구분자를 \" / \"로!",
        hint: "\" / \".join(fruits)",
        template: "fruits = [\"사과\", \"바나나\", \"포도\"]\nresult = ___.join(fruits)\nprint(result)",
        answer: "\" / \"",
        alternateAnswers: ["' / '"],
        expect: "사과 / 바나나 / 포도",
        en: {
          task: "Join the fruit list with \" / \"",
          guide: "Set the delimiter to \" / \"!",
          hint: "\" / \".join(fruits)"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "\"-\".join([\"2025\", \"01\", \"15\"])의 결과는?",
        options: ["[\"2025\", \"01\", \"15\"]", "2025-01-15", "20250115", "에러"],
        answer: 1,
        explanation: "\"-\"를 사이에 넣어서 합치면 \"2025-01-15\"가 돼요!",
        en: {
          question: "What is the result of \"-\".join([\"2025\", \"01\", \"15\"])?",
          options: ["[\"2025\", \"01\", \"15\"]", "2025-01-15", "20250115", "Error"],
          explanation: "Joining with \"-\" between each element gives \"2025-01-15\"!"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "join() - 리스트 합치기",
        learned: [
          "구분자.join(리스트) = 합치기",
          "\"\" 빈 문자열로 합치면 바로 붙음",
          "숫자는 str()로 변환 후 join"
        ],
        canDo: "리스트를 원하는 구분자로 하나의 문자열로 합칠 수 있어!",
        emoji: "🔗"
      }
    },

    // ==================== CHAPTER 3: 실전 활용 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "실전 활용",
        desc: "split + join 조합의 힘!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 리스트 컴프리헨션 복습!",
        task: "1~4의 제곱 리스트 만들기",
        template: "squares = [___ for n in range(1, 5)]\nprint(squares)",
        answer: "n ** 2",
        expect: "[1, 4, 9, 16]",
        en: {
          message: "🔄 List comprehension review!",
          task: "Create a list of squares from 1 to 4"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "date = \"2025/01/15\"\nparts = date.split(\"/\")\nnew_date = \"-\".join(parts)\nprint(new_date)",
        predict: {
          question: "결과는?",
          options: ["2025/01/15", "2025-01-15", "2025 01 15", "에러"],
          answer: 1,
          feedback: "\"/\"로 쪼개고 \"-\"로 합치면 구분자가 바뀌어요!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["2025/01/15", "2025-01-15", "2025 01 15", "Error"],
            feedback: "Split by \"/\" then join with \"-\" to swap the delimiter!"
          }
        },
        result: "2025-01-15"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "csv = \"이름,나이,도시\"\nheaders = csv.split(\",\")\nprint(headers)\nprint(f\"두 번째 항목: {headers[1]}\")",
        result: "['이름', '나이', '도시']\n두 번째 항목: 나이",
        note: "콤마로 구분된 데이터를 쉽게 처리!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "sentence = \"파이썬 정말 재밌다\"\nwords = sentence.split()\nwords.reverse()\nresult = \" \".join(words)\nprint(result)",
        predict: {
          question: "결과는?",
          options: [
            "파이썬 정말 재밌다",
            "다밌재 말정 썬이파",
            "재밌다 정말 파이썬",
            "에러"
          ],
          answer: 2,
          feedback: "단어 단위로 쪼개고 뒤집은 후 다시 합치면 단어 순서가 바뀌어요!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: [
              "파이썬 정말 재밌다",
              "다밌재 말정 썬이파",
              "재밌다 정말 파이썬",
              "Error"
            ],
            feedback: "Split into words, reverse the list, then join again — the word order is reversed!"
          }
        },
        result: "재밌다 정말 파이썬"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["여러 공백도 깔끔하게 정리!"],
        code: "messy = \"  너무   많은    공백  \"\nclean = \" \".join(messy.split())\nprint(clean)",
        result: "너무 많은 공백",
        note: "split()은 여러 공백도 자동으로 처리해요!"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "날짜 형식을 \"2025.01.15\"에서 \"2025-01-15\"로 바꾸기",
        guide: "split으로 쪼개고 join으로 합치기!",
        hint: "split(\".\")으로 쪼개고 \"-\".join()으로 합치기!",
        template: "date = \"2025.01.15\"\nparts = date.___(___)\nresult = ___.join(parts)\nprint(result)",
        blanksAnswer: ["split", "\".\"", "\"-\""],
        answer: "date = \"2025.01.15\"\nparts = date.split(\".\")\nresult = \"-\".join(parts)\nprint(result)",
        expect: "2025-01-15",
        en: {
          task: "Convert date format from \"2025.01.15\" to \"2025-01-15\"",
          guide: "Split first, then join!",
          hint: "Split by \".\" then join with \"-\"!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "문장의 각 단어 첫 글자를 대문자로 바꾸기",
        guide: "split, capitalize, join 조합!",
        hint: "리스트 컴프리헨션과 .capitalize() 사용!",
        template: "text = \"hello python world\"\nwords = text.split()\ncapitalized = [w.___() for w in words]\nresult = \" \".join(___)\nprint(result)",
        blanksAnswer: ["capitalize", "capitalized"],
        answer: "text = \"hello python world\"\nwords = text.split()\ncapitalized = [w.capitalize() for w in words]\nresult = \" \".join(capitalized)\nprint(result)",
        expect: "Hello Python World",
        en: {
          task: "Capitalize the first letter of each word in the sentence",
          guide: "Combine split, capitalize, and join!",
          hint: "Use list comprehension with .capitalize()!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "\" \".join(\"hello world\".split())의 결과는?",
        options: [
          "[\"hello\", \"world\"]",
          "\"hello world\"",
          "\"helloworld\"",
          "에러"
        ],
        answer: 1,
        explanation: "split()으로 쪼갠 후 공백으로 다시 합치면 원래 문장이 돼요! (여러 공백이 있었다면 깔끔해짐)",
        en: {
          question: "What is the result of \" \".join(\"hello world\".split())?",
          options: [
            "[\"hello\", \"world\"]",
            "\"hello world\"",
            "\"helloworld\"",
            "Error"
          ],
          explanation: "After splitting and joining back with a space, you get the original sentence! (Extra spaces get cleaned up)"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "실전 활용",
        learned: [
          "split + join = 구분자 변환",
          "CSV 데이터 처리에 활용",
          "단어 순서 뒤집기, 공백 정리 가능",
          "리스트 컴프리헨션과 함께 활용!"
        ],
        canDo: "split과 join을 조합해서 다양한 문자열 처리를 할 수 있어!",
        emoji: "🚀"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
