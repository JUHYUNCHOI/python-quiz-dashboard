import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "검색 기능 만들기",
  emoji: "🔍",
  steps: [
    {
      id: "ch2-0",
      type: "tryit",
      title: "🔍 2단계: 날씨 검색 함수!",
      task: "함수로 날씨 검색 기능을 만들어보세요!",
      initialCode: `weather_db = {
    '서울': {'temp': 22, 'humidity': 55, 'condition': '맑음', 'wind': 3.2},
    '부산': {'temp': 25, 'humidity': 70, 'condition': '구름', 'wind': 5.1},
    '제주': {'temp': 27, 'humidity': 80, 'condition': '비', 'wind': 7.8},
    '인천': {'temp': 21, 'humidity': 60, 'condition': '맑음', 'wind': 4.5},
    '대전': {'temp': 23, 'humidity': 50, 'condition': '흐림', 'wind': 2.1},
}

# 날씨 이모지 매핑
emoji_map = {'맑음': '☀️', '구름': '⛅', '비': '🌧️', '흐림': '☁️', '눈': '❄️'}

def get_weather(city):
    if city not in weather_db:
        print(f'{city}: 검색 결과 없음')
        return
    info = weather_db[city]
    emoji = emoji_map.get(info['condition'], '🌍')
    print(f'{emoji} {city} 날씨')
    print(f'  기온: {info["temp"]}도')
    print(f'  습도: {info["humidity"]}%')
    print(f'  상태: {info["condition"]}')
    print(f'  풍속: {info["wind"]}m/s')

def compare_weather(city1, city2):
    if city1 not in weather_db or city2 not in weather_db:
        print('도시를 찾을 수 없어요!')
        return
    t1 = weather_db[city1]['temp']
    t2 = weather_db[city2]['temp']
    diff = abs(t1 - t2)
    hotter = city1 if t1 > t2 else city2
    print(f'{city1}({t1}도) vs {city2}({t2}도)')
    print(f'  {hotter}이(가) {diff}도 더 따뜻!')

# 검색 테스트
cities_to_search = ['서울', '제주', '뉴욕']
for city in cities_to_search:
    get_weather(city)
    print()

# 비교
compare_weather('서울', '부산')`,
      expectedOutput: `☀️ 서울 날씨\n  기온: 22도\n  습도: 55%\n  상태: 맑음\n  풍속: 3.2m/s\n\n🌧️ 제주 날씨\n  기온: 27도\n  습도: 80%\n  상태: 비\n  풍속: 7.8m/s\n\n뉴욕: 검색 결과 없음\n\n서울(22도) vs 부산(25도)\n  부산이(가) 3도 더 따뜻!`,
      hint: "함수로 기능을 나누면 코드가 깔끔해요!",
      hint2: "get_weather는 단일 조회, compare_weather는 비교!"
    },
    {
      id: "ch2-0b",
      type: "tryit",
      title: "💻 날씨 추천 시스템!",
      task: "날씨에 따라 옷차림을 추천하는 시스템을 실행해보세요!",
      initialCode: `weather_db = {
    '서울': {'temp': 22, 'humidity': 55, 'condition': '맑음', 'wind': 3.2},
    '부산': {'temp': 25, 'humidity': 70, 'condition': '구름', 'wind': 5.1},
    '제주': {'temp': 27, 'humidity': 80, 'condition': '비', 'wind': 7.8},
    '인천': {'temp': 21, 'humidity': 60, 'condition': '맑음', 'wind': 4.5},
    '대전': {'temp': 23, 'humidity': 50, 'condition': '흐림', 'wind': 2.1},
}

def recommend(city):
    if city not in weather_db:
        return f'{city}: 데이터 없음'

    info = weather_db[city]
    temp = info['temp']
    cond = info['condition']

    # 기온별 옷차림
    if temp >= 28:
        clothes = '반팔, 반바지'
    elif temp >= 23:
        clothes = '얇은 긴팔'
    elif temp >= 17:
        clothes = '가디건, 얇은 자켓'
    else:
        clothes = '두꺼운 외투'

    # 날씨별 소지품
    items = []
    if cond == '비':
        items.append('우산')
    if cond in ['맑음'] and temp >= 25:
        items.append('선크림')
    if info['wind'] >= 5:
        items.append('바람막이')

    result = f'🌡️ {city} ({temp}도, {cond})'
    result += f'\\n  옷차림: {clothes}'
    if items:
        result += f'\\n  준비물: {", ".join(items)}'
    return result

for city in ['서울', '제주', '부산']:
    print(recommend(city))
    print()`,
      expectedOutput: `🌡️ 서울 (22도, 맑음)\n  옷차림: 가디건, 얇은 자켓\n\n🌡️ 제주 (27도, 비)\n  옷차림: 얇은 긴팔\n  준비물: 우산, 바람막이\n\n🌡️ 부산 (25도, 구름)\n  옷차림: 얇은 긴팔\n  준비물: 바람막이\n`,
      hint: "조건문으로 기온과 날씨에 따라 다른 추천을 해요!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch2-1",
      type: "mission",
      title: "🎯 미션: 날씨 알림 함수!",
      task: "빈칸 3개를 채워서 날씨 알림 함수를 완성하세요!",
      initialCode: `weather_db = {
    '서울': {'temp': 22, 'humidity': 55, 'condition': '맑음', 'wind': 3.2},
    '부산': {'temp': 25, 'humidity': 70, 'condition': '구름', 'wind': 5.1},
    '제주': {'temp': 27, 'humidity': 80, 'condition': '비', 'wind': 7.8},
}

def weather_alert(city):
    if city not in weather_db:
        print(f'{city}: 데이터 없음')
        return

    info = weather_db[city]
    alerts = []

    if info['temp'] ___ 30:
        alerts.append('폭염 주의!')
    if info['humidity'] >= ___:
        alerts.append('습도 높음!')
    if info['___'] >= 7.0:
        alerts.append('강풍 주의!')

    print(f'=== {city} 알림 ===')
    if alerts:
        for alert in alerts:
            print(f'  ⚠️ {alert}')
    else:
        print('  ✅ 특이사항 없음')

weather_alert('서울')
weather_alert('제주')
weather_alert('부산')`,
      expectedOutput: `=== 서울 알림 ===\n  ✅ 특이사항 없음\n=== 제주 알림 ===\n  ⚠️ 습도 높음!\n  ⚠️ 강풍 주의!\n=== 부산 알림 ===\n  ✅ 특이사항 없음`,
      hint: "기온 30도 이상, 습도 75% 이상, 풍속 7.0 이상이면 알림!",
      hint2: ">= / 75 / wind"
    }
  ]
}
