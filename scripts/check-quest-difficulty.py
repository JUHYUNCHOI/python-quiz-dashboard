#!/usr/bin/env python3
"""quest 난이도가 **누가 매긴 값인지** 를 가른다.

왜 (2026-09-13): 선생님 *"이 문제가 진짜 레벨3인가?"* — 열어보니 moohunt 의 3 은
**아무도 매긴 적이 없는 유추값**이었다. 그날 Bronze quest 122개 중 80개가 그랬다.

값이 나오는 길이 셋인데 화면에는 **똑같이 숫자 하나**로 보인다:
  ① `mcc-difficulty.ts` 감사맵      — 사람이 매겼다
  ② `quest-meta.ts` 의 difficulty   — 사람이 매겼다
  ③ `quest-difficulty.ts` 유추      — 아무도 안 봤다 ("모르겠다" 는 뜻의 3)
  ④ **엔트리는 있는데 difficulty 필드가 없다** — `DEFAULT_META` 의 기본값 2 가
     그대로 뜬다. ③보다 나쁘다: **매긴 값처럼 보인다.** (alchemy 가 그랬다)

  python3 scripts/check-quest-difficulty.py            # 요약
  python3 scripts/check-quest-difficulty.py --list     # ④ 목록 (제일 위험한 것)

⚠️ 판정이 아니라 **볼 자리 표시**다. ③이 많은 것 자체는 문제가 아니다 —
   문제는 ④처럼 **안 매긴 값이 매긴 값처럼 보이는** 것이다.
"""
import io, re, sys

page = io.open("app/quest/page.tsx", encoding="utf-8").read()
meta = io.open("lib/quest-meta.ts", encoding="utf-8").read()
mcc  = io.open("lib/mcc-difficulty.ts", encoding="utf-8").read()

quests = {m.group(1): m.group(2)
          for m in re.finditer(r'id:\s*"([a-z0-9]+)"[^}]*?sub:\s*"([^"]*)"', page)}

# quest-meta 의 엔트리 — difficulty 가 있는 것과 없는 것을 가른다
# ⚠️ 정규식으로 블록을 자르면 안 된다. 처음에 `^  \},` 를 끝으로 잡았다가
#    엔트리 안의 중첩 객체(validate_io·solution_py)에 걸려 bacteria 를 "안 매김" 으로
#    잘못 셌다. 검사기가 조용히 틀리는 그 패턴이다
#    (memory/feedback_checkers_can_be_silently_wrong.md).
#    → **중괄호 깊이로 센다.**
entries, with_diff = set(), set()
for m in re.finditer(r'^  ([a-z0-9]+):\s*\{', meta, re.M):
    name = m.group(1)
    entries.add(name)
    i, d = m.end(), 1
    while i < len(meta) and d:
        c = meta[i]
        if c == "{": d += 1
        elif c == "}": d -= 1
        i += 1
    if re.search(r'\bdifficulty:\s*\d', meta[m.end():i]):
        with_diff.add(name)
# ⚠️ 2026-09-25 수정: mcc-difficulty.ts 는 한 줄에 여러 엔트리를 쉼표로 늘어놓는다
#    (`tichu: 3, tricks: 3, word: 3,`). `^\s*name:\s*\d\s*,` 는 **줄 맨 앞 것만** 잡고
#    같은 줄의 나머지는 놓친다 — 48개 중 19개만 잡혀 word·reach·subseqmedian·
#    mcc21simplemath 등 29개가 "안 매김(④)" 으로 잘못 보였다. 객체 본문만 잘라
#    줄 시작 앵커 없이 전부 찾는다(주석은 먼저 지운다).
_mcc_body = re.search(r'MCC_DIFFICULTY[^{]*\{(.*?)\n\};', mcc, re.S)
_mcc_body = re.sub(r'//.*', '', _mcc_body.group(1)) if _mcc_body else ""
audited = set(re.findall(r'([a-z0-9]+):\s*[1-5]\s*,', _mcc_body))

buckets = {"① 감사맵": [], "② 명시": [], "③ 유추": [], "④ 기본값이 새어나옴": []}
for q in sorted(quests):
    if q in audited:            buckets["① 감사맵"].append(q)
    elif q in with_diff:        buckets["② 명시"].append(q)
    elif q in entries:          buckets["④ 기본값이 새어나옴"].append(q)
    else:                       buckets["③ 유추"].append(q)

leak = buckets["④ 기본값이 새어나옴"]
if "--list" in sys.argv:
    print("④ 엔트리는 있는데 difficulty 가 없다 — 기본값 2 가 매긴 값처럼 보인다:")
    for q in leak:
        print(f"  {q:<16} {quests[q]}")
    sys.exit(1 if leak else 0)

print(f"quest {len(quests)}개 — 난이도가 어디서 오나")
for k, v in buckets.items():
    print(f"  {k:<18} {len(v):>4}개")
print()
if leak:
    print(f"⚠️ ④ 가 {len(leak)}개 있다 — 이게 제일 위험하다.")
    print("   아무도 안 매겼는데 **매긴 값처럼 보인다.** `--list` 로 목록을 보고,")
    print("   실제로 열어본 quest 는 quest-meta.ts 에 difficulty 를 명시해라.")
else:
    print("✅ ④ 없음 — 엔트리가 있는 quest 는 전부 difficulty 를 명시하고 있다.")
sys.exit(1 if leak else 0)
