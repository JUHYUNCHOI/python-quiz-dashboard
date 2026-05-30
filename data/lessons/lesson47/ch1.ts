import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "날씨 데이터 만들기",
  emoji: "🌤️",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "💭 배운 모듈로 진짜 앱을 만들 수 있을까?",
      content: `💭 math, json, 딕셔너리, 함수... 지금까지 배운 걸 **공구함처럼 다 꺼내서** 진짜 **날씨 앱**을 만들 수 있을까? 오늘 도전!

\`\`\`python
# 이번에 만들 것: 날씨 정보 앱!
# 1. 날씨 데이터 구성 (딕셔너리)
# 2. 검색 기능 (함수)
# 3. 통계 분석 (math 모듈)
\`\`\`

@핵심: 모듈 + 딕셔너리 + 함수를 합쳐서 **날씨 앱** 프로젝트를 3단계로 완성하자!

> 실제 날씨 API는 이 웹에서 호출할 수 없으므로
> **모의 데이터**로 날씨 앱의 핵심 로직을 만들어요!`
    },
    {
      id: "ch1-1",
      type: "tryit",
      title: "💻 1단계: 날씨 데이터!",
      task: "딕셔너리로 날씨 데이터를 만들고 조회해보세요!",
      initialCode: `# 모의 날씨 데이터
weather_db = {
    '서울': {'temp': 22, 'humidity': 55, 'condition': '맑음', 'wind': 3.2},
    '부산': {'temp': 25, 'humidity': 70, 'condition': '구름', 'wind': 5.1},
    '제주': {'temp': 27, 'humidity': 80, 'condition': '비', 'wind': 7.8},
    '인천': {'temp': 21, 'humidity': 60, 'condition': '맑음', 'wind': 4.5},
    '대전': {'temp': 23, 'humidity': 50, 'condition': '흐림', 'wind': 2.1},
}

# 전체 도시 목록
print('=== 조회 가능한 도시 ===')
for city in weather_db:
    print(f'  {city}')

# 특정 도시 조회
city = '서울'
info = weather_db[city]
print(f'\\n=== {city} 날씨 ===')
print(f'기온: {info["temp"]}도')
print(f'습도: {info["humidity"]}%')
print(f'상태: {info["condition"]}')
print(f'풍속: {info["wind"]}m/s')`,
      expectedOutput: `=== 조회 가능한 도시 ===\n  서울\n  부산\n  제주\n  인천\n  대전\n\n=== 서울 날씨 ===\n기온: 22도\n습도: 55%\n상태: 맑음\n풍속: 3.2m/s`,
      hint: "딕셔너리 안의 딕셔너리로 데이터를 구성해요!",
      hint2: "weather_db['서울']['temp']처럼 접근해요!"
    },
    {
      id: "ch1-2",
      type: "quiz",
      title: "퀴즈!",
      content: "`weather_db['제주']['condition']`의 결과는?",
      options: ["27", "80", "비", "제주"],
      answer: 2,
      explanation: "제주의 condition은 '비'예요!"
    }
  ]
}
