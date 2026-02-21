import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "패키지란? + pip 기본",
  emoji: "📦",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "📁 모듈 vs 패키지",
      content: `## 모듈과 패키지의 차이!

**모듈 = 하나의 .py 파일**
\`\`\`python
# math.py = 모듈 하나
import math
print(math.sqrt(16))  # 4.0
\`\`\`

**패키지 = 여러 모듈을 묶은 폴더**
\`\`\`
requests/          # 패키지 폴더
    __init__.py
    api.py         # 모듈 1
    models.py      # 모듈 2
    utils.py       # 모듈 3
\`\`\`

**정리:**
| 구분 | 설명 | 예시 |
|------|------|------|
| 모듈 | .py 파일 하나 | math, json |
| 패키지 | 모듈 여러 개 묶음 | requests, pandas |

파이썬에는 **내장 모듈**(기본 포함)과 **외부 패키지**(따로 설치)가 있어요!`
    },
    {
      id: "ch1-1",
      type: "explain",
      title: "🔧 pip 기본 명령어",
      content: `## pip = 패키지 설치 도구!

pip은 **P**ackage **I**nstaller for **P**ython의 줄임말이에요.

\`\`\`bash
# 패키지 설치
pip install 패키지이름

# 패키지 삭제
pip uninstall 패키지이름

# 설치된 패키지 목록 보기
pip list

# 특정 패키지 정보 보기
pip show 패키지이름

# 패키지 업그레이드
pip install --upgrade 패키지이름
\`\`\`

> **참고:** pip 명령어는 터미널에서 실행해요!
> 이 웹 환경에서는 실행할 수 없지만, 명령어를 꼭 기억하세요!`
    },
    {
      id: "ch1-2",
      type: "quiz",
      title: "퀴즈!",
      content: "패키지를 설치하는 명령어는?",
      options: [
        "python install 패키지",
        "pip install 패키지",
        "import install 패키지",
        "download 패키지"
      ],
      answer: 1,
      explanation: "pip install이 패키지 설치 명령어예요!"
    },
    {
      id: "ch1-3",
      type: "quiz",
      title: "퀴즈!",
      content: "모듈과 패키지의 차이점은?",
      options: [
        "모듈이 패키지보다 크다",
        "패키지 = 여러 모듈 묶음",
        "차이 없다",
        "패키지 = 함수 하나"
      ],
      answer: 1,
      explanation: "모듈 = 하나의 .py 파일, 패키지 = 여러 모듈을 묶은 폴더!"
    },
    {
      id: "ch1-4",
      type: "tryit",
      title: "💻 내장 vs 외부 구분하기!",
      task: "내장 모듈은 바로 import 가능! 실행해보세요!",
      initialCode: `# 내장 모듈 = 설치 없이 바로 사용!
import math
import json
import string

print('=== 내장 모듈 테스트 ===')
print(f'math.sqrt(49) = {math.sqrt(49)}')
print(f'json.dumps({{"a": 1}}) = {json.dumps({"a": 1})}')
print(f'string.digits = {string.digits}')

# 외부 패키지는 pip install 필요!
# 이 웹에서는 설치 불가, 실제 컴퓨터에서 해보세요!
print('\\n=== 외부 패키지 (설치 필요) ===')
print('pip install requests  → 웹 요청')
print('pip install pandas    → 데이터 분석')
print('pip install pygame    → 게임 개발')`,
      expectedOutput: `=== 내장 모듈 테스트 ===\nmath.sqrt(49) = 7.0\njson.dumps({"a": 1}) = {"a": 1}\nstring.digits = 0123456789\n\n=== 외부 패키지 (설치 필요) ===\npip install requests  → 웹 요청\npip install pandas    → 데이터 분석\npip install pygame    → 게임 개발`,
      hint: "내장 모듈은 import만 하면 바로 사용 가능!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-5",
      type: "quiz",
      title: "퀴즈!",
      content: "설치된 패키지 목록을 보는 명령어는?",
      options: [
        "pip show all",
        "pip list",
        "pip packages",
        "pip installed"
      ],
      answer: 1,
      explanation: "pip list로 설치된 모든 패키지 목록을 확인할 수 있어요!"
    }
  ]
}
