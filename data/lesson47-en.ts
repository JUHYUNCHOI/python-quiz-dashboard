import { LessonData } from './types'

export const lesson47EnData: LessonData = {
  id: "47en",
  title: "Mini Project: Weather App",
  emoji: "🌤️",
  description: "Build a weather app using modules!",
  chapters: [
    {
      id: "ch1",
      title: "Creating Weather Data",
      emoji: "🌤️",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "💭 Can I build a real app with the modules I learned?",
          content: `💭 math, json, dictionaries, functions... can we **combine** everything we've learned to build a real usable app? Let's try making a **weather app**!

\`\`\`python
# What we're building: a weather info app!
# 1. Weather data structure (dictionaries)
# 2. Search feature (functions)
# 3. Statistical analysis (math module)
\`\`\`

@Key point: Combine modules + dictionaries + functions to complete a **weather app** project in 3 stages!

> Since we can't call real weather APIs from this web environment,
> we'll build the core logic of a weather app with **mock data**!`
        },
        {
          id: "ch1-1",
          type: "tryit",
          title: "💻 Stage 1: Weather Data!",
          task: "Create weather data with dictionaries and look it up!",
          initialCode: `# Mock weather data
weather_db = {
    'Seoul': {'temp': 22, 'humidity': 55, 'condition': 'Sunny', 'wind': 3.2},
    'Busan': {'temp': 25, 'humidity': 70, 'condition': 'Cloudy', 'wind': 5.1},
    'Jeju': {'temp': 27, 'humidity': 80, 'condition': 'Rain', 'wind': 7.8},
    'Incheon': {'temp': 21, 'humidity': 60, 'condition': 'Sunny', 'wind': 4.5},
    'Daejeon': {'temp': 23, 'humidity': 50, 'condition': 'Overcast', 'wind': 2.1},
}

# Full city list
print('=== Available Cities ===')
for city in weather_db:
    print(f'  {city}')

# Look up a specific city
city = 'Seoul'
info = weather_db[city]
print(f'\\n=== {city} Weather ===')
print(f'Temp: {info["temp"]}°')
print(f'Humidity: {info["humidity"]}%')
print(f'Condition: {info["condition"]}')
print(f'Wind: {info["wind"]}m/s')`,
          expectedOutput: `=== Available Cities ===\n  Seoul\n  Busan\n  Jeju\n  Incheon\n  Daejeon\n\n=== Seoul Weather ===\nTemp: 22°\nHumidity: 55%\nCondition: Sunny\nWind: 3.2m/s`,
          hint: "Use a dictionary inside a dictionary to structure the data!",
          hint2: "Access with weather_db['Seoul']['temp']!"
        },
        {
          id: "ch1-2",
          type: "quiz",
          title: "Quiz!",
          content: "What is the result of `weather_db['Jeju']['condition']`?",
          options: ["27", "80", "Rain", "Jeju"],
          answer: 2,
          explanation: "Jeju's condition is 'Rain'!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Building the Search Feature",
      emoji: "🔍",
      steps: [
        {
          id: "ch2-0",
          type: "tryit",
          title: "🔍 Stage 2: Weather Search Function!",
          task: "Build a weather search feature using functions!",
          initialCode: `weather_db = {
    'Seoul': {'temp': 22, 'humidity': 55, 'condition': 'Sunny', 'wind': 3.2},
    'Busan': {'temp': 25, 'humidity': 70, 'condition': 'Cloudy', 'wind': 5.1},
    'Jeju': {'temp': 27, 'humidity': 80, 'condition': 'Rain', 'wind': 7.8},
    'Incheon': {'temp': 21, 'humidity': 60, 'condition': 'Sunny', 'wind': 4.5},
    'Daejeon': {'temp': 23, 'humidity': 50, 'condition': 'Overcast', 'wind': 2.1},
}

# Weather emoji mapping
emoji_map = {'Sunny': '☀️', 'Cloudy': '⛅', 'Rain': '🌧️', 'Overcast': '☁️', 'Snow': '❄️'}

def get_weather(city):
    if city not in weather_db:
        print(f'{city}: No results found')
        return
    info = weather_db[city]
    emoji = emoji_map.get(info['condition'], '🌍')
    print(f'{emoji} {city} Weather')
    print(f'  Temp: {info["temp"]}°')
    print(f'  Humidity: {info["humidity"]}%')
    print(f'  Condition: {info["condition"]}')
    print(f'  Wind: {info["wind"]}m/s')

def compare_weather(city1, city2):
    if city1 not in weather_db or city2 not in weather_db:
        print('City not found!')
        return
    t1 = weather_db[city1]['temp']
    t2 = weather_db[city2]['temp']
    diff = abs(t1 - t2)
    hotter = city1 if t1 > t2 else city2
    print(f'{city1}({t1}°) vs {city2}({t2}°)')
    print(f'  {hotter} is {diff}° warmer!')

# Search test
cities_to_search = ['Seoul', 'Jeju', 'New York']
for city in cities_to_search:
    get_weather(city)
    print()

# Compare
compare_weather('Seoul', 'Busan')`,
          expectedOutput: `☀️ Seoul Weather\n  Temp: 22°\n  Humidity: 55%\n  Condition: Sunny\n  Wind: 3.2m/s\n\n🌧️ Jeju Weather\n  Temp: 27°\n  Humidity: 80%\n  Condition: Rain\n  Wind: 7.8m/s\n\nNew York: No results found\n\nSeoul(22°) vs Busan(25°)\n  Busan is 3° warmer!`,
          hint: "Splitting into functions makes the code clean!",
          hint2: "get_weather is for single lookup, compare_weather is for comparison!"
        },
        {
          id: "ch2-0b",
          type: "tryit",
          title: "💻 Weather Recommendation System!",
          task: "Run a system that recommends outfits based on the weather!",
          initialCode: `weather_db = {
    'Seoul': {'temp': 22, 'humidity': 55, 'condition': 'Sunny', 'wind': 3.2},
    'Busan': {'temp': 25, 'humidity': 70, 'condition': 'Cloudy', 'wind': 5.1},
    'Jeju': {'temp': 27, 'humidity': 80, 'condition': 'Rain', 'wind': 7.8},
    'Incheon': {'temp': 21, 'humidity': 60, 'condition': 'Sunny', 'wind': 4.5},
    'Daejeon': {'temp': 23, 'humidity': 50, 'condition': 'Overcast', 'wind': 2.1},
}

def recommend(city):
    if city not in weather_db:
        return f'{city}: No data'

    info = weather_db[city]
    temp = info['temp']
    cond = info['condition']

    # Outfit by temperature
    if temp >= 28:
        clothes = 'T-shirt, shorts'
    elif temp >= 23:
        clothes = 'Light long sleeve'
    elif temp >= 17:
        clothes = 'Cardigan, light jacket'
    else:
        clothes = 'Heavy coat'

    # Items by weather
    items = []
    if cond == 'Rain':
        items.append('Umbrella')
    if cond in ['Sunny'] and temp >= 25:
        items.append('Sunscreen')
    if info['wind'] >= 5:
        items.append('Windbreaker')

    result = f'🌡️ {city} ({temp}°, {cond})'
    result += f'\\n  Outfit: {clothes}'
    if items:
        result += f'\\n  Bring: {", ".join(items)}'
    return result

for city in ['Seoul', 'Jeju', 'Busan']:
    print(recommend(city))
    print()`,
          expectedOutput: `🌡️ Seoul (22°, Sunny)\n  Outfit: Cardigan, light jacket\n\n🌡️ Jeju (27°, Rain)\n  Outfit: Light long sleeve\n  Bring: Umbrella, Windbreaker\n\n🌡️ Busan (25°, Cloudy)\n  Outfit: Light long sleeve\n  Bring: Windbreaker\n`,
          hint: "Use conditionals to give different recommendations based on temperature and weather!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch2-1",
          type: "mission",
          title: "🎯 Mission: Weather Alert Function!",
          task: "Fill in 3 blanks to complete the weather alert function!",
          initialCode: `weather_db = {
    'Seoul': {'temp': 22, 'humidity': 55, 'condition': 'Sunny', 'wind': 3.2},
    'Busan': {'temp': 25, 'humidity': 70, 'condition': 'Cloudy', 'wind': 5.1},
    'Jeju': {'temp': 27, 'humidity': 80, 'condition': 'Rain', 'wind': 7.8},
}

def weather_alert(city):
    if city not in weather_db:
        print(f'{city}: No data')
        return

    info = weather_db[city]
    alerts = []

    if info['temp'] ___ 30:
        alerts.append('Heat warning!')
    if info['humidity'] >= ___:
        alerts.append('High humidity!')
    if info['___'] >= 7.0:
        alerts.append('Strong wind warning!')

    print(f'=== {city} Alerts ===')
    if alerts:
        for alert in alerts:
            print(f'  ⚠️ {alert}')
    else:
        print('  ✅ Nothing unusual')

weather_alert('Seoul')
weather_alert('Jeju')
weather_alert('Busan')`,
          expectedOutput: `=== Seoul Alerts ===\n  ✅ Nothing unusual\n=== Jeju Alerts ===\n  ⚠️ High humidity!\n  ⚠️ Strong wind warning!\n=== Busan Alerts ===\n  ✅ Nothing unusual`,
          hint: "Alert if temp 30+ degrees, humidity 75%+, wind speed 7.0+!",
          hint2: ">= / 75 / wind"
        }
      ]
    },
    {
      id: "ch3",
      title: "Statistical Analysis + Completion",
      emoji: "📊",
      steps: [
        {
          id: "ch3-0",
          type: "tryit",
          title: "📊 Stage 3: Statistics with math module!",
          task: "Use the math module to analyze weather statistics!",
          initialCode: `import math

weather_db = {
    'Seoul': {'temp': 22, 'humidity': 55, 'condition': 'Sunny'},
    'Busan': {'temp': 25, 'humidity': 70, 'condition': 'Cloudy'},
    'Jeju': {'temp': 27, 'humidity': 80, 'condition': 'Rain'},
    'Incheon': {'temp': 21, 'humidity': 60, 'condition': 'Sunny'},
    'Daejeon': {'temp': 23, 'humidity': 50, 'condition': 'Overcast'},
}

# Temperature statistics
temps = [info['temp'] for info in weather_db.values()]
avg_temp = sum(temps) / len(temps)
max_temp = max(temps)
min_temp = min(temps)

print('=== Temperature Stats ===')
print(f'Average: {avg_temp:.1f}°')
print(f'Ceil: {math.ceil(avg_temp)}°')
print(f'Floor: {math.floor(avg_temp)}°')
print(f'Highest: {max_temp}°')
print(f'Lowest: {min_temp}°')
print(f'Range: {max_temp - min_temp}°')

# Cities by condition
print('\\n=== Cities by Condition ===')
conditions = {}
for city, info in weather_db.items():
    cond = info['condition']
    if cond not in conditions:
        conditions[cond] = []
    conditions[cond].append(city)

for cond, cities in conditions.items():
    print(f'{cond}: {", ".join(cities)}')`,
          expectedOutput: `=== Temperature Stats ===\nAverage: 23.6°\nCeil: 24°\nFloor: 23°\nHighest: 27°\nLowest: 21°\nRange: 6°\n\n=== Cities by Condition ===\nSunny: Seoul, Incheon\nCloudy: Busan\nRain: Jeju\nOvercast: Daejeon`,
          hint: "math.ceil rounds up, math.floor rounds down!",
          hint2: "Use list comprehension to collect all temperatures!"
        },
        {
          id: "ch3-1",
          type: "mission",
          title: "🎯 Mission: Complete the Weather App!",
          task: "Fill in 3 blanks to complete the weather app main function!",
          initialCode: `import math
import ___

weather_db = {
    'Seoul': {'temp': 22, 'humidity': 55, 'condition': 'Sunny'},
    'Busan': {'temp': 25, 'humidity': 70, 'condition': 'Cloudy'},
    'Jeju': {'temp': 27, 'humidity': 80, 'condition': 'Rain'},
}

def weather_app():
    # 1. Save data as JSON
    save_data = json.dumps(weather_db, ensure_ascii=False)
    print(f'Data loaded! ({len(weather_db)} cities)')

    # 2. Analyze all temperatures
    temps = [info['temp'] for info in weather_db.___()]
    avg = sum(temps) / len(temps)
    print(f'National avg temp: {math.___(avg)}° (rounded up)')

    # 3. Find the hottest city
    hottest_city = ''
    hottest_temp = 0
    for city, info in weather_db.items():
        if info['temp'] > hottest_temp:
            hottest_temp = info['temp']
            hottest_city = city

    print(f'Hottest city: {hottest_city} ({hottest_temp}°)')

weather_app()`,
          expectedOutput: `Data loaded! (3 cities)\nNational avg temp: 25° (rounded up)\nHottest city: Jeju (27°)`,
          hint: "Import the json module, use values() and math.ceil()!",
          hint2: "json / values / ceil"
        },
        {
          id: "ch3-2",
          type: "explain",
          title: "💭 What if we connected this to a real weather API?",
          content: `💭 We used mock data this time... but what would it take to get **real-time data** from an actual **weather server**?

\`\`\`python
# Call an API with the requests package
import requests
response = requests.get('https://api.weather.com/...')
data = response.json()
\`\`\`

@Key point: Once you learn the requests package, you can fetch real-time weather data from actual APIs!

Summary of concepts used in this project:
- **Nested dictionaries** — weather data by city
- **Functions** — search, compare, alerts, statistics
- **math module** — ceil, floor
- **json module** — dumps, loads`
        }
      ]
    }
  ]
}
