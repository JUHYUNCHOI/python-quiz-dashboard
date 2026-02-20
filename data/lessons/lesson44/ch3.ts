import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "통계 분석 + 완성",
  emoji: "📊",
  steps: [
    {
      id: "ch3-0",
      type: "tryit",
      title: "📊 3단계: math 모듈로 통계!",
      task: "math 모듈을 사용해서 날씨 통계를 분석해보세요!",
      initialCode: `import math

weather_db = {
    '서울': {'temp': 22, 'humidity': 55, 'condition': '맑음'},
    '부산': {'temp': 25, 'humidity': 70, 'condition': '구름'},
    '제주': {'temp': 27, 'humidity': 80, 'condition': '비'},
    '인천': {'temp': 21, 'humidity': 60, 'condition': '맑음'},
    '대전': {'temp': 23, 'humidity': 50, 'condition': '흐림'},
}

# 기온 통계
temps = [info['temp'] for info in weather_db.values()]
avg_temp = sum(temps) / len(temps)
max_temp = max(temps)
min_temp = min(temps)

print('=== 기온 통계 ===')
print(f'평균: {avg_temp:.1f}도')
print(f'올림: {math.ceil(avg_temp)}도')
print(f'내림: {math.floor(avg_temp)}도')
print(f'최고: {max_temp}도')
print(f'최저: {min_temp}도')
print(f'편차: {max_temp - min_temp}도')

# 상태별 도시
print('\\n=== 상태별 도시 ===')
conditions = {}
for city, info in weather_db.items():
    cond = info['condition']
    if cond not in conditions:
        conditions[cond] = []
    conditions[cond].append(city)

for cond, cities in conditions.items():
    print(f'{cond}: {", ".join(cities)}')`,
      expectedOutput: `=== 기온 통계 ===\n평균: 23.6도\n올림: 24도\n내림: 23도\n최고: 27도\n최저: 21도\n편차: 6도\n\n=== 상태별 도시 ===\n맑음: 서울, 인천\n구름: 부산\n비: 제주\n흐림: 대전`,
      hint: "math.ceil은 올림, math.floor는 내림!",
      hint2: "리스트 컴프리헨션으로 기온만 모아요!"
    },
    {
      id: "ch3-1",
      type: "mission",
      title: "🎯 미션: 날씨 앱 완성!",
      task: "빈칸 3개를 채워서 날씨 앱 메인 함수를 완성하세요!",
      initialCode: `import math
import ___

weather_db = {
    '서울': {'temp': 22, 'humidity': 55, 'condition': '맑음'},
    '부산': {'temp': 25, 'humidity': 70, 'condition': '구름'},
    '제주': {'temp': 27, 'humidity': 80, 'condition': '비'},
}

def weather_app():
    # 1. JSON으로 데이터 저장
    save_data = json.dumps(weather_db, ensure_ascii=False)
    print(f'데이터 로드 완료! ({len(weather_db)}개 도시)')

    # 2. 전체 기온 분석
    temps = [info['temp'] for info in weather_db.___()]
    avg = sum(temps) / len(temps)
    print(f'전국 평균 기온: {math.___(avg)}도 (올림)')

    # 3. 가장 더운 도시 찾기
    hottest_city = ''
    hottest_temp = 0
    for city, info in weather_db.items():
        if info['temp'] > hottest_temp:
            hottest_temp = info['temp']
            hottest_city = city

    print(f'가장 더운 도시: {hottest_city} ({hottest_temp}도)')

weather_app()`,
      expectedOutput: `데이터 로드 완료! (3개 도시)\n전국 평균 기온: 25도 (올림)\n가장 더운 도시: 제주 (27도)`,
      hint: "json 모듈을 import하고, values()와 math.ceil()을 사용해요!",
      hint2: "json / values / ceil"
    },
    {
      id: "ch3-2",
      type: "explain",
      title: "🎉 프로젝트 완성!",
      content: `## 날씨 앱에서 배운 것

### 사용한 개념
- **딕셔너리 중첩** — 도시별 날씨 데이터
- **함수** — 검색, 비교, 알림, 통계
- **math 모듈** — ceil, floor
- **json 모듈** — dumps, loads

### 실제 날씨 앱이라면?
\`\`\`python
# requests 패키지로 API 호출
import requests
response = requests.get('https://api.weather.com/...')
data = response.json()
\`\`\`

> 나중에 requests 패키지를 배우면
> 진짜 날씨 데이터를 가져올 수 있어요! 🌍`
    }
  ]
}
