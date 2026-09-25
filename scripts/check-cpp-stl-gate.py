#!/usr/bin/env python3
"""quest 의 C++ 말풍선·코드가 쓰는 **STL 손버릇**을 «C / D / 통과» 로 가른다.

## 왜 이게 생겼나 (2026-09-25)

선생님: *"난 moohunt 코드 설명이 너무 길어서 읽기 힘들다고."* ·
*"프로젝트 매니저한테 올려. **이것도 너무 설명이 많잖아.**"*

`check-codewalk-bubble-length.py` 로 **219곳 · quest 63개**를 뽑았다. 그 1위
`makedistinct` 에 「가르기」를 적용했는데 — **C++ 초심자 학생이 그 처방을 반증했다.**

> part 1/7 — *"3번째 문장에서 멈추고 싶었다. `long long` 이 뭔지, `int` 가 뭔지
>   **한 번도 안 배웠는데** 둘을 비교하며 설명한다."*
> part 4/7 — *"`auto &kv : groups`·`.second`·`greater<long long>()` 가 한 번에 쏟아져
>   **사실상 여기서 다 포기하고 싶었다.**"*

쪼갠 diff 를 다시 읽으니 **글자 하나 안 지우고 5문장을 2+3 으로 나눈 것뿐**이었다.
개념은 그대로 남고 **클릭만 늘었다.** 교육 판정이 스스로 적어 둔 그대로다 —
*"문장만 줄이면 개념은 여전히 안 가르쳐진 채 화면만 짧아진다."*

## 교육 판정 (2026-09-25) — 이 스크립트가 재는 것

원인이 넷이고 처방이 다르다:

| | 무엇인가 | 처방 | 기계가 잡나 |
|---|---|---|---|
| **A** | 한 beat 가 **서로 다른 코드 구간**을 설명한다 | **가른다** | 부분적(`hi` 범위 대조) |
| **B** | 같은 구간을 두 번 설명하거나 여담이 붙었다 | **줄인다** | ❌ 사람이 읽어야 한다 |
| **C** | 그 개념을 **저장소 어디에서도 안 가르친다** | **PM 판정 먼저** | ⭕ **이 스크립트** |
| **D** | 커리큘럼엔 있는데 **이 quest 시점에 리마인드가 없다** | **추천 게이트**(ⓑ) | ⭕ **이 스크립트** |

> **D 의 처방은 ⓑ 다 — 설명을 늘리지 않는 쪽.** 교육 판정 근거:
>   *"오늘 선생님이 이 quest 를 두 번 가리켜 「이것도 너무 설명이 많잖아」 라고 하셨다.
>    `feedback_shorter_not_longer.md` 는 구멍을 메우는 두 길 중 **뺄 것부터** 물으라고
>    못박아 뒀다. ⓐ(리마인드 문장 추가)는 정면으로 그 반대 방향이다."*
> 구분선: **«이 문제만의 아이디어인가, C++ 언어 전반의 손버릇인가»** —
>   전자는 그 자리에서 가르치고(원래 quest 구조가 그렇다), **후자는 게이트**다.
>   `long long`·`auto`·`.second`·`endl 대 \n` 은 **후자**다.

## 무엇을 «게이트가 없다» 로 보나

2026-09-25 실측: 카탈로그 quest **180개** 중 `QUEST_CONCEPT_META` 등록은 **62개**뿐이고
나머지 **118개는 `DEFAULT_META` 로 폴백**해 `concepts_required` 가 `[]` 가 된다.

⚠️ **여기서 내가 한 번 거꾸로 알았다 — 고쳐 적는다.**
CLAUDE.md 와 `quest-meta.ts` 주석은 *"빈 배열이 제일 위험하다 —
`required.every(...)` 는 빈 배열에서 항상 true 라 **아무에게나 추천**한다"* 고 말한다.
그 말이 맞는 함수는 `lib/concept-graph.ts` 의 `readyQuests()` 인데 —
**저장소 어디서도 부르지 않는다**(2026-09-25 실측: 정의 1곳, 호출 0곳).

**학생이 실제로 보는 두 곳은 정반대로 막아 놨다:**
  · `app/quest/page.tsx:295` (「🎯 준비됨」 배지) — `if (reqs.length === 0) return false`
  · `components/quest/QuestCompletionCard.tsx:72` (다음 문제 추천) — `if (req.length === 0) continue`

그래서 실제 결과는 **「아무에게나 추천된다」가 아니라 그 반대다** —
**게이트가 비어 있으면 그 quest 는 배지를 영원히 못 받고 추천 후보에서도 빠진다.**
카탈로그 목록과 클릭은 막지 않는다(학생이 못 푸는 건 아니다).
즉 지금 상태는 **quest 180개 중 118개가 추천 장치에 안 보이는 것**이고,
위험의 방향이 「준비 안 된 학생에게 들이민다」에서 **「좋은 문제를 아무에게도 안 권한다」**
로 바뀐다. 급한 정도가 다르므로 **이걸 「학생 데이터 사고」로 취급하지 마라.**

⚠️ **진짜 위험은 다른 데 있다 — 껍데기 항목을 만드는 순간이다.**
`{ ...DEFAULT_META, concepts_required: [...] }` 로 항목만 만들면 `difficulty: 2`
(기본값)가 같이 들어가고, `lib/quest-difficulty.ts` 는 항목이 있으면 그 값을
**`source: "audited"`(사람이 매긴 값)** 로 보고한다. 항목이 없을 때는 정직하게
`"inferred"` 로 나온다. **즉 껍데기를 만들면 난이도 표시가 거짓말을 시작한다** —
2026-09-13 에 선생님이 *"이 문제가 진짜 레벨3인가?"* 하고 잡으신 것과 **같은 모양**이다.
**게이트만 채우고 난이도는 기본값을 흘리지 마라.** 못 매기겠으면 항목을 안 만드는 게 낫다.

그래서 셋을 갈라 찍는다:
  · `없음`  — `QUEST_CONCEPT_META` 에 항목 자체가 없다 → **추천 장치에 안 보인다**
  · `빈칸`  — 항목은 있는데 `concepts_required: []` → 같은 결과
  · `있음`  — 게이트가 있다. 그 안에 해당 개념이 있나까지 본다

## ⭐ 커리큘럼 위치는 **손으로 확인한 표**를 써라 — grep 은 못 가른다

`grep` 은 *"그 낱말이 나온다"* 와 *"가르친다"* 를 못 가른다. cpp-qa 가 2026-09-25 에
`data/cpp/lesson*.ts` 를 직접 열어 확인한 **첫 교육 지점**이다(커리큘럼 전체 36단계):

| 개념 | 처음 가르치는 곳 | 커리큘럼 순서 |
|---|---|---|
| `long long` + int 넘침(21억) | `lesson3.ts:104` | **3번째** (이르다) |
| `vector` · `.begin()/.end()` | `lesson9.ts:656` | 12번째 |
| `auto` · `auto&` range-for | `lesson10.ts:307` | 16번째 |
| `pair` · `.first`/`.second` | `lesson15.ts:50` | 25번째 |
| `for(auto& p : m) p.second` | `lesson16.ts:464` | 28번째 |
| `sort(..., greater<int>())` | `lesson23.ts:204` | 26번째 — **`<int>` 로만 보여준다** |
| `priority_queue<..., greater<T>>` | `lesson18.ts:522` | 33번째 — 역시 `<int>` 만 |
| **반복자의 «뜻»** | `lesson17.ts` | **30번째** |
| **`endl` 대신 `\n` 이 왜 빠른가** | `lesson19.ts:376` | **34번째 (거의 끝)** |
| `llabs()` | — | ❌ **0건** |
| `map<K, vector<V>>`(값이 컨테이너) | — | ❌ **0건** (`lesson16` 은 `map<string,int>` 만) |

⚠️ **`greater<long long>()`·`greater<pair<...>>` 는 새 문법이 아니다** —
레슨이 `<int>` 로만 시범 보인 틀을 다른 타입에 쓴 것이다. cpp-qa 판정:
*"억지로 concept 이름을 붙이면 다음에 조용히 오탐/누락이 난다."* **PM 이 정할 자리로 남겼다.**

## 이 검사기가 **못 보는 것** (0건이 결백이 아니다)

- **B 를 못 잡는다.** 여담·중복은 의미 판단이라 사람이 읽어야 한다.
- **A 를 못 잡는다.** beat 의 `hi` 범위가 옳게 잘렸나는 여기서 안 본다.
- **손버릇 사전에 있는 것만 찾는다.** 아래 `CPP_STL` 에 없는 문법은 안 걸린다 —
  2026-09-11 에 `check-quest-code-idiom.py` 가 moohunt 의 `map<...>::iterator` 를
  **조용히 0건으로 넘긴** 전례가 있다. 새 손버릇을 보면 여기에 더해라.
- **«가르친다» 판정은 grep 이다.** 레슨이 그 낱말을 쓰기만 하고 실제로 가르치지
  않을 수 있다 — `D` 로 나왔다고 학생이 안다는 뜻은 아니다.
- **MCC·MCO·LeetCode 는 뺀다.** 선생님 지시 *"MCC는 C++ 필요 없어"* — 실제로
  `client.tsx:303` 이 `section !== "MCC"` 라 토글조차 안 뜬다.

```bash
python3 scripts/check-cpp-stl-gate.py                 # 전수 요약
python3 scripts/check-cpp-stl-gate.py makedistinct    # 한 quest, 자리까지
python3 scripts/check-cpp-stl-gate.py --only C        # C 유형만
```
"""
import glob
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def rd(p):
    try:
        return io.open(p, encoding="utf-8", errors="replace").read()
    except OSError:
        return ""


