import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "보통 도전",
  emoji: "⭐⭐",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "⭐⭐ 도전 레벨 UP!",
      content: `## 보통 난이도 도전!

| 번호 | 기능 | 사용 개념 |
|------|------|----------|
| ④ | 퀘스트 시스템 | 딕셔너리 + 조건문 |
| ⑤ | 스킬 시스템 | 클래스 + 메서드 |

**딕셔너리**와 **클래스 메서드**를 활용하는 도전!`
    },
    {
      id: "ch2-1",
      type: "tryit",
      title: "💻 ④ 퀘스트 시스템!",
      task: "딕셔너리로 퀘스트를 관리하는 시스템을 실행해보세요!",
      initialCode: `class Quest:
    def __init__(s, name, description, target, reward_gold, reward_exp):
        s.name = name
        s.description = description
        s.target = target    # 달성 조건 수치
        s.progress = 0       # 현재 진행도
        s.completed = False
        s.reward_gold = reward_gold
        s.reward_exp = reward_exp

    def update(s, amount):
        if s.completed:
            return
        s.progress += amount
        print(f'  [{s.name}] 진행: {s.progress}/{s.target}')
        if s.progress >= s.target:
            s.completed = True
            print(f'  ★ 퀘스트 완료! 보상: {s.reward_gold}골드, {s.reward_exp}EXP')

    def show(s):
        status = '완료' if s.completed else f'{s.progress}/{s.target}'
        print(f'  [{status}] {s.name}: {s.description}')

# 퀘스트 목록!
quests = {
    'kill_slime': Quest('슬라임 사냥', '슬라임 3마리 처치', 3, 50, 30),
    'collect_gold': Quest('골드 모으기', '100골드 모으기', 100, 0, 50),
}

print('=== 퀘스트 목록 ===')
for q in quests.values():
    q.show()

# 슬라임 처치!
print('\\n--- 슬라임 처치! ---')
quests['kill_slime'].update(1)
quests['kill_slime'].update(1)
quests['kill_slime'].update(1)

# 골드 획득!
print('\\n--- 골드 획득! ---')
quests['collect_gold'].update(50)
quests['collect_gold'].update(30)
quests['collect_gold'].update(30)

print('\\n=== 퀘스트 현황 ===')
for q in quests.values():
    q.show()`,
      expectedOutput: `=== 퀘스트 목록 ===\n  [0/3] 슬라임 사냥: 슬라임 3마리 처치\n  [0/100] 골드 모으기: 100골드 모으기\n\n--- 슬라임 처치! ---\n  [슬라임 사냥] 진행: 1/3\n  [슬라임 사냥] 진행: 2/3\n  [슬라임 사냥] 진행: 3/3\n  ★ 퀘스트 완료! 보상: 50골드, 30EXP\n\n--- 골드 획득! ---\n  [골드 모으기] 진행: 50/100\n  [골드 모으기] 진행: 80/100\n  [골드 모으기] 진행: 110/100\n  ★ 퀘스트 완료! 보상: 0골드, 50EXP\n\n=== 퀘스트 현황 ===\n  [완료] 슬라임 사냥: 슬라임 3마리 처치\n  [완료] 골드 모으기: 100골드 모으기`,
      hint: "progress가 target 이상이면 완료!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch2-2",
      type: "mission",
      title: "🎯 미션: 퀘스트 완성!",
      task: "빈칸 3개를 채워서 퀘스트를 완성하세요!",
      initialCode: `class Quest:
    def __init__(s, name, target):
        s.name = name
        s.target = target
        s.progress = 0
        s.___ = False

    def update(s, amount):
        s.progress += amount
        if s.progress >= s.___:
            s.completed = True
            print(f'{s.name} 완료!')
        else:
            print(f'{s.name}: {s.progress}/{s.target}')

q = Quest('몬스터 처치', 3)
q.update(1)
q._____(1)
q.update(1)`,
      expectedOutput: `몬스터 처치: 1/3\n몬스터 처치: 2/3\n몬스터 처치 완료!`,
      hint: "완료 상태, 목표치 비교, update 호출!",
      hint2: "completed / target / update"
    },
    {
      id: "ch2-3",
      type: "tryit",
      title: "💻 ⑤ 스킬 시스템!",
      task: "직업별 특수 스킬을 사용해보세요!",
      initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.mp = 50
        s.max_mp = 50

        if job == 'warrior':
            s.hp, s.max_hp, s.atk, s.defense = 120, 120, 15, 12
            s.skills = {
                'power_strike': {'name': '강타', 'mp': 15, 'multiplier': 2.0},
                'war_cry': {'name': '함성', 'mp': 10, 'atk_buff': 5},
            }
        elif job == 'mage':
            s.hp, s.max_hp, s.atk, s.defense = 80, 80, 25, 5
            s.skills = {
                'fireball': {'name': '파이어볼', 'mp': 20, 'multiplier': 2.5},
                'heal_spell': {'name': '힐', 'mp': 15, 'heal': 40},
            }
        else:
            s.hp, s.max_hp, s.atk, s.defense = 100, 100, 20, 8
            s.skills = {
                'rapid_shot': {'name': '속사', 'mp': 15, 'hits': 3},
                'dodge': {'name': '회피', 'mp': 10, 'def_buff': 8},
            }

    def use_skill(s, skill_key, target=None):
        if skill_key not in s.skills:
            print('  스킬 없음!')
            return
        skill = s.skills[skill_key]
        if s.mp < skill['mp']:
            print(f'  MP 부족! ({s.mp}/{skill["mp"]})')
            return

        s.mp -= skill['mp']
        jobs = {'warrior': '용사', 'mage': '마법사', 'archer': '궁수'}

        if 'multiplier' in skill:
            damage = int(s.atk * skill['multiplier'])
            print(f'  ★ {skill["name"]}! {damage} 데미지! (MP: {s.mp})')
        elif 'heal' in skill:
            s.hp = min(s.hp + skill['heal'], s.max_hp)
            print(f'  ★ {skill["name"]}! HP {s.hp}/{s.max_hp} (MP: {s.mp})')
        elif 'hits' in skill:
            total = 0
            for i in range(skill['hits']):
                dmg = int(s.atk * 0.6)
                total += dmg
            print(f'  ★ {skill["name"]}! {skill["hits"]}연타 = {total} 데미지! (MP: {s.mp})')
        elif 'atk_buff' in skill:
            s.atk += skill['atk_buff']
            print(f'  ★ {skill["name"]}! ATK +{skill["atk_buff"]} -> {s.atk} (MP: {s.mp})')
        elif 'def_buff' in skill:
            s.defense += skill['def_buff']
            print(f'  ★ {skill["name"]}! DEF +{skill["def_buff"]} -> {s.defense} (MP: {s.mp})')

    def show_skills(s):
        jobs = {'warrior': '용사', 'mage': '마법사', 'archer': '궁수'}
        print(f'[{jobs[s.job]}] {s.name}의 스킬 (MP: {s.mp}/{s.max_mp})')
        for key, skill in s.skills.items():
            print(f'  - {skill["name"]} (MP: {skill["mp"]})')

# 테스트!
print('=== 용사 스킬 ===')
warrior = Character('철수', 'warrior')
warrior.show_skills()
warrior.use_skill('power_strike')
warrior.use_skill('war_cry')

print('\\n=== 마법사 스킬 ===')
mage = Character('영희', 'mage')
mage.hp = 50
mage.show_skills()
mage.use_skill('fireball')
mage.use_skill('heal_spell')

print('\\n=== 궁수 스킬 ===')
archer = Character('민수', 'archer')
archer.show_skills()
archer.use_skill('rapid_shot')
archer.use_skill('dodge')`,
      expectedOutput: `=== 용사 스킬 ===\n[용사] 철수의 스킬 (MP: 50/50)\n  - 강타 (MP: 15)\n  - 함성 (MP: 10)\n  ★ 강타! 30 데미지! (MP: 35)\n  ★ 함성! ATK +5 -> 20 (MP: 25)\n\n=== 마법사 스킬 ===\n[마법사] 영희의 스킬 (MP: 50/50)\n  - 파이어볼 (MP: 20)\n  - 힐 (MP: 15)\n  ★ 파이어볼! 62 데미지! (MP: 30)\n  ★ 힐! HP 80/80 (MP: 15)\n\n=== 궁수 스킬 ===\n[궁수] 민수의 스킬 (MP: 50/50)\n  - 속사 (MP: 15)\n  - 회피 (MP: 10)\n  ★ 속사! 3연타 = 36 데미지! (MP: 35)\n  ★ 회피! DEF +8 -> 16 (MP: 25)`,
      hint: "딕셔너리로 스킬 데이터 관리, MP 소모!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch2-4",
      type: "mission",
      title: "🎯 미션: 스킬 추가!",
      task: "빈칸 3개를 채워서 스킬 시스템을 완성하세요!",
      initialCode: `class Mage:
    def __init__(s, name):
        s.name = name
        s.hp, s.max_hp = 80, 80
        s.atk = 25
        s.mp = 50

    def fireball(s):
        cost = 20
        if s.___ < cost:
            print('MP 부족!')
            return
        s.mp -= cost
        damage = int(s.atk * ___)
        print(f'파이어볼! {damage} 데미지 (MP: {s.mp})')

    def heal(s):
        cost = 15
        if s.mp < cost:
            print('MP 부족!')
            return
        s.mp -= cost
        s.hp = min(s.hp + 40, s.___)
        print(f'힐! HP: {s.hp}/{s.max_hp} (MP: {s.mp})')

m = Mage('영희')
m.hp = 50
m.fireball()
m.heal()`,
      expectedOutput: `파이어볼! 62 데미지 (MP: 30)\n힐! HP: 80/80 (MP: 15)`,
      hint: "MP 확인, 2.5배 데미지, max_hp 제한!",
      hint2: "mp / 2.5 / max_hp"
    },
    {
      id: "ch2-5",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "퀘스트 시스템에서 `s.progress >= s.target`을 체크하는 이유는?",
      options: [
        "진행도가 정확히 목표와 같을 때만 완료",
        "진행도가 목표 이상이면 완료 처리하려고",
        "퀘스트를 삭제하려고",
        "보상을 줄이려고"
      ],
      answer: 1,
      explanation: "한 번에 여러 개를 달성할 수 있으니 >=로 체크! 예: 목표 3인데 한 번에 5를 달성해도 완료!"
    },
    {
      id: "ch2-6",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "스킬 데이터를 딕셔너리로 관리하는 장점은?",
      options: [
        "코드가 더 길어져서 좋다",
        "새 스킬을 추가할 때 데이터만 넣으면 됨",
        "딕셔너리가 리스트보다 빠라서",
        "파이썬 규칙이라서"
      ],
      answer: 1,
      explanation: "스킬 데이터를 딕셔너리로 분리하면, 새 스킬 추가 시 코드 수정 없이 데이터만 추가하면 돼요!"
    }
  ]
}
