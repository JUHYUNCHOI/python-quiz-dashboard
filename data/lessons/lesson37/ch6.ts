import { Chapter } from '../types'

export const ch6: Chapter = {
  id: "ch6",
  title: "실습: 안전한 프로그램",
  emoji: "💻",
  steps: [
    {
      id: "ch6-0",
      type: "interactive",
      title: "✏️ 안전한 나눗셈 따라치기",
      description: "try-except로 0 나누기를 처리하는 코드를 써보세요!",
      component: "typeAlong",
      targetTitle: "안전한 나눗셈",
      targetDescription: "ZeroDivisionError를 잡아요",
      targetCode: "try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print('0은 안돼!')",
      expectedOutput: "0은 안돼!"
    },
    {
      id: "ch6-1",
      type: "interactive",
      title: "빈칸 채우기: 안전한 입력 함수",
      description: "함수 안에서 에러를 처리해요!",
      component: "fillInBlank",
      codeTemplate: "def safe_input():\n    ___1___:\n        return int(input())\n    except ___2___:\n        return -1",
      blanks: [
        { id: "1", answer: "try", hint: "시도해본다!" },
        { id: "2", answer: "ValueError", hint: "숫자 변환 실패 에러!" }
      ],
      choices: ["try", "except", "ValueError", "ZeroDivisionError", "if", "return"],
      expectedOutput: ""
    },
    {
      id: "ch6-2",
      type: "interactive",
      title: "빈칸 채우기: 두 가지 에러 잡기",
      description: "ValueError와 ZeroDivisionError를 각각 잡으세요!",
      component: "fillInBlank",
      codeTemplate: "___1___:\n    숫자 = int(input('숫자: '))\n    print(100 / 숫자)\nexcept ___2___:\n    print('숫자를 입력!')\nexcept ___3___:\n    print('0은 안돼!')",
      blanks: [
        { id: "1", answer: "try", hint: "시도해본다!" },
        { id: "2", answer: "ValueError", hint: "숫자 변환 실패!" },
        { id: "3", answer: "ZeroDivisionError", hint: "0으로 나눌 때!" }
      ],
      choices: ["try", "except", "ValueError", "ZeroDivisionError", "if", "while"],
      expectedOutput: ""
    },
    {
      id: "ch6-3",
      type: "mission",
      title: "🎯 안전한 계산기를 완성하세요",
      task: "try-except로 에러 처리 추가하기",
      initialCode: `# 간단한 계산기
# ⬇️ try-except로 감싸세요!

숫자 = int(input('숫자: '))
결과 = 100 / 숫자
print(f'결과: {결과}')

# 💡 힌트: 두 가지 에러를 잡아야 해요
# - ValueError (문자 입력)
# - ZeroDivisionError (0 입력)`,
      /* ⛔ 2026-10-07 — `input()` 을 쓰는데 `stdin` 이 없었다.
           자유 편집이라 막히진 않았지만, 학생이 `input()` 을 **지워야** 통과해서
           가르치려는 try-except 를 **검증하지 못했다.** 100 ÷ 2 = 50.0 이라 입력은 2. */
      stdin: "2",
      expectedOutput: "결과: 50.0",
      hint: "try: 안에 세 줄을 넣어요",
      hint2: "except ValueError: 와 except ZeroDivisionError: 두 개!"
    }
  ]
}
