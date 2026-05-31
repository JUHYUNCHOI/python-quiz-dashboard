import type { LessonData } from '../types';

export const lesson46: LessonData = {
  id: "46",
  title: "패키지와 pip",
  description: "세계 개발자들이 만든 코드를 설치하고 사용해요!",
  steps: [
    // ==================== CHAPTER 1: 모듈 vs 패키지 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "모듈 vs 패키지",
        desc: "공구함 1개 vs 공구함 세트!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["모듈 = .py 파일 1개. 패키지 = 모듈 여러 개 묶은 폴더!"],
        code: `# 모듈 — 단일 파일
import math
print(math.sqrt(16))

# 패키지 — 폴더 구조
# requests/
#   __init__.py
#   api.py
#   models.py`,
        result: "4.0",
        note: "math는 모듈, requests는 패키지!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "모듈과 패키지의 차이는?",
        options: [
          "차이 없다",
          "패키지 = 여러 모듈을 묶은 폴더",
          "모듈이 패키지보다 크다",
          "패키지 = 함수 1개"
        ],
        answer: 1,
        explanation: "모듈은 .py 파일 1개, 패키지는 모듈을 묶은 폴더예요!",
        en: {
          question: "What's the difference between a module and a package?",
          options: [
            "No difference",
            "Package = a folder of multiple modules",
            "Modules are bigger than packages",
            "Package = one function"
          ],
          explanation: "Module is one .py file, package is a folder of modules!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "다음 중 내장 모듈(설치 불필요)이 아닌 것은?",
        options: ["math", "json", "string", "requests"],
        answer: 3,
        explanation: "requests는 외부 패키지! pip install requests로 설치해야 해요.",
        en: {
          question: "Which of these is NOT a built-in module (requires install)?",
          options: ["math", "json", "string", "requests"],
          explanation: "requests is an external package! Install with pip install requests."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "math 모듈을 import해서 sqrt(25)를 출력하세요",
        guide: "내장 모듈은 설치 없이 import만!",
        hint: "import math 후 math.sqrt(25)!",
        template: "___ math\nprint(math.sqrt(25))",
        answer: "import",
        expect: "5.0",
        en: {
          task: "Import math and print sqrt(25)",
          guide: "Built-in modules just need import!",
          hint: "import math then math.sqrt(25)!"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "모듈 vs 패키지",
        learned: [
          "모듈 = .py 파일 1개",
          "패키지 = 모듈을 묶은 폴더",
          "내장 모듈은 설치 없이 import",
          "외부 패키지는 pip install 필요"
        ],
        canDo: "모듈과 패키지의 차이를 알아!",
        emoji: "📦"
      }
    },

    // ==================== CHAPTER 2: pip 명령어 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "pip 명령어",
        desc: "pip로 설치/삭제/목록/업그레이드!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["pip = Package Installer for Python!"],
        code: `# 터미널에서 실행하는 명령어!
pip install requests        # 설치
pip uninstall requests      # 삭제
pip list                    # 설치된 패키지 목록
pip show requests           # 패키지 정보
pip install --upgrade pip   # 업그레이드`,
        note: "pip은 터미널 명령어! 웹에서는 실행 안 되지만 꼭 기억!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "외부 패키지를 설치하는 명령어는?",
        options: ["python install 패키지", "pip install 패키지", "import 패키지", "download 패키지"],
        answer: 1,
        explanation: "pip install 패키지이름으로 설치해요!",
        en: {
          question: "What's the command to install an external package?",
          options: ["python install pkg", "pip install pkg", "import pkg", "download pkg"],
          explanation: "pip install package-name installs packages!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "설치된 패키지 목록을 보는 명령어는?",
        options: ["pip show all", "pip list", "pip packages", "pip --all"],
        answer: 1,
        explanation: "pip list는 현재 설치된 모든 패키지를 보여줘요!",
        en: {
          question: "Which command shows the list of installed packages?",
          options: ["pip show all", "pip list", "pip packages", "pip --all"],
          explanation: "pip list shows all currently installed packages!"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["버전 지정자도 익혀두면 좋아!"],
        code: `# requirements.txt — 프로젝트가 필요한 패키지 목록
requests==2.31.0      # 정확히 이 버전
numpy>=1.20.0         # 이 버전 이상
pandas~=2.0.0         # 2.0.x 호환 버전

# 한 번에 설치:
# pip install -r requirements.txt`,
        note: "==(정확), >=(이상), ~=(호환). 협업할 때 필수!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "`requests==2.31.0`의 의미는?",
        options: [
          "2.31.0 이상 아무 버전",
          "정확히 2.31.0 버전만",
          "2.31.0 이하 모든 버전",
          "최신 버전"
        ],
        answer: 1,
        explanation: "==는 정확히 그 버전을 의미해요! 같은 환경 재현에 안전!",
        en: {
          question: "What does `requests==2.31.0` mean?",
          options: [
            "2.31.0 or any later version",
            "Exactly version 2.31.0",
            "2.31.0 or earlier",
            "Latest version"
          ],
          explanation: "== means exact version! Safe for reproducing the same environment."
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["가상환경(venv) — 프로젝트마다 패키지를 따로 관리!"],
        code: `# 1. 가상환경 만들기
python -m venv myenv

# 2. 활성화 (Mac/Linux)
source myenv/bin/activate

# 3. 패키지 설치 — 이 환경에만 적용!
pip install requests

# 4. 비활성화
deactivate`,
        note: "프로젝트 A는 requests 2.0, 프로젝트 B는 3.0? venv로 분리!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "가상환경(venv)을 쓰는 이유는?",
        options: [
          "코드가 빨라져서",
          "프로젝트마다 패키지 버전을 따로 관리하려고",
          "용량을 줄이려고",
          "필수 사용"
        ],
        answer: 1,
        explanation: "프로젝트 A와 B가 다른 버전 패키지를 써야 할 때, venv로 분리해서 충돌 방지!",
        en: {
          question: "Why use a virtual environment (venv)?",
          options: [
            "To make code faster",
            "To manage package versions per project",
            "To reduce file size",
            "It's required"
          ],
          explanation: "When project A and B need different package versions, venv separates them to avoid conflicts!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "from...import로 math의 sqrt와 pi만 가져와서 원의 넓이를 계산하세요",
        guide: "from 모듈 import 함수1, 함수2",
        hint: "from math import sqrt, pi",
        template: "___ math ___ sqrt, pi\nr = 4\narea = pi * r ** 2\nprint(f'넓이={area:.2f}, 제곱근={sqrt(area):.2f}')",
        blanksAnswer: ["from", "import"],
        answer: "from math import sqrt, pi\nr = 4\narea = pi * r ** 2\nprint(f'넓이={area:.2f}, 제곱근={sqrt(area):.2f}')",
        expect: "넓이=50.27, 제곱근=7.09",
        en: {
          task: "Use from...import to import sqrt and pi from math, then compute circle area",
          guide: "from module import func1, func2",
          hint: "from math import sqrt, pi"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "pip 명령어",
        learned: [
          "pip install 패키지 — 설치",
          "pip list — 목록 확인",
          "pip install --upgrade — 업그레이드",
          "requirements.txt — 의존성 목록",
          "venv — 프로젝트별 격리"
        ],
        canDo: "pip으로 패키지를 관리할 수 있어!",
        emoji: "⚙️"
      }
    },

    // ==================== CHAPTER 3: 외부 패키지 사용 흐름 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "패키지 사용 흐름",
        desc: "설치 → import → 사용!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 모듈 복습!",
        task: "math 모듈에서 sqrt만 별명 s로 import하세요",
        template: "from math import sqrt ___ s\nprint(s(81))",
        answer: "as",
        expect: "9.0",
        en: {
          message: "🔄 Module review!",
          task: "Import sqrt as s from math"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["외부 패키지를 쓰는 정석 흐름!"],
        code: `# 1단계: 터미널에서 설치
# pip install requests

# 2단계: 코드에서 import
import requests

# 3단계: 사용
# response = requests.get('https://example.com')
# print(response.status_code)`,
        note: "설치 → import → 사용! 순서가 핵심!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "외부 패키지 사용 순서로 올바른 것은?",
        options: [
          "import → pip install → 사용",
          "사용 → import → pip install",
          "pip install → import → 사용",
          "pip install만 하면 됨"
        ],
        answer: 2,
        explanation: "먼저 설치(pip install), 다음 불러오기(import), 그 다음 사용!",
        en: {
          question: "What's the correct order for using an external package?",
          options: [
            "import → pip install → use",
            "use → import → pip install",
            "pip install → import → use",
            "Just pip install"
          ],
          explanation: "First install (pip install), then import, then use!"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `import math as m
print(m.pi)`,
        predict: {
          options: ["에러", "math.pi", "3.141592653589793", "pi"],
          answer: 2,
          feedback: "as m으로 별명을 붙였으니 m.pi! math 모듈의 pi 상수가 출력돼요."
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["Error", "math.pi", "3.141592653589793", "pi"],
            feedback: "as m gives an alias, so m.pi works! Prints math's pi constant."
          }
        },
        result: "3.141592653589793"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `from math import sqrt
print(math.sqrt(16))`,
        options: [
          "from으로 sqrt만 import했는데 math.sqrt로 호출 → NameError",
          "sqrt가 존재하지 않음",
          "괄호가 잘못됨",
          "문제없음"
        ],
        answer: 0,
        explanation: "from...import는 해당 이름만 가져와요. math 자체는 import 안 되므로 sqrt(16)로 호출해야 해요!",
        en: {
          question: "What's wrong with this code?",
          options: [
            "Imported only sqrt but called math.sqrt → NameError",
            "sqrt doesn't exist",
            "Wrong parentheses",
            "No problem"
          ],
          explanation: "from...import only gets that name. math itself isn't imported, so call sqrt(16) directly!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "json 모듈로 딕셔너리를 문자열로 변환하세요",
        guide: "json.dumps()는 딕셔너리 → 문자열",
        hint: "json.dumps(data, ensure_ascii=False)",
        template: "import json\ndata = {'name': '용사', 'hp': 100}\nresult = json.___(data, ensure_ascii=False)\nprint(result)",
        answer: "dumps",
        expect: `{"name": "용사", "hp": 100}`,
        en: {
          task: "Use json to convert dict to string",
          guide: "json.dumps() converts dict to string",
          hint: "json.dumps(data, ensure_ascii=False)"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "math 모듈을 사용해 1부터 10까지 제곱근을 출력하는 코드를 처음부터 작성하세요",
        guide: "import math 후 for 루프 + math.sqrt 사용",
        hint: "import math; for i in range(1, 11): print(math.sqrt(i))",
        template: null,
        answer: `import math
for i in range(1, 11):
    print(math.sqrt(i))`,
        alternateAnswers: [
          `from math import sqrt
for i in range(1, 11):
    print(sqrt(i))`,
          `import math
for i in range(1,11):
    print(math.sqrt(i))`
        ],
        expect: "1.0\n1.4142135623730951\n1.7320508075688772\n2.0\n2.23606797749979\n2.449489742783178\n2.6457513110645907\n2.8284271247461903\n3.0\n3.1622776601683795",
        en: {
          task: "Write code from scratch using math to print sqrt(1) to sqrt(10)",
          guide: "import math, then loop with math.sqrt",
          hint: "import math; loop 1 to 10"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "`pip install --upgrade requests`의 의미는?",
        options: [
          "requests 삭제",
          "requests 설치",
          "requests 최신 버전으로 업그레이드",
          "requests 정보 보기"
        ],
        answer: 2,
        explanation: "--upgrade 플래그는 패키지를 최신 버전으로 업그레이드해요!",
        en: {
          question: "What does `pip install --upgrade requests` do?",
          options: [
            "Uninstall requests",
            "Install requests",
            "Upgrade requests to the latest version",
            "Show requests info"
          ],
          explanation: "The --upgrade flag updates the package to the latest version!"
        }
      }
    },
    {
      type: "reward",
      content: {
        emoji: "📦",
        message: "패키지 마스터!"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "종합 정리",
        learned: [
          "내장 모듈은 바로 import",
          "외부 패키지는 pip install 후 import",
          "from...import로 일부만 가져오기",
          "as로 별명 붙이기",
          "venv로 프로젝트별 환경 분리"
        ],
        canDo: "패키지를 자유롭게 설치하고 사용할 수 있어!",
        emoji: "🎓"
      }
    },

    { type: "done", content: {} }
  ]
};