# ── C++ 손버릇 사전 ────────────────────────────────────────────────────────
#   (이름, quest 에서 찾을 정규식, 레슨이 «가르쳤다» 로 볼 정규식, 제안 concept id)
#   ⚠️ concept id 는 **제안**이다. `lib/quest-meta.ts` 의 `CONCEPT_ONTOLOGY` 에
#      실제로 넣을지는 감사를 거친다 — 그 파일 주석이 *"`count-quests.py --list
#      untaught` 의 UNTAUGHT 사전과 1:1 로 맞춰라"* 라고 못박아 뒀다. 한쪽만
#      늘리면 검사기가 조용히 틀린다.
CPP_STL = [
    ("long long / int 넘침",
     re.compile(r"\blong long\b"),
     re.compile(r"long long|오버플로|넘침|21억|20억"),
     "cpp-long-long"),
    # ⚠️ 2026-09-25: `llabs` 를 위 「long long」 항목에 묶어 뒀다가 **진짜 C 를 가렸다.**
    #   `long long` 은 `lesson3.ts:104`(커리큘럼 3번째)에서 제대로 가르치므로 D 인데,
    #   `llabs` 는 **저장소 전체 0건**이라 C 다. 하나로 묶으면 D 가 C 를 덮어 버려
    #   전수 결과가 «C 0개» 로 나왔다 — 조용히 틀린 것이다. 따로 센다.
    ("llabs() — long long 용 abs",
     re.compile(r"\bllabs\s*\("),
     re.compile(r"\bllabs\b"),
     "cpp-llabs"),
    # 같은 이유로 따로 센다 — `lesson16.ts` 는 `map<string,int>` 처럼 **값이 단순 타입**인
    #   map 만 가르친다. 값이 컨테이너인 `map<K, vector<V>>` 는 가르치는 자리가 없다.
    ("map 의 값이 컨테이너 (map<K, vector<V>>)",
     re.compile(r"map\s*<[^<>]*,\s*(?:vector|set|map)\s*<"),
     re.compile(r"map\s*<[^<>]*,\s*(?:vector|set|map)\s*<"),
     "cpp-nested-container-value"),
    ("auto & range-for",
     re.compile(r"\bauto\s*&|\bauto\s+\w+\s*:|\bfor\s*\(\s*auto\b"),
     re.compile(r"\bauto\b"),
     "cpp-auto-range-for"),
    ("pair 의 .first / .second",
     re.compile(r"\.\bsecond\b|\.\bfirst\b"),
     re.compile(r"\.second|\.first|\bpair\b"),
     "cpp-pair-access"),
    ("greater<> 비교자로 내림차순",
     re.compile(r"greater\s*<"),
     re.compile(r"greater\s*<|내림차순"),
     "cpp-comparator-greater"),
    ("begin() / end() 반복자",
     re.compile(r"\.begin\s*\(\s*\)|\.end\s*\(\s*\)|::iterator\b"),
     re.compile(r"\.begin\(|반복자|iterator"),
     "cpp-iterator"),
    ("endl 과 \\n 의 차이",
     re.compile(r'"\\\\n"|\bendl\b'),
     re.compile(r"endl.{0,80}\\\\n|\\\\n.{0,80}endl|플러시|flush"),
     "cpp-endl-vs-newline"),
    ("vector<vector<>> 2차원",
     re.compile(r"vector\s*<\s*vector\s*<"),
     re.compile(r"vector\s*<\s*vector\s*<|2차원 (?:배열|벡터)"),
     "cpp-2d-vector"),
]

