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

─────────────────────────────────────────────────────────────────
2026-09-22 재조정 — 왜, 그리고 무엇을 바꿨나
  표본 18건을 사람이 직접 열어 판정했더니: 진짜 정보 누락 3(경미) · 화면과 모순 1(더 심각,
  이 검사기 범위 밖) · **헛경보 14**. 630건 중 대부분이 헛경보였다는 뜻이다.
  주석에 "narr 는 한국어가 짧은 게 정상" 이라고 이미 적어 놓고도 630건을 그대로
  보고했다 — **주석은 안 먹힌다. 출력에서 층을 갈라야 먹힌다.** 그래서 이번엔
  "위반(REAL)" 과 "볼 자리(WATCH)" 를 출력에서 물리적으로 나눴다. WATCH 는
  exit code 에 안 걸리고, 개수도 따로 센다.

  세 가지 헛경보 원인과 처방:

  ㉠ narr 필드는 한국어만 55자 이하로 짧은 게 **규칙**이다(feedback_narration_short.md).
     영어 narr 이 길고 한국어가 짧은 건 "정보 누락" 이 아니라 "설명이 아래 카드로
     옮겨간 것" 이다. → **narr 행에서는 ① 길이 신호를 아예 계산하지 않는다.**
     narr 전용 ④(문장 수) 신호만 쓰고, 그 결과는 REAL 이 아니라 **WATCH** 로 보낸다.
     단, ② 숫자 불일치는 narr 여도 REAL 로 남긴다 — 숫자 누락은 narr 라도 진짜일 수 있다.

  ㉡ `{t(E,"A")}<b>{t(E,"B")}</b>{t(E,"C")}` 처럼 **볼드 용어를 사이에 두고 한 문장이
     세 조각으로 쪼개진 자리**가 있다. 한국어는 어순(SOV)이 달라 조각 길이가 영어와
     안 맞는 게 당연한데, 조각 하나만 떼어 재면 "길이 EN 86 vs KO 8" 처럼 가짜로 크게
     벌어진다. → **같은 JSX 안에서 이웃한 `t(E,…)` 조각들을 이어 붙인 뒤** 그 합친
     문자열로 신호를 잰다. "이웃" 판정은: 두 t() 호출 사이 간격이 250자 미만이고,
     그 간격 안에 JSX 태그(`<b>`·`</b>`·`<span>`… )가 최소 하나 있고, `</div>` 가
     없을 때만 — 즉 **인라인 서식으로 한 문장을 잇는 자리만** 묶는다. `</div>` 로
     막은 건 서로 다른 문장(다른 불릿·다른 옵션)일 가능성이 커서 안 묶는다.

  ㉢ `10^18`(EN) vs `10¹⁸`(KO) 처럼 뜻은 같은데 위첨자 유니코드라서 숫자로 안 읽혔다.
     → 위첨자·아래첨자 숫자를 일반 숫자로 정규화하고, 앞의 밑수와 갈라지도록
     `^`/`_` 를 끼워 넣은 뒤(`10¹⁸` → `10^18`) 숫자를 뽑는다.

  검증: 표본 18건 중 헛경보 14(acowdemia1:169·aircond:12·backforth:12·blockgame:12 등
  narr 길이형 + billboard2:231·buymilk:66 조각형 + chipxchg:100 위첨자형 포함)는 모두
  REAL 목록에서 빠졌다(0건 아니면 WATCH 로 이동). 진짜 4건 중 lc303:192·mcc20kitty:542
  (둘 다 숫자 누락)는 REAL 에 그대로 남는다. cowevolution:121·mcc20citytour:143/152 는
  narr 문장 수 신호라 WATCH 로 이동했다 — **사라진 게 아니라 칸을 옮긴 것**이다(아래
  "볼 자리" 절에서 그대로 출력됨). mcc20citytour:106 은 원래부터 어떤 신호도 잡지
  못하는 "화면과 모순"(내용이 서로 어긋남) 유형이라 이 검사기의 범위 밖이다 — 이번
  수정으로 새로 잡게 만들지 않았다(요청 범위 밖).
