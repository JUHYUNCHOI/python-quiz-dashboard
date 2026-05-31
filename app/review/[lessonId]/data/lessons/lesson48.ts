import type { LessonData } from '../types';

export const lesson48: LessonData = {
  id: "48",
  title: "Part 8 문제 20",
  description: "모듈과 패키지 총정리 문제 20개!",
  steps: [
    // ==================== CHAPTER 1: ⭐ 쉬움 ====================
    {
      type: "chapter",
      content: { num: 1, title: "⭐ 쉬움", desc: "기본 import와 내장 모듈!" }
    },
    {
      type: "quiz",
      content: {
        question: "모듈을 가져오는 키워드는?",
        options: ["include", "require", "import", "using"],
        answer: 2,
        explanation: "파이썬은 import 키워드를 써요!",
        en: {
          question: "Which keyword imports a module?",
          options: ["include", "require", "import", "using"],
          explanation: "Python uses the import keyword!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "`from math import sqrt` 후 사용 방법은?",
        options: ["math.sqrt(16)", "sqrt(16)", "math(sqrt(16))", "import.sqrt(16)"],
        answer: 1,
        explanation: "from...import는 해당 이름만 가져오므로 sqrt(16)으로 직접 호출!",
        en: {
          question: "After `from math import sqrt`, how do you call it?",
          options: ["math.sqrt(16)", "sqrt(16)", "math(sqrt(16))", "import.sqrt(16)"],
          explanation: "from...import imports the name directly, so sqrt(16)!"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `import math
print(math.ceil(3.1))`,
        predict: {
          options: ["3", "4", "3.1", "에러"],
          answer: 1,
          feedback: "ceil은 올림! 3.1 → 4"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["3", "4", "3.1", "Error"],
            feedback: "ceil rounds up! 3.1 → 4"
          }
        },
        result: "4"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `import math
print(math.floor(7.9))`,
        predict: {
          options: ["7", "8", "7.9", "에러"],
          answer: 0,
          feedback: "floor는 내림! 7.9 → 7"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["7", "8", "7.9", "Error"],
            feedback: "floor rounds down! 7.9 → 7"
          }
        },
        result: "7"
      }
    },
    {
      type: "quiz",
      content: {
        question: "패키지를 설치하는 명령어는?",
        options: ["python install", "pip install", "import install", "module install"],
        answer: 1,
        explanation: "pip install 패키지이름!",
        en: {
          question: "What's the command to install a package?",
          options: ["python install", "pip install", "import install", "module install"],
          explanation: "pip install package-name!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "모듈과 패키지의 관계는?",
        options: [
          "같은 것이다",
          "모듈 = 여러 패키지",
          "패키지 = 여러 모듈을 묶은 폴더",
          "관계 없음"
        ],
        answer: 2,
        explanation: "패키지는 여러 모듈을 묶은 폴더예요!",
        en: {
          question: "What's the relation between module and package?",
          options: [
            "Same thing",
            "Module = many packages",
            "Package = folder of multiple modules",
            "No relation"
          ],
          explanation: "Package is a folder containing modules!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "math 모듈을 import하고 sqrt(36)을 출력하세요",
        guide: "기본 import + math.함수",
        hint: "import math; math.sqrt(36)",
        template: "import ___\nprint(math.sqrt(36))",
        answer: "math",
        expect: "6.0",
        en: {
          task: "Import math and print sqrt(36)",
          guide: "Basic import + math.function",
          hint: "import math; math.sqrt(36)"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "math를 m이라는 별명으로 import하고 pi를 출력하세요",
        guide: "import 모듈 as 별명",
        hint: "import math as m",
        template: "import math ___ m\nprint(m.pi)",
        answer: "as",
        expect: "3.141592653589793",
        en: {
          task: "Import math as m and print pi",
          guide: "import module as alias",
          hint: "import math as m"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "쉬움 정리",
        learned: ["import 키워드", "from...import", "as 별명", "pip install"],
        canDo: "기본 import 패턴을 자유롭게 써!",
        emoji: "⭐"
      }
    },

    // ==================== CHAPTER 2: ⭐⭐ 보통 ====================
    {
      type: "chapter",
      content: { num: 2, title: "⭐⭐ 보통", desc: "여러 모듈 다루기!" }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 함수 복습!",
        task: "리스트의 평균을 반환하는 함수를 완성하세요",
        template: "def avg(nums):\n    ___ sum(nums) / len(nums)\nprint(avg([2, 4, 6]))",
        answer: "return",
        expect: "4.0",
        en: {
          message: "🔄 Function review!",
          task: "Complete a function that returns the average"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "`random.randint(1, 6)`으로 나올 수 없는 값은?",
        options: ["1", "3", "6", "7"],
        answer: 3,
        explanation: "randint(1, 6)은 1 이상 6 이하! 7은 불가!",
        en: {
          question: "Which value cannot come from `random.randint(1, 6)`?",
          options: ["1", "3", "6", "7"],
          explanation: "randint(1, 6) is 1 to 6 inclusive! 7 impossible!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "다음 중 내장 모듈(설치 불필요)이 아닌 것은?",
        options: ["math", "json", "requests", "string"],
        answer: 2,
        explanation: "requests는 외부 패키지! pip install requests 필요!",
        en: {
          question: "Which is NOT a built-in module?",
          options: ["math", "json", "requests", "string"],
          explanation: "requests is external! Needs pip install requests!"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `import json
d = {'a': 1, 'b': 2}
s = json.dumps(d)
print(type(s).__name__)`,
        predict: {
          options: ["dict", "str", "list", "int"],
          answer: 1,
          feedback: "json.dumps는 딕셔너리를 문자열(str)로 변환해요!"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["dict", "str", "list", "int"],
            feedback: "json.dumps converts dict to string (str)!"
          }
        },
        result: "str"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "math.pi와 반지름 r=10으로 원의 둘레를 출력하세요 (2*pi*r)",
        guide: "둘레 = 2 * pi * r",
        hint: "2 * math.pi * 10",
        template: "import math\nr = 10\nperi = 2 * math.___ * r\nprint(f'{peri:.2f}')",
        answer: "pi",
        expect: "62.83",
        en: {
          task: "Use math.pi and r=10 to print circle circumference",
          guide: "circumference = 2 * pi * r",
          hint: "2 * math.pi * 10"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "json.dumps로 딕셔너리를 문자열로, json.loads로 다시 딕셔너리로 변환하는 코드를 채우세요",
        guide: "dumps = 저장, loads = 불러오기",
        hint: "json.dumps / json.loads",
        template: "import json\nd = {'x': 10}\ns = json.___(d)\nback = json.___(s)\nprint(back['x'])",
        blanksAnswer: ["dumps", "loads"],
        answer: "import json\nd = {'x': 10}\ns = json.dumps(d)\nback = json.loads(s)\nprint(back['x'])",
        expect: "10",
        en: {
          task: "Use json.dumps and json.loads",
          guide: "dumps = save, loads = load",
          hint: "json.dumps / json.loads"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "`pip list`는 무엇을 보여주나요?",
        options: [
          "파이썬 문법 목록",
          "설치된 패키지 목록",
          "사용 가능한 함수 목록",
          "import한 모듈 목록"
        ],
        answer: 1,
        explanation: "pip list는 현재 설치된 모든 패키지를 보여줘요!",
        en: {
          question: "What does `pip list` show?",
          options: [
            "Python syntax list",
            "Installed packages list",
            "Available functions list",
            "Imported modules list"
          ],
          explanation: "pip list shows all currently installed packages!"
        }
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `from math import pi
print(math.pi)`,
        options: [
          "from으로 pi만 import했는데 math.pi로 호출 → NameError",
          "pi가 존재하지 않음",
          "괄호가 빠짐",
          "문제없음"
        ],
        answer: 0,
        explanation: "from으로는 pi만 가져왔어요. math 자체는 import 안 됐으니 pi로 호출해야 해요!",
        en: {
          question: "What's wrong with this code?",
          options: [
            "Imported only pi but called math.pi → NameError",
            "pi doesn't exist",
            "Missing parentheses",
            "No problem"
          ],
          explanation: "from imports just pi. math itself isn't imported, so use pi directly!"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "보통 정리",
        learned: ["math/json/random 활용", "내장 vs 외부 구분", "json dumps/loads"],
        canDo: "여러 모듈을 자유롭게 조합해!",
        emoji: "⭐⭐"
      }
    },

    // ==================== CHAPTER 3: ⭐⭐⭐ 도전 ====================
    {
      type: "chapter",
      content: { num: 3, title: "⭐⭐⭐ 도전", desc: "모듈 종합 활용!" }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 딕셔너리 복습!",
        task: "딕셔너리의 모든 값을 리스트로 가져오세요",
        template: "d = {'a': 1, 'b': 2, 'c': 3}\nprint(list(d.___()))",
        answer: "values",
        expect: "[1, 2, 3]",
        en: {
          message: "🔄 Dict review!",
          task: "Get all values of a dict as a list"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `from datetime import date
d1 = date(2026, 1, 1)
d2 = date(2026, 1, 31)
print((d2 - d1).days)`,
        predict: {
          options: ["29", "30", "31", "에러"],
          answer: 1,
          feedback: "1월 1일부터 1월 31일까지 = 30일! (31-1)"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["29", "30", "31", "Error"],
            feedback: "Jan 1 to Jan 31 = 30 days! (31-1)"
          }
        },
        result: "30"
      }
    },
    {
      type: "quiz",
      content: {
        question: "외부 패키지 사용 순서로 올바른 것은?",
        options: [
          "import → pip install → 사용",
          "사용 → pip install → import",
          "pip install → import → 사용",
          "pip install만 하면 됨"
        ],
        answer: 2,
        explanation: "설치 → 불러오기 → 사용! 이 순서 필수!",
        en: {
          question: "Correct order for using an external package?",
          options: [
            "import → pip install → use",
            "use → pip install → import",
            "pip install → import → use",
            "Just pip install"
          ],
          explanation: "Install → import → use! This order is required!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "가상환경(venv)을 쓰는 이유로 가장 적절한 것은?",
        options: [
          "코드 실행이 빨라져서",
          "프로젝트마다 다른 패키지 버전을 따로 관리하려고",
          "파이썬 자체를 빠르게 설치하려고",
          "필수 기능이라서"
        ],
        answer: 1,
        explanation: "프로젝트별로 환경을 격리해서 버전 충돌을 막아요!",
        en: {
          question: "Why use a virtual environment (venv)?",
          options: [
            "Faster code execution",
            "Manage different package versions per project",
            "Install Python itself faster",
            "Required feature"
          ],
          explanation: "Isolates each project's environment to avoid version conflicts!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "math와 json을 같이 써서 성적 평균(올림)과 JSON 문자열을 출력하세요. 학생 리스트는 [{'name':'a','score':80},{'name':'b','score':95}]",
        guide: "리스트 컴프리헨션으로 점수 추출, math.ceil로 올림, json.dumps로 변환",
        hint: "scores = [s['score'] for s in students]; ceil(sum/len)",
        template: null,
        answer: `import math
import json
students = [{'name': 'a', 'score': 80}, {'name': 'b', 'score': 95}]
scores = [s['score'] for s in students]
avg = sum(scores) / len(scores)
print(math.ceil(avg))
print(json.dumps(students))`,
        alternateAnswers: [
          `import math, json
students = [{'name': 'a', 'score': 80}, {'name': 'b', 'score': 95}]
scores = [s['score'] for s in students]
avg = sum(scores) / len(scores)
print(math.ceil(avg))
print(json.dumps(students))`,
          `import json
import math
students = [{'name': 'a', 'score': 80}, {'name': 'b', 'score': 95}]
total = sum(s['score'] for s in students)
print(math.ceil(total / len(students)))
print(json.dumps(students))`
        ],
        expect: `88\n[{"name": "a", "score": 80}, {"name": "b", "score": 95}]`,
        en: {
          task: "Use math + json to print ceil average and JSON string",
          guide: "Extract scores, math.ceil, json.dumps",
          hint: "Comprehension + ceil + dumps"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `import random
random.seed(0)
print(random.randint(1, 100))`,
        predict: {
          options: ["1", "50", "50 (시드 고정)", "랜덤"],
          answer: 2,
          feedback: "seed(0) 고정! random.randint(1,100)는 항상 50을 반환해요. 시드는 같은 결과를 재현해요!"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["1", "50", "50 (seed fixed)", "Random"],
            feedback: "seed(0) is fixed! randint(1,100) always returns 50. Seed gives reproducibility!"
          }
        },
        result: "50"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `import random
picks = random.sample([1, 2, 3], 10)`,
        options: [
          "리스트 길이보다 큰 k → ValueError",
          "sample이 존재하지 않음",
          "타입 오류",
          "문제없음"
        ],
        answer: 0,
        explanation: "sample은 중복 없이 뽑아야 하는데 리스트 길이(3)보다 큰 10을 요청 → ValueError!",
        en: {
          question: "What's wrong here?",
          options: [
            "k > list length → ValueError",
            "sample doesn't exist",
            "Type error",
            "No problem"
          ],
          explanation: "sample needs unique picks. Requesting 10 from a list of 3 → ValueError!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "datetime.date를 사용해 2026-12-31과 2026-01-01 사이의 일 수를 출력하는 코드를 처음부터 작성하세요",
        guide: "from datetime import date; (d2-d1).days",
        hint: "두 date 객체를 빼면 timedelta. .days 접근",
        template: null,
        answer: `from datetime import date
d1 = date(2026, 1, 1)
d2 = date(2026, 12, 31)
print((d2 - d1).days)`,
        alternateAnswers: [
          `import datetime
d1 = datetime.date(2026, 1, 1)
d2 = datetime.date(2026, 12, 31)
print((d2 - d1).days)`,
          `from datetime import date
print((date(2026,12,31) - date(2026,1,1)).days)`
        ],
        expect: "364",
        en: {
          task: "Use datetime.date to print days between 2026-12-31 and 2026-01-01",
          guide: "from datetime import date; (d2-d1).days",
          hint: "Subtract dates, access .days"
        }
      }
    },
    {
      type: "reward",
      content: {
        emoji: "🏆",
        message: "Part 8 완주!"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "도전 정리",
        learned: [
          "math + json + random 종합",
          "datetime 일수 계산",
          "외부 패키지 흐름",
          "시드(seed) 활용"
        ],
        canDo: "다양한 모듈을 조합해 문제를 풀 수 있어!",
        emoji: "⭐⭐⭐"
      }
    },

    { type: "done", content: {} }
  ]
};
