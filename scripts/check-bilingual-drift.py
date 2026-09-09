#!/usr/bin/env python3
"""`t(E, 영어, 한국어)` 두 짝 중 **한쪽만 고친** 자리를 찾는다.

왜 (2026-09-09):
  fences 커밋 메시지에 "스캐너가 누르기 전에 결론을 말하던 것을 뺐다" 고 적었는데
  **영어만 뺐다.** 한국어에는 "풀이 가장 적은 열이 가장 싸!" 가 그대로 남아 있었다.
  한국어로 보는 학생에게는 아무것도 안 고쳐진 상태였다.
  같은 실수가 "점 → 풀" 통일에서도 세 곳, mcc15rect narr 에서 한 곳 더 있었다.

  배포 전 다섯 명(python-qa · cpp-qa · quest-auditor · ux-reviewer · pedagogy)이
  독립으로 검토했는데 **다섯 다 mcc15rect 건을 놓쳤다.** 이유가 구조적이다 —
  검토자는 한 번에 한 언어로 화면을 본다. 두 언어를 나란히 놓고 보지 않으면
  "한쪽만 바뀐" 것은 어느 쪽에서도 이상해 보이지 않는다.
  빌드도 못 잡고 check-quest-lang.py 도 못 잡는다(그건 "영어 자리에 한글이 들어갔나" 만 본다).

이 검사기가 보는 것 — 세 가지 신호. **판정이 아니라 볼 자리 표시다.**
  ① 길이 비대칭: 한쪽이 다른 쪽의 절반도 안 된다 (정보량이 다르다)
  ② 숫자 불일치: 한쪽에만 있는 숫자가 있다 (예제 값을 한쪽만 바꿨다)
  ③ 문장 수 불일치: 마침표·물음표 개수가 다르다 (한쪽에서 문장을 통째로 뺐다)

한국어가 영어보다 짧은 건 자연스럽다(조사·어미가 붙어도 대개 짧다).
그래서 ①은 **한국어가 영어의 0.35배 미만** 일 때만 울린다 — 실측으로 맞춘 값이다.
"""
import glob, io, re, sys

# t(E, "영어", "한국어") — 두 문자열 인자를 잡는다.
PAIR = re.compile(
    r't\(\s*E\s*,\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"',
)

# 사람이 보고 "이건 일부러 그렇다" 고 판정한 자리. 이유를 꼭 적어라.
ALLOW = set()


def sentences(s):
    return len(re.findall(r"[.?!]", s))


# ⚠️ 한 자리 숫자는 비교하지 않는다. 영어는 "Three corners", 한국어는 "꼭짓점 3개",
# 영어는 "the fourth", 한국어는 "네 번째" — 표기가 갈리는 게 정상이라 세면 헛경보만 쌓인다.
# 처음엔 영어 글자 숫자(three→3)를 매핑해 봤는데, 이번엔 한국어 쪽이 "네 번째" 라서
# 오히려 헛경보가 늘었다(4건 → 14건). 양쪽 다 매핑하는 건 끝이 없어서 포기했다.
# **두 자리 이상만 본다** — 예제 값(27114424 · 410 · 36 · 11)이 거기 있고, 그게 진짜 위험이다.
def numbers(s):
    """두 자리 이상 숫자만.
    자릿수 구분 쉼표만 지운다 — 세 자리씩 끊은 것만(27,114,424 → 27114424).
    좌표 (2,6) 의 쉼표까지 지우면 "26" 이라는 없는 숫자가 생겨 헛경보가 난다. 실제로 났다."""
    t = re.sub(r"(\d{1,3})(?:,(\d{3}))+", lambda m: m.group(0).replace(",", ""), s)
    return sorted(n for n in re.findall(r"\d+", t) if len(n) >= 2)


hits = []
for f in sorted(glob.glob("quest-problems/*/*.jsx")):
    src = io.open(f, encoding="utf-8").read()
    for m in PAIR.finditer(src):
        en, ko = m.group(1), m.group(2)
        if not en.strip() or not ko.strip():
            continue
        # 코드 조각·기호만 있는 짝은 건너뛴다 (한글이 아예 없으면 번역이 아니다)
        if not re.search(r"[가-힣]", ko):
            continue
        line = src[: m.start()].count("\n") + 1
        quest = f.split("/")[1]
        if (quest, line) in ALLOW:
            continue

        why = []
        # ① 길이 비대칭 — 한국어가 영어의 0.35배 미만이면 정보가 빠진 것으로 본다.
        #    짧은 명사구("rectangle with sides parallel to the axes" ↔ "변이 축에 평행한 직사각형")는
        #    한국어가 원래 더 압축되므로 55자 이상인 문장만 본다 — 실측으로 맞춘 값이다.
        if len(en) >= 55 and len(ko) < len(en) * 0.35:
            why.append(f"길이 EN {len(en)} vs KO {len(ko)}")
        # ② 숫자 불일치
        ne, nk = numbers(en), numbers(ko)
        if ne != nk:
            only_en = [x for x in ne if x not in nk]
            only_ko = [x for x in nk if x not in ne]
            if only_en or only_ko:
                why.append(f"숫자 EN에만{only_en or '없음'} KO에만{only_ko or '없음'}")
        # ③ 한국어에서 문장이 **줄어든** 경우만.
        #    한국어가 더 많은 건 정상이다 — 절 단위로 끊어 쓰라는 규칙이 있어서
        #    한 영어 문장이 한국어 두세 문장이 되는 게 흔하다(feedback_korean_linebreak.md).
        #    처음엔 양방향으로 쟀다가 simplegame 에서 헛경보만 잔뜩 나왔다.
        se, sk = sentences(en), sentences(ko)
        if se >= 3 and sk <= se - 2:
            why.append(f"문장 수 EN {se} vs KO {sk} (한국어에서 줄었다)")

        if why:
            hits.append((quest, f, line, " · ".join(why), en[:64], ko[:44]))

print(f"두 언어가 어긋나 보이는 곳: {len(hits)}건")
print("  (판정이 아니다 — 한쪽만 고친 자리인지 사람이 두 문장을 나란히 놓고 봐라)\n")
for quest, f, line, why, en, ko in hits:
    print(f"  ⚠️ {quest}  {f}:{line}")
    print(f"     {why}")
    print(f"     EN: {en}…")
    print(f"     KO: {ko}…")

sys.exit(1 if hits else 0)