LESSON_FILES = sorted(glob.glob(os.path.join(ROOT, "data/cpp/lesson*.ts")))

# ── 커리큘럼 노출 순서 — **ID 순서와 다르다** ───────────────────────────────
#   실물에서 뽑는다. 못 뽑으면 «모름» 으로 찍고 넘어간다(조용히 틀리지 않게).
CURRICULUM = []
_cur = rd(os.path.join(ROOT, "lib/curriculum-data.ts"))
for _m in re.finditer(r'id:\s*"cpp-part\d+".*?lessonIds:\s*\[([^\]]*)\]', _cur, re.S):
    CURRICULUM += re.findall(r'"([\w-]+)"', _m.group(1))
CUR_POS = {lid: i + 1 for i, lid in enumerate(CURRICULUM)}


def lesson_id_of(path):
    """`data/cpp/lesson17.ts` → `cpp-17`, `lessonCk4.ts` → `cpp-ck4`."""
    base = os.path.basename(path)
    m = re.match(r"lesson(?:Cpp)?(\d+)", base, re.I)
    if m:
        return "cpp-" + m.group(1)
    m = re.match(r"lesson[-_]?ck(\d+)", base, re.I)
    if m:
        return "cpp-ck" + m.group(1)
    m = re.match(r"lessonP(\d+)", base, re.I)
    if m:
        return "cpp-p" + m.group(1)
    return None


