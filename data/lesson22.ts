// ============================================
// 레슨 22: 슬라이싱
// ============================================
import { LessonData } from './types'

export const lesson22Data: LessonData = {
  id: "22",
  title: "슬라이싱",
  emoji: "🔪",
  description: "리스트와 문자열의 일부를 잘라요!",
  chapters: [
    {
      id: "ch1",
      title: "슬라이싱 기초",
      emoji: "✂️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔪 원하는 부분만 쏙!",
          content: `리스트나 문자열의 **일부분**만 가져올 수 있어요!

\`\`\`python
fruits = ["사과", "바나나", "딸기", "포도", "수박"]

# 1번부터 3번 전까지
print(fruits[1:3])  # ['바나나', '딸기']
\`\`\`

**[시작:끝]** - 시작부터 끝 **전**까지!

### 어디서 쓰여요?

- **일부 출력** — 점수 상위 5 명, 최근 댓글 10 개
- **머리/꼬리 자르기** — 헤더 한 줄 제외, 마지막 \\n 제거
- **페이지 분할** — \`items[page*10:(page+1)*10]\`
- **뒤집기** — \`text[::-1]\`
- **복사** — \`new = old[:]\` 로 깊지 않은 복사

리스트, 문자열, 튜플 모두 같은 문법으로 잘려요.`
        },
        {
          id: "index-recap",
          type: "explain",
          title: "📐 [시작:끝] 의 진짜 의미 — 칸 사이 자르기",
          content: `슬라이싱이 헷갈리는 이유는 인덱스가 **요소 위치** 가 아니라 **요소들 사이 위치** 라고 봐도 통하기 때문이에요.

\`\`\`
인덱스:   0   1   2   3   4   5
        ┃ A ┃ B ┃ C ┃ D ┃ E ┃
음수 인덱스: -5  -4  -3  -2  -1
\`\`\`

\`fruits[1:4]\` = "1 번 칸 앞에서 자르고, 4 번 칸 앞에서 또 자르고, 그 사이를 가져와".

\`\`\`python
fruits = ['A', 'B', 'C', 'D', 'E']

print(fruits[1:4])    # ['B', 'C', 'D'] — 인덱스 1, 2, 3
print(fruits[0:5])    # 전체
print(fruits[1:1])    # [] — 같은 위치, 빈 리스트
\`\`\`

> 🎯 한 줄: **시작 포함, 끝 제외.**`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "인덱스 1~3을 출력하세요!",
          initialCode: "nums = [0, 1, 2, 3, 4, 5]\nprint(nums[1:4])",
          expectedOutput: "[1, 2, 3]",
          hint: "[1:4]는 인덱스 1, 2, 3!",
          hint2: "끝 인덱스는 포함 안 됨!"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "[0, 1, 2, 3, 4][1:3]의 결과는?",
          options: ["[1, 2, 3]", "[1, 2]", "[0, 1, 2]", "[2, 3]"],
          answer: 1,
          explanation: "[1:3]은 인덱스 1, 2까지! 3은 포함 안 돼요."
        },
        {
          id: "string-slice",
          type: "explain",
          title: "📝 문자열도 똑같이 슬라이싱",
          content: `슬라이싱은 리스트만의 도구가 아니에요. **문자열, 튜플** 도 같은 문법.

\`\`\`python
text = "Hello World"

print(text[0:5])      # 'Hello'
print(text[6:])       # 'World'
print(text[-5:])      # 'World' (뒤에서 5)
print(text[:5])       # 'Hello'

t = (10, 20, 30, 40)
print(t[1:3])         # (20, 30) — 튜플도 잘림
\`\`\`

> 💡 **공통 인터페이스** — 시퀀스 (sequence) 라는 공통 도구 셋. 리스트 / 문자열 / 튜플은 모두 시퀀스라 \`len\`, \`in\`, 인덱싱, 슬라이싱이 다 같은 식으로 작동.`
        },
        {
          id: "try-string-slice",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 문자열 슬라이싱",
          task: "이메일 'user.name@gmail.com' 에서 도메인 부분 ('gmail.com') 만 슬라이싱으로 잘라내세요.",
          initialCode: "email = \"user.name@gmail.com\"\n\n# @ 의 위치를 찾고 그 이후 잘라내기\nat_pos = email.index(\"@\")\ndomain = email[___:]\nprint(domain)",
          expectedOutput: "gmail.com",
          hint: "email[at_pos + 1:] — @ 다음 위치부터 끝까지.",
          hint2: "domain = email[at_pos + 1:]"
        }
      ]
    },
    {
      id: "ch2",
      title: "생략과 음수",
      emoji: "🎯",
      steps: [
        {
          id: "omit-explain",
          type: "explain",
          title: "🎯 시작/끝 생략하기",
          content: `**처음부터** - 시작 생략
\`\`\`python
nums = [0, 1, 2, 3, 4]
print(nums[:3])   # [0, 1, 2]
\`\`\`

**끝까지** - 끝 생략
\`\`\`python
print(nums[2:])   # [2, 3, 4]
\`\`\`

**전체 복사**
\`\`\`python
print(nums[:])    # [0, 1, 2, 3, 4]
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 처음 3개!",
          task: "처음 3개 요소를 가져오세요!",
          initialCode: "nums = [10, 20, 30, 40, 50]\nprint(nums[:3])",
          expectedOutput: "[10, 20, 30]",
          hint: "[:3]은 처음부터 3개!",
          hint2: "nums[:3]"
        },
        {
          id: "negative-explain",
          type: "explain",
          title: "➖ 음수 인덱스",
          content: `뒤에서부터 셀 수도 있어요!

\`\`\`python
nums = [0, 1, 2, 3, 4]

print(nums[-1])     # 4 (마지막)
print(nums[-2:])    # [3, 4] (뒤에서 2개)
print(nums[:-1])    # [0, 1, 2, 3] (마지막 제외)
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 마지막 2개!",
          task: "마지막 2개 요소를 가져오세요!",
          initialCode: "fruits = [\"사과\", \"바나나\", \"딸기\", \"포도\", \"수박\"]\nprint(fruits[-2:])",
          expectedOutput: "['포도', '수박']",
          hint: "[-2:]는 뒤에서 2번째부터!",
          hint2: "fruits[-2:]"
        },
        {
          id: "out-of-range",
          type: "explain",
          title: "🛡️ 범위 밖이면? — 슬라이싱은 안 터져요",
          content: `인덱스 \`[10]\` 은 범위 밖이면 에러나지만, 슬라이싱은 **조용히 잘라줘요**.

\`\`\`python
nums = [1, 2, 3, 4, 5]

# 인덱스 — 에러
print(nums[10])     # ❌ IndexError

# 슬라이싱 — 안전!
print(nums[2:100])  # [3, 4, 5] — 가능한 만큼만
print(nums[100:])   # [] — 빈 리스트
print(nums[:-100])  # [] — 빈 리스트
\`\`\`

→ "있으면 잘라주고, 없으면 빈 리스트". **에러 안 남**. 처음/끝 신경 덜 쓰고 자유롭게 자를 수 있는 이유.

### 실전 — 처음 N 개 / 마지막 N 개

\`\`\`python
top = scores[:5]     # 처음 5 개 (5 개 미만이면 있는 만큼)
last = scores[-3:]   # 마지막 3 개 (3 개 미만이면 있는 만큼)
\`\`\``
        },
        {
          id: "slice-assign",
          type: "explain",
          title: "✏️ 슬라이싱으로 일부 바꾸기 (리스트만)",
          content: `슬라이싱한 자리에 **다른 리스트를 통째로** 할당할 수 있어요. 리스트만 가능 — 문자열/튜플은 수정 불가.

\`\`\`python
nums = [1, 2, 3, 4, 5]

# 가운데 3 개를 다른 리스트로 교체
nums[1:4] = [99, 100]
print(nums)  # [1, 99, 100, 5] — 길이도 변할 수 있음!

# 처음 2 개를 빈 리스트로 = 삭제 효과
nums[:2] = []
print(nums)  # [100, 5]

# 빈 슬라이스에 할당 = 삽입
nums[1:1] = [55, 66]
print(nums)  # [100, 55, 66, 5]
\`\`\`

### del 로 슬라이스 삭제

\`\`\`python
data = [10, 20, 30, 40, 50]
del data[1:3]
print(data)  # [10, 40, 50]
\`\`\`

> 💡 \`nums[1:4] = [99, 100]\` 은 4 가지를 동시에: 위치 찾고, 빼고, 새 거 넣고, 길이 조정. 강력하지만 헷갈릴 수 있으니 처음엔 명시적 \`pop / insert\` 도 OK.`
        },
        {
          id: "try-slice-assign",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 슬라이스로 교체",
          task: "리스트 가운데 3 개를 한 번에 ['X', 'Y'] 로 바꾸세요. 길이가 줄어드는 걸 확인.",
          initialCode: "letters = ['a', 'b', 'c', 'd', 'e', 'f']\n\n# 인덱스 1, 2, 3 (b, c, d) 를 ['X', 'Y'] 로 교체\nletters[___:___] = [___, ___]\n\nprint(letters)\nprint(f\"길이: {len(letters)}\")",
          expectedOutput: "['a', 'X', 'Y', 'e', 'f']\n길이: 5",
          hint: "letters[1:4] = ['X', 'Y']",
          hint2: "letters[1:4] = ['X', 'Y']"
        }
      ]
    },
    {
      id: "ch3",
      title: "스텝과 뒤집기",
      emoji: "🚶",
      steps: [
        {
          id: "step-explain",
          type: "explain",
          title: "🚶 스텝 - 건너뛰기",
          content: `**[시작:끝:스텝]** - 몇 칸씩 건너뛸지

\`\`\`python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(nums[::2])    # [0, 2, 4, 6, 8] (2칸씩)
print(nums[1::2])   # [1, 3, 5, 7, 9] (1부터 2칸씩)
\`\`\`

**뒤집기:**
\`\`\`python
print(nums[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 리스트 뒤집기!",
          task: "리스트를 뒤집어서 출력하세요!",
          initialCode: "nums = [1, 2, 3, 4, 5]\nprint(nums[::-1])",
          expectedOutput: "[5, 4, 3, 2, 1]",
          hint: "[::-1]은 역순!",
          hint2: "nums[::-1]"
        },
        {
          id: "string-explain",
          type: "explain",
          title: "📝 문자열도 슬라이싱!",
          content: `문자열도 똑같이 슬라이싱 돼요!

\`\`\`python
text = "Hello World"

print(text[0:5])    # "Hello"
print(text[6:])     # "World"
print(text[::-1])   # "dlroW olleH"
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 문자열 뒤집기!",
          task: "문자열을 뒤집어서 회문인지 확인하세요!",
          initialCode: "word = \"level\"\nreversed_word = word[::-1]\nprint(f\"원본: {word}\")\nprint(f\"뒤집기: {reversed_word}\")\nprint(f\"회문? {word == reversed_word}\")",
          expectedOutput: "원본: level\n뒤집기: level\n회문? True",
          hint: "[::-1]로 뒤집고 비교!",
          hint2: "word == word[::-1]"
        },
        {
          id: "neg-step",
          type: "explain",
          title: "↩️ 음수 step 으로 뒤에서부터",
          content: `\`step\` 이 음수면 **뒤에서 앞으로** 읽어요. \`[::-1]\` 외에도 다양한 조합 가능.

\`\`\`python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 전체 뒤집기
print(nums[::-1])         # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

# 뒤에서 한 칸씩, 2 칸 step
print(nums[::-2])         # [9, 7, 5, 3, 1] — 뒤에서 2 칸씩

# 인덱스 8 부터 2 까지 거꾸로 (시작 > 끝!)
print(nums[8:2:-1])       # [8, 7, 6, 5, 4, 3]

# 뒤에서 처음 3 개 (=마지막 3 개를 뒤집어서)
print(nums[-1:-4:-1])     # [9, 8, 7]
\`\`\`

음수 step 은 **시작 > 끝** 이어야 결과가 나와요. 시작 < 끝 이면 빈 리스트.

\`\`\`python
nums[2:8:-1]   # [] — 시작 2, 끝 8, 음수 방향이면 안 만남
\`\`\`

> 🎯 처음엔 어렵지만 \`[::-1]\` 한 가지만 외워도 충분해요. 나머진 필요할 때 구글 OK.`
        },
        {
          id: "copy-pattern",
          type: "explain",
          title: "📋 복사 패턴 — [:] 의 용도",
          content: `\`[:]\` 는 빈 시작:빈 끝, 즉 "전체 슬라이싱". 그런데 단순히 같은 리스트가 아니에요 — **새 리스트 객체**를 만들어요.

\`\`\`python
original = [1, 2, 3]
same     = original          # 같은 리스트 (참조)
copy     = original[:]       # 새 리스트 (복사)

original.append(99)

print(original)  # [1, 2, 3, 99]
print(same)      # [1, 2, 3, 99] — 같은 리스트라 따라 변함
print(copy)      # [1, 2, 3]      — 별개 리스트라 안 변함
\`\`\`

→ \`= \` 는 "같은 거 보는 두 번째 이름" 만 만듦. \`[:] \` 는 "새 복사본".

### 슬라이싱은 항상 새 리스트

\`\`\`python
nums = [1, 2, 3, 4, 5]
part = nums[1:3]   # [2, 3]
part[0] = 99
print(nums)        # [1, 2, 3, 4, 5] — 원본 안 바뀜
\`\`\`

부분 슬라이싱도 마찬가지 — 새 리스트라 원본과 분리됨.

> ⚠️ 단, 안에 들어있는 객체가 또 리스트면 그 안쪽까지는 공유해요 (얕은 복사). 깊은 복사는 \`copy.deepcopy()\` 가 필요한데, 한 단계 리스트면 \`[:]\` 면 충분.`
        },
        {
          id: "try-copy",
          type: "tryit",
          title: "🖥️ 직접 해보기 — = vs [:] 차이 확인",
          task: "두 변수의 차이를 직접 확인. \`=\` 와 \`[:]\` 의 결과가 어떻게 다른지.",
          initialCode: "original = [1, 2, 3]\nsame = original          # 같은 리스트\ncopy = original[:]       # 새 리스트\n\noriginal.append(99)\n\n# 결과 출력 — 코드 그대로 실행!\nprint(f\"original: {original}\")\nprint(f\"same:     {same}\")\nprint(f\"copy:     {copy}\")",
          expectedOutput: "original: [1, 2, 3, 99]\nsame:     [1, 2, 3, 99]\ncopy:     [1, 2, 3]",
          hint: "코드를 그대로 실행해서 차이를 눈으로 확인!",
          hint2: "= 는 같은 리스트 가리킴, [:] 는 새 복사본."
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 미션 1 — 전화번호 분리",
          task: "전화번호에서 앞자리, 중간, 뒷자리를 분리하세요!",
          initialCode: "phone = \"010-1234-5678\"\n\narea = phone[:___]\nmiddle = phone[___:___]\nlast = phone[-___:]\n\nprint(f\"전체: {phone}\")\nprint(f\"앞자리: {area}\")\nprint(f\"중간: {middle}\")\nprint(f\"뒷자리: {last}\")",
          expectedOutput: "전체: 010-1234-5678\n앞자리: 010\n중간: 1234\n뒷자리: 5678",
          hint: "[:3], [4:8], [-4:]",
          hint2: "문자열도 슬라이싱 가능!"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 미션 2 — 페이지 단위로 점수 보기",
          task: "30 명 점수에서 **3 페이지째** (인덱스 20~29 = 10 명) 만 보여주세요. 페이지당 10 명, 페이지 1 부터 셈.",
          initialCode: "scores = list(range(100, 70, -1))   # 30 개: 100, 99, ..., 71\nprint(f\"전체 인원: {len(scores)}명\")\n\nPAGE_SIZE = 10\npage = 3   # 3 페이지\n\n# 슬라이싱으로 3 페이지 (인덱스 20~29) 만\npage_data = scores[___:___]\n\nprint(f\"3 페이지: {page_data}\")\nprint(f\"개수: {len(page_data)}명\")",
          expectedOutput: "전체 인원: 30명\n3 페이지: [80, 79, 78, 77, 76, 75, 74, 73, 72, 71]\n개수: 10명",
          hint: "페이지 N 의 시작 = (N-1) * PAGE_SIZE, 끝 = N * PAGE_SIZE",
          hint2: "page_data = scores[(page - 1) * PAGE_SIZE : page * PAGE_SIZE]"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 미션 3 — 단어 회문 검사 (대소문자 무시)",
          task: "대소문자, 공백 무시하고 회문 (앞뒤 같음) 인지 검사하는 함수를 만드세요!",
          initialCode: "def is_palindrome(text):\n    # 1) 소문자로 통일 + 공백 제거\n    cleaned = text.lower().replace(\" \", \"\")\n    # 2) 슬라이싱으로 뒤집어서 비교\n    return cleaned == cleaned[___]\n\nprint(is_palindrome(\"level\"))         # True\nprint(is_palindrome(\"Race Car\"))      # True\nprint(is_palindrome(\"hello\"))         # False\nprint(is_palindrome(\"A man a plan\"))  # False",
          expectedOutput: "True\nTrue\nFalse\nFalse",
          hint: "cleaned[::-1] 로 뒤집어 비교.",
          hint2: "return cleaned == cleaned[::-1]"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **[시작:끝]** — 기본 슬라이싱 (시작 포함, 끝 제외)
✅ **칸 사이 자르기** 시각화 — 인덱스는 요소 사이 위치
✅ **[:끝], [시작:], [:]** — 생략의 의미
✅ **음수 인덱스 \`[-n:]\`, \`[:-1]\`** — 뒤에서부터
✅ **범위 밖이어도 안전** — 슬라이싱은 에러 안 남
✅ **슬라이스 할당** — \`nums[1:4] = [...]\` 로 구간 교체/삽입/삭제
✅ **[::step]** — 건너뛰기, 음수 step 으로 뒤집기
✅ **[::-1]** — 통째로 뒤집기 (회문 검사 단골)
✅ **문자열/튜플도 슬라이싱** — 시퀀스 공통 도구
✅ **[:] = 새 복사본** — \`= \` 와 차이 (얕은 복사)
✅ **실전** — 페이지 분할, 회문 검사, 전화번호 분리

🎉 **Part 3 완료!**
다음 Part에서는 **프로젝트**와 **함수**를 배워요! 🚀`
        }
      ]
    }
  ]
}
