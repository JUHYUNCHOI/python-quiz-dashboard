import { Chapter } from '../types'

export const ch7: Chapter = {
  id: "ch7",
  title: "정리",
  emoji: "🎯",
  steps: [
    {
      id: "ch7-1",
      type: "explain",
      title: "🎉 오늘 배운 것!",
      content: `## 📦 매개변수 & 반환값 총정리!

### 1️⃣ 기본값
\`\`\`python
def 함수(a, b=10):   # b 안 주면 10
    return a + b
\`\`\`
✅ 기본값 있는 건 **뒤에**!

### 2️⃣ 여러 값 반환
\`\`\`python
def 계산(a, b):
    return a + b, a - b   # 2개 반환

합, 차 = 계산(10, 3)       # 각각 받기
\`\`\`

### 3️⃣ 키워드 인자
\`\`\`python
함수(이름='철수', 나이=15)   # 순서 상관없이!
\`\`\`

**🎉 다음 시간엔 함수를 더 활용해요!**`
    }
  ]
}