def where_taught(teach):
    """이 개념을 가르치는 레슨들 — (lesson_id, 커리큘럼 순서) 로. 순서 오름차순."""
    out = []
    for p in LESSON_FILES:
        if "-en" in os.path.basename(p):
            continue          # 영어판은 같은 내용이라 중복으로 세지 않는다
        if teach.search(rd(p)):
            lid = lesson_id_of(p)
            out.append((lid, CUR_POS.get(lid)))
    # 커리큘럼에 없는 것(순서 None)은 뒤로
    return sorted(out, key=lambda x: (x[1] is None, x[1] or 0))


# ── quest 메타 게이트 읽기 ─────────────────────────────────────────────────
_meta_src = rd(os.path.join(ROOT, "lib/quest-meta.ts"))
_m = re.search(r"export const QUEST_CONCEPT_META[^=]*=\s*\{", _meta_src)
META = {}
LANGS = {}   # quest -> supported_languages (파이썬 전용을 걸러내려고)
if _m:
    _start = _m.end() - 1
    _depth = 0
    _end = len(_meta_src)
    for _i in range(_start, len(_meta_src)):
        if _meta_src[_i] == "{":
            _depth += 1
        elif _meta_src[_i] == "}":
            _depth -= 1
            if _depth == 0:
                _end = _i
                break
    _body = _meta_src[_start:_end]
    for _mm in re.finditer(r'^  ([A-Za-z][\w]*)\s*:\s*\{(.*?)^  \}', _body, re.S | re.M):
        _req = re.search(r'concepts_required:\s*\[([^\]]*)\]', _mm.group(2))
        META[_mm.group(1)] = re.findall(r'"([^"]+)"', _req.group(1)) if _req else None
        _lang = re.search(r'supported_languages:\s*\[([^\]]*)\]', _mm.group(2))
        if _lang:
            LANGS[_mm.group(1)] = re.findall(r'"([^"]+)"', _lang.group(1))