─────────────────────────────────────────────────────────────────
"""
import glob, io, re, sys

# t(E, "영어", "한국어") — 두 문자열 인자를 잡는다.
PAIR = re.compile(
    r't\(\s*E\s*,\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"',
)

# 두 t(E,…) 조각을 "한 문장" 으로 이어 붙일지 판단하는 간격 규칙 (㉡).
# 간격 안에 **인라인 서식 태그**(굵게·기울임 등)가 있고, 필드/스텝 경계를 나타내는
# 키워드가 없을 때만 묶는다. 순수 쉼표·배열 나열(`), t(E,`)은 태그가 없어 안 묶인다
# — options 배열의 서로 다른 보기가 한 문장으로 뭉쳐지는 사고를 막는다.
# ⚠️ 처음엔 `</?[a-zA-Z][^>]*>` (아무 태그나) 로 했다가 `<Mcc20CityTourBfsSim .../>`
# 같은 **커스텀 컴포넌트 자기닫힘 태그**까지 "인라인 서식" 으로 오인해서, 서로 다른
# 스텝의 narr 둘(143·152)을 한 문장으로 합쳐 버렸다. 인라인 서식 태그만 화이트리스트로 묶는다.
TAG_IN_GAP = re.compile(r"</?(?:b|i|u|em|strong|span|code|sup|sub|mark)\b[^>]*>")
# 이 키워드가 간격에 있으면 다른 필드/스텝으로 넘어간 것 — 절대 안 묶는다.
BOUNDARY_IN_GAP = re.compile(r"</div>|\bnarr:|\bcontent:|\bquestion:|\btype:|\boptions:")
MAX_GAP = 250

# 위첨자·아래첨자 숫자 → 일반 숫자. 밑수와 갈라지게 앞에 구분자를 끼워 넣는다.
# "10¹⁸" → "10^18" (EN 의 "10^18" 과 같은 토큰 두 개 "10","18" 로 갈라지게).
SUPERSCRIPT = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789")
SUBSCRIPT = str.maketrans("₀₁₂₃₄₅₆₇₈₉", "0123456789")


def normalize_script_digits(s):
    s = re.sub(r"[⁰¹²³⁴⁵⁶⁷⁸⁹]+", lambda m: "^" + m.group(0).translate(SUPERSCRIPT), s)
    s = re.sub(r"[₀₁₂₃₄₅₆₇₈₉]+", lambda m: "_" + m.group(0).translate(SUBSCRIPT), s)
    return s


# 사람이 보고 "이건 일부러 그렇다" 고 판정한 자리. 이유를 꼭 적어라.
ALLOW = set()


def sentences(s):
    """문장 끝만 센다.
    ⚠️ 숫자 사이의 마침표(1.8 · 10^9.5)와 줄임표(…)는 문장이 아니다.
    처음엔 [.?!] 를 그대로 셌더니 영어 쪽이 부풀어 85건이 나왔다 — 실제로는 46건이다.
    영어가 소수·약어를 더 많이 쓰기 때문에 한쪽만 부푼다."""
    t = re.sub(r"(?<=\d)\.(?=\d)", "", s)      # 1.8 → 18
    t = t.replace("...", "").replace("…", "")
    # ⚠️ 영어 약어의 마침표는 문장 끝이 아니다. 2026-09-10 에 rectangles 캡션
    # "e.g. [①②] + [③④] · never …" 이 영어 3문장 대 한국어 1문장으로 잡혔다 —
    # 뜻이 같은 한 줄인데 `e.g.` 의 점 두 개가 문장 둘을 만들어냈다.
    t = re.sub(r"\b(?:e\.g|i\.e|etc|vs|Mr|Dr|approx|cf|no)\.", " ", t, flags=re.I)
    # ⚠️ 마침표 개수를 세면 안 된다. 한국어는 마지막 문장을 마침표 없이
    # 이모지("… 정리해요 👇")로 끝내는 일이 잦아, 같은 내용인데 한 문장 적게 세진다.
    # 끝나는 자리(. ? ! 줄바꿈)로 **쪼갠 조각 수**를 센다 — 마지막 조각도 한 문장이다.
    # 이모지·기호만 남은 조각은 문장이 아니다. 영어가 "…rules. 👇" 처럼 마침표 뒤에
    # 이모지를 두면 조각이 하나 더 생겨, 같은 뜻의 한국어("…정리해요 👇")보다 많게 세진다.
    segs = [x for x in re.split(r"[.?!\n]+", t)
            if re.search(r"[0-9A-Za-z가-힣]", x)]
    return len(segs)


# ⚠️ 한 자리 숫자는 비교하지 않는다. 영어는 "Three corners", 한국어는 "꼭짓점 3개",
# 영어는 "the fourth", 한국어는 "네 번째" — 표기가 갈리는 게 정상이라 세면 헛경보만 쌓인다.
# 처음엔 영어 글자 숫자(three→3)를 매핑해 봤는데, 이번엔 한국어 쪽이 "네 번째" 라서
# 오히려 헛경보가 늘었다(4건 → 14건). 양쪽 다 매핑하는 건 끝이 없어서 포기했다.
# **두 자리 이상만 본다** — 예제 값(27114424 · 410 · 36 · 11)이 거기 있고, 그게 진짜 위험이다.
def numbers(s):
    """두 자리 이상 숫자만.
    자릿수 구분 쉼표만 지운다 — 세 자리씩 끊은 것만(27,114,424 → 27114424).
    좌표 (2,6) 의 쉼표까지 지우면 "26" 이라는 없는 숫자가 생겨 헛경보가 난다. 실제로 났다.
    위첨자·아래첨자(10¹⁸)도 일반 숫자로 정규화해서 본다 — 2026-09-22, chipxchg:100
    "10^18"(EN) vs "10¹⁸"(KO) 가 뜻이 같은데 헛경보로 잡혔다."""
    t = normalize_script_digits(s)
    t = re.sub(r"(\d{1,3})(?:,(\d{3}))+", lambda m: m.group(0).replace(",", ""), t)
    return sorted(n for n in re.findall(r"\d+", t) if len(n) >= 2)


def group_pairs(matches):
    """이웃한 t(E,…) 조각을 한 문장으로 묶는다 (㉡).
    matches: [(start, end, en, ko, line, is_narr), …] 문서 순서.
    묶는 조건: 간격 < MAX_GAP · 간격 안에 JSX 태그가 있음 · 간격에 `</div>` 없음 ·
    양쪽 is_narr 이 같음(narr 는 애초에 단일 문자열이라 실제로는 안 묶인다)."""
    groups = []
    cur = None
    for mtch in matches:
        start, end, en, ko, line, is_narr, src_gap_before = mtch
        if cur is not None and src_gap_before is not None:
            gap = src_gap_before
            if (len(gap) < MAX_GAP and not BOUNDARY_IN_GAP.search(gap)
                    and TAG_IN_GAP.search(gap) and cur["is_narr"] == is_narr):
                cur["en"] += en
                cur["ko"] += ko
                cur["members"] += 1
                continue
        cur = {"line": line, "is_narr": is_narr, "en": en, "ko": ko, "members": 1}
        groups.append(cur)
    return groups


real_hits = []
watch_hits = []

for f in sorted(glob.glob("quest-problems/*/*.jsx")):
    src = io.open(f, encoding="utf-8").read()
    quest = f.split("/")[1]

    raw = []
    prev_end = None
    for m in PAIR.finditer(src):
        en, ko = m.group(1), m.group(2)
        line = src[: m.start()].count("\n") + 1
        is_narr = "narr:" in src[max(0, m.start() - 40): m.start()]
        gap_before = src[prev_end: m.start()] if prev_end is not None else None
        raw.append((m.start(), m.end(), en, ko, line, is_narr, gap_before))
        prev_end = m.end()

    for grp in group_pairs(raw):
        en, ko, line, is_narr = grp["en"], grp["ko"], grp["line"], grp["is_narr"]
        if not en.strip() or not ko.strip():
            continue
        # 코드 조각·기호만 있는 짝은 건너뛴다 (한글이 아예 없으면 번역이 아니다)
        if not re.search(r"[가-힣]", ko):
            continue
        if (quest, line) in ALLOW:
            continue

        why_real = []
        why_watch = []
        se, sk = sentences(en), sentences(ko)

        # ① 길이 비대칭 — narr 가 아닌 자리에서만 본다.
        #    narr 는 한국어만 55자 이하로 짧은 게 규칙(feedback_narration_short.md)이라,
        #    여기서 재면 "영어가 자세히 설명하고 한국어는 짧다" 는 정상 동작을
        #    전부 위반으로 잡는다 — 2026-09-22 표본에서 헛경보의 가장 큰 원인이었다.
        if not is_narr and len(en) >= 55 and len(ko) < len(en) * 0.35:
            why_real.append(f"길이 EN {len(en)} vs KO {len(ko)}")

        # ② 숫자 불일치 — narr 여도 REAL. 숫자 누락은 짧아도 진짜 사고일 수 있다.
        ko_uses_word_numerals = re.search(r"\d\s*[만억조경]", ko)
        ne, nk = numbers(en), numbers(ko)
        if ne != nk and not ko_uses_word_numerals:
            only_en = [x for x in ne if x not in nk]
            only_ko = [x for x in nk if x not in ne]
            if only_en or only_ko:
                why_real.append(f"숫자 EN에만{only_en or '없음'} KO에만{only_ko or '없음'}")

        if is_narr:
            # ④ narr 전용 — 영어가 한국어보다 문장이 많다. REAL 이 아니라 WATCH.
            #    (설명이 아래 카드로 옮겨갔을 뿐일 확률이 높다 — 사람이 확인할 자리.)
            if se > sk:
                why_watch.append(f"narr 문장 수 EN {se} vs KO {sk} (영어가 더 말한다 — 아래 카드로 옮겨갔을 수 있다)")
        else:
            # ③ 한국어에서 문장이 줄어든 경우만 (narr 는 ④ 가 대신한다 — 중복 방지).
            if se >= 3 and sk <= se - 2:
                why_real.append(f"문장 수 EN {se} vs KO {sk} (한국어에서 줄었다)")

        if why_real:
            real_hits.append((quest, f, line, " · ".join(why_real), en[:64], ko[:44]))
        elif why_watch:
            watch_hits.append((quest, f, line, " · ".join(why_watch), en[:64], ko[:44]))


def show(rows):
    for quest, f, line, why, en, ko in rows:
        print(f"  ⚠️ {quest}  {f}:{line}")
        print(f"     {why}")
        print(f"     EN: {en}…")
        print(f"     KO: {ko}…")


print(f"① 위반(REAL) — 판정 대상, exit code 에 걸림: {len(real_hits)}건")
print("  (숫자 불일치 · narr 아닌 자리의 길이/문장 수 비대칭)\n")
show(real_hits)

print(f"\n② 볼 자리(WATCH) — narr 문장 수 신호만, 판정 아님·exit code 에 안 걸림: {len(watch_hits)}건")
print("  (narr 은 한국어가 짧은 게 규칙이다. 설명이 카드로 옮겨갔는지 사람이 확인해라)\n")
show(watch_hits)

sys.exit(1 if real_hits else 0)
