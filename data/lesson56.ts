// ============================================
// 레슨 56: 정렬로 푸는 문제
// ============================================
// 26 과에서 sort() 를 배우지만 "정렬이 답이 되는 문제"는 안 다룬다.
// 승급·배치 시험의 골드~플래티넘 구간은 대부분 이 두 가지다:
// 다중 기준 정렬(key= 에 튜플), 그리고 정렬 후 한 번 훑기(구간 병합).
import { LessonData } from './types'

export const lesson56Data: LessonData = {
  id: "56",
  title: "정렬로 푸는 문제",
  emoji: "🗂️",
  description: "순서를 바꿔 놓으면 어려운 문제가 쉬워져요!",
  chapters: [
    {
      id: "ch1",
      title: "기준이 두 개일 때",
      emoji: "📐",
      steps: [
        {
          id: "lesson-intro",
          type: "explain",
          title: `🗂️ 오늘 배울 것 — 정렬이 답이 되는 순간`,
          content: `\`sort()\` 는 이미 알아요. 오늘은 **정렬을 무기로 쓰는 법**을 배워요.

1️⃣ **기준이 두 개** — "점수 높은 순, 같으면 이름 순"
2️⃣ **내림차순 섞기** — 하나는 큰 순, 하나는 작은 순
3️⃣ **정렬 후 한 번 훑기** — 겹치는 구간 합치기
4️⃣ **실전 형태** — 많이 나온 단어 K개 / 구간 병합`
        },
        {
          id: "key-recap",
          type: "explain",
          title: `🔑 key= 복습`,
          content: `\`key=\` 에 함수를 주면 "무엇을 기준으로 비교할지"를 정할 수 있어요.

\`\`\`python
words = ["banana", "fig", "apple"]

print(sorted(words))              # ['apple', 'banana', 'fig']  (글자 순)
print(sorted(words, key=len))     # ['fig', 'apple', 'banana']  (길이 순)
\`\`\`

\`key=len\` 은 "각 단어를 \`len()\` 에 넣은 값으로 비교해" 라는 뜻이에요.`
        },
        {
          id: "predict-tie",
          type: "predict",
          title: `💭 길이가 같으면?`,
          content: `\`sorted(["cat", "ant", "bee"], key=len)\` — 셋 다 길이가 3 이에요. 결과는?`,
          options: [
            "['ant', 'bee', 'cat'] — 길이가 같으면 알파벳 순으로 정렬해줘요",
            "['cat', 'ant', 'bee'] — 길이가 같으면 원래 순서를 그대로 둬요"
          ],
          answer: 1,
          explanation: "파이썬 정렬은 '안정적(stable)'이에요. 비교 기준이 같으면 원래 순서를 건드리지 않아요. 알파벳 순으로 하고 싶으면 그걸 기준에 직접 넣어줘야 해요."
        },
        {
          id: "tuple-key",
          type: "explain",
          title: `📐 기준을 튜플로 묶는다`,
          content: `\`key=\` 가 **튜플**을 돌려주면, 앞에 있는 것부터 차례로 비교해요.

\`\`\`python
words = ["cat", "ant", "bee", "fig"]

print(sorted(words, key=lambda w: (len(w), w)))
# ['ant', 'bee', 'cat', 'fig']
\`\`\`

\`(len(w), w)\` = **"길이 먼저, 길이가 같으면 글자 순"**

\`\`\`
"ant" → (3, 'ant')
"bee" → (3, 'bee')   ← 길이 같음 → 'ant' < 'bee' 로 결정
"cat" → (3, 'cat')
\`\`\`

@핵심: 기준이 여러 개면 **중요한 순서대로 튜플에 나열**해요.`
        },
        {
          id: "try-tuple-key",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 점수 순, 같으면 이름 순`,
          task: `점수가 낮은 순으로, 점수가 같으면 이름 순으로 정렬하세요!`,
          initialCode: `students = [("bora", 90), ("ara", 85), ("dam", 90), ("chan", 85)]

print(sorted(students, key=lambda s: (s[___], s[___])))`,
          expectedOutput: "[('ara', 85), ('chan', 85), ('bora', 90), ('dam', 90)]",
          hint: `튜플은 (이름, 점수) 니까 점수가 인덱스 1, 이름이 인덱스 0.`,
          hint2: `1 / 0`
        }
      ]
    },
    {
      id: "ch2",
      title: "큰 순과 작은 순을 섞기",
      emoji: "🔀",
      steps: [
        {
          id: "reverse-problem",
          type: "explain",
          title: `🔀 반대 방향이 섞이면`,
          content: `"점수 **높은** 순, 같으면 이름 **작은** 순" — 방향이 반대예요.

\`reverse=True\` 는 **전체를 뒤집어서** 이름까지 큰 순이 되어버려요.

\`\`\`python
students = [("bora", 90), ("ara", 85), ("dam", 90), ("chan", 85)]

# ❌ 이름도 같이 뒤집힌다
print(sorted(students, key=lambda s: (s[1], s[0]), reverse=True))
# [('dam', 90), ('bora', 90), ('chan', 85), ('ara', 85)]
#   dam 이 bora 보다 먼저 — 이름이 큰 순이 됐어요
\`\`\``
        },
        {
          id: "minus-trick",
          type: "explain",
          title: `➖ 숫자에 마이너스를 붙인다`,
          content: `숫자는 **음수로 바꾸면** 큰 값이 작은 값이 돼요. 그러면 오름차순 한 번으로 둘 다 해결돼요.

\`\`\`python
# ✅ 점수는 높은 순, 이름은 작은 순
print(sorted(students, key=lambda s: (-s[1], s[0])))
# [('bora', 90), ('dam', 90), ('ara', 85), ('chan', 85)]
\`\`\`

\`\`\`
점수 90 → -90
점수 85 → -85
-90 < -85 이므로 90 점이 앞으로 와요 ✅
이름은 마이너스를 안 붙였으니 그대로 작은 순 ✅
\`\`\`

@핵심: **방향이 섞이면 \`reverse=True\` 가 아니라 숫자에 \`-\` 를 붙여요.** 글자에는 \`-\` 를 못 붙이니 숫자 쪽만 뒤집어요.`
        },
        {
          id: "predict-minus",
          type: "predict",
          title: `💭 글자에 마이너스를 붙이면?`,
          content: `\`key=lambda s: (-s[1], -s[0])\` 처럼 이름에도 \`-\` 를 붙이면?`,
          options: [
            "이름도 거꾸로 정렬돼요",
            "에러가 나요 — 문자열에는 마이너스를 붙일 수 없어요"
          ],
          answer: 1,
          explanation: "TypeError: bad operand type for unary -: 'str'. 문자열을 거꾸로 정렬하고 싶으면 두 번 정렬하거나(안정 정렬 이용) reverse 를 따로 써야 해요. 그래서 시험 문제는 보통 '숫자는 내림차순, 글자는 오름차순'으로 나와요."
        },
        {
          id: "try-minus",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 횟수 많은 순, 같으면 글자 순`,
          task: `등장 횟수가 많은 순으로, 같으면 단어 순으로 정렬하세요!`,
          initialCode: `cnt = [("apple", 3), ("banana", 2), ("cherry", 1), ("date", 2)]

print(sorted(cnt, key=lambda p: (___p[1], p[0])))`,
          expectedOutput: "[('apple', 3), ('banana', 2), ('date', 2), ('cherry', 1)]",
          hint: `횟수는 많은 순 = 음수로 뒤집기.`,
          hint2: `-`
        },
        {
          id: "mission-topk",
          type: "mission",
          title: `🏆 미션 — 많이 나온 단어 K개`,
          task: `단어를 세고, 많이 나온 순(같으면 글자 순)으로 앞 2개만 한 줄씩 출력하세요!`,
          initialCode: `words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
k = 2

cnt = {}
for w in words:
    cnt[w] = cnt.get(w, 0) + 1

order = sorted(cnt, key=lambda w: (___cnt[w], w))
for w in order[:k]:
    print(w)`,
          expectedOutput: "apple\nbanana",
          hint: `횟수는 많은 순이니까 음수로.`,
          hint2: `-`
        }
      ]
    },
    {
      id: "ch3",
      title: "정렬하고 한 번 훑기",
      emoji: "🚶",
      steps: [
        {
          id: "merge-intro",
          type: "explain",
          title: `🚶 겹치는 구간 합치기`,
          content: `일정이 여러 개 있어요. 겹치는 건 하나로 합치고 싶어요.

\`\`\`
입력: (1,3) (2,6) (8,10) (15,18)
      ├─┤
        ├───┤        겹침!
                ├─┤
                        ├─┤
답:  (1,6) (8,10) (15,18)
\`\`\`

정렬이 안 되어 있으면 "이 구간이 앞에 있는 어떤 것과 겹치나?"를 **전부** 확인해야 해요.`
        },
        {
          id: "predict-why-sort",
          type: "predict",
          title: `💭 시작점으로 정렬하면 뭐가 좋을까?`,
          content: `구간을 **시작점이 작은 순**으로 정렬해 놓으면 어떤 점이 편해질까요?`,
          options: [
            "새 구간은 **바로 앞에 합친 구간** 하나만 확인하면 돼요",
            "구간의 길이가 짧아져서 계산이 빨라져요"
          ],
          answer: 0,
          explanation: "시작점 순으로 보면, 지금 구간의 시작점은 이전 모든 구간의 시작점보다 크거나 같아요. 그래서 겹칠 수 있는 상대는 '가장 최근에 합쳐 둔 구간' 하나뿐이에요. 앞쪽 전부를 뒤질 필요가 없어요."
        },
        {
          id: "merge-code",
          type: "explain",
          title: `📝 합치는 규칙`,
          content: `정렬한 뒤 하나씩 보면서, 앞 구간과 겹치면 **끝점을 늘리고**, 안 겹치면 **새로 추가**해요.

\`\`\`python
iv = sorted([(1, 3), (2, 6), (8, 10), (15, 18)])

out = []
for l, r in iv:
    if out and l <= out[-1][1]:     # 앞 구간의 끝보다 작거나 같으면 겹침
        out[-1][1] = max(out[-1][1], r)
    else:
        out.append([l, r])

print(out)   # [[1, 6], [8, 10], [15, 18]]
\`\`\`

💡 \`max()\` 가 왜 필요한가: \`(1,10)\` 다음에 \`(2,3)\` 이 오면 \`(2,3)\` 은 \`(1,10)\` 안에 완전히 들어가요.
그냥 \`out[-1][1] = r\` 로 쓰면 끝이 10 에서 3 으로 **줄어버려요.**

@핵심: \`out\` 에 **리스트**를 넣어요(\`[l, r]\`). 튜플은 값을 못 바꿔서 끝점을 늘릴 수 없어요.`
        },
        {
          id: "try-merge-cond",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 겹침 판단`,
          task: `빈칸을 채워 겹치는 구간을 합치세요!`,
          initialCode: `iv = sorted([(1, 3), (2, 6), (8, 10)])

out = []
for l, r in iv:
    if out and l <= out[-1][___]:
        out[-1][1] = max(out[-1][1], r)
    else:
        out.append([l, r])

print(out)`,
          expectedOutput: "[[1, 6], [8, 10]]",
          hint: `앞 구간의 '끝점'과 비교해요. [l, r] 에서 끝은 몇 번 인덱스?`,
          hint2: `1`
        },
        {
          id: "predict-max",
          type: "predict",
          title: `💭 max() 를 빼면?`,
          content: `\`(1,10)\` 과 \`(2,3)\` 을 합칠 때 \`out[-1][1] = r\` 로 쓰면 결과는?`,
          options: ["[[1, 10]] — 어차피 같아요", "[[1, 3]] — 끝이 10 에서 3 으로 줄어들어요"],
          answer: 1,
          explanation: "(2,3) 은 (1,10) 안에 완전히 들어 있어요. 끝점을 그냥 덮어쓰면 10 을 3 으로 줄여버려서 7~10 구간을 잃어요. 그래서 max() 로 '더 먼 끝'을 지켜야 해요."
        },
        {
          id: "mission-merge",
          type: "mission",
          title: `🏆 미션 — 완전히 포함된 구간까지`,
          task: `(1,10) 안에 (2,3), (4,5) 가 들어 있어요. 올바르게 합쳐 출력하세요!`,
          initialCode: `iv = sorted([(1, 10), (2, 3), (4, 5)])

out = []
for l, r in iv:
    if out and l <= out[-1][1]:
        out[-1][1] = ___(out[-1][1], r)
    else:
        out.append([l, r])

print(out)`,
          expectedOutput: "[[1, 10]]",
          hint: `둘 중 더 먼 끝을 골라야 해요.`,
          hint2: `max`
        }
      ]
    },
    {
      id: "ch4",
      title: "실전 — 입력까지",
      emoji: "🎯",
      steps: [
        {
          id: "real-format",
          type: "explain",
          title: `🎯 시험에 나오는 모양`,
          content: `\`\`\`
[입력]
첫 줄: 구간의 개수 N
그 다음 N 줄: 각 줄에 시작점 끝점

[출력]
첫 줄: 합친 구간의 개수
그 다음: 합친 구간을 시작점이 작은 순으로 한 줄씩
\`\`\`

\`\`\`
예제 입력          예제 출력
4                   3
1 3                 1 6
2 6                 8 10
8 10                15 18
15 18
\`\`\``
        },
        {
          id: "full-code",
          type: "explain",
          title: `📝 전체 코드`,
          content: `\`\`\`python
n = int(input())
iv = sorted(tuple(map(int, input().split())) for _ in range(n))

out = []
for l, r in iv:
    if out and l <= out[-1][1]:
        out[-1][1] = max(out[-1][1], r)
    else:
        out.append([l, r])

print(len(out))
for l, r in out:
    print(l, r)
\`\`\`

정렬이 \`n log n\`, 훑기가 \`n\` 번. 정렬 안 하고 전부 비교하면 \`n × n\` 이었어요.

@핵심: **정렬은 공짜가 아니지만, 정렬 덕에 사라지는 비교가 훨씬 많아요.**`
        },
        {
          id: "mission-real",
          type: "mission",
          title: `🏆 최종 미션 — 입력받아 구간 병합`,
          task: `입력을 받아 합친 구간의 개수와 구간들을 출력하세요! (빈칸 2개)`,
          initialCode: `n = int(input())
iv = ___(tuple(map(int, input().split())) for _ in range(n))

out = []
for l, r in iv:
    if out and l <= out[-1][1]:
        out[-1][1] = max(out[-1][1], r)
    else:
        out.append([l, r])

print(___(out))
for l, r in out:
    print(l, r)`,
          stdin: "4\n1 3\n2 6\n8 10\n15 18\n",
          expectedOutput: "3\n1 6\n8 10\n15 18",
          hint: `구간을 시작점 순으로 줄 세우는 함수, 그리고 개수를 세는 함수.`,
          hint2: `sorted / len`
        },
        {
          id: "complete",
          type: "explain",
          title: `🎉 완료!`,
          content: `## 오늘 배운 것

✅ **기준 여러 개** — \`key=lambda x: (첫 기준, 둘째 기준)\`
✅ **방향 섞기** — 숫자에 \`-\` 를 붙여요 (\`reverse=True\` 는 전부 뒤집혀요)
✅ **정렬 후 한 번 훑기** — 겹칠 상대가 **바로 앞 하나**로 줄어들어요
✅ **구간 병합** — \`out[-1][1] = max(out[-1][1], r)\`

🚫 \`out\` 에 튜플을 넣으면 끝점을 못 늘려요 → 리스트로.
🚫 \`max()\` 를 빼면 포함된 구간에서 끝이 줄어들어요.

다음엔 정렬된 데이터를 반씩 잘라 찾는 법을 배워요.`
        }
      ]
    }
  ]
}