# ── 카탈로그 (섹션까지) ────────────────────────────────────────────────────
_cat = rd(os.path.join(ROOT, "app/quest/[problemId]/data.ts"))
SECTION = {}
_sec = "?"
for _line in _cat.split("\n"):
    _s = re.search(r'section:\s*"([^"]+)"', _line)
    if _s:
        _sec = _s.group(1)
    _i = re.search(r'\bid:\s*"([a-z0-9_-]+)"', _line)
    if _i:
        SECTION.setdefault(_i.group(1), _sec)

SKIP_SECTIONS = {"MCC", "MCO", "LeetCode"}

# ⛔ 2026-09-25: 여기에 «커리큘럼 N번째 이후에 배우는 것» 경보(`--late`)를 달았다가 **뺐다.**
#   이유 — **거짓 0 을 찍었다.** cpp-qa 가 손으로 확인한 표에 따르면 `\n` vs `endl` 속도는
#   `cpp-19`(커리큘럼 **34번째 중 34번째**), 반복자 뜻은 `cpp-17`(30번째)에서야 나온다.
#   그런데 아래 `teach` 정규식이 느슨해서 `cpp-1`·`cpp-2` 처럼 **그 낱말만 스친 이른 레슨**이
#   먼저 걸리고, "가장 이른 레슨" 을 쓰니 경보가 **0개**로 나왔다.
#   `grep` 으로는 «낱말이 나온다» 와 «가르친다» 를 못 가른다. 신호를 못 믿으면 **싣지 않는다** —
#   『검사기가 조용히 0 쪽으로 틀린다』가 이 저장소에서 아홉 번 넘게 일어났다.
#   커리큘럼 위치가 필요하면 **cpp-qa 가 손으로 만든 표**를 써라(아래 머리 주석에 적어 뒀다).


