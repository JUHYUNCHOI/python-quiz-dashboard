import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "모듈이란? import 기본",
  emoji: "📦",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "💭 제곱근 계산... 직접 만들어야 할까?",
      content: `💭 제곱근, 올림, 내림... 이런 복잡한 계산을 매번 **직접 코딩**해야 할까? 누가 미리 만들어놓은 **공구함**에서 망치만 꺼내 쓰면 안 될까?

\`\`\`python
# 제곱근을 직접 계산? 너무 어려워요!
# → math 모듈(=수학 공구함)에서 sqrt만 꺼내면 한 줄!
import math
print(math.sqrt(16))  # 4.0
\`\`\`

@핵심: **모듈** = 함수가 들어있는 **공구함**(.py 파일)! \`import\`(=가져오기)로 통째로 빌려와!

| 모듈 | 설명 | 대표 기능 |
|------|------|-----------|
| math | 수학 계산 | sqrt, ceil, floor, pi |
| json | JSON 처리 | dumps, loads |
| string | 문자열 상수 | ascii_lowercase |
| random | 랜덤 값 | randint, choice |
| datetime | 날짜/시간 | now, date |

> 파이썬에는 200개 이상의 내장 모듈이 있어요!`
    },
    {
      id: "ch1-1",
      type: "explain",
      title: "💭 import하는 방법이 하나뿐일까?",
      content: `💭 \`math.sqrt(16)\` 처럼 매번 **공구함 이름**부터 써야 할까? 자주 쓰는 망치만 손에 들고 다닐 순 없을까?

\`\`\`python
# 1. 전체 import
import math
print(math.sqrt(16))  # 모듈명.함수()

# 2. 특정 기능만 import
from math import sqrt
print(sqrt(16))  # 바로 함수()

# 3. 여러 개 import
from math import sqrt, ceil, floor

# 4. 별명 붙이기
import math as m
print(m.sqrt(16))  # 별명.함수()
\`\`\`

@핵심: \`import\` 4가지 방법! 통째로 빌리기 / \`from\`(=~에서) 으로 한 개만 꺼내기 / 여러 개 / \`as\`(=별명) 로 짧게!`
    },
    {
      id: "ch1-2",
      type: "tryit",
      title: "💻 import 방법 체험!",
      task: "다양한 import 방법을 실행해보세요!",
      initialCode: `# 방법 1: 전체 import
import math
print(f'sqrt(25) = {math.sqrt(25)}')

# 방법 2: 특정 기능만
from math import pi, ceil
print(f'pi = {pi:.4f}')
print(f'ceil(3.2) = {ceil(3.2)}')

# 방법 3: 별명
import math as m
print(f'floor(3.9) = {m.floor(3.9)}')`,
      expectedOutput: `sqrt(25) = 5.0\npi = 3.1416\nceil(3.2) = 4\nfloor(3.9) = 3`,
      hint: "import math은 math.함수(), from math import는 바로 함수()!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-3",
      type: "tryit",
      title: "💻 from import로 깔끔하게!",
      task: "from import로 필요한 함수만 가져와서 사용해보세요!",
      initialCode: `# 필요한 것만 가져오기!
from math import sqrt, pi, ceil, floor

# 모듈명 없이 바로 사용!
print(f'sqrt(64) = {sqrt(64)}')
print(f'pi = {pi:.4f}')
print(f'ceil(7.3) = {ceil(7.3)}')
print(f'floor(7.9) = {floor(7.9)}')

# 별명 붙이기
import math as m
print(f'\\nm.pow(3, 4) = {m.pow(3, 4)}')
print(f'm.factorial(6) = {m.factorial(6)}')`,
      expectedOutput: `sqrt(64) = 8.0\npi = 3.1416\nceil(7.3) = 8\nfloor(7.9) = 7\n\nm.pow(3, 4) = 81.0\nm.factorial(6) = 720`,
      hint: "from import하면 모듈명 없이 바로 함수 이름만!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-4",
      type: "mission",
      title: "🎯 미션: import 방법 골라쓰기!",
      task: "빈칸 3개를 채워서 다양한 import 방법을 완성하세요!",
      initialCode: `# 방법 1: 전체 import
import math
print(f'sqrt(100) = {math.sqrt(100)}')

# 방법 2: 특정 함수만 import
___ math import ceil, floor
print(f'ceil(2.1) = {ceil(2.1)}')
print(f'floor(2.9) = {floor(2.9)}')

# 방법 3: 별명
import math ___ m
print(f'pi = {m.___:.2f}')`,
      expectedOutput: `sqrt(100) = 10.0\nceil(2.1) = 3\nfloor(2.9) = 2\npi = 3.14`,
      hint: "from으로 함수만, as로 별명, pi는 math의 상수!",
      hint2: "from / as / pi"
    },
    {
      id: "ch1-5",
      type: "quiz",
      title: "퀴즈!",
      content: "`from math import sqrt`로 가져온 후 사용법은?",
      options: [
        "math.sqrt(16)",
        "sqrt(16)",
        "import.sqrt(16)",
        "math(sqrt(16))"
      ],
      answer: 1,
      explanation: "from...import로 가져오면 모듈명 없이 바로 sqrt(16)!"
    }
  ]
}