def cpp_text(qdir):
    """그 quest 의 jsx/tsx 전체에서 **학생이 보는 글자만** 남긴다.

    ⚠️ 2026-09-25 — 이 함수가 **두 번 조용히 틀렸다. 둘 다 밖에서 잡혔다.**

    ① 처음엔 `*_CPP` 배열과 `lang === "cpp"` 뒤 6000자만 잘라 봤다가
       `mooin3` 의 `map<char, vector<int>> posOf;`(`components.jsx:2065`)를 **놓쳤다.**
       4만 자를 긁어 왔는데 그 줄이 창 밖이었다. → 파일 전체를 보게 바꿨다.

    ② 그랬더니 이번엔 **개발자 주석을 코드로 읽었다.** `livestock` 이 C 유형으로
       떴는데, 걸린 그 한 줄은 내가 오늘 직접 단 **수정 기록 주석**이었다 —
       *"`stringstream` 과 `map<string, vector<string>> adj` 인데 🔒 `FULL_CPP` 에
       둘 다 **0번**이다"*. 즉 **「이건 코드에 없다」고 적어 둔 글**을 「코드에 있다」로
       읽었다. `livestock` 은 `supported_languages: ["py"]` 라 C++ 이 화면에 뜨지도 않는다.
       cpp-qa 와 교육 담당이 **각자 따로** 잡았다 — *"C 는 3개가 아니라 2개다."*
       ⭐ `check-prose-vs-final-code.py` 에는 **같은 날 같은 이유로 주석 제거를 이미
       넣어 뒀는데** 이 파일에는 안 넣었다. **한 곳을 고치면 형제도 봐라.**

    그래서 이제 **주석(`/* */`·`//`)을 지우고** 본다. 남은 정규식은 전부 C++ 에만
    있는 모양이라(`long long`·`llabs(`·`map<K, vector<`·`greater<`·`.begin()`·`endl`)
    파이썬 코드와 섞여도 오탐이 안 난다. `auto` 만 `auto &`·`for (auto` 처럼
    **C++ 문법 모양을 요구**해서 `margin: 0 auto` 를 피한다.
    """
    chunks = []
    for p in sorted(glob.glob(os.path.join(qdir, "*.jsx"))
                    + glob.glob(os.path.join(qdir, "*.tsx"))):
        src = rd(p)
        src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)   # 블록 주석
        src = re.sub(r"^\s*//.*$", "", src, flags=re.M)     # 줄 주석
        chunks.append(src)
    return "\n".join(chunks)


def main():
    argv = sys.argv[1:]
    only = None
    if "--only" in argv:
        i = argv.index("--only")
        only = argv[i + 1].upper()
        argv = argv[:i] + argv[i + 2:]
    args = [a for a in argv if not a.startswith("-")]

    # 개념별로 «어디서 가르치나» 를 한 번만 계산한다
    taught = {}
    for name, _use, teach, cid in CPP_STL:
        taught[name] = where_taught(teach)

    rows = []
    for qdir in sorted(glob.glob(os.path.join(ROOT, "quest-problems/*"))):
        q = os.path.basename(qdir)
        if args and q not in args:
            continue
        if q not in SECTION:
            continue                       # 카탈로그에 없으면 학생이 못 본다
        if SECTION[q] in SKIP_SECTIONS:
            continue
        # ⭐ 파이썬 전용 quest 는 C++ 화면이 아예 안 뜬다 — 보지 마라.
        #   `livestock` 이 `supported_languages: ["py"]` 인데도 C 유형으로 떴다.
        langs = LANGS.get(q)
        if langs is not None and "cpp" not in langs:
            continue
        txt = cpp_text(qdir)
        if not txt.strip():
            continue                       # C++ 쪽이 없는 quest
        used = [(n, taught[n], cid) for n, use, _t, cid in CPP_STL if use.search(txt)]
        if not used:
            continue
        gate = META.get(q, "MISSING")
        rows.append((q, used, gate))

    n_c = n_d = n_ok = 0
    out = []
    for q, used, gate in rows:
        if gate == "MISSING":
            gate_s, gated = "없음", set()
        elif not gate:
            gate_s, gated = "빈칸", set()
        else:
            gate_s, gated = "있음", set(gate)
        items = []
        for name, where, cid in used:
            if not where:
                kind = "C"
            elif cid in gated:
                kind = "통과"
            else:
                kind = "D"
            items.append((kind, name, where, cid))
        kinds = {k for k, *_ in items}
        if "C" in kinds:
            n_c += 1
        elif "D" in kinds:
            n_d += 1
        else:
            n_ok += 1
        if only and only not in kinds:
            continue
        out.append((q, gate_s, items))

    print("**C++ STL 손버릇 × 추천 게이트** — quest "
          f"{len(rows)}개에서 실측\n")
    print(f"  🚨 **C** 어디에도 안 가르친 개념이 있다 — **{n_c}개**  "
          "→ **손대지 마라. PM 판정이 먼저다**")
    print(f"  ⚠️ **D** 가르치긴 하는데 **게이트가 없다** — **{n_d}개**  "
          "→ **ⓑ 추천 게이트**(설명을 늘리지 마라)")
    print(f"  ✅ 게이트가 개념을 덮는다 — **{n_ok}개**\n")
    print("  ⚠️ **D 의 수 자체는 판정에 쓰지 마라.** 게이트에 `cpp-*` 개념이 아직 하나도")
    print("     없으니 **거의 전부 D 로 나오는 게 당연**하다. 쓸 수 있는 건 **C 쪽**이다.\n")

    detail = bool(args) or only
    for q, gate_s, items in sorted(out, key=lambda r: (
            0 if any(k == "C" for k, *_ in r[2]) else 1, r[0])):
        mark = "🚨" if any(k == "C" for k, *_ in items) else "⚠️"
        bad = [i for i in items if i[0] != "통과"]
        print(f"  {mark} {q:<18} 게이트 {gate_s:<4} · 손버릇 {len(bad)}개")
        if detail:
            for kind, name, where, cid in items:
                if where:
                    w = ", ".join(f"{lid}({pos or '순서모름'})" for lid, pos in where[:3])
                else:
                    w = "**저장소 어디에도 없다**"
                print(f"       [{kind:<2}] {name:<22} 가르치는 곳: {w}")
                if kind != "통과":
                    print(f"            제안 concept id: `{cid}`")

    if not out:
        print("  0개.")
    if not detail and out:
        print("\n  자리까지 보려면: python3 scripts/check-cpp-stl-gate.py <quest 이름>")

    print("\n잣대 — 교육 판정(2026-09-25):")
    print("   **C** = 저장소 어디에도 안 가르친다 → **PM 판정 먼저. 문장을 고치지 마라.**")
    print("   **D** = 커리큘럼엔 있는데 이 quest 시점에 리마인드가 없다 →")
    print("        **ⓑ `concepts_required` 게이트.** ⓐ(리마인드 문장 추가)는 쓰지 마라 —")
    print("        선생님이 오늘 **두 번** *「이것도 너무 설명이 많잖아」* 라고 하셨다.")
    print("   ⚠️ 게이트가 `없음`·`빈칸` 이면 — **아무에게나 추천되는 게 아니라 그 반대다.**")
    print("      학생이 보는 두 곳(`page.tsx:295` 배지 · `QuestCompletionCard.tsx:72` 추천)은")
    print("      **빈 배열을 명시적으로 막는다** — 그 quest 는 **추천 장치에 아예 안 보인다.**")
    print("      («빈 배열이면 항상 true» 인 `readyQuests()` 는 **호출하는 곳이 0곳**이다.)")
    print("      실측(2026-09-25): 카탈로그 180개 중 등록 62개 — **118개가 안 보인다.**")
    print("   ⛔ 그렇다고 `{ ...DEFAULT_META, concepts_required: [...] }` 로 껍데기를 만들지 마라 —")
    print("      `difficulty: 2` 가 같이 들어가고 `quest-difficulty.ts` 가 그걸 **「사람이 매긴 값」**")
    print("      으로 보고한다. 2026-09-13 «이 문제가 진짜 레벨3인가?» 와 같은 사고다.")
    print("⚠️ **A·B 는 이 스크립트가 못 잡는다.** A(코드가 여러 갈래)·B(여담·중복)는")
    print("   `check-codewalk-bubble-length.py` 로 자리를 찾고 **사람이 읽어야** 한다.")
    print("⚠️ **0건이 결백이 아니다** — 위 손버릇 사전에 없는 문법은 안 걸린다.")
    return 1 if (n_c or n_d) else 0


if __name__ == "__main__":
    sys.exit(main())
